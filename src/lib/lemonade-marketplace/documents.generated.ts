import gql from 'graphql-tag';

export const Poll = gql`
    query Poll($lastBlock_gt: BigInt = -1, $skip: Int!, $first: Int!) {
  _meta {
    block {
      hash
      number
    }
    hasIndexingErrors
  }
  orders(
    orderBy: lastBlock
    orderDirection: asc
    where: {lastBlock_gt: $lastBlock_gt}
    skip: $skip
    first: $first
  ) {
    id
    lastBlock
    contract
    orderId
    createdAt
    kind
    open
    openFrom
    openTo
    maker
    currency {
      id
      name
      symbol
    }
    price
    token {
      id
      contract
      createdAt
      creator
      tokenId
      uri
    }
    bidder
    bidAmount
    taker
    paidAmount
  }
}
    `;
export const TokensOf = gql`
    query TokensOf($owner: Bytes!, $skip: Int!, $first: Int!) {
  tokens(where: {owner: $owner}, skip: $skip, first: $first) {
    id
    contract
    createdAt
    creator
    tokenId
    uri
  }
}
    `;