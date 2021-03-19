import { Arg, Ctx, Resolver, UseMiddleware, Query } from 'type-graphql';

import { AuthenticateMiddleware } from '../middlewares/authenticate';

import { EnjinUser, EnjinBalance } from '../../app/services/enjin/types';

import * as enjinService from '../../app/services/enjin/service';

import { Context, With } from '../types';

@Resolver()
export class EnjinResolver {
  @UseMiddleware(AuthenticateMiddleware)
  @Query(() => EnjinUser)
  async getEnjinUser(
    @Ctx() ctx: With<Context, 'auth'>,
  ) {
    const { auth: { enjin_user } } = ctx;

    return enjin_user
      ? await enjinService.getUser(enjin_user)
      : null;
  }

  @Query(() => [EnjinBalance])
  async getEnjinBalances(
    @Arg('address') address: string,
  ) {
    return await enjinService.getBalances(address);
  }
}
