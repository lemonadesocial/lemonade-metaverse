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
    tokenURI
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
export const StreamOffers = gql`
    subscription StreamOffers($lastBlock_gt: BigInt = -1) {
  offers {
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
}
    `;