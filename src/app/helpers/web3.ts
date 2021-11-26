import * as ethers from 'ethers';

import * as IERC721Metadata from '../../assets/contracts/IERC721Metadata.json';
import * as IERC721Royalty from '../../assets/contracts/IERC721Royalty.json';

import { rpcUrl } from '../../config';

export const provider = new ethers.providers.WebSocketProvider(rpcUrl);

export const erc721MetadataContract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC721Metadata.abi),
  provider
);

export const erc721RoyaltyContract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC721Royalty.abi),
  provider
);
