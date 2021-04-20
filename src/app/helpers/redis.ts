import Redis from 'ioredis';

import { logger } from './pino';

import { redisUri } from '../../config';

export const redis = new Redis(redisUri);

redis.on('error', function onError(err: Error) {
  logger.error(err);
});

export const disconnect = () => {
  redis.disconnect();
};
