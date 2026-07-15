import type { byte, int } from "../../scalars.js";
import type { GoArray, GoError, GoSlice, GoValueOps } from "../../compat.js";
import { GoArrayMake, GoArrayStore, GoNumberValueOps, GoSliceLoad } from "../../compat.js";
import { StringUtf8Bytes } from "../../unicode/utf8.js";

export class Uint128 {
  declare private readonly nominalType: void;

  Hi!: bigint;
  Lo!: bigint;

  constructor() {
    this.Hi = 0n;
    this.Lo = 0n;
  }

  Bytes(): GoArray<byte, "16"> {
    const result = GoArrayMake<byte, "16">(16 as int, GoNumberValueOps);
    writeUint64Bytes(result, 0, this.Hi);
    writeUint64Bytes(result, 8, this.Lo);
    return result;
  }
}

const stripeSize: number = 64;
const blockSize: number = 1024;
const bufferSize: number = blockSize + stripeSize;
const uint32Mask: bigint = 0xffffffffn;
const uint64Mask: bigint = 0xffffffffffffffffn;
const prime32_1: bigint = 2654435761n;
const prime32_2: bigint = 2246822519n;
const prime32_3: bigint = 3266489917n;
const prime64_1: bigint = 11400714785074694791n;
const prime64_2: bigint = 14029467366897019727n;
const prime64_3: bigint = 1609587929392839161n;
const prime64_4: bigint = 9650029242287828579n;
const prime64_5: bigint = 2870177450012600261n;
const rrmxmxPrime: bigint = 0x9fb21c651e98df25n;
const avalanchePrime: bigint = 0x165667919e3779f9n;
const defaultSecret: Uint8Array = new Uint8Array([
  0xb8, 0xfe, 0x6c, 0x39, 0x23, 0xa4, 0x4b, 0xbe, 0x7c, 0x01, 0x81, 0x2c, 0xf7, 0x21, 0xad, 0x1c,
  0xde, 0xd4, 0x6d, 0xe9, 0x83, 0x90, 0x97, 0xdb, 0x72, 0x40, 0xa4, 0xa4, 0xb7, 0xb3, 0x67, 0x1f,
  0xcb, 0x79, 0xe6, 0x4e, 0xcc, 0xc0, 0xe5, 0x78, 0x82, 0x5a, 0xd0, 0x7d, 0xcc, 0xff, 0x72, 0x21,
  0xb8, 0x08, 0x46, 0x74, 0xf7, 0x43, 0x24, 0x8e, 0xe0, 0x35, 0x90, 0xe6, 0x81, 0x3a, 0x26, 0x4c,
  0x3c, 0x28, 0x52, 0xbb, 0x91, 0xc3, 0x00, 0xcb, 0x88, 0xd0, 0x65, 0x8b, 0x1b, 0x53, 0x2e, 0xa3,
  0x71, 0x64, 0x48, 0x97, 0xa2, 0x0d, 0xf9, 0x4e, 0x38, 0x19, 0xef, 0x46, 0xa9, 0xde, 0xac, 0xd8,
  0xa8, 0xfa, 0x76, 0x3f, 0xe3, 0x9c, 0x34, 0x3f, 0xf9, 0xdc, 0xbb, 0xc7, 0xc7, 0x0b, 0x4f, 0x1d,
  0x8a, 0x51, 0xe0, 0x4b, 0xcd, 0xb4, 0x59, 0x31, 0xc8, 0x9f, 0x7e, 0xc9, 0xd9, 0x78, 0x73, 0x64,
  0xea, 0xc5, 0xac, 0x83, 0x34, 0xd3, 0xeb, 0xc3, 0xc5, 0x81, 0xa0, 0xff, 0xfa, 0x13, 0x63, 0xeb,
  0x17, 0x0d, 0xdd, 0x51, 0xb7, 0xf0, 0xda, 0x49, 0xd3, 0x16, 0x55, 0x26, 0x29, 0xd4, 0x68, 0x9e,
  0x2b, 0x16, 0xbe, 0x58, 0x7d, 0x47, 0xa1, 0xfc, 0x8f, 0xf8, 0xb8, 0xd1, 0x7a, 0xd0, 0x31, 0xce,
  0x45, 0xcb, 0x3a, 0x8f, 0x95, 0x16, 0x04, 0x28, 0xaf, 0xd7, 0xfb, 0xca, 0xbb, 0x4b, 0x40, 0x7e,
]);
const defaultSecretWords: readonly bigint[] = Object.freeze(
  Array.from({ length: defaultSecret.length / 8 }, (_, index) => readUint64(defaultSecret, index * 8)),
);
const initialAccumulators: readonly bigint[] = Object.freeze([
  prime32_3,
  prime64_1,
  prime64_2,
  prime64_3,
  prime64_4,
  prime32_2,
  prime64_5,
  prime32_1,
]);

