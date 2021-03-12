import { Field, Float, ObjectType, Int } from 'type-graphql';

@ObjectType()
class EnjinWallet {
  @Field(() => String, { description: 'The Ethereum address of this wallet.', nullable: true })
  ethAddress?: string | null;

  @Field(() => Float, { description: 'The wallet\'s Ethereum balance.', nullable: true })
  ethBalance?: number | null;
}

@ObjectType()
class EnjinIdentity {
  @Field(() => Int, { description: 'The id of the identity.', nullable: true })
  id?: number | null;

  @Field(() => String, { description: 'The linking code for this identity. Use this to link an ethereum address to an identity.', nullable: true })
  linkingCode?: string | null;

  @Field(() => String, { description: 'A link to a QR Code for this identity linking code.', nullable: true })
  linkingCodeQr?: string | null;

  @Field(() => EnjinWallet, { description: 'The wallet for this balance.', nullable: true })
  wallet?: EnjinWallet | null;
}

@ObjectType()
export class EnjinUser {
  @Field(() => Int, { description: 'The id of the user.', nullable: true })
  id?: number;

  @Field(() => String, { description: 'The user\'s name.', nullable: true })
  name?: string;

  @Field(() => [EnjinIdentity], { description: 'The list of identities linked to the user.', nullable: true })
  identities?: EnjinIdentity[];
}

@ObjectType()
class EnjinToken {
  @Field(() => String, { description: 'The base id of the item.', nullable: true })
  id?: string | null;

  @Field(() => String, { description: 'The item index.', nullable: true })
  index?: string | null;

  @Field(() => String, { description: 'The item name.', nullable: true })
  name?: string | null;
}

@ObjectType()
export class EnjinBalance {
  @Field(() => Int, { description: 'The balance of this token.', nullable: true })
  value?: number | null;

  @Field(() => EnjinToken, { description: 'The token for this balance.', nullable: true })
  token?: EnjinToken | null;

  @Field(() => EnjinWallet, { description: 'The wallet for this balance.', nullable: true })
  wallet?: EnjinWallet | null;
}
