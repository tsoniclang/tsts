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
  isArrowFunction,
  isAsExpression,
  isAwaitExpression,
  isBinaryExpression,
  isCallExpression,
  isConditionalExpression,
  isElementAccessExpression,
  isExpressionStatement,
  isIdentifier,
  isLiteralTypeNode,
  isNonNullExpression,
  isNumericLiteral,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isSatisfiesExpression,
  isSpreadElement,
  isStringLiteral,
  isTemplateExpression,
  isTypeAliasDeclaration,
  isTypeOfExpression,
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

  // Negative-literal `-1` in TYPE position (Stage-1a-deferred): the inner numeric
  // literal and the PrefixUnaryExpression wrapper are both stamped. In
  // `type T = -1;` the '-' is at index 9 and the '1' at index 10, so the prefix
  // wrapper covers [9,11) and the inner literal covers [10,11).
  negative_literal_prefix_unary_in_type_is_stamped(): void {
    const sourceFile = parseSourceFile("type T = -1;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const literalType = statement.type;
    if (!isLiteralTypeNode(literalType)) throw new Exception("Expected literal type node");
    const unary = literalType.literal;
    if (!isPrefixUnaryExpression(unary)) throw new Exception("Expected prefix unary expression");

    Assert.Equal(9, unary.pos);
    Assert.Equal(11, unary.end);
    const operand = unary.operand;
    if (!isNumericLiteral(operand)) throw new Exception("Expected numeric literal operand");
    Assert.Equal(10, operand.pos);
    Assert.Equal(11, operand.end);
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
