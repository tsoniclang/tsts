import type { bool, int } from "../../go/scalars.js";
import * as fmt from "../../go/fmt.js";
import type { GoPtr } from "../../go/compat.js";
import { Node_ArgumentList, Node_Expression } from "./ast.js";
import {
  AsBinaryExpression,
  AsConditionalExpression,
  AsInferTypeNode,
  AsPostfixUnaryExpression,
  AsPrefixUnaryExpression,
  AsTaggedTemplateExpression,
  AsTypeParameterDeclaration,
} from "./generated/casts.js";
import type { Kind } from "./generated/kinds.js";
import {
  KindAmpersandAmpersandEqualsToken,
  KindAmpersandAmpersandToken,
  KindAmpersandEqualsToken,
  KindAmpersandToken,
  KindAnyKeyword,
  KindArrayLiteralExpression,
  KindArrayType,
  KindArrowFunction,
  KindAsExpression,
  KindAsKeyword,
  KindAsteriskAsteriskEqualsToken,
  KindAsteriskAsteriskToken,
  KindAsteriskEqualsToken,
  KindAsteriskToken,
  KindAwaitExpression,
  KindBarBarEqualsToken,
  KindBarBarToken,
  KindBarEqualsToken,
  KindBarToken,
  KindBigIntKeyword,
  KindBigIntLiteral,
  KindBinaryExpression,
  KindBooleanKeyword,
  KindCallExpression,
  KindCaretEqualsToken,
  KindCaretToken,
  KindClassExpression,
  KindCommaToken,
  KindConditionalExpression,
  KindConditionalType,
  KindConstructorType,
  KindDeleteExpression,
  KindElementAccessExpression,
  KindEqualsEqualsEqualsToken,
  KindEqualsEqualsToken,
  KindEqualsToken,
  KindExclamationEqualsEqualsToken,
  KindExclamationEqualsToken,
  KindExpressionWithTypeArguments,
  KindFalseKeyword,
  KindFunctionExpression,
  KindFunctionType,
  KindGreaterThanEqualsToken,
  KindGreaterThanGreaterThanEqualsToken,
  KindGreaterThanGreaterThanGreaterThanEqualsToken,
  KindGreaterThanGreaterThanGreaterThanToken,
  KindGreaterThanGreaterThanToken,
  KindGreaterThanToken,
  KindIdentifier,
  KindImportKeyword,
  KindImportType,
  KindIndexedAccessType,
  KindInferType,
  KindInKeyword,
  KindInstanceOfKeyword,
  KindIntersectionType,
  KindIntrinsicKeyword,
  KindJSDocAllType,
  KindJSDocNonNullableType,
  KindJSDocNullableType,
  KindJSDocOptionalType,
  KindJSDocVariadicType,
  KindJsxElement,
  KindJsxFragment,
  KindJsxSelfClosingElement,
  KindLessThanEqualsToken,
  KindLessThanLessThanEqualsToken,
  KindLessThanLessThanToken,
  KindLessThanToken,
  KindLiteralType,
  KindMappedType,
  KindMetaProperty,
  KindMinusEqualsToken,
  KindMinusToken,
  KindMissingDeclaration,
  KindNamedTupleMember,
  KindNeverKeyword,
  KindNewExpression,
  KindNonNullExpression,
  KindNoSubstitutionTemplateLiteral,
  KindNullKeyword,
  KindNumberKeyword,
  KindNumericLiteral,
  KindObjectKeyword,
  KindObjectLiteralExpression,
  KindOmittedExpression,
  KindOptionalType,
  KindParenthesizedExpression,
  KindParenthesizedType,
  KindPartiallyEmittedExpression,
  KindPercentEqualsToken,
  KindPercentToken,
  KindPlusEqualsToken,
  KindPlusToken,
  KindPostfixUnaryExpression,
  KindPrefixUnaryExpression,
  KindPrivateIdentifier,
  KindPropertyAccessExpression,
  KindQuestionQuestionEqualsToken,
  KindQuestionQuestionToken,
  KindRegularExpressionLiteral,
  KindRestType,
  KindSatisfiesExpression,
  KindSatisfiesKeyword,
  KindSlashEqualsToken,
  KindSlashToken,
  KindSpreadElement,
  KindString,
  KindStringKeyword,
  KindStringLiteral,
  KindSuperKeyword,
  KindSymbolKeyword,
  KindTaggedTemplateExpression,
  KindTemplateExpression,
  KindTemplateLiteralType,
  KindThisKeyword,
  KindThisType,
  KindTrueKeyword,
  KindTupleType,
  KindTypeAssertionExpression,
  KindTypeLiteral,
  KindTypeOfExpression,
  KindTypeOperator,
  KindTypePredicate,
  KindTypeQuery,
  KindTypeReference,
  KindUndefinedKeyword,
  KindUnionType,
  KindUnknownKeyword,
  KindVoidExpression,
  KindVoidKeyword,
  KindYieldExpression,
} from "./generated/kinds.js";
import type { Expression, TypeNode } from "./generated/unions.js";
import { IsOptionalChain } from "./utilities.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::type::OperatorPrecedence","kind":"type","status":"implemented","sigHash":"6c9c33d26f15ea56fe8d93924377c98642eebe6af14b975bb6b35c5b7758a728"}
 *
 * Go source:
 * OperatorPrecedence int
 */
