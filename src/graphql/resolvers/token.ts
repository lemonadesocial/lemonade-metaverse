import { Arg, Args, Resolver, Query } from 'type-graphql';

import { PaginatedResponseArgs } from '../types/paginated-response';
import { Token } from '../../app/models/token';

import { getTokens } from '../../app/services/token';

@Resolver()
class _TokensQueryResolver {
  @Query(() => [Token])
  async tokens(
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('contract', () => String, { nullable: true }) contract?: string,
    @Arg('tokenId', () => String, { nullable: true }) tokenId?: string,
    @Arg('owner', () => String, { nullable: true }) owner?: string,
  ): Promise<Token[]> {
    return await getTokens({
      where: { contract, tokenId, owner },
      skip,
      first: limit,
    });
  }
}
