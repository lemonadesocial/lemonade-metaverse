import { AnyBulkWriteOperation } from 'mongodb';
import { Counter, Histogram } from 'prom-client';
import { Job, JobsOptions, Processor, Queue, QueueScheduler, Worker } from 'bullmq';

import { createConnection } from '../../helpers/bullmq';
import { createToken } from '../token';
import { excludeNull } from '../../utils/object';
import { getFetchableUrlSafe } from '../../utils/url';
import { logger } from '../../helpers/pino';
import { pubSub } from '../../helpers/pub-sub';
import * as enrich from '../enrich/queue';
import * as indexer from '../../helpers/indexer';

import { Order, OrderKind, OrderModel } from '../../models/order';
import { StateModel } from '../../models/state';
import { Token, TokenModel } from '../../models/token';

import { Ingress } from '../../../lib/lemonade-marketplace/documents.generated';
import { IngressQuery, IngressQueryVariables } from '../../../lib/lemonade-marketplace/types.generated';

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
const ingressTimeToRecoverySeconds = new Histogram({
  name: 'metaverse_ingress_time_to_recovery_seconds',
  help: 'Time to recovery of metaverse ingress in seconds',
  buckets: [1, 5, 30, 60, 300, 900, 1800, 3600, 7200, 10800, 14400],
});

const jobOptions: JobsOptions = {
  attempts: Number.MAX_VALUE,
  backoff: 1000,
  delay: 1000,
  removeOnComplete: true,
  removeOnFail: true,
};
const stateQuery = { key: 'ingress' };

const process = async (data: IngressQuery) => {
  const orders: Order[] = [];
  const ordersToken: Record<string, Token> = {};
  const tokens: Token[] = [];
  const tokensOrders: Record<string, Order[]> = {};

  data.orders?.forEach((item) => {
    const order = {
      ...excludeNull(item),
      createdAt: new Date(+item.createdAt * 1000),
      kind: item.kind as string as OrderKind,
      openFrom: item.openFrom ? new Date(+item.openFrom * 1000) : undefined,
      openTo: item.openTo ? new Date(+item.openTo * 1000) : undefined,
      token: item.token.id,
    };

    const token = createToken(item.token);

    orders.push(order);
    ordersToken[order.id] = token;

    // multiple orders can have the same token, which are all closed except potentially the last
    if (tokensOrders[token.id]) return tokensOrders[token.id].push(order);

    tokens.push(token);
    tokensOrders[token.id] = [order];
  });

  data.tokens?.forEach((item) => {
    // when processing data of multiple blocks, the token can be in both tokens and orders
    if (tokensOrders[item.id]) return;

    const token = createToken(item);

    tokens.push(token);
  });

  const [docs] = await Promise.all([
    tokens.length
      ? TokenModel.find(
        { id: { $in: tokens.map(({ id }) => id) }, metadata: { $exists: true } },
        { id: 1, metadata: 1 },
      ).lean<{ id: string; metadata: Record<string, unknown> }[]>()
      : undefined,
    tokens.length
      ? TokenModel.bulkWrite(
        tokens.map<AnyBulkWriteOperation<Token>>(({ id, ...token }) => ({
          updateOne: {
            filter: { id },
            update: { $set: token },
            upsert: true,
          },
        })),
        { ordered: false },
      )
      : undefined,
    orders.length
      ? OrderModel.bulkWrite(
        orders.map<AnyBulkWriteOperation<Order>>(({ id, ...order }) => ({
          updateOne: {
            filter: { id },
            update: { $set: order },
            upsert: true,
          },
        })),
        { ordered: false },
      )
      : undefined,
  ]);

  const promises: Promise<unknown>[] = [];
  const map = docs ? Object.fromEntries(docs.map((doc) => [doc.id, doc])) : {};

  const missing = tokens.filter(({ id }) => !map[id]);
  if (missing.length) {
    promises.push(
      enrich.enqueue(...missing.map((token) => ({
        orders: tokensOrders[token.id],
        token,
      }))),
    );
  }

  orders.forEach((order) => {
    if (!map[order.token]) return; // deligate to enrich

    const token = {
      ...ordersToken[order.id],
      ...map[order.token],
    };

    logger.info({ order, token, imageUrl: getFetchableUrlSafe(token.metadata.image) }, 'ingress order');

    promises.push(
      pubSub.publish('order_updated', { ...order, token })
    );
  });

  await Promise.all(promises);
};

