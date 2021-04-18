import * as assert from 'assert';

export const schema = (url: string) => {
  const pos = url.indexOf('://');

  assert.notStrictEqual(pos, -1, 'failed to extract schema');

  return url.substr(0, pos);
};
