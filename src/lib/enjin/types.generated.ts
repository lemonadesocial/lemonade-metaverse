import * as TypeGraphQL from 'type-graphql';
export { TypeGraphQL };
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type FixDecorator<T> = T;
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

@TypeGraphQL.InputType({ description: 'Append a "Log" event to an item id' })
export class AddLogInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID on which the log is appended.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The message to be logged.', nullable: true })
  data!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'A token.' })
export class AdvancedSendTokenInput {

  @TypeGraphQL.Field(type => [TransferInput], { description: 'The different transfers to perform.', nullable: 'itemsAndList' })
  transfers!: Maybe<Array<Maybe<TransferInput>>>;

  @TypeGraphQL.Field(type => Boolean, { description: 'DEPRECATED - All transfers are now safe. Should we use the _safe_ variant of this transaction (used when sending tokens to contracts that are expecting a callback).', nullable: true })
  safe!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'The data to forward with the safe callbacks.', nullable: true })
  data!: Maybe<Scalars['String']>;
};

/** The grouping to use when querying multiple datasets. */
export enum AggregationGroupBy {
  countries = 'countries',
  tags = 'tags',
  tokens = 'tokens'
}
TypeGraphQL.registerEnumType(AggregationGroupBy, { name: 'AggregationGroupBy' });

/** The time between the datapoints. */
export enum AggregationInterval {
  day = 'day',
  month = 'month',
  fiscalYear = 'fiscalYear',
  lastFiscalYear = 'lastFiscalYear'
}
TypeGraphQL.registerEnumType(AggregationInterval, { name: 'AggregationInterval' });

/** The type of aggregation to perform. */
export enum AggregationType {
  count = 'count',
  cumulative = 'cumulative',
  percentage = 'percentage'
}
TypeGraphQL.registerEnumType(AggregationType, { name: 'AggregationType' });

@TypeGraphQL.InputType({ description: 'user configurable options' })
export class AppOptionsInput {

  @TypeGraphQL.Field(type => Boolean, { description: 'Enables token proof feature', nullable: true })
  tokenProofEnabled!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'Token proof feature url', nullable: true })
  tokenProofUrl!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Enables weak challenge by default', nullable: true })
  weakChallengeDefault!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.InputType({ description: 'Approve the Crypto Items contract to spend your ENJ.' })
export class ApproveEnjInput {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The amount of ENJ to approve. Set this to -1 to approve the maximum amount possible.', nullable: true })
  value!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.InputType({ description: 'Approve an operator to transfer your Crypto Items.' })
export class ApproveItemInput {

  @TypeGraphQL.Field(type => String, { description: 'Ethereum address of the operator', nullable: true })
  operator!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Identity ID of the operator', nullable: true })
  operator_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'Token to approve', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'Index of token to approve (for NFTs)', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Current approved value (before this transaction)', nullable: true })
  current_value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Amount to approve', nullable: true })
  value!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.InputType({ description: 'Filter input for balance queries.' })
export class BalanceFilter {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { nullable: true })
  appId_in!: Maybe<Array<Scalars['Int']>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [String], { nullable: true })
  tokenId_in!: Maybe<Array<Scalars['String']>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  wallet!: Maybe<Scalars['EthAddress']>;

  @TypeGraphQL.Field(type => [String], { nullable: true })
  wallet_in!: Maybe<Array<Scalars['EthAddress']>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_gt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_gte!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_lt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_lte!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [BalanceFilter], { nullable: true })
  and!: Maybe<Array<BalanceFilter>>;

  @TypeGraphQL.Field(type => [BalanceFilter], { nullable: true })
  or!: Maybe<Array<BalanceFilter>>;
};

@TypeGraphQL.ObjectType({ description: 'A beam email template on the Platform.' })
export class BeamEmailTemplate {
  __typename?: 'BeamEmailTemplate';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the beam email template.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Id of related beam.', nullable: true })
  beamId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The name of the beam email template.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The file name of the beam email template.', nullable: true })
  templateFileName!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'If the template is active.', nullable: true })
  isActive!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => [BeamEmailTemplate], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<BeamEmailTemplate>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


@TypeGraphQL.ObjectType({ description: 'A saved chart.' })
export class Chart {
  __typename?: 'Chart';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  type!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [ChartDataset], { nullable: 'itemsAndList' })
  datasets!: Maybe<Array<Maybe<ChartDataset>>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  from!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  to!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => AggregationInterval, { nullable: true })
  interval!: Maybe<AggregationInterval>;

  @TypeGraphQL.Field(type => [Country], { nullable: 'itemsAndList' })
  countries!: Maybe<Array<Maybe<Country>>>;

  @TypeGraphQL.Field(type => [Tag], { nullable: 'itemsAndList' })
  tags!: Maybe<Array<Maybe<Tag>>>;

  @TypeGraphQL.Field(type => [EnjinToken], { nullable: 'itemsAndList' })
  tokens!: Maybe<Array<Maybe<EnjinToken>>>;

  @TypeGraphQL.Field(type => AggregationGroupBy, { nullable: true })
  groupBy!: Maybe<AggregationGroupBy>;

  @TypeGraphQL.Field(type => Boolean, { nullable: true })
  otherResults!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;
};

@TypeGraphQL.ObjectType({ description: 'A chart dataset.' })
export class ChartDataset {
  __typename?: 'ChartDataset';

  @TypeGraphQL.Field(type => ChartDatasetName, { nullable: true })
  name!: Maybe<ChartDatasetName>;

  @TypeGraphQL.Field(type => AggregationType, { nullable: true })
  type!: Maybe<AggregationType>;
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
TypeGraphQL.registerEnumType(ChartDatasetName, { name: 'ChartDatasetName' });

@TypeGraphQL.ObjectType({ description: 'Permissions of a chart on the Platform.' })
export class ChartPermissions {
  __typename?: 'ChartPermissions';

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check Chart delete permission.', nullable: true })
  delete!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check Chart update permission.', nullable: true })
  update!: Maybe<PermissionResult>;
};

@TypeGraphQL.InputType({ description: 'Complete a trade between two users.' })
export class CompleteTradeInput {

  @TypeGraphQL.Field(type => String, { description: 'The trade ID (found in the CreateTrade event).', nullable: true })
  trade_id!: Maybe<Scalars['String']>;
};

@TypeGraphQL.ObjectType({ description: 'A country.' })
export class Country {
  __typename?: 'Country';

  @TypeGraphQL.Field(type => String, { description: 'The country name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The country code.', nullable: true })
  code!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'A token.' })
export class CreateTokenInput {

  @TypeGraphQL.Field(type => String, { description: 'The item name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => BigInt, { description: 'The total supply of the item.', nullable: true })
  totalSupply!: Maybe<Scalars['BigInt']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The initial reserve of the item available to mint.', nullable: true })
  initialReserve!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TokenSupplyModel, { description: 'The supply model. Fixed means you can\'t change the total supply once set. Settable means the total supply can be set at any time. Collapsing means that once an item has been melted you cannot re-mint it. Annual Value means the total supply can be changed by a certain number of items per year. Annual Percentage means the total supply can be changed by a certain percentage per year.', nullable: true })
  supplyModel!: Maybe<TokenSupplyModel>;

  @TypeGraphQL.Field(type => BigInt, { description: 'The the melt fee (and therefore the exchange rate) for this item.', nullable: true })
  meltValue!: Maybe<Scalars['BigInt']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on.', nullable: true })
  meltFeeRatio!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TokenTransferable, { description: 'Shows if the item is transferable.', nullable: true })
  transferable!: Maybe<TokenTransferable>;

  @TypeGraphQL.Field(type => TokenTransferFeeSettingsInput, { description: 'The fee settings for this item.', nullable: true })
  transferFeeSettings!: Maybe<TokenTransferFeeSettingsInput>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Set is the item is non-fungible.', nullable: true })
  nonFungible!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'The filename of the uploaded icon.', nullable: true })
  icon!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'A trade between two users.' })
export class CreateTradeInput {

  @TypeGraphQL.Field(type => [TokenValueInput], { description: 'The items we\'re asking for.', nullable: 'itemsAndList' })
  asking_tokens!: Maybe<Array<Maybe<TokenValueInput>>>;

  @TypeGraphQL.Field(type => [TokenValueInput], { description: 'The items we\'re offering.', nullable: 'itemsAndList' })
  offering_tokens!: Maybe<Array<Maybe<TokenValueInput>>>;

