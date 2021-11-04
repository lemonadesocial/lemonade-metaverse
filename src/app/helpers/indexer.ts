import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'node-fetch';

import { indexerUrl } from '../../config';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
  },
  link: new HttpLink({
    fetch,
    uri: indexerUrl,
  }),
});

export const stop = (): void => {
  client.stop();
};
