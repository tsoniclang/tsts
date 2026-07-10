import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool, byte, int } from "../../../go/scalars.js";
import type { GoError, GoSlice } from "../../../go/compat.js";
import type { Hasher, Uint128 } from "../../../go/github.com/zeebo/xxh3.js";
import { hashWrite32, hashWrite64 } from "./state.js";

class ZeroUint128 implements Uint128 {
  readonly Hi = 0n;
  readonly Lo = 0n;

  Bytes(): GoSlice<byte> {
    return [];
  }

  IsZero(): bool {
    return true as bool;
  }

  String(): string {
    return "00000000000000000000000000000000";
  }
}

class CapturingHasher implements Hasher {
  readonly bytes: GoSlice<byte> = [];

  Write(bytes: GoSlice<byte>): [int, GoError] {
    this.bytes.push(...bytes);
    return [bytes.length as int, undefined];
  }

  WriteString(value: string): [int, GoError] {
    const bytes = globalThis.Array.from(new globalThis.TextEncoder().encode(value));
    this.bytes.push(...bytes);
    return [bytes.length as int, undefined];
  }

  Sum64(): bigint {
    return 0n;
  }

  Sum128(): Uint128 {
    return new ZeroUint128();
  }

  Reset(): void {
    this.bytes.length = 0;
  }
}

test("hashWrite32 emits Go uint32 little-endian bytes", () => {
  const hasher = new CapturingHasher();
  hashWrite32(hasher, 0x01020304);
  hashWrite32(hasher, -1);

  assert.deepEqual(hasher.bytes, [4, 3, 2, 1, 255, 255, 255, 255]);
});

test("hashWrite64 accepts number and exact uint64 bigint carriers", () => {
  const hasher = new CapturingHasher();
  hashWrite64(hasher, 0x0102030405060708n);
  hashWrite64(hasher, 0x010203040506);
  hashWrite64(hasher, -2);

  assert.deepEqual(hasher.bytes, [
    8, 7, 6, 5, 4, 3, 2, 1,
    6, 5, 4, 3, 2, 1, 0, 0,
    254, 255, 255, 255, 255, 255, 255, 255,
  ]);
});
