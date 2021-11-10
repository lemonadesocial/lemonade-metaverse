import { ClassType, Field, InputType, registerEnumType } from 'type-graphql';

import { buildEnum } from '../utils/graphql';

export enum SortDirection {
  ASC,
  DESC,
}
registerEnumType(SortDirection, { name: 'SortDirection' });

type Sort<T> = {
  by: keyof T;
  direction: SortDirection;

  toDocument(): Record<string, number>;
};

export function SortInput<T extends ClassType>(
  Class: T,
): ClassType<Sort<InstanceType<T>>> {
  const By = buildEnum(Class, Class.name + 'SortBy');

  @InputType({ isAbstract: true })
  class SortClass {
    @Field(() => By)
    public by!: keyof typeof By;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    public direction!: SortDirection;

    public toDocument() {
      return { [this.by]: this.direction === SortDirection.ASC ? 1 : -1 };
    }
  }

  return SortClass;
}
