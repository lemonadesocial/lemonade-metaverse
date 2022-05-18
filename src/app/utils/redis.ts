import { URL } from 'url';
import type { RedisOptions } from 'ioredis';

export function parseUrl(input: string): RedisOptions {
  const url = new URL(input);

  const options: RedisOptions = {};

  if (url.hostname) options.host = url.hostname;
  if (url.port) options.port = parseInt(url.port);
  if (url.username) options.username = url.username;
  if (url.password) options.password = url.password;
  if (url.pathname.length > 1) options.db = parseInt(url.pathname.slice(1));

  return options;
}
