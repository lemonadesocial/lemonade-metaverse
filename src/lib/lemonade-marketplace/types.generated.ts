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
  id: Scalars['ID'];
  order: Order;
  createdAt: Scalars['BigInt'];
  bidder: Scalars['Bytes'];
  bidAmount: Scalars['BigInt'];
};

export type Bid_filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  order?: Maybe<Scalars['String']>;
  order_not?: Maybe<Scalars['String']>;
  order_gt?: Maybe<Scalars['String']>;
  order_lt?: Maybe<Scalars['String']>;
  order_gte?: Maybe<Scalars['String']>;
  order_lte?: Maybe<Scalars['String']>;
  order_in?: Maybe<Array<Scalars['String']>>;
  order_not_in?: Maybe<Array<Scalars['String']>>;
  order_contains?: Maybe<Scalars['String']>;
  order_not_contains?: Maybe<Scalars['String']>;
  order_starts_with?: Maybe<Scalars['String']>;
  order_not_starts_with?: Maybe<Scalars['String']>;
  order_ends_with?: Maybe<Scalars['String']>;
  order_not_ends_with?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bidder?: Maybe<Scalars['Bytes']>;
  bidder_not?: Maybe<Scalars['Bytes']>;
  bidder_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_contains?: Maybe<Scalars['Bytes']>;
  bidder_not_contains?: Maybe<Scalars['Bytes']>;
  bidAmount?: Maybe<Scalars['BigInt']>;
  bidAmount_not?: Maybe<Scalars['BigInt']>;
  bidAmount_gt?: Maybe<Scalars['BigInt']>;
  bidAmount_lt?: Maybe<Scalars['BigInt']>;
  bidAmount_gte?: Maybe<Scalars['BigInt']>;
  bidAmount_lte?: Maybe<Scalars['BigInt']>;
  bidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  bidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Bid_orderBy {
  id = 'id',
  order = 'order',
  createdAt = 'createdAt',
  bidder = 'bidder',
  bidAmount = 'bidAmount'
}



export type Block_height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};


export type Currency = {
  __typename?: 'Currency';
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  orders: Array<Order>;
};


export type CurrencyordersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Order_filter>;
};

export type Currency_filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Currency_orderBy {
  id = 'id',
  name = 'name',
  symbol = 'symbol',
  orders = 'orders'
}

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  lastBlock: Scalars['BigInt'];
  contract: Scalars['Bytes'];
  orderId: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  kind: OrderKind;
  open: Scalars['Boolean'];
  openFrom?: Maybe<Scalars['BigInt']>;
  openTo?: Maybe<Scalars['BigInt']>;
  maker: Scalars['Bytes'];
  currency: Currency;
  price: Scalars['BigInt'];
  token: Token;
  bidder?: Maybe<Scalars['Bytes']>;
  bidAmount?: Maybe<Scalars['BigInt']>;
  taker?: Maybe<Scalars['Bytes']>;
  paidAmount?: Maybe<Scalars['BigInt']>;
  bids: Array<Bid>;
};


export type OrderbidsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Bid_filter>;
};

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export enum OrderKind {
  DIRECT = 'DIRECT',
  AUCTION = 'AUCTION'
}

