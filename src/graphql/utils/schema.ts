import type { GraphQLResolveInfo } from 'graphql';

export function isChildOfRoot(info: GraphQLResolveInfo): boolean {
  return info.parentType === info.schema.getMutationType()
    || info.parentType === info.schema.getQueryType()
    || info.parentType == info.schema.getSubscriptionType();
}
