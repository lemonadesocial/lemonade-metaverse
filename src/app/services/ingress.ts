import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Queue, QueueScheduler, Worker } from 'bullmq';

import { logger } from '../helpers/pino';
import { redis } from '../helpers/redis';
import { removeRepeatableByName } from '../utils/bullmq';
import { web3, proxy, jsonERC20, jsonERC721Lemonade } from '../helpers/web3';
import * as enrich from './enrich';
import * as indexer from '../helpers/indexer';

import { OfferModel, Offer } from '../models/offer';
import { StateModel } from '../models/state';

import { GetOffers } from '../../lib/lemonade-marketplace-subgraph/documents.generated';
import { Offer as OfferType, GetOffersQuery, GetOffersQueryVariables } from '../../lib/lemonade-marketplace-subgraph/types.generated';

const JOB_INTERVAL = 1000;
const JOB_NAME = 'ingress';
const LAST_BLOCK_KEY = 'ingress_last_block';
const POLL_FIRST = 1000; // maximum objects returned per query
const QUEUE_NAME = 'ingress';

const durationSeconds = new Histogram({
  name: 'nft_ingress_duration_seconds',
  help: 'Duration of NFT ingress in seconds',
});

type JobData = null;
const queue = new Queue<JobData>(QUEUE_NAME, { connection: redis });
const queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: redis });

const build = async (
  offer: OfferType,
): Promise<Offer> => {
  const currency = proxy(new web3.eth.Contract(jsonERC20, offer.currency), 10000);
  const token = proxy(new web3.eth.Contract(jsonERC721Lemonade, offer.tokenContract));

  const [currency_name, currency_symbol, token_uri] = await Promise.all([
    currency.name<string>(),
    currency.symbol<string>(),
    token.tokenURI<string>(offer.tokenId),
  ]);

  return {
    id: offer.id,
    lastBlock: offer.lastBlock,
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
  const { upsertedIds } = await OfferModel.bulkWrite(
    docs.map<BulkWriteOperation<Offer>>(({ id, ...offer }) => ({
      updateOne: {
        filter: { id },
        update: { $set: offer },
        upsert: true,
      },
    }))
  );

  const upserts = Object
    .keys(upsertedIds || {})
    .map((key) => docs[parseInt(key)]);

  if (upserts.length) {
    await enrich.queue.addBulk(upserts.map((offer) => ({
      name: enrich.JOB_NAME,
      data: {
        id: offer.id,
        token_uri: offer.token_uri,
      },
    })));
  }
};

export const poll = async (
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

export const start = async () => {
  await removeRepeatableByName(queue, JOB_NAME);
  await queue.add(JOB_NAME, null, { repeat: { every: JOB_INTERVAL } });

  const worker = new Worker<JobData>(queue.name, async function () {
    const stopTimer = durationSeconds.startTimer();

    const query = { key: LAST_BLOCK_KEY };
    const state = await StateModel.findOne(query, { value: 1 }).lean<{ value: string }>();

    const lastBlock_gt = state?.value;
    const lastBlock = await poll(lastBlock_gt);

    if (lastBlock && lastBlock !== lastBlock_gt) {
      await StateModel.updateOne(query, { $set: { value: lastBlock } }, { upsert: true });
    }

    stopTimer();
  });

  worker.on('failed', function onFailed(_, error) {
    logger.error(error, 'failed to ingress');
  });
};

export const close = async () => {
  await queue.close();
  await queueScheduler.close();
  await enrich.queue.close();
  indexer.client.stop();
};
