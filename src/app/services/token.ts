import { EventEmitter } from 'events';

import { pubSub, Trigger } from '../helpers/pub-sub';

import { Network } from './network';
import { Order } from '../models/order';
import { Registry } from '../models/registry';
import { Token, TokenModel } from '../models/token';

import { enqueue } from './enrich/queue';
import { excludeNull } from '../utils/object';
import { getDate } from '../utils/date';
import { getOrSet } from '../helpers/redis';

import { GetToken, GetTokens } from '../../lib/lemonade-marketplace/documents.generated';
import { GetTokenQuery, GetTokenQueryVariables, GetTokensQuery, GetTokensQueryVariables, Token as GeneratedToken } from '../../lib/lemonade-marketplace/types.generated';

const ENRICH_TIMEOUT = 10000;

const emitter = new EventEmitter();

pubSub.subscribe<Token>(
  Trigger.TokenUpdated,
  (token) => emitter.emit('message', Trigger.TokenUpdated, token)
);

pubSub.subscribe<Token>(
  Trigger.EnrichFailed,
  (token) => emitter.emit('message', Trigger.EnrichFailed, token)
);

type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K }[keyof T];
type GraphQLToken = Pick<GeneratedToken, RequiredKeys<Omit<Token, 'network'>>> & Partial<Pick<GeneratedToken, 'createdAt'>>;

export function createToken<T extends GraphQLToken>(network: Network, token: T) {
  return {
    network: network.name,
    ...excludeNull(token),
    createdAt: token.createdAt ? getDate(token.createdAt) : undefined,
  };
}

function shouldEnrich(token: Token & { registry: Registry }) {
  if (!token.enrichCount) return true;
  if (!token.metadata && token.registry.supportsERC721Metadata && token.enrichCount < 3) return true;

  return false;
}

async function waitForEnrich(tokens: Token[]) {
  const map = new Map(tokens.map((token) => [token.id, token]));
  let listener: ((...args: any[]) => void) | undefined;
  let timeout: NodeJS.Timeout | undefined;

  try {
    await Promise.race([
      new Promise<void>((approve) => (async () => {
        listener = (trigger: Trigger, token: Token) => {
          const value = map.get(token.id);

          if (value) {
            if (trigger === Trigger.TokenUpdated) {
              Object.assign(value, token);
            }

            if (map.delete(token.id) && !map.size) {
              approve();
            }
          }
        };

        emitter.on('message', listener);

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
      emitter.removeListener('message', listener);
    }
  }
}

async function fetch<T extends GraphQLToken>(network: Network, items: T[]) {
  const docs = await TokenModel.aggregate<Pick<Token, 'id' | 'enrichedAt' | 'uri' | 'royalties' | 'metadata'> & { registry: Registry; order: Omit<Order, 'token'> & { token: string } }>([
    { $match: { network: network.name, id: { $in: items.map(({ id }) => id) } } },
    {
      $lookup: {
        from: 'registries',
        let: { contract: '$contract' },
        pipeline: [
          { $match: { network: network.name, $expr: { $eq: ['$id', '$$contract'] } } },
          { $limit: 1 },
        ],
        as: 'registry',
      },
    },
    { $unwind: '$registry' },
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
    { $project: { id: 1, enrichCount: 1, enrichedAt: 1, uri: 1, royalties: 1, metadata: 1, registry: 1, order: 1 } },
  ]);
  const map = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

  const tokens = [];
  const missing = [];

  for (const item of items) {
    const doc = map[item.id];
    const token = { ...createToken(network, item), ...doc };

    tokens.push(token);
    if (shouldEnrich(token)) missing.push(token);
  }

  if (missing.length) {
    await waitForEnrich(missing);
  }

  return tokens;
}

export async function getTokens(network: Network, variables: GetTokensQueryVariables) {
  const { tokens } = await network.indexer().request<GetTokensQuery, GetTokensQueryVariables>(GetTokens, variables);

  if (!tokens.length) return [];

  return await fetch(network, tokens);
}

export async function getToken(network: Network, id: string) {
  const [external, internal] = await Promise.all([
    getOrSet(network + id, async function fn() {
      const { token } = await network.indexer().request<GetTokenQuery, GetTokenQueryVariables>(GetToken, { id });

      if (token) return createToken(network, token);
    }),
    (async () => {
      const tokens = await TokenModel.aggregate<Omit<Token, 'order'> & { registry: Registry; order: Omit<Order, 'token'> & { token: string } }>([
        { $match: { network: network.name, id } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'registries',
            let: { contract: '$contract' },
            pipeline: [
              { $match: { network: network.name, $expr: { $eq: ['$id', '$$contract'] } } },
              { $limit: 1 },
            ],
            as: 'registry',
          },
        },
        { $unwind: '$registry' },
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

  if (shouldEnrich(token)) {
    await waitForEnrich([token]);
  }

  return token;
}
