import { AnyBulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Job, Processor, QueueScheduler, Worker } from 'bullmq';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import fetch, { RequestInit } from 'node-fetch';

import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';

import { Order } from '../../models/order';
import { Token, TokenModel } from '../../models/token';

import { BufferQueue } from '../../utils/buffer-queue';
import { createConnection } from '../../helpers/bullmq';
import { getFetchableUrl, getSimpleFetchableUrl } from '../../utils/url';
import { logger } from '../../helpers/pino';
import { pubSub } from '../../helpers/pub-sub';
import { redis } from '../../helpers/redis';

const FETCH_HEADERS_USER_AGENT = 'Lemonade Metaverse';
const FETCH_TIMEOUT = 10000;
const WORKER_CONCURRENCY = 10;
const WRITER_TIMEOUT = 1000;

const durationSeconds = new Histogram({
  name: 'metaverse_enrich_duration_seconds',
  help: 'Duration of metaverse enrich in seconds',
});

const fetchAgent: Record<string, http.Agent> = {
  'http:': new http.Agent({ keepAlive: true }),
  'https:': new https.Agent({ keepAlive: true }),
};
const fetchInit: RequestInit = {
  headers: { 'User-Agent': FETCH_HEADERS_USER_AGENT },
  timeout: FETCH_TIMEOUT,
};

const writer = new BufferQueue<AnyBulkWriteOperation<Token>>(
  (operations) => TokenModel.bulkWrite(operations, { ordered: false }).then(),
  WRITER_TIMEOUT
);

const getOrders = async (job: Job<JobData>) => {
  const key = `${ORDERS_KEY}:${job.id}`;
  const [
    [err1, members],
    [err2],
  ] = await redis.multi([
    ['call', 'SMEMBERS', key],
    ['call', 'DEL', key],
  ]).exec();

  if (err1) throw err1;
  if (err2) throw err2;
  return (members as string[]).map((value) => JSON.parse(value) as Order);
};

const processor: Processor<JobData> = async (job) => {
  const durationTimer = durationSeconds.startTimer();

  const { token } = job.data;
  const url = getFetchableUrl(token.uri);
  const response = await fetch(url, { agent: fetchAgent[url.protocol], ...fetchInit });

  assert.ok(response.ok, response.statusText);

  token.metadata = await response.json() as Record<string, unknown>; // @todo: validate metadata

  writer.enqueue({
    updateOne: {
      filter: { id: token.id },
      update: { $set: token },
      upsert: true,
    },
  });

  const [orders] = await Promise.all([
    getOrders(job),
    pubSub.publish('token_updated', token),
  ]);
  const imageUrl = getSimpleFetchableUrl(token.metadata.image);

  if (orders.length) {
    for (const order of orders) {
      logger.info({ order, token, imageUrl }, 'enrich order');

      await pubSub.publish('order_updated', { ...order, token });
    }
  } else {
    logger.info({ token, imageUrl }, 'enrich token');
  }

  durationTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export const start = async (): Promise<void> => {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: createConnection() });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: createConnection(), concurrency: WORKER_CONCURRENCY });
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
