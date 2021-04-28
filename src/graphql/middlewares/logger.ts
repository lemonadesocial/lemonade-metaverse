import { MiddlewareFn } from 'type-graphql';

import { logger } from '../../app/helpers/pino';

import { Context } from '../types';

export const LoggerMiddleware: MiddlewareFn<Context> = async ({ context, info }, next) => {
  const { fieldName, operation: { operation } } = info;

  context.logger = context.logger || context.app?.state.logger || logger;
  context.logger = context.logger.child({
    operation,
    fieldName,
  });

  await next();
};
