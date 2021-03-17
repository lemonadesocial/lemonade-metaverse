import { MiddlewareFn } from 'type-graphql';

import { authenticate } from '../../app/services/auth/service';

import { Context } from '../types';

export const AuthenticateMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  context.auth = await authenticate(context.app);
  context.logger = context.logger || context.app.state.logger;
  context.logger = context.logger.child({
    user: context.auth.user,
  });

  await next();
};