function uint64(value: bigint): bigint {
  return BigInt.asUintN(64, value);
}

function readUint16(bytes: Uint8Array, offset: number): bigint {
  return BigInt(bytes[offset]!) | (BigInt(bytes[offset + 1]!) << 8n);
}

function readUint32(bytes: Uint8Array, offset: number): bigint {
  return (
    BigInt(bytes[offset]!) |
    (BigInt(bytes[offset + 1]!) << 8n) |
    (BigInt(bytes[offset + 2]!) << 16n) |
    (BigInt(bytes[offset + 3]!) << 24n)
  );
}

function readUint64(bytes: Uint8Array, offset: number): bigint {
  return (
    BigInt(bytes[offset]!) |
    (BigInt(bytes[offset + 1]!) << 8n) |
    (BigInt(bytes[offset + 2]!) << 16n) |
    (BigInt(bytes[offset + 3]!) << 24n) |
    (BigInt(bytes[offset + 4]!) << 32n) |
    (BigInt(bytes[offset + 5]!) << 40n) |
    (BigInt(bytes[offset + 6]!) << 48n) |
    (BigInt(bytes[offset + 7]!) << 56n)
  );
}

function readSecret64(offset: number): bigint {
  if ((offset & 7) === 0) {
    return defaultSecretWords[offset / 8]!;
  }
  return readUint64(defaultSecret, offset);
}

function reverseBytes64(value: bigint): bigint {
  let source = value;
  let reversed = 0n;
  for (let index = 0; index < 8; index++) {
    reversed = (reversed << 8n) | (source & 0xffn);
    source >>= 8n;
  }
  return reversed;
}

function reverseBytes32(value: bigint): bigint {
  let source = value & uint32Mask;
  let reversed = 0n;
  for (let index = 0; index < 4; index++) {
    reversed = (reversed << 8n) | (source & 0xffn);
    source >>= 8n;
  }
  return reversed;
}

function rotateLeft32(value: bigint, shift: number): bigint {
  const normalized = value & uint32Mask;
  const amount = BigInt(shift);
  return ((normalized << amount) | (normalized >> (32n - amount))) & uint32Mask;
}

function rotateLeft64(value: bigint, shift: number): bigint {
  const amount = BigInt(shift);
  return uint64((value << amount) | (value >> (64n - amount)));
}

function multiply64(left: bigint, right: bigint): [bigint, bigint] {
  const product = left * right;
  return [uint64(product >> 64n), product & uint64Mask];
}

function multiplyFold64(left: bigint, right: bigint): bigint {
  const [high, low] = multiply64(left, right);
  return high ^ low;
}

function xxh64AvalancheSmall(value: bigint): bigint {
  let result = uint64(value * prime64_2);
  result ^= result >> 29n;
  result = uint64(result * prime64_3);
  return uint64(result ^ (result >> 32n));
}

function xxhAvalancheSmall(value: bigint): bigint {
  let result = value ^ (value >> 33n);
  result = uint64(result * prime64_2);
  result ^= result >> 29n;
  result = uint64(result * prime64_3);
  return uint64(result ^ (result >> 32n));
}

function xxh3Avalanche(value: bigint): bigint {
  let result = value ^ (value >> 37n);
  result = uint64(result * avalanchePrime);
  return uint64(result ^ (result >> 32n));
}

function rrmxmx(value: bigint, length: bigint): bigint {
  let result = value ^ rotateLeft64(value, 49) ^ rotateLeft64(value, 24);
  result = uint64(result * rrmxmxPrime);
  result ^= uint64((result >> 35n) + length);
  result = uint64(result * rrmxmxPrime);
  return uint64(result ^ (result >> 28n));
}

