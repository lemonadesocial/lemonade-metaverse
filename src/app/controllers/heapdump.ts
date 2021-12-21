import { Middleware } from '@koa/router';
import { PassThrough } from 'stream';
import * as assert from 'assert';
import * as v8 from 'v8';

import { logger } from '../helpers/pino';

import { heapdumpIp, heapdumpToken } from '../../config';

export const post: Middleware = async (ctx) => {
  try {
    assert.ok(heapdumpIp && heapdumpToken);
    assert.strictEqual(ctx.ip, heapdumpIp);
    assert.strictEqual(ctx.headers.token, heapdumpToken);
  } catch (err) {
    logger.error({ ip: ctx.ip }, 'heapdump blocked');

    ctx.status = 404;
    return;
  }

  const snapshotStream = v8.getHeapSnapshot();

  ctx.set({ 'Content-Disposition': `attachment; filename=${Date.now()}.heapsnapshot`, 'Content-Type': 'application/json' });
  ctx.body = snapshotStream.pipe(new PassThrough());
};
