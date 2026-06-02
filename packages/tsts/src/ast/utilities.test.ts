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

import test from "node:test";
import assert from "node:assert/strict";

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

// canHaveModifiers stub used to `return true` for every node; faithful
// version is a kind-switch.
test("can have modifiers is a kind switch not always true", () => {
  assert.ok(!canHaveModifiers(createIdentifier("ident")));
  assert.ok(canHaveModifiers(new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("p") })));
  assert.ok(canHaveModifiers(new NodeObject(Kind.Parameter, { name: createIdentifier("q") })));
  assert.ok(!canHaveModifiers(new NodeObject(Kind.NumericLiteral, { text: "1" })));
});

// The most-important parity probe: the accessors stub returned false
// unconditionally, making the type-eraser's parameter-property branch dead.
test("parameter property declaration honours modifier and constructor parent", () => {
  const param = makeParameterWithModifiers([Kind.PublicKeyword, Kind.ReadonlyKeyword], "x");
  const ctor = new NodeObject(Kind.Constructor, { parameters: createNodeArray([param]) });

  // Live path: public/readonly on a constructor parameter is a parameter property.
  assert.ok(isParameterPropertyDeclaration(param, ctor));

  // Parent is not a Constructor -> not a parameter property (e.g. a method).
  const methodLike = new NodeObject(Kind.MethodDeclaration, { parameters: createNodeArray([param]) });
  assert.ok(!isParameterPropertyDeclaration(param, methodLike));

  // No accessibility/readonly modifier -> not a parameter property even under a Constructor.
  const plainParam = new NodeObject(Kind.Parameter, { name: createIdentifier("x") });
  assert.ok(!isParameterPropertyDeclaration(plainParam, ctor));
});

test("has syntactic modifier reads membership in modifier flags", () => {
  const param = makeParameterWithModifiers([Kind.PublicKeyword, Kind.ReadonlyKeyword], "x");
  assert.ok(hasSyntacticModifier(param, ModifierFlags.ParameterPropertyModifier));
  assert.ok(hasSyntacticModifier(param, ModifierFlags.Public));
  assert.ok(hasSyntacticModifier(param, ModifierFlags.Readonly));
  assert.ok(!hasSyntacticModifier(param, ModifierFlags.Static));
  // A node with no modifierFlags field reports ModifierFlags.None.
  assert.ok(!hasSyntacticModifier(createIdentifier("x"), ModifierFlags.Public));
});

test("has static modifier distinguishes static from instance members", () => {
  const staticProp = new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("s"), modifierFlags: ModifierFlags.Static });
  const instanceProp = new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("i"), modifierFlags: ModifierFlags.None });
  assert.ok(hasStaticModifier(staticProp));
  assert.ok(!hasStaticModifier(instanceProp));
});

// isAssignmentExpression: compound-vs-equals branch + LHS guard, using the
// Kind enum rather than the stub's hardcoded numbers (226/64/79).
test("is assignment expression branches on compound and lhs guard", () => {
  const lhs = createIdentifier("a");
  const eq = createBinaryExpression(undefined, lhs, undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createNumericLiteral("1", 0));
  const plusEq = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.PlusEqualsToken) as BinaryOperatorToken, createNumericLiteral("1", 0));

  // `=` is an assignment under either excludeCompoundAssignment value.
  assert.ok(isAssignmentExpression(eq, /*excludeCompoundAssignment*/ true));
  assert.ok(isAssignmentExpression(eq, /*excludeCompoundAssignment*/ false));

  // `+=` is excluded when excludeCompoundAssignment is true, included otherwise.
  assert.ok(!isAssignmentExpression(plusEq, /*excludeCompoundAssignment*/ true));
  assert.ok(isAssignmentExpression(plusEq, /*excludeCompoundAssignment*/ false));

  // LHS guard: left must be a LeftHandSideExpression. `(a + b)` is not.
  const innerSum = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.PlusToken) as BinaryOperatorToken, createIdentifier("b"));
  assert.ok(!isLeftHandSideExpression(innerSum));
  const badLhs = createBinaryExpression(undefined, innerSum, undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createNumericLiteral("2", 0));
  assert.ok(!isAssignmentExpression(badLhs, /*excludeCompoundAssignment*/ false));

  // Not a BinaryExpression at all.
  assert.ok(!isAssignmentExpression(createIdentifier("a"), /*excludeCompoundAssignment*/ false));
});

test("is comma expression matches only comma operator", () => {
  const comma = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.CommaToken) as BinaryOperatorToken, createIdentifier("b"));
  const eq = createBinaryExpression(undefined, createIdentifier("a"), undefined, createToken(Kind.EqualsToken) as BinaryOperatorToken, createIdentifier("b"));
  assert.ok(isCommaExpression(comma));
  assert.ok(!isCommaExpression(eq));
  assert.ok(!isCommaExpression(createIdentifier("a")));
});

test("is prologue directive matches string literal expression statements", () => {
  const sourceFile = parseSourceFile("\"use strict\"; x;");
  assert.ok(isPrologueDirective(sourceFile.statements[0]!));
  assert.ok(!isPrologueDirective(sourceFile.statements[1]!));
});

// nodeIsMissing: pos==end>=0 means "missing" EXCEPT EndOfFile, which the
// faithful version excludes via `&& kind !== Kind.EndOfFile`.
test("node is missing excludes end of file and handles undefined", () => {
  assert.ok(nodeIsMissing(undefined));

  const missing = new NodeObject(Kind.Identifier, {}, 5, 5);
  assert.ok(nodeIsMissing(missing));
  assert.ok(!nodeIsPresent(missing));

  // EndOfFile with pos==end is NOT missing (the branch the stub omitted).
  const eof = new NodeObject(Kind.EndOfFile, {}, 5, 5);
  assert.ok(!nodeIsMissing(eof));

  const present = new NodeObject(Kind.Identifier, {}, 5, 8);
  assert.ok(!nodeIsMissing(present));
  assert.ok(nodeIsPresent(present));
});

// nodeIsSynthesized: pos<0 OR end<0 (positionIsSynthesized on either edge).
test("node is synthesized tests either position edge", () => {
  assert.ok(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, -1, -1)));
  assert.ok(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, 0, -1)));
  assert.ok(nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, -1, 5)));
  assert.ok(!nodeIsSynthesized(new NodeObject(Kind.Identifier, {}, 0, 5)));
});
