import { Middleware } from 'koa';

import { AppError } from '../types';

export const errorMiddleware = (): Middleware => {
  return async function errorMiddleware(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err instanceof AppError) {
        ctx.status = err.status;

        if (err.expose) ctx.body = { error: err.message };
      } else {
        ctx.status = 500;
      }

      if (ctx.status >= 500) {
        ctx.app.emit('error', err, ctx);
      }
    }
  };
};
