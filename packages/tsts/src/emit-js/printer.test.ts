import test from "node:test";
import assert from "node:assert/strict";

import { printSourceFile } from "./index.js";
import { parseSourceFile } from "../parser/index.js";

test("prints parsed expression statements as javascript", () => {
  assert.strictEqual(printSourceFile(parseSourceFile("x + 1;")), "x + 1;");
});

test("preserves parser precedence through ast shape", () => {
  assert.strictEqual(printSourceFile(parseSourceFile("a + b * 2;")), "a + b * 2;");
});

test("prints string literals from ast text", () => {
  assert.strictEqual(printSourceFile(parseSourceFile("'hello';")), "\"hello\";");
  assert.strictEqual(printSourceFile(parseSourceFile("\"line\\nnext\";")), "\"line\\nnext\";");
});

test("erases type annotations from variable declarations", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("export const answer: number = 42;")),
    "export const answer = 42;",
  );
});

test("erases function parameter and return types", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("export function add(a: number, b?: number): number { return a + b; }")),
    ["export function add(a, b) {", "  return a + b;", "}"].join("\n"),
  );
});

test("prints import and export declarations", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };")),
    ["import value, { dep as renamed } from \"./dep\";", "export { renamed as value };"].join("\n"),
  );
});

test("erases type only imports and type only named specifiers", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("import type { Node } from \"./types.js\"; import { Kind, type SourceFile } from \"./ast.js\";")),
    "import { Kind } from \"./ast.js\";",
  );
});

test("prints numeric enums with runtime forward and reverse mappings", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("export enum Flags { None = 0, A = 1 << 0, B = A << 1 }")),
    [
      "export var Flags;",
      "(function (Flags) { Flags[Flags[\"None\"] = 0] = \"None\"; Flags[Flags[\"A\"] = 1 << 0] = \"A\"; Flags[Flags[\"B\"] = Flags.A << 1] = \"B\"; })(Flags || (Flags = {}));",
    ].join("\n"),
  );
});

test("prints property access and call expressions", () => {
  assert.strictEqual(printSourceFile(parseSourceFile("answer.toFixed(2);")), "answer.toFixed(2);");
  assert.strictEqual(printSourceFile(parseSourceFile("answer?.toFixed?.(2);")), "answer?.toFixed?.(2);");
});

test("erases type only declarations and emits class declarations", () => {
  assert.strictEqual(
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

test("prints if statements and object and array literals", () => {
  assert.strictEqual(
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

test("erases arrow function parameter and return types", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("const add = (a: number, b: number): number => a + b; const wrap = x => ({ value: x });")),
    ["const add = (a, b) => a + b;", "const wrap = x => ({ value: x });"].join("\n"),
  );
});

test("prints loop statements with type erased initializers", () => {
  assert.strictEqual(
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

test("prints access unary new spread and erased assertion expressions", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1; const ok = !failed;")),
    [
      "const value = enabled ? new Box(items[index++], ...rest).value : -1;",
      "const ok = !failed;",
    ].join("\n"),
  );
});

test("prints destructuring binding patterns with type erasure", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("const { id, name: label = \"x\", ...rest }: Shape = item; function f([first, second]: string[]) { return first; }")),
    [
      "const { id, name: label = \"x\", ...rest } = item;",
      "function f([first, second]) {",
      "  return first;",
      "}",
    ].join("\n"),
  );
});

test("prints empty statements verbatim", () => {
  assert.strictEqual(printSourceFile(parseSourceFile(";")), ";");
  // A leading empty statement before an IIFE (ASI defense) must not be dropped
  // or crash the printer; tsc preserves it.
  assert.strictEqual(
    printSourceFile(parseSourceFile(";(() => value)();")),
    [";", "(() => value)();"].join("\n"),
  );
});

test("prints private fields templates try catch switch and throw statements", () => {
  assert.strictEqual(
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
