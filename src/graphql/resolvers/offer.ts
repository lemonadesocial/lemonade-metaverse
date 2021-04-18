import { Arg, ObjectType, Int, Resolver, Query } from 'type-graphql';
import { MongooseFilterQuery } from 'mongoose';

import { Offer, OfferModel } from '../../app/models/offer';
import { PaginatedResponse } from '../types/paginated-response';

@ObjectType()
class GetOffersResponse extends PaginatedResponse(Offer) { }

@Resolver()
export class OfferResolver {
  @Query(() => GetOffersResponse)
  async getOffers(
    @Arg('skip', () => Int) skip: number,
    @Arg('limit', () => Int) limit: number,
  ): Promise<GetOffersResponse> {
    const query: MongooseFilterQuery<Offer> = { };

    const [items, total] = await Promise.all([
      OfferModel.find(query).skip(skip).limit(limit),
      OfferModel.countDocuments(query),
    ]);

    return { items, total };
  }
}
