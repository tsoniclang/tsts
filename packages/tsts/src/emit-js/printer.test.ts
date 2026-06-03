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

test("prints export-equals as a CommonJS module.exports assignment", () => {
  // `export = <expr>` is only valid under a CommonJS module target (it is a hard
  // error under ES module targets, so it never reaches JS emit there). TS-Go
  // lowers every emitting case to `module.exports = <expr>;`.
  assert.strictEqual(
    printSourceFile(parseSourceFile("export = { a: 1, b: \"hello\" };")),
    "module.exports = { a: 1, b: \"hello\" };",
  );
  assert.strictEqual(
    printSourceFile(parseSourceFile("const value = 123; export = value;")),
    ["const value = 123;", "module.exports = value;"].join("\n"),
  );
});

test("prints import-equals require form as a CommonJS const require", () => {
  // `import a = require("m")` lowers to the CommonJS `const a = require("m");`
  // (TS-Go's `visitTopLevelImportEqualsDeclaration` emits a `const` variable
  // statement whose initializer is `require(<specifier>)`). The module specifier
  // string literal is reproduced verbatim (see `exportAssignmentMerging1` →
  // `b.js`: `const a = require("./a");`).
  assert.strictEqual(
    printSourceFile(parseSourceFile("import a = require(\"./a\");")),
    "const a = require(\"./a\");",
  );
});

test("elides a type-only import-equals declaration", () => {
  // `import type a = require("m")` is type-space only and is erased (TS-Go's
  // typeEraser elides it), so it produces no JS.
  assert.strictEqual(
    printSourceFile(parseSourceFile("import type a = require(\"./a\");")),
    "",
  );
});

test("rejects unbounded import-equals forms instead of emitting malformed output", () => {
  // The entity-name (alias) form `import a = N.B` needs alias-reference
  // resolution to decide emit-vs-elide and its `var a = N.B;` lowering, which
  // cannot be decided syntactically; it is rejected honestly.
  assert.throws(() => printSourceFile(parseSourceFile("import a = N.B;")), /Unsupported statement kind/);
  // `export import a = require("m")` lowers to `exports.a = require("m");`,
  // which needs module-target `exports` wiring; out of scope.
  assert.throws(
    () => printSourceFile(parseSourceFile("export import a = require(\"./a\");")),
    /Unsupported statement kind/,
  );
});

test("prints export default expressions preserving ES-module syntax", () => {
  assert.strictEqual(
    printSourceFile(parseSourceFile("const foo = { a: 1 }; export default foo;")),
    ["const foo = { a: 1 };", "export default foo;"].join("\n"),
  );
});

test("prints a namespace as the canonical TypeScript IIFE with member exports", () => {
  // Matches TS-Go's lowering: a top-level instantiated namespace becomes
  // `var N;` plus `(function (N) { ... })(N || (N = {}));`, with each exported
  // value member assigned onto `N`.
  assert.strictEqual(
    printSourceFile(parseSourceFile("namespace N { export const x = 1; }")),
    [
      "var N;",
      "(function (N) {",
      "  N.x = 1;",
      "})(N || (N = {}));",
    ].join("\n"),
  );
});

test("prints namespace exported function and class members with assignments", () => {
  // `export function`/`export class` keep their own declaration (without the
  // `export` keyword) and gain a trailing `N.member = member;` assignment, in
  // declaration order, matching TS-Go.
  assert.strictEqual(
    printSourceFile(parseSourceFile("namespace N { export function fn() { return 42; } export class A {} }")),
    [
      "var N;",
      "(function (N) {",
      "  function fn() {",
      "    return 42;",
      "  }",
      "  N.fn = fn;",
      "  class A {}",
      "  N.A = A;",
      "})(N || (N = {}));",
    ].join("\n"),
  );
});

test("qualifies namespace-internal references to exported members", () => {
  // Mirrors TS-Go's `es6ModuleConst` `m2` body: references to exported members
  // (`k`) become `m2.k`, including inside non-exported declarations, while
  // local (`n`) and external (`m1`) references are left untouched.
  assert.strictEqual(
    printSourceFile(parseSourceFile("namespace m2 { export const k = a; export const l = b, m = k; const n = m1.k; const o = n, p = k; }")),
    [
      "var m2;",
      "(function (m2) {",
      "  m2.k = a;",
      "  m2.l = b, m2.m = m2.k;",
      "  const n = m1.k;",
      "  const o = n, p = m2.k;",
      "})(m2 || (m2 = {}));",
    ].join("\n"),
  );
});

test("prints a nested namespace with a let-declared variable", () => {
  // A nested namespace declares its variable with `let` (block scope inside the
  // enclosing IIFE) rather than `var`, matching TS-Go.
  assert.strictEqual(
    printSourceFile(parseSourceFile("namespace Outer { namespace Inner { var x = 1; } }")),
    [
      "var Outer;",
      "(function (Outer) {",
      "  let Inner;",
      "  (function (Inner) {",
      "    var x = 1;",
      "  })(Inner || (Inner = {}));",
      "})(Outer || (Outer = {}));",
    ].join("\n"),
  );
});

test("elides declare and type-only namespaces from JS emit", () => {
  // A `declare` namespace and a namespace whose body is purely type-level
  // (interfaces / type aliases) are not instantiated and produce no JS.
  assert.strictEqual(printSourceFile(parseSourceFile("declare namespace D { var x: number; }")), "");
  assert.strictEqual(printSourceFile(parseSourceFile("namespace T { interface I {} type X = number; }")), "");
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