const poll = async (data: JobData): Promise<JobData> => {
  const { orders_lastBlock_gt, tokens_createdAt_gt } = data;
  const nextData = { ...data };

  let orders_skip = 0;
  let orders_first = POLL_FIRST;
  let tokens_skip = 0;
  let tokens_first = POLL_FIRST;
  do {
    const { data } = await indexer.client.query<IngressQuery, IngressQueryVariables>({
      query: Ingress,
      variables: {
        orders_include: orders_first > 0,
        orders_lastBlock_gt,
        orders_skip,
        orders_first,
        tokens_include: tokens_first > 0,
        tokens_createdAt_gt,
        tokens_skip,
        tokens_first,
      },
    });

    if (data._meta) {
      const { block, hasIndexingErrors } = data._meta;

      if (orders_lastBlock_gt && block.number < parseInt(orders_lastBlock_gt)) {
        logger.warn({ block, hasIndexingErrors, orders_lastBlock_gt }, 'subgraph is reindexing');
      }

      if (hasIndexingErrors) {
        logger.warn({ block, hasIndexingErrors }, 'subgraph encountered indexing errors at some past block');
      }
    }

    const orders_length = data.orders?.length || 0;
    const tokens_length = data.tokens?.length || 0;

    if (orders_length || tokens_length) {
      await process(data);

      if (orders_length) {
        nextData.orders_lastBlock_gt = data.orders![orders_length - 1].lastBlock;
        orders_skip += orders_length;
      }

      if (tokens_length) {
        nextData.tokens_createdAt_gt = data.tokens![tokens_length - 1].createdAt!;
        tokens_skip += tokens_length;
      }
    }

    if (orders_length < orders_first) orders_first = 0;
    if (tokens_length < tokens_first) tokens_first = 0;
  } while (orders_first || tokens_first);

  return nextData;
};

interface JobData {
  orders_lastBlock_gt?: string;
  tokens_createdAt_gt?: string;
}

let queue: Queue | undefined;
let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

const processor: Processor<JobData> = async ({ data }) => {
  const ingressDurationTimer = ingressDurationSeconds.startTimer();

  const nextData = await poll(data);

  const keys = Object.keys(nextData) as (keyof JobData)[];
  const hasChanged = keys.length !== Object.keys(data).length || keys.some((x) => nextData[x] !== data[x]);

  await Promise.all([
    hasChanged ? StateModel.updateOne(stateQuery, { $set: { value: nextData } }, { upsert: true }) : null,
    queue!.add('*', nextData, jobOptions),
  ]);

  ingressDurationTimer();
};

const getJobTiming = ({ timestamp }: Job<JobData>) => {
  return {
    secondsElapsed: (Date.now() - timestamp) / 1000,
    timestamp: new Date(timestamp),
  };
};

export const start = async (): Promise<void> => {
  queue = new Queue<JobData>(QUEUE_NAME, { connection: createConnection() });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: createConnection() });
  await Promise.all([
    enrich.waitUntilReady(),
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);

  if (!await queue.getJobCountByTypes('active', 'waiting', 'paused', 'delayed')) {
    const state = await StateModel.findOne(stateQuery, { value: 1 }, { lean: true });
    const job = await queue.add('*', state?.value || {}, jobOptions);
    logger.info(job.asJSON(), 'created ingress job');
  }

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: createConnection() });
  worker.on('failed', function onFailed(job, err) {
    ingressesTotal.inc({ status: 'fail' });
    logger.error({ ...getJobTiming(job), err }, 'failed ingress');
  });
  worker.on('completed', function onCompleted(job) {
    ingressesTotal.inc({ status: 'success' });

    if (job.attemptsMade) {
      const timing = getJobTiming(job);

      ingressTimeToRecoverySeconds.observe(timing.secondsElapsed);
      logger.info(timing, 'recovered ingress');
    }
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
