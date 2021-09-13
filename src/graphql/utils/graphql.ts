import { ClassType, getMetadataStorage, InputType, ObjectType } from 'type-graphql';
import { FieldMetadata } from 'type-graphql/dist/metadata/definitions';

const metadata = getMetadataStorage();

export const buildType = (
  BaseClass: ClassType,
  buildFn: (f: FieldMetadata) => FieldMetadata[] | undefined,
): any => {
  @InputType({ isAbstract: true })
  @ObjectType({ isAbstract: true })
  class ChildClass { }

  metadata.fields.forEach((f) => {
    // eslint-disable-next-line no-prototype-builtins
    if (f.target !== BaseClass && !f.target.isPrototypeOf(BaseClass)) return;

    const fields = buildFn(f);

    if (!fields?.length) return;

    fields.forEach((field) =>
      metadata.fields.push({ ...field, target: ChildClass })
    );
  });

  return ChildClass as any;
};
