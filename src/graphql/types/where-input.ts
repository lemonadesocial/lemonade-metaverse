import { ClassType, getMetadataStorage } from 'type-graphql';

import { buildType } from '../utils/graphql';

const metadata = getMetadataStorage();

type WhereType<T> =
    { [K in keyof T as `${K & string}_eq`]?: T[K]; }
  & { [K in keyof T as `${K & string}_in`]?: T[K][]; };
type WhereKeys<T> = { [K in keyof T]: Exclude<T[K], string> extends Record<string, any> ? never : K }[keyof T];
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
        name: `${f.name}_in`,
        schemaName: `${f.name}_in`,
        typeOptions: { array: true, arrayDepth: 1, nullable: true },
      },
    ];
  });
};
