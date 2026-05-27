/**
 * Expression-shape predicates and helpers.
 *
 * Ported from Strada `checker.go` — isLeftHandSideExpression,
 * isCallOrNewExpression, getExpressionAssociativity, isUnaryExpression.
 *
 * These predicates classify expression nodes for grammar-checks and
 * narrowing decisions.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a left-hand-side expression — can
 * appear on the LHS of an assignment.
 */
export function isLeftHandSideExpression(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.ParenthesizedExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.NonNullExpression:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
    case Kind.RegularExpressionLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.NullKeyword:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.MetaProperty:
    case Kind.JsxElement:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxFragment:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the node is a unary expression (prefix or postfix).
 */
export function isUnaryExpression(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.AwaitExpression:
      return true;
    default:
      return isLeftHandSideExpression(node);
  }
}

/**
 * Returns true when the node is a call-style expression — Call or New.
 */
export function isCallOrNewExpression(node: AstNode): boolean {
  return node.kind === Kind.CallExpression || node.kind === Kind.NewExpression;
}

/**
 * Returns true when the node is a literal expression.
 */
export function isLiteralExpression(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.RegularExpressionLiteral:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the node is a primary expression — the highest
 * precedence category.
 */
export function isPrimaryExpression(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.Identifier:
    case Kind.NullKeyword:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.StringLiteral:
    case Kind.RegularExpressionLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.ParenthesizedExpression:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
      return true;
    default:
      return false;
  }
}

export const Associativity = {
  Left: 0,
  Right: 1,
} as const;

export type Associativity =
  | typeof Associativity.Left
  | typeof Associativity.Right;

/**
 * Returns the associativity of a binary operator.
 */
export function getBinaryOperatorAssociativity(operator: number): Associativity {
  // Assignment + `**` are right-associative; everything else is left.
  switch (operator) {
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken:
    case Kind.MinusEqualsToken:
    case Kind.AsteriskEqualsToken:
    case Kind.AsteriskAsteriskEqualsToken:
    case Kind.SlashEqualsToken:
    case Kind.PercentEqualsToken:
    case Kind.AmpersandEqualsToken:
    case Kind.BarEqualsToken:
    case Kind.CaretEqualsToken:
    case Kind.LessThanLessThanEqualsToken:
    case Kind.GreaterThanGreaterThanEqualsToken:
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
    case Kind.AsteriskAsteriskToken:
      return Associativity.Right;
    default:
      return Associativity.Left;
  }
}
