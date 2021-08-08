import { ApolloServer } from 'apollo-server-koa';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as http from 'http';

import { build as buildSchema } from './schema';

import { apolloDebug, apolloIntrospection } from '../config';

const KEEP_ALIVE = 5000;

export const createServers = async (
  server: http.Server,
): Promise<{
  apolloServer: ApolloServer;
  subscriptionServer: SubscriptionServer,
}> => {
  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    context: ({ ctx }) => ({ app: ctx }),
    debug: apolloDebug,
    introspection: apolloIntrospection,
    schema,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      keepAlive: KEEP_ALIVE,
    },
    {
      path: apolloServer.graphqlPath,
      server,
    }
  );

  return {
    apolloServer,
    subscriptionServer,
  };
};
