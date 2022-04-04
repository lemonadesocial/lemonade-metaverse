import * as env from 'env-var';

export const apolloDebug = env.get('APOLLO_DEBUG').asBool();
export const apolloIntrospection = env.get('APOLLO_INTROSPECTION').asBool();
export const appPort = env.get('APP_PORT').default(4000).asIntPositive();
export const databaseDebug = env.get('DATABASE_DEBUG').asBool();
export const databaseUrl = env.get('DATABASE_URL').default('mongodb://localhost/metaverse').asUrlString();
export const environment = env.get('NODE_ENV').default('development').asString();
export const ipfsGatewayUrl = env.get('IPFS_GATEWAY_URL').default('https://ipfs.lemonade.social/').asUrlString();
export const metricsPort = env.get('METRICS_PORT').asIntPositive();
export const redisUrl = env.get('REDIS_URL').asUrlString();
export const slackWebhookUrl = env.get('SLACK_WEBHOOK_URL').asUrlString();
export const sourceVersion = env.get('SOURCE_VERSION').asString();

export const isProduction = environment === 'production';
export const webUrl = isProduction ? 'https://lemonade.social/' : 'https://staging.lemonade.social/';
