import { URL } from 'url';

import { ipfsGatewayUrl, webUrl } from '../../config';

export function parseUrl(input: string): URL {
  const url = new URL(input);

  if (url.protocol === 'ipfs:') {
    return new URL(`${ipfsGatewayUrl}ipfs/${url.href.substring('ipfs://'.length)}`);
  }

  return url;
}

export function getParsedUrl(input: unknown): string | undefined {
  if (typeof input !== 'string') return;

  try {
    return parseUrl(input).href;
  } catch { /* no-op */ }
}

export function getWebUrl(args: { network: string; contract: string, tokenId: string }): string {
  return `${webUrl}meta/${args.network}/${args.contract}/${args.tokenId}`;
}
