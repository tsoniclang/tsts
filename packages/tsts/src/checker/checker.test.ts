import test from "node:test";
import assert from "node:assert/strict";

import { checkProgram, checkSourceFile, newChecker } from "./index.js";
import {
  newCheckState,
  getUnionType,
  getUnionTypeEx,
  UnionReduction,
  unionConstituents,
  getStringLiteralType,
  getFreshTypeOfLiteralType,
  stringType,
  booleanType,
  regularFalseType,
  regularTrueType,
} from "./checker.checkedtype.js";
import { TypeFlags } from "./types.js";
import { CheckerPrinter } from "./printer.js";
import { parseSourceFile } from "../parser/index.js";
import { createProgram, type CompilerHost } from "../program/index.js";
import {
  isExpressionStatement,
  isTrueLiteral,
  isFalseLiteral,
  isThisExpression,
  isNullLiteral,
  isSuperExpression,
  isImportExpression,
  createNode,
  forEachChild,
  isIdentifier,
  nodeParent,
  nodeSymbol,
  Kind,
  SymbolFlags,
  type Node,
  type SuperExpression,
  type ImportExpression,
} from "../ast/index.js";
import { NameResolver } from "../binder/index.js";

test("accepts numeric to fixed calls that flow into string returns", () => {
  const sourceFile = parseSourceFile("function f(x: number): string { return x.toFixed(2); }");
  const result = checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);
});

test("reports invalid property access on primitive receivers", () => {
  const sourceFile = parseSourceFile("function f(x: string): string { return x.toFixed(); }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Property 'toFixed' does not exist on type 'string'."]);
});

