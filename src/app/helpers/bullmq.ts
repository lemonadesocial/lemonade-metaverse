import Redis from 'ioredis';

import { redisUrl } from '../../config';

export function createConnection(): Redis.Redis {
  return new Redis(redisUrl, {
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  });
}
