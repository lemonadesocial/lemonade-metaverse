import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import { indexerHttpUri } from '../../config';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: indexerHttpUri,
  }),
});
