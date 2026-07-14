import type { GoValueOps } from "../compat.js";
import type { bool, int, long, uint } from "../scalars.js";

// Authored Go sync/atomic facade — single-threaded semantics.
//
// TS-Go's single-threaded build performs no real concurrency, so each atomic
// type is modeled as a plain mutable cell. Load/Store/Swap/CompareAndSwap/Add
// operate directly on the cell (no memory ordering is observable without
// goroutines). The 32-bit integer types wrap on store/swap/add to match Go's
// fixed-width arithmetic. Uint64 uses bigint so every uint64 value remains
// exact.

export class Bool {
  private value: boolean = false;
  Load(): bool {
    return this.value as bool;
  }
  Store(value: bool): void {
    this.value = value as boolean;
  }
  Swap(newValue: bool): bool {
    const old = this.value;
    this.value = newValue as boolean;
    return old as bool;
  }
  CompareAndSwap(oldValue: bool, newValue: bool): bool {
    if (this.value === (oldValue as boolean)) {
      this.value = newValue as boolean;
      return true as bool;
    }
    return false as bool;
  }
}

export const BoolValueOps: GoValueOps<Bool> = Object.freeze({
  zero: (): Bool => new Bool(),
  copy: (_value: Bool): Bool => new Bool(),
});

export class Int32 {
  private value: number = 0;
  Load(): int {
    return this.value as int;
  }
  Store(value: int): void {
    this.value = (value as number) | 0;
  }
  Swap(newValue: int): int {
    const old = this.value;
    this.value = (newValue as number) | 0;
    return old as int;
  }
  CompareAndSwap(oldValue: int, newValue: int): bool {
    if (this.value === ((oldValue as number) | 0)) {
      this.value = (newValue as number) | 0;
      return true as bool;
    }
    return false as bool;
  }
  Add(delta: int): int {
    this.value = (this.value + (delta as number)) | 0;
    return this.value as int;
  }
  And(mask: int): int {
    const old = this.value;
    this.value = this.value & ((mask as number) | 0);
    return old as int;
  }
  Or(mask: int): int {
    const old = this.value;
    this.value = this.value | ((mask as number) | 0);
    return old as int;
  }
}

export const Int32ValueOps: GoValueOps<Int32> = Object.freeze({
  zero: (): Int32 => new Int32(),
  copy: (_value: Int32): Int32 => new Int32(),
});

export class Int64 {
  private value: number = 0;
  Load(): long {
    return this.value as long;
  }
  Store(value: long): void {
    this.value = value as number;
  }
  Swap(newValue: long): long {
    const old = this.value;
    this.value = newValue as number;
    return old as long;
  }
  CompareAndSwap(oldValue: long, newValue: long): bool {
    if (this.value === (oldValue as number)) {
      this.value = newValue as number;
      return true as bool;
    }
    return false as bool;
  }
  Add(delta: long): long {
    this.value = this.value + (delta as number);
    return this.value as long;
  }
}

export class Uint32 {
  private value: number = 0;
  Load(): uint {
    return this.value as uint;
  }
  Store(value: uint): void {
    this.value = (value as number) >>> 0;
  }
  Swap(newValue: uint): uint {
    const old = this.value;
    this.value = (newValue as number) >>> 0;
    return old as uint;
  }
  CompareAndSwap(oldValue: uint, newValue: uint): bool {
    if (this.value === ((oldValue as number) >>> 0)) {
      this.value = (newValue as number) >>> 0;
      return true as bool;
    }
    return false as bool;
  }
  Add(delta: uint): uint {
    this.value = (this.value + (delta as number)) >>> 0;
    return this.value as uint;
  }
}

export class Uint64 {
  private value: bigint = 0n;
  Load(): bigint {
    return this.value;
  }
  Store(value: bigint): void {
    this.value = globalThis.BigInt.asUintN(64, value);
  }
  Swap(newValue: bigint): bigint {
    const old = this.value;
    this.value = globalThis.BigInt.asUintN(64, newValue);
    return old;
  }
  CompareAndSwap(oldValue: bigint, newValue: bigint): bool {
    if (this.value === globalThis.BigInt.asUintN(64, oldValue)) {
      this.value = globalThis.BigInt.asUintN(64, newValue);
      return true as bool;
    }
    return false as bool;
  }
  Add(delta: bigint): bigint {
    this.value = globalThis.BigInt.asUintN(64, this.value + delta);
    return this.value;
  }
  And(mask: bigint): bigint {
    const old = this.value;
    this.value = this.value & globalThis.BigInt.asUintN(64, mask);
    return old;
  }
  Or(mask: bigint): bigint {
    const old = this.value;
    this.value = this.value | globalThis.BigInt.asUintN(64, mask);
    return old;
  }
}

export const Uint64ValueOps: GoValueOps<Uint64> = Object.freeze({
  zero: (): Uint64 => new Uint64(),
  copy: (_value: Uint64): Uint64 => new Uint64(),
});
