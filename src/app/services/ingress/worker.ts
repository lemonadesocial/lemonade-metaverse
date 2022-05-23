import { Counter, Gauge, Histogram } from 'prom-client';
import { Job, JobsOptions, Queue, QueueScheduler, Worker } from 'bullmq';
import type { AnyBulkWriteOperation } from 'mongodb';

import { createToken } from '../token';
import { Network, networks } from '../network';
import * as enrichQueue from '../enrich/queue';

import { connection } from '../../helpers/bullmq';
import { logger } from '../../helpers/pino';
import { pubSub, Trigger } from '../../helpers/pub-sub';

import { Order, OrderKind, OrderModel } from '../../models/order';
import { StateModel } from '../../models/state';
import { Token, TokenModel } from '../../models/token';

import { excludeNull } from '../../utils/object';
import { getDate } from '../../utils/date';
import { getParsedUrl, getWebUrl } from '../../utils/url';

import { Ingress } from '../../../lib/lemonade-marketplace/documents.generated';
import { IngressQuery, IngressQueryVariables } from '../../../lib/lemonade-marketplace/types.generated';

const JOB_DELAY = 1000;
const POLL_FIRST = 1000;

interface JobData {
  meta?: { block: number; hasIndexingErrors: boolean };
  orders_lastBlock_gt?: string;
  tokens_createdAt_gt?: string;
}

interface State {
  name: string;
  network: Network;
  queue: Queue;
  queueScheduler: QueueScheduler;
  worker?: Worker<JobData>;
}

const jobOptions: JobsOptions = {
  attempts: Number.MAX_VALUE,
  backoff: JOB_DELAY,
  delay: JOB_DELAY,
  removeOnComplete: true,
  removeOnFail: true,
};
const states: Record<string, State> = {};

const ingressesTotal = new Counter({
  labelNames: ['network', 'status'],
  name: 'metaverse_ingresses_total',
  help: 'Total number of metaverse ingresses',
});
const ingressDurationSeconds = new Histogram({
  labelNames: ['network'],
  name: 'metaverse_ingress_duration_seconds',
  help: 'Duration of metaverse ingress in seconds',
});
const ingressTimeToRecoverySeconds = new Histogram({
  labelNames: ['network'],
  name: 'metaverse_ingress_time_to_recovery_seconds',
  help: 'Time to recovery of metaverse ingress in seconds',
  buckets: [1, 5, 30, 60, 300, 900, 1800, 3600, 7200, 10800, 14400],
});
const watchdogIndexerDelayBlocks = new Gauge({
  labelNames: ['network'],
  name: 'metaverse_watchdog_indexer_delay_blocks',
  help: 'Delay of metaverse indexer in blocks',
});
const watchdogIndexerDelaySeconds = new Gauge({
  labelNames: ['network'],
  name: 'metaverse_watchdog_indexer_delay_seconds',
  help: 'Delay of metaverse indexer in seconds',
});
const watchdogIndexerError = new Gauge({
  labelNames: ['network'],
  name: 'metaverse_watchdog_indexer_error',
  help: 'Whether there is a metaverse indexer error',
});

