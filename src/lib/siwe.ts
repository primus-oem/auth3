import { SiweMessage } from 'siwe';

export function createSiweMessage(address: string, statement: string, nonce: string, domain: string, uri: string) {
  return new SiweMessage({
    domain,
    address,
    statement,
    uri,
    version: '1',
    chainId: 1,
    nonce,
  });
}
