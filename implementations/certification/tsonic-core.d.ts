// Certified projection of the selected source-core and Go ABI provider models.
// Regenerate only with: node scripts/tsonic-core-certification.mjs --write

declare module "@tsonic/core/types.js" {
  export interface DataLayout {
    readonly __tsonicDataLayout: "DataLayout";
  }

  export interface MemoryLayout<T> {
    readonly __tsonicMemoryLayout: (value: T) => T;
  }

  export interface MemoryFieldLayout<T> {
    readonly __tsonicMemoryFieldLayout: (value: T) => T;
  }

  export interface MemoryFieldBinding<T> {
    readonly __tsonicMemoryFieldBinding: (value: T) => T;
  }

  export interface NativePointer<T> {
    readonly __tsonicNativePointer: (value: T) => T;
  }

  export type bool = boolean;

  export type char = string;

  export type int8 = number;

  export type uint8 = number;

  export type int16 = number;

  export type uint16 = number;

  export type int32 = number;

  export type uint32 = number;

  export type int64 = bigint;

  export type uint64 = bigint;

  export type int128 = bigint;

  export type uint128 = bigint;

  export type nativeInt = number;

  export type nativeUint = number;

  export type float16 = number;

  export type float32 = number;

  export type float64 = number;

  export type decimal = number;

  export interface Pointer<T> {
    readonly __tsonicSourceType: (value: T) => T;
  }

  export interface RawPointer {
    readonly __tsonicSourceType: (value: "RawPointer") => "RawPointer";
  }

  export interface FunctionPointer<TArgs, TReturn> {
    readonly __tsonicSourceType: (value: TArgs) => TReturn;
  }

  export interface FixedArray<T, TLength extends number | bigint> {
    [index: number]: T;
    readonly length: TLength;
    [Symbol.iterator](): globalThis.Iterator<T>;
  }
}

declare module "@tsonic/core/lang.js" {
  import type { DataLayout, FixedArray, MemoryFieldBinding, MemoryFieldLayout, MemoryLayout, NativePointer, Pointer, RawPointer } from "@tsonic/core/types.js";

  export interface __TsonicAttributeBuilder<TOwner> {
    add(attribute: object, ...args: unknown[]): void;
    property(selector: (target: TOwner) => unknown): __TsonicAttributeMemberBuilder<TOwner>;
    method(selector: (target: TOwner) => unknown): __TsonicAttributeMemberBuilder<TOwner>;
    constructor: () => __TsonicAttributeMemberBuilder<TOwner>;
  }

  export interface __TsonicAttributeMemberBuilder<TOwner> {
    add(attribute: object, ...args: unknown[]): void;
    parameter(name: string): __TsonicAttributeMemberBuilder<TOwner>;
    target(specifier: string): __TsonicAttributeMemberBuilder<TOwner>;
  }

  export function toRawPointer<T>(pointer: Pointer<T> | undefined, layout: MemoryLayout<T>): RawPointer | undefined;

  export function reinterpretRawPointer<T>(pointer: RawPointer | undefined, layout: MemoryLayout<T>): Pointer<T> | undefined;

  export function offsetRawPointer<TOffset extends number | bigint>(pointer: RawPointer | undefined, byteOffset: TOffset, dataLayout: DataLayout): RawPointer | undefined;

  export function rawPointerToAddressInteger<TAddress extends number | bigint>(pointer: RawPointer | undefined, dataLayout: DataLayout): TAddress;

  export function addressIntegerToRawPointer<TAddress extends number | bigint>(address: TAddress, dataLayout: DataLayout): RawPointer | undefined;

  export function memoryLayout<T>(dataLayout: DataLayout, byteSize: number, byteAlignment: number, stride: number, ...fields: MemoryFieldLayout<T>[]): MemoryLayout<T>;

  export function memoryArrayLayout<T, TLength extends number | bigint>(dataLayout: DataLayout, byteSize: number, byteAlignment: number, stride: number, elementLayout: MemoryLayout<T>, length: TLength): MemoryLayout<FixedArray<T, TLength>>;

  export function memoryField<T, TField>(select: (value: T) => TField, byteOffset: number, byteAlignment: number, fieldLayout: MemoryLayout<TField>): MemoryFieldLayout<T>;

