// position.test.ts — codex-048 Stage-1a probe. Pins that the parser now stamps
// real token-tight pos/end ranges onto literal + identifier leaf nodes via the
// #finishNode helper (mirroring tsgo internal/parser/parser.go finishNode,
// 5904-5917, MINUS the error-flag bit which is Stage 3). Before Stage 1a these
// leaves carried the factory default pos/end == -1; these probes would have
// failed against that state and now pass against the stamped ranges.
//
// nodeEnd is token-tight per codex-048 (i): the end of the just-consumed token,
// NOT the trivia-inclusive Scanner TokenFullStart (a tracked Stage-4 item).

import test from "node:test";
import assert from "node:assert/strict";

import {
  Kind,
  NodeFlags,
  isArrayBindingPattern,
  isArrayLiteralExpression,
  isArrayTypeNode,
  isArrowFunction,
  isAsExpression,
  isAwaitExpression,
  isBigIntLiteral,
  isBinaryExpression,
  isBindingElement,
  isBlock,
  isCallExpression,
  isCallSignatureDeclaration,
  isCaseBlock,
  isCaseClause,
  isCatchClause,
  isClassDeclaration,
  isClassStaticBlockDeclaration,
  isComputedPropertyName,
  isConditionalExpression,
  isConditionalTypeNode,
  isConstructSignatureDeclaration,
  isConstructorDeclaration,
  isConstructorTypeNode,
  isDebuggerStatement,
  isDecorator,
  isElementAccessExpression,
  isEmptyStatement,
  isEnumDeclaration,
  isEnumMember,
  isExportAssignment,
  isExportDeclaration,
  isExpressionStatement,
  isExternalModuleReference,
  isForStatement,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isGetAccessorDeclaration,
  isHeritageClause,
  isIdentifier,
  isIfStatement,
  isImportAttribute,
  isImportAttributes,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isIndexSignatureDeclaration,
  isIndexedAccessTypeNode,
  isInferTypeNode,
  isInterfaceDeclaration,
  isIntersectionTypeNode,
  isKeywordExpression,
  isKeywordTypeNode,
  isLabeledStatement,
  isLiteralTypeNode,
  isMappedTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isNamedExports,
  isNamedTupleMember,
  isNamespaceExportDeclaration,
  isNonNullExpression,
  isNumericLiteral,
  isObjectBindingPattern,
  isObjectLiteralExpression,
  isOptionalTypeNode,
  isParameterDeclaration,
  isParenthesizedExpression,
  isParenthesizedTypeNode,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isQualifiedName,
  isRestTypeNode,
  isReturnStatement,
  isSatisfiesExpression,
  isSemicolonClassElement,
  isSetAccessorDeclaration,
  isSpreadElement,
  isStringLiteral,
  isSwitchStatement,
  isTemplateExpression,
  isTemplateLiteralTypeNode,
  isTemplateLiteralTypeSpan,
  isThisTypeNode,
  isTryStatement,
  isTupleTypeNode,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeOfExpression,
  isTypeOperatorNode,
  isTypeParameterDeclaration,
  isTypePredicateNode,
  isTypeQueryNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  isVariableDeclaration,
  isVariableDeclarationList,
  isVariableStatement,
  isWhileStatement,
  isWithStatement,
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";

// `x` -> Identifier covers exactly the single character: pos 0, end 1.
test("stamps identifier leaf with token tight range", () => {
  const sourceFile = parseSourceFile("x");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const expression = statement.expression;
  if (!isIdentifier(expression)) throw new Error("Expected identifier");

  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 1);
});

// `"hi"` -> StringLiteral range covers the quotes: pos 0, end 4.
test("stamps string literal leaf covering the quotes", () => {
  const sourceFile = parseSourceFile("\"hi\"");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const expression = statement.expression;
  if (!isStringLiteral(expression)) throw new Error("Expected string literal");

  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 4);
});

// `42` -> NumericLiteral range covers both digits: pos 0, end 2.
test("stamps numeric literal leaf with token tight range", () => {
  const sourceFile = parseSourceFile("42");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const expression = statement.expression;
  if (!isNumericLiteral(expression)) throw new Error("Expected numeric literal");

  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 2);
});

// M3 4c: nodePos is now the trivia-INCLUSIVE full-start. The leading "  "
// trivia of the leftmost node begins at 0, so this identifier's pos is 0 (the
// full-start), not 2 (the token-tight start). end stays token-tight at 5.
// Cross-checked vs tsgo: `"  abc"` id pos == 0.
test("stamps identifier at non zero offset", () => {
  const sourceFile = parseSourceFile("  abc");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const expression = statement.expression;
  if (!isIdentifier(expression)) throw new Error("Expected identifier");

  assert.strictEqual(expression.pos, 0);
  assert.strictEqual(expression.end, 5);
  assert.strictEqual(expression.text, "abc");
});

// Both leaves of a binary expression carry real ranges, not the factory
// default pos/end == -1. `foo + 7`: foo @ [0,3); 7's pos is now the
// trivia-INCLUSIVE full-start = end of `+` (5), so the `7` literal is [5,7)
// (pos covers the leading space). end stays token-tight at 7.
test("literal and identifier leaves are not synthesized", () => {
  const sourceFile = parseSourceFile("foo + 7");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");

  const binary = statement.expression;
  if (!isBinaryExpression(binary)) throw new Error("Expected binary expression");

  const left = binary.left;
  if (!isIdentifier(left)) throw new Error("Expected identifier on the left");
  assert.strictEqual(left.pos, 0);
  assert.strictEqual(left.end, 3);

  const right = binary.right;
  if (!isNumericLiteral(right)) throw new Error("Expected numeric literal on the right");
  assert.strictEqual(right.pos, 5);
  assert.strictEqual(right.end, 7);
});

// Stage 1b: the BinaryExpression node itself spans the whole `a+b`: [0,3).
// Its start is the LEFT operand's start (tsgo makeBinaryExpression uses pos).
test("binary expression spans whole range starting at left", () => {
  const sourceFile = parseSourceFile("a+b");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const binary = statement.expression;
  if (!isBinaryExpression(binary)) throw new Error("Expected binary expression");

  assert.strictEqual(binary.pos, 0);
  assert.strictEqual(binary.end, 3);
  assert.strictEqual(binary.left.pos, 0);
});

// Left-associative nesting: `a+b+c` -> ((a+b)+c). The outer node spans [0,5);
// the inner (a+b) spans [0,3); both starts equal their respective left.pos.
test("nested binary left assoc starts match left pos", () => {
  const sourceFile = parseSourceFile("a+b+c");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const outer = statement.expression;
  if (!isBinaryExpression(outer)) throw new Error("Expected outer binary expression");
  assert.strictEqual(outer.pos, 0);
  assert.strictEqual(outer.end, 5);
  assert.strictEqual(outer.pos, outer.left.pos);

  const inner = outer.left;
  if (!isBinaryExpression(inner)) throw new Error("Expected inner binary expression");
  assert.strictEqual(inner.pos, 0);
  assert.strictEqual(inner.end, 3);
  assert.strictEqual(inner.pos, inner.left.pos);
});

// Call expression `f(x)`: the node spans [0,4), end covering the closing ')'.
// Start is threaded from the callee base (tsgo parseCallExpressionRest pos).
test("call expression spans whole range through closing paren", () => {
  const sourceFile = parseSourceFile("f(x)");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const call = statement.expression;
  if (!isCallExpression(call)) throw new Error("Expected call expression");

  assert.strictEqual(call.pos, 0);
  assert.strictEqual(call.end, 4);
  assert.strictEqual(call.pos, call.expression.pos);
});

// Property access `a.b`: node spans [0,3), start threaded from the base `a`.
test("property access spans whole range from base", () => {
  const sourceFile = parseSourceFile("a.b");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const access = statement.expression;
  if (!isPropertyAccessExpression(access)) throw new Error("Expected property access");

  assert.strictEqual(access.pos, 0);
  assert.strictEqual(access.end, 3);
  assert.strictEqual(access.pos, access.expression.pos);
});

// Element access `a[0]`: node spans [0,4), end covers the closing ']'.
test("element access spans whole range through closing bracket", () => {
  const sourceFile = parseSourceFile("a[0]");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const access = statement.expression;
  if (!isElementAccessExpression(access)) throw new Error("Expected element access");

  assert.strictEqual(access.pos, 0);
  assert.strictEqual(access.end, 4);
  assert.strictEqual(access.pos, access.expression.pos);
});

// Non-null `a!`: node spans [0,2), start threaded from the base `a`.
test("non null expression spans whole range from base", () => {
  const sourceFile = parseSourceFile("a!");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const nonNull = statement.expression;
  if (!isNonNullExpression(nonNull)) throw new Error("Expected non-null expression");

  assert.strictEqual(nonNull.pos, 0);
  assert.strictEqual(nonNull.end, 2);
  assert.strictEqual(nonNull.pos, nonNull.expression.pos);
});

// Chained member/call `a.b(c)`: outer call spans [0,6) (through ')'),
// the inner property access spans [0,3); both start at the base `a`.
test("chained member call threads base start", () => {
  const sourceFile = parseSourceFile("a.b(c)");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const call = statement.expression;
  if (!isCallExpression(call)) throw new Error("Expected call expression");
  assert.strictEqual(call.pos, 0);
  assert.strictEqual(call.end, 6);

  const callee = call.expression;
  if (!isPropertyAccessExpression(callee)) throw new Error("Expected property access callee");
  assert.strictEqual(callee.pos, 0);
  assert.strictEqual(callee.end, 3);
});

// Prefix unary `-x` (expression position via `(-x)` to avoid the type path):
// the prefix node starts at the '-' operator and spans [1,3) inside the parens.
test("prefix unary starts at operator", () => {
  const sourceFile = parseSourceFile("(-x)");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const paren = statement.expression;
  if (!isParenthesizedExpression(paren)) throw new Error("Expected parenthesized expression");
  const unary = paren.expression;
  if (!isPrefixUnaryExpression(unary)) throw new Error("Expected prefix unary expression");

  assert.strictEqual(unary.pos, 1);
  assert.strictEqual(unary.end, 3);
  assert.strictEqual(unary.operand.pos, 2);
});

// Postfix unary `x++`: node spans [0,3), start = operand (LHS) start.
test("postfix unary starts at operand", () => {
  const sourceFile = parseSourceFile("x++");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const unary = statement.expression;
  if (!isPostfixUnaryExpression(unary)) throw new Error("Expected postfix unary expression");

  assert.strictEqual(unary.pos, 0);
  assert.strictEqual(unary.end, 3);
  assert.strictEqual(unary.pos, unary.operand.pos);
});

// Parenthesized `(x)`: node spans [0,3), end covering the closing ')'.
test("parenthesized expression spans through closing paren", () => {
  const sourceFile = parseSourceFile("(x)");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const paren = statement.expression;
  if (!isParenthesizedExpression(paren)) throw new Error("Expected parenthesized expression");

  assert.strictEqual(paren.pos, 0);
  assert.strictEqual(paren.end, 3);
});

// Array literal `[1,2]`: node spans [0,5), end covering the closing ']'.
test("array literal spans through closing bracket", () => {
  const sourceFile = parseSourceFile("[1,2]");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const array = statement.expression;
  if (!isArrayLiteralExpression(array)) throw new Error("Expected array literal");

  assert.strictEqual(array.pos, 0);
  assert.strictEqual(array.end, 5);
});

// Object literal `{a:1}`: node spans [0,5), end covering the closing '}'.
// The property assignment element spans [1,4).
test("object literal spans through closing brace", () => {
  const sourceFile = parseSourceFile("({a:1})");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const paren = statement.expression;
  if (!isParenthesizedExpression(paren)) throw new Error("Expected parenthesized expression");
  const object = paren.expression;
  if (!isObjectLiteralExpression(object)) throw new Error("Expected object literal");

  assert.strictEqual(object.pos, 1);
  assert.strictEqual(object.end, 6);
  const property = object.properties[0]!;
  assert.strictEqual(property.pos, 2);
  assert.strictEqual(property.end, 5);
});

