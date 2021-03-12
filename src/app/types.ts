import { BaseLogger } from 'pino';

export interface Auth {
  user: string;
}

export interface State {
  auth?: Auth;
  logger: BaseLogger;
}

export type Context = Record<string, any>;