async function process(state: State, data: IngressQuery) {
  const orders: Order[] = [];
  const tokenMap: Record<string, Token> = {};

  data.orders?.forEach((item) => {
    const order = {
      network: state.network.name,
      ...excludeNull(item),
      createdAt: getDate(item.createdAt),
      updatedAt: item.updatedAt ? getDate(item.updatedAt) : undefined,
      kind: item.kind as string as OrderKind,
      openFrom: item.openFrom ? getDate(item.openFrom) : undefined,
      openTo: item.openTo ? getDate(item.openTo) : undefined,
      token: item.token.id,
    };
    orders.push(order);

    const token: Token = createToken(state.network, item.token);
    token.order = order.id;
    tokenMap[token.id] = token;
  });

  data.tokens?.forEach((item) => {
    if (tokenMap[item.id]) return;

    const token = createToken(state.network, item);
    tokenMap[token.id] = token;
  });

  const tokens = Object.values(tokenMap);

  const [docs] = await Promise.all([
    tokens.length
      ? TokenModel.find(
        { network: state.network.name, id: { $in: tokens.map(({ id }) => id) }, enrichedAt: { $exists: true } },
        { id: 1, enrichedAt: 1, uri: 1, royalties: 1, metadata: 1 },
      ).lean<Pick<Token, 'id' | 'enrichedAt' | 'uri' | 'royalties' | 'metadata'>[]>()
      : undefined,
    tokens.length
      ? TokenModel.bulkWrite(
        tokens.map<AnyBulkWriteOperation<Token>>(({ id, ...token }) => ({
          updateOne: {
            filter: { network: state.network.name, id },
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
            filter: { network: state.network.name, id },
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
      enrichQueue.enqueue(...missing.map((token) => ({
        orders: orders.filter((order) => order.token === token.id),
        token,
      }))),
    );
  }

  orders.forEach((order) => {
    if (!map[order.token as string]) return; // deligate to enrich

    const token = { ...tokenMap[order.token as string], ...map[order.token as string] };

    logger.info({ order, token, imageUrl: getParsedUrl(token.metadata?.image), webUrl: getWebUrl(token) }, 'ingress order');

    promises.push(
      pubSub.publish(Trigger.OrderUpdated, { ...order, token })
    );

    if (token.order === order.id) {
      promises.push(
        pubSub.publish(Trigger.TokenUpdated, { ...token, order })
      );
    }
  });

  await Promise.all(promises);
}

async function poll(state: State, data: JobData): Promise<JobData> {
  const { orders_lastBlock_gt, tokens_createdAt_gt } = data;
  const nextData = { ...data };

  let orders_skip = 0;
  let orders_first = POLL_FIRST;
  let tokens_skip = 0;
  let tokens_first = POLL_FIRST;
  do {
    const { data } = await state.network.indexer().query<IngressQuery, IngressQueryVariables>({
      query: Ingress,
      variables: {
        orders_include: orders_first > 0,
        orders_lastBlock_gt,
        orders_skip,
        orders_first,
        tokens_include: tokens_first > 0,
        tokens_contract_in: state.network.ingressContracts,
        tokens_createdAt_gt,
        tokens_skip,
        tokens_first,
      },
    });

    if (data._meta) nextData.meta = {
      block: data._meta.block.number,
      hasIndexingErrors: data._meta.hasIndexingErrors,
    };

    const orders_length = data.orders?.length || 0;
    const tokens_length = data.tokens?.length || 0;

    if (orders_length || tokens_length) {
      await process(state, data);

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

async function processor(state: State, { data }: Job<JobData>) {
  const labels = { network: state.network.name };
  const ingressDurationTimer = ingressDurationSeconds.startTimer(labels);

  const nextData = await poll(state, data);
  const now = Date.now();

  await Promise.all([
    (data.orders_lastBlock_gt !== nextData.orders_lastBlock_gt || data.tokens_createdAt_gt !== nextData.tokens_createdAt_gt) &&
      StateModel.updateOne(
        { key: state.name },
        { $set: { value: nextData }, $inc: { __v: 1 } },
        { upsert: true }
      ),
    state.queue.add('*', nextData, jobOptions),
  ]);

  ingressDurationTimer();

  if (nextData.meta) {
    if (nextData.meta.block !== data.meta?.block) {
      const latestBlock = await state.network.provider().getBlockNumber();
      const block = await state.network.provider().getBlock(nextData.meta.block);

      watchdogIndexerDelaySeconds.labels(labels).set((now - block.timestamp * 1000) / 1000);
      watchdogIndexerDelayBlocks.labels(labels).set(latestBlock - block.number);
    }

    watchdogIndexerError.labels(labels).set(nextData.meta.hasIndexingErrors ? 1 : 0);
  }
}

function timing({ timestamp }: Job<JobData>) {
  return {
    secondsElapsed: (Date.now() - timestamp) / 1000,
    timestamp: new Date(timestamp),
  };
}

async function startNetwork(network: Network) {
  const name = `ingress:${network.name}`;
  const state: State = states[network.name] = {
    name,
    network,
    queue: new Queue<JobData>(name, { connection }),
    queueScheduler: new QueueScheduler(name, { connection }),
  };
  await Promise.all([
    state.queue.waitUntilReady(),
    state.queueScheduler.waitUntilReady(),
  ]);

  if (!await state.queue.getJobCountByTypes('wait', 'delayed', 'paused', 'active', 'failed')) {
    const extstate = await StateModel.findOne(
      { key: state.name },
      { value: 1 },
      { lean: true }
    );
    const job = await state.queue.add('*', extstate?.value || {}, jobOptions);
    logger.info(job.asJSON(), 'created ingress job');
  }

  state.worker = new Worker<JobData>(
    name,
    processor.bind(null, state),
    { connection }
  );
  state.worker.on('failed', function onFailed(job: Job<JobData>, err) {
    ingressesTotal.inc({ network: state.network.name, status: 'fail' });
    logger.error({ ...timing(job), err }, 'failed ingress');
  });
  state.worker.on('completed', function onCompleted(job: Job<JobData>) {
    ingressesTotal.inc({ network: state.network.name, status: 'success' });

    if (job.attemptsMade) {
      const obj = timing(job);

      ingressTimeToRecoverySeconds.labels({ network: state.network.name }).observe(obj.secondsElapsed);
      logger.info({ network: state.network.name, ...obj }, 'recovered ingress');
    }
  });
  await state.worker.waitUntilReady();
}

export async function start() {
  await enrichQueue.start();
  await Promise.all(Object.values(networks).map(startNetwork));
}

async function stopNetwork(network: Network) {
  const state = states[network.name];

  if (state.worker) await state.worker.close();
  await state.queue.close();
  await state.queueScheduler.close();
}

export async function stop() {
  await Promise.all(Object.values(networks).map(stopNetwork));
  await enrichQueue.stop();
}
