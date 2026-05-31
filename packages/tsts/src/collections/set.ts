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

  add(key: T): void {
    this.values.add(key);
  }

  delete(key: T): void {
    this.values.delete(key);
  }

  len(): number {
    return this.values.size;
  }

  keys(): ReadonlySet<T> {
    return this.values;
  }

  clear(): void {
    this.values.clear();
  }

  addIfAbsent(key: T): boolean {
    if (this.has(key)) return false;
    this.add(key);
    return true;
  }

  clone(): SetCollection<T> {
    const clone = new SetCollection<T>();
    for (const key of this.values) {
      clone.add(key);
    }
    return clone;
  }

  union(other: SetCollection<T>): void {
    for (const key of other.values) {
      this.values.add(key);
    }
  }

  unionedWith(other: SetCollection<T> | undefined): SetCollection<T> {
    const result = this.clone();
    if (other !== undefined) {
      result.union(other);
    }
    return result;
  }

  equals(other: SetCollection<T> | undefined): boolean {
    if (other === undefined) return false;
    if (this.values.size !== other.values.size) return false;
    for (const key of this.values) {
      if (!other.has(key)) return false;
    }
    return true;
  }

  isSubsetOf(other: SetCollection<T>): boolean {
    for (const key of this.values) {
      if (!other.has(key)) return false;
    }
    return true;
  }

  intersects(other: SetCollection<T> | undefined): boolean {
    if (other === undefined) return false;
    for (const key of this.values) {
      if (other.has(key)) return true;
    }
    return false;
  }
}

export function newSetWithSizeHint<T>(hint: number): SetCollection<T> {
  return SetCollection.withSizeHint<T>(hint);
}

export function newSetFromItems<T>(...items: readonly T[]): SetCollection<T> {
  return SetCollection.fromItems(...items);
}

export { SetCollection as Set };
