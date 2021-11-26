import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import * as https from 'https';
import * as prom from 'prom-client';
import fetch from 'node-fetch';

import { indexerBackupUrl, indexerUrl } from '../../config';

const indexerRequestsTotal = new prom.Counter({
  labelNames: ['type'],
  name: 'metaverse_indexer_requests_total',
  help: 'Total number of metaverse indexer requests',
});

const fetchOptions = {
  agent: new https.Agent({ keepAlive: true }),
  timeout: 10000,
};

const httpLink = new HttpLink({
  fetch,
  fetchOptions,
  uri: indexerUrl,
});

const httpLinkBackup = indexerBackupUrl ? new HttpLink({
  fetch,
  fetchOptions,
  uri: indexerBackupUrl,
}) : null;

const retryLink = new RetryLink({
  attempts: (count, operation) => {
    if (count === 1 && httpLinkBackup) {
      operation.setContext({ useBackup: true });
      return true;
    }

    return false;
  },
  delay: () => 0,
});

const terminatingLink = new ApolloLink((operation) => {
  const useBackup = httpLinkBackup && operation.getContext().useBackup;

  const link = useBackup ? httpLinkBackup : httpLink;
  const type = useBackup ? 'backup' : 'primary';

  return link.request(operation)?.map((data) => {
    indexerRequestsTotal.labels(type).inc();
    return data;
  }) || null;
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
  },
  link: from([retryLink, terminatingLink]),
});

export function stop(): void {
  client.stop();
}
