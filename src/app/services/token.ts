import { EventEmitter } from 'events';

import { enqueue } from './enrich/queue';
import { excludeNull } from '../utils/object';
import { getDate } from '../utils/date';
import { getOrSet } from '../helpers/redis';
import { Network } from './network';
import { pubSub, Trigger } from '../helpers/pub-sub';

import { Order } from '../models/order';
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
      emitter.removeListener('token', listener);
    }
  }
}

async function fetch<T extends GraphQLToken>(network: Network, items: T[]) {
  const docs = await TokenModel.aggregate<Pick<Token, 'id' | 'enrichedAt' | 'uri' | 'royalties' | 'metadata'> & { order: Omit<Order, 'token'> & { token: string } }>([
    { $match: { network: network.name, id: { $in: items.map(({ id }) => id) } } },
    {
      $lookup: {
        from: 'orders',
        let: { order: '$order' },
        pipeline: [
          { $match: { network: network.name, $expr: { $eq: ['$id', '$$order'] } } },
          { $limit: 1 },
        ],
        as: 'order',
      },
    },
    { $unwind: { path: '$order', preserveNullAndEmptyArrays: true } },
    { $project: { id: 1, enrichedAt: 1, uri: 1, royalties: 1, metadata: 1, order: 1 } },
  ]);
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

export async function getToken(network: Network, id: string) {
  const [external, internal] = await Promise.all([
    getOrSet(id, async function fn() {
      const { data: { token } } = await network.indexer().query<GetTokenQuery, GetTokenQueryVariables>({
        query: GetToken,
        variables: { id },
      });

      if (token) return createToken(network, token);
    }),
    (async () => {
      const tokens = await TokenModel.aggregate<Omit<Token, 'order'> & { order: Omit<Order, 'token'> & { token: string } }>([
        { $match: { network: network.name, id } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'orders',
            let: { order: '$order' },
            pipeline: [
              { $match: { network: network.name, $expr: { $eq: ['$id', '$$order'] } } },
              { $limit: 1 },
            ],
            as: 'order',
          },
        },
        { $unwind: { path: '$order', preserveNullAndEmptyArrays: true } },
      ]);

      return tokens[0];
    })(),
  ]);

  if (!external && !internal) return;

  const token = { ...external, ...internal };

  if (!internal?.metadata) {
    await waitForEnrich([token]);
  }

  return token;
}
