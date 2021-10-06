import * as env from 'env-var';

export const apolloDebug = env.get('APOLLO_DEBUG').asBool();
export const apolloIntrospection = env.get('APOLLO_INTROSPECTION').asBool();
export const appPort = env.get('APP_PORT').default(4000).asIntPositive();
export const databaseDebug = env.get('DATABASE_DEBUG').asBool();
export const databaseUrl = env.get('DATABASE_URL').default('mongodb://localhost').asUrlString();
export const environment = env.get('NODE_ENV').default('development').asString();
export const indexerUrl = env.get('INDEXER_URL').default('https://api.thegraph.com/subgraphs/name/lemonadesocial/lemonade-marketplace').asUrlString();
export const ipfsGatewayUrl = env.get('IPFS_GATEWAY_URL').default('https://cf-ipfs.com/').asUrlString();
export const metricsPort = env.get('METRICS_PORT').default(9100).asIntPositive();
export const metricsSecret = env.get('METRICS_SECRET').asString();
export const redisUrl = env.get('REDIS_URL').asUrlString();
export const slackWebhookUrl = env.get('SLACK_WEBHOOK_URL').asUrlString();
export const sourceVersion = env.get('SOURCE_VERSION').asString();
export const web3Uri = env.get('WEB3_URI').default('dummy').asString();

export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
