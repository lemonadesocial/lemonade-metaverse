import * as ethers from 'ethers';
import * as prom from 'prom-client';
import Web3ProviderWS from 'web3-providers-ws'

import * as IERC165 from '../../assets/contracts/IERC165.json';
import * as IERC2981 from '../../assets/contracts/IERC2981.json';
import * as IERC721Metadata from '../../assets/contracts/IERC721Metadata.json';
import * as RaribleRoyaltiesV2 from '../../assets/contracts/RaribleRoyaltiesV2.json';

import { rpcUrl } from '../../config';

export const ERC721_INTERFACE_ID = '0x80ac58cd';
export const ERC721Metadata_INTERFACE_ID = '0x5b5e139f';
export const ERC2981_INTERFACE_ID = '0x2a55205a';
export const RaribleRoyaltiesV2_INTERFACE_ID = '0xcad96cca';

const web3ProviderWS = new Web3ProviderWS(rpcUrl, {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000,
  },
  reconnect: {
    auto: true,
    delay: 100,
  },
  timeout: 15000,
});

new prom.Gauge({
  name: 'metaverse_web3_websocket_listeners',
  help: 'Number of metaverse web3 websocket listeners',
  collect: function () {
    const connection = web3ProviderWS.connection as { _listeners: Record<string, ((...args: unknown[]) => unknown)[]> } | undefined;

    if (connection) this.set(Object.values(connection._listeners).reduce((acc, cur) => acc + cur.length, 0));
  },
});

export const provider = new ethers.providers.Web3Provider(
  // @ts-expect-error Argument of type 'WebsocketProviderBase' is not assignable to parameter of type 'ExternalProvider | JsonRpcFetchFunc'.
  web3ProviderWS,
);

export const erc165Contract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC165.abi),
  provider
);

export const erc721MetadataContract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC721Metadata.abi),
  provider
);

export const erc2981Contract = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(IERC2981.abi),
  provider
);

export const raribleRoyaltiesV2 = new ethers.Contract(
  ethers.constants.AddressZero,
  new ethers.utils.Interface(RaribleRoyaltiesV2.abi),
  provider
);
