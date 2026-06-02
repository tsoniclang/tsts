import test from "node:test";
import assert from "node:assert/strict";

import { encodeVLQ, Generator } from "./index.js";

test("encodes zero", () => {
  assert.strictEqual(encodeVLQ(0), "A");
});

test("encodes small positive", () => {
  assert.strictEqual(encodeVLQ(1), "C");
  assert.strictEqual(encodeVLQ(2), "E");
});

test("encodes small negative", () => {
  assert.strictEqual(encodeVLQ(-1), "D");
});

test("encodes larger values with multi char output", () => {
  const enc = encodeVLQ(100);
  assert.ok(enc.length >= 2);
});

test("creates empty source map", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const raw = gen.rawSourceMap();
  assert.strictEqual(raw.version, 3);
  assert.strictEqual(raw.file, "out.js");
  assert.deepStrictEqual(raw.sources, []);
  assert.deepStrictEqual(raw.names, []);
  assert.strictEqual(raw.mappings, "");
});

test("add source deduplicates", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const a = gen.addSource("/output/foo.ts");
  const b = gen.addSource("/output/foo.ts");
  assert.strictEqual(b, a);
  const c = gen.addSource("/output/bar.ts");
  assert.notStrictEqual(c, a);
});

test("add name deduplicates", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const a = gen.addName("foo");
  const b = gen.addName("foo");
  assert.strictEqual(b, a);
  const c = gen.addName("bar");
  assert.notStrictEqual(c, a);
});

test("add source mapping produces vlq output", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const src = gen.addSource("/output/foo.ts");
  gen.addSourceMapping(0, 0, src, 0, 0);
  gen.addSourceMapping(0, 5, src, 0, 5);
  const raw = gen.rawSourceMap();
  assert.ok(raw.mappings.length > 0);
  assert.strictEqual(raw.sources.length, 1);
  assert.ok(raw.sources[0]!.endsWith("foo.ts"));
});

test("to base64 data url produces valid data url", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const url = gen.toBase64DataURL();
  assert.ok(url.startsWith("data:application/json;base64,"));
});

test("rejects backtracking generated line", () => {
  const gen = new Generator("out.js", "", "/output", {
    currentDirectory: "/output",
    useCaseSensitiveFileNames: true,
  });
  const src = gen.addSource("/output/foo.ts");
  gen.addSourceMapping(5, 0, src, 0, 0);
  assert.throws(() => { gen.addSourceMapping(3, 0, src, 0, 0); });
});
