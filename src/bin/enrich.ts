#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';

import { logger } from '../app/helpers/pino';
import * as admin from '../app/services/admin';
import * as db from '../app/helpers/db';
import * as enrich from '../app/services/enrich/worker';
import * as network from '../app/services/network';
import * as redis from '../app/helpers/redis';

import { sourceVersion } from '../config';

process.on('uncaughtException', (err) => {
  logger.error(err, 'uncaughtException');
});

process.on('uncaughtRejection', (err) => {
  logger.error(err, 'uncaughtRejection');
});

async function shutdown() {
  try {
    await enrich.stop();

    redis.disconnect();
    await Promise.all([
      admin.stop(),
      db.disconnect(),
      network.close(),
    ]);

    process.exit(0);
  } catch (err: any) {
    logger.fatal(err);
    process.exit(1);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function main() {
  await admin.start();
  await db.connect();
  await network.init();

  await enrich.start();

  logger.info({ version: sourceVersion }, 'metaverse enrich started');
}

void main();
