import { URL } from 'url';

import { ipfsGatewayUrl } from '../../config';

export const getFetchableUrl = (url: string): {
  protocol: 'http:' | 'https:';
  href: string;
} => {
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
