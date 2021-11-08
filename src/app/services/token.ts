import { EventEmitter } from 'events';

import { excludeNull, ExcludeNull } from '../utils/object';
import { getOrSet } from '../helpers/redis';
import { pubSub } from '../helpers/pub-sub';
import * as enrich from './enrich/queue';
import * as indexer from '../helpers/indexer';

import { Token, TokenModel } from '../models/token';

import { GetTokenQuery, GetTokenQueryVariables, GetTokensQuery, GetTokensQueryVariables } from '../../lib/lemonade-marketplace/types.generated';
import { GetToken, GetTokens } from '../../lib/lemonade-marketplace/documents.generated';

const TIMEOUT = 10000;

const emitter = new EventEmitter();

pubSub.subscribe<Token>('token_updated', function onMessage(token) {
  emitter.emit('token_updated', token);
});

async function waitForEnrich(tokens: Token[]) {
  const map = new Map(tokens.map((token) => [token.id, token]));
  let listener: ((...args: any[]) => void) | undefined;
  let timeout: NodeJS.Timeout | undefined;

  try {
    await Promise.race([
      new Promise<void>((approve) => (async () => {
        listener = (token: Token) => {
          const value = map.get(token.id);

          if (value) {
            Object.assign(value, token);

            if (map.delete(token.id) && !map.size) {
              approve();
            }
          }
        };

        emitter.on('token_updated', listener);

        await enrich.enqueue(...tokens.map((token) => ({
          token,
        })));
      })()),
      new Promise<void>((approve) => timeout = setTimeout(approve, TIMEOUT)),
    ]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (listener) {
      emitter.removeListener('token_updated', listener);
    }
  }
}

type FetchToken<T> = Pick<Token, keyof Token & keyof T | 'metadata'>;

async function fetch<T extends { id: string }>(
  items: T[],
): Promise<FetchToken<T>[]> {
  const docs = await TokenModel.find(
    { id: { $in: items.map(({ id }) => id) }, metadata: { $exists: true } },
    { id: 1, metadata: 1 },
  ).lean();
  const map = Object.fromEntries(docs.map((doc) => [doc.id as string, doc]));

  const tokens: FetchToken<T>[] = [];
  const missing: Token[] = [];

  for (const item of items) {
    const doc = map[item.id];
    const token = { ...excludeNull(item), ...doc };

    tokens.push(token);
    if (!doc) missing.push(token);
  }

  if (missing.length) {
    await waitForEnrich(missing);
  }

  return tokens;
}

export async function getTokens(variables: GetTokensQueryVariables): Promise<Token[]> {
  const { data: { tokens } } = await indexer.client.query<GetTokensQuery, GetTokensQueryVariables>({
    query: GetTokens,
    variables,
  });

  if (!tokens.length) return [];

  return await fetch(tokens);
}

export async function getToken(
  id: string,
  shouldResolveExternally?: boolean,
): Promise<ExcludeNull<GetTokenQuery['token']> & Token | undefined> {
  let external: ExcludeNull<GetTokenQuery['token']> | null = null;
  let internal: Token | null = null;

  const externalResolver = () =>
    getOrSet(id, async function fn() {
      const { data: { token } } = await indexer.client.query<GetTokenQuery, GetTokenQueryVariables>({
        query: GetToken,
        variables: { id },
      });

      if (token) return excludeNull(token);
    });
  const internalResolver = () =>
    TokenModel.findOne({ id }).lean();

  if (shouldResolveExternally) {
    [external, internal] = await Promise.all([
      externalResolver(),
      internalResolver(),
    ]);
  } else {
    internal = await internalResolver();

    if (!internal) external = await externalResolver();
  }

  if (!external && !internal) return;

  const token = { ...external, ...internal } as ExcludeNull<GetTokenQuery['token']> & Token;

  if (!internal?.metadata) {
    await waitForEnrich([token]);
  }

  return token;
}
