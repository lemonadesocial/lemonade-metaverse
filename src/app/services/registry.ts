import { erc165Contract, ERC2981_INTERFACE_ID, ERC721Metadata_INTERFACE_ID, ERC721_INTERFACE_ID, RaribleRoyaltiesV2_INTERFACE_ID } from '../helpers/web3';
import { ethers } from 'ethers';
import LRU from 'lru-cache';

import { Network } from './network';

import { Registry, RegistryModel } from '../models/registry';

const lru = new LRU<string, Registry>({ max: 1000 });

async function supportsInterface(contract: ethers.Contract, interfaceId: string) {
  try {
    return await contract.supportsInterface(interfaceId) as boolean;
  } catch (err) {
    return null;
  }
}

export async function fetchRegistry(network: Network, address: string): Promise<Registry> {
  const query = { network: network.name, id: address };
  const key = query.network + query.id;

  let registry = lru.get(key) || await RegistryModel.findOne(query).lean<Registry | null>();

  if (!registry) {
    const contract = erc165Contract.connect(network.provider()).attach(address);

    const [{ isERC721, supportsERC721Metadata }, supportsERC2981, supportsRaribleRoyaltiesV2] = await Promise.all([
      (async () => {
        const supportsERC721Metadata = await supportsInterface(contract, ERC721Metadata_INTERFACE_ID);
        const supportsERC165 = supportsERC721Metadata !== null;

        return {
          isERC721: supportsERC721Metadata || (supportsERC165 && await supportsInterface(contract, ERC721_INTERFACE_ID)),
          supportsERC721Metadata,
        };
      })(),
      supportsInterface(contract, ERC2981_INTERFACE_ID),
      supportsInterface(contract, RaribleRoyaltiesV2_INTERFACE_ID),
    ]);

    registry = new Registry();
    registry.id = address;
    registry.isERC721 = isERC721 || false;

    registry.supportsERC721Metadata = supportsERC721Metadata || false;
    registry.supportsERC2981 = supportsERC2981 || false;
    registry.supportsRaribleRoyaltiesV2 = supportsRaribleRoyaltiesV2 || false;

    lru.set(key, registry);
    await RegistryModel.updateOne(query, registry, { upsert: true });
  }

  return registry;
}
