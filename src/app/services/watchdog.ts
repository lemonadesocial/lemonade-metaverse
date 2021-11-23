import { ApolloQueryResult, ObservableQuery } from '@apollo/client/core';
import * as assert from 'assert';
import * as prom from 'prom-client';

import { GetMeta } from '../../lib/lemonade-marketplace/documents.generated';
import { GetMetaQuery, GetMetaQueryVariables } from '../../lib/lemonade-marketplace/types.generated';

import { client } from '../helpers/indexer';
import { logger } from '../helpers/pino';
import { provider } from '../helpers/web3';

const POLL_INTERVAL = 1000;

const watchdogIndexerDelayBlocks = new prom.Gauge({
  name: 'metaverse_watchdog_indexer_delay_blocks',
  help: 'Delay of metaverse indexer in blocks',
});
const watchdogIndexerDelaySeconds = new prom.Gauge({
  name: 'metaverse_watchdog_indexer_delay_seconds',
  help: 'Delay of metaverse indexer in seconds',
});
const watchdogIndexerError = new prom.Gauge({
  name: 'metaverse_watchdog_indexer_error',
  help: 'Whether there is a metaverse indexer error',
});

const query = client.watchQuery<GetMetaQuery, GetMetaQueryVariables>({
  query: GetMeta,
  pollInterval: POLL_INTERVAL,
});

let subscription: ReturnType<ObservableQuery['subscribe']> | undefined;
let hasFired = false;

async function onNext({ data: { _meta } }: ApolloQueryResult<GetMetaQuery>) {
  assert.ok(_meta);

  const timestamp = (Date.now() - 0.5 * POLL_INTERVAL) / 1000;
  const [indexerBlock, lastBlockNumber] = await Promise.all([
    provider.getBlock(_meta.block.number),
    provider.getBlockNumber(),
  ]);

  watchdogIndexerDelayBlocks.set(lastBlockNumber - indexerBlock.number);

  if (hasFired) {
    /**
     * Skip the first trigger because only subsequent triggers represent actual changes at the indexer,
     * for which we can approximate the time of change by the current time (with the poll interval as error).
     */

    watchdogIndexerDelaySeconds.set(timestamp - indexerBlock.timestamp);
  } else hasFired = true;

  watchdogIndexerError.set(_meta.hasIndexingErrors ? 1 : 0);
}

function onError(err: Error) {
  logger.error(err, 'watchdog query failed');
}

export function start() {
  subscription = query.subscribe(onNext, onError);
}

export function stop() {
  if (!subscription || subscription.closed) return;

  subscription.unsubscribe();
}
