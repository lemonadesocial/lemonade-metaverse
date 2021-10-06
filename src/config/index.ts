import * as env from 'env-var';

export const apolloDebug = env.get('APOLLO_DEBUG').asBool();
export const apolloIntrospection = env.get('APOLLO_INTROSPECTION').asBool();
export const appKey = env.get('APP_KEY').default('dummy').asString();
export const appPort = env.get('APP_PORT').default(4000).asIntPositive();
export const databaseDebug = env.get('DATABASE_DEBUG').asBool();
export const databaseUri = env.get('DATABASE_URI').default('mongodb://localhost').asString();
export const environment = env.get('NODE_ENV').default('development').asString();
export const indexerHttpUri = env.get('INDEXER_HTTP_URI').default('dummy').asString();
export const ipfsGatewayUri = env.get('IPFS_GATEWAY_URI').default('https://cf-ipfs.com').asString();
export const metricsPort = env.get('METRICS_PORT').default(9100).asIntPositive();
export const metricsSecret = env.get('METRICS_SECRET').asString();
export const redisUri = env.get('REDIS_URI').asString();
export const slackWebhookUrl = env.get('SLACK_WEBHOOK_URL').asString();
export const sourceVersion = env.get('SOURCE_VERSION').asString();
export const web3Uri = env.get('WEB3_URI').default('dummy').asString();

export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
