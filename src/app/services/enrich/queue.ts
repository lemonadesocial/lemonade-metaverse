import { Queue, QueueScheduler } from 'bullmq';
import Redis from 'ioredis';

import { JobData, QUEUE_NAME } from './shared';

import { redisUrl } from '../../../config';

const queue = new Queue<JobData>(QUEUE_NAME, { connection: new Redis(redisUrl) });
const queueScheduler = new QueueScheduler(QUEUE_NAME, { connection: new Redis(redisUrl) });

export const waitUntilReady = async (): Promise<void> => {
  await Promise.all([
    queue.waitUntilReady(),
    queueScheduler.waitUntilReady(),
  ]);
};

export const enqueue = async (...data: JobData[]): Promise<void> => {
  await queue.addBulk(data.map((data) => ({
    name: '*',
    data,
    opts: {
      attempts: 10,
      backoff: { type: 'exponential', delay: 1000 },
      jobId: data.token.id,
      removeOnComplete: true,
      removeOnFail: true,
    },
  })));
};

export const close = async (): Promise<void> => {
  await queue.close();
  await queueScheduler.close();
};
