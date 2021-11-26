import * as assert from 'assert';
import * as prom from 'prom-client';

import { GetMeta } from '../../lib/lemonade-marketplace/documents.generated';
import { GetMetaQuery, GetMetaQueryVariables } from '../../lib/lemonade-marketplace/types.generated';

import { client } from '../helpers/indexer';
import { logger } from '../helpers/pino';
import { provider } from '../helpers/web3';

const POLL_INTERVAL = 1000;

const watchdogDurationSeconds = new prom.Histogram({
  name: 'metaverse_watchdog_duration_seconds',
  help: 'Duration of metaverse watchdog in seconds',
});
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
const watchdogsTotal = new prom.Counter({
  labelNames: ['status'],
  name: 'metaverse_watchdogs_total',
  help: 'Total number of metaverse watchdogs',
});

const query = client.watchQuery<GetMetaQuery, GetMetaQueryVariables>({
  query: GetMeta,
});

let lastIndexerBlock: number | null = null;
let timeout: NodeJS.Timeout | null = null;

async function poll() {
  const start = Date.now();
  const { data: { _meta } } = await query.refetch();

  assert.ok(_meta);

  if (lastIndexerBlock === _meta.block.number) return; // continue if value is different

  const indexedAt = lastIndexerBlock // skip the first trigger as they can not be approximated
    ? start + (Date.now() - start) / 2 - POLL_INTERVAL / 2
    : null;
  lastIndexerBlock = _meta.block.number;

  const [indexerBlock, lastBlockNumber] = await Promise.all([
    provider.getBlock(_meta.block.number),
    provider.getBlockNumber(),
  ]);

  indexedAt && watchdogIndexerDelaySeconds.set(indexedAt / 1000 - indexerBlock.timestamp);
  watchdogIndexerDelayBlocks.set(lastBlockNumber - indexerBlock.number);
  watchdogIndexerError.set(_meta.hasIndexingErrors ? 1 : 0);
}

async function tick() {
  try {
    const watchdogDurationTimer = watchdogDurationSeconds.startTimer();

    await poll();

    watchdogDurationTimer();
    watchdogsTotal.inc({ status: 'success' });
  } catch (err) {
    logger.error(err, 'watchdog failed');
    watchdogsTotal.inc({ status: 'fail' });
  }

  if (timeout) timeout = setTimeout(tick, POLL_INTERVAL);
}

export function start() {
  if (timeout) return;

  timeout = setTimeout(tick, 0);
}

export function stop() {
  if (!timeout) return;

  clearTimeout(timeout);
  lastIndexerBlock = null;
  timeout = null;
}
