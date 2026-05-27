/**
 * String/object interning table — deduplicates equal values to a
 * single canonical reference, used by the type-cache for stable
 * identity comparisons.
 *
 * Ported from Strada `core/interner.go` — a generic-purpose intern
 * helper for strings, symbols, and types.
 */

export interface InternTable<T> {
  readonly entries: ReadonlyMap<string, T>;
}

export function newInternTable<T>(): InternTable<T> {
  return { entries: new Map() };
}

/**
 * Returns a new table with the given key/value stored, or the
 * existing entry if the key was already interned.
 */
export function intern<T>(
  table: InternTable<T>,
  key: string,
  value: T,
): { table: InternTable<T>; interned: T } {
  const existing = table.entries.get(key);
  if (existing !== undefined) {
    return { table, interned: existing };
  }
  const next = new Map(table.entries);
  next.set(key, value);
  return { table: { entries: next }, interned: value };
}

/**
 * Returns the interned value for a key, or undefined.
 */
export function getInterned<T>(
  table: InternTable<T>,
  key: string,
): T | undefined {
  return table.entries.get(key);
}

/**
 * Returns the size of the intern table.
 */
export function internTableSize<T>(table: InternTable<T>): number {
  return table.entries.size;
}

/**
 * Returns true when a key is interned.
 */
export function hasInterned<T>(
  table: InternTable<T>,
  key: string,
): boolean {
  return table.entries.has(key);
}

/**
 * Returns the keys of an intern table.
 */
export function getInternedKeys<T>(table: InternTable<T>): readonly string[] {
  return [...table.entries.keys()];
}

/**
 * Returns the values of an intern table.
 */
export function getInternedValues<T>(table: InternTable<T>): readonly T[] {
  return [...table.entries.values()];
}
