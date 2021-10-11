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
  readonly modelName: string;
  readonly foreignField: string;
}

export const expandedDirectiveTypedefs = `
  directive @${DIRECTIVE_NAME}(modelName: String!, foreignField: String!) on FIELD_DEFINITION
`;

export const expandedDirectiveTransformer: (schema: GraphQLSchema) => GraphQLSchema = (schema) => mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, Context, any>) => {
    const directive = getDirective(schema, fieldConfig, DIRECTIVE_NAME)?.[0];

    if (!directive) return;

    fieldConfig.resolve = async function (source, _args, context, info) {
      const expandedField = getExpandedField(info.fieldName);

      assert.ok(expandedField);

      const path = pathToArray(info.path).filter((key) => typeof key === 'string').join('.');

      context.dataLoaders = context.dataLoaders || {};
      context.dataLoaders[path] = context.dataLoaders[path] || new DataLoader(async (keys) => {
        const { modelName, foreignField } = directive as DirectiveArgs;
        const model = getModelWithString(modelName);

        assert.ok(model);

        const fields = getFieldTree(info);
        const projection = getFieldProjection(fields);

        const docs = await model.find(
          { [foreignField]: { $in: keys } },
          { [foreignField]: 1, ...projection },
        ).lean();

        const map = Object.fromEntries(
          docs.map((doc) => [].concat(doc[foreignField]).map((key) => [`${key}`, doc])).flat()
        );

        return keys.map((key) => map[key] || null);
      });

      const keys = source[expandedField];

      if (keys instanceof Array) return context.dataLoaders[path]!.loadMany(keys);
      if (keys) return context.dataLoaders[path]!.load(keys);
    }

    return fieldConfig;
  },
});
