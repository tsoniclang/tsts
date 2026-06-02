import test from "node:test";
import assert from "node:assert/strict";

import { tryParseVersionRange, mustParse } from "./index.js";

function match(range: string, version: string): boolean {
  const r = tryParseVersionRange(range);
  if (r === undefined) throw new Error(`failed to parse range: ${range}`);
  return r.test(mustParse(version));
}

test("gte matches exact and above", () => {
  assert.ok(match(">=1.2.3", "1.2.3"));
  assert.ok(match(">=1.2.3", "1.3.0"));
  assert.ok(!match(">=1.2.3", "1.2.2"));
});

test("lt matches strict below", () => {
  assert.ok(match("<2.0.0", "1.9.9"));
  assert.ok(!match("<2.0.0", "2.0.0"));
});

test("eq matches exact", () => {
  assert.ok(match("=1.0.0", "1.0.0"));
  assert.ok(!match("=1.0.0", "1.0.1"));
});

test("empty op behaves like eq", () => {
  assert.ok(match("1.0.0", "1.0.0"));
  assert.ok(!match("1.0.0", "1.0.1"));
});

test("tilde patch lock", () => {
  assert.ok(match("~1.2.3", "1.2.3"));
  assert.ok(match("~1.2.3", "1.2.99"));
  assert.ok(!match("~1.2.3", "1.3.0"));
  assert.ok(!match("~1.2.3", "1.2.2"));
});

test("tilde minor lock", () => {
  assert.ok(match("~1.2", "1.2.5"));
  assert.ok(!match("~1.2", "1.3.0"));
});

test("caret major one or more", () => {
  assert.ok(match("^1.2.3", "1.2.3"));
  assert.ok(match("^1.2.3", "1.999.999"));
  assert.ok(!match("^1.2.3", "2.0.0"));
});

test("caret zero minor", () => {
  assert.ok(match("^0.2.3", "0.2.5"));
  assert.ok(!match("^0.2.3", "0.3.0"));
});

test("caret zero zero patch", () => {
  assert.ok(match("^0.0.3", "0.0.3"));
  assert.ok(!match("^0.0.3", "0.0.4"));
});

test("hyphen full range", () => {
  assert.ok(match("1.2.3 - 2.0.0", "1.2.3"));
  assert.ok(match("1.2.3 - 2.0.0", "2.0.0"));
  assert.ok(!match("1.2.3 - 2.0.0", "2.0.1"));
});

test("hyphen partial right side raises upper", () => {
  assert.ok(match("1.2.3 - 2.3", "2.3.99"));
  assert.ok(!match("1.2.3 - 2.3", "2.4.0"));
});

test("star matches anything", () => {
  assert.ok(match("*", "0.0.0"));
  assert.ok(match("*", "1.2.3"));
});

test("one x matches one y z", () => {
  assert.ok(match("1.x", "1.0.0"));
  assert.ok(match("1.x", "1.99.99"));
  assert.ok(!match("1.x", "2.0.0"));
});

test("or combines ranges", () => {
  assert.ok(match("1.x || >=3.0.0", "1.5.0"));
  assert.ok(match("1.x || >=3.0.0", "3.0.0"));
  assert.ok(!match("1.x || >=3.0.0", "2.0.0"));
});

test("returns undefined for nonsense", () => {
  assert.strictEqual(tryParseVersionRange("not a range"), undefined);
  assert.strictEqual(tryParseVersionRange("@@@"), undefined);
});

test("formats parsed ranges", () => {
  const r = tryParseVersionRange(">=1.0.0 <2.0.0");
  assert.notEqual(r, undefined);
  assert.strictEqual(r!.toString(), ">=1.0.0 <2.0.0");
});

test("empty range prints as star", () => {
  const r = tryParseVersionRange("");
  assert.notEqual(r, undefined);
  assert.strictEqual(r!.toString(), "*");
});
