import { ethers } from 'ethers';

import type { Network } from '../network';

import Introspection from '../../../assets/abis/Introspection.json';

const contractInterface = new ethers.utils.Interface(Introspection);

export async function getSupportedInterfaces(network: Network, account: string, interfaceIds: string[]): Promise<boolean[]> {
  const contract = new ethers.Contract(network.introspection, contractInterface, network.provider());

  return await contract.callStatic.getSupportedInterfaces(account, interfaceIds);
}
