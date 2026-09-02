declare module "@gotots/runtime/scalars.js" {
  export type bool = boolean;
  export type gostring = string;
  export type int = number;
  export type uint8 = number;
  export type uint64 = bigint;
}

declare module "@gotots/runtime/array.js" {
  export class GoArray<T, N extends number> {
    static literal<T, N extends number>(
      length: N,
      zero: T,
      indexes: number[],
      values: T[],
    ): GoArray<T, N>;
    get(index: number): T;
  }
}

declare module "@gotots/runtime/slice.js" {
  export class RuntimeSlice<T> {
    readonly length: number;
    get(index: number): T;
  }
}

declare module "@gotots/runtime/interface-value.js" {
  export interface GoError {
    Error(): string;
  }
}

declare module "@gotots/runtime/panic.js" {
  export class GoPanic {
    static raiseRuntime(message: string): never;
  }
}

declare module "@gotots/runtime/unsafe-pointer.js" {
  export class GoUnsafePointer {}
}
