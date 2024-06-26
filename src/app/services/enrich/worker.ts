import { Counter, Histogram } from 'prom-client';
import { ethers } from 'ethers';
import { Job, Processor, Worker } from 'bullmq';
import * as assert from 'assert';
import type { AnyBulkWriteOperation } from 'mongodb';

import { BufferQueue } from '../../utils/buffer-queue';
import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';
import { Token, TokenModel } from '../../models/token';
import type { Order } from '../../models/order';

import { logger, slackLogger } from '../../helpers/pino';
import { networkMap } from '../network';
import { pubSub, Trigger } from '../../helpers/pub-sub';
import { redis } from '../../helpers/redis';

import { createWorkerConnection } from '../../helpers/bullmq';
import { getParsedUrl, getWebUrl, parseUrl } from '../../utils/url';
import { getRaribleV2Royalties } from '../contract/rarible-royalties-v2';
import { getRegistry } from '../registry';
import { getUniqueMetadata, isUniqueCollection } from '../unique';
import { royaltyInfo } from '../contract/erc2981';
import { tokenURI } from '../contract/erc721-metadata';

const FETCH_TIMEOUT = 60000;
const WORKER_CONCURRENCY = 25;
const WRITER_TIMEOUT = 1000;

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
  const result = await redis.multi([
    ['call', 'SMEMBERS', key],
    ['call', 'DEL', key],
  ]).exec();

  assert.ok(result);

  if (result[0][0]) throw result[0][0];
  if (result[1][0]) throw result[1][0];

  const values = result[0][1] as string[];

  return values.map((value) => JSON.parse(value) as Order);
}

const processor: Processor<JobData> = async (job) => {
  const { token } = job.data;

  try {
    const enrichDurationTimer = enrichDurationSeconds.startTimer();

    const network = networkMap[token.network];

    assert.ok(network);

    const registry = await getRegistry(network, token.contract);

    assert.ok(registry.isERC721, `registry network ${registry.network} id ${registry.id} not ERC721`);

    await Promise.all([
      (isUniqueCollection(network, token.contract) && !registry.supportsERC721Metadata) && (async () => {
        token.metadata = await getUniqueMetadata(network, token.contract, token.tokenId);
      })(),
      (registry.supportsERC721Metadata) && (async () => {
        token.uri = await tokenURI(network, token.contract, token.tokenId);

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
            const response = await fetch(href, {
              keepalive: true,
              signal: AbortSignal.timeout(FETCH_TIMEOUT),
            });

            if (response.ok) {
              token.metadata = await response.json();
            }
            break; }
        }
      })(),
      (registry.supportsRaribleRoyaltiesV2 || registry.supportsERC2981) && (async () => {
        if (registry.supportsRaribleRoyaltiesV2) {
          const royalties = await getRaribleV2Royalties(network, token.contract, token.tokenId);

          if (royalties.length) {
            token.royalties = royalties.map(([account, value]) => ({ account: account.toLowerCase(), value: value.toString() }));
          }
        } else if (registry.supportsERC2981) {
          const [receiver, amount] = await royaltyInfo(network, token.contract, token.tokenId, ethers.constants.WeiPerEther);

          if (amount.gt(0)) {
            token.royalties = [{ account: receiver.toLowerCase(), value: amount.div(ethers.constants.WeiPerEther).mul(10000).toString() }];
          }
        }
      })(),
    ]).catch((err) => {
      logger.warn({ token, err }, 'failed to enrich');
    });

    token.enrichedAt = new Date();
    token.enrichCount = token.enrichCount ? token.enrichCount + 1 : 1;

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
      await Promise.all(orders.flatMap(async (order) => {
        slackLogger.info({ order, token, imageUrl, webUrl }, 'enrich order');

        return [
          token.order === order.id
            && pubSub.publish(Trigger.TokenUpdated, { ...token, order, registry }),
          pubSub.publish(Trigger.OrderUpdated, { ...order, token }),
        ];
      }));
    } else {
      slackLogger.info({ token, imageUrl, webUrl }, 'enrich token');

      await pubSub.publish(Trigger.TokenUpdated, { ...token, registry });
    }

    const channel = network.enrichChannel?.[token.contract];

    if (channel) slackLogger.info({ channel, tokenId: token.tokenId, imageUrl, webUrl });

    enrichDurationTimer({ network: network.name });
  } catch (err) {
    await pubSub.publish(Trigger.EnrichFailed, token);

    throw err;
  }
};

let worker: Worker<JobData> | undefined;

export async function start() {
  worker = new Worker<JobData>(QUEUE_NAME, processor, {
    concurrency: WORKER_CONCURRENCY,
    connection: createWorkerConnection(),
  });
  worker.on('failed', function onFailed(job, err) {
    enrichesTotal.inc({ network: job?.data.token.network, status: 'fail' });
    logger.error({ token: job?.data.token, err }, 'failed to enrich');
  });
  worker.on('completed', function onCompleted(job) {
    enrichesTotal.inc({ network: job.data.token.network, status: 'success' });
  });

  await worker.waitUntilReady();
}

export async function stop(): Promise<void> {
  if (worker) await worker.close();

  await writer.flush();
}
