import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { printSourceFile } from "../../src/emit-js/index.js";
import { parseSourceFile } from "../../src/parser/index.js";

describe("JS emitter groundwork", () => {
  it("prints parsed expression statements as JavaScript", () => {
    assert.equal(printSourceFile(parseSourceFile("x + 1;")), "x + 1;");
  });

  it("preserves parser precedence through AST shape", () => {
    assert.equal(printSourceFile(parseSourceFile("a + b * 2;")), "a + b * 2;");
  });

  it("prints string literals from AST text", () => {
    assert.equal(printSourceFile(parseSourceFile("'hello';")), "\"hello\";");
  });
});
