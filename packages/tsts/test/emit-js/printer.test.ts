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
    assert.equal(printSourceFile(parseSourceFile("\"line\\nnext\";")), "\"line\\nnext\";");
  });

  it("erases type annotations from variable declarations", () => {
    assert.equal(printSourceFile(parseSourceFile("export const answer: number = 42;")), "export const answer = 42;");
  });

  it("erases function parameter and return types", () => {
    assert.equal(
      printSourceFile(parseSourceFile("export function add(a: number, b?: number): number { return a + b; }")),
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

  it("erases type-only imports and type-only named specifiers", () => {
    assert.equal(
      printSourceFile(parseSourceFile("import type { Node } from \"./types.js\"; import { Kind, type SourceFile } from \"./ast.js\";")),
      "import { Kind } from \"./ast.js\";",
    );
  });

  it("prints numeric enums with runtime forward and reverse mappings", () => {
    assert.equal(
      printSourceFile(parseSourceFile("export enum Flags { None = 0, A = 1 << 0, B = A << 1 }")),
      [
        "export var Flags;",
        "(function (Flags) { Flags[Flags[\"None\"] = 0] = \"None\"; Flags[Flags[\"A\"] = 1 << 0] = \"A\"; Flags[Flags[\"B\"] = Flags.A << 1] = \"B\"; })(Flags || (Flags = {}));",
      ].join("\n"),
    );
  });

  it("prints property access and call expressions", () => {
    assert.equal(printSourceFile(parseSourceFile("answer.toFixed(2);")), "answer.toFixed(2);");
    assert.equal(printSourceFile(parseSourceFile("answer?.toFixed?.(2);")), "answer?.toFixed?.(2);");
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

  it("erases arrow function parameter and return types", () => {
    assert.equal(
      printSourceFile(parseSourceFile("const add = (a: number, b: number): number => a + b; const wrap = x => ({ value: x });")),
      [
        "const add = (a, b) => a + b;",
        "const wrap = x => ({ value: x });",
      ].join("\n"),
    );
  });

  it("prints loop statements with type-erased initializers", () => {
    assert.equal(
      printSourceFile(parseSourceFile("for (let index: number = 0; index < 2; index += 1) { continue; } for (const item of items) { item; } while (ready) { break; }")),
      [
        "for (let index = 0; index < 2; index += 1) {",
        "  continue;",
        "}",
        "for (const item of items) {",
        "  item;",
        "}",
        "while (ready) {",
        "  break;",
        "}",
      ].join("\n"),
    );
  });

  it("prints access, unary, new, spread, and erased assertion expressions", () => {
    assert.equal(
      printSourceFile(parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1; const ok = !failed;")),
      [
        "const value = enabled ? new Box(items[index++], ...rest).value : -1;",
        "const ok = !failed;",
      ].join("\n"),
    );
  });

  it("prints destructuring binding patterns with type erasure", () => {
    assert.equal(
      printSourceFile(parseSourceFile("const { id, name: label = \"x\", ...rest }: Shape = item; function f([first, second]: string[]) { return first; }")),
      [
        "const { id, name: label = \"x\", ...rest } = item;",
        "function f([first, second]) {",
        "  return first;",
        "}",
      ].join("\n"),
    );
  });

  it("prints private fields, templates, try/catch, switch, and throw statements", () => {
    assert.equal(
      printSourceFile(parseSourceFile("class Box { #value = `hi ${name}`; get value() { return this.#value!; } } try { throw new Error(/x/.source); } catch (error) { switch (error) { default: break; } }")),
      [
        "class Box {",
        "  #value = `hi ${name}`;",
        "  get value() {",
        "    return this.#value;",
        "  }",
        "}",
        "try {",
        "  throw new Error(/x/.source);",
        "} catch (error) {",
        "  switch (error) {",
        "    default:",
        "      break;",
        "  }",
        "}",
      ].join("\n"),
    );
  });
});
