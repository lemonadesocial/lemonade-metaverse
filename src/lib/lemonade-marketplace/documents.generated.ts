import gql from 'graphql-tag';
export const tokenFields = gql`
    fragment tokenFields on Token {
  id
  contract
  createdAt
  creator
  tokenId
  uri
  royaltyMaker
  royaltyFraction
}
    `;
export const Ingress = gql`
    query Ingress($orders_include: Boolean!, $orders_lastBlock_gt: BigInt = -1, $orders_skip: Int, $orders_first: Int, $tokens_include: Boolean!, $tokens_createdAt_gt: BigInt = -1, $tokens_skip: Int, $tokens_first: Int) {
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
    where: {lastBlock_gt: $orders_lastBlock_gt}
    skip: $orders_skip
    first: $orders_first
  ) @include(if: $orders_include) {
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
      ...tokenFields
    }
    bidder
    bidAmount
    taker
    paidAmount
  }
  tokens(
    orderBy: createdAt
    orderDirection: asc
    where: {contract_in: ["0x7254e06afb533964b389be742524fa696a290c81", "0xbaBB811e9D822Be557042c0E8031C331ce13bBa5"], createdAt_gt: $tokens_createdAt_gt}
  ) @include(if: $tokens_include) {
    ...tokenFields
  }
}
    ${tokenFields}`;
export const GetTokens = gql`
    query GetTokens($where: Token_filter, $skip: Int, $first: Int) {
  tokens(where: $where, skip: $skip, first: $first) {
    ...tokenFields
  }
}
    ${tokenFields}`;