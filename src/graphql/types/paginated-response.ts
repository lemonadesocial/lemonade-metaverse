import { ClassType, Field, ObjectType, Int } from 'type-graphql';

export const PaginatedResponse = <TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | string | number | boolean,
) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue])
    public items!: TItemsFieldValue[];

    @Field(() => Int)
    public total!: number;
  }

  return PaginatedResponseClass;
}