export type Order_filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastBlock?: Maybe<Scalars['BigInt']>;
  lastBlock_not?: Maybe<Scalars['BigInt']>;
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
  lastBlock_lt?: Maybe<Scalars['BigInt']>;
  lastBlock_gte?: Maybe<Scalars['BigInt']>;
  lastBlock_lte?: Maybe<Scalars['BigInt']>;
  lastBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  lastBlock_not_in?: Maybe<Array<Scalars['BigInt']>>;
  contract?: Maybe<Scalars['Bytes']>;
  contract_not?: Maybe<Scalars['Bytes']>;
  contract_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_contains?: Maybe<Scalars['Bytes']>;
  contract_not_contains?: Maybe<Scalars['Bytes']>;
  orderId?: Maybe<Scalars['BigInt']>;
  orderId_not?: Maybe<Scalars['BigInt']>;
  orderId_gt?: Maybe<Scalars['BigInt']>;
  orderId_lt?: Maybe<Scalars['BigInt']>;
  orderId_gte?: Maybe<Scalars['BigInt']>;
  orderId_lte?: Maybe<Scalars['BigInt']>;
  orderId_in?: Maybe<Array<Scalars['BigInt']>>;
  orderId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  kind?: Maybe<OrderKind>;
  kind_not?: Maybe<OrderKind>;
  open?: Maybe<Scalars['Boolean']>;
  open_not?: Maybe<Scalars['Boolean']>;
  open_in?: Maybe<Array<Scalars['Boolean']>>;
  open_not_in?: Maybe<Array<Scalars['Boolean']>>;
  openFrom?: Maybe<Scalars['BigInt']>;
  openFrom_not?: Maybe<Scalars['BigInt']>;
  openFrom_gt?: Maybe<Scalars['BigInt']>;
  openFrom_lt?: Maybe<Scalars['BigInt']>;
  openFrom_gte?: Maybe<Scalars['BigInt']>;
  openFrom_lte?: Maybe<Scalars['BigInt']>;
  openFrom_in?: Maybe<Array<Scalars['BigInt']>>;
  openFrom_not_in?: Maybe<Array<Scalars['BigInt']>>;
  openTo?: Maybe<Scalars['BigInt']>;
  openTo_not?: Maybe<Scalars['BigInt']>;
  openTo_gt?: Maybe<Scalars['BigInt']>;
  openTo_lt?: Maybe<Scalars['BigInt']>;
  openTo_gte?: Maybe<Scalars['BigInt']>;
  openTo_lte?: Maybe<Scalars['BigInt']>;
  openTo_in?: Maybe<Array<Scalars['BigInt']>>;
  openTo_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maker?: Maybe<Scalars['Bytes']>;
  maker_not?: Maybe<Scalars['Bytes']>;
  maker_in?: Maybe<Array<Scalars['Bytes']>>;
  maker_not_in?: Maybe<Array<Scalars['Bytes']>>;
  maker_contains?: Maybe<Scalars['Bytes']>;
  maker_not_contains?: Maybe<Scalars['Bytes']>;
  currency?: Maybe<Scalars['String']>;
  currency_not?: Maybe<Scalars['String']>;
  currency_gt?: Maybe<Scalars['String']>;
  currency_lt?: Maybe<Scalars['String']>;
  currency_gte?: Maybe<Scalars['String']>;
  currency_lte?: Maybe<Scalars['String']>;
  currency_in?: Maybe<Array<Scalars['String']>>;
  currency_not_in?: Maybe<Array<Scalars['String']>>;
  currency_contains?: Maybe<Scalars['String']>;
  currency_not_contains?: Maybe<Scalars['String']>;
  currency_starts_with?: Maybe<Scalars['String']>;
  currency_not_starts_with?: Maybe<Scalars['String']>;
  currency_ends_with?: Maybe<Scalars['String']>;
  currency_not_ends_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  token?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_gt?: Maybe<Scalars['String']>;
  token_lt?: Maybe<Scalars['String']>;
  token_gte?: Maybe<Scalars['String']>;
  token_lte?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_contains?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
  bidder?: Maybe<Scalars['Bytes']>;
  bidder_not?: Maybe<Scalars['Bytes']>;
  bidder_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: Maybe<Array<Scalars['Bytes']>>;
  bidder_contains?: Maybe<Scalars['Bytes']>;
  bidder_not_contains?: Maybe<Scalars['Bytes']>;
  bidAmount?: Maybe<Scalars['BigInt']>;
  bidAmount_not?: Maybe<Scalars['BigInt']>;
  bidAmount_gt?: Maybe<Scalars['BigInt']>;
  bidAmount_lt?: Maybe<Scalars['BigInt']>;
  bidAmount_gte?: Maybe<Scalars['BigInt']>;
  bidAmount_lte?: Maybe<Scalars['BigInt']>;
  bidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  bidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  taker?: Maybe<Scalars['Bytes']>;
  taker_not?: Maybe<Scalars['Bytes']>;
  taker_in?: Maybe<Array<Scalars['Bytes']>>;
  taker_not_in?: Maybe<Array<Scalars['Bytes']>>;
  taker_contains?: Maybe<Scalars['Bytes']>;
  taker_not_contains?: Maybe<Scalars['Bytes']>;
  paidAmount?: Maybe<Scalars['BigInt']>;
  paidAmount_not?: Maybe<Scalars['BigInt']>;
  paidAmount_gt?: Maybe<Scalars['BigInt']>;
  paidAmount_lt?: Maybe<Scalars['BigInt']>;
  paidAmount_gte?: Maybe<Scalars['BigInt']>;
  paidAmount_lte?: Maybe<Scalars['BigInt']>;
  paidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  paidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Order_orderBy {
  id = 'id',
  lastBlock = 'lastBlock',
  contract = 'contract',
  orderId = 'orderId',
  createdAt = 'createdAt',
  kind = 'kind',
  open = 'open',
  openFrom = 'openFrom',
  openTo = 'openTo',
  maker = 'maker',
  currency = 'currency',
  price = 'price',
  token = 'token',
  bidder = 'bidder',
  bidAmount = 'bidAmount',
  taker = 'taker',
  paidAmount = 'paidAmount',
  bids = 'bids'
}

export type Query = {
  __typename?: 'Query';
  order?: Maybe<Order>;
  orders: Array<Order>;
  currency?: Maybe<Currency>;
  currencies: Array<Currency>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryorderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QueryordersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Order_filter>;
  block?: Maybe<Block_height>;
};


export type QuerycurrencyArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QuerycurrenciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Currency_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Currency_filter>;
  block?: Maybe<Block_height>;
};


export type QuerybidArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QuerybidsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Bid_filter>;
  block?: Maybe<Block_height>;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QuerytokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Token_filter>;
  block?: Maybe<Block_height>;
};


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QuerytransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transfer_filter>;
  block?: Maybe<Block_height>;
};


export type Query_metaArgs = {
  block?: Maybe<Block_height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  order?: Maybe<Order>;
  orders: Array<Order>;
  currency?: Maybe<Currency>;
  currencies: Array<Currency>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionorderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptionordersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Order_filter>;
  block?: Maybe<Block_height>;
};


