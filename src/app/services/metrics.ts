import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import * as http from 'http';
import prom from 'prom-client';

import { logger } from '../helpers/pino';

const PORT = 9100;

const httpServer = http.createServer(async (_, res) => {
  try {
    res.setHeader('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics());
  } catch (e) {
    logger.error(e);

    res.writeHead(500);
    res.end();
  }
});

let httpTerminator: HttpTerminator | undefined;

export const start = (
  onListening?: () => void,
) => {
  const server = httpServer.listen(PORT, onListening);

  httpTerminator = createHttpTerminator({ server });
};

export const stop = async () => {
  if (httpTerminator) await httpTerminator.terminate();
};
