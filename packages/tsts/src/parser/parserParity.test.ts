// parser-parity.test.ts — wave 4b-prep parse-parity probe suite.
//
// Purpose: capture the CURRENT pre-scan parser's AST (node Kind + token-tight
// pos/end + raw leaf text via sourceFile.text.slice) across the codex-required
// corpus, asserting TSGO-CORRECT expected values. This suite gates the later
// atomic 4b-swap (parser → live scanner): probes that disagree with the current
// pre-scan parser ONLY for an explicitly-flagged tsgo divergence are isolated so
// the rest of the suite is green and the divergence is self-documenting.
//
// Conventions (mirroring ParserPositionTests in ./position.test.ts):
//  - pos/end are TOKEN-TIGHT (skip-trivia), matching the existing 124 probes and
//    codex-048 (i). They are NOT tsgo's trivia-inclusive TokenFullStart (a tracked
//    Stage-4 debt).
//  - Raw leaf text is the SOURCE SLICE `sourceFile.text.slice(node.pos, node.end)`,
//    NOT node.text (which carries PROCESSED text: unquoted strings, stripped
//    template backticks/${}, etc.).
//  - Synthesized operator/punctuation tokens (BinaryExpression.operatorToken,
//    ArrowFunction EqualsGreaterThanToken, NamedTupleMember QuestionToken, ...) are
//    created via createToken(kind) and carry pos/end == -1. The live scanner (4b)
//    may legitimately START stamping these with real ranges, so per codex's rule
//    ("encode tsgo-correct, not the old bug") this suite does NOT assert pos/end on
//    operator leaves; it asserts the PARENT node range + the OPERAND ranges (which
//    are already tsgo-correct) and the operator-leaf KIND only.
//
// TSGO DIVERGENCE (flagged): nested generic closers `>>`/`>>>` are split by
// #expectGreaterThan WITHOUT advancing #index, so the inner TypeReference end is
// off-by-one (stops at the first '>' instead of after it). The probes below encode
// the TSGO-CORRECT ends (e.g. inner `B<C>` end = 15, raw "B<C>"), so they will FAIL
// against the current pre-scan parser and FLIP GREEN once 4b-swap replaces the split
// with reScanGreaterThanToken. These divergence probes are grouped + commented as
// "TSGO-DIVERGENCE (fails on current parser)".

import test from "node:test";
import assert from "node:assert/strict";

import type { Expression, SourceFile, TypeNode } from "../ast/index.js";
import {
  Kind,
  NodeFlags,
  isArrayTypeNode,
  isArrowFunction,
  isAwaitExpression,
  isBinaryExpression,
  isCallExpression,
  isClassDeclaration,
  isConditionalTypeNode,
  isConstructorTypeNode,
  isDecorator,
  isExportDeclaration,
  isExpressionStatement,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isIdentifier,
  isImportTypeNode,
  isIndexSignatureDeclaration,
  isIndexedAccessTypeNode,
  isInferTypeNode,
  isJsxAttribute,
  isJsxElement,
  isJsxExpression,
  isJsxFragment,
  isJsxNamespacedName,
  isJsxSelfClosingElement,
  isJsxSpreadAttribute,
  isJsxText,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isMappedTypeNode,
  isMissingDeclaration,
  isNamedTupleMember,
  isNumericLiteral,
  isOptionalTypeNode,
  isParameterDeclaration,
  isParenthesizedExpression,
  isPropertyAccessExpression,
  isRegularExpressionLiteral,
  isRestTypeNode,
  isStringLiteral,
  isTemplateExpression,
  isTemplateLiteralTypeNode,
  isTemplateLiteralTypeSpan,
  isTemplateSpan,
  isTryStatement,
  isTupleTypeNode,
  isTypeAliasDeclaration,
  isTypeAssertion,
  isTypeLiteralNode,
  isTypeOperatorNode,
  isTypeParameterDeclaration,
  isTypeReferenceNode,
  isVariableStatement,
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";
// M3 Stage-5 pre-wave: ScriptKind/languageVariant plumbing probes.
import { ScriptKind, getScriptKindFromFileName } from "../core/core.js";
import { LanguageVariant } from "./utilities.js";

// ── Helpers ──────────────────────────────────────────────────────────────

// Returns the single ExpressionStatement's expression for `<expr>;` snippets.
function soleExpression(src: string): { sourceFile: SourceFile; expression: Expression } {
  const sourceFile = parseSourceFile(src);
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  return { sourceFile, expression: statement.expression };
}

// Returns the single TypeAliasDeclaration's type for `type X=<type>;` snippets.
function soleType(src: string): { sourceFile: SourceFile; type: TypeNode } {
  const sourceFile = parseSourceFile(src);
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  return { sourceFile, type: statement.type };
}

function raw(sourceFile: SourceFile, node: { pos: number; end: number }): string {
  return sourceFile.text.slice(node.pos, node.end);
}

// Returns the single ExpressionStatement's JSX expression for a `<...>;` snippet,
// parsed in JSX mode.
function soleJsx(src: string): { sourceFile: SourceFile; expression: Expression } {
  const sourceFile = parseSourceFile(src, { fileName: "a.tsx", scriptKind: ScriptKind.TSX });
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  return { sourceFile, expression: statement.expression };
}

// Parse `src` asserting NO throw; return the SourceFile for diagnostic/shape checks.
function parseNoThrow(src: string): SourceFile {
  let threw = false;
  let sourceFile: SourceFile | undefined;
  try {
    sourceFile = parseSourceFile(src);
  } catch {
    threw = true;
  }
  assert.ok(!threw, "parser should recover (record a diagnostic), not throw, for: " + src);
  if (sourceFile === undefined) throw new Error("no source file produced");
  return sourceFile;
}

function hasCode(sourceFile: SourceFile, code: number): boolean {
  return sourceFile.parseDiagnostics.some((d) => d.code === code);
}

// ── Category 1: shift / relational operators ──────────────────────────────
// The scanner pre-combines `>>`/`>>>`/`>=`/etc., so operatorToken is synthesized
// ([-1,-1)); assert the BinaryExpression parent span + operand ranges + op KIND.

test("shift right shift a rsh b", () => {
  const { sourceFile, expression } = soleExpression("a>>b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.kind, Kind.BinaryExpression);
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a>>b");
  assert.strictEqual(expression.pos, expression.left.pos);
  assert.strictEqual(expression.end, expression.right.end);
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanGreaterThanToken);
  if (!isIdentifier(expression.left)) throw new Error("Expected left identifier");
  assert.strictEqual(expression.left.pos, 0);
  assert.strictEqual(expression.left.end, 1);
  if (!isIdentifier(expression.right)) throw new Error("Expected right identifier");
  assert.strictEqual(expression.right.pos, 3);
  assert.strictEqual(expression.right.end, 4);
});

test("shift unsigned right shift a ursh b", () => {
  const { sourceFile, expression } = soleExpression("a>>>b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(raw(sourceFile, expression), "a>>>b");
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanGreaterThanGreaterThanToken);
  assert.strictEqual(expression.right.pos, 4);
  assert.strictEqual(expression.right.end, 5);
});

test("relational greater equals a ge b", () => {
  const { sourceFile, expression } = soleExpression("a>=b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a>=b");
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanEqualsToken);
  assert.strictEqual(expression.right.pos, 3);
  assert.strictEqual(expression.right.end, 4);
});

test("relational greater than a gt b", () => {
  const { sourceFile, expression } = soleExpression("a>b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a>b");
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanToken);
  assert.strictEqual(expression.right.pos, 2);
  assert.strictEqual(expression.right.end, 3);
});

test("assign right shift a rsh eq b", () => {
  const { sourceFile, expression } = soleExpression("a>>=b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(raw(sourceFile, expression), "a>>=b");
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanGreaterThanEqualsToken);
  assert.strictEqual(expression.right.pos, 4);
  assert.strictEqual(expression.right.end, 5);
});

