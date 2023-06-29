import { GraphQLClient } from 'graphql-request';

export type Indexer = GraphQLClient;

export function createIndexer(indexerUrl: string): Indexer {
  return new GraphQLClient(indexerUrl, { keepalive: true });
}
