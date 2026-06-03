// precedence.ts — Faithful 1:1 port of typescript-go internal/ast/precedence.go.
//
// Mirrors the upstream operator/type precedence ladders and the
// getOperator / getExpressionPrecedence / getOperatorPrecedence /
// getBinaryOperatorPrecedence / getLeftmostExpression / getTypeNodePrecedence
// algorithms exactly (names, structure, branches). Reads node fields through
// the generated narrowing guards + node accessors — no escape hatches.

import { Kind } from "./generated/kind.js";
import type {
  BinaryExpression,
  ConditionalExpression,
  Expression,
  InferTypeNode,
  NewExpression,
  PostfixUnaryExpression,
  PrefixUnaryExpression,
  TaggedTemplateExpression,
  TypeNode,
  TypeParameterDeclaration,
} from "./generated/nodes.js";
import { isOptionalChain } from "./utilities.js";
import { expressionOf } from "./accessors.js";

export const OperatorPrecedence = {
  Comma: 0,
  Spread: 1,
  Yield: 2,
  Assignment: 3,
  Conditional: 4,
  LogicalOR: 5,
  Coalesce: 5,
  LogicalAND: 6,
  BitwiseOR: 7,
  BitwiseXOR: 8,
  BitwiseAND: 9,
  Equality: 10,
  Relational: 11,
  Shift: 12,
  Additive: 13,
  Multiplicative: 14,
  Exponentiation: 15,
  Unary: 16,
  Update: 17,
  LeftHandSide: 18,
  OptionalChain: 19,
  Member: 20,
  Primary: 21,
  Parentheses: 22,
  Lowest: 0,
  Highest: 22,
  DisallowComma: 2,
  // -1 is lower than all other precedences. Returning it will cause binary
  // expression parsing to stop. (precedence.go:186)
  Invalid: -1,
} as const;

export type OperatorPrecedence = typeof OperatorPrecedence[keyof typeof OperatorPrecedence];

// getOperator (precedence.go:189).
function getOperator(expression: Expression): Kind {
  switch (expression.kind) {
    case Kind.BinaryExpression:
      return (expression as BinaryExpression).operatorToken.kind;
    case Kind.PrefixUnaryExpression:
      return (expression as PrefixUnaryExpression).operator;
    case Kind.PostfixUnaryExpression:
      return (expression as PostfixUnaryExpression).operator;
    default:
      return expression.kind;
  }
}

// Gets the precedence of an expression. (GetExpressionPrecedence, precedence.go:203)
export function getExpressionPrecedence(expression: Expression): OperatorPrecedence {
  const operator = getOperator(expression);
  let flags: OperatorPrecedenceFlags = OperatorPrecedenceFlags.None;
  if (expression.kind === Kind.NewExpression && (expression as NewExpression).arguments === undefined) {
    flags = OperatorPrecedenceFlags.NewWithoutArguments;
  } else if (isOptionalChain(expression)) {
    flags = OperatorPrecedenceFlags.OptionalChain;
  }
  return getOperatorPrecedence(expression.kind, operator, flags);
}

// OperatorPrecedenceFlags (precedence.go:214-220).
export type OperatorPrecedenceFlags = number;

export const OperatorPrecedenceFlags = {
  None: 0,
  NewWithoutArguments: 1 << 0,
  OptionalChain: 1 << 1,
} as const;

