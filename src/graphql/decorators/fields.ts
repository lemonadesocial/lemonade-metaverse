import { createParamDecorator } from 'type-graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

export interface FieldsMap {
  [K: string]: FieldsMap | undefined;
}

const flatten = (
  resolveTree: ResolveTree,
): FieldsMap => {
  return Object.values(resolveTree.fieldsByTypeName).reduce<FieldsMap>(
    (acc, fields) => Object.assign(acc, ...Object.values(fields).map((resolveTree) => ({ [resolveTree.name]: flatten(resolveTree) }))),
    {}
  );
}

export const Fields = () => {
  return createParamDecorator(({info}) => {
    const resolveTree = parseResolveInfo(info) as ResolveTree;

    return flatten(resolveTree);
  });
};
