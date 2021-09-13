import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as http from 'http';

import { schema } from './schema';

import { apolloDebug, apolloIntrospection, isProduction } from '../config';

const KEEP_ALIVE = 5000;

export const apolloServer = new ApolloServer({
  context: ({ ctx }) => ({ app: ctx }),
  debug: apolloDebug,
  introspection: apolloIntrospection,
  plugins: [
    isProduction
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  schema,
});

export const createSubscriptionServer = (server: http.Server): SubscriptionServer => {
  return SubscriptionServer.create(
    {
      execute,
      keepAlive: KEEP_ALIVE,
      schema,
      subscribe,
    },
    { server }
  );
};
