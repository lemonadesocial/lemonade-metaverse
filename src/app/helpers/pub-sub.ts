import { RedisPubSub } from 'graphql-redis-subscriptions';

import { publisher, subscriber } from './redis';

export const pubSub = new RedisPubSub({
  publisher,
  subscriber,
});
