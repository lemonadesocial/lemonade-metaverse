import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@index({ id: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Order {
  /* Required properties */

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field()
  @prop({ required: true })
  public last_block!: string;

  @Field()
  @prop({ required: true })
  public created_at!: Date;

  @Field()
  @prop({ required: true })
  public order_contract!: string;

  @Field()
  @prop({ required: true })
  public order_id!: string;

  @Field()
  @prop({ required: true })
  public open!: boolean;

  @Field()
  @prop({ required: true })
  public maker!: string;

  @Field()
  @prop({ required: true })
  public currency_contract!: string;

  @Field()
  @prop({ required: true })
  public currency_name!: string;

  @Field()
  @prop({ required: true })
  public currency_symbol!: string;

  @Field()
  @prop({ required: true })
  public price!: string;

  @Field()
  @prop({ required: true })
  public priceIsMinimum!: boolean;

  @Field()
  @prop({ required: true })
  public token_contract!: string;

  @Field()
  @prop({ required: true })
  public token_id!: string;

  @Field()
  @prop({ required: true })
  public token_uri!: string;

  /* Optional properties */

  @Field({ nullable: true })
  @prop()
  public taker?: string;

  @Field({ nullable: true })
  @prop()
  public paid_amount?: string;

  @Field(() => GraphQLJSONObject)
  @prop()
  public token_metadata?: Record<string, unknown>;
}

export const OrderModel = getModelForClass(Order);
