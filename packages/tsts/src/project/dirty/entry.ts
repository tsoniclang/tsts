export class MapEntryBase<K, V> {
  protected readonly entryKey: K;
  protected readonly entryOriginal: V;
  protected entryValue: V;
  protected entryDirty: boolean;
  protected entryDeleted: boolean;

  constructor(key: K, original: V, value: V, dirty: boolean, deleted = false) {
    this.entryKey = key;
    this.entryOriginal = original;
    this.entryValue = value;
    this.entryDirty = dirty;
    this.entryDeleted = deleted;
  }

  key(): K {
    return this.entryKey;
  }

  original(): V {
    return this.entryOriginal;
  }

  value(): V {
    if (this.entryDeleted) throw new Error("dirty map entry has been deleted");
    return this.entryValue;
  }

  dirty(): boolean {
    return this.entryDirty;
  }
}
