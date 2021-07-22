import * as assert from 'assert';

export const parseSchema = (url: string): string => {
  const pos = url.indexOf('://');

  assert.notStrictEqual(pos, -1, 'failed to parse schema');

  return url.substr(0, pos);
};
