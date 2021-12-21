
import { GraphQLResolveInfo } from 'graphql';

import { pubSub, Trigger } from '../../app/helpers/pub-sub';

interface Context<TSource, TArgs, TContext> {
  source: TSource,
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
}

interface Options<TPayload, TSource, TArgs, TContext> {
  init?: (params: Context<TSource, TArgs, TContext>) => AsyncIterator<TPayload[]>;
  restrict?: (params: Context<TSource, TArgs, TContext>) => keyof TPayload | null;
  trigger: Trigger,
  filter?: (payload: TPayload, params: Context<TSource, TArgs, TContext>) => boolean;
}

export function createSubscribe<TPayload, TSource = any, TArgs = any, TContext = any>({
  init,
  restrict,
  trigger,
  filter,
}: Options<TPayload, TSource, TArgs, TContext>): (source: any, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TPayload[]> {
  return async function* (source, args, context, info) {
    const ctx = { source, args, context, info };

    const restrictKey = restrict?.(ctx);
    const restrictions = new Set();

    if (init) {
      for await (const payloads of { [Symbol.asyncIterator]: () => init(ctx) }) {
        if (restrictKey) payloads.forEach((payload) => restrictions.add(payload[restrictKey]));

        yield payloads;
      }
    }

    for await (const payload of { [Symbol.asyncIterator]: () => pubSub.asyncIterator<TPayload>(trigger) }) {
      const hasRestrictions = restrictKey && restrictions.size > 0;

      if ((hasRestrictions && !restrictions.has(payload[restrictKey]))
        || (!hasRestrictions && filter && !filter(payload, ctx))) {
        continue;
      }

      if (restrictKey && !hasRestrictions) {
        restrictions.add(payload[restrictKey]);
      }

      yield [payload];
    }
  };
}
