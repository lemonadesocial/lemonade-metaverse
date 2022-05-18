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

import { sourceVersion } from '../config';

process.on('uncaughtException', (err) => {
  logger.error(err, 'uncaughtException');
});

process.on('uncaughtRejection', (err) => {
  logger.error(err, 'uncaughtRejection');
});

async function shutdown() {
  try {
    await enrichWorker.stop();

    redis.disconnect();
    await Promise.all([
      admin.stop(),
      db.disconnect(),
      network.close(),
    ]);
  } catch (err: any) {
    logger.fatal(err);
    process.exit(1);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function main() {
  admin.register(enrichAdmin.plugin);

  await admin.start();
  await db.connect();
  await network.init();

  await enrichWorker.start();

  logger.info({ version: sourceVersion }, 'metaverse enrich started');
}

void main();
