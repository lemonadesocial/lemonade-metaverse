import { URL } from 'url';

import { ipfsGatewayUrl } from '../../config';

interface FetchableUrl {
  protocol: 'http:' | 'https:';
  href: string;
}

export const getFetchableUrl = (url: string): FetchableUrl => {
  const { protocol, href } = new URL(url);

  switch (protocol) {
    case 'http:':
    case 'https:':
      return { protocol, href };
    case 'ipfs:':
      return { protocol: 'https:', href: `${ipfsGatewayUrl}ipfs/${href.substr('ipfs://'.length)}` };
    default:
      throw new Error(`unsupported protocol ${protocol}`);
  }
};

export const getSimpleFetchableUrl = (url: unknown): string | undefined => {
  if (typeof url !== 'string') return;

  try {
    return getFetchableUrl(url).href;
  } catch { /* no-op */ }
};
