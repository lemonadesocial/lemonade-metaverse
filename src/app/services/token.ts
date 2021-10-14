import { excludeNull } from '../utils/object';
import { pubSub } from '../helpers/pub-sub';
import * as enrich from './enrich/queue';
import * as indexer from '../helpers/indexer';

import { Token, TokenModel } from '../models/token';

import { GetTokensQuery, GetTokensQueryVariables } from '../../lib/lemonade-marketplace/types.generated';
import { GetTokens } from '../../lib/lemonade-marketplace/documents.generated';

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

type FetchToken<T> = Pick<Token, keyof Token & keyof T | 'metadata'>;

const fetch = async <T extends { id: string }>(
  items: T[],
): Promise<FetchToken<T>[]> => {
  const docs = await TokenModel.find(
    { id: { $in: items.map(({ id }) => id) } },
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

export const getTokens = async (variables: GetTokensQueryVariables): Promise<Token[]> => {
  const { data: { tokens } } = await indexer.client.query<GetTokensQuery, GetTokensQueryVariables>({
    query: GetTokens,
    variables,
  });

  if (!tokens.length) return [];

  return await fetch(tokens);
};
