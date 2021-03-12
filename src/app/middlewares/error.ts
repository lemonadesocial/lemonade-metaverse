import { Middleware } from 'koa';

import { AppError } from '../types/errors';

export const errorMiddleware = (): Middleware => {
  return async function errorMiddleware(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err instanceof AppError) {
        ctx.status = err.status;
        ctx.body = { error: { code: err.code } };

        if (err.expose) {
          ctx.body.error.message = err.message;
        }
      } else {
        ctx.status = 500;
        ctx.body = { error: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' } };
      }

      if (ctx.status >= 500) {
        ctx.app.emit('error', err, ctx);
      }
    }
  };
};
