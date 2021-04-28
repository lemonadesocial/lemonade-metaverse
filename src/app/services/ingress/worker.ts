import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Processor, Queue, QueueScheduler, Worker } from 'bullmq';
import Redis from 'ioredis';

import { logger } from '../../helpers/pino';
import { pubSub } from '../../helpers/pub-sub';
import * as enrich from '../enrich/queue';
import * as indexer from '../../helpers/indexer';
import * as web3 from '../../helpers/web3';

import { OfferModel, Offer } from '../../models/offer';
import { StateModel } from '../../models/state';

import { GetOffers } from '../../../lib/lemonade-marketplace-subgraph/documents.generated';
import { Offer as OfferType, GetOffersQuery, GetOffersQueryVariables } from '../../../lib/lemonade-marketplace-subgraph/types.generated';

import { redisUri } from '../../../config';

const JOB_INTERVAL = 1000;
const JOB_NAME = 'ingress';
const LAST_BLOCK_KEY = 'ingress_last_block';
const POLL_FIRST = 1000; // maximum objects returned per query
const QUEUE_NAME = 'ingress';

type JobData = null;

const durationSeconds = new Histogram({
  name: 'metaverse_ingress_duration_seconds',
  help: 'Duration of metaverse ingress in seconds',
});

const build = async (
  offer: OfferType,
): Promise<Offer> => {
  const currency = web3.proxy(new web3.web3.eth.Contract(web3.jsonERC20, offer.currency), 10000);
  const token = web3.proxy(new web3.web3.eth.Contract(web3.jsonERC721Lemonade, offer.tokenContract));

  const [currency_name, currency_symbol, token_uri] = await Promise.all([
    currency.name<string>(),
    currency.symbol<string>(),
    token.tokenURI<string>(offer.tokenId),
  ]);

  return {
    id: offer.id,
    last_block: offer.lastBlock,
    created_at: new Date(parseInt(offer.createdAt) * 1000),
    offer_contract: offer.offerContract,
    offer_id: offer.offerId,
    active: offer.active,
    seller: offer.seller,
    currency_contract: offer.currency,
    currency_name,
    currency_symbol,
    price: offer.price,
    token_contract: offer.tokenContract,
    token_id: offer.tokenId,
    token_uri,
    buyer: offer.buyer || undefined,
  };
}

const process = async function (
  offers: OfferType[],
) {
  const results = await Promise.all(offers.map(async (offer) => {
    try {
      return await build(offer);
    } catch (e) {
      logger.warn(e);
      return null;
    }
  }));

  const docs = results.filter((result) => result !== null) as Offer[];
  const { upsertedIds = {} } = await OfferModel.bulkWrite(
    docs.map<BulkWriteOperation<Offer>>(({ id, ...offer }) => ({
      updateOne: {
        filter: { id },
        update: { $set: offer },
        upsert: true,
      },
    }))
  );

  const promises: Promise<any>[] = [];

  const upserts = Object.keys(upsertedIds).map((key) => docs[parseInt(key)]);
  if (upserts.length) {
    promises.push(
      enrich.queue.addBulk(upserts.map((offer) => ({
        name: 'enrich',
        data: {
          id: offer.id,
          token_uri: offer.token_uri,
        },
      })))
    );
  }

  const updates = docs.filter((_, i) => !upsertedIds[i]);
  if (updates.length) {
    promises.push(...updates.map((offer) =>
      pubSub.publish('offer_updated', offer)
    ));
  }

  await Promise.all(promises);
};

const poll = async (
  lastBlock_gt?: string,
) => {
  let skip = 0;
  const first = POLL_FIRST;

  let length = 0;
  let lastBlock: string | undefined;
  do {
    const { data } = await indexer.client.query<GetOffersQuery, GetOffersQueryVariables>({
      query: GetOffers,
      variables: { lastBlock_gt, skip, first },
    });

    length = data?.offers?.length || 0;
    logger.debug({ skip, first, length });

    if (length) {
      await process(data.offers);

      skip += first;
      lastBlock = data.offers[length - 1].lastBlock; // requires asc sort on lastBlock
    }
  } while (length);

  return lastBlock;
};

const processor: Processor<JobData> = async () => {
  const stopTimer = durationSeconds.startTimer();

  const query = { key: LAST_BLOCK_KEY };
  const state = await StateModel.findOne(query, { value: 1 }).lean<{ value: string }>();

  const lastBlock_gt = state?.value;
  const lastBlock = await poll(lastBlock_gt);

  if (lastBlock && lastBlock !== lastBlock_gt) {
    await StateModel.updateOne(query, { $set: { value: lastBlock } }, { upsert: true });
  }

  stopTimer();
};

let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

export const bootstrap = async () => {
  const queue = new Queue(QUEUE_NAME, { connection: new Redis(redisUri) });
  try {
    await queue.waitUntilReady();

    const repeatableJobs = await queue.getRepeatableJobs();
    const jobs = repeatableJobs.filter((job) => job.name === JOB_NAME);

    if (jobs.length) {
      await Promise.all(jobs.map((job) =>
        queue.removeRepeatableByKey(job.key)
      ));
    }

    await queue.add(JOB_NAME, null, { repeat: { every: JOB_INTERVAL } });
  } finally {
    await queue.close();
  }
};

export const start = async () => {
  await enrich.waitUntilReady();

  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUri) });
  await queueScheduler.waitUntilReady();

  worker = new Worker<JobData>(QUEUE_NAME, processor, { connection: new Redis(redisUri) });
  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to ingress');
  });
  await worker.waitUntilReady();
};

export const stop = async () => {
  if (worker) await worker.close();
  indexer.stop();
  web3.disconnect();

  if (queueScheduler) await queueScheduler.close();

  await enrich.close();
};
