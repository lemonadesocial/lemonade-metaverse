import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginatedResponseArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  public skip!: number;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(100)
  public limit!: number;
}
