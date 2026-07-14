import assert from "node:assert/strict";
import { test } from "node:test";
import type { byte, int } from "../../scalars.js";
import type { GoArray, GoSlice } from "../../compat.js";
import { GoArrayLoad, GoNumberValueOps, GoSliceBuild, GoSliceStore } from "../../compat.js";
import type { Hasher, Uint128 } from "./xxh3.js";
import { HasherValueOps, HashString128, New, Uint128ValueOps } from "./xxh3.js";

interface HashVector {
  readonly length: number;
  readonly sum64: bigint;
  readonly high: bigint;
  readonly low: bigint;
}

function makeByteSlice(length: number, valueAt: (index: number) => number): GoSlice<byte> {
  return GoSliceBuild<byte>(length as int, length as int, GoNumberValueOps, (slice) => {
    for (let index = 0; index < length; index++) {
      GoSliceStore(slice, index as int, valueAt(index) as byte, GoNumberValueOps);
    }
  });
}

function makeOracleBytes(start: number, length: number): GoSlice<byte> {
  return makeByteSlice(length, (index) => (start + index + 1) % 251);
}

function arrayHex<Length extends string>(bytes: GoArray<byte, Length>): string {
  let result = "";
  for (let index = 0; index < bytes.length; index++) {
    result += GoArrayLoad(bytes, index as int, GoNumberValueOps).toString(16).padStart(2, "0");
  }
  return result;
}

function wordHex(value: bigint): string {
  return value.toString(16).padStart(16, "0");
}

function assertHash(actual: Hasher, expected: Hasher, message: string): void {
  assert.equal(actual.Sum64(), expected.Sum64(), `${message}: Sum64`);
  const actual128 = actual.Sum128();
  const expected128 = expected.Sum128();
  assert.equal(actual128.Hi, expected128.Hi, `${message}: Sum128.Hi`);
  assert.equal(actual128.Lo, expected128.Lo, `${message}: Sum128.Lo`);
}

test("Hasher matches pinned zeebo/xxh3 v1.1.0 Go oracle vectors", () => {
  const vectors: readonly HashVector[] = [
    { length: 0, sum64: 0x2d06800538d394c2n, high: 0x99aa06d3014798d8n, low: 0x6001c324468d497fn },
    { length: 1, sum64: 0xe12ef9d2eb86ceebn, high: 0x51025a4491835505n, low: 0xe12ef9d2eb86ceebn },
    { length: 3, sum64: 0xebce9b7632ae733bn, high: 0xac77eb88cbc4b8d4n, low: 0xebce9b7632ae733bn },
    { length: 4, sum64: 0x988b7b9033ac4622n, high: 0x49a04899597a3567n, low: 0x537653a0d9955b86n },
    { length: 8, sum64: 0x16f217ea16232297n, high: 0x2ab463fddb09a0b8n, low: 0x3e8675c57268fb02n },
    { length: 9, sum64: 0x17d143e7f447850an, high: 0xe338e616502be361n, low: 0x3c4087b7dea54fc0n },
    { length: 16, sum64: 0xeb5aeb9a32450f6an, high: 0x6d84a882f6411b41n, low: 0xeada823104bd7174n },
    { length: 17, sum64: 0x6d458e1fff494078n, high: 0x9ac14e2c3fe59a83n, low: 0xacda8373034d6aafn },
    { length: 32, sum64: 0xbfd49bed2d1502ebn, high: 0x6558716845a29a6cn, low: 0xd4e2dfc12b4b57edn },
    { length: 33, sum64: 0xeaaad53957a947fcn, high: 0x511310aba0443aacn, low: 0xe0e91dd44e49b7d0n },
    { length: 64, sum64: 0xc82013245d8f2587n, high: 0x21bfcfd7d148a3dfn, low: 0x639fbd9cf9bdfb51n },
    { length: 65, sum64: 0x8810a33c748c6017n, high: 0x2f2ef5c0f071aabfn, low: 0x839a6f242d0884a1n },
    { length: 128, sum64: 0xce22cae9106851dfn, high: 0x763fdbd9fc602233n, low: 0x7ac9e58028da0fc7n },
    { length: 129, sum64: 0x7d4fc663f5958d40n, high: 0x4c8ce7bd2a6024b3n, low: 0x88cb4305c9a32490n },
    { length: 239, sum64: 0xe81761357e2a0081n, high: 0x8250ad9a43eff11bn, low: 0xfcb0da8465ed3e56n },
    { length: 240, sum64: 0xa5a910b2d7e065b0n, high: 0x2007e6f83d506ea3n, low: 0xdde80e1ba2971e09n },
    { length: 241, sum64: 0xb6515f490cdd4ce5n, high: 0x956bc01534a3752bn, low: 0xb6515f490cdd4ce5n },
    { length: 1024, sum64: 0x546f61a5b0b850c1n, high: 0x5810ff822ad52808n, low: 0x546f61a5b0b850c1n },
    { length: 1088, sum64: 0x3e19d2125c286a5an, high: 0xda6203c4721e38fan, low: 0x3e19d2125c286a5an },
    { length: 1089, sum64: 0xe6b8f8f8df938429n, high: 0x3c2d882be82e3ee0n, low: 0xe6b8f8f8df938429n },
    { length: 2048, sum64: 0x97ca16b9cb0322d1n, high: 0x566400e724b4cb56n, low: 0x97ca16b9cb0322d1n },
    { length: 2176, sum64: 0x55813c4454400e56n, high: 0x3653c4c1e438ea14n, low: 0x55813c4454400e56n },
    { length: 4095, sum64: 0x268198759d7bdf74n, high: 0x8b81e7baaa6cdbacn, low: 0x268198759d7bdf74n },
  ];

  for (const vector of vectors) {
    const hasher = New();
    assert.deepEqual(hasher.Write(makeOracleBytes(0, vector.length)), [vector.length, undefined]);
    assert.equal(hasher.Sum64(), vector.sum64, `length ${vector.length}: Sum64`);
    const sum128 = hasher.Sum128();
    assert.equal(sum128.Hi, vector.high, `length ${vector.length}: Sum128.Hi`);
    assert.equal(sum128.Lo, vector.low, `length ${vector.length}: Sum128.Lo`);
    assert.equal(arrayHex(sum128.Bytes()), `${wordHex(vector.high)}${wordHex(vector.low)}`, `length ${vector.length}: Bytes`);
  }
});

