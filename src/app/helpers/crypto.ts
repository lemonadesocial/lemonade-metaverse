import * as crypto from 'crypto';

import { cryptoKey } from '../../config';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(cryptoKey);
const ENCODING = 'hex';

export const encrypt = (value: crypto.BinaryLike) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const data = Buffer.concat([cipher.update(value), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString(ENCODING)}:${data.toString(ENCODING)}:${tag.toString(ENCODING)}`;
}

export const decrypt = (value: string) => {
  const parts = value.split(':');

  const iv = Buffer.from(parts[0], ENCODING);
  const data = Buffer.from(parts[1], ENCODING);
  const tag = Buffer.from(parts[2], ENCODING);
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(data), decipher.final()]).toString();
}
