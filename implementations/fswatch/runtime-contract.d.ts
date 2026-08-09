declare module "@gotots/runtime/interface-value.js" {
  import type { Awaitable } from "@gotots/runtime/scalars.js";

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
    Error(): Awaitable<string>;
  }
}

declare module "@gotots/runtime/scalars.js" {
  export type Awaitable<T> = T | Promise<T>;
  export type bool = boolean;
  export type gostring = string;
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
  export function New(message: string): GoError;
}
