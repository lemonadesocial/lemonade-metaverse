import { GraphQLClient } from 'graphql-request'
import { Headers } from 'graphql-request/dist/types.dom';
import * as assert from 'assert';

import { encrypt, decrypt } from './crypto';
import { redis } from './redis';

import { enjinAppId, enjinAppSecret, isProduction } from '../../config';

import { getSdk, Sdk } from '../../lib/enjin/sdk.generated';

const APP_ACCESS_TOKEN_KEY = 'enjin:app_access_token';
const APP_ACCESS_TOKEN_EX_OFFSET = 10;

const client = new GraphQLClient(isProduction
  ? 'https://cloud.enjin.io/graphql'
  : 'https://kovan.cloud.enjin.io/graphql');

const sdk = getSdk(client);

export const getAppAccessToken = async () => {
  const value = await redis.get(APP_ACCESS_TOKEN_KEY);

  if (value) return decrypt(value);

  const { AuthApp } = await sdk.AuthApp({
    appId: enjinAppId,
    appSecret: enjinAppSecret,
  });

  assert.ok(AuthApp);
  assert.ok(AuthApp.accessToken);
  assert.ok(AuthApp.expiresIn);

  await redis.set(APP_ACCESS_TOKEN_KEY, encrypt(AuthApp.accessToken), 'EX', AuthApp.expiresIn - APP_ACCESS_TOKEN_EX_OFFSET);

  return AuthApp.accessToken;
};

export const request = async <K extends keyof Sdk, T = ReturnType<Sdk[K]> extends Promise<infer P> ? P : never>(
  operation: K,
  ...[variables, requestHeaders]: Parameters<Sdk[K]>
): Promise<T> => {
  const action = sdk[operation] as (_1: typeof variables, _2: typeof requestHeaders) => Promise<T>;

  return await action.call(sdk, variables, { authorization: `Bearer ${await getAppAccessToken()}`, ...requestHeaders });
}
