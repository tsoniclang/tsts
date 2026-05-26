/**
 * Lazy link storage for AST nodes.
 *
 * Port of TS-Go `internal/core/linkstore.go` (30 LoC). Stores
 * per-node link data on demand. Each lookup either returns an
 * existing entry or constructs a fresh value via the provided
 * factory.
 */

export class LinkStore<K, V> {
  private readonly entries = new Map<K, V>();
  private readonly factory: () => V;

  constructor(factory: () => V) {
    this.factory = factory;
  }

  get(key: K): V {
    let value = this.entries.get(key);
    if (value === undefined) {
      value = this.factory();
      this.entries.set(key, value);
    }
    return value;
  }

  has(key: K): boolean {
    return this.entries.has(key);
  }

  tryGet(key: K): V | undefined {
    return this.entries.get(key);
  }
}
