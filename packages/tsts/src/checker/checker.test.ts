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
} from "./checker.checkedtype.js";
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
A<CheckerGroundworkTests>().method((t) => t.accepts_union_type_node_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_union_type_node_mismatch).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.recognizes_keyword_literal_predicates).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.union_reduction_none_keeps_redundant_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.fresh_plus_regular_same_literal_reduces_to_regular).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reduces_redundant_literal_union_members).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.makes_destructured_binding_names_available_to_checked_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_reports_assignment_mismatches).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_accepts_well_typed_assignment).add(FactAttribute);