test("assign unsigned right shift a ursh eq b", () => {
  const { sourceFile, expression } = soleExpression("a>>>=b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 6);
  assert.strictEqual(raw(sourceFile, expression), "a>>>=b");
  assert.strictEqual(expression.operatorToken.kind, Kind.GreaterThanGreaterThanGreaterThanEqualsToken);
  assert.strictEqual(expression.right.pos, 5);
  assert.strictEqual(expression.right.end, 6);
});

// ── Category 2: nested generic closers (TSGO-DIVERGENCE: fails on current parser)
// `type X = A<B<C>>;` — the inner B<C> end is off-by-one in the current pre-scan
// parser ([11,14) raw "B<C"). TSGO-CORRECT = [11,15) raw "B<C>". This probe FAILS
// against the current parser and FLIPS GREEN once 4b-swap fixes #expectGreaterThan.
test("nested generic double closer tsgo correct", () => {
  const { sourceFile, type } = soleType("type X = A<B<C>>;");
  if (!isTypeReferenceNode(type)) throw new Error("Expected outer type reference");
  // M3 4c: type.pos is the trivia-inclusive full-start = end of `=` (8); the
  // leading space after `=` is the type's leading trivia, so raw([8,16)) now
  // includes it. end stays token-tight at 16.
  assert.strictEqual(type.pos, 8);
  assert.strictEqual(type.end, 16);
  assert.strictEqual(raw(sourceFile, type), " A<B<C>>");
  const inner = type.typeArguments![0]!;
  if (!isTypeReferenceNode(inner)) throw new Error("Expected inner type reference");
  // TSGO-CORRECT: inner B<C> ends AFTER the first '>' (index 15), raw "B<C>".
  assert.strictEqual(inner.pos, 11);
  assert.strictEqual(inner.end, 15);
  assert.strictEqual(raw(sourceFile, inner), "B<C>");
  const innermost = inner.typeArguments![0]!;
  if (!isTypeReferenceNode(innermost)) throw new Error("Expected innermost type reference");
  assert.strictEqual(innermost.pos, 13);
  assert.strictEqual(innermost.end, 14);
  assert.strictEqual(raw(sourceFile, innermost), "C");
});

// `type X=A<B<C<D>>>;` — triple closer. TSGO-CORRECT: mid B<C<D> = [9,16) "B<C<D>>",
// inner C<D> = [11,15) "C<D>". Current parser gives [9,14)/[11,14). (TSGO-DIVERGENCE)
test("nested generic triple closer tsgo correct", () => {
  const { sourceFile, type } = soleType("type X=A<B<C<D>>>;");
  if (!isTypeReferenceNode(type)) throw new Error("Expected outer type reference");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 17);
  assert.strictEqual(raw(sourceFile, type), "A<B<C<D>>>");
  const mid = type.typeArguments![0]!;
  if (!isTypeReferenceNode(mid)) throw new Error("Expected mid type reference");
  assert.strictEqual(mid.pos, 9);
  assert.strictEqual(mid.end, 16);
  assert.strictEqual(raw(sourceFile, mid), "B<C<D>>");
  const inner = mid.typeArguments![0]!;
  if (!isTypeReferenceNode(inner)) throw new Error("Expected inner type reference");
  assert.strictEqual(inner.pos, 11);
  assert.strictEqual(inner.end, 15);
  assert.strictEqual(raw(sourceFile, inner), "C<D>");
  const innermost = inner.typeArguments![0]!;
  if (!isTypeReferenceNode(innermost)) throw new Error("Expected innermost type reference");
  assert.strictEqual(innermost.pos, 13);
  assert.strictEqual(innermost.end, 14);
  assert.strictEqual(raw(sourceFile, innermost), "D");
});

// ── Category 3: binary-precedence rungs ───────────────────────────────────
// One probe per rung; operator leaves are synthesized so we assert the parent
// BinaryExpression span (left.pos..right.end) + the operator KIND.

