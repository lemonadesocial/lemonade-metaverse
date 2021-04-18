import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';

import { logger } from '../helpers/pino';
import * as enrich from './enrich';
import * as indexer from '../helpers/indexer';

import { OfferModel, Offer } from '../models/offer';
import { StateModel } from '../models/state';

import { GetOffers, StreamOffers } from '../../lib/lemonade-marketplace-subgraph/documents.generated';
import { GetOffersQuery, GetOffersQueryVariables, StreamOffersSubscription, StreamOffersSubscriptionVariables, Offer as OfferType } from '../../lib/lemonade-marketplace-subgraph/types.generated';

const BACKFILL_LAST_BLOCK_KEY = 'backfill_last_block';

const durationSeconds = new Histogram({
  name: 'nft_ingress_duration_seconds',
  help: 'Duration of NFT ingress in seconds',
});

const process = async function (
  offers: OfferType[],
) {
  const stopTimer = durationSeconds.startTimer();

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
      data: {
        id: offer.id,
        token_uri: offer.tokenURI,
      },
    })));
  }

  stopTimer();
};

export const backfill = async () => {
  const state = await StateModel.findOne(
    { key: BACKFILL_LAST_BLOCK_KEY },
    { value: 1 }
  ).lean<{ value: string }>();

  const lastBlock_gt = state?.value;
  let skip = 0;
  const first = 1000;

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
      lastBlock = data.offers[length - 1].lastBlock;
    }
  } while (length);

  if (lastBlock) {
    await StateModel.updateOne(
      { key: BACKFILL_LAST_BLOCK_KEY },
      { $set: { value: lastBlock } },
      { upsert: true },
    );
  }

  return { lastBlock: lastBlock || lastBlock_gt };
};

export const subscribe = (
  lastBlock_gt?: string,
) => {
  const observable = indexer.client.subscribe<StreamOffersSubscription, StreamOffersSubscriptionVariables>({
    query: StreamOffers,
    variables: { lastBlock_gt },
  });

  return observable.subscribe({
    next({ data, errors }) {
      if (errors?.length) {
        logger.error({ errors });
      } else if (data?.offers) {
        logger.debug({ offers: data.offers });

        process(data.offers).catch((error) => {
          logger.error(error, 'failed to process');
        });
      }
    },
    error(error) {
      logger.error(error, 'failed to observe');
    },
  });
};

export const close = async () => {
  indexer.close();
  await enrich.queue.close();
};
