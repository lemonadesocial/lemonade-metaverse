#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import * as pino from 'pino';

import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as ingress from '../app/services/ingress';

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
    await ingress.close();
    await db.disconnect();

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
  await db.connect();
  await ingress.start();

  logger.info('NFT ingress started - version %s', sourceVersion);
};

main().catch(fatalHandler);
