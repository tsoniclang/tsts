/**
 * Build parse cache.
 *
 * Port of TS-Go `internal/execute/build/parseCache.go`.
 */

export type ZeroValuePredicate<V> = (value: V) => boolean;

function defaultIsZeroValue<V>(value: V): boolean {
  return value === undefined || value === null;
}

export class ParseCache<K, V> {
  private readonly entries = new Map<K, V>();
  private readonly isZeroValue: ZeroValuePredicate<V>;

  constructor(isZeroValue: ZeroValuePredicate<V> = defaultIsZeroValue) {
    this.isZeroValue = isZeroValue;
  }

  loadOrStore(key: K, parse: (key: K) => V, allowZero: boolean): V {
    if (this.entries.has(key)) {
      const existing = this.entries.get(key)!;
      if (allowZero || !this.isZeroValue(existing)) {
        return existing;
      }
    }

    const value = parse(key);
    this.entries.set(key, value);
    return value;
  }

  store(key: K, value: V): void {
    this.entries.set(key, value);
  }

  delete(key: K): void {
    this.entries.delete(key);
  }

  reset(): void {
    this.entries.clear();
  }

  get size(): number {
    return this.entries.size;
  }
}
