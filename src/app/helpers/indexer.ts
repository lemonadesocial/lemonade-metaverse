import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import { indexerUrl } from '../../config';

export const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
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
