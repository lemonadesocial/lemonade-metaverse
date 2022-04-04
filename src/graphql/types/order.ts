import { Directive, Field, InputType, ObjectType } from 'type-graphql';

import { Order as OrderClass, OrderCurrency } from '../../app/models/order';
import { SortInput } from './sort-input';
import { TokenSimple } from './token';
import { User } from '../../app/models/user';
import { WhereInput } from './where-input';

@InputType()
export class OrderSort extends SortInput(OrderClass) { }

@InputType()
class OrderCurrencyWhere extends WhereInput(OrderCurrency) { }
@InputType()
class OrderWhere extends WhereInput(OrderClass) {
  @Field(() => OrderCurrencyWhere, { nullable: true })
  currency?: OrderCurrencyWhere;
}
@InputType()
export class OrderWhereSimple extends OrderWhere {
  @Field(() => String, { nullable: true })
  token?: string;
}
@InputType()
export class OrderWhereComplex extends OrderWhere {
  @Field(() => OrderWhereSimple, { nullable: true })
  token?: OrderWhereSimple;
}

@ObjectType()
class Order extends OrderClass {
  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public makerExpanded?: never;
}
@ObjectType()
export class OrderSimple extends Order {
  @Field(() => String, { description: 'The ERC721 token.' })
  declare public token: string;
}
@ObjectType()
export class OrderComplex extends Order {
  @Field(() => TokenSimple, { description: 'The ERC721 token.' })
  declare public token: TokenSimple;
}
