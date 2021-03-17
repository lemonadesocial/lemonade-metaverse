import { client, getAppAccessToken } from './helper';

import { EnjinBalance, EnjinUser } from './types';

const ENJIN_USER_FRAGMENT = `
fragment EnjinUserFragment on EnjinUser {
  id
  name
  identities {
    id,
    linkingCode
    linkingCodeQr
    wallet {
      ethAddress
      ethBalance
    }
  }
}`;

export const getUser = async (
  id: number,
) => {
  const response = await client.request<{ EnjinUser: EnjinUser }, { id: number }>(
    `${ENJIN_USER_FRAGMENT}
    query GetUser($id: Int!) {
      EnjinUser(id: $id) {
        ...EnjinUserFragment
      }
    }`,
    { id },
    { authorization: `Bearer ${await getAppAccessToken()}` },
  );

  return response.EnjinUser;
};

export const createUser = async (
  name: string,
) => {
  const response = await client.request<{ CreateEnjinUser: EnjinUser }, { name: string }>(
    `${ENJIN_USER_FRAGMENT}
    mutation CreateUser($name: String!) {
      CreateEnjinUser(name: $name) {
        accessTokens
        ...EnjinUserFragment
      }
    }`,
    { name },
    { authorization: `Bearer ${await getAppAccessToken()}` },
  );

  return response.CreateEnjinUser;
};

export const unlinkWalletAddress = async (
  id: number,
) => {
  await client.request<any, { id: number }>(
    `mutation UnlinkWalletAddress($id: Int!) {
      DeleteEnjinIdentity(id: $id, unlink: true) {
        linkingCode
        linkingCodeQr
      }
    }`,
    { id },
    { authorization: `Bearer ${await getAppAccessToken()}` },
  );
};

export const getBalances = async (
  address: string,
) => {
  const response = await client.request<{ EnjinBalances: EnjinBalance[] }, { address: string }>(
    `query GetBalances($address: String!) {
      EnjinBalances(ethAddress: $address, value_gt: 0) {
        token {
          id
          index
          name
        }
        value
        wallet {
          ethAddress
        }
      }
    }`,
    { address },
    { authorization: `Bearer ${await getAppAccessToken()}` },
  );

  return response.EnjinBalances;
}
