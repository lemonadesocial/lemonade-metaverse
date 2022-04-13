import { ethers } from 'ethers';
import { URL } from 'url';

export interface Provider extends ethers.providers.BaseProvider {
  destroy?: () => Promise<void>;
}

export function createProvider(providerUrl: string): Provider {
  const url = new URL(providerUrl);

  switch (url.protocol) {
    case 'alchemy:':
      return new ethers.providers.AlchemyProvider(url.hostname, url.pathname.substring(1));
    case 'ws:':
    case 'wss:':
      return new ethers.providers.WebSocketProvider(providerUrl);
    default:
      return new ethers.providers.JsonRpcProvider(providerUrl);
  }
}
