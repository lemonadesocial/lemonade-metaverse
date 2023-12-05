import { Counter, Histogram } from 'prom-client';
import { GraphQLClient, resolveRequestDocument } from 'graphql-request';

export type Indexer = GraphQLClient;

const labelNames = ['network', 'operation'];
const indexerRequestsTotal = new Counter({
  labelNames,
  name: 'metaverse_indexer_requests_total',
  help: 'Total number of metaverse indexer requests',
});
const indexerRequestsFailedTotal = new Counter({
  labelNames,
  name: 'metaverse_indexer_requests_failed_total',
  help: 'Total number of failed metaverse indexer requests',
});
const indexerRequestDurationSeconds = new Histogram({
  labelNames,
  name: 'metaverse_indexer_request_duration_seconds',
  help: 'Duration of metaverse indexer requests in seconds',
});

export function createIndexer(indexerUrl: string, name: string): Indexer {
  const client = new GraphQLClient(indexerUrl, { fetch, keepalive: true });

  client.request = new Proxy(client.request, {
    apply: async (target, thisArg, argArray) => {
      const { operationName } = resolveRequestDocument(argArray[0].document || argArray[0]);

      const labels = { network: name, operation: operationName };
      const indexerRequestDurationTimer = indexerRequestDurationSeconds.startTimer();

      try {
        return await target.apply(thisArg, argArray as never);
      } catch (err) {
        indexerRequestsFailedTotal.labels(labels).inc();

        throw err;
      } finally {
        indexerRequestsTotal.labels(labels).inc();
        indexerRequestDurationTimer(labels);
      }
    },
  });

  return client;
}
