export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: string;
  Bytes: string;
};

export type Bid = {
  __typename?: 'Bid';
  bidAmount: Scalars['BigInt'];
  bidder: Scalars['Bytes'];
  createdAt: Scalars['BigInt'];
  id: Scalars['ID'];
  order: Order;
  transaction: Scalars['Bytes'];
};

export type Bid_filter = {
  bidAmount?: Maybe<Scalars['BigInt']>;
  bidAmount_gt?: Maybe<Scalars['BigInt']>;
  bidAmount_gte?: Maybe<Scalars['BigInt']>;
  bidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  bidAmount_lt?: Maybe<Scalars['BigInt']>;
  bidAmount_lte?: Maybe<Scalars['BigInt']>;
  bidAmount_not?: Maybe<Scalars['BigInt']>;
  bidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bidder?: Maybe<Scalars['Bytes']>;
  bidder_contains?: Maybe<Scalars['Bytes']>;
  bidder_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_not?: Maybe<Scalars['Bytes']>;
  bidder_not_contains?: Maybe<Scalars['Bytes']>;
  bidder_not_in?: Maybe<Array<Scalars['Bytes']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  order?: Maybe<Scalars['String']>;
  order_contains?: Maybe<Scalars['String']>;
  order_contains_nocase?: Maybe<Scalars['String']>;
  order_ends_with?: Maybe<Scalars['String']>;
  order_ends_with_nocase?: Maybe<Scalars['String']>;
  order_gt?: Maybe<Scalars['String']>;
  order_gte?: Maybe<Scalars['String']>;
  order_in?: Maybe<Array<Scalars['String']>>;
  order_lt?: Maybe<Scalars['String']>;
  order_lte?: Maybe<Scalars['String']>;
  order_not?: Maybe<Scalars['String']>;
  order_not_contains?: Maybe<Scalars['String']>;
  order_not_contains_nocase?: Maybe<Scalars['String']>;
  order_not_ends_with?: Maybe<Scalars['String']>;
  order_not_ends_with_nocase?: Maybe<Scalars['String']>;
  order_not_in?: Maybe<Array<Scalars['String']>>;
  order_not_starts_with?: Maybe<Scalars['String']>;
  order_not_starts_with_nocase?: Maybe<Scalars['String']>;
  order_starts_with?: Maybe<Scalars['String']>;
  order_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['Bytes']>;
  transaction_contains?: Maybe<Scalars['Bytes']>;
  transaction_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction_not?: Maybe<Scalars['Bytes']>;
  transaction_not_contains?: Maybe<Scalars['Bytes']>;
  transaction_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Bid_orderBy {
  bidAmount = 'bidAmount',
  bidder = 'bidder',
  createdAt = 'createdAt',
  id = 'id',
  order = 'order',
  transaction = 'transaction'
}

/** The block at which the query should be executed. */
export type Block_height = {
  /** Value containing a block hash */
  hash?: Maybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: Maybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: Maybe<Scalars['Int']>;
};

export type Currency = {
  __typename?: 'Currency';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  orders: Array<Order>;
  symbol?: Maybe<Scalars['String']>;
};


export type CurrencyordersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Order_filter>;
};

export type Currency_filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_contains_nocase?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_ends_with_nocase?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_contains_nocase?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with_nocase?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with_nocase?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_starts_with_nocase?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_contains_nocase?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_ends_with_nocase?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_not_contains_nocase?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: Maybe<Scalars['String']>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_starts_with_nocase?: Maybe<Scalars['String']>;
};

export enum Currency_orderBy {
  id = 'id',
  name = 'name',
  orders = 'orders',
  symbol = 'symbol'
}

export type Order = {
  __typename?: 'Order';
  bidAmount?: Maybe<Scalars['BigInt']>;
  bidder?: Maybe<Scalars['Bytes']>;
  bids: Array<Bid>;
  contract: Scalars['Bytes'];
  createdAt: Scalars['BigInt'];
  currency: Currency;
  id: Scalars['ID'];
  kind: OrderKind;
  lastBlock: Scalars['BigInt'];
  maker: Scalars['Bytes'];
  open: Scalars['Boolean'];
  openFrom?: Maybe<Scalars['BigInt']>;
  openTo?: Maybe<Scalars['BigInt']>;
  orderId: Scalars['BigInt'];
  paidAmount?: Maybe<Scalars['BigInt']>;
  price: Scalars['BigInt'];
  taker?: Maybe<Scalars['Bytes']>;
  token: Token;
  transaction: Scalars['Bytes'];
  updatedAt?: Maybe<Scalars['BigInt']>;
  updatedTransaction?: Maybe<Scalars['Bytes']>;
};