export type OperatorPrecedence = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::constGroup::OperatorPrecedenceComma+OperatorPrecedenceSpread+OperatorPrecedenceYield+OperatorPrecedenceAssignment+OperatorPrecedenceConditional+OperatorPrecedenceLogicalOR+OperatorPrecedenceLogicalAND+OperatorPrecedenceBitwiseOR+OperatorPrecedenceBitwiseXOR+OperatorPrecedenceBitwiseAND+OperatorPrecedenceEquality+OperatorPrecedenceRelational+OperatorPrecedenceShift+OperatorPrecedenceAdditive+OperatorPrecedenceMultiplicative+OperatorPrecedenceExponentiation+OperatorPrecedenceUnary+OperatorPrecedenceUpdate+OperatorPrecedenceLeftHandSide+OperatorPrecedenceOptionalChain+OperatorPrecedenceMember+OperatorPrecedencePrimary+OperatorPrecedenceParentheses+OperatorPrecedenceLowest+OperatorPrecedenceHighest+OperatorPrecedenceDisallowComma+OperatorPrecedenceCoalesce+OperatorPrecedenceInvalid","kind":"constGroup","status":"implemented","sigHash":"74a22dc5824a0a19733dd789e10507894778b9aa2cde1ab3bd1f3b884d99cb17"}
 *
 * Go source:
 * const (
 * 	// Expression:
 * 	//     AssignmentExpression
 * 	//     Expression `,` AssignmentExpression
 * 	OperatorPrecedenceComma OperatorPrecedence = iota
 * 	// NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
 * 	// SpreadElement:
 * 	//     `...` AssignmentExpression
 * 	OperatorPrecedenceSpread
 * 	// AssignmentExpression:
 * 	//     ConditionalExpression
 * 	//     YieldExpression
 * 	//     ArrowFunction
 * 	//     AsyncArrowFunction
 * 	//     LeftHandSideExpression `=` AssignmentExpression
 * 	//     LeftHandSideExpression AssignmentOperator AssignmentExpression
 * 	//
 * 	// NOTE: AssignmentExpression is broken down into several precedences due to the requirements
 * 	//       of the parenthesizer rules.
 * 	// AssignmentExpression: YieldExpression
 * 	// YieldExpression:
 * 	//     `yield`
 * 	//     `yield` AssignmentExpression
 * 	//     `yield` `*` AssignmentExpression
 * 	OperatorPrecedenceYield
 * 	// AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
 * 	// AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
 * 	// AssignmentOperator: one of
 * 	//     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
 * 	OperatorPrecedenceAssignment
 * 	// NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
 * 	//       the same precedence.
 * 	// AssignmentExpression: ConditionalExpression
 * 	// ConditionalExpression:
 * 	//     ShortCircuitExpression
 * 	//     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
 * 	OperatorPrecedenceConditional
 * 	// LogicalORExpression:
 * 	//     LogicalANDExpression
 * 	//     LogicalORExpression `||` LogicalANDExpression
 * 	OperatorPrecedenceLogicalOR
 * 	// LogicalANDExpression:
 * 	//     BitwiseORExpression
 * 	//     LogicalANDExprerssion `&&` BitwiseORExpression
 * 	OperatorPrecedenceLogicalAND
 * 	// BitwiseORExpression:
 * 	//     BitwiseXORExpression
 * 	//     BitwiseORExpression `|` BitwiseXORExpression
 * 	OperatorPrecedenceBitwiseOR
 * 	// BitwiseXORExpression:
 * 	//     BitwiseANDExpression
 * 	//     BitwiseXORExpression `^` BitwiseANDExpression
 * 	OperatorPrecedenceBitwiseXOR
 * 	// BitwiseANDExpression:
 * 	//     EqualityExpression
 * 	//     BitwiseANDExpression `&` EqualityExpression
 * 	OperatorPrecedenceBitwiseAND
 * 	// EqualityExpression:
 * 	//     RelationalExpression
 * 	//     EqualityExpression `==` RelationalExpression
 * 	//     EqualityExpression `!=` RelationalExpression
 * 	//     EqualityExpression `===` RelationalExpression
 * 	//     EqualityExpression `!==` RelationalExpression
 * 	OperatorPrecedenceEquality
 * 	// RelationalExpression:
 * 	//     ShiftExpression
 * 	//     RelationalExpression `<` ShiftExpression
 * 	//     RelationalExpression `>` ShiftExpression
 * 	//     RelationalExpression `<=` ShiftExpression
 * 	//     RelationalExpression `>=` ShiftExpression
 * 	//     RelationalExpression `instanceof` ShiftExpression
 * 	//     RelationalExpression `in` ShiftExpression
 * 	//     [+TypeScript] RelationalExpression `as` Type
 * 	OperatorPrecedenceRelational
 * 	// ShiftExpression:
 * 	//     AdditiveExpression
 * 	//     ShiftExpression `<<` AdditiveExpression
 * 	//     ShiftExpression `>>` AdditiveExpression
 * 	//     ShiftExpression `>>>` AdditiveExpression
 * 	OperatorPrecedenceShift
 * 	// AdditiveExpression:
 * 	//     MultiplicativeExpression
 * 	//     AdditiveExpression `+` MultiplicativeExpression
 * 	//     AdditiveExpression `-` MultiplicativeExpression
 * 	OperatorPrecedenceAdditive
 * 	// MultiplicativeExpression:
 * 	//     ExponentiationExpression
 * 	//     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
 * 	// MultiplicativeOperator: one of `*`, `/`, `%`
 * 	OperatorPrecedenceMultiplicative
 * 	// ExponentiationExpression:
 * 	//     UnaryExpression
 * 	//     UpdateExpression `**` ExponentiationExpression
 * 	OperatorPrecedenceExponentiation
 * 	// UnaryExpression:
 * 	//     UpdateExpression
 * 	//     `delete` UnaryExpression
 * 	//     `void` UnaryExpression
 * 	//     `typeof` UnaryExpression
 * 	//     `+` UnaryExpression
 * 	//     `-` UnaryExpression
 * 	//     `~` UnaryExpression
 * 	//     `!` UnaryExpression
 * 	//     AwaitExpression
 * 	// UpdateExpression:            // TODO: Do we need to investigate the precedence here?
 * 	//     `++` UnaryExpression
 * 	//     `--` UnaryExpression
 * 	OperatorPrecedenceUnary
 * 	// UpdateExpression:
 * 	//     LeftHandSideExpression
 * 	//     LeftHandSideExpression `++`
 * 	//     LeftHandSideExpression `--`
 * 	OperatorPrecedenceUpdate
 * 	// LeftHandSideExpression:
 * 	//     NewExpression
 * 	// NewExpression:
 * 	//     MemberExpression
 * 	//     `new` NewExpression
 * 	OperatorPrecedenceLeftHandSide
 * 	// LeftHandSideExpression:
 * 	//     OptionalExpression
 * 	// OptionalExpression:
 * 	//     MemberExpression OptionalChain
 * 	//     CallExpression OptionalChain
 * 	//     OptionalExpression OptionalChain
 * 	OperatorPrecedenceOptionalChain
 * 	// LeftHandSideExpression:
 * 	//     CallExpression
 * 	// CallExpression:
 * 	//     CoverCallExpressionAndAsyncArrowHead
 * 	//     SuperCall
 * 	//     ImportCall
 * 	//     CallExpression Arguments
 * 	//     CallExpression `[` Expression `]`
 * 	//     CallExpression `.` IdentifierName
 * 	//     CallExpression TemplateLiteral
 * 	// MemberExpression:
 * 	//     PrimaryExpression
 * 	//     MemberExpression `[` Expression `]`
 * 	//     MemberExpression `.` IdentifierName
 * 	//     MemberExpression TemplateLiteral
 * 	//     SuperProperty
 * 	//     MetaProperty
 * 	//     `new` MemberExpression Arguments
 * 	OperatorPrecedenceMember
 * 	// TODO: JSXElement?
 * 	// PrimaryExpression:
 * 	//     `this`
 * 	//     IdentifierReference
 * 	//     Literal
 * 	//     ArrayLiteral
 * 	//     ObjectLiteral
 * 	//     FunctionExpression
 * 	//     ClassExpression
 * 	//     GeneratorExpression
 * 	//     AsyncFunctionExpression
 * 	//     AsyncGeneratorExpression
 * 	//     RegularExpressionLiteral
 * 	//     TemplateLiteral
 * 	OperatorPrecedencePrimary
 * 	// PrimaryExpression:
 * 	//     CoverParenthesizedExpressionAndArrowParameterList
 * 	OperatorPrecedenceParentheses
 * 	OperatorPrecedenceLowest        = OperatorPrecedenceComma
 * 	OperatorPrecedenceHighest       = OperatorPrecedenceParentheses
 * 	OperatorPrecedenceDisallowComma = OperatorPrecedenceYield
 * 	// ShortCircuitExpression:
 * 	//     LogicalORExpression
 * 	//     CoalesceExpression
 * 	// CoalesceExpression:
 * 	//     CoalesceExpressionHead `??` BitwiseORExpression
 * 	// CoalesceExpressionHead:
 * 	//     CoalesceExpression
 * 	//     BitwiseORExpression
 * 	OperatorPrecedenceCoalesce = OperatorPrecedenceLogicalOR
 * 	// -1 is lower than all other precedences. Returning it will cause binary expression
 * 	// parsing to stop.
 * 	OperatorPrecedenceInvalid OperatorPrecedence = -1
 * )
 */
