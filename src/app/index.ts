import Koa from 'koa';

import { loggerMiddleware } from './middlewares/logger';
import { prometheusMiddleware } from './middlewares/prometheus';

import { router } from './routers';

import { State, Context } from './types';

import { appKey } from '../config';

export const app = new Koa<State, Context>();
app.proxy = true;
app.keys = [appKey];

app.use(prometheusMiddleware());
app.use(loggerMiddleware());

app.use(router.routes());
app.use(router.allowedMethods());
