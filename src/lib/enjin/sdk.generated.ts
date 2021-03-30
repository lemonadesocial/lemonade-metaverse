import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
  BigInt: BigInt;
  DateTime: Date;
  Email: any;
  EthAddress: String;
  /** A generic object */
  Object: Record<string, unknown>;
  /**
   * The `Upload` special type represents a file to be uploaded in the same HTTP request as specified by
   *  [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec).
   */
  Upload: any;
};

/** Append a "Log" event to an item id */
export type AddLogInput = {
  /** The token (item) ID on which the log is appended. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The message to be logged. */
  data?: Maybe<Scalars['String']>;
};

/** A token. */
export type AdvancedSendTokenInput = {
  /** The different transfers to perform. */
  transfers?: Maybe<Array<Maybe<TransferInput>>>;
  /** DEPRECATED - All transfers are now safe. Should we use the _safe_ variant of this transaction (used when sending tokens to contracts that are expecting a callback). */
  safe?: Maybe<Scalars['Boolean']>;
  /** The data to forward with the safe callbacks. */
  data?: Maybe<Scalars['String']>;
};

/** The grouping to use when querying multiple datasets. */
export enum AggregationGroupBy {
  countries = 'countries',
  tags = 'tags',
  tokens = 'tokens'
}

/** The time between the datapoints. */
export enum AggregationInterval {
  day = 'day',
  month = 'month',
  fiscalYear = 'fiscalYear',
  lastFiscalYear = 'lastFiscalYear'
}

/** The type of aggregation to perform. */
export enum AggregationType {
  count = 'count',
  cumulative = 'cumulative',
  percentage = 'percentage'
}

/** user configurable options */
export type AppOptionsInput = {
  /** Enables token proof feature */
  tokenProofEnabled?: Maybe<Scalars['Boolean']>;
  /** Token proof feature url */
  tokenProofUrl?: Maybe<Scalars['String']>;
  /** Enables weak challenge by default */
  weakChallengeDefault?: Maybe<Scalars['Boolean']>;
};

/** Approve the Crypto Items contract to spend your ENJ. */
export type ApproveEnjInput = {
  /** The amount of ENJ to approve. Set this to -1 to approve the maximum amount possible. */
  value?: Maybe<Scalars['Int']>;
};

/** Approve an operator to transfer your Crypto Items. */
export type ApproveItemInput = {
  /** Ethereum address of the operator */
  operator?: Maybe<Scalars['String']>;
  /** Identity ID of the operator */
  operator_id?: Maybe<Scalars['Int']>;
  /** Token to approve */
  token_id?: Maybe<Scalars['String']>;
  /** Index of token to approve (for NFTs) */
  token_index?: Maybe<Scalars['String']>;
  /** Current approved value (before this transaction) */
  current_value?: Maybe<Scalars['Int']>;
  /** Amount to approve */
  value?: Maybe<Scalars['Int']>;
};

/** Filter input for balance queries. */
export type BalanceFilter = {
  appId?: Maybe<Scalars['Int']>;
  appId_in?: Maybe<Array<Scalars['Int']>>;
  tokenId?: Maybe<Scalars['String']>;
  tokenId_in?: Maybe<Array<Scalars['String']>>;
  wallet?: Maybe<Scalars['EthAddress']>;
  wallet_in?: Maybe<Array<Scalars['EthAddress']>>;
  value?: Maybe<Scalars['Int']>;
  value_gt?: Maybe<Scalars['Int']>;
  value_gte?: Maybe<Scalars['Int']>;
  value_lt?: Maybe<Scalars['Int']>;
  value_lte?: Maybe<Scalars['Int']>;
  and?: Maybe<Array<BalanceFilter>>;
  or?: Maybe<Array<BalanceFilter>>;
};

/** A beam email template on the Platform. */
export type BeamEmailTemplate = {
  __typename?: 'BeamEmailTemplate';
  /** The id of the beam email template. */
  id?: Maybe<Scalars['Int']>;
  /** Id of related beam. */
  beamId?: Maybe<Scalars['Int']>;
  /** The name of the beam email template. */
  name?: Maybe<Scalars['String']>;
  /** The file name of the beam email template. */
  templateFileName?: Maybe<Scalars['String']>;
  /** If the template is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<BeamEmailTemplate>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A saved chart. */
export type Chart = {
  __typename?: 'Chart';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  datasets?: Maybe<Array<Maybe<ChartDataset>>>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  interval?: Maybe<AggregationInterval>;
  countries?: Maybe<Array<Maybe<Country>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  tokens?: Maybe<Array<Maybe<EnjinToken>>>;
  groupBy?: Maybe<AggregationGroupBy>;
  otherResults?: Maybe<Scalars['Boolean']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** A chart dataset. */
export type ChartDataset = {
  __typename?: 'ChartDataset';
  name?: Maybe<ChartDatasetName>;
  type?: Maybe<AggregationType>;
};

/** The name of the dataset. */
export enum ChartDatasetName {
  Captures = 'Captures',
  Claims = 'Claims',
  Conversions = 'Conversions',
  Hidden = 'Hidden',
  Landings = 'Landings',
  ReservationsClaimed = 'ReservationsClaimed',
  Reservations = 'Reservations',
  ReservationsUnclaimed = 'ReservationsUnclaimed',
  Revealed = 'Revealed',
  Scans = 'Scans',
  Visits = 'Visits',
  Creates = 'Creates',
  Melts = 'Melts',
  Mints = 'Mints'
}

/** Permissions of a chart on the Platform. */
export type ChartPermissions = {
  __typename?: 'ChartPermissions';
  /** Check Chart delete permission. */
  delete?: Maybe<PermissionResult>;
  /** Check Chart update permission. */
  update?: Maybe<PermissionResult>;
};

/** Complete a trade between two users. */
export type CompleteTradeInput = {
  /** The trade ID (found in the CreateTrade event). */
  trade_id?: Maybe<Scalars['String']>;
};

/** A country. */
export type Country = {
  __typename?: 'Country';
  /** The country name. */
  name?: Maybe<Scalars['String']>;
  /** The country code. */
  code?: Maybe<Scalars['String']>;
};

/** A token. */
export type CreateTokenInput = {
  /** The item name. */
  name?: Maybe<Scalars['String']>;
  /** The total supply of the item. */
  totalSupply?: Maybe<Scalars['BigInt']>;
  /** The initial reserve of the item available to mint. */
  initialReserve?: Maybe<Scalars['Int']>;
  /** The supply model. Fixed means you can't change the total supply once set. Settable means the total supply can be set at any time. Collapsing means that once an item has been melted you cannot re-mint it. Annual Value means the total supply can be changed by a certain number of items per year. Annual Percentage means the total supply can be changed by a certain percentage per year. */
  supplyModel?: Maybe<TokenSupplyModel>;
  /** The the melt fee (and therefore the exchange rate) for this item. */
  meltValue?: Maybe<Scalars['BigInt']>;
  /** The ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on. */
  meltFeeRatio?: Maybe<Scalars['Int']>;
  /** Shows if the item is transferable. */
  transferable?: Maybe<TokenTransferable>;
  /** The fee settings for this item. */
  transferFeeSettings?: Maybe<TokenTransferFeeSettingsInput>;
  /** Set is the item is non-fungible. */
  nonFungible?: Maybe<Scalars['Boolean']>;
  /** The filename of the uploaded icon. */
  icon?: Maybe<Scalars['String']>;
};

/** A trade between two users. */
export type CreateTradeInput = {
  /** The items we're asking for. */
  asking_tokens?: Maybe<Array<Maybe<TokenValueInput>>>;
  /** The items we're offering. */
  offering_tokens?: Maybe<Array<Maybe<TokenValueInput>>>;
  /** The other trade participant's ethereum address to send to. */
  second_party_address?: Maybe<Scalars['String']>;
  /** The other trade participant's identity ID to send to. */
  second_party_identity_id?: Maybe<Scalars['Int']>;
};

export type Datapoint = {
  __typename?: 'Datapoint';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};


export type DatapointlabelArgs = {
  format?: Maybe<Scalars['String']>;
};

export type Dataset = {
  __typename?: 'Dataset';
  /** The name of the dataset */
  name?: Maybe<Scalars['String']>;
  /** The datapoints (label + value pairs) */
  datapoints?: Maybe<Array<Maybe<Datapoint>>>;
  /** Shortcut for retrieving just the datapoint labels */
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Shortcut for retrieving just the datapoint values */
  values?: Maybe<Array<Maybe<Scalars['Float']>>>;
  /** Shortcut for retrieving just the sum of the datapoint values */
  total?: Maybe<Scalars['Float']>;
};


export type DatasetlabelsArgs = {
  format?: Maybe<Scalars['String']>;
};


/** Set the max melt fee to a different, lower value. */
export type DecreaseMaxMeltFeeInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** New maximum value that the melt fee can be set to. It represents the ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on. */
  maxMeltFee?: Maybe<Scalars['Int']>;
};

/** Set the max transfer fee to a different, lower, value. */
export type DecreaseMaxTransferFeeInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The new maximum value for transfer fees (in Wei). */
  maxTransferFee?: Maybe<Scalars['String']>;
};


