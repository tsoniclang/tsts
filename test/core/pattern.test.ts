import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
  findBestPatternMatch,
  patternMatchedText,
  patternMatches,
  patternIsValid,
  tryParsePattern,
} from "../../src/core/index.js";

describe("core/pattern — parse", () => {
  it("exact patterns (no *)", () => {
    const p = tryParsePattern("foo");
    assert.equal(p.text, "foo");
    assert.equal(p.starIndex, -1);
    assert.equal(patternIsValid(p), true);
  });

  it("single-* patterns", () => {
    const p = tryParsePattern("foo/*");
    assert.equal(p.text, "foo/*");
    assert.equal(p.starIndex, 4);
    assert.equal(patternIsValid(p), true);
  });

  it("multi-* patterns are invalid", () => {
    const p = tryParsePattern("foo/*/bar/*");
    assert.equal(patternIsValid(p), false);
  });
});

describe("core/pattern — match", () => {
  it("exact match", () => {
    const p = tryParsePattern("foo");
    assert.equal(patternMatches(p, "foo"), true);
    assert.equal(patternMatches(p, "bar"), false);
  });

  it("prefix-* match", () => {
    const p = tryParsePattern("foo/*");
    assert.equal(patternMatches(p, "foo/bar"), true);
    assert.equal(patternMatches(p, "foo/bar/baz"), true);
    assert.equal(patternMatches(p, "qux/bar"), false);
  });

  it("prefix-*-suffix match", () => {
    const p = tryParsePattern("foo/*/bar");
    assert.equal(patternMatches(p, "foo/x/bar"), true);
    assert.equal(patternMatches(p, "foo/x/y/bar"), true);  // wildcard greedy
    // The wildcard can match an empty substring, so "foo/bar" matches
    // "foo/*/bar" when prefix "foo/" + suffix "/bar" overlap exactly.
    // Note: this is a peculiarity of TS-Go's Pattern (used for path-mapping
    // resolution where the wildcard need not match anything).
  });
});

describe("core/pattern — matchedText", () => {
  it("returns the part matching the wildcard", () => {
    const p = tryParsePattern("foo/*/bar");
    assert.equal(patternMatchedText(p, "foo/hello/bar"), "hello");
  });

  it("empty string for exact match", () => {
    const p = tryParsePattern("foo");
    assert.equal(patternMatchedText(p, "foo"), "");
  });
});

describe("core/pattern — findBestPatternMatch", () => {
  it("returns longest-prefix match", () => {
    const values = [
      { name: "fallback", pattern: "*" },
      { name: "specific", pattern: "foo/*" },
      { name: "generic", pattern: "f*" },
    ];
    const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "foo/bar");
    assert.equal(best?.name, "specific");
  });

  it("returns undefined if nothing matches", () => {
    const values = [{ pattern: "foo/*" }];
    const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "bar/baz");
    assert.equal(best, undefined);
  });
});
