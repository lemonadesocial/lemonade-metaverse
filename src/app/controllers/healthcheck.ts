import { Middleware } from '@koa/router';

export const get: Middleware = (ctx) => {
  ctx.status = 200;
};