// Gets the precedence of an operator. (GetOperatorPrecedence, precedence.go:223)
export function getOperatorPrecedence(
  nodeKind: Kind,
  operatorKind: Kind,
  flags: OperatorPrecedenceFlags,
): OperatorPrecedence {
  switch (nodeKind) {
    case Kind.SpreadElement:
      return OperatorPrecedence.Spread;
    case Kind.YieldExpression:
      return OperatorPrecedence.Yield;
    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case Kind.ArrowFunction:
      return OperatorPrecedence.Assignment;
    case Kind.ConditionalExpression:
      return OperatorPrecedence.Conditional;
    case Kind.BinaryExpression:
      switch (operatorKind) {
        case Kind.CommaToken:
          return OperatorPrecedence.Comma;

        case Kind.EqualsToken:
        case Kind.PlusEqualsToken:
        case Kind.MinusEqualsToken:
        case Kind.AsteriskAsteriskEqualsToken:
        case Kind.AsteriskEqualsToken:
        case Kind.SlashEqualsToken:
        case Kind.PercentEqualsToken:
        case Kind.LessThanLessThanEqualsToken:
        case Kind.GreaterThanGreaterThanEqualsToken:
        case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
        case Kind.AmpersandEqualsToken:
        case Kind.CaretEqualsToken:
        case Kind.BarEqualsToken:
        case Kind.BarBarEqualsToken:
        case Kind.AmpersandAmpersandEqualsToken:
        case Kind.QuestionQuestionEqualsToken:
          return OperatorPrecedence.Assignment;

        default:
          return getBinaryOperatorPrecedence(operatorKind);
      }
    // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
    case Kind.TypeAssertionExpression:
    case Kind.NonNullExpression:
    case Kind.PrefixUnaryExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.DeleteExpression:
    case Kind.AwaitExpression:
      return OperatorPrecedence.Unary;

    case Kind.PostfixUnaryExpression:
      return OperatorPrecedence.Update;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
      if ((flags & OperatorPrecedenceFlags.OptionalChain) !== 0) {
        return OperatorPrecedence.OptionalChain;
      }
      return OperatorPrecedence.Member;

    case Kind.CallExpression:
      if ((flags & OperatorPrecedenceFlags.OptionalChain) !== 0) {
        return OperatorPrecedence.OptionalChain;
      }
      return OperatorPrecedence.Member;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case Kind.NewExpression:
      if ((flags & OperatorPrecedenceFlags.NewWithoutArguments) !== 0) {
        return OperatorPrecedence.LeftHandSide;
      }
      return OperatorPrecedence.Member;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case Kind.TaggedTemplateExpression:
    case Kind.MetaProperty:
    case Kind.ExpressionWithTypeArguments:
      return OperatorPrecedence.Member;

    case Kind.AsExpression:
    case Kind.SatisfiesExpression:
      return OperatorPrecedence.Relational;

    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.ImportKeyword:
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
    case Kind.NullKeyword:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.StringLiteral:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
    case Kind.RegularExpressionLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
    case Kind.OmittedExpression:
    case Kind.JsxElement:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxFragment:
    case Kind.MissingDeclaration:
      return OperatorPrecedence.Primary;

    // !!! By necessity, this differs from the old compiler to support emit. consider backporting
    case Kind.ParenthesizedExpression:
      return OperatorPrecedence.Parentheses;

    default:
      return OperatorPrecedence.Invalid;
  }
}

// Gets the precedence of a binary operator. (GetBinaryOperatorPrecedence, precedence.go:336)
export function getBinaryOperatorPrecedence(operatorKind: Kind): OperatorPrecedence {
  switch (operatorKind) {
    case Kind.QuestionQuestionToken:
      return OperatorPrecedence.Coalesce;
    case Kind.BarBarToken:
      return OperatorPrecedence.LogicalOR;
    case Kind.AmpersandAmpersandToken:
      return OperatorPrecedence.LogicalAND;
    case Kind.BarToken:
      return OperatorPrecedence.BitwiseOR;
    case Kind.CaretToken:
      return OperatorPrecedence.BitwiseXOR;
    case Kind.AmpersandToken:
      return OperatorPrecedence.BitwiseAND;
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return OperatorPrecedence.Equality;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InstanceOfKeyword:
    case Kind.InKeyword:
    case Kind.AsKeyword:
    case Kind.SatisfiesKeyword:
      return OperatorPrecedence.Relational;
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return OperatorPrecedence.Shift;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return OperatorPrecedence.Additive;
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return OperatorPrecedence.Multiplicative;
    case Kind.AsteriskAsteriskToken:
      return OperatorPrecedence.Exponentiation;
  }
  // -1 is lower than all other precedences.  Returning it will cause binary expression
  // parsing to stop.
  return OperatorPrecedence.Invalid;
}

