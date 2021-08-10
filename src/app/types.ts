import { pino } from 'pino';
import * as koa from 'koa';

export type Unpacked<T> = T extends (infer U)[] ? U : never;

export interface State {
  logger: pino.BaseLogger;
}

export type Context = Record<string, unknown>;

export type ParameterizedContext = koa.ParameterizedContext<State, Context>;
