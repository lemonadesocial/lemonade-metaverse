import { excludeNull } from '../utils/object';
import { pubSub } from '../helpers/pub-sub';
import * as enrich from './enrich/queue';
import * as indexer from '../helpers/indexer';

import { Token, TokenModel } from '../models/token';

import { KeysOfBoth, Unpacked } from '../types';
import { Token as TokenType, TokensOfQuery, TokensOfQueryVariables } from '../../lib/lemonade-marketplace/types.generated';
import { TokensOf } from '../../lib/lemonade-marketplace/documents.generated';

const TIMEOUT = 10000;

const waitForEnrich = async (tokens: Token[]) => {
  const map = new Map(tokens.map((token) => [token.id, token]));
  let subId: number | undefined;
  let timeout: NodeJS.Timeout | undefined;

  try {
    await Promise.race([
      new Promise<void>((approve) => (async () => {
        subId = await pubSub.subscribe<Token>('token_updated', (token) => {
          const value = map.get(token.id);

          if (value) {
            Object.assign(value, token);

            if (map.delete(token.id) && !map.size) {
              approve();
            }
          }
        });

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

    if (typeof subId !== 'undefined') {
      pubSub.unsubscribe(subId);
    }
  }
}

type FetchToken<T> = Pick<Token, KeysOfBoth<Token, T> | 'metadata'>;

const fetch = async <T extends Pick<TokenType, 'id'>>(
  items: T[],
): Promise<FetchToken<T>[]> => {
  const docs = await TokenModel.find(
    { id: { $in: items.map(({ id }) => id) } },
    { id: 1, metadata: 1 },
  ).lean();
  const map = docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc }), {} as Record<string, Unpacked<typeof docs>>);

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

export const getTokensOf = async (variables: TokensOfQueryVariables): Promise<Token[]> => {
  const { data: { tokens } } = await indexer.client.query<TokensOfQuery, TokensOfQueryVariables>({
    query: TokensOf,
    variables,
    fetchPolicy: 'no-cache',
  });

  if (!tokens.length) return [];

  return await fetch(tokens);
};
