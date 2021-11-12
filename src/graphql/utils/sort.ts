import { Sort, SortDirection } from '../types/sort-input';

export function getSort<T>({ by, direction }: Sort<T>) {
  return { [by]: direction === SortDirection.ASC ? 1 : -1 } as Record<keyof T, 1 | -1>;
}
