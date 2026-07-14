import type { bool, int } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { GoAppend, GoNilSlice, GoSliceIsNil } from "../../go/compat.js";
import { Node_Body, Node_Expression, Node_Initializer, Node_Parameters, Node_Symbol, Node_Type } from "../ast/ast.js";
import { Node_ParameterList } from "../ast/ast.js";
import type { Node, NodeList } from "../ast/spine.js";
import { Node_AsNode, Node_FunctionLikeData, Node_KindString, Node_Name } from "../ast/spine.js";
import type { Symbol as AstSymbol } from "../ast/symbol.js";
import type { ArrayLiteralExpression, GetAccessorDeclaration, ObjectLiteralExpression, ParameterDeclaration, PrefixUnaryExpression, SetAccessorDeclaration, TypeParameterDeclaration, VariableDeclaration } from "../ast/generated/data.js";
import type { AccessorDeclaration, ParameterDeclarationNode } from "../ast/generated/unions.js";
import type { Kind } from "../ast/generated/kinds.js";
import {
  KindArrayLiteralExpression,
  KindArrowFunction,
  KindAsExpression,
  KindBigIntLiteral,
  KindBinaryExpression,
  KindBindingElement,
  KindCallExpression,
  KindCallSignature,
  KindClassExpression,
  KindComputedPropertyName,
  KindConditionalType,
  KindConstructSignature,
  KindConstructor,
  KindConstructorType,
  KindElementAccessExpression,
  KindExportAssignment,
  KindFalseKeyword,
  KindFunctionDeclaration,
  KindFunctionExpression,
  KindFunctionType,
  KindGetAccessor,
  KindIdentifier,
  KindImportType,
  KindIndexSignature,
  KindIndexedAccessType,
  KindIntersectionType,
  KindJSDocPropertyTag,
  KindJSDocSignature,
  KindMethodDeclaration,
  KindMethodSignature,
  KindNoSubstitutionTemplateLiteral,
  KindNullKeyword,
  KindNumericLiteral,
  KindObjectLiteralExpression,
  KindOmittedExpression,
  KindOptionalType,
  KindParameter,
  KindParenthesizedExpression,
  KindParenthesizedType,
  KindPlusToken,
  KindPrefixUnaryExpression,
  KindPrivateIdentifier,
  KindPropertyAccessExpression,
  KindPropertyAssignment,
  KindPropertyDeclaration,
  KindPropertySignature,
  KindQuestionToken,
  KindRestType,
  KindSetAccessor,
  KindShorthandPropertyAssignment,
  KindSpreadAssignment,
  KindSpreadElement,
  KindStringLiteral,
  KindTemplateExpression,
  KindTemplateSpan,
  KindTrueKeyword,
  KindTypeAssertionExpression,
  KindTypeOperator,
  KindTypePredicate,
  KindTypeQuery,
  KindTypeReference,
  KindUndefinedKeyword,
  KindUnionType,
  KindVariableDeclaration,
} from "../ast/generated/kinds.js";
import {
  AsAsExpression,
  AsExportAssignment,
  AsGetAccessorDeclaration,
  AsIdentifier,
  AsIntersectionTypeNode,
  AsMethodDeclaration,
  AsParameterDeclaration,
  AsParenthesizedExpression,
  AsParenthesizedTypeNode,
  AsPropertyAssignment,
  AsPropertyDeclaration,
  AsReturnStatement,
  AsSetAccessorDeclaration,
  AsTypeAssertion,
  AsTypeParameterDeclaration,
  AsUnionTypeNode,
  AsVariableDeclaration,
} from "../ast/generated/casts.js";
import {
  IsArrowFunction,
  IsBlock,
  IsCallExpression,
  IsConstructorDeclaration,
  IsFunctionDeclaration,
  IsFunctionExpression,
  IsGetAccessorDeclaration,
  IsIdentifier,
  IsJsxElement,
  IsJsxExpression,
  IsMethodDeclaration,
  IsParameterDeclaration,
  IsPropertyDeclaration,
  IsSatisfiesExpression,
  IsTemplateExpression,
  IsTypePredicateNode,
  IsVariableDeclaration,
} from "../ast/generated/predicates.js";
import { NodeFlagsThisNodeHasError } from "../ast/generated/flags.js";
import { ModifierFlagsReadonly } from "../ast/modifierflags.js";
import { FunctionFlagsAsyncGenerator, GetFunctionFlags } from "../ast/functionflags.js";
import {
  FindAncestor,
  ForEachReturnStatement,
  GetAssignmentDeclarationKind,
  GetAllAccessorDeclarationsForDeclaration,
  HasModifier,
  IsAccessor,
  IsAssertionExpression,
  IsConstAssertion,
  IsConstTypeReference,
  IsFunctionLike,
  IsPrimitiveLiteralValue,
  IsVarConst,
  IsVariableParameterOrProperty,
  JSDeclarationKindObjectDefinePropertyExports,
  JSDeclarationKindObjectDefinePropertyValue,
  NodeIsMissing,
} from "../ast/utilities.js";
import type { AllAccessorDeclarations } from "../ast/utilities.js";
import { CountWhere, Some } from "../core/core.js";
import { FailBadSyntaxKind } from "../debug/debug.js";
import type { PseudoChecker } from "./checker.js";
import type { PseudoObjectElement, PseudoParameter, PseudoType } from "./type.js";
import {
  NewPseudoGetAccessor,
  NewPseudoObjectMethod,
  NewPseudoParameter,
  NewPseudoPropertyAssignment,
  NewPseudoSetAccessor,
  NewPseudoTypeBigIntLiteral,
  NewPseudoTypeDirect,
  NewPseudoTypeInferred,
  NewPseudoTypeInferredWithErrors,
  NewPseudoTypeMaybeConstLocation,
  NewPseudoTypeNoResult,
  NewPseudoTypeNumericLiteral,
  NewPseudoTypeObjectLiteral,
  NewPseudoTypeSingleCallSignature,
  NewPseudoTypeStringLiteral,
  NewPseudoTypeTuple,
  NewPseudoTypeUnion,
  PseudoType_AsPseudoTypeDirect,
  PseudoType_AsPseudoTypeInferred,
  PseudoType_AsPseudoTypeMaybeConstLocation,
  PseudoType_AsPseudoTypeUnion,
  PseudoTypeBigInt,
  PseudoTypeBoolean,
  PseudoTypeFalse,
  PseudoTypeKindDirect,
  PseudoTypeKindInferred,
  PseudoTypeKindMaybeConstLocation,
  PseudoTypeKindNoResult,
  PseudoTypeKindUndefined,
  PseudoTypeKindUnion,
  PseudoTypeNull,
  PseudoTypeNumber,
  PseudoTypeString,
  PseudoTypeTrue,
  PseudoTypeUndefined,
} from "./type.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.GetReturnTypeOfSignature","kind":"method","status":"implemented","sigHash":"1855ca2a41c0c7f8defa6ad836870cc5e79a17863177c8787c5fc9e383b33c67"}
 *
 * Go source:
 * func (ch *PseudoChecker) GetReturnTypeOfSignature(signatureNode *ast.Node) *PseudoType {
 * 	switch signatureNode.Kind {
 * 	case ast.KindGetAccessor:
 * 		return ch.GetTypeOfAccessor(signatureNode)
 * 	case ast.KindMethodDeclaration, ast.KindFunctionDeclaration, ast.KindConstructor,
 * 		ast.KindMethodSignature, ast.KindCallSignature, ast.KindConstructSignature,
 * 		ast.KindSetAccessor, ast.KindIndexSignature, ast.KindFunctionType, ast.KindConstructorType,
 * 		ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindJSDocSignature:
 * 		return ch.createReturnFromSignature(signatureNode)
 * 	default:
 * 		debug.FailBadSyntaxKind(signatureNode, "Node needs to be an inferrable node")
 * 		return nil
 * 	}
 * }
 */
