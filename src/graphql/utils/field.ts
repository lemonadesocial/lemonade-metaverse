import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import type { GraphQLResolveInfo } from 'graphql';

export type FieldProjection = { [key: string]: FieldProjection | 1 };

export interface FieldTree {
  [K: string]: FieldTree | undefined;
}

const flatten = (resolveTree: ResolveTree): FieldTree => {
  return Object.values(resolveTree.fieldsByTypeName).reduce<FieldTree>(
    (acc, fields) => Object.assign(acc, ...Object.values(fields).map((resolveTree) => ({ [resolveTree.name]: flatten(resolveTree) }))),
    {}
  );
};

export const getFieldTree = (info: GraphQLResolveInfo): FieldTree => {
  const resolveTree = parseResolveInfo(info) as ResolveTree;

  return flatten(resolveTree);
};

export const getFieldProjection = (
  fieldTree: FieldTree,
  keys: string[] = [],
): FieldProjection => {
  return Object.entries(fieldTree as Record<string, FieldTree>).reduce((acc, [key, value]) => {
    if (Object.keys(value).length) {
      const expandedField = getExpandedField(key);

      return expandedField
        ? { ...acc, [keys.concat(expandedField).join('.')]: 1 }
        : { ...acc, ...getFieldProjection(value, keys.concat(key)) };
    }

    return { ...acc, [keys.concat(key).join('.')]: 1 };
  }, {});
};

export const getExpandedField = (field: string): string | null => {
  if (!field.endsWith('Expanded')) return null;

  return field.substr(0, field.length - 8);
};
