import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { tryParseVersionRange, mustParse } from "../../src/semver/index.js";

function match(range: string, version: string): boolean {
  const r = tryParseVersionRange(range);
  if (r === undefined) throw new Error(`failed to parse range: ${range}`);
  return r.test(mustParse(version));
}

describe("semver/version_range — primitive comparators", () => {
  it(">= matches exact and above", () => {
    assert.equal(match(">=1.2.3", "1.2.3"), true);
    assert.equal(match(">=1.2.3", "1.3.0"), true);
    assert.equal(match(">=1.2.3", "1.2.2"), false);
  });

  it("< matches strict below", () => {
    assert.equal(match("<2.0.0", "1.9.9"), true);
    assert.equal(match("<2.0.0", "2.0.0"), false);
  });

  it("= matches exact", () => {
    assert.equal(match("=1.0.0", "1.0.0"), true);
    assert.equal(match("=1.0.0", "1.0.1"), false);
  });

  it("empty operator behaves like =", () => {
    assert.equal(match("1.0.0", "1.0.0"), true);
    assert.equal(match("1.0.0", "1.0.1"), false);
  });
});

describe("semver/version_range — tilde", () => {
  it("~1.2.3 → >=1.2.3 <1.3.0", () => {
    assert.equal(match("~1.2.3", "1.2.3"), true);
    assert.equal(match("~1.2.3", "1.2.99"), true);
    assert.equal(match("~1.2.3", "1.3.0"), false);
    assert.equal(match("~1.2.3", "1.2.2"), false);
  });

  it("~1.2 → >=1.2.0 <1.3.0", () => {
    assert.equal(match("~1.2", "1.2.5"), true);
    assert.equal(match("~1.2", "1.3.0"), false);
  });
});

describe("semver/version_range — caret", () => {
  it("^1.2.3 → >=1.2.3 <2.0.0", () => {
    assert.equal(match("^1.2.3", "1.2.3"), true);
    assert.equal(match("^1.2.3", "1.999.999"), true);
    assert.equal(match("^1.2.3", "2.0.0"), false);
  });

  it("^0.2.3 → >=0.2.3 <0.3.0", () => {
    assert.equal(match("^0.2.3", "0.2.5"), true);
    assert.equal(match("^0.2.3", "0.3.0"), false);
  });

  it("^0.0.3 → >=0.0.3 <0.0.4", () => {
    assert.equal(match("^0.0.3", "0.0.3"), true);
    assert.equal(match("^0.0.3", "0.0.4"), false);
  });
});

describe("semver/version_range — hyphen", () => {
  it("1.2.3 - 2.0.0 → >=1.2.3 <=2.0.0", () => {
    assert.equal(match("1.2.3 - 2.0.0", "1.2.3"), true);
    assert.equal(match("1.2.3 - 2.0.0", "2.0.0"), true);
    assert.equal(match("1.2.3 - 2.0.0", "2.0.1"), false);
  });

  it("partial right side raises upper bound", () => {
    assert.equal(match("1.2.3 - 2.3", "2.3.99"), true);
    assert.equal(match("1.2.3 - 2.3", "2.4.0"), false);
  });
});

describe("semver/version_range — wildcards", () => {
  it("* matches anything", () => {
    assert.equal(match("*", "0.0.0"), true);
    assert.equal(match("*", "1.2.3"), true);
  });

  it("1.x matches 1.y.z", () => {
    assert.equal(match("1.x", "1.0.0"), true);
    assert.equal(match("1.x", "1.99.99"), true);
    assert.equal(match("1.x", "2.0.0"), false);
  });
});

describe("semver/version_range — disjunction", () => {
  it("|| combines ranges", () => {
    assert.equal(match("1.x || >=3.0.0", "1.5.0"), true);
    assert.equal(match("1.x || >=3.0.0", "3.0.0"), true);
    assert.equal(match("1.x || >=3.0.0", "2.0.0"), false);
  });
});

describe("semver/version_range — invalid inputs", () => {
  it("returns undefined for nonsense", () => {
    assert.equal(tryParseVersionRange("not a range"), undefined);
    assert.equal(tryParseVersionRange("@@@"), undefined);
  });
});

describe("semver/version_range — toString", () => {
  it("formats parsed ranges", () => {
    const r = tryParseVersionRange(">=1.0.0 <2.0.0");
    assert.ok(r);
    assert.equal(r!.toString(), ">=1.0.0 <2.0.0");
  });

  it("empty range prints as *", () => {
    const r = tryParseVersionRange("");
    assert.ok(r);
    assert.equal(r!.toString(), "*");
  });
});
