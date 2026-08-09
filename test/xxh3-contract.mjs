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
  pathToFileURL(join(outputRoot, "runtime", "slice.js")).href
);

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
  "Δcompiler🙂",
  "\ud800",
  "\udc00",
  "a\ud800b",
  "x".repeat(31),
  "x".repeat(32),
  "x".repeat(33),
  ...Array.from({ length: 10_000 }, (_, index) =>
    `source-file:${index}:${(index * 2_654_435_761) >>> 0}`,
  ),
];
const digests = new Set();
for (const value of corpus) {
  const first = implementation.HashString128(value);
  const second = implementation.HashString128(value);
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
  ["Δ", "compiler", "🙂"],
  ["\ud83d", "\ude42"],
  ["\ud83d", "", "\ude42"],
  ["\ud800", "x"],
  ["x".repeat(2048), "x".repeat(2049)],
]) {
  const value = chunks.join("");
  const hasher = implementation.New();
  let written = 0;
  for (const chunk of chunks) {
    const [count, error] = implementation.Hasher.WriteString(hasher, chunk);
    written += count;
    assert.equal(error, undefined);
  }
  assert.equal(written, new TextEncoder().encode(value).length);
  assertSameDigest(
    implementation.Hasher.Sum128(hasher),
    implementation.HashString128(value),
    `streaming for ${JSON.stringify(value)}`,
  );
  implementation.Hasher.Reset(hasher);
  assertSameDigest(
    implementation.Hasher.Sum128(hasher),
    implementation.HashString128(""),
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
  implementation.HashString128(unicode),
  "string and UTF-8 byte hashing",
);

const projected = implementation.HashString128("canonical-bytes").Bytes();
assert.equal(projected.length, 16);
const projectedBytes = Array.from(
  { length: 16 },
  (_, index) => projected.get(index),
);
assert.equal(projectedBytes.every((value) => value >= 0 && value <= 255), true);

console.log(
  `xxh3: ${corpus.length} unique inputs; streaming, reset, and bytes verified`,
);
