import type { FastifyPluginCallback, RouteHandlerMethod } from 'fastify';

import * as queue from './queue';

import { TokenModel } from '../../models/token';

const handler: RouteHandlerMethod = async (request, reply) => {
  const token = new TokenModel(request.body as Record<string, unknown>);

  await token.validate();

  await queue.enqueue({ token });

  reply.send('OK');
};

export const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.addHook('onReady', async () => {
    await queue.start();
  });

  fastify.addHook('onClose', async () => {
    await queue.stop();
  });

  fastify.post('/enqueue', {
    handler,
    schema: { body: { type: 'object' } },
  });

  done();
};