test("reports return type assignability failures", () => {
  const sourceFile = parseSourceFile("function f(): number { return \"not a number\"; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checks every source file in a program", () => {
  const host: CompilerHost = {
    readFile: (fileName) => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
  };
  const program = createProgram(["src/index.ts"], {}, host);
  const diagnostics = checkProgram(program);

  assert.deepStrictEqual(diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checks method and constructor bodies inside classes", () => {
  const sourceFile = parseSourceFile("class Box { getValue(): number { return \"x\"; } }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checks declared arrow function return types", () => {
  const sourceFile = parseSourceFile("const f = (x: string): number => x;");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checks loop initializer declarations and loop bodies", () => {
  const sourceFile = parseSourceFile("function f(): number { for (const item: string of items) { return item; } return 1; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checks conditional branches after assertion expressions", () => {
  const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string | number' is not assignable to type 'number'."]);
});

test("builds a union type from conditional branches", () => {
  const sourceFile = parseSourceFile("function f(flag: boolean): string { return flag ? \"a\" as string : 1 as number; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string | number' is not assignable to type 'string'."]);
});

test("collapses conditional branches of the same type", () => {
  const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? 1 : 2; }");
  const result = checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);
});

test("widens numeric literal arithmetic to number", () => {
  const sourceFile = parseSourceFile("function f(): number { return 1 + 2; }");
  const result = checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);
});

test("widens string literal in return position", () => {
  const sourceFile = parseSourceFile("function f(): number { return \"lit\"; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("widens boolean literal in return position", () => {
  const sourceFile = parseSourceFile("function f(): number { return false; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'boolean' is not assignable to type 'number'."]);
});

test("accepts exact literal type node return types", () => {
  const stringCase = checkSourceFile(parseSourceFile("function f(): \"lit\" { return \"lit\"; }"));
  const numberCase = checkSourceFile(parseSourceFile("function g(): 1 { return 1; }"));
  const booleanCase = checkSourceFile(parseSourceFile("function h(): true { return true; }"));

  assert.strictEqual(stringCase.diagnostics.length, 0);
  assert.strictEqual(numberCase.diagnostics.length, 0);
  assert.strictEqual(booleanCase.diagnostics.length, 0);
});

test("reports literal type node mismatch", () => {
  const sourceFile = parseSourceFile("function f(): \"lit\" { return \"other\"; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type '\"other\"' is not assignable to type '\"lit\"'."]);
});

test("widens bigint literal in return position", () => {
  const sourceFile = parseSourceFile("function f(): number { return 123n; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'bigint' is not assignable to type 'number'."]);
});

test("checks bigint literal type nodes", () => {
  // Parser now produces a LiteralTypeNode wrapping a BigIntLiteral for `: 123n`.
  const ok = checkSourceFile(parseSourceFile("function ok(): 123n { return 123n; }"));
  const bad = checkSourceFile(parseSourceFile("function bad(): 123n { return 124n; }"));
  const numberToBigint = checkSourceFile(parseSourceFile("function f(): 123n { return 123; }"));

  assert.strictEqual(ok.diagnostics.length, 0);
  assert.deepStrictEqual(bad.diagnostics.map((d) => d.message), ["Type '124n' is not assignable to type '123n'."]);
  assert.deepStrictEqual(numberToBigint.diagnostics.map((d) => d.message), ["Type '123' is not assignable to type '123n'."]);
});

test("checks negative literal type nodes", () => {
  // `-1` / `-1n` parse as LiteralTypeNode(PrefixUnaryExpression(MinusToken, literal)).
  const okNumber = checkSourceFile(parseSourceFile("function okNumber(): -1 { return -1; }"));
  const badNumber = checkSourceFile(parseSourceFile("function badNumber(): -1 { return 1; }"));
  const okBigInt = checkSourceFile(parseSourceFile("function okBigInt(): -1n { return -1n; }"));
  const badBigInt = checkSourceFile(parseSourceFile("function badBigInt(): -1n { return 1n; }"));

  assert.strictEqual(okNumber.diagnostics.length, 0);
  assert.deepStrictEqual(badNumber.diagnostics.map((d) => d.message), ["Type '1' is not assignable to type '-1'."]);
  assert.strictEqual(okBigInt.diagnostics.length, 0);
  assert.deepStrictEqual(badBigInt.diagnostics.map((d) => d.message), ["Type '1n' is not assignable to type '-1n'."]);
});

test("checks null literal type nodes", () => {
  // `null` resolves to the nullType intrinsic in both expression and
  // literal-type-node position; `undefined` resolves to undefinedType.
  const okNull = checkSourceFile(parseSourceFile("function ok(): null { return null; }"));
  const undefinedToNull = checkSourceFile(parseSourceFile("function bad(): null { return undefined; }"));
  const nullToString = checkSourceFile(parseSourceFile("function badString(): string { return null; }"));
  const nullUnion = checkSourceFile(parseSourceFile("function f(flag: boolean): string | null { return flag ? \"x\" : null; }"));

  assert.strictEqual(okNull.diagnostics.length, 0);
  assert.deepStrictEqual(undefinedToNull.diagnostics.map((d) => d.message), ["Type 'undefined' is not assignable to type 'null'."]);
  assert.deepStrictEqual(nullToString.diagnostics.map((d) => d.message), ["Type 'null' is not assignable to type 'string'."]);
  assert.strictEqual(nullUnion.diagnostics.length, 0);
});

test("local undefined binding wins over global", () => {
  // A parameter named `undefined` must shadow the global undefined fallback:
  // environment lookup first, global-undefined fallback second. This is the
  // property that keeps the name-based `undefined` model safe.
  const ok = checkSourceFile(parseSourceFile("function ok(undefined: number): number { return undefined; }"));
  const bad = checkSourceFile(parseSourceFile("function bad(undefined: number): undefined { return undefined; }"));

  assert.strictEqual(ok.diagnostics.length, 0);
  assert.deepStrictEqual(bad.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'undefined'."]);
});

test("boolean normalizes to false true union", () => {
  // booleanType IS the canonical `false | true` union, so the two forms are
  // mutually assignable and the union displays as `boolean`.
  const boolToFalseTrue = checkSourceFile(parseSourceFile("function f(b: boolean): false | true { return b; }"));
  const falseTrueToBool = checkSourceFile(parseSourceFile("function f(flag: boolean): boolean { return flag ? true : false; }"));
  const displaysBoolean = checkSourceFile(parseSourceFile("function f(): string { const b: false | true = true; return b; }"));
  const reducesWithLiteral = checkSourceFile(parseSourceFile("function f(): number { const b: boolean | false = true; return b; }"));

  assert.strictEqual(boolToFalseTrue.diagnostics.length, 0);
  assert.strictEqual(falseTrueToBool.diagnostics.length, 0);
  assert.deepStrictEqual(displaysBoolean.diagnostics.map((d) => d.message), ["Type 'boolean' is not assignable to type 'string'."]);
  assert.deepStrictEqual(reducesWithLiteral.diagnostics.map((d) => d.message), ["Type 'boolean' is not assignable to type 'number'."]);
});

test("boolean union interns to canonical object", () => {
  // `false | true` in either order must intern to the exact booleanType
  // singleton — the property that makes boolean relations identity-based.
  // booleanType carries BOTH TypeFlags.Union and TypeFlags.Boolean (TS-Go's
  // two-member boolean-literal union flagging).
  const state = newCheckState();

  assert.strictEqual((booleanType.flags & TypeFlags.Union) !== 0, true);
  assert.strictEqual((booleanType.flags & TypeFlags.Boolean) !== 0, true);
  assert.strictEqual(getUnionType([regularFalseType, regularTrueType], state) === booleanType, true);
  assert.strictEqual(getUnionType([regularTrueType, regularFalseType], state) === booleanType, true);
});

test("boolean pair collapses in embedded union", () => {
  // A `false`+`true` pair inside a larger union displays as `boolean`.
  const result = checkSourceFile(parseSourceFile("function f(): number { const value: string | false | true = true; return value; }"));

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string | boolean' is not assignable to type 'number'."]);
});

test("checker printer prints boolean union", () => {
  // CheckerPrinter (nodebuilder/api display path) must collapse the canonical
  // boolean union to `boolean` and print boolean literals by value.
  const printer = new CheckerPrinter();

  assert.strictEqual(printer.typeToString(booleanType), "boolean");
  assert.strictEqual(printer.typeToString(regularFalseType), "false");
  assert.strictEqual(printer.typeToString(regularTrueType), "true");
});

test("checks satisfies expression", () => {
  // `expr satisfies T` verifies expr is assignable to T but the RESULT type is
  // the expression's own type, not T (proved by routing the result into a
  // narrower return type the target would not satisfy).
  const resultIsExprType = checkSourceFile(parseSourceFile("function f(): \"a\" { return \"a\" satisfies string; }"));
  const checkFails = checkSourceFile(parseSourceFile("function g(): number { return 1 satisfies string; }"));
  const resultNotTarget = checkSourceFile(parseSourceFile("function f(): \"a\" { return \"b\" satisfies string; }"));

  assert.strictEqual(resultIsExprType.diagnostics.length, 0);
  assert.deepStrictEqual(checkFails.diagnostics.map((d) => d.message), ["Type '1' is not assignable to type 'string'."]);
  assert.deepStrictEqual(resultNotTarget.diagnostics.map((d) => d.message), ["Type '\"b\"' is not assignable to type '\"a\"'."]);
});

test("preserves const literal widens let", () => {
  // `const` preserves a primitive literal initializer's type; `let`/`var`
  // widen it; an explicit annotation wins.
  const constNumber = checkSourceFile(parseSourceFile("function f(): 1 { const x = 1; return x; }"));
  const letNumber = checkSourceFile(parseSourceFile("function f(): 1 { let x = 1; return x; }"));
  const varNumber = checkSourceFile(parseSourceFile("function f(): 1 { var x = 1; return x; }"));
  const constBoolean = checkSourceFile(parseSourceFile("function f(): true { const x = true; return x; }"));
  const constBigInt = checkSourceFile(parseSourceFile("function f(): 1n { const x = 1n; return x; }"));
  const letBigInt = checkSourceFile(parseSourceFile("function f(): 1n { let x = 1n; return x; }"));
  const constSatisfies = checkSourceFile(parseSourceFile("function f(): \"a\" { const x = \"a\" satisfies string; return x; }"));
  const annotationWinsOk = checkSourceFile(parseSourceFile("function f(): number { const x: number = 1; return x; }"));
  // Negative proof that the annotation (not the literal) wins: x is `number`.
  const annotationWinsNegative = checkSourceFile(parseSourceFile("function f(): 1 { const x: number = 1; return x; }"));
  // The helper is used at the for-loop VariableDeclarationList site too.
  const forConst = checkSourceFile(parseSourceFile("function f(): 1 { for (const x = 1; ; ) { return x; } return 1; }"));
  const forLet = checkSourceFile(parseSourceFile("function f(): 1 { for (let x = 1; ; ) { return x; } return 1; }"));

  assert.strictEqual(constNumber.diagnostics.length, 0);
  assert.deepStrictEqual(letNumber.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type '1'."]);
  assert.deepStrictEqual(varNumber.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type '1'."]);
  assert.strictEqual(constBoolean.diagnostics.length, 0);
  assert.strictEqual(constBigInt.diagnostics.length, 0);
  assert.deepStrictEqual(letBigInt.diagnostics.map((d) => d.message), ["Type 'bigint' is not assignable to type '1n'."]);
  assert.strictEqual(constSatisfies.diagnostics.length, 0);
  assert.strictEqual(annotationWinsOk.diagnostics.length, 0);
  assert.deepStrictEqual(annotationWinsNegative.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type '1'."]);
  assert.strictEqual(forConst.diagnostics.length, 0);
  assert.deepStrictEqual(forLet.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type '1'."]);
});

test("derives logical operator result types", () => {
  // `&&` / `||` / `??` produce operand-derived result types, NOT boolean.
  const orResult = checkSourceFile(parseSourceFile("function f(x: string, y: number): string | number { return x || y; }"));
  const orNotBoolean = checkSourceFile(parseSourceFile("function f(x: string, y: number): number { return x || y; }"));
  const nullishRemovesNull = checkSourceFile(parseSourceFile("function f(x: string | null, y: number): string | number { return x ?? y; }"));
  const nullishNoNull = checkSourceFile(parseSourceFile("function f(x: string, y: number): string { return x ?? y; }"));
  const andBoolean = checkSourceFile(parseSourceFile("function f(b: boolean, y: number): number { return b && y; }"));
  const andString = checkSourceFile(parseSourceFile("function f(x: string, y: number): string { return x && y; }"));

  assert.strictEqual(orResult.diagnostics.length, 0);
  assert.deepStrictEqual(orNotBoolean.diagnostics.map((d) => d.message), ["Type 'string | number' is not assignable to type 'number'."]);
  assert.strictEqual(nullishRemovesNull.diagnostics.length, 0);
  assert.strictEqual(nullishNoNull.diagnostics.length, 0);
  assert.deepStrictEqual(andBoolean.diagnostics.map((d) => d.message), ["Type 'false | number' is not assignable to type 'number'."]);
  assert.deepStrictEqual(andString.diagnostics.map((d) => d.message), ["Type '\"\" | number' is not assignable to type 'string'."]);
});

test("hardens logical operator facts", () => {
  // Fresh `false` literals (not just regularFalseType) must be preserved as
  // definitely-falsy by `&&`; always-truthy / always-falsy operands collapse
  // to the correct branch; nullish facts cover the undefined intrinsic.
  const freshFalse = checkSourceFile(parseSourceFile("function f(flag: boolean, y: number): false | number { return (flag ? false : \"x\") && y; }"));
  const trueAnd = checkSourceFile(parseSourceFile("function f(y: number): number { return true && y; }"));
  const falseAnd = checkSourceFile(parseSourceFile("function f(y: number): false { return false && y; }"));
  const emptyStringOr = checkSourceFile(parseSourceFile("function f(y: number): number { return \"\" || y; }"));
  const truthyStringOr = checkSourceFile(parseSourceFile("function f(y: number): \"x\" { return \"x\" || y; }"));
  const undefinedUnionNullish = checkSourceFile(parseSourceFile("function f(x: string | undefined, y: number): string | number { return x ?? y; }"));
  const undefinedConstNullish = checkSourceFile(parseSourceFile("function f(y: number): number { const x = undefined; return x ?? y; }"));

  assert.strictEqual(freshFalse.diagnostics.length, 0);
  assert.strictEqual(trueAnd.diagnostics.length, 0);
  assert.strictEqual(falseAnd.diagnostics.length, 0);
  assert.strictEqual(emptyStringOr.diagnostics.length, 0);
  assert.strictEqual(truthyStringOr.diagnostics.length, 0);
  assert.strictEqual(undefinedUnionNullish.diagnostics.length, 0);
  assert.strictEqual(undefinedConstNullish.diagnostics.length, 0);
});

test("resolves object literal members", () => {
  // Object literal + `{ ... }` type literal -> anonymous object types,
  // related structurally; property access resolves member types; missing
  // properties / mismatches error. Object-literal `satisfies` now works.
  const satisfiesOk = checkSourceFile(parseSourceFile("function f(): void { const ok = { port: 8080 } satisfies { port: number }; }"));
  const satisfiesBad = checkSourceFile(parseSourceFile("function f(): void { const bad = { port: \"x\" } satisfies { port: number }; }"));
  const propertyOk = checkSourceFile(parseSourceFile("function f(o: { port: number }): number { return o.port; }"));
  const propertyWrongType = checkSourceFile(parseSourceFile("function f(o: { port: number }): string { return o.port; }"));
  const propertyMissing = checkSourceFile(parseSourceFile("function f(o: { port: number }): number { return o.missing; }"));
  const objectAssignable = checkSourceFile(parseSourceFile("function f(): void { const o: { port: number } = { port: 1 }; }"));
  const objectMissingProperty = checkSourceFile(parseSourceFile("function f(): void { const o: { port: number } = { }; }"));

  assert.strictEqual(satisfiesOk.diagnostics.length, 0);
  assert.deepStrictEqual(satisfiesBad.diagnostics.map((d) => d.message), ["Type '{ port: string; }' is not assignable to type '{ port: number; }'.\n  Types of property 'port' are incompatible.\n    Type 'string' is not assignable to type 'number'."]);
  assert.strictEqual(propertyOk.diagnostics.length, 0);
  assert.deepStrictEqual(propertyWrongType.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.deepStrictEqual(propertyMissing.diagnostics.map((d) => d.message), ["Property 'missing' does not exist on type '{ port: number; }'."]);
  assert.strictEqual(objectAssignable.diagnostics.length, 0);
  assert.deepStrictEqual(objectMissingProperty.diagnostics.map((d) => d.message), ["Type '{}' is not assignable to type '{ port: number; }'."]);
});

test("extends object member support", () => {
  // void nullish facts; shorthand properties; type-literal method signatures;
  // optional properties (relater skips a missing optional); object spreads
  // merge known source properties without silently dropping members.
  const voidNullish = checkSourceFile(parseSourceFile("function f(x: void, y: number): number { return x ?? y; }"));
  const shorthand = checkSourceFile(parseSourceFile("function f(a: number): { a: number } { return { a }; }"));
  const methodSignature = checkSourceFile(parseSourceFile("function f(o: { kindString(): string }): string { return o.kindString(); }"));
  const optionalAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a?: number } = { }; }"));
  const requiredAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a: number } = { }; }"));
  const spreadOk = checkSourceFile(parseSourceFile("function f(b: { a: number }): { a: number; label: string } { return { ...b, label: \"x\" }; }"));
  const spreadMismatch = checkSourceFile(parseSourceFile("function f(b: { a: number }): { a: string } { return { ...b }; }"));

  assert.strictEqual(voidNullish.diagnostics.length, 0);
  assert.strictEqual(shorthand.diagnostics.length, 0);
  assert.strictEqual(methodSignature.diagnostics.length, 0);
  assert.strictEqual(optionalAbsent.diagnostics.length, 0);
  assert.deepStrictEqual(requiredAbsent.diagnostics.map((d) => d.message), ["Type '{}' is not assignable to type '{ a: number; }'."]);
  assert.strictEqual(spreadOk.diagnostics.length, 0);
  assert.deepStrictEqual(spreadMismatch.diagnostics.map((d) => d.message), ["Type '{ a: number; }' is not assignable to type '{ a: string; }'.\n  Types of property 'a' are incompatible.\n    Type 'number' is not assignable to type 'string'."]);
});

test("deepens object member typing", () => {
  // Object-literal properties widen; optional access includes undefined;
  // method-signature parameters are checked at call sites; object mismatches
  // get per-property elaboration via the relation path.
  const widensProperty = checkSourceFile(parseSourceFile("function f(): 8080 { const x = { port: 8080 }; return x.port; }"));
  const optionalAccess = checkSourceFile(parseSourceFile("function f(o: { a?: number }): number { return o.a; }"));
  const optionalAccessOk = checkSourceFile(parseSourceFile("function f(o: { a?: number }): number | undefined { return o.a; }"));
  const methodParamOk = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"1\"); }"));
  const methodParamMismatch = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(1); }"));
  const perPropertyElaboration = checkSourceFile(parseSourceFile("function f(): void { const bad: { port: number } = { port: \"x\" }; }"));

  assert.deepStrictEqual(widensProperty.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type '8080'."]);
  assert.deepStrictEqual(optionalAccess.diagnostics.map((d) => d.message), ["Type 'number | undefined' is not assignable to type 'number'."]);
  assert.strictEqual(optionalAccessOk.diagnostics.length, 0);
  assert.strictEqual(methodParamOk.diagnostics.length, 0);
  assert.deepStrictEqual(methodParamMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.deepStrictEqual(perPropertyElaboration.diagnostics.map((d) => d.message), ["Type '{ port: string; }' is not assignable to type '{ port: number; }'.\n  Types of property 'port' are incompatible.\n    Type 'string' is not assignable to type 'number'."]);
});

test("checks call signature arity", () => {
  // Missing required arguments + extra arguments are reported; optional and
  // rest parameters relax the bounds (matching TS-Go/TypeScript).
  const missing = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(); }"));
  const extra = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"a\", \"b\"); }"));
  const optional = checkSourceFile(parseSourceFile("function f(o: { parse(text?: string): number }): number { return o.parse(); }"));
  const restZero = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(); }"));
  const restMany = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(\"a\", \"b\"); }"));
  const exact = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"a\"); }"));

  assert.deepStrictEqual(missing.diagnostics.map((d) => d.message), ["Expected 1 arguments, but got 0."]);
  assert.deepStrictEqual(extra.diagnostics.map((d) => d.message), ["Expected 1 arguments, but got 2."]);
  assert.strictEqual(optional.diagnostics.length, 0);
  assert.strictEqual(restZero.diagnostics.length, 0);
  assert.strictEqual(restMany.diagnostics.length, 0);
  assert.strictEqual(exact.diagnostics.length, 0);
});

