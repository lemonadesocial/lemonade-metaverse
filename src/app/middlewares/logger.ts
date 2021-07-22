import { Middleware } from 'koa';

import { logger } from '../helpers/pino';

import { Context, State } from '../types';

export const loggerMiddleware = (): Middleware<State, Context> => {
  return async function loggerMiddleware(ctx, next) {
    const { method, path, headers } = ctx;

    ctx.state.logger = logger.child({
      method,
      path,
      userAgent: headers['user-agent'],
    });

    await next();
  };
};
