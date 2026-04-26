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

  it("erases type annotations from variable declarations", () => {
    assert.equal(printSourceFile(parseSourceFile("export const answer: number = 42;")), "export const answer = 42;");
  });

  it("erases function parameter and return types", () => {
    assert.equal(
      printSourceFile(parseSourceFile("export function add(a: number, b: number): number { return a + b; }")),
      [
        "export function add(a, b) {",
        "  return a + b;",
        "}",
      ].join("\n"),
    );
  });

  it("prints import and export declarations", () => {
    assert.equal(
      printSourceFile(parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };")),
      [
        "import value, { dep as renamed } from \"./dep\";",
        "export { renamed as value };",
      ].join("\n"),
    );
  });

  it("prints property access and call expressions", () => {
    assert.equal(printSourceFile(parseSourceFile("answer.toFixed(2);")), "answer.toFixed(2);");
  });

  it("erases type-only declarations and emits class declarations", () => {
    assert.equal(
      printSourceFile(parseSourceFile("export type Box<T> = { value: T }; interface Named { value: string; } export class BoxImpl extends Base implements Named { value: string = \"x\"; constructor(value: string) { this.value = value; } getValue(): string { return this.value; } }")),
      [
        "export class BoxImpl extends Base {",
        "  value = \"x\";",
        "  constructor(value) {",
        "    this.value = value;",
        "  }",
        "  getValue() {",
        "    return this.value;",
        "  }",
        "}",
      ].join("\n"),
    );
  });

  it("prints if statements and object and array literals", () => {
    assert.equal(
      printSourceFile(parseSourceFile("if (ready) { const value = { name: \"ok\", items: [1, 2] }; } else { const value = null; }")),
      [
        "if (ready) {",
        "  const value = { name: \"ok\", items: [1, 2] };",
        "} else {",
        "  const value = null;",
        "}",
      ].join("\n"),
    );
  });
});
