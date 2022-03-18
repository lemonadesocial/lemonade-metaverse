import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import * as http from 'http';
import * as https from 'https';
import fetch, { RequestInit } from 'node-fetch';

import { Network } from '../models/network';

const agent: Record<string, http.Agent> = {
  'http:': new http.Agent({ keepAlive: true }),
  'https:': new https.Agent({ keepAlive: true }),
};

const fetchOptions: RequestInit = {
  agent: (url) => agent[url.protocol],
  timeout: 10000,
};

export type Indexer = ApolloClient<NormalizedCacheObject>;

export function getIndexer(network: Network): Indexer {
  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: 'no-cache' },
    },
    link: new HttpLink({
      fetch,
      fetchOptions,
      uri: network.indexerUrl,
    }),
  });
}
