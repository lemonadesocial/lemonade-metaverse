import { Counter, Histogram, LabelValues } from 'prom-client';
import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    httpRequestDurationTimer: (labels?: LabelValues<string>) => number;
  }
}

const labelNames = ['method', 'path', 'status'];
const httpRequestsTotal = new Counter({
  labelNames,
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
const httpRequestDurationSeconds = new Histogram({
  labelNames,
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
});

const pluginCallback: FastifyPluginCallback = (fastify, _, done) => {
  fastify.decorateRequest('httpRequestDurationTimer', null);

  fastify.addHook('onRequest', (request, _, done) => {
    request.httpRequestDurationTimer = httpRequestDurationSeconds.startTimer();

    done();
  });

  fastify.addHook('onResponse', (request, reply, done) => {
    const labels = {
      method: request.routerMethod,
      path: request.routerPath,
      status: reply.statusCode,
    };

    httpRequestsTotal.inc(labels);
    request.httpRequestDurationTimer(labels);

    done();
  });

  done();
};

export const prometheusPlugin = fp(pluginCallback);
