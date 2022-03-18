import { ethers } from 'ethers';
import Web3ProviderWS from 'web3-providers-ws'

import { Network } from '../models/network';

export interface Provider extends ethers.providers.BaseProvider {
  close?: () => void;
}
export const providers: Record<string, Provider> = {};

export function getProvider(network: Network): Provider {
  let provider: Provider;

  if (network.rpcUrl.match(/^ws?s:\/\//)) {
    const web3ProviderWS = new Web3ProviderWS(network.rpcUrl, {
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 30000,
      },
      reconnect: {
        auto: true,
        delay: 100,
      },
      timeout: 1000,
    });

    provider = new ethers.providers.Web3Provider(web3ProviderWS as any);
    provider.close = () => { web3ProviderWS.disconnect(1000, 'close'); };
  } else {
    provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
  }

  return provider;
}
