// position.test.ts — codex-048 Stage-1a probe. Pins that the parser now stamps
// real token-tight pos/end ranges onto literal + identifier leaf nodes via the
// #finishNode helper (mirroring tsgo internal/parser/parser.go finishNode,
// 5904-5917, MINUS the error-flag bit which is Stage 3). Before Stage 1a these
// leaves carried the factory default pos/end == -1; these probes would have
// failed against that state and now pass against the stamped ranges.
//
// nodeEnd is token-tight per codex-048 (i): the end of the just-consumed token,
// NOT the trivia-inclusive Scanner TokenFullStart (a tracked Stage-4 item).

import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  isArrayLiteralExpression,
  isArrayTypeNode,
  isArrowFunction,
  isAsExpression,
  isAwaitExpression,
  isBigIntLiteral,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isCaseBlock,
  isCaseClause,
  isCatchClause,
  isConditionalExpression,
  isConditionalTypeNode,
  isConstructorTypeNode,
  isElementAccessExpression,
  isExportDeclaration,
  isExpressionStatement,
  isForStatement,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isIndexedAccessTypeNode,
  isInterfaceDeclaration,
  isIntersectionTypeNode,
  isKeywordExpression,
  isKeywordTypeNode,
  isLiteralTypeNode,
  isNamedExports,
  isNonNullExpression,
  isNumericLiteral,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isParenthesizedTypeNode,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isQualifiedName,
  isReturnStatement,
  isSatisfiesExpression,
  isSpreadElement,
  isStringLiteral,
  isSwitchStatement,
  isTemplateExpression,
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
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";

export class ParserPositionTests {
  // `x` -> Identifier covers exactly the single character: pos 0, end 1.
  stamps_identifier_leaf_with_token_tight_range(): void {
    const sourceFile = parseSourceFile("x");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isIdentifier(expression)) throw new Exception("Expected identifier");

