import { ethers } from 'ethers';

import type { Network } from '../network';

import IERC2981 from '../../../assets/abis/IERC2981.json';

const contractInterface = new ethers.utils.Interface(IERC2981);

export async function royaltyInfo(network: Network, address: string, tokenId: string, price: ethers.BigNumberish): Promise<[string, ethers.BigNumber]> {
  const contract = new ethers.Contract(address, contractInterface, network.provider());

  return await contract.callStatic.royaltyInfo(tokenId, price);
}
