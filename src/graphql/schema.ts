import { buildSchema } from 'type-graphql';
import * as path from 'path';

import { PrometheusMiddleware } from './middlewares/prometheus';
import { LoggerMiddleware } from './middlewares/logger';

export const build = async () => {
  const resolversPath = path.join(__dirname, '/resolvers/**/*.{ts,js}');

  return await buildSchema({
    globalMiddlewares: [PrometheusMiddleware, LoggerMiddleware],
    resolvers: [resolversPath],
  });
};
