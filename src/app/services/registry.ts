import { erc165Contract, ERC2981_INTERFACE_ID, ERC721Metadata_INTERFACE_ID, ERC721_INTERFACE_ID, RaribleRoyaltiesV2_INTERFACE_ID } from '../helpers/web3';

import { Registry, RegistryModel } from '../models/registry';

async function supportsInterface(address: string, interfaceId: string) {
  try {
    return await erc165Contract.attach(address).supportsInterface(interfaceId) as boolean;
  } catch {
    return null;
  }
}

export async function fetchRegistry(address: string): Promise<Registry> {
  let registry = await RegistryModel.findOne({ id: address }).lean<Registry | null>();

  if (!registry) {
    const [{ isERC721, supportsERC721Metadata }, supportsERC2981, supportsRaribleRoyaltiesV2] = await Promise.all([
      (async () => {
        const supportsERC721Metadata = await supportsInterface(address, ERC721Metadata_INTERFACE_ID);
        const supportsERC165 = supportsERC721Metadata !== null;

        return {
          isERC721: supportsERC721Metadata || (supportsERC165 && await supportsInterface(address, ERC721_INTERFACE_ID)),
          supportsERC721Metadata,
        };
      })(),
      supportsInterface(address, ERC2981_INTERFACE_ID),
      supportsInterface(address, RaribleRoyaltiesV2_INTERFACE_ID),
    ]);

    registry = new Registry();
    registry.id = address;
    registry.isERC721 = isERC721 || false;

    registry.supportsERC721Metadata = supportsERC721Metadata || false;
    registry.supportsERC2981 = supportsERC2981 || false;
    registry.supportsRaribleRoyaltiesV2 = supportsRaribleRoyaltiesV2 || false;

    await RegistryModel.updateOne({ id: address }, registry, { upsert: true });
  }

  return registry;
}
