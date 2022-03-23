import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { registerEnumType, Field, ObjectType } from 'type-graphql';

export enum OrderKind {
  AUCTION = 'AUCTION',
  DIRECT = 'DIRECT',
}
registerEnumType(OrderKind, { name: 'OrderKind' });

@ObjectType()
export class OrderCurrency {
  @Field()
  @prop({ required: true })
  public id!: string;

  @Field({ nullable: true })
  @prop()
  public name?: string;

  @Field({ nullable: true })
  @prop()
  public symbol?: string;
}

@ObjectType({ isAbstract: true })
@index({ network: 1, id: 1 }, { unique: true })
@index({ maker: 1 })
@index({ token: 1 })
export class Order {
  @Field()
  @prop({ required: true })
  public network!: string;

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
  public createdAt!: Date;

  @Field({ nullable: true, description: 'When this order was last updated.' })
  @prop()
  public updatedAt?: Date;

  @Field(() => OrderKind, { description: 'Is `AUCTION` for auctions and `DIRECT` for direct sales.' })
  @prop({ required: true, enum: OrderKind })
  public kind!: OrderKind;

  @Field({ description: 'Indicates whether this order is fillable given that the opening and closing time constraints are met. So this order is fillable if `open` and `openFrom is 0 or now >= openFrom` and `openTo is 0 or now < openTo`.' })
  @prop({ required: true })
  public open!: boolean;

  @Field({ nullable: true, description: 'The opening (Epoch) time in UTC.' })
  @prop()
  public openFrom?: Date;

  @Field({ nullable: true, description: 'The closing (Epoch) time in UTC.' })
  @prop()
  public openTo?: Date;

  @Field({ description: 'The maker (seller).' })
  @prop({ required: true })
  public maker!: string;

  @Field(() => OrderCurrency, { description: 'The ERC20 token the maker wants to be paid in.' })
  @prop({ required: true, _id: false })
  public currency!: OrderCurrency;

  @Field({ description: 'The (minimum) price or amount of ERC20 tokens the maker wants to be paid.' })
  @prop({ required: true })
  public price!: string;

  @prop({ required: true, type: () => String })
  public token!: string;

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
}

export const OrderModel = getModelForClass(Order);
