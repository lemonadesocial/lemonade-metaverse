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


export type Offer = {
  __typename?: 'Offer';
  id: Scalars['ID'];
  lastBlock: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  offerContract: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  tokenURI: Scalars['String'];
  active: Scalars['Boolean'];
  seller: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  price: Scalars['BigInt'];
  tokenContract: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  buyer?: Maybe<Scalars['Bytes']>;
};

export type Offer_filter = {
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
  offerContract?: Maybe<Scalars['Bytes']>;
  offerContract_not?: Maybe<Scalars['Bytes']>;
  offerContract_in?: Maybe<Array<Scalars['Bytes']>>;
  offerContract_not_in?: Maybe<Array<Scalars['Bytes']>>;
  offerContract_contains?: Maybe<Scalars['Bytes']>;
  offerContract_not_contains?: Maybe<Scalars['Bytes']>;
  offerId?: Maybe<Scalars['BigInt']>;
  offerId_not?: Maybe<Scalars['BigInt']>;
  offerId_gt?: Maybe<Scalars['BigInt']>;
  offerId_lt?: Maybe<Scalars['BigInt']>;
  offerId_gte?: Maybe<Scalars['BigInt']>;
  offerId_lte?: Maybe<Scalars['BigInt']>;
  offerId_in?: Maybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  tokenURI?: Maybe<Scalars['String']>;
  tokenURI_not?: Maybe<Scalars['String']>;
  tokenURI_gt?: Maybe<Scalars['String']>;
  tokenURI_lt?: Maybe<Scalars['String']>;
  tokenURI_gte?: Maybe<Scalars['String']>;
  tokenURI_lte?: Maybe<Scalars['String']>;
  tokenURI_in?: Maybe<Array<Scalars['String']>>;
  tokenURI_not_in?: Maybe<Array<Scalars['String']>>;
  tokenURI_contains?: Maybe<Scalars['String']>;
  tokenURI_not_contains?: Maybe<Scalars['String']>;
  tokenURI_starts_with?: Maybe<Scalars['String']>;
  tokenURI_not_starts_with?: Maybe<Scalars['String']>;
  tokenURI_ends_with?: Maybe<Scalars['String']>;
  tokenURI_not_ends_with?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  seller?: Maybe<Scalars['Bytes']>;
  seller_not?: Maybe<Scalars['Bytes']>;
  seller_in?: Maybe<Array<Scalars['Bytes']>>;
  seller_not_in?: Maybe<Array<Scalars['Bytes']>>;
  seller_contains?: Maybe<Scalars['Bytes']>;
  seller_not_contains?: Maybe<Scalars['Bytes']>;
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
  buyer?: Maybe<Scalars['Bytes']>;
  buyer_not?: Maybe<Scalars['Bytes']>;
  buyer_in?: Maybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: Maybe<Array<Scalars['Bytes']>>;
  buyer_contains?: Maybe<Scalars['Bytes']>;
  buyer_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum Offer_orderBy {
  id = 'id',
  lastBlock = 'lastBlock',
  createdAt = 'createdAt',
  offerContract = 'offerContract',
  offerId = 'offerId',
  tokenURI = 'tokenURI',
  active = 'active',
  seller = 'seller',
  currency = 'currency',
  price = 'price',
  tokenContract = 'tokenContract',
  tokenId = 'tokenId',
  buyer = 'buyer'
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryofferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type QueryoffersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Offer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Offer_filter>;
  block?: Maybe<Block_height>;
};


export type Query_metaArgs = {
  block?: Maybe<Block_height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionofferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_height>;
};


export type SubscriptionoffersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Offer_orderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Offer_filter>;
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

export type GetOffersQueryVariables = Exact<{
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
  skip: Scalars['Int'];
  first: Scalars['Int'];
}>;


export type GetOffersQuery = (
  { __typename?: 'Query' }
  & { offers: Array<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id' | 'lastBlock' | 'createdAt' | 'offerContract' | 'offerId' | 'tokenURI' | 'active' | 'seller' | 'currency' | 'price' | 'tokenContract' | 'tokenId' | 'buyer'>
  )> }
);

export type StreamOffersSubscriptionVariables = Exact<{
  lastBlock_gt?: Maybe<Scalars['BigInt']>;
}>;


export type StreamOffersSubscription = (
  { __typename?: 'Subscription' }
  & { offers: Array<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id' | 'lastBlock' | 'createdAt' | 'offerContract' | 'offerId' | 'tokenURI' | 'active' | 'seller' | 'currency' | 'price' | 'tokenContract' | 'tokenId' | 'buyer'>
  )> }
);
