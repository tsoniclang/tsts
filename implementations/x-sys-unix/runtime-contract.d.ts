declare module "@gotots/runtime/array.js" {
  export class GoArray<T, N extends number> {
    static zero<T, N extends number>(length: N, zero: T): GoArray<T, N>;
    get(index: number): T;
    set(index: number, value: T): void;
    copy(): GoArray<T, N>;
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
    Error(): string;
  }
}

declare module "@gotots/runtime/panic.js" {
  export class GoPanic {
    static raiseRuntime(message: string): never;
  }
}

declare module "@gotots/runtime/scalars.js" {
  export type gostring = string;
  export type int = number;
  export type int8 = number;
  export type int16 = number;
  export type int32 = number;
  export type int64 = bigint;
  export type uint = number;
  export type uint8 = number;
  export type uint16 = number;
  export type uint32 = number;
  export type uint64 = bigint;
  export type uintptr = number;
}

declare module "@gotots/runtime/slice.js" {
  import type { Pointer } from "@tsonic/core/types.js";

  export class RuntimeSlice<T> {
    readonly length: number;
    static make<T>(length: number | bigint, capacity: number | bigint | null, zero: T): RuntimeSlice<T>;
    static nil<T>(): RuntimeSlice<T>;
    get(index: number | bigint): T;
    set(index: number | bigint, value: T): void;
  }

  export function goSliceAddress<T>(
    source: RuntimeSlice<T>,
    index: number | bigint,
  ): Pointer<T>;
}

declare module "@gotots/gostdlib/internal/scalars.js" {
  export type bool = boolean;
  export type gostring = string;
  export type int = bigint;
  export type int64 = bigint;
  export type uint32 = bigint;
  export type uintptr = bigint;
  export type uint8 = bigint;
}

declare module "@gotots/gostdlib/io/fs.js" {
  import type { uint32 } from "@gotots/gostdlib/internal/scalars.js";

  export class FileMode {
    readonly value: uint32;
    constructor(value: uint32);
  }

  export interface FileInfo {
    IsDir(): boolean;
    Mode(): FileMode;
    Size(): bigint;
  }
}

declare module "@gotots/gostdlib/os.js" {
  import type { GoError } from "@gotots/runtime/interface-value.js";
  import type { RuntimeSlice } from "@gotots/runtime/slice.js";
  import type { FileMode, FileInfo } from "@gotots/gostdlib/io/fs.js";

  export class File {
    static Close(receiver: File | undefined): GoError | undefined;
    static Fd(receiver: File | undefined): bigint;
    static Read(
      receiver: File | undefined,
      buffer: RuntimeSlice<number>,
    ): [bigint, GoError | undefined];
    static Write(
      receiver: File | undefined,
      buffer: RuntimeSlice<number>,
    ): [bigint, GoError | undefined];
  }

  export function Lstat(name: string): [FileInfo | undefined, GoError | undefined];
  export function Open(name: string): [File | undefined, GoError | undefined];
  export function OpenFile(
    name: string,
    flags: bigint,
    permissions: FileMode,
  ): [File | undefined, GoError | undefined];
  export function Stat(name: string): [FileInfo | undefined, GoError | undefined];
}

declare module "@gotots/gostdlib/path/filepath.js" {
  import type { GoError } from "@gotots/runtime/interface-value.js";

  export function EvalSymlinks(path: string): [string, GoError | undefined];
}

declare module "@gotots/gostdlib/syscall.js" {
  export class Errno {
    readonly value: bigint;
    constructor(value: bigint);
    Error(): string;
  }
}

declare module "@tsonic/core/types.js" {
  const pointerBrand: unique symbol;
  export interface Pointer<T> {
    readonly [pointerBrand]: (value: T) => T;
  }
}

declare module "@tsonic/core/lang.js" {
  import type { Pointer } from "@tsonic/core/types.js";

  export function allocatePointer<T>(initial: T): Pointer<T>;
  export function loadPointer<T>(pointer: Pointer<T>): T;
}
