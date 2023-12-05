import * as assert from 'assert';
import * as https from 'https';

import type { Network } from './network';

export function isUniqueCollection(network: Network, address: string) {
  return network.uniqueCollectionPrefix ? address.startsWith(network.uniqueCollectionPrefix) : false;
}

function getUniqueCollectionId(address: string) {
  return parseInt(address.slice(-8), 16);
}

export async function getUniqueMetadata(network: Network, address: string, tokenId: string) {
  if (!network.uniqueApiUrl) return;

  const response = await fetch(`${network.uniqueApiUrl}v1/tokens?collectionId=${getUniqueCollectionId(address)}&tokenId=${tokenId}`, { keepalive: true });

  assert.ok(response.ok);

  const data = await response.json();

  if (data.erc721Metadata?.metadata) return data.erc721Metadata.metadata;

  const metadata: Record<string, unknown> = {};

  if (data.attributes) {
    const attributes = Object.values(data.attributes) as { name: { _: string }, value: { _: string } }[];

    if (attributes.length) metadata.attributes = attributes.map((attr) => ({ trait_type: attr.name._, value: attr.value._ }));
  }

  if (data.image?.fullUrl) metadata.image = data.image.fullUrl;
  if (data.video?.fullUrl) metadata.animation_url = data.video.fullUrl;

  return metadata;
}
