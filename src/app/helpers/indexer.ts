import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'node-fetch';
import ws from 'ws';

import { indexerHttpUri, indexerWsUri, isDevelopment } from '../../config';

const httpLink = new HttpLink({
  fetch,
  uri: indexerHttpUri,
});

const subscriptionClient = new SubscriptionClient(
  indexerWsUri,
  { reconnect: true, lazy: isDevelopment },
  ws
);
const wsLink = new WebSocketLink(subscriptionClient);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ),
});

export const close = function () {
  client.stop();
  subscriptionClient.close();
};
