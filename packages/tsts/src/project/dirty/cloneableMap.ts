export interface CloneableMap<K, V> extends ReadonlyMap<K, V> {
  clone(): CloneableMap<K, V>;
}

export class DefaultCloneableMap<K, V> extends Map<K, V> implements CloneableMap<K, V> {
  clone(): CloneableMap<K, V> {
    return new DefaultCloneableMap(this);
  }
}

export function newCloneableMap<K, V>(entries?: Iterable<readonly [K, V]>): CloneableMap<K, V> {
  return new DefaultCloneableMap(entries);
}
