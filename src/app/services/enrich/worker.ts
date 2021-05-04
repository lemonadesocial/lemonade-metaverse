import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Processor, QueueScheduler, Worker } from 'bullmq';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import fetch, { Response } from 'node-fetch';
import Redis from 'ioredis';

import { OfferModel, Offer } from '../../models/offer';

import { BuffereredQueue } from '../../utils/buffered-queue';
import { logger } from '../../helpers/pino';
import { parseSchema } from '../../utils/url';
import { pubSub } from '../../helpers/pub-sub';

import { ipfsGatewayUri, redisUri } from '../../../config';

import { JobData, QUEUE_NAME } from './shared';

export const WORKER_CONCURRENCY = 10;
export const WRITER_TIMEOUT = 1000;

const durationSeconds = new Histogram({
  name: 'metaverse_enrich_duration_seconds',
  help: 'Duration of metaverse enrich in seconds',
});
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const writer = new BuffereredQueue<BulkWriteOperation<Offer>>(
  (operations) => OfferModel.bulkWrite(operations).then(),
  WRITER_TIMEOUT,
);

const processor: Processor<JobData> = async (job) => {
  const stopTimer = durationSeconds.startTimer();

  const { offer, upserted } = job.data;

  let response: Response;
  const schema = parseSchema(offer.token_uri);
  switch (schema) {
    case 'http':
      response = await fetch(offer.token_uri, { agent: httpAgent });
      break;
    case 'https':
      response = await fetch(offer.token_uri, { agent: httpsAgent });
      break;
    case 'ipfs': {
      const url = path.join(ipfsGatewayUri, 'ipns', offer.token_uri.substr('ipfs://'.length));
      response = await fetch(url, { agent: httpsAgent });
      break; }
    default:
      logger.debug(job.toJSON(), `unsupported schema ${schema}`);
      return;
  }

  assert.ok(response.ok);

  offer.token_metadata = await response.json(); // @todo: validate metadata

  writer.enqueue({
    updateOne: {
      filter: { id: offer.id },
      update: { $set: { token_metadata: offer.token_metadata } },
    },
  });

  await pubSub.publish(upserted ? 'offer_created' : 'offer_updated', offer);

  stopTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export const start = async () => {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUri) });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: new Redis(redisUri), concurrency: WORKER_CONCURRENCY });
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