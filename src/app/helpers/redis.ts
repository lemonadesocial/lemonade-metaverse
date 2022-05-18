import Redis from 'ioredis';

import { logger } from './pino';

import { redisUrl } from '../../config';

const CACHE_EXPIRE_TIME = 10000;
const CACHE_KEY_PREFIX = 'cache:';
const RETRY_INTERVAL = 1000;

function createRedis() {
  const redis = new Redis(redisUrl, {
    retryStrategy: () => RETRY_INTERVAL,
  });

  redis.on('error', (err: Error) => {
    logger.error(err);
  });

  return redis;
}

export const redis = createRedis();
export const publisher = createRedis();
export const subscriber = createRedis();

export function disconnect() {
  redis.disconnect();
  publisher.disconnect(),
  subscriber.disconnect();
}

export async function getOrSet<T>(
  key: string,
  fn: () => Promise<T>,
  time = CACHE_EXPIRE_TIME,
): Promise<T> {
  const value = await redis.get(CACHE_KEY_PREFIX + key);

  if (value) {
    return JSON.parse(value);
  }

  const result = await fn();

  if (result) {
    await redis.set(CACHE_KEY_PREFIX + key, JSON.stringify(result), 'PX', time);
  }

  return result;
}
