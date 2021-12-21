import Router from '@koa/router';

import * as healthcheck from '../controllers/healthcheck';
import * as heapdump from '../controllers/heapdump';

export const router = new Router();

router.get('/healthcheck', healthcheck.get);
router.post('/heapdump', heapdump.post);
