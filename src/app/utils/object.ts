export type ExcludeNull<T> = T extends (infer P)[] ? ExcludeNull<P>[] : T extends Record<string, unknown> ? { [P in keyof T]: NonNullable<ExcludeNull<T[P]>> } : T;

export function excludeNull<T>(val: T): ExcludeNull<T> {
  return Object.entries(val).reduce((acc, [key, value]) => ({
    ...acc,
    ...value !== null ? { [key]: value instanceof Array ? value.map((e) => excludeNull(e)) : Object.prototype.toString.call(value) === '[object Object]' ? excludeNull(value) : value } : {},
  }), {} as ExcludeNull<T>);
}