  export function bindMemoryField<T, TField>(field: MemoryFieldLayout<T>, pointer: Pointer<TField>): MemoryFieldBinding<T>;

  export function bindMemoryRecord<T>(layout: MemoryLayout<T>, ...fields: MemoryFieldBinding<T>[]): T;

  export function sizeOf<T>(layout: MemoryLayout<T>): number;

  export function alignOf<T>(layout: MemoryLayout<T>): number;

  export function strideOf<T>(layout: MemoryLayout<T>): number;

  export function fieldOffsetOf<T, TField>(layout: MemoryLayout<T>, select: (value: T) => TField): number;

  export function keepAlive<T>(value: T): void;

  export function viewPointer<F, T>(pointer: Pointer<F>, read: () => T, write: (value: T) => void): Pointer<T>;
  export function viewPointer<F, T>(pointer: Pointer<F> | undefined, read: () => T, write: (value: T) => void): Pointer<T> | undefined;

  export function comptime<T>(value: T): T;
  export function comptime<T>(): T;

  export function comptimeIf(condition: boolean): boolean;

  export function unroll<T>(iterable: T): T;

  export function loadNativePointer<T>(pointer: NativePointer<T>): T;

  export function storeNativePointer<T>(pointer: NativePointer<T>, value: T): void;

  export function offsetNativePointer<T>(pointer: NativePointer<T>, elementOffset: number): NativePointer<T>;

  export function unsafeContext(): void;
  export function unsafeContext<T>(expression: T): T;

  export function safety<TOwner>(target: TOwner): __TsonicSafetyBuilder<TOwner>;
  export function safety<TOwner>(): __TsonicSafetyBuilder<TOwner>;

  export interface __TsonicSafetyBuilder<TOwner> {
    requiresUnsafe(): void;
    safe(): void;
    method(selector: (target: TOwner) => unknown): __TsonicSafetyMemberBuilder<TOwner>;
    property(selector: (target: TOwner) => unknown): __TsonicSafetyMemberBuilder<TOwner>;
    indexer(selector: (target: TOwner) => unknown): __TsonicSafetyMemberBuilder<TOwner>;
    readonly constructor: () => __TsonicSafetyMemberBuilder<TOwner>;
  }

  export interface __TsonicSafetyMemberBuilder<TOwner> {
    requiresUnsafe(): void;
    safe(): void;
    getter(): __TsonicSafetyMemberBuilder<TOwner>;
    setter(): __TsonicSafetyMemberBuilder<TOwner>;
  }

  export function writeOnlyRef<T>(value: T): T;

  export function readWriteRef<T>(value: T): T;

  export function readOnlyRef<T>(value: T): T;

  export function sharedBorrow<T>(value: T): T;

  export function mutableBorrow<T>(value: T): T;

  export function move<T>(value: T): T;

  export function struct<T>(value: T): T;

  export function field<T>(): T;

  export function attribute<T>(): __TsonicAttributeBuilder<T>;

  export function defaultValue<T>(): T;

  export function addressOf<T>(storage: T | undefined): Pointer<T>;

  export function allocatePointer<T>(initial: T): Pointer<T>;

  export function loadPointer<T>(pointer: Pointer<T>): T;

  export function storePointer<T>(pointer: Pointer<T>, value: T): void;

  export function equalPointer<T>(left: Pointer<T> | undefined, right: Pointer<T> | undefined): boolean;

  export function hashPointer<T>(pointer: Pointer<T> | undefined): number;

  export function bindPointer<T>(identity: object, read: () => T, write: (value: T) => void): Pointer<T>;

  export function projectPointer<F, T>(pointer: Pointer<F>, fromSource: (value: F) => T, toSource: (value: T) => F): Pointer<T>;
  export function projectPointer<F, T>(pointer: Pointer<F> | undefined, fromSource: (value: F) => T, toSource: (value: T) => F): Pointer<T> | undefined;

  export function equalRawPointer(left: RawPointer | undefined, right: RawPointer | undefined): boolean;

  export function hashRawPointer(pointer: RawPointer | undefined): number;
}

declare module "@gotots/abi/layout.js" {
  import type { DataLayout } from "@tsonic/core/types.js";

  export const little32: DataLayout;

  export const little64: DataLayout;

  export const big32: DataLayout;

  export const big64: DataLayout;
}
