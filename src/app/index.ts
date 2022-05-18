import fastify from 'fastify'

import { prometheusPlugin } from './plugins/prometheus';

export const app = fastify({ logger: true });

app.register(prometheusPlugin);

app.get('/livez', async (_, reply) => {
  reply.send('OK');
});
