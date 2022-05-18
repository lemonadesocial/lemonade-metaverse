import { Counter, Histogram } from 'prom-client';
import { ethers } from 'ethers';
import { Job, Processor, QueueScheduler, Worker } from 'bullmq';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import fetch, { RequestInit } from 'node-fetch';
import type { AnyBulkWriteOperation } from 'mongodb';

import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';

import { fetchRegistry } from '../registry';
import { networks } from '../network';

import { connection } from '../../helpers/bullmq';
import { erc721MetadataContract, erc2981Contract, raribleRoyaltiesV2 } from '../../helpers/web3';
import { logger } from '../../helpers/pino';
import { pubSub, Trigger } from '../../helpers/pub-sub';
import { redis } from '../../helpers/redis';

import { Token, TokenModel } from '../../models/token';
import type { Order } from '../../models/order';

import { BufferQueue } from '../../utils/buffer-queue';
import { getParsedUrl, getWebUrl, parseUrl } from '../../utils/url';

const FETCH_HEADERS_USER_AGENT = 'Lemonade Metaverse';
const FETCH_TIMEOUT = 10000;
const WORKER_CONCURRENCY = 10;
const WRITER_TIMEOUT = 1000;

const fetchAgent: Record<string, http.Agent> = {
  'http:': new http.Agent({ keepAlive: true }),
  'https:': new https.Agent({ keepAlive: true }),
};
const fetchInit: RequestInit = {
  agent: ({ protocol }) => fetchAgent[protocol],
  headers: { 'User-Agent': FETCH_HEADERS_USER_AGENT },
  timeout: FETCH_TIMEOUT,
};

const writer = new BufferQueue<AnyBulkWriteOperation<Token>>(
  (operations) => TokenModel.bulkWrite(operations, { ordered: false }).then(),
  WRITER_TIMEOUT
);

const enrichesTotal = new Counter({
  labelNames: ['network', 'status'],
  name: 'metaverse_enriches_total',
  help: 'Total number of metaverse enriches',
});
const enrichDurationSeconds = new Histogram({
  labelNames: ['network'],
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
  const enrichDurationTimer = enrichDurationSeconds.startTimer();

  const { token } = job.data;
  const network = networks[token.network];

  assert.ok(network);

  const registry = await fetchRegistry(network, token.contract);
  const provider = network.provider();

  assert.ok(registry.isERC721);

  await Promise.all([
    registry.supportsERC721Metadata && (async () => {
      token.uri = await erc721MetadataContract.connect(provider).attach(token.contract).tokenURI(token.tokenId) as string;

      const { href, pathname, protocol } = parseUrl(token.uri);

      switch (protocol) {
        case 'data:': {
          const pos = pathname.indexOf(',');

          assert.notStrictEqual(pos, -1);

          const base64ed = pathname.substring(0, pos).endsWith(';base64');
          const data = pathname.substring(pos + 1);

          token.metadata = JSON.parse(base64ed ? Buffer.from(data, 'base64').toString() : data);
          break; }
        case 'http:':
        case 'https:': {
          const response = await fetch(href, fetchInit);

          assert.ok(response.ok, response.statusText);

          token.metadata = await response.json();
          break; }
        default:
          throw new Error(`unsupported protocol ${protocol}`);
      }
    })(),
    registry.supportsRaribleRoyaltiesV2 || registry.supportsERC2981 && (async () => {
      if (registry.supportsRaribleRoyaltiesV2) {
        const royalties = await raribleRoyaltiesV2.connect(provider).attach(token.contract).getRaribleV2Royalties(token.tokenId).catch(() => null) as [string, ethers.BigNumber][] | null;

        if (royalties?.length) {
          token.royalties = royalties.map(([account, value]) => ({ account: account.toLowerCase(), value: value.toString() }));
        }
      } else if (registry.supportsERC2981) {
        const price = ethers.utils.parseEther('1');
        const royaltyInfo = await erc2981Contract.connect(provider).attach(token.contract).royaltyInfo(token.tokenId, price).catch(() => null) as [string, ethers.BigNumber] | null;

        if (royaltyInfo?.[1].gt(0)) {
          token.royalties = [{ account: royaltyInfo[0].toLowerCase(), value: royaltyInfo[1].div(price).mul(10000).toString() }];
        }
      }
    })(),
  ]);

  token.enrichedAt = new Date();

  writer.enqueue({
    updateOne: {
      filter: { network: token.network, id: token.id },
      update: { $set: token },
      upsert: true,
    },
  });

  const orders = await getOrders(job);
  const imageUrl = getParsedUrl(token.metadata?.image);
  const webUrl = getWebUrl(token);

  if (orders.length) {
    const promises: Promise<void>[] = [];

    for (const order of orders) {
      logger.info({ order, token, imageUrl, webUrl }, 'enrich order');

      promises.push(
        pubSub.publish(Trigger.OrderUpdated, { ...order, token })
      );

      if (token.order === order.id) {
        promises.push(
          pubSub.publish(Trigger.TokenUpdated, { ...token, order })
        );
      }
    }

    await Promise.all(promises);
  } else {
    logger.info({ token, imageUrl, webUrl }, 'enrich token');

    await pubSub.publish(Trigger.TokenUpdated, token);
  }

  enrichDurationTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export async function start(): Promise<void> {
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection, concurrency: WORKER_CONCURRENCY });
  worker.on('failed', function onFailed(job: Job<JobData>, error) {
    enrichesTotal.inc({ network: job.data.token.network, status: 'fail' });
    pubSub.publish(Trigger.EnrichFailed, job.data.token);
    logger.error(error, 'failed to enrich');
  });
  worker.on('completed', function onCompleted(job: Job<JobData>) {
    enrichesTotal.inc({ network: job.data.token.network, status: 'success' });
  });
  await worker.waitUntilReady();
}

export async function stop(): Promise<void> {
  if (worker) await worker.close();

  if (queueScheduler) await queueScheduler.close();

  await writer.flush();
}