test("HashString128 and WriteString match pinned Go UTF-8 vectors", () => {
  const vectors: ReadonlyArray<readonly [string, number, bigint, bigint]> = [
    ["", 0, 0x99aa06d3014798d8n, 0x6001c324468d497fn],
    ["?", 1, 0x13941ad4ddb2863fn, 0x8b72305f19fe690bn],
    ["abc", 3, 0x06b05ab6733a6185n, 0x78af5f94892f3950n],
    ["TypeScript", 10, 0x97c498f99ae1ab3bn, 0xccbe4346114149abn],
    ["é", 2, 0x90326970ab18793an, 0xf7940a006cf10cb3n],
    ["𝄞", 4, 0x5cfe3b4e2acf634en, 0xeb150287323d9b86n],
    ["\ud800", 3, 0x5d8223c465c8d5f1n, 0xdaab8382539269d0n],
    ["\udc00", 3, 0x5283f68ddfa3b606n, 0x86da70549832b067n],
    ["\ud800\udc00", 4, 0x4320d822fd3d1eban, 0x1142e3ee7545a0b2n],
    ["🚀".repeat(8), 32, 0xb528a540174ef751n, 0x62179dbf236bb144n],
  ];

  for (const [input, byteLength, high, low] of vectors) {
    const direct = HashString128(input);
    assert.equal(direct.Hi, high, `${JSON.stringify(input)}: HashString128.Hi`);
    assert.equal(direct.Lo, low, `${JSON.stringify(input)}: HashString128.Lo`);
    const hasher = New();
    assert.deepEqual(hasher.WriteString(input), [byteLength, undefined]);
    const streamed = hasher.Sum128();
    assert.equal(streamed.Hi, high, `${JSON.stringify(input)}: WriteString.Hi`);
    assert.equal(streamed.Lo, low, `${JSON.stringify(input)}: WriteString.Lo`);
  }
});

