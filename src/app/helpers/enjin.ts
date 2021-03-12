import { GraphQLClient } from 'graphql-request'
import crypto from 'crypto';

import { encrypt, decrypt } from './crypto';
import { redis } from './redis';

import { enjinAppId, enjinAppSecret, isProduction } from '../../config';

const CACHE_EX = 60;
const CACHE_HASH_ALGORITHM = 'sha256';
const CACHE_HASH_DIGEST = 'hex';
const CACHE_KEY_PREFIX = 'enjin:cache';

export const client = new GraphQLClient(isProduction
  ? 'https://cloud.enjin.io/graphql'
  : 'https://kovan.cloud.enjin.io/graphql');

export interface RequestWithCacheOptions<T> {
  expiry?: ((response: T) => number) | number;
}

export const requestWithCache = async <T = any, V = Record<string, any>>(
  query: string,
  variables?: V,
  requestHeaders?: Record<string, string>,
  { expiry = CACHE_EX }: RequestWithCacheOptions<T> = { },
) => {
  const key = `${CACHE_KEY_PREFIX}:${crypto
    .createHash(CACHE_HASH_ALGORITHM)
    .update(JSON.stringify([query, variables, requestHeaders]))
    .digest(CACHE_HASH_DIGEST)}`;
  const value = await redis.get(key);

  if (value) return JSON.parse(decrypt(value)) as T;

  const response = await client.request<T, V>(query, variables, requestHeaders);
  const time = expiry instanceof Function ? expiry(response) : expiry;

  await redis.set(key, encrypt(JSON.stringify(response)), 'EX', time);

  return response;
};

export const getAppAccessToken = async () => {
  const response = await requestWithCache<{ AuthApp: { accessToken: string; expiresIn: number } }, { appId: number; appSecret: string }>(
    `query GetAppAccessToken($appId: Int!, $appSecret: String!) {
      AuthApp(id: $appId, secret: $appSecret) {
        accessToken
        expiresIn
      }
    }`,
    { appId: enjinAppId, appSecret: enjinAppSecret },
    { },
    { expiry: (response) => response.AuthApp.expiresIn - 60 },
  );

  return response.AuthApp.accessToken;
};

export const getPlayerAccessToken = async (
  name: string,
) => {
  const response = await requestWithCache<{ AuthPlayer: { accessToken: string; expiresIn: number } }, { name: string }>(
    `query GetPlayerAccessToken($name: String!) {
      AuthPlayer(id: $name) {
        accessToken
        expiresIn
      }
    }`,
    { name },
    { authorization: `Bearer ${await getAppAccessToken()}` },
    { expiry: (response) => response.AuthPlayer.expiresIn - 60 },
  );

  return response.AuthPlayer.accessToken;
};
