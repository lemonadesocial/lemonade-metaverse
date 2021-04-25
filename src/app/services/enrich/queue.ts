import { Queue, QueueScheduler } from 'bullmq';

import { redis } from '../../helpers/redis';

import { JobData, QUEUE_NAME } from './shared';

export const queue = new Queue<JobData>(QUEUE_NAME, { connection: redis });
export const queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: redis });

export const waitUntilReady = async () => {
  await Promise.all([
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);
};

export const close = async () => {
  await Promise.all([
    queue.close(),
    queueScheduler.close(),
  ]);
};
