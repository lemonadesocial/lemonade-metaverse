import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import * as https from 'https';
import fetch from 'node-fetch';

import { indexerUrl } from '../../config';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
  },
  link: new HttpLink({
    fetch,
    fetchOptions: { agent: new https.Agent({ keepAlive: true }) },
    uri: indexerUrl,
  }),
});

export const stop = (): void => {
  client.stop();
};