  @TypeGraphQL.Field(type => String, { description: 'The other trade participant\'s ethereum address to send to.', nullable: true })
  second_party_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The other trade participant\'s identity ID to send to.', nullable: true })
  second_party_identity_id!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType()
export class Datapoint {
  __typename?: 'Datapoint';

  @TypeGraphQL.Field(type => String, { nullable: true })
  label!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { nullable: true })
  value!: Maybe<Scalars['Float']>;
};


@TypeGraphQL.ArgsType()
export class DatapointlabelArgs {

  @TypeGraphQL.Field(type => String, { nullable: true })
  format!: Maybe<Scalars['String']>;
};

@TypeGraphQL.ObjectType()
export class Dataset {
  __typename?: 'Dataset';

  @TypeGraphQL.Field(type => String, { description: 'The name of the dataset', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [Datapoint], { description: 'The datapoints (label + value pairs)', nullable: 'itemsAndList' })
  datapoints!: Maybe<Array<Maybe<Datapoint>>>;

  @TypeGraphQL.Field(type => [String], { description: 'Shortcut for retrieving just the datapoint labels', nullable: 'itemsAndList' })
  labels!: Maybe<Array<Maybe<Scalars['String']>>>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Float], { description: 'Shortcut for retrieving just the datapoint values', nullable: 'itemsAndList' })
  values!: Maybe<Array<Maybe<Scalars['Float']>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Shortcut for retrieving just the sum of the datapoint values', nullable: true })
  total!: Maybe<Scalars['Float']>;
};


@TypeGraphQL.ArgsType()
export class DatasetlabelsArgs {

  @TypeGraphQL.Field(type => String, { nullable: true })
  format!: Maybe<Scalars['String']>;
};


@TypeGraphQL.InputType({ description: 'Set the max melt fee to a different, lower value.' })
export class DecreaseMaxMeltFeeInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'New maximum value that the melt fee can be set to. It represents the ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on.', nullable: true })
  maxMeltFee!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.InputType({ description: 'Set the max transfer fee to a different, lower, value.' })
export class DecreaseMaxTransferFeeInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The new maximum value for transfer fees (in Wei).', nullable: true })
  maxTransferFee!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ObjectType({ description: 'An app on the Platform.' })
export class EnjinApp {
  __typename?: 'EnjinApp';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the app.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The app secret.', nullable: true })
  secret!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The name of the app.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The description of the app.', nullable: true })
  description!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The image URL for the app.', nullable: true })
  image!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The linking code for this app. Use this to link a wallet to an app.', nullable: true })
  linkingCode!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'A link to a QR Code for this app linking code.', nullable: true })
  linkingCodeQr!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of tokens created for this app.', nullable: true })
  token_count!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of tokens created for this app.', nullable: true })
  tokenCount!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => EnjinUser, { description: 'The user who owns this app.', nullable: true })
  owner!: Maybe<EnjinUser>;

  @TypeGraphQL.Field(type => [EnjinIdentity], { description: 'The list of identities linked to the app.', nullable: 'itemsAndList' })
  identities!: Maybe<Array<Maybe<EnjinIdentity>>>;

  @TypeGraphQL.Field(type => EnjinIdentity, { description: 'The current user\'s identity linked to the app.', nullable: true })
  identity!: Maybe<EnjinIdentity>;

  @TypeGraphQL.Field(type => [EnjinTransaction], { description: 'The list of transactions linked to the app.', nullable: 'itemsAndList' })
  transactions!: Maybe<Array<Maybe<EnjinTransaction>>>;

  @TypeGraphQL.Field(type => [EnjinToken], { description: 'The tokens that have been created for this app.', nullable: 'itemsAndList' })
  tokens!: Maybe<Array<Maybe<EnjinToken>>>;

  @TypeGraphQL.Field(type => [EnjinWallet], { description: 'The wallets that have been bound to this app.', nullable: 'itemsAndList' })
  wallets!: Maybe<Array<Maybe<EnjinWallet>>>;

  @TypeGraphQL.Field(type => [EnjinRole], { description: 'The user roles for this app.', nullable: 'itemsAndList' })
  roles!: Maybe<Array<Maybe<EnjinRole>>>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinApp], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinApp>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** An app on the Platform. */
@TypeGraphQL.ArgsType()
export class EnjinApplinkingCodeQrArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  size!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'user configurable options' })
export class EnjinAppOptions {
  __typename?: 'EnjinAppOptions';

  @TypeGraphQL.Field(type => Boolean, { description: 'Enables token proof feature', nullable: true })
  tokenProofEnabled!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'Token proof feature url', nullable: true })
  tokenProofUrl!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Weak challenge default value', nullable: true })
  weakChallengeDefault!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.ObjectType({ description: 'Permissions of an app on the Platform.' })
export class EnjinAppPermissions {
  __typename?: 'EnjinAppPermissions';

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check deleteApp permission.', nullable: true })
  deleteApp!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check exportBeams permission.', nullable: true })
  exportBeams!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageAdmins permission.', nullable: true })
  manageAdmins!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageApp permission.', nullable: true })
  manageApp!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageBeamers permission.', nullable: true })
  manageBeamers!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageBeams permission.', nullable: true })
  manageBeams!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageBilling permission.', nullable: true })
  manageBilling!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageCharts permission.', nullable: true })
  manageCharts!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageCreators permission.', nullable: true })
  manageCreators!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageIdentities permission.', nullable: true })
  manageIdentities!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageMembers permission.', nullable: true })
  manageMembers!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageMinters permission.', nullable: true })
  manageMinters!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageRequests permission.', nullable: true })
  manageRequests!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageStatsViewers permission.', nullable: true })
  manageStatsViewers!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageTags permission.', nullable: true })
  manageTags!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageTokens permission.', nullable: true })
  manageTokens!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check manageUsers permission.', nullable: true })
  manageUsers!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check meltTokens permission.', nullable: true })
  meltTokens!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check mintTokens permission.', nullable: true })
  mintTokens!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check transferTokens permission.', nullable: true })
  transferTokens!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewBeams permission.', nullable: true })
  viewBeams!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewBeamsList permission.', nullable: true })
  viewBeamsList!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewEvents permission.', nullable: true })
  viewEvents!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewIdentities permission.', nullable: true })
  viewIdentities!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewRequests permission.', nullable: true })
  viewRequests!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewRoles permission.', nullable: true })
  viewRoles!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewSecret permission.', nullable: true })
  viewSecret!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewStats permission.', nullable: true })
  viewStats!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewTokens permission.', nullable: true })
  viewTokens!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewUsers permission.', nullable: true })
  viewUsers!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check viewWallet permission.', nullable: true })
  viewWallet!: Maybe<PermissionResult>;
};

@TypeGraphQL.ObjectType({ description: 'Usage stats of an App.' })
export class EnjinAppUsage {
  __typename?: 'EnjinAppUsage';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of requests of the App.', nullable: true })
  requestCount!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of users in the App.', nullable: true })
  userCount!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'A successful auth object.' })
export class EnjinAuth {
  __typename?: 'EnjinAuth';

  @TypeGraphQL.Field(type => String, { description: 'The access token for this auth.', nullable: true })
  accessToken!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The refresh token for this auth.', nullable: true })
  refreshToken!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of seconds until the access token expires.', nullable: true })
  expiresIn!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'A token balance.' })
export class EnjinBalance {
  __typename?: 'EnjinBalance';

