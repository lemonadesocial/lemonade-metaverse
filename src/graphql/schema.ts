import { buildSchema } from 'type-graphql';
import * as path from 'path';

import { LoggerMiddleware } from './middlewares/logger';
import { PrometheusMiddleware } from './middlewares/prometheus';

export const build = async () => {
  const resolversPath = path.join(__dirname, '/resolvers/**/*.{ts,js}');

  return await buildSchema({
    globalMiddlewares: [
      PrometheusMiddleware,
      LoggerMiddleware,
    ],
    resolvers: [resolversPath],
  });
};
