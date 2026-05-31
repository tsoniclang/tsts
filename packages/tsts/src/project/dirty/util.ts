export function cloneMapIfNil<K, V, T>(
  dirty: T | undefined,
  original: T | undefined,
  getMap: (value: T) => ReadonlyMap<K, V> | undefined,
): ReadonlyMap<K, V> {
  if (dirty !== undefined) {
    const dirtyMap = getMap(dirty);
    if (dirtyMap !== undefined) return dirtyMap;
  }
  if (original === undefined) return new Map();
  const originalMap = getMap(original);
  return originalMap === undefined ? new Map() : new Map(originalMap);
}
