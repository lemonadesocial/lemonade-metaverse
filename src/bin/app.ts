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
import * as network from '../app/services/network';

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

  const server = http.createServer(app.callback());
  server.keepAliveTimeout = 400 * 1000;

  apolloServer = createApolloServer(server);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: {} });

  server.listen(appPort, function onListening() {
    logger.info({ version: sourceVersion }, 'metaverse app started');
  });

  const getServerConnections = util.promisify(server.getConnections).bind(server);

  new prom.Gauge({
    name: 'http_open_connections',
    help: 'Number of open HTTP connections',
    collect: async function() { this.set(await getServerConnections()); },
  });
};

void main();
