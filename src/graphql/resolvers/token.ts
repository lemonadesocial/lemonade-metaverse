import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { Fields } from '../decorators/fields';

import { PaginationArgs } from '../types/pagination';
import { Token, TokenDetail, TokenSort, TokenWhere } from '../types/token';
import { TokenModel } from '../../app/models/token';
import { Trigger } from '../../app/helpers/pub-sub';

import { createSubscribe } from '../utils/subscription';
import { getFieldTree, getFieldProjection, FieldTree } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { getSort } from '../utils/sort';
import { getToken, getTokens } from '../../app/services/token';

const findTokens = async (
  { skip, limit, sort, where }: PaginationArgs & { sort?: TokenSort | null; where?: TokenWhere | null },
  info: GraphQLResolveInfo,
) => {
  const fields = getFieldTree(info);
  const query = where ? getFilter({ ...where, token: undefined }) : {};

  return await TokenModel.aggregate([
    { $match: query },
    ...sort ? [{ $sort: getSort(sort) }] : [],
    { $skip: skip },
    { $limit: limit },
    { $project: getFieldProjection(fields) },
  ]);
};

@Resolver()
class _TokensQueryResolver {
  @Query(() => TokenDetail, { nullable: true })
  async getToken(
    @Arg('id', () => String) id: string,
    @Fields() fields: FieldTree,
  ): Promise<TokenDetail | undefined> {
    return await getToken(id, !!fields.owner || !!fields.transfers);
  }

  @Query(() => [Token])
  async getTokens(
    @Args() { skip, limit }: PaginationArgs,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('creator', () => String, { nullable: true }) creator?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<Token[]> {
    return await getTokens({
      where: { id, id_in, contract, creator, tokenId, owner },
      skip,
      first: limit,
    });
  }

  @Query(() => [Token])
  async tokens(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginationArgs,
    @Arg('sort', () => TokenSort, { nullable: true }) sort?: TokenSort | null,
    @Arg('where', () => TokenWhere, { nullable: true }) where?: TokenWhere | null,
  ): Promise<Token[]> {
    return await findTokens({ ...args, sort, where }, info);
  }
}

@Resolver()
class _TokensSubscriptionResolver {
  @Subscription(
    () => [Token],
    {
      subscribe: createSubscribe<Token>({
        init: async function* ({ args, info }) {
          if (args.query) yield findTokens(args, info);
        },
        trigger: Trigger.TokenUpdated,
        filter: (payload, { args }) => args.where ? validate(args.where, payload) : true,
      }),
    }
  )
  tokens(
    @Root() root: Token[],
    @Args() _: PaginationArgs,
    @Arg('query', () => Boolean, { nullable: true }) __?: boolean | null,
    @Arg('sort', () => TokenSort, { nullable: true }) ___?: TokenSort | null,
    @Arg('where', () => TokenWhere, { nullable: true }) ____?: TokenWhere | null,
  ): Token[] {
    return root;
  }
}
