import { getModelForClass, prop } from '@typegoose/typegoose';

export class Network {
  @prop({ required: true })
  public active!: boolean;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public indexerUrl!: string;

  @prop({ required: true })
  public providerUrl!: string;

  @prop({ type: String })
  public ingressContracts?: string[];
}

export const NetworkModel = getModelForClass(Network);
