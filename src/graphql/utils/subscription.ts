
import { GraphQLResolveInfo } from 'graphql';

import { pubSub, Trigger } from '../../app/helpers/pub-sub';

const STOP_SYMBOL = Symbol('stop');

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
  async function* generate(
    ctx: Context<TSource, TArgs, TContext>,
    stopped: Promise<never>,
  ) {
    const restrictKey = restrict?.(ctx);
    const restrictions = new Set();

    if (init) {
      for await (const payloads of { [Symbol.asyncIterator]: () => init(ctx) }) {
        if (restrictKey) payloads.forEach((payload) => restrictions.add(payload[restrictKey]));

        yield payloads;
      }
    }

    const iterator = pubSub.asyncIterator<TPayload>(trigger);

    try {
      for await (const payload of { [Symbol.asyncIterator]: () => ({ ...iterator, next: () => Promise.race([stopped, iterator.next()]) }) }) {
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
    } catch (reason) {
      if (reason !== STOP_SYMBOL) throw reason;
    } finally {
      if (iterator.return) await iterator.return();
    }
  }

  return (source: any, args: TArgs, context: TContext, info: GraphQLResolveInfo) => {
    let stop: ((reason?: any) => void) | undefined;
    const stopped = new Promise<never>((_, reject) => stop = reject);

    const iterator = generate({ source, args, context, info }, stopped);
    const iteratorReturn = iterator.return.bind(iterator);

    iterator.return = () => {
      if (stop) stop(STOP_SYMBOL);

      return iteratorReturn();
    };

    return iterator;
  };
}
