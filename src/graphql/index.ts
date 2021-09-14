import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as http from 'http';

import { schema } from './schema';

import { apolloDebug, apolloIntrospection, isProduction } from '../config';

const KEEP_ALIVE = 5000;

export const createApolloServer = (httpServer: http.Server): ApolloServer => {
  const subscriptionServer = SubscriptionServer.create(
    {
      execute,
      keepAlive: KEEP_ALIVE,
      schema,
      subscribe,
    },
    { server: httpServer, path: '/graphql' }
  );

  return new ApolloServer({
    context: ({ ctx }) => ({ app: ctx }),
    debug: apolloDebug,
    introspection: apolloIntrospection,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      isProduction
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    schema,
    stopOnTerminationSignals: false,
  });
};
