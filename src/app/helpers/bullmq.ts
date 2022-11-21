import Redis from 'ioredis';

import { redisUrl } from '../../config';

export { Redis as Connection };

export function createConnection() {
  return new Redis(redisUrl, { maxRetriesPerRequest: null });
}