    Assert.Equal(0, expression.pos);
    Assert.Equal(1, expression.end);
  }

  // `"hi"` -> StringLiteral range covers the quotes: pos 0, end 4.
  stamps_string_literal_leaf_covering_the_quotes(): void {
    const sourceFile = parseSourceFile("\"hi\"");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isStringLiteral(expression)) throw new Exception("Expected string literal");

    Assert.Equal(0, expression.pos);
    Assert.Equal(4, expression.end);
  }

  // `42` -> NumericLiteral range covers both digits: pos 0, end 2.
  stamps_numeric_literal_leaf_with_token_tight_range(): void {
    const sourceFile = parseSourceFile("42");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isNumericLiteral(expression)) throw new Exception("Expected numeric literal");

    Assert.Equal(0, expression.pos);
    Assert.Equal(2, expression.end);
  }

  // An identifier that does not start at offset 0 must carry its real start,
  // proving nodePos captures the current token start (not a constant 0).
  stamps_identifier_at_non_zero_offset(): void {
    const sourceFile = parseSourceFile("  abc");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const expression = statement.expression;
    if (!isIdentifier(expression)) throw new Exception("Expected identifier");

    Assert.Equal(2, expression.pos);
    Assert.Equal(5, expression.end);
    Assert.Equal("abc", expression.text);
  }

  // Both leaves of a binary expression carry real token-tight ranges, not the
  // factory default pos/end == -1. `foo + 7`: foo @ [0,3), 7 @ [6,7).
  literal_and_identifier_leaves_are_not_synthesized(): void {
    const sourceFile = parseSourceFile("foo + 7");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");

    const binary = statement.expression;
    if (!isBinaryExpression(binary)) throw new Exception("Expected binary expression");

    const left = binary.left;
    if (!isIdentifier(left)) throw new Exception("Expected identifier on the left");
    Assert.Equal(0, left.pos);
    Assert.Equal(3, left.end);

    const right = binary.right;
    if (!isNumericLiteral(right)) throw new Exception("Expected numeric literal on the right");
    Assert.Equal(6, right.pos);
    Assert.Equal(7, right.end);
  }

  // Stage 1b: the BinaryExpression node itself spans the whole `a+b`: [0,3).
  // Its start is the LEFT operand's start (tsgo makeBinaryExpression uses pos).
  binary_expression_spans_whole_range_starting_at_left(): void {
    const sourceFile = parseSourceFile("a+b");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const binary = statement.expression;
    if (!isBinaryExpression(binary)) throw new Exception("Expected binary expression");

    Assert.Equal(0, binary.pos);
    Assert.Equal(3, binary.end);
    Assert.Equal(0, binary.left.pos);
  }

  // Left-associative nesting: `a+b+c` -> ((a+b)+c). The outer node spans [0,5);
  // the inner (a+b) spans [0,3); both starts equal their respective left.pos.
  nested_binary_left_assoc_starts_match_left_pos(): void {
    const sourceFile = parseSourceFile("a+b+c");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const outer = statement.expression;
    if (!isBinaryExpression(outer)) throw new Exception("Expected outer binary expression");
    Assert.Equal(0, outer.pos);
    Assert.Equal(5, outer.end);
    Assert.Equal(outer.left.pos, outer.pos);

    const inner = outer.left;
    if (!isBinaryExpression(inner)) throw new Exception("Expected inner binary expression");
    Assert.Equal(0, inner.pos);
    Assert.Equal(3, inner.end);
    Assert.Equal(inner.left.pos, inner.pos);
  }

  // Call expression `f(x)`: the node spans [0,4), end covering the closing ')'.
  // Start is threaded from the callee base (tsgo parseCallExpressionRest pos).
  call_expression_spans_whole_range_through_closing_paren(): void {
    const sourceFile = parseSourceFile("f(x)");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const call = statement.expression;
    if (!isCallExpression(call)) throw new Exception("Expected call expression");

    Assert.Equal(0, call.pos);
    Assert.Equal(4, call.end);
    Assert.Equal(call.expression.pos, call.pos);
  }

  // Property access `a.b`: node spans [0,3), start threaded from the base `a`.
  property_access_spans_whole_range_from_base(): void {
    const sourceFile = parseSourceFile("a.b");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const access = statement.expression;
    if (!isPropertyAccessExpression(access)) throw new Exception("Expected property access");

    Assert.Equal(0, access.pos);
    Assert.Equal(3, access.end);
    Assert.Equal(access.expression.pos, access.pos);
  }

  // Element access `a[0]`: node spans [0,4), end covers the closing ']'.
  element_access_spans_whole_range_through_closing_bracket(): void {
    const sourceFile = parseSourceFile("a[0]");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const access = statement.expression;
    if (!isElementAccessExpression(access)) throw new Exception("Expected element access");

    Assert.Equal(0, access.pos);
    Assert.Equal(4, access.end);
    Assert.Equal(access.expression.pos, access.pos);
  }

  // Non-null `a!`: node spans [0,2), start threaded from the base `a`.
  non_null_expression_spans_whole_range_from_base(): void {
    const sourceFile = parseSourceFile("a!");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const nonNull = statement.expression;
    if (!isNonNullExpression(nonNull)) throw new Exception("Expected non-null expression");

    Assert.Equal(0, nonNull.pos);
    Assert.Equal(2, nonNull.end);
    Assert.Equal(nonNull.expression.pos, nonNull.pos);
  }

  // Chained member/call `a.b(c)`: outer call spans [0,6) (through ')'),
  // the inner property access spans [0,3); both start at the base `a`.
  chained_member_call_threads_base_start(): void {
    const sourceFile = parseSourceFile("a.b(c)");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const call = statement.expression;
    if (!isCallExpression(call)) throw new Exception("Expected call expression");
    Assert.Equal(0, call.pos);
    Assert.Equal(6, call.end);

    const callee = call.expression;
    if (!isPropertyAccessExpression(callee)) throw new Exception("Expected property access callee");
    Assert.Equal(0, callee.pos);
    Assert.Equal(3, callee.end);
  }

  // Prefix unary `-x` (expression position via `(-x)` to avoid the type path):
  // the prefix node starts at the '-' operator and spans [1,3) inside the parens.
  prefix_unary_starts_at_operator(): void {
    const sourceFile = parseSourceFile("(-x)");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const paren = statement.expression;
    if (!isParenthesizedExpression(paren)) throw new Exception("Expected parenthesized expression");
    const unary = paren.expression;
    if (!isPrefixUnaryExpression(unary)) throw new Exception("Expected prefix unary expression");

    Assert.Equal(1, unary.pos);
    Assert.Equal(3, unary.end);
    Assert.Equal(2, unary.operand.pos);
  }

  // Postfix unary `x++`: node spans [0,3), start = operand (LHS) start.
  postfix_unary_starts_at_operand(): void {
    const sourceFile = parseSourceFile("x++");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const unary = statement.expression;
    if (!isPostfixUnaryExpression(unary)) throw new Exception("Expected postfix unary expression");

    Assert.Equal(0, unary.pos);
    Assert.Equal(3, unary.end);
    Assert.Equal(unary.operand.pos, unary.pos);
  }

  // Parenthesized `(x)`: node spans [0,3), end covering the closing ')'.
  parenthesized_expression_spans_through_closing_paren(): void {
    const sourceFile = parseSourceFile("(x)");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const paren = statement.expression;
    if (!isParenthesizedExpression(paren)) throw new Exception("Expected parenthesized expression");

    Assert.Equal(0, paren.pos);
    Assert.Equal(3, paren.end);
  }

  // Array literal `[1,2]`: node spans [0,5), end covering the closing ']'.
  array_literal_spans_through_closing_bracket(): void {
    const sourceFile = parseSourceFile("[1,2]");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const array = statement.expression;
    if (!isArrayLiteralExpression(array)) throw new Exception("Expected array literal");

    Assert.Equal(0, array.pos);
    Assert.Equal(5, array.end);
  }

  // Object literal `{a:1}`: node spans [0,5), end covering the closing '}'.
  // The property assignment element spans [1,4).
  object_literal_spans_through_closing_brace(): void {
    const sourceFile = parseSourceFile("({a:1})");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const paren = statement.expression;
    if (!isParenthesizedExpression(paren)) throw new Exception("Expected parenthesized expression");
    const object = paren.expression;
    if (!isObjectLiteralExpression(object)) throw new Exception("Expected object literal");

    Assert.Equal(1, object.pos);
    Assert.Equal(6, object.end);
    const property = object.properties[0]!;
    Assert.Equal(2, property.pos);
    Assert.Equal(5, property.end);
  }

  // Spread element `f(...x)`: the spread node spans [2,6), starting at '...'.
  spread_element_starts_at_dotdotdot(): void {
    const sourceFile = parseSourceFile("f(...x)");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const call = statement.expression;
    if (!isCallExpression(call)) throw new Exception("Expected call expression");
    const spread = call.arguments[0]!;
    if (!isSpreadElement(spread)) throw new Exception("Expected spread element");

    Assert.Equal(2, spread.pos);
    Assert.Equal(6, spread.end);
  }

  // Conditional `c?d:e`: node spans [0,5), start = condition start.
  conditional_expression_spans_whole_range(): void {
    const sourceFile = parseSourceFile("c?d:e");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const conditional = statement.expression;
    if (!isConditionalExpression(conditional)) throw new Exception("Expected conditional expression");

    Assert.Equal(0, conditional.pos);
    Assert.Equal(5, conditional.end);
    Assert.Equal(conditional.condition.pos, conditional.pos);
  }

  // As expression `x as T`: node spans [0,6), start = left operand start.
  as_expression_spans_whole_range_from_left(): void {
    const sourceFile = parseSourceFile("x as T");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const asExpr = statement.expression;
    if (!isAsExpression(asExpr)) throw new Exception("Expected as expression");

    Assert.Equal(0, asExpr.pos);
    Assert.Equal(6, asExpr.end);
    Assert.Equal(asExpr.expression.pos, asExpr.pos);
  }

  // Satisfies expression `x satisfies T`: node spans [0,13), start = left start.
  satisfies_expression_spans_whole_range_from_left(): void {
    const sourceFile = parseSourceFile("x satisfies T");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const satisfiesExpr = statement.expression;
    if (!isSatisfiesExpression(satisfiesExpr)) throw new Exception("Expected satisfies expression");

    Assert.Equal(0, satisfiesExpr.pos);
    Assert.Equal(13, satisfiesExpr.end);
    Assert.Equal(satisfiesExpr.expression.pos, satisfiesExpr.pos);
  }

  // Arrow function `x => x`: node spans [0,6), start at the parameter.
  arrow_function_spans_whole_range(): void {
    const sourceFile = parseSourceFile("x => x");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const arrow = statement.expression;
    if (!isArrowFunction(arrow)) throw new Exception("Expected arrow function");

    Assert.Equal(0, arrow.pos);
    Assert.Equal(6, arrow.end);
    const param = arrow.parameters[0]!;
    Assert.Equal(0, param.pos);
    Assert.Equal(1, param.end);
  }

  // await expression `await x`: node spans [0,7), start at the 'await' keyword.
  await_expression_starts_at_keyword(): void {
    const sourceFile = parseSourceFile("await x");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const awaitExpr = statement.expression;
    if (!isAwaitExpression(awaitExpr)) throw new Exception("Expected await expression");

    Assert.Equal(0, awaitExpr.pos);
    Assert.Equal(7, awaitExpr.end);
    Assert.Equal(6, awaitExpr.expression.pos);
  }

  // typeof expression `typeof x`: node spans [0,8), start at the 'typeof' keyword.
  typeof_expression_starts_at_keyword(): void {
    const sourceFile = parseSourceFile("typeof x");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const typeofExpr = statement.expression;
    if (!isTypeOfExpression(typeofExpr)) throw new Exception("Expected typeof expression");

    Assert.Equal(0, typeofExpr.pos);
    Assert.Equal(8, typeofExpr.end);
    Assert.Equal(7, typeofExpr.expression.pos);
  }

  // Template expression `` `x${y}z` ``: node spans the whole literal [0,8); the
  // single span (the `${y}z` portion) starts at the span expression `y` (pos 4,
  // since backtick=0 x=1 $=2 {=3 y=4) and ends after the tail (end 8).
  template_expression_spans_whole_range_with_span(): void {
    const sourceFile = parseSourceFile("`x${y}z`");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");
    const template = statement.expression;
    if (!isTemplateExpression(template)) throw new Exception("Expected template expression");

    Assert.Equal(0, template.pos);
    Assert.Equal(8, template.end);
    const span = template.templateSpans[0]!;
    Assert.Equal(span.expression.pos, span.pos);
    Assert.Equal(4, span.pos);
    Assert.Equal(8, span.end);
  }

  // Negative-literal `-1` in TYPE position: the inner numeric literal and the
  // PrefixUnaryExpression wrapper (Stage 1b) AND the LiteralTypeNode wrapper
  // (Stage 1d) are all stamped, sharing the '-' start. In `type T = -1;` the '-'
  // is at index 9 and the '1' at index 10, so the LiteralTypeNode + prefix wrapper
  // cover [9,11) and the inner literal covers [10,11).
  negative_literal_prefix_unary_in_type_is_stamped(): void {
    const sourceFile = parseSourceFile("type T = -1;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");
    Assert.Equal(9, literalType.pos);
    Assert.Equal(11, literalType.end);
    const unary = literalType.literal;
    if (!isPrefixUnaryExpression(unary)) throw new Exception("Expected prefix unary expression");

    Assert.Equal(9, unary.pos);
    Assert.Equal(11, unary.end);
    const operand = unary.operand;
    if (!isNumericLiteral(operand)) throw new Exception("Expected numeric literal operand");
    Assert.Equal(10, operand.pos);
    Assert.Equal(11, operand.end);
  }

  // Stage 1d: `type X = A|B;` -> the UnionTypeNode spans the two constituents,
  // starting at `A` (index 9) and ending after `B` (index 12). Each constituent is
  // a TypeReference stamped token-tight.
  union_type_spans_constituents(): void {
    const sourceFile = parseSourceFile("type X = A|B;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const union = statement.type;
    if (!isUnionTypeNode(union)) throw new Exception("Expected union type node");

    Assert.Equal(9, union.pos);
    Assert.Equal(12, union.end);
    const first = union.types[0]!;
    Assert.Equal(9, first.pos);
    Assert.Equal(10, first.end);
    const second = union.types[1]!;
    Assert.Equal(11, second.pos);
    Assert.Equal(12, second.end);
  }

  // Stage 1d: single-constituent passthrough must NOT re-stamp. `type X = A;` ->
  // the type is the bare TypeReference `A` [9,10), not a UnionTypeNode.
  union_single_constituent_passes_through_unwrapped(): void {
    const sourceFile = parseSourceFile("type X = A;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const type = statement.type;
    if (!isTypeReferenceNode(type)) throw new Exception("Expected type reference (unwrapped)");

    Assert.Equal(9, type.pos);
    Assert.Equal(10, type.end);
  }

  // Stage 1d: `type X = A&B;` -> IntersectionTypeNode spans [9,12).
  intersection_type_spans_constituents(): void {
    const sourceFile = parseSourceFile("type X = A&B;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const intersection = statement.type;
    if (!isIntersectionTypeNode(intersection)) throw new Exception("Expected intersection type node");

    Assert.Equal(9, intersection.pos);
    Assert.Equal(12, intersection.end);
    Assert.Equal(9, intersection.types[0]!.pos);
    Assert.Equal(12, intersection.types[1]!.end);
  }

  // Stage 1d: `type X = T[];` -> ArrayTypeNode starts at the LEFTMOST element type
  // `T` (index 9) and ends after the closing ']' (index 12). The element type `T`
  // spans [9,10).
  array_type_starts_at_element_and_covers_bracket(): void {
    const sourceFile = parseSourceFile("type X = T[];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const arrayType = statement.type;
    if (!isArrayTypeNode(arrayType)) throw new Exception("Expected array type node");

    Assert.Equal(9, arrayType.pos);
    Assert.Equal(12, arrayType.end);
    Assert.Equal(9, arrayType.elementType.pos);
    Assert.Equal(10, arrayType.elementType.end);
  }

  // Stage 1d: nested `type X = T[][];` -> the outer array starts at the SAME leftmost
  // `T` start (index 9, threaded) and ends after the second ']' (index 14); the inner
  // array spans [9,12).
  nested_array_type_threads_leftmost_start(): void {
    const sourceFile = parseSourceFile("type X = T[][];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const outer = statement.type;
    if (!isArrayTypeNode(outer)) throw new Exception("Expected outer array type node");
    Assert.Equal(9, outer.pos);
    Assert.Equal(14, outer.end);
    const inner = outer.elementType;
    if (!isArrayTypeNode(inner)) throw new Exception("Expected inner array type node");
    Assert.Equal(9, inner.pos);
    Assert.Equal(12, inner.end);
  }

  // Stage 1d: `type X = T[K];` -> IndexedAccessTypeNode starts at the leftmost object
  // type `T` (index 9) and ends after the closing ']' (index 13). The index type `K`
  // spans [11,12).
  indexed_access_type_starts_at_object_and_covers_bracket(): void {
    const sourceFile = parseSourceFile("type X = T[K];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const indexed = statement.type;
    if (!isIndexedAccessTypeNode(indexed)) throw new Exception("Expected indexed access type node");

    Assert.Equal(9, indexed.pos);
    Assert.Equal(13, indexed.end);
    Assert.Equal(9, indexed.objectType.pos);
    Assert.Equal(11, indexed.indexType.pos);
    Assert.Equal(12, indexed.indexType.end);
  }

  // Stage 1d: `type X = keyof T;` -> TypeOperatorNode starts at the `keyof` keyword
  // (index 9) and ends after the operand `T` (index 16). The operand spans [15,16).
  keyof_type_operator_starts_at_keyword(): void {
    const sourceFile = parseSourceFile("type X = keyof T;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const operator = statement.type;
    if (!isTypeOperatorNode(operator)) throw new Exception("Expected type operator node");

    Assert.Equal(9, operator.pos);
    Assert.Equal(16, operator.end);
    Assert.Equal(15, operator.type.pos);
    Assert.Equal(16, operator.type.end);
  }

  // Stage 1d: `type X = typeof y;` -> TypeQueryNode starts at the `typeof` keyword
  // (index 9) and ends after the entity name `y` (index 17).
  typeof_type_query_starts_at_keyword(): void {
    const sourceFile = parseSourceFile("type X = typeof y;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const query = statement.type;
    if (!isTypeQueryNode(query)) throw new Exception("Expected type query node");

    Assert.Equal(9, query.pos);
    Assert.Equal(17, query.end);
    Assert.Equal(16, query.exprName.pos);
    Assert.Equal(17, query.exprName.end);
  }

  // Stage 1d: `type X = this;` -> ThisTypeNode is token-tight [9,13).
  this_type_is_token_tight(): void {
    const sourceFile = parseSourceFile("type X = this;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const thisType = statement.type;
    if (!isThisTypeNode(thisType)) throw new Exception("Expected this type node");

    Assert.Equal(9, thisType.pos);
    Assert.Equal(13, thisType.end);
  }

  // Stage 1d: `type X = (A);` -> ParenthesizedTypeNode starts at the '(' (index 9)
  // and ends after the closing ')' (index 12). The inner type `A` spans [10,11).
  parenthesized_type_covers_parens(): void {
    const sourceFile = parseSourceFile("type X = (A);");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const paren = statement.type;
    if (!isParenthesizedTypeNode(paren)) throw new Exception("Expected parenthesized type node");

    Assert.Equal(9, paren.pos);
    Assert.Equal(12, paren.end);
    Assert.Equal(10, paren.type.pos);
    Assert.Equal(11, paren.type.end);
  }

  // Stage 1d: `type X = [A,B];` -> TupleTypeNode starts at the '[' (index 9) and ends
  // after the closing ']' (index 14). The first element `A` spans [10,11).
  tuple_type_covers_brackets(): void {
    const sourceFile = parseSourceFile("type X = [A,B];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const tuple = statement.type;
    if (!isTupleTypeNode(tuple)) throw new Exception("Expected tuple type node");

    Assert.Equal(9, tuple.pos);
    Assert.Equal(14, tuple.end);
    Assert.Equal(10, tuple.elements[0]!.pos);
    Assert.Equal(11, tuple.elements[0]!.end);
  }

  // Stage 1d: `type X = {a:number};` -> TypeLiteralNode starts at the '{' (index 9)
  // and ends after the closing '}' (index 19).
  type_literal_covers_braces(): void {
    const sourceFile = parseSourceFile("type X = {a:number};");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literal = statement.type;
    if (!isTypeLiteralNode(literal)) throw new Exception("Expected type literal node");

    Assert.Equal(9, literal.pos);
    Assert.Equal(19, literal.end);
  }

  // Stage 1d: `type X = number;` -> KeywordTypeNode is token-tight [9,15).
  keyword_type_is_token_tight(): void {
    const sourceFile = parseSourceFile("type X = number;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const keyword = statement.type;
    if (!isKeywordTypeNode(keyword)) throw new Exception("Expected keyword type node");

    Assert.Equal(9, keyword.pos);
    Assert.Equal(15, keyword.end);
  }

  // Stage 1d: `type X = "s";` -> LiteralTypeNode wrapper shares the inner string-literal
  // leaf's range [9,12) (the leaf covers the quotes).
  string_literal_type_wrapper_shares_leaf_range(): void {
    const sourceFile = parseSourceFile("type X = \"s\";");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");

    Assert.Equal(9, literalType.pos);
    Assert.Equal(12, literalType.end);
    const leaf = literalType.literal;
    if (!isStringLiteral(leaf)) throw new Exception("Expected string literal leaf");
    Assert.Equal(9, leaf.pos);
    Assert.Equal(12, leaf.end);
  }

  // Stage 1d: `type X = 1;` -> LiteralTypeNode wrapper AND inner numeric leaf both
  // stamped [9,10).
  numeric_literal_type_wrapper_and_leaf_stamped(): void {
    const sourceFile = parseSourceFile("type X = 1;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");

    Assert.Equal(9, literalType.pos);
    Assert.Equal(10, literalType.end);
    const leaf = literalType.literal;
    if (!isNumericLiteral(leaf)) throw new Exception("Expected numeric literal leaf");
    Assert.Equal(9, leaf.pos);
    Assert.Equal(10, leaf.end);
  }

  // Stage 1d: `type X = 1n;` -> LiteralTypeNode wrapper AND inner bigint leaf both
  // stamped [9,11).
  bigint_literal_type_wrapper_and_leaf_stamped(): void {
    const sourceFile = parseSourceFile("type X = 1n;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");

    Assert.Equal(9, literalType.pos);
    Assert.Equal(11, literalType.end);
    const leaf = literalType.literal;
    if (!isBigIntLiteral(leaf)) throw new Exception("Expected bigint literal leaf");
    Assert.Equal(9, leaf.pos);
    Assert.Equal(11, leaf.end);
  }

  // Stage 1d: `type X = true;` -> LiteralTypeNode wrapper AND inner keyword-expression
  // leaf both stamped [9,13).
  true_literal_type_wrapper_and_leaf_stamped(): void {
    const sourceFile = parseSourceFile("type X = true;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");

    Assert.Equal(9, literalType.pos);
    Assert.Equal(13, literalType.end);
    const leaf = literalType.literal;
    if (!isKeywordExpression(leaf)) throw new Exception("Expected keyword expression leaf");
    Assert.Equal(9, leaf.pos);
    Assert.Equal(13, leaf.end);
  }

  // Stage 1d: `type X = null;` -> LiteralTypeNode wrapper AND inner keyword-expression
  // leaf both stamped [9,13).
  null_literal_type_wrapper_and_leaf_stamped(): void {
    const sourceFile = parseSourceFile("type X = null;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");

    Assert.Equal(9, literalType.pos);
    Assert.Equal(13, literalType.end);
    const leaf = literalType.literal;
    if (!isKeywordExpression(leaf)) throw new Exception("Expected keyword expression leaf");
    Assert.Equal(9, leaf.pos);
    Assert.Equal(13, leaf.end);
  }

  // Stage 1d: `type X = Y<Z>;` -> TypeReferenceNode starts at the type name `Y`
  // (index 9) and ends after the closing '>' (index 13). The type-argument `Z`
  // spans [11,12).
  type_reference_with_type_arguments_covers_angle(): void {
    const sourceFile = parseSourceFile("type X = Y<Z>;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const reference = statement.type;
    if (!isTypeReferenceNode(reference)) throw new Exception("Expected type reference node");

    Assert.Equal(9, reference.pos);
    Assert.Equal(13, reference.end);
    const arg = reference.typeArguments![0]!;
    Assert.Equal(11, arg.pos);
    Assert.Equal(12, arg.end);
  }

  // Stage 1d: nested generics `type X = A<B<C>>;` -> the '>>' token is split; the
  // outer reference ends after the final '>' (index 16) and the inner B<C> ends at
  // the first '>' (index 15). Verifies #expectGreaterThan split-token ends are
  // off-by-one-correct.
  nested_generic_type_arguments_split_greater_than(): void {
    const sourceFile = parseSourceFile("type X = A<B<C>>;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const outer = statement.type;
    if (!isTypeReferenceNode(outer)) throw new Exception("Expected outer type reference node");
    Assert.Equal(9, outer.pos);
    Assert.Equal(16, outer.end);
    const inner = outer.typeArguments![0]!;
    if (!isTypeReferenceNode(inner)) throw new Exception("Expected inner type reference node");
    Assert.Equal(11, inner.pos);
    Assert.Equal(15, inner.end);
  }

  // Stage 1d: `type X = a.b;` -> the type reference's name is a QualifiedName whose
  // start is the LEFTMOST identifier `a` (index 9), ending after `b` (index 12).
  qualified_name_threads_leftmost_start(): void {
    const sourceFile = parseSourceFile("type X = a.b;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const reference = statement.type;
    if (!isTypeReferenceNode(reference)) throw new Exception("Expected type reference node");
    const name = reference.typeName;
    if (!isQualifiedName(name)) throw new Exception("Expected qualified name");

    Assert.Equal(9, name.pos);
    Assert.Equal(12, name.end);
    Assert.Equal(9, name.left.pos);
    Assert.Equal(11, name.right.pos);
  }

  // Stage 1d: dotted `type X = a.b.c;` -> the outer QualifiedName starts at the
  // leftmost `a` (index 9, threaded) and ends after `c` (index 14); the nested
  // left QualifiedName `a.b` spans [9,12).
  nested_qualified_name_threads_single_start(): void {
    const sourceFile = parseSourceFile("type X = a.b.c;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const reference = statement.type;
    if (!isTypeReferenceNode(reference)) throw new Exception("Expected type reference node");
    const outer = reference.typeName;
    if (!isQualifiedName(outer)) throw new Exception("Expected outer qualified name");
    Assert.Equal(9, outer.pos);
    Assert.Equal(14, outer.end);
    const left = outer.left;
    if (!isQualifiedName(left)) throw new Exception("Expected nested qualified name");
    Assert.Equal(9, left.pos);
    Assert.Equal(12, left.end);
  }

  // Stage 1d: `type X = (a:T)=>R;` -> FunctionTypeNode starts at the '(' (index 9)
  // and ends after the return type `R` (index 17).
  function_type_paren_path_spans_to_return(): void {
    const sourceFile = parseSourceFile("type X = (a:T)=>R;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const fn = statement.type;
    if (!isFunctionTypeNode(fn)) throw new Exception("Expected function type node");

    Assert.Equal(9, fn.pos);
    Assert.Equal(17, fn.end);
    Assert.Equal(16, fn.type!.pos);
    Assert.Equal(17, fn.type!.end);
  }

  // Stage 1d: `type X = <T>()=>R;` -> FunctionTypeNode (generic path) starts at the
  // '<' (index 9) and ends after the return type `R` (index 17).
  function_type_generic_path_starts_at_angle(): void {
    const sourceFile = parseSourceFile("type X = <T>()=>R;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const fn = statement.type;
    if (!isFunctionTypeNode(fn)) throw new Exception("Expected function type node");

    Assert.Equal(9, fn.pos);
    Assert.Equal(17, fn.end);
    const tp = fn.typeParameters![0]!;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected type parameter declaration");
    Assert.Equal(10, tp.pos);
    Assert.Equal(11, tp.end);
  }

  // Stage 1d: `type X = new()=>R;` -> ConstructorTypeNode starts at the `new` keyword
  // (index 9) and ends after the return type `R` (index 17).
  constructor_type_starts_at_new_keyword(): void {
    const sourceFile = parseSourceFile("type X = new()=>R;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const ctor = statement.type;
    if (!isConstructorTypeNode(ctor)) throw new Exception("Expected constructor type node");

    Assert.Equal(9, ctor.pos);
    Assert.Equal(17, ctor.end);
    Assert.Equal(16, ctor.type!.pos);
    Assert.Equal(17, ctor.type!.end);
  }

  // Stage 1d: `type X = A extends B?C:D;` -> ConditionalTypeNode starts at the
  // checkType `A` (index 9) and ends after the falseType `D` (index 24). Children
  // are stamped token-tight.
  conditional_type_spans_check_through_false(): void {
    const sourceFile = parseSourceFile("type X = A extends B?C:D;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const conditional = statement.type;
    if (!isConditionalTypeNode(conditional)) throw new Exception("Expected conditional type node");

    Assert.Equal(9, conditional.pos);
    Assert.Equal(24, conditional.end);
    Assert.Equal(9, conditional.checkType.pos);
    Assert.Equal(23, conditional.falseType.pos);
    Assert.Equal(24, conditional.falseType.end);
  }

  // Stage 1d: `function f(x): x is T {}` -> the return type is a TypePredicateNode
  // starting at the parameter name `x` (index 15) and ending after the predicate
  // type `T` (index 21). The predicate `x` is at 15, `is` at 17, `T` at 20.
  type_predicate_is_path_spans_param_through_type(): void {
    const sourceFile = parseSourceFile("function f(x): x is T {}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const predicate = statement.type;
    if (predicate === undefined || !isTypePredicateNode(predicate)) throw new Exception("Expected type predicate node");

    Assert.Equal(15, predicate.pos);
    Assert.Equal(21, predicate.end);
    Assert.Equal(15, predicate.parameterName.pos);
    Assert.Equal(20, predicate.type!.pos);
    Assert.Equal(21, predicate.type!.end);
  }

  // Stage 1d: `function f(x): asserts x {}` -> the return type is a TypePredicateNode
  // (asserts-only path) starting at the `asserts` keyword (index 15) and ending after
  // the parameter name `x` (index 24).
  type_predicate_asserts_path_starts_at_asserts(): void {
    const sourceFile = parseSourceFile("function f(x): asserts x {}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const predicate = statement.type;
    if (predicate === undefined || !isTypePredicateNode(predicate)) throw new Exception("Expected type predicate node");

    Assert.Equal(15, predicate.pos);
    Assert.Equal(24, predicate.end);
    Assert.Equal(23, predicate.parameterName.pos);
    Assert.Equal(24, predicate.parameterName.end);
  }

  // Stage 1d: `interface I<T extends U> {}` -> the TypeParameterDeclaration starts at
  // the name `T` (index 12) and ends after the constraint `U` (index 23).
  type_parameter_declaration_spans_name_through_constraint(): void {
    const sourceFile = parseSourceFile("interface I<T extends U> {}");
    const statement = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(statement)) throw new Exception("Expected interface declaration");
    const tp = statement.typeParameters![0]!;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected type parameter declaration");

    Assert.Equal(12, tp.pos);
    Assert.Equal(23, tp.end);
    Assert.Equal(22, tp.constraint!.pos);
    Assert.Equal(23, tp.constraint!.end);
  }

  // Stage 1c: `if(x){}` -> IfStatement spans [0,7); start at the `if` keyword, end
  // covering the empty then-block. The then-block `{}` spans [5,7).
  if_statement_spans_whole_range_from_keyword(): void {
    const sourceFile = parseSourceFile("if(x){}");
    const statement = sourceFile.statements[0]!;
    if (!isIfStatement(statement)) throw new Exception("Expected if statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(7, statement.end);
    const thenStatement = statement.thenStatement;
    if (!isBlock(thenStatement)) throw new Exception("Expected then block");
    Assert.Equal(5, thenStatement.pos);
    Assert.Equal(7, thenStatement.end);
  }

  // Stage 1c: `for(;;){}` -> ForStatement spans [0,9); start at the `for` keyword,
  // end covering the empty body block.
  for_statement_spans_whole_range_from_keyword(): void {
    const sourceFile = parseSourceFile("for(;;){}");
    const statement = sourceFile.statements[0]!;
    if (!isForStatement(statement)) throw new Exception("Expected for statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(9, statement.end);
  }

  // Stage 1c: `while(x){}` -> WhileStatement spans [0,10); start at the `while`
  // keyword, end covering the body block.
  while_statement_spans_whole_range_from_keyword(): void {
    const sourceFile = parseSourceFile("while(x){}");
    const statement = sourceFile.statements[0]!;
    if (!isWhileStatement(statement)) throw new Exception("Expected while statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(10, statement.end);
  }

  // Stage 1c: `return 1;` -> ReturnStatement spans [0,9); start at the `return`
  // keyword, end covering the trailing semicolon.
  return_statement_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("return 1;");
    const statement = sourceFile.statements[0]!;
    if (!isReturnStatement(statement)) throw new Exception("Expected return statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(9, statement.end);
  }

  // Stage 1c: `{a;}` -> Block spans [0,4); start at the `{`, end covering the `}`.
  // The inner expression statement `a;` spans [1,3).
  block_statement_spans_through_closing_brace(): void {
    const sourceFile = parseSourceFile("{a;}");
    const statement = sourceFile.statements[0]!;
    if (!isBlock(statement)) throw new Exception("Expected block statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(4, statement.end);
    const inner = statement.statements[0]!;
    if (!isExpressionStatement(inner)) throw new Exception("Expected inner expression statement");
    Assert.Equal(1, inner.pos);
    Assert.Equal(3, inner.end);
  }

  // Stage 1c: `const x=1;` -> VariableStatement spans [0,10); the declaration list
  // (no modifiers) shares the statement start at the `const` keyword and ends at the
  // initializer (end 9); the declaration `x=1` spans [6,9).
  variable_statement_and_declaration_ranges(): void {
    const sourceFile = parseSourceFile("const x=1;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(10, statement.end);
    const declarationList = statement.declarationList;
    if (!isVariableDeclarationList(declarationList)) throw new Exception("Expected variable declaration list");
    Assert.Equal(0, declarationList.pos);
    Assert.Equal(9, declarationList.end);
    const declaration = declarationList.declarations[0]!;
    if (!isVariableDeclaration(declaration)) throw new Exception("Expected variable declaration");
    Assert.Equal(6, declaration.pos);
    Assert.Equal(9, declaration.end);
  }

  // Stage 1c: `try{}catch{}` -> TryStatement spans [0,12); start at the `try`
  // keyword, end covering the catch block. The catch clause spans [5,12).
  try_statement_and_catch_clause_ranges(): void {
    const sourceFile = parseSourceFile("try{}catch{}");
    const statement = sourceFile.statements[0]!;
    if (!isTryStatement(statement)) throw new Exception("Expected try statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(12, statement.end);
    const catchClause = statement.catchClause!;
    if (!isCatchClause(catchClause)) throw new Exception("Expected catch clause");
    Assert.Equal(5, catchClause.pos);
    Assert.Equal(12, catchClause.end);
  }

  // Stage 1c: `switch(x){}` -> SwitchStatement spans [0,11); start at the `switch`
  // keyword, end covering the empty case block. The case block `{}` spans [9,11).
  switch_statement_and_case_block_ranges(): void {
    const sourceFile = parseSourceFile("switch(x){}");
    const statement = sourceFile.statements[0]!;
    if (!isSwitchStatement(statement)) throw new Exception("Expected switch statement");

    Assert.Equal(0, statement.pos);
    Assert.Equal(11, statement.end);
    const caseBlock = statement.caseBlock;
    if (!isCaseBlock(caseBlock)) throw new Exception("Expected case block");
    Assert.Equal(9, caseBlock.pos);
    Assert.Equal(11, caseBlock.end);
  }

  // Stage 1c: `switch(x){case 1:break;}` -> the case clause starts at the `case`
  // keyword (pos 10, after `switch(x){`) and ends after its `break;` statement
  // (end 23).
  switch_case_clause_starts_at_case_keyword(): void {
    const sourceFile = parseSourceFile("switch(x){case 1:break;}");
    const statement = sourceFile.statements[0]!;
    if (!isSwitchStatement(statement)) throw new Exception("Expected switch statement");
    const clause = statement.caseBlock.clauses[0]!;
    if (!isCaseClause(clause)) throw new Exception("Expected case clause");

    Assert.Equal(10, clause.pos);
    Assert.Equal(23, clause.end);
  }

  // Stage 1c: `import a from "m";` -> ImportDeclaration spans [0,18); start at the
  // `import` keyword, end covering the trailing semicolon.
  import_declaration_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("import a from \"m\";");
    const statement = sourceFile.statements[0]!;
    if (!isImportDeclaration(statement)) throw new Exception("Expected import declaration");

    Assert.Equal(0, statement.pos);
    Assert.Equal(18, statement.end);
  }

  // Stage 1c: `export {a};` -> ExportDeclaration spans [0,11); start at the `export`
  // keyword (the #parseStatement-top modifier pos), end covering the semicolon. The
  // NamedExports clause starts at the `{` (pos 7) and ends at the `}` (end 10).
  export_declaration_and_named_exports_ranges(): void {
    const sourceFile = parseSourceFile("export {a};");
    const statement = sourceFile.statements[0]!;
    if (!isExportDeclaration(statement)) throw new Exception("Expected export declaration");

    Assert.Equal(0, statement.pos);
    Assert.Equal(11, statement.end);
    const exportClause = statement.exportClause!;
    if (!isNamedExports(exportClause)) throw new Exception("Expected named exports");
    Assert.Equal(7, exportClause.pos);
    Assert.Equal(10, exportClause.end);
  }
}

A<ParserPositionTests>().method((t) => t.stamps_identifier_leaf_with_token_tight_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_string_literal_leaf_covering_the_quotes).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_numeric_literal_leaf_with_token_tight_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.stamps_identifier_at_non_zero_offset).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.literal_and_identifier_leaves_are_not_synthesized).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.binary_expression_spans_whole_range_starting_at_left).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.nested_binary_left_assoc_starts_match_left_pos).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.call_expression_spans_whole_range_through_closing_paren).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.property_access_spans_whole_range_from_base).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.element_access_spans_whole_range_through_closing_bracket).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.non_null_expression_spans_whole_range_from_base).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.chained_member_call_threads_base_start).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.prefix_unary_starts_at_operator).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.postfix_unary_starts_at_operand).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.parenthesized_expression_spans_through_closing_paren).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.array_literal_spans_through_closing_bracket).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.object_literal_spans_through_closing_brace).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.spread_element_starts_at_dotdotdot).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.conditional_expression_spans_whole_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.as_expression_spans_whole_range_from_left).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.satisfies_expression_spans_whole_range_from_left).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.arrow_function_spans_whole_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.await_expression_starts_at_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.typeof_expression_starts_at_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.template_expression_spans_whole_range_with_span).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.negative_literal_prefix_unary_in_type_is_stamped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.union_type_spans_constituents).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.union_single_constituent_passes_through_unwrapped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.intersection_type_spans_constituents).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.array_type_starts_at_element_and_covers_bracket).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.nested_array_type_threads_leftmost_start).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.indexed_access_type_starts_at_object_and_covers_bracket).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.keyof_type_operator_starts_at_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.typeof_type_query_starts_at_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.this_type_is_token_tight).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.parenthesized_type_covers_parens).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.tuple_type_covers_brackets).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.type_literal_covers_braces).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.keyword_type_is_token_tight).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.string_literal_type_wrapper_shares_leaf_range).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.numeric_literal_type_wrapper_and_leaf_stamped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.bigint_literal_type_wrapper_and_leaf_stamped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.true_literal_type_wrapper_and_leaf_stamped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.null_literal_type_wrapper_and_leaf_stamped).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.type_reference_with_type_arguments_covers_angle).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.nested_generic_type_arguments_split_greater_than).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.qualified_name_threads_leftmost_start).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.nested_qualified_name_threads_single_start).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.function_type_paren_path_spans_to_return).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.function_type_generic_path_starts_at_angle).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.constructor_type_starts_at_new_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.conditional_type_spans_check_through_false).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.type_predicate_is_path_spans_param_through_type).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.type_predicate_asserts_path_starts_at_asserts).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.type_parameter_declaration_spans_name_through_constraint).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.if_statement_spans_whole_range_from_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.for_statement_spans_whole_range_from_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.while_statement_spans_whole_range_from_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.return_statement_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.block_statement_spans_through_closing_brace).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.variable_statement_and_declaration_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.try_statement_and_catch_clause_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.switch_statement_and_case_block_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.switch_case_clause_starts_at_case_keyword).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_declaration_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.export_declaration_and_named_exports_ranges).add(FactAttribute);
