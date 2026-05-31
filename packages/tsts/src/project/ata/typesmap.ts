export interface TypesMapEntry {
  readonly packageName: string;
  readonly typingsPackageName: string;
}

export class TypesMap {
  private readonly packageToTypings = new Map<string, string>();

  constructor(entries: Iterable<TypesMapEntry> = []) {
    for (const entry of entries) this.packageToTypings.set(entry.packageName, entry.typingsPackageName);
  }

  get(packageName: string): string | undefined {
    return this.packageToTypings.get(packageName);
  }

  set(packageName: string, typingsPackageName: string): void {
    this.packageToTypings.set(packageName, typingsPackageName);
  }

  has(packageName: string): boolean {
    return this.packageToTypings.has(packageName);
  }

  entries(): readonly TypesMapEntry[] {
    return [...this.packageToTypings.entries()]
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([packageName, typingsPackageName]) => ({ packageName, typingsPackageName }));
  }
}

export function newTypesMap(entries?: Iterable<TypesMapEntry>): TypesMap {
  return new TypesMap(entries);
}
