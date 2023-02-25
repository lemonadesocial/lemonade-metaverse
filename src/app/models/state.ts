import { getModelForClass, index, prop, modelOptions, Severity } from '@typegoose/typegoose';

@index({ key: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class State {
  @prop({ required: true })
  public key!: string;

  @prop({ required: true })
  public value!: unknown;
}

export const StateModel = getModelForClass(State);
