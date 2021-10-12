import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Directive, Extensions, registerEnumType, Field, ObjectType } from 'type-graphql';

import { Token } from './token';
import { User } from './user';

export enum OrderKind {
  Auction = 'AUCTION',
  Direct = 'DIRECT',
}
registerEnumType(OrderKind, { name: 'OrderKind' });

@ObjectType()
export class Currency {
  @Field()
  @prop({ required: true })
  public id!: string;

  @Field()
  @prop({ required: true })
  public name!: string;

  @Field()
  @prop({ required: true })
  public symbol!: string;
}

@ObjectType()
@index({ id: 1 }, { unique: true })
export class Order {
  /* Persisted properties */

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field({ description: 'The last block number updating this order.' })
  @prop({ required: true })
  public lastBlock!: string;

  @Field({ description: 'The LemonadeMarketplace contract address.' })
  @prop({ required: true })
  public contract!: string;

  @Field({ description: 'The LemonadeMarketplace order ID.' })
  @prop({ required: true })
  public orderId!: string;

  @Field({ description: 'When this order was created.' })
  @prop({ required: true })
  public createdAt!: string;

  @Field({ description: 'Is `AUCTION` for auctions and `DIRECT` for direct sales.' })
  @prop({ required: true, enum: OrderKind })
  public kind!: OrderKind;

  @Field({ description: 'Indicates whether this order is fillable given that the opening and closing time constraints are met. So this order is fillable if `open` and `openFrom is 0 or now >= openFrom` and `openTo is 0 or now < openTo`.' })
  @prop({ required: true })
  public open!: boolean;

  @Field({ nullable: true, description: 'The opening (Epoch) time in UTC.' })
  @prop()
  public openFrom?: string;

  @Field({ nullable: true, description: 'The closing (Epoch) time in UTC.' })
  @prop()
  public openTo?: string;

  @Field({ description: 'The maker (seller).' })
  @prop({ required: true })
  public maker!: string;

  @Field(() => Currency, { description: 'The ERC20 token the maker wants to be paid in.' })
  @prop({ required: true, _id: false })
  public currency!: Currency;

  @Field({ description: 'The (minimum) price or amount of ERC20 tokens the maker wants to be paid.' })
  @prop({ required: true })
  public price!: string;

  @Field(() => Token, { description: 'The ERC721 token.' })
  @prop({ required: true, type: () => String })
  public token!: string | Token;

  @Field({ nullable: true, description: 'The highest bidder (for auctions).' })
  @prop()
  public bidder?: string;

  @Field({ nullable: true, description: 'The highest bid amount (for auctions).' })
  @prop()
  public bidAmount?: string;

  @Field({ nullable: true, description: 'The taker (buyer).' })
  @prop()
  public taker?: string;

  @Field({ nullable: true, description: 'The paid amount.' })
  @prop()
  public paidAmount?: string;

  /* GraphQL properties */

  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public maker_expanded?: never;
}

export const OrderModel = getModelForClass(Order);
