/* eslint-disable no-prototype-builtins */
import { ClassType, getMetadataStorage, InputType, registerEnumType, ObjectType } from 'type-graphql';
import type { FieldMetadata } from 'type-graphql/dist/metadata/definitions';

const metadata = getMetadataStorage();

export function buildEnum<T extends ClassType>(
  Class: T,
  name: string,
): Record<keyof InstanceType<T>, keyof InstanceType<T>> {
  const enumObj = {} as Record<keyof InstanceType<T>, keyof InstanceType<T>>;

  metadata.fields.forEach((f) => {
    if (f.target !== Class && !f.target.isPrototypeOf(Class)) return;

    enumObj[f.name as keyof InstanceType<T>] = f.name;
  });

  registerEnumType(enumObj, { name });

  return enumObj;
}

export function buildType(
  BaseClass: ClassType,
  buildFn: (f: FieldMetadata) => FieldMetadata[] | undefined,
): any {
  @InputType({ isAbstract: true })
  @ObjectType({ isAbstract: true })
  class ChildClass { }

  metadata.fields.forEach((f) => {
    if (f.target !== BaseClass && !f.target.isPrototypeOf(BaseClass)) return;

    const fields = buildFn(f);

    if (!fields?.length) return;

    fields.forEach((field) =>
      metadata.fields.push({ ...field, target: ChildClass })
    );
  });

  return ChildClass;
}
