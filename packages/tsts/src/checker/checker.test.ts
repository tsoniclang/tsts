import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

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
  Kind,
  type SuperExpression,
  type ImportExpression,
} from "../ast/index.js";

export class CheckerGroundworkTests {
  accepts_numeric_to_fixed_calls_that_flow_into_string_returns(): void {
    const sourceFile = parseSourceFile("function f(x: number): string { return x.toFixed(2); }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  reports_invalid_property_access_on_primitive_receivers(): void {
    const sourceFile = parseSourceFile("function f(x: string): string { return x.toFixed(); }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Property 'toFixed' does not exist on type 'string'."], result.diagnostics.map((d) => d.message));
  }

  reports_return_type_assignability_failures(): void {
    const sourceFile = parseSourceFile("function f(): number { return \"not a number\"; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_every_source_file_in_a_program(): void {
    const host: CompilerHost = {
      readFile: (fileName) => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
    };
    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = checkProgram(program);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], diagnostics.map((d) => d.message));
  }

  checks_method_and_constructor_bodies_inside_classes(): void {
    const sourceFile = parseSourceFile("class Box { getValue(): number { return \"x\"; } }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_declared_arrow_function_return_types(): void {
    const sourceFile = parseSourceFile("const f = (x: string): number => x;");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_loop_initializer_declarations_and_loop_bodies(): void {
    const sourceFile = parseSourceFile("function f(): number { for (const item: string of items) { return item; } return 1; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_conditional_branches_after_assertion_expressions(): void {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string | number' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  builds_a_union_type_from_conditional_branches(): void {
    const sourceFile = parseSourceFile("function f(flag: boolean): string { return flag ? \"a\" as string : 1 as number; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string | number' is not assignable to type 'string'."], result.diagnostics.map((d) => d.message));
  }

  collapses_conditional_branches_of_the_same_type(): void {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? 1 : 2; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  widens_numeric_literal_arithmetic_to_number(): void {
    const sourceFile = parseSourceFile("function f(): number { return 1 + 2; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  widens_string_literal_in_return_position(): void {
    const sourceFile = parseSourceFile("function f(): number { return \"lit\"; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  widens_boolean_literal_in_return_position(): void {
    const sourceFile = parseSourceFile("function f(): number { return false; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'boolean' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  accepts_exact_literal_type_node_return_types(): void {
    const stringCase = checkSourceFile(parseSourceFile("function f(): \"lit\" { return \"lit\"; }"));
    const numberCase = checkSourceFile(parseSourceFile("function g(): 1 { return 1; }"));
    const booleanCase = checkSourceFile(parseSourceFile("function h(): true { return true; }"));

    Assert.Equal(0, stringCase.diagnostics.length);
    Assert.Equal(0, numberCase.diagnostics.length);
    Assert.Equal(0, booleanCase.diagnostics.length);
  }

  reports_literal_type_node_mismatch(): void {
    const sourceFile = parseSourceFile("function f(): \"lit\" { return \"other\"; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type '\"other\"' is not assignable to type '\"lit\"'."], result.diagnostics.map((d) => d.message));
  }

  widens_bigint_literal_in_return_position(): void {
    const sourceFile = parseSourceFile("function f(): number { return 123n; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'bigint' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_bigint_literal_type_nodes(): void {
    // Parser now produces a LiteralTypeNode wrapping a BigIntLiteral for `: 123n`.
    const ok = checkSourceFile(parseSourceFile("function ok(): 123n { return 123n; }"));
    const bad = checkSourceFile(parseSourceFile("function bad(): 123n { return 124n; }"));
    const numberToBigint = checkSourceFile(parseSourceFile("function f(): 123n { return 123; }"));

    Assert.Equal(0, ok.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '124n' is not assignable to type '123n'."], bad.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type '123' is not assignable to type '123n'."], numberToBigint.diagnostics.map((d) => d.message));
  }

  checks_negative_literal_type_nodes(): void {
    // `-1` / `-1n` parse as LiteralTypeNode(PrefixUnaryExpression(MinusToken, literal)).
    const okNumber = checkSourceFile(parseSourceFile("function okNumber(): -1 { return -1; }"));
    const badNumber = checkSourceFile(parseSourceFile("function badNumber(): -1 { return 1; }"));
    const okBigInt = checkSourceFile(parseSourceFile("function okBigInt(): -1n { return -1n; }"));
    const badBigInt = checkSourceFile(parseSourceFile("function badBigInt(): -1n { return 1n; }"));

    Assert.Equal(0, okNumber.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '1' is not assignable to type '-1'."], badNumber.diagnostics.map((d) => d.message));
    Assert.Equal(0, okBigInt.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '1n' is not assignable to type '-1n'."], badBigInt.diagnostics.map((d) => d.message));
  }

  checks_null_literal_type_nodes(): void {
    // `null` resolves to the nullType intrinsic in both expression and
    // literal-type-node position; `undefined` resolves to undefinedType.
    const okNull = checkSourceFile(parseSourceFile("function ok(): null { return null; }"));
    const undefinedToNull = checkSourceFile(parseSourceFile("function bad(): null { return undefined; }"));
    const nullToString = checkSourceFile(parseSourceFile("function badString(): string { return null; }"));
    const nullUnion = checkSourceFile(parseSourceFile("function f(flag: boolean): string | null { return flag ? \"x\" : null; }"));

    Assert.Equal(0, okNull.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'undefined' is not assignable to type 'null'."], undefinedToNull.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'null' is not assignable to type 'string'."], nullToString.diagnostics.map((d) => d.message));
    Assert.Equal(0, nullUnion.diagnostics.length);
  }

  local_undefined_binding_wins_over_global(): void {
    // A parameter named `undefined` must shadow the global undefined fallback:
    // environment lookup first, global-undefined fallback second. This is the
    // property that keeps the name-based `undefined` model safe.
    const ok = checkSourceFile(parseSourceFile("function ok(undefined: number): number { return undefined; }"));
    const bad = checkSourceFile(parseSourceFile("function bad(undefined: number): undefined { return undefined; }"));

    Assert.Equal(0, ok.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'undefined'."], bad.diagnostics.map((d) => d.message));
  }

  boolean_normalizes_to_false_true_union(): void {
    // booleanType IS the canonical `false | true` union, so the two forms are
    // mutually assignable and the union displays as `boolean`.
    const boolToFalseTrue = checkSourceFile(parseSourceFile("function f(b: boolean): false | true { return b; }"));
    const falseTrueToBool = checkSourceFile(parseSourceFile("function f(flag: boolean): boolean { return flag ? true : false; }"));
    const displaysBoolean = checkSourceFile(parseSourceFile("function f(): string { const b: false | true = true; return b; }"));
    const reducesWithLiteral = checkSourceFile(parseSourceFile("function f(): number { const b: boolean | false = true; return b; }"));

    Assert.Equal(0, boolToFalseTrue.diagnostics.length);
    Assert.Equal(0, falseTrueToBool.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'boolean' is not assignable to type 'string'."], displaysBoolean.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'boolean' is not assignable to type 'number'."], reducesWithLiteral.diagnostics.map((d) => d.message));
  }

  boolean_union_interns_to_canonical_object(): void {
    // `false | true` in either order must intern to the exact booleanType
    // singleton — the property that makes boolean relations identity-based.
    // booleanType carries BOTH TypeFlags.Union and TypeFlags.Boolean (TS-Go's
    // two-member boolean-literal union flagging).
    const state = newCheckState();

    Assert.Equal(true, (booleanType.flags & TypeFlags.Union) !== 0);
    Assert.Equal(true, (booleanType.flags & TypeFlags.Boolean) !== 0);
    Assert.Equal(true, getUnionType([regularFalseType, regularTrueType], state) === booleanType);
    Assert.Equal(true, getUnionType([regularTrueType, regularFalseType], state) === booleanType);
  }

  boolean_pair_collapses_in_embedded_union(): void {
    // A `false`+`true` pair inside a larger union displays as `boolean`.
    const result = checkSourceFile(parseSourceFile("function f(): number { const value: string | false | true = true; return value; }"));

    Assert.Equal<readonly string[]>(["Type 'string | boolean' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checker_printer_prints_boolean_union(): void {
    // CheckerPrinter (nodebuilder/api display path) must collapse the canonical
    // boolean union to `boolean` and print boolean literals by value.
    const printer = new CheckerPrinter();

    Assert.Equal("boolean", printer.typeToString(booleanType));
    Assert.Equal("false", printer.typeToString(regularFalseType));
    Assert.Equal("true", printer.typeToString(regularTrueType));
  }

  checks_satisfies_expression(): void {
    // `expr satisfies T` verifies expr is assignable to T but the RESULT type is
    // the expression's own type, not T (proved by routing the result into a
    // narrower return type the target would not satisfy).
    const resultIsExprType = checkSourceFile(parseSourceFile("function f(): \"a\" { return \"a\" satisfies string; }"));
    const checkFails = checkSourceFile(parseSourceFile("function g(): number { return 1 satisfies string; }"));
    const resultNotTarget = checkSourceFile(parseSourceFile("function f(): \"a\" { return \"b\" satisfies string; }"));

    Assert.Equal(0, resultIsExprType.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '1' is not assignable to type 'string'."], checkFails.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type '\"b\"' is not assignable to type '\"a\"'."], resultNotTarget.diagnostics.map((d) => d.message));
  }

  preserves_const_literal_widens_let(): void {
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

    Assert.Equal(0, constNumber.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type '1'."], letNumber.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type '1'."], varNumber.diagnostics.map((d) => d.message));
    Assert.Equal(0, constBoolean.diagnostics.length);
    Assert.Equal(0, constBigInt.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'bigint' is not assignable to type '1n'."], letBigInt.diagnostics.map((d) => d.message));
    Assert.Equal(0, constSatisfies.diagnostics.length);
    Assert.Equal(0, annotationWinsOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type '1'."], annotationWinsNegative.diagnostics.map((d) => d.message));
    Assert.Equal(0, forConst.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type '1'."], forLet.diagnostics.map((d) => d.message));
  }

  derives_logical_operator_result_types(): void {
    // `&&` / `||` / `??` produce operand-derived result types, NOT boolean.
    const orResult = checkSourceFile(parseSourceFile("function f(x: string, y: number): string | number { return x || y; }"));
    const orNotBoolean = checkSourceFile(parseSourceFile("function f(x: string, y: number): number { return x || y; }"));
    const nullishRemovesNull = checkSourceFile(parseSourceFile("function f(x: string | null, y: number): string | number { return x ?? y; }"));
    const nullishNoNull = checkSourceFile(parseSourceFile("function f(x: string, y: number): string { return x ?? y; }"));
    const andBoolean = checkSourceFile(parseSourceFile("function f(b: boolean, y: number): number { return b && y; }"));
    const andString = checkSourceFile(parseSourceFile("function f(x: string, y: number): string { return x && y; }"));

    Assert.Equal(0, orResult.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string | number' is not assignable to type 'number'."], orNotBoolean.diagnostics.map((d) => d.message));
    Assert.Equal(0, nullishRemovesNull.diagnostics.length);
    Assert.Equal(0, nullishNoNull.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'false | number' is not assignable to type 'number'."], andBoolean.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type '\"\" | number' is not assignable to type 'string'."], andString.diagnostics.map((d) => d.message));
  }

  hardens_logical_operator_facts(): void {
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

    Assert.Equal(0, freshFalse.diagnostics.length);
    Assert.Equal(0, trueAnd.diagnostics.length);
    Assert.Equal(0, falseAnd.diagnostics.length);
    Assert.Equal(0, emptyStringOr.diagnostics.length);
    Assert.Equal(0, truthyStringOr.diagnostics.length);
    Assert.Equal(0, undefinedUnionNullish.diagnostics.length);
    Assert.Equal(0, undefinedConstNullish.diagnostics.length);
  }

  resolves_object_literal_members(): void {
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

    Assert.Equal(0, satisfiesOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{ port: string }' is not assignable to type '{ port: number }'.\n  Types of property 'port' are incompatible.\n    Type 'string' is not assignable to type 'number'."], satisfiesBad.diagnostics.map((d) => d.message));
    Assert.Equal(0, propertyOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], propertyWrongType.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Property 'missing' does not exist on type '{ port: number }'."], propertyMissing.diagnostics.map((d) => d.message));
    Assert.Equal(0, objectAssignable.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{}' is not assignable to type '{ port: number }'."], objectMissingProperty.diagnostics.map((d) => d.message));
  }

  extends_object_member_support(): void {
    // void nullish facts; shorthand properties; type-literal method signatures;
    // optional properties (relater skips a missing optional); unsupported
    // members are surfaced explicitly, never silently dropped.
    const voidNullish = checkSourceFile(parseSourceFile("function f(x: void, y: number): number { return x ?? y; }"));
    const shorthand = checkSourceFile(parseSourceFile("function f(a: number): { a: number } { return { a }; }"));
    const methodSignature = checkSourceFile(parseSourceFile("function f(o: { kindString(): string }): string { return o.kindString(); }"));
    const optionalAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a?: number } = { }; }"));
    const requiredAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a: number } = { }; }"));
    const spreadSurfaced = checkSourceFile(parseSourceFile("function f(b: { a: number }): void { const o = { ...b }; }"));

    Assert.Equal(0, voidNullish.diagnostics.length);
    Assert.Equal(0, shorthand.diagnostics.length);
    Assert.Equal(0, methodSignature.diagnostics.length);
    Assert.Equal(0, optionalAbsent.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{}' is not assignable to type '{ a: number }'."], requiredAbsent.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Object member kind 'SpreadAssignment' is not yet supported by the checker."], spreadSurfaced.diagnostics.map((d) => d.message));
  }

  deepens_object_member_typing(): void {
    // Object-literal properties widen; optional access includes undefined;
    // method-signature parameters are checked at call sites; object mismatches
    // get per-property elaboration via the relation path.
    const widensProperty = checkSourceFile(parseSourceFile("function f(): 8080 { const x = { port: 8080 }; return x.port; }"));
    const optionalAccess = checkSourceFile(parseSourceFile("function f(o: { a?: number }): number { return o.a; }"));
    const optionalAccessOk = checkSourceFile(parseSourceFile("function f(o: { a?: number }): number | undefined { return o.a; }"));
    const methodParamOk = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"1\"); }"));
    const methodParamMismatch = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(1); }"));
    const perPropertyElaboration = checkSourceFile(parseSourceFile("function f(): void { const bad: { port: number } = { port: \"x\" }; }"));

    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type '8080'."], widensProperty.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number | undefined' is not assignable to type 'number'."], optionalAccess.diagnostics.map((d) => d.message));
    Assert.Equal(0, optionalAccessOk.diagnostics.length);
    Assert.Equal(0, methodParamOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], methodParamMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type '{ port: string }' is not assignable to type '{ port: number }'.\n  Types of property 'port' are incompatible.\n    Type 'string' is not assignable to type 'number'."], perPropertyElaboration.diagnostics.map((d) => d.message));
  }

  checks_call_signature_arity(): void {
    // Missing required arguments + extra arguments are reported; optional and
    // rest parameters relax the bounds (matching TS-Go/TypeScript).
    const missing = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(); }"));
    const extra = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"a\", \"b\"); }"));
    const optional = checkSourceFile(parseSourceFile("function f(o: { parse(text?: string): number }): number { return o.parse(); }"));
    const restZero = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(); }"));
    const restMany = checkSourceFile(parseSourceFile("function f(o: { log(...args: string[]): number }): number { return o.log(\"a\", \"b\"); }"));
    const exact = checkSourceFile(parseSourceFile("function f(o: { parse(text: string): number }): number { return o.parse(\"a\"); }"));

    Assert.Equal<readonly string[]>(["Expected 1 arguments, but got 0."], missing.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Expected 1 arguments, but got 2."], extra.diagnostics.map((d) => d.message));
    Assert.Equal(0, optional.diagnostics.length);
    Assert.Equal(0, restZero.diagnostics.length);
    Assert.Equal(0, restMany.diagnostics.length);
    Assert.Equal(0, exact.diagnostics.length);
  }

  checks_optional_and_rest_parameter_semantics(): void {
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

    Assert.Equal(0, optionalUndefined.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], restMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, restOk.diagnostics.length);
    Assert.Equal(0, mixedOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string | undefined'."], badOptional.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type '1' is not assignable to type 'boolean'."], badRest.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'boolean' is not assignable to type 'number | undefined'."], optionalSlotPositional.diagnostics.map((d) => d.message));
  }

  checks_contextual_object_literals_and_excess(): void {
    // Contextual typing preserves target-driven literals; excess properties on
    // a FRESH object literal are reported (assignment, return, satisfies,
    // nested); a stored variable is not excess-checked.
    const excessMessage = "Object literal may only specify known properties, and 'host' does not exist in type '{ port: number }'.";
    const contextualLiteral = checkSourceFile(parseSourceFile("function f(): void { const ok: { port: 8080 } = { port: 8080 }; }"));
    const excessAssign = checkSourceFile(parseSourceFile("function f(): void { const bad: { port: number } = { port: 1, host: \"x\" }; }"));
    const storedNoExcess = checkSourceFile(parseSourceFile("function f(): void { const tmp = { port: 1, host: \"x\" }; const ok: { port: number } = tmp; }"));
    const returnExcess = checkSourceFile(parseSourceFile("function g(): { port: number } { return { port: 1, host: \"x\" }; }"));
    const satisfiesExcess = checkSourceFile(parseSourceFile("function f(): void { const v = { port: 8080, host: \"x\" } satisfies { port: number }; }"));
    const nestedExcess = checkSourceFile(parseSourceFile("function f(): void { const bad: { server: { port: number } } = { server: { port: 1, host: \"x\" } }; }"));

    Assert.Equal(0, contextualLiteral.diagnostics.length);
    Assert.Equal<readonly string[]>([excessMessage], excessAssign.diagnostics.map((d) => d.message));
    Assert.Equal(0, storedNoExcess.diagnostics.length);
    Assert.Equal<readonly string[]>([excessMessage], returnExcess.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>([excessMessage], satisfiesExcess.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>([excessMessage], nestedExcess.diagnostics.map((d) => d.message));
  }

  excess_check_regularization_and_empty_target(): void {
    // Stored objects regularize recursively (nested freshness stripped), so a
    // stored variable never excess-checks. The broad `{}` target never
    // excess-checks. Call arguments use the same fresh-literal excess rule.
    const excessMessage = "Object literal may only specify known properties, and 'host' does not exist in type '{ port: number }'.";
    const storedNested = checkSourceFile(parseSourceFile("function f(): void { const tmp = { server: { port: 1, host: \"x\" } }; const ok: { server: { port: number } } = tmp; }"));
    const emptyTarget = checkSourceFile(parseSourceFile("function f(): void { const x: {} = { a: 1 }; }"));
    const nestedEmptyTarget = checkSourceFile(parseSourceFile("function f(): void { const x: { nested: {} } = { nested: { a: 1 } }; }"));
    const callArgExcess = checkSourceFile(parseSourceFile("function f(api: { takesConfig(config: { port: number }): void }): void { api.takesConfig({ port: 1, host: \"x\" }); }"));
    const storedCallArg = checkSourceFile(parseSourceFile("function f(api: { takesConfig(config: { server: { port: number } }): void }): void { const tmp = { server: { port: 1, host: \"x\" } }; api.takesConfig(tmp); }"));

    Assert.Equal(0, storedNested.diagnostics.length);
    Assert.Equal(0, emptyTarget.diagnostics.length);
    Assert.Equal(0, nestedEmptyTarget.diagnostics.length);
    Assert.Equal<readonly string[]>([excessMessage], callArgExcess.diagnostics.map((d) => d.message));
    Assert.Equal(0, storedCallArg.diagnostics.length);
  }

  checks_array_types(): void {
    // Array literal inference, element-wise array relation, element access type,
    // array-literal call-argument context, and readonly arrays.
    const arrayOk = checkSourceFile(parseSourceFile("function f(): void { const ok: string[] = [\"a\", \"b\"]; }"));
    const elementMismatch = checkSourceFile(parseSourceFile("function f(): void { const bad: string[] = [\"a\", 1]; }"));
    const elementAccess = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs[0]; }"));
    const elementAccessWrong = checkSourceFile(parseSourceFile("function f(xs: string[]): number { return xs[0]; }"));
    const arrayRelate = checkSourceFile(parseSourceFile("function f(xs: string[]): number[] { return xs; }"));
    const readonlyOk = checkSourceFile(parseSourceFile("function f(api: { takes(xs: readonly number[]): void }): void { api.takes([1, 2, 3]); }"));
    const readonlyMismatch = checkSourceFile(parseSourceFile("function f(api: { takes(xs: readonly number[]): void }): void { api.takes([\"x\"]); }"));

    Assert.Equal(0, arrayOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '(string | number)[]' is not assignable to type 'string[]'."], elementMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, elementAccess.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], elementAccessWrong.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'string[]' is not assignable to type 'number[]'."], arrayRelate.diagnostics.map((d) => d.message));
    Assert.Equal(0, readonlyOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string[]' is not assignable to type 'number[]'."], readonlyMismatch.diagnostics.map((d) => d.message));
  }

  checks_array_spread_index_and_broad_object(): void {
    // Array spreads contribute their element type (not silently skipped); array
    // element access requires a numeric index; the broad `{}` accepts arrays.
    const spreadMismatch = checkSourceFile(parseSourceFile("function f(numbers: number[]): void { const xs: string[] = [...numbers]; }"));
    const spreadOk = checkSourceFile(parseSourceFile("function f(more: string[]): void { const xs: string[] = [\"a\", ...more]; }"));
    const spreadElementMismatch = checkSourceFile(parseSourceFile("function f(numbers: number[]): void { const xs: string[] = [\"a\", ...numbers]; }"));
    const numericIndex = checkSourceFile(parseSourceFile("function f(xs: string[], i: number): string { return xs[i]; }"));
    const nonNumericIndex = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs[\"bad\"]; }"));
    const broadObjectAcceptsArray = checkSourceFile(parseSourceFile("function f(xs: string[]): {} { return xs; }"));

    Assert.Equal<readonly string[]>(["Type 'number[]' is not assignable to type 'string[]'."], spreadMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, spreadOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '(string | number)[]' is not assignable to type 'string[]'."], spreadElementMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, numericIndex.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '\"bad\"' cannot be used to index type 'string[]'."], nonNumericIndex.diagnostics.map((d) => d.message));
    Assert.Equal(0, broadObjectAcceptsArray.diagnostics.length);
  }

  checks_broad_empty_object_and_index_validation(): void {
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

    Assert.Equal<readonly string[]>(["Type 'unknown' cannot be used to index type 'string[]'."], unknownIndex.diagnostics.map((d) => d.message));
    Assert.Equal(0, anyIndex.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'boolean' cannot be used to index type 'string[]'."], booleanIndex.diagnostics.map((d) => d.message));
    Assert.Equal(0, broadString.diagnostics.length);
    Assert.Equal(0, broadNumber.diagnostics.length);
    Assert.Equal(0, broadBoolean.diagnostics.length);
    Assert.Equal(0, broadFunction.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'null' is not assignable to type '{}'."], broadNull.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'undefined' is not assignable to type '{}'."], broadUndefined.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'unknown' is not assignable to type '{}'."], broadUnknown.diagnostics.map((d) => d.message));
  }

  checks_object_type_signatures(): void {
    // Index signatures `{ [k: K]: V }`, object call signatures `{ (a): R }`, and
    // named array `length`. Construct signatures parse but are deferred by the
    // checker with a deliberate diagnostic.
    const indexOk = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: string): number { return d[key]; }"));
    const indexValueMismatch = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: string): string { return d[key]; }"));
    const indexNumericKeyOk = checkSourceFile(parseSourceFile("function f(d: { [key: string]: number }, key: number): number { return d[key]; }"));
    const indexBadKey = checkSourceFile(parseSourceFile("function f(d: { [key: number]: string }, key: string): string { return d[key]; }"));
    const callOk = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): number { return fn(\"x\"); }"));
    const callReturnMismatch = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): string { return fn(\"x\"); }"));
    const callArgMismatch = checkSourceFile(parseSourceFile("function f(fn: { (text: string): number }): number { return fn(1); }"));
    const constructDeferred = checkSourceFile(parseSourceFile("function f(c: { new (text: string): Widget }): void { }"));
    const arrayLengthOk = checkSourceFile(parseSourceFile("function f(xs: string[]): number { return xs.length; }"));
    const arrayLengthMismatch = checkSourceFile(parseSourceFile("function f(xs: string[]): string { return xs.length; }"));

    Assert.Equal(0, indexOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], indexValueMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, indexNumericKeyOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' cannot be used to index type '{ [key: number]: string }'."], indexBadKey.diagnostics.map((d) => d.message));
    Assert.Equal(0, callOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], callReturnMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], callArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type member kind 'ConstructSignature' is not yet supported by the checker."], constructDeferred.diagnostics.map((d) => d.message));
    Assert.Equal(0, arrayLengthOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], arrayLengthMismatch.diagnostics.map((d) => d.message));
  }

  resolves_type_alias_references(): void {
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

    Assert.Equal(0, aliasToIndex.diagnostics.length);
    Assert.Equal(0, aliasToCall.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], aliasToPrimitiveMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, aliasOfAliasOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Cannot find name 'MissingType'."], unresolved.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type alias 'A' circularly references itself."], circular.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Generic type alias 'Box' is not yet supported by the checker."], genericUsage.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Generic type alias 'Box' is not yet supported by the checker."], genericBareUsage.diagnostics.map((d) => d.message));
  }

  accepts_union_type_node_return_types(): void {
    const baseCase = checkSourceFile(parseSourceFile("function g(flag: boolean): string | number { return flag ? \"x\" : 1; }"));
    const literalCase = checkSourceFile(parseSourceFile("function f(flag: boolean): \"a\" | \"b\" { return flag ? \"a\" : \"b\"; }"));
    const mixedCase = checkSourceFile(parseSourceFile("function h(flag: boolean): \"a\" | 1 { return flag ? \"a\" : 1; }"));

    Assert.Equal(0, baseCase.diagnostics.length);
    Assert.Equal(0, literalCase.diagnostics.length);
    Assert.Equal(0, mixedCase.diagnostics.length);
  }

  reports_union_type_node_mismatch(): void {
    const sourceFile = parseSourceFile("function bad(flag: boolean): \"a\" | \"b\" { return flag ? \"a\" : \"c\"; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type '\"a\" | \"c\"' is not assignable to type '\"a\" | \"b\"'."], result.diagnostics.map((d) => d.message));
  }

  recognizes_keyword_literal_predicates(): void {
    // All six keyword/literal alias predicates (isTrueLiteral/isFalseLiteral/
    // isNullLiteral/isThisExpression/isSuperExpression/isImportExpression) were
    // generator stubs returning false before the bare-concrete-kind fix.
    const trueStatement = parseSourceFile("true;").statements[0]!;
    const falseStatement = parseSourceFile("false;").statements[0]!;
    const nullStatement = parseSourceFile("null;").statements[0]!;
    const thisStatement = parseSourceFile("this;").statements[0]!;

    Assert.Equal(true, isExpressionStatement(trueStatement) && isTrueLiteral(trueStatement.expression));
    Assert.Equal(true, isExpressionStatement(falseStatement) && isFalseLiteral(falseStatement.expression));
    Assert.Equal(false, isExpressionStatement(falseStatement) && isTrueLiteral(falseStatement.expression));
    Assert.Equal(true, isExpressionStatement(nullStatement) && isNullLiteral(nullStatement.expression));
    Assert.Equal(true, isExpressionStatement(thisStatement) && isThisExpression(thisStatement.expression));

    // `super` and `import` are not valid standalone expression statements, so
    // exercise their predicates with directly constructed keyword nodes.
    const superExpression = createNode<SuperExpression>(Kind.SuperKeyword);
    const importExpression = createNode<ImportExpression>(Kind.ImportKeyword);

    Assert.Equal(true, isSuperExpression(superExpression));
    Assert.Equal(false, isImportExpression(superExpression));
    Assert.Equal(true, isImportExpression(importExpression));
  }

  union_reduction_none_keeps_redundant_members(): void {
    const state = newCheckState();
    const regularA = getStringLiteralType("a", state);
    const result = getUnionTypeEx([stringType, regularA], UnionReduction.None, state);

    Assert.Equal(2, unionConstituents(result)?.length ?? 0);
  }

  fresh_plus_regular_same_literal_reduces_to_regular(): void {
    const state = newCheckState();
    const regularA = getStringLiteralType("a", state);
    const freshA = getFreshTypeOfLiteralType(regularA, state);
    const result = getUnionType([freshA, regularA], state);

    Assert.Equal(true, result === regularA);
  }

  reduces_redundant_literal_union_members(): void {
    // `string | "a"` reduces to `string`, `number | 1` to `number`,
    // `boolean | true` to `boolean` — the message shows the reduced base type.
    const stringCase = checkSourceFile(parseSourceFile("function f(): number { const x: string | \"a\" = \"a\"; return x; }"));
    const numberCase = checkSourceFile(parseSourceFile("function f(): string { const x: number | 1 = 1; return x; }"));
    const booleanCase = checkSourceFile(parseSourceFile("function f(): number { const x: boolean | true = true; return x; }"));

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], stringCase.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], numberCase.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'boolean' is not assignable to type 'number'."], booleanCase.diagnostics.map((d) => d.message));
  }

  makes_destructured_binding_names_available_to_checked_bodies(): void {
    const sourceFile = parseSourceFile("function f({ value }: string): string { return value; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  checker_class_entry_reports_assignment_mismatches(): void {
    const sourceFile = parseSourceFile("const x: number = \"a\";");
    const result = newChecker().checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checker_class_entry_accepts_well_typed_assignment(): void {
    const sourceFile = parseSourceFile("const y: number = 1;");
    const result = newChecker().checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }
}

A<CheckerGroundworkTests>().method((t) => t.accepts_numeric_to_fixed_calls_that_flow_into_string_returns).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_invalid_property_access_on_primitive_receivers).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_return_type_assignability_failures).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_every_source_file_in_a_program).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_method_and_constructor_bodies_inside_classes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_declared_arrow_function_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_loop_initializer_declarations_and_loop_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_conditional_branches_after_assertion_expressions).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.builds_a_union_type_from_conditional_branches).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.collapses_conditional_branches_of_the_same_type).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.widens_numeric_literal_arithmetic_to_number).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.widens_string_literal_in_return_position).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.widens_boolean_literal_in_return_position).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.accepts_exact_literal_type_node_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_literal_type_node_mismatch).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.widens_bigint_literal_in_return_position).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_bigint_literal_type_nodes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_negative_literal_type_nodes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_null_literal_type_nodes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.local_undefined_binding_wins_over_global).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.boolean_normalizes_to_false_true_union).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.boolean_union_interns_to_canonical_object).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.boolean_pair_collapses_in_embedded_union).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_printer_prints_boolean_union).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_satisfies_expression).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.preserves_const_literal_widens_let).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.derives_logical_operator_result_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.hardens_logical_operator_facts).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.resolves_object_literal_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.extends_object_member_support).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.deepens_object_member_typing).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_call_signature_arity).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_optional_and_rest_parameter_semantics).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_contextual_object_literals_and_excess).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.excess_check_regularization_and_empty_target).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_array_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_array_spread_index_and_broad_object).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_broad_empty_object_and_index_validation).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_object_type_signatures).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.resolves_type_alias_references).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.accepts_union_type_node_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_union_type_node_mismatch).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.recognizes_keyword_literal_predicates).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.union_reduction_none_keeps_redundant_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.fresh_plus_regular_same_literal_reduces_to_regular).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reduces_redundant_literal_union_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.makes_destructured_binding_names_available_to_checked_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_reports_assignment_mismatches).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_accepts_well_typed_assignment).add(FactAttribute);
