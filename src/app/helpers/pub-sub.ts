import { RedisPubSub } from 'graphql-redis-subscriptions';

import { publisher, subscriber } from './redis';

export enum Trigger {
  OrderUpdated = 'order_updated',
  TokenUpdated = 'token_updated',
}

export const pubSub = new RedisPubSub({
  publisher,
  subscriber,
});
