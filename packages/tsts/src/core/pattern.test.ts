import test from "node:test";
import assert from "node:assert/strict";

import {
  findBestPatternMatch,
  patternMatchedText,
  patternMatches,
  patternIsValid,
  tryParsePattern,
} from "./index.js";

test("exact patterns no star", () => {
  const p = tryParsePattern("foo");
  assert.strictEqual(p.text, "foo");
  assert.strictEqual(p.starIndex, -1);
  assert.ok(patternIsValid(p));
});

test("single star patterns", () => {
  const p = tryParsePattern("foo/*");
  assert.strictEqual(p.text, "foo/*");
  assert.strictEqual(p.starIndex, 4);
  assert.ok(patternIsValid(p));
});

test("multi star patterns invalid", () => {
  const p = tryParsePattern("foo/*/bar/*");
  assert.ok(!patternIsValid(p));
});

test("exact match", () => {
  const p = tryParsePattern("foo");
  assert.ok(patternMatches(p, "foo"));
  assert.ok(!patternMatches(p, "bar"));
});

test("prefix star match", () => {
  const p = tryParsePattern("foo/*");
  assert.ok(patternMatches(p, "foo/bar"));
  assert.ok(patternMatches(p, "foo/bar/baz"));
  assert.ok(!patternMatches(p, "qux/bar"));
});

test("prefix star suffix match", () => {
  const p = tryParsePattern("foo/*/bar");
  assert.ok(patternMatches(p, "foo/x/bar"));
  assert.ok(patternMatches(p, "foo/x/y/bar"));
});

test("returns wildcard part", () => {
  const p = tryParsePattern("foo/*/bar");
  assert.strictEqual(patternMatchedText(p, "foo/hello/bar"), "hello");
});

test("empty string for exact", () => {
  const p = tryParsePattern("foo");
  assert.strictEqual(patternMatchedText(p, "foo"), "");
});

interface NamedPattern {
  readonly name: string;
  readonly pattern: string;
}

test("returns longest prefix", () => {
  const values: readonly NamedPattern[] = [
    { name: "fallback", pattern: "*" },
    { name: "specific", pattern: "foo/*" },
    { name: "generic", pattern: "f*" },
  ];
  const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "foo/bar");
  assert.notStrictEqual(best, undefined);
  assert.strictEqual(best!.name, "specific");
});

test("returns undefined if nothing matches", () => {
  const values: readonly NamedPattern[] = [{ name: "only", pattern: "foo/*" }];
  const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "bar/baz");
  assert.strictEqual(best, undefined);
});