test("checks optional and rest parameter semantics", () => {
  // Optional params accept an explicit `undefined`; rest arguments are checked
  // against the array element type; mixed required/optional/rest signatures.
  const optionalUndefined = checkSourceFile(parseSourceFile("function f(o: { parse(text?: string): number }): number { return o.parse(undefined); }"));
  const restMismatch = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(1); }"));
  const restOk = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(\"a\", \"b\"); }"));
  // Valid mixed signature: required can't follow optional, so the tail is rest.
  const mixedOk = checkSourceFile(parseSourceFile("function f(o: { g(a: string, b?: number, ...rest: boolean[]): void }): void { o.g(\"x\"); o.g(\"x\", undefined); o.g(\"x\", undefined, true, false); }"));
  const badOptional = checkSourceFile(parseSourceFile("function f(o: { g(a?: string): void }): void { o.g(1); }"));
  const badRest = checkSourceFile(parseSourceFile("function f(o: { g(a: string, b?: number, ...rest: boolean[]): void }): void { o.g(\"x\", undefined, true, 1); }"));
  // `true` lands in the optional `b: number` slot positionally, not rest[0].
  const optionalSlotPositional = checkSourceFile(parseSourceFile("function f(o: { g(a: string, b?: number, ...rest: boolean[]): void }): void { o.g(\"x\", true); }"));

  assert.strictEqual(optionalUndefined.diagnostics.length, 0);
  assert.deepStrictEqual(restMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(restOk.diagnostics.length, 0);
  assert.strictEqual(mixedOk.diagnostics.length, 0);
  assert.deepStrictEqual(badOptional.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string | undefined'."]);
  assert.deepStrictEqual(badRest.diagnostics.map((d) => d.message), ["Type '1' is not assignable to type 'boolean'."]);
  assert.deepStrictEqual(optionalSlotPositional.diagnostics.map((d) => d.message), ["Type 'boolean' is not assignable to type 'number | undefined'."]);
});

test("checks contextual object literals and excess", () => {
  // Contextual typing preserves target-driven literals; excess properties on
  // a FRESH object literal are reported (assignment, return, satisfies,
  // nested); a stored variable is not excess-checked.
  const excessMessage = "Object literal may only specify known properties, and 'host' does not exist in type '{ port: number; }'.";
  const contextualLiteral = checkSourceFile(parseSourceFile("function f(): void { const ok: { port: 8080 } = { port: 8080 }; }"));
  const excessAssign = checkSourceFile(parseSourceFile("function f(): void { const bad: { port: number } = { port: 1, host: \"x\" }; }"));
  const storedNoExcess = checkSourceFile(parseSourceFile("function f(): void { const tmp = { port: 1, host: \"x\" }; const ok: { port: number } = tmp; }"));
  const returnExcess = checkSourceFile(parseSourceFile("function g(): { port: number } { return { port: 1, host: \"x\" }; }"));
  const satisfiesExcess = checkSourceFile(parseSourceFile("function f(): void { const v = { port: 8080, host: \"x\" } satisfies { port: number }; }"));
  const nestedExcess = checkSourceFile(parseSourceFile("function f(): void { const bad: { server: { port: number } } = { server: { port: 1, host: \"x\" } }; }"));

  assert.strictEqual(contextualLiteral.diagnostics.length, 0);
  assert.deepStrictEqual(excessAssign.diagnostics.map((d) => d.message), [excessMessage]);
  assert.strictEqual(storedNoExcess.diagnostics.length, 0);
  assert.deepStrictEqual(returnExcess.diagnostics.map((d) => d.message), [excessMessage]);
  assert.deepStrictEqual(satisfiesExcess.diagnostics.map((d) => d.message), [excessMessage]);
  assert.deepStrictEqual(nestedExcess.diagnostics.map((d) => d.message), [excessMessage]);
});

test("excess check regularization and empty target", () => {
  // Stored objects regularize recursively (nested freshness stripped), so a
  // stored variable never excess-checks. The broad `{}` target never
  // excess-checks. Call arguments use the same fresh-literal excess rule.
  const excessMessage = "Object literal may only specify known properties, and 'host' does not exist in type '{ port: number; }'.";
  const storedNested = checkSourceFile(parseSourceFile("function f(): void { const tmp = { server: { port: 1, host: \"x\" } }; const ok: { server: { port: number } } = tmp; }"));
  const emptyTarget = checkSourceFile(parseSourceFile("function f(): void { const x: {} = { a: 1 }; }"));
  const nestedEmptyTarget = checkSourceFile(parseSourceFile("function f(): void { const x: { nested: {} } = { nested: { a: 1 } }; }"));
  const callArgExcess = checkSourceFile(parseSourceFile("function f(api: { takesConfig(config: { port: number }): void }): void { api.takesConfig({ port: 1, host: \"x\" }); }"));
  const storedCallArg = checkSourceFile(parseSourceFile("function f(api: { takesConfig(config: { server: { port: number } }): void }): void { const tmp = { server: { port: 1, host: \"x\" } }; api.takesConfig(tmp); }"));

  assert.strictEqual(storedNested.diagnostics.length, 0);
  assert.strictEqual(emptyTarget.diagnostics.length, 0);
  assert.strictEqual(nestedEmptyTarget.diagnostics.length, 0);
  assert.deepStrictEqual(callArgExcess.diagnostics.map((d) => d.message), [excessMessage]);
  assert.strictEqual(storedCallArg.diagnostics.length, 0);
});