/** An app on the Platform. */
export type EnjinApp = {
  __typename?: 'EnjinApp';
  /** The id of the app. */
  id?: Maybe<Scalars['Int']>;
  /** The app secret. */
  secret?: Maybe<Scalars['String']>;
  /** The name of the app. */
  name?: Maybe<Scalars['String']>;
  /** The description of the app. */
  description?: Maybe<Scalars['String']>;
  /** The image URL for the app. */
  image?: Maybe<Scalars['String']>;
  /** The linking code for this app. Use this to link a wallet to an app. */
  linkingCode?: Maybe<Scalars['String']>;
  /** A link to a QR Code for this app linking code. */
  linkingCodeQr?: Maybe<Scalars['String']>;
  /**
   * The number of tokens created for this app.
   * @deprecated Renamed to tokenCount
   */
  token_count?: Maybe<Scalars['Int']>;
  /** The number of tokens created for this app. */
  tokenCount?: Maybe<Scalars['Int']>;
  /** The user who owns this app. */
  owner?: Maybe<EnjinUser>;
  /** The list of identities linked to the app. */
  identities?: Maybe<Array<Maybe<EnjinIdentity>>>;
  /** The current user's identity linked to the app. */
  identity?: Maybe<EnjinIdentity>;
  /** The list of transactions linked to the app. */
  transactions?: Maybe<Array<Maybe<EnjinTransaction>>>;
  /** The tokens that have been created for this app. */
  tokens?: Maybe<Array<Maybe<EnjinToken>>>;
  /** The wallets that have been bound to this app. */
  wallets?: Maybe<Array<Maybe<EnjinWallet>>>;
  /**
   * The user roles for this app.
   * @deprecated Roles are no longer exposed via the default graphql schema
   */
  roles?: Maybe<Array<Maybe<EnjinRole>>>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinApp>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** An app on the Platform. */
export type EnjinApplinkingCodeQrArgs = {
  size?: Maybe<Scalars['Int']>;
};

/** user configurable options */
export type EnjinAppOptions = {
  __typename?: 'EnjinAppOptions';
  /** Enables token proof feature */
  tokenProofEnabled?: Maybe<Scalars['Boolean']>;
  /** Token proof feature url */
  tokenProofUrl?: Maybe<Scalars['String']>;
  /** Weak challenge default value */
  weakChallengeDefault?: Maybe<Scalars['Boolean']>;
};

/** Permissions of an app on the Platform. */
export type EnjinAppPermissions = {
  __typename?: 'EnjinAppPermissions';
  /** Check deleteApp permission. */
  deleteApp?: Maybe<PermissionResult>;
  /** Check exportBeams permission. */
  exportBeams?: Maybe<PermissionResult>;
  /** Check manageAdmins permission. */
  manageAdmins?: Maybe<PermissionResult>;
  /** Check manageApp permission. */
  manageApp?: Maybe<PermissionResult>;
  /** Check manageBeamers permission. */
  manageBeamers?: Maybe<PermissionResult>;
  /** Check manageBeams permission. */
  manageBeams?: Maybe<PermissionResult>;
  /** Check manageBilling permission. */
  manageBilling?: Maybe<PermissionResult>;
  /** Check manageCharts permission. */
  manageCharts?: Maybe<PermissionResult>;
  /** Check manageCreators permission. */
  manageCreators?: Maybe<PermissionResult>;
  /** Check manageIdentities permission. */
  manageIdentities?: Maybe<PermissionResult>;
  /** Check manageMembers permission. */
  manageMembers?: Maybe<PermissionResult>;
  /** Check manageMinters permission. */
  manageMinters?: Maybe<PermissionResult>;
  /** Check manageRequests permission. */
  manageRequests?: Maybe<PermissionResult>;
  /** Check manageStatsViewers permission. */
  manageStatsViewers?: Maybe<PermissionResult>;
  /** Check manageTags permission. */
  manageTags?: Maybe<PermissionResult>;
  /** Check manageTokens permission. */
  manageTokens?: Maybe<PermissionResult>;
  /** Check manageUsers permission. */
  manageUsers?: Maybe<PermissionResult>;
  /** Check meltTokens permission. */
  meltTokens?: Maybe<PermissionResult>;
  /** Check mintTokens permission. */
  mintTokens?: Maybe<PermissionResult>;
  /** Check transferTokens permission. */
  transferTokens?: Maybe<PermissionResult>;
  /** Check viewBeams permission. */
  viewBeams?: Maybe<PermissionResult>;
  /** Check viewBeamsList permission. */
  viewBeamsList?: Maybe<PermissionResult>;
  /** Check viewEvents permission. */
  viewEvents?: Maybe<PermissionResult>;
  /** Check viewIdentities permission. */
  viewIdentities?: Maybe<PermissionResult>;
  /** Check viewRequests permission. */
  viewRequests?: Maybe<PermissionResult>;
  /** Check viewRoles permission. */
  viewRoles?: Maybe<PermissionResult>;
  /** Check viewSecret permission. */
  viewSecret?: Maybe<PermissionResult>;
  /** Check viewStats permission. */
  viewStats?: Maybe<PermissionResult>;
  /** Check viewTokens permission. */
  viewTokens?: Maybe<PermissionResult>;
  /** Check viewUsers permission. */
  viewUsers?: Maybe<PermissionResult>;
  /** Check viewWallet permission. */
  viewWallet?: Maybe<PermissionResult>;
};

/** Usage stats of an App. */
export type EnjinAppUsage = {
  __typename?: 'EnjinAppUsage';
  /** The number of requests of the App. */
  requestCount?: Maybe<Scalars['Int']>;
  /** The number of users in the App. */
  userCount?: Maybe<Scalars['Int']>;
};

/** A successful auth object. */
export type EnjinAuth = {
  __typename?: 'EnjinAuth';
  /** The access token for this auth. */
  accessToken?: Maybe<Scalars['String']>;
  /**
   * The refresh token for this auth.
   * @deprecated Refresh tokens are not supported.
   */
  refreshToken?: Maybe<Scalars['String']>;
  /** The number of seconds until the access token expires. */
  expiresIn?: Maybe<Scalars['Int']>;
};

/** A token balance. */
export type EnjinBalance = {
  __typename?: 'EnjinBalance';
  /** The token id for this balance. Note: only hex256 and uint256 formats are unique (per wallet). */
  id?: Maybe<Scalars['String']>;
  /** The token index for this balance. */
  index?: Maybe<Scalars['String']>;
  /** The balance of this token. */
  value?: Maybe<Scalars['Int']>;
  /** The app for this balance's token. */
  app?: Maybe<EnjinApp>;
  /** The token for this balance. */
  token?: Maybe<EnjinToken>;
  /** The identity for this balance. */
  identity?: Maybe<EnjinIdentity>;
  /** The wallet for this balance. */
  wallet?: Maybe<EnjinWallet>;
  /**
   * The balance of this token.
   * @deprecated Renamed to value
   */
  balance?: Maybe<Scalars['Int']>;
  /**
   * The ethereum address.
   * @deprecated Use wallet { ethAddress }
   */
  ethereum_address?: Maybe<Scalars['String']>;
  /**
   * The token id for this balance.
   * @deprecated Renamed to id, which accepts a `format` argument
   */
  token_id?: Maybe<Scalars['String']>;
  /**
   * The token index for this balance.
   * @deprecated Renamed to index, which accepts a `format` argument
   */
  token_index?: Maybe<Scalars['String']>;
  /**
   * The identity id linked to this balance (if linked).
   * @deprecated Use identity { id }
   */
  identity_id?: Maybe<Scalars['Int']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinBalance>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A token balance. */
export type EnjinBalanceidArgs = {
  format?: Maybe<TokenIdFormat>;
};


/** A token balance. */
export type EnjinBalanceindexArgs = {
  format?: Maybe<TokenIndexFormat>;
};

/** A user's identity for a game. */
export type EnjinIdentity = {
  __typename?: 'EnjinIdentity';
  /** The id of the identity. */
  id?: Maybe<Scalars['Int']>;
  /**
   * The app_id this identity belongs to.
   * @deprecated Renamed to appId
   */
  app_id?: Maybe<Scalars['Int']>;
  /** The app_id this identity belongs to. */
  appId?: Maybe<Scalars['Int']>;
  /**
   * The linking code for this identity. Use this to link an ethereum address to an identity.
   * @deprecated Renamed to linkingCode
   */
  linking_code?: Maybe<Scalars['String']>;
  /** The linking code for this identity. Use this to link an ethereum address to an identity. */
  linkingCode?: Maybe<Scalars['String']>;
  /**
   * A link to a QR Code for this identity linking code.
   * @deprecated Renamed to linkingCodeQr
   */
  linking_code_qr?: Maybe<Scalars['String']>;
  /** A link to a QR Code for this identity linking code. */
  linkingCodeQr?: Maybe<Scalars['String']>;
  /** The app the identity is linked to. */
  app?: Maybe<EnjinApp>;
  /** The user linked to the identity. */
  user?: Maybe<EnjinUser>;
  /** The list of transactions linked to the identity. */
  transactions?: Maybe<Array<Maybe<EnjinTransaction>>>;
  /** The list of tokens linked to the identity. */
  tokens?: Maybe<Array<Maybe<EnjinToken>>>;
  /** The wallet for this balance. */
  wallet?: Maybe<EnjinWallet>;
  /**
   * The Ethereum address this identity belongs to.
   * @deprecated Use wallet { ethAddress }
   */
  ethereum_address?: Maybe<Scalars['String']>;
  /**
   * The identity's Ethereum balance.
   * @deprecated Use wallet { ethBalance }
   */
  eth_balance?: Maybe<Scalars['Float']>;
  /**
   * The identity's Enjin Coin balance.
   * @deprecated Use wallet { enjBalance }
   */
  enj_balance?: Maybe<Scalars['Float']>;
  /**
   * The identity's Enjin Coin allowance given to CryptoItems.
   * @deprecated Use wallet { enjAllowance }
   */
  enj_allowance?: Maybe<Scalars['Float']>;
  /**
   * The total number of tokens and their enj value that this identity currently owns.
   * @deprecated Deprecated
   */
  all_tokens_balance?: Maybe<Scalars['Object']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinIdentity>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A user's identity for a game. */
export type EnjinIdentitylinking_code_qrArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** A user's identity for a game. */
export type EnjinIdentitylinkingCodeQrArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** A user's identity for a game. */
export type EnjinIdentitytransactionsArgs = {
  state?: Maybe<TransactionState>;
  state_in?: Maybe<Array<Maybe<TransactionState>>>;
  can_broadcast_only?: Maybe<Scalars['Boolean']>;
  pagination?: Maybe<PaginationInput>;
  sort_by?: Maybe<TransactionSortInput>;
};


/** A user's identity for a game. */
export type EnjinIdentitytokensArgs = {
  id?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
  sort_by?: Maybe<TokenSortInput>;
  token_id?: Maybe<Scalars['String']>;
  token_index?: Maybe<Scalars['String']>;
  include_creator_tokens?: Maybe<Scalars['Boolean']>;
};

/** A user permission. */
export type EnjinPermission = {
  __typename?: 'EnjinPermission';
  /** The permission name. */
  name?: Maybe<Permission>;
  /**
   * The permission id.
   * @deprecated Permissions no longer have an id
   */
  id?: Maybe<Scalars['Int']>;
};

/** A plan on the Platform. */
export type EnjinPlan = {
  __typename?: 'EnjinPlan';
  /** The name of the plan. */
  name?: Maybe<Scalars['String']>;
  /** The app limit of the plan. */
  appLimit?: Maybe<Scalars['Int']>;
  /** The request limit of the plan. */
  requestLimit?: Maybe<Scalars['Int']>;
  /** The user limit of the plan. */
  userLimit?: Maybe<Scalars['Int']>;
  /** When true indicates that this is a managed plan. */
  managed?: Maybe<Scalars['Boolean']>;
  /** Check if this is a trial plan. */
  isTrialPlan?: Maybe<Scalars['Boolean']>;
  /** The date and time the trial is due to expire */
  trialExpiresOn?: Maybe<Scalars['DateTime']>;
  /** The number of days remaining if on a trial plan. */
  trialDaysRemaining?: Maybe<Scalars['Int']>;
};

/** An app on the Platform. */
export type EnjinPlatform = {
  __typename?: 'EnjinPlatform';
  /** The Platform ID. */
  id?: Maybe<Scalars['String']>;
  /** The Platform name. */
  name?: Maybe<Scalars['String']>;
  /** The current Ethereum network this TP is using (Ropsten / Mainnet) */
  network?: Maybe<Scalars['String']>;
  /** The last scraped block on this network. */
  blockHeight?: Maybe<Scalars['Int']>;
  /** The smart contracts used by this platform. */
  contracts?: Maybe<Scalars['Object']>;
  /** The platform notification drivers. */
  notifications?: Maybe<Scalars['Object']>;
  /**
   * The list of apps registered to the platform.
   * @deprecated Use the app query instead
   */
  apps?: Maybe<Array<Maybe<EnjinApp>>>;
  /**
   * The last scraped block on this network.
   * @deprecated Renamed to blockHeight
   */
  blockheight?: Maybe<Scalars['Int']>;
};

/** A user role. */
export type EnjinRole = {
  __typename?: 'EnjinRole';
  /** The role name. */
  name?: Maybe<Scalars['String']>;
  /** The role slug. */
  slug?: Maybe<Scalars['String']>;
  /** The list of permissions assigned to this role. */
  permissions?: Maybe<Array<Maybe<EnjinPermission>>>;
  /** The app this role belongs to. */
  app?: Maybe<EnjinApp>;
  /** The user who owns this app. */
  user?: Maybe<EnjinUser>;
  /**
   * The role id.
   * @deprecated Roles no longer have an id
   */
  id?: Maybe<Scalars['Int']>;
  /**
   * The app id this role belongs to.
   * @deprecated Use app { id } instead
   */
  appId?: Maybe<Scalars['Int']>;
  /**
   * The app id this role belongs to.
   * @deprecated Use app { id } instead
   */
  app_id?: Maybe<Scalars['Int']>;
};

/** The search result. */
export type EnjinSearchUnion = EnjinApp | EnjinIdentity | EnjinToken | EnjinTransaction | EnjinUser;

/** Permissions of a tag on the Platform. */
export type EnjinTagPermissions = {
  __typename?: 'EnjinTagPermissions';
  /** Check Tag delete permission. */
  delete?: Maybe<PermissionResult>;
  /** Check Tag update permission. */
  update?: Maybe<PermissionResult>;
};

/** An item. */
export type EnjinToken = {
  __typename?: 'EnjinToken';
  /** The base id of the item. */
  id?: Maybe<Scalars['String']>;
  /** The item name. */
  name?: Maybe<Scalars['String']>;
  /**
   * The app id this item belongs to.
   * @deprecated Renamed to appId
   */
  app_id?: Maybe<Scalars['Int']>;
  /** The app id this item belongs to. */
  appId?: Maybe<Scalars['Int']>;
  /** The number of items currently available to mint. */
  availableToMint?: Maybe<Scalars['String']>;
  /** The block number of the last update. */
  blockHeight?: Maybe<Scalars['Int']>;
  /** The user who created the item. */
  creator?: Maybe<Scalars['String']>;
  /** The first block this item appeared in. */
  firstBlock?: Maybe<Scalars['Int']>;
  /** The URL for the item icon. */
  icon?: Maybe<Scalars['String']>;
  /** The the melt fee ratio for this item in the range 0-10000 to allow fractional ratios, e,g, 1 = 0.01%,  10000 = 100%, 250 = 2.5% and so on. */
  meltFeeRatio?: Maybe<Scalars['Int']>;
  /** The the max melt fee ratio for this item in the range 0-10000 to allow fractional ratios, e,g, 1 = 0.01%,  10000 = 100%, 250 = 2.5% and so on. */
  meltFeeMaxRatio?: Maybe<Scalars['Int']>;
  /** The the melt value (and therefore exchange rate) for this item. */
  meltValue?: Maybe<Scalars['BigInt']>;
  /** The hosted metadata of the token. */
  metadata?: Maybe<Scalars['Object']>;
  /** Has this item been marked for delete? */
  markedForDelete?: Maybe<Scalars['Boolean']>;
  /** If this is this a non fungible item. */
  nonFungible?: Maybe<Scalars['Boolean']>;
  /** The initial reserve of the item. */
  reserve?: Maybe<Scalars['String']>;
  /** The item's supply model. */
  supplyModel?: Maybe<TokenSupplyModel>;
  /** The circulating supply of the item. */
  circulatingSupply?: Maybe<Scalars['BigInt']>;
  /** The total supply of the item. */
  totalSupply?: Maybe<Scalars['BigInt']>;
  /** The transferable type. */
  transferable?: Maybe<TokenTransferable>;
  /** The fee settings for this item. */
  transferFeeSettings?: Maybe<EnjinTokenTransferFeeSettings>;
  /** The balance of the item. */
  balance?: Maybe<Scalars['Float']>;
  /** The item index. For a token query this will list all the tokens in the wild, for identities will list the individual index the identity owns. */
  index?: Maybe<Scalars['String']>;
  /** The URI for this item (if set). */
  itemURI?: Maybe<Scalars['String']>;
  /** The app this item belongs to. */
  app?: Maybe<EnjinApp>;
  /** The list of identities linked to the item. */
  identities?: Maybe<Array<Maybe<EnjinIdentity>>>;
  /** The list of token events linked to this item. */
  tokenEvents?: Maybe<Array<Maybe<EnjinTokenEvent>>>;
  /** The list of transactions for this item. */
  transactions?: Maybe<Array<Maybe<EnjinTransaction>>>;
  /** The wallet for this balance. */
  wallet?: Maybe<EnjinWallet>;
  /**
   * The base id of the item.
   * @deprecated Renamed to id (or int if you want the uint256)
   */
  token_id?: Maybe<Scalars['String']>;
  /** @deprecated Use wallet instead */
  creatorIdentity?: Maybe<EnjinIdentity>;
  /**
   * If the query context includes the identity (e.g. from the EnjinIdentities.tokens sub-query) then set if it's the creator of this token, otherwise this will be null.
   * @deprecated Match via the creator field or wallet.ethAddress instead
   */
  isCreator?: Maybe<Scalars['Boolean']>;
  /**
   * The list of transactions for this item.
   * @deprecated Renamed to transactions
   */
  requests?: Maybe<Array<Maybe<EnjinTransaction>>>;
  variantMode?: Maybe<TokenVariantMode>;
  /** The list of token variants of this item. */
  variants?: Maybe<Array<Maybe<EnjinTokenVariant>>>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinToken>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** An item. */
export type EnjinTokenidArgs = {
  format?: Maybe<TokenIdFormat>;
};


/** An item. */
export type EnjinTokenitemURIArgs = {
  replace_uri_parameters?: Maybe<Scalars['Boolean']>;
};

/** An item event. */
export type EnjinTokenEvent = {
  __typename?: 'EnjinTokenEvent';
  /** The id of the item event. */
  id?: Maybe<Scalars['Int']>;
  /**
   * The item id the event belongs to.
   * @deprecated Renamed to tokenId
   */
  token_id?: Maybe<Scalars['String']>;
  /** The item id the event belongs to. */
  tokenId?: Maybe<Scalars['String']>;
  /** The event type. */
  event?: Maybe<TokenEventType>;
  /** The first parameter. */
  param1?: Maybe<Scalars['String']>;
  /** The second parameter. */
  param2?: Maybe<Scalars['String']>;
  /** The third parameter. */
  param3?: Maybe<Scalars['String']>;
  /** The fourth parameter. */
  param4?: Maybe<Scalars['String']>;
  /** The block number the event occurred. */
  blockNumber?: Maybe<Scalars['Int']>;
  /** The list of items the event belong to. */
  token?: Maybe<EnjinToken>;
  /** The transaction relating to this event. */
  transaction?: Maybe<EnjinTransaction>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinTokenEvent>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};

/** The transfer fee settings for an item. */
export type EnjinTokenTransferFeeSettings = {
  __typename?: 'EnjinTokenTransferFeeSettings';
  /** The type of transfer (None, Per Item, Per Transfer). */
  type?: Maybe<TokenTransferFeeType>;
  /**
   * The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other item - as long as it doesn't have a transfer fee itself.
   * @deprecated Renamed to tokenId
   */
  token_id?: Maybe<Scalars['String']>;
  /** The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other item - as long as it doesn't have a transfer fee itself. */
  tokenId?: Maybe<Scalars['String']>;
  /** The transfer fee value (in Wei). This also gets set as the max transfer fee too. */
  value?: Maybe<Scalars['String']>;
};

/** A Token Variant. */
export type EnjinTokenVariant = {
  __typename?: 'EnjinTokenVariant';
  /** The id of the token variant. */
  id?: Maybe<Scalars['Int']>;
  /** The token id the token variant belongs to. */
  tokenId?: Maybe<Scalars['String']>;
  /** The hosted metadata of the variant. */
  variantMetadata?: Maybe<Scalars['Object']>;
  /** Bitmasked flags. */
  flags?: Maybe<Scalars['Int']>;
  usageCount?: Maybe<Scalars['Int']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinTokenVariant>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};

/** A transaction request. */
export type EnjinTransaction = {
  __typename?: 'EnjinTransaction';
  /** The id of the transaction. */
  id?: Maybe<Scalars['Int']>;
  /**
   * The transaction hash returned by the Ethereum network after executing the request.
   * @deprecated Renamed to transactionId
   */
  transaction_id?: Maybe<Scalars['String']>;
  /** The transaction hash returned by the Ethereum network after executing the request. */
  transactionId?: Maybe<Scalars['String']>;
  /** The error message returned from the blockchain if the broadcast was unsuccessful. */
  error?: Maybe<Scalars['String']>;
  /** The app this transaction belongs to. */
  app?: Maybe<EnjinApp>;
  /**
   * The app_id this transaction belongs to.
   * @deprecated Renamed to appId
   */
  app_id?: Maybe<Scalars['Int']>;
  /** The app_id this transaction belongs to. */
  appId?: Maybe<Scalars['Int']>;
  /**
   * The identity_id linked to this transaction.
   * @deprecated Renamed to identityId
   */
  identity_id?: Maybe<Scalars['Int']>;
  /** The identity_id linked to this transaction. */
  identityId?: Maybe<Scalars['Int']>;
  /** The request type. */
  type?: Maybe<TransactionType>;
  /**
   * The recipient's identity id.
   * @deprecated Renamed to recipientId
   */
  recipient_id?: Maybe<Scalars['Int']>;
  /** The recipient's identity id. */
  recipientId?: Maybe<Scalars['Int']>;
  /**
   * The recipient's Ethereum address.
   * @deprecated Renamed to recipientAddress
   */
  recipient_address?: Maybe<Scalars['String']>;
  /** The recipient's Ethereum address. */
  recipientAddress?: Maybe<Scalars['String']>;
  /**
   * The item id for the request.
   * @deprecated Renamed to tokenId
   */
  token_id?: Maybe<Scalars['String']>;
  /** The item id for the request. */
  tokenId?: Maybe<Scalars['String']>;
  /** The title for this request. */
  title?: Maybe<Scalars['String']>;
  /** The icon URL for this request. */
  icon?: Maybe<Scalars['String']>;
  /**
   * The user_id this transaction belongs to.
   * @deprecated Renamed to userId
   */
  user_id?: Maybe<Scalars['Int']>;
  /** The user_id this transaction belongs to. */
  userId?: Maybe<Scalars['Int']>;
  /** The value of the request. */
  value?: Maybe<Scalars['String']>;
  /**
   * The encoded data, ready for signing.
   * @deprecated Renamed to encodedData
   */
  encoded_data?: Maybe<Scalars['String']>;
  /** The encoded data, ready for signing. */
  encodedData?: Maybe<Scalars['String']>;
  /**
   * The signed transaction string.
   * @deprecated Renamed to signedTransaction
   */
  signed_transaction?: Maybe<Scalars['String']>;
  /** The signed transaction string. */
  signedTransaction?: Maybe<Scalars['String']>;
  /**
   * The signed transaction string.
   * @deprecated Renamed to signedBackupTransaction
   */
  signed_backup_transaction?: Maybe<Scalars['String']>;
  /** The signed transaction string. */
  signedBackupTransaction?: Maybe<Scalars['String']>;
  /**
   * The signed transaction string.
   * @deprecated Renamed to signedCancelTransaction
   */
  signed_cancel_transaction?: Maybe<Scalars['String']>;
  /** The signed transaction string. */
  signedCancelTransaction?: Maybe<Scalars['String']>;
  /** The signed transaction string. */
  nonce?: Maybe<Scalars['String']>;
  /**
   * The signed transaction string.
   * @deprecated Renamed to retryState
   */
  retry_state?: Maybe<Scalars['String']>;
  /** The signed transaction string. */
  retryState?: Maybe<Scalars['String']>;
  /** The request state. */
  state?: Maybe<TransactionState>;
  /** Whether the request has been accepted. */
  accepted?: Maybe<Scalars['Int']>;
  /**
   * Whether the wallet is an app wallet.
   * @deprecated Renamed to appWallet
   */
  app_wallet?: Maybe<Scalars['Boolean']>;
  /** Whether the wallet is an app wallet. */
  appWallet?: Maybe<Scalars['Boolean']>;
  /** The identity for this transaction. */
  identity?: Maybe<EnjinIdentity>;
  /** The identity of the recipient of this transaction */
  recipient?: Maybe<EnjinIdentity>;
  /** The item for the request. */
  token?: Maybe<EnjinToken>;
  /** The transaction receipt. */
  receipt?: Maybe<Scalars['Object']>;
  /** The events for this transaction. */
  events?: Maybe<Array<Maybe<EnjinTokenEvent>>>;
  /** The signer of this transaction. */
  user?: Maybe<EnjinUser>;
  /** The wallet for this transaction. */
  wallet?: Maybe<EnjinWallet>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinTransaction>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A transaction request. */
export type EnjinTransactioneventsArgs = {
  id?: Maybe<Scalars['Int']>;
  event?: Maybe<TokenEventType>;
};

/** A user account. */
export type EnjinUser = {
  __typename?: 'EnjinUser';
  /** The id of the user. */
  id?: Maybe<Scalars['Int']>;
  /** The user's name. */
  name?: Maybe<Scalars['String']>;
  /**
   * The access tokens for this user.
   * @deprecated Renamed to accessTokens
   */
  access_tokens?: Maybe<Array<Maybe<Scalars['Object']>>>;
  /** The access tokens for this user. */
  accessTokens?: Maybe<Array<Maybe<Scalars['Object']>>>;
  /** True when this user is a player. */
  isPlayer?: Maybe<Scalars['Boolean']>;
  /** The specified app this user belongs to (if any). */
  app?: Maybe<EnjinApp>;
  /** The apps this user belongs to (if any). */
  apps?: Maybe<Array<Maybe<EnjinApp>>>;
  /** The list of identities linked to the user. */
  identities?: Maybe<Array<Maybe<EnjinIdentity>>>;
  /** @deprecated You cannot view the email verification status of users anymore. */
  emailVerified?: Maybe<Scalars['Boolean']>;
  /**
   * The roles assigned to the user.
   * @deprecated Roles are no longer exposed via the default graphql schema
   */
  roles?: Maybe<Array<Maybe<EnjinRole>>>;
  /**
   * The user's email address.
   * @deprecated You cannot view the email address of users anymore.
   */
  email?: Maybe<Scalars['String']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The datetime object for when this app was created.
   * @deprecated Renamed to createdAt and changed to an ISO 8601 datetime
   */
  created_at?: Maybe<Scalars['Object']>;
  /**
   * The datetime object for when this app was last updated.
   * @deprecated Renamed to updatedAt and changed to an ISO 8601 datetime
   */
  updated_at?: Maybe<Scalars['Object']>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinUser>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A user account. */
export type EnjinUserappArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** A user account. */
export type EnjinUserappsArgs = {
  id?: Maybe<Scalars['Int']>;
};

/** Permissions of a user on the Platform. */
export type EnjinUserPermissions = {
  __typename?: 'EnjinUserPermissions';
  /** Check User delete permission. */
  delete?: Maybe<PermissionResult>;
  /** Check User update permission. */
  update?: Maybe<PermissionResult>;
};

/** Usage stats of a user. */
export type EnjinUserUsage = {
  __typename?: 'EnjinUserUsage';
  /** The number of apps of the user. */
  appCount?: Maybe<Scalars['Int']>;
};

/** A user's wallet for a game. */
export type EnjinWallet = {
  __typename?: 'EnjinWallet';
  /** The Ethereum address of this wallet. */
  ethAddress?: Maybe<Scalars['String']>;
  /** The wallet's Enjin Coin allowance given to CryptoItems. */
  enjAllowance?: Maybe<Scalars['Float']>;
  /** The wallet's Enjin Coin balance. */
  enjBalance?: Maybe<Scalars['Float']>;
  /** The wallet's Ethereum balance. */
  ethBalance?: Maybe<Scalars['Float']>;
  /** The balances held by this wallet. */
  balances?: Maybe<Array<Maybe<EnjinBalance>>>;
  /** The tokens created by this wallet. */
  tokensCreated?: Maybe<Array<Maybe<EnjinToken>>>;
  /** List of items on the current page */
  items?: Maybe<Array<Maybe<EnjinWallet>>>;
  /** The pagination cursor for this query */
  cursor?: Maybe<PaginationCursor>;
};


/** A user's wallet for a game. */
export type EnjinWalletbalancesArgs = {
  appId?: Maybe<Scalars['Int']>;
  tokenId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  value_gt?: Maybe<Scalars['Int']>;
  value_gte?: Maybe<Scalars['Int']>;
  value_lt?: Maybe<Scalars['Int']>;
  value_lte?: Maybe<Scalars['Int']>;
};


export type GasPrices = {
  __typename?: 'GasPrices';
  /** Recommended fast (expected to be mined in < 2 minutes) gas price in Gwei */
  fast?: Maybe<Scalars['Float']>;
  /** Recommended fastest (expected to be mined in < 30 seconds) gas price in Gwei */
  fastest?: Maybe<Scalars['Float']>;
  /** Recommended safe (expected to be mined in < 30 minutes) gas price in Gwei */
  safeLow?: Maybe<Scalars['Float']>;
  /** Recommended average (expected to be mined in < 5 minutes) gas price in Gwei */
  average?: Maybe<Scalars['Float']>;
};

/** A token. */
export type MeltTokenInput = {
  /** The token (item) ID to melt. */
  token_id?: Maybe<Scalars['String']>;
  /** The hex encoded index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** An array of indices of the item within an item set for non-fungible items. */
  token_index_array?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The number of items to melt. */
  value?: Maybe<Scalars['Int']>;
  /** The number of items to melt. */
  value_array?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

/** the message string to sign. */
export type MessageInput = {
  /** The message to sign. */
  message?: Maybe<Scalars['String']>;
};

/** An item. */
export type MintTokenInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The ethereum address to send the newly minted item to. */
  recipient_address?: Maybe<Scalars['String']>;
  /** An array of address to send the newly minted items to. */
  recipient_address_array?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The identity ID of the wallet to send the newly minted item to. */
  recipient_identity_id?: Maybe<Scalars['Int']>;
  /** An array of identity IDs to send the newly minted items to. */
  recipient_identity_id_array?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The number of items to mint. */
  value?: Maybe<Scalars['Int']>;
  /** An array of values corresponding to the array of addresses/identities. */
  value_array?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** This mutation allows you to create a new app on this Platform, you will become the Admin of the app. */
  CreateEnjinApp?: Maybe<EnjinApp>;
  /** This mutation can be used to update app information. */
  UpdateEnjinApp?: Maybe<EnjinApp>;
  /** This mutation deletes an app from this Platform, please note the app will remain registered on the blockchain. */
  DeleteEnjinApp?: Maybe<EnjinApp>;
  /** This mutation allows you to create a new identity for users on the Platform. */
  CreateEnjinIdentity?: Maybe<EnjinIdentity>;
  /** Use this mutation to update an identity. This mutation is also used to link a wallet with a signed message. */
  UpdateEnjinIdentity?: Maybe<EnjinIdentity>;
  /** This mutation deletes an identity from the Platform. You can also use this mutation to unlink an identity from a wallet. */
  DeleteEnjinIdentity?: Maybe<EnjinIdentity>;
  /** This mutation allows you to create a new transaction request to send to the blockchain, and is the main way to interact with the different smart contract methods. When creating transaction requests it is important to use the correct Identity ID as the ethereum address that is stored on it will be used as the 'creator' of the request and so needs to match the creator or owner of the token being manipulated. In the case of a Create request the ID will become the 'creator' of the new token. */
  CreateEnjinRequest?: Maybe<EnjinTransaction>;
  /** Use this mutation to update a pending transaction request. Transaction requests cannot be updated once they have been signed and broadcast to the ethereum network. */
  UpdateEnjinRequest?: Maybe<EnjinTransaction>;
  /** This mutation can be used to delete a pending transaction request from this Platform. A transaction request can no longer be deleted once it has been signed by the wallet and broadcast to the etheruem network. */
  DeleteEnjinRequest?: Maybe<Scalars['Boolean']>;
  /** This mutation allows you to create a new user for your application on the Platform. */
  CreateEnjinUser?: Maybe<EnjinUser>;
  /** Use this mutation to unlink a wallet from an app. */
  UnlinkApp?: Maybe<EnjinApp>;
  /** Use this mutation to unlink a wallet from an identity. */
  UnlinkIdentity?: Maybe<EnjinIdentity>;
  /** Use this mutation to invalidate the cached token metadata. */
  InvalidateTokenMetadata?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateEnjinAppArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};


export type MutationUpdateEnjinAppArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  options?: Maybe<AppOptionsInput>;
};


export type MutationDeleteEnjinAppArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateEnjinIdentityArgs = {
  appId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  ethAddress?: Maybe<Scalars['String']>;
};


export type MutationUpdateEnjinIdentityArgs = {
  id?: Maybe<Scalars['Int']>;
  linkingCode?: Maybe<Scalars['String']>;
  ethAddress?: Maybe<Scalars['String']>;
};


export type MutationDeleteEnjinIdentityArgs = {
  id?: Maybe<Scalars['Int']>;
  unlink?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateEnjinRequestArgs = {
  appId?: Maybe<Scalars['Int']>;
  ethAddress?: Maybe<Scalars['String']>;
  identityId?: Maybe<Scalars['Int']>;
  type?: Maybe<TransactionType>;
  test?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Boolean']>;
  create_token_data?: Maybe<CreateTokenInput>;
  create_trade_data?: Maybe<CreateTradeInput>;
  complete_trade_data?: Maybe<CompleteTradeInput>;
  mint_token_data?: Maybe<MintTokenInput>;
  melt_token_data?: Maybe<MeltTokenInput>;
  send_token_data?: Maybe<SendTokenInput>;
  send_enj_data?: Maybe<SendEnjInput>;
  advanced_send_token_data?: Maybe<AdvancedSendTokenInput>;
  update_item_name_data?: Maybe<UpdateItemNameInput>;
  set_item_uri_data?: Maybe<SetItemUriInput>;
  set_whitelisted_data?: Maybe<SetWhitelistedInput>;
  approve_enj_data?: Maybe<ApproveEnjInput>;
  approve_item_data?: Maybe<ApproveItemInput>;
  set_transferable_data?: Maybe<SetTransferableInput>;
  set_melt_fee_data?: Maybe<SetMeltFeeInput>;
  decrease_max_melt_fee_data?: Maybe<DecreaseMaxMeltFeeInput>;
  set_transfer_fee_data?: Maybe<SetTransferFeeInput>;
  decrease_max_transfer_fee_data?: Maybe<DecreaseMaxTransferFeeInput>;
  release_reserve_data?: Maybe<ReleaseReserveInput>;
  add_log_data?: Maybe<AddLogInput>;
  set_approval_for_all_data?: Maybe<SetApprovalForAllInput>;
  message_data?: Maybe<MessageInput>;
};


export type MutationUpdateEnjinRequestArgs = {
  id?: Maybe<Scalars['Int']>;
  rebroadcast?: Maybe<RebroadcastType>;
  state?: Maybe<TransactionState>;
  create_token_data?: Maybe<CreateTokenInput>;
  create_trade_data?: Maybe<CreateTradeInput>;
  complete_trade_data?: Maybe<CompleteTradeInput>;
  mint_token_data?: Maybe<MintTokenInput>;
  melt_token_data?: Maybe<MeltTokenInput>;
  send_token_data?: Maybe<SendTokenInput>;
  send_enj_data?: Maybe<SendEnjInput>;
  advanced_send_token_data?: Maybe<AdvancedSendTokenInput>;
  update_item_name_data?: Maybe<UpdateItemNameInput>;
  set_item_uri_data?: Maybe<SetItemUriInput>;
  set_whitelisted_data?: Maybe<SetWhitelistedInput>;
  approve_enj_data?: Maybe<ApproveEnjInput>;
  approve_item_data?: Maybe<ApproveItemInput>;
  set_transferable_data?: Maybe<SetTransferableInput>;
  set_melt_fee_data?: Maybe<SetMeltFeeInput>;
  decrease_max_melt_fee_data?: Maybe<DecreaseMaxMeltFeeInput>;
  set_transfer_fee_data?: Maybe<SetTransferFeeInput>;
  decrease_max_transfer_fee_data?: Maybe<DecreaseMaxTransferFeeInput>;
  release_reserve_data?: Maybe<ReleaseReserveInput>;
  add_log_data?: Maybe<AddLogInput>;
  set_approval_for_all_data?: Maybe<SetApprovalForAllInput>;
  message_data?: Maybe<MessageInput>;
};


export type MutationDeleteEnjinRequestArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateEnjinUserArgs = {
  name?: Maybe<Scalars['String']>;
};


export type MutationUnlinkAppArgs = {
  id?: Maybe<Scalars['Int']>;
  ethAddress?: Maybe<Scalars['String']>;
};


export type MutationUnlinkIdentityArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationInvalidateTokenMetadataArgs = {
  id: Scalars['String'];
};


/** The pagination cursor */
export type PaginationCursor = {
  __typename?: 'PaginationCursor';
  /** Number of total items selected by the query */
  total?: Maybe<Scalars['Int']>;
  /** Number of items returned per page */
  perPage?: Maybe<Scalars['Int']>;
  /** Current page of the cursor */
  currentPage?: Maybe<Scalars['Int']>;
  /** Determines if the cursor has pages */
  hasPages?: Maybe<Scalars['Boolean']>;
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  lastPage?: Maybe<Scalars['Int']>;
  /** Determines if cursor has more pages after the current page */
  hasMorePages?: Maybe<Scalars['Boolean']>;
};

/** Pagination settings. */
export type PaginationInput = {
  /** The page number to start at. */
  page?: Maybe<Scalars['Int']>;
  /** The number results to return per page. */
  limit?: Maybe<Scalars['Int']>;
};

export enum Permission {
  authorizeGraphQLPlayground = 'authorizeGraphQLPlayground',
  exportBeams = 'exportBeams',
  manageAdmins = 'manageAdmins',
  manageApp = 'manageApp',
  manageBeamEmailTemplates = 'manageBeamEmailTemplates',
  manageBeamers = 'manageBeamers',
  manageBeams = 'manageBeams',
  manageCharts = 'manageCharts',
  manageCreators = 'manageCreators',
  manageIdentities = 'manageIdentities',
  manageMembers = 'manageMembers',
  manageMinters = 'manageMinters',
  manageRequests = 'manageRequests',
  manageStatsViewers = 'manageStatsViewers',
  manageTags = 'manageTags',
  manageTokens = 'manageTokens',
  manageUsers = 'manageUsers',
  meltTokens = 'meltTokens',
  mintTokens = 'mintTokens',
  transferTokens = 'transferTokens',
  viewBeams = 'viewBeams',
  viewBeamsList = 'viewBeamsList',
  viewEvents = 'viewEvents',
  viewIdentities = 'viewIdentities',
  viewRequests = 'viewRequests',
  viewRoles = 'viewRoles',
  viewSecret = 'viewSecret',
  viewStats = 'viewStats',
  viewTokens = 'viewTokens',
  viewUsers = 'viewUsers',
  viewWallet = 'viewWallet'
}

/** An check permission result. */
export type PermissionResult = {
  __typename?: 'PermissionResult';
  /** If the permission is allowed. */
  allowed?: Maybe<Scalars['Boolean']>;
  /** The returned authorized or un-authorized message. */
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Use this query to obtain an access token for your app. */
  AuthApp?: Maybe<EnjinAuth>;
  /** Use this query to obtain an access token for a player. */
  AuthPlayer?: Maybe<EnjinAuth>;
  /** Use this query to get information about an app on this Platform. */
  EnjinApp?: Maybe<EnjinApp>;
  /** Use this query to get information about apps on this Platform. */
  EnjinApps?: Maybe<Array<Maybe<EnjinApp>>>;
  /** Use this query to get information about balances stored on this Platform. */
  EnjinBalances?: Maybe<Array<Maybe<EnjinBalance>>>;
  /** Use this query to get information about identities stored on this Platform. */
  EnjinIdentities?: Maybe<Array<Maybe<EnjinIdentity>>>;
  /** Use this query to get information about an identity stored on this Platform. */
  EnjinIdentity?: Maybe<EnjinIdentity>;
  /** Use this query to log users in and obtain an access token. */
  EnjinOauth?: Maybe<EnjinUser>;
  /** @deprecated Roles are no longer supported on the platform and have therefore been removed, this query will be removed in the future. */
  EnjinRoles?: Maybe<Array<Maybe<EnjinRole>>>;
  /** @deprecated This query is no longer supported and will be removed in the future. */
  EnjinSearch?: Maybe<Array<Maybe<EnjinSearchUnion>>>;
  /** Use this to query the token events that this Platform has recorded. */
  EnjinTokenEvents?: Maybe<Array<Maybe<EnjinTokenEvent>>>;
  /** Use this query to get token data. */
  EnjinToken?: Maybe<EnjinToken>;
  /** Use this query to get token data. */
  EnjinTokens?: Maybe<Array<Maybe<EnjinToken>>>;
  /** Use this to query transaction requests. */
  EnjinTransactions?: Maybe<Array<Maybe<EnjinTransaction>>>;
  /** Use this query to get information about a user on this Platform. */
  EnjinUser?: Maybe<EnjinUser>;
  /** Use this to query user data on this Platform. */
  EnjinUsers?: Maybe<Array<Maybe<EnjinUser>>>;
  /** Use this query to get wallet data. */
  EnjinWallet?: Maybe<EnjinWallet>;
  /** Use this query to get the latest gas prices. */
  GasPrice?: Maybe<GasPrices>;
  /** Use this query to get information about the Platform. */
  Platform?: Maybe<EnjinPlatform>;
};


export type QueryAuthAppArgs = {
  id: Scalars['Int'];
  secret: Scalars['String'];
};


export type QueryAuthPlayerArgs = {
  id: Scalars['String'];
};


export type QueryEnjinAppArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryEnjinAppsArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
};


export type QueryEnjinBalancesArgs = {
  ethAddress?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  filter?: Maybe<BalanceFilter>;
  pagination?: Maybe<PaginationInput>;
  appIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
  value_gt?: Maybe<Scalars['Int']>;
  value_gte?: Maybe<Scalars['Int']>;
  value_lt?: Maybe<Scalars['Int']>;
  value_lte?: Maybe<Scalars['Int']>;
};


export type QueryEnjinIdentitiesArgs = {
  id?: Maybe<Scalars['Int']>;
  appId?: Maybe<Scalars['Int']>;
  ethAddress?: Maybe<Scalars['String']>;
  linkingCode?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
};


export type QueryEnjinIdentityArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryEnjinOauthArgs = {
  appId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type QueryEnjinSearchArgs = {
  term?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
};


export type QueryEnjinTokenEventsArgs = {
  id?: Maybe<Scalars['Int']>;
  tokenId?: Maybe<Scalars['String']>;
  event?: Maybe<TokenEventType>;
  blockNumber?: Maybe<Scalars['Int']>;
  pagination?: Maybe<PaginationInput>;
};


export type QueryEnjinTokenArgs = {
  id?: Maybe<Scalars['String']>;
  appId?: Maybe<Scalars['Int']>;
};


export type QueryEnjinTokensArgs = {
  appId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['BigInt']>;
  reserve?: Maybe<Scalars['String']>;
  supplyModel?: Maybe<TokenSupplyModel>;
  meltValue?: Maybe<Scalars['BigInt']>;
  meltFeeRatio?: Maybe<Scalars['String']>;
  nonFungible?: Maybe<Scalars['Boolean']>;
  transferable?: Maybe<TokenTransferable>;
  firstBlock?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['Int']>;
  markedForDelete?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<TokenFilter>;
  pagination?: Maybe<PaginationInput>;
  sortBy?: Maybe<TokenSortInput>;
};


export type QueryEnjinTransactionsArgs = {
  id?: Maybe<Scalars['Int']>;
  transactionId?: Maybe<Scalars['String']>;
  identityId?: Maybe<Scalars['Int']>;
  type?: Maybe<TransactionType>;
  recipientId?: Maybe<Scalars['Int']>;
  recipientAddress?: Maybe<Scalars['String']>;
  senderOrRecipientId?: Maybe<Scalars['Int']>;
  tokenId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  states?: Maybe<Array<Maybe<TransactionState>>>;
  onlyBroadcastable?: Maybe<Scalars['Boolean']>;
  pagination?: Maybe<PaginationInput>;
  sortBy?: Maybe<TransactionSortInput>;
};


export type QueryEnjinUserArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  me?: Maybe<Scalars['Boolean']>;
};


export type QueryEnjinUsersArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
};


export type QueryEnjinWalletArgs = {
  ethAddress?: Maybe<Scalars['String']>;
};

/** The type of rebroadcast. */
export enum RebroadcastType {
  RETRY = 'RETRY',
  BACKUP = 'BACKUP',
  CANCEL = 'CANCEL'
}

/** Release the token reserve. */
export type ReleaseReserveInput = {
  /** The token (item) ID to release the reserve of. */
  token_id?: Maybe<Scalars['String']>;
  /** The amount of reserve to release. */
  value?: Maybe<Scalars['Int']>;
};

export enum Role {
  owner = 'owner',
  admin = 'admin',
  creator = 'creator',
  minter = 'minter',
  beamer = 'beamer',
  member = 'member',
  stats = 'stats'
}

/** Send ENJ. */
export type SendEnjInput = {
  /** The wallet address to send ENJ to. */
  to: Scalars['String'];
  /** The amount of ENJ to send in Wei (10^18 value, e.g. 1 ENJ = 1000000000000000000). */
  value: Scalars['String'];
};

/** A token. */
export type SendTokenInput = {
  /** The item ID to send. */
  token_id?: Maybe<Scalars['String']>;
  /** The hex encoded index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The recipient ethereum address to send to. */
  recipient_address?: Maybe<Scalars['String']>;
  /** The recipient identity ID to send to. */
  recipient_identity_id?: Maybe<Scalars['Int']>;
  /** The amount to send. */
  value?: Maybe<Scalars['Int']>;
};

/** Allow an operator complete control on all items owned by caller. */
export type SetApprovalForAllInput = {
  /** Ethereum address of the operator */
  operator?: Maybe<Scalars['String']>;
  /** Identity ID of the operator */
  operator_id?: Maybe<Scalars['Int']>;
  /** true: approved, false: not approved */
  approved?: Maybe<Scalars['Boolean']>;
};

/** An the item Uri. */
export type SetItemUriInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['Int']>;
  /** The uri for this item. */
  item_uri?: Maybe<Scalars['String']>;
};

/** Change the melt fee. */
export type SetMeltFeeInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on. */
  meltFee?: Maybe<Scalars['Int']>;
};

/** Change the transfer fee. */
export type SetTransferFeeInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The new transfer fee value (in Wei). */
  transferFee?: Maybe<Scalars['String']>;
};

/** Set if an item can be transferred or not. */
export type SetTransferableInput = {
  /** The token (item) ID to mint. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  transferable?: Maybe<TokenTransferable>;
};

/** The set the item whitelist. */
export type SetWhitelistedInput = {
  /** The token (item) ID of the whitelist. */
  token_id?: Maybe<Scalars['String']>;
  /** The account to add to the item whitelist */
  account?: Maybe<Scalars['String']>;
  /** The whitelist setting for this account address. */
  whitelisted?: Maybe<Scalars['String']>;
  /** Set whether whitelist setting is on/off. */
  on?: Maybe<Scalars['Boolean']>;
};

/** The direction to sort by. */
export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export type Statistics = {
  __typename?: 'Statistics';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
  groupBy?: Maybe<Scalars['String']>;
  datasets?: Maybe<Array<Maybe<Dataset>>>;
  averages?: Maybe<Dataset>;
  otherResults?: Maybe<Dataset>;
  /** Totals (excluding otherResults if requested) */
  subtotals?: Maybe<Dataset>;
  /** Totals (including otherResults if requested) */
  totals?: Maybe<Dataset>;
  /** The datapoints (label + value pairs) for the first dataset */
  datapoints?: Maybe<Array<Maybe<Datapoint>>>;
  /** Shortcut for retrieving just the datapoint labels for the first dataset */
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Shortcut for retrieving just the datapoint values for the first dataset */
  values?: Maybe<Array<Maybe<Scalars['Float']>>>;
  /** Shortcut for retrieving just the sum of the datapoint values for the first dataset */
  total?: Maybe<Scalars['Float']>;
};


export type StatisticslabelsArgs = {
  format?: Maybe<Scalars['String']>;
};

/** A tag. */
export type Tag = {
  __typename?: 'Tag';
  /** The tag id. */
  id?: Maybe<Scalars['Int']>;
  /** The tag name. */
  name?: Maybe<Scalars['String']>;
  /** The tag slug. */
  slug?: Maybe<Scalars['String']>;
};

/** The types of events. */
export enum TokenEventType {
  UNKNOWN_EVENT = 'UNKNOWN_EVENT',
  CREATE = 'CREATE',
  MELT = 'MELT',
  MINT = 'MINT',
  LOG = 'LOG',
  APPROVAL = 'APPROVAL',
  APPROVAL_FOR_ALL = 'APPROVAL_FOR_ALL',
  TRANSFER = 'TRANSFER',
  TRANSFER_SINGLE = 'TRANSFER_SINGLE',
  TRANSFER_BATCH = 'TRANSFER_BATCH',
  UPDATE_TRANSFER_FEE = 'UPDATE_TRANSFER_FEE',
  UPDATE_MAX_TRANSFER_FEE = 'UPDATE_MAX_TRANSFER_FEE',
  UPDATE_MELT_FEE = 'UPDATE_MELT_FEE',
  UPDATE_MAX_MELT_FEE = 'UPDATE_MAX_MELT_FEE',
  UPDATE_TRANSFERABLE = 'UPDATE_TRANSFERABLE',
  ASSIGN = 'ASSIGN',
  ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
  WHITELIST = 'WHITELIST',
  CREATE_TRADE = 'CREATE_TRADE',
  COMPLETE_TRADE = 'COMPLETE_TRADE',
  CANCEL_TRADE = 'CANCEL_TRADE',
  URI = 'URI',
  NAME = 'NAME',
  INITIALIZE = 'INITIALIZE',
  RETIRE = 'RETIRE',
  DECIMALS = 'DECIMALS',
  SYMBOL = 'SYMBOL',
  DEPLOY_ERC_ADAPTER = 'DEPLOY_ERC_ADAPTER',
  MANAGER_UPDATE = 'MANAGER_UPDATE'
}

/** The fields of the EnjinToken type. */
export enum TokenField {
  id = 'id',
  name = 'name',
  circulatingSupply = 'circulatingSupply',
  nonFungible = 'nonFungible',
  reserve = 'reserve',
  totalSupply = 'totalSupply',
  createdAt = 'createdAt',
  created_at = 'created_at'
}

/** Filter input for token queries. */
export type TokenFilter = {
  id?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  appId?: Maybe<Scalars['Int']>;
  appId_in?: Maybe<Array<Scalars['Int']>>;
  wallet?: Maybe<Scalars['EthAddress']>;
  wallet_in?: Maybe<Array<Scalars['EthAddress']>>;
  and?: Maybe<Array<TokenFilter>>;
  or?: Maybe<Array<TokenFilter>>;
};

/** The format to render a token id in. */
export enum TokenIdFormat {
  hex64 = 'hex64',
  hex256 = 'hex256',
  uint256 = 'uint256'
}

/** The format to render a token index in. */
export enum TokenIndexFormat {
  hex64 = 'hex64',
  uint64 = 'uint64'
}

/** A Token and quantity. */
export type TokenQuantity = {
  __typename?: 'TokenQuantity';
  /** The token requested. */
  token: EnjinToken;
  /** The quantity of the requested token. */
  quantity: Scalars['Int'];
};

/** A Token and quantity. */
export type TokenQuantityInput = {
  /** The token id requested. */
  tokenId: Scalars['String'];
  /** The quantity of the requested token. */
  quantity: Scalars['Int'];
};

/** Token sort settings. */
export type TokenSortInput = {
  /** The field to sort by */
  field?: TokenField;
  /** The direction to sort by */
  direction?: Maybe<SortDirection>;
};

/** The supply models. */
export enum TokenSupplyModel {
  FIXED = 'FIXED',
  SETTABLE = 'SETTABLE',
  INFINITE = 'INFINITE',
  COLLAPSING = 'COLLAPSING',
  ANNUAL_VALUE = 'ANNUAL_VALUE',
  ANNUAL_PERCENTAGE = 'ANNUAL_PERCENTAGE'
}

/** The transfer fee settings for an item. */
export type TokenTransferFeeSettingsInput = {
  /** The type of transfer (None, Per Item, Per Transfer). */
  type?: Maybe<TokenTransferFeeType>;
  /** The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other token - as long as it doesn't have a transfer fee itself. */
  token_id?: Maybe<Scalars['String']>;
  /** The transfer fee value (in Wei). This also gets set as the max transfer fee too. */
  value?: Maybe<Scalars['String']>;
};

/** The transfer fee types. */
export enum TokenTransferFeeType {
  NONE = 'NONE',
  PER_TRANSFER = 'PER_TRANSFER',
  PER_CRYPTO_ITEM = 'PER_CRYPTO_ITEM',
  RATIO_CUT = 'RATIO_CUT',
  RATIO_EXTRA = 'RATIO_EXTRA'
}

/** The transfer modes. */
export enum TokenTransferable {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  BOUND = 'BOUND'
}

/** Represents a token and a value. */
export type TokenValueInput = {
  /** The token ID */
  id?: Maybe<Scalars['String']>;
  /** The index of the item within a set of non-fungible items. */
  index?: Maybe<Scalars['Int']>;
  /** The number of tokens. */
  value?: Maybe<Scalars['Float']>;
};

/** The mode that determines token variant behavior. */
export enum TokenVariantMode {
  NONE = 'NONE',
  BEAM = 'BEAM',
  ONCE = 'ONCE',
  ALWAYS = 'ALWAYS'
}

/** Token ownership verification. */
export type TokenVerification = {
  __typename?: 'TokenVerification';
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  claimed?: Maybe<Scalars['Boolean']>;
  app?: Maybe<EnjinApp>;
  wallet?: Maybe<EnjinWallet>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Data for token ownership verification. */
export type TokenVerificationData = {
  __typename?: 'TokenVerificationData';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  validFrom: Scalars['DateTime'];
  validTo: Scalars['DateTime'];
  tokens?: Maybe<Array<Maybe<TokenQuantity>>>;
  platformId?: Maybe<Scalars['Int']>;
  platformImage?: Maybe<Scalars['String']>;
  claimedVerificationsCount?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  /** The ISO 8601 datetime when this resource was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ISO 8601 datetime when this resource was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The fields of the EnjinTransaction type. */
export enum TransactionField {
  id = 'id',
  state = 'state',
  title = 'title',
  createdAt = 'createdAt',
  created_at = 'created_at',
  updatedAt = 'updatedAt',
  updated_at = 'updated_at'
}

/** Filter transactions by read status */
export enum TransactionReadStatus {
  READ = 'READ',
  UNREAD = 'UNREAD'
}

/** Transaction sort settings. */
export type TransactionSortInput = {
  /** The field to sort by */
  field: TransactionField;
  /** The direction to sort by */
  direction?: Maybe<SortDirection>;
  /** Deprecated: Use direction instead */
  desc?: Maybe<Scalars['Boolean']>;
};

/** The types of transaction request states. */
export enum TransactionState {
  PENDING = 'PENDING',
  BROADCAST = 'BROADCAST',
  TP_PROCESSING = 'TP_PROCESSING',
  EXECUTED = 'EXECUTED',
  CANCELED_USER = 'CANCELED_USER',
  CANCELED_PLATFORM = 'CANCELED_PLATFORM',
  DROPPED = 'DROPPED',
  FAILED = 'FAILED'
}

/** The types of transaction requests. */
export enum TransactionType {
  ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
  ASSIGN = 'ASSIGN',
  APPROVE = 'APPROVE',
  CREATE = 'CREATE',
  MINT = 'MINT',
  SEND = 'SEND',
  SEND_ENJ = 'SEND_ENJ',
  ADVANCED_SEND = 'ADVANCED_SEND',
  CREATE_TRADE = 'CREATE_TRADE',
  COMPLETE_TRADE = 'COMPLETE_TRADE',
  CANCEL_TRADE = 'CANCEL_TRADE',
  MELT = 'MELT',
  UPDATE_NAME = 'UPDATE_NAME',
  SET_ITEM_URI = 'SET_ITEM_URI',
  SET_WHITELISTED = 'SET_WHITELISTED',
  SET_TRANSFERABLE = 'SET_TRANSFERABLE',
  SET_MELT_FEE = 'SET_MELT_FEE',
  DECREASE_MAX_MELT_FEE = 'DECREASE_MAX_MELT_FEE',
  SET_TRANSFER_FEE = 'SET_TRANSFER_FEE',
  DECREASE_MAX_TRANSFER_FEE = 'DECREASE_MAX_TRANSFER_FEE',
  RELEASE_RESERVE = 'RELEASE_RESERVE',
  ADD_LOG = 'ADD_LOG',
  SET_APPROVAL_FOR_ALL = 'SET_APPROVAL_FOR_ALL',
  MANAGER_UPDATE = 'MANAGER_UPDATE',
  SET_DECIMALS = 'SET_DECIMALS',
  SET_SYMBOL = 'SET_SYMBOL',
  MESSAGE = 'MESSAGE'
}

/** Transfer input data, represents transfer of a single token type with a single to/from pair. */
export type TransferInput = {
  /** Source of the funds */
  from?: Maybe<Scalars['String']>;
  /** Source of the funds */
  from_id?: Maybe<Scalars['Int']>;
  /** Destination of the funds */
  to?: Maybe<Scalars['String']>;
  /** Destination of the funds */
  to_id?: Maybe<Scalars['Int']>;
  /** Token to send */
  token_id?: Maybe<Scalars['String']>;
  /** Index of token to send (for NFTs) */
  token_index?: Maybe<Scalars['String']>;
  /** Amount to send */
  value?: Maybe<Scalars['String']>;
};

/** Update the item name. */
export type UpdateItemNameInput = {
  /** The token (item) ID to modify. */
  token_id?: Maybe<Scalars['String']>;
  /** The index of the item within an item set for non-fungible items. */
  token_index?: Maybe<Scalars['String']>;
  /** The new name for this item. */
  name?: Maybe<Scalars['String']>;
};


export const EnjinUserFragmentFragmentDoc = gql`
    fragment EnjinUserFragment on EnjinUser {
  id
  name
  identities {
    id
    linkingCode
    linkingCodeQr
    wallet {
      ethAddress
      ethBalance
    }
  }
}
    `;
export const AuthAppDocument = gql`
    query AuthApp($appId: Int!, $appSecret: String!) {
  AuthApp(id: $appId, secret: $appSecret) {
    accessToken
    expiresIn
  }
}
    `;
export const EnjinBalancesDocument = gql`
    query EnjinBalances($address: String!) {
  EnjinBalances(ethAddress: $address, value_gt: 0) {
    token {
      id
      index
      name
    }
    value
    wallet {
      ethAddress
    }
  }
}
    `;
export const EnjinUserDocument = gql`
    query EnjinUser($id: Int!) {
  EnjinUser(id: $id) {
    ...EnjinUserFragment
  }
}
    ${EnjinUserFragmentFragmentDoc}`;
export const CreateEnjinUserDocument = gql`
    mutation CreateEnjinUser($name: String!) {
  CreateEnjinUser(name: $name) {
    ...EnjinUserFragment
    accessTokens
  }
}
    ${EnjinUserFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AuthApp(variables: AuthAppQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthAppQuery> {
      return withWrapper(() => client.request<AuthAppQuery>(AuthAppDocument, variables, requestHeaders));
    },
    EnjinBalances(variables: EnjinBalancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EnjinBalancesQuery> {
      return withWrapper(() => client.request<EnjinBalancesQuery>(EnjinBalancesDocument, variables, requestHeaders));
    },
    EnjinUser(variables: EnjinUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EnjinUserQuery> {
      return withWrapper(() => client.request<EnjinUserQuery>(EnjinUserDocument, variables, requestHeaders));
    },
    CreateEnjinUser(variables: CreateEnjinUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEnjinUserMutation> {
      return withWrapper(() => client.request<CreateEnjinUserMutation>(CreateEnjinUserDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type AuthAppQueryVariables = Exact<{
  appId: Scalars['Int'];
  appSecret: Scalars['String'];
}>;


export type AuthAppQuery = (
  { __typename?: 'Query' }
  & { AuthApp?: Maybe<(
    { __typename?: 'EnjinAuth' }
    & Pick<EnjinAuth, 'accessToken' | 'expiresIn'>
  )> }
);

export type EnjinBalancesQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type EnjinBalancesQuery = (
  { __typename?: 'Query' }
  & { EnjinBalances?: Maybe<Array<Maybe<(
    { __typename?: 'EnjinBalance' }
    & Pick<EnjinBalance, 'value'>
    & { token?: Maybe<(
      { __typename?: 'EnjinToken' }
      & Pick<EnjinToken, 'id' | 'index' | 'name'>
    )>, wallet?: Maybe<(
      { __typename?: 'EnjinWallet' }
      & Pick<EnjinWallet, 'ethAddress'>
    )> }
  )>>> }
);

export type EnjinUserFragmentFragment = (
  { __typename?: 'EnjinUser' }
  & Pick<EnjinUser, 'id' | 'name'>
  & { identities?: Maybe<Array<Maybe<(
    { __typename?: 'EnjinIdentity' }
    & Pick<EnjinIdentity, 'id' | 'linkingCode' | 'linkingCodeQr'>
    & { wallet?: Maybe<(
      { __typename?: 'EnjinWallet' }
      & Pick<EnjinWallet, 'ethAddress' | 'ethBalance'>
    )> }
  )>>> }
);

export type EnjinUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EnjinUserQuery = (
  { __typename?: 'Query' }
  & { EnjinUser?: Maybe<(
    { __typename?: 'EnjinUser' }
    & EnjinUserFragmentFragment
  )> }
);

export type CreateEnjinUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateEnjinUserMutation = (
  { __typename?: 'Mutation' }
  & { CreateEnjinUser?: Maybe<(
    { __typename?: 'EnjinUser' }
    & Pick<EnjinUser, 'accessTokens'>
    & EnjinUserFragmentFragment
  )> }
);
