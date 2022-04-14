import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ network: 1, id: 1 }, { unique: true })
export class Registry {
  @prop({ required: true })
  public network!: string;

  @prop({ required: true })
  public id!: string;

  @prop()
  public isERC721?: boolean;

  @prop()
  public supportsERC721Metadata?: boolean;

  @prop()
  public supportsERC2981?: boolean;

  @prop()
  public supportsRaribleRoyaltiesV2?: boolean;
}

export const RegistryModel = getModelForClass(Registry);
