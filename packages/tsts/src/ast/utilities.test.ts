// utilities.test.ts — Focused parity probes for the faithful AST utility
// helpers migrated during the M2 Fork B work (ast/utilities.ts now sole owner
// of these predicates; accessors.ts stubs were removed).
//
// Each probe pins a behaviour the prior accessors.ts stubs got wrong, so the
// suite would have failed against the stub copies and now passes against the
// faithful 1:1 port of internal/ast/utilities.go:
//   - canHaveModifiers: stub returned `true` for ALL nodes; faithful is a
//     kind-switch (false for Identifier, true for PropertyDeclaration).
//   - isParameterPropertyDeclaration: stub returned `false` unconditionally
//     (dead path in the type-eraser); faithful honours the
//     ParameterPropertyModifier + Constructor-parent rule.
//   - nodeIsMissing: faithful excludes EndOfFile (`&& kind !== EndOfFile`).
//   - nodeIsSynthesized: faithful tests pos<0 OR end<0 via positionIsSynthesized.
//   - isAssignmentExpression: faithful uses Kind enum + isLeftHandSideExpression
//     guard rather than hardcoded numeric kind/op values.
//
// Predicates are imported from the ast barrel ("./index.js") to prove barrel
// wiring — the same path the type-eraser imports them through.
//
// Nodes are built via NodeObject (which `implements Node`) so we can control
// pos/end and the binder-computed `modifierFlags` field that the create*
// factory path does not derive; the faithful predicates read `modifierFlags`
// exactly like TS-Go's n.ModifierFlags().

import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  NodeObject,
  createIdentifier,
  createToken,
  createNumericLiteral,
  createNodeArray,
  createBinaryExpression,
  isParameterPropertyDeclaration,
  isAssignmentExpression,
  isLeftHandSideExpression,
  isCommaExpression,
  isPrologueDirective,
  hasStaticModifier,
  hasSyntacticModifier,
  canHaveModifiers,
  nodeIsMissing,
  nodeIsPresent,
  nodeIsSynthesized,
  modifiersToFlags,
  type BinaryOperatorToken,
  type ModifierSyntaxKind,
  type Node,
} from "./index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { parseSourceFile } from "../parser/index.js";

// Build a Parameter node carrying the syntactic modifier flags the binder
// would compute for `public readonly x` (mirrors ModifierFlags via
// modifiersToFlags). NodeObject implements Node, so the result is a Node the
// faithful predicates accept directly — no escape-hatch cast.
function makeParameterWithModifiers(modifierKinds: readonly ModifierSyntaxKind[], paramName: string): Node {
  const modifiers = createNodeArray(modifierKinds.map(kind => createToken(kind)));
  return new NodeObject(Kind.Parameter, {
    modifiers,
    name: createIdentifier(paramName),
    modifierFlags: modifiersToFlags(modifiers),
  });
}

