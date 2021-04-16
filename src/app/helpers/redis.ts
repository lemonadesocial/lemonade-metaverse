import Redis from 'ioredis';

import { logger } from './pino';

import { redisUri, isDevelopment } from '../../config';

export const redis = new Redis(redisUri, { lazyConnect: isDevelopment });

redis.on('error', function onError(err: Error) {
  logger.error(err);
});

export const disconnect = () => {
  redis.disconnect();
};
