import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import { Queue, QueueScheduler, Worker } from 'bullmq';

import { logger } from '../helpers/pino';
import { redis } from '../helpers/redis';
import { removeRepeatableByName } from '../utils/bullmq';
import * as enrich from './enrich';
import * as indexer from '../helpers/indexer';

import { OfferModel, Offer } from '../models/offer';
import { StateModel } from '../models/state';

import { GetOffers } from '../../lib/lemonade-marketplace-subgraph/documents.generated';
import { GetOffersQuery, GetOffersQueryVariables } from '../../lib/lemonade-marketplace-subgraph/types.generated';

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

const process = async function (
  offers: GetOffersQuery['offers'],
) {
  const { upsertedIds } = await OfferModel.bulkWrite(offers.map<BulkWriteOperation<Offer>>((offer) => ({
    updateOne: {
      filter: { id: offer.id },
      update: {
        $set: {
          lastBlock: offer.lastBlock,
          created_at: new Date(parseInt(offers[0].createdAt) * 1000),
          offer_contract: offer.offerContract,
          offer_id: offer.offerId,
          token_uri: offer.tokenURI,
          active: offer.active,
          seller: offer.seller,
          currency: offer.currency,
          price: offer.price,
          token_contract: offer.tokenContract,
          token_id: offer.tokenId,
          buyer: offer.buyer || undefined,
        },
      },
      upsert: true,
    },
  })));

  const upserts = Object
    .keys(upsertedIds || {})
    .map((key) => offers[parseInt(key)]);

  if (upserts.length) {
    await enrich.queue.addBulk(upserts.map((offer) => ({
      name: enrich.JOB_NAME,
      data: {
        id: offer.id,
        token_uri: offer.tokenURI,
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

  new Worker<JobData>(queue.name, async function () {
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
};

export const close = async () => {
  await queue.close();
  await queueScheduler.close();
  await enrich.queue.close();
  indexer.client.stop();
};
