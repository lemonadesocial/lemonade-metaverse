import { ClassType, Field, ObjectType, Int } from 'type-graphql';

export const PaginatedResponse = <TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | string | number | boolean,
) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue], { nullable: true })
    public items!: TItemsFieldValue[] | null;

    @Field(() => Int, { nullable: true })
    public total!: number | null;
  }

  return PaginatedResponseClass;
}
