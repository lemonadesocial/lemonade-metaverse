import { ethers } from 'ethers';

import type { Network } from '../network';

import IERC721Metadata from '../../../assets/abis/IERC721Metadata.json';

const contractInterface = new ethers.utils.Interface(IERC721Metadata);

export async function tokenURI(network: Network, address: string, tokenId: string): Promise<string> {
  const contract = new ethers.Contract(address, contractInterface, network.provider());

  return await contract.callStatic.tokenURI(tokenId);
}
