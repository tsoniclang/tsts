/**
 * Tests for semver/Version.
 *
 * Subset ported from TS-Go internal/semver/version_test.go.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { mustParse, SemverParseError, tryParseVersion, Version } from "../../src/semver/index.js";

describe("semver — parse", () => {
  it("parses full X.Y.Z", () => {
    const v = tryParseVersion("1.2.3");
    assert.equal(v.major, 1);
    assert.equal(v.minor, 2);
    assert.equal(v.patch, 3);
  });

  it("parses partial X", () => {
    const v = tryParseVersion("5");
    assert.equal(v.major, 5);
    assert.equal(v.minor, 0);
    assert.equal(v.patch, 0);
  });

  it("parses X.Y", () => {
    const v = tryParseVersion("3.14");
    assert.equal(v.major, 3);
    assert.equal(v.minor, 14);
    assert.equal(v.patch, 0);
  });

  it("parses with prerelease", () => {
    const v = tryParseVersion("1.2.3-alpha.1");
    assert.deepEqual([...v.prerelease], ["alpha", "1"]);
  });

  it("parses with build", () => {
    const v = tryParseVersion("1.2.3+build.456");
    assert.deepEqual([...v.build], ["build", "456"]);
  });

  it("parses with both prerelease and build", () => {
    const v = tryParseVersion("1.2.3-alpha.1+build.456");
    assert.deepEqual([...v.prerelease], ["alpha", "1"]);
    assert.deepEqual([...v.build], ["build", "456"]);
  });

  it("rejects invalid input", () => {
    assert.throws(() => tryParseVersion("not.a.version"), SemverParseError);
    assert.throws(() => tryParseVersion(""), SemverParseError);
    assert.throws(() => tryParseVersion("01.2.3"), SemverParseError);  // leading zero
  });

  it("mustParse alias", () => {
    const v = mustParse("1.0.0");
    assert.ok(v instanceof Version);
  });
});

describe("semver — compare", () => {
  it("major version difference", () => {
    assert.equal(tryParseVersion("2.0.0").compare(tryParseVersion("1.0.0")), 1);
    assert.equal(tryParseVersion("1.0.0").compare(tryParseVersion("2.0.0")), -1);
  });

  it("minor version difference", () => {
    assert.equal(tryParseVersion("1.2.0").compare(tryParseVersion("1.1.0")), 1);
  });

  it("patch version difference", () => {
    assert.equal(tryParseVersion("1.2.3").compare(tryParseVersion("1.2.2")), 1);
  });

  it("equal", () => {
    assert.equal(tryParseVersion("1.2.3").compare(tryParseVersion("1.2.3")), 0);
  });

  it("prerelease vs no-prerelease (prerelease loses)", () => {
    assert.equal(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0")), -1);
    assert.equal(tryParseVersion("1.0.0").compare(tryParseVersion("1.0.0-alpha")), 1);
  });

  it("prerelease numeric vs alpha", () => {
    // Numeric identifiers have lower precedence than non-numeric per spec
    assert.equal(tryParseVersion("1.0.0-1").compare(tryParseVersion("1.0.0-alpha")), -1);
  });

  it("prerelease numeric comparison", () => {
    assert.equal(tryParseVersion("1.0.0-9").compare(tryParseVersion("1.0.0-10")), -1);
  });

  it("prerelease lexical comparison", () => {
    assert.equal(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-beta")), -1);
  });

  it("longer prerelease wins when prefix equal", () => {
    assert.equal(tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-alpha.1")), -1);
  });

  it("build metadata does not affect precedence", () => {
    const a = tryParseVersion("1.0.0+build.1");
    const b = tryParseVersion("1.0.0+build.2");
    assert.equal(a.compare(b), 0);
  });

  it("equals method", () => {
    assert.equal(tryParseVersion("1.2.3").equals(tryParseVersion("1.2.3")), true);
    assert.equal(tryParseVersion("1.2.3").equals(tryParseVersion("1.2.4")), false);
  });
});

describe("semver — increment", () => {
  it("incrementMajor", () => {
    const v = tryParseVersion("1.2.3").incrementMajor();
    assert.equal(v.major, 2);
    assert.equal(v.minor, 0);
    assert.equal(v.patch, 0);
  });

  it("incrementMinor", () => {
    const v = tryParseVersion("1.2.3").incrementMinor();
    assert.equal(v.major, 1);
    assert.equal(v.minor, 3);
    assert.equal(v.patch, 0);
  });

  it("incrementPatch", () => {
    const v = tryParseVersion("1.2.3").incrementPatch();
    assert.equal(v.major, 1);
    assert.equal(v.minor, 2);
    assert.equal(v.patch, 4);
  });
});

describe("semver — toString", () => {
  it("round-trips simple versions", () => {
    assert.equal(tryParseVersion("1.2.3").toString(), "1.2.3");
  });

  it("includes prerelease", () => {
    assert.equal(tryParseVersion("1.2.3-alpha.1").toString(), "1.2.3-alpha.1");
  });

  it("includes build metadata", () => {
    assert.equal(tryParseVersion("1.2.3+build.456").toString(), "1.2.3+build.456");
  });

  it("partial parses fill with zeros", () => {
    assert.equal(tryParseVersion("5").toString(), "5.0.0");
  });
});
