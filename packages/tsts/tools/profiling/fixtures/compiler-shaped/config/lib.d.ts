interface Object {}
interface Function {}
interface CallableFunction extends Function {}
interface NewableFunction extends Function {}
interface IArguments { readonly length: number; readonly [index: number]: unknown; }
interface String { readonly length: number; toUpperCase(): string; }
interface Number {}
interface Boolean {}
interface RegExp {}
interface Array<T> {
  readonly length: number;
  [index: number]: T;
  map<U>(callback: (value: T, index: number, array: T[]) => U): U[];
  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[];
  reduce<U>(callback: (previous: U, current: T, index: number, array: T[]) => U, initial: U): U;
  push(...items: T[]): number;
}
interface ReadonlyArray<T> {
  readonly length: number;
  readonly [index: number]: T;
  map<U>(callback: (value: T, index: number, array: readonly T[]) => U): U[];
  filter(predicate: (value: T, index: number, array: readonly T[]) => boolean): T[];
  reduce<U>(callback: (previous: U, current: T, index: number, array: readonly T[]) => U, initial: U): U;
}
interface Map<K, V> {
  readonly size: number;
  get(key: K): V | undefined;
  set(key: K, value: V): this;
  has(key: K): boolean;
}
interface MapConstructor { new <K, V>(): Map<K, V>; }
declare var Map: MapConstructor;
type Record<K extends keyof any, T> = { [P in K]: T };
type Partial<T> = { [P in keyof T]?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type NonNullable<T> = T & {};
