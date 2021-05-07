import { ArgsType, ClassType, Field, ObjectType, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginatedResponseArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  public skip!: number;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(100)
  public limit!: number;
}

export const PaginatedResponse = <TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | string | number | boolean,
) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue], { nullable: true })
    public items?: TItemsFieldValue[] | null;

    @Field(() => Int, { nullable: true })
    public total?: number | null;
  }

  return PaginatedResponseClass;
}
