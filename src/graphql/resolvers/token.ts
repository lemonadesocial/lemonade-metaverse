import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as assert from 'assert';

import { PaginationArgs } from '../types/pagination';
import { TokenDetail, TokenSort, TokenComplex, TokenWhereComplex } from '../types/token';
import { TokenModel } from '../../app/models/token';
import { Trigger } from '../../app/helpers/pub-sub';

import { createSubscribe } from '../utils/subscription';
import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { getSort } from '../utils/sort';
import { getToken, getTokens } from '../../app/services/token';
import { networks } from '../../app/services/network';

const findTokens = async (
  { skip, limit, sort, where }: PaginationArgs & { sort?: TokenSort | null; where?: TokenWhereComplex | null },
  info: GraphQLResolveInfo,
  projection?: { [P in keyof TokenComplex]?: 1 },
) => {
  const fields = getFieldTree(info);
  const filterOrder = where?.order ? getFilter(where.order) : {};
  const filter = where ? getFilter({ ...where, order: undefined }) : {};

  if (filterOrder.id) filter.order = filterOrder.id;

  return await TokenModel.aggregate([
    { $match: filter },
    ...fields.order ? [
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
    ...sort ? [{ $sort: getSort(sort) }] : [],
    { $skip: skip },
    { $limit: limit },
    { $project: { ...getFieldProjection(fields), ...projection } },
  ]);
};

@Resolver()
class _TokensQueryResolver {
  @Query(() => TokenDetail, { nullable: true })
  async getToken(
    @Arg('network', () => String, { defaultValue: 'polygon' }) network: string,
    @Arg('id', () => String) id: string,
  ): Promise<TokenDetail | undefined> {
    assert.ok(networks[network]);

    return await getToken(networks[network], id);
  }

  @Query(() => [TokenComplex])
  async getTokens(
    @Args() { skip, limit }: PaginationArgs,
    @Arg('network', () => String, { nullable: true }) network?: string,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('creator', () => String, { nullable: true }) creator?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<TokenComplex[]> {
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

  @Query(() => [TokenComplex])
  async tokens(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginationArgs,
    @Arg('sort', () => TokenSort, { nullable: true }) sort?: TokenSort | null,
    @Arg('where', () => TokenWhereComplex, { nullable: true }) where?: TokenWhereComplex | null,
  ): Promise<TokenComplex[]> {
    return await findTokens({ ...args, sort, where }, info);
  }
}

@Resolver()
class _TokensSubscriptionResolver {
  @Subscription(
    () => [TokenComplex],
    {
      subscribe: createSubscribe<TokenComplex>({
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
