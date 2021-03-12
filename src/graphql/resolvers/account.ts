import { Arg, ObjectType, Int, Mutation, Resolver, Query } from 'type-graphql';
import { MongooseFilterQuery } from 'mongoose';

import { Account, AccountModel } from '../../app/models/account';

import { PaginatedResponse } from '../types/paginated-response';

@ObjectType()
class GetAccountsResponse extends PaginatedResponse(Account) { }

@Resolver()
export class AccountResolver {
  @Query(() => GetAccountsResponse)
  async getAccounts(
    @Arg('skip', () => Int) skip: number,
    @Arg('limit', () => Int) limit: number,
  ): Promise<GetAccountsResponse> {
    const query: MongooseFilterQuery<Account> = { };

    const [items, total] = await Promise.all([
      AccountModel.find(query).skip(skip).limit(limit),
      AccountModel.countDocuments(query),
    ]);

    return { items, total };
  }

  @Mutation(() => Account)
  async createAccount(): Promise<Account> {
    const account = await AccountModel.create({
      active: true,
      public_key: 'my_public_key',
      secret: 'my_secret',
    });

    return account.toObject();
  }
}
