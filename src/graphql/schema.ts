import { buildSchema } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { mergeSchemas } from '@graphql-tools/schema';
import * as path from 'path';

import { expandedDirectiveTransformer, expandedDirectiveTypedefs } from './directives/expanded';

import { LoggerMiddleware } from './middlewares/logger';
import { PrometheusMiddleware } from './middlewares/prometheus';

import { pubSub } from '../app/helpers/pub-sub';

export async function createSchema() {
  const schema = await buildSchema({
    globalMiddlewares: [
      PrometheusMiddleware,
      LoggerMiddleware,
    ],
    resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
    pubSub,
    scalarsMap: [
      { type: Object, scalar: GraphQLJSONObject },
    ],
  });

  let schemaWithDirectives = mergeSchemas({
    schemas: [schema],
    typeDefs: [
      expandedDirectiveTypedefs,
    ],
  });
  schemaWithDirectives = expandedDirectiveTransformer(schemaWithDirectives);

  return schemaWithDirectives;
}
