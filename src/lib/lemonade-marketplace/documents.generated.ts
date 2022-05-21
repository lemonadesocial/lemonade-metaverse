import gql from 'graphql-tag';
export const tokenFields = gql`
    fragment tokenFields on Token {
  id
  contract
  createdAt
  creator
  tokenId
}
    `;
export const Ingress = gql`
    query Ingress($orders_include: Boolean!, $orders_lastBlock_gt: BigInt = -1, $orders_skip: Int, $orders_first: Int, $tokens_include: Boolean!, $tokens_contract_in: [Bytes!], $tokens_createdAt_gt: BigInt = -1, $tokens_skip: Int, $tokens_first: Int) {
  _meta {
    block {
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
    updatedAt
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
    where: {contract_in: $tokens_contract_in, createdAt_gt: $tokens_createdAt_gt}
  ) @include(if: $tokens_include) {
    ...tokenFields
  }
}
    ${tokenFields}`;
export const GetTokens = gql`
    query GetTokens($where: Token_filter, $orderBy: Token_orderBy, $orderDirection: OrderDirection, $skip: Int, $first: Int) {
  tokens(
    where: $where
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $skip
    first: $first
  ) {
    ...tokenFields
  }
}
    ${tokenFields}`;
export const GetToken = gql`
    query GetToken($id: ID!) {
  token(id: $id) {
    ...tokenFields
    owner
    orders(orderBy: createdAt, orderDirection: desc) {
      createdAt
      transaction
      updatedAt
      updatedTransaction
      maker
      currency {
        id
        name
        symbol
      }
      price
      bids(orderBy: createdAt, orderDirection: desc) {
        createdAt
        transaction
        bidder
        bidAmount
      }
      taker
      paidAmount
    }
    transfers(orderBy: createdAt, orderDirection: desc) {
      createdAt
      transaction
      from
      to
    }
  }
}
    ${tokenFields}`;