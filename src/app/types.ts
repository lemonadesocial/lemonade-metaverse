import { pino } from 'pino';
import * as koa from 'koa';

export type KeysOfBoth<T, P> = { [K in keyof T]-?: K extends keyof P ? K : never }[keyof T];
export type Unpacked<T> = T extends (infer U)[] ? U : never;

export interface State {
  logger: pino.BaseLogger;
}

export type Context = Record<string, unknown>;

export type ParameterizedContext = koa.ParameterizedContext<State, Context>;
