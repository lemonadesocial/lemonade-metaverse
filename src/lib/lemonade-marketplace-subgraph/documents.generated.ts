import gql from 'graphql-tag';
export const OfferFragment = gql`
    fragment OfferFragment on Offer {
  id
  lastBlock
  createdAt
  offerContract
  offerId
  tokenURI
  active
  seller
  currency
  price
  tokenContract
  tokenId
  buyer
}
    `;
export const GetOffers = gql`
    query GetOffers($lastBlock_gt: BigInt = -1, $skip: Int!, $first: Int!) {
  offers(
    orderBy: lastBlock
    orderDirection: asc
    where: {lastBlock_gt: $lastBlock_gt}
    skip: $skip
    first: $first
  ) {
    ...OfferFragment
  }
}
    ${OfferFragment}`;
export const StreamOffers = gql`
    subscription StreamOffers($lastBlock_gt: BigInt = -1) {
  offers(
    orderBy: lastBlock
    orderDirection: asc
    where: {lastBlock_gt: $lastBlock_gt}
  ) {
    ...OfferFragment
  }
}
    ${OfferFragment}`;