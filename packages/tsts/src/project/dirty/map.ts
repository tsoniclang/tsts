import type { Cloneable, Value } from "./interfaces.js";
import { MapEntryBase } from "./entry.js";

export interface DirtyMapOwner<K, V extends Cloneable<V>> {
  markDirty(key: K, entry: MapEntry<K, V>): void;
}

export class MapEntry<K, V extends Cloneable<V>> extends MapEntryBase<K, V> implements Value<V> {
  private readonly owner: DirtyMapOwner<K, V>;

  constructor(owner: DirtyMapOwner<K, V>, key: K, original: V, value: V, dirty: boolean, deleted = false) {
    super(key, original, value, dirty, deleted);
    this.owner = owner;
  }

  change(apply: (value: V) => void): void {
    if (this.entryDeleted) throw new Error("tried to change a deleted entry");
    if (!this.entryDirty) {
      this.entryValue = this.entryValue.clone();
      this.entryDirty = true;
      this.owner.markDirty(this.entryKey, this);
    }
    apply(this.entryValue);
  }

  replace(newValue: V): void {
    if (this.entryDeleted) throw new Error("tried to change a deleted entry");
    if (!this.entryDirty) {
      this.entryDirty = true;
      this.owner.markDirty(this.entryKey, this);
    }
    this.entryValue = newValue;
  }

  changeIf(cond: (value: V) => boolean, apply: (value: V) => void): boolean {
    if (!cond(this.value())) return false;
    this.change(apply);
    return true;
  }

  delete(): void {
    if (!this.entryDirty) this.owner.markDirty(this.entryKey, this);
    this.entryDeleted = true;
  }

  locked(fn: (value: Value<V>) => void): void {
    fn(this);
  }

  isDeleted(): boolean {
    return this.entryDeleted;
  }

  finalValue(): V {
    return this.entryValue;
  }
}

export class DirtyMap<K, V extends Cloneable<V>> {
  private base: ReadonlyMap<K, V>;
  private readonly dirtyEntries = new Map<K, MapEntry<K, V>>();

  constructor(base: ReadonlyMap<K, V>) {
    this.base = base;
  }

  markDirty(key: K, entry: MapEntry<K, V>): void {
    this.dirtyEntries.set(key, entry);
  }

  get(key: K): MapEntry<K, V> | undefined {
    const dirty = this.dirtyEntries.get(key);
    if (dirty !== undefined) return dirty.isDeleted() ? undefined : dirty;
    const value = this.base.get(key);
    if (value === undefined) return undefined;
    return new MapEntry(this, key, value, value, false);
  }

  add(key: K, value: V): void {
    this.dirtyEntries.set(key, new MapEntry(this, key, value, value, true));
  }

  change(key: K, apply: (value: V) => void): void {
    const entry = this.get(key);
    if (entry === undefined) throw new Error("tried to change a non-existent entry");
    entry.change(apply);
  }

  tryDelete(key: K): boolean {
    const entry = this.get(key);
    if (entry === undefined) return false;
    entry.delete();
    return true;
  }

  delete(key: K): void {
    if (!this.tryDelete(key)) throw new Error("tried to delete a non-existent entry");
  }

  range(fn: (entry: MapEntry<K, V>) => boolean): void {
    const seen = new Set<K>();
    for (const [key, entry] of this.dirtyEntries) {
      seen.add(key);
      if (!entry.isDeleted() && !fn(entry)) return;
    }
    for (const [key, value] of this.base) {
      if (seen.has(key)) continue;
      if (!fn(new MapEntry(this, key, value, value, false))) return;
    }
  }

  clear(): void {
    this.dirtyEntries.clear();
    this.base = new Map();
  }

  finalize(): readonly [ReadonlyMap<K, V>, boolean] {
    if (this.dirtyEntries.size === 0) return [this.base, false];
    const result = new Map(this.base);
    for (const [key, entry] of this.dirtyEntries) {
      if (entry.isDeleted()) result.delete(key);
      else result.set(key, entry.finalValue());
    }
    return [result, true];
  }
}

export function newMap<K, V extends Cloneable<V>>(base: ReadonlyMap<K, V>): DirtyMap<K, V> {
  return new DirtyMap(base);
}
