import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop } from '@typegoose/typegoose';

import { Token } from './token';

export enum OrderKind {
  Auction = 'AUCTION',
  Direct = 'DIRECT',
}

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
  @Field()
  @prop({ required: true })
  public id!: string;

  @Field()
  @prop({ required: true })
  public lastBlock!: string;

  @Field()
  @prop({ required: true })
  public contract!: string;

  @Field()
  @prop({ required: true })
  public orderId!: string;

  @Field()
  @prop({ required: true })
  public createdAt!: Date;

  @Field()
  @prop({ required: true, enum: OrderKind })
  public kind!: OrderKind;

  @Field()
  @prop({ required: true })
  public open!: boolean;

  @Field({ nullable: true })
  @prop()
  public openFrom?: Date;

  @Field({ nullable: true })
  @prop()
  public openTo?: Date;

  @Field()
  @prop({ required: true })
  public maker!: string;

  @Field(() => Currency)
  @prop({ required: true, _id: false })
  public currency!: Currency;

  @Field()
  @prop({ required: true })
  public price!: string;

  @Field(() => Token)
  @prop({ required: true, type: () => String })
  public token!: Token | string;

  @Field({ nullable: true })
  @prop()
  public bidder?: string;

  @Field({ nullable: true })
  @prop()
  public bidAmount?: string;

  @Field({ nullable: true })
  @prop()
  public taker?: string;

  @Field({ nullable: true })
  @prop()
  public paidAmount?: string;
}

export const OrderModel = getModelForClass(Order);