export type OrderbidsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bid_filter>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export enum OrderKind {
  AUCTION = 'AUCTION',
  DIRECT = 'DIRECT'
}

export type Order_filter = {
  bidAmount?: Maybe<Scalars['BigInt']>;
  bidAmount_gt?: Maybe<Scalars['BigInt']>;
  bidAmount_gte?: Maybe<Scalars['BigInt']>;
  bidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  bidAmount_lt?: Maybe<Scalars['BigInt']>;
  bidAmount_lte?: Maybe<Scalars['BigInt']>;
  bidAmount_not?: Maybe<Scalars['BigInt']>;
  bidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bidder?: Maybe<Scalars['Bytes']>;
  bidder_contains?: Maybe<Scalars['Bytes']>;
  bidder_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_not?: Maybe<Scalars['Bytes']>;
  bidder_not_contains?: Maybe<Scalars['Bytes']>;
  bidder_not_in?: Maybe<Array<Scalars['Bytes']>>;
  contract?: Maybe<Scalars['Bytes']>;
  contract_contains?: Maybe<Scalars['Bytes']>;
  contract_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_not?: Maybe<Scalars['Bytes']>;
  contract_not_contains?: Maybe<Scalars['Bytes']>;
  contract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currency?: Maybe<Scalars['String']>;
  currency_contains?: Maybe<Scalars['String']>;
  currency_contains_nocase?: Maybe<Scalars['String']>;
  currency_ends_with?: Maybe<Scalars['String']>;
  currency_ends_with_nocase?: Maybe<Scalars['String']>;
  currency_gt?: Maybe<Scalars['String']>;
  currency_gte?: Maybe<Scalars['String']>;
  currency_in?: Maybe<Array<Scalars['String']>>;
  currency_lt?: Maybe<Scalars['String']>;
  currency_lte?: Maybe<Scalars['String']>;
  currency_not?: Maybe<Scalars['String']>;
  currency_not_contains?: Maybe<Scalars['String']>;
  currency_not_contains_nocase?: Maybe<Scalars['String']>;
  currency_not_ends_with?: Maybe<Scalars['String']>;
  currency_not_ends_with_nocase?: Maybe<Scalars['String']>;
  currency_not_in?: Maybe<Array<Scalars['String']>>;
  currency_not_starts_with?: Maybe<Scalars['String']>;
  currency_not_starts_with_nocase?: Maybe<Scalars['String']>;
  currency_starts_with?: Maybe<Scalars['String']>;
  currency_starts_with_nocase?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<OrderKind>;
  kind_in?: Maybe<Array<OrderKind>>;
  kind_not?: Maybe<OrderKind>;
  kind_not_in?: Maybe<Array<OrderKind>>;
  lastBlock?: Maybe<Scalars['BigInt']>;
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
  lastBlock_gte?: Maybe<Scalars['BigInt']>;
  lastBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  lastBlock_lt?: Maybe<Scalars['BigInt']>;
  lastBlock_lte?: Maybe<Scalars['BigInt']>;
  lastBlock_not?: Maybe<Scalars['BigInt']>;
  lastBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maker?: Maybe<Scalars['Bytes']>;
  maker_contains?: Maybe<Scalars['Bytes']>;
  maker_in?: Maybe<Array<Scalars['Bytes']>>;
  maker_not?: Maybe<Scalars['Bytes']>;
  maker_not_contains?: Maybe<Scalars['Bytes']>;
  maker_not_in?: Maybe<Array<Scalars['Bytes']>>;
  open?: Maybe<Scalars['Boolean']>;
  openFrom?: Maybe<Scalars['BigInt']>;
  openFrom_gt?: Maybe<Scalars['BigInt']>;
  openFrom_gte?: Maybe<Scalars['BigInt']>;
  openFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  openFrom_lt?: Maybe<Scalars['BigInt']>;
  openFrom_lte?: Maybe<Scalars['BigInt']>;
  openFrom_not?: Maybe<Scalars['BigInt']>;
  openFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  openTo?: Maybe<Scalars['BigInt']>;
  openTo_gt?: Maybe<Scalars['BigInt']>;
  openTo_gte?: Maybe<Scalars['BigInt']>;
  openTo_in?: Maybe<Array<Scalars['BigInt']>>;
  openTo_lt?: Maybe<Scalars['BigInt']>;
  openTo_lte?: Maybe<Scalars['BigInt']>;
  openTo_not?: Maybe<Scalars['BigInt']>;
  openTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  open_in?: Maybe<Array<Scalars['Boolean']>>;
  open_not?: Maybe<Scalars['Boolean']>;
  open_not_in?: Maybe<Array<Scalars['Boolean']>>;
  orderId?: Maybe<Scalars['BigInt']>;
  orderId_gt?: Maybe<Scalars['BigInt']>;
  orderId_gte?: Maybe<Scalars['BigInt']>;
  orderId_in?: Maybe<Array<Scalars['BigInt']>>;
  orderId_lt?: Maybe<Scalars['BigInt']>;
  orderId_lte?: Maybe<Scalars['BigInt']>;
  orderId_not?: Maybe<Scalars['BigInt']>;
  orderId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  paidAmount?: Maybe<Scalars['BigInt']>;
  paidAmount_gt?: Maybe<Scalars['BigInt']>;
  paidAmount_gte?: Maybe<Scalars['BigInt']>;
  paidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  paidAmount_lt?: Maybe<Scalars['BigInt']>;
  paidAmount_lte?: Maybe<Scalars['BigInt']>;
  paidAmount_not?: Maybe<Scalars['BigInt']>;
  paidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  taker?: Maybe<Scalars['Bytes']>;
  taker_contains?: Maybe<Scalars['Bytes']>;
  taker_in?: Maybe<Array<Scalars['Bytes']>>;
  taker_not?: Maybe<Scalars['Bytes']>;
  taker_not_contains?: Maybe<Scalars['Bytes']>;
  taker_not_in?: Maybe<Array<Scalars['Bytes']>>;
  token?: Maybe<Scalars['String']>;
  token_contains?: Maybe<Scalars['String']>;
  token_contains_nocase?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_ends_with_nocase?: Maybe<Scalars['String']>;
  token_gt?: Maybe<Scalars['String']>;
  token_gte?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_lt?: Maybe<Scalars['String']>;
  token_lte?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_not_contains_nocase?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with_nocase?: Maybe<Scalars['String']>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with_nocase?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['Bytes']>;
  transaction_contains?: Maybe<Scalars['Bytes']>;
  transaction_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction_not?: Maybe<Scalars['Bytes']>;
  transaction_not_contains?: Maybe<Scalars['Bytes']>;
  transaction_not_in?: Maybe<Array<Scalars['Bytes']>>;
  updatedAt?: Maybe<Scalars['BigInt']>;
  updatedAt_gt?: Maybe<Scalars['BigInt']>;
  updatedAt_gte?: Maybe<Scalars['BigInt']>;
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: Maybe<Scalars['BigInt']>;
  updatedAt_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_not?: Maybe<Scalars['BigInt']>;
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  updatedTransaction?: Maybe<Scalars['Bytes']>;
  updatedTransaction_contains?: Maybe<Scalars['Bytes']>;
  updatedTransaction_in?: Maybe<Array<Scalars['Bytes']>>;
  updatedTransaction_not?: Maybe<Scalars['Bytes']>;
  updatedTransaction_not_contains?: Maybe<Scalars['Bytes']>;
  updatedTransaction_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Order_orderBy {
  bidAmount = 'bidAmount',
  bidder = 'bidder',
  bids = 'bids',
  contract = 'contract',
  createdAt = 'createdAt',
  currency = 'currency',
  id = 'id',
  kind = 'kind',
  lastBlock = 'lastBlock',
  maker = 'maker',
  open = 'open',
  openFrom = 'openFrom',
  openTo = 'openTo',
  orderId = 'orderId',
  paidAmount = 'paidAmount',
  price = 'price',
  taker = 'taker',
  token = 'token',
  transaction = 'transaction',
  updatedAt = 'updatedAt',
  updatedTransaction = 'updatedTransaction'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  registries: Array<Registry>;
  registry?: Maybe<Registry>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Query_metaArgs = {
  block?: Maybe<Block_height>;
};


export type QuerybidArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bid_filter>;
};


export type QuerycurrenciesArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Currency_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Currency_filter>;
};


