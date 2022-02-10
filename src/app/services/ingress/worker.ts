import { AnyBulkWriteOperation } from 'mongodb';
import { Counter, Histogram } from 'prom-client';
import { Job, JobsOptions, Processor, Queue, QueueScheduler, Worker } from 'bullmq';

import { createConnection } from '../../helpers/bullmq';
import { createToken } from '../token';
import { excludeNull } from '../../utils/object';
import { getDate } from '../../utils/date';
import { getParsedUrl, getWebUrl } from '../../utils/url';
import { logger } from '../../helpers/pino';
import { pubSub, Trigger } from '../../helpers/pub-sub';
import * as enrich from '../enrich/queue';
import * as indexer from '../../helpers/indexer';

import { Order, OrderKind, OrderModel } from '../../models/order';
import { StateModel } from '../../models/state';
import { Token, TokenModel } from '../../models/token';

import { Ingress } from '../../../lib/lemonade-marketplace/documents.generated';
import { IngressQuery, IngressQueryVariables } from '../../../lib/lemonade-marketplace/types.generated';

import { isProduction } from '../../../config';

const JOB_DELAY = 1000;
const POLL_FIRST = 1000;
const POLL_TOKENS_CONTRACTS_IN = isProduction
  ? ['0x7254e06afb533964b389be742524fa696a290c81', '0x94f73287bc1667f5472485a7bf2bfadc639436c8', '0x069751D80a3b3B3948d4c511F7498C8BceD8a92e', '0x20a8f0a2535f21bc3b7ee2ed634a6550f23b1ebb']
  : ['0x7254e06afb533964b389be742524fa696a290c81', '0x71deb1a1cfae375ef779b8d4f39f145ab07aa66c', '0x3973F56ba966BFEb7B0FC88365DD61CFa25A3810', '0x94f73287bc1667f5472485a7bf2bfadc639436c8'];
const QUEUE_NAME = 'bullmq:ingress';
const STATE_KEY = 'ingress';

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
  backoff: JOB_DELAY,
  delay: JOB_DELAY,
  removeOnComplete: true,
  removeOnFail: true,
};

async function process(data: IngressQuery) {
  const orders: Order[] = [];
  const ordersToken: Record<string, Token> = {};
  const tokens: Token[] = [];
  const tokensOrders: Record<string, Order[]> = {};

  data.orders?.forEach((item) => {
    const order = {
      ...excludeNull(item),
      createdAt: getDate(item.createdAt),
      kind: item.kind as string as OrderKind,
      openFrom: item.openFrom ? getDate(item.openFrom) : undefined,
      openTo: item.openTo ? getDate(item.openTo) : undefined,
      token: item.token.id,
    };

    const token = createToken(item.token);

    orders.push(order);
    ordersToken[order.id] = token;

    if (tokensOrders[token.id]) { // multiple orders can have the same token, which are all closed except potentially the last
      tokensOrders[token.id].push(order);
    } else {
      tokens.push(token);
      tokensOrders[token.id] = [order];
    }
  });

  data.tokens?.forEach((item) => {
    if (tokensOrders[item.id]) return; // when processing data of multiple blocks, the token can be in both tokens and orders

    const token = createToken(item);

    tokens.push(token);
  });

  const [docs] = await Promise.all([
    tokens.length
      ? TokenModel.find(
        { id: { $in: tokens.map(({ id }) => id) }, enrichedAt: { $exists: true } },
        { id: 1, enrichedAt: 1, uri: 1, royalties: 1, metadata: 1 },
      ).lean<Pick<Token, 'id' | 'enrichedAt' | 'uri' | 'royalties' | 'metadata'>[]>()
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

  const missing = tokens.filter((token) => !map[token.id]);
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

    const token = { ...ordersToken[order.id], ...map[order.token] };

    logger.info({ order, token, imageUrl: getParsedUrl(token.metadata?.image), webUrl: getWebUrl(token) }, 'ingress order');

    promises.push(
      pubSub.publish(Trigger.OrderUpdated, { ...order, token })
    );
  });

  await Promise.all(promises);
}

async function poll(data: JobData): Promise<JobData> {
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
        tokens_contract_in: POLL_TOKENS_CONTRACTS_IN,
        tokens_createdAt_gt,
        tokens_skip,
        tokens_first,
      },
    });

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
}

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
    hasChanged ? StateModel.updateOne({ key: STATE_KEY }, { $set: { value: nextData } }, { upsert: true }) : null,
    queue!.add('*', nextData, jobOptions),
  ]);

  ingressDurationTimer();
};

function getJobTiming({ timestamp }: Job<JobData>) {
  return {
    secondsElapsed: (Date.now() - timestamp) / 1000,
    timestamp: new Date(timestamp),
  };
}

export async function start(): Promise<void> {
  queue = new Queue<JobData>(QUEUE_NAME, { connection: createConnection() });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: createConnection() });
  await Promise.all([
    enrich.waitUntilReady(),
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);

  if (!await queue.getJobCountByTypes('wait', 'delayed', 'paused', 'active', 'failed')) {
    const state = await StateModel.findOne({ key: STATE_KEY }, { value: 1 }, { lean: true });
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
}

export async function stop(): Promise<void> {
  if (worker) await worker.close();
  indexer.stop();

  await enrich.close();
  if (queue) await queue.close();
  if (queueScheduler) await queueScheduler.close();
}