// Gets the leftmost expression of an expression, e.g. `a` in `a.b`, `a[b]`,
// `a++`, `a+b`, `a?b:c`, `a as B`, etc. (GetLeftmostExpression, precedence.go:370)
export function getLeftmostExpression(node: Expression, stopAtCallExpressions: boolean): Expression {
  let current = node;
  for (;;) {
    switch (current.kind) {
      case Kind.PostfixUnaryExpression:
        current = (current as PostfixUnaryExpression).operand;
        continue;
      case Kind.BinaryExpression:
        current = (current as BinaryExpression).left;
        continue;
      case Kind.ConditionalExpression:
        current = (current as ConditionalExpression).condition;
        continue;
      case Kind.TaggedTemplateExpression:
        current = (current as TaggedTemplateExpression).tag;
        continue;
      case Kind.CallExpression:
        if (stopAtCallExpressions) {
          return current;
        }
      // fallthrough
      case Kind.AsExpression:
      case Kind.ElementAccessExpression:
      case Kind.PropertyAccessExpression:
      case Kind.NonNullExpression:
      case Kind.PartiallyEmittedExpression:
      case Kind.SatisfiesExpression:
        current = expressionOf(current) as Expression;
        continue;
    }
    return current;
  }
}

// TypePrecedence (precedence.go:403-652).
export type TypePrecedence = number;

export const TypePrecedence = {
  // Conditional precedence (lowest)
  Conditional: 0,
  // JSDoc precedence (optional and variadic types)
  JSDoc: 1,
  // Function precedence
  Function: 2,
  // Union precedence
  Union: 3,
  // Intersection precedence
  Intersection: 4,
  // TypeOperatorNode precedence
  TypeOperator: 5,
  // Postfix precedence
  Postfix: 6,
  // NonArray precedence (highest)
  NonArray: 7,
  Lowest: 0,
  Highest: 7,
} as const;

// Gets the precedence of a TypeNode. (GetTypeNodePrecedence, precedence.go:655)
export function getTypeNodePrecedence(n: TypeNode): TypePrecedence {
  switch (n.kind) {
    case Kind.ConditionalType:
      return TypePrecedence.Conditional;
    case Kind.JSDocOptionalType:
    case Kind.JSDocVariadicType:
      return TypePrecedence.JSDoc;
    case Kind.FunctionType:
    case Kind.ConstructorType:
      return TypePrecedence.Function;
    case Kind.UnionType:
      return TypePrecedence.Union;
    case Kind.IntersectionType:
      return TypePrecedence.Intersection;
    case Kind.TypeOperator:
      return TypePrecedence.TypeOperator;
    case Kind.InferType: {
      const typeParameter = (n as InferTypeNode).typeParameter as TypeParameterDeclaration;
      if (typeParameter.constraint !== undefined) {
        // `infer T extends U` must be treated as FunctionTypeNode precedence as the `extends` clause eagerly consumes
        // TypeNode
        return TypePrecedence.Function;
      }
      return TypePrecedence.TypeOperator;
    }
    case Kind.IndexedAccessType:
    case Kind.ArrayType:
    case Kind.OptionalType:
      return TypePrecedence.Postfix;
    case Kind.TypeQuery:
      // TypeQueryNode is actually a NonArrayType, but we treat it as TypeOperatorNode
      // precedence so that it is parenthesized when used in a PostfixType
      // context (e.g., `(typeof C)[]` instead of `typeof C[]`)
      return TypePrecedence.TypeOperator;
    case Kind.AnyKeyword:
    case Kind.UnknownKeyword:
    case Kind.StringKeyword:
    case Kind.NumberKeyword:
    case Kind.BigIntKeyword:
    case Kind.SymbolKeyword:
    case Kind.BooleanKeyword:
    case Kind.UndefinedKeyword:
    case Kind.NeverKeyword:
    case Kind.ObjectKeyword:
    case Kind.IntrinsicKeyword:
    case Kind.VoidKeyword:
    case Kind.JSDocAllType:
    case Kind.JSDocNullableType:
    case Kind.JSDocNonNullableType:
    case Kind.LiteralType:
    case Kind.TypePredicate:
    case Kind.TypeReference:
    case Kind.TypeLiteral:
    case Kind.TupleType:
    case Kind.RestType:
    case Kind.ParenthesizedType:
    case Kind.ThisType:
    case Kind.MappedType:
    case Kind.NamedTupleMember:
    case Kind.TemplateLiteralType:
    case Kind.ImportType:
    // These occur in pseudo-types like `f<T>.C`, where `f` is a generic function and `C` is a local type
    case Kind.PropertyAccessExpression:
    case Kind.ExpressionWithTypeArguments:
      return TypePrecedence.NonArray;
    default:
      throw new Error(`unhandled TypeNode: ${n.kind}`);
  }
}
