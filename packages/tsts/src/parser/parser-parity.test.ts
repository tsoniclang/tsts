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

import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import type { Expression, SourceFile, TypeNode } from "../ast/index.js";
import {
  Kind,
  isArrayTypeNode,
  isArrowFunction,
  isBinaryExpression,
  isCallExpression,
  isClassDeclaration,
  isConditionalTypeNode,
  isConstructorTypeNode,
  isDecorator,
  isExpressionStatement,
  isFunctionTypeNode,
  isIdentifier,
  isImportTypeNode,
  isIndexSignatureDeclaration,
  isIndexedAccessTypeNode,
  isInferTypeNode,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isMappedTypeNode,
  isNamedTupleMember,
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
  isTupleTypeNode,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeOperatorNode,
  isTypeParameterDeclaration,
  isTypeReferenceNode,
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";

export class ParserParityTests {
  // ── Helpers ──────────────────────────────────────────────────────────────

  // Returns the single ExpressionStatement's expression for `<expr>;` snippets.
  #soleExpression(src: string): { sourceFile: SourceFile; expression: Expression } {
    const sourceFile = parseSourceFile(src);
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    return { sourceFile, expression: statement.expression };
  }

  // Returns the single TypeAliasDeclaration's type for `type X=<type>;` snippets.
  #soleType(src: string): { sourceFile: SourceFile; type: TypeNode } {
    const sourceFile = parseSourceFile(src);
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    return { sourceFile, type: statement.type };
  }

  #raw(sourceFile: SourceFile, node: { pos: number; end: number }): string {
    return sourceFile.text.slice(node.pos, node.end);
  }

  // ── Category 1: shift / relational operators ──────────────────────────────
  // The scanner pre-combines `>>`/`>>>`/`>=`/etc., so operatorToken is synthesized
  // ([-1,-1)); assert the BinaryExpression parent span + operand ranges + op KIND.

  shift_right_shift_a_rsh_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>>b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(Kind.BinaryExpression, expression.kind);
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a>>b", this.#raw(sourceFile, expression));
    Assert.Equal(expression.left.pos, expression.pos);
    Assert.Equal(expression.right.end, expression.end);
    Assert.Equal(Kind.GreaterThanGreaterThanToken, expression.operatorToken.kind);
    if (!isIdentifier(expression.left)) throw new Exception("Expected left identifier");
    Assert.Equal(0, expression.left.pos);
    Assert.Equal(1, expression.left.end);
    if (!isIdentifier(expression.right)) throw new Exception("Expected right identifier");
    Assert.Equal(3, expression.right.pos);
    Assert.Equal(4, expression.right.end);
  }

  shift_unsigned_right_shift_a_ursh_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>>>b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("a>>>b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.GreaterThanGreaterThanGreaterThanToken, expression.operatorToken.kind);
    Assert.Equal(4, expression.right.pos);
    Assert.Equal(5, expression.right.end);
  }

  relational_greater_equals_a_ge_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>=b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a>=b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.GreaterThanEqualsToken, expression.operatorToken.kind);
    Assert.Equal(3, expression.right.pos);
    Assert.Equal(4, expression.right.end);
  }

  relational_greater_than_a_gt_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a>b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.GreaterThanToken, expression.operatorToken.kind);
    Assert.Equal(2, expression.right.pos);
    Assert.Equal(3, expression.right.end);
  }

  assign_right_shift_a_rsh_eq_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>>=b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("a>>=b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.GreaterThanGreaterThanEqualsToken, expression.operatorToken.kind);
    Assert.Equal(4, expression.right.pos);
    Assert.Equal(5, expression.right.end);
  }

  assign_unsigned_right_shift_a_ursh_eq_b(): void {
    const { sourceFile, expression } = this.#soleExpression("a>>>=b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(6, expression.end);
    Assert.Equal("a>>>=b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.GreaterThanGreaterThanGreaterThanEqualsToken, expression.operatorToken.kind);
    Assert.Equal(5, expression.right.pos);
    Assert.Equal(6, expression.right.end);
  }

  // ── Category 2: nested generic closers (TSGO-DIVERGENCE: fails on current parser)
  // `type X = A<B<C>>;` — the inner B<C> end is off-by-one in the current pre-scan
  // parser ([11,14) raw "B<C"). TSGO-CORRECT = [11,15) raw "B<C>". This probe FAILS
  // against the current parser and FLIPS GREEN once 4b-swap fixes #expectGreaterThan.
  nested_generic_double_closer_tsgo_correct(): void {
    const { sourceFile, type } = this.#soleType("type X = A<B<C>>;");
    if (!isTypeReferenceNode(type)) throw new Exception("Expected outer type reference");
    Assert.Equal(9, type.pos);
    Assert.Equal(16, type.end);
    Assert.Equal("A<B<C>>", this.#raw(sourceFile, type));
    const inner = type.typeArguments![0]!;
    if (!isTypeReferenceNode(inner)) throw new Exception("Expected inner type reference");
    // TSGO-CORRECT: inner B<C> ends AFTER the first '>' (index 15), raw "B<C>".
    Assert.Equal(11, inner.pos);
    Assert.Equal(15, inner.end);
    Assert.Equal("B<C>", this.#raw(sourceFile, inner));
    const innermost = inner.typeArguments![0]!;
    if (!isTypeReferenceNode(innermost)) throw new Exception("Expected innermost type reference");
    Assert.Equal(13, innermost.pos);
    Assert.Equal(14, innermost.end);
    Assert.Equal("C", this.#raw(sourceFile, innermost));
  }

  // `type X=A<B<C<D>>>;` — triple closer. TSGO-CORRECT: mid B<C<D> = [9,16) "B<C<D>>",
  // inner C<D> = [11,15) "C<D>". Current parser gives [9,14)/[11,14). (TSGO-DIVERGENCE)
  nested_generic_triple_closer_tsgo_correct(): void {
    const { sourceFile, type } = this.#soleType("type X=A<B<C<D>>>;");
    if (!isTypeReferenceNode(type)) throw new Exception("Expected outer type reference");
    Assert.Equal(7, type.pos);
    Assert.Equal(17, type.end);
    Assert.Equal("A<B<C<D>>>", this.#raw(sourceFile, type));
    const mid = type.typeArguments![0]!;
    if (!isTypeReferenceNode(mid)) throw new Exception("Expected mid type reference");
    Assert.Equal(9, mid.pos);
    Assert.Equal(16, mid.end);
    Assert.Equal("B<C<D>>", this.#raw(sourceFile, mid));
    const inner = mid.typeArguments![0]!;
    if (!isTypeReferenceNode(inner)) throw new Exception("Expected inner type reference");
    Assert.Equal(11, inner.pos);
    Assert.Equal(15, inner.end);
    Assert.Equal("C<D>", this.#raw(sourceFile, inner));
    const innermost = inner.typeArguments![0]!;
    if (!isTypeReferenceNode(innermost)) throw new Exception("Expected innermost type reference");
    Assert.Equal(13, innermost.pos);
    Assert.Equal(14, innermost.end);
    Assert.Equal("D", this.#raw(sourceFile, innermost));
  }

  // ── Category 3: binary-precedence rungs ───────────────────────────────────
  // One probe per rung; operator leaves are synthesized so we assert the parent
  // BinaryExpression span (left.pos..right.end) + the operator KIND.

  // TSGO-DIVERGENCE (fails on current parser): `**` (precedence 14) is the only
  // RIGHT-associative binary operator, so `a**b**c` must parse as `a**(b**c)` with
  // the inner `b**c` binary in the `.right` slot. The current parser's binary loop
  // (parser.ts ~1519) uses `operatorPrecedence <= precedence` for ALL operators, so
  // it parses `(a**b)**c` (left-assoc) instead. This probe encodes the TSGO-CORRECT
  // right-assoc shape and FLIPS GREEN once the `**` right-associativity is fixed.
  precedence_exponent_right_assoc(): void {
    // `**` (14, right-assoc): a**b**c -> a**(b**c).
    const { sourceFile, expression } = this.#soleExpression("a**b**c;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected outer binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(7, expression.end);
    Assert.Equal("a**b**c", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.AsteriskAsteriskToken, expression.operatorToken.kind);
    const right = expression.right;
    if (!isBinaryExpression(right)) throw new Exception("Expected right-assoc inner binary");
    Assert.Equal(3, right.pos);
    Assert.Equal(7, right.end);
    Assert.Equal("b**c", this.#raw(sourceFile, right));
  }

  precedence_multiplicative(): void {
    // `*` (13).
    const { sourceFile, expression } = this.#soleExpression("a*b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a*b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.AsteriskToken, expression.operatorToken.kind);
  }

  precedence_additive(): void {
    // `+` (12).
    const { sourceFile, expression } = this.#soleExpression("a+b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a+b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.PlusToken, expression.operatorToken.kind);
  }

  precedence_shift_left(): void {
    // `<<` (11).
    const { sourceFile, expression } = this.#soleExpression("a<<b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a<<b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.LessThanLessThanToken, expression.operatorToken.kind);
  }

  precedence_relational_less_than(): void {
    // `<` (10).
    const { sourceFile, expression } = this.#soleExpression("a<b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a<b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.LessThanToken, expression.operatorToken.kind);
  }

  precedence_relational_in(): void {
    // `in` (10).
    const { sourceFile, expression } = this.#soleExpression("a in b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(6, expression.end);
    Assert.Equal("a in b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.InKeyword, expression.operatorToken.kind);
  }

  precedence_relational_instanceof(): void {
    // `instanceof` (10).
    const { sourceFile, expression } = this.#soleExpression("a instanceof b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(14, expression.end);
    Assert.Equal("a instanceof b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.InstanceOfKeyword, expression.operatorToken.kind);
  }

  precedence_equality_loose(): void {
    // `==` (9).
    const { sourceFile, expression } = this.#soleExpression("a==b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a==b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.EqualsEqualsToken, expression.operatorToken.kind);
  }

  precedence_equality_strict(): void {
    // `===` (9).
    const { sourceFile, expression } = this.#soleExpression("a===b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("a===b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.EqualsEqualsEqualsToken, expression.operatorToken.kind);
  }

  precedence_bitwise_and(): void {
    // `&` (8).
    const { sourceFile, expression } = this.#soleExpression("a&b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a&b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.AmpersandToken, expression.operatorToken.kind);
  }

  precedence_bitwise_xor(): void {
    // `^` (7).
    const { sourceFile, expression } = this.#soleExpression("a^b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a^b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.CaretToken, expression.operatorToken.kind);
  }

  precedence_bitwise_or(): void {
    // `|` (6).
    const { sourceFile, expression } = this.#soleExpression("a|b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a|b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.BarToken, expression.operatorToken.kind);
  }

  precedence_logical_and(): void {
    // `&&` (5).
    const { sourceFile, expression } = this.#soleExpression("a&&b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a&&b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.AmpersandAmpersandToken, expression.operatorToken.kind);
  }

  precedence_logical_or(): void {
    // `||` (4).
    const { sourceFile, expression } = this.#soleExpression("a||b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a||b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.BarBarToken, expression.operatorToken.kind);
  }

  precedence_nullish_coalescing(): void {
    // `??` (4).
    const { sourceFile, expression } = this.#soleExpression("a??b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a??b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.QuestionQuestionToken, expression.operatorToken.kind);
  }

  precedence_assignment(): void {
    // assignment rung (3): `=` is FirstAssignment.
    const { sourceFile, expression } = this.#soleExpression("a=b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(3, expression.end);
    Assert.Equal("a=b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.EqualsToken, expression.operatorToken.kind);
  }

  precedence_compound_assignment(): void {
    // compound assignment `+=` (3).
    const { sourceFile, expression } = this.#soleExpression("a+=b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected binary expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("a+=b", this.#raw(sourceFile, expression));
    Assert.Equal(Kind.PlusEqualsToken, expression.operatorToken.kind);
  }

  // ── Category 4: arrow vs parenthesized-expression disambiguation ───────────
  // NOTE coverage gap: bare `(a,b);` THROWS "Expected token CloseParenToken" — the
  // parser has no sequence/comma-expression production. So the corpus uses the
  // arrow forms `((a,b)=>a)` and `((a):T=>a)` which DO parse. `(a,b)` is recorded
  // here as a known unimplemented form, NOT a passing probe.

  arrow_in_parens_two_params(): void {
    const { sourceFile, expression } = this.#soleExpression("((a,b)=>a);");
    if (!isParenthesizedExpression(expression)) throw new Exception("Expected parenthesized expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(10, expression.end);
    const arrow = expression.expression;
    if (!isArrowFunction(arrow)) throw new Exception("Expected arrow function");
    Assert.Equal(1, arrow.pos);
    Assert.Equal(9, arrow.end);
    Assert.Equal("(a,b)=>a", this.#raw(sourceFile, arrow));
    const paramA = arrow.parameters[0]!;
    if (!isParameterDeclaration(paramA)) throw new Exception("Expected parameter a");
    Assert.Equal(2, paramA.pos);
    Assert.Equal(3, paramA.end);
    const paramB = arrow.parameters[1]!;
    if (!isParameterDeclaration(paramB)) throw new Exception("Expected parameter b");
    Assert.Equal(4, paramB.pos);
    Assert.Equal(5, paramB.end);
    Assert.Equal(Kind.EqualsGreaterThanToken, arrow.equalsGreaterThanToken.kind);
    const body = arrow.body;
    if (!isIdentifier(body)) throw new Exception("Expected identifier body");
    Assert.Equal(8, body.pos);
    Assert.Equal(9, body.end);
  }

  arrow_in_parens_with_return_type(): void {
    const { sourceFile, expression } = this.#soleExpression("((a):T=>a);");
    if (!isParenthesizedExpression(expression)) throw new Exception("Expected parenthesized expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(10, expression.end);
    const arrow = expression.expression;
    if (!isArrowFunction(arrow)) throw new Exception("Expected arrow function");
    Assert.Equal(1, arrow.pos);
    Assert.Equal(9, arrow.end);
    Assert.Equal("(a):T=>a", this.#raw(sourceFile, arrow));
    const paramA = arrow.parameters[0]!;
    if (!isParameterDeclaration(paramA)) throw new Exception("Expected parameter a");
    Assert.Equal(2, paramA.pos);
    Assert.Equal(3, paramA.end);
    const returnType = arrow.type!;
    if (!isTypeReferenceNode(returnType)) throw new Exception("Expected return type reference");
    Assert.Equal(5, returnType.pos);
    Assert.Equal(6, returnType.end);
    Assert.Equal("T", this.#raw(sourceFile, returnType));
    const body = arrow.body;
    if (!isIdentifier(body)) throw new Exception("Expected identifier body");
    Assert.Equal(8, body.pos);
    Assert.Equal(9, body.end);
  }

  // Coverage gap: bare `(a,b);` (sequence/comma expression) is UNIMPLEMENTED — the
  // parser throws "Expected token CloseParenToken at 2". This probe pins that the
  // gap still exists (so 4b-swap does not silently change the failure mode). It is
  // a PASSING probe because the throw is the EXPECTED current behavior.
  sequence_expression_is_known_gap(): void {
    const threw = ((): boolean => {
      try {
        parseSourceFile("(a,b);");
        return false;
      } catch {
        return true;
      }
    })();
    Assert.True(threw, "bare (a,b) sequence expression should throw (known unimplemented gap)");
  }

  // ── Category 5: call type-args vs relational ──────────────────────────────

  call_with_type_arguments(): void {
    // `x<T>(y)` -> CallExpression with one typeArgument (NOT relational).
    const { sourceFile, expression } = this.#soleExpression("x<T>(y);");
    if (!isCallExpression(expression)) throw new Exception("Expected call expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(7, expression.end);
    Assert.Equal("x<T>(y)", this.#raw(sourceFile, expression));
    const callee = expression.expression;
    if (!isIdentifier(callee)) throw new Exception("Expected identifier callee");
    Assert.Equal(0, callee.pos);
    Assert.Equal(1, callee.end);
    const typeArg = expression.typeArguments![0]!;
    if (!isTypeReferenceNode(typeArg)) throw new Exception("Expected type argument reference");
    Assert.Equal(2, typeArg.pos);
    Assert.Equal(3, typeArg.end);
    Assert.Equal("T", this.#raw(sourceFile, typeArg));
    const arg = expression.arguments[0]!;
    if (!isIdentifier(arg)) throw new Exception("Expected identifier argument");
    Assert.Equal(5, arg.pos);
    Assert.Equal(6, arg.end);
  }

  paren_relational_not_type_args(): void {
    // `(x<y)` -> ParenExpr wrapping a relational BinaryExpression (NOT call/type-args).
    const { sourceFile, expression } = this.#soleExpression("(x<y);");
    if (!isParenthesizedExpression(expression)) throw new Exception("Expected parenthesized expression");
    Assert.Equal(0, expression.pos);
    Assert.Equal(5, expression.end);
    const binary = expression.expression;
    if (!isBinaryExpression(binary)) throw new Exception("Expected relational binary expression");
    Assert.Equal(1, binary.pos);
    Assert.Equal(4, binary.end);
    Assert.Equal("x<y", this.#raw(sourceFile, binary));
    Assert.Equal(Kind.LessThanToken, binary.operatorToken.kind);
    Assert.Equal(1, binary.left.pos);
    Assert.Equal(2, binary.left.end);
    Assert.Equal(3, binary.right.pos);
    Assert.Equal(4, binary.right.end);
  }

  // ── Category 6: infer constraints ─────────────────────────────────────────

  infer_with_extends_constraint(): void {
    const { sourceFile, type } = this.#soleType("type T=A extends infer U extends string?U:never;");
    if (!isConditionalTypeNode(type)) throw new Exception("Expected conditional type");
    Assert.Equal(7, type.pos);
    Assert.Equal(47, type.end);
    Assert.Equal("A extends infer U extends string?U:never", this.#raw(sourceFile, type));
    const checkType = type.checkType;
    if (!isTypeReferenceNode(checkType)) throw new Exception("Expected check type reference");
    Assert.Equal(7, checkType.pos);
    Assert.Equal(8, checkType.end);
    const extendsType = type.extendsType;
    if (!isInferTypeNode(extendsType)) throw new Exception("Expected infer extends type");
    Assert.Equal(17, extendsType.pos);
    Assert.Equal(39, extendsType.end);
    Assert.Equal("infer U extends string", this.#raw(sourceFile, extendsType));
    const tp = extendsType.typeParameter;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected type parameter");
    Assert.Equal(23, tp.pos);
    Assert.Equal(39, tp.end);
    Assert.Equal("U extends string", this.#raw(sourceFile, tp));
    const constraint = tp.constraint!;
    if (!isKeywordTypeNode(constraint)) throw new Exception("Expected keyword constraint");
    Assert.Equal(Kind.StringKeyword, constraint.kind);
    Assert.Equal(33, constraint.pos);
    Assert.Equal(39, constraint.end);
    const trueType = type.trueType;
    if (!isTypeReferenceNode(trueType)) throw new Exception("Expected true type reference");
    Assert.Equal(40, trueType.pos);
    Assert.Equal(41, trueType.end);
    const falseType = type.falseType;
    if (!isKeywordTypeNode(falseType)) throw new Exception("Expected never false type");
    Assert.Equal(Kind.NeverKeyword, falseType.kind);
    Assert.Equal(42, falseType.pos);
    Assert.Equal(47, falseType.end);
  }

  // ── Category 7: function + constructor types ──────────────────────────────

  function_type_with_param_and_void_return(): void {
    const { sourceFile, type } = this.#soleType("type F=(a:number)=>void;");
    if (!isFunctionTypeNode(type)) throw new Exception("Expected function type");
    Assert.Equal(7, type.pos);
    Assert.Equal(23, type.end);
    Assert.Equal("(a:number)=>void", this.#raw(sourceFile, type));
    const param = type.parameters[0]!;
    if (!isParameterDeclaration(param)) throw new Exception("Expected parameter");
    Assert.Equal(8, param.pos);
    Assert.Equal(16, param.end);
    Assert.Equal("a:number", this.#raw(sourceFile, param));
    const paramType = param.type!;
    if (!isKeywordTypeNode(paramType)) throw new Exception("Expected number param type");
    Assert.Equal(Kind.NumberKeyword, paramType.kind);
    Assert.Equal(10, paramType.pos);
    Assert.Equal(16, paramType.end);
    const returnType = type.type!;
    if (!isKeywordTypeNode(returnType)) throw new Exception("Expected void return type");
    Assert.Equal(Kind.VoidKeyword, returnType.kind);
    Assert.Equal(19, returnType.pos);
    Assert.Equal(23, returnType.end);
  }

  constructor_type_no_params(): void {
    const { sourceFile, type } = this.#soleType("type C=new()=>X;");
    if (!isConstructorTypeNode(type)) throw new Exception("Expected constructor type");
    Assert.Equal(7, type.pos);
    Assert.Equal(15, type.end);
    Assert.Equal("new()=>X", this.#raw(sourceFile, type));
    const returnType = type.type!;
    if (!isTypeReferenceNode(returnType)) throw new Exception("Expected X return type reference");
    Assert.Equal(14, returnType.pos);
    Assert.Equal(15, returnType.end);
    Assert.Equal("X", this.#raw(sourceFile, returnType));
  }

  // ── Category 8: mapped types ──────────────────────────────────────────────

  mapped_type_keyof_indexed_access(): void {
    const { sourceFile, type } = this.#soleType("type M={[K in keyof T]:T[K]};");
    if (!isMappedTypeNode(type)) throw new Exception("Expected mapped type");
    Assert.Equal(7, type.pos);
    Assert.Equal(28, type.end);
    Assert.Equal("{[K in keyof T]:T[K]}", this.#raw(sourceFile, type));
    const tp = type.typeParameter;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected mapped type parameter");
    Assert.Equal(9, tp.pos);
    Assert.Equal(21, tp.end);
    Assert.Equal("K in keyof T", this.#raw(sourceFile, tp));
    const constraint = tp.constraint!;
    if (!isTypeOperatorNode(constraint)) throw new Exception("Expected keyof type operator constraint");
    Assert.Equal(14, constraint.pos);
    Assert.Equal(21, constraint.end);
    Assert.Equal("keyof T", this.#raw(sourceFile, constraint));
    const valueType = type.type!;
    if (!isIndexedAccessTypeNode(valueType)) throw new Exception("Expected indexed access value type");
    Assert.Equal(23, valueType.pos);
    Assert.Equal(27, valueType.end);
    Assert.Equal("T[K]", this.#raw(sourceFile, valueType));
    const objectType = valueType.objectType;
    if (!isTypeReferenceNode(objectType)) throw new Exception("Expected object type reference");
    Assert.Equal(23, objectType.pos);
    Assert.Equal(24, objectType.end);
    const indexType = valueType.indexType;
    if (!isTypeReferenceNode(indexType)) throw new Exception("Expected index type reference");
    Assert.Equal(25, indexType.pos);
    Assert.Equal(26, indexType.end);
  }

  // ── Category 9: named tuples ──────────────────────────────────────────────

  named_tuple_with_optional_member(): void {
    const { sourceFile, type } = this.#soleType("type T=[a:number,b?:string];");
    if (!isTupleTypeNode(type)) throw new Exception("Expected tuple type");
    Assert.Equal(7, type.pos);
    Assert.Equal(27, type.end);
    Assert.Equal("[a:number,b?:string]", this.#raw(sourceFile, type));
    const first = type.elements[0]!;
    if (!isNamedTupleMember(first)) throw new Exception("Expected first named tuple member");
    Assert.Equal(8, first.pos);
    Assert.Equal(16, first.end);
    Assert.Equal("a:number", this.#raw(sourceFile, first));
    if (!isIdentifier(first.name)) throw new Exception("Expected first member name");
    Assert.Equal(8, first.name.pos);
    Assert.Equal(9, first.name.end);
    if (!isKeywordTypeNode(first.type)) throw new Exception("Expected first member number type");
    Assert.Equal(Kind.NumberKeyword, first.type.kind);
    Assert.Equal(10, first.type.pos);
    Assert.Equal(16, first.type.end);
    const second = type.elements[1]!;
    if (!isNamedTupleMember(second)) throw new Exception("Expected second named tuple member");
    Assert.Equal(17, second.pos);
    Assert.Equal(26, second.end);
    Assert.Equal("b?:string", this.#raw(sourceFile, second));
    Assert.Equal(Kind.QuestionToken, second.questionToken!.kind);
    if (!isKeywordTypeNode(second.type)) throw new Exception("Expected second member string type");
    Assert.Equal(Kind.StringKeyword, second.type.kind);
    Assert.Equal(20, second.type.pos);
    Assert.Equal(26, second.type.end);
  }

  // ── Category 10: index signatures ─────────────────────────────────────────

  index_signature_in_type_literal(): void {
    const { sourceFile, type } = this.#soleType("type D={[k:string]:number};");
    if (!isTypeLiteralNode(type)) throw new Exception("Expected type literal");
    Assert.Equal(7, type.pos);
    Assert.Equal(26, type.end);
    const member = type.members[0]!;
    if (!isIndexSignatureDeclaration(member)) throw new Exception("Expected index signature");
    Assert.Equal(8, member.pos);
    Assert.Equal(25, member.end);
    Assert.Equal("[k:string]:number", this.#raw(sourceFile, member));
    const param = member.parameters[0]!;
    if (!isParameterDeclaration(param)) throw new Exception("Expected index parameter");
    Assert.Equal(9, param.pos);
    Assert.Equal(17, param.end);
    Assert.Equal("k:string", this.#raw(sourceFile, param));
    if (!isKeywordTypeNode(param.type!)) throw new Exception("Expected string key type");
    Assert.Equal(Kind.StringKeyword, param.type!.kind);
    Assert.Equal(11, param.type!.pos);
    Assert.Equal(17, param.type!.end);
    const valueType = member.type!;
    if (!isKeywordTypeNode(valueType)) throw new Exception("Expected number value type");
    Assert.Equal(Kind.NumberKeyword, valueType.kind);
    Assert.Equal(19, valueType.pos);
    Assert.Equal(25, valueType.end);
  }

  // ── Category 11: template literal expression ──────────────────────────────

  template_expression_head_span_tail(): void {
    const { sourceFile, expression } = this.#soleExpression("x=`a${b}c`;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected assignment binary");
    Assert.Equal(0, expression.pos);
    Assert.Equal(10, expression.end);
    Assert.Equal(Kind.EqualsToken, expression.operatorToken.kind);
    const template = expression.right;
    if (!isTemplateExpression(template)) throw new Exception("Expected template expression");
    Assert.Equal(2, template.pos);
    Assert.Equal(10, template.end);
    Assert.Equal("`a${b}c`", this.#raw(sourceFile, template));
    Assert.Equal(Kind.TemplateHead, template.head.kind);
    Assert.Equal(2, template.head.pos);
    Assert.Equal(6, template.head.end);
    Assert.Equal("`a${", this.#raw(sourceFile, template.head));
    const span = template.templateSpans[0]!;
    if (!isTemplateSpan(span)) throw new Exception("Expected template span");
    Assert.Equal(6, span.pos);
    Assert.Equal(10, span.end);
    Assert.Equal("b}c`", this.#raw(sourceFile, span));
    if (!isIdentifier(span.expression)) throw new Exception("Expected span expression identifier");
    Assert.Equal(6, span.expression.pos);
    Assert.Equal(7, span.expression.end);
    Assert.Equal(Kind.TemplateTail, span.literal.kind);
    Assert.Equal(7, span.literal.pos);
    Assert.Equal(10, span.literal.end);
    Assert.Equal("}c`", this.#raw(sourceFile, span.literal));
  }

  // ── Category 12: template literal type ────────────────────────────────────

  template_literal_type_head_span_tail(): void {
    const { sourceFile, type } = this.#soleType("type T=`a${B}c`;");
    if (!isTemplateLiteralTypeNode(type)) throw new Exception("Expected template literal type");
    Assert.Equal(7, type.pos);
    Assert.Equal(15, type.end);
    Assert.Equal("`a${B}c`", this.#raw(sourceFile, type));
    Assert.Equal(Kind.TemplateHead, type.head.kind);
    Assert.Equal(7, type.head.pos);
    Assert.Equal(11, type.head.end);
    Assert.Equal("`a${", this.#raw(sourceFile, type.head));
    const span = type.templateSpans[0]!;
    if (!isTemplateLiteralTypeSpan(span)) throw new Exception("Expected template literal type span");
    Assert.Equal(11, span.pos);
    Assert.Equal(15, span.end);
    Assert.Equal("B}c`", this.#raw(sourceFile, span));
    if (!isTypeReferenceNode(span.type)) throw new Exception("Expected span type reference");
    Assert.Equal(11, span.type.pos);
    Assert.Equal(12, span.type.end);
    Assert.Equal(Kind.TemplateTail, span.literal.kind);
    Assert.Equal(12, span.literal.pos);
    Assert.Equal(15, span.literal.end);
    Assert.Equal("}c`", this.#raw(sourceFile, span.literal));
  }

  // ── Category 13a: regex vs divide ─────────────────────────────────────────

  regex_literal_after_assignment(): void {
    const { sourceFile, expression } = this.#soleExpression("x=/ab+/g;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected assignment binary");
    Assert.Equal(0, expression.pos);
    Assert.Equal(8, expression.end);
    Assert.Equal(Kind.EqualsToken, expression.operatorToken.kind);
    const regex = expression.right;
    if (!isRegularExpressionLiteral(regex)) throw new Exception("Expected regex literal");
    Assert.Equal(2, regex.pos);
    Assert.Equal(8, regex.end);
    Assert.Equal("/ab+/g", this.#raw(sourceFile, regex));
  }

  divide_not_regex(): void {
    const { sourceFile, expression } = this.#soleExpression("x=a/b;");
    if (!isBinaryExpression(expression)) throw new Exception("Expected outer assignment binary");
    Assert.Equal(0, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal(Kind.EqualsToken, expression.operatorToken.kind);
    const inner = expression.right;
    if (!isBinaryExpression(inner)) throw new Exception("Expected inner divide binary");
    Assert.Equal(2, inner.pos);
    Assert.Equal(5, inner.end);
    Assert.Equal("a/b", this.#raw(sourceFile, inner));
    Assert.Equal(Kind.SlashToken, inner.operatorToken.kind);
    Assert.Equal(2, inner.left.pos);
    Assert.Equal(3, inner.left.end);
    Assert.Equal(4, inner.right.pos);
    Assert.Equal(5, inner.right.end);
  }

  // ── Category 13b: decorators ──────────────────────────────────────────────

  decorator_identifier_on_class(): void {
    const sourceFile = parseSourceFile("@dec class C{}");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    Assert.Equal(0, statement.pos);
    Assert.Equal(14, statement.end);
    const decorator = statement.modifiers![0]!;
    if (!isDecorator(decorator)) throw new Exception("Expected decorator");
    Assert.Equal(0, decorator.pos);
    Assert.Equal(4, decorator.end);
    Assert.Equal("@dec", this.#raw(sourceFile, decorator));
    const expression = decorator.expression;
    if (!isIdentifier(expression)) throw new Exception("Expected identifier decorator expression");
    Assert.Equal(1, expression.pos);
    Assert.Equal(4, expression.end);
    Assert.Equal("dec", this.#raw(sourceFile, expression));
    const name = statement.name!;
    if (!isIdentifier(name)) throw new Exception("Expected class name identifier");
    Assert.Equal(11, name.pos);
    Assert.Equal(12, name.end);
  }

  decorator_property_access_on_class(): void {
    const sourceFile = parseSourceFile("@ns.x class C{}");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const decorator = statement.modifiers![0]!;
    if (!isDecorator(decorator)) throw new Exception("Expected decorator");
    Assert.Equal(0, decorator.pos);
    Assert.Equal(5, decorator.end);
    Assert.Equal("@ns.x", this.#raw(sourceFile, decorator));
    const expression = decorator.expression;
    if (!isPropertyAccessExpression(expression)) throw new Exception("Expected property access decorator expression");
    Assert.Equal(1, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("ns.x", this.#raw(sourceFile, expression));
  }

  decorator_call_on_class(): void {
    const sourceFile = parseSourceFile("@dec() class C{}");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const decorator = statement.modifiers![0]!;
    if (!isDecorator(decorator)) throw new Exception("Expected decorator");
    Assert.Equal(0, decorator.pos);
    Assert.Equal(6, decorator.end);
    Assert.Equal("@dec()", this.#raw(sourceFile, decorator));
    const expression = decorator.expression;
    if (!isCallExpression(expression)) throw new Exception("Expected call decorator expression");
    Assert.Equal(1, expression.pos);
    Assert.Equal(6, expression.end);
    Assert.Equal("dec()", this.#raw(sourceFile, expression));
  }

  // ── Extra: already-supported type forms (lock ranges) ─────────────────────

  optional_type_in_tuple(): void {
    const { sourceFile, type } = this.#soleType("type T=[number?];");
    if (!isTupleTypeNode(type)) throw new Exception("Expected tuple type");
    const element = type.elements[0]!;
    if (!isOptionalTypeNode(element)) throw new Exception("Expected optional type");
    Assert.Equal(8, element.pos);
    Assert.Equal(15, element.end);
    Assert.Equal("number?", this.#raw(sourceFile, element));
    if (!isKeywordTypeNode(element.type)) throw new Exception("Expected number element type");
    Assert.Equal(Kind.NumberKeyword, element.type.kind);
    Assert.Equal(8, element.type.pos);
    Assert.Equal(14, element.type.end);
  }

  rest_type_in_tuple(): void {
    const { sourceFile, type } = this.#soleType("type T=[...number[]];");
    if (!isTupleTypeNode(type)) throw new Exception("Expected tuple type");
    const element = type.elements[0]!;
    if (!isRestTypeNode(element)) throw new Exception("Expected rest type");
    Assert.Equal(8, element.pos);
    Assert.Equal(19, element.end);
    Assert.Equal("...number[]", this.#raw(sourceFile, element));
    if (!isArrayTypeNode(element.type)) throw new Exception("Expected array element type");
    Assert.Equal(11, element.type.pos);
    Assert.Equal(19, element.type.end);
    Assert.Equal("number[]", this.#raw(sourceFile, element.type));
  }

  import_type_with_qualifier(): void {
    const { sourceFile, type } = this.#soleType("type T=import(\"m\").X;");
    if (!isImportTypeNode(type)) throw new Exception("Expected import type");
    Assert.Equal(7, type.pos);
    Assert.Equal(20, type.end);
    Assert.Equal("import(\"m\").X", this.#raw(sourceFile, type));
    const argument = type.argument;
    if (!isLiteralTypeNode(argument)) throw new Exception("Expected literal module specifier");
    Assert.Equal(14, argument.pos);
    Assert.Equal(17, argument.end);
    if (!isStringLiteral(argument.literal)) throw new Exception("Expected string literal in module specifier");
    Assert.Equal("\"m\"", this.#raw(sourceFile, argument.literal));
    const qualifier = type.qualifier!;
    if (!isIdentifier(qualifier)) throw new Exception("Expected identifier qualifier");
    Assert.Equal(19, qualifier.pos);
    Assert.Equal(20, qualifier.end);
    Assert.Equal("X", this.#raw(sourceFile, qualifier));
  }
}

// ── xunit registration (side-effect imports, mirroring position.test.ts) ─────
A<ParserParityTests>().method((t) => t.shift_right_shift_a_rsh_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.shift_unsigned_right_shift_a_ursh_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.relational_greater_equals_a_ge_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.relational_greater_than_a_gt_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.assign_right_shift_a_rsh_eq_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.assign_unsigned_right_shift_a_ursh_eq_b).add(FactAttribute);
A<ParserParityTests>().method((t) => t.nested_generic_double_closer_tsgo_correct).add(FactAttribute);
A<ParserParityTests>().method((t) => t.nested_generic_triple_closer_tsgo_correct).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_exponent_right_assoc).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_multiplicative).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_additive).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_shift_left).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_relational_less_than).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_relational_in).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_relational_instanceof).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_equality_loose).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_equality_strict).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_bitwise_and).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_bitwise_xor).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_bitwise_or).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_logical_and).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_logical_or).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_nullish_coalescing).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_assignment).add(FactAttribute);
A<ParserParityTests>().method((t) => t.precedence_compound_assignment).add(FactAttribute);
A<ParserParityTests>().method((t) => t.arrow_in_parens_two_params).add(FactAttribute);
A<ParserParityTests>().method((t) => t.arrow_in_parens_with_return_type).add(FactAttribute);
A<ParserParityTests>().method((t) => t.sequence_expression_is_known_gap).add(FactAttribute);
A<ParserParityTests>().method((t) => t.call_with_type_arguments).add(FactAttribute);
A<ParserParityTests>().method((t) => t.paren_relational_not_type_args).add(FactAttribute);
A<ParserParityTests>().method((t) => t.infer_with_extends_constraint).add(FactAttribute);
A<ParserParityTests>().method((t) => t.function_type_with_param_and_void_return).add(FactAttribute);
A<ParserParityTests>().method((t) => t.constructor_type_no_params).add(FactAttribute);
A<ParserParityTests>().method((t) => t.mapped_type_keyof_indexed_access).add(FactAttribute);
A<ParserParityTests>().method((t) => t.named_tuple_with_optional_member).add(FactAttribute);
A<ParserParityTests>().method((t) => t.index_signature_in_type_literal).add(FactAttribute);
A<ParserParityTests>().method((t) => t.template_expression_head_span_tail).add(FactAttribute);
A<ParserParityTests>().method((t) => t.template_literal_type_head_span_tail).add(FactAttribute);
A<ParserParityTests>().method((t) => t.regex_literal_after_assignment).add(FactAttribute);
A<ParserParityTests>().method((t) => t.divide_not_regex).add(FactAttribute);
A<ParserParityTests>().method((t) => t.decorator_identifier_on_class).add(FactAttribute);
A<ParserParityTests>().method((t) => t.decorator_property_access_on_class).add(FactAttribute);
A<ParserParityTests>().method((t) => t.decorator_call_on_class).add(FactAttribute);
A<ParserParityTests>().method((t) => t.optional_type_in_tuple).add(FactAttribute);
A<ParserParityTests>().method((t) => t.rest_type_in_tuple).add(FactAttribute);
A<ParserParityTests>().method((t) => t.import_type_with_qualifier).add(FactAttribute);