// TSGO-DIVERGENCE (fails on current parser): `**` (precedence 14) is the only
// RIGHT-associative binary operator, so `a**b**c` must parse as `a**(b**c)` with
// the inner `b**c` binary in the `.right` slot. The current parser's binary loop
// (parser.ts ~1519) uses `operatorPrecedence <= precedence` for ALL operators, so
// it parses `(a**b)**c` (left-assoc) instead. This probe encodes the TSGO-CORRECT
// right-assoc shape and FLIPS GREEN once the `**` right-associativity is fixed.
test("precedence exponent right assoc", () => {
  // `**` (14, right-assoc): a**b**c -> a**(b**c).
  const { sourceFile, expression } = soleExpression("a**b**c;");
  if (!isBinaryExpression(expression)) throw new Error("Expected outer binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 7);
  assert.strictEqual(raw(sourceFile, expression), "a**b**c");
  assert.strictEqual(expression.operatorToken.kind, Kind.AsteriskAsteriskToken);
  const right = expression.right;
  if (!isBinaryExpression(right)) throw new Error("Expected right-assoc inner binary");
  assert.strictEqual(right.pos, 3);
  assert.strictEqual(right.end, 7);
  assert.strictEqual(raw(sourceFile, right), "b**c");
});

test("precedence multiplicative", () => {
  // `*` (13).
  const { sourceFile, expression } = soleExpression("a*b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a*b");
  assert.strictEqual(expression.operatorToken.kind, Kind.AsteriskToken);
});

test("precedence additive", () => {
  // `+` (12).
  const { sourceFile, expression } = soleExpression("a+b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a+b");
  assert.strictEqual(expression.operatorToken.kind, Kind.PlusToken);
});

test("precedence shift left", () => {
  // `<<` (11).
  const { sourceFile, expression } = soleExpression("a<<b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a<<b");
  assert.strictEqual(expression.operatorToken.kind, Kind.LessThanLessThanToken);
});

test("precedence relational less than", () => {
  // `<` (10).
  const { sourceFile, expression } = soleExpression("a<b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a<b");
  assert.strictEqual(expression.operatorToken.kind, Kind.LessThanToken);
});

test("precedence relational in", () => {
  // `in` (10).
  const { sourceFile, expression } = soleExpression("a in b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 6);
  assert.strictEqual(raw(sourceFile, expression), "a in b");
  assert.strictEqual(expression.operatorToken.kind, Kind.InKeyword);
});

test("precedence relational instanceof", () => {
  // `instanceof` (10).
  const { sourceFile, expression } = soleExpression("a instanceof b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 14);
  assert.strictEqual(raw(sourceFile, expression), "a instanceof b");
  assert.strictEqual(expression.operatorToken.kind, Kind.InstanceOfKeyword);
});

test("precedence equality loose", () => {
  // `==` (9).
  const { sourceFile, expression } = soleExpression("a==b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a==b");
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsEqualsToken);
});

test("precedence equality strict", () => {
  // `===` (9).
  const { sourceFile, expression } = soleExpression("a===b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(raw(sourceFile, expression), "a===b");
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsEqualsEqualsToken);
});

test("precedence bitwise and", () => {
  // `&` (8).
  const { sourceFile, expression } = soleExpression("a&b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a&b");
  assert.strictEqual(expression.operatorToken.kind, Kind.AmpersandToken);
});

test("precedence bitwise xor", () => {
  // `^` (7).
  const { sourceFile, expression } = soleExpression("a^b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a^b");
  assert.strictEqual(expression.operatorToken.kind, Kind.CaretToken);
});

test("precedence bitwise or", () => {
  // `|` (6).
  const { sourceFile, expression } = soleExpression("a|b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a|b");
  assert.strictEqual(expression.operatorToken.kind, Kind.BarToken);
});

test("precedence logical and", () => {
  // `&&` (5).
  const { sourceFile, expression } = soleExpression("a&&b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a&&b");
  assert.strictEqual(expression.operatorToken.kind, Kind.AmpersandAmpersandToken);
});

test("precedence logical or", () => {
  // `||` (4).
  const { sourceFile, expression } = soleExpression("a||b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a||b");
  assert.strictEqual(expression.operatorToken.kind, Kind.BarBarToken);
});

test("precedence nullish coalescing", () => {
  // `??` (4).
  const { sourceFile, expression } = soleExpression("a??b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a??b");
  assert.strictEqual(expression.operatorToken.kind, Kind.QuestionQuestionToken);
});

test("precedence assignment", () => {
  // assignment rung (3): `=` is FirstAssignment.
  const { sourceFile, expression } = soleExpression("a=b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 3);
  assert.strictEqual(raw(sourceFile, expression), "a=b");
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsToken);
});

test("precedence compound assignment", () => {
  // compound assignment `+=` (3).
  const { sourceFile, expression } = soleExpression("a+=b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected binary expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "a+=b");
  assert.strictEqual(expression.operatorToken.kind, Kind.PlusEqualsToken);
});

// ── Category 4: arrow vs parenthesized-expression disambiguation ───────────
// NOTE coverage gap: bare `(a,b);` has no sequence/comma-expression production, so
// after `a` the parser now RECORDS X_0_expected[1005] (')' expected) and recovers
// instead of throwing (Stage-3b throw->diagnostics flip). The corpus uses the arrow
// forms `((a,b)=>a)` and `((a):T=>a)` which DO parse; `(a,b)` is the recovery probe.

test("arrow in parens two params", () => {
  const { sourceFile, expression } = soleExpression("((a,b)=>a);");
  if (!isParenthesizedExpression(expression)) throw new Error("Expected parenthesized expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 10);
  const arrow = expression.expression;
  if (!isArrowFunction(arrow)) throw new Error("Expected arrow function");
  assert.strictEqual(arrow.pos, 1);
  assert.strictEqual(arrow.end, 9);
  assert.strictEqual(raw(sourceFile, arrow), "(a,b)=>a");
  const paramA = arrow.parameters[0]!;
  if (!isParameterDeclaration(paramA)) throw new Error("Expected parameter a");
  assert.strictEqual(paramA.pos, 2);
  assert.strictEqual(paramA.end, 3);
  const paramB = arrow.parameters[1]!;
  if (!isParameterDeclaration(paramB)) throw new Error("Expected parameter b");
  assert.strictEqual(paramB.pos, 4);
  assert.strictEqual(paramB.end, 5);
  assert.strictEqual(arrow.equalsGreaterThanToken.kind, Kind.EqualsGreaterThanToken);
  const body = arrow.body;
  if (!isIdentifier(body)) throw new Error("Expected identifier body");
  assert.strictEqual(body.pos, 8);
  assert.strictEqual(body.end, 9);
});

test("arrow in parens with return type", () => {
  const { sourceFile, expression } = soleExpression("((a):T=>a);");
  if (!isParenthesizedExpression(expression)) throw new Error("Expected parenthesized expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 10);
  const arrow = expression.expression;
  if (!isArrowFunction(arrow)) throw new Error("Expected arrow function");
  assert.strictEqual(arrow.pos, 1);
  assert.strictEqual(arrow.end, 9);
  assert.strictEqual(raw(sourceFile, arrow), "(a):T=>a");
  const paramA = arrow.parameters[0]!;
  if (!isParameterDeclaration(paramA)) throw new Error("Expected parameter a");
  assert.strictEqual(paramA.pos, 2);
  assert.strictEqual(paramA.end, 3);
  const returnType = arrow.type!;
  if (!isTypeReferenceNode(returnType)) throw new Error("Expected return type reference");
  assert.strictEqual(returnType.pos, 5);
  assert.strictEqual(returnType.end, 6);
  assert.strictEqual(raw(sourceFile, returnType), "T");
  const body = arrow.body;
  if (!isIdentifier(body)) throw new Error("Expected identifier body");
  assert.strictEqual(body.pos, 8);
  assert.strictEqual(body.end, 9);
});

// Coverage gap: bare `(a,b);` (sequence/comma expression) is UNIMPLEMENTED. Stage-3b
// throw->diagnostics flip: the parser no longer throws — after `a` it RECORDS
// X_0_expected[1005] (')' expected, the comma is unexpected inside the parenthesized
// expression) and recovers. This probe pins that recovery (no throw, diagnostic
// recorded). It also serves as recovery probe #1 (recover_sequence_paren).
test("sequence expression is known gap", () => {
  const sourceFile = parseSourceFile("(a,b);");
  assert.ok(sourceFile.parseDiagnostics.length > 0, "(a,b) should record a parse diagnostic, not throw");
  assert.ok(sourceFile.parseDiagnostics.some((d) => d.code === 1005), "expected X_0_expected (')' expected) at the comma");
});

// ── Category 5: call type-args vs relational ──────────────────────────────

test("call with type arguments", () => {
  // `x<T>(y)` -> CallExpression with one typeArgument (NOT relational).
  const { sourceFile, expression } = soleExpression("x<T>(y);");
  if (!isCallExpression(expression)) throw new Error("Expected call expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 7);
  assert.strictEqual(raw(sourceFile, expression), "x<T>(y)");
  const callee = expression.expression;
  if (!isIdentifier(callee)) throw new Error("Expected identifier callee");
  assert.strictEqual(callee.pos, 0);
  assert.strictEqual(callee.end, 1);
  const typeArg = expression.typeArguments![0]!;
  if (!isTypeReferenceNode(typeArg)) throw new Error("Expected type argument reference");
  assert.strictEqual(typeArg.pos, 2);
  assert.strictEqual(typeArg.end, 3);
  assert.strictEqual(raw(sourceFile, typeArg), "T");
  const arg = expression.arguments[0]!;
  if (!isIdentifier(arg)) throw new Error("Expected identifier argument");
  assert.strictEqual(arg.pos, 5);
  assert.strictEqual(arg.end, 6);
});

test("paren relational not type args", () => {
  // `(x<y)` -> ParenExpr wrapping a relational BinaryExpression (NOT call/type-args).
  const { sourceFile, expression } = soleExpression("(x<y);");
  if (!isParenthesizedExpression(expression)) throw new Error("Expected parenthesized expression");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  const binary = expression.expression;
  if (!isBinaryExpression(binary)) throw new Error("Expected relational binary expression");
  assert.strictEqual(binary.pos, 1);
  assert.strictEqual(binary.end, 4);
  assert.strictEqual(raw(sourceFile, binary), "x<y");
  assert.strictEqual(binary.operatorToken.kind, Kind.LessThanToken);
  assert.strictEqual(binary.left.pos, 1);
  assert.strictEqual(binary.left.end, 2);
  assert.strictEqual(binary.right.pos, 3);
  assert.strictEqual(binary.right.end, 4);
});

// ── Category 6: infer constraints ─────────────────────────────────────────

test("infer with extends constraint", () => {
  const { sourceFile, type } = soleType("type T=A extends infer U extends string?U:never;");
  if (!isConditionalTypeNode(type)) throw new Error("Expected conditional type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 47);
  assert.strictEqual(raw(sourceFile, type), "A extends infer U extends string?U:never");
  const checkType = type.checkType;
  if (!isTypeReferenceNode(checkType)) throw new Error("Expected check type reference");
  assert.strictEqual(checkType.pos, 7);
  assert.strictEqual(checkType.end, 8);
  const extendsType = type.extendsType;
  if (!isInferTypeNode(extendsType)) throw new Error("Expected infer extends type");
  // M3 4c: extendsType.pos is its full-start = end of the first `extends` (16);
  // the space after `extends` is its leading trivia, so raw includes it. end
  // stays token-tight at 39.
  assert.strictEqual(extendsType.pos, 16);
  assert.strictEqual(extendsType.end, 39);
  assert.strictEqual(raw(sourceFile, extendsType), " infer U extends string");
  const tp = extendsType.typeParameter;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected type parameter");
  // M3 4c: tp `U`'s pos is its full-start = end of `infer` (22); the space is
  // its leading trivia, so raw includes it. end stays token-tight at 39.
  assert.strictEqual(tp.pos, 22);
  assert.strictEqual(tp.end, 39);
  assert.strictEqual(raw(sourceFile, tp), " U extends string");
  const constraint = tp.constraint!;
  if (!isKeywordTypeNode(constraint)) throw new Error("Expected keyword constraint");
  assert.strictEqual(constraint.kind, Kind.StringKeyword);
  // M3 4c: constraint `string`'s pos is its full-start = end of the second
  // `extends` (32); the space is its leading trivia. end stays token-tight at 39.
  assert.strictEqual(constraint.pos, 32);
  assert.strictEqual(constraint.end, 39);
  const trueType = type.trueType;
  if (!isTypeReferenceNode(trueType)) throw new Error("Expected true type reference");
  assert.strictEqual(trueType.pos, 40);
  assert.strictEqual(trueType.end, 41);
  const falseType = type.falseType;
  if (!isKeywordTypeNode(falseType)) throw new Error("Expected never false type");
  assert.strictEqual(falseType.kind, Kind.NeverKeyword);
  assert.strictEqual(falseType.pos, 42);
  assert.strictEqual(falseType.end, 47);
});

// ── Category 7: function + constructor types ──────────────────────────────

test("function type with param and void return", () => {
  const { sourceFile, type } = soleType("type F=(a:number)=>void;");
  if (!isFunctionTypeNode(type)) throw new Error("Expected function type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 23);
  assert.strictEqual(raw(sourceFile, type), "(a:number)=>void");
  const param = type.parameters[0]!;
  if (!isParameterDeclaration(param)) throw new Error("Expected parameter");
  assert.strictEqual(param.pos, 8);
  assert.strictEqual(param.end, 16);
  assert.strictEqual(raw(sourceFile, param), "a:number");
  const paramType = param.type!;
  if (!isKeywordTypeNode(paramType)) throw new Error("Expected number param type");
  assert.strictEqual(paramType.kind, Kind.NumberKeyword);
  assert.strictEqual(paramType.pos, 10);
  assert.strictEqual(paramType.end, 16);
  const returnType = type.type!;
  if (!isKeywordTypeNode(returnType)) throw new Error("Expected void return type");
  assert.strictEqual(returnType.kind, Kind.VoidKeyword);
  assert.strictEqual(returnType.pos, 19);
  assert.strictEqual(returnType.end, 23);
});

test("constructor type no params", () => {
  const { sourceFile, type } = soleType("type C=new()=>X;");
  if (!isConstructorTypeNode(type)) throw new Error("Expected constructor type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 15);
  assert.strictEqual(raw(sourceFile, type), "new()=>X");
  const returnType = type.type!;
  if (!isTypeReferenceNode(returnType)) throw new Error("Expected X return type reference");
  assert.strictEqual(returnType.pos, 14);
  assert.strictEqual(returnType.end, 15);
  assert.strictEqual(raw(sourceFile, returnType), "X");
});

// ── Category 8: mapped types ──────────────────────────────────────────────

test("mapped type keyof indexed access", () => {
  const { sourceFile, type } = soleType("type M={[K in keyof T]:T[K]};");
  if (!isMappedTypeNode(type)) throw new Error("Expected mapped type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 28);
  assert.strictEqual(raw(sourceFile, type), "{[K in keyof T]:T[K]}");
  const tp = type.typeParameter;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected mapped type parameter");
  assert.strictEqual(tp.pos, 9);
  assert.strictEqual(tp.end, 21);
  assert.strictEqual(raw(sourceFile, tp), "K in keyof T");
  const constraint = tp.constraint!;
  if (!isTypeOperatorNode(constraint)) throw new Error("Expected keyof type operator constraint");
  // M3 4c: constraint.pos is its full-start = end of `in` (13); the space after
  // `in` is its leading trivia, so raw includes it. end stays token-tight at 21.
  assert.strictEqual(constraint.pos, 13);
  assert.strictEqual(constraint.end, 21);
  assert.strictEqual(raw(sourceFile, constraint), " keyof T");
  const valueType = type.type!;
  if (!isIndexedAccessTypeNode(valueType)) throw new Error("Expected indexed access value type");
  assert.strictEqual(valueType.pos, 23);
  assert.strictEqual(valueType.end, 27);
  assert.strictEqual(raw(sourceFile, valueType), "T[K]");
  const objectType = valueType.objectType;
  if (!isTypeReferenceNode(objectType)) throw new Error("Expected object type reference");
  assert.strictEqual(objectType.pos, 23);
  assert.strictEqual(objectType.end, 24);
  const indexType = valueType.indexType;
  if (!isTypeReferenceNode(indexType)) throw new Error("Expected index type reference");
  assert.strictEqual(indexType.pos, 25);
  assert.strictEqual(indexType.end, 26);
});

// ── Category 9: named tuples ──────────────────────────────────────────────

test("named tuple with optional member", () => {
  const { sourceFile, type } = soleType("type T=[a:number,b?:string];");
  if (!isTupleTypeNode(type)) throw new Error("Expected tuple type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 27);
  assert.strictEqual(raw(sourceFile, type), "[a:number,b?:string]");
  const first = type.elements[0]!;
  if (!isNamedTupleMember(first)) throw new Error("Expected first named tuple member");
  assert.strictEqual(first.pos, 8);
  assert.strictEqual(first.end, 16);
  assert.strictEqual(raw(sourceFile, first), "a:number");
  if (!isIdentifier(first.name)) throw new Error("Expected first member name");
  assert.strictEqual(first.name.pos, 8);
  assert.strictEqual(first.name.end, 9);
  if (!isKeywordTypeNode(first.type)) throw new Error("Expected first member number type");
  assert.strictEqual(first.type.kind, Kind.NumberKeyword);
  assert.strictEqual(first.type.pos, 10);
  assert.strictEqual(first.type.end, 16);
  const second = type.elements[1]!;
  if (!isNamedTupleMember(second)) throw new Error("Expected second named tuple member");
  assert.strictEqual(second.pos, 17);
  assert.strictEqual(second.end, 26);
  assert.strictEqual(raw(sourceFile, second), "b?:string");
  assert.strictEqual(second.questionToken!.kind, Kind.QuestionToken);
  if (!isKeywordTypeNode(second.type)) throw new Error("Expected second member string type");
  assert.strictEqual(second.type.kind, Kind.StringKeyword);
  assert.strictEqual(second.type.pos, 20);
  assert.strictEqual(second.type.end, 26);
});

// ── Category 10: index signatures ─────────────────────────────────────────

test("index signature in type literal", () => {
  const { sourceFile, type } = soleType("type D={[k:string]:number};");
  if (!isTypeLiteralNode(type)) throw new Error("Expected type literal");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 26);
  const member = type.members[0]!;
  if (!isIndexSignatureDeclaration(member)) throw new Error("Expected index signature");
  assert.strictEqual(member.pos, 8);
  assert.strictEqual(member.end, 25);
  assert.strictEqual(raw(sourceFile, member), "[k:string]:number");
  const param = member.parameters[0]!;
  if (!isParameterDeclaration(param)) throw new Error("Expected index parameter");
  assert.strictEqual(param.pos, 9);
  assert.strictEqual(param.end, 17);
  assert.strictEqual(raw(sourceFile, param), "k:string");
  if (!isKeywordTypeNode(param.type!)) throw new Error("Expected string key type");
  assert.strictEqual(param.type!.kind, Kind.StringKeyword);
  assert.strictEqual(param.type!.pos, 11);
  assert.strictEqual(param.type!.end, 17);
  const valueType = member.type!;
  if (!isKeywordTypeNode(valueType)) throw new Error("Expected number value type");
  assert.strictEqual(valueType.kind, Kind.NumberKeyword);
  assert.strictEqual(valueType.pos, 19);
  assert.strictEqual(valueType.end, 25);
});

// ── Category 11: template literal expression ──────────────────────────────

test("template expression head span tail", () => {
  const { sourceFile, expression } = soleExpression("x=`a${b}c`;");
  if (!isBinaryExpression(expression)) throw new Error("Expected assignment binary");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 10);
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsToken);
  const template = expression.right;
  if (!isTemplateExpression(template)) throw new Error("Expected template expression");
  assert.strictEqual(template.pos, 2);
  assert.strictEqual(template.end, 10);
  assert.strictEqual(raw(sourceFile, template), "`a${b}c`");
  assert.strictEqual(template.head.kind, Kind.TemplateHead);
  assert.strictEqual(template.head.pos, 2);
  assert.strictEqual(template.head.end, 6);
  assert.strictEqual(raw(sourceFile, template.head), "`a${");
  const span = template.templateSpans[0]!;
  if (!isTemplateSpan(span)) throw new Error("Expected template span");
  assert.strictEqual(span.pos, 6);
  assert.strictEqual(span.end, 10);
  assert.strictEqual(raw(sourceFile, span), "b}c`");
  if (!isIdentifier(span.expression)) throw new Error("Expected span expression identifier");
  assert.strictEqual(span.expression.pos, 6);
  assert.strictEqual(span.expression.end, 7);
  assert.strictEqual(span.literal.kind, Kind.TemplateTail);
  assert.strictEqual(span.literal.pos, 7);
  assert.strictEqual(span.literal.end, 10);
  assert.strictEqual(raw(sourceFile, span.literal), "}c`");
});

// ── Category 12: template literal type ────────────────────────────────────

test("template literal type head span tail", () => {
  const { sourceFile, type } = soleType("type T=`a${B}c`;");
  if (!isTemplateLiteralTypeNode(type)) throw new Error("Expected template literal type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 15);
  assert.strictEqual(raw(sourceFile, type), "`a${B}c`");
  assert.strictEqual(type.head.kind, Kind.TemplateHead);
  assert.strictEqual(type.head.pos, 7);
  assert.strictEqual(type.head.end, 11);
  assert.strictEqual(raw(sourceFile, type.head), "`a${");
  const span = type.templateSpans[0]!;
  if (!isTemplateLiteralTypeSpan(span)) throw new Error("Expected template literal type span");
  assert.strictEqual(span.pos, 11);
  assert.strictEqual(span.end, 15);
  assert.strictEqual(raw(sourceFile, span), "B}c`");
  if (!isTypeReferenceNode(span.type)) throw new Error("Expected span type reference");
  assert.strictEqual(span.type.pos, 11);
  assert.strictEqual(span.type.end, 12);
  assert.strictEqual(span.literal.kind, Kind.TemplateTail);
  assert.strictEqual(span.literal.pos, 12);
  assert.strictEqual(span.literal.end, 15);
  assert.strictEqual(raw(sourceFile, span.literal), "}c`");
});

// ── Category 13a: regex vs divide ─────────────────────────────────────────

test("regex literal after assignment", () => {
  const { sourceFile, expression } = soleExpression("x=/ab+/g;");
  if (!isBinaryExpression(expression)) throw new Error("Expected assignment binary");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 8);
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsToken);
  const regex = expression.right;
  if (!isRegularExpressionLiteral(regex)) throw new Error("Expected regex literal");
  assert.strictEqual(regex.pos, 2);
  assert.strictEqual(regex.end, 8);
  assert.strictEqual(raw(sourceFile, regex), "/ab+/g");
});

test("divide not regex", () => {
  const { sourceFile, expression } = soleExpression("x=a/b;");
  if (!isBinaryExpression(expression)) throw new Error("Expected outer assignment binary");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(expression.operatorToken.kind, Kind.EqualsToken);
  const inner = expression.right;
  if (!isBinaryExpression(inner)) throw new Error("Expected inner divide binary");
  assert.strictEqual(inner.pos, 2);
  assert.strictEqual(inner.end, 5);
  assert.strictEqual(raw(sourceFile, inner), "a/b");
  assert.strictEqual(inner.operatorToken.kind, Kind.SlashToken);
  assert.strictEqual(inner.left.pos, 2);
  assert.strictEqual(inner.left.end, 3);
  assert.strictEqual(inner.right.pos, 4);
  assert.strictEqual(inner.right.end, 5);
});

// ── Category 13b: decorators ──────────────────────────────────────────────

test("decorator identifier on class", () => {
  const sourceFile = parseSourceFile("@dec class C{}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 14);
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 4);
  assert.strictEqual(raw(sourceFile, decorator), "@dec");
  const expression = decorator.expression;
  if (!isIdentifier(expression)) throw new Error("Expected identifier decorator expression");
  assert.strictEqual(expression.pos, 1);
  assert.strictEqual(expression.end, 4);
  assert.strictEqual(raw(sourceFile, expression), "dec");
  const name = statement.name!;
  if (!isIdentifier(name)) throw new Error("Expected class name identifier");
  // M3 4c: the class name `C`'s pos is its full-start = end of `class` (10); the
  // space after `class` is its leading trivia. end stays token-tight at 12.
  assert.strictEqual(name.pos, 10);
  assert.strictEqual(name.end, 12);
});

test("decorator property access on class", () => {
  const sourceFile = parseSourceFile("@ns.x class C{}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 5);
  assert.strictEqual(raw(sourceFile, decorator), "@ns.x");
  const expression = decorator.expression;
  if (!isPropertyAccessExpression(expression)) throw new Error("Expected property access decorator expression");
  assert.strictEqual(expression.pos, 1);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(raw(sourceFile, expression), "ns.x");
});

test("decorator call on class", () => {
  const sourceFile = parseSourceFile("@dec() class C{}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 6);
  assert.strictEqual(raw(sourceFile, decorator), "@dec()");
  const expression = decorator.expression;
  if (!isCallExpression(expression)) throw new Error("Expected call decorator expression");
  assert.strictEqual(expression.pos, 1);
  assert.strictEqual(expression.end, 6);
  assert.strictEqual(raw(sourceFile, expression), "dec()");
});

// ── Extra: already-supported type forms (lock ranges) ─────────────────────

test("optional type in tuple", () => {
  const { sourceFile, type } = soleType("type T=[number?];");
  if (!isTupleTypeNode(type)) throw new Error("Expected tuple type");
  const element = type.elements[0]!;
  if (!isOptionalTypeNode(element)) throw new Error("Expected optional type");
  assert.strictEqual(element.pos, 8);
  assert.strictEqual(element.end, 15);
  assert.strictEqual(raw(sourceFile, element), "number?");
  if (!isKeywordTypeNode(element.type)) throw new Error("Expected number element type");
  assert.strictEqual(element.type.kind, Kind.NumberKeyword);
  assert.strictEqual(element.type.pos, 8);
  assert.strictEqual(element.type.end, 14);
});

test("rest type in tuple", () => {
  const { sourceFile, type } = soleType("type T=[...number[]];");
  if (!isTupleTypeNode(type)) throw new Error("Expected tuple type");
  const element = type.elements[0]!;
  if (!isRestTypeNode(element)) throw new Error("Expected rest type");
  assert.strictEqual(element.pos, 8);
  assert.strictEqual(element.end, 19);
  assert.strictEqual(raw(sourceFile, element), "...number[]");
  if (!isArrayTypeNode(element.type)) throw new Error("Expected array element type");
  assert.strictEqual(element.type.pos, 11);
  assert.strictEqual(element.type.end, 19);
  assert.strictEqual(raw(sourceFile, element.type), "number[]");
});

test("import type with qualifier", () => {
  const { sourceFile, type } = soleType("type T=import(\"m\").X;");
  if (!isImportTypeNode(type)) throw new Error("Expected import type");
  assert.strictEqual(type.pos, 7);
  assert.strictEqual(type.end, 20);
  assert.strictEqual(raw(sourceFile, type), "import(\"m\").X");
  const argument = type.argument;
  if (!isLiteralTypeNode(argument)) throw new Error("Expected literal module specifier");
  assert.strictEqual(argument.pos, 14);
  assert.strictEqual(argument.end, 17);
  if (!isStringLiteral(argument.literal)) throw new Error("Expected string literal in module specifier");
  assert.strictEqual(raw(sourceFile, argument.literal), "\"m\"");
  const qualifier = type.qualifier!;
  if (!isIdentifier(qualifier)) throw new Error("Expected identifier qualifier");
  assert.strictEqual(qualifier.pos, 19);
  assert.strictEqual(qualifier.end, 20);
  assert.strictEqual(raw(sourceFile, qualifier), "X");
});

// ── M3 Stage-5 pre-wave: scriptKind/languageVariant plumbing ────────────────
// These probes prove ONLY the plumbing (ScriptKind -> getLanguageVariant ->
// parser/scanner variant + SourceFile stamp), NOT JSX parsing (5a adds that).

// (a) A .ts/ScriptKindTS parse stays Standard, and `let x = <T>y;` now parses to a
// TypeAssertionExpression. CAPTURE-CORRECTION: pre-5a this probe asserted the (then-
// unimplemented) LessThanToken arm fell through to Expression_expected[1109] + a
// BinaryExpression. M3 Stage 5a implements parseTypeAssertion (tsgo 5117-5125), the
// Standard-variant arm of the fused LessThanToken handling, so `< Type > expr` is now
// the faithful TypeAssertion. No diagnostics; the initializer is a TypeAssertion.
test("prewave ts is standard variant unchanged", () => {
  const sourceFile = parseSourceFile("let x = <T>y;", { fileName: "a.ts" });
  assert.strictEqual(sourceFile.languageVariant, LanguageVariant.Standard);
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TS);
  // 5a: the LessThanToken arm now builds a TypeAssertion — no Expression_expected[1109].
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
  const declaration = statement.declarationList.declarations[0]!;
  const initializer = declaration.initializer!;
  // 5a: `<T>y` is now a faithful TypeAssertionExpression (not a binary recovery).
  assert.strictEqual(initializer.kind, Kind.TypeAssertionExpression);
  if (!isTypeAssertion(initializer)) throw new Error("Expected type assertion");
  if (!isTypeReferenceNode(initializer.type)) throw new Error("Expected type reference (T)");
  if (!isIdentifier(initializer.expression)) throw new Error("Expected identifier operand (y)");
  assert.strictEqual(initializer.expression.text, "y");
  // .pos is the trivia-inclusive full-start (the space after `=`), so the raw slice
  // includes that leading trivia — tsts node.pos = TokenFullStart (M3 4c).
  assert.strictEqual(raw(sourceFile, initializer), " <T>y");
});

// (b) A .tsx/ScriptKindTSX parse (via the new options) reaches JSX mode: the
// SourceFile is stamped LanguageVariant.JSX + ScriptKind.TSX (tsgo NewSourceFile
// carries scriptKind + languageVariant). Explicit option wins over fileName.
test("prewave tsx reaches jsx variant", () => {
  const sourceFile = parseSourceFile("const a = 1;", { fileName: "a.tsx", scriptKind: ScriptKind.TSX });
  assert.strictEqual(sourceFile.languageVariant, LanguageVariant.JSX);
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TSX);
});

// (b') The same JSX variant is reached when ScriptKind is INFERRED from a .tsx
// fileName (no explicit scriptKind option) via getScriptKindFromFileName — the
// shared helper is the single source of truth, no text heuristic.
test("prewave tsx inferred from filename", () => {
  const sourceFile = parseSourceFile("const a = 1;", { fileName: "a.tsx" });
  assert.strictEqual(sourceFile.languageVariant, LanguageVariant.JSX);
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TSX);
});

// (c) getScriptKindFromFileName maps .tsx -> TSX and .ts -> TS (tsgo
// core.GetScriptKindFromFileName, core/core.go:512).
test("prewave get script kind from file name", () => {
  assert.strictEqual(getScriptKindFromFileName("a.tsx"), ScriptKind.TSX);
  assert.strictEqual(getScriptKindFromFileName("a.ts"), ScriptKind.TS);
});

// ── M3 Stage-5a: JSX element / attribute layer ──────────────────────────────
// All parse in JSX mode (scriptKind: ScriptKind.TSX); assert tsgo-correct Kind +
// full-start .pos + token-tight .end + raw source slices. Children content is 5b,
// so these are self-closing / empty-element / empty-fragment inputs.

// `<div/>` => JsxSelfClosingElement (tagName Identifier, no attributes).
test("jsx self closing identifier", () => {
  const { sourceFile, expression } = soleJsx("<div/>;");
  if (!isJsxSelfClosingElement(expression)) throw new Error("Expected self-closing element");
  assert.strictEqual(expression.kind, Kind.JsxSelfClosingElement);
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 6);
  assert.strictEqual(raw(sourceFile, expression), "<div/>");
  if (!isIdentifier(expression.tagName)) throw new Error("Expected identifier tag name");
  assert.strictEqual(expression.tagName.text, "div");
  assert.strictEqual(expression.attributes.properties.length, 0);
});

// `<A.B.C/>` => self-closing, tagName = PropertyAccess chain (structural).
test("jsx self closing property access chain", () => {
  const { sourceFile, expression } = soleJsx("<A.B.C/>;");
  if (!isJsxSelfClosingElement(expression)) throw new Error("Expected self-closing element");
  assert.strictEqual(raw(sourceFile, expression), "<A.B.C/>");
  const tagName = expression.tagName;
  if (!isPropertyAccessExpression(tagName)) throw new Error("Expected property access tag name (A.B.C)");
  assert.strictEqual(tagName.name.text, "C");
  if (!isPropertyAccessExpression(tagName.expression)) throw new Error("Expected A.B inner property access");
  assert.strictEqual(tagName.expression.name.text, "B");
  if (!isIdentifier(tagName.expression.expression)) throw new Error("Expected A identifier base");
  assert.strictEqual(tagName.expression.expression.text, "A");
});

// `<ns:tag/>` => self-closing, tagName = JsxNamespacedName.
test("jsx self closing namespaced name", () => {
  const { sourceFile, expression } = soleJsx("<ns:tag/>;");
  if (!isJsxSelfClosingElement(expression)) throw new Error("Expected self-closing element");
  assert.strictEqual(raw(sourceFile, expression), "<ns:tag/>");
  const tagName = expression.tagName;
  if (!isJsxNamespacedName(tagName)) throw new Error("Expected namespaced name tag");
  assert.strictEqual(tagName.namespace.text, "ns");
  assert.strictEqual(tagName.name.text, "tag");
});

// `<div {...props}/>` => self-closing with a JsxSpreadAttribute.
test("jsx self closing spread attribute", () => {
  const { sourceFile, expression } = soleJsx("<div {...props}/>;");
  if (!isJsxSelfClosingElement(expression)) throw new Error("Expected self-closing element");
  assert.strictEqual(raw(sourceFile, expression), "<div {...props}/>");
  assert.strictEqual(expression.attributes.properties.length, 1);
  const attr = expression.attributes.properties[0]!;
  if (!isJsxSpreadAttribute(attr)) throw new Error("Expected spread attribute");
  if (!isIdentifier(attr.expression)) throw new Error("Expected identifier spread expression");
  assert.strictEqual(attr.expression.text, "props");
});

// `<div a="x" b={1}/>` => self-closing with JsxAttribute(string) + JsxAttribute(JsxExpression).
test("jsx self closing attributes", () => {
  const { sourceFile, expression } = soleJsx("<div a=\"x\" b={1}/>;");
  if (!isJsxSelfClosingElement(expression)) throw new Error("Expected self-closing element");
  assert.strictEqual(raw(sourceFile, expression), "<div a=\"x\" b={1}/>");
  assert.strictEqual(expression.attributes.properties.length, 2);
  const a = expression.attributes.properties[0]!;
  if (!isJsxAttribute(a)) throw new Error("Expected jsx attribute a");
  if (!isIdentifier(a.name)) throw new Error("Expected identifier attribute name a");
  assert.strictEqual(a.name.text, "a");
  if (a.initializer === undefined || !isStringLiteral(a.initializer)) throw new Error("Expected string-literal value for a");
  assert.strictEqual(a.initializer.text, "x");
  const b = expression.attributes.properties[1]!;
  if (!isJsxAttribute(b)) throw new Error("Expected jsx attribute b");
  if (!isIdentifier(b.name)) throw new Error("Expected identifier attribute name b");
  assert.strictEqual(b.name.text, "b");
  if (b.initializer === undefined || !isJsxExpression(b.initializer)) throw new Error("Expected jsx-expression value for b");
  if (b.initializer.expression === undefined || !isNumericLiteral(b.initializer.expression)) throw new Error("Expected numeric expression in b={1}");
  assert.strictEqual(b.initializer.expression.text, "1");
});

// `<></>` => JsxFragment with JsxOpeningFragment + empty children + JsxClosingFragment.
test("jsx empty fragment", () => {
  const { sourceFile, expression } = soleJsx("<></>;");
  if (!isJsxFragment(expression)) throw new Error("Expected jsx fragment");
  assert.strictEqual(expression.kind, Kind.JsxFragment);
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(raw(sourceFile, expression), "<></>");
  assert.strictEqual(expression.openingFragment.kind, Kind.JsxOpeningFragment);
  assert.strictEqual(expression.children.length, 0);
  assert.strictEqual(expression.closingFragment.kind, Kind.JsxClosingFragment);
});

// `<div></div>` => JsxElement with empty children + JsxClosingElement (tag match).
test("jsx empty element", () => {
  const { sourceFile, expression } = soleJsx("<div></div>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(expression.kind, Kind.JsxElement);
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 11);
  assert.strictEqual(raw(sourceFile, expression), "<div></div>");
  assert.strictEqual(expression.openingElement.kind, Kind.JsxOpeningElement);
  if (!isIdentifier(expression.openingElement.tagName)) throw new Error("Expected identifier opening tag name");
  assert.strictEqual(expression.openingElement.tagName.text, "div");
  assert.strictEqual(expression.children.length, 0);
  assert.strictEqual(expression.closingElement.kind, Kind.JsxClosingElement);
  if (!isIdentifier(expression.closingElement.tagName)) throw new Error("Expected identifier closing tag name");
  assert.strictEqual(expression.closingElement.tagName.text, "div");
});

// ── M3 Stage-5b: JSX children (JsxText / {expr} / nested element) ────────────

// `<div>text</div>` => JsxElement with one JsxText child "text".
test("jsx element text child", () => {
  const { sourceFile, expression } = soleJsx("<div>text</div>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 15);
  assert.strictEqual(raw(sourceFile, expression), "<div>text</div>");
  assert.strictEqual(expression.children.length, 1);
  const child = expression.children[0]!;
  if (!isJsxText(child)) throw new Error("Expected JsxText child");
  assert.strictEqual(child.kind, Kind.JsxText);
  assert.strictEqual(child.pos, 5);
  assert.strictEqual(child.end, 9);
  assert.strictEqual(raw(sourceFile, child), "text");
  assert.strictEqual(child.text, "text");
  assert.strictEqual(child.containsOnlyTriviaWhiteSpaces, false);
  // The closing tag still matches structurally (tagNamesAreEquivalent).
  if (!isIdentifier(expression.closingElement.tagName)) throw new Error("Expected identifier closing tag");
  assert.strictEqual(expression.closingElement.tagName.text, "div");
});

// `<div>{expr}</div>` => JsxElement with one JsxExpression child.
test("jsx element expression child", () => {
  const { sourceFile, expression } = soleJsx("<div>{expr}</div>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 17);
  assert.strictEqual(raw(sourceFile, expression), "<div>{expr}</div>");
  assert.strictEqual(expression.children.length, 1);
  const child = expression.children[0]!;
  if (!isJsxExpression(child)) throw new Error("Expected JsxExpression child");
  assert.strictEqual(child.kind, Kind.JsxExpression);
  assert.strictEqual(child.pos, 5);
  assert.strictEqual(child.end, 11);
  assert.strictEqual(raw(sourceFile, child), "{expr}");
  assert.strictEqual(child.dotDotDotToken, undefined);
  if (child.expression === undefined || !isIdentifier(child.expression)) throw new Error("Expected identifier expression in {expr}");
  assert.strictEqual(child.expression.text, "expr");
});

// `<><span/></>` => JsxFragment with a nested JsxSelfClosingElement child.
test("jsx fragment nested self closing child", () => {
  const { sourceFile, expression } = soleJsx("<><span/></>;");
  if (!isJsxFragment(expression)) throw new Error("Expected jsx fragment");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 12);
  assert.strictEqual(raw(sourceFile, expression), "<><span/></>");
  assert.strictEqual(expression.children.length, 1);
  const child = expression.children[0]!;
  if (!isJsxSelfClosingElement(child)) throw new Error("Expected JsxSelfClosingElement child");
  assert.strictEqual(child.pos, 2);
  assert.strictEqual(child.end, 9);
  assert.strictEqual(raw(sourceFile, child), "<span/>");
  if (!isIdentifier(child.tagName)) throw new Error("Expected identifier tag name span");
  assert.strictEqual(child.tagName.text, "span");
});

// `<a><b/></a>` => nested JsxElement whose child is JsxSelfClosingElement b.
test("jsx element nested element child", () => {
  const { sourceFile, expression } = soleJsx("<a><b/></a>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 11);
  assert.strictEqual(raw(sourceFile, expression), "<a><b/></a>");
  if (!isIdentifier(expression.openingElement.tagName)) throw new Error("Expected identifier opening tag a");
  assert.strictEqual(expression.openingElement.tagName.text, "a");
  assert.strictEqual(expression.children.length, 1);
  const child = expression.children[0]!;
  if (!isJsxSelfClosingElement(child)) throw new Error("Expected JsxSelfClosingElement child b");
  assert.strictEqual(child.pos, 3);
  assert.strictEqual(child.end, 7);
  assert.strictEqual(raw(sourceFile, child), "<b/>");
  if (!isIdentifier(child.tagName)) throw new Error("Expected identifier tag name b");
  assert.strictEqual(child.tagName.text, "b");
  if (!isIdentifier(expression.closingElement.tagName)) throw new Error("Expected identifier closing tag a");
  assert.strictEqual(expression.closingElement.tagName.text, "a");
});

// Whitespace-only JsxText (with a line break) between elements =>
// containsOnlyTriviaWhiteSpaces JsxText (scanner produces JsxTextAllWhiteSpaces,
// the node carries Kind.JsxText + containsOnlyTriviaWhiteSpaces=true).
test("jsx element whitespace only text child", () => {
  const { sourceFile, expression } = soleJsx("<a>\n<b/>\n</a>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(raw(sourceFile, expression), "<a>\n<b/>\n</a>");
  assert.strictEqual(expression.children.length, 3);
  const first = expression.children[0]!;
  if (!isJsxText(first)) throw new Error("Expected leading JsxText child");
  assert.strictEqual(first.kind, Kind.JsxText);
  assert.strictEqual(first.containsOnlyTriviaWhiteSpaces, true);
  assert.strictEqual(first.pos, 3);
  assert.strictEqual(first.end, 4);
  assert.strictEqual(raw(sourceFile, first), "\n");
  const middle = expression.children[1]!;
  if (!isJsxSelfClosingElement(middle)) throw new Error("Expected middle JsxSelfClosingElement b");
  assert.strictEqual(raw(sourceFile, middle), "<b/>");
  const last = expression.children[2]!;
  if (!isJsxText(last)) throw new Error("Expected trailing JsxText child");
  assert.strictEqual(last.containsOnlyTriviaWhiteSpaces, true);
  assert.strictEqual(raw(sourceFile, last), "\n");
});

// Tag-mismatch `<a></b>` => the 5a mismatch diagnostic path (recovery, NOT a throw):
// Expected_corresponding_JSX_closing_tag_for_0 (17002), and a recovered JsxElement.
test("jsx element tag mismatch recovers", () => {
  const sourceFile = parseSourceFile("<a></b>;", { fileName: "a.tsx", scriptKind: ScriptKind.TSX });
  assert.ok(
    sourceFile.parseDiagnostics.some((d) => d.code === 17002),
    "expected Expected_corresponding_JSX_closing_tag_for_0 (17002) on <a></b>",
  );
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const expression = statement.expression;
  if (!isJsxElement(expression)) throw new Error("Expected recovered jsx element");
  assert.strictEqual(raw(sourceFile, expression), "<a></b>");
  if (!isIdentifier(expression.openingElement.tagName)) throw new Error("Expected identifier opening tag a");
  assert.strictEqual(expression.openingElement.tagName.text, "a");
  if (!isIdentifier(expression.closingElement.tagName)) throw new Error("Expected identifier closing tag b");
  assert.strictEqual(expression.closingElement.tagName.text, "b");
  assert.strictEqual(expression.children.length, 0);
});

// codex concrete case: `<div a="x">hi {name}<span /></div>` => mixed children:
// JsxText "hi ", JsxExpression {name}, nested JsxSelfClosingElement span; closing
// tag matches via tagNamesAreEquivalent (no diagnostic).
test("jsx element mixed children", () => {
  const { sourceFile, expression } = soleJsx("<div a=\"x\">hi {name}<span /></div>;");
  if (!isJsxElement(expression)) throw new Error("Expected jsx element");
  assert.strictEqual(raw(sourceFile, expression), "<div a=\"x\">hi {name}<span /></div>");
  assert.strictEqual(expression.openingElement.attributes.properties.length, 1);
  assert.strictEqual(expression.children.length, 3);
  const text = expression.children[0]!;
  if (!isJsxText(text)) throw new Error("Expected JsxText child 'hi '");
  assert.strictEqual(raw(sourceFile, text), "hi ");
  assert.strictEqual(text.text, "hi ");
  assert.strictEqual(text.containsOnlyTriviaWhiteSpaces, false);
  const expr = expression.children[1]!;
  if (!isJsxExpression(expr)) throw new Error("Expected JsxExpression child {name}");
  assert.strictEqual(raw(sourceFile, expr), "{name}");
  if (expr.expression === undefined || !isIdentifier(expr.expression)) throw new Error("Expected identifier in {name}");
  assert.strictEqual(expr.expression.text, "name");
  const span = expression.children[2]!;
  if (!isJsxSelfClosingElement(span)) throw new Error("Expected JsxSelfClosingElement child span");
  assert.strictEqual(raw(sourceFile, span), "<span />");
  if (!isIdentifier(span.tagName)) throw new Error("Expected identifier tag name span");
  assert.strictEqual(span.tagName.text, "span");
  if (!isIdentifier(expression.closingElement.tagName)) throw new Error("Expected identifier closing tag div");
  assert.strictEqual(expression.closingElement.tagName.text, "div");
});

// ── M3 6a: withJSDoc flag-stamp (tsgo jsdoc.go:56-74, TS/TSX slice) ──────────
// For a TS file the parser stamps NodeFlags.HasJSDoc onto a declaration preceded
// by a JSDoc comment (no eager JSDoc child node — lazy/checker-owned). The stamp
// is RANGE-NEUTRAL: the leading JSDoc stays in the host node's leading trivia
// [node.pos, firstTokenStart), so node.pos is the trivia-inclusive full-start and
// node.end stays token-tight; the host span is NOT widened by the comment.

// `/** Adds one. */\nexport function inc(...) {...}` followed by a sibling decl
// with NO JSDoc. The first FunctionDeclaration carries HasJSDoc; its pos is the
// trivia-inclusive full-start (0, covering the JSDoc) and its end is token-tight
// (the `}`). The sibling carries NO HasJSDoc and an unchanged token-tight range.
test("jsdoc hasjsdoc on function declaration", () => {
  const src = "/** Adds one. */\nexport function inc(x: number): number { return x + 1; }\nfunction plain(): void {}";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TS);
  const withDoc = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(withDoc)) throw new Error("Expected first function declaration");
  // HasJSDoc is stamped.
  assert.strictEqual(withDoc.flags & NodeFlags.HasJSDoc, NodeFlags.HasJSDoc);
  // No @deprecated => PossiblyContainsDeprecatedTag stays clear.
  assert.strictEqual(withDoc.flags & NodeFlags.PossiblyContainsDeprecatedTag, 0);
  // pos is the trivia-inclusive full-start = 0 (the JSDoc is leading trivia of the host).
  assert.strictEqual(withDoc.pos, 0);
  // end is token-tight at the closing `}` of the body (NOT widened by the JSDoc).
  const incEnd = src.indexOf("}") + 1;
  assert.strictEqual(withDoc.end, incEnd);
  assert.strictEqual(src.slice(withDoc.end - "return x + 1; }".length, withDoc.end), "return x + 1; }");
  // The leading JSDoc lives in [withDoc.pos, firstTokenStart) trivia; the first
  // real token is `export`, so the host span starts at 0 but the source slice
  // begins with the comment (proving the comment is inside the trivia, not a child).
  assert.strictEqual(src.slice(withDoc.pos, withDoc.pos + 3), "/**");

  // Sibling with NO JSDoc: no HasJSDoc flag, range unaffected by the earlier stamp.
  const plain = sourceFile.statements[1]!;
  if (!isFunctionDeclaration(plain)) throw new Error("Expected second function declaration");
  assert.strictEqual(plain.flags & NodeFlags.HasJSDoc, 0);
  assert.strictEqual(plain.flags & NodeFlags.PossiblyContainsDeprecatedTag, 0);
  const plainEnd = src.length;
  assert.strictEqual(plain.end, plainEnd);
  assert.strictEqual(src.slice(plain.end - "function plain(): void {}".length, plain.end), "function plain(): void {}");
});

// `/** @deprecated */\nexport function old(): void {}` — the preceding JSDoc has an
// @deprecated tag, so BOTH HasJSDoc and PossiblyContainsDeprecatedTag are stamped.
test("jsdoc deprecated sets possibly contains deprecated tag", () => {
  const src = "/** @deprecated */\nexport function old(): void {}";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TS);
  const decl = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(decl)) throw new Error("Expected function declaration");
  assert.strictEqual(decl.flags & NodeFlags.HasJSDoc, NodeFlags.HasJSDoc);
  assert.strictEqual(decl.flags & NodeFlags.PossiblyContainsDeprecatedTag, NodeFlags.PossiblyContainsDeprecatedTag);
  // Range-neutral: pos is the trivia-inclusive full-start (0), end token-tight (`}`).
  assert.strictEqual(decl.pos, 0);
  assert.strictEqual(decl.end, src.length);
  assert.strictEqual(src.slice(decl.pos, decl.pos + 3), "/**");
});

// ── M3 6b: top-level-await reparse ────────────────────────────────────────────
//
// SetExternalModuleIndicator is STRUCTURAL: a SourceFile is an external module iff a
// top-level statement is an export/import/export-assignment/export-declaration (no
// filename/package heuristics). The reparse fires only for a non-declaration external
// module with recorded possibleAwaitSpans. A leading `await` followed by `(`/`[`/etc.
// (NOT an identifier/keyword/literal on the same line) is FIRST parsed as an `await`
// IDENTIFIER (isAwaitExpression's lookahead heuristic fails), which records a span;
// the reparse re-runs the statement with AwaitContext forced on, promoting it to a
// real AwaitExpression carrying NodeFlags.AwaitContext.

// TLA module (allowed): `await (load());\nexport const ready = true;` (scriptKind TS).
// The `export const` makes the file an external module (indicator SET); statement 0's
// leading `await (` mis-parses as an `await` identifier first-pass → span → reparse →
// a real AwaitExpression carrying AwaitContext. Statement 1 (the export) is unchanged.
test("tla module reparses await paren to await expression", () => {
  const src = "await (load());\nexport const ready = true;";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.scriptKind, ScriptKind.TS);
  // Structural module decision: the export makes externalModuleIndicator defined.
  assert.strictEqual(sourceFile.externalModuleIndicator !== undefined, true);
  // Statement 0: ExpressionStatement whose expression is a (reparsed) AwaitExpression
  // carrying AwaitContext.
  const stmt0 = sourceFile.statements[0]!;
  if (!isExpressionStatement(stmt0)) throw new Error("Expected expression statement");
  const expr = stmt0.expression;
  if (!isAwaitExpression(expr)) throw new Error("Expected await expression after reparse");
  assert.strictEqual(expr.kind, Kind.AwaitExpression);
  assert.strictEqual(expr.flags & NodeFlags.AwaitContext, NodeFlags.AwaitContext);
  // Statement 1: the export const, unchanged (a VariableStatement carrying ExportKeyword).
  // M3 4c: stmt1.pos is the trivia-inclusive full-start, so it begins at the `\n` after
  // statement 0; the raw slice therefore leads with that newline.
  const stmt1 = sourceFile.statements[1]!;
  if (!isVariableStatement(stmt1)) throw new Error("Expected variable statement");
  assert.strictEqual(raw(sourceFile, stmt1), "\nexport const ready = true;");
});

// First-pass heuristic (no reparse): `await load();\nexport const ready = true;`. After
// `await`, the next token `load` IS an identifier on the same line, so isAwaitExpression's
// lookahead succeeds and `await load()` is parsed DIRECTLY as an AwaitExpression on the
// first pass — no `await` identifier, no span, no reparse. tsgo-faithful: the expression
// is an AwaitExpression but does NOT carry AwaitContext (it was built outside one).
test("tla module await identifier followed parses directly no await context", () => {
  const src = "await load();\nexport const ready = true;";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.externalModuleIndicator !== undefined, true);
  const stmt0 = sourceFile.statements[0]!;
  if (!isExpressionStatement(stmt0)) throw new Error("Expected expression statement");
  const expr = stmt0.expression;
  if (!isAwaitExpression(expr)) throw new Error("Expected await expression (first-pass heuristic)");
  // No reparse occurred, so it carries NO AwaitContext (built with AwaitContext off).
  assert.strictEqual(expr.flags & NodeFlags.AwaitContext, 0);
});

// TLA non-module (rejected): `await (load());` with NO import/export. externalModule-
// Indicator is undefined, so the reparse gate fails — statement 0 keeps its first-pass
// await-as-identifier shape (a CallExpression `await(load())`, NOT an AwaitExpression),
// matching tsgo (no reparse for a non-module).
test("tla non module no reparse", () => {
  const src = "await (load());";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.externalModuleIndicator === undefined, true);
  const stmt0 = sourceFile.statements[0]!;
  if (!isExpressionStatement(stmt0)) throw new Error("Expected expression statement");
  // No reparse: `await (load())` was parsed as `await(load())` — a CallExpression on the
  // `await` identifier, NOT an AwaitExpression.
  assert.strictEqual(isAwaitExpression(stmt0.expression), false);
  assert.strictEqual(stmt0.expression.kind, Kind.CallExpression);
});

// import.meta module detection: CLASSIFIED NOT-APPLICABLE. tsts does NOT parse
// `import.meta` (the parser never builds a MetaProperty for it — #parsePrimaryExpression
// has no ImportKeyword arm), so getImportMetaIfNecessary / the PossiblyContainsImportMeta
// indicator branch can never fire (there is no node to find). This probe is therefore
// intentionally OMITTED — the import.meta indicator depends on syntax tsts does not parse.

// Range / parent integrity: the reparsed AwaitExpression statement has 4c-faithful
// pos/end (full-start pos, token-tight end) and its parent points to the (rebuilt)
// SourceFile. Uses a leading blank/space so the full-start (trivia-inclusive) is exercised.
test("tla reparse range and parent integrity", () => {
  const src = "await (x);\nexport {};";
  const sourceFile = parseSourceFile(src, { fileName: "a.ts" });
  assert.strictEqual(sourceFile.externalModuleIndicator !== undefined, true);
  const stmt0 = sourceFile.statements[0]!;
  if (!isExpressionStatement(stmt0)) throw new Error("Expected expression statement");
  const expr = stmt0.expression;
  if (!isAwaitExpression(expr)) throw new Error("Expected reparsed await expression");
  // 4c-faithful ranges: ExpressionStatement starts at full-start 0, ends token-tight at
  // the `;` after `await (x)` (index 10). The AwaitExpression starts at the `await` (0).
  assert.strictEqual(stmt0.pos, 0);
  assert.strictEqual(stmt0.end, 10);
  assert.strictEqual(raw(sourceFile, stmt0), "await (x);");
  assert.strictEqual(expr.pos, 0);
  assert.strictEqual(raw(sourceFile, expr), "await (x)");
  // Parent of the reparsed statement is the REBUILT SourceFile (the very node returned).
  assert.strictEqual(stmt0.parent.kind, Kind.SourceFile);
  assert.strictEqual(stmt0.parent === sourceFile, true);
  // The untouched copied statement (the export) also reparents to the rebuilt file.
  const stmt1 = sourceFile.statements[1]!;
  assert.strictEqual(stmt1.parent === sourceFile, true);
});

// ── Stage-3b throw->diagnostics FLIP: recovery probes ──────────────────────────
// Each probe parses a MALFORMED input that previously THREW a ParseError. After the
// flip the parser RECORDS a tsgo-faithful Diagnostic into sourceFile.parseDiagnostics
// and recovers (no throw, terminates). Probes assert the tsgo-faithful diagnostic
// code (and/or recovered AST shape) AND that no throw occurred. Termination is
// guaranteed by the 3b-list-model parseList progress guards. The recover_sequence_paren
// probe (`(a,b);` -> X_0_expected[1005]) lives in the
// "sequence expression is known gap" test above to avoid duplication.

// #2: `let x =` (no initializer) -> Expression_expected[1109].
test("recover let no initializer", () => {
  const sourceFile = parseNoThrow("let x =");
  assert.ok(hasCode(sourceFile, 1109), "expected Expression_expected[1109]");
});

// #3: `function f( {` (unclosed param list) -> X_0_expected[1005] (the `)`/`}`).
test("recover function unclosed paren", () => {
  const sourceFile = parseNoThrow("function f( {");
  assert.ok(hasCode(sourceFile, 1005), "expected X_0_expected[1005]");
});

// #4: `type T = ;` (empty type) -> Type_expected[1110].
test("recover type alias empty", () => {
  const sourceFile = parseNoThrow("type T = ;");
  assert.ok(hasCode(sourceFile, 1110), "expected Type_expected[1110]");
});

// #5: `f<T>(x);` parses as a CallExpression with one typeArgument; no diagnostics.
test("keep call type args", () => {
  const sourceFile = parseNoThrow("f<T>(x);");
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("expected expression statement");
  const expression = statement.expression;
  if (!isCallExpression(expression)) throw new Error("expected call expression");
  assert.strictEqual(expression.typeArguments!.length, 1);
});

// #6: `x<y>z;` is relational (BinaryExpression), NOT a type-argument call;
// canFollowTypeArgumentsInExpression returns false on identifier `z`. No diagnostics.
test("relational not type args", () => {
  const sourceFile = parseNoThrow("x<y>z;");
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("expected expression statement");
  const expression = statement.expression;
  if (!isBinaryExpression(expression)) throw new Error("expected binary (relational) expression");
  assert.strictEqual(isCallExpression(expression), false);
});

// #7: `(a: number) => x` as a FunctionType still parses; binding/type contexts
// preserved. No diagnostics.
test("arrow vs paren functiontype", () => {
  const sourceFile = parseNoThrow("type F=(a: number) => x;");
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("expected type alias");
  if (!isFunctionTypeNode(statement.type)) throw new Error("expected function type");
  assert.strictEqual(statement.type.parameters.length, 1);
});

// #8: `*;` (a token that is not start-of-expression in expr position) ->
// Expression_expected[1109]; a missing identifier is built.
test("recover primary unexpected", () => {
  const sourceFile = parseNoThrow("*;");
  assert.ok(hasCode(sourceFile, 1109), "expected Expression_expected[1109]");
});

// #9: `try {}` (no catch/finally) -> X_catch_or_finally_expected[1472];
// statements[0] is a recovered TryStatement.
test("recover try no catch finally", () => {
  const sourceFile = parseNoThrow("try {}");
  assert.ok(hasCode(sourceFile, 1472), "expected X_catch_or_finally_expected[1472]");
  if (!isTryStatement(sourceFile.statements[0]!)) throw new Error("expected try statement");
});

// #10: "`a${b`" (head+expr, no middle/tail close) -> X_0_expected[1005].
test("recover template unterminated span", () => {
  const sourceFile = parseNoThrow("`a${b`");
  assert.ok(hasCode(sourceFile, 1005), "expected X_0_expected[1005]");
});

// #11: `const {1} = x;` (numeric prop, no colon) -> Identifier_expected[1003].
test("recover object binding shorthand", () => {
  const sourceFile = parseNoThrow("const {1} = x;");
  assert.ok(hasCode(sourceFile, 1003), "expected Identifier_expected[1003]");
});

// #12: `a?.;` -> Identifier_expected[1003]; the expression is a
// PropertyAccessExpression with a missing (zero-width, empty-text) member name.
test("recover optional chain no member", () => {
  const sourceFile = parseNoThrow("a?.;");
  assert.ok(hasCode(sourceFile, 1003), "expected Identifier_expected[1003]");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("expected expression statement");
  if (!isPropertyAccessExpression(statement.expression)) throw new Error("expected property access expression");
  assert.strictEqual(statement.expression.name.text, "");
});

// #13: `type T = import("x", { bad: {} });` (bad attributes keyword) ->
// X_0_expected[1005] ("with" expected).
test("recover import attributes bad keyword", () => {
  const sourceFile = parseNoThrow("type T = import(\"x\", { bad: {} });");
  assert.ok(hasCode(sourceFile, 1005), "expected X_0_expected[1005] (\"with\")");
});

// #14a: `export {}` stays an ExportDeclaration (NOT MissingDeclaration); no diagnostics.
test("recover modifiers on block export", () => {
  const sourceFile = parseNoThrow("export {}");
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  if (!isExportDeclaration(sourceFile.statements[0]!)) throw new Error("expected export declaration");
});

// #14b: `abstract {}` (non-export modifier + block) -> Declaration_expected[1146];
// statements[0] is a MissingDeclaration (the block fall-through Group-A site).
test("recover modifiers on block", () => {
  const sourceFile = parseNoThrow("abstract {}");
  assert.ok(hasCode(sourceFile, 1146), "expected Declaration_expected[1146]");
  if (!isMissingDeclaration(sourceFile.statements[0]!)) throw new Error("expected missing declaration");
});

// #15: `abstract x;` (modifier before a non-keyword expression) ->
// Declaration_expected[1146]; statements[0] is a MissingDeclaration carrying the
// modifier (the expression-statement fall-through Group-A site). NOTE: `public a;`
// does NOT reach this path — tsgo isStartOfStatement(PublicKeyword) is false when an
// identifier follows on the same line (parser.go:6041), so it is handled by
// source-element abort recovery (Declaration_or_statement_expected[1128]), not the
// modifier fall-through. `abstract` (followed by a non-decl token) is the faithful
// input that consumes the modifier and reaches the expr-stmt MissingDeclaration.
test("recover modifiers expr stmt", () => {
  const sourceFile = parseNoThrow("abstract x;");
  assert.ok(hasCode(sourceFile, 1146), "expected Declaration_expected[1146]");
  const statement = sourceFile.statements[0]!;
  if (!isMissingDeclaration(statement)) throw new Error("expected missing declaration");
  assert.strictEqual(statement.modifiers!.length, 1);
});

// #16: `type T = X extends infer U extends string ? U : never;` -> the conditional
// + infer-constraint parses (context-flag rewind in #tryParseConstraintOfInferType
// still works under the diagnostics-truncating #rewind). No diagnostics.
test("infer constraint context preserved", () => {
  const sourceFile = parseNoThrow("type T = X extends infer U extends string ? U : never;");
  assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("expected type alias");
  if (!isConditionalTypeNode(statement.type)) throw new Error("expected conditional type");
});

// #17 (sanity): `}}}};` terminates via the parseList abort path (no throw, no hang).
test("terminates on garbage", () => {
  const sourceFile = parseNoThrow("}}}};");
  // The abort path records Declaration_or_statement_expected[1128] for the leading
  // close-braces; the only assertion that matters here is that it TERMINATED without
  // throwing (already checked by parseNoThrow) and produced diagnostics.
  assert.ok(sourceFile.parseDiagnostics.length > 0, "garbage should record diagnostics");
});
