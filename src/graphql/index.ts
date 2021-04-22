import { ApolloServer } from 'apollo-server-koa';

import * as schema from './schema';

import { apolloDebug, apolloIntropection } from '../config';

export const createServer = async () => {
  return new ApolloServer({
    context: ({ ctx }) => ({ app: ctx }),
    debug: apolloDebug,
    introspection: apolloIntropection,
    schema: await schema.build(),
  });
};
