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
  forEachChild,
  nodeParent,
  nodeSymbol,
  Kind,
  SymbolFlags,
  type Node,
  type SuperExpression,
  type ImportExpression,
} from "../ast/index.js";
import { NameResolver } from "../binder/index.js";

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
    // optional properties (relater skips a missing optional); object spreads
    // merge known source properties without silently dropping members.
    const voidNullish = checkSourceFile(parseSourceFile("function f(x: void, y: number): number { return x ?? y; }"));
    const shorthand = checkSourceFile(parseSourceFile("function f(a: number): { a: number } { return { a }; }"));
    const methodSignature = checkSourceFile(parseSourceFile("function f(o: { kindString(): string }): string { return o.kindString(); }"));
    const optionalAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a?: number } = { }; }"));
    const requiredAbsent = checkSourceFile(parseSourceFile("function f(): void { const o: { a: number } = { }; }"));
    const spreadOk = checkSourceFile(parseSourceFile("function f(b: { a: number }): { a: number; label: string } { return { ...b, label: \"x\" }; }"));
    const spreadMismatch = checkSourceFile(parseSourceFile("function f(b: { a: number }): { a: string } { return { ...b }; }"));

    Assert.Equal(0, voidNullish.diagnostics.length);
    Assert.Equal(0, shorthand.diagnostics.length);
    Assert.Equal(0, methodSignature.diagnostics.length);
    Assert.Equal(0, optionalAbsent.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{}' is not assignable to type '{ a: number }'."], requiredAbsent.diagnostics.map((d) => d.message));
    Assert.Equal(0, spreadOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{ a: number }' is not assignable to type '{ a: string }'.\n  Types of property 'a' are incompatible.\n    Type 'number' is not assignable to type 'string'."], spreadMismatch.diagnostics.map((d) => d.message));
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

  checks_string_indexing_and_builtin_method_shapes(): void {
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

    Assert.Equal(0, stringIndexOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '\"x\"' cannot be used to index type 'string'."], stringIndexBad.diagnostics.map((d) => d.message));
    Assert.Equal(0, charCodeOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number | undefined'."], charCodeBad.diagnostics.map((d) => d.message));
    Assert.Equal(0, splitOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], arrayPushBad.diagnostics.map((d) => d.message));
    Assert.Equal(0, objectIsOk.diagnostics.length);
    Assert.Equal(0, fromCharCodeOk.diagnostics.length);
  }

  narrows_branch_types_from_control_flow_conditions(): void {
    const typeofThen = checkSourceFile(parseSourceFile("function f(x: string | number): string { if (typeof x === \"string\") { return x; } return \"fallback\"; }"));
    const typeofElse = checkSourceFile(parseSourceFile("function f(x: string | number): number { if (typeof x === \"string\") { return 1; } return x; }"));
    const nullish = checkSourceFile(parseSourceFile("function f(x: string | undefined): string { if (x !== undefined) { return x; } return \"fallback\"; }"));
    const truthy = checkSourceFile(parseSourceFile("function f(x: \"\" | \"ok\"): \"ok\" { if (x) { return x; } return \"ok\"; }"));
    const negated = checkSourceFile(parseSourceFile("function f(x: string | null): string { if (!x) { return \"fallback\"; } return x; }"));
    const noLeak = checkSourceFile(parseSourceFile("function f(x: string | undefined): string { if (x !== undefined) { } return x; }"));

    Assert.Equal(0, typeofThen.diagnostics.length);
    Assert.Equal(0, typeofElse.diagnostics.length);
    Assert.Equal(0, nullish.diagnostics.length);
    Assert.Equal(0, truthy.diagnostics.length);
    Assert.Equal(0, negated.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string | undefined' is not assignable to type 'string'."], noLeak.diagnostics.map((d) => d.message));
  }

  narrows_switch_clause_types_from_discriminants(): void {
    const stringCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | 1): \"a\" { switch (x) { case \"a\": return x; default: return \"a\"; } }"));
    const numberCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | 1 | 2): 1 { switch (x) { case 1: return x; default: return 1; } }"));
    const defaultCase = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | \"c\"): \"c\" { switch (x) { case \"a\": return \"c\"; case \"b\": return \"c\"; default: return x; } }"));
    const mismatch = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\"): \"a\" { switch (x) { case \"b\": return x; default: return \"a\"; } }"));
    const fallthrough = checkSourceFile(parseSourceFile("function f(x: \"a\" | \"b\" | \"c\"): \"a\" | \"b\" { switch (x) { case \"a\": case \"b\": return x; default: return \"a\"; } }"));

    Assert.Equal(0, stringCase.diagnostics.length);
    Assert.Equal(0, numberCase.diagnostics.length);
    Assert.Equal(0, defaultCase.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '\"b\"' is not assignable to type '\"a\"'."], mismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, fallthrough.diagnostics.length);
  }

  checks_try_throw_labeled_with_and_empty_statements(): void {
    const tryBlock = checkSourceFile(parseSourceFile("function f(): number { try { return \"x\"; } catch (e) { return 1; } }"));
    const catchBlock = checkSourceFile(parseSourceFile("function f(): number { try { throw \"x\"; } catch (e) { return \"bad\"; } }"));
    const finallyBlock = checkSourceFile(parseSourceFile("function f(): void { try { } finally { const value: number = \"x\"; } }"));
    const throwExpression = checkSourceFile(parseSourceFile("function f(value: string): void { throw value.toFixed(); }"));
    const labeled = checkSourceFile(parseSourceFile("function f(): number { label: return \"x\"; }"));
    const withStatement = checkSourceFile(parseSourceFile("function f(box: { value: number }): number { with (box) { return \"x\"; } }"));
    const emptyAndDebugger = checkSourceFile(parseSourceFile("function f(): number { ; debugger; return 1; }"));

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], tryBlock.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], catchBlock.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], finallyBlock.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Property 'toFixed' does not exist on type 'string'."], throwExpression.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], labeled.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], withStatement.diagnostics.map((d) => d.message));
    Assert.Equal(0, emptyAndDebugger.diagnostics.length);
  }

  checks_additional_expression_forms(): void {
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

    Assert.Equal(0, templateOk.diagnostics.length);
    Assert.Equal(0, typeOfOk.diagnostics.length);
    Assert.Equal(0, voidOk.diagnostics.length);
    Assert.Equal(0, deleteOk.diagnostics.length);
    Assert.Equal(0, nonNullOk.diagnostics.length);
    Assert.Equal(0, newOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], newArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, staticMemberOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], staticCallMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Property 'version' does not exist on type 'Box'."], staticNotInstance.diagnostics.map((d) => d.message));
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

    Assert.Equal(0, indexOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], indexValueMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, indexNumericKeyOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' cannot be used to index type '{ [key: number]: string }'."], indexBadKey.diagnostics.map((d) => d.message));
    Assert.Equal(0, callOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], callReturnMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], callArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, constructOk.diagnostics.length);
    Assert.Equal(0, arrayLengthOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], arrayLengthMismatch.diagnostics.map((d) => d.message));
  }

  checks_function_constructor_and_parenthesized_type_nodes(): void {
    const functionTypeOk = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): number { return callback(\"x\"); }"));
    const functionArgMismatch = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): number { return callback(1); }"));
    const functionReturnMismatch = checkSourceFile(parseSourceFile("function f(callback: (value: string) => number): string { return callback(\"x\"); }"));
    const constructorTypeOk = checkSourceFile(parseSourceFile("interface Widget { value: number; } function f(factory: new (value: number) => Widget): Widget { return new factory(1); }"));
    const constructorArgMismatch = checkSourceFile(parseSourceFile("interface Widget { value: number; } function f(factory: new (value: number) => Widget): Widget { return new factory(\"x\"); }"));
    const parenthesized = checkSourceFile(parseSourceFile("type Count = (number); function f(value: Count): number { return value; }"));

    Assert.Equal(0, functionTypeOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], functionArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], functionReturnMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, constructorTypeOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], constructorArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, parenthesized.diagnostics.length);
  }

  checks_literal_named_object_members(): void {
    // String/numeric property names and accessor members contribute real object
    // properties. Bracket access with a literal name reads the same property
    // table as dot access, so the checker does not require identifier-only keys.
    const objectStringNameOk = checkSourceFile(parseSourceFile("function f(): number { const obj = { \"answer\": 42 }; return obj[\"answer\"]; }"));
    const objectNumericNameOk = checkSourceFile(parseSourceFile("function f(): string { const obj = { 0: \"zero\" }; return obj[0]; }"));
    const objectAccessorOk = checkSourceFile(parseSourceFile("function f(): number { const obj = { get value(): number { return 1; }, set value(v: number) { } }; return obj.value; }"));
    const typeStringNameOk = checkSourceFile(parseSourceFile("function f(x: { \"answer\": number }): number { return x[\"answer\"]; }"));
    const typeNumericNameMismatch = checkSourceFile(parseSourceFile("function f(x: { 0: string }): number { return x[0]; }"));

    Assert.Equal(0, objectStringNameOk.diagnostics.length);
    Assert.Equal(0, objectNumericNameOk.diagnostics.length);
    Assert.Equal(0, objectAccessorOk.diagnostics.length);
    Assert.Equal(0, typeStringNameOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], typeNumericNameMismatch.diagnostics.map((d) => d.message));
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
    Assert.Equal<readonly string[]>(["Type alias 'B' circularly references itself.", "Type alias 'A' circularly references itself."], circular.diagnostics.map((d) => d.message));
    Assert.Equal(0, genericUsage.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type alias 'Box' requires 1 type argument."], genericBareUsage.diagnostics.map((d) => d.message));
  }

  resolves_qualified_type_names_through_namespace_exports(): void {
    // Qualified type references walk the binder's namespace export tables rather
    // than being rejected or resolved by string heuristics.
    const interfaceOk = checkSourceFile(parseSourceFile("namespace Shapes { export interface Box { value: number; } } function f(box: Shapes.Box): number { return box.value; }"));
    const aliasOk = checkSourceFile(parseSourceFile("namespace Shapes { export type Box = { value: string }; } function f(box: Shapes.Box): string { return box.value; }"));
    const missing = checkSourceFile(parseSourceFile("namespace Shapes { export interface Box { value: number; } } function f(box: Shapes.Missing): number { return 1; }"));

    Assert.Equal(0, interfaceOk.diagnostics.length);
    Assert.Equal(0, aliasOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Cannot find name 'Shapes.Missing'."], missing.diagnostics.map((d) => d.message));
  }

  checks_nominal_object_signatures(): void {
    // Interface/class object types carry call, construct, and index signatures
    // through the same structured-type extras used by anonymous type literals.
    const callOk = checkSourceFile(parseSourceFile("interface Parser { (text: string): number; } function f(parse: Parser): number { return parse(\"x\"); }"));
    const callArgMismatch = checkSourceFile(parseSourceFile("interface Parser { (text: string): number; } function f(parse: Parser): number { return parse(1); }"));
    const indexOk = checkSourceFile(parseSourceFile("interface Dict { [key: string]: number; } function f(d: Dict, key: string): number { return d[key]; }"));
    const indexValueMismatch = checkSourceFile(parseSourceFile("interface Dict { [key: string]: number; } function f(d: Dict, key: string): string { return d[key]; }"));
    const constructOk = checkSourceFile(parseSourceFile("interface Widget { value: number; } interface WidgetFactory { new (value: number): Widget; } function f(factory: WidgetFactory): Widget { return new factory(1); }"));

    Assert.Equal(0, callOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], callArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, indexOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], indexValueMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, constructOk.diagnostics.length);
  }

  enforces_type_alias_scoping_rules(): void {
    // Duplicate aliases now come from the binder's declaration-merge diagnostics
    // instead of the old checker-owned string map. Block-local aliases resolve
    // through the same binder symbol graph as values, including forward refs and
    // shadowing.
    const duplicate = checkSourceFile(parseSourceFile("type A = number; type A = string;"));
    const duplicateRecovery = checkSourceFile(parseSourceFile("type A = number; type A = string; function f(x: A): string { return x; }"));
    const localShadow = checkSourceFile(parseSourceFile("type X = number; function f(): string { type X = string; const x: X = \"a\"; return x; }"));
    const localForwardRef = checkSourceFile(parseSourceFile("function f(): number { const x: Local = 1; type Local = number; return x; }"));
    const shadowNoLeak = checkSourceFile(parseSourceFile("type X = number; function f(): void { type X = string; const a: X = \"z\"; } function g(y: X): string { return y; }"));

    Assert.Equal<readonly string[]>(["Duplicate identifier 'A'.", "Duplicate identifier 'A'."], duplicate.diagnostics.map((d) => d.message));
    Assert.Equal<readonly string[]>(["Duplicate identifier 'A'.", "Duplicate identifier 'A'.", "Type 'number' is not assignable to type 'string'."], duplicateRecovery.diagnostics.map((d) => d.message));
    Assert.Equal(0, localShadow.diagnostics.length);
    Assert.Equal(0, localForwardRef.diagnostics.length);
    // The local shadow inside f must not leak: g's `y: X` resolves to the outer
    // `number`, so returning it as `string` is still a mismatch.
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], shadowNoLeak.diagnostics.map((d) => d.message));
  }

  m5b_resolves_nominal_interface_and_class_members(): void {
    // Type references resolve through binder Type-meaning symbols, not through a
    // string alias map. Interface/class member tables become nominal object
    // types, so property access is checked against the declared member shape.
    const interfaceOk = checkSourceFile(parseSourceFile("interface Point { x: number; label(): string; } function f(p: Point): string { return p.label(); }"));
    const interfaceMismatch = checkSourceFile(parseSourceFile("interface Point { x: number; } function f(p: Point): string { return p.x; }"));
    const classOk = checkSourceFile(parseSourceFile("class Box { value: number; get(): number { return this.value; } } function f(b: Box): number { return b.value; }"));
    const classMismatch = checkSourceFile(parseSourceFile("class Box { value: number; } function f(b: Box): string { return b.value; }"));

    Assert.Equal(0, interfaceOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], interfaceMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, classOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], classMismatch.diagnostics.map((d) => d.message));
  }

  m5c_instantiates_generic_aliases_interfaces_and_classes(): void {
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

    Assert.Equal(0, aliasOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], aliasMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, nestedAlias.diagnostics.length);
    Assert.Equal(0, interfaceOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], interfaceArgMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, classOk.diagnostics.length);
    Assert.Equal(0, defaultTypeArg.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type alias 'Box' requires 1 type argument, but got 2."], extraTypeArg.diagnostics.map((d) => d.message));
  }

  checks_interface_and_class_heritage_members(): void {
    const interfaceBase = checkSourceFile(parseSourceFile("interface Base { value: number; } interface Derived extends Base { label: string; } function f(d: Derived): number { return d.value; }"));
    const interfaceMismatch = checkSourceFile(parseSourceFile("interface Base { value: number; } interface Derived extends Base { } function f(d: Derived): string { return d.value; }"));
    const genericBase = checkSourceFile(parseSourceFile("interface Box<T> { value: T; } interface StringBox extends Box<string> { } function f(box: StringBox): string { return box.value; }"));
    const classBase = checkSourceFile(parseSourceFile("class Base { value: number; get(): number { return this.value; } } class Derived extends Base { label: string; } function f(d: Derived): number { return d.get(); }"));
    const classMismatch = checkSourceFile(parseSourceFile("class Base { value: number; } class Derived extends Base { } function f(d: Derived): string { return d.value; }"));
    const implementsOk = checkSourceFile(parseSourceFile("interface Service { run(): number; } class Good implements Service { run(): number { return 1; } }"));
    const implementsMismatch = checkSourceFile(parseSourceFile("interface Service { run(): number; } class Bad implements Service { run(): string { return \"x\"; } }"));

    Assert.Equal(0, interfaceBase.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], interfaceMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, genericBase.diagnostics.length);
    Assert.Equal(0, classBase.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], classMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, implementsOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'Bad' is not assignable to type 'Service'.\n  Types of property 'run' are incompatible.\n    Type 'function' is not assignable to type 'function'."], implementsMismatch.diagnostics.map((d) => d.message));
  }

  accepts_union_type_node_return_types(): void {
    const baseCase = checkSourceFile(parseSourceFile("function g(flag: boolean): string | number { return flag ? \"x\" : 1; }"));
    const literalCase = checkSourceFile(parseSourceFile("function f(flag: boolean): \"a\" | \"b\" { return flag ? \"a\" : \"b\"; }"));
    const mixedCase = checkSourceFile(parseSourceFile("function h(flag: boolean): \"a\" | 1 { return flag ? \"a\" : 1; }"));

    Assert.Equal(0, baseCase.diagnostics.length);
    Assert.Equal(0, literalCase.diagnostics.length);
    Assert.Equal(0, mixedCase.diagnostics.length);
  }

  checks_intersection_type_node_members_and_relations(): void {
    const propertyOk = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(value: AB): string { return value.b; }"));
    const propertyMismatch = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(value: AB): number { return value.b; }"));
    const assignOk = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(): void { const value: AB = { a: 1, b: \"x\" }; }"));
    const assignMissing = checkSourceFile(parseSourceFile("type AB = { a: number } & { b: string }; function f(): void { const value: AB = { a: 1 }; }"));

    Assert.Equal(0, propertyOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], propertyMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, assignOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type '{ a: number }' is not assignable to type '{ a: number } & { b: string }'."], assignMissing.diagnostics.map((d) => d.message));
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
    const superExpression = createNode(Kind.SuperKeyword) as SuperExpression;
    const importExpression = createNode(Kind.ImportKeyword) as ImportExpression;

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

  checks_destructured_binding_element_types(): void {
    const parameterOk = checkSourceFile(parseSourceFile("function f({ value }: { value: number }): number { return value; }"));
    const parameterMismatch = checkSourceFile(parseSourceFile("function f({ value }: { value: number }): string { return value; }"));
    const renamedProperty = checkSourceFile(parseSourceFile("function f({ value: renamed }: { value: string }): string { return renamed; }"));
    const variableOk = checkSourceFile(parseSourceFile("function f(): number { const { value } = { value: 1 }; return value; }"));
    const arrayOk = checkSourceFile(parseSourceFile("function f(xs: number[]): number { const [first] = xs; return first; }"));

    Assert.Equal(0, parameterOk.diagnostics.length);
    Assert.Equal<readonly string[]>(["Type 'number' is not assignable to type 'string'."], parameterMismatch.diagnostics.map((d) => d.message));
    Assert.Equal(0, renamedProperty.diagnostics.length);
    Assert.Equal(0, variableOk.diagnostics.length);
    Assert.Equal(0, arrayOk.diagnostics.length);
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

  m5a_import_alias_and_export_resolve_to_distinct_binder_symbols(): void {
    // `import { value as localValue } from "./dep.js"; export { localValue };`
    // checkSourceFile binds-before-checks; the final `localValue;` reference
    // resolves the IMPORT alias from sourceFile.locals (NameResolver walks
    // locals first), while the module export surface keeps a DISTINCT export
    // alias in sourceFile.symbol.exports — they must NOT collapse into one entry.
    const sourceFile = parseSourceFile("import { value as localValue } from \"./dep.js\";\nexport { localValue };\nlocalValue;");
    const result = checkSourceFile(sourceFile);

    // No spurious value-resolution diagnostic: the reference resolved.
    Assert.Equal(0, result.diagnostics.length);

    const importAlias = sourceFile.locals?.get("localValue");
    const exportAlias = sourceFile.symbol?.exports?.get("localValue");
    Assert.Equal(SymbolFlags.Alias, importAlias?.flags);
    Assert.Equal(SymbolFlags.Alias, exportAlias?.flags);
    // The local import alias and the module export alias are DISTINCT symbols.
    Assert.True(importAlias !== exportAlias);

    // The standalone `localValue;` reference resolves to the IMPORT alias
    // (the lexical local), not the export-surface alias.
    const reference = findExpressionStatementIdentifier(sourceFile, "localValue");
    Assert.NotNull(reference);
    const resolver = makeM5aResolver();
    const resolved = resolver.resolve(reference!, "localValue", SymbolFlags.Value | SymbolFlags.Alias, undefined, true, false);
    Assert.True(resolved === importAlias);
  }

  m5a_export_const_in_file_reference_and_export_table_keep_symbol_distinction(): void {
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

    Assert.Equal(0, result.diagnostics.length);

    const local = sourceFile.locals?.get("exported");
    const exported = sourceFile.symbol?.exports?.get("exported");
    Assert.Equal(SymbolFlags.ExportValue, local?.flags);
    Assert.Equal(SymbolFlags.BlockScopedVariable, exported?.flags);
    // The local↔export link is intact (the symbol distinction is preserved).
    Assert.True(local?.exportSymbol === exported);

    const reference = findExpressionStatementIdentifier(sourceFile, "exported");
    Assert.NotNull(reference);
    const resolver = makeM5aResolver();
    const resolved = resolver.resolve(reference!, "exported", SymbolFlags.Value | SymbolFlags.Alias, undefined, true, false);
    // The ExportValue local is filtered by the Value meaning; resolution lands
    // on the export symbol (which carries the real BlockScopedVariable value).
    Assert.True(resolved === exported);
    Assert.True(resolved !== local);
  }
}

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
A<CheckerGroundworkTests>().method((t) => t.checks_string_indexing_and_builtin_method_shapes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.narrows_branch_types_from_control_flow_conditions).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.narrows_switch_clause_types_from_discriminants).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_try_throw_labeled_with_and_empty_statements).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_array_spread_index_and_broad_object).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_broad_empty_object_and_index_validation).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_object_type_signatures).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_function_constructor_and_parenthesized_type_nodes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.resolves_type_alias_references).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.enforces_type_alias_scoping_rules).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.m5b_resolves_nominal_interface_and_class_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.m5c_instantiates_generic_aliases_interfaces_and_classes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_interface_and_class_heritage_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.accepts_union_type_node_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_intersection_type_node_members_and_relations).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_union_type_node_mismatch).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.recognizes_keyword_literal_predicates).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.union_reduction_none_keeps_redundant_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.fresh_plus_regular_same_literal_reduces_to_regular).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reduces_redundant_literal_union_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.makes_destructured_binding_names_available_to_checked_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_destructured_binding_element_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_reports_assignment_mismatches).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_accepts_well_typed_assignment).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.m5a_import_alias_and_export_resolve_to_distinct_binder_symbols).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.m5a_export_const_in_file_reference_and_export_table_keep_symbol_distinction).add(FactAttribute);
