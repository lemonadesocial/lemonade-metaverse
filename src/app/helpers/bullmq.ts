import { Redis } from 'ioredis';

import { redisUrl } from '../../config';

export function createQueueConnection() {
  return new Redis(redisUrl, {
    retryStrategy: () => 1000,
    enableOfflineQueue: false,
  });
}

export function createWorkerConnection() {
  return new Redis(redisUrl, {
    retryStrategy: () => 1000,
    maxRetriesPerRequest: null,
  });
}