export class AstUtilitiesParityTests {
  // canHaveModifiers stub used to `return true` for every node; faithful
  // version is a kind-switch.
  can_have_modifiers_is_a_kind_switch_not_always_true(): void {
    Assert.False(canHaveModifiers(createIdentifier("ident")));
    Assert.True(canHaveModifiers(new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("p") })));
    Assert.True(canHaveModifiers(new NodeObject(Kind.Parameter, { name: createIdentifier("q") })));
    Assert.False(canHaveModifiers(new NodeObject(Kind.NumericLiteral, { text: "1" })));
  }

  // The most-important parity probe: the accessors stub returned false
  // unconditionally, making the type-eraser's parameter-property branch dead.
  parameter_property_declaration_honours_modifier_and_constructor_parent(): void {
    const param = makeParameterWithModifiers([Kind.PublicKeyword, Kind.ReadonlyKeyword], "x");
    const ctor = new NodeObject(Kind.Constructor, { parameters: createNodeArray([param]) });

    // Live path: public/readonly on a constructor parameter is a parameter property.
    Assert.True(isParameterPropertyDeclaration(param, ctor));

    // Parent is not a Constructor -> not a parameter property (e.g. a method).
    const methodLike = new NodeObject(Kind.MethodDeclaration, { parameters: createNodeArray([param]) });
    Assert.False(isParameterPropertyDeclaration(param, methodLike));

    // No accessibility/readonly modifier -> not a parameter property even under a Constructor.
    const plainParam = new NodeObject(Kind.Parameter, { name: createIdentifier("x") });
    Assert.False(isParameterPropertyDeclaration(plainParam, ctor));
  }

  has_syntactic_modifier_reads_membership_in_modifier_flags(): void {
    const param = makeParameterWithModifiers([Kind.PublicKeyword, Kind.ReadonlyKeyword], "x");
    Assert.True(hasSyntacticModifier(param, ModifierFlags.ParameterPropertyModifier));
    Assert.True(hasSyntacticModifier(param, ModifierFlags.Public));
    Assert.True(hasSyntacticModifier(param, ModifierFlags.Readonly));
    Assert.False(hasSyntacticModifier(param, ModifierFlags.Static));
    // A node with no modifierFlags field reports ModifierFlags.None.
    Assert.False(hasSyntacticModifier(createIdentifier("x"), ModifierFlags.Public));
  }

  has_static_modifier_distinguishes_static_from_instance_members(): void {
    const staticProp = new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("s"), modifierFlags: ModifierFlags.Static });
    const instanceProp = new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("i"), modifierFlags: ModifierFlags.None });
    Assert.True(hasStaticModifier(staticProp));
    Assert.False(hasStaticModifier(instanceProp));
  }

  // isAssignmentExpression: compound-vs-equals branch + LHS guard, using the
  // Kind enum rather than the stub's hardcoded numbers (226/64/79).
  is_assignment_expression_branches_on_compound_and_lhs_guard(): void {
    const lhs = createIdentifier("a");
    const eq = createBinaryExpression(undefined, lhs, undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createNumericLiteral("1", 0));
    const plusEq = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.PlusEqualsToken) as BinaryOperatorToken, createNumericLiteral("1", 0));

    // `=` is an assignment under either excludeCompoundAssignment value.
    Assert.True(isAssignmentExpression(eq, /*excludeCompoundAssignment*/ true));
    Assert.True(isAssignmentExpression(eq, /*excludeCompoundAssignment*/ false));

    // `+=` is excluded when excludeCompoundAssignment is true, included otherwise.
    Assert.False(isAssignmentExpression(plusEq, /*excludeCompoundAssignment*/ true));
    Assert.True(isAssignmentExpression(plusEq, /*excludeCompoundAssignment*/ false));

    // LHS guard: left must be a LeftHandSideExpression. `(a + b)` is not.
    const innerSum = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.PlusToken) as BinaryOperatorToken, createIdentifier("b"));
    Assert.False(isLeftHandSideExpression(innerSum));
    const badLhs = createBinaryExpression(undefined, innerSum, undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createNumericLiteral("2", 0));
    Assert.False(isAssignmentExpression(badLhs, /*excludeCompoundAssignment*/ false));

    // Not a BinaryExpression at all.
    Assert.False(isAssignmentExpression(createIdentifier("a"), /*excludeCompoundAssignment*/ false));
  }

  is_comma_expression_matches_only_comma_operator(): void {
    const comma = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.CommaToken) as BinaryOperatorToken, createIdentifier("b"));
    const eq = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createIdentifier("b"));
    Assert.True(isCommaExpression(comma));
    Assert.False(isCommaExpression(eq));
    Assert.False(isCommaExpression(createIdentifier("a")));
  }

  is_prologue_directive_matches_string_literal_expression_statements(): void {
    const sourceFile = parseSourceFile("\"use strict\"; x;");
    Assert.True(isPrologueDirective(sourceFile.statements[0]!));
    Assert.False(isPrologueDirective(sourceFile.statements[1]!));
  }

  // nodeIsMissing: pos==end>=0 means "missing" EXCEPT EndOfFile, which the
  // faithful version excludes via `&& kind !== Kind.EndOfFile`.
  node_is_missing_excludes_end_of_file_and_handles_undefined(): void {
    Assert.True(nodeIsMissing(undefined));

    const missing = new NodeObject(Kind.Identifier, {}, 5, 5);
    Assert.True(nodeIsMissing(missing));
    Assert.False(nodeIsPresent(missing));

    // EndOfFile with pos==end is NOT missing (the branch the stub omitted).
    const eof = new NodeObject(Kind.EndOfFile, {}, 5, 5);
    Assert.False(nodeIsMissing(eof));

    const present = new NodeObject(Kind.Identifier, {}, 5, 8);
    Assert.False(nodeIsMissing(present));
    Assert.True(nodeIsPresent(present));
  }

  // nodeIsSynthesized: pos<0 OR end<0 (positionIsSynthesized on either edge).
  node_is_synthesized_tests_either_position_edge(): void {
    Assert.True(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, -1, -1)));
    Assert.True(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, 0, -1)));
    Assert.True(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, -1, 5)));
    Assert.False(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, 0, 5)));
  }
}

A<AstUtilitiesParityTests>().method((t) => t.can_have_modifiers_is_a_kind_switch_not_always_true).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.parameter_property_declaration_honours_modifier_and_constructor_parent).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.has_syntactic_modifier_reads_membership_in_modifier_flags).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.has_static_modifier_distinguishes_static_from_instance_members).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.is_assignment_expression_branches_on_compound_and_lhs_guard).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.is_comma_expression_matches_only_comma_operator).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.is_prologue_directive_matches_string_literal_expression_statements).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.node_is_missing_excludes_end_of_file_and_handles_undefined).add(FactAttribute);
A<AstUtilitiesParityTests>().method((t) => t.node_is_synthesized_tests_either_position_edge).add(FactAttribute);
