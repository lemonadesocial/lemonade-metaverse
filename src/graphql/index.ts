import { ApolloServer } from 'apollo-server-koa';

import * as schema from './schema';

import { apolloDebug, apolloIntrospection } from '../config';

export const createServer = async () => {
  return new ApolloServer({
    context: ({ ctx }) => ({ app: ctx }),
    debug: apolloDebug,
    introspection: apolloIntrospection,
    schema: await schema.build(),
  });
};
