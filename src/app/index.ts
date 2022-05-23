import fastify from 'fastify'

import { prometheusPlugin } from './plugins/prometheus';

import * as enrichQueue from './services/enrich/queue';

export const app = fastify({
  logger: true,
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
