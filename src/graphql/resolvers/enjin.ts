import { ApolloError } from 'apollo-server-koa';
import { Arg, Ctx, Resolver, UseMiddleware, Query } from 'type-graphql';
import * as assert from 'assert';

import { AuthenticateMiddleware } from '../middlewares/authenticate';

import { request } from '../../app/helpers/enjin';

import { Context, With } from '../types';
import { EnjinUser, EnjinBalance } from '../../lib/enjin/types.generated';

@Resolver()
export class EnjinResolver {
  @UseMiddleware(AuthenticateMiddleware)
  @Query(() => EnjinUser, { nullable: true })
  async getEnjinUser(
    @Ctx() ctx: With<Context, 'auth'>,
  ) {
    const { auth: { enjin_user: id } } = ctx;

    assert.ok(id, new ApolloError('Enjin user is missing from authorization token payload.'));

    const { EnjinUser } = await request('EnjinUser', { id });

    return EnjinUser;
  }

  @Query(() => [EnjinBalance])
  async getEnjinBalances(
    @Arg('address') address: string,
  ) {
    const { EnjinBalances } = await request('EnjinBalances', { address });

    return EnjinBalances;
  }
}
