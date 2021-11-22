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
import { erc721MetadataContract, erc721RoyaltyContract } from '../../helpers/web3';
import { getFetchableUrl, getFetchableUrlSafe } from '../../utils/url';
import { logger } from '../../helpers/pino';
import { pubSub, Trigger } from '../../helpers/pub-sub';
import { redis } from '../../helpers/redis';

const FETCH_HEADERS_USER_AGENT = 'Lemonade Metaverse';
const FETCH_TIMEOUT = 10000;
const WORKER_CONCURRENCY = 10;
const WRITER_TIMEOUT = 1000;

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

const durationSeconds = new Histogram({
  name: 'metaverse_enrich_duration_seconds',
  help: 'Duration of metaverse enrich in seconds',
});

async function getOrders(job: Job<JobData>) {
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

  const values = members as string[];

  return values.map((value) => JSON.parse(value) as Order);
}

const processor: Processor<JobData> = async (job) => {
  const durationTimer = durationSeconds.startTimer();

  const { token } = job.data;

  await Promise.all([
    (async () => {
      const tokenURI = await erc721MetadataContract.attach(token.contract).tokenURI(token.tokenId).catch(() => null);

      if (!tokenURI) return;

      const url = getFetchableUrl(tokenURI);
      const response = await fetch(url, { agent: fetchAgent[url.protocol], ...fetchInit });

      assert.ok(response.ok, response.statusText);

      token.uri = tokenURI;
      token.metadata = await response.json() as Record<string, unknown>; // @todo: validate metadata
    })(),
    (async () => {
      const royalty = await erc721RoyaltyContract.attach(token.contract).royalty(token.tokenId).catch(() => null);

      if (!royalty) return;

      token.royaltyMaker = royalty[0];
      token.royaltyFraction = royalty[1];
    })(),
  ]);

  token.enrichedAt = new Date();

  writer.enqueue({
    updateOne: {
      filter: { id: token.id },
      update: { $set: token },
      upsert: true,
    },
  });

  const [orders] = await Promise.all([
    getOrders(job),
    pubSub.publish(Trigger.TokenUpdated, token),
  ]);

  const imageUrl = getFetchableUrlSafe(token.metadata?.image);

  if (orders.length) {
    for (const order of orders) {
      logger.info({ order, token, imageUrl }, 'enrich order');

      await pubSub.publish(Trigger.OrderUpdated, { ...order, token });
    }
  } else {
    logger.info({ token, imageUrl }, 'enrich token');
  }

  durationTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export async function start(): Promise<void> {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: createConnection() });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: createConnection(), concurrency: WORKER_CONCURRENCY });
  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to enrich');
  });
  await worker.waitUntilReady();
}

export async function stop(): Promise<void> {
  if (worker) await worker.close();

  if (queueScheduler) await queueScheduler.close();

  await writer.flush();
}
