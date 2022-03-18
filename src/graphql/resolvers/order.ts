import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { Order, OrderSort, OrderWhere } from '../types/order';
import { OrderModel } from '../../app/models/order';
import { PaginationArgs } from '../types/pagination';
import { Trigger } from '../../app/helpers/pub-sub';

import { createSubscribe } from '../utils/subscription';
import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { getSort } from '../utils/sort';

const findOrders = async (
  { skip, limit, sort, where }: PaginationArgs & { sort?: OrderSort | null; where?: OrderWhere | null },
  info: GraphQLResolveInfo,
  projection?: { [P in keyof Order]?: 1 },
) => {
  const fields = getFieldTree(info);
  const filterToken = where?.token ? getFilter(where.token) : {};
  const filter = where ? getFilter({ ...where, token: undefined }) : {};

  if (filterToken.id) filter.token = filterToken.id;

  return await OrderModel.aggregate([
    { $match: filter },
    ...fields.token ? [
      {
        $lookup: {
          from: 'tokens',
          let: { network: '$network', token: '$token' },
          pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$network', '$$network'] }, { $eq: ['$id', '$$token'] }] }, ...filterToken } }],
          as: 'token',
        },
      },
      { $unwind: '$token' },
    ] : [],
    ...sort ? [{ $sort: getSort(sort) }] : [],
    { $skip: skip },
    { $limit: limit },
    { $project: { ...getFieldProjection(fields), ...projection } },
  ]);
};

@Resolver()
class _OrdersQueryResolver {
  @Query(() => [Order])
  async orders(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginationArgs,
    @Arg('sort', () => OrderSort, { nullable: true }) sort?: OrderSort | null,
    @Arg('where', () => OrderWhere, { nullable: true }) where?: OrderWhere | null,
  ): Promise<Order[]> {
    return await findOrders({ ...args, sort, where }, info);
  }
}

@Resolver()
class _OrdersSubscriptionResolver {
  @Subscription(
    () => [Order],
    {
      subscribe: createSubscribe<Order>({
        init: async function* ({ args, info }) {
          if (args.query) yield findOrders(args, info, { network: 1, id: 1 });
        },
        restrict: () => (payload) => payload.network + payload.id,
        trigger: Trigger.OrderUpdated,
        filter: (payload, { args }) => args.where ? validate(args.where, payload) : true,
      }),
    }
  )
  orders(
    @Root() root: Order[],
    @Args() _: PaginationArgs,
    @Arg('query', () => Boolean, { nullable: true }) __?: boolean | null,
    @Arg('sort', () => OrderSort, { nullable: true }) ___?: OrderSort | null,
    @Arg('where', () => OrderWhere, { nullable: true }) ____?: OrderWhere | null,
  ): Order[] {
    return root;
  }
}
