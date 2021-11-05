import { Directive, Field, InputType, ObjectType } from 'type-graphql';

import { Currency, Order as OrderClass } from '../../app/models/order';
import { TokenWhere } from '../types/token';
import { User } from '../../app/models/user';
import { WhereInput } from '../types/where-input';

@InputType()
class OrderCurrencyWhere extends WhereInput(Currency) { }

@InputType()
export class OrderWhere extends WhereInput(OrderClass) {
  @Field(() => OrderCurrencyWhere, { nullable: true })
  currency?: OrderCurrencyWhere;

  @Field(() => TokenWhere, { nullable: true })
  token?: TokenWhere;
}

@ObjectType()
export class Order extends OrderClass {
  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public makerExpanded?: never;
}
