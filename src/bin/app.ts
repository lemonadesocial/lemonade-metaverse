#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import { pino } from 'pino';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as prom from 'prom-client';
import * as util from 'util';

import { app } from '../app';
import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as metrics from '../app/services/metrics';
import * as redis from '../app/helpers/redis';

import { apolloServer, createSubscriptionServer } from '../graphql';

import { appPort, sourceVersion } from '../config';

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

let httpTerminator: HttpTerminator | undefined;
let subscriptionServer: SubscriptionServer | undefined;

const shutdown = async () => {
  try {
    if (subscriptionServer) subscriptionServer.close();
    if (httpTerminator) await httpTerminator.terminate();

    redis.disconnect();
    await Promise.all([
      apolloServer.stop(),
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
  await Promise.all([
    apolloServer.start(),
    db.connect(),
  ]);

  const server = app.listen(appPort, function onListening() {
    logger.info({ version: sourceVersion }, 'metaverse app started');
  });

  apolloServer.applyMiddleware({ app });

  httpTerminator = createHttpTerminator({ server });
  subscriptionServer = createSubscriptionServer(server);

  const getServerConnections = util
    .promisify(server.getConnections)
    .bind(server);

  new prom.Gauge({
    name: 'http_open_connections',
    help: 'Number of open HTTP connections',
    collect: async function() { this.set(await getServerConnections()); },
  });
};

main().catch(fatalHandler);
