import { Directive, Field, InputType, ObjectType } from 'type-graphql';

import { OrderCurrency } from '../../app/models/order';
import { OrderSimple, OrderWhereSimple } from './order';
import { SortInput } from './sort-input';
import { Token as TokenClass } from '../../app/models/token';
import { User } from '../../app/models/user';
import { WhereInput } from './where-input';

@InputType()
export class TokenSort extends SortInput(TokenClass) { }

@InputType()
class TokenWhere extends WhereInput(TokenClass) { }
@InputType()
export class TokenWhereSimple extends TokenWhere {
  @Field(() => String, { nullable: true })
  order?: string;
}
@InputType()
export class TokenWhereComplex extends TokenWhere {
  @Field(() => OrderWhereSimple, { nullable: true })
  order?: OrderWhereSimple;
}

@ObjectType()
class Token extends TokenClass {
  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public creatorExpanded?: string;

  @Directive('@expanded(localPath: ["metadata", "creators"], modelName: "User", foreignField: "wallets")')
  @Field(() => [User], { nullable: 'itemsAndList' })
  public metadataCreatorsExpanded?: never;
}
@ObjectType()
export class TokenSimple extends Token {
  @Field(() => String, { nullable: true, description: 'The order.' })
  declare public order?: string;
}
@ObjectType()
export class TokenComplex extends Token {
  @Field(() => OrderSimple, { nullable: true, description: 'The order.' })
  declare public order?: OrderSimple;
}

@ObjectType()
class TokenDetailOrderBid {
  @Field()
  public createdAt!: string;

  @Field()
  public transaction!: string;

  @Field()
  public bidder!: string;

  @Directive('@expanded(key: "TokenDetailUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public bidderExpanded?: never;

  @Field()
  public bidAmount!: string;
}
@ObjectType()
class TokenDetailOrder {
  @Field()
  public createdAt!: string;

  @Field()
  public transaction!: string;

  @Field({ nullable: true })
  public updatedAt?: string;

  @Field({ nullable: true })
  public updatedTransaction?: string;

  @Field()
  public maker!: string;

  @Directive('@expanded(key: "TokenDetailUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public makerExpanded?: never;

  @Field()
  public currency!: OrderCurrency;

  @Field()
  public price!: string;

  @Field(() => [TokenDetailOrderBid])
  public bids!: TokenDetailOrderBid[];

  @Field({ nullable: true })
  public taker?: string;

  @Directive('@expanded(key: "TokenDetailUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public takerExpanded?: never;

  @Field({ nullable: true })
  public paidAmount?: string;
}
@ObjectType()
class TokenDetailTransfer {
  @Field()
  public createdAt!: string;

  @Field()
  public transaction!: string;

  @Field()
  public from!: string;

  @Directive('@expanded(key: "TokenDetailUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public fromExpanded?: never;

  @Field()
  public to!: string;

  @Directive('@expanded(key: "TokenDetailUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public toExpanded?: never;
}
@ObjectType()
export class TokenDetail extends TokenComplex {
  @Field({ nullable: true, description: 'The owner.' })
  public owner?: string;

  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public ownerExpanded?: never;

  @Field(() => [TokenDetailOrder], { nullable: true, description: 'This token\'s orders.' })
  public orders?: TokenDetailOrder[];

  @Field(() => [TokenDetailTransfer], { nullable: true, description: 'This token\'s transfers.' })
  public transfers?: TokenDetailTransfer[];
}
