import Koa from 'koa';

import { logger } from './helpers/pino';

import { errorMiddleware } from './middlewares/error';
import { loggerMiddleware } from './middlewares/logger';
import { prometheusMiddleware } from './middlewares/prometheus';

import { router } from './routers';

import { State, Context, ParameterizedContext } from './types';

export const app = new Koa<State, Context>();

app.proxy = true;

app.use(errorMiddleware());
app.use(prometheusMiddleware());
app.use(loggerMiddleware());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (error: Error, ctx?: ParameterizedContext) => {
  if (ctx?.state.logger) ctx.state.logger.error(error);
  else logger.error(error);
});