test("checks array types", () => {
  // Array literal inference, element-wise array relation, element access type,
  // array-literal call-argument context, and readonly arrays.
  const arrayOk = checkSourceFile(parseSourceFile("function f(): void { const ok: string[] = [\"a\", \"b\"]; }"));
  const elementMismatch = checkSourceFile(parseSourceFile("function f(): void { const bad: string[] = [\"a\", 1]; }"));
  const elementAccess = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs[0]; }"));
  const elementAccessWrong = checkSourceFile(parseSourceFile("function f(xs: string[]): number { return xs[0]; }"));
  const arrayRelate = checkSourceFile(parseSourceFile("function f(xs: string[]): number[] { return xs; }"));
  const readonlyOk = checkSourceFile(parseSourceFile("function f(api: { takes(xs: readonly number[]): void }): void { api.takes([1, 2, 3]); }"));
  const readonlyMismatch = checkSourceFile(parseSourceFile("function f(api: { takes(xs: readonly number[]): void }): void { api.takes([\"x\"]); }"));

  assert.strictEqual(arrayOk.diagnostics.length, 0);
  assert.deepStrictEqual(elementMismatch.diagnostics.map((d) => d.message), ["Type '(string | number)[]' is not assignable to type 'string[]'."]);
  assert.strictEqual(elementAccess.diagnostics.length, 0);
  assert.deepStrictEqual(elementAccessWrong.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(arrayRelate.diagnostics.map((d) => d.message), ["Type 'string[]' is not assignable to type 'number[]'."]);
  assert.strictEqual(readonlyOk.diagnostics.length, 0);
  assert.deepStrictEqual(readonlyMismatch.diagnostics.map((d) => d.message), ["Type 'string[]' is not assignable to type 'number[]'."]);
});

test("checks string indexing and builtin method shapes", () => {
  // Strings are readonly indexable by number; string/array/static built-ins
  // expose real signatures so bad arguments are reported instead of being
  // swallowed by any-rest placeholders.
  const stringIndexOk = checkSourceFile(parseSourceFile("function f(text: string, index: number): string { return text[index]; }"));
  const stringIndexBad = checkSourceFile(parseSourceFile("function f(text: string): string { return text[\"x\"]; }"));
  const charCodeOk = checkSourceFile(parseSourceFile("function f(text: string): number { return text.charCodeAt(0); }"));
  const charCodeBad = checkSourceFile(parseSourceFile("function f(text: string): number { return text.charCodeAt(\"x\"); }"));
  const splitOk = checkSourceFile(parseSourceFile("function f(text: string): string[] { return text.split(\".\"); }"));
  const arrayPushBad = checkSourceFile(parseSourceFile("function f(xs: string[]): number { return xs.push(1); }"));
  const objectIsOk = checkSourceFile(parseSourceFile("function f(a: string, b: number): boolean { return Object.is(a, b); }"));
  const fromCharCodeOk = checkSourceFile(parseSourceFile("function f(code: number): string { return String.fromCharCode(code); }"));

  assert.strictEqual(stringIndexOk.diagnostics.length, 0);
  assert.deepStrictEqual(stringIndexBad.diagnostics.map((d) => d.message), ["Type '\"x\"' cannot be used to index type 'string'."]);
  assert.strictEqual(charCodeOk.diagnostics.length, 0);
  assert.deepStrictEqual(charCodeBad.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number | undefined'."]);
  assert.strictEqual(splitOk.diagnostics.length, 0);
  assert.deepStrictEqual(arrayPushBad.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(objectIsOk.diagnostics.length, 0);
  assert.strictEqual(fromCharCodeOk.diagnostics.length, 0);
});

test("narrows branch types from control flow conditions", () => {
  const typeofThen = checkSourceFile(parseSourceFile("function f(x: string | number): string { if (typeof x === \"string\") { return x; } return \"fallback\"; }"));
  const typeofElse = checkSourceFile(parseSourceFile("function f(x: string | number): number { if (typeof x === \"string\") { return 1; } return x; }"));
  const nullish = checkSourceFile(parseSourceFile("function f(x: string | undefined): string { if (x !== undefined) { return x; } return \"fallback\"; }"));
  const truthy = checkSourceFile(parseSourceFile("function f(x: \"\" | \"ok\"): \"ok\" { if (x) { return x; } return \"ok\"; }"));
  const negated = checkSourceFile(parseSourceFile("function f(x: string | null): string { if (!x) { return \"fallback\"; } return x; }"));
  const noLeak = checkSourceFile(parseSourceFile("function f(x: string | undefined): string { if (x !== undefined) { } return x; }"));

  assert.strictEqual(typeofThen.diagnostics.length, 0);
  assert.strictEqual(typeofElse.diagnostics.length, 0);
  assert.strictEqual(nullish.diagnostics.length, 0);
  assert.strictEqual(truthy.diagnostics.length, 0);
  assert.strictEqual(negated.diagnostics.length, 0);
  assert.deepStrictEqual(noLeak.diagnostics.map((d) => d.message), ["Type 'string | undefined' is not assignable to type 'string'."]);
});

test("narrows switch clause types from discriminants", () => {
  const stringCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | 1): \"a\" { switch (x) { case \"a\": return x; default: return \"a\"; } }"));
  const numberCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | 1 | 2): 1 { switch (x) { case 1: return x; default: return 1; } }"));
  const defaultCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | \"c\"): \"c\" { switch (x) { case \"a\": return \"c\"; case \"b\": return \"c\"; default: return x; } }"));
  const mismatch = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\"): \"a\" { switch (x) { case \"b\": return x; default: return \"a\"; } }"));
  const fallthrough = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | \"c\"): \"a\" | \"b\" { switch (x) { case \"a\": case \"b\": return x; default: return \"a\"; } }"));

  assert.strictEqual(stringCase.diagnostics.length, 0);
  assert.strictEqual(numberCase.diagnostics.length, 0);
  assert.strictEqual(defaultCase.diagnostics.length, 0);
  assert.deepStrictEqual(mismatch.diagnostics.map((d) => d.message), ["Type '\"b\"' is not assignable to type '\"a\"'."]);
  assert.strictEqual(fallthrough.diagnostics.length, 0);
});

