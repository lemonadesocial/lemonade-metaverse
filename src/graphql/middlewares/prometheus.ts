import type { MiddlewareFn } from 'type-graphql';
import * as prom from 'prom-client';

import { isChildOfRoot } from '../utils/schema';

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
  if (!isChildOfRoot(info)) return await next();

  const graphqlRequestDurationTimer = graphqlRequestDurationSeconds.startTimer();

  try {
    await next();
  } finally {
    const labels = {
      operation: info.operation.operation,
      field_name: info.fieldName,
    };

    graphqlRequestsTotal.inc(labels);
    graphqlRequestDurationTimer(labels);
  }
};