  @TypeGraphQL.Field(type => String, { description: 'The token id for this balance. Note: only hex256 and uint256 formats are unique (per wallet).', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The token index for this balance.', nullable: true })
  index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The balance of this token.', nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The app for this balance\'s token.', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => EnjinToken, { description: 'The token for this balance.', nullable: true })
  token!: Maybe<EnjinToken>;

  @TypeGraphQL.Field(type => EnjinIdentity, { description: 'The identity for this balance.', nullable: true })
  identity!: Maybe<EnjinIdentity>;

  @TypeGraphQL.Field(type => EnjinWallet, { description: 'The wallet for this balance.', nullable: true })
  wallet!: Maybe<EnjinWallet>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The balance of this token.', nullable: true })
  balance!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The ethereum address.', nullable: true })
  ethereum_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The token id for this balance.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The token index for this balance.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The identity id linked to this balance (if linked).', nullable: true })
  identity_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [EnjinBalance], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinBalance>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** A token balance. */
@TypeGraphQL.ArgsType()
export class EnjinBalanceidArgs {

  @TypeGraphQL.Field(type => TokenIdFormat, { nullable: true })
  format!: Maybe<TokenIdFormat>;
};


/** A token balance. */
@TypeGraphQL.ArgsType()
export class EnjinBalanceindexArgs {

  @TypeGraphQL.Field(type => TokenIndexFormat, { nullable: true })
  format!: Maybe<TokenIndexFormat>;
};

@TypeGraphQL.ObjectType({ description: 'A user\'s identity for a game.' })
export class EnjinIdentity {
  __typename?: 'EnjinIdentity';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the identity.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app_id this identity belongs to.', nullable: true })
  app_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app_id this identity belongs to.', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The linking code for this identity. Use this to link an ethereum address to an identity.', nullable: true })
  linking_code!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The linking code for this identity. Use this to link an ethereum address to an identity.', nullable: true })
  linkingCode!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'A link to a QR Code for this identity linking code.', nullable: true })
  linking_code_qr!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'A link to a QR Code for this identity linking code.', nullable: true })
  linkingCodeQr!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The app the identity is linked to.', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => EnjinUser, { description: 'The user linked to the identity.', nullable: true })
  user!: Maybe<EnjinUser>;

  @TypeGraphQL.Field(type => [EnjinTransaction], { description: 'The list of transactions linked to the identity.', nullable: 'itemsAndList' })
  transactions!: Maybe<Array<Maybe<EnjinTransaction>>>;

  @TypeGraphQL.Field(type => [EnjinToken], { description: 'The list of tokens linked to the identity.', nullable: 'itemsAndList' })
  tokens!: Maybe<Array<Maybe<EnjinToken>>>;

  @TypeGraphQL.Field(type => EnjinWallet, { description: 'The wallet for this balance.', nullable: true })
  wallet!: Maybe<EnjinWallet>;

  @TypeGraphQL.Field(type => String, { description: 'The Ethereum address this identity belongs to.', nullable: true })
  ethereum_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The identity\'s Ethereum balance.', nullable: true })
  eth_balance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The identity\'s Enjin Coin balance.', nullable: true })
  enj_balance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The identity\'s Enjin Coin allowance given to CryptoItems.', nullable: true })
  enj_allowance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => Object, { description: 'The total number of tokens and their enj value that this identity currently owns.', nullable: true })
  all_tokens_balance!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinIdentity], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinIdentity>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** A user's identity for a game. */
@TypeGraphQL.ArgsType()
export class EnjinIdentitylinking_code_qrArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  size!: Maybe<Scalars['Int']>;
};


/** A user's identity for a game. */
@TypeGraphQL.ArgsType()
export class EnjinIdentitylinkingCodeQrArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  size!: Maybe<Scalars['Int']>;
};


/** A user's identity for a game. */
@TypeGraphQL.ArgsType()
export class EnjinIdentitytransactionsArgs {

  @TypeGraphQL.Field(type => TransactionState, { nullable: true })
  state!: Maybe<TransactionState>;

  @TypeGraphQL.Field(type => [TransactionState], { nullable: true })
  state_in!: Maybe<Array<TransactionState>>;

  @TypeGraphQL.Field(type => Boolean, { nullable: true })
  can_broadcast_only!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => PaginationInput, { nullable: true })
  pagination!: Maybe<PaginationInput>;

  @TypeGraphQL.Field(type => TransactionSortInput, { nullable: true })
  sort_by!: Maybe<TransactionSortInput>;
};


/** A user's identity for a game. */
@TypeGraphQL.ArgsType()
export class EnjinIdentitytokensArgs {

  @TypeGraphQL.Field(type => String, { nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => PaginationInput, { nullable: true })
  pagination!: Maybe<PaginationInput>;

  @TypeGraphQL.Field(type => TokenSortInput, { nullable: true })
  sort_by!: Maybe<TokenSortInput>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  include_creator_tokens!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.ObjectType({ description: 'A user permission.' })
export class EnjinPermission {
  __typename?: 'EnjinPermission';

  @TypeGraphQL.Field(type => Permission, { description: 'The permission name.', nullable: true })
  name!: Maybe<Permission>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The permission id.', nullable: true })
  id!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'A plan on the Platform.' })
export class EnjinPlan {
  __typename?: 'EnjinPlan';

  @TypeGraphQL.Field(type => String, { description: 'The name of the plan.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app limit of the plan.', nullable: true })
  appLimit!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The request limit of the plan.', nullable: true })
  requestLimit!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The user limit of the plan.', nullable: true })
  userLimit!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'When true indicates that this is a managed plan.', nullable: true })
  managed!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Check if this is a trial plan.', nullable: true })
  isTrialPlan!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Date, { description: 'The date and time the trial is due to expire', nullable: true })
  trialExpiresOn!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of days remaining if on a trial plan.', nullable: true })
  trialDaysRemaining!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'An app on the Platform.' })
export class EnjinPlatform {
  __typename?: 'EnjinPlatform';

  @TypeGraphQL.Field(type => String, { description: 'The Platform ID.', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The Platform name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The current Ethereum network this TP is using (Ropsten / Mainnet)', nullable: true })
  network!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The last scraped block on this network.', nullable: true })
  blockHeight!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Object, { description: 'The smart contracts used by this platform.', nullable: true })
  contracts!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The platform notification drivers.', nullable: true })
  notifications!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinApp], { description: 'The list of apps registered to the platform.', nullable: 'itemsAndList' })
  apps!: Maybe<Array<Maybe<EnjinApp>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The last scraped block on this network.', nullable: true })
  blockheight!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'A user role.' })
export class EnjinRole {
  __typename?: 'EnjinRole';

  @TypeGraphQL.Field(type => String, { description: 'The role name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The role slug.', nullable: true })
  slug!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [EnjinPermission], { description: 'The list of permissions assigned to this role.', nullable: 'itemsAndList' })
  permissions!: Maybe<Array<Maybe<EnjinPermission>>>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The app this role belongs to.', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => EnjinUser, { description: 'The user who owns this app.', nullable: true })
  user!: Maybe<EnjinUser>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The role id.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app id this role belongs to.', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app id this role belongs to.', nullable: true })
  app_id!: Maybe<Scalars['Int']>;
};

/** The search result. */
export type EnjinSearchUnion = EnjinApp | EnjinIdentity | EnjinToken | EnjinTransaction | EnjinUser;

@TypeGraphQL.ObjectType({ description: 'Permissions of a tag on the Platform.' })
export class EnjinTagPermissions {
  __typename?: 'EnjinTagPermissions';

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check Tag delete permission.', nullable: true })
  delete!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check Tag update permission.', nullable: true })
  update!: Maybe<PermissionResult>;
};

@TypeGraphQL.ObjectType({ description: 'An item.' })
export class EnjinToken {
  __typename?: 'EnjinToken';