export type QuerycurrencyArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryorderArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryordersArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Order_filter>;
};


export type QueryregistriesArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Registry_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Registry_filter>;
};


export type QueryregistryArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Token_filter>;
};


export type QuerytransferArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Transfer_filter>;
};

export type Registry = {
  __typename?: 'Registry';
  id: Scalars['ID'];
  isERC721: Scalars['Boolean'];
  tokens: Array<Token>;
};


export type RegistrytokensArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_filter>;
};

export type Registry_filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isERC721?: Maybe<Scalars['Boolean']>;
  isERC721_in?: Maybe<Array<Scalars['Boolean']>>;
  isERC721_not?: Maybe<Scalars['Boolean']>;
  isERC721_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum Registry_orderBy {
  id = 'id',
  isERC721 = 'isERC721',
  tokens = 'tokens'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  registries: Array<Registry>;
  registry?: Maybe<Registry>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Subscription_metaArgs = {
  block?: Maybe<Block_height>;
};


export type SubscriptionbidArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bid_filter>;
};


export type SubscriptioncurrenciesArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Currency_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Currency_filter>;
};


export type SubscriptioncurrencyArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionorderArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionordersArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Order_filter>;
};


export type SubscriptionregistriesArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Registry_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Registry_filter>;
};


