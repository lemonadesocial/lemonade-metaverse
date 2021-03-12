import Router from '@koa/router';

import * as healthcheck from '../controllers/healthcheck';

export const router = new Router();

router.get('/healthcheck', healthcheck.get);
