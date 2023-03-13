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
    query Ingress($block: Block_height, $orders_include: Boolean!, $orders_where: Order_filter, $orders_first: Int, $tokens_include: Boolean!, $tokens_where: Token_filter, $tokens_first: Int) {
  _meta {
    block {
      number
      timestamp
    }
    hasIndexingErrors
  }
  orders(
    block: $block
    orderBy: id
    orderDirection: asc
    where: $orders_where
    first: $orders_first
  ) @include(if: $orders_include) {
    id
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
    block: $block
    orderBy: id
    orderDirection: asc
    where: $tokens_where
    first: $tokens_first
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
    owner
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