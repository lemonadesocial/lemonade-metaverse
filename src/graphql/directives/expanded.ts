import { getModelWithString } from '@typegoose/typegoose';
import { GraphQLFieldConfig, GraphQLSchema } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { pathToArray } from 'graphql/jsutils/Path';
import * as assert from 'assert';
import DataLoader from 'dataloader';

import { Context } from '../types';

import { getExpandedField, getFieldProjection, getFieldTree } from '../utils/field';

const DIRECTIVE_NAME = 'expanded';

interface DirectiveArgs {
  readonly foreignField: string;
  readonly key?: string;
  readonly localPath?: string[];
  readonly modelName: string;
}

export const expandedDirectiveTypedefs = `
  directive @${DIRECTIVE_NAME}(
    foreignField: String!,
    key: String,
    localPath: [String!],
    modelName: String!,
  ) on FIELD_DEFINITION
`;

export const expandedDirectiveTransformer: (schema: GraphQLSchema) => GraphQLSchema = (schema) => mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, Context, any>) => {
    const directive = getDirective(schema, fieldConfig, DIRECTIVE_NAME)?.[0];

    if (!directive) return;

    fieldConfig.resolve = async function (source, _args, context, info) {
      const {
        foreignField,
        key = pathToArray(info.path).filter((key) => typeof key === 'string').join('.'),
        localPath = getExpandedField(info.fieldName),
        modelName,
      } = directive as DirectiveArgs;

      context.dataLoaders = context.dataLoaders || {};
      context.dataLoaders[key] = context.dataLoaders[key] || new DataLoader(async (keys) => {
        const model = getModelWithString(modelName);

        assert.ok(model);

        const fields = getFieldTree(info);
        const projection = getFieldProjection(fields);

        const docs = await model.find(
          { [foreignField]: { $in: keys } },
          { [foreignField]: 1, ...projection },
        ).lean();

        const map = Object.fromEntries(
          docs.map((doc) => [].concat(doc[foreignField]).map((key) => [`${key}`.toLowerCase(), doc])).flat()
        );

        return keys.map((key) => map[key.toLowerCase()] || null);
      });

      const keys = localPath instanceof Array
        ? localPath.reduce((acc, cur) => acc?.[cur], source)
        : localPath && source[localPath];

      if (keys instanceof Array) return context.dataLoaders[key]!.loadMany(keys);
      if (keys) return context.dataLoaders[key]!.load(keys);
    }

    return fieldConfig;
  },
});
