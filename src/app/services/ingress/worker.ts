import { AnyBulkWriteOperation } from 'mongodb';
import { Counter, Histogram } from 'prom-client';
import { Job, JobsOptions, Processor, Queue, QueueScheduler, Worker } from 'bullmq';
import Redis from 'ioredis';

import { excludeNull } from '../../utils/object';
import { logger } from '../../helpers/pino';
import { pubSub } from '../../helpers/pub-sub';
import * as enrich from '../enrich/queue';
import * as indexer from '../../helpers/indexer';

import { Order, OrderKind, OrderModel } from '../../models/order';
import { StateModel } from '../../models/state';
import { Token, TokenModel } from '../../models/token';

import { Ingress } from '../../../lib/lemonade-marketplace/documents.generated';
import { IngressQuery, IngressQueryVariables } from '../../../lib/lemonade-marketplace/types.generated';
import { Unpacked } from '../../types';

import { redisUrl } from '../../../config';

type IngressOrder = Unpacked<IngressQuery['orders']>;

const POLL_FIRST = 1000;
const QUEUE_NAME = 'bullmq:ingress';

const ingressesTotal = new Counter({
  labelNames: ['status'],
  name: 'metaverse_ingresses_total',
  help: 'Total number of metaverse ingresses',
});
const ingressDurationSeconds = new Histogram({
  name: 'metaverse_ingress_duration_seconds',
  help: 'Duration of metaverse ingress in seconds',
});

const jobOptions: JobsOptions = {
  attempts: Number.MAX_VALUE,
  backoff: 1000,
  delay: 1000,
  removeOnComplete: true,
  removeOnFail: true,
};
const stateQuery = { key: 'ingress_last_block' };

const process = async (items: IngressOrder[]) => {
  const orders = items.map(({ kind, token, ...order }: IngressOrder): Order => {
    return {
      kind: kind as string as OrderKind,
      token: token.id,
      ...excludeNull(order),
    };
  });

  const tokens = items.map(({ token }: IngressOrder): Token => {
    return excludeNull(token);
  });

  const [_, { upsertedIds = {} }] = await Promise.all([
    OrderModel.bulkWrite(
      orders.map<AnyBulkWriteOperation<Order>>(({ id, ...order }) => ({
        updateOne: {
          filter: { id },
          update: { $set: order },
          upsert: true,
        },
      })),
      { ordered: false },
    ),
    TokenModel.bulkWrite(
      tokens.map<AnyBulkWriteOperation<Token>>(({ id, ...token }) => ({
        updateOne: {
          filter: { id },
          update: { $set: token },
          upsert: true,
        },
      })),
      { ordered: false },
    ),
  ]);

  const promises: Promise<unknown>[] = [];
  const upsertedIdxs = Object.keys(upsertedIds).map((key) => parseInt(key));

  if (upsertedIdxs.length) {
    promises.push(
      enrich.enqueue(...upsertedIdxs.map((i) => ({
        order: orders[i],
        token: tokens[i],
      })))
    );
  }

  for (const i of items.keys()) {
    logger.info({ order: orders[i], token: tokens[i] }, 'ingress');

    if (i in upsertedIdxs) continue;

    promises.push(
      pubSub.publish('order_updated', { ...orders[i], token: tokens[i] })
    );
  }

  await Promise.all(promises);
};

const poll = async (lastBlock_gt?: string) => {
  let skip = 0;
  const first = POLL_FIRST;

  let lastBlock: string | undefined;
  let length = 0;
  do {
    const { data } = await indexer.client.query<IngressQuery, IngressQueryVariables>({
      query: Ingress,
      variables: { lastBlock_gt, skip, first },
    });

    if (data._meta) {
      const { block, hasIndexingErrors } = data._meta;

      if (lastBlock_gt && block.number < parseInt(lastBlock_gt)) {
        logger.warn({ block, hasIndexingErrors, lastBlock_gt }, 'subgraph is reindexing');
      }

      if (hasIndexingErrors) {
        logger.warn({ block, hasIndexingErrors }, 'subgraph encountered indexing errors at some past block');
      }
    }

    length = data?.orders?.length || 0;
    logger.debug({ lastBlock_gt, skip, first, length });

    if (length) {
      await process(data.orders);

      skip += first;
      lastBlock = data.orders[length - 1].lastBlock; // requires asc sort on lastBlock
    }
  } while (length);

  return lastBlock;
};

interface JobData {
  lastBlock_gt?: string;
}

let queue: Queue | undefined;
let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

const processor: Processor<JobData> = async ({ data: { lastBlock_gt } }) => {
  const ingressDurationTimer = ingressDurationSeconds.startTimer();

  const lastBlock = await poll(lastBlock_gt);

  await Promise.all([
    lastBlock && lastBlock !== lastBlock_gt
      ? StateModel.updateOne(stateQuery, { $set: { value: lastBlock } }, { upsert: true })
      : null,
    queue!.add('*', { lastBlock_gt: lastBlock || lastBlock_gt }, jobOptions),
  ]);

  ingressDurationTimer();
};

const meta = ({ timestamp }: Job<JobData>) => {
  const delay = Date.now() - timestamp;

  return {
    timestamp: new Date(timestamp).toUTCString(),
    delay: (delay / 1000).toFixed(1) + 's',
  };
};

export const start = async (): Promise<void> => {
  queue = new Queue<JobData>(QUEUE_NAME, { connection: new Redis(redisUrl) });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUrl) });
  await Promise.all([
    enrich.waitUntilReady(),
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);

  if (!await queue.getJobCountByTypes('active', 'waiting', 'paused', 'delayed')) {
    const state = await StateModel.findOne(stateQuery, { value: 1 }, { lean: true });
    const job = await queue.add('*', { lastBlock_gt: state?.value }, jobOptions);
    logger.info(job.asJSON(), 'created ingress job');
  }

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: new Redis(redisUrl) });
  worker.on('failed', function onFailed(job, error) {
    ingressesTotal.inc({ status: 'fail' });
    if (job.attemptsMade > 1) logger.error({ ...meta(job), err: error }, 'failed two consecutive ingresses');
  });
  worker.on('completed', function onCompleted(job) {
    ingressesTotal.inc({ status: 'success' });
    if (job.attemptsMade > 1) logger.info({ ...meta(job) }, 'completed ingress');
  });
  await worker.waitUntilReady();
};

export const stop = async (): Promise<void> => {
  if (worker) await worker.close();
  indexer.stop();

  await enrich.close();
  if (queue) await queue.close();
  if (queueScheduler) await queueScheduler.close();
};
