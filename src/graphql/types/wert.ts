import { ArgsType, Field, InputType, registerEnumType } from 'type-graphql';
import { Pick } from 'type-graphql-utils';

import { Order } from '../../app/models/order';

export enum WertOptionsType {
  BID = 'BID',
  FILL = 'FILL',
}
registerEnumType(WertOptionsType, { name: 'WertOptionsSignatureType' });

@InputType()
class WertOptionsOrder extends Pick(Order, { network: 1, id: 1 }) { }

@ArgsType()
export class WertOptionsArgs {
  @Field(() => WertOptionsType)
  public type!: WertOptionsType;

  @Field(() => WertOptionsOrder)
  public order!: WertOptionsOrder;

  @Field()
  public amount!: string;

  @Field()
  public subject!: string;
}
