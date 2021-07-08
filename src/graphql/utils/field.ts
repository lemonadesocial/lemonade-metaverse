import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

export interface FieldTree {
  [K: string]: FieldTree | undefined;
}

const flatten = (
  resolveTree: ResolveTree,
): FieldTree => {
  return Object.values(resolveTree.fieldsByTypeName).reduce<FieldTree>(
    (acc, fields) => Object.assign(acc, ...Object.values(fields).map((resolveTree) => ({ [resolveTree.name]: flatten(resolveTree) }))),
    {}
  );
}

export const getFieldTree = (
  info: GraphQLResolveInfo,
): FieldTree => {
  const resolveTree = parseResolveInfo(info) as ResolveTree;

  return flatten(resolveTree);
};
