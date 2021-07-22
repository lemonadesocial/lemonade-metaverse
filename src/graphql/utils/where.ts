/* eslint-disable no-cond-assign */
import { MongooseFilterQuery } from 'mongoose';

import { Where } from '../types/where-input';

const beforeEnd = (
  str: string,
  end: string,
) => {
  const n = end.length;

  return str.substr(-n) === end ? str.substr(0, str.length - n) : null;
};

export const getFilter = <T>(
  where: Where<T>,
): MongooseFilterQuery<T> => {
  const query: Record<string, unknown> = {};

  Object.entries(where).forEach(([key, value]) => {
    let prop;
    if (prop = beforeEnd(key, '_eq')) {
      query[prop] = value;
    } else if (value instanceof Array && (prop = beforeEnd(key, '_in'))) {
      query[prop] = { $in: value };
    }
  });

  return query as MongooseFilterQuery<T>;
};

export const validate = <T>(
  where: Where<T>,
  doc: T,
): boolean => {
  return Object.entries(where).every(([key, value]) => {
    let prop;
    if (prop = beforeEnd(key, '_eq')) {
      return doc[prop as keyof T] === value;
    } else if (value instanceof Array && (prop = beforeEnd(key, '_in'))) {
      return value.includes(doc[prop as keyof T]);
    }
  });
};