  @TypeGraphQL.Field(type => String, { description: 'The base id of the item.', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The item name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app id this item belongs to.', nullable: true })
  app_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app id this item belongs to.', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The number of items currently available to mint.', nullable: true })
  availableToMint!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The block number of the last update.', nullable: true })
  blockHeight!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The user who created the item.', nullable: true })
  creator!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The first block this item appeared in.', nullable: true })
  firstBlock!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The URL for the item icon.', nullable: true })
  icon!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The the melt fee ratio for this item in the range 0-10000 to allow fractional ratios, e,g, 1 = 0.01%,  10000 = 100%, 250 = 2.5% and so on.', nullable: true })
  meltFeeRatio!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The the max melt fee ratio for this item in the range 0-10000 to allow fractional ratios, e,g, 1 = 0.01%,  10000 = 100%, 250 = 2.5% and so on.', nullable: true })
  meltFeeMaxRatio!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => BigInt, { description: 'The the melt value (and therefore exchange rate) for this item.', nullable: true })
  meltValue!: Maybe<Scalars['BigInt']>;

  @TypeGraphQL.Field(type => Object, { description: 'The hosted metadata of the token.', nullable: true })
  metadata!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Has this item been marked for delete?', nullable: true })
  markedForDelete!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'If this is this a non fungible item.', nullable: true })
  nonFungible!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'The initial reserve of the item.', nullable: true })
  reserve!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TokenSupplyModel, { description: 'The item\'s supply model.', nullable: true })
  supplyModel!: Maybe<TokenSupplyModel>;

  @TypeGraphQL.Field(type => BigInt, { description: 'The circulating supply of the item.', nullable: true })
  circulatingSupply!: Maybe<Scalars['BigInt']>;

  @TypeGraphQL.Field(type => BigInt, { description: 'The total supply of the item.', nullable: true })
  totalSupply!: Maybe<Scalars['BigInt']>;

  @TypeGraphQL.Field(type => TokenTransferable, { description: 'The transferable type.', nullable: true })
  transferable!: Maybe<TokenTransferable>;

  @TypeGraphQL.Field(type => EnjinTokenTransferFeeSettings, { description: 'The fee settings for this item.', nullable: true })
  transferFeeSettings!: Maybe<EnjinTokenTransferFeeSettings>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The balance of the item.', nullable: true })
  balance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => String, { description: 'The item index. For a token query this will list all the tokens in the wild, for identities will list the individual index the identity owns.', nullable: true })
  index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The URI for this item (if set).', nullable: true })
  itemURI!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The app this item belongs to.', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => [EnjinIdentity], { description: 'The list of identities linked to the item.', nullable: 'itemsAndList' })
  identities!: Maybe<Array<Maybe<EnjinIdentity>>>;

  @TypeGraphQL.Field(type => [EnjinTokenEvent], { description: 'The list of token events linked to this item.', nullable: 'itemsAndList' })
  tokenEvents!: Maybe<Array<Maybe<EnjinTokenEvent>>>;

  @TypeGraphQL.Field(type => [EnjinTransaction], { description: 'The list of transactions for this item.', nullable: 'itemsAndList' })
  transactions!: Maybe<Array<Maybe<EnjinTransaction>>>;

  @TypeGraphQL.Field(type => EnjinWallet, { description: 'The wallet for this balance.', nullable: true })
  wallet!: Maybe<EnjinWallet>;

  @TypeGraphQL.Field(type => String, { description: 'The base id of the item.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => EnjinIdentity, { nullable: true })
  creatorIdentity!: Maybe<EnjinIdentity>;

  @TypeGraphQL.Field(type => Boolean, { description: 'If the query context includes the identity (e.g. from the EnjinIdentities.tokens sub-query) then set if it\'s the creator of this token, otherwise this will be null.', nullable: true })
  isCreator!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => [EnjinTransaction], { description: 'The list of transactions for this item.', nullable: 'itemsAndList' })
  requests!: Maybe<Array<Maybe<EnjinTransaction>>>;

  @TypeGraphQL.Field(type => TokenVariantMode, { nullable: true })
  variantMode!: Maybe<TokenVariantMode>;

  @TypeGraphQL.Field(type => [EnjinTokenVariant], { description: 'The list of token variants of this item.', nullable: 'itemsAndList' })
  variants!: Maybe<Array<Maybe<EnjinTokenVariant>>>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinToken], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinToken>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** An item. */
@TypeGraphQL.ArgsType()
export class EnjinTokenidArgs {

  @TypeGraphQL.Field(type => TokenIdFormat, { nullable: true })
  format!: Maybe<TokenIdFormat>;
};


/** An item. */
@TypeGraphQL.ArgsType()
export class EnjinTokenitemURIArgs {

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  replace_uri_parameters!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.ObjectType({ description: 'An item event.' })
export class EnjinTokenEvent {
  __typename?: 'EnjinTokenEvent';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the item event.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The item id the event belongs to.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The item id the event belongs to.', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TokenEventType, { description: 'The event type.', nullable: true })
  event!: Maybe<TokenEventType>;

  @TypeGraphQL.Field(type => String, { description: 'The first parameter.', nullable: true })
  param1!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The second parameter.', nullable: true })
  param2!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The third parameter.', nullable: true })
  param3!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The fourth parameter.', nullable: true })
  param4!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The block number the event occurred.', nullable: true })
  blockNumber!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => EnjinToken, { description: 'The list of items the event belong to.', nullable: true })
  token!: Maybe<EnjinToken>;

  @TypeGraphQL.Field(type => EnjinTransaction, { description: 'The transaction relating to this event.', nullable: true })
  transaction!: Maybe<EnjinTransaction>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinTokenEvent], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinTokenEvent>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};

@TypeGraphQL.ObjectType({ description: 'The transfer fee settings for an item.' })
export class EnjinTokenTransferFeeSettings {
  __typename?: 'EnjinTokenTransferFeeSettings';

  @TypeGraphQL.Field(type => TokenTransferFeeType, { description: 'The type of transfer (None, Per Item, Per Transfer).', nullable: true })
  type!: Maybe<TokenTransferFeeType>;

  @TypeGraphQL.Field(type => String, { description: 'The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other item - as long as it doesn\'t have a transfer fee itself.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other item - as long as it doesn\'t have a transfer fee itself.', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The transfer fee value (in Wei). This also gets set as the max transfer fee too.', nullable: true })
  value!: Maybe<Scalars['String']>;
};

@TypeGraphQL.ObjectType({ description: 'A Token Variant.' })
export class EnjinTokenVariant {
  __typename?: 'EnjinTokenVariant';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the token variant.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The token id the token variant belongs to.', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Object, { description: 'The hosted metadata of the variant.', nullable: true })
  variantMetadata!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Bitmasked flags.', nullable: true })
  flags!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  usageCount!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => [EnjinTokenVariant], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinTokenVariant>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};

@TypeGraphQL.ObjectType({ description: 'A transaction request.' })
export class EnjinTransaction {
  __typename?: 'EnjinTransaction';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the transaction.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The transaction hash returned by the Ethereum network after executing the request.', nullable: true })
  transaction_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The transaction hash returned by the Ethereum network after executing the request.', nullable: true })
  transactionId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The error message returned from the blockchain if the broadcast was unsuccessful.', nullable: true })
  error!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The app this transaction belongs to.', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app_id this transaction belongs to.', nullable: true })
  app_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The app_id this transaction belongs to.', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The identity_id linked to this transaction.', nullable: true })
  identity_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The identity_id linked to this transaction.', nullable: true })
  identityId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TransactionType, { description: 'The request type.', nullable: true })
  type!: Maybe<TransactionType>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The recipient\'s identity id.', nullable: true })
  recipient_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The recipient\'s identity id.', nullable: true })
  recipientId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The recipient\'s Ethereum address.', nullable: true })
  recipient_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The recipient\'s Ethereum address.', nullable: true })
  recipientAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The item id for the request.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The item id for the request.', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The title for this request.', nullable: true })
  title!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The icon URL for this request.', nullable: true })
  icon!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The user_id this transaction belongs to.', nullable: true })
  user_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The user_id this transaction belongs to.', nullable: true })
  userId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The value of the request.', nullable: true })
  value!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The encoded data, ready for signing.', nullable: true })
  encoded_data!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The encoded data, ready for signing.', nullable: true })
  encodedData!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signed_transaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signedTransaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signed_backup_transaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signedBackupTransaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signed_cancel_transaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  signedCancelTransaction!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  nonce!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  retry_state!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The signed transaction string.', nullable: true })
  retryState!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TransactionState, { description: 'The request state.', nullable: true })
  state!: Maybe<TransactionState>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Whether the request has been accepted.', nullable: true })
  accepted!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Whether the wallet is an app wallet.', nullable: true })
  app_wallet!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Whether the wallet is an app wallet.', nullable: true })
  appWallet!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => EnjinIdentity, { description: 'The identity for this transaction.', nullable: true })
  identity!: Maybe<EnjinIdentity>;

  @TypeGraphQL.Field(type => EnjinIdentity, { description: 'The identity of the recipient of this transaction', nullable: true })
  recipient!: Maybe<EnjinIdentity>;

  @TypeGraphQL.Field(type => EnjinToken, { description: 'The item for the request.', nullable: true })
  token!: Maybe<EnjinToken>;

  @TypeGraphQL.Field(type => Object, { description: 'The transaction receipt.', nullable: true })
  receipt!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinTokenEvent], { description: 'The events for this transaction.', nullable: 'itemsAndList' })
  events!: Maybe<Array<Maybe<EnjinTokenEvent>>>;

  @TypeGraphQL.Field(type => EnjinUser, { description: 'The signer of this transaction.', nullable: true })
  user!: Maybe<EnjinUser>;

  @TypeGraphQL.Field(type => EnjinWallet, { description: 'The wallet for this transaction.', nullable: true })
  wallet!: Maybe<EnjinWallet>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinTransaction], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinTransaction>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** A transaction request. */
