import { Middleware } from '@koa/router';
import * as prom from 'prom-client';

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
    const httpRequestDurationTimer = httpRequestDurationSeconds.startTimer();

    try {
      await next();
    } finally {
      if (ctx._matchedRoute) {
        const labels = {
          method: ctx.method,
          path: ctx._matchedRoute.toString(),
          status: ctx.res.statusCode.toString(),
        };

        httpRequestsTotal.inc(labels);
        httpRequestDurationTimer(labels);
      }
    }
  };
};