function accumulateStripe(accumulators: bigint[], bytes: Uint8Array, dataOffset: number, secretOffset: number): void {
  for (let lane = 0; lane < 8; lane++) {
    const dataValue = readUint64(bytes, dataOffset + lane * 8);
    const keyedValue = dataValue ^ readSecret64(secretOffset + lane * 8);
    accumulators[lane ^ 1] = uint64(accumulators[lane ^ 1]! + dataValue);
    accumulators[lane] = uint64(accumulators[lane]! + (keyedValue & uint32Mask) * (keyedValue >> 32n));
  }
}

function scrambleAccumulators(accumulators: bigint[]): void {
  for (let lane = 0; lane < 8; lane++) {
    let value = accumulators[lane]!;
    value ^= value >> 47n;
    value ^= readSecret64(128 + lane * 8);
    accumulators[lane] = uint64(value * prime32_1);
  }
}

function accumulateBlock(accumulators: bigint[], bytes: Uint8Array, offset: number): void {
  for (let stripe = 0; stripe < 16; stripe++) {
    accumulateStripe(accumulators, bytes, offset + stripe * stripeSize, stripe * 8);
  }
  scrambleAccumulators(accumulators);
}

function accumulate(accumulators: bigint[], bytes: Uint8Array, offset: number, length: number): void {
  let cursor = offset;
  let remaining = length;
  while (remaining > blockSize) {
    accumulateBlock(accumulators, bytes, cursor);
    cursor += blockSize;
    remaining -= blockSize;
  }
  if (remaining === 0) {
    return;
  }
  const regularStripes = Math.floor((remaining - 1) / stripeSize);
  for (let stripe = 0; stripe < regularStripes; stripe++) {
    accumulateStripe(accumulators, bytes, cursor, stripe * 8);
    cursor += stripeSize;
    remaining -= stripeSize;
  }
  cursor -= stripeSize - remaining;
  accumulateStripe(accumulators, bytes, cursor, 121);
}

export const Uint128ValueOps: GoValueOps<Uint128> = Object.freeze({
  zero: (): Uint128 => new Uint128(),
  copy: (value: Uint128): Uint128 => makeUint128(value.Hi, value.Lo),
});

function makeUint128(high: bigint, low: bigint): Uint128 {
  const result = new Uint128();
  result.Hi = high;
  result.Lo = low;
  return result;
}

function mix128(
  accumulator: Uint128,
  input0: bigint,
  input1: bigint,
  input2: bigint,
  input3: bigint,
  secretOffset: number,
): void {
  accumulator.Hi = uint64(
    accumulator.Hi + multiplyFold64(input2 ^ readSecret64(secretOffset + 16), input3 ^ readSecret64(secretOffset + 24)),
  );
  accumulator.Hi = uint64(accumulator.Hi ^ uint64(input0 + input1));
  accumulator.Lo = uint64(
    accumulator.Lo + multiplyFold64(input0 ^ readSecret64(secretOffset), input1 ^ readSecret64(secretOffset + 8)),
  );
  accumulator.Lo = uint64(accumulator.Lo ^ uint64(input2 + input3));
}

