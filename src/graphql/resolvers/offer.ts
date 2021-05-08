import { Arg, Args, ObjectType, Resolver, InputType, Root, Query, Subscription } from 'type-graphql';

import { Fields, FieldsMap } from '../decorators/fields';

import { Offer, OfferModel } from '../../app/models/offer';
import { PaginatedResponse, PaginatedResponseArgs } from '../types/paginated-response';
import { WhereInput } from '../types/where-input';

import { getQuery, validate } from '../utils/where';

@ObjectType()
class GetOffersResponse extends PaginatedResponse(Offer) { }

@InputType()
class OfferWhereInput extends WhereInput(Offer) { }

@Resolver()
export class OfferResolver {
  @Query(() => GetOffersResponse)
  async getOffers(
    @Fields() fields: FieldsMap,
    @Args() { skip, limit }: PaginatedResponseArgs,
    @Arg('where', () => OfferWhereInput, { nullable: true }) where?: OfferWhereInput | null,
  ): Promise<GetOffersResponse> {
    const query = where ? getQuery<Offer>(where) : {};

    const [items, total] = await Promise.all([
      fields.items ? OfferModel.find(query).skip(skip).limit(limit) : null,
      fields.total ? OfferModel.countDocuments(query) : null,
    ]);

    return { items, total };
  }

  @Subscription({
    topics: 'offer_created',
    filter: ({ args, payload }) => args.where ? validate(args.where, payload) : true,
  })
  offerCreated(
    @Root() offer: Offer,
    @Arg('where', () => OfferWhereInput, { nullable: true }) _?: OfferWhereInput | null,
  ): Offer {
    return offer;
  }

  @Subscription({
    topics: 'offer_updated',
    filter: ({ args, payload }) => args.where ? validate(args.where, payload) : true,
  })
  offerUpdated(
    @Root() offer: Offer,
    @Arg('where', () => OfferWhereInput, { nullable: true }) _?: OfferWhereInput | null,
  ): Offer {
    return offer;
  }
}
