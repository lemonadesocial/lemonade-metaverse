import { ethers } from 'ethers';

import type { Network } from '../network';

import RaribleRoyaltiesV2 from '../../../assets/abis/RaribleRoyaltiesV2.json';

const contractInterface = new ethers.utils.Interface(RaribleRoyaltiesV2);

export async function getRaribleV2Royalties(network: Network, address: string, tokenId: string): Promise<[string, ethers.BigNumber][]> {
  const contract = new ethers.Contract(address, contractInterface, network.provider());

  return await contract.callStatic.getRaribleV2Royalties(tokenId);
}
