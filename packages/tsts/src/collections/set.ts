/**
 * Set wrapper.
 *
 * Port of TS-Go `internal/collections/set.go`.
 */

export class SetCollection<T> {
  private readonly values = new Set<T>();

  static withSizeHint<T>(_hint: number): SetCollection<T> {
    return new SetCollection<T>();
  }

  static fromItems<T>(...items: readonly T[]): SetCollection<T> {
    const set = new SetCollection<T>();
    for (const item of items) {
      set.add(item);
    }
    return set;
  }

  has(key: T): boolean {
    return this.values.has(key);
  }

  Has(key: T): boolean {
    return this.has(key);
  }

  add(key: T): void {
    this.values.add(key);
  }

  Add(key: T): void {
    this.add(key);
  }

  delete(key: T): void {
    this.values.delete(key);
  }

  Delete(key: T): void {
    this.delete(key);
  }

  len(): number {
    return this.values.size;
  }

  Len(): number {
    return this.len();
  }

  keys(): ReadonlySet<T> {
    return this.values;
  }

  Keys(): ReadonlySet<T> {
    return this.keys();
  }

  clear(): void {
    this.values.clear();
  }

  Clear(): void {
    this.clear();
  }

  addIfAbsent(key: T): boolean {
    if (this.has(key)) return false;
    this.add(key);
    return true;
  }

  AddIfAbsent(key: T): boolean {
    return this.addIfAbsent(key);
  }

  clone(): SetCollection<T> {
    const clone = new SetCollection<T>();
    for (const key of this.values) {
      clone.add(key);
    }
    return clone;
  }

  Clone(): SetCollection<T> {
    return this.clone();
  }

  union(other: SetCollection<T>): void {
    for (const key of other.values) {
      this.values.add(key);
    }
  }

  Union(other: SetCollection<T>): void {
    this.union(other);
  }

  unionedWith(other: SetCollection<T> | undefined): SetCollection<T> {
    const result = this.clone();
    if (other !== undefined) {
      result.union(other);
    }
    return result;
  }

  UnionedWith(other: SetCollection<T> | undefined): SetCollection<T> {
    return this.unionedWith(other);
  }

  equals(other: SetCollection<T> | undefined): boolean {
    if (other === undefined) return false;
    if (this.values.size !== other.values.size) return false;
    for (const key of this.values) {
      if (!other.has(key)) return false;
    }
    return true;
  }

  Equals(other: SetCollection<T> | undefined): boolean {
    return this.equals(other);
  }

  isSubsetOf(other: SetCollection<T>): boolean {
    for (const key of this.values) {
      if (!other.has(key)) return false;
    }
    return true;
  }

  IsSubsetOf(other: SetCollection<T>): boolean {
    return this.isSubsetOf(other);
  }

  intersects(other: SetCollection<T> | undefined): boolean {
    if (other === undefined) return false;
    for (const key of this.values) {
      if (other.has(key)) return true;
    }
    return false;
  }

  Intersects(other: SetCollection<T> | undefined): boolean {
    return this.intersects(other);
  }
}

export function newSetWithSizeHint<T>(hint: number): SetCollection<T> {
  return SetCollection.withSizeHint<T>(hint);
}

export function newSetFromItems<T>(...items: readonly T[]): SetCollection<T> {
  return SetCollection.fromItems(...items);
}

export { SetCollection as Set };
