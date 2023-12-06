import fastify from 'fastify'

import { logger } from './helpers/pino';

import { prometheusPlugin } from './plugins/prometheus';

import * as enrichQueue from './services/enrich/queue';

export const app = fastify({
  keepAliveTimeout: 70000,
  logger,
  trustProxy: true,
});

app.addHook('onReady', async () => {
  await enrichQueue.start();
});

app.addHook('onClose', async () => {
  await enrichQueue.stop();
});

app.register(prometheusPlugin);

app.get('/livez', async (_, reply) => {
  reply.send('OK');
});
