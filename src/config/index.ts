const parseBoolean = (value?: string) => {
  return value === 'true' || value === '1';
};

export const appKey = process.env.APP_KEY || 'dummy';
export const apolloDebug = parseBoolean(process.env.APOLLO_DEBUG);
export const apolloIntropection = parseBoolean(process.env.APOLLO_INTROSPECTION);
export const cryptoKey = process.env.CRYPTO_KEY || 'HDt1l4xEM3IkcpYBwh6lGSeuGX8KoaPg';
export const databaseDebug = parseBoolean(process.env.DATABASE_DEBUG);
export const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost';
export const enjinAppId = parseInt(process.env.ENJIN_APP_ID || '0');
export const enjinAppSecret = process.env.ENJIN_APP_SECRET || 'dummy';
export const environment = process.env.NODE_ENV || 'development';
export const jwtKey = process.env.JWT_KEY || 'dummy';
export const port = parseInt(process.env.PORT || '4000');
export const redisUrl = process.env.REDIS_URL;
export const sourceVersion = process.env.SOURCE_VERSION || 'unknown';

export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
