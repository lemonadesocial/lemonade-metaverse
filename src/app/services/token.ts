import { EventEmitter } from 'events';

import { enqueue } from './enrich/queue';
import { excludeNull } from '../utils/object';
import { getDate } from '../utils/date';
import { getOrSet } from '../helpers/redis';
import { Network } from './network';
import { pubSub, Trigger } from '../helpers/pub-sub';

import { Token, TokenModel } from '../models/token';

import { GetToken, GetTokens } from '../../lib/lemonade-marketplace/documents.generated';
import { GetTokenQuery, GetTokenQueryVariables, GetTokensQuery, GetTokensQueryVariables, Token as GeneratedToken } from '../../lib/lemonade-marketplace/types.generated';

const ENRICH_TIMEOUT = 10000;

const emitter = new EventEmitter();

function onMessage(token: Token) {
  emitter.emit('token', token);
}

pubSub.subscribe<Token>(Trigger.EnrichFailed, onMessage);
pubSub.subscribe<Token>(Trigger.TokenUpdated, onMessage);

type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K }[keyof T];
type GraphQLToken = Pick<GeneratedToken, RequiredKeys<Omit<Token, 'network'>>> & Partial<Pick<GeneratedToken, 'createdAt'>>;

export function createToken<T extends GraphQLToken>(network: Network, token: T) {
  return {
    network: network.name,
    ...excludeNull(token),
    createdAt: token.createdAt ? getDate(token.createdAt) : undefined,
  };
}

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

        emitter.on('token', listener);

        await enqueue(...tokens.map((token) => ({
          token,
        })));
      })()),
      new Promise<void>((approve) =>
        timeout = setTimeout(approve, ENRICH_TIMEOUT)
      ),
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

async function fetch<T extends GraphQLToken>(network: Network, items: T[]) {
  const docs = await TokenModel.find(
    { network: network.name, id: { $in: items.map(({ id }) => id) } },
    { id: 1, enrichedAt: 1, uri: 1, royalties: 1, metadata: 1 },
  ).lean<Pick<Token, 'network' | 'id' | 'enrichedAt' | 'uri' | 'royalties' | 'metadata'>[]>();
  const map = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

  const tokens = [];
  const missing = [];

  for (const item of items) {
    const doc = map[item.id];
    const token = createToken(network, { ...item, ...doc });

    tokens.push(token);
    if (!doc) missing.push(token);
  }

  if (missing.length) {
    await waitForEnrich(missing);
  }

  return tokens;
}

export async function getTokens(network: Network, variables: GetTokensQueryVariables) {
  const { data: { tokens } } = await network.indexer().query<GetTokensQuery, GetTokensQueryVariables>({
    query: GetTokens,
    variables,
  });

  if (!tokens.length) return [];

  return await fetch(network, tokens);
}

export async function getToken(network: Network, id: string, shouldResolveExternally?: boolean) {
  const externalResolver = () =>
    getOrSet(id, async function fn() {
      const { data: { token } } = await network.indexer().query<GetTokenQuery, GetTokenQueryVariables>({
        query: GetToken,
        variables: { id },
      });

      if (token) return createToken(network, token);
    });
  const internalResolver = () =>
    TokenModel.findOne({ network: network.name, id }).lean<Token>();

  let external;
  let internal;

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

  const token = { ...external, ...internal };

  if (!internal?.metadata) {
    await waitForEnrich([token]);
  }

  return token;
}
