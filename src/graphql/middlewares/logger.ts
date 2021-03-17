import { MiddlewareFn } from 'type-graphql';

import { Context } from '../types';

export const LoggerMiddleware: MiddlewareFn<Context> = async ({ context, info }, next) => {
  const { fieldName, operation: { operation } } = info;

  context.logger = context.logger || context.app.state.logger;
  context.logger = context.logger.child({
    operation,
    fieldName,
  });

  await next();
};
