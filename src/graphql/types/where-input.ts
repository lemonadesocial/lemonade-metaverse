import { buildType } from 'type-graphql-utils';
import { ClassType, getMetadataStorage } from 'type-graphql';

const metadata = getMetadataStorage();

type WhereType<T> =
    { [K in keyof T as `${K & string}_eq`]?: T[K]; }
  & { [K in keyof T as `${K & string}_exists`]?: boolean; }
  & { [K in keyof T as `${K & string}_gt`]?: T[K]; }
  & { [K in keyof T as `${K & string}_gte`]?: T[K]; }
  & { [K in keyof T as `${K & string}_in`]?: T[K][]; }
  & { [K in keyof T as `${K & string}_lt`]?: T[K]; }
  & { [K in keyof T as `${K & string}_lte`]?: T[K]; };
type WhereKeys<T> = { [K in keyof T]: Exclude<T[K], string> extends Record<string, unknown> ? never : K }[keyof T];
export type Where<T> = WhereType<Pick<T, WhereKeys<T>>>;

export const WhereInput = <TClassType extends ClassType>(
  BaseClass: TClassType,
): ClassType<Where<InstanceType<TClassType>>> => {
  const targets = metadata.objectTypes.map(({ target }) => target);

  return buildType(BaseClass, (f) => {
    const typeValue = f.getType();

    if (typeValue instanceof Function && targets.includes(typeValue)) return;

    return [
      {
        ...f,
        name: `${f.name}_eq`,
        schemaName: `${f.name}_eq`,
        typeOptions: { nullable: true },
      },
      {
        ...f,
        getType: () => Boolean,
        name: `${f.name}_exists`,
        schemaName: `${f.name}_exists`,
        typeOptions: { nullable: true },
      },
      {
        ...f,
        name: `${f.name}_gt`,
        schemaName: `${f.name}_gt`,
        typeOptions: { nullable: true },
      },
      {
        ...f,
        name: `${f.name}_gte`,
        schemaName: `${f.name}_gte`,
        typeOptions: { nullable: true },
      },
      {
        ...f,
        name: `${f.name}_in`,
        schemaName: `${f.name}_in`,
        typeOptions: { array: true, arrayDepth: 1, nullable: true },
      },
      {
        ...f,
        name: `${f.name}_lt`,
        schemaName: `${f.name}_lt`,
        typeOptions: { nullable: true },
      },
      {
        ...f,
        name: `${f.name}_lte`,
        schemaName: `${f.name}_lte`,
        typeOptions: { nullable: true },
      },
    ];
  });
};
