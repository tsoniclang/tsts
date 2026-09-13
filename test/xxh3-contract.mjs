import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [repositoryRoot] = process.argv.slice(2);
if (repositoryRoot === undefined) {
  throw new Error("repository root is required");
}

const outputRoot = join(repositoryRoot, ".temp", "target", "out");
const contract = JSON.parse(
  await readFile(
    join(repositoryRoot, "implementations", "xxh3", "contract.json"),
    "utf8",
  ),
);
if (
  typeof contract.source !== "string" ||
  !contract.source.startsWith("target/") ||
  !contract.source.endsWith(".ts")
) {
  throw new Error("XXH3 contract source must be a target TypeScript path");
}
const emittedImplementation = contract.source.slice("target/".length, -3) + ".js";
const implementation = await import(
  pathToFileURL(join(outputRoot, emittedImplementation)).href
);
const { RuntimeSlice } = await import(
  pathToFileURL(join(outputRoot, "node_modules", "@gotots", "runtime", "slice.js")).href
);

const { GoString } = await import(
  pathToFileURL(join(outputRoot, "node_modules", "@gotots", "runtime", "string-value.js")).href
);

function utf8Bytes(value) {
  return String.fromCharCode(...new TextEncoder().encode(value));
}

function digestKey(value) {
  return `${value.Hi}:${value.Lo}`;
}

function assertSameDigest(actual, expected, message) {
  assert.equal(actual.Hi, expected.Hi, `${message}: high word differs`);
  assert.equal(actual.Lo, expected.Lo, `${message}: low word differs`);
}

const corpus = [
  "",
  "a",
  "ab",
  "abc",
  "typescript",
  "TypeScript",
  "typescript\0",
  "typescript-go",
  utf8Bytes("Δcompiler🙂"),
  "\xff",
  "\x80",
  "a\xc3b",
  "x".repeat(31),
  "x".repeat(32),
  "x".repeat(33),
  ...Array.from({ length: 10_000 }, (_, index) =>
    `source-file:${index}:${(index * 2_654_435_761) >>> 0}`,
  ),
];
const digests = new Set();
for (const value of corpus) {
  const first = implementation.HashString128(GoString.fromText(value));
  const second = implementation.HashString128(GoString.fromText(value));
  assertSameDigest(second, first, `determinism for ${JSON.stringify(value)}`);
  const key = digestKey(first);
  assert.equal(digests.has(key), false, `collision for ${JSON.stringify(value)}`);
  digests.add(key);
}

for (const chunks of [
  [""],
  ["a"],
  ["type", "script"],
  ["one:", "two:", "three"],
  [utf8Bytes("Δ"), "compiler", utf8Bytes("🙂")],
  ["\xf0\x9f", "\x99\x82"],
  ["\xf0\x9f", "", "\x99\x82"],
  ["\xff", "x"],
  ["x".repeat(2048), "x".repeat(2049)],
]) {
  const value = chunks.join("");
  const hasher = implementation.New();
  let written = 0;
  for (const chunk of chunks) {
    const [count, error] = implementation.Hasher.WriteString(hasher, GoString.fromText(chunk));
    written += count;
    assert.equal(error, undefined);
  }
  assert.equal(written, value.length);
  assertSameDigest(
    implementation.Hasher.Sum128(hasher),
    implementation.HashString128(GoString.fromText(value)),
    `streaming for ${JSON.stringify(value)}`,
  );
  implementation.Hasher.Reset(hasher);
  assertSameDigest(
    implementation.Hasher.Sum128(hasher),
    implementation.HashString128(GoString.empty),
    `reset for ${JSON.stringify(value)}`,
  );
}

const bytes = Array.from({ length: 257 }, (_, index) => index & 0xff);
const byteSlice = RuntimeSlice.literal(bytes);
const firstByteHasher = implementation.New();
const secondByteHasher = implementation.New();
const [firstByteCount, firstByteError] = implementation.Hasher.Write(
  firstByteHasher,
  byteSlice,
);
const [secondByteCount, secondByteError] = implementation.Hasher.Write(
  secondByteHasher,
  byteSlice,
);
assert.equal(firstByteCount, bytes.length);
assert.equal(secondByteCount, bytes.length);
assert.equal(firstByteError, undefined);
assert.equal(secondByteError, undefined);
assertSameDigest(
  implementation.Hasher.Sum128(firstByteHasher),
  implementation.Hasher.Sum128(secondByteHasher),
  "byte-slice determinism",
);
assertSameDigest(
  implementation.Hasher.Sum128(firstByteHasher),
  implementation.HashString128(GoString.fromText(String.fromCharCode(...bytes))),
  "all-byte string and slice hashing",
);

const unicode = "Δcompiler🙂";
const unicodeHasher = implementation.New();
const [unicodeByteCount, unicodeByteError] = implementation.Hasher.Write(
  unicodeHasher,
  RuntimeSlice.literal([...new TextEncoder().encode(unicode)]),
);
assert.equal(unicodeByteCount, new TextEncoder().encode(unicode).length);
assert.equal(unicodeByteError, undefined);
assertSameDigest(
  implementation.Hasher.Sum128(unicodeHasher),
  implementation.HashString128(GoString.fromText(utf8Bytes(unicode))),
  "string and UTF-8 byte hashing",
);

const projected = implementation.HashString128(GoString.fromText("canonical-bytes")).Bytes();
assert.equal(projected.length, 16);
const projectedBytes = Array.from(
  { length: 16 },
  (_, index) => projected.get(index),
);
assert.equal(projectedBytes.every((value) => value >= 0 && value <= 255), true);

const wide = implementation.Uint128.$make(0x8000_0000_0000_0000n, 1n);
assert.deepEqual(
  Array.from({ length: 16 }, (_, index) => wide.Bytes().get(index)),
  [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
);
assertSameDigest(implementation.Uint128.$copy(wide), wide, "wide-word copy");
const assigned = implementation.Uint128.$zero();
const retainedStorage = implementation.Uint128.$storageOf(assigned);
implementation.Uint128.$assign(assigned, wide);
assert.equal(implementation.Uint128.$storageOf(assigned), retainedStorage);
assert.deepEqual(retainedStorage, { Hi: wide.Hi, Lo: wide.Lo });
const independent = implementation.Uint128.$copy(assigned);
implementation.Uint128.$assign(assigned, implementation.Uint128.$zero());
assert.deepEqual(retainedStorage, { Hi: 0n, Lo: 0n });
assertSameDigest(independent, wide, "assignment preserves an independent copy");
implementation.Uint128.$assign(independent, independent);
assertSameDigest(independent, wide, "self assignment preserves both words");
const zeroStorage = implementation.Uint128.$zeroStorage();
assert.deepEqual(zeroStorage, { Hi: 0n, Lo: 0n });
assertSameDigest(
  implementation.Uint128.$fromStorage(zeroStorage),
  implementation.Uint128.$zero(),
  "canonical storage zero",
);

console.log(
  `xxh3: ${corpus.length} unique inputs; streaming, reset, and bytes verified`,
);
