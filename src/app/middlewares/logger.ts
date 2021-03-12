import { Middleware } from 'koa';

import { logger } from '../helpers/pino';

import { Context, State } from '../types';

export const loggerMiddleware = (): Middleware<State, Context> => {
  return async function loggerMiddleware(ctx, next) {
    ctx.state.logger = logger.child({
      method: ctx.method,
      path: ctx.path,
      userAgent: ctx.headers['user-agent'],
    });

    await next();
  };
};
