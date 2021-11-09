import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@index({ id: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Token {
  @Field()
  @prop({ required: true })
  public id!: string;

  @Field({ description: 'The contract address.' })
  @prop({ required: true })
  public contract!: string;

  @Field({ nullable: true, description: 'When this token was created.' })
  @prop()
  public createdAt?: Date;

  @Field({ nullable: true, description: 'The creator.' })
  @prop()
  public creator?: string;

  @Field({ description: 'The token ID.' })
  @prop({ required: true })
  public tokenId!: string;

  @Field({ description: 'The metadata URI.' })
  @prop({ required: true })
  public uri!: string;

  @Field({ nullable: true, description: 'The royalty maker.' })
  @prop()
  public royaltyMaker?: string;

  @Field({ nullable: true, description: 'The royalty fraction.' })
  @prop()
  public royaltyFraction?: string;

  @Field(() => GraphQLJSONObject, { nullable: true, description: 'The actual metadata.' })
  @prop()
  public metadata?: Record<string, unknown>;
}

export const TokenModel = getModelForClass(Token);
