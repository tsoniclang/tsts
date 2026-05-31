export class MapBuilder<K, VBase, VBuilder> {
  private readonly base: ReadonlyMap<K, VBase>;
  private readonly dirty = new Map<K, VBuilder>();
  private deleted = new Set<K>();
  private readonly toBuilder: (value: VBase) => VBuilder;
  private readonly buildValue: (value: VBuilder) => VBase;

  constructor(base: ReadonlyMap<K, VBase>, toBuilder: (value: VBase) => VBuilder, build: (value: VBuilder) => VBase) {
    this.base = base;
    this.toBuilder = toBuilder;
    this.buildValue = build;
  }

  get(key: K): VBuilder | undefined {
    if (this.deleted.has(key)) return undefined;
    const dirty = this.dirty.get(key);
    if (dirty !== undefined) return dirty;
    const base = this.base.get(key);
    return base === undefined ? undefined : this.toBuilder(base);
  }

  set(key: K, value: VBuilder): void {
    this.dirty.set(key, value);
    this.deleted.delete(key);
  }

  delete(key: K): void {
    this.deleted.add(key);
    this.dirty.delete(key);
  }

  clear(): void {
    this.dirty.clear();
    this.deleted = new Set(this.base.keys());
  }

  has(key: K): boolean {
    if (this.deleted.has(key)) return false;
    return this.dirty.has(key) || this.base.has(key);
  }

  build(): ReadonlyMap<K, VBase> {
    if (this.dirty.size === 0 && this.deleted.size === 0) return this.base;
    const result = new Map(this.base);
    for (const key of this.deleted) result.delete(key);
    for (const [key, value] of this.dirty) result.set(key, this.buildValue(value));
    return result;
  }
}

export function newMapBuilder<K, VBase, VBuilder>(
  base: ReadonlyMap<K, VBase>,
  toBuilder: (value: VBase) => VBuilder,
  build: (value: VBuilder) => VBase,
): MapBuilder<K, VBase, VBuilder> {
  return new MapBuilder(base, toBuilder, build);
}
