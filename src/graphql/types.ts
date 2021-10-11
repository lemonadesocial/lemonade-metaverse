import { pino } from 'pino';
import DataLoader from 'dataloader';

import { ParameterizedContext } from '../app/types';

export interface Context {
  app?: ParameterizedContext;
  dataLoaders?: Record<string, DataLoader<string, unknown> | undefined>;
  logger: pino.Logger;
}
