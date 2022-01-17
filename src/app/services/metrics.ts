import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import * as http from 'http';
import * as prom from 'prom-client';

import { logger } from '../helpers/pino';

import { metricsPort } from '../../config';

const httpServer = http.createServer(async (req, res) => {
  try {
    res.setHeader('Content-Type', prom.register.contentType);
    res.write(await prom.register.metrics());
  } catch (e) {
    logger.error(e);

    res.writeHead(500);
  } finally {
    res.end();
  }
});

let httpTerminator: HttpTerminator | undefined;

export function start(): void {
  prom.collectDefaultMetrics();

  if (metricsPort) {
    httpTerminator = createHttpTerminator({
      server: httpServer.listen(metricsPort),
    });
  }
}

export async function stop(): Promise<void> {
  if (httpTerminator) await httpTerminator.terminate();
}