// Spread element `f(...x)`: the spread node spans [2,6), starting at '...'.
test("spread element starts at dotdotdot", () => {
  const sourceFile = parseSourceFile("f(...x)");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const call = statement.expression;
  if (!isCallExpression(call)) throw new Error("Expected call expression");
  const spread = call.arguments[0]!;
  if (!isSpreadElement(spread)) throw new Error("Expected spread element");

  assert.strictEqual(spread.pos, 2);
  assert.strictEqual(spread.end, 6);
});

// Conditional `c?d:e`: node spans [0,5), start = condition start.
test("conditional expression spans whole range", () => {
  const sourceFile = parseSourceFile("c?d:e");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const conditional = statement.expression;
  if (!isConditionalExpression(conditional)) throw new Error("Expected conditional expression");

  assert.strictEqual(conditional.pos, 0);
  assert.strictEqual(conditional.end, 5);
  assert.strictEqual(conditional.pos, conditional.condition.pos);
});

// As expression `x as T`: node spans [0,6), start = left operand start.
test("as expression spans whole range from left", () => {
  const sourceFile = parseSourceFile("x as T");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const asExpr = statement.expression;
  if (!isAsExpression(asExpr)) throw new Error("Expected as expression");

  assert.strictEqual(asExpr.pos, 0);
  assert.strictEqual(asExpr.end, 6);
  assert.strictEqual(asExpr.pos, asExpr.expression.pos);
});

// Satisfies expression `x satisfies T`: node spans [0,13), start = left start.
test("satisfies expression spans whole range from left", () => {
  const sourceFile = parseSourceFile("x satisfies T");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const satisfiesExpr = statement.expression;
  if (!isSatisfiesExpression(satisfiesExpr)) throw new Error("Expected satisfies expression");

  assert.strictEqual(satisfiesExpr.pos, 0);
  assert.strictEqual(satisfiesExpr.end, 13);
  assert.strictEqual(satisfiesExpr.pos, satisfiesExpr.expression.pos);
});

// Arrow function `x => x`: node spans [0,6), start at the parameter.
test("arrow function spans whole range", () => {
  const sourceFile = parseSourceFile("x => x");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const arrow = statement.expression;
  if (!isArrowFunction(arrow)) throw new Error("Expected arrow function");

  assert.strictEqual(arrow.pos, 0);
  assert.strictEqual(arrow.end, 6);
  const param = arrow.parameters[0]!;
  assert.strictEqual(param.pos, 0);
  assert.strictEqual(param.end, 1);
});

// await expression `await x`: node spans [0,7), start at the 'await' keyword.
test("await expression starts at keyword", () => {
  const sourceFile = parseSourceFile("await x");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const awaitExpr = statement.expression;
  if (!isAwaitExpression(awaitExpr)) throw new Error("Expected await expression");

  assert.strictEqual(awaitExpr.pos, 0);
  assert.strictEqual(awaitExpr.end, 7);
  // M3 4c: the operand `x`'s pos is its trivia-inclusive full-start = end of
  // `await` (5); the leading space belongs to `x`'s leading trivia.
  assert.strictEqual(awaitExpr.expression.pos, 5);
});

// typeof expression `typeof x`: node spans [0,8), start at the 'typeof' keyword.
test("typeof expression starts at keyword", () => {
  const sourceFile = parseSourceFile("typeof x");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const typeofExpr = statement.expression;
  if (!isTypeOfExpression(typeofExpr)) throw new Error("Expected typeof expression");

  assert.strictEqual(typeofExpr.pos, 0);
  assert.strictEqual(typeofExpr.end, 8);
  // M3 4c: operand `x`'s pos is its full-start = end of `typeof` (6).
  assert.strictEqual(typeofExpr.expression.pos, 6);
});

// Template expression `` `x${y}z` ``: node spans the whole literal [0,8); the
// single span (the `${y}z` portion) starts at the span expression `y` (pos 4,
// since backtick=0 x=1 $=2 {=3 y=4) and ends after the tail (end 8).
test("template expression spans whole range with span", () => {
  const sourceFile = parseSourceFile("`x${y}z`");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const template = statement.expression;
  if (!isTemplateExpression(template)) throw new Error("Expected template expression");

  assert.strictEqual(template.pos, 0);
  assert.strictEqual(template.end, 8);
  const span = template.templateSpans[0]!;
  assert.strictEqual(span.pos, span.expression.pos);
  assert.strictEqual(span.pos, 4);
  assert.strictEqual(span.end, 8);
});

// Negative-literal `-1` in TYPE position: the inner numeric literal and the
// PrefixUnaryExpression wrapper (Stage 1b) AND the LiteralTypeNode wrapper
// (Stage 1d) are all stamped, sharing the '-' start. In `type T = -1;` the '-'
// is at index 9 and the '1' at index 10, so the LiteralTypeNode + prefix wrapper
// cover [9,11) and the inner literal covers [10,11).
test("negative literal prefix unary in type is stamped", () => {
  const sourceFile = parseSourceFile("type T = -1;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");
  // M3 4c: the LiteralTypeNode + prefix wrapper pos is the full-start = end of
  // `=` (8); the leading space after `=` belongs to the type's leading trivia.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 11);
  const unary = literalType.literal;
  if (!isPrefixUnaryExpression(unary)) throw new Error("Expected prefix unary expression");

  assert.strictEqual(unary.pos, 8);
  assert.strictEqual(unary.end, 11);
  const operand = unary.operand;
  if (!isNumericLiteral(operand)) throw new Error("Expected numeric literal operand");
  assert.strictEqual(operand.pos, 10);
  assert.strictEqual(operand.end, 11);
});

