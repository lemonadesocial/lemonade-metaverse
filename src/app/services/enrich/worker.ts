import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Processor, QueueScheduler, Worker } from 'bullmq';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import fetch, { Response } from 'node-fetch';

import { OfferModel, Offer } from '../../models/offer';

import { BuffereredQueue } from '../../utils/buffered-queue';
import { logger } from '../../helpers/pino';
import { parseSchema } from '../../utils/url';
import { redis } from '../../helpers/redis';

import { ipfsGatewayUri } from '../../../config';

import { JobData, QUEUE_NAME } from './shared';

export const WRITER_TIMEOUT = 1000;

const durationSeconds = new Histogram({
  name: 'nft_enrich_duration_seconds',
  help: 'Duration of NFT enrich in seconds',
});
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const writer = new BuffereredQueue<BulkWriteOperation<Offer>>(
  async (operations) => OfferModel.bulkWrite(operations).then(),
  WRITER_TIMEOUT,
);

const processor: Processor<JobData> = async (job) => {
  const stopTimer = durationSeconds.startTimer();

  const { id, token_uri } = job.data;

  let response: Response;
  const schema = parseSchema(token_uri);
  switch (schema) {
    case 'http':
      response = await fetch(token_uri, { agent: httpAgent });
      break;
    case 'https':
      response = await fetch(token_uri, { agent: httpsAgent });
      break;
    case 'ipfs': {
      const url = path.join(ipfsGatewayUri, 'ipns', token_uri.substr('ipfs://'.length));
      response = await fetch(url, { agent: httpsAgent });
      break; }
    default:
      logger.debug(job, `unsupported schema ${schema}`);
      return;
  }

  assert.ok(response.ok); // @todo: validate metadata

  writer.enqueue({
    updateOne: {
      filter: { id },
      update: { $set: { token_metadata: await response.json() } },
    },
  });

  stopTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export const start = async () => {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: redis });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: redis });
  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to enrich');
  });
  await worker.waitUntilReady();
};

export const stop = async () => {
  if (worker) await worker.close();

  if (queueScheduler) await queueScheduler.close();

  await writer.flush();
};
