import { MiddlewareFn } from 'type-graphql';
import prom from 'prom-client';

const labelNames = ['operation', 'field_name'];
const graphqlRequestsTotal = new prom.Counter({
  labelNames,
  name: 'graphql_requests_total',
  help: 'Total number of GraphQL requests',
});
const graphqlRequestDurationSeconds = new prom.Histogram({
  labelNames,
  name: 'graphql_request_duration_seconds',
  help: 'Duration of GraphQL requests in seconds',
});

export const PrometheusMiddleware: MiddlewareFn = async ({ info }, next) => {
  const start = process.hrtime();
  try {
    await next();
  } finally {
    const delta = process.hrtime(start);
    const values = [info.operation.operation, info.fieldName];

    graphqlRequestsTotal.labels(...values).inc();
    graphqlRequestDurationSeconds.labels(...values).observe(delta[0] + delta[1] / 1e9);
  }
};