function hash64(bytes: Uint8Array): bigint {
  const length = bytes.length;
  const length64 = BigInt(length);
  if (length <= 16) {
    if (length > 8) {
      const inputLow = readUint64(bytes, 0) ^ (readSecret64(24) ^ readSecret64(32));
      const inputHigh = readUint64(bytes, length - 8) ^ (readSecret64(40) ^ readSecret64(48));
      const folded = multiplyFold64(inputLow, inputHigh);
      return xxh3Avalanche(uint64(length64 + reverseBytes64(inputLow) + inputHigh + folded));
    }
    if (length > 3) {
      const input1 = readUint32(bytes, 0);
      const input2 = readUint32(bytes, length - 4);
      const input64 = input2 + (input1 << 32n);
      const keyed = input64 ^ (readSecret64(8) ^ readSecret64(16));
      return rrmxmx(keyed, length64);
    }
    let accumulator: bigint;
    if (length === 3) {
      accumulator = (readUint16(bytes, 0) << 16n) + BigInt(bytes[2]!) + (3n << 8n);
    } else if (length === 2) {
      accumulator = ((readUint16(bytes, 0) * ((1n << 24n) + 1n)) >> 8n) + (2n << 8n);
    } else if (length === 1) {
      accumulator = BigInt(bytes[0]!) * ((1n << 24n) + (1n << 16n) + 1n) + (1n << 8n);
    } else {
      return 0x2d06800538d394c2n;
    }
    accumulator ^= 0xbe4ba423n ^ 0x396cfeb8n;
    return xxhAvalancheSmall(accumulator);
  }
  if (length <= 128) {
    let accumulator = uint64(length64 * prime64_1);
    const rounds = Math.ceil(length / 32);
    for (let round = 0; round < rounds; round++) {
      const startOffset = round * 16;
      const endOffset = length - (round + 1) * 16;
      const secretOffset = round * 32;
      accumulator = uint64(
        accumulator +
          multiplyFold64(
            readUint64(bytes, startOffset) ^ readSecret64(secretOffset),
            readUint64(bytes, startOffset + 8) ^ readSecret64(secretOffset + 8),
          ),
      );
      accumulator = uint64(
        accumulator +
          multiplyFold64(
            readUint64(bytes, endOffset) ^ readSecret64(secretOffset + 16),
            readUint64(bytes, endOffset + 8) ^ readSecret64(secretOffset + 24),
          ),
      );
    }
    return xxh3Avalanche(accumulator);
  }
  if (length <= 240) {
    let accumulator = uint64(length64 * prime64_1);
    for (let offset = 0; offset < 128; offset += 16) {
      accumulator = uint64(
        accumulator +
          multiplyFold64(
            readUint64(bytes, offset) ^ readSecret64(offset),
            readUint64(bytes, offset + 8) ^ readSecret64(offset + 8),
          ),
      );
    }
    accumulator = xxh3Avalanche(accumulator);
    const top = length & ~15;
    for (let offset = 128; offset < top; offset += 16) {
      accumulator = uint64(
        accumulator +
          multiplyFold64(
            readUint64(bytes, offset) ^ readSecret64(offset - 125),
            readUint64(bytes, offset + 8) ^ readSecret64(offset - 117),
          ),
      );
    }
    accumulator = uint64(
      accumulator +
        multiplyFold64(
          readUint64(bytes, length - 16) ^ readSecret64(119),
          readUint64(bytes, length - 8) ^ readSecret64(127),
        ),
    );
    return xxh3Avalanche(accumulator);
  }
  let accumulator = uint64(length64 * prime64_1);
  const accumulators = initialAccumulators.slice();
  accumulate(accumulators, bytes, 0, length);
  accumulator = merge64(accumulator, accumulators, 11);
  return xxh3Avalanche(accumulator);
}

