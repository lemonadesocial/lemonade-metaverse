import Redis from 'ioredis';

import { logger } from './pino';

import { redisUrl } from '../../config';

function createRedis() {
  const redis = new Redis(redisUrl, { retryStrategy: () => 1000 });

  redis.on('error', function onError(err: Error) {
    logger.error(err);
  });

  return redis;
}

export const redis = createRedis();
export const publisher = createRedis();
export const subscriber = createRedis();

export const disconnect = (): void => {
  redis.disconnect();
  publisher.disconnect(),
  subscriber.disconnect();
};
