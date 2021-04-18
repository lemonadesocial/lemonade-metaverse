#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import * as pino from 'pino';
import * as prom from 'prom-client';
import * as util from 'util';

import { app } from '../app';
import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as redis from '../app/helpers/redis';

import * as graphql from '../graphql';

import { port, sourceVersion } from '../config';

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

let httpTerminator: HttpTerminator;

const shutdown = async () => {
  try {
    if (httpTerminator) await httpTerminator.terminate();

    await db.disconnect();
    redis.disconnect();

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

process.on('SIGUSR2', async function onSigusr2Signal() {
  await shutdown();
});

const main = async () => {
  await db.connect();

  const server = app.listen(port, function onListening() {
    logger.info('NFT app started - version %s', sourceVersion)
  });

  httpTerminator = createHttpTerminator({ server });

  const getServerConnections = util
    .promisify(server.getConnections)
    .bind(server);

  new prom.Gauge({
    name: 'http_open_connections',
    help: 'Number of open HTTP connections',
    collect: async function() { this.set(await getServerConnections()); },
  });

  const graphqlServer = await graphql.createServer();

  graphqlServer.applyMiddleware({ app: app as any });
};

main().catch(fatalHandler);
