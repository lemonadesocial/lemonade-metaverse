import { Arg, Args, ObjectType, Resolver, InputType, Root, Query, Subscription } from 'type-graphql';

import { Fields, FieldsMap } from '../decorators/fields';

import { Order, OrderModel } from '../../app/models/order';
import { PaginatedResponse, PaginatedResponseArgs } from '../types/paginated-response';
import { WhereInput } from '../types/where-input';

import { getQuery, validate } from '../utils/where';

@ObjectType()
class GetOrdersResponse extends PaginatedResponse(Order) { }

@InputType()
class OrderWhereInput extends WhereInput(Order) { }

@Resolver()
export class OrderResolver {
  @Query(() => GetOrdersResponse)
  async getOrders(
    @Fields() fields: FieldsMap,
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('where', () => OrderWhereInput, { nullable: true }) where?: OrderWhereInput | null,
  ): Promise<GetOrdersResponse> {
    const query = where ? getQuery<Order>(where) : {};

    const [items, total] = await Promise.all([
      fields.items ? OrderModel.find(query, Object.keys(fields.items)).skip(skip).limit(limit) : null,
      fields.total ? OrderModel.countDocuments(query) : null,
    ]);

    return { items, total };
  }

  @Subscription({
    topics: 'order_created',
    filter: ({ args, payload }) => args.where ? validate(args.where, payload) : true,
  })
  orderCreated(
    @Root() order: Order,
    @Arg('where', () => OrderWhereInput, { nullable: true }) _?: OrderWhereInput | null,
  ): Order {
    return order;
  }

  @Subscription({
    topics: 'order_updated',
    filter: ({ args, payload }) => args.where ? validate(args.where, payload) : true,
  })
  orderUpdated(
    @Root() order: Order,
    @Arg('where', () => OrderWhereInput, { nullable: true }) _?: OrderWhereInput | null,
  ): Order {
    return order;
  }
}
