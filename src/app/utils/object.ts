export type ExcludeNull<T> = T extends Record<string, unknown> ? { [P in keyof T]: NonNullable<ExcludeNull<T[P]>> } : T;

export function excludeNull<T>(obj: T): ExcludeNull<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    ...value !== null ? { [key]: Object.prototype.toString.call(value) === '[object Object]' ? excludeNull(value) : value } : {},
  }), {} as ExcludeNull<T>);
};
