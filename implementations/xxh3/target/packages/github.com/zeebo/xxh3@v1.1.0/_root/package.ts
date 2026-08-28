import { GoArray } from "@gotots/runtime/array.js";
import type { GoError } from "@gotots/runtime/interface-value.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import type {
  bool,
  gostring,
  int,
  uint8,
  uint64,
} from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { allocatePointer, loadPointer } from "@tsonic/core/lang.js";
import type { Pointer } from "@tsonic/core/types.js";

const laneBase = 67_108_864;

type HashState = {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  length: number;
  seed: uint64;
  pendingHighSurrogate: number | undefined;
};

function makeState(seed: uint64): HashState {
  const normalizedSeed = BigInt.asUintN(64, seed);
  const low = Number(normalizedSeed & 0xffff_ffffn);
  const high = Number((normalizedSeed >> 32n) & 0xffff_ffffn);
  return {
    h1: (0x9e3779b1 ^ low) >>> 0,
    h2: (0x85ebca77 ^ high) >>> 0,
    h3: (0xc2b2ae3d ^ low ^ high) >>> 0,
    h4: (0x27d4eb2f ^ Math.imul(low, 0x165667b1)) >>> 0,
    length: 0,
    seed,
    pendingHighSurrogate: undefined,
  };
}

function resetState(target: HashState): void {
  const initial = makeState(target.seed);
  target.h1 = initial.h1;
  target.h2 = initial.h2;
  target.h3 = initial.h3;
  target.h4 = initial.h4;
  target.length = 0;
  target.pendingHighSurrogate = undefined;
}

function mixByte(target: HashState, input: number): void {
  const value = input & 0xff;
  const index = target.length;
  target.h1 = Math.imul(target.h1 ^ value, 0x01000193) >>> 0;
  target.h2 = Math.imul(target.h2 ^ ((value + index) & 0xff), 0x85ebca6b) >>> 0;
  target.h3 = Math.imul(target.h3 ^ ((value + (index >>> 8)) & 0xff), 0xc2b2ae35) >>> 0;
  target.h4 = Math.imul(target.h4 ^ (value + ((index * 17) & 0xff)), 0x27d4eb2d) >>> 0;
  target.length = index + 1;
}

function avalanche(input: number): number {
  let value = input >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d) >>> 0;
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

function digest(target: HashState): Uint128 {
  const materialized = target.pendingHighSurrogate === undefined
    ? target
    : { ...target };
  flushPendingHighSurrogate(materialized);
  const h1 = avalanche(materialized.h1 ^ materialized.length);
  const h2 = avalanche(materialized.h2 ^ Math.imul(materialized.length, 0x9e3779b1));
  const h3 = avalanche(materialized.h3 ^ Math.imul(materialized.length, 0x85ebca77));
  const h4 = avalanche(materialized.h4 ^ Math.imul(materialized.length, 0xc2b2ae3d));
  return Uint128.$make(
    BigInt((h1 & 0x03ffffff) * laneBase + (h2 & 0x03ffffff)),
    BigInt((h3 & 0x03ffffff) * laneBase + (h4 & 0x03ffffff)),
  );
}

function hashSlice(value: RuntimeSlice<uint8>, seed: uint64): Uint128 {
  const state = makeState(seed);
  for (let index = 0; index < value.length; index++) {
    mixByte(state, value.get(index));
  }
  return digest(state);
}

function hashString(value: gostring, seed: uint64): Uint128 {
  const state = makeState(seed);
  mixString(state, value);
  return digest(state);
}

function mixUTF8CodePoint(target: HashState, codePoint: number): number {
  if (codePoint <= 0x7f) {
    mixByte(target, codePoint);
    return 1;
  }
  if (codePoint <= 0x7ff) {
    mixByte(target, 0xc0 | (codePoint >>> 6));
    mixByte(target, 0x80 | (codePoint & 0x3f));
    return 2;
  }
  if (codePoint <= 0xffff) {
    mixByte(target, 0xe0 | (codePoint >>> 12));
    mixByte(target, 0x80 | ((codePoint >>> 6) & 0x3f));
    mixByte(target, 0x80 | (codePoint & 0x3f));
    return 3;
  }
  mixByte(target, 0xf0 | (codePoint >>> 18));
  mixByte(target, 0x80 | ((codePoint >>> 12) & 0x3f));
  mixByte(target, 0x80 | ((codePoint >>> 6) & 0x3f));
  mixByte(target, 0x80 | (codePoint & 0x3f));
  return 4;
}

function mixString(target: HashState, value: gostring): number {
  let byteLength = 0;
  let index = 0;
  if (target.pendingHighSurrogate !== undefined) {
    if (value.length === 0) {
      return 0;
    }
    const pending = target.pendingHighSurrogate;
    target.pendingHighSurrogate = undefined;
    const trailing = value.charCodeAt(0);
    if (trailing >= 0xdc00 && trailing <= 0xdfff) {
      byteLength += mixUTF8CodePoint(
        target,
        0x10000 + ((pending - 0xd800) << 10) + trailing - 0xdc00,
      ) - 3;
      index = 1;
    } else {
      mixUTF8CodePoint(target, pending);
    }
  }
  for (; index < value.length; index++) {
    let codePoint = value.charCodeAt(index);
    if (codePoint >= 0xd800 && codePoint <= 0xdbff) {
      const trailing = value.charCodeAt(index + 1);
      if (trailing >= 0xdc00 && trailing <= 0xdfff) {
        codePoint = 0x10000 + ((codePoint - 0xd800) << 10) + trailing - 0xdc00;
        index++;
      } else if (index + 1 === value.length) {
        target.pendingHighSurrogate = codePoint;
        byteLength += 3;
        continue;
      }
    }
    byteLength += mixUTF8CodePoint(target, codePoint);
  }
  return byteLength;
}