test("checks try throw labeled with and empty statements", () => {
  const tryBlock = checkSourceFile(parseSourceFile("function f(): number { try { return \"x\"; } catch (e) { return 1; } }"));
  const catchBlock = checkSourceFile(parseSourceFile("function f(): number { try { throw \"x\"; } catch (e) { return \"bad\"; } }"));
  const finallyBlock = checkSourceFile(parseSourceFile("function f(): void { try { } finally { const value: number = \"x\"; } }"));
  const throwExpression = checkSourceFile(parseSourceFile("function f(value: string): void { throw value.toFixed(); }"));
  const labeled = checkSourceFile(parseSourceFile("function f(): number { label: return \"x\"; }"));
  const withStatement = checkSourceFile(parseSourceFile("function f(box: { value: number }): number { with (box) { return \"x\"; } }"));
  const emptyAndDebugger = checkSourceFile(parseSourceFile("function f(): number { ; debugger; return 1; }"));

  assert.deepStrictEqual(tryBlock.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(catchBlock.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(finallyBlock.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(throwExpression.diagnostics.map((d) => d.message), ["Property 'toFixed' does not exist on type 'string'."]);
  assert.deepStrictEqual(labeled.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(withStatement.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.strictEqual(emptyAndDebugger.diagnostics.length, 0);
});

test("checks additional expression forms", () => {
  // Template/type/void/delete/non-null/yield/await/new expression nodes are
  // visited and typed instead of falling through to the unresolved sentinel.
  const templateOk = checkSourceFile(parseSourceFile("function f(name: string): string { return `hello ${name}`; }"));
  const typeOfOk = checkSourceFile(parseSourceFile("function f(value: unknown): string { return typeof value; }"));
  const voidOk = checkSourceFile(parseSourceFile("function f(): undefined { return void 1; }"));
  const deleteOk = checkSourceFile(parseSourceFile("function f(box: { value?: number }): boolean { return delete box.value; }"));
  const nonNullOk = checkSourceFile(parseSourceFile("function f(value: string | null): string { return value!; }"));
  const newOk = checkSourceFile(parseSourceFile("class Box { value: number; constructor(value: number) { this.value = value; } } function f(): Box { return new Box(1); }"));
  const newArgMismatch = checkSourceFile(parseSourceFile("class Box { constructor(value: number) { } } function f(): Box { return new Box(\"x\"); }"));
  const staticMemberOk = checkSourceFile(parseSourceFile("class Box { static version: number; static create(value: number): Box { return new Box(); } } function f(): number { return Box.version; }"));
  const staticCallMismatch = checkSourceFile(parseSourceFile("class Box { static create(value: number): Box { return new Box(); } } function f(): Box { return Box.create(\"x\"); }"));
  const staticNotInstance = checkSourceFile(parseSourceFile("class Box { static version: number; } function f(box: Box): number { return box.version; }"));

  assert.strictEqual(templateOk.diagnostics.length, 0);
  assert.strictEqual(typeOfOk.diagnostics.length, 0);
  assert.strictEqual(voidOk.diagnostics.length, 0);
  assert.strictEqual(deleteOk.diagnostics.length, 0);
  assert.strictEqual(nonNullOk.diagnostics.length, 0);
  assert.strictEqual(newOk.diagnostics.length, 0);
  assert.deepStrictEqual(newArgMismatch.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.strictEqual(staticMemberOk.diagnostics.length, 0);
  assert.deepStrictEqual(staticCallMismatch.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(staticNotInstance.diagnostics.map((d) => d.message), ["Property 'version' does not exist on type 'Box'."]);
});

test("checks array spread index and broad object", () => {
  // Array spreads contribute their element type (not silently skipped); array
  // element access requires a numeric index; the broad `{}` accepts arrays.
  const spreadMismatch = checkSourceFile(parseSourceFile("function f(numbers: number[]): void { const xs: string[] = [...numbers]; }"));
  const spreadOk = checkSourceFile(parseSourceFile("function f(more: string[]): void { const xs: string[] = [\"a\", ...more]; }"));
  const spreadElementMismatch = checkSourceFile(parseSourceFile("function f(numbers: number[]): void { const xs: string[] = [\"a\", ...numbers]; }"));
  const numericIndex = checkSourceFile(parseSourceFile("function f(xs: string[], i: number): string { return xs[i]; }"));
  const nonNumericIndex = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs[\"bad\"]; }"));
  const broadObjectAcceptsArray = checkSourceFile(parseSourceFile("function f(xs: string[]): {} { return xs; }"));

  assert.deepStrictEqual(spreadMismatch.diagnostics.map((d) => d.message), ["Type 'number[]' is not assignable to type 'string[]'."]);
  assert.strictEqual(spreadOk.diagnostics.length, 0);
  assert.deepStrictEqual(spreadElementMismatch.diagnostics.map((d) => d.message), ["Type '(string | number)[]' is not assignable to type 'string[]'."]);
  assert.strictEqual(numericIndex.diagnostics.length, 0);
  assert.deepStrictEqual(nonNumericIndex.diagnostics.map((d) => d.message), ["Type '\"bad\"' cannot be used to index type 'string[]'."]);
  assert.strictEqual(broadObjectAcceptsArray.diagnostics.length, 0);
});

test("checks broad empty object and index validation", () => {
  // `unknown`/`boolean` are not valid numeric array indexes; `any` is accepted
  // to avoid false precision. The broad `{}` target accepts any modeled
  // non-nullish source (string/number/boolean/function/array), but rejects
  // null/undefined/unknown.
  const unknownIndex = checkSourceFile(parseSourceFile("function f(xs: string[], i: unknown): string { return xs[i]; }"));
  const anyIndex = checkSourceFile(parseSourceFile("function f(xs: string[], i: any): string { return xs[i]; }"));
  const booleanIndex = checkSourceFile(parseSourceFile("function f(xs: string[], i: boolean): string { return xs[i]; }"));
  const broadString = checkSourceFile(parseSourceFile("function f(x: string): {} { return x; }"));
  const broadNumber = checkSourceFile(parseSourceFile("function f(x: number): {} { return x; }"));
  const broadBoolean = checkSourceFile(parseSourceFile("function f(x: boolean): {} { return x; }"));
  const broadFunction = checkSourceFile(parseSourceFile("function f(): {} { return () => 1; }"));
  const broadNull = checkSourceFile(parseSourceFile("function f(): {} { return null; }"));
  const broadUndefined = checkSourceFile(parseSourceFile("function f(): {} { return undefined; }"));
  const broadUnknown = checkSourceFile(parseSourceFile("function f(x: unknown): {} { return x; }"));

  assert.deepStrictEqual(unknownIndex.diagnostics.map((d) => d.message), ["Type 'unknown' cannot be used to index type 'string[]'."]);
  assert.strictEqual(anyIndex.diagnostics.length, 0);
  assert.deepStrictEqual(booleanIndex.diagnostics.map((d) => d.message), ["Type 'boolean' cannot be used to index type 'string[]'."]);
  assert.strictEqual(broadString.diagnostics.length, 0);
  assert.strictEqual(broadNumber.diagnostics.length, 0);
  assert.strictEqual(broadBoolean.diagnostics.length, 0);
  assert.strictEqual(broadFunction.diagnostics.length, 0);
  assert.deepStrictEqual(broadNull.diagnostics.map((d) => d.message), ["Type 'null' is not assignable to type '{}'."]);
  assert.deepStrictEqual(broadUndefined.diagnostics.map((d) => d.message), ["Type 'undefined' is not assignable to type '{}'."]);
  assert.deepStrictEqual(broadUnknown.diagnostics.map((d) => d.message), ["Type 'unknown' is not assignable to type '{}'."]);
});

test("checks object type signatures", () => {
  // Index signatures `{ [k: K]: V }`, call signatures `{ (a): R }`,
  // construct signatures `{ new (a): R }`, and named array `length`.
  const indexOk = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: string): number { return d[key]; }"));
  const indexValueMismatch = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: string): string { return d[key]; }"));
  const indexNumericKeyOk = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: number): number { return d[key]; }"));
  const indexBadKey = checkSourceFile(parseSourceFile("function f(d: { [key: number]: string }, key: string): string { return d[key]; }"));
  const callOk = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): number { return fn(\"x\"); }"));
  const callReturnMismatch = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): string { return fn(\"x\"); }"));
  const callArgMismatch = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): number { return fn(1); }"));
  const constructOk = checkSourceFile(parseSourceFile("interface Widget { value: number; } function f(c: { new (text: string): Widget }): void { }"));
  const arrayLengthOk = checkSourceFile(parseSourceFile("function f(xs: string[]): number { return xs.length; }"));
  const arrayLengthMismatch = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs.length; }"));

  assert.strictEqual(indexOk.diagnostics.length, 0);
  assert.deepStrictEqual(indexValueMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(indexNumericKeyOk.diagnostics.length, 0);
  assert.deepStrictEqual(indexBadKey.diagnostics.map((d) => d.message), ["Type 'string' cannot be used to index type '{ [key: number]: string; }'."]);
  assert.strictEqual(callOk.diagnostics.length, 0);
  assert.deepStrictEqual(callReturnMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.deepStrictEqual(callArgMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(constructOk.diagnostics.length, 0);
  assert.strictEqual(arrayLengthOk.diagnostics.length, 0);
  assert.deepStrictEqual(arrayLengthMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
});

test("checks function constructor and parenthesized type nodes", () => {
  const functionTypeOk = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): number { return callback(\"x\"); }"));
  const functionArgMismatch = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): number { return callback(1); }"));
  const functionReturnMismatch = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): string { return callback(\"x\"); }"));
  const constructorTypeOk = checkSourceFile(parseSourceFile("interface Widget { value: number; } function f(factory: new (value: number) => Widget): Widget { return new factory(1); }"));
  const constructorArgMismatch = checkSourceFile(parseSourceFile("interface Widget { value: number; } function f(factory: new (value: number) => Widget): Widget { return new factory(\"x\"); }"));
  const parenthesized = checkSourceFile(parseSourceFile("type Count = (number); function f(value: Count): number { return value; }"));

  assert.strictEqual(functionTypeOk.diagnostics.length, 0);
  assert.deepStrictEqual(functionArgMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.deepStrictEqual(functionReturnMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(constructorTypeOk.diagnostics.length, 0);
  assert.deepStrictEqual(constructorArgMismatch.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.strictEqual(parenthesized.diagnostics.length, 0);
});

test("checks literal named object members", () => {
  // String/numeric property names and accessor members contribute real object
  // properties. Bracket access with a literal name reads the same property
  // table as dot access, so the checker does not require identifier-only keys.
  const objectStringNameOk = checkSourceFile(parseSourceFile("function f(): number { const obj = { \"answer\": 42 }; return obj[\"answer\"]; }"));
  const objectNumericNameOk = checkSourceFile(parseSourceFile("function f(): string { const obj = { 0: \"zero\" }; return obj[0]; }"));
  const objectAccessorOk = checkSourceFile(parseSourceFile("function f(): number { const obj = { get value(): number { return 1; }, set value(v: number) { } }; return obj.value; }"));
  const typeStringNameOk = checkSourceFile(parseSourceFile("function f(x: { \"answer\": number }): number { return x[\"answer\"]; }"));
  const typeNumericNameMismatch = checkSourceFile(parseSourceFile("function f(x: { 0: string }): number { return x[0]; }"));

  assert.strictEqual(objectStringNameOk.diagnostics.length, 0);
  assert.strictEqual(objectNumericNameOk.diagnostics.length, 0);
  assert.strictEqual(objectAccessorOk.diagnostics.length, 0);
  assert.strictEqual(typeStringNameOk.diagnostics.length, 0);
  assert.deepStrictEqual(typeNumericNameMismatch.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("resolves type alias references", () => {
  // Named type references resolve through the type-alias environment instead
  // of silently becoming `any`. Unresolved names, circular aliases, and
  // generic aliases each surface a deliberate diagnostic.
  const aliasToIndex = checkSourceFile(parseSourceFile("type Dict = { [key: string]: number }; function read(d: Dict, key: string): number { return d[key]; }"));
  const aliasToCall = checkSourceFile(parseSourceFile("type Fn = { (text: string): number }; function call(fn: Fn): number { return fn(\"x\"); }"));
  const aliasToPrimitiveMismatch = checkSourceFile(parseSourceFile("type Count = number; function bad(x: Count): string { return x; }"));
  const aliasOfAliasOk = checkSourceFile(parseSourceFile("type Count = number; type Alias = Count; function ok(x: Alias): number { return x; }"));
  const unresolved = checkSourceFile(parseSourceFile("function bad(x: MissingType): number { return 1; }"));
  const circular = checkSourceFile(parseSourceFile("type A = B; type B = A;"));
  const genericUsage = checkSourceFile(parseSourceFile("type Box<T> = { value: T }; function f(b: Box<number>): void { }"));
  const genericBareUsage = checkSourceFile(parseSourceFile("type Box<T> = { value: T }; function f(b: Box): void { }"));

  assert.strictEqual(aliasToIndex.diagnostics.length, 0);
  assert.strictEqual(aliasToCall.diagnostics.length, 0);
  assert.deepStrictEqual(aliasToPrimitiveMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(aliasOfAliasOk.diagnostics.length, 0);
  assert.deepStrictEqual(unresolved.diagnostics.map((d) => d.message), ["Cannot find name 'MissingType'."]);
  assert.deepStrictEqual(circular.diagnostics.map((d) => d.message), ["Type alias 'B' circularly references itself.", "Type alias 'A' circularly references itself."]);
  assert.strictEqual(genericUsage.diagnostics.length, 0);
  assert.deepStrictEqual(genericBareUsage.diagnostics.map((d) => d.message), ["Type alias 'Box' requires 1 type argument."]);
});

test("resolves qualified type names through namespace exports", () => {
  // Qualified type references walk the binder's namespace export tables rather
  // than being rejected or resolved by string heuristics.
  const interfaceOk = checkSourceFile(parseSourceFile("namespace Shapes { export interface Box { value: number; } } function f(box: Shapes.Box): number { return box.value; }"));
  const aliasOk = checkSourceFile(parseSourceFile("namespace Shapes { export type Box = { value: string }; } function f(box: Shapes.Box): string { return box.value; }"));
  const missing = checkSourceFile(parseSourceFile("namespace Shapes { export interface Box { value: number; } } function f(box: Shapes.Missing): number { return 1; }"));

  assert.strictEqual(interfaceOk.diagnostics.length, 0);
  assert.strictEqual(aliasOk.diagnostics.length, 0);
  assert.deepStrictEqual(missing.diagnostics.map((d) => d.message), ["Cannot find name 'Shapes.Missing'."]);
});

test("checks nominal object signatures", () => {
  // Interface/class object types carry call, construct, and index signatures
  // through the same structured-type extras used by anonymous type literals.
  const callOk = checkSourceFile(parseSourceFile("interface Parser { (text: string): number; } function f(parse: Parser): number { return parse(\"x\"); }"));
  const callArgMismatch = checkSourceFile(parseSourceFile("interface Parser { (text: string): number; } function f(parse: Parser): number { return parse(1); }"));
  const indexOk = checkSourceFile(parseSourceFile("interface Dict { [key: string]: number; } function f(d: Dict, key: string): number { return d[key]; }"));
  const indexValueMismatch = checkSourceFile(parseSourceFile("interface Dict { [key: string]: number; } function f(d: Dict, key: string): string { return d[key]; }"));
  const constructOk = checkSourceFile(parseSourceFile("interface Widget { value: number; } interface WidgetFactory { new (value: number): Widget; } function f(factory: WidgetFactory): Widget { return new factory(1); }"));

  assert.strictEqual(callOk.diagnostics.length, 0);
  assert.deepStrictEqual(callArgMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(indexOk.diagnostics.length, 0);
  assert.deepStrictEqual(indexValueMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(constructOk.diagnostics.length, 0);
});

test("enforces type alias scoping rules", () => {
  // Duplicate aliases now come from the binder's declaration-merge diagnostics
  // instead of the old checker-owned string map. Block-local aliases resolve
  // through the same binder symbol graph as values, including forward refs and
  // shadowing.
  const duplicate = checkSourceFile(parseSourceFile("type A = number; type A = string;"));
  const duplicateRecovery = checkSourceFile(parseSourceFile("type A = number; type A = string; function f(x: A): string { return x; }"));
  const localShadow = checkSourceFile(parseSourceFile("type X = number; function f(): string { type X = string; const x: X = \"a\"; return x; }"));
  const localForwardRef = checkSourceFile(parseSourceFile("function f(): number { const x: Local = 1; type Local = number; return x; }"));
  const shadowNoLeak = checkSourceFile(parseSourceFile("type X = number; function f(): void { type X = string; const a: X = \"z\"; } function g(y: X): string { return y; }"));

  assert.deepStrictEqual(duplicate.diagnostics.map((d) => d.message), ["Duplicate identifier 'A'.", "Duplicate identifier 'A'."]);
  assert.deepStrictEqual(duplicateRecovery.diagnostics.map((d) => d.message), ["Duplicate identifier 'A'.", "Duplicate identifier 'A'.", "Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(localShadow.diagnostics.length, 0);
  assert.strictEqual(localForwardRef.diagnostics.length, 0);
  // The local shadow inside f must not leak: g's `y: X` resolves to the outer
  // `number`, so returning it as `string` is still a mismatch.
  assert.deepStrictEqual(shadowNoLeak.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
});

test("m5b resolves nominal interface and class members", () => {
  // Type references resolve through binder Type-meaning symbols, not through a
  // string alias map. Interface/class member tables become nominal object
  // types, so property access is checked against the declared member shape.
  const interfaceOk = checkSourceFile(parseSourceFile("interface Point { x: number; label(): string; } function f(p: Point): string { return p.label(); }"));
  const interfaceMismatch = checkSourceFile(parseSourceFile("interface Point { x: number; } function f(p: Point): string { return p.x; }"));
  const classOk = checkSourceFile(parseSourceFile("class Box { value: number; get(): number { return this.value; } } function f(b: Box): number { return b.value; }"));
  const classMismatch = checkSourceFile(parseSourceFile("class Box { value: number; } function f(b: Box): string { return b.value; }"));

  assert.strictEqual(interfaceOk.diagnostics.length, 0);
  assert.deepStrictEqual(interfaceMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(classOk.diagnostics.length, 0);
  assert.deepStrictEqual(classMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
});

test("m5c instantiates generic aliases interfaces and classes", () => {
  // Generic type references substitute type-parameter symbols through the
  // binder graph. The substitution is shared by aliases, interfaces, classes,
  // nested object members, method parameters, and defaulted parameters.
  const aliasOk = checkSourceFile(parseSourceFile("type Box<T> = { value: T }; function f(b: Box<number>): number { return b.value; }"));
  const aliasMismatch = checkSourceFile(parseSourceFile("type Box<T> = { value: T }; function f(b: Box<number>): string { return b.value; }"));
  const nestedAlias = checkSourceFile(parseSourceFile("type Pair<T> = { left: T; right: { value: T } }; function f(p: Pair<string>): string { return p.right.value; }"));
  const interfaceOk = checkSourceFile(parseSourceFile("interface Box<T> { value: T; get(): T; set(value: T): void; } function f(b: Box<string>): string { b.set(\"x\"); return b.get(); }"));
  const interfaceArgMismatch = checkSourceFile(parseSourceFile("interface Box<T> { set(value: T): void; } function f(b: Box<string>): void { b.set(1); }"));
  const classOk = checkSourceFile(parseSourceFile("class Box<T> { value: T; get(): T { return this.value; } } function f(b: Box<boolean>): boolean { return b.value; }"));
  const defaultTypeArg = checkSourceFile(parseSourceFile("type Box<T = string> = { value: T }; function f(b: Box): string { return b.value; }"));
  const extraTypeArg = checkSourceFile(parseSourceFile("type Box<T> = { value: T }; function f(b: Box<number, string>): void { }"));

  assert.strictEqual(aliasOk.diagnostics.length, 0);
  assert.deepStrictEqual(aliasMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(nestedAlias.diagnostics.length, 0);
  assert.strictEqual(interfaceOk.diagnostics.length, 0);
  assert.deepStrictEqual(interfaceArgMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(classOk.diagnostics.length, 0);
  assert.strictEqual(defaultTypeArg.diagnostics.length, 0);
  assert.deepStrictEqual(extraTypeArg.diagnostics.map((d) => d.message), ["Type alias 'Box' requires 1 type argument, but got 2."]);
});

test("checks interface and class heritage members", () => {
  const interfaceBase = checkSourceFile(parseSourceFile("interface Base { value: number; } interface Derived extends Base { label: string; } function f(d: Derived): number { return d.value; }"));
  const interfaceMismatch = checkSourceFile(parseSourceFile("interface Base { value: number; } interface Derived extends Base { } function f(d: Derived): string { return d.value; }"));
  const genericBase = checkSourceFile(parseSourceFile("interface Box<T> { value: T; } interface StringBox extends Box<string> { } function f(box: StringBox): string { return box.value; }"));
  const classBase = checkSourceFile(parseSourceFile("class Base { value: number; get(): number { return this.value; } } class Derived extends Base { label: string; } function f(d: Derived): number { return d.get(); }"));
  const classMismatch = checkSourceFile(parseSourceFile("class Base { value: number; } class Derived extends Base { } function f(d: Derived): string { return d.value; }"));
  const implementsOk = checkSourceFile(parseSourceFile("interface Service { run(): number; } class Good implements Service { run(): number { return 1; } }"));
  const implementsMismatch = checkSourceFile(parseSourceFile("interface Service { run(): number; } class Bad implements Service { run(): string { return \"x\"; } }"));

  assert.strictEqual(interfaceBase.diagnostics.length, 0);
  assert.deepStrictEqual(interfaceMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(genericBase.diagnostics.length, 0);
  assert.strictEqual(classBase.diagnostics.length, 0);
  assert.deepStrictEqual(classMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(implementsOk.diagnostics.length, 0);
  assert.deepStrictEqual(implementsMismatch.diagnostics.map((d) => d.message), ["Type 'Bad' is not assignable to type 'Service'.\n  Types of property 'run' are incompatible.\n    Type '() => string' is not assignable to type '() => number'."]);
});

test("accepts union type node return types", () => {
  const baseCase = checkSourceFile(parseSourceFile("function g(flag: boolean): string | number { return flag ? \"x\" : 1; }"));
  const literalCase = checkSourceFile(parseSourceFile("function f(flag: boolean): \"a\" | \"b\" { return flag ? \"a\" : \"b\"; }"));
  const mixedCase = checkSourceFile(parseSourceFile("function h(flag: boolean): \"a\" | 1 { return flag ? \"a\" : 1; }"));

  assert.strictEqual(baseCase.diagnostics.length, 0);
  assert.strictEqual(literalCase.diagnostics.length, 0);
  assert.strictEqual(mixedCase.diagnostics.length, 0);
});

test("checks intersection type node members and relations", () => {
  const propertyOk = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(value: AB): string { return value.b; }"));
  const propertyMismatch = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(value: AB): number { return value.b; }"));
  const assignOk = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(): void { const value: AB = { a: 1, b: \"x\" }; }"));
  const assignMissing = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(): void { const value: AB = { a: 1 }; }"));

  assert.strictEqual(propertyOk.diagnostics.length, 0);
  assert.deepStrictEqual(propertyMismatch.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.strictEqual(assignOk.diagnostics.length, 0);
  assert.deepStrictEqual(assignMissing.diagnostics.map((d) => d.message), ["Type '{ a: number; }' is not assignable to type '{ a: number; } & { b: string; }'."]);
});

test("reports union type node mismatch", () => {
  const sourceFile = parseSourceFile("function bad(flag: boolean): \"a\" | \"b\" { return flag ? \"a\" : \"c\"; }");
  const result = checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type '\"a\" | \"c\"' is not assignable to type '\"a\" | \"b\"'."]);
});

test("recognizes keyword literal predicates", () => {
  // All six keyword/literal alias predicates (isTrueLiteral/isFalseLiteral/
  // isNullLiteral/isThisExpression/isSuperExpression/isImportExpression) were
  // generator stubs returning false before the bare-concrete-kind fix.
  const trueStatement = parseSourceFile("true;").statements[0]!;
  const falseStatement = parseSourceFile("false;").statements[0]!;
  const nullStatement = parseSourceFile("null;").statements[0]!;
  const thisStatement = parseSourceFile("this;").statements[0]!;

  assert.strictEqual(isExpressionStatement(trueStatement) && isTrueLiteral(trueStatement.expression), true);
  assert.strictEqual(isExpressionStatement(falseStatement) && isFalseLiteral(falseStatement.expression), true);
  assert.strictEqual(isExpressionStatement(falseStatement) && isTrueLiteral(falseStatement.expression), false);
  assert.strictEqual(isExpressionStatement(nullStatement) && isNullLiteral(nullStatement.expression), true);
  assert.strictEqual(isExpressionStatement(thisStatement) && isThisExpression(thisStatement.expression), true);

  // `super` and `import` are not valid standalone expression statements, so
  // exercise their predicates with directly constructed keyword nodes.
  const superExpression = createNode(Kind.SuperKeyword) as SuperExpression;
  const importExpression = createNode(Kind.ImportKeyword) as ImportExpression;

  assert.strictEqual(isSuperExpression(superExpression), true);
  assert.strictEqual(isImportExpression(superExpression), false);
  assert.strictEqual(isImportExpression(importExpression), true);
});

test("union reduction none keeps redundant members", () => {
  const state = newCheckState();
  const regularA = getStringLiteralType("a", state);
  const result = getUnionTypeEx([stringType, regularA], UnionReduction.None, state);

  assert.strictEqual(unionConstituents(result)?.length ?? 0, 2);
});

test("fresh plus regular same literal reduces to regular", () => {
  const state = newCheckState();
  const regularA = getStringLiteralType("a", state);
  const freshA = getFreshTypeOfLiteralType(regularA, state);
  const result = getUnionType([freshA, regularA], state);

  assert.strictEqual(result === regularA, true);
});

test("reduces redundant literal union members", () => {
  // `string | "a"` reduces to `string`, `number | 1` to `number`,
  // `boolean | true` to `boolean` — the message shows the reduced base type.
  const stringCase = checkSourceFile(parseSourceFile("function f(): number { const x: string | \"a\" = \"a\"; return x; }"));
  const numberCase = checkSourceFile(parseSourceFile("function f(): string { const x: number | 1 = 1; return x; }"));
  const booleanCase = checkSourceFile(parseSourceFile("function f(): number { const x: boolean | true = true; return x; }"));

  assert.deepStrictEqual(stringCase.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
  assert.deepStrictEqual(numberCase.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.deepStrictEqual(booleanCase.diagnostics.map((d) => d.message), ["Type 'boolean' is not assignable to type 'number'."]);
});

test("makes destructured binding names available to checked bodies", () => {
  const sourceFile = parseSourceFile("function f({ value }: string): string { return value; }");
  const result = checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);
});

test("checks destructured binding element types", () => {
  const parameterOk = checkSourceFile(parseSourceFile("function f({ value }: { value: number }): number { return value; }"));
  const parameterMismatch = checkSourceFile(parseSourceFile("function f({ value }: { value: number }): string { return value; }"));
  const renamedProperty = checkSourceFile(parseSourceFile("function f({ value: renamed }: { value: string }): string { return renamed; }"));
  const variableOk = checkSourceFile(parseSourceFile("function f(): number { const { value } = { value: 1 }; return value; }"));
  const arrayOk = checkSourceFile(parseSourceFile("function f(xs: number[]): number { const [first] = xs; return first; }"));

  assert.strictEqual(parameterOk.diagnostics.length, 0);
  assert.deepStrictEqual(parameterMismatch.diagnostics.map((d) => d.message), ["Type 'number' is not assignable to type 'string'."]);
  assert.strictEqual(renamedProperty.diagnostics.length, 0);
  assert.strictEqual(variableOk.diagnostics.length, 0);
  assert.strictEqual(arrayOk.diagnostics.length, 0);
});

test("checker class entry reports assignment mismatches", () => {
  const sourceFile = parseSourceFile("const x: number = \"a\";");
  const result = newChecker().checkSourceFile(sourceFile);

  assert.deepStrictEqual(result.diagnostics.map((d) => d.message), ["Type 'string' is not assignable to type 'number'."]);
});

test("checker class entry accepts well typed assignment", () => {
  const sourceFile = parseSourceFile("const y: number = 1;");
  const result = newChecker().checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);
});

// ─────────────────────────────────────────────────────────────────────────
// M5a (codex-041455): VALUE/module/export name resolution moved from the
// string-keyed TypeEnvironment substitution to the binder symbol graph
// (bind-before-check → NameResolver.resolve → getTypeOfSymbol flag-dispatch).
// ROOT CAUSE for these two probes: M5a-resolution (the checker now consumes
// the binder's locals / symbol.exports). They prove the resolution swap
// preserves the import-alias-vs-export-alias and local-vs-export symbol
// distinctions the binder builds (M4c), and check cleanly with no spurious
// value-resolution diagnostics.
// ─────────────────────────────────────────────────────────────────────────

test("m5a import alias and export resolve to distinct binder symbols", () => {
  // `import { value as localValue } from "./dep.js"; export { localValue };`
  // checkSourceFile binds-before-checks; the final `localValue;` reference
  // resolves the IMPORT alias from sourceFile.locals (NameResolver walks
  // locals first), while the module export surface keeps a DISTINCT export
  // alias in sourceFile.symbol.exports — they must NOT collapse into one entry.
  const sourceFile = parseSourceFile("import { value as localValue } from \"./dep.js\";\nexport { localValue };\nlocalValue;");
  const result = checkSourceFile(sourceFile);

  // No spurious value-resolution diagnostic: the reference resolved.
  assert.strictEqual(result.diagnostics.length, 0);

  const importAlias = sourceFile.locals?.get("localValue");
  const exportAlias = sourceFile.symbol?.exports?.get("localValue");
  assert.strictEqual(importAlias?.flags, SymbolFlags.Alias);
  assert.strictEqual(exportAlias?.flags, SymbolFlags.Alias);
  // The local import alias and the module export alias are DISTINCT symbols.
  assert.ok(importAlias !== exportAlias);

  // The standalone `localValue;` reference resolves to the IMPORT alias
  // (the lexical local), not the export-surface alias.
  const reference = findExpressionStatementIdentifier(sourceFile, "localValue");
  assert.ok(reference !== null && reference !== undefined);
  const resolver = makeM5aResolver();
  const resolved = resolver.resolve(reference!, "localValue", SymbolFlags.Value | SymbolFlags.Alias, undefined, true, false);
  assert.ok(resolved === importAlias);
});

test("m5a export const in file reference and export table keep symbol distinction", () => {
  // `export const exported = 1; exported;`
  // The binder (M4c) splits this into a LOCAL symbol (ExportValue, in
  // sourceFile.locals) linked via exportSymbol to the EXPORT symbol
  // (BlockScopedVariable, in sourceFile.symbol.exports). An in-file value
  // reference (`exported;`) carries `Value` meaning, which the ExportValue
  // local does NOT satisfy, so NameResolver walks past it to the export
  // symbol that holds the real value flags — matching tsgo resolveName.
  // The symbol distinction (local↔export link) is preserved either way.
  const sourceFile = parseSourceFile("export const exported = 1;\nexported;");
  const result = checkSourceFile(sourceFile);

  assert.strictEqual(result.diagnostics.length, 0);

  const local = sourceFile.locals?.get("exported");
  const exported = sourceFile.symbol?.exports?.get("exported");
  assert.strictEqual(local?.flags, SymbolFlags.ExportValue);
  assert.strictEqual(exported?.flags, SymbolFlags.BlockScopedVariable);
  // The local↔export link is intact (the symbol distinction is preserved).
  assert.ok(local?.exportSymbol === exported);

  const reference = findExpressionStatementIdentifier(sourceFile, "exported");
  assert.ok(reference !== null && reference !== undefined);
  const resolver = makeM5aResolver();
  const resolved = resolver.resolve(reference!, "exported", SymbolFlags.Value | SymbolFlags.Alias, undefined, true, false);
  // The ExportValue local is filtered by the Value meaning; resolution lands
  // on the export symbol (which carries the real BlockScopedVariable value).
  assert.ok(resolved === exported);
  assert.ok(resolved !== local);
});

// Find the identifier `text` whose direct parent is an ExpressionStatement (the
// standalone `name;` reference site), walking the bound AST via forEachChild.
function findExpressionStatementIdentifier(node: Node, text: string): Node | undefined {
  if (node.kind === Kind.Identifier && (node as { readonly text?: string }).text === text
    && nodeParent(node)?.kind === Kind.ExpressionStatement) {
    return node;
  }
  let found: Node | undefined;
  forEachChild(node, (child) => {
    if (found === undefined) {
      found = findExpressionStatementIdentifier(child, text);
    }
    return undefined;
  });
  return found;
}

// ---------------------------------------------------------------------------
// symbolToString qualification (S1) — the `.symbols` baseline emits QUALIFIED
// names for members (Symbol(E.A), Symbol(Outer.method)) while top-level
// declarations, locals, parameters, and type parameters stay bare. These cover
// the checker display path the baseline walker calls via program.symbolToString.
// ---------------------------------------------------------------------------

// Bind the file (checkSourceFile binds idempotently) and collect the symbol of
// the first declaration whose name matches, so we can format it via the checker.
function symbolStringByName(source: string, name: string): string {
  const sourceFile = parseSourceFile(source);
  checkSourceFile(sourceFile);
  const checker = newChecker();
  const found: { symbol: ReturnType<typeof nodeSymbol> } = { symbol: undefined };
  const walk = (node: Node): undefined => {
    const symbol = nodeSymbol(node);
    if (found.symbol === undefined && symbol !== undefined && (symbol.name === name || symbol.escapedName === name)) {
      found.symbol = symbol;
    }
    forEachChild(node, walk);
    return undefined;
  };
  walk(sourceFile);
  assert.ok(found.symbol !== undefined, `no symbol named ${name} found`);
  return checker.symbolToString(found.symbol);
}

test("symbolToString qualifies an enum member with its enum", () => {
  assert.strictEqual(symbolStringByName("enum E { A, B }", "A"), "E.A");
});

test("symbolToString leaves the enum itself bare", () => {
  assert.strictEqual(symbolStringByName("enum E { A, B }", "E"), "E");
});

test("symbolToString qualifies a class method with its class", () => {
  assert.strictEqual(symbolStringByName("class Outer { method() {} }", "method"), "Outer.method");
});

test("symbolToString qualifies an interface member with its interface", () => {
  assert.strictEqual(symbolStringByName("interface I { bar(): void; }", "bar"), "I.bar");
});

test("symbolToString qualifies nested namespace members recursively", () => {
  assert.strictEqual(
    symbolStringByName("namespace N { export namespace M { export const x = 1; } }", "x"),
    "N.M.x",
  );
});

test("symbolToString never qualifies a type parameter", () => {
  assert.strictEqual(symbolStringByName("class G<T> { foo(p: T) { return p; } }", "T"), "T");
});

test("symbolToString leaves top-level module exports bare (module symbol dropped)", () => {
  // In a module file the source-file (module) symbol owns the top-level members,
  // but TS-Go drops it from the chain ("prefer `x` vs `\"foo\".x`").
  assert.strictEqual(symbolStringByName("export class K { m() {} }", "K"), "K");
  assert.strictEqual(symbolStringByName("export class K { m() {} }", "m"), "K.m");
});

// G6 (implicit-any) — an annotation-less, initializer-less parameter or variable
// is an implicit-`any` position: getTypeOfVariableOrParameterOrProperty returns
// `anyType` (not the error type), so the type walker emits `>x : any` exactly as
// TS-Go does (e.g. catchClauseRestProperties.ts `>rest : any`). Locate the FIRST
// reference identifier with the given name and format its resolved type via the
// checker, mirroring the baseline walker's getTypeAtLocation/typeToString path.
function typeStringByIdentifier(source: string, name: string): string {
  const sourceFile = parseSourceFile(source);
  checkSourceFile(sourceFile);
  const checker = newChecker();
  const found: { node: Node | undefined } = { node: undefined };
  const walk = (node: Node): undefined => {
    if (found.node === undefined && isIdentifier(node) && node.text === name) {
      found.node = node;
    }
    forEachChild(node, walk);
    return undefined;
  };
  walk(sourceFile);
  assert.ok(found.node !== undefined, `no identifier named ${name} found`);
  const type = checker.getTypeAtLocation(found.node);
  assert.ok(type !== undefined, `no type for identifier ${name}`);
  return checker.typeToString(type);
}

test("getTypeAtLocation reports an un-annotated parameter as implicit any", () => {
  assert.strictEqual(typeStringByIdentifier("function f(x) { return x; }", "x"), "any");
});

test("getTypeAtLocation reports an un-annotated arrow parameter as implicit any", () => {
  assert.strictEqual(typeStringByIdentifier("const g = (p) => p;", "p"), "any");
});

test("getTypeAtLocation reports an un-annotated un-initialized variable as implicit any", () => {
  assert.strictEqual(typeStringByIdentifier("var v; v;", "v"), "any");
});

// G2 (signature display) — a callable displays as its real `(p: T) => R`
// signature (not the literal token "function"), matching TS-Go signatureToString
// (e.g. `() => void`, `(_condition: boolean) => ...`, `(...data: any[]) => void`).
test("displays a no-argument function declaration as () => R", () => {
  assert.strictEqual(typeStringByIdentifier("function test(): void { }", "test"), "() => void");
});

test("displays a function declaration's parameters and return type", () => {
  assert.strictEqual(typeStringByIdentifier("function f(x: number): string { return \"\"; }", "f"), "(x: number) => string");
});

test("displays multiple parameters joined by a comma", () => {
  assert.strictEqual(
    typeStringByIdentifier("function f(a: number, b: string): boolean { return true; }", "f"),
    "(a: number, b: string) => boolean",
  );
});

test("displays an optional parameter with a trailing question mark", () => {
  assert.strictEqual(typeStringByIdentifier("function f(a?: number): void { }", "f"), "(a?: number) => void");
});

test("displays a rest parameter with a leading ellipsis", () => {
  assert.strictEqual(typeStringByIdentifier("function f(...data: number): void { }", "f"), "(...data: number) => void");
});

// G9 (type-predicate / asserts display) — a predicate return annotation displaces
// the return type in the signature display, matching TS-Go (e.g.
// `(value: unknown) => value is string`, `(_condition: boolean) => asserts condition`).
test("displays an `x is T` narrowing predicate signature", () => {
  assert.strictEqual(
    typeStringByIdentifier("function isString(value: unknown): value is string { return true; }", "isString"),
    "(value: unknown) => value is string",
  );
});

test("displays a bare `asserts x` assertion signature", () => {
  assert.strictEqual(
    typeStringByIdentifier("function assert(_condition: boolean): asserts condition { }", "assert"),
    "(_condition: boolean) => asserts condition",
  );
});

test("displays an `asserts x is T` assertion signature", () => {
  assert.strictEqual(
    typeStringByIdentifier("function assertString(value: unknown): asserts value is string { }", "assertString"),
    "(value: unknown) => asserts value is string",
  );
});

test("displays a `this is T` predicate signature", () => {
  assert.strictEqual(
    typeStringByIdentifier("function f(): this is string { return true; }", "f"),
    "() => this is string",
  );
});

// G7 (object/array literal display) — an anonymous object type terminates EVERY
// member with `;` (including the last), so it renders `{ a: number; b: string; }`
// (TS-Go typePrinter). An empty type is the bare `{}`. Array/tuple element types
// render `T[]`. These match the TS-Go `.types` baseline format exactly.
test("displays a multi-member object literal type with trailing semicolons", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value = { x: 1, y: \"a\" }; value;", "value"),
    "{ x: number; y: string; }",
  );
});

test("displays a single-member annotated object type with a trailing semicolon", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value: { a: number } = { a: 1 }; value;", "value"),
    "{ a: number; }",
  );
});

test("displays an empty object type as a bare {}", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value: {} = {}; value;", "value"),
    "{}",
  );
});

test("displays an optional member with a trailing question mark", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value: { a: number; b?: string } = { a: 1 }; value;", "value"),
    "{ a: number; b?: string; }",
  );
});

test("displays an index signature with a trailing semicolon", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value: { [k: string]: number } = {}; value;", "value"),
    "{ [k: string]: number; }",
  );
});

test("displays an array literal element type as T[]", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value = [1, 2, 3]; value;", "value"),
    "number[]",
  );
});

test("displays an empty array literal as never[]", () => {
  assert.strictEqual(
    typeStringByIdentifier("const value = []; value;", "value"),
    "never[]",
  );
});

// The checker's NameResolver wiring (mirrors the shared resolver in
// checker.checkedtype.ts): getSymbolOfDeclaration reads the in-place node symbol;
// error/arguments are no-op (the checker caller owns unresolved-name diagnostics).
function makeM5aResolver(): NameResolver {
  return new NameResolver(
    {
      argumentsSymbol: () => ({ name: "arguments", declarations: [] }),
      error: () => { /* caller emits unresolved-name diagnostics */ },
      getSymbolOfDeclaration: (node) => nodeSymbol(node),
    },
    {},
  );
}
