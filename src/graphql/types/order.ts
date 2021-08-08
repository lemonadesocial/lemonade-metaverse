import { Field, ObjectType, InputType } from 'type-graphql';

import { Currency, Order } from '../../app/models/order';
import { PaginatedResponse } from '../types/paginated-response';
import { TokenWhere } from '../types/token';
import { WhereInput } from '../types/where-input';

@InputType()
class OrderCurrencyWhere extends WhereInput(Currency) { }

@InputType()
export class OrderWhere extends WhereInput(Order) {
  @Field(() => OrderCurrencyWhere, { nullable: true })
  currency?: OrderCurrencyWhere;

  @Field(() => TokenWhere, { nullable: true })
  token?: TokenWhere;
}

@ObjectType()
export class OrdersResponse extends PaginatedResponse(Order) { }
