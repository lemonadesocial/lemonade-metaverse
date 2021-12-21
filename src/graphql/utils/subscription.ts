
import { GraphQLResolveInfo } from 'graphql';

import { pubSub, Trigger } from '../../app/helpers/pub-sub';

interface SubscribeContext<TState, TSource, TArgs, TContext> {
  state: TState;
  source: TSource,
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
}

interface SubscribeOptions<TResult, TPayload, TState, TSource, TArgs, TContext> {
  init?: (params: SubscribeContext<TState, TSource, TArgs, TContext>) => AsyncIterator<TResult>;
  filter?: (payload: TPayload, params: SubscribeContext<TState, TSource, TArgs, TContext>) => boolean;
  map?: (payload: TPayload, params: SubscribeContext<TState, TSource, TArgs, TContext>) => TResult;
}

export const subscribe = <TResult, TPayload, TState = any, TSource = any, TArgs = any, TContext = any>(
  topics: Trigger | Trigger[],
  { init, filter, map }: SubscribeOptions<TResult, TPayload, TState, TSource, TArgs, TContext>,
): (source: any, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> => {
  return async function* (source, args, context, info) {
    const state = {} as TState;
    const ctx = { state, source, args, context, info };

    if (init) {
      for await (const result of { [Symbol.asyncIterator]: () => init(ctx) }) {
        yield result;
      }
    }

    for await (const payload of { [Symbol.asyncIterator]: () => pubSub.asyncIterator<TPayload>(topics) }) {
      if (filter && !filter(payload, ctx)) continue;

      yield map?.(payload, ctx) || payload as unknown as TResult;
    }
  };
};
