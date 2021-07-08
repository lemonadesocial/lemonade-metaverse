import { Arg, Args, ObjectType, Resolver, Info, InputType, Root, Query, Subscription } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

import { Order, OrderModel } from '../../app/models/order';
import { PaginatedResponse, PaginatedResponseArgs } from '../types/paginated-response';
import { WhereInput } from '../types/where-input';

import { getFieldTree } from '../utils/field';
import { getFilter, validate } from '../utils/where';
import { subscribe } from '../utils/subscription';

@ObjectType()
class OrdersResponse extends PaginatedResponse(Order) { }

@InputType()
class OrderWhere extends WhereInput(Order) { }

const findOrders = async (
  { skip, limit, where }: PaginatedResponseArgs & { where?: OrderWhere | null },
  info: GraphQLResolveInfo,
) => {
  const fields = getFieldTree(info);
  const query = where ? getFilter(where) : {};

  const [items, total] = await Promise.all([
    fields.items && OrderModel.find(query, Object.keys(fields.items)).skip(skip).limit(limit).lean<Order>(),
    fields.total && OrderModel.countDocuments(query),
  ]);

  return { items, total };
};

@Resolver()
class OrdersQueryResolver {
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
class OrdersSubscriptionResolver {
  @Subscription({
    subscribe: subscribe<OrdersResponse, Order>('order_updated', {
      init: async function* ({ args, info }) {
        if (args.query) yield findOrders(args, info);
      },
      filter: ({ payload, args: { where } }) => where ? validate(where, payload) : true,
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
