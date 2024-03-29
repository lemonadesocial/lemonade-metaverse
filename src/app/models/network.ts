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
  public enrichChannel?: Record<string, string>;

  @prop()
  public ingressEnabled?: boolean;

  @prop()
  public ingressWhere?: Record<string, unknown>;

  @prop()
  public uniqueApiUrl?: string;

  @prop()
  public uniqueCollectionPrefix?: string;
}

export const NetworkModel = getModelForClass(Network);