function hash128(bytes: Uint8Array): Uint128 {
  const length = bytes.length;
  const length64 = BigInt(length);
  if (length <= 16) {
    if (length > 8) {
      const inputLow = readUint64(bytes, 0);
      let inputHigh = readUint64(bytes, length - 8);
      let [productHigh, productLow] = multiply64(
        inputLow ^ inputHigh ^ (readSecret64(32) ^ readSecret64(40)),
        prime64_1,
      );
      productLow = uint64(productLow + (length64 - 1n) * (1n << 54n));
      inputHigh ^= readSecret64(48) ^ readSecret64(56);
      productHigh = uint64(productHigh + inputHigh + (inputHigh & uint32Mask) * (prime32_2 - 1n));
      productLow ^= reverseBytes64(productHigh);
      let [high, low] = multiply64(productLow, prime64_2);
      high = uint64(high + productHigh * prime64_2);
      return makeUint128(xxh3Avalanche(high), xxh3Avalanche(low));
    }
    if (length > 3) {
      const inputLow = readUint32(bytes, 0);
      const inputHigh = readUint32(bytes, length - 4);
      const keyed = (inputLow + (inputHigh << 32n)) ^ (readSecret64(16) ^ readSecret64(24));
      let [high, low] = multiply64(keyed, prime64_1 + (length64 << 2n));
      high = uint64(high + (low << 1n));
      low ^= high >> 3n;
      low ^= low >> 35n;
      low = uint64(low * rrmxmxPrime);
      low ^= low >> 28n;
      return makeUint128(xxh3Avalanche(high), uint64(low));
    }
    if (length === 0) {
      return makeUint128(0x99aa06d3014798d8n, 0x6001c324468d497fn);
    }
    let low: bigint;
    if (length === 3) {
      low = (readUint16(bytes, 0) << 16n) + BigInt(bytes[2]!) + (3n << 8n);
    } else if (length === 2) {
      low = ((readUint16(bytes, 0) * ((1n << 24n) + 1n)) >> 8n) + (2n << 8n);
    } else {
      low = BigInt(bytes[0]!) * ((1n << 24n) + (1n << 16n) + 1n) + (1n << 8n);
    }
    let high = rotateLeft32(reverseBytes32(low), 13);
    low ^= 0xbe4ba423n ^ 0x396cfeb8n;
    high ^= 0x1cad21f7n ^ 0x2c81017cn;
    return makeUint128(xxh64AvalancheSmall(high), xxh64AvalancheSmall(low));
  }
  const accumulator = makeUint128(0n, uint64(length64 * prime64_1));
  if (length <= 128) {
    const rounds = Math.ceil(length / 32);
    for (let round = rounds - 1; round >= 0; round--) {
      const startOffset = round * 16;
      const endOffset = length - (round + 1) * 16;
      mix128(
        accumulator,
        readUint64(bytes, startOffset),
        readUint64(bytes, startOffset + 8),
        readUint64(bytes, endOffset),
        readUint64(bytes, endOffset + 8),
        round * 32,
      );
    }
    finalizeMedium128(accumulator, length64);
    return accumulator;
  }
  if (length <= 240) {
    for (let offset = 0; offset < 128; offset += 32) {
      mix128(
        accumulator,
        readUint64(bytes, offset),
        readUint64(bytes, offset + 8),
        readUint64(bytes, offset + 16),
        readUint64(bytes, offset + 24),
        offset,
      );
    }
    accumulator.Hi = xxh3Avalanche(accumulator.Hi);
    accumulator.Lo = xxh3Avalanche(accumulator.Lo);
    const top = length & ~31;
    for (let offset = 128; offset < top; offset += 32) {
      mix128(
        accumulator,
        readUint64(bytes, offset),
        readUint64(bytes, offset + 8),
        readUint64(bytes, offset + 16),
        readUint64(bytes, offset + 24),
        offset - 125,
      );
    }
    mix128(
      accumulator,
      readUint64(bytes, length - 16),
      readUint64(bytes, length - 8),
      readUint64(bytes, length - 32),
      readUint64(bytes, length - 24),
      103,
    );
    finalizeMedium128(accumulator, length64);
    return accumulator;
  }
  accumulator.Hi = uint64(~uint64(length64 * prime64_2));
  const accumulators = initialAccumulators.slice();
  accumulate(accumulators, bytes, 0, length);
  accumulator.Lo = xxh3Avalanche(merge64(accumulator.Lo, accumulators, 11));
  accumulator.Hi = xxh3Avalanche(merge64(accumulator.Hi, accumulators, 117));
  return accumulator;
}

function finalizeMedium128(accumulator: Uint128, length: bigint): void {
  const oldHigh = accumulator.Hi;
  const oldLow = accumulator.Lo;
  accumulator.Hi = uint64(oldLow * prime64_1 + oldHigh * prime64_4 + length * prime64_2);
  accumulator.Lo = uint64(oldHigh + oldLow);
  accumulator.Hi = uint64(-xxh3Avalanche(accumulator.Hi));
  accumulator.Lo = xxh3Avalanche(accumulator.Lo);
}

function merge64(accumulator: bigint, accumulators: readonly bigint[], secretOffset: number): bigint {
  let result = accumulator;
  for (let lane = 0; lane < 8; lane += 2) {
    result = uint64(
      result +
        multiplyFold64(
          accumulators[lane]! ^ readSecret64(secretOffset + lane * 8),
          accumulators[lane + 1]! ^ readSecret64(secretOffset + lane * 8 + 8),
        ),
    );
  }
  return result;
}

