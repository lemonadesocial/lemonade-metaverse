import { Arg, Args, Resolver, Info, Query } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { PaginatedResponseArgs } from '../types/paginated-response';
import { Token, TokenModel } from '../../app/models/token';
import { TokensResponse, TokenWhere } from '../types/token';

import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter } from '../utils/where';
import { getTokensOf } from '../../app/services/token';

@Resolver()
class _TokensQueryResolver {
  @Query(() => TokensResponse)
  async tokens(
    @Info() info: GraphQLResolveInfo,
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('where', () => TokenWhere, { nullable: true }) where?: TokenWhere | null,
  ): Promise<TokensResponse> {
    const fields = getFieldTree(info);
    const query = where ? getFilter(where) : {};

    const [items, total] = await Promise.all([
      fields.items && TokenModel.aggregate([
        { $match: query },
        { $skip: skip },
        { $limit: limit },
        { $project: getFieldProjection(fields.items) },
      ]),
      fields.total && TokenModel.countDocuments(query),
    ]);

    return { items, total };
  }

  @Query(() => [Token])
  async tokensOf(
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('owner', () => String) owner: string,
  ): Promise<Token[]> {
    return await getTokensOf({ owner, skip, first: limit });
  }
}
