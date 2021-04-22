import gql from 'graphql-tag';

export const GetOffers = gql`
    query GetOffers($lastBlock_gt: BigInt = -1, $skip: Int!, $first: Int!) {
  offers(
    orderBy: lastBlock
    orderDirection: asc
    where: {lastBlock_gt: $lastBlock_gt}
    skip: $skip
    first: $first
  ) {
    id
    lastBlock
    createdAt
    offerContract
    offerId
    active
    seller
    currency
    price
    tokenContract
    tokenId
    buyer
  }
}
    `;