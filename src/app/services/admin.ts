import * as prom from 'prom-client';
import fastify from 'fastify'

import { adminPort } from '../../config';

const app = fastify({ logger: true });

app.get('/metrics', async (_, reply) => {
  const payload = await prom.register.metrics();

  reply.type(prom.register.contentType).send(payload);
});

export async function start() {
  prom.collectDefaultMetrics();

  if (adminPort) {
    await app.listen(adminPort, '0.0.0.0');
  }
}

export async function stop() {
  await app.close();
}
