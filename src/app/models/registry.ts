import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@index({ network: 1, id: 1 }, { unique: true })
@ObjectType()
export class Registry {
  @Field()
  @prop({ required: true })
  public network!: string;

  @Field()
  @prop({ required: true })
  public id!: string;

  @Field({ nullable: true })
  @prop()
  public isERC721?: boolean;

  @Field({ nullable: true })
  @prop()
  public supportsERC721Metadata?: boolean;

  @Field({ nullable: true })
  @prop()
  public supportsERC2981?: boolean;

  @Field({ nullable: true })
  @prop()
  public supportsLemonadePoapV1?: boolean;

  @Field({ nullable: true })
  @prop()
  public supportsRaribleRoyaltiesV2?: boolean;
}

export const RegistryModel = getModelForClass(Registry);
