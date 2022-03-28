import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

@ObjectType()
export class User {
  @Field()
  public _id!: string;

  @Field()
  @prop({ required: true })
  public name!: string;

  @Field({ nullable: true })
  @prop()
  public image_avatar?: string;

  @Field({ nullable: true })
  @prop()
  public tagline?: string;

  @Field({ nullable: true })
  @prop()
  public username?: string;

  @prop({ lowercase: true, type: () => String })
  public wallets?: string[];
}

export const UserModel = getModelForClass(User, { existingConnection: mongoose.connection.useDb('lemonade') });
