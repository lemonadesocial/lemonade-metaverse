#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import { pino } from 'pino';

import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as ingress from '../app/services/ingress/worker';
import * as metrics from '../app/services/metrics';
import * as redis from '../app/helpers/redis';

import { sourceVersion } from '../config';

const errorHandler = pino.final(logger, function handler(err, logger, event: string) {
  logger.error(err, event);
});

process.on('uncaughtException', function onUncaughtException(err) {
  errorHandler(err, 'uncaughtException');
});

process.on('uncaughtRejection', function onUncaughtRejection(err) {
  errorHandler(err, 'uncaughtRejection');
});

const fatalHandler = pino.final(logger, function handler(err, logger) {
  logger.fatal(err);
  process.exit(1);
});

const shutdown = async () => {
  try {
    await ingress.stop();

    redis.disconnect();
    await Promise.all([
      db.disconnect(),
      metrics.stop(),
    ]);

    process.exit(0);
  } catch (err) {
    fatalHandler(err);
  }
};

process.on('SIGINT', async function onSigintSignal() {
  await shutdown();
});

process.on('SIGTERM', async function onSigtermSignal() {
  await shutdown();
});

const main = async () => {
  metrics.start();
  await db.connect();

  await ingress.start();

  logger.info({ version: sourceVersion }, 'metaverse ingress started');
};

main().catch(fatalHandler);
