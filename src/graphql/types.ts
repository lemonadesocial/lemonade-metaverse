import * as pino from 'pino';

import { Auth } from '../app/services/auth/types';
import { ParameterizedContext } from '../app/types';

export interface Context {
  app: ParameterizedContext;
  auth?: Auth;
  logger: pino.BaseLogger;
}