export function PseudoChecker_GetReturnTypeOfSignature(receiver: GoPtr<PseudoChecker>, signatureNode: GoPtr<Node>): GoPtr<PseudoType> {
  switch (signatureNode!.Kind) {
    case KindGetAccessor:
      return PseudoChecker_GetTypeOfAccessor(receiver, signatureNode);
    case KindMethodDeclaration:
    case KindFunctionDeclaration:
    case KindConstructor:
    case KindMethodSignature:
    case KindCallSignature:
    case KindConstructSignature:
    case KindSetAccessor:
    case KindIndexSignature:
    case KindFunctionType:
    case KindConstructorType:
    case KindFunctionExpression:
    case KindArrowFunction:
    case KindJSDocSignature:
      return PseudoChecker_createReturnFromSignature(receiver, signatureNode);
    default:
      FailBadSyntaxKind({ KindString: () => Node_KindString(signatureNode) }, "Node needs to be an inferrable node");
      return undefined;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.GetTypeOfAccessor","kind":"method","status":"implemented","sigHash":"4bea194521a8c02987f517cdb427623b0293c12e805e795b0a488007d7dfd100"}
 *
 * Go source:
 * func (ch *PseudoChecker) GetTypeOfAccessor(accessor *ast.Node) *PseudoType {
 * 	annotated := ch.typeFromAccessor(accessor)
 * 	if annotated.Kind == PseudoTypeKindNoResult {
 * 		return ch.inferAccessorType(accessor)
 * 	}
 * 	return annotated
 * }
 */
export function PseudoChecker_GetTypeOfAccessor(receiver: GoPtr<PseudoChecker>, accessor: GoPtr<Node>): GoPtr<PseudoType> {
  const annotated = PseudoChecker_typeFromAccessor(receiver, accessor);
  if (annotated!.Kind === PseudoTypeKindNoResult) {
    return PseudoChecker_inferAccessorType(receiver, accessor);
  }
  return annotated;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.GetTypeOfExpression","kind":"method","status":"implemented","sigHash":"f32eb8c40a283385bf68a05e761f09daccea00f8ad2cb254bab7d37cdf454243"}
 *
 * Go source:
 * func (ch *PseudoChecker) GetTypeOfExpression(node *ast.Node) *PseudoType {
 * 	return ch.typeFromExpression(node)
 * }
 */
export function PseudoChecker_GetTypeOfExpression(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  return PseudoChecker_typeFromExpression(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.GetTypeOfDeclaration","kind":"method","status":"implemented","sigHash":"e78a7bd0685491afef13c98a21d0430fbe1722724bbebef2d9668f7541322826"}
 *
 * Go source:
 * func (ch *PseudoChecker) GetTypeOfDeclaration(node *ast.Node) *PseudoType {
 * 	switch node.Kind {
 * 	case ast.KindParameter:
 * 		return ch.typeFromParameter(node.AsParameterDeclaration())
 * 	case ast.KindVariableDeclaration:
 * 		return ch.typeFromVariable(node.AsVariableDeclaration())
 * 	case ast.KindPropertySignature, ast.KindPropertyDeclaration, ast.KindJSDocPropertyTag:
 * 		return ch.typeFromProperty(node)
 * 	case ast.KindBindingElement:
 * 		return NewPseudoTypeNoResult(node)
 * 	case ast.KindExportAssignment:
 * 		return ch.typeFromExpression(node.AsExportAssignment().Expression)
 * 	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression, ast.KindBinaryExpression:
 * 		return ch.typeFromExpandoProperty(node)
 * 	case ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
 * 		return ch.typeFromPropertyAssignment(node)
 * 	case ast.KindCallExpression:
 * 		switch ast.GetAssignmentDeclarationKind(node) {
 * 		// TODO: How much of the checker's getTypeFromPropertyDescriptor is worth trying to emulate over ASTs?
 * 		case ast.JSDeclarationKindObjectDefinePropertyValue:
 * 			{
 * 				// !!!
 * 			}
 * 		case ast.JSDeclarationKindObjectDefinePropertyExports:
 * 			{
 * 				// !!!
 * 			}
 * 		}
 * 		return NewPseudoTypeNoResult(node)
 * 	default:
 * 		debug.FailBadSyntaxKind(node, "node needs to be an inferrable node")
 * 		return nil
 * 	}
 * }
 */
export function PseudoChecker_GetTypeOfDeclaration(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  switch (node!.Kind) {
    case KindParameter:
      return PseudoChecker_typeFromParameter(receiver, AsParameterDeclaration(node));
    case KindVariableDeclaration:
      return PseudoChecker_typeFromVariable(receiver, AsVariableDeclaration(node));
    case KindPropertySignature:
    case KindPropertyDeclaration:
    case KindJSDocPropertyTag:
      return PseudoChecker_typeFromProperty(receiver, node);
    case KindBindingElement:
      return NewPseudoTypeNoResult(node);
    case KindExportAssignment:
      return PseudoChecker_typeFromExpression(receiver, AsExportAssignment(node)!.Expression);
    case KindPropertyAccessExpression:
    case KindElementAccessExpression:
    case KindBinaryExpression:
      return PseudoChecker_typeFromExpandoProperty(receiver, node);
    case KindPropertyAssignment:
    case KindShorthandPropertyAssignment:
      return PseudoChecker_typeFromPropertyAssignment(receiver, node);
    case KindCallExpression: {
      switch (GetAssignmentDeclarationKind(node)) {
        case JSDeclarationKindObjectDefinePropertyValue:
          {
            // !!!
          }
          break;
        case JSDeclarationKindObjectDefinePropertyExports:
          {
            // !!!
          }
          break;
      }
      return NewPseudoTypeNoResult(node);
    }
    default:
      FailBadSyntaxKind({ KindString: () => Node_KindString(node) }, "node needs to be an inferrable node");
      return undefined;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromPropertyAssignment","kind":"method","status":"implemented","sigHash":"ba7f28fa5c9dff6b07fdf0ff34d5d475fe1b4e3b4075883702517ca59698e5e8"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromPropertyAssignment(node *ast.Node) *PseudoType {
 * 	annotation := node.Type()
 * 	if annotation != nil {
 * 		return NewPseudoTypeDirect(annotation)
 * 	}
 * 	if node.Kind == ast.KindPropertyAssignment {
 * 		init := node.Initializer()
 * 		if init != nil {
 * 			expr := ch.typeFromExpression(init)
 * 			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
 * 				return expr
 * 			}
 * 			// fallback to NoResult if PseudoTypeKindInferred without error nodes
 * 		}
 * 	}
 * 	return NewPseudoTypeNoResult(node)
 * }
 */
export function PseudoChecker_typeFromPropertyAssignment(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  const annotation = Node_Type(node);
  if (annotation !== undefined) {
    return NewPseudoTypeDirect(annotation);
  }
  if (node!.Kind === KindPropertyAssignment) {
    const init = Node_Initializer(node);
    if (init !== undefined) {
      const expr = PseudoChecker_typeFromExpression(receiver, init);
      if (expr !== undefined && (expr!.Kind !== PseudoTypeKindInferred || PseudoType_AsPseudoTypeInferred(expr)!.ErrorNodes.length > 0)) {
        return expr;
      }
    }
  }
  return NewPseudoTypeNoResult(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromExpandoProperty","kind":"method","status":"implemented","sigHash":"46274c0725f04a557ef01fd9aadfdb4a8a947d3b195a24a16c43204b76159129"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromExpandoProperty(node *ast.Node) *PseudoType {
 * 	declaredType := node.Type()
 * 	if declaredType != nil {
 * 		return NewPseudoTypeDirect(declaredType)
 * 	}
 * 	// While `node` is an expression, as an expando, it should also always be a
 * 	// declaration with a `.Symbol()` which requires declaration fallback handling
 * 	return NewPseudoTypeNoResult(node)
 * }
 */
export function PseudoChecker_typeFromExpandoProperty(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  const declaredType = Node_Type(node);
  if (declaredType !== undefined) {
    return NewPseudoTypeDirect(declaredType);
  }
  return NewPseudoTypeNoResult(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromProperty","kind":"method","status":"implemented","sigHash":"7741ca3e4bbf28590ac12d9274eefd62c63e5f26f84ed3145c23025a8eb9605d"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromProperty(node *ast.Node) *PseudoType {
 * 	t := node.Type()
 * 	if t != nil {
 * 		return NewPseudoTypeDirect(t)
 * 	}
 * 	if ast.IsPropertyDeclaration(node) {
 * 		init := node.Initializer()
 * 		if init != nil && !isContextuallyTyped(node) {
 * 			// explicit fail on readonly template literals to allow for literal freshness in the future
 * 			if ast.HasModifier(node, ast.ModifierFlagsReadonly) && ast.IsTemplateExpression(init) {
 * 				return NewPseudoTypeNoResult(node)
 * 			}
 * 			expr := ch.typeFromExpression(init)
 * 			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
 * 				if expr.Kind != PseudoTypeKindDirect && node.AsPropertyDeclaration().PostfixToken != nil && node.AsPropertyDeclaration().PostfixToken.Kind == ast.KindQuestionToken {
 * 					// type comes from the initializer expression on a property with a `?` - add `| undefined` to the type
 * 					return addUndefinedIfDefinitelyRequired(expr)
 * 				}
 * 				return expr
 * 			}
 * 			// fallback to NoResult if PseudoTypeKindInferred without error nodes
 * 		}
 * 	}
 * 	return NewPseudoTypeNoResult(node)
 * }
 */
export function PseudoChecker_typeFromProperty(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  const t = Node_Type(node);
  if (t !== undefined) {
    return NewPseudoTypeDirect(t);
  }
  if (IsPropertyDeclaration(node)) {
    const init = Node_Initializer(node);
    if (init !== undefined && !isContextuallyTyped(node)) {
      if (HasModifier(node, ModifierFlagsReadonly) && IsTemplateExpression(init)) {
        return NewPseudoTypeNoResult(node);
      }
      const expr = PseudoChecker_typeFromExpression(receiver, init);
      if (expr !== undefined && (expr!.Kind !== PseudoTypeKindInferred || PseudoType_AsPseudoTypeInferred(expr)!.ErrorNodes.length > 0)) {
        const propDecl = AsPropertyDeclaration(node);
        if (expr!.Kind !== PseudoTypeKindDirect && propDecl!.PostfixToken !== undefined && propDecl!.PostfixToken!.Kind === KindQuestionToken) {
          return addUndefinedIfDefinitelyRequired(expr);
        }
        return expr;
      }
    }
  }
  return NewPseudoTypeNoResult(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromVariable","kind":"method","status":"implemented","sigHash":"e4b8ccccd0481814a9b255dc19989228d07374a84c502d56a2631b65558aa452"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromVariable(declaration *ast.VariableDeclaration) *PseudoType {
 * 	t := declaration.Type
 * 	if t != nil {
 * 		return NewPseudoTypeDirect(t)
 * 	}
 * 	init := declaration.Initializer
 * 	if init != nil && (len(declaration.Symbol.Declarations) == 1 || core.CountWhere(declaration.Symbol.Declarations, ast.IsVariableDeclaration) == 1) {
 * 		if !isContextuallyTyped(declaration.AsNode()) { // TODO: also should bail on expando declarations; reuse syntactic expando check used in declaration emit
 * 			// TODO: Strada forces an inference fallback on `const` variables with template expression initializers, to leave space for template literal freshness in the future
 * 			if ast.IsVarConst(declaration.AsNode()) && ast.IsTemplateExpression(init) {
 * 				return NewPseudoTypeNoResult(declaration.AsNode())
 * 			}
 * 			expr := ch.typeFromExpression(init)
 * 			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
 * 				return expr
 * 			}
 * 			// fallback to NoResult if PseudoTypeKindInferred without error nodes
 * 		}
 * 	}
 * 	return NewPseudoTypeNoResult(declaration.AsNode())
 * }
 */
export function PseudoChecker_typeFromVariable(receiver: GoPtr<PseudoChecker>, declaration: GoPtr<VariableDeclaration>): GoPtr<PseudoType> {
  const t = declaration!.Type;
  if (t !== undefined) {
    return NewPseudoTypeDirect(t);
  }
  const init = declaration!.Initializer;
  const sym = Node_Symbol(Node_AsNode(declaration));
  if (init !== undefined && (sym!.Declarations.length === 1 || CountWhere(sym!.Declarations, IsVariableDeclaration) === 1)) {
    if (!isContextuallyTyped(Node_AsNode(declaration))) {
      if (IsVarConst(Node_AsNode(declaration)) && IsTemplateExpression(init)) {
        return NewPseudoTypeNoResult(Node_AsNode(declaration));
      }
      const expr = PseudoChecker_typeFromExpression(receiver, init);
      if (expr !== undefined && (expr!.Kind !== PseudoTypeKindInferred || PseudoType_AsPseudoTypeInferred(expr)!.ErrorNodes.length > 0)) {
        return expr;
      }
    }
  }
  return NewPseudoTypeNoResult(Node_AsNode(declaration));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromAccessor","kind":"method","status":"implemented","sigHash":"a2d8d1959af831388c70e2ffff5da25479a6f074a06f97672c078427796e659f"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromAccessor(accessor *ast.Node) *PseudoType {
 * 	accessorDeclarations := ast.GetAllAccessorDeclarationsForDeclaration(accessor, accessor.DeclarationData().Symbol.Declarations)
 * 	accessorType := ch.getTypeAnnotationFromAllAccessorDeclarations(accessor, accessorDeclarations)
 * 	if accessorType != nil && !ast.IsTypePredicateNode(accessorType) {
 * 		return NewPseudoTypeDirect(accessorType)
 * 	}
 * 	if accessorDeclarations.GetAccessor != nil {
 * 		return ch.createReturnFromSignature(accessorDeclarations.GetAccessor.AsNode())
 * 	}
 * 	return NewPseudoTypeNoResult(accessor)
 * }
 */
export function PseudoChecker_typeFromAccessor(receiver: GoPtr<PseudoChecker>, accessor: GoPtr<Node>): GoPtr<PseudoType> {
  const accessorDeclarations = GetAllAccessorDeclarationsForDeclaration(accessor as GoPtr<AccessorDeclaration>, Node_Symbol(accessor)!.Declarations);
  const accessorType = PseudoChecker_getTypeAnnotationFromAllAccessorDeclarations(receiver, accessor, accessorDeclarations);
  if (accessorType !== undefined && !IsTypePredicateNode(accessorType)) {
    return NewPseudoTypeDirect(accessorType);
  }
  if (accessorDeclarations.GetAccessor !== undefined) {
    return PseudoChecker_createReturnFromSignature(receiver, Node_AsNode(accessorDeclarations.GetAccessor));
  }
  return NewPseudoTypeNoResult(accessor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.inferAccessorType","kind":"method","status":"implemented","sigHash":"afa707c76198a50ef428945f2e11b22be4c073c12954dc83ee2de8a3246ee4c7"}
 *
 * Go source:
 * func (ch *PseudoChecker) inferAccessorType(node *ast.Node) *PseudoType {
 * 	if node.Kind == ast.KindGetAccessor {
 * 		return ch.createReturnFromSignature(node)
 * 	}
 * 	return NewPseudoTypeNoResult(node)
 * }
 */
export function PseudoChecker_inferAccessorType(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  if (node!.Kind === KindGetAccessor) {
    return PseudoChecker_createReturnFromSignature(receiver, node);
  }
  return NewPseudoTypeNoResult(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.getTypeAnnotationFromAllAccessorDeclarations","kind":"method","status":"implemented","sigHash":"1d0e0a751fb7aa01af56c012bf7fc7c325f34f1e1b9ae4e5029706b2d3a7eab9"}
 *
 * Go source:
 * func (ch *PseudoChecker) getTypeAnnotationFromAllAccessorDeclarations(node *ast.Node, accessors ast.AllAccessorDeclarations) *ast.Node {
 * 	accessorType := ch.getTypeAnnotationFromAccessor(node)
 * 	if accessorType == nil && node != accessors.FirstAccessor {
 * 		accessorType = ch.getTypeAnnotationFromAccessor(accessors.FirstAccessor)
 * 	}
 * 	if accessorType == nil && accessors.SecondAccessor != nil && node != accessors.SecondAccessor {
 * 		accessorType = ch.getTypeAnnotationFromAccessor(accessors.SecondAccessor)
 * 	}
 * 	return accessorType
 * }
 */
export function PseudoChecker_getTypeAnnotationFromAllAccessorDeclarations(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>, accessors: AllAccessorDeclarations): GoPtr<Node> {
  let accessorType = PseudoChecker_getTypeAnnotationFromAccessor(receiver, node);
  if (accessorType === undefined && node !== accessors.FirstAccessor) {
    accessorType = PseudoChecker_getTypeAnnotationFromAccessor(receiver, accessors.FirstAccessor);
  }
  if (accessorType === undefined && accessors.SecondAccessor !== undefined && node !== accessors.SecondAccessor) {
    accessorType = PseudoChecker_getTypeAnnotationFromAccessor(receiver, accessors.SecondAccessor);
  }
  return accessorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.getTypeAnnotationFromAccessor","kind":"method","status":"implemented","sigHash":"208cf5e87f116cb3660d9919715a67f2837c405366c6d3a80d06588d5e4ce50d"}
 *
 * Go source:
 * func (ch *PseudoChecker) getTypeAnnotationFromAccessor(node *ast.Node) *ast.Node {
 * 	if node == nil {
 * 		return nil
 * 	}
 * 	// !!! TODO: support ripping return type off of .FullSignature
 * 	if node.Kind == ast.KindGetAccessor {
 * 		return node.AsGetAccessorDeclaration().Type
 * 	}
 * 	set := node.AsSetAccessorDeclaration()
 * 	if set.Parameters == nil || len(set.Parameters.Nodes) < 1 {
 * 		return nil
 * 	}
 * 	p := set.Parameters.Nodes[0]
 * 	if !ast.IsParameterDeclaration(p) {
 * 		return nil
 * 	}
 * 	return p.AsParameterDeclaration().Type
 * }
 */
export function PseudoChecker_getTypeAnnotationFromAccessor(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<Node> {
  if (node === undefined) {
    return undefined;
  }
  // !!! TODO: support ripping return type off of .FullSignature
  if (node!.Kind === KindGetAccessor) {
    return AsGetAccessorDeclaration(node)!.Type;
  }
  const set = AsSetAccessorDeclaration(node)!;
  if (set.Parameters === undefined || set.Parameters!.Nodes.length < 1) {
    return undefined;
  }
  const p = set.Parameters!.Nodes[0];
  if (!IsParameterDeclaration(p)) {
    return undefined;
  }
  return AsParameterDeclaration(p)!.Type;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::isValueSignatureDeclaration","kind":"func","status":"implemented","sigHash":"0f8c17b8c38271e7b61aefdd6c11c4d35c2520d23104c21c6ea6c02ce99a3bb7"}
 *
 * Go source:
 * func isValueSignatureDeclaration(node *ast.Node) bool {
 * 	return ast.IsFunctionExpression(node) || ast.IsArrowFunction(node) || ast.IsMethodDeclaration(node) || ast.IsAccessor(node) || ast.IsFunctionDeclaration(node) || ast.IsConstructorDeclaration(node)
 * }
 */
export function isValueSignatureDeclaration(node: GoPtr<Node>): bool {
  return IsFunctionExpression(node) || IsArrowFunction(node) || IsMethodDeclaration(node) || IsAccessor(node) || IsFunctionDeclaration(node) || IsConstructorDeclaration(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.createReturnFromSignature","kind":"method","status":"implemented","sigHash":"e32a139efee4490fbd9313b56a00fef1345f2a971566eb41ad586bfba5d1db2b"}
 *
 * Go source:
 * func (ch *PseudoChecker) createReturnFromSignature(fn *ast.Node) *PseudoType {
 * 	if ast.IsFunctionLike(fn) {
 * 		d := fn.FunctionLikeData()
 * 		// !!! TODO: support ripping return type off of .FullSignature
 * 		r := d.Type
 * 		if r != nil {
 * 			return NewPseudoTypeDirect(r)
 * 		}
 * 	}
 * 	if isValueSignatureDeclaration(fn) {
 * 		return ch.typeFromSingleReturnExpression(fn)
 * 	}
 * 	return NewPseudoTypeNoResult(fn)
 * }
 */
export function PseudoChecker_createReturnFromSignature(receiver: GoPtr<PseudoChecker>, fn: GoPtr<Node>): GoPtr<PseudoType> {
  if (IsFunctionLike(fn)) {
    const d = Node_FunctionLikeData(fn);
    const r = d!.Type;
    if (r !== undefined) {
      return NewPseudoTypeDirect(r);
    }
  }
  if (isValueSignatureDeclaration(fn)) {
    return PseudoChecker_typeFromSingleReturnExpression(receiver, fn);
  }
  return NewPseudoTypeNoResult(fn);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromSingleReturnExpression","kind":"method","status":"implemented","sigHash":"89d40ce570a89de3cf0de32cb626f1d666bb53f423ec025b399f923220b690bb"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromSingleReturnExpression(fn *ast.Node) *PseudoType {
 * 	var candidateExpr *ast.Node
 * 	if fn != nil && !ast.NodeIsMissing(fn.Body()) {
 * 		flags := ast.GetFunctionFlags(fn)
 * 		if flags&ast.FunctionFlagsAsyncGenerator != 0 {
 * 			return NewPseudoTypeNoResult(fn)
 * 		}
 * 
 * 		body := fn.Body()
 * 		if ast.IsBlock(body) {
 * 			ast.ForEachReturnStatement(body, func(stmt *ast.Node) bool {
 * 				if stmt.Parent != body { // Why bail on nested return statements?
 * 					candidateExpr = nil
 * 					return true
 * 				}
 * 				if candidateExpr == nil {
 * 					candidateExpr = stmt.AsReturnStatement().Expression
 * 				} else {
 * 					candidateExpr = nil
 * 					return true
 * 				}
 * 				return false
 * 			})
 * 		} else {
 * 			candidateExpr = body
 * 		}
 * 	}
 * 	if candidateExpr != nil {
 * 		if isContextuallyTyped(candidateExpr) {
 * 			var t *ast.Node
 * 			if candidateExpr.Kind == ast.KindTypeAssertionExpression {
 * 				t = candidateExpr.AsTypeAssertion().Type
 * 			} else if candidateExpr.Kind == ast.KindAsExpression {
 * 				t = candidateExpr.AsAsExpression().Type
 * 			}
 * 			if t != nil && !ast.IsConstTypeReference(t) {
 * 				return NewPseudoTypeDirect(t)
 * 			}
 * 		} else {
 * 			return ch.typeFromExpression(candidateExpr)
 * 		}
 * 	}
 * 	return NewPseudoTypeNoResult(fn)
 * }
 */
export function PseudoChecker_typeFromSingleReturnExpression(receiver: GoPtr<PseudoChecker>, fn: GoPtr<Node>): GoPtr<PseudoType> {
  let candidateExpr: GoPtr<Node> = undefined;
  if (fn !== undefined && !NodeIsMissing(Node_Body(fn))) {
    const flags = GetFunctionFlags(fn);
    if ((flags & FunctionFlagsAsyncGenerator) !== 0) {
      return NewPseudoTypeNoResult(fn);
    }
    const body = Node_Body(fn);
    if (IsBlock(body)) {
      ForEachReturnStatement(body, (stmt: GoPtr<Node>): bool => {
        if (stmt!.Parent !== body) {
          candidateExpr = undefined;
          return true;
        }
        if (candidateExpr === undefined) {
          candidateExpr = AsReturnStatement(stmt)!.Expression;
        } else {
          candidateExpr = undefined;
          return true;
        }
        return false;
      });
    } else {
      candidateExpr = body;
    }
  }
  if (candidateExpr !== undefined) {
    if (isContextuallyTyped(candidateExpr)) {
      let t: GoPtr<Node> = undefined;
      if (candidateExpr!.Kind === KindTypeAssertionExpression) {
        t = AsTypeAssertion(candidateExpr)!.Type;
      } else if (candidateExpr!.Kind === KindAsExpression) {
        t = AsAsExpression(candidateExpr)!.Type;
      }
      if (t !== undefined && !IsConstTypeReference(t)) {
        return NewPseudoTypeDirect(t);
      }
    } else {
      return PseudoChecker_typeFromExpression(receiver, candidateExpr);
    }
  }
  return NewPseudoTypeNoResult(fn);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromExpression","kind":"method","status":"implemented","sigHash":"c8166785c48bfe2e57ebb94675663ff2d9ec8f9fb25f6faf28a763ebcddfb417"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromExpression(node *ast.Node) *PseudoType {
 * 	switch node.Kind {
 * 	case ast.KindOmittedExpression:
 * 		return PseudoTypeUndefined
 * 	case ast.KindParenthesizedExpression:
 * 		// assertions transformed on reparse, just unwrap
 * 		return ch.typeFromExpression(node.AsParenthesizedExpression().Expression)
 * 	case ast.KindIdentifier:
 * 		// !!! TODO: in strada, this uses symbol information to ensure `node` refers to the global `undefined` symbol instead
 * 		// we should probably import `resolveName` and use it here to check for the same; but we have to setup some barebones pseudoglobals for that to work!
 * 		if node.AsIdentifier().Text == "undefined" {
 * 			return PseudoTypeUndefined
 * 		}
 * 	case ast.KindNullKeyword:
 * 		return PseudoTypeNull
 * 	case ast.KindArrowFunction, ast.KindFunctionExpression:
 * 		return ch.typeFromFunctionLikeExpression(node)
 * 	case ast.KindTypeAssertionExpression:
 * 		return ch.typeFromTypeAssertion(node.AsTypeAssertion().Expression, node.AsTypeAssertion().Type)
 * 	case ast.KindAsExpression:
 * 		return ch.typeFromTypeAssertion(node.AsAsExpression().Expression, node.AsAsExpression().Type)
 * 	case ast.KindPrefixUnaryExpression:
 * 		if ast.IsPrimitiveLiteralValue(node, true) {
 * 			return ch.typeFromPrimitiveLiteralPrefix(node.AsPrefixUnaryExpression())
 * 		}
 * 	case ast.KindArrayLiteralExpression:
 * 		return ch.typeFromArrayLiteral(node.AsArrayLiteralExpression())
 * 	case ast.KindObjectLiteralExpression:
 * 		return ch.typeFromObjectLiteral(node.AsObjectLiteralExpression())
 * 	case ast.KindClassExpression:
 * 		return NewPseudoTypeInferred(node) // No possible annotation/directly mappable syntax
 * 	case ast.KindTemplateExpression:
 * 		// templateLitWithHoles as const, not supported
 * 		if IsInConstContext(node) {
 * 			return NewPseudoTypeInferred(node)
 * 		}
 * 		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeInferred(node), PseudoTypeString)
 * 	case ast.KindNumericLiteral:
 * 		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeNumericLiteral(node), PseudoTypeNumber)
 * 	case ast.KindNoSubstitutionTemplateLiteral:
 * 		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString)
 * 	case ast.KindStringLiteral:
 * 		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString)
 * 	case ast.KindBigIntLiteral:
 * 		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeBigIntLiteral(node), PseudoTypeBigInt)
 * 	case ast.KindTrueKeyword:
 * 		return NewPseudoTypeMaybeConstLocation(node, PseudoTypeTrue, PseudoTypeBoolean)
 * 	case ast.KindFalseKeyword:
 * 		return NewPseudoTypeMaybeConstLocation(node, PseudoTypeFalse, PseudoTypeBoolean)
 * 	}
 * 	return NewPseudoTypeInferred(node)
 * }
 */
export function PseudoChecker_typeFromExpression(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  switch (node!.Kind) {
    case KindOmittedExpression:
      return PseudoTypeUndefined;
    case KindParenthesizedExpression:
      return PseudoChecker_typeFromExpression(receiver, AsParenthesizedExpression(node)!.Expression);
    case KindIdentifier:
      if (AsIdentifier(node)!.Text === "undefined") {
        return PseudoTypeUndefined;
      }
      break;
    case KindNullKeyword:
      return PseudoTypeNull;
    case KindArrowFunction:
    case KindFunctionExpression:
      return PseudoChecker_typeFromFunctionLikeExpression(receiver, node);
    case KindTypeAssertionExpression:
      return PseudoChecker_typeFromTypeAssertion(receiver, AsTypeAssertion(node)!.Expression, AsTypeAssertion(node)!.Type);
    case KindAsExpression:
      return PseudoChecker_typeFromTypeAssertion(receiver, AsAsExpression(node)!.Expression, AsAsExpression(node)!.Type);
    case KindPrefixUnaryExpression:
      if (IsPrimitiveLiteralValue(node, true)) {
        return PseudoChecker_typeFromPrimitiveLiteralPrefix(receiver, node as unknown as PrefixUnaryExpression);
      }
      break;
    case KindArrayLiteralExpression:
      return PseudoChecker_typeFromArrayLiteral(receiver, node as unknown as ArrayLiteralExpression);
    case KindObjectLiteralExpression:
      return PseudoChecker_typeFromObjectLiteral(receiver, node as unknown as ObjectLiteralExpression);
    case KindClassExpression:
      return NewPseudoTypeInferred(node);
    case KindTemplateExpression:
      if (IsInConstContext(node)) {
        return NewPseudoTypeInferred(node);
      }
      return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeInferred(node), PseudoTypeString);
    case KindNumericLiteral:
      return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeNumericLiteral(node), PseudoTypeNumber);
    case KindNoSubstitutionTemplateLiteral:
      return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString);
    case KindStringLiteral:
      return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString);
    case KindBigIntLiteral:
      return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeBigIntLiteral(node), PseudoTypeBigInt);
    case KindTrueKeyword:
      return NewPseudoTypeMaybeConstLocation(node, PseudoTypeTrue, PseudoTypeBoolean);
    case KindFalseKeyword:
      return NewPseudoTypeMaybeConstLocation(node, PseudoTypeFalse, PseudoTypeBoolean);
  }
  return NewPseudoTypeInferred(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromObjectLiteral","kind":"method","status":"implemented","sigHash":"317156be4c7ce85b75a44044271d4492fbf33594a390a965a71828b0c8ca91b8"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromObjectLiteral(node *ast.ObjectLiteralExpression) *PseudoType {
 * 	if errorNodes := ch.canGetTypeFromObjectLiteral(node); errorNodes != nil {
 * 		return NewPseudoTypeInferredWithErrors(node.AsNode(), errorNodes)
 * 	}
 * 	// we are in a const context producing an object literal type, there are no shorthand or spread assignments
 * 	if node.Properties == nil || len(node.Properties.Nodes) == 0 {
 * 		return NewPseudoTypeObjectLiteral(nil)
 * 	}
 * 	results := make([]*PseudoObjectElement, 0, len(node.Properties.Nodes))
 * 	for _, e := range node.Properties.Nodes {
 * 		switch e.Kind {
 * 		case ast.KindMethodDeclaration:
 * 			optional := e.AsMethodDeclaration().PostfixToken != nil && e.AsMethodDeclaration().PostfixToken.Kind == ast.KindQuestionToken
 * 			if e.FunctionLikeData().FullSignature != nil {
 * 				results = append(results, NewPseudoPropertyAssignment(
 * 					false,
 * 					e.Name(),
 * 					optional,
 * 					NewPseudoTypeDirect(e.FunctionLikeData().FullSignature),
 * 				))
 * 			} else {
 * 				results = append(results, NewPseudoObjectMethod(
 * 					e,
 * 					e.Name(),
 * 					optional,
 * 					ch.cloneTypeParameters(e.AsMethodDeclaration().TypeParameters),
 * 					ch.cloneParameters(e.ParameterList()),
 * 					ch.createReturnFromSignature(e),
 * 				))
 * 			}
 * 		case ast.KindPropertyAssignment:
 * 			results = append(results, NewPseudoPropertyAssignment(
 * 				false,
 * 				e.Name(),
 * 				e.AsPropertyAssignment().PostfixToken != nil && e.AsPropertyAssignment().PostfixToken.Kind == ast.KindQuestionToken,
 * 				ch.typeFromExpression(e.Initializer()),
 * 			))
 * 		case ast.KindSetAccessor, ast.KindGetAccessor:
 * 			member := ch.getAccessorMember(e, e.Name())
 * 			if member != nil {
 * 				results = append(results, member)
 * 			}
 * 		}
 * 	}
 * 	return NewPseudoTypeObjectLiteral(results)
 * }
 */
export function PseudoChecker_typeFromObjectLiteral(receiver: GoPtr<PseudoChecker>, node: GoPtr<ObjectLiteralExpression>): GoPtr<PseudoType> {
  const errorNodes = PseudoChecker_canGetTypeFromObjectLiteral(receiver, node);
  if (!GoSliceIsNil(errorNodes)) {
    return NewPseudoTypeInferredWithErrors(Node_AsNode(node), errorNodes);
  }
  if (node!.Properties === undefined || node!.Properties!.Nodes.length === 0) {
    return NewPseudoTypeObjectLiteral(GoNilSlice());
  }
  let results: GoSlice<GoPtr<PseudoObjectElement>> = GoNilSlice();
  for (const e of node!.Properties!.Nodes) {
    switch (e!.Kind) {
      case KindMethodDeclaration: {
        const optional = AsMethodDeclaration(e)!.PostfixToken !== undefined && AsMethodDeclaration(e)!.PostfixToken!.Kind === KindQuestionToken;
        if (Node_FunctionLikeData(e)!.FullSignature !== undefined) {
          results = GoAppend(results, NewPseudoPropertyAssignment(
            false,
            Node_Name(e),
            optional,
            NewPseudoTypeDirect(Node_FunctionLikeData(e)!.FullSignature),
          ));
        } else {
          results = GoAppend(results, NewPseudoObjectMethod(
            e,
            Node_Name(e),
            optional,
            PseudoChecker_cloneTypeParameters(receiver, AsMethodDeclaration(e)!.TypeParameters as GoPtr<NodeList>),
            PseudoChecker_cloneParameters(receiver, Node_ParameterList(e) as GoPtr<NodeList>),
            PseudoChecker_createReturnFromSignature(receiver, e),
          ));
        }
        break;
      }
      case KindPropertyAssignment:
        results = GoAppend(results, NewPseudoPropertyAssignment(
          false,
          Node_Name(e),
          AsPropertyAssignment(e)!.PostfixToken !== undefined && AsPropertyAssignment(e)!.PostfixToken!.Kind === KindQuestionToken,
          PseudoChecker_typeFromExpression(receiver, Node_Initializer(e)),
        ));
        break;
      case KindSetAccessor:
      case KindGetAccessor: {
        const member = PseudoChecker_getAccessorMember(receiver, e, Node_Name(e));
        if (member !== undefined) {
          results = GoAppend(results, member);
        }
        break;
      }
    }
  }
  return NewPseudoTypeObjectLiteral(results);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.getAccessorMember","kind":"method","status":"implemented","sigHash":"c64e0ee4a0ab45adb9d713b07d3daf918f7ece80c47834d57ea7e91cb6f5f96f"}
 *
 * Go source:
 * func (ch *PseudoChecker) getAccessorMember(accessor *ast.Node, name *ast.Node) *PseudoObjectElement {
 * 	allAccessors := ast.GetAllAccessorDeclarationsForDeclaration(accessor, accessor.Symbol().Declarations) // TODO: node preservation for late-bound accessor pairs?
 * 
 * 	// TODO: handle pseudo-annotations from get accessor return positions?
 * 	if allAccessors.GetAccessor != nil && allAccessors.GetAccessor.Type != nil &&
 * 		allAccessors.SetAccessor != nil && len(allAccessors.SetAccessor.Parameters.Nodes) > 0 && allAccessors.SetAccessor.Parameters.Nodes[0].AsParameterDeclaration().Type != nil {
 * 		// We have possible types for both accessors, we can't know if they are the same type so we keep both accessors
 * 
 * 		if ast.IsGetAccessorDeclaration(accessor) {
 * 			return NewPseudoGetAccessor(
 * 				accessor,
 * 				name,
 * 				false,
 * 				ch.typeFromAccessor(accessor),
 * 			)
 * 		} else {
 * 			return NewPseudoSetAccessor(
 * 				accessor,
 * 				name,
 * 				false,
 * 				ch.cloneParameters(accessor.AsSetAccessorDeclaration().Parameters)[0],
 * 			)
 * 		}
 * 	}
 * 
 * 	if accessor == allAccessors.FirstAccessor {
 * 		// only one annotated accessor; output a property - `readonly` for a single `get` accessor
 * 
 * 		accessorType := ch.typeFromAccessor(accessor)
 * 		readonly := ast.IsGetAccessorDeclaration(accessor) && allAccessors.SecondAccessor == nil
 * 		return NewPseudoPropertyAssignment(
 * 			readonly,
 * 			name,
 * 			false,
 * 			accessorType,
 * 		)
 * 	}
 * 	return nil
 * }
 */
export function PseudoChecker_getAccessorMember(receiver: GoPtr<PseudoChecker>, accessor: GoPtr<Node>, name: GoPtr<Node>): GoPtr<PseudoObjectElement> {
  const allAccessors = GetAllAccessorDeclarationsForDeclaration(accessor as GoPtr<AccessorDeclaration>, Node_Symbol(accessor)!.Declarations);

  if (allAccessors.GetAccessor !== undefined && allAccessors.GetAccessor.Type !== undefined &&
    allAccessors.SetAccessor !== undefined && allAccessors.SetAccessor.Parameters !== undefined && allAccessors.SetAccessor.Parameters.Nodes.length > 0 && AsParameterDeclaration(allAccessors.SetAccessor.Parameters.Nodes[0])!.Type !== undefined) {
    if (IsGetAccessorDeclaration(accessor)) {
      return NewPseudoGetAccessor(
        accessor,
        name,
        false,
        PseudoChecker_typeFromAccessor(receiver, accessor),
      );
    }
    return NewPseudoSetAccessor(
      accessor,
      name,
      false,
      PseudoChecker_cloneParameters(receiver, AsSetAccessorDeclaration(accessor)!.Parameters as GoPtr<NodeList>)[0],
    );
  }

  if (accessor === allAccessors.FirstAccessor) {
    const accessorType = PseudoChecker_typeFromAccessor(receiver, accessor);
    const readonly = IsGetAccessorDeclaration(accessor) && allAccessors.SecondAccessor === undefined;
    return NewPseudoPropertyAssignment(
      readonly,
      name,
      false,
      accessorType,
    );
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.canGetTypeFromObjectLiteral","kind":"method","status":"implemented","sigHash":"0de144d693a7cc9c923f98331c5641e287a5d666cf188bcec8012750a762a701"}
 *
 * Go source:
 * func (ch *PseudoChecker) canGetTypeFromObjectLiteral(node *ast.ObjectLiteralExpression) []*ast.Node {
 * 	if node.Properties == nil || len(node.Properties.Nodes) == 0 {
 * 		return nil // empty object, ok
 * 	}
 * 	var errorNodes []*ast.Node
 * 	for _, e := range node.Properties.Nodes {
 * 		if e.Flags&ast.NodeFlagsThisNodeHasError != 0 {
 * 			errorNodes = append(errorNodes, e)
 * 			continue
 * 		}
 * 		if e.Kind == ast.KindShorthandPropertyAssignment || e.Kind == ast.KindSpreadAssignment {
 * 			errorNodes = append(errorNodes, e)
 * 			continue
 * 		}
 * 		if e.Name().Flags&ast.NodeFlagsThisNodeHasError != 0 {
 * 			errorNodes = append(errorNodes, e.Name())
 * 			continue
 * 		}
 * 		if e.Name().Kind == ast.KindPrivateIdentifier {
 * 			errorNodes = append(errorNodes, e)
 * 			continue
 * 		}
 * 		if e.Name().Kind == ast.KindComputedPropertyName {
 * 			expression := e.Name().Expression()
 * 			if !ast.IsPrimitiveLiteralValue(expression, false) {
 * 				errorNodes = append(errorNodes, e.Name())
 * 			}
 * 		}
 * 	}
 * 	return errorNodes
 * }
 */
export function PseudoChecker_canGetTypeFromObjectLiteral(receiver: GoPtr<PseudoChecker>, node: GoPtr<ObjectLiteralExpression>): GoSlice<GoPtr<Node>> {
  if (node!.Properties === undefined || node!.Properties!.Nodes.length === 0) {
    return GoNilSlice();
  }
  let errorNodes: GoSlice<GoPtr<Node>> = GoNilSlice();
  for (const e of node!.Properties!.Nodes) {
    if ((e!.Flags & NodeFlagsThisNodeHasError) !== 0) {
      errorNodes = GoAppend(errorNodes, e);
      continue;
    }
    if (e!.Kind === KindShorthandPropertyAssignment || e!.Kind === KindSpreadAssignment) {
      errorNodes = GoAppend(errorNodes, e);
      continue;
    }
    const eName = Node_Name(e);
    if ((eName!.Flags & NodeFlagsThisNodeHasError) !== 0) {
      errorNodes = GoAppend(errorNodes, eName as GoPtr<Node>);
      continue;
    }
    if (eName!.Kind === KindPrivateIdentifier) {
      errorNodes = GoAppend(errorNodes, e);
      continue;
    }
    if (eName!.Kind === KindComputedPropertyName) {
      const expression = Node_Expression(eName as GoPtr<Node>);
      if (!IsPrimitiveLiteralValue(expression, false)) {
        errorNodes = GoAppend(errorNodes, eName as GoPtr<Node>);
      }
    }
  }
  return errorNodes;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromArrayLiteral","kind":"method","status":"implemented","sigHash":"d189468655fb492cb45b2e34caf90746fe6eb76a6fb21e31d3c6980a25e5b57e"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromArrayLiteral(node *ast.ArrayLiteralExpression) *PseudoType {
 * 	if errorNodes := ch.canGetTypeFromArrayLiteral(node); errorNodes != nil {
 * 		return NewPseudoTypeInferredWithErrors(node.AsNode(), errorNodes)
 * 	}
 * 	if IsInConstContext(node.AsNode()) && isContextuallyTyped(node.AsNode()) {
 * 		return NewPseudoTypeInferred(node.AsNode()) // expr in an as const cast with a contextual type has variable readonly state, bail
 * 	}
 * 	// we are in a const context producing a tuple type, there are no spread elements
 * 	results := make([]*PseudoType, 0, len(node.Elements.Nodes))
 * 	for _, e := range node.Elements.Nodes {
 * 		results = append(results, ch.typeFromExpression(e))
 * 	}
 * 	return NewPseudoTypeTuple(results)
 * }
 */
export function PseudoChecker_typeFromArrayLiteral(receiver: GoPtr<PseudoChecker>, node: GoPtr<ArrayLiteralExpression>): GoPtr<PseudoType> {
  const errorNodes = PseudoChecker_canGetTypeFromArrayLiteral(receiver, node);
  if (!GoSliceIsNil(errorNodes)) {
    return NewPseudoTypeInferredWithErrors(Node_AsNode(node), errorNodes);
  }
  if (IsInConstContext(Node_AsNode(node)) && isContextuallyTyped(Node_AsNode(node))) {
    return NewPseudoTypeInferred(Node_AsNode(node));
  }
  let results: GoSlice<GoPtr<PseudoType>> = [];
  for (const e of node!.Elements!.Nodes) {
    results = GoAppend(results, PseudoChecker_typeFromExpression(receiver, e));
  }
  return NewPseudoTypeTuple(results);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.canGetTypeFromArrayLiteral","kind":"method","status":"implemented","sigHash":"7cbea8a1ebf342a77c226e13c064844a345598a18d4fad576c57f82ad794bfb7"}
 *
 * Go source:
 * func (ch *PseudoChecker) canGetTypeFromArrayLiteral(node *ast.ArrayLiteralExpression) []*ast.Node {
 * 	if !IsInConstContext(node.AsNode()) {
 * 		return []*ast.Node{node.AsNode()}
 * 	}
 * 	for _, e := range node.Elements.Nodes {
 * 		if e.Kind == ast.KindSpreadElement {
 * 			return []*ast.Node{e}
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function PseudoChecker_canGetTypeFromArrayLiteral(receiver: GoPtr<PseudoChecker>, node: GoPtr<ArrayLiteralExpression>): GoSlice<GoPtr<Node>> {
  if (!IsInConstContext(Node_AsNode(node))) {
    return [Node_AsNode(node)];
  }
  for (const e of node!.Elements!.Nodes) {
    if (e!.Kind === KindSpreadElement) {
      return [e];
    }
  }
  return GoNilSlice();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::isConstContextPropagatingKind","kind":"func","status":"implemented","sigHash":"5fd6baf4c95f1c3dc002054c222fd6820194ec0c8644d2c4659676d03c954eaf"}
 *
 * Go source:
 * func isConstContextPropagatingKind(kind ast.Kind) bool {
 * 	switch kind {
 * 	case ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression,
 * 		ast.KindParenthesizedExpression, ast.KindSpreadElement, ast.KindPropertyAssignment,
 * 		ast.KindShorthandPropertyAssignment, ast.KindTemplateSpan, ast.KindPrefixUnaryExpression:
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function isConstContextPropagatingKind(kind: Kind): bool {
  switch (kind) {
    case KindArrayLiteralExpression:
    case KindObjectLiteralExpression:
    case KindParenthesizedExpression:
    case KindSpreadElement:
    case KindPropertyAssignment:
    case KindShorthandPropertyAssignment:
    case KindTemplateSpan:
    case KindPrefixUnaryExpression:
      return true;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::IsInConstContext","kind":"func","status":"implemented","sigHash":"9d0348323f12933836128cfb4d1aac67c230bfccfd33ee9447180d826f9cbea5"}
 *
 * Go source:
 * func IsInConstContext(node *ast.Node) bool {
 * 	// An expression is in a const context if an ancestor is a const type maybeAssertion expression
 * 	maybeAssertion := ast.FindAncestor(
 * 		node.Parent,
 * 		func(n *ast.Node) bool {
 * 			// stop traversing at assertions or anything not an array/object literal, since only those create or transfer const-ness
 * 			return ast.IsAssertionExpression(n) || !isConstContextPropagatingKind(n.Kind)
 * 		},
 * 	)
 * 	return ast.IsConstAssertion(maybeAssertion)
 * }
 */
export function IsInConstContext(node: GoPtr<Node>): bool {
  const maybeAssertion = FindAncestor(
    node!.Parent,
    (n: GoPtr<Node>): bool => {
      return IsAssertionExpression(n) || !isConstContextPropagatingKind(n!.Kind);
    },
  );
  return IsConstAssertion(maybeAssertion);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromPrimitiveLiteralPrefix","kind":"method","status":"implemented","sigHash":"ab3b8b826136fabd5263e35bf395cb9492e5424d6e02a67b11e4eafacb854f5c"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromPrimitiveLiteralPrefix(node *ast.PrefixUnaryExpression) *PseudoType {
 * 	expr := node.AsNode()
 * 	if node.Operator == ast.KindPlusToken {
 * 		expr = node.Operand
 * 	}
 * 	inner := node.Operand
 * 	if inner.Kind == ast.KindBigIntLiteral {
 * 		return NewPseudoTypeMaybeConstLocation(node.AsNode(), NewPseudoTypeBigIntLiteral(expr.AsNode()), PseudoTypeBigInt)
 * 	}
 * 	if inner.Kind == ast.KindNumericLiteral {
 * 		return NewPseudoTypeMaybeConstLocation(node.AsNode(), NewPseudoTypeNumericLiteral(expr.AsNode()), PseudoTypeNumber)
 * 	}
 * 	debug.FailBadSyntaxKind(inner)
 * 	return nil
 * }
 */
export function PseudoChecker_typeFromPrimitiveLiteralPrefix(receiver: GoPtr<PseudoChecker>, node: GoPtr<PrefixUnaryExpression>): GoPtr<PseudoType> {
  const nodeAsNode = node as unknown as GoPtr<Node>;
  let expr: GoPtr<Node> = nodeAsNode;
  if (node!.Operator === KindPlusToken) {
    expr = node!.Operand as unknown as GoPtr<Node>;
  }
  const inner = node!.Operand as unknown as GoPtr<Node>;
  if (inner!.Kind === KindBigIntLiteral) {
    return NewPseudoTypeMaybeConstLocation(nodeAsNode, NewPseudoTypeBigIntLiteral(expr), PseudoTypeBigInt);
  }
  if (inner!.Kind === KindNumericLiteral) {
    return NewPseudoTypeMaybeConstLocation(nodeAsNode, NewPseudoTypeNumericLiteral(expr), PseudoTypeNumber);
  }
  FailBadSyntaxKind({ KindString: () => Node_KindString(inner) });
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromTypeAssertion","kind":"method","status":"implemented","sigHash":"9e05471195a1fe901d0923d89525385756e6c931d48d79f8ee8f5f237868ac29"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromTypeAssertion(expression *ast.Node, typeNode *ast.Node) *PseudoType {
 * 	if ast.IsConstTypeReference(typeNode) {
 * 		return ch.typeFromExpression(expression)
 * 	}
 * 	return NewPseudoTypeDirect(typeNode)
 * }
 */
export function PseudoChecker_typeFromTypeAssertion(receiver: GoPtr<PseudoChecker>, expression: GoPtr<Node>, typeNode: GoPtr<Node>): GoPtr<PseudoType> {
  if (IsConstTypeReference(typeNode)) {
    return PseudoChecker_typeFromExpression(receiver, expression);
  }
  return NewPseudoTypeDirect(typeNode);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromFunctionLikeExpression","kind":"method","status":"implemented","sigHash":"7a8e5291c066eae9f0799a2635dcd3d18083094dcafd807b9a78d03637ab11ce"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromFunctionLikeExpression(node *ast.Node) *PseudoType {
 * 	if node.FunctionLikeData().FullSignature != nil {
 * 		return NewPseudoTypeDirect(node.FunctionLikeData().FullSignature)
 * 	}
 * 	returnType := ch.createReturnFromSignature(node)
 * 	if returnType.Kind == PseudoTypeKindNoResult {
 * 		// no result for the return type can just be an inferred result for the whole expression
 * 		return NewPseudoTypeInferred(node.AsNode())
 * 	}
 * 	typeParameters := ch.cloneTypeParameters(node.FunctionLikeData().TypeParameters)
 * 	parameters := ch.cloneParameters(node.FunctionLikeData().Parameters)
 * 	return NewPseudoTypeSingleCallSignature(
 * 		node,
 * 		parameters,
 * 		typeParameters,
 * 		returnType,
 * 	)
 * }
 */
export function PseudoChecker_typeFromFunctionLikeExpression(receiver: GoPtr<PseudoChecker>, node: GoPtr<Node>): GoPtr<PseudoType> {
  if (Node_FunctionLikeData(node)!.FullSignature !== undefined) {
    return NewPseudoTypeDirect(Node_FunctionLikeData(node)!.FullSignature);
  }
  const returnType = PseudoChecker_createReturnFromSignature(receiver, node);
  if (returnType!.Kind === PseudoTypeKindNoResult) {
    return NewPseudoTypeInferred(node);
  }
  const typeParameters = PseudoChecker_cloneTypeParameters(receiver, Node_FunctionLikeData(node)!.TypeParameters as GoPtr<NodeList>);
  const parameters = PseudoChecker_cloneParameters(receiver, Node_FunctionLikeData(node)!.Parameters as GoPtr<NodeList>);
  return NewPseudoTypeSingleCallSignature(
    node,
    parameters,
    typeParameters,
    returnType,
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.cloneTypeParameters","kind":"method","status":"implemented","sigHash":"478e4a6f64d7a5e19d7626609c4ca899ecff58164c6a2fddb49edfc9c5ec4d46"}
 *
 * Go source:
 * func (ch *PseudoChecker) cloneTypeParameters(nodes *ast.NodeList) []*ast.TypeParameterDeclaration {
 * 	if nodes == nil {
 * 		return nil
 * 	}
 * 	if len(nodes.Nodes) == 0 {
 * 		return nil
 * 	}
 * 	result := make([]*ast.TypeParameterDeclaration, 0, len(nodes.Nodes))
 * 	for _, e := range nodes.Nodes {
 * 		result = append(result, e.AsTypeParameterDeclaration())
 * 	}
 * 	return result
 * }
 */
export function PseudoChecker_cloneTypeParameters(receiver: GoPtr<PseudoChecker>, nodes: GoPtr<NodeList>): GoSlice<GoPtr<TypeParameterDeclaration>> {
  if (nodes === undefined) {
    return GoNilSlice();
  }
  if (nodes!.Nodes.length === 0) {
    return GoNilSlice();
  }
  let result: GoSlice<GoPtr<TypeParameterDeclaration>> = [];
  for (const e of nodes!.Nodes) {
    result = GoAppend(result, AsTypeParameterDeclaration(e));
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::isUndefinedPseudoType","kind":"func","status":"implemented","sigHash":"dc07fe45ed787ff2750f0dcfa8f75ce355b734dea07ec2f0e38badfb0696a12d"}
 *
 * Go source:
 * func isUndefinedPseudoType(t *PseudoType) bool {
 * 	return t.Kind == PseudoTypeKindUndefined || (t.Kind == PseudoTypeKindMaybeConstLocation && isUndefinedPseudoType(t.AsPseudoTypeMaybeConstLocation().ConstType))
 * }
 */
export function isUndefinedPseudoType(t: GoPtr<PseudoType>): bool {
  return t!.Kind === PseudoTypeKindUndefined || (t!.Kind === PseudoTypeKindMaybeConstLocation && isUndefinedPseudoType(PseudoType_AsPseudoTypeMaybeConstLocation(t)!.ConstType));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::typeNodeCouldReferToUndefined","kind":"func","status":"implemented","sigHash":"328eddc236093c5d48f2722e8373bea37f20c934a504bb8ccd45ab584c3301c3"}
 *
 * Go source:
 * func typeNodeCouldReferToUndefined(node *ast.Node) bool {
 * 	for node.Kind == ast.KindParenthesizedType {
 * 		node = node.AsParenthesizedTypeNode().Type
 * 	}
 * 	switch node.Kind {
 * 	// these types require symbolic/type resolution to know if they definitely do or do not refer to `undefined`, so might (or definitely do)
 * 	case ast.KindTypeReference, ast.KindIndexedAccessType, ast.KindTypeQuery, ast.KindOptionalType, ast.KindRestType, ast.KindImportType:
 * 		return true
 * 	case ast.KindIntersectionType:
 * 		// TODO: why is this not `core.Every`? strada treated unions and intersections the same, but logically every intersection member needs to contain a possible `undefined`
 * 		// for the result type to contain `undefined`. Likely a bug persisting from strada.
 * 		return core.Some(node.AsIntersectionTypeNode().Types.Nodes, typeNodeCouldReferToUndefined)
 * 	case ast.KindUnionType:
 * 		return core.Some(node.AsUnionTypeNode().Types.Nodes, typeNodeCouldReferToUndefined)
 * 	case ast.KindConditionalType: // suspect - should be treated as a union of both branches instead, likely a bug persisted from strada
 * 		return true
 * 	case ast.KindTypeOperator: // suspect - always refers to a subset of `string | number | symbol` for `keyof` or `symbol` for `unique`
 * 		return true
 * 	case ast.KindTypePredicate: // suspect - always refers to `never` or `boolean`, depending on kind - considered possibly-`undefined` referencing for strada compat
 * 		return true
 * 	case ast.KindUndefinedKeyword:
 * 		return true
 * 	default: // all other keywords, literal types, function-y types, array/tuple types, type literals, template types, this types
 * 		return false
 * 	}
 * }
 */
export function typeNodeCouldReferToUndefined(node: GoPtr<Node>): bool {
  while (node!.Kind === KindParenthesizedType) {
    node = AsParenthesizedTypeNode(node)!.Type;
  }
  switch (node!.Kind) {
    case KindTypeReference:
    case KindIndexedAccessType:
    case KindTypeQuery:
    case KindOptionalType:
    case KindRestType:
    case KindImportType:
      return true;
    case KindIntersectionType:
      return Some(AsIntersectionTypeNode(node)!.Types!.Nodes, typeNodeCouldReferToUndefined);
    case KindUnionType:
      return Some(AsUnionTypeNode(node)!.Types!.Nodes, typeNodeCouldReferToUndefined);
    case KindConditionalType:
      return true;
    case KindTypeOperator:
      return true;
    case KindTypePredicate:
      return true;
    case KindUndefinedKeyword:
      return true;
    default:
      return false;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::couldAlreadyReferToUndefinedType","kind":"func","status":"implemented","sigHash":"8df4500e489eed43ef6e5c86a651d98cb38772c67233f8ba67f28402dd4d456f"}
 *
 * Go source:
 * func couldAlreadyReferToUndefinedType(t *PseudoType) bool {
 * 	if t.Kind == PseudoTypeKindNoResult || t.Kind == PseudoTypeKindInferred || isUndefinedPseudoType(t) {
 * 		return true
 * 	}
 * 	if t.Kind == PseudoTypeKindMaybeConstLocation {
 * 		mc := t.AsPseudoTypeMaybeConstLocation()
 * 		return couldAlreadyReferToUndefinedType(mc.RegularType) // if we're even asking this question, it's not a `const` location
 * 	}
 * 	if t.Kind == PseudoTypeKindDirect {
 * 		// inspect the direct type node
 * 		node := t.AsPseudoTypeDirect().TypeNode
 * 		return typeNodeCouldReferToUndefined(node)
 * 	}
 * 	if t.Kind == PseudoTypeKindUnion {
 * 		return core.Some(t.AsPseudoTypeUnion().Types, couldAlreadyReferToUndefinedType)
 * 	}
 * 	return false
 * }
 */
export function couldAlreadyReferToUndefinedType(t: GoPtr<PseudoType>): bool {
  if (t!.Kind === PseudoTypeKindNoResult || t!.Kind === PseudoTypeKindInferred || isUndefinedPseudoType(t)) {
    return true;
  }
  if (t!.Kind === PseudoTypeKindMaybeConstLocation) {
    const mc = PseudoType_AsPseudoTypeMaybeConstLocation(t);
    return couldAlreadyReferToUndefinedType(mc!.RegularType);
  }
  if (t!.Kind === PseudoTypeKindDirect) {
    const node = PseudoType_AsPseudoTypeDirect(t)!.TypeNode;
    return typeNodeCouldReferToUndefined(node);
  }
  if (t!.Kind === PseudoTypeKindUnion) {
    return Some(PseudoType_AsPseudoTypeUnion(t)!.Types, couldAlreadyReferToUndefinedType);
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::isOptionalInitializedOrRestParameter","kind":"func","status":"implemented","sigHash":"08d6b5b1e1caf9da28c07d2babf308db8fbafe3e30f7221ecab21d4439634f21"}
 *
 * Go source:
 * func isOptionalInitializedOrRestParameter(node *ast.ParameterDeclarationNode) bool {
 * 	p := node.AsParameterDeclaration()
 * 	if p.DotDotDotToken != nil || p.Initializer != nil || p.QuestionToken != nil {
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function isOptionalInitializedOrRestParameter(node: GoPtr<ParameterDeclarationNode>): bool {
  const p = AsParameterDeclaration(node);
  if (p!.DotDotDotToken !== undefined || p!.Initializer !== undefined || p!.QuestionToken !== undefined) {
    return true;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::lastRequiredParamIndex","kind":"func","status":"implemented","sigHash":"4d20ec2b99af6300a8baf1efdda6878a42e6fbc8441211df87081a4e45ad21b8"}
 *
 * Go source:
 * // lastRequiredParamIndex returns the index just past the last required parameter
 * // in the list. A parameter is "required" if it has no question token, no initializer,
 * // and no rest token. This is computed in a single reverse pass so callers can
 * // determine "has required parameter after index i" with `i+1 < lastRequired`
 * // (equivalently, `i < lastRequired-1`) in O(1).
 * func lastRequiredParamIndex(params []*ast.Node) int {
 * 	for i := len(params) - 1; i >= 0; i-- {
 * 		if !isOptionalInitializedOrRestParameter(params[i]) {
 * 			return i + 1
 * 		}
 * 	}
 * 	return 0
 * }
 */
export function lastRequiredParamIndex(params: GoSlice<GoPtr<Node>>): int {
  for (let i = params.length - 1; i >= 0; i--) {
    if (!isOptionalInitializedOrRestParameter(params[i])) {
      return i + 1;
    }
  }
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::addUndefinedIfDefinitelyRequired","kind":"func","status":"implemented","sigHash":"1da3334399e572e5768d65375c54567a27c77dbfd9ca0e219ebe4436398b1ad9"}
 *
 * Go source:
 * func addUndefinedIfDefinitelyRequired(expr *PseudoType) *PseudoType {
 * 	// If `expr` doesn't already contain `| undefined` or a direct/inferred type that may contain `undefined`, add `| undefined`
 * 	// in Strada, this reached into the checker to see if `undefined` was necessary, using `isRequiredOptionalParameter` from the emit resolver,
 * 	// but that's not required on top of the syntactic checks to get the same behavior. (If we get the type wrong, it'll mismatch later and be discarded
 * 	// for an inference error since corsa actually validates that pseudotypes semantically match the inferred type the checker produces)
 * 	if couldAlreadyReferToUndefinedType(expr) {
 * 		return expr // will just error later, more like than not, unless the `undefined` is explicit in the pseudo
 * 	}
 * 	// Explicitly add an `| undefined`
 * 	return NewPseudoTypeUnion([]*PseudoType{expr, PseudoTypeUndefined})
 * }
 */
export function addUndefinedIfDefinitelyRequired(expr: GoPtr<PseudoType>): GoPtr<PseudoType> {
  if (couldAlreadyReferToUndefinedType(expr)) {
    return expr;
  }
  return NewPseudoTypeUnion([expr, PseudoTypeUndefined]);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromParameter","kind":"method","status":"implemented","sigHash":"2e5ea3b5a7e5eaeee002ba1fc7b655b1aafc49885cf870ed9277a4de078a80f7"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromParameter(node *ast.ParameterDeclaration) *PseudoType {
 * 	parent := node.Parent
 * 	if parent.Kind == ast.KindSetAccessor {
 * 		return ch.GetTypeOfAccessor(parent)
 * 	}
 * 	// Fast path: no initializer means we never need parameter position info.
 * 	if node.Initializer == nil {
 * 		if node.Type != nil {
 * 			return NewPseudoTypeDirect(node.Type)
 * 		}
 * 		return NewPseudoTypeNoResult(node.AsNode())
 * 	}
 * 	p := parent.Parameters()
 * 	selfIdx := slices.Index(p, node.AsNode())
 * 	lastRequired := lastRequiredParamIndex(p)
 * 	return ch.typeFromParameterWorker(node, selfIdx, lastRequired)
 * }
 */
export function PseudoChecker_typeFromParameter(receiver: GoPtr<PseudoChecker>, node: GoPtr<ParameterDeclaration>): GoPtr<PseudoType> {
  const parent = node!.Parent;
  if (parent!.Kind === KindSetAccessor) {
    return PseudoChecker_GetTypeOfAccessor(receiver, parent);
  }
  // Fast path: no initializer means we never need parameter position info.
  if (node!.Initializer === undefined) {
    if (node!.Type !== undefined) {
      return NewPseudoTypeDirect(node!.Type);
    }
    return NewPseudoTypeNoResult(Node_AsNode(node));
  }
  const p = Node_Parameters(parent);
  const selfIdx = p.indexOf(Node_AsNode(node));
  const lastRequired = lastRequiredParamIndex(p);
  return PseudoChecker_typeFromParameterWorker(receiver, node, selfIdx, lastRequired);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.typeFromParameterWorker","kind":"method","status":"implemented","sigHash":"448e76d1588c918da3cd18dbfd0e0a02d43196af461b4bb14b9d931b3ace821f"}
 *
 * Go source:
 * func (ch *PseudoChecker) typeFromParameterWorker(node *ast.ParameterDeclaration, selfIdx int, lastRequired int) *PseudoType {
 * 	parent := node.Parent
 * 	if parent.Kind == ast.KindSetAccessor {
 * 		return ch.GetTypeOfAccessor(parent)
 * 	}
 * 	hasRequiredAfter := selfIdx < lastRequired-1
 * 	declaredType := node.Type
 * 	if declaredType != nil {
 * 		result := NewPseudoTypeDirect(declaredType)
 * 		// When the parameter has an initializer and strict null checks are enabled,
 * 		// check if `| undefined` needs to be added because there are required parameters after this one.
 * 		// This mirrors the checker's getTypeOfParameter which adds optionality for initialized parameters.
 * 		if ch.strictNullChecks && node.Initializer != nil && hasRequiredAfter {
 * 			return addUndefinedIfDefinitelyRequired(result)
 * 		}
 * 		return result
 * 	}
 * 	if node.Initializer != nil && ast.IsIdentifier(node.Name()) && !isContextuallyTyped(node.AsNode()) {
 * 		expr := ch.typeFromExpression(node.Initializer)
 * 		if !ch.strictNullChecks {
 * 			return expr
 * 		}
 * 		if !hasRequiredAfter {
 * 			return expr
 * 		}
 * 		// if there is a non-optional parameter after this one, a `| undefined` will need to explicitly be emitted on this parameter, if it's not already there
 * 		return addUndefinedIfDefinitelyRequired(expr)
 * 	}
 * 	// TODO: In strada, the ID checker doesn't infer a parameter type from binding pattern names, but the real checker _does_!
 * 	// This means ID won't let you write, say, `({elem}) => false` without an annotation, even though it's trivially of type
 * 	// `(p0: {elem: any}) => boolean` and error-free under `noImplicitAny: false`!
 * 	// That limitation is retained here.
 * 	return NewPseudoTypeNoResult(node.AsNode())
 * }
 */
export function PseudoChecker_typeFromParameterWorker(receiver: GoPtr<PseudoChecker>, node: GoPtr<ParameterDeclaration>, selfIdx: int, lastRequired: int): GoPtr<PseudoType> {
  const parent = node!.Parent;
  if (parent!.Kind === KindSetAccessor) {
    return PseudoChecker_GetTypeOfAccessor(receiver, parent);
  }
  const hasRequiredAfter = selfIdx < lastRequired - 1;
  const declaredType = node!.Type;
  if (declaredType !== undefined) {
    const result = NewPseudoTypeDirect(declaredType);
    // When the parameter has an initializer and strict null checks are enabled,
    // check if `| undefined` needs to be added because there are required parameters after this one.
    // This mirrors the checker's getTypeOfParameter which adds optionality for initialized parameters.
    if (receiver!.strictNullChecks && node!.Initializer !== undefined && hasRequiredAfter) {
      return addUndefinedIfDefinitelyRequired(result);
    }
    return result;
  }
  if (node!.Initializer !== undefined && IsIdentifier(Node_Name(Node_AsNode(node))) && !isContextuallyTyped(Node_AsNode(node))) {
    const expr = PseudoChecker_typeFromExpression(receiver, node!.Initializer);
    if (!receiver!.strictNullChecks) {
      return expr;
    }
    if (!hasRequiredAfter) {
      return expr;
    }
    // if there is a non-optional parameter after this one, a `| undefined` will need to explicitly be emitted on this parameter, if it's not already there
    return addUndefinedIfDefinitelyRequired(expr);
  }
  // TODO: In strada, the ID checker doesn't infer a parameter type from binding pattern names, but the real checker _does_!
  // This means ID won't let you write, say, `({elem}) => false` without an annotation, even though it's trivially of type
  // `(p0: {elem: any}) => boolean` and error-free under `noImplicitAny: false`!
  // That limitation is retained here.
  return NewPseudoTypeNoResult(Node_AsNode(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::method::PseudoChecker.cloneParameters","kind":"method","status":"implemented","sigHash":"877e9bb3c299bafe31a9cf616e9b35142e177381118c88224b517a723deae078"}
 *
 * Go source:
 * func (ch *PseudoChecker) cloneParameters(nodes *ast.NodeList) []*PseudoParameter {
 * 	if nodes == nil {
 * 		return nil
 * 	}
 * 	if len(nodes.Nodes) == 0 {
 * 		return nil
 * 	}
 * 	lastRequired := lastRequiredParamIndex(nodes.Nodes)
 * 	result := make([]*PseudoParameter, 0, len(nodes.Nodes))
 * 	for i, e := range nodes.Nodes {
 * 		p := e.AsParameterDeclaration()
 * 		optional := p.QuestionToken != nil
 * 		if !optional && p.Initializer != nil {
 * 			// A parameter with an initializer is optional only if all subsequent
 * 			// parameters are also optional/have initializers/are rest parameters.
 * 			// This matches the checker's isOptionalParameter semantics.
 * 			optional = i >= lastRequired-1
 * 		}
 * 		result = append(result, NewPseudoParameter(
 * 			p.DotDotDotToken != nil,
 * 			e.Name(),
 * 			optional,
 * 			ch.typeFromParameterWorker(p, i, lastRequired),
 * 		))
 * 	}
 * 	return result
 * }
 */
export function PseudoChecker_cloneParameters(receiver: GoPtr<PseudoChecker>, nodes: GoPtr<NodeList>): GoSlice<GoPtr<PseudoParameter>> {
  if (nodes === undefined) {
    return GoNilSlice();
  }
  if (nodes!.Nodes.length === 0) {
    return GoNilSlice();
  }
  const lastRequired = lastRequiredParamIndex(nodes!.Nodes);
  let result: GoSlice<GoPtr<PseudoParameter>> = [];
  for (let i = 0; i < nodes!.Nodes.length; i++) {
    const e = nodes!.Nodes[i];
    const p = AsParameterDeclaration(e);
    let optional = p!.QuestionToken !== undefined;
    if (!optional && p!.Initializer !== undefined) {
      // A parameter with an initializer is optional only if all subsequent
      // parameters are also optional/have initializers/are rest parameters.
      // This matches the checker's isOptionalParameter semantics.
      optional = i >= lastRequired - 1;
    }
    result = GoAppend(result, NewPseudoParameter(
      p!.DotDotDotToken !== undefined,
      Node_Name(e),
      optional,
      PseudoChecker_typeFromParameterWorker(receiver, p, i, lastRequired),
    ));
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/lookup.go::func::isContextuallyTyped","kind":"func","status":"implemented","sigHash":"8c94d3856488caadca77acf93e2092e109a0fe88aefe38dd4a90061658f7837f"}
 *
 * Go source:
 * func isContextuallyTyped(node *ast.Node) bool {
 * 	return ast.FindAncestor(node.Parent, func(n *ast.Node) bool {
 * 		// Functions calls or parent type annotations (but not the return type of a function expression) may impact the inferred type and local inference is unreliable
 * 		if ast.IsCallExpression(n) {
 * 			return true
 * 		}
 * 		if ast.IsSatisfiesExpression(n) {
 * 			return true
 * 		}
 * 		if (ast.IsVariableParameterOrProperty(n) || ast.IsAssertionExpression(n)) && n.Type() != nil && !ast.IsConstAssertion(n) {
 * 			return true
 * 		}
 * 		return ast.IsJsxElement(n) || ast.IsJsxExpression(n)
 * 	}) != nil
 * }
 */
export function isContextuallyTyped(node: GoPtr<Node>): bool {
  return FindAncestor(node!.Parent, (n: GoPtr<Node>): bool => {
    if (IsCallExpression(n)) {
      return true;
    }
    if (IsSatisfiesExpression(n)) {
      return true;
    }
    if ((IsVariableParameterOrProperty(n) || IsAssertionExpression(n)) && Node_Type(n) !== undefined && !IsConstAssertion(n)) {
      return true;
    }
    return IsJsxElement(n) || IsJsxExpression(n);
  }) !== undefined;
}
