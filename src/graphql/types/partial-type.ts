import { ClassType, getMetadataStorage, InputType, ObjectType } from 'type-graphql';

export const PartialType = <TClassType extends ClassType>(
  BaseClass: TClassType,
) => {
  const metadata = getMetadataStorage();

  @InputType({ isAbstract: true })
  @ObjectType({ isAbstract: true })
  class PartialTypeClass extends BaseClass { }

  metadata.fields.forEach((f) => {
    if (f.target !== BaseClass) return;

    metadata.fields.push({
      ...f,
      typeOptions: { ...f.typeOptions, nullable: true },
      target: PartialTypeClass,
    });
  });

  return PartialTypeClass as ClassType<Partial<InstanceType<TClassType>>>;
};