// Stage 1d: `type X = A|B;` -> the UnionTypeNode spans the two constituents,
// starting at `A` (index 9) and ending after `B` (index 12). Each constituent is
// a TypeReference stamped token-tight.
test("union type spans constituents", () => {
  const sourceFile = parseSourceFile("type X = A|B;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const union = statement.type;
  if (!isUnionTypeNode(union)) throw new Error("Expected union type node");

  // M3 4c: union.pos and the first constituent `A` share the full-start = end
  // of `=` (8). The second constituent `B` is preceded by `|` (no trivia), so
  // its full-start stays token-tight at 11.
  assert.strictEqual(union.pos, 8);
  assert.strictEqual(union.end, 12);
  const first = union.types[0]!;
  assert.strictEqual(first.pos, 8);
  assert.strictEqual(first.end, 10);
  const second = union.types[1]!;
  assert.strictEqual(second.pos, 11);
  assert.strictEqual(second.end, 12);
});

// Stage 1d: single-constituent passthrough must NOT re-stamp. `type X = A;` ->
// the type is the bare TypeReference `A` [9,10), not a UnionTypeNode.
test("union single constituent passes through unwrapped", () => {
  const sourceFile = parseSourceFile("type X = A;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const type = statement.type;
  if (!isTypeReferenceNode(type)) throw new Error("Expected type reference (unwrapped)");

  // M3 4c: the bare TypeReference `A`'s pos is the full-start = end of `=` (8).
  assert.strictEqual(type.pos, 8);
  assert.strictEqual(type.end, 10);
});

// Stage 1d: `type X = A&B;` -> IntersectionTypeNode spans [9,12).
test("intersection type spans constituents", () => {
  const sourceFile = parseSourceFile("type X = A&B;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const intersection = statement.type;
  if (!isIntersectionTypeNode(intersection)) throw new Error("Expected intersection type node");

  // M3 4c: intersection.pos and the first constituent `A` share the full-start
  // = end of `=` (8); types[1].end (end side) stays token-tight.
  assert.strictEqual(intersection.pos, 8);
  assert.strictEqual(intersection.end, 12);
  assert.strictEqual(intersection.types[0]!.pos, 8);
  assert.strictEqual(intersection.types[1]!.end, 12);
});

// Stage 1d: `type X = T[];` -> ArrayTypeNode starts at the LEFTMOST element type
// `T` (index 9) and ends after the closing ']' (index 12). The element type `T`
// spans [9,10).
test("array type starts at element and covers bracket", () => {
  const sourceFile = parseSourceFile("type X = T[];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const arrayType = statement.type;
  if (!isArrayTypeNode(arrayType)) throw new Error("Expected array type node");

  // M3 4c: arrayType.pos and the element `T` share the full-start = end of `=`
  // (8). elementType.end stays token-tight at 10.
  assert.strictEqual(arrayType.pos, 8);
  assert.strictEqual(arrayType.end, 12);
  assert.strictEqual(arrayType.elementType.pos, 8);
  assert.strictEqual(arrayType.elementType.end, 10);
});

// Stage 1d: nested `type X = T[][];` -> the outer array starts at the SAME leftmost
// `T` start (index 9, threaded) and ends after the second ']' (index 14); the inner
// array spans [9,12).
test("nested array type threads leftmost start", () => {
  const sourceFile = parseSourceFile("type X = T[][];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const outer = statement.type;
  if (!isArrayTypeNode(outer)) throw new Error("Expected outer array type node");
  // M3 4c: both array nodes thread the leftmost `T`'s full-start = end of `=` (8).
  assert.strictEqual(outer.pos, 8);
  assert.strictEqual(outer.end, 14);
  const inner = outer.elementType;
  if (!isArrayTypeNode(inner)) throw new Error("Expected inner array type node");
  assert.strictEqual(inner.pos, 8);
  assert.strictEqual(inner.end, 12);
});

// Stage 1d: `type X = T[K];` -> IndexedAccessTypeNode starts at the leftmost object
// type `T` (index 9) and ends after the closing ']' (index 13). The index type `K`
// spans [11,12).
test("indexed access type starts at object and covers bracket", () => {
  const sourceFile = parseSourceFile("type X = T[K];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const indexed = statement.type;
  if (!isIndexedAccessTypeNode(indexed)) throw new Error("Expected indexed access type node");

  // M3 4c: indexed.pos and objectType `T` share the full-start = end of `=` (8).
  // indexType `K` is preceded by `[` (no trivia), so its pos stays 11.
  assert.strictEqual(indexed.pos, 8);
  assert.strictEqual(indexed.end, 13);
  assert.strictEqual(indexed.objectType.pos, 8);
  assert.strictEqual(indexed.indexType.pos, 11);
  assert.strictEqual(indexed.indexType.end, 12);
});

// Stage 1d: `type X = keyof T;` -> TypeOperatorNode starts at the `keyof` keyword
// (index 9) and ends after the operand `T` (index 16). The operand spans [15,16).
test("keyof type operator starts at keyword", () => {
  const sourceFile = parseSourceFile("type X = keyof T;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const operator = statement.type;
  if (!isTypeOperatorNode(operator)) throw new Error("Expected type operator node");

  // M3 4c: operator.pos is the full-start = end of `=` (8). The operand `T`'s
  // pos is its full-start = end of `keyof` (14); the space after `keyof` is the
  // operand's leading trivia. end stays token-tight at 16.
  assert.strictEqual(operator.pos, 8);
  assert.strictEqual(operator.end, 16);
  assert.strictEqual(operator.type.pos, 14);
  assert.strictEqual(operator.type.end, 16);
});

// Stage 1d: `type X = typeof y;` -> TypeQueryNode starts at the `typeof` keyword
// (index 9) and ends after the entity name `y` (index 17).
test("typeof type query starts at keyword", () => {
  const sourceFile = parseSourceFile("type X = typeof y;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const query = statement.type;
  if (!isTypeQueryNode(query)) throw new Error("Expected type query node");

  // M3 4c: query.pos is the full-start = end of `=` (8). exprName `y`'s pos is
  // its full-start = end of `typeof` (15); end stays token-tight at 17.
  assert.strictEqual(query.pos, 8);
  assert.strictEqual(query.end, 17);
  assert.strictEqual(query.exprName.pos, 15);
  assert.strictEqual(query.exprName.end, 17);
});

// Stage 1d: `type X = this;` -> ThisTypeNode is token-tight [9,13).
test("this type is token tight", () => {
  const sourceFile = parseSourceFile("type X = this;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const thisType = statement.type;
  if (!isThisTypeNode(thisType)) throw new Error("Expected this type node");

  // M3 4c: thisType.pos is the full-start = end of `=` (8); end stays at 13.
  assert.strictEqual(thisType.pos, 8);
  assert.strictEqual(thisType.end, 13);
});

// Stage 1d: `type X = (A);` -> ParenthesizedTypeNode starts at the '(' (index 9)
// and ends after the closing ')' (index 12). The inner type `A` spans [10,11).
test("parenthesized type covers parens", () => {
  const sourceFile = parseSourceFile("type X = (A);");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const paren = statement.type;
  if (!isParenthesizedTypeNode(paren)) throw new Error("Expected parenthesized type node");

  // M3 4c: paren.pos is the full-start = end of `=` (8). The inner type `A` is
  // preceded by `(` (no trivia), so its pos stays token-tight at 10.
  assert.strictEqual(paren.pos, 8);
  assert.strictEqual(paren.end, 12);
  assert.strictEqual(paren.type.pos, 10);
  assert.strictEqual(paren.type.end, 11);
});

// Stage 1d: `type X = [A,B];` -> TupleTypeNode starts at the '[' (index 9) and ends
// after the closing ']' (index 14). The first element `A` spans [10,11).
test("tuple type covers brackets", () => {
  const sourceFile = parseSourceFile("type X = [A,B];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const tuple = statement.type;
  if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type node");

  // M3 4c: tuple.pos is the full-start = end of `=` (8). The first element `A`
  // is preceded by `[` (no trivia), so its pos stays token-tight at 10.
  assert.strictEqual(tuple.pos, 8);
  assert.strictEqual(tuple.end, 14);
  assert.strictEqual(tuple.elements[0]!.pos, 10);
  assert.strictEqual(tuple.elements[0]!.end, 11);
});

// Stage 1d: `type X = {a:number};` -> TypeLiteralNode starts at the '{' (index 9)
// and ends after the closing '}' (index 19).
test("type literal covers braces", () => {
  const sourceFile = parseSourceFile("type X = {a:number};");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literal = statement.type;
  if (!isTypeLiteralNode(literal)) throw new Error("Expected type literal node");

  // M3 4c: literal.pos is the full-start = end of `=` (8); end stays at 19.
  assert.strictEqual(literal.pos, 8);
  assert.strictEqual(literal.end, 19);
});

// Stage 1d: `type X = number;` -> KeywordTypeNode is token-tight [9,15).
test("keyword type is token tight", () => {
  const sourceFile = parseSourceFile("type X = number;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const keyword = statement.type;
  if (!isKeywordTypeNode(keyword)) throw new Error("Expected keyword type node");

  // M3 4c: keyword.pos is the full-start = end of `=` (8); end stays at 15.
  assert.strictEqual(keyword.pos, 8);
  assert.strictEqual(keyword.end, 15);
});

// Stage 1d: `type X = "s";` -> LiteralTypeNode wrapper shares the inner string-literal
// leaf's range [9,12) (the leaf covers the quotes).
test("string literal type wrapper shares leaf range", () => {
  const sourceFile = parseSourceFile("type X = \"s\";");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");

  // M3 4c: wrapper and leaf share the full-start = end of `=` (8); ends stay token-tight.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 12);
  const leaf = literalType.literal;
  if (!isStringLiteral(leaf)) throw new Error("Expected string literal leaf");
  assert.strictEqual(leaf.pos, 8);
  assert.strictEqual(leaf.end, 12);
});

// Stage 1d: `type X = 1;` -> LiteralTypeNode wrapper AND inner numeric leaf both
// stamped [9,10).
test("numeric literal type wrapper and leaf stamped", () => {
  const sourceFile = parseSourceFile("type X = 1;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");

  // M3 4c: wrapper and leaf share the full-start = end of `=` (8); ends stay token-tight.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 10);
  const leaf = literalType.literal;
  if (!isNumericLiteral(leaf)) throw new Error("Expected numeric literal leaf");
  assert.strictEqual(leaf.pos, 8);
  assert.strictEqual(leaf.end, 10);
});

// Stage 1d: `type X = 1n;` -> LiteralTypeNode wrapper AND inner bigint leaf both
// stamped [9,11).
test("bigint literal type wrapper and leaf stamped", () => {
  const sourceFile = parseSourceFile("type X = 1n;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");

  // M3 4c: wrapper and leaf share the full-start = end of `=` (8); ends stay token-tight.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 11);
  const leaf = literalType.literal;
  if (!isBigIntLiteral(leaf)) throw new Error("Expected bigint literal leaf");
  assert.strictEqual(leaf.pos, 8);
  assert.strictEqual(leaf.end, 11);
});

// Stage 1d: `type X = true;` -> LiteralTypeNode wrapper AND inner keyword-expression
// leaf both stamped [9,13).
test("true literal type wrapper and leaf stamped", () => {
  const sourceFile = parseSourceFile("type X = true;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");

  // M3 4c: wrapper and leaf share the full-start = end of `=` (8); ends stay token-tight.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 13);
  const leaf = literalType.literal;
  if (!isKeywordExpression(leaf)) throw new Error("Expected keyword expression leaf");
  assert.strictEqual(leaf.pos, 8);
  assert.strictEqual(leaf.end, 13);
});

// Stage 1d: `type X = null;` -> LiteralTypeNode wrapper AND inner keyword-expression
// leaf both stamped [9,13).
test("null literal type wrapper and leaf stamped", () => {
  const sourceFile = parseSourceFile("type X = null;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const literalType = statement.type;
  if (!isLiteralTypeNode(literalType)) throw new Error("Expected literal type node");

  // M3 4c: wrapper and leaf share the full-start = end of `=` (8); ends stay token-tight.
  assert.strictEqual(literalType.pos, 8);
  assert.strictEqual(literalType.end, 13);
  const leaf = literalType.literal;
  if (!isKeywordExpression(leaf)) throw new Error("Expected keyword expression leaf");
  assert.strictEqual(leaf.pos, 8);
  assert.strictEqual(leaf.end, 13);
});

// Stage 1d: `type X = Y<Z>;` -> TypeReferenceNode starts at the type name `Y`
// (index 9) and ends after the closing '>' (index 13). The type-argument `Z`
// spans [11,12).
test("type reference with type arguments covers angle", () => {
  const sourceFile = parseSourceFile("type X = Y<Z>;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const reference = statement.type;
  if (!isTypeReferenceNode(reference)) throw new Error("Expected type reference node");

  // M3 4c: reference.pos is the full-start = end of `=` (8). The type-argument
  // `Z` is preceded by `<` (no trivia), so its pos stays token-tight at 11.
  assert.strictEqual(reference.pos, 8);
  assert.strictEqual(reference.end, 13);
  const arg = reference.typeArguments![0]!;
  assert.strictEqual(arg.pos, 11);
  assert.strictEqual(arg.end, 12);
});

// Stage 1d: nested generics `type X = A<B<C>>;` -> the '>>' token is split; the
// outer reference ends after the final '>' (index 16) and the inner B<C> ends at
// the first '>' (index 15). Verifies #expectGreaterThan split-token ends are
// off-by-one-correct.
test("nested generic type arguments split greater than", () => {
  const sourceFile = parseSourceFile("type X = A<B<C>>;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const outer = statement.type;
  if (!isTypeReferenceNode(outer)) throw new Error("Expected outer type reference node");
  // M3 4c: outer.pos is the full-start = end of `=` (8). inner `B<C>` is
  // preceded by `<` (no trivia), so its pos stays 11.
  assert.strictEqual(outer.pos, 8);
  assert.strictEqual(outer.end, 16);
  const inner = outer.typeArguments![0]!;
  if (!isTypeReferenceNode(inner)) throw new Error("Expected inner type reference node");
  assert.strictEqual(inner.pos, 11);
  assert.strictEqual(inner.end, 15);
});

// Stage 1d: `type X = a.b;` -> the type reference's name is a QualifiedName whose
// start is the LEFTMOST identifier `a` (index 9), ending after `b` (index 12).
test("qualified name threads leftmost start", () => {
  const sourceFile = parseSourceFile("type X = a.b;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const reference = statement.type;
  if (!isTypeReferenceNode(reference)) throw new Error("Expected type reference node");
  const name = reference.typeName;
  if (!isQualifiedName(name)) throw new Error("Expected qualified name");

  // M3 4c: name.pos and the leftmost `a` share the full-start = end of `=` (8).
  // `b` (right) is preceded by `.` (no trivia), so its pos stays 11.
  assert.strictEqual(name.pos, 8);
  assert.strictEqual(name.end, 12);
  assert.strictEqual(name.left.pos, 8);
  assert.strictEqual(name.right.pos, 11);
});

// Stage 1d: dotted `type X = a.b.c;` -> the outer QualifiedName starts at the
// leftmost `a` (index 9, threaded) and ends after `c` (index 14); the nested
// left QualifiedName `a.b` spans [9,12).
test("nested qualified name threads single start", () => {
  const sourceFile = parseSourceFile("type X = a.b.c;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const reference = statement.type;
  if (!isTypeReferenceNode(reference)) throw new Error("Expected type reference node");
  const outer = reference.typeName;
  if (!isQualifiedName(outer)) throw new Error("Expected outer qualified name");
  // M3 4c: both qualified names thread the leftmost `a`'s full-start = end of `=` (8).
  assert.strictEqual(outer.pos, 8);
  assert.strictEqual(outer.end, 14);
  const left = outer.left;
  if (!isQualifiedName(left)) throw new Error("Expected nested qualified name");
  assert.strictEqual(left.pos, 8);
  assert.strictEqual(left.end, 12);
});

// Stage 1d: `type X = (a:T)=>R;` -> FunctionTypeNode starts at the '(' (index 9)
// and ends after the return type `R` (index 17).
test("function type paren path spans to return", () => {
  const sourceFile = parseSourceFile("type X = (a:T)=>R;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const fn = statement.type;
  if (!isFunctionTypeNode(fn)) throw new Error("Expected function type node");

  // M3 4c: fn.pos is the full-start = end of `=` (8). The return type `R` is
  // preceded by `=>` (no trivia), so its pos stays token-tight at 16.
  assert.strictEqual(fn.pos, 8);
  assert.strictEqual(fn.end, 17);
  assert.strictEqual(fn.type!.pos, 16);
  assert.strictEqual(fn.type!.end, 17);
});

// Stage 1d: `type X = <T>()=>R;` -> FunctionTypeNode (generic path) starts at the
// '<' (index 9) and ends after the return type `R` (index 17).
test("function type generic path starts at angle", () => {
  const sourceFile = parseSourceFile("type X = <T>()=>R;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const fn = statement.type;
  if (!isFunctionTypeNode(fn)) throw new Error("Expected function type node");

  // M3 4c: fn.pos is the full-start = end of `=` (8). The type-parameter `T` is
  // preceded by `<` (no trivia), so its pos stays token-tight at 10.
  assert.strictEqual(fn.pos, 8);
  assert.strictEqual(fn.end, 17);
  const tp = fn.typeParameters![0]!;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected type parameter declaration");
  assert.strictEqual(tp.pos, 10);
  assert.strictEqual(tp.end, 11);
});

// Stage 1d: `type X = new()=>R;` -> ConstructorTypeNode starts at the `new` keyword
// (index 9) and ends after the return type `R` (index 17).
test("constructor type starts at new keyword", () => {
  const sourceFile = parseSourceFile("type X = new()=>R;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const ctor = statement.type;
  if (!isConstructorTypeNode(ctor)) throw new Error("Expected constructor type node");

  // M3 4c: ctor.pos is the full-start = end of `=` (8). The return type `R` is
  // preceded by `=>` (no trivia), so its pos stays token-tight at 16.
  assert.strictEqual(ctor.pos, 8);
  assert.strictEqual(ctor.end, 17);
  assert.strictEqual(ctor.type!.pos, 16);
  assert.strictEqual(ctor.type!.end, 17);
});

// Stage 1d: `type X = A extends B?C:D;` -> ConditionalTypeNode starts at the
// checkType `A` (index 9) and ends after the falseType `D` (index 24). Children
// are stamped token-tight.
test("conditional type spans check through false", () => {
  const sourceFile = parseSourceFile("type X = A extends B?C:D;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const conditional = statement.type;
  if (!isConditionalTypeNode(conditional)) throw new Error("Expected conditional type node");

  // M3 4c: conditional.pos and checkType `A` share the full-start = end of `=`
  // (8). falseType `D` is preceded by `:` (no trivia), so its pos stays 23.
  assert.strictEqual(conditional.pos, 8);
  assert.strictEqual(conditional.end, 24);
  assert.strictEqual(conditional.checkType.pos, 8);
  assert.strictEqual(conditional.falseType.pos, 23);
  assert.strictEqual(conditional.falseType.end, 24);
});

// Stage 1d: `function f(x): x is T {}` -> the return type is a TypePredicateNode
// starting at the parameter name `x` (index 15) and ending after the predicate
// type `T` (index 21). The predicate `x` is at 15, `is` at 17, `T` at 20.
test("type predicate is path spans param through type", () => {
  const sourceFile = parseSourceFile("function f(x): x is T {}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const predicate = statement.type;
  if (predicate === undefined || !isTypePredicateNode(predicate)) throw new Error("Expected type predicate node");

  // M3 4c: predicate.pos and parameterName `x` share the full-start = end of
  // `:` (14). The predicate type `T`'s pos is its full-start = end of `is` (19);
  // the space after `is` is its leading trivia. ends stay token-tight.
  assert.strictEqual(predicate.pos, 14);
  assert.strictEqual(predicate.end, 21);
  assert.strictEqual(predicate.parameterName.pos, 14);
  assert.strictEqual(predicate.type!.pos, 19);
  assert.strictEqual(predicate.type!.end, 21);
});

// Stage 1d: `function f(x): asserts x {}` -> the return type is a TypePredicateNode
// (asserts-only path) starting at the `asserts` keyword (index 15) and ending after
// the parameter name `x` (index 24).
test("type predicate asserts path starts at asserts", () => {
  const sourceFile = parseSourceFile("function f(x): asserts x {}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const predicate = statement.type;
  if (predicate === undefined || !isTypePredicateNode(predicate)) throw new Error("Expected type predicate node");

  // M3 4c: predicate.pos is the full-start = end of `:` (14). parameterName `x`'s
  // pos is its full-start = end of `asserts` (22); the space after `asserts` is
  // its leading trivia. end stays token-tight at 24.
  assert.strictEqual(predicate.pos, 14);
  assert.strictEqual(predicate.end, 24);
  assert.strictEqual(predicate.parameterName.pos, 22);
  assert.strictEqual(predicate.parameterName.end, 24);
});

// Stage 1d: `interface I<T extends U> {}` -> the TypeParameterDeclaration starts at
// the name `T` (index 12) and ends after the constraint `U` (index 23).
test("type parameter declaration spans name through constraint", () => {
  const sourceFile = parseSourceFile("interface I<T extends U> {}");
  const statement = sourceFile.statements[0]!;
  if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface declaration");
  const tp = statement.typeParameters![0]!;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected type parameter declaration");

  // M3 4c: tp `T` is preceded by `<` (no trivia), so tp.pos stays 12. The
  // constraint `U`'s pos is its full-start = end of `extends` (21); the space
  // after `extends` is its leading trivia. end stays token-tight at 23.
  assert.strictEqual(tp.pos, 12);
  assert.strictEqual(tp.end, 23);
  assert.strictEqual(tp.constraint!.pos, 21);
  assert.strictEqual(tp.constraint!.end, 23);
});

// Stage 1c: `if(x){}` -> IfStatement spans [0,7); start at the `if` keyword, end
// covering the empty then-block. The then-block `{}` spans [5,7).
test("if statement spans whole range from keyword", () => {
  const sourceFile = parseSourceFile("if(x){}");
  const statement = sourceFile.statements[0]!;
  if (!isIfStatement(statement)) throw new Error("Expected if statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 7);
  const thenStatement = statement.thenStatement;
  if (!isBlock(thenStatement)) throw new Error("Expected then block");
  assert.strictEqual(thenStatement.pos, 5);
  assert.strictEqual(thenStatement.end, 7);
});

// Stage 1c: `for(;;){}` -> ForStatement spans [0,9); start at the `for` keyword,
// end covering the empty body block.
test("for statement spans whole range from keyword", () => {
  const sourceFile = parseSourceFile("for(;;){}");
  const statement = sourceFile.statements[0]!;
  if (!isForStatement(statement)) throw new Error("Expected for statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 9);
});

// Stage 1c: `while(x){}` -> WhileStatement spans [0,10); start at the `while`
// keyword, end covering the body block.
test("while statement spans whole range from keyword", () => {
  const sourceFile = parseSourceFile("while(x){}");
  const statement = sourceFile.statements[0]!;
  if (!isWhileStatement(statement)) throw new Error("Expected while statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 10);
});

// Stage 1c: `return 1;` -> ReturnStatement spans [0,9); start at the `return`
// keyword, end covering the trailing semicolon.
test("return statement spans through semicolon", () => {
  const sourceFile = parseSourceFile("return 1;");
  const statement = sourceFile.statements[0]!;
  if (!isReturnStatement(statement)) throw new Error("Expected return statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 9);
});

// Stage 1c: `{a;}` -> Block spans [0,4); start at the `{`, end covering the `}`.
// The inner expression statement `a;` spans [1,3).
test("block statement spans through closing brace", () => {
  const sourceFile = parseSourceFile("{a;}");
  const statement = sourceFile.statements[0]!;
  if (!isBlock(statement)) throw new Error("Expected block statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 4);
  const inner = statement.statements[0]!;
  if (!isExpressionStatement(inner)) throw new Error("Expected inner expression statement");
  assert.strictEqual(inner.pos, 1);
  assert.strictEqual(inner.end, 3);
});

// Stage 1c: `const x=1;` -> VariableStatement spans [0,10); the declaration list
// (no modifiers) shares the statement start at the `const` keyword and ends at the
// initializer (end 9); the declaration `x=1` spans [6,9).
test("variable statement and declaration ranges", () => {
  const sourceFile = parseSourceFile("const x=1;");
  const statement = sourceFile.statements[0]!;
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 10);
  const declarationList = statement.declarationList;
  if (!isVariableDeclarationList(declarationList)) throw new Error("Expected variable declaration list");
  assert.strictEqual(declarationList.pos, 0);
  assert.strictEqual(declarationList.end, 9);
  const declaration = declarationList.declarations[0]!;
  if (!isVariableDeclaration(declaration)) throw new Error("Expected variable declaration");
  // M3 4c: the declaration `x`'s pos is its full-start = end of `const` (5);
  // the space after `const` is its leading trivia. end stays token-tight at 9.
  assert.strictEqual(declaration.pos, 5);
  assert.strictEqual(declaration.end, 9);
});

// Stage 1c: `try{}catch{}` -> TryStatement spans [0,12); start at the `try`
// keyword, end covering the catch block. The catch clause spans [5,12).
test("try statement and catch clause ranges", () => {
  const sourceFile = parseSourceFile("try{}catch{}");
  const statement = sourceFile.statements[0]!;
  if (!isTryStatement(statement)) throw new Error("Expected try statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 12);
  const catchClause = statement.catchClause!;
  if (!isCatchClause(catchClause)) throw new Error("Expected catch clause");
  assert.strictEqual(catchClause.pos, 5);
  assert.strictEqual(catchClause.end, 12);
});

// Stage 1c: `switch(x){}` -> SwitchStatement spans [0,11); start at the `switch`
// keyword, end covering the empty case block. The case block `{}` spans [9,11).
test("switch statement and case block ranges", () => {
  const sourceFile = parseSourceFile("switch(x){}");
  const statement = sourceFile.statements[0]!;
  if (!isSwitchStatement(statement)) throw new Error("Expected switch statement");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 11);
  const caseBlock = statement.caseBlock;
  if (!isCaseBlock(caseBlock)) throw new Error("Expected case block");
  assert.strictEqual(caseBlock.pos, 9);
  assert.strictEqual(caseBlock.end, 11);
});

// Stage 1c: `switch(x){case 1:break;}` -> the case clause starts at the `case`
// keyword (pos 10, after `switch(x){`) and ends after its `break;` statement
// (end 23).
test("switch case clause starts at case keyword", () => {
  const sourceFile = parseSourceFile("switch(x){case 1:break;}");
  const statement = sourceFile.statements[0]!;
  if (!isSwitchStatement(statement)) throw new Error("Expected switch statement");
  const clause = statement.caseBlock.clauses[0]!;
  if (!isCaseClause(clause)) throw new Error("Expected case clause");

  assert.strictEqual(clause.pos, 10);
  assert.strictEqual(clause.end, 23);
});

// Stage 1c: `import a from "m";` -> ImportDeclaration spans [0,18); start at the
// `import` keyword, end covering the trailing semicolon.
test("import declaration spans through semicolon", () => {
  const sourceFile = parseSourceFile("import a from \"m\";");
  const statement = sourceFile.statements[0]!;
  if (!isImportDeclaration(statement)) throw new Error("Expected import declaration");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 18);
});

// Stage 1c: `export {a};` -> ExportDeclaration spans [0,11); start at the `export`
// keyword (the #parseStatement-top modifier pos), end covering the semicolon. The
// NamedExports clause starts at the `{` (pos 7) and ends at the `}` (end 10).
test("export declaration and named exports ranges", () => {
  const sourceFile = parseSourceFile("export {a};");
  const statement = sourceFile.statements[0]!;
  if (!isExportDeclaration(statement)) throw new Error("Expected export declaration");

  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 11);
  const exportClause = statement.exportClause!;
  if (!isNamedExports(exportClause)) throw new Error("Expected named exports");
  // M3 4c: the NamedExports `{...}` pos is its full-start = end of `export` (6);
  // the space after `export` is its leading trivia. end stays token-tight at 10.
  assert.strictEqual(exportClause.pos, 6);
  assert.strictEqual(exportClause.end, 10);
});

// Stage 1e: `class C{ x=1; m(){} get g(){return 1} }` -> each class member is now
// stamped token-tight. Property `x=1` [9,13) (start at name, end after ';');
// method `m(){}` [14,19); get accessor `g` [20,37).
test("class members property method get accessor ranges", () => {
  const sourceFile = parseSourceFile("class C{ x=1; m(){} get g(){return 1} }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const property = statement.members[0]!;
  if (!isPropertyDeclaration(property)) throw new Error("Expected property declaration");
  // M3 4c: each member's pos is its full-start = end of the PRIOR token (the
  // leading whitespace is the member's leading trivia). property `x` follows
  // `{` (end 8); method `m` follows `;` (end 13); getter follows the method
  // body `}` (end 19). All ends stay token-tight.
  assert.strictEqual(property.pos, 8);
  assert.strictEqual(property.end, 13);
  const method = statement.members[1]!;
  if (!isMethodDeclaration(method)) throw new Error("Expected method declaration");
  assert.strictEqual(method.pos, 13);
  assert.strictEqual(method.end, 19);
  const getter = statement.members[2]!;
  if (!isGetAccessorDeclaration(getter)) throw new Error("Expected get accessor declaration");
  assert.strictEqual(getter.pos, 19);
  assert.strictEqual(getter.end, 37);
});

// Stage 1e: modifier-led member start covers the modifier, NOT the member keyword.
// `interface I{ readonly a: number }` -> the property signature starts at `readonly`
// (index 13), ending after `number` (index 31); the name `a` is at [22,23). This is
// the load-bearing proof that pos is captured BEFORE parseModifiers.
test("modifier led member starts at modifier", () => {
  const sourceFile = parseSourceFile("interface I{ readonly a: number }");
  const statement = sourceFile.statements[0]!;
  if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface declaration");
  const member = statement.members[0]!;
  if (!isPropertySignatureDeclaration(member)) throw new Error("Expected property signature");
  // M3 4c: member.pos is its full-start = end of `{` (12). The name `a`'s pos is
  // its full-start = end of `readonly` (21); the space is its leading trivia.
  // ends stay token-tight.
  assert.strictEqual(member.pos, 12);
  assert.strictEqual(member.end, 31);
  const name = member.name;
  if (!isIdentifier(name)) throw new Error("Expected identifier name");
  assert.strictEqual(name.pos, 21);
  assert.strictEqual(name.end, 23);
});

// Stage 1e: a static-modifier-led method `class C{ static m(){} }` starts at
// `static` (index 9) and ends after the body (index 21).
test("static modifier led method starts at modifier", () => {
  const sourceFile = parseSourceFile("class C{ static m(){} }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const method = statement.members[0]!;
  if (!isMethodDeclaration(method)) throw new Error("Expected method declaration");
  // M3 4c: method.pos (covering the `static` modifier) is its full-start = end
  // of `{` (8); the space is its leading trivia. end stays token-tight at 21.
  assert.strictEqual(method.pos, 8);
  assert.strictEqual(method.end, 21);
});

// Stage 1e: constructor + set accessor. `class C{ constructor(a){} set s(v){} }` ->
// the constructor starts at `constructor` (index 9) and ends after its body; the set
// accessor follows. The constructor's parameter `a` is stamped via #parseParameterDeclaration.
test("class constructor and set accessor ranges", () => {
  const sourceFile = parseSourceFile("class C{ constructor(a){} set s(v){} }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const ctor = statement.members[0]!;
  if (!isConstructorDeclaration(ctor)) throw new Error("Expected constructor declaration");
  // M3 4c: ctor.pos is its full-start = end of `{` (8). param `a` follows `(`
  // with no trivia, so its pos stays 21. setter.pos is its full-start = end of
  // the ctor body `}` (25); the space is its leading trivia. ends stay token-tight.
  assert.strictEqual(ctor.pos, 8);
  assert.strictEqual(ctor.end, 25);
  const param = ctor.parameters[0]!;
  if (!isParameterDeclaration(param)) throw new Error("Expected parameter declaration");
  assert.strictEqual(param.pos, 21);
  assert.strictEqual(param.end, 22);
  const setter = statement.members[1]!;
  if (!isSetAccessorDeclaration(setter)) throw new Error("Expected set accessor declaration");
  assert.strictEqual(setter.pos, 25);
  assert.strictEqual(setter.end, 36);
});

// Stage 1e: a bare `;` class member is a SemicolonClassElement. In `class C{ ; }`
// the `;` is at index 9, so the element spans [9,10).
test("semicolon class element is token tight", () => {
  const sourceFile = parseSourceFile("class C{ ; }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const member = statement.members[0]!;
  if (!isSemicolonClassElement(member)) throw new Error("Expected semicolon class element");
  // M3 4c: member.pos is its full-start = end of `{` (8); the space is its
  // leading trivia. end stays token-tight at 10.
  assert.strictEqual(member.pos, 8);
  assert.strictEqual(member.end, 10);
});

// Stage 1h: a decorator on a class declaration. `@dec class C {}` -> the decorator `@dec`
// lives in the class's modifiers list, spans [0,4); its expression is the Identifier `dec`
// [1,4). The class declaration start covers the decorator: [0,15).
test("decorator on class declaration lives in modifiers", () => {
  const sourceFile = parseSourceFile("@dec class C {}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 15);
  const modifiers = statement.modifiers!;
  const decorator = modifiers[0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.kind, Kind.Decorator);
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 4);
  const expression = decorator.expression;
  if (!isIdentifier(expression)) throw new Error("Expected identifier decorator expression");
  assert.strictEqual(expression.pos, 1);
  assert.strictEqual(expression.end, 4);
});

// Stage 1h: a dotted decorator `@ns.deco class C {}` -> the decorator spans [0,8) and its
// expression is a PropertyAccessExpression `ns.deco`. Proves the decorator expression is a
// full left-hand-side expression (tsgo parseDecoratorExpression -> parseLeftHandSideExpressionOrHigher).
test("decorator dotted expression is property access", () => {
  const sourceFile = parseSourceFile("@ns.deco class C {}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 8);
  if (!isPropertyAccessExpression(decorator.expression)) throw new Error("Expected property access decorator expression");
});

// Stage 1h: a call decorator `@deco(1) class C {}` -> the decorator spans [0,8) and its
// expression is a CallExpression. Proves `@expr(args)` parses via the LHS-expression path.
test("decorator call expression form", () => {
  const sourceFile = parseSourceFile("@deco(1) class C {}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator");
  assert.strictEqual(decorator.pos, 0);
  assert.strictEqual(decorator.end, 8);
  if (!isCallExpression(decorator.expression)) throw new Error("Expected call decorator expression");
});

// Stage 1h: decorators on class members. `class C { @dec m(){} @dec x=1 }` -> the method
// member starts at its decorator (`@` at 10) and ends after its body (`}` at 19, end 20),
// [10,20); its decorator is [10,14). The property member starts at its decorator (`@` at 21),
// ends after `1` (end 29), [21,29); its decorator is [21,25).
test("decorators on class members thread member start", () => {
  const sourceFile = parseSourceFile("class C { @dec m(){} @dec x=1 }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const method = statement.members[0]!;
  if (!isMethodDeclaration(method)) throw new Error("Expected method declaration");
  // M3 4c: the member pos (= its leading decorator's pos) is its full-start =
  // end of the PRIOR token. The method's decorator follows `{` (end 9); the
  // property's decorator follows the method body `}` (end 20). ends stay token-tight.
  assert.strictEqual(method.pos, 9);
  assert.strictEqual(method.end, 20);
  const methodDecorator = method.modifiers![0]!;
  if (!isDecorator(methodDecorator)) throw new Error("Expected method decorator");
  assert.strictEqual(methodDecorator.pos, 9);
  assert.strictEqual(methodDecorator.end, 14);
  const property = statement.members[1]!;
  if (!isPropertyDeclaration(property)) throw new Error("Expected property declaration");
  assert.strictEqual(property.pos, 20);
  assert.strictEqual(property.end, 29);
  const propertyDecorator = property.modifiers![0]!;
  if (!isDecorator(propertyDecorator)) throw new Error("Expected property decorator");
  assert.strictEqual(propertyDecorator.pos, 20);
  assert.strictEqual(propertyDecorator.end, 25);
});

// Stage 1h: a decorator on a parameter. `function f(@dec p){}` -> the parameter starts at
// its decorator (`@` at 11) and ends after the name `p` (end 17), [11,17); its decorator is
// [11,15) and carries the Identifier `dec`.
test("decorator on parameter threads parameter start", () => {
  const sourceFile = parseSourceFile("function f(@dec p){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const param = statement.parameters[0]!;
  if (!isParameterDeclaration(param)) throw new Error("Expected parameter declaration");
  assert.strictEqual(param.pos, 11);
  assert.strictEqual(param.end, 17);
  const decorator = param.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected parameter decorator");
  assert.strictEqual(decorator.pos, 11);
  assert.strictEqual(decorator.end, 15);
});

// Stage 1h: a class static block. `class C { static { } }` -> the static-block member starts
// at `static` (index 10) and ends after the body's `}` (index 19, end 20), [10,20). Its body
// is a Block spanning the braces [17,20).
test("class static block member spans static through body", () => {
  const sourceFile = parseSourceFile("class C { static { } }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const member = statement.members[0]!;
  if (!isClassStaticBlockDeclaration(member)) throw new Error("Expected class static block declaration");
  assert.strictEqual(member.kind, Kind.ClassStaticBlockDeclaration);
  // M3 4c: member.pos is its full-start = end of `{` (9). The body block's pos
  // is its full-start = end of `static` (16); the space after `static` is its
  // leading trivia. ends stay token-tight.
  assert.strictEqual(member.pos, 9);
  assert.strictEqual(member.end, 20);
  const body = member.body;
  if (!isBlock(body)) throw new Error("Expected block body");
  assert.strictEqual(body.pos, 16);
  assert.strictEqual(body.end, 20);
});

// Stage 1e: interface members. `interface I{ a:number; m(): void; [k:string]:number }`
// -> property signature `a:number` [13,22); method signature `m(): void` [23,33);
// index signature `[k:string]:number` [34,51).
test("interface property method index signature ranges", () => {
  const sourceFile = parseSourceFile("interface I{ a:number; m(): void; [k:string]:number }");
  const statement = sourceFile.statements[0]!;
  if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface declaration");
  const property = statement.members[0]!;
  if (!isPropertySignatureDeclaration(property)) throw new Error("Expected property signature");
  // M3 4c: each member's pos is its full-start = end of the PRIOR token (the
  // leading space is the member's leading trivia). property `a` follows `{`
  // (end 12); method `m` follows the property's `;` (end 22); index sig `[`
  // follows the method's `;` (end 33). The index parameter `k` follows `[` with
  // no trivia, so its pos stays 35. ends stay token-tight.
  assert.strictEqual(property.pos, 12);
  assert.strictEqual(property.end, 22);
  const method = statement.members[1]!;
  if (!isMethodSignatureDeclaration(method)) throw new Error("Expected method signature");
  assert.strictEqual(method.pos, 22);
  assert.strictEqual(method.end, 33);
  const indexSig = statement.members[2]!;
  if (!isIndexSignatureDeclaration(indexSig)) throw new Error("Expected index signature");
  assert.strictEqual(indexSig.pos, 33);
  assert.strictEqual(indexSig.end, 51);
  const indexParam = indexSig.parameters[0]!;
  if (!isParameterDeclaration(indexParam)) throw new Error("Expected index parameter");
  assert.strictEqual(indexParam.pos, 35);
});

// Stage 1e: call & construct signatures. `interface I{ (a:number): void; new(): I }`
// -> call signature [13,30) (own pos at the '('); construct signature [31,39) (own
// pos at the `new` keyword, covering it).
test("interface call and construct signature ranges", () => {
  const sourceFile = parseSourceFile("interface I{ (a:number): void; new(): I }");
  const statement = sourceFile.statements[0]!;
  if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface declaration");
  const callSig = statement.members[0]!;
  if (!isCallSignatureDeclaration(callSig)) throw new Error("Expected call signature");
  // M3 4c: callSig.pos is its full-start = end of `{` (12). constructSig.pos is
  // its full-start = end of the call signature's `;` (30); the leading spaces
  // are leading trivia. ends stay token-tight.
  assert.strictEqual(callSig.pos, 12);
  assert.strictEqual(callSig.end, 30);
  const constructSig = statement.members[1]!;
  if (!isConstructSignatureDeclaration(constructSig)) throw new Error("Expected construct signature");
  assert.strictEqual(constructSig.pos, 30);
  assert.strictEqual(constructSig.end, 39);
});

// Stage 1e: enum members. `enum E{A,B=2}` -> member `A` [7,8); member `B=2` [9,12)
// (start at the name, end after the initializer).
test("enum member ranges cover initializer", () => {
  const sourceFile = parseSourceFile("enum E{A,B=2}");
  const statement = sourceFile.statements[0]!;
  if (!isEnumDeclaration(statement)) throw new Error("Expected enum declaration");
  const first = statement.members[0]!;
  if (!isEnumMember(first)) throw new Error("Expected enum member");
  assert.strictEqual(first.pos, 7);
  assert.strictEqual(first.end, 8);
  const second = statement.members[1]!;
  if (!isEnumMember(second)) throw new Error("Expected enum member");
  assert.strictEqual(second.pos, 9);
  assert.strictEqual(second.end, 12);
});

// Stage 1e: heritage clauses. `class C extends B implements I{}` -> the extends
// clause starts at the `extends` keyword (index 8) and spans [8,17); the implements
// clause starts at `implements` (index 18) and spans [18,30). Tokens preserved.
test("heritage clauses start at extends and implements", () => {
  const sourceFile = parseSourceFile("class C extends B implements I{}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const extendsClause = statement.heritageClauses![0]!;
  if (!isHeritageClause(extendsClause)) throw new Error("Expected heritage clause");
  // M3 4c: extendsClause.pos is its full-start = end of `C` (7). implementsClause.pos
  // is its full-start = end of the extends base `B` (17); the leading spaces are
  // leading trivia. ends and token kinds stay token-tight.
  assert.strictEqual(extendsClause.pos, 7);
  assert.strictEqual(extendsClause.end, 17);
  assert.strictEqual(extendsClause.token, Kind.ExtendsKeyword);
  const implementsClause = statement.heritageClauses![1]!;
  if (!isHeritageClause(implementsClause)) throw new Error("Expected heritage clause");
  assert.strictEqual(implementsClause.pos, 17);
  assert.strictEqual(implementsClause.end, 30);
  assert.strictEqual(implementsClause.token, Kind.ImplementsKeyword);
});

// Stage 1e: dotted heritage expression. `class C extends a.b.C{}` -> the inner
// PropertyAccessExpression `a.b.C` threads the leftmost base start `a` (index 16)
// and spans [16,21).
test("heritage dotted property access threads base start", () => {
  const sourceFile = parseSourceFile("class C extends a.b.C{}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const clause = statement.heritageClauses![0]!;
  const ewta = clause.types[0]!;
  const expression = ewta.expression;
  if (!isPropertyAccessExpression(expression)) throw new Error("Expected property access expression");
  // M3 4c: expression.pos threads the leftmost `a`'s full-start = end of
  // `extends` (15); the space after `extends` is its leading trivia. end stays
  // token-tight at 21. ewta.pos relation still holds (both shift identically).
  assert.strictEqual(expression.pos, 15);
  assert.strictEqual(expression.end, 21);
  assert.strictEqual(ewta.pos, expression.pos);
});

// Stage 1e: parameter declarations. `function f(a:T, ...b:U[]){}` -> `a:T` [11,14);
// the rest parameter `...b:U[]` starts at the '...' (index 16) and spans [16,24).
test("parameter declaration ranges including rest", () => {
  const sourceFile = parseSourceFile("function f(a:T, ...b:U[]){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const first = statement.parameters[0]!;
  if (!isParameterDeclaration(first)) throw new Error("Expected parameter declaration");
  // M3 4c: first `a` follows `(` with no trivia, so its pos stays 11. The rest
  // param `...b` follows `,` (end 15), so its pos is the full-start 15 (the
  // space after `,` is its leading trivia). ends stay token-tight.
  assert.strictEqual(first.pos, 11);
  assert.strictEqual(first.end, 14);
  const rest = statement.parameters[1]!;
  if (!isParameterDeclaration(rest)) throw new Error("Expected rest parameter declaration");
  assert.strictEqual(rest.pos, 15);
  assert.strictEqual(rest.end, 24);
});

// Stage 1e: optional + defaulted parameters. `function f(a?: T, b: U = 1){}` ->
// `a?: T` [11,16); `b: U = 1` [18,26) (end after the initializer).
test("parameter declaration optional and default ranges", () => {
  const sourceFile = parseSourceFile("function f(a?: T, b: U = 1){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const optional = statement.parameters[0]!;
  if (!isParameterDeclaration(optional)) throw new Error("Expected parameter declaration");
  // M3 4c: optional `a` follows `(` with no trivia, so its pos stays 11. The
  // defaulted param `b` follows `,` (end 17), so its pos is the full-start 17
  // (the space after `,` is its leading trivia). ends stay token-tight.
  assert.strictEqual(optional.pos, 11);
  assert.strictEqual(optional.end, 16);
  const defaulted = statement.parameters[1]!;
  if (!isParameterDeclaration(defaulted)) throw new Error("Expected parameter declaration");
  assert.strictEqual(defaulted.pos, 17);
  assert.strictEqual(defaulted.end, 26);
});

// Stage 1e: object & array binding patterns as parameters.
// `function f(a:T, {x}:O, [y]:A){}` -> object pattern `{x}` [16,19) with element
// `x` [17,18); array pattern `[y]` [23,26) with element `y` [24,25).
test("binding pattern parameters and elements ranges", () => {
  const sourceFile = parseSourceFile("function f(a:T, {x}:O, [y]:A){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const objParam = statement.parameters[1]!;
  const objPattern = objParam.name;
  if (!isObjectBindingPattern(objPattern)) throw new Error("Expected object binding pattern");
  // M3 4c: the binding-pattern parameters' pos is the full-start = end of the
  // preceding `,`. objPattern `{x}` follows the first `,` (end 15); arrPattern
  // `[y]` follows the second `,` (end 22). Elements (`x`, `y`) follow `{`/`[`
  // with no trivia, so their pos stays token-tight. ends stay token-tight.
  assert.strictEqual(objPattern.pos, 15);
  assert.strictEqual(objPattern.end, 19);
  const objElement = objPattern.elements[0]!;
  if (!isBindingElement(objElement)) throw new Error("Expected binding element");
  assert.strictEqual(objElement.pos, 17);
  assert.strictEqual(objElement.end, 18);
  const arrParam = statement.parameters[2]!;
  const arrPattern = arrParam.name;
  if (!isArrayBindingPattern(arrPattern)) throw new Error("Expected array binding pattern");
  assert.strictEqual(arrPattern.pos, 22);
  assert.strictEqual(arrPattern.end, 26);
  const arrElement = arrPattern.elements[0]!;
  if (!isBindingElement(arrElement)) throw new Error("Expected binding element");
  assert.strictEqual(arrElement.pos, 24);
  assert.strictEqual(arrElement.end, 25);
});

// Stage 1e: array binding hole + rest. `function f([a, ,b]:A){}` -> the elided hole
// (the second comma) gets a zero-length BindingElement at the comma position [15,16);
// the surrounding elements `a` [12,13) and `b` [16,17) are stamped.
test("array binding hole and elements ranges", () => {
  const sourceFile = parseSourceFile("function f([a, ,b]:A){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const pattern = statement.parameters[0]!.name;
  if (!isArrayBindingPattern(pattern)) throw new Error("Expected array binding pattern");
  const a = pattern.elements[0]!;
  // M3 4c: `a` follows `[` with no trivia, so its pos stays 12. The elided hole's
  // pos is its full-start = end of the first `,` (14); the space after the first
  // `,` is the hole's leading trivia. `b` follows the second `,` with no trivia,
  // so its pos stays 16. ends stay token-tight.
  assert.strictEqual(a.pos, 12);
  assert.strictEqual(a.end, 13);
  const hole = pattern.elements[1]!;
  if (!isBindingElement(hole)) throw new Error("Expected hole binding element");
  assert.strictEqual(hole.pos, 14);
  assert.strictEqual(hole.end, 16);
  const b = pattern.elements[2]!;
  assert.strictEqual(b.pos, 16);
  assert.strictEqual(b.end, 17);
});

// Stage 1e: rest element in an array binding pattern. `function f([...r]:A){}` ->
// the rest element `...r` starts at the '...' (index 12) and spans [12,16).
test("array binding rest element starts at dotdotdot", () => {
  const sourceFile = parseSourceFile("function f([...r]:A){}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const pattern = statement.parameters[0]!.name;
  if (!isArrayBindingPattern(pattern)) throw new Error("Expected array binding pattern");
  const rest = pattern.elements[0]!;
  if (!isBindingElement(rest)) throw new Error("Expected rest binding element");
  assert.strictEqual(rest.pos, 12);
  assert.strictEqual(rest.end, 16);
});

// Stage 1e: computed property name. `class C{ [k]=1; }` -> the member's name is a
// ComputedPropertyName starting at the '[' (index 9) and ending after the ']'
// (index 12), spanning [9,12).
test("computed property name covers brackets", () => {
  const sourceFile = parseSourceFile("class C{ [k]=1; }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const member = statement.members[0]!;
  if (!isPropertyDeclaration(member)) throw new Error("Expected property declaration");
  const name = member.name;
  if (!isComputedPropertyName(name)) throw new Error("Expected computed property name");
  assert.strictEqual(name.pos, 9);
  assert.strictEqual(name.end, 12);
});

// Stage 1f: a bare `;` parses to an EmptyStatement covering exactly the semicolon.
test("empty statement covers the semicolon", () => {
  const sourceFile = parseSourceFile(";");
  const statement = sourceFile.statements[0]!;
  if (!isEmptyStatement(statement)) throw new Error("Expected empty statement");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 1);
});

// Stage 1f: `debugger;` parses to a DebuggerStatement spanning the keyword through the
// trailing semicolon.
test("debugger statement spans through semicolon", () => {
  const sourceFile = parseSourceFile("debugger;");
  const statement = sourceFile.statements[0]!;
  if (!isDebuggerStatement(statement)) throw new Error("Expected debugger statement");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 9);
});

// Stage 1f: `with (x) { y; }` parses to a WithStatement starting at the `with` keyword and
// ending at the body block's closing brace; the body is a full statement.
test("with statement spans keyword through body", () => {
  const sourceFile = parseSourceFile("with (x) { y; }");
  const statement = sourceFile.statements[0]!;
  if (!isWithStatement(statement)) throw new Error("Expected with statement");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 15);
  assert.strictEqual(statement.expression.pos, 6);
  assert.strictEqual(statement.expression.end, 7);
  if (!isBlock(statement.statement)) throw new Error("Expected block body");
});

// Stage 1f: `label: foo;` parses to a LabeledStatement whose label is an Identifier and whose
// body is the trailing ExpressionStatement. The whole node spans label through the `;`.
test("labeled statement spans label through body", () => {
  const sourceFile = parseSourceFile("label: foo;");
  const statement = sourceFile.statements[0]!;
  if (!isLabeledStatement(statement)) throw new Error("Expected labeled statement");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 11);
  if (!isIdentifier(statement.label)) throw new Error("Expected identifier label");
  assert.strictEqual(statement.label.pos, 0);
  assert.strictEqual(statement.label.end, 5);
  if (!isExpressionStatement(statement.statement)) throw new Error("Expected expression statement body");
});

// Stage 1f: nested labels `a: b: c;` recurse — the outer label's body is itself a
// LabeledStatement.
test("nested labeled statement recurses", () => {
  const sourceFile = parseSourceFile("a: b: c;");
  const statement = sourceFile.statements[0]!;
  if (!isLabeledStatement(statement)) throw new Error("Expected outer labeled statement");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 8);
  if (!isLabeledStatement(statement.statement)) throw new Error("Expected inner labeled statement");
  // M3 4c: the inner labeled statement's pos is its full-start = end of the
  // outer label's `:` (2); the space is its leading trivia. end stays at 8.
  assert.strictEqual(statement.statement.pos, 2);
  assert.strictEqual(statement.statement.end, 8);
});

// Stage 1f: `import x = require("m");` parses to an ImportEqualsDeclaration whose
// moduleReference is an ExternalModuleReference covering `require("m")`.
test("import equals require spans through semicolon", () => {
  const sourceFile = parseSourceFile("import x = require(\"m\");");
  const statement = sourceFile.statements[0]!;
  if (!isImportEqualsDeclaration(statement)) throw new Error("Expected import equals declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 24);
  assert.strictEqual(statement.name.text, "x");
  assert.strictEqual(statement.isTypeOnly, false);
  if (!isExternalModuleReference(statement.moduleReference)) throw new Error("Expected external module reference");
  // M3 4c: moduleReference.pos is its full-start = end of `=` (10); the space
  // after `=` is its leading trivia. end stays token-tight at 23.
  assert.strictEqual(statement.moduleReference.pos, 10);
  assert.strictEqual(statement.moduleReference.end, 23);
});

// Stage 1f: `import y = A.B;` parses to an ImportEqualsDeclaration whose moduleReference is a
// dotted entity name (QualifiedName).
test("import equals entity name uses qualified name", () => {
  const sourceFile = parseSourceFile("import y = A.B;");
  const statement = sourceFile.statements[0]!;
  if (!isImportEqualsDeclaration(statement)) throw new Error("Expected import equals declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 15);
  if (!isQualifiedName(statement.moduleReference)) throw new Error("Expected qualified name module reference");
  // M3 4c: moduleReference `A.B` threads the leftmost `A`'s full-start = end of
  // `=` (10); the space after `=` is its leading trivia. end stays token-tight at 14.
  assert.strictEqual(statement.moduleReference.pos, 10);
  assert.strictEqual(statement.moduleReference.end, 14);
});

// Stage 1f: `import type z = require("m");` is a type-only ImportEqualsDeclaration; the
// leading `type` is threaded into isTypeOnly, not the identifier name.
test("import type equals threads is type only", () => {
  const sourceFile = parseSourceFile("import type z = require(\"m\");");
  const statement = sourceFile.statements[0]!;
  if (!isImportEqualsDeclaration(statement)) throw new Error("Expected import equals declaration");
  assert.strictEqual(statement.isTypeOnly, true);
  assert.strictEqual(statement.name.text, "z");
});

// Stage 1f: `export = value;` parses to an ExportAssignment with isExportEquals=true, spanning
// the `export` keyword through the trailing semicolon.
test("export assignment equals spans through semicolon", () => {
  const sourceFile = parseSourceFile("export = value;");
  const statement = sourceFile.statements[0]!;
  if (!isExportAssignment(statement)) throw new Error("Expected export assignment");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 15);
  assert.strictEqual(statement.isExportEquals, true);
  if (!isIdentifier(statement.expression)) throw new Error("Expected identifier expression");
});

// Stage 1f: `export default 42;` parses to an ExportAssignment with isExportEquals=false (NOT
// a declaration), spanning the `export` keyword through the trailing semicolon.
test("export default expression is export assignment", () => {
  const sourceFile = parseSourceFile("export default 42;");
  const statement = sourceFile.statements[0]!;
  if (!isExportAssignment(statement)) throw new Error("Expected export assignment");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 18);
  assert.strictEqual(statement.isExportEquals, false);
  if (!isNumericLiteral(statement.expression)) throw new Error("Expected numeric literal expression");
});

// Stage 1f: `export default function f() {}` remains a FunctionDeclaration (default kept as a
// modifier), proving the expression-default fix did not regress declaration defaults.
test("export default function remains function declaration", () => {
  const sourceFile = parseSourceFile("export default function f() {}");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 30);
});

// Stage 1f: `export as namespace Lib;` parses to a NamespaceExportDeclaration spanning the
// `export` keyword through the trailing semicolon.
test("namespace export declaration spans through semicolon", () => {
  const sourceFile = parseSourceFile("export as namespace Lib;");
  const statement = sourceFile.statements[0]!;
  if (!isNamespaceExportDeclaration(statement)) throw new Error("Expected namespace export declaration");
  assert.strictEqual(statement.pos, 0);
  assert.strictEqual(statement.end, 24);
  assert.strictEqual(statement.name.text, "Lib");
});

// Stage 1f: `import data from "d.json" with { type: "json" };` carries an ImportAttributes node
// (token = WithKeyword) covering the `with { ... }` clause; the single attribute is `type:
// "json"`.
test("import attributes with clause ranges", () => {
  const sourceFile = parseSourceFile("import data from \"d.json\" with { type: \"json\" };");
  const statement = sourceFile.statements[0]!;
  if (!isImportDeclaration(statement)) throw new Error("Expected import declaration");
  const attributes = statement.attributes;
  if (attributes === undefined || !isImportAttributes(attributes)) throw new Error("Expected import attributes");
  assert.strictEqual(attributes.token, Kind.WithKeyword);
  // M3 4c: attributes.pos is its full-start = end of the `"d.json"` string
  // literal (25). The attribute `type: "json"`'s pos is its full-start = end of
  // `{` (32); leading spaces are leading trivia. ends stay token-tight.
  assert.strictEqual(attributes.pos, 25);
  assert.strictEqual(attributes.end, 47);
  assert.strictEqual(attributes.attributes.length, 1);
  const attribute = attributes.attributes[0]!;
  if (!isImportAttribute(attribute)) throw new Error("Expected import attribute");
  assert.strictEqual(attribute.pos, 32);
  assert.strictEqual(attribute.end, 45);
  if (!isIdentifier(attribute.name)) throw new Error("Expected identifier attribute name");
  assert.strictEqual(attribute.name.text, "type");
  if (!isStringLiteral(attribute.value)) throw new Error("Expected string literal attribute value");
});

// Stage 1f: re-exports also carry attributes — `export { a } from "m.json" with { type:
// "json" };` wires an ImportAttributes node onto the ExportDeclaration.
test("reexport attributes with clause wired", () => {
  const sourceFile = parseSourceFile("export { a } from \"m.json\" with { type: \"json\" };");
  const statement = sourceFile.statements[0]!;
  if (!isExportDeclaration(statement)) throw new Error("Expected export declaration");
  const attributes = statement.attributes;
  if (attributes === undefined || !isImportAttributes(attributes)) throw new Error("Expected import attributes");
  assert.strictEqual(attributes.token, Kind.WithKeyword);
  assert.strictEqual(attributes.attributes.length, 1);
});

// Stage 1g: template-literal TYPE. `type T = `a${B}c`;` -> TemplateLiteralTypeNode starts at
// the TemplateHead `` `a${ `` (index 9) and ends after the tail `` }c` `` (index 17). The head
// spans [9,13); the single TemplateLiteralTypeSpan covers the span TYPE `B` through the tail
// [13,17) (its start is the span type's start, NOT the `${`).
test("template literal type spans head through tail", () => {
  const sourceFile = parseSourceFile("type T = `a${B}c`;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const template = statement.type;
  if (!isTemplateLiteralTypeNode(template)) throw new Error("Expected template literal type node");
  // M3 4c: template.pos and the TemplateHead share the full-start = end of `=`
  // (8). The span starts at its span type `B`, which follows the head token (no
  // trivia), so span.pos stays 13. ends stay token-tight.
  assert.strictEqual(template.pos, 8);
  assert.strictEqual(template.end, 17);
  assert.strictEqual(template.head.pos, 8);
  assert.strictEqual(template.head.end, 13);
  const span = template.templateSpans[0]!;
  if (!isTemplateLiteralTypeSpan(span)) throw new Error("Expected template literal type span");
  assert.strictEqual(span.pos, 13);
  assert.strictEqual(span.end, 17);
  assert.strictEqual(span.pos, span.type.pos);
});

// Stage 1g: template-literal TYPE with a `{`-containing interior. `type T = `a${{x:B}}c`;` ->
// the `${...}` interior is a type literal `{x:B}`; the scanner's brace-depth counter round-trips
// the nested `{ }` so the span TYPE is a TypeLiteralNode and the whole template still spans
// [9,21) (head `` `a${ `` [9,13); the type literal `{x:B}` [13,18); the tail `` }c` `` [18,21)).
test("template literal type with brace interior round trips", () => {
  const sourceFile = parseSourceFile("type T = `a${{x:B}}c`;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const template = statement.type;
  if (!isTemplateLiteralTypeNode(template)) throw new Error("Expected template literal type node");
  // M3 4c: template.pos is the full-start = end of `=` (8); end stays at 21.
  assert.strictEqual(template.pos, 8);
  assert.strictEqual(template.end, 21);
  const span = template.templateSpans[0]!;
  if (!isTemplateLiteralTypeSpan(span)) throw new Error("Expected template literal type span");
  if (!isTypeLiteralNode(span.type)) throw new Error("Expected type literal span type");
});

// Stage 1g: mapped type. `type T = { readonly [K in U]?: V };` -> MappedTypeNode covers the
// braces [9,34). The readonlyToken is a ReadonlyKeyword; the questionToken is a QuestionToken;
// the typeParameter (`K in U`) starts at the name `K` (index 21) and ends after the in-type `U`
// (index 27); the in-type lives in the typeParameter's constraint slot.
test("mapped type covers braces with readonly and question", () => {
  const sourceFile = parseSourceFile("type T = { readonly [K in U]?: V };");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const mapped = statement.type;
  if (!isMappedTypeNode(mapped)) throw new Error("Expected mapped type node");
  // M3 4c: mapped.pos is the full-start = end of `=` (8). The type parameter `K`
  // follows `[` with no trivia, so tp.pos stays 21. ends stay token-tight.
  assert.strictEqual(mapped.pos, 8);
  assert.strictEqual(mapped.end, 34);
  assert.strictEqual(mapped.readonlyToken!.kind, Kind.ReadonlyKeyword);
  assert.strictEqual(mapped.questionToken!.kind, Kind.QuestionToken);
  const tp = mapped.typeParameter;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected type parameter declaration");
  assert.strictEqual(tp.pos, 21);
  assert.strictEqual(tp.end, 27);
  if (tp.constraint === undefined) throw new Error("Expected in-type in constraint slot");
  assert.strictEqual(tp.constraint.kind, Kind.TypeReference);
});

// Stage 1g: mapped type with `+/-` modifiers and `as` remapping.
// `type T = { -readonly [K in U as `g${K}`]-?: V };` -> the readonly/question slots carry
// MinusToken (+/- form); the `as` nameType is a TemplateLiteralType.
test("mapped type plus minus modifiers and as remapping", () => {
  const sourceFile = parseSourceFile("type T = { -readonly [K in U as `g${K}`]-?: V };");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const mapped = statement.type;
  if (!isMappedTypeNode(mapped)) throw new Error("Expected mapped type node");
  assert.strictEqual(mapped.readonlyToken!.kind, Kind.MinusToken);
  assert.strictEqual(mapped.questionToken!.kind, Kind.MinusToken);
  if (mapped.nameType === undefined) throw new Error("Expected as-remapping nameType");
  assert.strictEqual(mapped.nameType.kind, Kind.TemplateLiteralType);
});

// Stage 1g: import type with qualifier + type arguments.
// `type T = import("mod").Ns.Type<X>;` -> ImportTypeNode starts at `import` (index 9) and ends
// after the closing `>` (index 33). isTypeOf is false; the qualifier is a dotted entity name
// (QualifiedName); there is one type argument.
test("import type with qualifier and type arguments", () => {
  const sourceFile = parseSourceFile("type T = import(\"mod\").Ns.Type<X>;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const importType = statement.type;
  if (!isImportTypeNode(importType)) throw new Error("Expected import type node");
  // M3 4c: importType.pos is the full-start = end of `=` (8); end stays at 33.
  assert.strictEqual(importType.pos, 8);
  assert.strictEqual(importType.end, 33);
  assert.strictEqual(importType.isTypeOf, false);
  if (importType.qualifier === undefined || !isQualifiedName(importType.qualifier)) throw new Error("Expected qualified-name qualifier");
  assert.strictEqual(importType.typeArguments!.length, 1);
});

// Stage 1g: typeof import type. `type T = typeof import("mod").Default;` -> ImportTypeNode with
// isTypeOf=true starting at the `typeof` keyword (index 9), ending after the qualifier `Default`
// (index 37).
test("typeof import type sets is type of", () => {
  const sourceFile = parseSourceFile("type T = typeof import(\"mod\").Default;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const importType = statement.type;
  if (!isImportTypeNode(importType)) throw new Error("Expected import type node");
  // M3 4c: importType.pos is the full-start = end of `=` (8); end stays at 37.
  assert.strictEqual(importType.pos, 8);
  assert.strictEqual(importType.end, 37);
  assert.strictEqual(importType.isTypeOf, true);
});

// Stage 1g: import type with attributes. `type T = import("m", { with: { t: "json" } }).X;` ->
// ImportTypeNode carrying an ImportAttributes node (token = WithKeyword) parsed mid-type via the
// skipKeyword path; the inner attribute object has one entry. The whole import type spans [9,47).
test("import type with attributes clause", () => {
  const sourceFile = parseSourceFile("type T = import(\"m\", { with: { t: \"json\" } }).X;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const importType = statement.type;
  if (!isImportTypeNode(importType)) throw new Error("Expected import type node");
  // M3 4c: importType.pos is the full-start = end of `=` (8); end stays at 47.
  assert.strictEqual(importType.pos, 8);
  assert.strictEqual(importType.end, 47);
  const attributes = importType.attributes;
  if (attributes === undefined || !isImportAttributes(attributes)) throw new Error("Expected import attributes");
  assert.strictEqual(attributes.token, Kind.WithKeyword);
  assert.strictEqual(attributes.attributes.length, 1);
});

// Stage 1g: bare infer type. `type T = A extends infer U ? U : never;` -> the conditional's
// extendsType is an InferTypeNode starting at the `infer` keyword (index 19) and ending after
// the type parameter name `U` (index 26); its TypeParameterDeclaration has no constraint.
test("infer type bare in conditional extends position", () => {
  const sourceFile = parseSourceFile("type T = A extends infer U ? U : never;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const conditional = statement.type;
  if (!isConditionalTypeNode(conditional)) throw new Error("Expected conditional type node");
  const infer = conditional.extendsType;
  if (!isInferTypeNode(infer)) throw new Error("Expected infer type node");
  // M3 4c: infer.pos is its full-start = end of `extends` (18). The type
  // parameter `U`'s pos is its full-start = end of `infer` (24); leading spaces
  // are leading trivia. ends stay token-tight.
  assert.strictEqual(infer.pos, 18);
  assert.strictEqual(infer.end, 26);
  const tp = infer.typeParameter;
  if (!isTypeParameterDeclaration(tp)) throw new Error("Expected type parameter declaration");
  assert.strictEqual(tp.pos, 24);
  assert.strictEqual(tp.end, 26);
  if (tp.constraint !== undefined) throw new Error("Expected no constraint on bare infer");
});

// Stage 1g: infer type with `extends` constraint. `type T = A extends infer U extends string ? U
// : never;` -> the InferTypeNode spans the `infer` keyword (index 19) through the constraint
// `string` (index 41); the constraint is KEPT (the trailing `?` belongs to the enclosing
// conditional). The constraint is a StringKeyword spanning [35,41).
test("infer type extends constraint is kept", () => {
  const sourceFile = parseSourceFile("type T = A extends infer U extends string ? U : never;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const conditional = statement.type;
  if (!isConditionalTypeNode(conditional)) throw new Error("Expected conditional type node");
  const infer = conditional.extendsType;
  if (!isInferTypeNode(infer)) throw new Error("Expected infer type node");
  // M3 4c: infer.pos is its full-start = end of the first `extends` (18). The
  // constraint `string`'s pos is its full-start = end of the second `extends`
  // (34); leading spaces are leading trivia. ends stay token-tight.
  assert.strictEqual(infer.pos, 18);
  assert.strictEqual(infer.end, 41);
  const constraint = infer.typeParameter.constraint;
  if (constraint === undefined) throw new Error("Expected kept constraint");
  assert.strictEqual(constraint.kind, Kind.StringKeyword);
  assert.strictEqual(constraint.pos, 34);
  assert.strictEqual(constraint.end, 41);
});

// Stage 1g: named-tuple members + optional + rest.
// `type T = [a: string, b?: number, ...c: boolean[]];` -> the tuple spans [9,49) with three
// NamedTupleMember elements: `a: string` [10,19); `b?: number` [21,31) with a QuestionToken;
// `...c: boolean[]` [33,48) with a DotDotDotToken.
test("named tuple members with optional and rest", () => {
  const sourceFile = parseSourceFile("type T = [a: string, b?: number, ...c: boolean[]];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const tuple = statement.type;
  if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type node");
  // M3 4c: tuple.pos is the full-start = end of `=` (8). first `a` follows `[`
  // with no trivia (pos 10); second `b` follows the first `,` (full-start 20);
  // third `...c` follows the second `,` (full-start 32). ends/kinds stay token-tight.
  assert.strictEqual(tuple.pos, 8);
  assert.strictEqual(tuple.end, 49);
  const first = tuple.elements[0]!;
  if (!isNamedTupleMember(first)) throw new Error("Expected first named tuple member");
  assert.strictEqual(first.pos, 10);
  assert.strictEqual(first.end, 19);
  const second = tuple.elements[1]!;
  if (!isNamedTupleMember(second)) throw new Error("Expected second named tuple member");
  assert.strictEqual(second.pos, 20);
  assert.strictEqual(second.end, 31);
  assert.strictEqual(second.questionToken!.kind, Kind.QuestionToken);
  const third = tuple.elements[2]!;
  if (!isNamedTupleMember(third)) throw new Error("Expected third named tuple member");
  assert.strictEqual(third.pos, 32);
  assert.strictEqual(third.end, 48);
  assert.strictEqual(third.dotDotDotToken!.kind, Kind.DotDotDotToken);
});

// Stage 1g: a keyword-named tuple member. `type T = [type: string];` -> the member name accepts
// a keyword (`type`); the NamedTupleMember spans [10,22) and its name text is `type`.
test("named tuple member allows keyword name", () => {
  const sourceFile = parseSourceFile("type T = [type: string];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const tuple = statement.type;
  if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type node");
  const member = tuple.elements[0]!;
  if (!isNamedTupleMember(member)) throw new Error("Expected named tuple member");
  assert.strictEqual(member.pos, 10);
  assert.strictEqual(member.end, 22);
  assert.strictEqual(member.name.text, "type");
});

// Stage 1g: rest type in a tuple. `type T = [...string[]];` -> the element is a RestTypeNode
// starting at the `...` (index 10) and ending after the inner array type (index 21).
test("rest type in tuple starts at dotdotdot", () => {
  const sourceFile = parseSourceFile("type T = [...string[]];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const tuple = statement.type;
  if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type node");
  const rest = tuple.elements[0]!;
  if (!isRestTypeNode(rest)) throw new Error("Expected rest type node");
  assert.strictEqual(rest.pos, 10);
  assert.strictEqual(rest.end, 21);
  if (!isArrayTypeNode(rest.type)) throw new Error("Expected array type inside rest");
});

// Stage 1g: optional type in a tuple. `type T = [string?];` -> the element is an OptionalTypeNode
// starting at the element type `string` (index 10) and ending after the `?` (index 17); the inner
// type is the StringKeyword spanning [10,16).
test("optional type in tuple wraps element", () => {
  const sourceFile = parseSourceFile("type T = [string?];");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const tuple = statement.type;
  if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type node");
  const optional = tuple.elements[0]!;
  if (!isOptionalTypeNode(optional)) throw new Error("Expected optional type node");
  assert.strictEqual(optional.pos, 10);
  assert.strictEqual(optional.end, 17);
  if (!isKeywordTypeNode(optional.type)) throw new Error("Expected keyword type inside optional");
  assert.strictEqual(optional.type.pos, 10);
  assert.strictEqual(optional.type.end, 16);
});

// codex-054 M3 Stage-2: contextFlags are OR-ed into every node's flags at #finishNode
// (tsgo finishNodeWithEnd `node.Flags |= p.contextFlags`, parser.go:5910). The probes
// below pin that the relevant context bit is recorded on nodes parsed inside each
// context, and that a plain top-level node carries NO context bits (None-init).

// A plain `.ts` top-level statement is parsed with contextFlags == NodeFlags.None, so no
// context bit is set. tsonic is always ScriptKindTS (tsgo initializeState default arm),
// so the parser seeds contextFlags at None.
test("top level node has no context flags", () => {
  const sourceFile = parseSourceFile("x;");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  assert.ok(!((statement.flags & NodeFlags.YieldContext) !== 0));
  assert.ok(!((statement.flags & NodeFlags.AwaitContext) !== 0));
  assert.ok(!((statement.flags & NodeFlags.DisallowInContext) !== 0));
  assert.ok(!((statement.flags & NodeFlags.DecoratorContext) !== 0));
  assert.ok(!((statement.flags & NodeFlags.InWithStatement) !== 0));
  assert.ok(!((statement.flags & NodeFlags.DisallowConditionalTypesContext) !== 0));
});

// `function* g() { x; }` -> the generator body Block (and every node finished inside it)
// is parsed in YieldContext (signatureFlags Yield from the asterisk) but NOT AwaitContext.
test("generator body node carries yield context", () => {
  const sourceFile = parseSourceFile("function* g() { x; }");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const body = statement.body;
  if (body === undefined || !isBlock(body)) throw new Error("Expected function body block");
  assert.ok((body.flags & NodeFlags.YieldContext) !== 0);
  assert.ok(!((body.flags & NodeFlags.AwaitContext) !== 0));
  const inner = body.statements[0]!;
  assert.ok((inner.flags & NodeFlags.YieldContext) !== 0);
  assert.ok(!((inner.flags & NodeFlags.AwaitContext) !== 0));
});

// `async function f() { x; }` -> the body Block is parsed in AwaitContext (signatureFlags
// Await from the async modifier) but NOT YieldContext.
test("async function body node carries await context", () => {
  const sourceFile = parseSourceFile("async function f() { x; }");
  const statement = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  const body = statement.body;
  if (body === undefined || !isBlock(body)) throw new Error("Expected function body block");
  assert.ok((body.flags & NodeFlags.AwaitContext) !== 0);
  assert.ok(!((body.flags & NodeFlags.YieldContext) !== 0));
  const inner = body.statements[0]!;
  assert.ok((inner.flags & NodeFlags.AwaitContext) !== 0);
  assert.ok(!((inner.flags & NodeFlags.YieldContext) !== 0));
});

// `type T = A extends B ? C : D;` -> the extends-type (B) is parsed in
// DisallowConditionalTypesContext (tsgo parseType extends-type wrap), while the true/false
// branches are parsed with it cleared.
test("conditional extends type carries disallow conditional types", () => {
  const sourceFile = parseSourceFile("type T = A extends B ? C : D;");
  const statement = sourceFile.statements[0]!;
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias declaration");
  const conditional = statement.type;
  if (!isConditionalTypeNode(conditional)) throw new Error("Expected conditional type node");
  assert.ok((conditional.extendsType.flags & NodeFlags.DisallowConditionalTypesContext) !== 0);
  assert.ok(!((conditional.trueType.flags & NodeFlags.DisallowConditionalTypesContext) !== 0));
  assert.ok(!((conditional.falseType.flags & NodeFlags.DisallowConditionalTypesContext) !== 0));
});

// `for (a + b; ;) ;` -> the for-initializer expression is parsed in DisallowInContext, so a
// node finished inside it carries the DisallowIn bit.
test("for initializer expression carries disallow in", () => {
  const sourceFile = parseSourceFile("for (a + b; ;) ;");
  const statement = sourceFile.statements[0]!;
  if (!isForStatement(statement)) throw new Error("Expected for statement");
  const initializer = statement.initializer;
  if (initializer === undefined) throw new Error("Expected for initializer");
  assert.ok((initializer.flags & NodeFlags.DisallowInContext) !== 0);
});

// `f(a in b);` -> the call argument clears DisallowInContext|DecoratorContext (tsgo
// parseArgumentExpression), so the `in` binary expression inside the argument list is NOT
// in DisallowIn context (the `in` is a binary operator, not a for-in separator).
test("call argument clears disallow in context", () => {
  const sourceFile = parseSourceFile("f(a in b);");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
  const call = statement.expression;
  if (!isCallExpression(call)) throw new Error("Expected call expression");
  const argument = call.arguments[0]!;
  if (!isBinaryExpression(argument)) throw new Error("Expected binary `in` argument");
  assert.strictEqual(argument.operatorToken.kind, Kind.InKeyword);
  assert.ok(!((argument.flags & NodeFlags.DisallowInContext) !== 0));
});

// `with (o) x;` -> the with-statement body (and nodes finished inside it) are parsed in
// InWithStatement context (tsgo parseWithStatement wraps the body statement).
test("with statement body carries in with statement", () => {
  const sourceFile = parseSourceFile("with (o) x;");
  const statement = sourceFile.statements[0]!;
  if (!isWithStatement(statement)) throw new Error("Expected with statement");
  assert.ok((statement.statement.flags & NodeFlags.InWithStatement) !== 0);
  // The `with` expression (parsed OUTSIDE the body wrap) does NOT carry InWithStatement.
  assert.ok(!((statement.expression.flags & NodeFlags.InWithStatement) !== 0));
});

// `@dec class X {}` -> the decorator expression is parsed in DecoratorContext (tsgo
// parseDecorator wraps the decorator expression).
test("decorator expression carries decorator context", () => {
  const sourceFile = parseSourceFile("@dec class X {}");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const decorator = statement.modifiers![0]!;
  if (!isDecorator(decorator)) throw new Error("Expected decorator modifier");
  assert.ok((decorator.expression.flags & NodeFlags.DecoratorContext) !== 0);
});

// `class C { static { x; } }` -> the static-block body is parsed with AwaitContext=true and
// YieldContext=false (tsgo parseClassStaticBlockBody).
test("static block body carries await context", () => {
  const sourceFile = parseSourceFile("class C { static { x; } }");
  const statement = sourceFile.statements[0]!;
  if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
  const member = statement.members[0]!;
  if (!isClassStaticBlockDeclaration(member)) throw new Error("Expected class static block");
  assert.ok((member.body.flags & NodeFlags.AwaitContext) !== 0);
  assert.ok(!((member.body.flags & NodeFlags.YieldContext) !== 0));
  const inner = member.body.statements[0]!;
  assert.ok((inner.flags & NodeFlags.AwaitContext) !== 0);
  assert.ok(!((inner.flags & NodeFlags.YieldContext) !== 0));
});
