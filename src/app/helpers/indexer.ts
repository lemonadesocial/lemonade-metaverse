import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import * as https from 'https';
import fetch from 'node-fetch';

import { indexerBackupUrl, indexerUrl } from '../../config';

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
    if (httpLinkBackup && count === 1) {
      operation.setContext({ useBackup: true });
      return true;
    }

    return false;
  },
  delay: () => 0,
});

const terminatingLink = new ApolloLink((operation) => {
  if (httpLinkBackup && operation.getContext().useBackup) {
    return httpLinkBackup.request(operation);
  }

  return httpLink.request(operation);
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