@TypeGraphQL.ArgsType()
export class EnjinTransactioneventsArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TokenEventType, { nullable: true })
  event!: Maybe<TokenEventType>;
};

@TypeGraphQL.ObjectType({ description: 'A user account.' })
export class EnjinUser {
  __typename?: 'EnjinUser';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The id of the user.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The user\'s name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [Object], { description: 'The access tokens for this user.', nullable: 'itemsAndList' })
  access_tokens!: Maybe<Array<Maybe<Scalars['Object']>>>;

  @TypeGraphQL.Field(type => [Object], { description: 'The access tokens for this user.', nullable: 'itemsAndList' })
  accessTokens!: Maybe<Array<Maybe<Scalars['Object']>>>;

  @TypeGraphQL.Field(type => Boolean, { description: 'True when this user is a player.', nullable: true })
  isPlayer!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => EnjinApp, { description: 'The specified app this user belongs to (if any).', nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => [EnjinApp], { description: 'The apps this user belongs to (if any).', nullable: 'itemsAndList' })
  apps!: Maybe<Array<Maybe<EnjinApp>>>;

  @TypeGraphQL.Field(type => [EnjinIdentity], { description: 'The list of identities linked to the user.', nullable: 'itemsAndList' })
  identities!: Maybe<Array<Maybe<EnjinIdentity>>>;

  @TypeGraphQL.Field(type => Boolean, { nullable: true })
  emailVerified!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => [EnjinRole], { description: 'The roles assigned to the user.', nullable: 'itemsAndList' })
  roles!: Maybe<Array<Maybe<EnjinRole>>>;

  @TypeGraphQL.Field(type => String, { description: 'The user\'s email address.', nullable: true })
  email!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was created.', nullable: true })
  created_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => Object, { description: 'The datetime object for when this app was last updated.', nullable: true })
  updated_at!: Maybe<Scalars['Object']>;

  @TypeGraphQL.Field(type => [EnjinUser], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinUser>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** A user account. */
@TypeGraphQL.ArgsType()
export class EnjinUserappArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};


/** A user account. */
@TypeGraphQL.ArgsType()
export class EnjinUserappsArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'Permissions of a user on the Platform.' })
export class EnjinUserPermissions {
  __typename?: 'EnjinUserPermissions';

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check User delete permission.', nullable: true })
  delete!: Maybe<PermissionResult>;

  @TypeGraphQL.Field(type => PermissionResult, { description: 'Check User update permission.', nullable: true })
  update!: Maybe<PermissionResult>;
};

@TypeGraphQL.ObjectType({ description: 'Usage stats of a user.' })
export class EnjinUserUsage {
  __typename?: 'EnjinUserUsage';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of apps of the user.', nullable: true })
  appCount!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.ObjectType({ description: 'A user\'s wallet for a game.' })
export class EnjinWallet {
  __typename?: 'EnjinWallet';

  @TypeGraphQL.Field(type => String, { description: 'The Ethereum address of this wallet.', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The wallet\'s Enjin Coin allowance given to CryptoItems.', nullable: true })
  enjAllowance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The wallet\'s Enjin Coin balance.', nullable: true })
  enjBalance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The wallet\'s Ethereum balance.', nullable: true })
  ethBalance!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => [EnjinBalance], { description: 'The balances held by this wallet.', nullable: 'itemsAndList' })
  balances!: Maybe<Array<Maybe<EnjinBalance>>>;

  @TypeGraphQL.Field(type => [EnjinToken], { description: 'The tokens created by this wallet.', nullable: 'itemsAndList' })
  tokensCreated!: Maybe<Array<Maybe<EnjinToken>>>;

  @TypeGraphQL.Field(type => [EnjinWallet], { description: 'List of items on the current page', nullable: 'itemsAndList' })
  items!: Maybe<Array<Maybe<EnjinWallet>>>;

  @TypeGraphQL.Field(type => PaginationCursor, { description: 'The pagination cursor for this query', nullable: true })
  cursor!: Maybe<PaginationCursor>;
};


/** A user's wallet for a game. */
@TypeGraphQL.ArgsType()
export class EnjinWalletbalancesArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_gt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_gte!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_lt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value_lte!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ObjectType()
export class GasPrices {
  __typename?: 'GasPrices';

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Recommended fast (expected to be mined in < 2 minutes) gas price in Gwei', nullable: true })
  fast!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Recommended fastest (expected to be mined in < 30 seconds) gas price in Gwei', nullable: true })
  fastest!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Recommended safe (expected to be mined in < 30 minutes) gas price in Gwei', nullable: true })
  safeLow!: Maybe<Scalars['Float']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Recommended average (expected to be mined in < 5 minutes) gas price in Gwei', nullable: true })
  average!: Maybe<Scalars['Float']>;
};

@TypeGraphQL.InputType({ description: 'A token.' })
export class MeltTokenInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to melt.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The hex encoded index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [String], { description: 'An array of indices of the item within an item set for non-fungible items.', nullable: 'itemsAndList' })
  token_index_array!: Maybe<Array<Maybe<Scalars['String']>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of items to melt.', nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { description: 'The number of items to melt.', nullable: 'itemsAndList' })
  value_array!: Maybe<Array<Maybe<Scalars['Int']>>>;
};

@TypeGraphQL.InputType({ description: 'the message string to sign.' })
export class MessageInput {

  @TypeGraphQL.Field(type => String, { description: 'The message to sign.', nullable: true })
  message!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'An item.' })
export class MintTokenInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The ethereum address to send the newly minted item to.', nullable: true })
  recipient_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [String], { description: 'An array of address to send the newly minted items to.', nullable: 'itemsAndList' })
  recipient_address_array!: Maybe<Array<Maybe<Scalars['String']>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The identity ID of the wallet to send the newly minted item to.', nullable: true })
  recipient_identity_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { description: 'An array of identity IDs to send the newly minted items to.', nullable: 'itemsAndList' })
  recipient_identity_id_array!: Maybe<Array<Maybe<Scalars['Int']>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number of items to mint.', nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { description: 'An array of values corresponding to the array of addresses/identities.', nullable: 'itemsAndList' })
  value_array!: Maybe<Array<Maybe<Scalars['Int']>>>;
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


@TypeGraphQL.ArgsType()
export class MutationCreateEnjinAppArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  description!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  image!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class MutationUpdateEnjinAppArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  description!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  image!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => AppOptionsInput, { description: '[object Object]', nullable: true })
  options!: Maybe<AppOptionsInput>;
};


@TypeGraphQL.ArgsType()
export class MutationDeleteEnjinAppArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class MutationCreateEnjinIdentityArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  userId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  email!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class MutationUpdateEnjinIdentityArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  linkingCode!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class MutationDeleteEnjinIdentityArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  unlink!: Maybe<Scalars['Boolean']>;
};


