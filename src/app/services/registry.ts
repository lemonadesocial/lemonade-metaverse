import { ethers } from 'ethers';
import LRU from 'lru-cache';

import { Network } from './network';

import { erc165Contract, ERC2981_INTERFACE_ID, erc721MetadataContract, ERC721Metadata_INTERFACE_ID, ERC721_INTERFACE_ID, LemonadePoapV1_INTERFACE_ID, RaribleRoyaltiesV2_INTERFACE_ID } from '../helpers/web3';

import { Registry, RegistryModel } from '../models/registry';

const lru = new LRU<string, Promise<Registry>>({ max: 100 });

async function supportsInterface(contract: ethers.Contract, interfaceId: string) {
  try {
    return await contract.supportsInterface(interfaceId) as boolean;
  } catch (err) {
    return null;
  }
}

async function createUniqueCollectionRegistry(network: Network, address: string, tokenId: string) {
  const registry = new Registry();
  registry.network = network.name;
  registry.id = address;

  /**
   * All non-fungible collections declare support for the ERC721Metadata interface.
   * However, reading the token URI reverts with `No tokenURI permission`, unless the collection sets the `tokenPropertyPermission` property.
   * This property is currently not exposed. So to determine actual ERC721Metadata support, we attempt to read the token URI.
   */
  try {
    const contract = erc721MetadataContract.connect(network.provider()).attach(address);

    await contract.tokenURI(tokenId);

    // non-fungible with token property
    registry.isERC721 = true;
    registry.supportsERC721Metadata = true;
  } catch (err: any) {
    if (err.message.endsWith('revert Token properties not found')) { // burned non-fungible with token property
      registry.isERC721 = true;
      registry.supportsERC721Metadata = true;
    } else if (err.message.endsWith('revert No tokenURI permission')) { // non-fungible without token property
      registry.isERC721 = true;
    }
  }

  return registry;
}

async function createRegistry(network: Network, address: string, tokenId: string) {
  if (network.uniqueCollectionPrefix && address.startsWith(network.uniqueCollectionPrefix)) {
    return await createUniqueCollectionRegistry(network, address, tokenId);
  }

  const contract = erc165Contract.connect(network.provider()).attach(address);

  const [{ isERC721, supportsERC721Metadata }, supportsERC2981, supportsLemonadePoapV1, supportsRaribleRoyaltiesV2] = await Promise.all([
    (async () => {
      const supportsERC721Metadata = await supportsInterface(contract, ERC721Metadata_INTERFACE_ID);
      const supportsERC165 = supportsERC721Metadata !== null;

      return {
        isERC721: supportsERC721Metadata || (supportsERC165 && await supportsInterface(contract, ERC721_INTERFACE_ID)),
        supportsERC721Metadata,
      };
    })(),
    supportsInterface(contract, ERC2981_INTERFACE_ID),
    supportsInterface(contract, LemonadePoapV1_INTERFACE_ID),
    supportsInterface(contract, RaribleRoyaltiesV2_INTERFACE_ID),
  ]);

  const registry = new Registry();
  registry.network = network.name;
  registry.id = address;

  if (isERC721) registry.isERC721 = true;
  if (supportsERC721Metadata) registry.supportsERC721Metadata = true;
  if (supportsERC2981) registry.supportsERC2981 = true;
  if (supportsLemonadePoapV1) registry.supportsLemonadePoapV1 = true;
  if (supportsRaribleRoyaltiesV2) registry.supportsRaribleRoyaltiesV2 = true;

  return registry;
}

async function fetchRegistry(network: Network, address: string, tokenId: string): Promise<Registry> {
  const query = { network: network.name, id: address };

  let registry = await RegistryModel.findOne(query).lean<Registry | null>();

  if (!registry) {
    registry = await createRegistry(network, address, tokenId);

    await RegistryModel.updateOne(query, registry, { upsert: true });
  }

  return registry;
}

export async function getRegistry(network: Network, address: string, tokenId: string): Promise<Registry> {
  const key = network.name + address;

  let promise = lru.get(key);

  if (!promise) {
    promise = fetchRegistry(network, address, tokenId)
      .catch((err) => { lru.del(key); throw err; });

    lru.set(key, promise);
  }

  return await promise;
}
