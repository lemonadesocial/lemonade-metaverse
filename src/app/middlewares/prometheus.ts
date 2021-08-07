import { Middleware } from '@koa/router';
import prom from 'prom-client';

export const prometheusMiddleware = (): Middleware => {
  const labelNames = ['method', 'path', 'status'];
  const httpRequestsTotal = new prom.Counter({
    labelNames,
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
  });
  const httpRequestDurationSeconds = new prom.Histogram({
    labelNames,
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
  });

  return async function prometheusMiddleware(ctx, next) {
    const start = process.hrtime();

    try {
      await next();
    } finally {
      if (ctx._matchedRoute) {
        const delta = process.hrtime(start);
        const values = [ctx.method, ctx._matchedRoute.toString(), ctx.res.statusCode.toString()];

        httpRequestsTotal.labels(...values).inc();
        httpRequestDurationSeconds.labels(...values).observe(delta[0] + delta[1] / 1e9);
      }
    }
  };
};
