import { ClassType, getMetadataStorage, InputType } from 'type-graphql';

export type Where<T> = { [K in keyof T as `${K & string}_eq`]?: T[K] | null; }
  & { [K in keyof T as `${K & string}_in`]?: T[K][] | null; };

export const WhereInput = <TClassType extends ClassType>(
  BaseClass: TClassType,
): ClassType<Where<InstanceType<TClassType>>> => {
  const metadata = getMetadataStorage();

  @InputType({ isAbstract: true })
  class WhereInputClass { }

  metadata.fields.forEach((f) => {
    if (f.target !== BaseClass) return;

    metadata.fields.push(
      {
        ...f,
        name: `${f.name}_eq`,
        schemaName: `${f.name}_eq`,
        typeOptions: { nullable: true },
        target: WhereInputClass,
      },
      {
        ...f,
        name: `${f.name}_in`,
        schemaName: `${f.name}_in`,
        typeOptions: { array: true, arrayDepth: 1, nullable: true },
        target: WhereInputClass,
      },
    );
  });

  return WhereInputClass;
};
