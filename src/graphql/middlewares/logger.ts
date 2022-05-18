import type { MiddlewareFn } from 'type-graphql';

import { isChildOfRoot } from '../utils/schema';
import { logger } from '../../app/helpers/pino';

import type { Context } from '../types';

export const LoggerMiddleware: MiddlewareFn<Context> = async ({ context, info }, next) => {
  if (!isChildOfRoot(info)) return await next();

  const { fieldName, operation: { operation } } = info;

  context.logger = context.logger || context.ctx?.request.log || logger;
  context.logger = context.logger.child({
    operation,
    fieldName,
  });

  await next();
};
