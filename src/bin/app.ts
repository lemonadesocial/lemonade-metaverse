#!/usr/bin/env node
import 'reflect-metadata';
import 'source-map-support/register';
import { ApolloServer } from 'apollo-server-koa';
import * as http from 'http';
import * as prom from 'prom-client';
import * as util from 'util';

import { app } from '../app';
import { logger } from '../app/helpers/pino';
import * as db from '../app/helpers/db';
import * as metrics from '../app/services/metrics';
import * as redis from '../app/helpers/redis';
import * as watchdog from '../app/services/watchdog';

import { appPort, sourceVersion } from '../config';

import { createApolloServer } from '../graphql';

let apolloServer: ApolloServer | undefined;

process.on('uncaughtException', function onUncaughtException(err) {
  logger.error(err, 'uncaughtException');
});

process.on('uncaughtRejection', function onUncaughtRejection(err) {
  logger.error(err, 'uncaughtRejection');
});

const shutdown = async () => {
  try {
    if (apolloServer) await apolloServer.stop();

    redis.disconnect();
    await Promise.all([
      db.disconnect(),
      metrics.stop(),
      watchdog.stop(),
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
  const httpServer = http.createServer(app.callback());
  httpServer.keepAliveTimeout = 400 * 1000;

  apolloServer = createApolloServer(httpServer);

  metrics.start();
  await Promise.all([
    apolloServer.start(),
    db.connect(),
    watchdog.start(),
  ]);

  apolloServer.applyMiddleware({ app, cors: {} });

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

void main();