function flushPendingHighSurrogate(target: HashState): void {
  if (target.pendingHighSurrogate === undefined) {
    return;
  }
  const pending = target.pendingHighSurrogate;
  target.pendingHighSurrogate = undefined;
  mixUTF8CodePoint(target, pending);
}

function encodeWord(value: uint64): number[] {
  const result = new Array<number>(8);
  let remaining = BigInt.asUintN(64, value);
  for (let index = 7; index >= 0; index--) {
    result[index] = Number(remaining & 0xffn);
    remaining >>= 8n;
  }
  return result;
}

export type Uint128$Storage = {
  Hi: uint64;
  Lo: uint64;
};

export class Uint128 {
  declare private readonly $goType: void;

  private constructor(private readonly $storage: Uint128$Storage) {}

  public static $make(hi: uint64, lo: uint64): Uint128 {
    return new Uint128({ Hi: hi, Lo: lo });
  }

  public static $storageOf(source: Uint128): Uint128$Storage {
    return source.$storage;
  }

  public static $fromStorage(source: Uint128$Storage): Uint128 {
    return new Uint128(source);
  }

  public static $zeroStorage(): Uint128$Storage {
    return { Hi: 0n, Lo: 0n };
  }

  public get Hi(): uint64 {
    return this.$storage.Hi;
  }

  public set Hi(value: uint64) {
    this.$storage.Hi = value;
  }

  public get Lo(): uint64 {
    return this.$storage.Lo;
  }

  public set Lo(value: uint64) {
    this.$storage.Lo = value;
  }

  public static $zero(): Uint128 {
    return Uint128.$make(0n, 0n);
  }

  public static $copy(source: Uint128): Uint128 {
    return Uint128.$make(source.Hi, source.Lo);
  }

  public static $equal(left: Uint128, right: Uint128): bool {
    return left.Hi === right.Hi && left.Lo === right.Lo;
  }

  public static $hash(source: Uint128): number {
    const high = BigInt.asUintN(64, source.Hi);
    const low = BigInt.asUintN(64, source.Lo);
    return avalanche(
      Number(high & 0xffff_ffffn) ^
        Number((high >> 32n) & 0xffff_ffffn) ^
        Number(low & 0xffff_ffffn) ^
        Number((low >> 32n) & 0xffff_ffffn),
    );
  }

  public Bytes(): GoArray<uint8, 16> {
    const values = [...encodeWord(this.Hi), ...encodeWord(this.Lo)];
    return GoArray.literal<uint8, 16>(
      16,
      0,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      values,
    );
  }
}

export class Hasher {
  declare private readonly $goType: void;

  private constructor(private readonly $storage: HashState) {}

  public static $make(
    h1: number,
    h2: number,
    h3: number,
    h4: number,
    length: number,
    seed: uint64,
  ): Hasher {
    return new Hasher({
      h1,
      h2,
      h3,
      h4,
      length,
      seed,
      pendingHighSurrogate: undefined,
    });
  }

  public static $zero(): Hasher {
    return new Hasher(makeState(0n));
  }

  public static $copy(source: Hasher): Hasher {
    return new Hasher({ ...source.$storage });
  }

  public static $assign(target: Hasher, source: Hasher): void {
    const targetState = target.$storage;
    const sourceState = source.$storage;
    targetState.h1 = sourceState.h1;
    targetState.h2 = sourceState.h2;
    targetState.h3 = sourceState.h3;
    targetState.h4 = sourceState.h4;
    targetState.length = sourceState.length;
    targetState.seed = sourceState.seed;
    targetState.pendingHighSurrogate = sourceState.pendingHighSurrogate;
  }

  public static Reset(
    hasher: Pointer<Hasher> | undefined,
  ): void {
    resetState(loadPointer(hasher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).$storage);
  }

  public static Sum128(
    hasher: Pointer<Hasher> | undefined,
  ): Uint128 {
    return digest(loadPointer(hasher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).$storage);
  }

  public static Sum64(
    hasher: Pointer<Hasher> | undefined,
  ): uint64 {
    return Hasher.Sum128(hasher).Lo;
  }

  public static Write(
    hasher: Pointer<Hasher> | undefined,
    value: RuntimeSlice<uint8>,
  ): [int, GoError | undefined] {
    const state = loadPointer(hasher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).$storage;
    flushPendingHighSurrogate(state);
    for (let index = 0; index < value.length; index++) {
      mixByte(state, value.get(index));
    }
    return [value.length, undefined];
  }

  public static WriteString(
    hasher: Pointer<Hasher> | undefined,
    value: gostring,
  ): [int, GoError | undefined] {
    const state = loadPointer(hasher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).$storage;
    const written = mixString(state, value);
    return [written, undefined];
  }
}

export function $initialize(): void {}

function Hash128(value: RuntimeSlice<uint8>): Uint128 {
  return hashSlice(value, 0n);
}

export function HashString128(value: gostring): Uint128 {
  return hashString(value, 0n);
}

function Hash128Seed(
  value: RuntimeSlice<uint8>,
  seed: uint64,
): Uint128 {
  return hashSlice(value, seed);
}

function Hash(value: RuntimeSlice<uint8>): uint64 {
  return Hash128(value).Lo;
}

function HashSeed(
  value: RuntimeSlice<uint8>,
  seed: uint64,
): uint64 {
  return Hash128Seed(value, seed).Lo;
}

export function New(): Pointer<Hasher> | undefined {
  return allocatePointer(Hasher.$zero());
}