export type SubscriptionregistryArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Token_filter>;
};


export type SubscriptiontransferArgs = {
  block?: Maybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  block?: Maybe<Block_height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Transfer_filter>;
};

export type Token = {
  __typename?: 'Token';
  contract: Scalars['Bytes'];
  createdAt?: Maybe<Scalars['BigInt']>;
  creator?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  orders: Array<Order>;
  owner?: Maybe<Scalars['Bytes']>;
  registry: Registry;
  tokenId: Scalars['BigInt'];
  transfers: Array<Transfer>;
};


export type TokenordersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Order_filter>;
};


export type TokentransfersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transfer_filter>;
};

export type Token_filter = {
  contract?: Maybe<Scalars['Bytes']>;
  contract_contains?: Maybe<Scalars['Bytes']>;
  contract_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_not?: Maybe<Scalars['Bytes']>;
  contract_not_contains?: Maybe<Scalars['Bytes']>;
  contract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  creator?: Maybe<Scalars['Bytes']>;
  creator_contains?: Maybe<Scalars['Bytes']>;
  creator_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_not?: Maybe<Scalars['Bytes']>;
  creator_not_contains?: Maybe<Scalars['Bytes']>;
  creator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['Bytes']>;
  owner_contains?: Maybe<Scalars['Bytes']>;
  owner_in?: Maybe<Array<Scalars['Bytes']>>;
  owner_not?: Maybe<Scalars['Bytes']>;
  owner_not_contains?: Maybe<Scalars['Bytes']>;
  owner_not_in?: Maybe<Array<Scalars['Bytes']>>;
  registry?: Maybe<Scalars['String']>;
  registry_contains?: Maybe<Scalars['String']>;
  registry_contains_nocase?: Maybe<Scalars['String']>;
  registry_ends_with?: Maybe<Scalars['String']>;
  registry_ends_with_nocase?: Maybe<Scalars['String']>;
  registry_gt?: Maybe<Scalars['String']>;
  registry_gte?: Maybe<Scalars['String']>;
  registry_in?: Maybe<Array<Scalars['String']>>;
  registry_lt?: Maybe<Scalars['String']>;
  registry_lte?: Maybe<Scalars['String']>;
  registry_not?: Maybe<Scalars['String']>;
  registry_not_contains?: Maybe<Scalars['String']>;
  registry_not_contains_nocase?: Maybe<Scalars['String']>;
  registry_not_ends_with?: Maybe<Scalars['String']>;
  registry_not_ends_with_nocase?: Maybe<Scalars['String']>;
  registry_not_in?: Maybe<Array<Scalars['String']>>;
  registry_not_starts_with?: Maybe<Scalars['String']>;
  registry_not_starts_with_nocase?: Maybe<Scalars['String']>;
  registry_starts_with?: Maybe<Scalars['String']>;
  registry_starts_with_nocase?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['BigInt']>;
  tokenId_gt?: Maybe<Scalars['BigInt']>;
  tokenId_gte?: Maybe<Scalars['BigInt']>;
  tokenId_in?: Maybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: Maybe<Scalars['BigInt']>;
  tokenId_lte?: Maybe<Scalars['BigInt']>;
  tokenId_not?: Maybe<Scalars['BigInt']>;
  tokenId_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Token_orderBy {
  contract = 'contract',
  createdAt = 'createdAt',
  creator = 'creator',
  id = 'id',
  orders = 'orders',
  owner = 'owner',
  registry = 'registry',
  tokenId = 'tokenId',
  transfers = 'transfers'
}

export type Transfer = {
  __typename?: 'Transfer';
  createdAt: Scalars['BigInt'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  to: Scalars['Bytes'];
  token: Token;
  transaction: Scalars['Bytes'];
};

export type Transfer_filter = {
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  to?: Maybe<Scalars['Bytes']>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  token?: Maybe<Scalars['String']>;
  token_contains?: Maybe<Scalars['String']>;
  token_contains_nocase?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_ends_with_nocase?: Maybe<Scalars['String']>;
  token_gt?: Maybe<Scalars['String']>;
  token_gte?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_lt?: Maybe<Scalars['String']>;
  token_lte?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_not_contains_nocase?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with_nocase?: Maybe<Scalars['String']>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with_nocase?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['Bytes']>;
  transaction_contains?: Maybe<Scalars['Bytes']>;
  transaction_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction_not?: Maybe<Scalars['Bytes']>;
  transaction_not_contains?: Maybe<Scalars['Bytes']>;
  transaction_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_orderBy {
  createdAt = 'createdAt',
  from = 'from',
  id = 'id',
  to = 'to',
  token = 'token',
  transaction = 'transaction'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny'
}

export type tokenFieldsFragment = { __typename?: 'Token', id: string, contract: string, createdAt?: string | null | undefined, creator?: string | null | undefined, tokenId: string };

export type IngressQueryVariables = Exact<{
  orders_include: Scalars['Boolean'];
  orders_lastBlock_gt?: Maybe<Scalars['BigInt']>;
  orders_skip?: Maybe<Scalars['Int']>;
  orders_first?: Maybe<Scalars['Int']>;
  tokens_include: Scalars['Boolean'];
  tokens_contract_in?: Maybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  tokens_createdAt_gt?: Maybe<Scalars['BigInt']>;
  tokens_skip?: Maybe<Scalars['Int']>;
  tokens_first?: Maybe<Scalars['Int']>;
}>;


export type IngressQuery = { __typename?: 'Query', _meta?: { __typename?: '_Meta_', hasIndexingErrors: boolean, block: { __typename?: '_Block_', number: number } } | null | undefined, orders?: Array<{ __typename?: 'Order', id: string, lastBlock: string, contract: string, orderId: string, createdAt: string, updatedAt?: string | null | undefined, kind: OrderKind, open: boolean, openFrom?: string | null | undefined, openTo?: string | null | undefined, maker: string, price: string, bidder?: string | null | undefined, bidAmount?: string | null | undefined, taker?: string | null | undefined, paidAmount?: string | null | undefined, currency: { __typename?: 'Currency', id: string, name?: string | null | undefined, symbol?: string | null | undefined }, token: { __typename?: 'Token', id: string, contract: string, createdAt?: string | null | undefined, creator?: string | null | undefined, tokenId: string } }>, tokens?: Array<{ __typename?: 'Token', id: string, contract: string, createdAt?: string | null | undefined, creator?: string | null | undefined, tokenId: string }> };

export type GetTokensQueryVariables = Exact<{
  where?: Maybe<Token_filter>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type GetTokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', id: string, contract: string, createdAt?: string | null | undefined, creator?: string | null | undefined, tokenId: string }> };

export type GetTokenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokenQuery = { __typename?: 'Query', token?: { __typename?: 'Token', owner?: string | null | undefined, id: string, contract: string, createdAt?: string | null | undefined, creator?: string | null | undefined, tokenId: string, orders: Array<{ __typename?: 'Order', createdAt: string, transaction: string, updatedAt?: string | null | undefined, updatedTransaction?: string | null | undefined, maker: string, price: string, taker?: string | null | undefined, paidAmount?: string | null | undefined, currency: { __typename?: 'Currency', id: string, name?: string | null | undefined, symbol?: string | null | undefined }, bids: Array<{ __typename?: 'Bid', createdAt: string, transaction: string, bidder: string, bidAmount: string }> }>, transfers: Array<{ __typename?: 'Transfer', createdAt: string, transaction: string, from: string, to: string }> } | null | undefined };
