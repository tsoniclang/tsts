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
  Kind,
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
  isComputedPropertyName,
  isConditionalExpression,
  isConditionalTypeNode,
  isConstructSignatureDeclaration,
  isConstructorDeclaration,
  isConstructorTypeNode,
  isDebuggerStatement,
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

  // Stage 1e: `class C{ x=1; m(){} get g(){return 1} }` -> each class member is now
  // stamped token-tight. Property `x=1` [9,13) (start at name, end after ';');
  // method `m(){}` [14,19); get accessor `g` [20,37).
  class_members_property_method_get_accessor_ranges(): void {
    const sourceFile = parseSourceFile("class C{ x=1; m(){} get g(){return 1} }");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const property = statement.members[0]!;
    if (!isPropertyDeclaration(property)) throw new Exception("Expected property declaration");
    Assert.Equal(9, property.pos);
    Assert.Equal(13, property.end);
    const method = statement.members[1]!;
    if (!isMethodDeclaration(method)) throw new Exception("Expected method declaration");
    Assert.Equal(14, method.pos);
    Assert.Equal(19, method.end);
    const getter = statement.members[2]!;
    if (!isGetAccessorDeclaration(getter)) throw new Exception("Expected get accessor declaration");
    Assert.Equal(20, getter.pos);
    Assert.Equal(37, getter.end);
  }

  // Stage 1e: modifier-led member start covers the modifier, NOT the member keyword.
  // `interface I{ readonly a: number }` -> the property signature starts at `readonly`
  // (index 13), ending after `number` (index 31); the name `a` is at [22,23). This is
  // the load-bearing proof that pos is captured BEFORE parseModifiers.
  modifier_led_member_starts_at_modifier(): void {
    const sourceFile = parseSourceFile("interface I{ readonly a: number }");
    const statement = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(statement)) throw new Exception("Expected interface declaration");
    const member = statement.members[0]!;
    if (!isPropertySignatureDeclaration(member)) throw new Exception("Expected property signature");
    Assert.Equal(13, member.pos);
    Assert.Equal(31, member.end);
    const name = member.name;
    if (!isIdentifier(name)) throw new Exception("Expected identifier name");
    Assert.Equal(22, name.pos);
    Assert.Equal(23, name.end);
  }

  // Stage 1e: a static-modifier-led method `class C{ static m(){} }` starts at
  // `static` (index 9) and ends after the body (index 21).
  static_modifier_led_method_starts_at_modifier(): void {
    const sourceFile = parseSourceFile("class C{ static m(){} }");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const method = statement.members[0]!;
    if (!isMethodDeclaration(method)) throw new Exception("Expected method declaration");
    Assert.Equal(9, method.pos);
    Assert.Equal(21, method.end);
  }

  // Stage 1e: constructor + set accessor. `class C{ constructor(a){} set s(v){} }` ->
  // the constructor starts at `constructor` (index 9) and ends after its body; the set
  // accessor follows. The constructor's parameter `a` is stamped via #parseParameterDeclaration.
  class_constructor_and_set_accessor_ranges(): void {
    const sourceFile = parseSourceFile("class C{ constructor(a){} set s(v){} }");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const ctor = statement.members[0]!;
    if (!isConstructorDeclaration(ctor)) throw new Exception("Expected constructor declaration");
    Assert.Equal(9, ctor.pos);
    Assert.Equal(25, ctor.end);
    const param = ctor.parameters[0]!;
    if (!isParameterDeclaration(param)) throw new Exception("Expected parameter declaration");
    Assert.Equal(21, param.pos);
    Assert.Equal(22, param.end);
    const setter = statement.members[1]!;
    if (!isSetAccessorDeclaration(setter)) throw new Exception("Expected set accessor declaration");
    Assert.Equal(26, setter.pos);
    Assert.Equal(36, setter.end);
  }

  // Stage 1e: a bare `;` class member is a SemicolonClassElement. In `class C{ ; }`
  // the `;` is at index 9, so the element spans [9,10).
  semicolon_class_element_is_token_tight(): void {
    const sourceFile = parseSourceFile("class C{ ; }");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const member = statement.members[0]!;
    if (!isSemicolonClassElement(member)) throw new Exception("Expected semicolon class element");
    Assert.Equal(9, member.pos);
    Assert.Equal(10, member.end);
  }

  // Stage 1e: interface members. `interface I{ a:number; m(): void; [k:string]:number }`
  // -> property signature `a:number` [13,22); method signature `m(): void` [23,33);
  // index signature `[k:string]:number` [34,51).
  interface_property_method_index_signature_ranges(): void {
    const sourceFile = parseSourceFile("interface I{ a:number; m(): void; [k:string]:number }");
    const statement = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(statement)) throw new Exception("Expected interface declaration");
    const property = statement.members[0]!;
    if (!isPropertySignatureDeclaration(property)) throw new Exception("Expected property signature");
    Assert.Equal(13, property.pos);
    Assert.Equal(22, property.end);
    const method = statement.members[1]!;
    if (!isMethodSignatureDeclaration(method)) throw new Exception("Expected method signature");
    Assert.Equal(23, method.pos);
    Assert.Equal(33, method.end);
    const indexSig = statement.members[2]!;
    if (!isIndexSignatureDeclaration(indexSig)) throw new Exception("Expected index signature");
    Assert.Equal(34, indexSig.pos);
    Assert.Equal(51, indexSig.end);
    const indexParam = indexSig.parameters[0]!;
    if (!isParameterDeclaration(indexParam)) throw new Exception("Expected index parameter");
    Assert.Equal(35, indexParam.pos);
  }

  // Stage 1e: call & construct signatures. `interface I{ (a:number): void; new(): I }`
  // -> call signature [13,30) (own pos at the '('); construct signature [31,39) (own
  // pos at the `new` keyword, covering it).
  interface_call_and_construct_signature_ranges(): void {
    const sourceFile = parseSourceFile("interface I{ (a:number): void; new(): I }");
    const statement = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(statement)) throw new Exception("Expected interface declaration");
    const callSig = statement.members[0]!;
    if (!isCallSignatureDeclaration(callSig)) throw new Exception("Expected call signature");
    Assert.Equal(13, callSig.pos);
    Assert.Equal(30, callSig.end);
    const constructSig = statement.members[1]!;
    if (!isConstructSignatureDeclaration(constructSig)) throw new Exception("Expected construct signature");
    Assert.Equal(31, constructSig.pos);
    Assert.Equal(39, constructSig.end);
  }

  // Stage 1e: enum members. `enum E{A,B=2}` -> member `A` [7,8); member `B=2` [9,12)
  // (start at the name, end after the initializer).
  enum_member_ranges_cover_initializer(): void {
    const sourceFile = parseSourceFile("enum E{A,B=2}");
    const statement = sourceFile.statements[0]!;
    if (!isEnumDeclaration(statement)) throw new Exception("Expected enum declaration");
    const first = statement.members[0]!;
    if (!isEnumMember(first)) throw new Exception("Expected enum member");
    Assert.Equal(7, first.pos);
    Assert.Equal(8, first.end);
    const second = statement.members[1]!;
    if (!isEnumMember(second)) throw new Exception("Expected enum member");
    Assert.Equal(9, second.pos);
    Assert.Equal(12, second.end);
  }

  // Stage 1e: heritage clauses. `class C extends B implements I{}` -> the extends
  // clause starts at the `extends` keyword (index 8) and spans [8,17); the implements
  // clause starts at `implements` (index 18) and spans [18,30). Tokens preserved.
  heritage_clauses_start_at_extends_and_implements(): void {
    const sourceFile = parseSourceFile("class C extends B implements I{}");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const extendsClause = statement.heritageClauses![0]!;
    if (!isHeritageClause(extendsClause)) throw new Exception("Expected heritage clause");
    Assert.Equal(8, extendsClause.pos);
    Assert.Equal(17, extendsClause.end);
    Assert.Equal(Kind.ExtendsKeyword, extendsClause.token);
    const implementsClause = statement.heritageClauses![1]!;
    if (!isHeritageClause(implementsClause)) throw new Exception("Expected heritage clause");
    Assert.Equal(18, implementsClause.pos);
    Assert.Equal(30, implementsClause.end);
    Assert.Equal(Kind.ImplementsKeyword, implementsClause.token);
  }

  // Stage 1e: dotted heritage expression. `class C extends a.b.C{}` -> the inner
  // PropertyAccessExpression `a.b.C` threads the leftmost base start `a` (index 16)
  // and spans [16,21).
  heritage_dotted_property_access_threads_base_start(): void {
    const sourceFile = parseSourceFile("class C extends a.b.C{}");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const clause = statement.heritageClauses![0]!;
    const ewta = clause.types[0]!;
    const expression = ewta.expression;
    if (!isPropertyAccessExpression(expression)) throw new Exception("Expected property access expression");
    Assert.Equal(16, expression.pos);
    Assert.Equal(21, expression.end);
    Assert.Equal(expression.pos, ewta.pos);
  }

  // Stage 1e: parameter declarations. `function f(a:T, ...b:U[]){}` -> `a:T` [11,14);
  // the rest parameter `...b:U[]` starts at the '...' (index 16) and spans [16,24).
  parameter_declaration_ranges_including_rest(): void {
    const sourceFile = parseSourceFile("function f(a:T, ...b:U[]){}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const first = statement.parameters[0]!;
    if (!isParameterDeclaration(first)) throw new Exception("Expected parameter declaration");
    Assert.Equal(11, first.pos);
    Assert.Equal(14, first.end);
    const rest = statement.parameters[1]!;
    if (!isParameterDeclaration(rest)) throw new Exception("Expected rest parameter declaration");
    Assert.Equal(16, rest.pos);
    Assert.Equal(24, rest.end);
  }

  // Stage 1e: optional + defaulted parameters. `function f(a?: T, b: U = 1){}` ->
  // `a?: T` [11,16); `b: U = 1` [18,26) (end after the initializer).
  parameter_declaration_optional_and_default_ranges(): void {
    const sourceFile = parseSourceFile("function f(a?: T, b: U = 1){}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const optional = statement.parameters[0]!;
    if (!isParameterDeclaration(optional)) throw new Exception("Expected parameter declaration");
    Assert.Equal(11, optional.pos);
    Assert.Equal(16, optional.end);
    const defaulted = statement.parameters[1]!;
    if (!isParameterDeclaration(defaulted)) throw new Exception("Expected parameter declaration");
    Assert.Equal(18, defaulted.pos);
    Assert.Equal(26, defaulted.end);
  }

  // Stage 1e: object & array binding patterns as parameters.
  // `function f(a:T, {x}:O, [y]:A){}` -> object pattern `{x}` [16,19) with element
  // `x` [17,18); array pattern `[y]` [23,26) with element `y` [24,25).
  binding_pattern_parameters_and_elements_ranges(): void {
    const sourceFile = parseSourceFile("function f(a:T, {x}:O, [y]:A){}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const objParam = statement.parameters[1]!;
    const objPattern = objParam.name;
    if (!isObjectBindingPattern(objPattern)) throw new Exception("Expected object binding pattern");
    Assert.Equal(16, objPattern.pos);
    Assert.Equal(19, objPattern.end);
    const objElement = objPattern.elements[0]!;
    if (!isBindingElement(objElement)) throw new Exception("Expected binding element");
    Assert.Equal(17, objElement.pos);
    Assert.Equal(18, objElement.end);
    const arrParam = statement.parameters[2]!;
    const arrPattern = arrParam.name;
    if (!isArrayBindingPattern(arrPattern)) throw new Exception("Expected array binding pattern");
    Assert.Equal(23, arrPattern.pos);
    Assert.Equal(26, arrPattern.end);
    const arrElement = arrPattern.elements[0]!;
    if (!isBindingElement(arrElement)) throw new Exception("Expected binding element");
    Assert.Equal(24, arrElement.pos);
    Assert.Equal(25, arrElement.end);
  }

  // Stage 1e: array binding hole + rest. `function f([a, ,b]:A){}` -> the elided hole
  // (the second comma) gets a zero-length BindingElement at the comma position [15,16);
  // the surrounding elements `a` [12,13) and `b` [16,17) are stamped.
  array_binding_hole_and_elements_ranges(): void {
    const sourceFile = parseSourceFile("function f([a, ,b]:A){}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const pattern = statement.parameters[0]!.name;
    if (!isArrayBindingPattern(pattern)) throw new Exception("Expected array binding pattern");
    const a = pattern.elements[0]!;
    Assert.Equal(12, a.pos);
    Assert.Equal(13, a.end);
    const hole = pattern.elements[1]!;
    if (!isBindingElement(hole)) throw new Exception("Expected hole binding element");
    Assert.Equal(15, hole.pos);
    Assert.Equal(16, hole.end);
    const b = pattern.elements[2]!;
    Assert.Equal(16, b.pos);
    Assert.Equal(17, b.end);
  }

  // Stage 1e: rest element in an array binding pattern. `function f([...r]:A){}` ->
  // the rest element `...r` starts at the '...' (index 12) and spans [12,16).
  array_binding_rest_element_starts_at_dotdotdot(): void {
    const sourceFile = parseSourceFile("function f([...r]:A){}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    const pattern = statement.parameters[0]!.name;
    if (!isArrayBindingPattern(pattern)) throw new Exception("Expected array binding pattern");
    const rest = pattern.elements[0]!;
    if (!isBindingElement(rest)) throw new Exception("Expected rest binding element");
    Assert.Equal(12, rest.pos);
    Assert.Equal(16, rest.end);
  }

  // Stage 1e: computed property name. `class C{ [k]=1; }` -> the member's name is a
  // ComputedPropertyName starting at the '[' (index 9) and ending after the ']'
  // (index 12), spanning [9,12).
  computed_property_name_covers_brackets(): void {
    const sourceFile = parseSourceFile("class C{ [k]=1; }");
    const statement = sourceFile.statements[0]!;
    if (!isClassDeclaration(statement)) throw new Exception("Expected class declaration");
    const member = statement.members[0]!;
    if (!isPropertyDeclaration(member)) throw new Exception("Expected property declaration");
    const name = member.name;
    if (!isComputedPropertyName(name)) throw new Exception("Expected computed property name");
    Assert.Equal(9, name.pos);
    Assert.Equal(12, name.end);
  }

  // Stage 1f: a bare `;` parses to an EmptyStatement covering exactly the semicolon.
  empty_statement_covers_the_semicolon(): void {
    const sourceFile = parseSourceFile(";");
    const statement = sourceFile.statements[0]!;
    if (!isEmptyStatement(statement)) throw new Exception("Expected empty statement");
    Assert.Equal(0, statement.pos);
    Assert.Equal(1, statement.end);
  }

  // Stage 1f: `debugger;` parses to a DebuggerStatement spanning the keyword through the
  // trailing semicolon.
  debugger_statement_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("debugger;");
    const statement = sourceFile.statements[0]!;
    if (!isDebuggerStatement(statement)) throw new Exception("Expected debugger statement");
    Assert.Equal(0, statement.pos);
    Assert.Equal(9, statement.end);
  }

  // Stage 1f: `with (x) { y; }` parses to a WithStatement starting at the `with` keyword and
  // ending at the body block's closing brace; the body is a full statement.
  with_statement_spans_keyword_through_body(): void {
    const sourceFile = parseSourceFile("with (x) { y; }");
    const statement = sourceFile.statements[0]!;
    if (!isWithStatement(statement)) throw new Exception("Expected with statement");
    Assert.Equal(0, statement.pos);
    Assert.Equal(15, statement.end);
    Assert.Equal(6, statement.expression.pos);
    Assert.Equal(7, statement.expression.end);
    if (!isBlock(statement.statement)) throw new Exception("Expected block body");
  }

  // Stage 1f: `label: foo;` parses to a LabeledStatement whose label is an Identifier and whose
  // body is the trailing ExpressionStatement. The whole node spans label through the `;`.
  labeled_statement_spans_label_through_body(): void {
    const sourceFile = parseSourceFile("label: foo;");
    const statement = sourceFile.statements[0]!;
    if (!isLabeledStatement(statement)) throw new Exception("Expected labeled statement");
    Assert.Equal(0, statement.pos);
    Assert.Equal(11, statement.end);
    if (!isIdentifier(statement.label)) throw new Exception("Expected identifier label");
    Assert.Equal(0, statement.label.pos);
    Assert.Equal(5, statement.label.end);
    if (!isExpressionStatement(statement.statement)) throw new Exception("Expected expression statement body");
  }

  // Stage 1f: nested labels `a: b: c;` recurse — the outer label's body is itself a
  // LabeledStatement.
  nested_labeled_statement_recurses(): void {
    const sourceFile = parseSourceFile("a: b: c;");
    const statement = sourceFile.statements[0]!;
    if (!isLabeledStatement(statement)) throw new Exception("Expected outer labeled statement");
    Assert.Equal(0, statement.pos);
    Assert.Equal(8, statement.end);
    if (!isLabeledStatement(statement.statement)) throw new Exception("Expected inner labeled statement");
    Assert.Equal(3, statement.statement.pos);
    Assert.Equal(8, statement.statement.end);
  }

  // Stage 1f: `import x = require("m");` parses to an ImportEqualsDeclaration whose
  // moduleReference is an ExternalModuleReference covering `require("m")`.
  import_equals_require_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("import x = require(\"m\");");
    const statement = sourceFile.statements[0]!;
    if (!isImportEqualsDeclaration(statement)) throw new Exception("Expected import equals declaration");
    Assert.Equal(0, statement.pos);
    Assert.Equal(24, statement.end);
    Assert.Equal("x", statement.name.text);
    Assert.Equal(false, statement.isTypeOnly);
    if (!isExternalModuleReference(statement.moduleReference)) throw new Exception("Expected external module reference");
    Assert.Equal(11, statement.moduleReference.pos);
    Assert.Equal(23, statement.moduleReference.end);
  }

  // Stage 1f: `import y = A.B;` parses to an ImportEqualsDeclaration whose moduleReference is a
  // dotted entity name (QualifiedName).
  import_equals_entity_name_uses_qualified_name(): void {
    const sourceFile = parseSourceFile("import y = A.B;");
    const statement = sourceFile.statements[0]!;
    if (!isImportEqualsDeclaration(statement)) throw new Exception("Expected import equals declaration");
    Assert.Equal(0, statement.pos);
    Assert.Equal(15, statement.end);
    if (!isQualifiedName(statement.moduleReference)) throw new Exception("Expected qualified name module reference");
    Assert.Equal(11, statement.moduleReference.pos);
    Assert.Equal(14, statement.moduleReference.end);
  }

  // Stage 1f: `import type z = require("m");` is a type-only ImportEqualsDeclaration; the
  // leading `type` is threaded into isTypeOnly, not the identifier name.
  import_type_equals_threads_is_type_only(): void {
    const sourceFile = parseSourceFile("import type z = require(\"m\");");
    const statement = sourceFile.statements[0]!;
    if (!isImportEqualsDeclaration(statement)) throw new Exception("Expected import equals declaration");
    Assert.Equal(true, statement.isTypeOnly);
    Assert.Equal("z", statement.name.text);
  }

  // Stage 1f: `export = value;` parses to an ExportAssignment with isExportEquals=true, spanning
  // the `export` keyword through the trailing semicolon.
  export_assignment_equals_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("export = value;");
    const statement = sourceFile.statements[0]!;
    if (!isExportAssignment(statement)) throw new Exception("Expected export assignment");
    Assert.Equal(0, statement.pos);
    Assert.Equal(15, statement.end);
    Assert.Equal(true, statement.isExportEquals);
    if (!isIdentifier(statement.expression)) throw new Exception("Expected identifier expression");
  }

  // Stage 1f: `export default 42;` parses to an ExportAssignment with isExportEquals=false (NOT
  // a declaration), spanning the `export` keyword through the trailing semicolon.
  export_default_expression_is_export_assignment(): void {
    const sourceFile = parseSourceFile("export default 42;");
    const statement = sourceFile.statements[0]!;
    if (!isExportAssignment(statement)) throw new Exception("Expected export assignment");
    Assert.Equal(0, statement.pos);
    Assert.Equal(18, statement.end);
    Assert.Equal(false, statement.isExportEquals);
    if (!isNumericLiteral(statement.expression)) throw new Exception("Expected numeric literal expression");
  }

  // Stage 1f: `export default function f() {}` remains a FunctionDeclaration (default kept as a
  // modifier), proving the expression-default fix did not regress declaration defaults.
  export_default_function_remains_function_declaration(): void {
    const sourceFile = parseSourceFile("export default function f() {}");
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    Assert.Equal(0, statement.pos);
    Assert.Equal(30, statement.end);
  }

  // Stage 1f: `export as namespace Lib;` parses to a NamespaceExportDeclaration spanning the
  // `export` keyword through the trailing semicolon.
  namespace_export_declaration_spans_through_semicolon(): void {
    const sourceFile = parseSourceFile("export as namespace Lib;");
    const statement = sourceFile.statements[0]!;
    if (!isNamespaceExportDeclaration(statement)) throw new Exception("Expected namespace export declaration");
    Assert.Equal(0, statement.pos);
    Assert.Equal(24, statement.end);
    Assert.Equal("Lib", statement.name.text);
  }

  // Stage 1f: `import data from "d.json" with { type: "json" };` carries an ImportAttributes node
  // (token = WithKeyword) covering the `with { ... }` clause; the single attribute is `type:
  // "json"`.
  import_attributes_with_clause_ranges(): void {
    const sourceFile = parseSourceFile("import data from \"d.json\" with { type: \"json\" };");
    const statement = sourceFile.statements[0]!;
    if (!isImportDeclaration(statement)) throw new Exception("Expected import declaration");
    const attributes = statement.attributes;
    if (attributes === undefined || !isImportAttributes(attributes)) throw new Exception("Expected import attributes");
    Assert.Equal(Kind.WithKeyword, attributes.token);
    Assert.Equal(26, attributes.pos);
    Assert.Equal(47, attributes.end);
    Assert.Equal(1, attributes.attributes.length);
    const attribute = attributes.attributes[0]!;
    if (!isImportAttribute(attribute)) throw new Exception("Expected import attribute");
    Assert.Equal(33, attribute.pos);
    Assert.Equal(45, attribute.end);
    if (!isIdentifier(attribute.name)) throw new Exception("Expected identifier attribute name");
    Assert.Equal("type", attribute.name.text);
    if (!isStringLiteral(attribute.value)) throw new Exception("Expected string literal attribute value");
  }

  // Stage 1f: re-exports also carry attributes — `export { a } from "m.json" with { type:
  // "json" };` wires an ImportAttributes node onto the ExportDeclaration.
  reexport_attributes_with_clause_wired(): void {
    const sourceFile = parseSourceFile("export { a } from \"m.json\" with { type: \"json\" };");
    const statement = sourceFile.statements[0]!;
    if (!isExportDeclaration(statement)) throw new Exception("Expected export declaration");
    const attributes = statement.attributes;
    if (attributes === undefined || !isImportAttributes(attributes)) throw new Exception("Expected import attributes");
    Assert.Equal(Kind.WithKeyword, attributes.token);
    Assert.Equal(1, attributes.attributes.length);
  }

  // Stage 1g: template-literal TYPE. `type T = `a${B}c`;` -> TemplateLiteralTypeNode starts at
  // the TemplateHead `` `a${ `` (index 9) and ends after the tail `` }c` `` (index 17). The head
  // spans [9,13); the single TemplateLiteralTypeSpan covers the span TYPE `B` through the tail
  // [13,17) (its start is the span type's start, NOT the `${`).
  template_literal_type_spans_head_through_tail(): void {
    const sourceFile = parseSourceFile("type T = `a${B}c`;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const template = statement.type;
    if (!isTemplateLiteralTypeNode(template)) throw new Exception("Expected template literal type node");
    Assert.Equal(9, template.pos);
    Assert.Equal(17, template.end);
    Assert.Equal(9, template.head.pos);
    Assert.Equal(13, template.head.end);
    const span = template.templateSpans[0]!;
    if (!isTemplateLiteralTypeSpan(span)) throw new Exception("Expected template literal type span");
    Assert.Equal(13, span.pos);
    Assert.Equal(17, span.end);
    Assert.Equal(span.type.pos, span.pos);
  }

  // Stage 1g: template-literal TYPE with a `{`-containing interior. `type T = `a${{x:B}}c`;` ->
  // the `${...}` interior is a type literal `{x:B}`; the scanner's brace-depth counter round-trips
  // the nested `{ }` so the span TYPE is a TypeLiteralNode and the whole template still spans
  // [9,21) (head `` `a${ `` [9,13); the type literal `{x:B}` [13,18); the tail `` }c` `` [18,21)).
  template_literal_type_with_brace_interior_round_trips(): void {
    const sourceFile = parseSourceFile("type T = `a${{x:B}}c`;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const template = statement.type;
    if (!isTemplateLiteralTypeNode(template)) throw new Exception("Expected template literal type node");
    Assert.Equal(9, template.pos);
    Assert.Equal(21, template.end);
    const span = template.templateSpans[0]!;
    if (!isTemplateLiteralTypeSpan(span)) throw new Exception("Expected template literal type span");
    if (!isTypeLiteralNode(span.type)) throw new Exception("Expected type literal span type");
  }

  // Stage 1g: mapped type. `type T = { readonly [K in U]?: V };` -> MappedTypeNode covers the
  // braces [9,34). The readonlyToken is a ReadonlyKeyword; the questionToken is a QuestionToken;
  // the typeParameter (`K in U`) starts at the name `K` (index 21) and ends after the in-type `U`
  // (index 27); the in-type lives in the typeParameter's constraint slot.
  mapped_type_covers_braces_with_readonly_and_question(): void {
    const sourceFile = parseSourceFile("type T = { readonly [K in U]?: V };");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const mapped = statement.type;
    if (!isMappedTypeNode(mapped)) throw new Exception("Expected mapped type node");
    Assert.Equal(9, mapped.pos);
    Assert.Equal(34, mapped.end);
    Assert.Equal(Kind.ReadonlyKeyword, mapped.readonlyToken!.kind);
    Assert.Equal(Kind.QuestionToken, mapped.questionToken!.kind);
    const tp = mapped.typeParameter;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected type parameter declaration");
    Assert.Equal(21, tp.pos);
    Assert.Equal(27, tp.end);
    if (tp.constraint === undefined) throw new Exception("Expected in-type in constraint slot");
    Assert.Equal(Kind.TypeReference, tp.constraint.kind);
  }

  // Stage 1g: mapped type with `+/-` modifiers and `as` remapping.
  // `type T = { -readonly [K in U as `g${K}`]-?: V };` -> the readonly/question slots carry
  // MinusToken (+/- form); the `as` nameType is a TemplateLiteralType.
  mapped_type_plus_minus_modifiers_and_as_remapping(): void {
    const sourceFile = parseSourceFile("type T = { -readonly [K in U as `g${K}`]-?: V };");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const mapped = statement.type;
    if (!isMappedTypeNode(mapped)) throw new Exception("Expected mapped type node");
    Assert.Equal(Kind.MinusToken, mapped.readonlyToken!.kind);
    Assert.Equal(Kind.MinusToken, mapped.questionToken!.kind);
    if (mapped.nameType === undefined) throw new Exception("Expected as-remapping nameType");
    Assert.Equal(Kind.TemplateLiteralType, mapped.nameType.kind);
  }

  // Stage 1g: import type with qualifier + type arguments.
  // `type T = import("mod").Ns.Type<X>;` -> ImportTypeNode starts at `import` (index 9) and ends
  // after the closing `>` (index 33). isTypeOf is false; the qualifier is a dotted entity name
  // (QualifiedName); there is one type argument.
  import_type_with_qualifier_and_type_arguments(): void {
    const sourceFile = parseSourceFile("type T = import(\"mod\").Ns.Type<X>;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const importType = statement.type;
    if (!isImportTypeNode(importType)) throw new Exception("Expected import type node");
    Assert.Equal(9, importType.pos);
    Assert.Equal(33, importType.end);
    Assert.Equal(false, importType.isTypeOf);
    if (importType.qualifier === undefined || !isQualifiedName(importType.qualifier)) throw new Exception("Expected qualified-name qualifier");
    Assert.Equal(1, importType.typeArguments!.length);
  }

  // Stage 1g: typeof import type. `type T = typeof import("mod").Default;` -> ImportTypeNode with
  // isTypeOf=true starting at the `typeof` keyword (index 9), ending after the qualifier `Default`
  // (index 37).
  typeof_import_type_sets_is_type_of(): void {
    const sourceFile = parseSourceFile("type T = typeof import(\"mod\").Default;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const importType = statement.type;
    if (!isImportTypeNode(importType)) throw new Exception("Expected import type node");
    Assert.Equal(9, importType.pos);
    Assert.Equal(37, importType.end);
    Assert.Equal(true, importType.isTypeOf);
  }

  // Stage 1g: import type with attributes. `type T = import("m", { with: { t: "json" } }).X;` ->
  // ImportTypeNode carrying an ImportAttributes node (token = WithKeyword) parsed mid-type via the
  // skipKeyword path; the inner attribute object has one entry. The whole import type spans [9,47).
  import_type_with_attributes_clause(): void {
    const sourceFile = parseSourceFile("type T = import(\"m\", { with: { t: \"json\" } }).X;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const importType = statement.type;
    if (!isImportTypeNode(importType)) throw new Exception("Expected import type node");
    Assert.Equal(9, importType.pos);
    Assert.Equal(47, importType.end);
    const attributes = importType.attributes;
    if (attributes === undefined || !isImportAttributes(attributes)) throw new Exception("Expected import attributes");
    Assert.Equal(Kind.WithKeyword, attributes.token);
    Assert.Equal(1, attributes.attributes.length);
  }

  // Stage 1g: bare infer type. `type T = A extends infer U ? U : never;` -> the conditional's
  // extendsType is an InferTypeNode starting at the `infer` keyword (index 19) and ending after
  // the type parameter name `U` (index 26); its TypeParameterDeclaration has no constraint.
  infer_type_bare_in_conditional_extends_position(): void {
    const sourceFile = parseSourceFile("type T = A extends infer U ? U : never;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const conditional = statement.type;
    if (!isConditionalTypeNode(conditional)) throw new Exception("Expected conditional type node");
    const infer = conditional.extendsType;
    if (!isInferTypeNode(infer)) throw new Exception("Expected infer type node");
    Assert.Equal(19, infer.pos);
    Assert.Equal(26, infer.end);
    const tp = infer.typeParameter;
    if (!isTypeParameterDeclaration(tp)) throw new Exception("Expected type parameter declaration");
    Assert.Equal(25, tp.pos);
    Assert.Equal(26, tp.end);
    if (tp.constraint !== undefined) throw new Exception("Expected no constraint on bare infer");
  }

  // Stage 1g: infer type with `extends` constraint. `type T = A extends infer U extends string ? U
  // : never;` -> the InferTypeNode spans the `infer` keyword (index 19) through the constraint
  // `string` (index 41); the constraint is KEPT (the trailing `?` belongs to the enclosing
  // conditional). The constraint is a StringKeyword spanning [35,41).
  infer_type_extends_constraint_is_kept(): void {
    const sourceFile = parseSourceFile("type T = A extends infer U extends string ? U : never;");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const conditional = statement.type;
    if (!isConditionalTypeNode(conditional)) throw new Exception("Expected conditional type node");
    const infer = conditional.extendsType;
    if (!isInferTypeNode(infer)) throw new Exception("Expected infer type node");
    Assert.Equal(19, infer.pos);
    Assert.Equal(41, infer.end);
    const constraint = infer.typeParameter.constraint;
    if (constraint === undefined) throw new Exception("Expected kept constraint");
    Assert.Equal(Kind.StringKeyword, constraint.kind);
    Assert.Equal(35, constraint.pos);
    Assert.Equal(41, constraint.end);
  }

  // Stage 1g: named-tuple members + optional + rest.
  // `type T = [a: string, b?: number, ...c: boolean[]];` -> the tuple spans [9,49) with three
  // NamedTupleMember elements: `a: string` [10,19); `b?: number` [21,31) with a QuestionToken;
  // `...c: boolean[]` [33,48) with a DotDotDotToken.
  named_tuple_members_with_optional_and_rest(): void {
    const sourceFile = parseSourceFile("type T = [a: string, b?: number, ...c: boolean[]];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const tuple = statement.type;
    if (!isTupleTypeNode(tuple)) throw new Exception("Expected tuple type node");
    Assert.Equal(9, tuple.pos);
    Assert.Equal(49, tuple.end);
    const first = tuple.elements[0]!;
    if (!isNamedTupleMember(first)) throw new Exception("Expected first named tuple member");
    Assert.Equal(10, first.pos);
    Assert.Equal(19, first.end);
    const second = tuple.elements[1]!;
    if (!isNamedTupleMember(second)) throw new Exception("Expected second named tuple member");
    Assert.Equal(21, second.pos);
    Assert.Equal(31, second.end);
    Assert.Equal(Kind.QuestionToken, second.questionToken!.kind);
    const third = tuple.elements[2]!;
    if (!isNamedTupleMember(third)) throw new Exception("Expected third named tuple member");
    Assert.Equal(33, third.pos);
    Assert.Equal(48, third.end);
    Assert.Equal(Kind.DotDotDotToken, third.dotDotDotToken!.kind);
  }

  // Stage 1g: a keyword-named tuple member. `type T = [type: string];` -> the member name accepts
  // a keyword (`type`); the NamedTupleMember spans [10,22) and its name text is `type`.
  named_tuple_member_allows_keyword_name(): void {
    const sourceFile = parseSourceFile("type T = [type: string];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const tuple = statement.type;
    if (!isTupleTypeNode(tuple)) throw new Exception("Expected tuple type node");
    const member = tuple.elements[0]!;
    if (!isNamedTupleMember(member)) throw new Exception("Expected named tuple member");
    Assert.Equal(10, member.pos);
    Assert.Equal(22, member.end);
    Assert.Equal("type", member.name.text);
  }

  // Stage 1g: rest type in a tuple. `type T = [...string[]];` -> the element is a RestTypeNode
  // starting at the `...` (index 10) and ending after the inner array type (index 21).
  rest_type_in_tuple_starts_at_dotdotdot(): void {
    const sourceFile = parseSourceFile("type T = [...string[]];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const tuple = statement.type;
    if (!isTupleTypeNode(tuple)) throw new Exception("Expected tuple type node");
    const rest = tuple.elements[0]!;
    if (!isRestTypeNode(rest)) throw new Exception("Expected rest type node");
    Assert.Equal(10, rest.pos);
    Assert.Equal(21, rest.end);
    if (!isArrayTypeNode(rest.type)) throw new Exception("Expected array type inside rest");
  }

  // Stage 1g: optional type in a tuple. `type T = [string?];` -> the element is an OptionalTypeNode
  // starting at the element type `string` (index 10) and ending after the `?` (index 17); the inner
  // type is the StringKeyword spanning [10,16).
  optional_type_in_tuple_wraps_element(): void {
    const sourceFile = parseSourceFile("type T = [string?];");
    const statement = sourceFile.statements[0]!;
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias declaration");
    const tuple = statement.type;
    if (!isTupleTypeNode(tuple)) throw new Exception("Expected tuple type node");
    const optional = tuple.elements[0]!;
    if (!isOptionalTypeNode(optional)) throw new Exception("Expected optional type node");
    Assert.Equal(10, optional.pos);
    Assert.Equal(17, optional.end);
    if (!isKeywordTypeNode(optional.type)) throw new Exception("Expected keyword type inside optional");
    Assert.Equal(10, optional.type.pos);
    Assert.Equal(16, optional.type.end);
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
A<ParserPositionTests>().method((t) => t.class_members_property_method_get_accessor_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.modifier_led_member_starts_at_modifier).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.static_modifier_led_method_starts_at_modifier).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.class_constructor_and_set_accessor_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.semicolon_class_element_is_token_tight).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.interface_property_method_index_signature_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.interface_call_and_construct_signature_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.enum_member_ranges_cover_initializer).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.heritage_clauses_start_at_extends_and_implements).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.heritage_dotted_property_access_threads_base_start).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.parameter_declaration_ranges_including_rest).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.parameter_declaration_optional_and_default_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.binding_pattern_parameters_and_elements_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.array_binding_hole_and_elements_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.array_binding_rest_element_starts_at_dotdotdot).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.computed_property_name_covers_brackets).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.empty_statement_covers_the_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.debugger_statement_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.with_statement_spans_keyword_through_body).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.labeled_statement_spans_label_through_body).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.nested_labeled_statement_recurses).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_equals_require_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_equals_entity_name_uses_qualified_name).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_type_equals_threads_is_type_only).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.export_assignment_equals_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.export_default_expression_is_export_assignment).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.export_default_function_remains_function_declaration).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.namespace_export_declaration_spans_through_semicolon).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_attributes_with_clause_ranges).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.reexport_attributes_with_clause_wired).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.template_literal_type_spans_head_through_tail).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.template_literal_type_with_brace_interior_round_trips).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.mapped_type_covers_braces_with_readonly_and_question).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.mapped_type_plus_minus_modifiers_and_as_remapping).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_type_with_qualifier_and_type_arguments).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.typeof_import_type_sets_is_type_of).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.import_type_with_attributes_clause).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.infer_type_bare_in_conditional_extends_position).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.infer_type_extends_constraint_is_kept).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.named_tuple_members_with_optional_and_rest).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.named_tuple_member_allows_keyword_name).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.rest_type_in_tuple_starts_at_dotdotdot).add(FactAttribute);
A<ParserPositionTests>().method((t) => t.optional_type_in_tuple_wraps_element).add(FactAttribute);
