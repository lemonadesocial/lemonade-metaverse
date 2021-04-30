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

const CURRENCY_TTL = 10000; // the duration that ERC20 data stays cached
const JOB_NAME = 'ingress';
const POLL_FIRST = 1000; // maximum objects returned per query
const QUEUE_NAME = 'ingress';

type JobData = { lastBlock_gt?: string };

const durationSeconds = new Histogram({
  name: 'metaverse_ingress_duration_seconds',
  help: 'Duration of metaverse ingress in seconds',
});

const jobOptions = { delay: 1000 };
const stateQuery = { key: 'ingress_last_block' };

const build = async (
  offer: OfferType,
): Promise<Offer> => {
  const currency = web3.proxy(new web3.web3.eth.Contract(web3.jsonERC20, offer.currency), CURRENCY_TTL);
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
        data: { offer, upserted: true },
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

  let lastBlock: string | undefined;
  let length = 0;
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

let queue: Queue | undefined;
let queueScheduler: QueueScheduler | undefined;
let worker: Worker<JobData> | undefined;

const processor: Processor<JobData> = async (job) => {
  const stopTimer = durationSeconds.startTimer();

  const { lastBlock_gt } = job.data;
  const lastBlock = await poll(lastBlock_gt);

  await Promise.all([
    lastBlock && lastBlock !== lastBlock_gt
      ? StateModel.updateOne(stateQuery, { $set: { value: lastBlock } }, { upsert: true })
      : null,
    queue
      ? queue.add(JOB_NAME, { lastBlock_gt: lastBlock || lastBlock_gt }, jobOptions)
      : null,
  ]);

  stopTimer();
};

export const start = async () => {
  queue = new Queue<JobData>(QUEUE_NAME, { connection: new Redis(redisUri) });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUri) });
  await Promise.all([
    enrich.waitUntilReady(),
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);

  const count = await queue
    .getJobCounts('active', 'waiting')
    .then((counts) => Object.values(counts).reduce((acc, cur) => acc + cur, 0));
  if (!count) {
    const state = await StateModel.findOne(stateQuery, { value: 1 }).lean<{ value: string }>();
    const job = await queue.add(JOB_NAME, { lastBlock_gt: state?.value }, jobOptions);
    logger.info(job.asJSON(), 'created ingress job');
  }

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

  await enrich.close();
  if (queue) await queue.close();
  if (queueScheduler) await queueScheduler.close();
};
