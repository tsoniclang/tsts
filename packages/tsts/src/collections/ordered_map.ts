/**
 * Insertion-ordered map.
 *
 * Port of TS-Go `internal/collections/ordered_map.go` (316 LoC).
 * Native JS `Map` is already insertion-ordered, but we wrap it to
 * preserve TS-Go's explicit `keys`/`mp` separation (for `entryAt`
 * by-index lookup) and to expose the same method surface.
 */

export interface MapEntry<K, V> {
  readonly key: K;
  readonly value: V;
}

export class OrderedMap<K, V> {
  private keys_: K[] = [];
  private mp = new Map<K, V>();

  constructor(hint?: number) {
    if (hint !== undefined && hint > 0) {
      // No native size hint in JS Map; keep API parity.
      this.keys_ = new Array<K>(hint).fill(undefined as unknown as K);
      this.keys_.length = 0;
    }
  }

  static fromEntries<K, V>(items: readonly MapEntry<K, V>[]): OrderedMap<K, V> {
    const m = new OrderedMap<K, V>(items.length);
    for (const item of items) m.set(item.key, item.value);
    return m;
  }

  set(key: K, value: V): void {
    if (!this.mp.has(key)) this.keys_.push(key);
    this.mp.set(key, value);
  }

  get(key: K): { value: V; ok: boolean } {
    const v = this.mp.get(key);
    if (v === undefined && !this.mp.has(key)) {
      return { value: undefined as unknown as V, ok: false };
    }
    return { value: v as V, ok: true };
  }

  getOrZero(key: K): V {
    return this.mp.get(key) as V;
  }

  entryAt(index: number): { key: K; value: V; ok: boolean } {
    if (index < 0 || index >= this.keys_.length) {
      return { key: undefined as unknown as K, value: undefined as unknown as V, ok: false };
    }
    const k = this.keys_[index]!;
    return { key: k, value: this.mp.get(k) as V, ok: true };
  }

  has(key: K): boolean {
    return this.mp.has(key);
  }

  delete(key: K): { value: V; ok: boolean } {
    const v = this.mp.get(key);
    if (v === undefined && !this.mp.has(key)) {
      return { value: undefined as unknown as V, ok: false };
    }
    this.mp.delete(key);
    const i = this.keys_.indexOf(key);
    if (i === 0) this.keys_.shift();
    else if (i === this.keys_.length - 1) this.keys_.pop();
    else this.keys_.splice(i, 1);
    return { value: v as V, ok: true };
  }

  *keys(): IterableIterator<K> {
    // Iterate using index so new items added during iteration are visible.
    for (let i = 0; i < this.keys_.length; i++) yield this.keys_[i]!;
  }

  *values(): IterableIterator<V> {
    for (let i = 0; i < this.keys_.length; i++) yield this.mp.get(this.keys_[i]!) as V;
  }

  *entries(): IterableIterator<readonly [K, V]> {
    for (let i = 0; i < this.keys_.length; i++) {
      const k = this.keys_[i]!;
      yield [k, this.mp.get(k) as V];
    }
  }

  [Symbol.iterator](): IterableIterator<readonly [K, V]> {
    return this.entries();
  }

  clear(): void {
    this.keys_ = [];
    this.mp.clear();
  }

  get size(): number {
    return this.keys_.length;
  }

  clone(): OrderedMap<K, V> {
    const m = new OrderedMap<K, V>();
    m.keys_ = this.keys_.slice();
    m.mp = new Map(this.mp);
    return m;
  }
}

// ---------------------------------------------------------------------------
// Diff helpers
// ---------------------------------------------------------------------------

export function diffOrderedMaps<K, V>(
  m1: OrderedMap<K, V>,
  m2: OrderedMap<K, V>,
  onAdded: (k: K, v: V) => void,
  onRemoved: (k: K, v: V) => void,
  onModified: (k: K, oldValue: V, newValue: V) => void,
): void {
  diffOrderedMapsFunc(m1, m2, (a, b) => a === b, onAdded, onRemoved, onModified);
}

export function diffOrderedMapsFunc<K, V>(
  m1: OrderedMap<K, V>,
  m2: OrderedMap<K, V>,
  equalValues: (a: V, b: V) => boolean,
  onAdded: (k: K, v: V) => void,
  onRemoved: (k: K, v: V) => void,
  onModified: (k: K, oldValue: V, newValue: V) => void,
): void {
  for (const [k, v2] of m2.entries()) {
    if (!m1.has(k)) onAdded(k, v2);
  }
  for (const [k, v1] of m1.entries()) {
    const r = m2.get(k);
    if (r.ok) {
      if (!equalValues(v1, r.value)) onModified(k, v1, r.value);
    } else {
      onRemoved(k, v1);
    }
  }
}
