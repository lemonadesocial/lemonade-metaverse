import { BulkJobOptions, Queue } from 'bullmq';
import * as assert from 'assert';

import { JobData, ORDERS_KEY, QUEUE_NAME } from './shared';

import { redis } from '../../helpers/redis';

import { Connection, createConnection } from '../../helpers/bullmq';

import type { Order } from '../../models/order';
import type { Token } from '../../models/token';

interface Item {
  token: Token;
  orders?: Order[];
}
interface Job {
  name: string;
  data: JobData;
  opts?: BulkJobOptions;
}

let connection: Connection | undefined;
let queue: Queue<JobData> | undefined;

export async function start() {
  connection = createConnection();
  queue = new Queue<JobData>(QUEUE_NAME, { connection });
}

export async function enqueue(...items: Item[]) {
  if (!items.length) return;

  assert.ok(queue);

  const commands: string[][] = [];
  const jobs: Job[] = [];

  items.forEach(({ token, orders }) => {
    const jobId = `${token.network}:${token.contract}:${token.id}`;

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
  if (connection) await connection.quit();
}
