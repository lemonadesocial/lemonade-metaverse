import Redis from 'ioredis';

import { redisUrl } from '../../config';

export function createConnection() {
  return new Redis(redisUrl, {
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  });
}