// Expression:
//     AssignmentExpression
//     Expression `,` AssignmentExpression
export const OperatorPrecedenceComma: OperatorPrecedence = 0;
// NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
// SpreadElement:
//     `...` AssignmentExpression
export const OperatorPrecedenceSpread: OperatorPrecedence = 1;
// AssignmentExpression: YieldExpression
export const OperatorPrecedenceYield: OperatorPrecedence = 2;
// AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
export const OperatorPrecedenceAssignment: OperatorPrecedence = 3;
// AssignmentExpression: ConditionalExpression
export const OperatorPrecedenceConditional: OperatorPrecedence = 4;
// LogicalORExpression
export const OperatorPrecedenceLogicalOR: OperatorPrecedence = 5;
// LogicalANDExpression
export const OperatorPrecedenceLogicalAND: OperatorPrecedence = 6;
// BitwiseORExpression
export const OperatorPrecedenceBitwiseOR: OperatorPrecedence = 7;
// BitwiseXORExpression
export const OperatorPrecedenceBitwiseXOR: OperatorPrecedence = 8;
// BitwiseANDExpression
export const OperatorPrecedenceBitwiseAND: OperatorPrecedence = 9;
// EqualityExpression
export const OperatorPrecedenceEquality: OperatorPrecedence = 10;
// RelationalExpression
export const OperatorPrecedenceRelational: OperatorPrecedence = 11;
// ShiftExpression
export const OperatorPrecedenceShift: OperatorPrecedence = 12;
// AdditiveExpression
export const OperatorPrecedenceAdditive: OperatorPrecedence = 13;
// MultiplicativeExpression
export const OperatorPrecedenceMultiplicative: OperatorPrecedence = 14;
// ExponentiationExpression
export const OperatorPrecedenceExponentiation: OperatorPrecedence = 15;
// UnaryExpression
export const OperatorPrecedenceUnary: OperatorPrecedence = 16;
// UpdateExpression
export const OperatorPrecedenceUpdate: OperatorPrecedence = 17;
// LeftHandSideExpression: NewExpression
export const OperatorPrecedenceLeftHandSide: OperatorPrecedence = 18;
// LeftHandSideExpression: OptionalExpression
export const OperatorPrecedenceOptionalChain: OperatorPrecedence = 19;
// MemberExpression
export const OperatorPrecedenceMember: OperatorPrecedence = 20;
// PrimaryExpression
export const OperatorPrecedencePrimary: OperatorPrecedence = 21;
// CoverParenthesizedExpressionAndArrowParameterList
export const OperatorPrecedenceParentheses: OperatorPrecedence = 22;
export const OperatorPrecedenceLowest: OperatorPrecedence = OperatorPrecedenceComma;
export const OperatorPrecedenceHighest: OperatorPrecedence = OperatorPrecedenceParentheses;
export const OperatorPrecedenceDisallowComma: OperatorPrecedence = OperatorPrecedenceYield;
// ShortCircuitExpression / CoalesceExpression
export const OperatorPrecedenceCoalesce: OperatorPrecedence = OperatorPrecedenceLogicalOR;
// -1 is lower than all other precedences. Returning it will cause binary expression
// parsing to stop.
export const OperatorPrecedenceInvalid: OperatorPrecedence = -1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::getOperator","kind":"func","status":"implemented","sigHash":"29331344614a72e32588c92655e69fa97588faacece545c6c6f38b2940426f97"}
 *
 * Go source:
 * func getOperator(expression *Expression) Kind {
 * 	switch expression.Kind {
 * 	case KindBinaryExpression:
 * 		return expression.AsBinaryExpression().OperatorToken.Kind
 * 	case KindPrefixUnaryExpression:
 * 		return expression.AsPrefixUnaryExpression().Operator
 * 	case KindPostfixUnaryExpression:
 * 		return expression.AsPostfixUnaryExpression().Operator
 * 	default:
 * 		return expression.Kind
 * 	}
 * }
 */
