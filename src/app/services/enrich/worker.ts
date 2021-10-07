import { AnyBulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Processor, QueueScheduler, Worker } from 'bullmq';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import fetch, { Response, RequestInit } from 'node-fetch';
import Redis from 'ioredis';

import { JobData, QUEUE_NAME } from './shared';

import { Token, TokenModel } from '../../models/token';

import { BufferQueue } from '../../utils/buffer-queue';
import { logger } from '../../helpers/pino';
import { parseSchema } from '../../utils/url';
import { pubSub } from '../../helpers/pub-sub';

import { ipfsGatewayUrl, redisUrl } from '../../../config';

const FETCH_HEADERS_USER_AGENT = 'Lemonade Metaverse';
const FETCH_TIMEOUT = 5000;
const WORKER_CONCURRENCY = 10;
const WRITER_TIMEOUT = 1000;

const durationSeconds = new Histogram({
  name: 'metaverse_enrich_duration_seconds',
  help: 'Duration of metaverse enrich in seconds',
});

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const requestInit: RequestInit = {
  headers: { 'User-Agent': FETCH_HEADERS_USER_AGENT },
  timeout: FETCH_TIMEOUT,
};

const writer = new BufferQueue<AnyBulkWriteOperation<Token>>(
  (operations) => TokenModel.bulkWrite(operations, { ordered: false }).then(),
  WRITER_TIMEOUT
);

const processor: Processor<JobData> = async (job) => {
  const durationTimer = durationSeconds.startTimer();

  const { order, token } = job.data;

  let response: Response;
  const schema = parseSchema(token.uri);
  switch (schema) {
    case 'http':
      response = await fetch(token.uri, { agent: httpAgent, ...requestInit });
      break;
    case 'https':
      response = await fetch(token.uri, { agent: httpsAgent, ...requestInit });
      break;
    case 'ipfs':
      response = await fetch(`${ipfsGatewayUrl}ipfs/${token.uri.substr('ipfs://'.length)}`, { agent: httpsAgent, ...requestInit });
      break;
    default:
      logger.debug(job.toJSON(), `unsupported schema ${schema}`);
      return;
  }

  assert.ok(response.ok, response.statusText);

  token.metadata = await response.json(); // @todo: validate metadata

  writer.enqueue({
    updateOne: {
      filter: { id: token.id },
      update: { $set: token },
      upsert: true,
    },
  });

  logger.info({ order, token }, 'enrich');

  if (order) await pubSub.publish('order_updated', { ...order, token });
  else await pubSub.publish('token_updated', token);

  durationTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export const start = async (): Promise<void> => {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUrl) });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, {
    connection: new Redis(redisUrl),
    concurrency: WORKER_CONCURRENCY,
  });
  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to enrich');
  });
  await worker.waitUntilReady();
};

export const stop = async (): Promise<void> => {
  if (worker) await worker.close();

  if (queueScheduler) await queueScheduler.close();

  await writer.flush();
};
