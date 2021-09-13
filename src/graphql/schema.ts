import { buildSchemaSync } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import * as path from 'path';

import { LoggerMiddleware } from './middlewares/logger';
import { PrometheusMiddleware } from './middlewares/prometheus';

import { pubSub } from '../app/helpers/pub-sub';

const resolversPath = path.join(__dirname, '/resolvers/**/*.{ts,js}');

export const schema = buildSchemaSync({
  globalMiddlewares: [
    PrometheusMiddleware,
    LoggerMiddleware,
  ],
  resolvers: [resolversPath],
  pubSub,
  scalarsMap: [
    { type: Object, scalar: GraphQLJSONObject },
  ],
});
