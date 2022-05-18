import type { FastifyPluginCallback, RouteHandlerMethod } from 'fastify';

import { TokenModel } from '../../models/token';

import * as queue from './queue';

const postEnqueue: RouteHandlerMethod = async (request, reply) => {
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

  fastify.post('/enqueue', { schema: { body: { type: 'object' } } }, postEnqueue);

  done();
};
