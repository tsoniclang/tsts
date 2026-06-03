import test from "node:test";
import assert from "node:assert/strict";

import { parseTestCase, DiffCategorizer } from "./index.js";

test("parses simple target directive", () => {
  const tc = parseTestCase("/tmp/foo.ts", "compiler/foo", "// @target: ES5\nconst x = 5;");
  assert.strictEqual(tc.directives.target, "ES5");
  assert.strictEqual(tc.files.length, 1);
  assert.strictEqual(tc.files[0]!.content.trim(), "const x = 5;");
});

test("parses multiple directives", () => {
  const tc = parseTestCase(
    "/tmp/foo.ts",
    "compiler/foo",
    "// @target: ES2020\n// @strict: true\n// @noEmit: true\nconst x = 5;",
  );
  assert.strictEqual(tc.directives.target, "ES2020");
  assert.ok(tc.directives.strict ?? false);
  assert.ok(tc.directives.noEmit ?? false);
});

test("splits files on filename directive", () => {
  const tc = parseTestCase(
    "/tmp/foo.ts",
    "compiler/foo",
    "// @target: ES5\n// @Filename: globals.ts\ndeclare global { const __FOO__: any; }\n// @Filename: app.ts\nexport {};",
  );
  assert.strictEqual(tc.directives.target, "ES5");
  assert.strictEqual(tc.files.length, 2);
  assert.strictEqual(tc.files[0]!.fileName, "globals.ts");
  assert.strictEqual(tc.files[1]!.fileName, "app.ts");
  assert.strictEqual(tc.files[0]!.content.trim(), "declare global { const __FOO__: any; }");
  assert.strictEqual(tc.files[1]!.content.trim(), "export {};");
});

test("parses lib as comma separated list", () => {
  const tc = parseTestCase(
    "/tmp/foo.ts",
    "compiler/foo",
    "// @lib: ES5,ES2015.Symbol,ES2017.Object\nconst x = 5;",
  );
  assert.deepStrictEqual([...(tc.directives.lib ?? [])], ["ES5", "ES2015.Symbol", "ES2017.Object"]);
});

test("records unknown directives", () => {
  const tc = parseTestCase(
    "/tmp/foo.ts",
    "compiler/foo",
    "// @customFlag: someValue\nconst x = 5;",
  );
  assert.strictEqual(tc.directives.unknown?.get("customFlag"), "someValue");
});

test("derives default filename from test name when no filename directive", () => {
  const tc = parseTestCase("/tmp/foo.ts", "compiler/myTest", "const x = 5;");
  assert.strictEqual(tc.files[0]!.fileName, "myTest.ts");
});

test("respects first occurrence wins for repeated directives", () => {
  const tc = parseTestCase(
    "/tmp/foo.ts",
    "compiler/foo",
    "// @target: ES5\n// @target: ES2020\nconst x = 5;",
  );
  assert.strictEqual(tc.directives.target, "ES5");
});

test("treats missing list files as empty no error", () => {
  const cat = new DiffCategorizer({
    acceptedListPath: "/nonexistent/accepted.txt",
    triagedListPath: "/nonexistent/triaged.txt",
  });
  assert.strictEqual(cat.acceptedCount(), 0);
  assert.strictEqual(cat.triagedCount(), 0);
  assert.strictEqual(cat.categorize("compiler/foo.types.diff"), "new");
});
