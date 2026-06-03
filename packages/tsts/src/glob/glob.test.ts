import test from "node:test";
import assert from "node:assert/strict";

import { parse } from "./index.js";

function matches(pattern: string, input: string): boolean {
  return parse(pattern).match(input);
}

test("exact literal matches", () => {
  assert.ok(matches("foo.ts", "foo.ts"));
  assert.ok(!matches("foo.ts", "bar.ts"));
});

test("literal with directory", () => {
  assert.ok(matches("src/foo.ts", "src/foo.ts"));
  assert.ok(!matches("src/foo.ts", "lib/foo.ts"));
});

test("matches one or more chars in a segment", () => {
  assert.ok(matches("*.ts", "foo.ts"));
  assert.ok(matches("*.ts", "bar.ts"));
  assert.ok(!matches("*.ts", "foo.js"));
});

test("does not cross slashes", () => {
  assert.ok(!matches("*.ts", "src/foo.ts"));
});

test("matches prefix in segment", () => {
  assert.ok(matches("foo*.ts", "foobar.ts"));
});

test("matches any number of path segments", () => {
  assert.ok(matches("**/foo.ts", "foo.ts"));
  assert.ok(matches("**/foo.ts", "src/foo.ts"));
  assert.ok(matches("**/foo.ts", "src/deep/nested/foo.ts"));
});

test("matches subdirectories", () => {
  assert.ok(matches("src/**/*.ts", "src/foo.ts"));
  assert.ok(matches("src/**/*.ts", "src/lib/foo.ts"));
  assert.ok(matches("src/**/*.ts", "src/lib/nested/foo.ts"));
});

test("matches a single char in a segment", () => {
  assert.ok(matches("foo?.ts", "foo1.ts"));
  assert.ok(!matches("foo?.ts", "foo12.ts"));
  assert.ok(!matches("foo?.ts", "foo.ts"));
});

test("does not match slash", () => {
  assert.ok(matches("?/foo.ts", "a/foo.ts"));
  assert.ok(!matches("?/foo.ts", "/foo.ts"));
});

test("alternation", () => {
  assert.ok(matches("*.{ts,js}", "foo.ts"));
  assert.ok(matches("*.{ts,js}", "foo.js"));
  assert.ok(!matches("*.{ts,js}", "foo.tsx"));
});

test("nested with double star", () => {
  assert.ok(matches("**/*.{ts,tsx,js,jsx}", "src/components/Foo.tsx"));
  assert.ok(matches("**/*.{ts,tsx,js,jsx}", "node_modules/foo/index.d.ts"));
  assert.ok(!matches("**/*.{ts,tsx,js,jsx}", "README.md"));
});

test("range matches", () => {
  assert.ok(matches("foo.[0-9]", "foo.5"));
  assert.ok(!matches("foo.[0-9]", "foo.a"));
});

test("negated range", () => {
  assert.ok(matches("foo.[!0-9]", "foo.a"));
  assert.ok(!matches("foo.[!0-9]", "foo.5"));
});

test("double star in middle of segment fails", () => {
  assert.throws(() => { parse("foo**bar"); });
});

test("unclosed brace fails", () => {
  assert.throws(() => { parse("foo.{ts"); });
});

test("malformed range fails", () => {
  assert.throws(() => { parse("foo.[a]"); });
});

test("preserves simple patterns", () => {
  assert.strictEqual(parse("*.ts").toString(), "*.ts");
  assert.strictEqual(parse("**/*.ts").toString(), "**/*.ts");
  assert.strictEqual(parse("foo?bar").toString(), "foo?bar");
});
