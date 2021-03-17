import * as koa from 'koa';
import * as pino from 'pino';

export interface State {
  logger: pino.BaseLogger;
}

export type Context = Record<string, unknown>;

export type ParameterizedContext = koa.ParameterizedContext<State, Context>;
