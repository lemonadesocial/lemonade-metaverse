import { BulkWriteOperation, FilterQuery } from 'mongodb';
import { Counter, Histogram } from 'prom-client';
import { JobsOptions, Processor, Queue, QueueScheduler, Worker } from 'bullmq';
import Redis from 'ioredis';

import { logger } from '../../helpers/pino';
import { pubSub } from '../../helpers/pub-sub';
import * as enrich from '../enrich/queue';
import * as indexer from '../../helpers/indexer';
import * as web3 from '../../helpers/web3';

import { Order, OrderModel } from '../../models/order';
import { State, StateModel } from '../../models/state';

import { GetOrders } from '../../../lib/lemonade-marketplace-subgraph/documents.generated';
import { GetOrdersQuery, GetOrdersQueryVariables, Order as OrderType } from '../../../lib/lemonade-marketplace-subgraph/types.generated';

import { redisUri } from '../../../config';

const CURRENCY_TTL = 10000;
const JOB_NAME = 'ingress';
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
  backoff: 2000,
  delay: 1000,
  removeOnComplete: true,
  removeOnFail: true,
};
const stateQuery: FilterQuery<State> = {
  key: 'ingress_last_block',
};

const build = async (
  order: OrderType,
): Promise<Order> => {
  const currency = web3.proxy(new web3.web3.eth.Contract(web3.jsonERC20, order.currency), CURRENCY_TTL);
  const token = web3.proxy(new web3.web3.eth.Contract(web3.jsonERC721Lemonade, order.tokenContract));

  const [currency_name, currency_symbol, token_uri] = await Promise.all([
    currency.name<string>(),
    currency.symbol<string>(),
    token.tokenURI<string>(order.tokenId),
  ]);

  return {
    id: order.id,
    last_block: order.lastBlock,
    created_at: new Date(parseInt(order.createdAt) * 1000),
    order_contract: order.orderContract,
    order_id: order.orderId,
    open: order.open,
    maker: order.maker,
    currency_contract: order.currency,
    currency_name,
    currency_symbol,
    price: order.price,
    priceIsMinimum: order.priceIsMinimum,
    token_contract: order.tokenContract,
    token_id: order.tokenId,
    token_uri,
    taker: order.taker || undefined,
    paid_amount: order.paidAmount || undefined,
  };
}

const process = async (
  orders: OrderType[],
) => {
  const results = await Promise.all(orders.map(async (order) => {
    try {
      const result = await build(order);
      logger.info(result, 'ingress');
      return result;
    } catch (e) {
      logger.warn(e);
      return null;
    }
  }));

  const docs = results.filter((result) => result !== null) as Order[];
  const { upsertedIds = {} } = await OrderModel.bulkWrite(
    docs.map<BulkWriteOperation<Order>>(({ id, ...order }) => ({
      updateOne: {
        filter: { id },
        update: { $set: order },
        upsert: true,
      },
    }))
  );

  const promises: Promise<any>[] = [];

  const upserts = Object.keys(upsertedIds).map((key) => docs[parseInt(key)]);
  if (upserts.length) {
    promises.push(
      enrich.enqueue(...upserts.map((order) => ({
        order,
        upserted: true,
      })))
    );
  }

  const updates = docs.filter((_, i) => !upsertedIds[i]);
  if (updates.length) {
    promises.push(...updates.map((order) =>
      pubSub.publish('order_updated', order)
    ));
  }

  await Promise.all(promises);
};

const poll = async (
  lastBlock_gt?: string,
) => {
  let skip = 0;
  const first = POLL_FIRST;

  let lastBlock: string | undefined;
  let length = 0;
  do {
    const { data } = await indexer.client.query<GetOrdersQuery, GetOrdersQueryVariables>({
      query: GetOrders,
      variables: { lastBlock_gt, skip, first },
      fetchPolicy: 'no-cache',
    });

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

const processor: Processor<JobData> = async (
  { data: { lastBlock_gt } },
) => {
  const stopTimer = ingressDurationSeconds.startTimer();

  try {
    const lastBlock = await poll(lastBlock_gt);

    await Promise.all([
      lastBlock && lastBlock !== lastBlock_gt
        ? StateModel.updateOne(stateQuery, { $set: { value: lastBlock } }, { upsert: true })
        : null,
      queue
        ? queue.add(JOB_NAME, { lastBlock_gt: lastBlock || lastBlock_gt }, jobOptions)
        : null,
    ]);

    ingressesTotal.labels('success').inc();

    stopTimer();
  } catch (err) {
    ingressesTotal.labels('fail').inc();

    throw err;
  }
};

export const start = async (): Promise<void> => {
  queue = new Queue<JobData>(QUEUE_NAME, {
    connection: new Redis(redisUri),
  });
  queueScheduler = new QueueScheduler(QUEUE_NAME, {
    connection: new Redis(redisUri),
  });
  await Promise.all([
    enrich.waitUntilReady(),
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);

  if (!await queue.count()) {
    const state = await StateModel.findOne(stateQuery, { value: 1 }, { lean: true });
    const job = await queue.add(JOB_NAME, { lastBlock_gt: state?.value }, jobOptions);
    logger.info(job.asJSON(), 'created ingress job');
  }

  worker = new Worker<JobData>(QUEUE_NAME, processor, {
    connection: new Redis(redisUri),
  });
  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to ingress');
  });
  await worker.waitUntilReady();
};

export const stop = async (): Promise<void> => {
  if (worker) await worker.close();
  indexer.stop();
  web3.disconnect();

  await enrich.close();
  if (queue) await queue.close();
  if (queueScheduler) await queueScheduler.close();
};
