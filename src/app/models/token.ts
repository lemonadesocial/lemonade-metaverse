import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { GraphQLJSONObject } from 'graphql-type-json';

import type { Order } from './order';

@ObjectType()
export class TokenRoyalty {
  @Field()
  @prop({ required: true })
  public account!: string;

  @Field()
  @prop({ required: true })
  public value!: string;
}

@ObjectType({ isAbstract: true })
@index({ id: 1, network: 1 }, { unique: true })
@index({ contract: 1, tokenId: 1, network: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Token {
  @Field()
  @prop({ required: true })
  public network!: string;

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field({ description: 'The contract address.' })
  @prop({ required: true })
  public contract!: string;

  @Field({ nullable: true, description: 'When this token was created.' })
  @prop()
  public createdAt?: Date;

  @Field({ nullable: true, description: 'The creator. The transaction creator.' })
  @prop()
  public creator?: string;

  @Field({ description: 'The token ID.' })
  @prop({ required: true })
  public tokenId!: string;

  @Field({ nullable: true, description: 'The number of times this token has been enriched.' })
  @prop()
  public enrichCount?: number;

  @Field({ nullable: true, description: 'When this token was last enriched.' })
  @prop()
  public enrichedAt?: Date;

  @Field({ nullable: true, description: 'The metadata URI.' })
  @prop()
  public uri?: string;

  @Field({ nullable: true, description: 'The royalty maker.', deprecationReason: 'Use royalties.' })
  @prop()
  public royaltyMaker?: string;

  @Field({ nullable: true, description: 'The royalty fraction.', deprecationReason: 'Use royalties.' })
  @prop()
  public royaltyFraction?: string;

  @Field(() => [TokenRoyalty], { nullable: true, description: 'The token royalties.' })
  @prop({ default: undefined, _id: false })
  public royalties?: TokenRoyalty[];

  @Field(() => GraphQLJSONObject, { nullable: true, description: 'The actual metadata.' })
  @prop()
  public metadata?: Record<string, unknown>;

  @Field({ nullable: true, description: 'The founder. The first owner.' })
  @prop()
  public founder?: string;

  @prop({ type: () => String })
  public order?: string | Order;
}

export const TokenModel = getModelForClass(Token);
