import { Queue, QueueScheduler } from 'bullmq';
import Redis from 'ioredis';

import { redisUri } from '../../../config';

import { JobData, QUEUE_NAME } from './shared';

export const queue = new Queue<JobData>(QUEUE_NAME, { connection: new Redis(redisUri) });
export const queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUri) });

export const waitUntilReady = async () => {
  await Promise.all([
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);
};

export const close = async () => {
  await queue.close();
  await queueScheduler.close();
};
