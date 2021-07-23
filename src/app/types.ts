import { pino } from 'pino';
import * as koa from 'koa';

export interface State {
  logger: pino.BaseLogger;
}

export type Context = Record<string, unknown>;

export type ParameterizedContext = koa.ParameterizedContext<State, Context>;
