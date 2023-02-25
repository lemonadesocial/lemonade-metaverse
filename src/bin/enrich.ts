#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';

import { logger } from '../app/helpers/pino';
import * as admin from '../app/services/admin';
import * as db from '../app/helpers/db';
import * as network from '../app/services/network';
import * as redis from '../app/helpers/redis';

import * as enrichAdmin from '../app/services/enrich/admin';
import * as enrichWorker from '../app/services/enrich/worker';

process.on('uncaughtException', (err) => {
  logger.error(err, 'uncaughtException');
});

process.on('uncaughtRejection', (err) => {
  logger.error(err, 'uncaughtRejection');
});

async function shutdown() {
  try {
    await admin.stop();

    await enrichWorker.stop();

    await redis.quit();
    await network.close();
    await db.disconnect();
  } catch (err) {
    logger.fatal(err);
    process.exit(1);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function main() {
  await db.connect();
  await network.init();

  await enrichWorker.start();

  admin.register(enrichAdmin.plugin);

  await admin.start();

  logger.info('metaverse enrich started');
}

void main();
