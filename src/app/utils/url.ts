import * as assert from 'assert';

export const parseScheme = (url: string): string => {
  const pos = url.indexOf('://');

  assert.notStrictEqual(pos, -1, `failed to parse scheme of ${url}`);

  return url.substr(0, pos);
};
