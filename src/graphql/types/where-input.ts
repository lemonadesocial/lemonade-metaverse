import { ClassType, getMetadataStorage, InputType } from 'type-graphql';

type WhereType<T> =
    { [K in keyof T as `${K & string}_eq`]?: T[K]; }
  & { [K in keyof T as `${K & string}_in`]?: T[K][]; };
type WhereKeys<T> = { [K in keyof T]: T[K] extends Record<string, any> ? never : K }[keyof T];

export type Where<T> = WhereType<Pick<T, WhereKeys<T>>>;

export const WhereInput = <TClassType extends ClassType>(
  BaseClass: TClassType,
): ClassType<Where<InstanceType<TClassType>>> => {
  const metadata = getMetadataStorage();
  const targets = metadata.objectTypes.map(({ target }) => target);

  @InputType({ isAbstract: true })
  class WhereInputClass { }

  metadata.fields.forEach((f) => {
    if (f.target !== BaseClass) return;

    const typeValue = f.getType();

    if (typeValue instanceof Function && targets.includes(typeValue)) return;

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
