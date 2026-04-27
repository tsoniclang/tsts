import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeSourceText } from "../../src/program/index.js";

describe("source text decoding", () => {
  it("decodes UTF-8 source text and strips a leading BOM", () => {
    assert.equal(decodeSourceText(Uint8Array.from([0xef, 0xbb, 0xbf, 0x6c, 0x65, 0x74])), "let");
  });

  it("decodes UTF-16 little-endian source text with a leading BOM", () => {
    const bytes = Uint8Array.from([0xff, 0xfe, 0x76, 0x00, 0x61, 0x00, 0x72, 0x00]);

    assert.equal(decodeSourceText(bytes), "var");
  });

  it("decodes UTF-16 big-endian source text with a leading BOM", () => {
    const bytes = Uint8Array.from([0xfe, 0xff, 0x00, 0x76, 0x00, 0x61, 0x00, 0x72]);

    assert.equal(decodeSourceText(bytes), "var");
  });
});
