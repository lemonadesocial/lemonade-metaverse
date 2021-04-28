import { ClassType, getMetadataStorage, InputType, ObjectType } from 'type-graphql';

export const PartialType = <TClassType extends ClassType>(
  BaseClass: TClassType,
) => {
  const metadata = getMetadataStorage();

  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PartialClass extends BaseClass { }

  metadata.fields.forEach((f) => {
    if (f.target === BaseClass || BaseClass.prototype instanceof f.target) {
      metadata.fields.push({
        ...f,
        typeOptions: { ...f.typeOptions, nullable: true },
        target: PartialClass,
      });
    }
  });

  return PartialClass as ClassType<Partial<InstanceType<TClassType>>>;
};