export function getOperator(expression: GoPtr<Expression>): Kind {
  switch (expression!.Kind) {
    case KindBinaryExpression:
      return AsBinaryExpression(expression)!.OperatorToken!.Kind;
    case KindPrefixUnaryExpression:
      return AsPrefixUnaryExpression(expression)!.Operator;
    case KindPostfixUnaryExpression:
      return AsPostfixUnaryExpression(expression)!.Operator;
    default:
      return expression!.Kind;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::GetExpressionPrecedence","kind":"func","status":"implemented","sigHash":"2f759f78856f2647acfbea31411f5f19e3e59e3c30c26d562ce8f0107031d389"}
 *
 * Go source:
 * func GetExpressionPrecedence(expression *Expression) OperatorPrecedence {
 * 	operator := getOperator(expression)
 * 	var flags OperatorPrecedenceFlags
 * 	if expression.Kind == KindNewExpression && expression.ArgumentList() == nil {
 * 		flags = OperatorPrecedenceFlagsNewWithoutArguments
 * 	} else if IsOptionalChain(expression) {
 * 		flags = OperatorPrecedenceFlagsOptionalChain
 * 	}
 * 	return GetOperatorPrecedence(expression.Kind, operator, flags)
 * }
 */
// Gets the precedence of an expression
export function GetExpressionPrecedence(expression: GoPtr<Expression>): OperatorPrecedence {
  const operator = getOperator(expression);
  const flags: OperatorPrecedenceFlags =
    expression!.Kind === KindNewExpression && Node_ArgumentList(expression) === undefined
      ? OperatorPrecedenceFlagsNewWithoutArguments
      : IsOptionalChain(expression)
        ? OperatorPrecedenceFlagsOptionalChain
        : OperatorPrecedenceFlagsNone;
  return GetOperatorPrecedence(expression!.Kind, operator, flags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::type::OperatorPrecedenceFlags","kind":"type","status":"implemented","sigHash":"170f7c898cd1429d33f0c50455403fe667d4d5696f207d570220e81be7c29409"}
 *
 * Go source:
 * OperatorPrecedenceFlags int
 */
export type OperatorPrecedenceFlags = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::constGroup::OperatorPrecedenceFlagsNone+OperatorPrecedenceFlagsNewWithoutArguments+OperatorPrecedenceFlagsOptionalChain","kind":"constGroup","status":"implemented","sigHash":"83d2759097458a7b2cbb48717998b40c1f68741251513e10edd4877faa4b7ebb"}
 *
 * Go source:
 * const (
 * 	OperatorPrecedenceFlagsNone                OperatorPrecedenceFlags = 0
 * 	OperatorPrecedenceFlagsNewWithoutArguments OperatorPrecedenceFlags = 1 << 0
 * 	OperatorPrecedenceFlagsOptionalChain       OperatorPrecedenceFlags = 1 << 1
 * )
 */
export const OperatorPrecedenceFlagsNone: OperatorPrecedenceFlags = 0;
export const OperatorPrecedenceFlagsNewWithoutArguments: OperatorPrecedenceFlags = 1 << 0;
export const OperatorPrecedenceFlagsOptionalChain: OperatorPrecedenceFlags = 1 << 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::GetOperatorPrecedence","kind":"func","status":"implemented","sigHash":"0a277c01e562cc3515bf5fefe63fe663bcecbeea970e54866f010a537cde0b9e"}
 *
 * Go source:
 * func GetOperatorPrecedence(nodeKind Kind, operatorKind Kind, flags OperatorPrecedenceFlags) OperatorPrecedence {
 * 	switch nodeKind {
 * 	case KindSpreadElement:
 * 		return OperatorPrecedenceSpread
 * 	case KindYieldExpression:
 * 		return OperatorPrecedenceYield
 * 	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
 * 	case KindArrowFunction:
 * 		return OperatorPrecedenceAssignment
 * 	case KindConditionalExpression:
 * 		return OperatorPrecedenceConditional
 * 	case KindBinaryExpression:
 * 		switch operatorKind {
 * 		case KindCommaToken:
 * 			return OperatorPrecedenceComma
 *
 * 		case KindEqualsToken,
 * 			KindPlusEqualsToken,
 * 			KindMinusEqualsToken,
 * 			KindAsteriskAsteriskEqualsToken,
 * 			KindAsteriskEqualsToken,
 * 			KindSlashEqualsToken,
 * 			KindPercentEqualsToken,
 * 			KindLessThanLessThanEqualsToken,
 * 			KindGreaterThanGreaterThanEqualsToken,
 * 			KindGreaterThanGreaterThanGreaterThanEqualsToken,
 * 			KindAmpersandEqualsToken,
 * 			KindCaretEqualsToken,
 * 			KindBarEqualsToken,
 * 			KindBarBarEqualsToken,
 * 			KindAmpersandAmpersandEqualsToken,
 * 			KindQuestionQuestionEqualsToken:
 * 			return OperatorPrecedenceAssignment
 *
 * 		default:
 * 			return GetBinaryOperatorPrecedence(operatorKind)
 * 		}
 * 	// TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
 * 	case KindTypeAssertionExpression,
 * 		KindNonNullExpression,
 * 		KindPrefixUnaryExpression,
 * 		KindTypeOfExpression,
 * 		KindVoidExpression,
 * 		KindDeleteExpression,
 * 		KindAwaitExpression:
 * 		return OperatorPrecedenceUnary
 *
 * 	case KindPostfixUnaryExpression:
 * 		return OperatorPrecedenceUpdate
 *
 * 	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
 * 	case KindPropertyAccessExpression, KindElementAccessExpression:
 * 		if flags&OperatorPrecedenceFlagsOptionalChain != 0 {
 * 			return OperatorPrecedenceOptionalChain
 * 		}
 * 		return OperatorPrecedenceMember
 *
 * 	case KindCallExpression:
 * 		if flags&OperatorPrecedenceFlagsOptionalChain != 0 {
 * 			return OperatorPrecedenceOptionalChain
 * 		}
 * 		return OperatorPrecedenceMember
 *
 * 	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
 * 	case KindNewExpression:
 * 		if flags&OperatorPrecedenceFlagsNewWithoutArguments != 0 {
 * 			return OperatorPrecedenceLeftHandSide
 * 		}
 * 		return OperatorPrecedenceMember
 *
 * 	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
 * 	case KindTaggedTemplateExpression, KindMetaProperty, KindExpressionWithTypeArguments:
 * 		return OperatorPrecedenceMember
 *
 * 	case KindAsExpression,
 * 		KindSatisfiesExpression:
 * 		return OperatorPrecedenceRelational
 *
 * 	case KindThisKeyword,
 * 		KindSuperKeyword,
 * 		KindImportKeyword,
 * 		KindIdentifier,
 * 		KindPrivateIdentifier,
 * 		KindNullKeyword,
 * 		KindTrueKeyword,
 * 		KindFalseKeyword,
 * 		KindNumericLiteral,
 * 		KindBigIntLiteral,
 * 		KindStringLiteral,
 * 		KindArrayLiteralExpression,
 * 		KindObjectLiteralExpression,
 * 		KindFunctionExpression,
 * 		KindClassExpression,
 * 		KindRegularExpressionLiteral,
 * 		KindNoSubstitutionTemplateLiteral,
 * 		KindTemplateExpression,
 * 		KindOmittedExpression,
 * 		KindJsxElement,
 * 		KindJsxSelfClosingElement,
 * 		KindJsxFragment,
 * 		KindMissingDeclaration:
 * 		return OperatorPrecedencePrimary
 *
 * 	// !!! By necessity, this differs from the old compiler to support emit. consider backporting
 * 	case KindParenthesizedExpression:
 * 		return OperatorPrecedenceParentheses
 *
 * 	default:
 * 		return OperatorPrecedenceInvalid
 * 	}
 * }
 */
// Gets the precedence of an operator
export function GetOperatorPrecedence(nodeKind: Kind, operatorKind: Kind, flags: OperatorPrecedenceFlags): OperatorPrecedence {
  switch (nodeKind) {
    case KindSpreadElement:
      return OperatorPrecedenceSpread;
    case KindYieldExpression:
      return OperatorPrecedenceYield;
    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case KindArrowFunction:
      return OperatorPrecedenceAssignment;
    case KindConditionalExpression:
      return OperatorPrecedenceConditional;
    case KindBinaryExpression:
      switch (operatorKind) {
        case KindCommaToken:
          return OperatorPrecedenceComma;

        case KindEqualsToken:
        case KindPlusEqualsToken:
        case KindMinusEqualsToken:
        case KindAsteriskAsteriskEqualsToken:
        case KindAsteriskEqualsToken:
        case KindSlashEqualsToken:
        case KindPercentEqualsToken:
        case KindLessThanLessThanEqualsToken:
        case KindGreaterThanGreaterThanEqualsToken:
        case KindGreaterThanGreaterThanGreaterThanEqualsToken:
        case KindAmpersandEqualsToken:
        case KindCaretEqualsToken:
        case KindBarEqualsToken:
        case KindBarBarEqualsToken:
        case KindAmpersandAmpersandEqualsToken:
        case KindQuestionQuestionEqualsToken:
          return OperatorPrecedenceAssignment;

        default:
          return GetBinaryOperatorPrecedence(operatorKind);
      }
    // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
    case KindTypeAssertionExpression:
    case KindNonNullExpression:
    case KindPrefixUnaryExpression:
    case KindTypeOfExpression:
    case KindVoidExpression:
    case KindDeleteExpression:
    case KindAwaitExpression:
      return OperatorPrecedenceUnary;

    case KindPostfixUnaryExpression:
      return OperatorPrecedenceUpdate;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case KindPropertyAccessExpression:
    case KindElementAccessExpression:
      if ((flags & OperatorPrecedenceFlagsOptionalChain) !== 0) {
        return OperatorPrecedenceOptionalChain;
      }
      return OperatorPrecedenceMember;

    case KindCallExpression:
      if ((flags & OperatorPrecedenceFlagsOptionalChain) !== 0) {
        return OperatorPrecedenceOptionalChain;
      }
      return OperatorPrecedenceMember;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case KindNewExpression:
      if ((flags & OperatorPrecedenceFlagsNewWithoutArguments) !== 0) {
        return OperatorPrecedenceLeftHandSide;
      }
      return OperatorPrecedenceMember;

    // !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
    case KindTaggedTemplateExpression:
    case KindMetaProperty:
    case KindExpressionWithTypeArguments:
      return OperatorPrecedenceMember;

    case KindAsExpression:
    case KindSatisfiesExpression:
      return OperatorPrecedenceRelational;

    case KindThisKeyword:
    case KindSuperKeyword:
    case KindImportKeyword:
    case KindIdentifier:
    case KindPrivateIdentifier:
    case KindNullKeyword:
    case KindTrueKeyword:
    case KindFalseKeyword:
    case KindNumericLiteral:
    case KindBigIntLiteral:
    case KindStringLiteral:
    case KindArrayLiteralExpression:
    case KindObjectLiteralExpression:
    case KindFunctionExpression:
    case KindClassExpression:
    case KindRegularExpressionLiteral:
    case KindNoSubstitutionTemplateLiteral:
    case KindTemplateExpression:
    case KindOmittedExpression:
    case KindJsxElement:
    case KindJsxSelfClosingElement:
    case KindJsxFragment:
    case KindMissingDeclaration:
      return OperatorPrecedencePrimary;

    // !!! By necessity, this differs from the old compiler to support emit. consider backporting
    case KindParenthesizedExpression:
      return OperatorPrecedenceParentheses;

    default:
      return OperatorPrecedenceInvalid;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::GetBinaryOperatorPrecedence","kind":"func","status":"implemented","sigHash":"ec1b24d6ce5df547b37d11d8080d903b1dae07ffdc3ddece56438f325c2d41c4"}
 *
 * Go source:
 * func GetBinaryOperatorPrecedence(operatorKind Kind) OperatorPrecedence {
 * 	switch operatorKind {
 * 	case KindQuestionQuestionToken:
 * 		return OperatorPrecedenceCoalesce
 * 	case KindBarBarToken:
 * 		return OperatorPrecedenceLogicalOR
 * 	case KindAmpersandAmpersandToken:
 * 		return OperatorPrecedenceLogicalAND
 * 	case KindBarToken:
 * 		return OperatorPrecedenceBitwiseOR
 * 	case KindCaretToken:
 * 		return OperatorPrecedenceBitwiseXOR
 * 	case KindAmpersandToken:
 * 		return OperatorPrecedenceBitwiseAND
 * 	case KindEqualsEqualsToken, KindExclamationEqualsToken, KindEqualsEqualsEqualsToken, KindExclamationEqualsEqualsToken:
 * 		return OperatorPrecedenceEquality
 * 	case KindLessThanToken, KindGreaterThanToken, KindLessThanEqualsToken, KindGreaterThanEqualsToken,
 * 		KindInstanceOfKeyword, KindInKeyword, KindAsKeyword, KindSatisfiesKeyword:
 * 		return OperatorPrecedenceRelational
 * 	case KindLessThanLessThanToken, KindGreaterThanGreaterThanToken, KindGreaterThanGreaterThanGreaterThanToken:
 * 		return OperatorPrecedenceShift
 * 	case KindPlusToken, KindMinusToken:
 * 		return OperatorPrecedenceAdditive
 * 	case KindAsteriskToken, KindSlashToken, KindPercentToken:
 * 		return OperatorPrecedenceMultiplicative
 * 	case KindAsteriskAsteriskToken:
 * 		return OperatorPrecedenceExponentiation
 * 	}
 * 	// -1 is lower than all other precedences.  Returning it will cause binary expression
 * 	// parsing to stop.
 * 	return OperatorPrecedenceInvalid
 * }
 */
// Gets the precedence of a binary operator
export function GetBinaryOperatorPrecedence(operatorKind: Kind): OperatorPrecedence {
  switch (operatorKind) {
    case KindQuestionQuestionToken:
      return OperatorPrecedenceCoalesce;
    case KindBarBarToken:
      return OperatorPrecedenceLogicalOR;
    case KindAmpersandAmpersandToken:
      return OperatorPrecedenceLogicalAND;
    case KindBarToken:
      return OperatorPrecedenceBitwiseOR;
    case KindCaretToken:
      return OperatorPrecedenceBitwiseXOR;
    case KindAmpersandToken:
      return OperatorPrecedenceBitwiseAND;
    case KindEqualsEqualsToken:
    case KindExclamationEqualsToken:
    case KindEqualsEqualsEqualsToken:
    case KindExclamationEqualsEqualsToken:
      return OperatorPrecedenceEquality;
    case KindLessThanToken:
    case KindGreaterThanToken:
    case KindLessThanEqualsToken:
    case KindGreaterThanEqualsToken:
    case KindInstanceOfKeyword:
    case KindInKeyword:
    case KindAsKeyword:
    case KindSatisfiesKeyword:
      return OperatorPrecedenceRelational;
    case KindLessThanLessThanToken:
    case KindGreaterThanGreaterThanToken:
    case KindGreaterThanGreaterThanGreaterThanToken:
      return OperatorPrecedenceShift;
    case KindPlusToken:
    case KindMinusToken:
      return OperatorPrecedenceAdditive;
    case KindAsteriskToken:
    case KindSlashToken:
    case KindPercentToken:
      return OperatorPrecedenceMultiplicative;
    case KindAsteriskAsteriskToken:
      return OperatorPrecedenceExponentiation;
  }
  // -1 is lower than all other precedences.  Returning it will cause binary expression
  // parsing to stop.
  return OperatorPrecedenceInvalid;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::GetLeftmostExpression","kind":"func","status":"implemented","sigHash":"2886728616d90e60219bebded8b3f5e9484e801e77775452e9894c1764f8625a"}
 *
 * Go source:
 * func GetLeftmostExpression(node *Expression, stopAtCallExpressions bool) *Expression {
 * 	for {
 * 		switch node.Kind {
 * 		case KindPostfixUnaryExpression:
 * 			node = node.AsPostfixUnaryExpression().Operand
 * 			continue
 * 		case KindBinaryExpression:
 * 			node = node.AsBinaryExpression().Left
 * 			continue
 * 		case KindConditionalExpression:
 * 			node = node.AsConditionalExpression().Condition
 * 			continue
 * 		case KindTaggedTemplateExpression:
 * 			node = node.AsTaggedTemplateExpression().Tag
 * 			continue
 * 		case KindCallExpression:
 * 			if stopAtCallExpressions {
 * 				return node
 * 			}
 * 			fallthrough
 * 		case KindAsExpression,
 * 			KindElementAccessExpression,
 * 			KindPropertyAccessExpression,
 * 			KindNonNullExpression,
 * 			KindPartiallyEmittedExpression,
 * 			KindSatisfiesExpression:
 * 			node = node.Expression()
 * 			continue
 * 		}
 * 		return node
 * 	}
 * }
 */
// Gets the leftmost expression of an expression, e.g. `a` in `a.b`, `a[b]`, `a++`, `a+b`, `a?b:c`, `a as B`, etc.
export function GetLeftmostExpression(node: GoPtr<Expression>, stopAtCallExpressions: bool): GoPtr<Expression> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    switch (node!.Kind) {
      case KindPostfixUnaryExpression:
        node = AsPostfixUnaryExpression(node)!.Operand;
        continue;
      case KindBinaryExpression:
        node = AsBinaryExpression(node)!.Left;
        continue;
      case KindConditionalExpression:
        node = AsConditionalExpression(node)!.Condition;
        continue;
      case KindTaggedTemplateExpression:
        node = AsTaggedTemplateExpression(node)!.Tag;
        continue;
      case KindCallExpression:
        if (stopAtCallExpressions) {
          return node;
        }
        // fallthrough
        node = Node_Expression(node);
        continue;
      case KindAsExpression:
      case KindElementAccessExpression:
      case KindPropertyAccessExpression:
      case KindNonNullExpression:
      case KindPartiallyEmittedExpression:
      case KindSatisfiesExpression:
        node = Node_Expression(node);
        continue;
    }
    return node;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::type::TypePrecedence","kind":"type","status":"implemented","sigHash":"e7bcd80456da6c1c7486881de4390a20c954281324e176d935687ef10452281d"}
 *
 * Go source:
 * TypePrecedence int32
 */
export type TypePrecedence = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::constGroup::TypePrecedenceConditional+TypePrecedenceJSDoc+TypePrecedenceFunction+TypePrecedenceUnion+TypePrecedenceIntersection+TypePrecedenceTypeOperator+TypePrecedencePostfix+TypePrecedenceNonArray+TypePrecedenceLowest+TypePrecedenceHighest","kind":"constGroup","status":"implemented","sigHash":"318e4a17bb7d7c562aa6dfd074306cae2b87d53f85754d9d0fdadf2c43f60e3b"}
 *
 * Go source:
 * const (
 * 	// Conditional precedence (lowest)
 * 	//
 * 	//   Type[Extends]:
 * 	//       ConditionalTypeNode[?Extends]
 * 	//
 * 	//   ConditionalTypeNode[Extends]:
 * 	//       [~Extends] UnionTypeNode `extends` Type[+Extends] `?` Type[~Extends] `:` Type[~Extends]
 * 	//
 * 	TypePrecedenceConditional TypePrecedence = iota
 *
 * 	// JSDoc precedence (optional and variadic types)
 * 	//
 * 	//    JSDocType:
 * 	//      `...`? Type `=`?
 * 	TypePrecedenceJSDoc
 *
 * 	// Function precedence
 * 	//
 * 	//   Type[Extends]:
 * 	//       ConditionalTypeNode[?Extends]
 * 	//       FunctionTypeNode[?Extends]
 * 	//       ConstructorTypeNode[?Extends]
 * 	//
 * 	//   ConditionalTypeNode[Extends]:
 * 	//       UnionTypeNode
 * 	//
 * 	//   FunctionTypeNode[Extends]:
 * 	//       TypeParameters? ArrowParameters `=>` Type[?Extends]
 * 	//
 * 	//   ConstructorTypeNode[Extends]:
 * 	//       `abstract`? TypeParameters? ArrowParameters `=>` Type[?Extends]
 * 	//
 * 	TypePrecedenceFunction
 *
 * 	// Union precedence
 * 	//
 * 	//   UnionTypeNode:
 * 	//       `|`? UnionTypeNoBar
 * 	//
 * 	//   UnionTypeNoBar:
 * 	//       IntersectionTypeNode
 * 	//       UnionTypeNoBar `|` IntersectionTypeNode
 * 	//
 * 	TypePrecedenceUnion
 *
 * 	// Intersection precedence
 * 	//
 * 	//   IntersectionTypeNode:
 * 	//       `&`? IntersectionTypeNoAmpersand
 * 	//
 * 	//   IntersectionTypeNoAmpersand:
 * 	//       TypeOperatorNode
 * 	//       IntersectionTypeNoAmpersand `&` TypeOperatorNode
 * 	//
 * 	TypePrecedenceIntersection
 *
 * 	// TypeOperatorNode precedence
 * 	//
 * 	//   TypeOperatorNode:
 * 	//     PostfixType
 * 	//     InferTypeNode
 * 	//     `keyof` TypeOperatorNode
 * 	//     `unique` TypeOperatorNode
 * 	//     `readonly` PostfixType
 * 	//
 * 	//   InferTypeNode:
 * 	//     `infer` BindingIdentifier
 * 	//     `infer` BindingIdentifier `extends` Type[+Extends]
 * 	//
 * 	TypePrecedenceTypeOperator
 *
 * 	// Postfix precedence
 * 	//
 * 	//   PostfixType:
 * 	//       NonArrayType
 * 	//       OptionalTypeNode
 * 	//       ArrayTypeNode
 * 	//       IndexedAccessTypeNode
 * 	//
 * 	//   OptionalTypeNode:
 * 	//       PostfixType `?`
 * 	//
 * 	//   ArrayTypeNode:
 * 	//       PostfixType `[` `]`
 * 	//
 * 	//   IndexedAccessTypeNode:
 * 	//       PostfixType `[` Type[~Extends] `]`
 * 	//
 * 	TypePrecedencePostfix
 *
 * 	// NonArray precedence (highest)
 * 	//
 * 	//   NonArrayType:
 * 	//       KeywordType
 * 	//       LiteralTypeNode
 * 	//       ThisTypeNode
 * 	//       ImportType
 * 	//       TypeQueryNode
 * 	//       MappedTypeNode
 * 	//       TypeLiteralNode
 * 	//       TupleTypeNode
 * 	//       ParenthesizedTypeNode
 * 	//       TypePredicateNode
 * 	//       TypeReferenceNode
 * 	//       TemplateType
 * 	//
 * 	//   KeywordType: one of
 * 	//       `any`       `unknown` `string`    `number` `bigint`
 * 	//       `symbol`    `boolean` `undefined` `never`  `object`
 * 	//       `intrinsic` `void`
 * 	//
 * 	//   LiteralTypeNode:
 * 	//       StringLiteral
 * 	//       NoSubstitutionTemplateLiteral
 * 	//       NumericLiteral
 * 	//       BigIntLiteral
 * 	//       `-` NumericLiteral
 * 	//       `-` BigIntLiteral
 * 	//       `true`
 * 	//       `false`
 * 	//       `null`
 * 	//
 * 	//   ThisTypeNode:
 * 	//       `this`
 * 	//
 * 	//   ImportType:
 * 	//       `typeof`? `import` `(` Type[~Extends] `,`? `)` ImportTypeQualifier? TypeArguments?
 * 	//       `typeof`? `import` `(` Type[~Extends] `,` ImportTypeAttributes `,`? `)` ImportTypeQualifier? TypeArguments?
 * 	//
 * 	//   ImportTypeQualifier:
 * 	//       `.` EntityName
 * 	//
 * 	//   ImportTypeAttributes:
 * 	//       `{` `with` `:` ImportAttributes `,`? `}`
 * 	//
 * 	//   TypeQueryNode:
 * 	//
 * 	//   MappedTypeNode:
 * 	//       `{` MappedTypePrefix? MappedTypePropertyName MappedTypeSuffix? `:` Type[~Extends] `;` `}`
 * 	//
 * 	//   MappedTypePrefix:
 * 	//       `readonly`
 * 	//       `+` `readonly`
 * 	//       `-` `readonly`
 * 	//
 * 	//   MappedTypePropertyName:
 * 	//       `[` BindingIdentifier `in` Type[~Extends] `]`
 * 	//       `[` BindingIdentifier `in` Type[~Extends] `as` Type[~Extends] `]`
 * 	//
 * 	//   MappedTypeSuffix:
 * 	//       `?`
 * 	//       `+` `?`
 * 	//       `-` `?`
 * 	//
 * 	//   TypeLiteralNode:
 * 	//       `{` TypeElementList `}`
 * 	//
 * 	//   TypeElementList:
 * 	//       [empty]
 * 	//       TypeElementList TypeElement
 * 	//
 * 	//   TypeElement:
 * 	//       PropertySignatureDeclaration
 * 	//       MethodSignatureDeclaration
 * 	//       IndexSignatureDeclaration
 * 	//       CallSignatureDeclaration
 * 	//       ConstructSignatureDeclaration
 * 	//
 * 	//   PropertySignatureDeclaration:
 * 	//       PropertyName `?`? TypeAnnotation? `;`
 * 	//
 * 	//   MethodSignatureDeclaration:
 * 	//       PropertyName `?`? TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
 * 	//       `get` PropertyName TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;` // GetAccessorDeclaration
 * 	//       `set` PropertyName TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;` // SetAccessorDeclaration
 * 	//
 * 	//   IndexSignatureDeclaration:
 * 	//       `[` IdentifierName`]` TypeAnnotation `;`
 * 	//
 * 	//   CallSignatureDeclaration:
 * 	//       TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
 * 	//
 * 	//   ConstructSignatureDeclaration:
 * 	//       `new` TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
 * 	//
 * 	//   TupleTypeNode:
 * 	//       `[` `]`
 * 	//       `[` NamedTupleElementTypes `,`? `]`
 * 	//       `[` TupleElementTypes `,`? `]`
 * 	//
 * 	//   NamedTupleElementTypes:
 * 	//       NamedTupleMember
 * 	//       NamedTupleElementTypes `,` NamedTupleMember
 * 	//
 * 	//   NamedTupleMember:
 * 	//       IdentifierName `?`? `:` Type[~Extends]
 * 	//       `...` IdentifierName `:` Type[~Extends]
 * 	//
 * 	//   TupleElementTypes:
 * 	//       TupleElementType
 * 	//       TupleElementTypes `,` TupleElementType
 * 	//
 * 	//   TupleElementType:
 * 	//       Type[~Extends]
 * 	//       OptionalTypeNode
 * 	//       RestTypeNode
 * 	//
 * 	//   RestTypeNode:
 * 	//       `...` Type[~Extends]
 * 	//
 * 	//   ParenthesizedTypeNode:
 * 	//       `(` Type[~Extends] `)`
 * 	//
 * 	//   TypePredicateNode:
 * 	//       `asserts`? TypePredicateParameterName
 * 	//       `asserts`? TypePredicateParameterName `is` Type[~Extends]
 * 	//
 * 	//   TypePredicateParameterName:
 * 	//       `this`
 * 	//       IdentifierReference
 * 	//
 * 	//   TypeReferenceNode:
 * 	//       EntityName TypeArguments?
 * 	//
 * 	//   TemplateType:
 * 	//       TemplateHead Type[~Extends] TemplateTypeSpans
 * 	//
 * 	//   TemplateTypeSpans:
 * 	//       TemplateTail
 * 	//       TemplateTypeMiddleList TemplateTail
 * 	//
 * 	//   TemplateTypeMiddleList:
 * 	//       TemplateMiddle Type[~Extends]
 * 	//       TemplateTypeMiddleList TemplateMiddle Type[~Extends]
 * 	//
 * 	//   TypeArguments:
 * 	//       `<` TypeArgumentList `,`? `>`
 * 	//
 * 	//   TypeArgumentList:
 * 	//       Type[~Extends]
 * 	//       TypeArgumentList `,` Type[~Extends]
 * 	//
 * 	TypePrecedenceNonArray
 *
 * 	TypePrecedenceLowest  = TypePrecedenceConditional
 * 	TypePrecedenceHighest = TypePrecedenceNonArray
 * )
 */
// Conditional precedence (lowest)
export const TypePrecedenceConditional: TypePrecedence = 0;
// JSDoc precedence (optional and variadic types)
export const TypePrecedenceJSDoc: TypePrecedence = 1;
// Function precedence
export const TypePrecedenceFunction: TypePrecedence = 2;
// Union precedence
export const TypePrecedenceUnion: TypePrecedence = 3;
// Intersection precedence
export const TypePrecedenceIntersection: TypePrecedence = 4;
// TypeOperatorNode precedence
export const TypePrecedenceTypeOperator: TypePrecedence = 5;
// Postfix precedence
export const TypePrecedencePostfix: TypePrecedence = 6;
// NonArray precedence (highest)
export const TypePrecedenceNonArray: TypePrecedence = 7;

export const TypePrecedenceLowest: TypePrecedence = TypePrecedenceConditional;
export const TypePrecedenceHighest: TypePrecedence = TypePrecedenceNonArray;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/precedence.go::func::GetTypeNodePrecedence","kind":"func","status":"implemented","sigHash":"8e02a006cfe44be48b936be4d2ef350197bbddeb73193552a83c676aa3e5db3a"}
 *
 * Go source:
 * func GetTypeNodePrecedence(n *TypeNode) TypePrecedence {
 * 	switch n.Kind {
 * 	case KindConditionalType:
 * 		return TypePrecedenceConditional
 * 	case KindJSDocOptionalType, KindJSDocVariadicType:
 * 		return TypePrecedenceJSDoc
 * 	case KindFunctionType, KindConstructorType:
 * 		return TypePrecedenceFunction
 * 	case KindUnionType:
 * 		return TypePrecedenceUnion
 * 	case KindIntersectionType:
 * 		return TypePrecedenceIntersection
 * 	case KindTypeOperator:
 * 		return TypePrecedenceTypeOperator
 * 	case KindInferType:
 * 		if n.AsInferTypeNode().TypeParameter.AsTypeParameterDeclaration().Constraint != nil {
 * 			// `infer T extends U` must be treated as FunctionTypeNode precedence as the `extends` clause eagerly consumes
 * 			// TypeNode
 * 			return TypePrecedenceFunction
 * 		}
 * 		return TypePrecedenceTypeOperator
 * 	case KindIndexedAccessType, KindArrayType, KindOptionalType:
 * 		return TypePrecedencePostfix
 * 	case KindTypeQuery:
 * 		// TypeQueryNode is actually a NonArrayType, but we treat it as TypeOperatorNode
 * 		// precedence so that it is parenthesized when used in a PostfixType
 * 		// context (e.g., `(typeof C)[]` instead of `typeof C[]`)
 * 		return TypePrecedenceTypeOperator
 * 	case KindAnyKeyword,
 * 		KindUnknownKeyword,
 * 		KindStringKeyword,
 * 		KindNumberKeyword,
 * 		KindBigIntKeyword,
 * 		KindSymbolKeyword,
 * 		KindBooleanKeyword,
 * 		KindUndefinedKeyword,
 * 		KindNeverKeyword,
 * 		KindObjectKeyword,
 * 		KindIntrinsicKeyword,
 * 		KindVoidKeyword,
 * 		KindJSDocAllType,
 * 		KindJSDocNullableType,
 * 		KindJSDocNonNullableType,
 * 		KindLiteralType,
 * 		KindTypePredicate,
 * 		KindTypeReference,
 * 		KindTypeLiteral,
 * 		KindTupleType,
 * 		KindRestType,
 * 		KindParenthesizedType,
 * 		KindThisType,
 * 		KindMappedType,
 * 		KindNamedTupleMember,
 * 		KindTemplateLiteralType,
 * 		KindImportType,
 * 		// These occur in pseudo-types like `f<T>.C`, where `f` is a generic function and `C` is a local type
 * 		KindPropertyAccessExpression,
 * 		KindExpressionWithTypeArguments:
 * 		return TypePrecedenceNonArray
 * 	default:
 * 		panic(fmt.Sprintf("unhandled TypeNode: %v", n.Kind))
 * 	}
 * }
 */
// Gets the precedence of a TypeNode
export function GetTypeNodePrecedence(n: GoPtr<TypeNode>): TypePrecedence {
  switch (n!.Kind) {
    case KindConditionalType:
      return TypePrecedenceConditional;
    case KindJSDocOptionalType:
    case KindJSDocVariadicType:
      return TypePrecedenceJSDoc;
    case KindFunctionType:
    case KindConstructorType:
      return TypePrecedenceFunction;
    case KindUnionType:
      return TypePrecedenceUnion;
    case KindIntersectionType:
      return TypePrecedenceIntersection;
    case KindTypeOperator:
      return TypePrecedenceTypeOperator;
    case KindInferType:
      if (AsTypeParameterDeclaration(AsInferTypeNode(n)!.TypeParameter)!.Constraint !== undefined) {
        // `infer T extends U` must be treated as FunctionTypeNode precedence as the `extends` clause eagerly consumes
        // TypeNode
        return TypePrecedenceFunction;
      }
      return TypePrecedenceTypeOperator;
    case KindIndexedAccessType:
    case KindArrayType:
    case KindOptionalType:
      return TypePrecedencePostfix;
    case KindTypeQuery:
      // TypeQueryNode is actually a NonArrayType, but we treat it as TypeOperatorNode
      // precedence so that it is parenthesized when used in a PostfixType
      // context (e.g., `(typeof C)[]` instead of `typeof C[]`)
      return TypePrecedenceTypeOperator;
    case KindAnyKeyword:
    case KindUnknownKeyword:
    case KindStringKeyword:
    case KindNumberKeyword:
    case KindBigIntKeyword:
    case KindSymbolKeyword:
    case KindBooleanKeyword:
    case KindUndefinedKeyword:
    case KindNeverKeyword:
    case KindObjectKeyword:
    case KindIntrinsicKeyword:
    case KindVoidKeyword:
    case KindJSDocAllType:
    case KindJSDocNullableType:
    case KindJSDocNonNullableType:
    case KindLiteralType:
    case KindTypePredicate:
    case KindTypeReference:
    case KindTypeLiteral:
    case KindTupleType:
    case KindRestType:
    case KindParenthesizedType:
    case KindThisType:
    case KindMappedType:
    case KindNamedTupleMember:
    case KindTemplateLiteralType:
    case KindImportType:
    // These occur in pseudo-types like `f<T>.C`, where `f` is a generic function and `C` is a local type
    case KindPropertyAccessExpression:
    case KindExpressionWithTypeArguments:
      return TypePrecedenceNonArray;
    default:
      throw new globalThis.Error(fmt.Sprintf("unhandled TypeNode: %v", KindString(n!.Kind)));
  }
}
