interface Object {}
interface Function {}
interface CallableFunction extends Function {}
interface NewableFunction extends Function {}
interface IArguments { readonly length: number; readonly [index: number]: unknown; }
interface String { readonly length: number; }
interface Number {}
interface Boolean {}
interface RegExp {}
interface Array<T> {
  readonly length: number;
  [index: number]: T;
  map<U>(callback: (value: T, index: number, array: T[]) => U): U[];
}
interface ReadonlyArray<T> {
  readonly length: number;
  readonly [index: number]: T;
  map<U>(callback: (value: T, index: number, array: readonly T[]) => U): U[];
}
