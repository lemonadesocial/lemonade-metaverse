import * as ethers from 'ethers';

import IERC165 from '../../assets/abis/IERC165.json';
import IERC2981 from '../../assets/abis/IERC2981.json';
import IERC721Metadata from '../../assets/abis/IERC721Metadata.json';
import RaribleRoyaltiesV2 from '../../assets/abis/RaribleRoyaltiesV2.json';

export const ERC721_INTERFACE_ID = '0x80ac58cd';
export const ERC721Metadata_INTERFACE_ID = '0x5b5e139f';
export const ERC2981_INTERFACE_ID = '0x2a55205a';
export const RaribleRoyaltiesV2_INTERFACE_ID = '0xcad96cca';

export const erc165Contract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC165),
);

export const erc721MetadataContract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC721Metadata),
);

export const erc2981Contract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC2981),
);

export const raribleRoyaltiesV2 = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(RaribleRoyaltiesV2),
);
