import Redis from 'ioredis';

import { logger } from './pino';

import { redisUri } from '../../config';

export const redis = new Redis(redisUri);

redis.on('error', function onError(err: Error) {
  logger.error(err);
});

export const publisher = new Redis(redisUri);

publisher.on('error', function onError(err: Error) {
  logger.error(err);
});

export const subscriber = new Redis(redisUri);

subscriber.on('error', function onError(err: Error) {
  logger.error(err);
});

export const disconnect = (): void => {
  redis.disconnect();
  publisher.disconnect(),
  subscriber.disconnect();
};
