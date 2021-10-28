import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { PaginatedResponseArgs } from '../types/paginated-response';
import { Token, TokenModel } from '../../app/models/token';
import { TokensResponse, TokenWhere } from '../types/token';

import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { getTokens } from '../../app/services/token';
import { subscribe } from '../utils/subscription';

const findTokens = async (
  { skip, limit, where }: PaginatedResponseArgs & { where?: TokenWhere | null },
  info: GraphQLResolveInfo,
) => {
  const fields = getFieldTree(info);
  const query = where ? getFilter({ ...where, token: undefined }) : {};

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
};

@Resolver()
class _TokensQueryResolver {
  @Query(() => [Token])
  async getTokens(
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<Token[]> {
    return await getTokens({
      where: { id, id_in, contract, tokenId, owner },
      skip,
      first: limit,
    });
  }

  @Query(() => TokensResponse)
  async tokens(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginatedResponseArgs,
    @Arg('where', () => TokenWhere, { nullable: true }) where?: TokenWhere | null,
  ): Promise<TokensResponse> {
    return await findTokens({ ...args, where }, info);
  }
}

@Resolver()
class _TokensSubscriptionResolver {
  @Subscription({
    subscribe: subscribe<TokensResponse, Token>('token_updated', {
      init: async function* ({ args, info }) {
        if (args.query) yield findTokens(args, info);
      },
      filter: ({ payload, args }) => args.where ? validate(args.where, payload) : true,
      process: ({ payload }) => ({ items: [payload], total: 1 }),
    }),
  })
  tokens(
    @Root() root: TokensResponse,
    @Args() _: PaginatedResponseArgs,
    @Arg('query', () => Boolean, { nullable: true }) __?: boolean | null,
    @Arg('where', () => TokenWhere, { nullable: true }) ___?: TokenWhere | null,
  ): TokensResponse {
    return root;
  }
}
