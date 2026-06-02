import test from "node:test";
import assert from "node:assert/strict";

import { mustParse, tryParseVersion, Version } from "./index.js";

test("parses full x y z", () => {
  const v = tryParseVersion("1.2.3");
  assert.strictEqual(v.major, 1);
  assert.strictEqual(v.minor, 2);
  assert.strictEqual(v.patch, 3);
});

test("parses partial x", () => {
  const v = tryParseVersion("5");
  assert.strictEqual(v.major, 5);
  assert.strictEqual(v.minor, 0);
  assert.strictEqual(v.patch, 0);
});

test("parses x y", () => {
  const v = tryParseVersion("3.14");
  assert.strictEqual(v.major, 3);
  assert.strictEqual(v.minor, 14);
  assert.strictEqual(v.patch, 0);
});

test("parses with prerelease", () => {
  const v = tryParseVersion("1.2.3-alpha.1");
  assert.strictEqual(v.prerelease.length, 2);
  assert.strictEqual(v.prerelease[0], "alpha");
  assert.strictEqual(v.prerelease[1], "1");
});

test("parses with build", () => {
  const v = tryParseVersion("1.2.3+build.456");
  assert.strictEqual(v.build.length, 2);
  assert.strictEqual(v.build[0], "build");
  assert.strictEqual(v.build[1], "456");
});

test("parses with both prerelease and build", () => {
  const v = tryParseVersion("1.2.3-alpha.1+build.456");
  assert.strictEqual(v.prerelease.length, 2);
  assert.strictEqual(v.prerelease[0], "alpha");
  assert.strictEqual(v.prerelease[1], "1");
  assert.strictEqual(v.build.length, 2);
  assert.strictEqual(v.build[0], "build");
  assert.strictEqual(v.build[1], "456");
});

test("rejects invalid input", () => {
  assert.throws(() => { tryParseVersion("not.a.version"); });
  assert.throws(() => { tryParseVersion(""); });
  assert.throws(() => { tryParseVersion("01.2.3"); });
});

test("must parse alias", () => {
  const v = mustParse("1.0.0");
  assert.ok(v instanceof Version);
});

test("major version difference", () => {
  assert.strictEqual(tryParseVersion("2.0.0").compare(tryParseVersion("1.0.0")), 1);
  assert.strictEqual(tryParseVersion("1.0.0").compare(tryParseVersion("2.0.0")), -1);
});

test("minor version difference", () => {
  assert.strictEqual(tryParseVersion("1.2.0").compare(tryParseVersion("1.1.0")), 1);
});

test("patch version difference", () => {
  assert.strictEqual(tryParseVersion("1.2.3").compare(tryParseVersion("1.2.2")), 1);
});

test("equal", () => {
  assert.strictEqual(tryParseVersion("1.2.3").compare(tryParseVersion("1.2.3")), 0);
});

test("prerelease vs no prerelease prerelease loses", () => {
  assert.strictEqual(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0")), -1);
  assert.strictEqual(tryParseVersion("1.0.0").compare(tryParseVersion("1.0.0-alpha")), 1);
});

test("prerelease numeric vs alpha", () => {
  assert.strictEqual(tryParseVersion("1.0.0-1").compare(tryParseVersion("1.0.0-alpha")), -1);
});

test("prerelease numeric comparison", () => {
  assert.strictEqual(tryParseVersion("1.0.0-9").compare(tryParseVersion("1.0.0-10")), -1);
});

test("prerelease lexical comparison", () => {
  assert.strictEqual(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-beta")), -1);
});

test("longer prerelease wins when prefix equal", () => {
  assert.strictEqual(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-alpha.1")), -1);
});

test("build metadata does not affect precedence", () => {
  const a = tryParseVersion("1.0.0+build.1");
  const b = tryParseVersion("1.0.0+build.2");
  assert.strictEqual(a.compare(b), 0);
});

test("equals method", () => {
  assert.ok(tryParseVersion("1.2.3").equals(tryParseVersion("1.2.3")));
  assert.ok(!tryParseVersion("1.2.3").equals(tryParseVersion("1.2.4")));
});

test("increment major", () => {
  const v = tryParseVersion("1.2.3").incrementMajor();
  assert.strictEqual(v.major, 2);
  assert.strictEqual(v.minor, 0);
  assert.strictEqual(v.patch, 0);
});

test("increment minor", () => {
  const v = tryParseVersion("1.2.3").incrementMinor();
  assert.strictEqual(v.major, 1);
  assert.strictEqual(v.minor, 3);
  assert.strictEqual(v.patch, 0);
});

test("increment patch", () => {
  const v = tryParseVersion("1.2.3").incrementPatch();
  assert.strictEqual(v.major, 1);
  assert.strictEqual(v.minor, 2);
  assert.strictEqual(v.patch, 4);
});

test("round trips simple versions", () => {
  assert.strictEqual(tryParseVersion("1.2.3").toString(), "1.2.3");
});

test("includes prerelease", () => {
  assert.strictEqual(tryParseVersion("1.2.3-alpha.1").toString(), "1.2.3-alpha.1");
});

test("includes build metadata", () => {
  assert.strictEqual(tryParseVersion("1.2.3+build.456").toString(), "1.2.3+build.456");
});

test("partial parses fill with zeros", () => {
  assert.strictEqual(tryParseVersion("5").toString(), "5.0.0");
});
