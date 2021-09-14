#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import { ApolloServer } from 'apollo-server-koa';
import { pino } from 'pino';
import * as http from 'http';
import * as prom from 'prom-client';
import * as util from 'util';

import { app } from '../app';
import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as metrics from '../app/services/metrics';
import * as redis from '../app/helpers/redis';

import { appPort, sourceVersion } from '../config';

import { createApolloServer } from '../graphql';

let apolloServer: ApolloServer | undefined;

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
    if (apolloServer) await apolloServer.stop();

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
  const httpServer = http.createServer(app.callback());
  apolloServer = createApolloServer(httpServer);

  metrics.start();
  await Promise.all([
    apolloServer.start(),
    db.connect(),
  ]);

  apolloServer.applyMiddleware({ app });

  httpServer.listen(appPort, function onListening() {
    logger.info({ version: sourceVersion }, 'metaverse app started');
  });

  const getServerConnections = util
    .promisify(httpServer.getConnections)
    .bind(httpServer);

  new prom.Gauge({
    name: 'http_open_connections',
    help: 'Number of open HTTP connections',
    collect: async function() { this.set(await getServerConnections()); },
  });
};

main().catch(fatalHandler);
