import { ApolloServer, ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-koa';

import * as schema from './schema';

import { AppError } from '../app/types/errors';

import { apolloDebug, apolloIntropection } from '../config';

export const createServer = async () => {
  return new ApolloServer({
    context: ({ ctx }) => ({ app: ctx }),
    debug: apolloDebug,
    formatError: (error) => {
      const { originalError } = error;

      if (originalError instanceof AppError) {
        switch (originalError.status) {
          case 401:
            return new AuthenticationError(originalError.message);
          case 403:
            return new ForbiddenError(originalError.message);
          case 422:
            return new UserInputError(originalError.message);
          default:
            return new ApolloError(originalError.message, originalError.code);
        }
      }

      return error;
    },
    introspection: apolloIntropection,
    schema: await schema.build(),
  });
};
