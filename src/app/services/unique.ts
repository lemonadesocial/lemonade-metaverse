import * as assert from 'assert';
import * as https from 'https';
import fetch from 'node-fetch';

import type { Network } from './network';

const agent = new https.Agent({ keepAlive: true });

export function isUniqueCollection(network: Network, address: string) {
  return network.uniqueCollectionPrefix ? address.startsWith(network.uniqueCollectionPrefix) : false;
}

function getUniqueCollectionId(address: string) {
  return parseInt(address.slice(-8), 16);
}

export async function getUniqueMetadata(network: Network, address: string, tokenId: string) {
  if (!network.uniqueApiUrl) return;

  const response = await fetch(`${network.uniqueApiUrl}/v1/tokens?collectionId=${getUniqueCollectionId(address)}&tokenId=${tokenId}`, { agent });

  assert.ok(response.ok);

  const data = await response.json();

  const metadata: Record<string, unknown> = {};

  if (data.attributes) {
    const attributes = Object.values(data.attributes);

    if (attributes.length) metadata.attributes = attributes.map((attr: any) => ({ trait_type: attr.name._, value: attr.value._ }));
  }

  if (data.image?.fullUrl) metadata.image = data.image.fullUrl;
  if (data.video?.fullUrl) metadata.animation_url = data.video.fullUrl;

  return metadata;
}
