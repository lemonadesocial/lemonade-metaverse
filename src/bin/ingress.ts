#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';

import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as ingress from '../app/services/ingress/worker';
import * as metrics from '../app/services/metrics';
import * as network from '../app/services/network';
import * as redis from '../app/helpers/redis';

import { sourceVersion } from '../config';

process.on('uncaughtException', function onUncaughtException(err) {
  logger.error(err, 'uncaughtException');
});

process.on('uncaughtRejection', function onUncaughtRejection(err) {
  logger.error(err, 'uncaughtRejection');
});

const shutdown = async () => {
  try {
    await ingress.stop();

    redis.disconnect();
    await Promise.all([
      db.disconnect(),
      metrics.stop(),
      network.close(),
    ]);

    process.exit(0);
  } catch (err: any) {
    logger.fatal(err);
    process.exit(1);
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
  await network.init();

  await ingress.start();

  logger.info({ version: sourceVersion }, 'metaverse ingress started');
};

void main();
