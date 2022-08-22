import { CID } from 'multiformats/cid';
import { URL } from 'url';

import { ipfsGatewayUrl, webUrl } from '../../config';

export function parseUrl(input: string) {
  const url = new URL(input);

  if (url.protocol === 'ipfs:') {
    const cidv1 = CID.parse(url.hostname).toV1().toString();

    return new URL(`${ipfsGatewayUrl.protocol}//${cidv1}.ipfs.${ipfsGatewayUrl.host}${url.pathname}`);
  }

  return url;
}

export function getParsedUrl(input: unknown) {
  if (typeof input !== 'string') return;

  try {
    return parseUrl(input).href;
  } catch { /* no-op */ }
}

export function getWebUrl(args: { network: string; contract: string, tokenId: string }) {
  return `${webUrl}nft/${args.network}/${args.contract}/${args.tokenId}`;
}
