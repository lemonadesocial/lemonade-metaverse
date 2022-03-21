import { RedisPubSub } from 'graphql-redis-subscriptions';

import { publisher, subscriber } from './redis';

export enum Trigger {
  EnrichFailed = 'enrich_failed',
  OrderUpdated = 'order_updated',
  TokenUpdated = 'token_updated',
}

export const pubSub = new RedisPubSub({
  publisher,
  subscriber,
});
