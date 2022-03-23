import { Directive, Field, InputType, ObjectType } from 'type-graphql';

import { OrderCurrency } from '../../app/models/order';
import { SortInput } from './sort-input';
import { Token as TokenClass } from '../../app/models/token';
import { User } from '../../app/models/user';
import { WhereInput } from './where-input';

@InputType()
export class TokenSort extends SortInput(TokenClass) { }

@InputType()
export class TokenWhere extends WhereInput(TokenClass) { }

@ObjectType()
export class TokenOrderBid {
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
export class TokenOrder {
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

  @Field(() => [TokenOrderBid])
  public bids!: TokenOrderBid[];
}

@ObjectType()
export class TokenTransfer {
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
export class Token extends TokenClass {
  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public creatorExpanded?: string;

  @Directive('@expanded(localPath: ["metadata", "creators"], modelName: "User", foreignField: "wallets")')
  @Field(() => [User], { nullable: 'itemsAndList' })
  public metadataCreatorsExpanded?: never;
}

@ObjectType()
export class TokenDetail extends Token {
  @Field({ nullable: true, description: 'The owner.' })
  public owner?: string;

  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public ownerExpanded?: never;

  @Field(() => [TokenOrder], { nullable: true, description: 'This token\'s orders.' })
  public orders?: TokenOrder[];

  @Field(() => [TokenTransfer], { nullable: true, description: 'This token\'s transfers.' })
  public transfers?: TokenTransfer[];
}
