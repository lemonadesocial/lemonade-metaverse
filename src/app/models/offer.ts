import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@index({ id: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Offer {
  /* Required properties */

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field()
  @prop({ required: true })
  public lastBlock!: string;

  @Field()
  @prop({ required: true })
  public created_at!: Date;

  @Field()
  @prop({ required: true })
  public offer_contract!: string;

  @Field()
  @prop({ required: true })
  public offer_id!: string;

  @Field()
  @prop({ required: true })
  public active!: boolean;

  @Field()
  @prop({ required: true })
  public seller!: string;

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
  public buyer?: string;

  @Field(() => GraphQLJSONObject)
  @prop()
  public token_metadata?: Record<string, unknown>;
}

export const OfferModel = getModelForClass(Offer);
