import LRU from 'lru-cache';

import { ERC2981_INTERFACE_ID, ERC721Metadata_INTERFACE_ID, ERC721_INTERFACE_ID, LemonadePoapV1_INTERFACE_ID, RaribleRoyaltiesV2_INTERFACE_ID } from './contract/constants';
import { getSupportedInterfaces } from './contract/introspection';
import { tokenURI } from './contract/erc721-metadata';

import { Registry, RegistryModel } from '../models/registry';
import type { Network } from './network';

const lru = new LRU<string, Promise<Registry>>({ max: 100 });

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
    await tokenURI(network, address, tokenId);

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

  const registry = new Registry();
  registry.network = network.name;
  registry.id = address;

  try {
    const [
      isERC721,
      supportsERC721Metadata,
      supportsERC2981,
      supportsLemonadePoapV1,
      supportsRaribleRoyaltiesV2,
    ] = await getSupportedInterfaces(network, address, [
      ERC721_INTERFACE_ID,
      ERC721Metadata_INTERFACE_ID,
      ERC2981_INTERFACE_ID,
      LemonadePoapV1_INTERFACE_ID,
      RaribleRoyaltiesV2_INTERFACE_ID,
    ]);

    if (isERC721) registry.isERC721 = true;
    if (supportsERC721Metadata) registry.supportsERC721Metadata = true;
    if (supportsERC2981) registry.supportsERC2981 = true;
    if (supportsLemonadePoapV1) registry.supportsLemonadePoapV1 = true;
    if (supportsRaribleRoyaltiesV2) registry.supportsRaribleRoyaltiesV2 = true;
  } catch { /* no-op */ }

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
