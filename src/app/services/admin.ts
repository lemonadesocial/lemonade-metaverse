import * as prom from 'prom-client';
import fastify, { FastifyPluginCallback } from 'fastify'

import { adminPort } from '../../config';

export const app = fastify({
  logger: true,
  trustProxy: true,
});

app.get('/metrics', async (_, reply) => {
  const payload = await prom.register.metrics();

  reply.type(prom.register.contentType).send(payload);
});

export function register(plugin: FastifyPluginCallback) {
  app.register(plugin);
}

export async function start() {
  prom.collectDefaultMetrics();

  if (adminPort) {
    await app.listen(adminPort, '0.0.0.0');
  }
}

export async function stop() {
  await app.close();
}