@TypeGraphQL.ArgsType()
export class MutationCreateEnjinRequestArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  ethAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  identityId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TransactionType, { description: '[object Object]', nullable: true })
  type!: Maybe<TransactionType>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  test!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  dummy!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => CreateTokenInput, { description: '[object Object]', nullable: true })
  create_token_data!: Maybe<CreateTokenInput>;

  @TypeGraphQL.Field(type => CreateTradeInput, { description: '[object Object]', nullable: true })
  create_trade_data!: Maybe<CreateTradeInput>;

  @TypeGraphQL.Field(type => CompleteTradeInput, { description: '[object Object]', nullable: true })
  complete_trade_data!: Maybe<CompleteTradeInput>;

  @TypeGraphQL.Field(type => MintTokenInput, { description: '[object Object]', nullable: true })
  mint_token_data!: Maybe<MintTokenInput>;

  @TypeGraphQL.Field(type => MeltTokenInput, { description: '[object Object]', nullable: true })
  melt_token_data!: Maybe<MeltTokenInput>;

  @TypeGraphQL.Field(type => SendTokenInput, { description: '[object Object]', nullable: true })
  send_token_data!: Maybe<SendTokenInput>;

  @TypeGraphQL.Field(type => SendEnjInput, { description: '[object Object]', nullable: true })
  send_enj_data!: Maybe<SendEnjInput>;

  @TypeGraphQL.Field(type => AdvancedSendTokenInput, { description: '[object Object]', nullable: true })
  advanced_send_token_data!: Maybe<AdvancedSendTokenInput>;

  @TypeGraphQL.Field(type => UpdateItemNameInput, { description: '[object Object]', nullable: true })
  update_item_name_data!: Maybe<UpdateItemNameInput>;

  @TypeGraphQL.Field(type => SetItemUriInput, { description: '[object Object]', nullable: true })
  set_item_uri_data!: Maybe<SetItemUriInput>;

  @TypeGraphQL.Field(type => SetWhitelistedInput, { description: '[object Object]', nullable: true })
  set_whitelisted_data!: Maybe<SetWhitelistedInput>;

  @TypeGraphQL.Field(type => ApproveEnjInput, { description: '[object Object]', nullable: true })
  approve_enj_data!: Maybe<ApproveEnjInput>;

  @TypeGraphQL.Field(type => ApproveItemInput, { description: '[object Object]', nullable: true })
  approve_item_data!: Maybe<ApproveItemInput>;

  @TypeGraphQL.Field(type => SetTransferableInput, { description: '[object Object]', nullable: true })
  set_transferable_data!: Maybe<SetTransferableInput>;

  @TypeGraphQL.Field(type => SetMeltFeeInput, { description: '[object Object]', nullable: true })
  set_melt_fee_data!: Maybe<SetMeltFeeInput>;

  @TypeGraphQL.Field(type => DecreaseMaxMeltFeeInput, { description: '[object Object]', nullable: true })
  decrease_max_melt_fee_data!: Maybe<DecreaseMaxMeltFeeInput>;

  @TypeGraphQL.Field(type => SetTransferFeeInput, { description: '[object Object]', nullable: true })
  set_transfer_fee_data!: Maybe<SetTransferFeeInput>;

  @TypeGraphQL.Field(type => DecreaseMaxTransferFeeInput, { description: '[object Object]', nullable: true })
  decrease_max_transfer_fee_data!: Maybe<DecreaseMaxTransferFeeInput>;

  @TypeGraphQL.Field(type => ReleaseReserveInput, { description: '[object Object]', nullable: true })
  release_reserve_data!: Maybe<ReleaseReserveInput>;

  @TypeGraphQL.Field(type => AddLogInput, { description: '[object Object]', nullable: true })
  add_log_data!: Maybe<AddLogInput>;

  @TypeGraphQL.Field(type => SetApprovalForAllInput, { description: '[object Object]', nullable: true })
  set_approval_for_all_data!: Maybe<SetApprovalForAllInput>;

  @TypeGraphQL.Field(type => MessageInput, { description: '[object Object]', nullable: true })
  message_data!: Maybe<MessageInput>;
};


@TypeGraphQL.ArgsType()
export class MutationUpdateEnjinRequestArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => RebroadcastType, { description: '[object Object]', nullable: true })
  rebroadcast!: Maybe<RebroadcastType>;

  @TypeGraphQL.Field(type => TransactionState, { description: '[object Object]', nullable: true })
  state!: Maybe<TransactionState>;

  @TypeGraphQL.Field(type => CreateTokenInput, { description: '[object Object]', nullable: true })
  create_token_data!: Maybe<CreateTokenInput>;

  @TypeGraphQL.Field(type => CreateTradeInput, { description: '[object Object]', nullable: true })
  create_trade_data!: Maybe<CreateTradeInput>;

  @TypeGraphQL.Field(type => CompleteTradeInput, { description: '[object Object]', nullable: true })
  complete_trade_data!: Maybe<CompleteTradeInput>;

  @TypeGraphQL.Field(type => MintTokenInput, { description: '[object Object]', nullable: true })
  mint_token_data!: Maybe<MintTokenInput>;

  @TypeGraphQL.Field(type => MeltTokenInput, { description: '[object Object]', nullable: true })
  melt_token_data!: Maybe<MeltTokenInput>;

  @TypeGraphQL.Field(type => SendTokenInput, { description: '[object Object]', nullable: true })
  send_token_data!: Maybe<SendTokenInput>;

  @TypeGraphQL.Field(type => SendEnjInput, { description: '[object Object]', nullable: true })
  send_enj_data!: Maybe<SendEnjInput>;

  @TypeGraphQL.Field(type => AdvancedSendTokenInput, { description: '[object Object]', nullable: true })
  advanced_send_token_data!: Maybe<AdvancedSendTokenInput>;

  @TypeGraphQL.Field(type => UpdateItemNameInput, { description: '[object Object]', nullable: true })
  update_item_name_data!: Maybe<UpdateItemNameInput>;

  @TypeGraphQL.Field(type => SetItemUriInput, { description: '[object Object]', nullable: true })
  set_item_uri_data!: Maybe<SetItemUriInput>;

  @TypeGraphQL.Field(type => SetWhitelistedInput, { description: '[object Object]', nullable: true })
  set_whitelisted_data!: Maybe<SetWhitelistedInput>;

  @TypeGraphQL.Field(type => ApproveEnjInput, { description: '[object Object]', nullable: true })
  approve_enj_data!: Maybe<ApproveEnjInput>;

  @TypeGraphQL.Field(type => ApproveItemInput, { description: '[object Object]', nullable: true })
  approve_item_data!: Maybe<ApproveItemInput>;

  @TypeGraphQL.Field(type => SetTransferableInput, { description: '[object Object]', nullable: true })
  set_transferable_data!: Maybe<SetTransferableInput>;

  @TypeGraphQL.Field(type => SetMeltFeeInput, { description: '[object Object]', nullable: true })
  set_melt_fee_data!: Maybe<SetMeltFeeInput>;

  @TypeGraphQL.Field(type => DecreaseMaxMeltFeeInput, { description: '[object Object]', nullable: true })
  decrease_max_melt_fee_data!: Maybe<DecreaseMaxMeltFeeInput>;

  @TypeGraphQL.Field(type => SetTransferFeeInput, { description: '[object Object]', nullable: true })
  set_transfer_fee_data!: Maybe<SetTransferFeeInput>;

  @TypeGraphQL.Field(type => DecreaseMaxTransferFeeInput, { description: '[object Object]', nullable: true })
  decrease_max_transfer_fee_data!: Maybe<DecreaseMaxTransferFeeInput>;

  @TypeGraphQL.Field(type => ReleaseReserveInput, { description: '[object Object]', nullable: true })
  release_reserve_data!: Maybe<ReleaseReserveInput>;

  @TypeGraphQL.Field(type => AddLogInput, { description: '[object Object]', nullable: true })
  add_log_data!: Maybe<AddLogInput>;

  @TypeGraphQL.Field(type => SetApprovalForAllInput, { description: '[object Object]', nullable: true })
  set_approval_for_all_data!: Maybe<SetApprovalForAllInput>;

  @TypeGraphQL.Field(type => MessageInput, { description: '[object Object]', nullable: true })
  message_data!: Maybe<MessageInput>;
};


@TypeGraphQL.ArgsType()
export class MutationDeleteEnjinRequestArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class MutationCreateEnjinUserArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class MutationUnlinkAppArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class MutationUnlinkIdentityArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class MutationInvalidateTokenMetadataArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]' })
  id!: Scalars['String'];
};


@TypeGraphQL.ObjectType({ description: 'The pagination cursor' })
export class PaginationCursor {
  __typename?: 'PaginationCursor';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Number of total items selected by the query', nullable: true })
  total!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Number of items returned per page', nullable: true })
  perPage!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Current page of the cursor', nullable: true })
  currentPage!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Determines if the cursor has pages', nullable: true })
  hasPages!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Number of the first item returned', nullable: true })
  from!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Number of the last item returned', nullable: true })
  to!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The last page (number of pages)', nullable: true })
  lastPage!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Determines if cursor has more pages after the current page', nullable: true })
  hasMorePages!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.InputType({ description: 'Pagination settings.' })
export class PaginationInput {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The page number to start at.', nullable: true })
  page!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The number results to return per page.', nullable: true })
  limit!: Maybe<Scalars['Int']>;
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
TypeGraphQL.registerEnumType(Permission, { name: 'Permission' });

@TypeGraphQL.ObjectType({ description: 'An check permission result.' })
export class PermissionResult {
  __typename?: 'PermissionResult';

  @TypeGraphQL.Field(type => Boolean, { description: 'If the permission is allowed.', nullable: true })
  allowed!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => String, { description: 'The returned authorized or un-authorized message.', nullable: true })
  message!: Maybe<Scalars['String']>;
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


@TypeGraphQL.ArgsType()
export class QueryAuthAppArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int)
  id!: Scalars['Int'];