export class Hasher {
  private accumulators: bigint[] = new Array<bigint>(8).fill(0n);
  private blockCount = 0n;
  private bufferLength = 0;
  private initialized = false;
  private readonly buffer = new Uint8Array(bufferSize);

  constructor(value?: Hasher) {
    if (value !== undefined) {
      this.accumulators = value.accumulators.slice();
      this.blockCount = value.blockCount;
      this.bufferLength = value.bufferLength;
      this.initialized = value.initialized;
      this.buffer.set(value.buffer);
    }
  }

  Write(p: GoSlice<byte>): [int, GoError] {
    const bytes = new Uint8Array(p.length);
    for (
      let rangeSlice = p, rangeLength = rangeSlice.length, rangeIndex = 0;
      rangeIndex < rangeLength;
      rangeIndex++
    ) {
      bytes[rangeIndex] = GoSliceLoad(rangeSlice, rangeIndex, GoNumberValueOps);
    }
    this.update(bytes);
    return [p.length as int, undefined];
  }

  WriteString(s: string): [int, GoError] {
    const bytes = StringUtf8Bytes(s);
    this.update(bytes);
    return [bytes.length as int, undefined];
  }

  Sum64(): bigint {
    this.initialize();
    if (this.blockCount === 0n) {
      return hash64(this.buffer.subarray(0, this.bufferLength));
    }
    const length = uint64(this.blockCount * BigInt(blockSize) + BigInt(this.bufferLength));
    let accumulator = uint64(length * prime64_1);
    const accumulators = this.accumulators.slice();
    if (this.bufferLength > 0) {
      accumulate(accumulators, this.buffer, 0, this.bufferLength);
    }
    accumulator = merge64(accumulator, accumulators, 11);
    return xxh3Avalanche(accumulator);
  }

  Sum128(): Uint128 {
    this.initialize();
    if (this.blockCount === 0n) {
      return hash128(this.buffer.subarray(0, this.bufferLength));
    }
    const length = uint64(this.blockCount * BigInt(blockSize) + BigInt(this.bufferLength));
    const accumulators = this.accumulators.slice();
    if (this.bufferLength > 0) {
      accumulate(accumulators, this.buffer, 0, this.bufferLength);
    }
    const low = xxh3Avalanche(merge64(uint64(length * prime64_1), accumulators, 11));
    const high = xxh3Avalanche(merge64(uint64(~uint64(length * prime64_2)), accumulators, 117));
    return makeUint128(high, low);
  }

  Reset(): void {
    this.accumulators = initialAccumulators.slice();
    this.blockCount = 0n;
    this.bufferLength = 0;
  }

  private initialize(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.Reset();
    }
  }

  private update(bytes: Uint8Array): void {
    this.initialize();
    let offset = 0;
    while (this.bufferLength === 0 && bytes.length - offset > bufferSize) {
      accumulateBlock(this.accumulators, bytes, offset);
      offset += blockSize;
      this.blockCount = uint64(this.blockCount + 1n);
    }
    while (offset < bytes.length) {
      if (this.bufferLength < bufferSize) {
        const count = Math.min(bufferSize - this.bufferLength, bytes.length - offset);
        this.buffer.set(bytes.subarray(offset, offset + count), this.bufferLength);
        this.bufferLength += count;
        offset += count;
        continue;
      }
      accumulateBlock(this.accumulators, this.buffer, 0);
      this.blockCount = uint64(this.blockCount + 1n);
      this.buffer.copyWithin(0, blockSize, bufferSize);
      this.bufferLength = stripeSize;
    }
  }
}

export const HasherValueOps: GoValueOps<Hasher> = Object.freeze({
  zero: (): Hasher => new Hasher(),
  copy: (value: Hasher): Hasher => new Hasher(value),
});

export function HashString128(s: string): Uint128 {
  return hash128(StringUtf8Bytes(s));
}

export function New(): Hasher {
  return new Hasher();
}

function writeUint64Bytes<Length extends string>(out: GoArray<byte, Length>, offset: number, value: bigint): void {
  const normalized = uint64(value);
  let index = offset;
  for (let shift = 56n; shift >= 0n; shift -= 8n) {
    GoArrayStore(out, index as int, Number((normalized >> shift) & 0xffn) as byte, GoNumberValueOps);
    index++;
  }
}
