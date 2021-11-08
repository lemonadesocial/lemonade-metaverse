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
  props: string[] = [],
): Record<string, unknown> => {
  const query: Record<string, unknown> = {};

  Object.entries(where).forEach(([key, value]) => {
    let prop;
    let condition;

    if ((prop = beforeEnd(key, '_eq'))) {
      condition = value;
    } else if ((prop = beforeEnd(key, '_exists'))) {
      condition = { $exists: value };
    } else if (value instanceof Array && (prop = beforeEnd(key, '_in'))) {
      condition = { $in: value };
    }

    if (prop && condition) {
      query[props.concat(prop).join('.')] = condition;
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      Object.assign(query, getFilter(value as Where<unknown>, props.concat(key)));
    }
  });

  return query;
};

export const validate = <T extends Record<string, any>>(
  where: Where<T>,
  doc: T,
): boolean => {
  return Object.entries(where).every(([key, value]) => {
    let prop;

    if ((prop = beforeEnd(key, '_eq'))) {
      return doc[prop] === value;
    } else if ((prop = beforeEnd(key, '_exists'))) {
      return !!doc[prop] === value;
    } else if (value instanceof Array && (prop = beforeEnd(key, '_in'))) {
      return value.includes(doc[prop]);
    }

    if (Object.prototype.toString.call(value) === '[object Object]') {
      return validate(value as Where<unknown>, doc[key]);
    }
  });
};