  @TypeGraphQL.Field(type => String)
  secret!: Scalars['String'];
};


@TypeGraphQL.ArgsType()
export class QueryAuthPlayerArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]' })
  id!: Scalars['String'];
};


@TypeGraphQL.ArgsType()
export class QueryEnjinAppArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinAppsArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinBalancesArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  value!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => BalanceFilter, { nullable: true })
  filter!: Maybe<BalanceFilter>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { description: '[object Object]', nullable: true })
  appIds!: Maybe<Array<Scalars['Int']>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  value_gt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  value_gte!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  value_lt!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  value_lte!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinIdentitiesArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  linkingCode!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinIdentityArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinOauthArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  email!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  password!: Maybe<Scalars['String']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinSearchArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  term!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinTokenEventsArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TokenEventType, { description: '[object Object]', nullable: true })
  event!: Maybe<TokenEventType>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  blockNumber!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinTokenArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinTokensArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  creator!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => BigInt, { description: '[object Object]', nullable: true })
  totalSupply!: Maybe<BigInt>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  reserve!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TokenSupplyModel, { description: '[object Object]', nullable: true })
  supplyModel!: Maybe<TokenSupplyModel>;

  @TypeGraphQL.Field(type => BigInt, { description: '[object Object]', nullable: true })
  meltValue!: Maybe<BigInt>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  meltFeeRatio!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  nonFungible!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => TokenTransferable, { description: '[object Object]', nullable: true })
  transferable!: Maybe<TokenTransferable>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  firstBlock!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  blockHeight!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  markedForDelete!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => TokenFilter, { nullable: true })
  filter!: Maybe<TokenFilter>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;

  @TypeGraphQL.Field(type => TokenSortInput, { description: '[object Object]', nullable: true })
  sortBy!: Maybe<TokenSortInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinTransactionsArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  transactionId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  identityId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TransactionType, { description: '[object Object]', nullable: true })
  type!: Maybe<TransactionType>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  recipientId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  recipientAddress!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  senderOrRecipientId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  tokenId!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  value!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [TransactionState], { description: '[object Object]', nullable: true })
  states!: Maybe<Array<TransactionState>>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  onlyBroadcastable!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;

  @TypeGraphQL.Field(type => TransactionSortInput, { description: '[object Object]', nullable: true })
  sortBy!: Maybe<TransactionSortInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinUserArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: '[object Object]', nullable: true })
  me!: Maybe<Scalars['Boolean']>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinUsersArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: '[object Object]', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  email!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => PaginationInput, { description: '[object Object]', nullable: true })
  pagination!: Maybe<PaginationInput>;
};


@TypeGraphQL.ArgsType()
export class QueryEnjinWalletArgs {

  @TypeGraphQL.Field(type => String, { description: '[object Object]', nullable: true })
  ethAddress!: Maybe<Scalars['String']>;
};

/** The type of rebroadcast. */
export enum RebroadcastType {
  RETRY = 'RETRY',
  BACKUP = 'BACKUP',
  CANCEL = 'CANCEL'
}
TypeGraphQL.registerEnumType(RebroadcastType, { name: 'RebroadcastType' });

@TypeGraphQL.InputType({ description: 'Release the token reserve.' })
export class ReleaseReserveInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to release the reserve of.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The amount of reserve to release.', nullable: true })
  value!: Maybe<Scalars['Int']>;
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
TypeGraphQL.registerEnumType(Role, { name: 'Role' });

@TypeGraphQL.InputType({ description: 'Send ENJ.' })
export class SendEnjInput {

  @TypeGraphQL.Field(type => String, { description: 'The wallet address to send ENJ to.' })
  to!: Scalars['String'];

  @TypeGraphQL.Field(type => String, { description: 'The amount of ENJ to send in Wei (10^18 value, e.g. 1 ENJ = 1000000000000000000).' })
  value!: Scalars['String'];
};

@TypeGraphQL.InputType({ description: 'A token.' })
export class SendTokenInput {

  @TypeGraphQL.Field(type => String, { description: 'The item ID to send.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The hex encoded index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The recipient ethereum address to send to.', nullable: true })
  recipient_address!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The recipient identity ID to send to.', nullable: true })
  recipient_identity_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The amount to send.', nullable: true })
  value!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.InputType({ description: 'Allow an operator complete control on all items owned by caller.' })
export class SetApprovalForAllInput {

  @TypeGraphQL.Field(type => String, { description: 'Ethereum address of the operator', nullable: true })
  operator!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Identity ID of the operator', nullable: true })
  operator_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'true: approved, false: not approved', nullable: true })
  approved!: Maybe<Scalars['Boolean']>;
};

@TypeGraphQL.InputType({ description: 'An the item Uri.' })
export class SetItemUriInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The uri for this item.', nullable: true })
  item_uri!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'Change the melt fee.' })
export class SetMeltFeeInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The ratio of the melt value returned to the developer in the range 0-5000 to allow fractional ratios, e,g, 1 = 0.01%,  5000 = 50%, 250 = 2.5% and so on.', nullable: true })
  meltFee!: Maybe<Scalars['Int']>;
};

@TypeGraphQL.InputType({ description: 'Change the transfer fee.' })
export class SetTransferFeeInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The new transfer fee value (in Wei).', nullable: true })
  transferFee!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'Set if an item can be transferred or not.' })
export class SetTransferableInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to mint.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TokenTransferable, { nullable: true })
  transferable!: Maybe<TokenTransferable>;
};

@TypeGraphQL.InputType({ description: 'The set the item whitelist.' })
export class SetWhitelistedInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID of the whitelist.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The account to add to the item whitelist', nullable: true })
  account!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The whitelist setting for this account address.', nullable: true })
  whitelisted!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Set whether whitelist setting is on/off.', nullable: true })
  on!: Maybe<Scalars['Boolean']>;
};

/** The direction to sort by. */
export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}
TypeGraphQL.registerEnumType(SortDirection, { name: 'SortDirection' });

@TypeGraphQL.ObjectType()
export class Statistics {
  __typename?: 'Statistics';

  @TypeGraphQL.Field(type => String, { nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  type!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  interval!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  groupBy!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [Dataset], { nullable: 'itemsAndList' })
  datasets!: Maybe<Array<Maybe<Dataset>>>;

  @TypeGraphQL.Field(type => Dataset, { nullable: true })
  averages!: Maybe<Dataset>;

  @TypeGraphQL.Field(type => Dataset, { nullable: true })
  otherResults!: Maybe<Dataset>;

  @TypeGraphQL.Field(type => Dataset, { description: 'Totals (excluding otherResults if requested)', nullable: true })
  subtotals!: Maybe<Dataset>;

  @TypeGraphQL.Field(type => Dataset, { description: 'Totals (including otherResults if requested)', nullable: true })
  totals!: Maybe<Dataset>;

  @TypeGraphQL.Field(type => [Datapoint], { description: 'The datapoints (label + value pairs) for the first dataset', nullable: 'itemsAndList' })
  datapoints!: Maybe<Array<Maybe<Datapoint>>>;

  @TypeGraphQL.Field(type => [String], { description: 'Shortcut for retrieving just the datapoint labels for the first dataset', nullable: 'itemsAndList' })
  labels!: Maybe<Array<Maybe<Scalars['String']>>>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Float], { description: 'Shortcut for retrieving just the datapoint values for the first dataset', nullable: 'itemsAndList' })
  values!: Maybe<Array<Maybe<Scalars['Float']>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'Shortcut for retrieving just the sum of the datapoint values for the first dataset', nullable: true })
  total!: Maybe<Scalars['Float']>;
};


@TypeGraphQL.ArgsType()
export class StatisticslabelsArgs {

  @TypeGraphQL.Field(type => String, { nullable: true })
  format!: Maybe<Scalars['String']>;
};

@TypeGraphQL.ObjectType({ description: 'A tag.' })
export class Tag {
  __typename?: 'Tag';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The tag id.', nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'The tag name.', nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The tag slug.', nullable: true })
  slug!: Maybe<Scalars['String']>;
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
TypeGraphQL.registerEnumType(TokenEventType, { name: 'TokenEventType' });

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
TypeGraphQL.registerEnumType(TokenField, { name: 'TokenField' });

