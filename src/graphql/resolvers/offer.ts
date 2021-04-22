import { Arg, ObjectType, Int, Resolver, Query } from 'type-graphql';
import { MongooseFilterQuery } from 'mongoose';

import { Fields, FieldsMap } from '../decorators/fields';

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
    @Fields() fields: FieldsMap,
  ): Promise<GetOffersResponse> {
    const query: MongooseFilterQuery<Offer> = { };

    const [items, total] = await Promise.all([
      fields.items ? OfferModel.find(query).skip(skip).limit(limit) : null,
      fields.total ? OfferModel.countDocuments(query) : null,
    ]);

    return { items, total };
  }
}
