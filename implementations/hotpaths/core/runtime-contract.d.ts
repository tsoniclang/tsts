declare module "@tsonic/core/types.js" {
  export interface Pointer<T> {
    readonly __tsonicSourceType: (value: T) => T;
  }

  export interface RawPointer {
    readonly __tsonicSourceType: (value: "RawPointer") => "RawPointer";
  }
}

declare module "@tsonic/core/lang.js" {
  import type { Pointer, RawPointer } from "@tsonic/core/types.js";

  export function addressOf<T>(storage: T | undefined): Pointer<T>;
  export function allocatePointer<T>(initial: T): Pointer<T>;
  export function loadPointer<T>(pointer: Pointer<T>): T;
  export function storePointer<T>(pointer: Pointer<T>, value: T): void;
  export function equalPointer<T>(
    left: Pointer<T> | undefined,
    right: Pointer<T> | undefined,
  ): boolean;
  export function hashPointer<T>(pointer: Pointer<T> | undefined): number;
  export function bindPointer<T>(
    identity: object,
    read: () => T,
    write: (value: T) => void,
  ): Pointer<T>;
  export function projectPointer<F, T>(
    pointer: Pointer<F>,
    fromSource: (value: F) => T,
    toSource: (value: T) => F,
  ): Pointer<T>;
  export function projectPointer<F, T>(
    pointer: Pointer<F> | undefined,
    fromSource: (value: F) => T,
    toSource: (value: T) => F,
  ): Pointer<T> | undefined;
  export function bindRawPointer(identity: object): RawPointer;
  export function equalRawPointer(
    left: RawPointer | undefined,
    right: RawPointer | undefined,
  ): boolean;
  export function hashRawPointer(pointer: RawPointer | undefined): number;
  export function struct<T>(shape: T): T;
  export function field<T>(): T;
}
