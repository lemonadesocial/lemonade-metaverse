import Redis from 'ioredis';

import { logger } from './pino';

import { redisUrl, isDevelopment } from '../../config';

export const redis = new Redis(redisUrl, { lazyConnect: isDevelopment });

redis.on('error', function onError(err: Error) {
  logger.error(err);
});

export const disconnect = () => {
  redis.disconnect();
};
