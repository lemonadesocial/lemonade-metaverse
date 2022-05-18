import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import type { FastifyInstance } from 'fastify';

import { createSchema } from './schema';

import { apolloDebug, apolloIntrospection } from '../config';

export type { ApolloServer } from 'apollo-server-fastify';

export async function createApolloServer(app: FastifyInstance) {
  const schema = await createSchema();

  const webSocketServer = new WebSocketServer({
    server: app.server,
    path: '/graphql',
  });
  const webSocketServerDisposer = useServer(
    {
      context: () => ({ ctx: null }),
      schema,
    },
    webSocketServer
  );

  return new ApolloServer({
    context: (ctx) => ({ ctx }),
    debug: apolloDebug,
    introspection: apolloIntrospection,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      apolloIntrospection
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginLandingPageDisabled(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await app.close();
            },
          };
        },
      },
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await webSocketServerDisposer.dispose();
            },
          };
        },
      },
    ],
    schema,
    stopOnTerminationSignals: false,
  });
}
