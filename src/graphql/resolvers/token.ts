import { Arg, Args, Resolver, Query } from 'type-graphql';

import { PaginatedResponseArgs } from '../types/paginated-response';
import { Token } from '../../app/models/token';

import { getTokens } from '../../app/services/token';

@Resolver()
class _TokensQueryResolver {
  @Query(() => [Token])
  async tokens(
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('id_in', () => [String], { nullable: true }) id_in?: string[],
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<Token[]> {
    return await getTokens({
      where: { id, id_in, contract, tokenId, owner },
      skip,
      first: limit,
    });
  }
}
