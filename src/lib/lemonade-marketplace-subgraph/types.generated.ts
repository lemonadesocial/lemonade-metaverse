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






export type Block_height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};


export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  lastBlock: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  orderContract: Scalars['Bytes'];
  orderId: Scalars['BigInt'];
  open: Scalars['Boolean'];
  maker: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  price: Scalars['BigInt'];
  priceIsMinimum: Scalars['Boolean'];
  tokenContract: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  taker?: Maybe<Scalars['Bytes']>;
  paidAmount?: Maybe<Scalars['BigInt']>;
};

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
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
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  orderContract?: Maybe<Scalars['Bytes']>;
  orderContract_not?: Maybe<Scalars['Bytes']>;
  orderContract_in?: Maybe<Array<Scalars['Bytes']>>;
  orderContract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  orderContract_contains?: Maybe<Scalars['Bytes']>;
  orderContract_not_contains?: Maybe<Scalars['Bytes']>;
  orderId?: Maybe<Scalars['BigInt']>;
  orderId_not?: Maybe<Scalars['BigInt']>;
  orderId_gt?: Maybe<Scalars['BigInt']>;
  orderId_lt?: Maybe<Scalars['BigInt']>;
  orderId_gte?: Maybe<Scalars['BigInt']>;
  orderId_lte?: Maybe<Scalars['BigInt']>;
  orderId_in?: Maybe<Array<Scalars['BigInt']>>;
  orderId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  open?: Maybe<Scalars['Boolean']>;
  open_not?: Maybe<Scalars['Boolean']>;
  open_in?: Maybe<Array<Scalars['Boolean']>>;
  open_not_in?: Maybe<Array<Scalars['Boolean']>>;
  maker?: Maybe<Scalars['Bytes']>;
  maker_not?: Maybe<Scalars['Bytes']>;
  maker_in?: Maybe<Array<Scalars['Bytes']>>;
  maker_not_in?: Maybe<Array<Scalars['Bytes']>>;
  maker_contains?: Maybe<Scalars['Bytes']>;
  maker_not_contains?: Maybe<Scalars['Bytes']>;
  currency?: Maybe<Scalars['Bytes']>;
  currency_not?: Maybe<Scalars['Bytes']>;
  currency_in?: Maybe<Array<Scalars['Bytes']>>;
  currency_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currency_contains?: Maybe<Scalars['Bytes']>;
  currency_not_contains?: Maybe<Scalars['Bytes']>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceIsMinimum?: Maybe<Scalars['Boolean']>;
  priceIsMinimum_not?: Maybe<Scalars['Boolean']>;
  priceIsMinimum_in?: Maybe<Array<Scalars['Boolean']>>;
  priceIsMinimum_not_in?: Maybe<Array<Scalars['Boolean']>>;
  tokenContract?: Maybe<Scalars['Bytes']>;
  tokenContract_not?: Maybe<Scalars['Bytes']>;
  tokenContract_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  tokenContract_contains?: Maybe<Scalars['Bytes']>;
  tokenContract_not_contains?: Maybe<Scalars['Bytes']>;
  tokenId?: Maybe<Scalars['BigInt']>;
  tokenId_not?: Maybe<Scalars['BigInt']>;
  tokenId_gt?: Maybe<Scalars['BigInt']>;
  tokenId_lt?: Maybe<Scalars['BigInt']>;
  tokenId_gte?: Maybe<Scalars['BigInt']>;
  tokenId_lte?: Maybe<Scalars['BigInt']>;
  tokenId_in?: Maybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: Maybe<Array<Scalars['BigInt']>>;
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
  createdAt = 'createdAt',
  orderContract = 'orderContract',
  orderId = 'orderId',
  open = 'open',
  maker = 'maker',
  currency = 'currency',
  price = 'price',
  priceIsMinimum = 'priceIsMinimum',
  tokenContract = 'tokenContract',
  tokenId = 'tokenId',
  taker = 'taker',
  paidAmount = 'paidAmount'
}

export type Query = {
  __typename?: 'Query';
  order?: Maybe<Order>;
  orders: Array<Order>;
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


export type Query_metaArgs = {
  block?: Maybe<Block_height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  order?: Maybe<Order>;
  orders: Array<Order>;
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


export type Subscription_metaArgs = {
  block?: Maybe<Block_height>;
};

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

export type GetOrdersQueryVariables = Exact<{
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
  skip: Scalars['Int'];
  first: Scalars['Int'];
}>;


export type GetOrdersQuery = (
  { __typename?: 'Query' }
  & { orders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'lastBlock' | 'createdAt' | 'orderContract' | 'orderId' | 'open' | 'maker' | 'currency' | 'price' | 'priceIsMinimum' | 'tokenContract' | 'tokenId' | 'taker' | 'paidAmount'>
  )> }
);
