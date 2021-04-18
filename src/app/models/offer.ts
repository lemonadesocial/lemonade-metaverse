import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@index({ id: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Offer {
  /* Indexer properties */

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field()
  @prop({ required: true })
  public created_at!: Date;

  @Field()
  @prop({ required: true })
  public updated_at!: Date;

  @Field()
  @prop({ required: true })
  public offer_contract!: string;

  @Field()
  @prop({ required: true })
  public offer_id!: string;

  @Field()
  @prop({ required: true })
  public token_uri!: string;

  @Field()
  @prop({ required: true })
  public active!: boolean;

  @Field()
  @prop({ required: true })
  public seller!: string;

  @Field()
  @prop({ required: true })
  public currency!: string;

  @Field()
  @prop({ required: true })
  public price!: string;

  @Field()
  @prop({ required: true })
  public token_contract!: string;

  @Field()
  @prop({ required: true })
  public token_id!: string;

  @Field({ nullable: true })
  @prop()
  public buyer?: string;

  /* Backend properties */

  @Field(() => GraphQLJSON, { nullable: true })
  @prop()
  public token_metadata?: Record<string, unknown>;
}

export const OfferModel = getModelForClass(Offer);
