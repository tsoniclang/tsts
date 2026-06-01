export interface Named {
  name(): string;
}

export class Index<T extends Named> {
  private readonly entries: T[];
  private readonly index: Map<string, number[]>;

  constructor(entries: readonly T[] = []) {
    this.entries = [];
    this.index = new Map<string, number[]>();
    for (const entry of entries) this.insertAsWords(entry);
  }

  getEntries(): readonly T[] {
    return this.entries;
  }

  find(name: string, caseSensitive: boolean): readonly T[] {
    if (this.entries.length === 0 || name.length === 0) return [];
    const firstRune = firstCodePoint(name);
    if (firstRune === undefined) return [];
    const candidates = this.index.get(firstRune.toLocaleUpperCase());
    if (candidates === undefined) return [];

    const results: T[] = [];
    for (const entryIndex of candidates) {
      const entry = this.entries[entryIndex];
      if (entry === undefined) continue;
      const entryName = entry.name();
      if ((caseSensitive && entryName === name) || (!caseSensitive && entryName.localeCompare(name, undefined, { sensitivity: "accent" }) === 0)) {
        results.push(entry);
      }
    }
    return results;
  }

  searchWordPrefix(prefix: string): readonly T[] {
    if (this.entries.length === 0) return [];
    if (prefix.length === 0) return this.entries;

    const normalizedPrefix = prefix.toLocaleLowerCase();
    const firstRune = firstCodePoint(normalizedPrefix);
    if (firstRune === undefined) return [];

    const upperKey = firstRune.toLocaleUpperCase();
    const lowerKey = firstRune.toLocaleLowerCase();
    const nameStarts = this.index.get(upperKey) ?? [];
    const wordStarts = upperKey === lowerKey ? [] : this.index.get(lowerKey) ?? [];
    if (nameStarts.length + wordStarts.length === 0) return [];

    const results: T[] = [];
    for (const starts of [nameStarts, wordStarts]) {
      for (const entryIndex of starts) {
        const entry = this.entries[entryIndex];
        if (entry !== undefined && containsCharsInOrder(entry.name(), normalizedPrefix)) {
          results.push(entry);
        }
      }
    }
    return results;
  }

  insertAsWords(value: T): void {
    const name = value.name();
    if (name.length === 0) throw new Error("Cannot index entry with empty name");

    const entryIndex = this.entries.length;
    this.entries.push(value);

    const starts = wordIndices(name);
    const seen = new Set<string>();
    for (let index = 0; index < starts.length; index += 1) {
      const firstRune = firstCodePoint(name.slice(starts[index]!));
      if (firstRune === undefined) continue;

      const key = index === 0 ? firstRune.toLocaleUpperCase() : firstRune.toLocaleLowerCase();
      if (index > 0 && seen.has(key)) continue;
      const bucket = this.index.get(key) ?? [];
      bucket.push(entryIndex);
      this.index.set(key, bucket);
      seen.add(key);
    }
  }

  clone(filter: (entry: T) => boolean): Index<T> {
    const cloned = new Index<T>();
    const oldToNew = new Map<number, number>();

    for (let oldIndex = 0; oldIndex < this.entries.length; oldIndex += 1) {
      const entry = this.entries[oldIndex]!;
      if (!filter(entry)) continue;
      oldToNew.set(oldIndex, cloned.entries.length);
      cloned.entries.push(entry);
    }

    for (const [rune, oldIndices] of this.index) {
      const newIndices: number[] = [];
      for (const oldIndex of oldIndices) {
        const newIndex = oldToNew.get(oldIndex);
        if (newIndex !== undefined) newIndices.push(newIndex);
      }
      if (newIndices.length > 0) cloned.index.set(rune, newIndices);
    }

    return cloned;
  }
}

export function newIndex<T extends Named>(entries: readonly T[] = []): Index<T> {
  return new Index(entries);
}

export function containsCharsInOrder(text: string, pattern: string): boolean {
  const source = [...text.toLocaleLowerCase()];
  const target = [...pattern.toLocaleLowerCase()];
  let patternIndex = 0;
  for (const character of source) {
    if (patternIndex < target.length && character === target[patternIndex]) patternIndex += 1;
  }
  return patternIndex === target.length;
}

export function wordIndices(name: string): readonly number[] {
  const indices: number[] = [];
  for (let index = 0; index < name.length;) {
    const character = name[index]!;
    if (index === 0 || isWordStart(name, index)) indices.push(index);
    index += character.length;
  }
  return indices.length === 0 ? [0] : indices;
}

function isWordStart(text: string, index: number): boolean {
  const current = text[index]!;
  const previous = text[index - 1] ?? "";
  if (previous === "_" || previous === "-" || previous === " " || previous === ".") return isIdentifierCharacter(current);
  return isLowercase(previous) && isUppercase(current);
}

function isIdentifierCharacter(character: string): boolean {
  return /[\p{L}\p{N}_$]/u.test(character);
}

function isLowercase(character: string): boolean {
  return character.toLocaleLowerCase() === character && character.toLocaleUpperCase() !== character;
}

function isUppercase(character: string): boolean {
  return character.toLocaleUpperCase() === character && character.toLocaleLowerCase() !== character;
}

function firstCodePoint(text: string): string | undefined {
  return [...text][0];
}

export * from "./aliasResolver.js";
export * from "./registry.js";
export * from "./export.js";
export * from "./exportStringerGenerated.js";
export * from "./specifiers.js";
export * from "./view.js";
export * from "./util.js";
