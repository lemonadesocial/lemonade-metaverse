
import { pubSub } from '../../app/helpers/pub-sub';

interface SubscribeOptions<TResult, TPayload, TArgs, TContext, TInfo> {
  init?: (data: { root: any; args: TArgs; context: TContext; info: TInfo }) => AsyncIterator<TResult>;
  filter?: (data: { payload: TPayload; args: TArgs; context: TContext; info: TInfo }) => boolean;
  process?: (data: { payload: TPayload; args: TArgs; context: TContext; info: TInfo }) => TResult;
}

export const subscribe = <TResult, TPayload = TResult, TArgs = any, TContext = any, TInfo = any>(
  topics: string | string[],
  { init, filter, process }: SubscribeOptions<TResult, TPayload, TArgs, TContext, TInfo>,
): (root: any, args: TArgs, context: TContext, info: TInfo) => AsyncIterator<TResult> => {
  return async function* (root, args, context, info) {
    if (init) {
      for await (const result of { [Symbol.asyncIterator]: () => init({ root, args, context, info }) }) {
        yield result;
      }
    }

    for await (const payload of { [Symbol.asyncIterator]: () => pubSub.asyncIterator<TPayload>(topics) }) {
      const data = { payload, args, context, info };

      if (!filter?.(data)) continue;

      yield process?.(data) || payload as unknown as TResult;
    }
  };
};
