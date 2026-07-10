export interface Box<T> {
  readonly value: T;
}

export function mapBoxes<T, U>(values: readonly Box<T>[], mapper: (value: T) => U): Box<U>[] {
  return values.map((entry) => ({ value: mapper(entry.value) }));
}

export const lengths = mapBoxes([{ value: "alpha" }, { value: "beta" }], (value) => value.length);
