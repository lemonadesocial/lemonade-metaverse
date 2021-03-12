import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

import * as crypto from '../helpers/crypto';

@ObjectType()
@index({ public_key: 1 }, { unique: true })
@modelOptions({ schemaOptions: { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } })
export class Account {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public active!: boolean;

  @Field()
  @prop({ required: true })
  public public_key!: string;

  @prop({ required: true, set: crypto.encrypt, get: crypto.decrypt })
  public secret!: string;
}

export const AccountModel = getModelForClass(Account);
