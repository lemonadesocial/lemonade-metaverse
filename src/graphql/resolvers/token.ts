import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as assert from 'assert';

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
import { networks } from '../../app/services/network';

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
    @Arg('network', () => String, { defaultValue: 'polygon' }) network: string,
    @Arg('id', () => String) id: string,
    @Fields() fields: FieldTree,
  ): Promise<TokenDetail | undefined> {
    assert.ok(networks[network]);

    return await getToken(networks[network], id, !!fields.owner || !!fields.transfers);
  }

  @Query(() => [Token])
  async getTokens(
    @Args() { skip, limit }: PaginationArgs,
    @Arg('network', () => String, { nullable: true }) network?: string,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('creator', () => String, { nullable: true }) creator?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<Token[]> {
    const variables = {
      where: { id, id_in, contract, creator, tokenId, owner },
      skip,
      first: limit,
    };

    if (network) {
      assert.ok(networks[network]);

      return await getTokens(networks[network], variables);
    }

    const tokens = await Promise.all(Object.values(networks).map((network) =>
      getTokens(network, variables))
    );

    return tokens.flat().slice(0, limit);
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
