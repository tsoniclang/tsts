/**
 * Data structures specific to TSTS that aren't covered by native Map/Set.
 *
 * Port of TS-Go internal/collections/.
 *
 * Note: TS-Go's `Set` and `OrderedMap`/`OrderedSet` types are not ported.
 * JS's native `Set` and `Map` are insertion-ordered (per ECMA-262 §24.1.1.3)
 * and provide the same API surface. Use them directly in ported code.
 *
 * TS-Go's `SyncMap` and `SyncSet` (concurrent collections) are not ported
 * because TypeScript is single-threaded.
 *
 * Ported here:
 *   - `MultiMap<K, V>` — Map of key → array of values
 *   - `CopyOnWriteMap<K, V>` / `CopyOnWriteSet<K>` — COW for nested scopes
 */

export * from "./multimap.js";
export * from "./cow.js";
