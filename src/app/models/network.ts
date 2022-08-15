import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Network {
  @prop({ required: true })
  public active!: boolean;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public indexerUrl!: string;

  @prop({ required: true })
  public providerUrl!: string;

  @prop({ required: true })
  public introspection!: string;

  @prop()
  public ingressWhere?: any;

  @prop()
  public uniqueCollectionPrefix?: string;
}

export const NetworkModel = getModelForClass(Network);