@TypeGraphQL.InputType({ description: 'Filter input for token queries.' })
export class TokenFilter {

  @TypeGraphQL.Field(type => String, { nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [String], { nullable: true })
  id_in!: Maybe<Array<Scalars['String']>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name_contains!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => [String], { nullable: true })
  name_in!: Maybe<Array<Scalars['String']>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name_starts_with!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name_ends_with!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  appId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => [TypeGraphQL.Int], { nullable: true })
  appId_in!: Maybe<Array<Scalars['Int']>>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  wallet!: Maybe<Scalars['EthAddress']>;

  @TypeGraphQL.Field(type => [String], { nullable: true })
  wallet_in!: Maybe<Array<Scalars['EthAddress']>>;

  @TypeGraphQL.Field(type => [TokenFilter], { nullable: true })
  and!: Maybe<Array<TokenFilter>>;

  @TypeGraphQL.Field(type => [TokenFilter], { nullable: true })
  or!: Maybe<Array<TokenFilter>>;
};

/** The format to render a token id in. */
export enum TokenIdFormat {
  hex64 = 'hex64',
  hex256 = 'hex256',
  uint256 = 'uint256'
}
TypeGraphQL.registerEnumType(TokenIdFormat, { name: 'TokenIdFormat' });

/** The format to render a token index in. */
export enum TokenIndexFormat {
  hex64 = 'hex64',
  uint64 = 'uint64'
}
TypeGraphQL.registerEnumType(TokenIndexFormat, { name: 'TokenIndexFormat' });

@TypeGraphQL.ObjectType({ description: 'A Token and quantity.' })
export class TokenQuantity {
  __typename?: 'TokenQuantity';

  @TypeGraphQL.Field(type => EnjinToken, { description: 'The token requested.' })
  token!: FixDecorator<EnjinToken>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The quantity of the requested token.' })
  quantity!: Scalars['Int'];
};

@TypeGraphQL.InputType({ description: 'A Token and quantity.' })
export class TokenQuantityInput {

  @TypeGraphQL.Field(type => String, { description: 'The token id requested.' })
  tokenId!: Scalars['String'];

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The quantity of the requested token.' })
  quantity!: Scalars['Int'];
};

@TypeGraphQL.InputType({ description: 'Token sort settings.' })
export class TokenSortInput {

  @TypeGraphQL.Field(type => TokenField, { description: 'The field to sort by' })
  field!: FixDecorator<TokenField>;

  @TypeGraphQL.Field(type => SortDirection, { description: 'The direction to sort by', nullable: true })
  direction!: Maybe<SortDirection>;
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
TypeGraphQL.registerEnumType(TokenSupplyModel, { name: 'TokenSupplyModel' });

@TypeGraphQL.InputType({ description: 'The transfer fee settings for an item.' })
export class TokenTransferFeeSettingsInput {

  @TypeGraphQL.Field(type => TokenTransferFeeType, { description: 'The type of transfer (None, Per Item, Per Transfer).', nullable: true })
  type!: Maybe<TokenTransferFeeType>;

  @TypeGraphQL.Field(type => String, { description: 'The item ID to use for the transfer, 0 for Enjin Coin, otherwise the item ID of the other token - as long as it doesn\'t have a transfer fee itself.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The transfer fee value (in Wei). This also gets set as the max transfer fee too.', nullable: true })
  value!: Maybe<Scalars['String']>;
};

/** The transfer fee types. */
export enum TokenTransferFeeType {
  NONE = 'NONE',
  PER_TRANSFER = 'PER_TRANSFER',
  PER_CRYPTO_ITEM = 'PER_CRYPTO_ITEM',
  RATIO_CUT = 'RATIO_CUT',
  RATIO_EXTRA = 'RATIO_EXTRA'
}
TypeGraphQL.registerEnumType(TokenTransferFeeType, { name: 'TokenTransferFeeType' });

/** The transfer modes. */
export enum TokenTransferable {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  BOUND = 'BOUND'
}
TypeGraphQL.registerEnumType(TokenTransferable, { name: 'TokenTransferable' });

@TypeGraphQL.InputType({ description: 'Represents a token and a value.' })
export class TokenValueInput {

  @TypeGraphQL.Field(type => String, { description: 'The token ID', nullable: true })
  id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'The index of the item within a set of non-fungible items.', nullable: true })
  index!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Float, { description: 'The number of tokens.', nullable: true })
  value!: Maybe<Scalars['Float']>;
};

/** The mode that determines token variant behavior. */
export enum TokenVariantMode {
  NONE = 'NONE',
  BEAM = 'BEAM',
  ONCE = 'ONCE',
  ALWAYS = 'ALWAYS'
}
TypeGraphQL.registerEnumType(TokenVariantMode, { name: 'TokenVariantMode' });

@TypeGraphQL.ObjectType({ description: 'Token ownership verification.' })
export class TokenVerification {
  __typename?: 'TokenVerification';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  uuid!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  code!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  data!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Boolean, { nullable: true })
  claimed!: Maybe<Scalars['Boolean']>;

  @TypeGraphQL.Field(type => EnjinApp, { nullable: true })
  app!: Maybe<EnjinApp>;

  @TypeGraphQL.Field(type => EnjinWallet, { nullable: true })
  wallet!: Maybe<EnjinWallet>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;
};

@TypeGraphQL.ObjectType({ description: 'Data for token ownership verification.' })
export class TokenVerificationData {
  __typename?: 'TokenVerificationData';

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  type!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  uuid!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  name!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  description!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  limit!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => Date)
  validFrom!: Scalars['DateTime'];

  @TypeGraphQL.Field(type => Date)
  validTo!: Scalars['DateTime'];

  @TypeGraphQL.Field(type => [TokenQuantity], { nullable: 'itemsAndList' })
  tokens!: Maybe<Array<Maybe<TokenQuantity>>>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  platformId!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  platformImage!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { nullable: true })
  claimedVerificationsCount!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  status!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was created.', nullable: true })
  createdAt!: Maybe<Scalars['DateTime']>;

  @TypeGraphQL.Field(type => Date, { description: 'The ISO 8601 datetime when this resource was last updated.', nullable: true })
  updatedAt!: Maybe<Scalars['DateTime']>;
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
TypeGraphQL.registerEnumType(TransactionField, { name: 'TransactionField' });

/** Filter transactions by read status */
export enum TransactionReadStatus {
  READ = 'READ',
  UNREAD = 'UNREAD'
}
TypeGraphQL.registerEnumType(TransactionReadStatus, { name: 'TransactionReadStatus' });

@TypeGraphQL.InputType({ description: 'Transaction sort settings.' })
export class TransactionSortInput {

  @TypeGraphQL.Field(type => TransactionField, { description: 'The field to sort by' })
  field!: FixDecorator<TransactionField>;

  @TypeGraphQL.Field(type => SortDirection, { description: 'The direction to sort by', nullable: true })
  direction!: Maybe<SortDirection>;

  @TypeGraphQL.Field(type => Boolean, { description: 'Deprecated: Use direction instead', nullable: true })
  desc!: Maybe<Scalars['Boolean']>;
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
TypeGraphQL.registerEnumType(TransactionState, { name: 'TransactionState' });

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
TypeGraphQL.registerEnumType(TransactionType, { name: 'TransactionType' });

@TypeGraphQL.InputType({ description: 'Transfer input data, represents transfer of a single token type with a single to/from pair.' })
export class TransferInput {

  @TypeGraphQL.Field(type => String, { description: 'Source of the funds', nullable: true })
  from!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Source of the funds', nullable: true })
  from_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'Destination of the funds', nullable: true })
  to!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => TypeGraphQL.Int, { description: 'Destination of the funds', nullable: true })
  to_id!: Maybe<Scalars['Int']>;

  @TypeGraphQL.Field(type => String, { description: 'Token to send', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'Index of token to send (for NFTs)', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'Amount to send', nullable: true })
  value!: Maybe<Scalars['String']>;
};

@TypeGraphQL.InputType({ description: 'Update the item name.' })
export class UpdateItemNameInput {

  @TypeGraphQL.Field(type => String, { description: 'The token (item) ID to modify.', nullable: true })
  token_id!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The index of the item within an item set for non-fungible items.', nullable: true })
  token_index!: Maybe<Scalars['String']>;

  @TypeGraphQL.Field(type => String, { description: 'The new name for this item.', nullable: true })
  name!: Maybe<Scalars['String']>;
};

