import * as pino from 'pino';

import { Auth } from '../app/services/auth/types';
import { ParameterizedContext } from '../app/types';

export type With<T, K extends keyof T = never> = {
  [P in keyof T]-?: P extends K ? NonNullable<T[P]> : T[P]
};

export interface Context {
  app: ParameterizedContext;
  auth?: Auth;
  logger: pino.BaseLogger;
}
