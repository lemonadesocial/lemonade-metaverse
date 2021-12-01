import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import * as http from 'http';
import * as prom from 'prom-client';

import { logger } from '../helpers/pino';

import { metricsPort, metricsSecret } from '../../config';

const httpServer = http.createServer(async (req, res) => {
  try {
    if (metricsSecret && req.headers.authorization?.split(' ')[1] !== metricsSecret) {
      return res.writeHead(403);
    }

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
    const server = httpServer.listen(metricsPort);

    httpTerminator = createHttpTerminator({ server });
  }
}

export async function stop(): Promise<void> {
  if (httpTerminator) await httpTerminator.terminate();
}
