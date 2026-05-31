import type { Cloneable, Value } from "./interfaces.js";
import { MapEntry } from "./map.js";

export interface FinalizationHooks<K, V> {
  readonly onDelete?: (key: K, value: V) => void;
  readonly onChange?: (key: K, oldValue: V, newValue: V) => void;
  readonly onAdd?: (key: K, value: V) => void;
}

export class SyncMapEntry<K, V extends Cloneable<V>> extends MapEntry<K, V> {
  valueLocked(): V {
    return this.value();
  }

  originalLocked(): V {
    return this.original();
  }

  dirtyLocked(): boolean {
    return this.dirty();
  }

  locked(fn: (value: Value<V>) => void): void {
    fn(this);
  }

  deleteIf(cond: (value: V) => boolean): void {
    if (cond(this.value())) this.delete();
  }

  changeLocked(apply: (value: V) => void): void {
    this.change(apply);
  }

  changeIfLocked(cond: (value: V) => boolean, apply: (value: V) => void): boolean {
    return this.changeIf(cond, apply);
  }

  deleteLocked(): void {
    this.delete();
  }
}

export class SyncMap<K, V extends Cloneable<V>> {
  private readonly base: ReadonlyMap<K, V>;
  private readonly dirty = new Map<K, SyncMapEntry<K, V>>();

  constructor(base: ReadonlyMap<K, V>) {
    this.base = base;
  }

  load(key: K): SyncMapEntry<K, V> | undefined {
    const dirty = this.dirty.get(key);
    if (dirty !== undefined) return dirty.isDeleted() ? undefined : dirty;
    const value = this.base.get(key);
    if (value === undefined) return undefined;
    return new SyncMapEntry(this.asOwner(), key, value, value, false);
  }

  has(key: K): boolean {
    return this.load(key) !== undefined;
  }

  loadOrStore(key: K, value: V): readonly [SyncMapEntry<K, V> | undefined, boolean] {
    const existingBase = this.base.get(key);
    if (existingBase !== undefined) {
      const dirty = this.dirty.get(key);
      if (dirty !== undefined) return [dirty.isDeleted() ? undefined : dirty, true];
      return [new SyncMapEntry(this.asOwner(), key, existingBase, existingBase, false), true];
    }
    const existingDirty = this.dirty.get(key);
    if (existingDirty !== undefined) return [existingDirty.isDeleted() ? undefined : existingDirty, true];
    const entry = new SyncMapEntry(this.asOwner(), key, value, value, true);
    this.dirty.set(key, entry);
    return [entry, false];
  }

  loadAndDelete(key: K): SyncMapEntry<K, V> | undefined {
    const entry = this.load(key);
    if (entry !== undefined) {
      entry.delete();
      this.dirty.set(key, entry);
    }
    return entry;
  }

  store(key: K, value: V): SyncMapEntry<K, V> {
    const existing = this.load(key);
    if (existing !== undefined) {
      existing.replace(value);
      this.dirty.set(key, existing);
      return existing;
    }
    const entry = new SyncMapEntry(this.asOwner(), key, value, value, true);
    this.dirty.set(key, entry);
    return entry;
  }

  delete(key: K): void {
    const entry = this.load(key);
    if (entry !== undefined) {
      entry.delete();
      this.dirty.set(key, entry);
      return;
    }
    const original = this.base.get(key);
    if (original !== undefined) {
      this.dirty.set(key, new SyncMapEntry(this.asOwner(), key, original, original, false, true));
    }
  }

  range(fn: (entry: SyncMapEntry<K, V>) => boolean): void {
    const seen = new Set<K>();
    for (const [key, entry] of this.dirty) {
      seen.add(key);
      if (!entry.isDeleted() && !fn(entry)) return;
    }
    for (const [key, value] of this.base) {
      if (seen.has(key)) continue;
      if (!fn(new SyncMapEntry(this.asOwner(), key, value, value, false))) return;
    }
  }

  keys(): readonly K[] {
    const keys: K[] = [];
    this.range((entry) => {
      keys.push(entry.key());
      return true;
    });
    return keys;
  }

  values(): readonly V[] {
    const values: V[] = [];
    this.range((entry) => {
      values.push(entry.value());
      return true;
    });
    return values;
  }

  entries(): readonly (readonly [K, V])[] {
    const entries: (readonly [K, V])[] = [];
    this.range((entry) => {
      entries.push([entry.key(), entry.value()]);
      return true;
    });
    return entries;
  }

  size(): number {
    let count = 0;
    this.range(() => {
      count += 1;
      return true;
    });
    return count;
  }

  finalize(): readonly [ReadonlyMap<K, V>, boolean] {
    return this.finalizeWith({});
  }

  finalizeWith(hooks: FinalizationHooks<K, V>): readonly [ReadonlyMap<K, V>, boolean] {
    if (this.dirty.size === 0) return [this.base, false];
    const result = new Map(this.base);
    for (const [key, entry] of this.dirty) {
      if (entry.isDeleted()) {
        hooks.onDelete?.(key, entry.finalValue());
        result.delete(key);
      } else if (entry.dirty()) {
        if (this.base.has(key)) hooks.onChange?.(key, entry.original(), entry.finalValue());
        else hooks.onAdd?.(key, entry.finalValue());
        result.set(key, entry.finalValue());
      }
    }
    return [result, true];
  }

  private asOwner() {
    return {
      markDirty: (key: K, entry: SyncMapEntry<K, V>) => this.dirty.set(key, entry),
    };
  }
}

export function newSyncMap<K, V extends Cloneable<V>>(base: ReadonlyMap<K, V>): SyncMap<K, V> {
  return new SyncMap(base);
}
