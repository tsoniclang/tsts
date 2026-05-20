import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { parseTestCase, DiffCategorizer } from "./index.js";

describe("test runner — directive parser", () => {
  it("parses simple @target directive", () => {
    const tc = parseTestCase("/tmp/foo.ts", "compiler/foo", "// @target: ES5\nconst x = 5;");
    assert.equal(tc.directives.target, "ES5");
    assert.equal(tc.files.length, 1);
    assert.equal(tc.files[0]!.content.trim(), "const x = 5;");
  });

  it("parses multiple directives", () => {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @target: ES2020\n// @strict: true\n// @noEmit: true\nconst x = 5;"
    );
    assert.equal(tc.directives.target, "ES2020");
    assert.equal(tc.directives.strict, true);
    assert.equal(tc.directives.noEmit, true);
  });

  it("splits files on @Filename directive", () => {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      `// @target: ES5
// @Filename: globals.ts
declare global { const __FOO__: any; }
// @Filename: app.ts
export {};`
    );
    assert.equal(tc.directives.target, "ES5");
    assert.equal(tc.files.length, 2);
    assert.equal(tc.files[0]!.fileName, "globals.ts");
    assert.equal(tc.files[1]!.fileName, "app.ts");
    assert.equal(tc.files[0]!.content.trim(), "declare global { const __FOO__: any; }");
    assert.equal(tc.files[1]!.content.trim(), "export {};");
  });

  it("parses @lib as comma-separated list", () => {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @lib: ES5,ES2015.Symbol,ES2017.Object\nconst x = 5;"
    );
    assert.deepEqual([...(tc.directives.lib ?? [])], ["ES5", "ES2015.Symbol", "ES2017.Object"]);
  });

  it("records unknown directives", () => {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @customFlag: someValue\nconst x = 5;"
    );
    assert.equal(tc.directives.unknown?.get("customFlag"), "someValue");
  });

  it("derives default filename from test name when no @Filename", () => {
    const tc = parseTestCase("/tmp/foo.ts", "compiler/myTest", "const x = 5;");
    assert.equal(tc.files[0]!.fileName, "myTest.ts");
  });

  it("respects first-occurrence-wins for repeated directives", () => {
    // TS-Go semantics: first directive wins
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @target: ES5\n// @target: ES2020\nconst x = 5;"
    );
    assert.equal(tc.directives.target, "ES5");
  });
});

describe("test runner — diff categorizer", () => {
  it("treats missing list files as empty (no error)", () => {
    const cat = new DiffCategorizer({
      acceptedListPath: "/nonexistent/accepted.txt",
      triagedListPath: "/nonexistent/triaged.txt",
    });
    assert.equal(cat.acceptedCount(), 0);
    assert.equal(cat.triagedCount(), 0);
    assert.equal(cat.categorize("compiler/foo.types.diff"), "new");
  });
});
