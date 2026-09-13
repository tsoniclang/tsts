declare module "@gotots/runtime/string-value.js" {
  export class GoString {
    private constructor();
    private readonly backing: object;
    static readonly empty: GoString;
    static fromText(bytes: string): GoString;
    text(): string;
    read(index: number | bigint): number;
    sourceLength(): number | bigint;
    slice(low: number | bigint, high?: number | bigint): GoString;
  }
}

declare module "@gotots/runtime/interface-value.js" {
  export abstract class GoInterfaceValue {
    abstract readonly $go$type: { readonly comparable: boolean };
    abstract readonly $go$methods: ReadonlySet<object>;
    abstract readonly $go$formatString: boolean;
    abstract $go$implements(contract: readonly object[]): boolean;
    abstract $go$equal(other: GoInterfaceValue): boolean;
    abstract $go$hash(): number;
    abstract $go$format(
      verb: string,
      flags: string,
      precision: number | undefined,
    ): string;
  }

  export interface GoError extends GoInterfaceValue {
    Error(): import("@gotots/runtime/string-value.js").GoString;
  }
}

declare module "@gotots/runtime/scalars.js" {
  export type bool = boolean;
  export type gostring = import("@gotots/runtime/string-value.js").GoString;
  export type int = number;
}

declare module "@gotots/runtime/slice.js" {
  export class RuntimeSlice<T> {
    readonly length: number;
    static literal<T>(values: T[]): RuntimeSlice<T>;
    get(index: number): T;
  }
}

declare module "@gotots/gostdlib/errors.js" {
  import type { GoError } from "@gotots/runtime/interface-value.js";
  export function New(message: import("@gotots/runtime/string-value.js").GoString): GoError;
}

declare module "@gotots/gostdlib/internal/portable/utf8/codec.js" {
  import type { GoString } from "@gotots/runtime/string-value.js";
  export function fromHostString(value: string): GoString;
  export function toHostString(value: GoString): string;
}
