import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ id: 1 }, { unique: true })
export class Registry {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public isERC721!: boolean;

  @prop({ required: true })
  public supportsERC721Metadata!: boolean;

  @prop({ required: true })
  public supportsERC2981!: boolean;

  @prop({ required: true })
  public supportsRaribleRoyaltiesV2!: boolean;
}

export const RegistryModel = getModelForClass(Registry);
