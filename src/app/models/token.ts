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

  @Field()
  @prop({ required: true })
  public contract!: string;

  @Field({ nullable: true })
  @prop()
  public createdAt?: Date;

  @Field({ nullable: true })
  @prop()
  public creator?: string;

  @Field({ nullable: true })
  @prop()
  public owner?: string;

  @Field()
  @prop({ required: true })
  public tokenId!: string;

  @Field()
  @prop({ required: true })
  public uri!: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @prop()
  public metadata?: Record<string, unknown>;
}

export const TokenModel = getModelForClass(Token);
