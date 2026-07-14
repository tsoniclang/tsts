import type { byte, int } from "../scalars.js";
import type { GoError, GoSlice } from "../compat.js";
import { GoAppend } from "../compat.js";

const offset64: bigint = 14695981039346656037n;
const prime64: bigint = 1099511628211n;
const mask64: bigint = (1n << 64n) - 1n;

export interface Hash64 {
  Write(p: GoSlice<byte>): [int, GoError];
  Sum64(): bigint;
  Sum(p: GoSlice<byte>): GoSlice<byte>;
  Reset(): void;
}

class fnv64a implements Hash64 {
  private value: bigint = offset64;

  Write(p: GoSlice<byte>): [int, GoError] {
    for (const byteValue of p) {
      this.value ^= BigInt(byteValue & 0xff);
      this.value = (this.value * prime64) & mask64;
    }
    return [p.length as int, undefined];
  }

  Sum64(): bigint {
    return this.value;
  }

  Sum(p: GoSlice<byte>): GoSlice<byte> {
    return GoAppend(
      p,
      Number((this.value >> 56n) & 0xffn) as byte,
      Number((this.value >> 48n) & 0xffn) as byte,
      Number((this.value >> 40n) & 0xffn) as byte,
      Number((this.value >> 32n) & 0xffn) as byte,
      Number((this.value >> 24n) & 0xffn) as byte,
      Number((this.value >> 16n) & 0xffn) as byte,
      Number((this.value >> 8n) & 0xffn) as byte,
      Number(this.value & 0xffn) as byte,
    );
  }

  Reset(): void {
    this.value = offset64;
  }
}

export function New64a(): Hash64 {
  return new fnv64a();
}
