import type { RedisOptions } from 'ioredis';

import { parseUrl } from '../utils/redis';

import { redisUrl } from '../../config';

export const connection: RedisOptions = {
  ...parseUrl(redisUrl),
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};