export type SubscriptioncurrencyArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptioncurrenciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Currency_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Currency_filter>;
  block?: Maybe<Block_height>;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptionbidsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bid_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Bid_filter>;
  block?: Maybe<Block_height>;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptiontokensArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Token_filter>;
  block?: Maybe<Block_height>;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptiontransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transfer_filter>;
  block?: Maybe<Block_height>;
};


export type Subscription_metaArgs = {
  block?: Maybe<Block_height>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID'];
  contract: Scalars['Bytes'];
  createdAt?: Maybe<Scalars['BigInt']>;
  creator?: Maybe<Scalars['Bytes']>;
  owner?: Maybe<Scalars['Bytes']>;
  tokenId: Scalars['BigInt'];
  uri: Scalars['String'];
  orders: Array<Order>;
  transfers: Array<Transfer>;
};


export type TokenordersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Order_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Order_filter>;
};


export type TokentransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transfer_filter>;
};

export type Token_filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  contract?: Maybe<Scalars['Bytes']>;
  contract_not?: Maybe<Scalars['Bytes']>;
  contract_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  contract_contains?: Maybe<Scalars['Bytes']>;
  contract_not_contains?: Maybe<Scalars['Bytes']>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  creator?: Maybe<Scalars['Bytes']>;
  creator_not?: Maybe<Scalars['Bytes']>;
  creator_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_contains?: Maybe<Scalars['Bytes']>;
  creator_not_contains?: Maybe<Scalars['Bytes']>;
  owner?: Maybe<Scalars['Bytes']>;
  owner_not?: Maybe<Scalars['Bytes']>;
  owner_in?: Maybe<Array<Scalars['Bytes']>>;
  owner_not_in?: Maybe<Array<Scalars['Bytes']>>;
  owner_contains?: Maybe<Scalars['Bytes']>;
  owner_not_contains?: Maybe<Scalars['Bytes']>;
  tokenId?: Maybe<Scalars['BigInt']>;
  tokenId_not?: Maybe<Scalars['BigInt']>;
  tokenId_gt?: Maybe<Scalars['BigInt']>;
  tokenId_lt?: Maybe<Scalars['BigInt']>;
  tokenId_gte?: Maybe<Scalars['BigInt']>;
  tokenId_lte?: Maybe<Scalars['BigInt']>;
  tokenId_in?: Maybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  uri?: Maybe<Scalars['String']>;
  uri_not?: Maybe<Scalars['String']>;
  uri_gt?: Maybe<Scalars['String']>;
  uri_lt?: Maybe<Scalars['String']>;
  uri_gte?: Maybe<Scalars['String']>;
  uri_lte?: Maybe<Scalars['String']>;
  uri_in?: Maybe<Array<Scalars['String']>>;
  uri_not_in?: Maybe<Array<Scalars['String']>>;
  uri_contains?: Maybe<Scalars['String']>;
  uri_not_contains?: Maybe<Scalars['String']>;
  uri_starts_with?: Maybe<Scalars['String']>;
  uri_not_starts_with?: Maybe<Scalars['String']>;
  uri_ends_with?: Maybe<Scalars['String']>;
  uri_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Token_orderBy {
  id = 'id',
  contract = 'contract',
  createdAt = 'createdAt',
  creator = 'creator',
  owner = 'owner',
  tokenId = 'tokenId',
  uri = 'uri',
  orders = 'orders',
  transfers = 'transfers'
}

export type Transfer = {
  __typename?: 'Transfer';
  id: Scalars['ID'];
  createdAt: Scalars['BigInt'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  token: Token;
};

export type Transfer_filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  to?: Maybe<Scalars['Bytes']>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  token?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_gt?: Maybe<Scalars['String']>;
  token_lt?: Maybe<Scalars['String']>;
  token_gte?: Maybe<Scalars['String']>;
  token_lte?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_contains?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Transfer_orderBy {
  id = 'id',
  createdAt = 'createdAt',
  from = 'from',
  to = 'to',
  token = 'token'
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

export type PollQueryVariables = Exact<{
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
  skip: Scalars['Int'];
  first: Scalars['Int'];
}>;


export type PollQuery = { __typename?: 'Query', _meta?: Maybe<{ __typename?: '_Meta_', hasIndexingErrors: boolean, block: { __typename?: '_Block_', hash?: Maybe<string>, number: number } }>, orders: Array<{ __typename?: 'Order', id: string, lastBlock: string, contract: string, orderId: string, createdAt: string, kind: OrderKind, open: boolean, openFrom?: Maybe<string>, openTo?: Maybe<string>, maker: string, price: string, bidder?: Maybe<string>, bidAmount?: Maybe<string>, taker?: Maybe<string>, paidAmount?: Maybe<string>, currency: { __typename?: 'Currency', id: string, name: string, symbol: string }, token: { __typename?: 'Token', id: string, contract: string, createdAt?: Maybe<string>, creator?: Maybe<string>, owner?: Maybe<string>, tokenId: string, uri: string } }> };
