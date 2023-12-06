import { Arg, Args, Ctx, Resolver, Info, Root, Query, Subscription, Int } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as assert from 'assert';

import type { Context } from '../types';

import { OrderDirection, Token_orderBy } from '../../lib/lemonade-marketplace/types.generated';
import { PaginationArgs } from '../types/pagination';
import { TokenDetail, TokenSort, TokenComplex, TokenWhereComplex } from '../types/token';
import { TokenModel } from '../../app/models/token';
import { Trigger } from '../../app/helpers/pub-sub';

import { createSubscribe } from '../utils/subscription';
import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { getSort } from '../utils/sort';
import { getToken, getTokens } from '../../app/services/token';
import { networkMap, networks } from '../../app/services/network';

interface FindTokensArgs extends PaginationArgs {
  sample?: number | null;
  sort?: TokenSort | null;
  where?: TokenWhereComplex | null;
}

async function findTokens(
  { skip, limit, sample, sort, where }: FindTokensArgs,
  info: GraphQLResolveInfo,
  projection?: { [P in keyof TokenComplex]?: 1 },
) {
  const fields = getFieldTree(info);
  const filterOrder = where?.order ? getFilter(where.order) : {};
  const filterRegistry = where?.registry ? getFilter(where.registry) : {};
  const filter = where ? getFilter({ ...where, order: undefined, registry: undefined }) : {};

  if (filterOrder.id) filter.order = filterOrder.id;
  if (filterRegistry.id) filter.contract = filterRegistry.id;

  return await TokenModel.aggregate([
    { $match: filter },
    ...fields.order || where?.order ? [
      {
        $lookup: {
          from: 'orders',
          let: { network: '$network', order: '$order' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$network', '$$network'] }, { $eq: ['$id', '$$order'] }] }, ...filterOrder } },
            { $limit: 1 },
          ],
          as: 'order',
        },
      },
      { $unwind: { path: '$order', preserveNullAndEmptyArrays: !where?.order } },
    ] : [],
    ...fields.registry || where?.registry ? [
      {
        $lookup: {
          from: 'registries',
          let: { network: '$network', contract: '$contract' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$network', '$$network'] }, { $eq: ['$id', '$$contract'] }] }, ...filterRegistry } },
            { $limit: 1 },
          ],
          as: 'registry',
        },
      },
      { $unwind: '$registry' },
    ] : [],
    ...sort ? [{ $sort: getSort(sort) }] : [],
    { $skip: skip },
    { $limit: limit },
    ...sample ? [{ $sample: { size: sample } }] : [],
    { $project: { ...getFieldProjection(fields), ...projection } },
  ]);
}

@Resolver()
class _TokensQueryResolver {
  @Query(() => TokenDetail, { nullable: true })
  async getToken(
    @Arg('network', () => String, { defaultValue: 'polygon' }) network: string,
    @Arg('id', () => String) id: string,
  ): Promise<TokenDetail | undefined> {
    assert.ok(networkMap[network]);

    return await getToken(networkMap[network], id);
  }

  @Query(() => [TokenComplex])
  async getTokens(
    @Ctx() { logger }: Context,
    @Args() { skip, limit }: PaginationArgs,
    @Arg('network', () => String, { nullable: true }) network?: string,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('creator', () => String, { nullable: true }) creator?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
    @Arg('owner_in', () => [String], { nullable: true }) owner_in?: string[],
  ): Promise<TokenComplex[]> {
    const variables = {
      where: { id, id_in, contract, creator, tokenId, owner, owner_in },
      orderBy: Token_orderBy.createdAt,
      orderDirection: OrderDirection.desc,
      skip,
      first: limit,
    };

    if (network) {
      assert.ok(networkMap[network]);

      return await getTokens(networkMap[network], variables);
    }

    const tokens = await Promise.all(networks.map((network) =>
      getTokens(network, variables).catch((err) => {
        logger.warn({ network: network.name, err }, 'failed to get tokens');

        return [];
      })
    ));

    return tokens.flat().sort((a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0)
    );
  }

  @Query(() => [TokenComplex])
  async tokens(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginationArgs,
    @Arg('sample', () => Int, { nullable: true }) sample?: number | null,
    @Arg('sort', () => TokenSort, { nullable: true }) sort?: TokenSort | null,
    @Arg('where', () => TokenWhereComplex, { nullable: true }) where?: TokenWhereComplex | null,
  ): Promise<TokenComplex[]> {
    return await findTokens({ ...args, sample, sort, where }, info);
  }
}

@Resolver()
class _TokensSubscriptionResolver {
  @Subscription(
    () => [TokenComplex],
    {
      subscribe: createSubscribe<TokenComplex, unknown, FindTokensArgs & { query?: boolean | null }>({
        init: async function* ({ args, info }) {
          if (args.query) yield findTokens(args, info, { network: 1, id: 1 });
        },
        restrict: () => (payload) => payload.network + payload.id,
        trigger: Trigger.TokenUpdated,
        filter: (payload, { args }) => args.where ? validate(args.where, payload) : true,
      }),
    }
  )
  tokens(
    @Root() root: TokenComplex[],
    @Args() _: PaginationArgs,
    @Arg('query', () => Boolean, { nullable: true }) __?: boolean | null,
    @Arg('sort', () => TokenSort, { nullable: true }) ___?: TokenSort | null,
    @Arg('where', () => TokenWhereComplex, { nullable: true }) ____?: TokenWhereComplex | null,
  ): TokenComplex[] {
    return root;
  }
}
