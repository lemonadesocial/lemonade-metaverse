import { Arg, ObjectType, Int, Resolver, Root, Query, Subscription } from 'type-graphql';
import { MongooseFilterQuery } from 'mongoose';

import { Fields, FieldsMap } from '../decorators/fields';

import { Offer, OfferModel } from '../../app/models/offer';
import { PaginatedResponse } from '../types/paginated-response';
import { PartialType } from '../types/partial-type';

@ObjectType()
class GetOffersResponse extends PaginatedResponse(Offer) { }

@ObjectType()
class OfferUpdatedResponse extends PartialType(Offer) { }

@Resolver()
export class OfferResolver {
  @Query(() => GetOffersResponse)
  async getOffers(
    @Arg('id_in', () => [String], { nullable: true }) id_in: string[] | null,
    @Arg('skip', () => Int) skip: number,
    @Arg('limit', () => Int) limit: number,
    @Fields() fields: FieldsMap,
  ): Promise<GetOffersResponse> {
    const query: MongooseFilterQuery<Offer> = { };

    if (id_in) query.id = { $in: id_in };

    const [items, total] = await Promise.all([
      fields.items ? OfferModel.find(query).skip(skip).limit(limit) : null,
      fields.total ? OfferModel.countDocuments(query) : null,
    ]);

    return { items, total };
  }

  @Subscription({
    topics: 'offer_updated',
    filter: ({ args, payload }) => args.id_in?.includes(payload.id) ?? true,
  })
  offerUpdated(
    @Root() offer: Offer,
    @Arg('id_in', () => [String], { nullable: true }) _: string[] | null,
  ): OfferUpdatedResponse {
    return offer;
  }
}
