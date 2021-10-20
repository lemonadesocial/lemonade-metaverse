import { Arg, Args, Resolver, Info, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { Order, OrderModel } from '../../app/models/order';
import { OrdersResponse, OrderWhere } from '../types/order';
import { PaginatedResponseArgs } from '../types/paginated-response';

import { getFieldTree, getFieldProjection } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { subscribe } from '../utils/subscription';

const findOrders = async (
  { skip, limit, where }: PaginatedResponseArgs & { where?: OrderWhere | null },
  info: GraphQLResolveInfo,
) => {
  const fields = getFieldTree(info);
  const query = where ? getFilter({ ...where, token: undefined }) : {};

  const [items, total] = await Promise.all([
    fields.items && OrderModel.aggregate([
      { $match: query },
      ...fields.items.token ? [
        {
          $lookup: {
            from: 'tokens',
            let: { token: '$token' },
            pipeline: [{ $match: { $expr: { $eq: ['$id', '$$token'] }, ...where?.token && getFilter(where.token) } }],
            as: 'token',
          },
        },
        { $unwind: '$token' },
      ] : [],
      { $skip: skip },
      { $limit: limit },
      { $project: getFieldProjection(fields.items) },
    ]),
    fields.total && OrderModel.countDocuments(query),
  ]);

  return { items, total };
};

@Resolver()
class _OrdersQueryResolver {
  @Query(() => OrdersResponse)
  async orders(
    @Info() info: GraphQLResolveInfo,
    @Args() args: PaginatedResponseArgs,
    @Arg('where', () => OrderWhere, { nullable: true }) where?: OrderWhere | null,
  ): Promise<OrdersResponse> {
    return await findOrders({ ...args, where }, info);
  }
}

@Resolver()
class _OrdersSubscriptionResolver {
  @Subscription({
    subscribe: subscribe<OrdersResponse, Order>('order_updated', {
      init: async function* ({ args, info }) {
        if (args.query) yield findOrders(args, info);
      },
      filter: ({ payload, args }) => args.where ? validate(args.where, payload) : true,
      process: ({ payload }) => ({ items: [payload] }),
    }),
  })
  orders(
    @Root() root: OrdersResponse,
    @Args() _: PaginatedResponseArgs,
    @Arg('query', () => Boolean, { nullable: true }) __?: boolean | null,
    @Arg('where', () => OrderWhere, { nullable: true }) ___?: OrderWhere | null,
  ): OrdersResponse {
    return root;
  }
}