test("Hasher chunking matches pinned streaming-boundary vectors", () => {
  const vectors: ReadonlyArray<readonly [readonly number[], bigint, bigint, bigint]> = [
    [[1088, 1], 0xe6b8f8f8df938429n, 0x3c2d882be82e3ee0n, 0xe6b8f8f8df938429n],
    [[1088, 1088], 0x55813c4454400e56n, 0x3653c4c1e438ea14n, 0x55813c4454400e56n],
    [
      [1, 63, 64, 65, 127, 128, 129, 239, 240, 241, 512, 1024, 1262],
      0x268198759d7bdf74n,
      0x8b81e7baaa6cdbacn,
      0x268198759d7bdf74n,
    ],
  ];

  for (const [chunks, sum64, high, low] of vectors) {
    const hasher = New();
    let offset = 0;
    for (const chunk of chunks) {
      hasher.Write(makeOracleBytes(offset, chunk));
      offset += chunk;
    }
    assert.equal(hasher.Sum64(), sum64, `chunks ${chunks.join(",")}: Sum64`);
    const sum128 = hasher.Sum128();
    assert.equal(sum128.Hi, high, `chunks ${chunks.join(",")}: Sum128.Hi`);
    assert.equal(sum128.Lo, low, `chunks ${chunks.join(",")}: Sum128.Lo`);
  }
});

test("Uint128ValueOps preserves mutable Go zero and copy semantics", () => {
  const value = Uint128ValueOps.zero();
  assert.equal(value.Hi, 0n);
  assert.equal(value.Lo, 0n);
  assert.equal(arrayHex(value.Bytes()), "00000000000000000000000000000000");

  value.Hi = 0x0123456789abcdefn;
  value.Lo = 0xfedcba9876543210n;
  const copy = Uint128ValueOps.copy(value);
  assert.notStrictEqual(copy, value);
  assert.equal(arrayHex(copy.Bytes()), "0123456789abcdeffedcba9876543210");

  copy.Hi = 0xffffffffffffffffn;
  copy.Lo = 1n;
  assert.equal(value.Hi, 0x0123456789abcdefn);
  assert.equal(value.Lo, 0xfedcba9876543210n);
  assert.equal(arrayHex(copy.Bytes()), "ffffffffffffffff0000000000000001");
});

test("HasherValueOps copies independent state across stream boundaries", () => {
  const scenarios: ReadonlyArray<readonly [string, readonly number[]]> = [
    ["zero value", []],
    ["short finalizer", [240]],
    ["long finalizer", [241]],
    ["full block", [1024]],
    ["full buffer", [1088]],
    ["buffer flush", [1088, 1]],
    ["buffered block continuation", [512, 576, 960]],
    ["two full buffers", [1088, 1088]],
    ["direct block path", [2177]],
  ];

  for (const [name, chunks] of scenarios) {
    const source = HasherValueOps.zero();
    let prefixLength = 0;
    for (const chunk of chunks) {
      source.Write(makeOracleBytes(prefixLength, chunk));
      prefixLength += chunk;
    }
    const copy = HasherValueOps.copy(source);
    assert.notStrictEqual(copy, source, `${name}: aggregate copy identity`);

    const sourceTail = makeOracleBytes(prefixLength, 37);
    const copyTail = makeByteSlice(43, (index) => (index * 73 + prefixLength * 11 + 19) & 0xff);
    source.Write(sourceTail);
    copy.Write(copyTail);

    const expectedSource = New();
    expectedSource.Write(makeOracleBytes(0, prefixLength + 37));
    const expectedCopy = New();
    expectedCopy.Write(makeOracleBytes(0, prefixLength));
    expectedCopy.Write(makeByteSlice(43, (index) => (index * 73 + prefixLength * 11 + 19) & 0xff));
    assertHash(source, expectedSource, `${name}: source branch`);
    assertHash(copy, expectedCopy, `${name}: copied branch`);

    const copyBeforeReset: Uint128 = copy.Sum128();
    source.Reset();
    assert.equal(source.Sum64(), 0x2d06800538d394c2n, `${name}: Reset`);
    assert.equal(copy.Sum128().Hi, copyBeforeReset.Hi, `${name}: copy survives source Reset.Hi`);
    assert.equal(copy.Sum128().Lo, copyBeforeReset.Lo, `${name}: copy survives source Reset.Lo`);
  }
});
