import { Contract } from 'web3-eth-contract';
import LRU from 'lru-cache';
import Web3 from 'web3';

import { redis } from './redis';

import { web3Uri } from '../../config';

export const jsonERC20 = require('../../../assets/abis/ERC20.json');
export const jsonERC721Lemonade = require('../../../assets/abis/ERC721Lemonade.json');

const LRU_MAX = 100;
const LRU_MAX_AGE = 500;

export const web3 = new Web3(
  new Web3.providers.WebsocketProvider(web3Uri, {
    reconnect: {
      auto: true,
      delay: 1000,
      onTimeout: true,
    },
  })
);

const cache = new LRU<string, unknown>({
  max: LRU_MAX,
  maxAge: LRU_MAX_AGE,
});

export const proxy = (
  contract: Contract,
  ttl?: number,
) => {
  type T = { [K: string]: <R>(...args: any[]) => Promise<R> };
  return new Proxy<T>({}, {
    get<R>(_: T, method: string) {
      return async (...args: any[]) => {
        const key = [contract.options.address, method, ...args].join(':');

        const internal = cache.get(key) as R | undefined;
        if (typeof internal !== 'undefined') {
          return internal;
        }

        if (ttl) {
          const external = await redis.get(key);
          if (external !== null) {
            const result = JSON.parse(external) as R;
            cache.set(key, result);
            return result;
          }
        }

        const result = await contract
          .methods[method]
          .call(contract, ...args)
          .call();

        cache.set(key, result);
        if (ttl) {
          await redis.set(key, JSON.stringify(result), 'EX', ttl);
        }

        return result;
      }
    },
  });
};
