import { BulkJobOptions, Queue, QueueScheduler } from 'bullmq';
import * as assert from 'assert';

import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';

import { redis } from '../../helpers/redis';
import { connection } from '../../helpers/bullmq';

import { Order } from '../../models/order';
import { Token } from '../../models/token';

let queue: Queue<JobData> | undefined;
let queueScheduler: QueueScheduler | undefined;

export async function start() {
  queue = new Queue<JobData>(QUEUE_NAME, { connection });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection });
}

/**
 * Adds the given items to the queue.
 *
 * Each item becomes a new job, unless a job for the item's token already exists. An token's orders are stored outside the job data as they
 * need to be updated even though the job already exists. Our highest priority is avoiding multiple enriches for the same token, so we extend a token's
 * orders instead of creating a new job for each token order pair.
 *
 * We have the following cases:
 *  1) job 1 uses the updated data, when ingress updates the data before job 1 starts or reaches the query statement, and attempts to create the job before job 1 completes
 *  2) job 1 uses the updated data and job 2 uses none, when ingress updates the data before job 1 starts or reaches the query statement, and creates job 2 after job 1 completes
 *  3) job 1 uses the oudated data and job 2 uses the updated data, when ingress updates the data after the job 1 reaches the query statement, and creates job 2 after job 1 completes
 *  4) job 1 uses the outdated data, when ingress updates the data after job 1 reaches the query statement, and attempts to create the job before job 1 completes (i.e. while it is still running) (@todo: apply locking)
 */
export async function enqueue(
   ...items: { token: Token; orders?: Order[] }[]
): Promise<void> {
  if (!items.length) return;

  assert.ok(queue);

  const commands: string[][] = [];
  const jobs: { name: string; data: JobData; opts?: BulkJobOptions }[] = [];

  items.forEach(({ token, orders }) => {
    const jobId = `${token.contract}:${token.id}`;

    if (orders?.length) {
      commands.push(['call', 'SADD', `${ORDERS_KEY}:${jobId}`, ...orders.map((order) => JSON.stringify(order))]);
    }

    jobs.push({
      name: '*',
      data: { token },
      opts: {
        attempts: 10,
        backoff: 1000,
        jobId,
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
  });

  if (commands.length) await redis.multi(commands).exec();
  await queue.addBulk(jobs);
}

export async function stop() {
  if (queue) await queue.close();
  if (queueScheduler) await queueScheduler.close();
}
