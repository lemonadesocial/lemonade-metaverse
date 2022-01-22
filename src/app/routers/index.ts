import Router from '@koa/router';

import * as livez from '../controllers/livez';

export const router = new Router();

router.get('/livez', livez.get);
