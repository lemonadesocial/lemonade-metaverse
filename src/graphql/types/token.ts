import { Directive, Field, InputType, ObjectType } from 'type-graphql';

import { SortInput } from './sort-input';
import { Token } from '../../app/models/token';
import { User } from '../../app/models/user';
import { WhereInput } from './where-input';

@InputType()
export class TokenSort extends SortInput(Token) { }

@InputType()
export class TokenWhere extends WhereInput(Token) { }

@ObjectType()
export class TokenTransfer {
  @Field()
  public createdAt!: string;

  @Field()
  public from!: string;

  @Directive('@expanded(key: "TokenTransferUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public fromExpanded?: never;

  @Field()
  public to!: string;

  @Directive('@expanded(key: "TokenTransferUser", modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public toExpanded?: never;
}

@ObjectType()
export class TokenDetail extends Token {
  @Field({ nullable: true, description: 'The owner.' })
  public owner?: string;

  @Directive('@expanded(modelName: "User", foreignField: "wallets")')
  @Field(() => User, { nullable: true })
  public ownerExpanded?: never;

  @Field(() => [TokenTransfer], { nullable: true, description: 'This token\'s transfers.' })
  public transfers?: TokenTransfer[];
}
