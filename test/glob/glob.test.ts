/**
 * Tests for glob. Mirrors common patterns; full test parity to be added
 * with TS-Go test corpus integration.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { Glob, GlobError, parse } from "../../src/glob/index.js";

function matches(pattern: string, input: string): boolean {
  return parse(pattern).match(input);
}

describe("glob — literals", () => {
  it("exact literal matches", () => {
    assert.equal(matches("foo.ts", "foo.ts"), true);
    assert.equal(matches("foo.ts", "bar.ts"), false);
  });

  it("literal with directory", () => {
    assert.equal(matches("src/foo.ts", "src/foo.ts"), true);
    assert.equal(matches("src/foo.ts", "lib/foo.ts"), false);
  });
});

describe("glob — *", () => {
  it("matches one or more chars in a segment", () => {
    assert.equal(matches("*.ts", "foo.ts"), true);
    assert.equal(matches("*.ts", "bar.ts"), true);
    assert.equal(matches("*.ts", "foo.js"), false);
  });

  it("does not cross slashes", () => {
    assert.equal(matches("*.ts", "src/foo.ts"), false);
  });

  it("matches prefix in segment", () => {
    assert.equal(matches("foo*.ts", "foobar.ts"), true);
  });
});

describe("glob — **", () => {
  it("matches any number of path segments", () => {
    assert.equal(matches("**/foo.ts", "foo.ts"), true);
    assert.equal(matches("**/foo.ts", "src/foo.ts"), true);
    assert.equal(matches("**/foo.ts", "src/deep/nested/foo.ts"), true);
  });

  it("matches subdirectories", () => {
    assert.equal(matches("src/**/*.ts", "src/foo.ts"), true);
    assert.equal(matches("src/**/*.ts", "src/lib/foo.ts"), true);
    assert.equal(matches("src/**/*.ts", "src/lib/nested/foo.ts"), true);
  });
});

describe("glob — ?", () => {
  it("matches a single char in a segment", () => {
    assert.equal(matches("foo?.ts", "foo1.ts"), true);
    assert.equal(matches("foo?.ts", "foo12.ts"), false);
    assert.equal(matches("foo?.ts", "foo.ts"), false);
  });

  it("does not match slash", () => {
    assert.equal(matches("?/foo.ts", "a/foo.ts"), true);
    assert.equal(matches("?/foo.ts", "/foo.ts"), false);
  });
});

describe("glob — groups", () => {
  it("alternation", () => {
    assert.equal(matches("*.{ts,js}", "foo.ts"), true);
    assert.equal(matches("*.{ts,js}", "foo.js"), true);
    assert.equal(matches("*.{ts,js}", "foo.tsx"), false);
  });

  it("nested with **", () => {
    assert.equal(matches("**/*.{ts,tsx,js,jsx}", "src/components/Foo.tsx"), true);
    assert.equal(matches("**/*.{ts,tsx,js,jsx}", "node_modules/foo/index.d.ts"), true);
    assert.equal(matches("**/*.{ts,tsx,js,jsx}", "README.md"), false);
  });
});

describe("glob — character ranges", () => {
  it("range matches", () => {
    assert.equal(matches("foo.[0-9]", "foo.5"), true);
    assert.equal(matches("foo.[0-9]", "foo.a"), false);
  });

  it("negated range", () => {
    assert.equal(matches("foo.[!0-9]", "foo.a"), true);
    assert.equal(matches("foo.[!0-9]", "foo.5"), false);
  });
});

describe("glob — errors", () => {
  it("** in middle of segment fails", () => {
    assert.throws(() => parse("foo**bar"), GlobError);
  });

  it("unclosed { fails", () => {
    assert.throws(() => parse("foo.{ts"), GlobError);
  });

  it("malformed range fails", () => {
    assert.throws(() => parse("foo.[a]"), GlobError);
  });
});

describe("glob — toString round-trip", () => {
  it("preserves simple patterns", () => {
    assert.equal(parse("*.ts").toString(), "*.ts");
    assert.equal(parse("**/*.ts").toString(), "**/*.ts");
    assert.equal(parse("foo?bar").toString(), "foo?bar");
  });
});
