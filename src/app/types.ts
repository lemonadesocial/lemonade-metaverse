import { BaseLogger } from 'pino';

export interface State {
  logger: BaseLogger;
}

export type Context = Record<string, any>;
