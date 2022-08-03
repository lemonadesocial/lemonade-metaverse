import { BulkJobOptions, Queue, QueueScheduler } from 'bullmq';
import * as assert from 'assert';

import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';

import { connection } from '../../helpers/bullmq';
import { redis } from '../../helpers/redis';

import { Order } from '../../models/order';
import { Token } from '../../models/token';

interface Item {
  token: Token;
  orders?: Order[];
}
interface Job {
  name: string;
  data: JobData;
  opts?: BulkJobOptions;
}

let queue: Queue<JobData> | undefined;
let queueScheduler: QueueScheduler | undefined;

export async function start() {
  queue = new Queue<JobData>(QUEUE_NAME, { connection });
  queueScheduler = new QueueScheduler(QUEUE_NAME, { connection });
}

export async function enqueue(...items: Item[]) {
  if (!items.length) return;

  assert.ok(queue);

  const commands: string[][] = [];
  const jobs: Job[] = [];

  items.forEach(({ token, orders }) => {
    const jobId = `${token.contract}:${token.id}`;

    if (orders?.length) {
      commands.push(['call', 'SADD', `${ORDERS_KEY}:${jobId}`, ...orders.map((order) => JSON.stringify(order))]);
    }

    jobs.push({
      name: '*',
      data: { token },
      opts: {
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
