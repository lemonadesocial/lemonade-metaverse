import { ethers } from 'ethers';
import { URL } from 'url';

import { Network } from '../models/network';

export interface Provider extends ethers.providers.BaseProvider {
  destroy?: () => Promise<void>;
}

export const providers: Record<string, Provider> = {};

export function getProvider({ rpcUrl }: Network): Provider {
  const url = new URL(rpcUrl);

  switch (url.protocol) {
    case 'alchemy:':
      return new ethers.providers.AlchemyProvider(url.hostname, url.pathname.substring(1));
    case 'ws:':
    case 'wss:':
      return new ethers.providers.WebSocketProvider(rpcUrl);
    default:
      return new ethers.providers.JsonRpcProvider(rpcUrl);
  }
}
