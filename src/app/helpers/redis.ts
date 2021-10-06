import Redis from 'ioredis';

import { logger } from './pino';

import { redisUrl } from '../../config';

const retryStrategy = () => 1000;

export const redis = new Redis(redisUrl);
redis.options.retryStrategy = retryStrategy;
redis.on('error', function onError(err: Error) {
  logger.error(err);
});

export const publisher = new Redis(redisUrl);
publisher.options.retryStrategy = retryStrategy;
publisher.on('error', function onError(err: Error) {
  logger.error(err);
});

export const subscriber = new Redis(redisUrl);
subscriber.options.retryStrategy = retryStrategy;
subscriber.on('error', function onError(err: Error) {
  logger.error(err);
});

export const disconnect = (): void => {
  redis.disconnect();
  publisher.disconnect(),
  subscriber.disconnect();
};
