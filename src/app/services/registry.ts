import LRU from 'lru-cache';

import { getSupportedInterfaces } from './contract/introspection';

import { Registry, RegistryModel } from '../models/registry';
import type { Network } from './network';

import { ERC2981_INTERFACE_ID, ERC721Metadata_INTERFACE_ID, ERC721_INTERFACE_ID, LemonadePoapV1_INTERFACE_ID, RaribleRoyaltiesV2_INTERFACE_ID } from './contract/constants';

const lru = new LRU<string, Promise<Registry>>({ max: 100 });

async function createRegistry(network: Network, address: string) {
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

async function fetchRegistry(network: Network, address: string) {
  const query = { network: network.name, id: address };

  let registry = await RegistryModel.findOne(query).lean<Registry | null>();

  if (!registry) {
    registry = await createRegistry(network, address);

    await RegistryModel.replaceOne(query, registry, { upsert: true });
  }

  return registry;
}

export async function getRegistry(network: Network, address: string) {
  const key = network.name + address;

  let promise = lru.get(key);

  if (!promise) {
    promise = fetchRegistry(network, address)
      .catch((err) => { lru.del(key); throw err; });

    lru.set(key, promise);
  }

  return await promise;
}
