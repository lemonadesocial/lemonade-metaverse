import * as pino from 'pino';

import { ParameterizedContext } from '../app/types';

export interface Context {
  app?: ParameterizedContext;
  logger: pino.BaseLogger;
}
