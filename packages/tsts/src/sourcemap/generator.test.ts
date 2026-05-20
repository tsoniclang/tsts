import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { encodeVLQ, Generator } from "../../src/sourcemap/index.js";

describe("sourcemap — encodeVLQ", () => {
  it("encodes 0", () => {
    assert.equal(encodeVLQ(0), "A");
  });

  it("encodes small positive", () => {
    assert.equal(encodeVLQ(1), "C");   // 1 << 1 = 2 → 'C'
    assert.equal(encodeVLQ(2), "E");   // 2 << 1 = 4 → 'E'
  });

  it("encodes small negative", () => {
    assert.equal(encodeVLQ(-1), "D");  // (1 << 1) + 1 = 3 → 'D'
  });

  it("encodes larger values with multi-char output", () => {
    // 100 → multi-char output
    const enc = encodeVLQ(100);
    assert.ok(enc.length >= 2);
  });
});

describe("sourcemap — Generator basics", () => {
  it("creates empty source map", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const raw = gen.rawSourceMap();
    assert.equal(raw.version, 3);
    assert.equal(raw.file, "out.js");
    assert.deepEqual(raw.sources, []);
    assert.deepEqual(raw.names, []);
    assert.equal(raw.mappings, "");
  });

  it("addSource and deduplicates", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const a = gen.addSource("/output/foo.ts");
    const b = gen.addSource("/output/foo.ts");
    assert.equal(a, b);
    const c = gen.addSource("/output/bar.ts");
    assert.notEqual(a, c);
  });

  it("addName and deduplicates", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const a = gen.addName("foo");
    const b = gen.addName("foo");
    assert.equal(a, b);
    const c = gen.addName("bar");
    assert.notEqual(a, c);
  });

  it("addSourceMapping produces VLQ output", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const src = gen.addSource("/output/foo.ts");
    gen.addSourceMapping(0, 0, src, 0, 0);
    gen.addSourceMapping(0, 5, src, 0, 5);
    const raw = gen.rawSourceMap();
    assert.ok(raw.mappings.length > 0);
    // Source path is relativized via getRelativePathToDirectoryOrUrl,
    // matching TS-Go behavior (leading-slash output when paths share root).
    assert.equal(raw.sources.length, 1);
    assert.ok(raw.sources[0]!.endsWith("foo.ts"));
  });

  it("toBase64DataURL produces a valid data URL", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const url = gen.toBase64DataURL();
    assert.ok(url.startsWith("data:application/json;base64,"));
  });

  it("rejects backtracking generated line", () => {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const src = gen.addSource("/output/foo.ts");
    gen.addSourceMapping(5, 0, src, 0, 0);
    assert.throws(() => gen.addSourceMapping(3, 0, src, 0, 0), /backtrack/);
  });
});
