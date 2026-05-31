import type { int } from "@tsonic/core/types.js";

/**
 * Checker — expression inference.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Ports the expression side of upstream `checker.go` (`checkExpression`
 * and friends). Mutually recursive with statements/declarations — the
 * cycle is runtime-only (function calls), which ESM supports.
 */

import {
  Kind,
  KindNames,
  SymbolFlags,
  isArrayLiteralExpression,
  isArrowFunction,
  isAsExpression,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isConditionalExpression,
  isDeleteExpression,
  isElementAccessExpression,
  isIdentifier,
  isNewExpression,
  isNonNullExpression,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isSatisfiesExpression,
  isShorthandPropertyAssignment,
  isSpreadAssignment,
  isSpreadElement,
  isMethodDeclaration,
  isGetAccessorDeclaration,
  isSetAccessorDeclaration,
  isStringLiteral,
  isNumericLiteral,
  isBigIntLiteral,
  isNoSubstitutionTemplateLiteral,
  isPrivateIdentifier,
  isComputedPropertyName,
  isTaggedTemplateExpression,
  isTemplateExpression,
  isTypeOfExpression,
  isVoidExpression,
  isAwaitExpression,
  isYieldExpression,
  type ArrowFunction,
  type ConciseBody,
  type Expression,
  type Node as AstNode,
  type ParameterDeclaration,
  type PropertyName,
  type Symbol as AstSymbol,
  type TypeNode,
} from "../ast/index.js";

function kindDebugName(kind: Kind): string {
  const index: int = kind | 0;
  return KindNames[index] ?? String(kind);
}
import {
  type Type,
  type CheckState,
  anyType,
  booleanType,
  numberType,
  stringType,
  undefinedType,
  unresolvedType,
  isAnyType,
  isNumberType,
  isStringType,
  isUnknownType,
  isUnresolvedType,
  isFunctionType,
  getFunctionReturnType,
  getUnionType,
  getUnionTypeEx,
  UnionReduction,
  getApparentType,
  getNonNullableType,
  extractDefinitelyFalsyTypes,
  removeDefinitelyFalsyTypes,
  isPossiblyTruthy,
  isPossiblyFalsy,
  isPossiblyNullOrUndefined,
  getNegatedLiteralType,
  getWidenedLiteralLikeTypeForContextualType,
  literalTypeFromLiteralExpression,
  makeFunctionType,
  type FunctionParameter,
  makeObjectType,
  getPropertyTypeOfType,
  getPropertySymbolOfType,
  getTypeOfSymbol,
  isOptionalSymbol,
  isRestSymbol,
  getCallSignature,
  getConstructSignature,
  getArrayElementType,
  getIndexInfos,
  makeArrayType,
  neverType,
  type ObjectProperty,
  getWidenedType,
  checkAssignable,
  displayType,
  typeFromTypeNode,
  getResolvedSymbol,
  setInitializerInferrer,
} from "./checker.checkedtype.js";
import { checkBlock } from "./checker.statements.js";
import { getPropertyNameFromType, isTypeUsableAsPropertyName } from "./utilities.js";
import { SignatureFlags, SignatureKind, TypeFlags, type Signature } from "./types.js";

type SignatureKindValue = typeof SignatureKind.Call | typeof SignatureKind.Construct;
const SignatureKindCall = SignatureKind.Call;
const SignatureKindConstruct = SignatureKind.Construct;

// Infer an object-literal property value, contextually typed by the matching
// target property when present (preserving primitive literals the target asks
// for), otherwise widening it.
function contextualPropertyType(valueExpression: Expression, name: string, contextualType: Type | undefined, state: CheckState): Type {
  const contextualProperty = contextualType === undefined ? undefined : getPropertyTypeOfType(contextualType, name);
  const valueType = inferExpression(valueExpression, state, contextualProperty);
  return contextualProperty === undefined
    ? getWidenedType(valueType, state)
    : getWidenedLiteralLikeTypeForContextualType(valueType, contextualProperty, state);
}

export function inferExpression(expression: Expression, state: CheckState, contextualType?: Type): Type {
  // String / number / bigint / true / false / null literals — shared with
  // literal type-node resolution via literalTypeFromLiteralExpression (so the
  // two paths can't drift). Keyword literals (`true`/`false`/`null`) are matched
  // by Kind inside the helper, mirroring TS-Go's keyword-kind switch.
  const literalType = literalTypeFromLiteralExpression(expression, state);
  if (literalType !== undefined) {
    return literalType;
  }
  if (isIdentifier(expression)) {
    // VALUE-name resolution via the binder symbol graph (M5a): resolve the
    // identifier to its binder symbol (lexical local / parameter / module alias /
    // exported value, walking container.locals + symbol.exports/.members + the
    // parent chain), then read its type via getTypeOfSymbol's flag-dispatch.
    const symbol = getResolvedSymbol(expression.text, expression);
    if (symbol !== undefined) {
      const symbolType = getTypeOfSymbol(symbol);
      if (symbolType !== undefined) {
        return symbolType;
      }
    }
    // `undefined` is the global undefined value (TS-Go resolves it to the
    // undefinedSymbol of type undefined). TSTS has no global symbol table yet,
    // so model the unbound `undefined` identifier as the undefined intrinsic.
    if (expression.text === "undefined") {
      return undefinedType;
    }
    return unresolvedType;
  }
  if (isParenthesizedExpression(expression)) {
    return inferExpression(expression.expression, state);
  }
  if (isPrefixUnaryExpression(expression)) {
    inferExpression(expression.operand, state);
    if (expression.operator === Kind.ExclamationToken) {
      return booleanType;
    }
    if (expression.operator === Kind.MinusToken) {
      const negated = getNegatedLiteralType(expression.operand, state);
      if (negated !== undefined) {
        return negated;
      }
    }
    return numberType;
  }
  if (isPostfixUnaryExpression(expression)) {
    inferExpression(expression.operand, state);
    return numberType;
  }
  if (isSpreadElement(expression)) {
    return inferExpression(expression.expression, state);
  }
  if (isNonNullExpression(expression)) {
    return getNonNullableType(inferExpression(expression.expression, state), state);
  }
  if (isTemplateExpression(expression)) {
    for (const span of expression.templateSpans) inferExpression(span.expression, state);
    return stringType;
  }
  if (isTaggedTemplateExpression(expression)) {
    inferExpression(expression.tag, state);
    return anyType;
  }
  if (isTypeOfExpression(expression)) {
    inferExpression(expression.expression, state);
    return stringType;
  }
  if (isVoidExpression(expression)) {
    inferExpression(expression.expression, state);
    return undefinedType;
  }
  if (isDeleteExpression(expression)) {
    inferExpression(expression.expression, state);
    return booleanType;
  }
  if (isAwaitExpression(expression)) {
    return awaitedTypeOf(inferExpression(expression.expression, state));
  }
  if (isYieldExpression(expression)) {
    if (expression.expression !== undefined) inferExpression(expression.expression, state);
    return anyType;
  }
  if (isAsExpression(expression)) {
    inferExpression(expression.expression, state);
    return typeFromTypeNode(expression.type, state);
  }
  if (isSatisfiesExpression(expression)) {
    // `expr satisfies T`: check that the expression's type is assignable to T,
    // but the RESULT type is the expression's own type — not narrowed/widened
    // to T (mirrors TS-Go checkSatisfiesExpression: assignability is verified,
    // the expression type flows through unchanged).
    const targetType = typeFromTypeNode(expression.type, state);
    const exprType = inferExpression(expression.expression, state, targetType);
    checkAssignable(exprType, targetType, state);
    return exprType;
  }
  if (isConditionalExpression(expression)) {
    inferExpression(expression.condition, state);
    const whenTrue = inferExpression(expression.whenTrue, state);
    const whenFalse = inferExpression(expression.whenFalse, state);
    if (isAnyType(whenTrue) || isAnyType(whenFalse)) {
      return anyType;
    }
    if (isUnresolvedType(whenTrue) || isUnresolvedType(whenFalse)) {
      return unresolvedType;
    }
    return getUnionTypeEx([whenTrue, whenFalse], UnionReduction.Subtype, state);
  }
  if (isArrowFunction(expression)) {
    return inferArrowFunction(expression, state);
  }
  if (isBinaryExpression(expression)) {
    const left = inferExpression(expression.left, state);
    const right = inferExpression(expression.right, state);
    // Operand kind is determined from the apparent type so primitive literals
    // (e.g. `1 + 2`) classify as their base primitive.
    const leftApparent = getApparentType(left);
    const rightApparent = getApparentType(right);
    if (expression.operatorToken.kind === Kind.AmpersandAmpersandToken) {
      // `a && b`: definitely-falsy part of a, unioned with b, when a can be
      // truthy; otherwise just a (mirrors TS-Go checkBinaryLikeExpression).
      return isPossiblyTruthy(left)
        ? getUnionType([extractDefinitelyFalsyTypes(left, state), right], state)
        : left;
    }
    if (expression.operatorToken.kind === Kind.BarBarToken) {
      // `a || b`: non-nullable truthy part of a, unioned with b, when a can be
      // falsy; otherwise just a.
      return isPossiblyFalsy(left)
        ? getUnionTypeEx([getNonNullableType(removeDefinitelyFalsyTypes(left, state), state), right], UnionReduction.Subtype, state)
        : left;
    }
    if (expression.operatorToken.kind === Kind.QuestionQuestionToken) {
      // `a ?? b`: non-nullable a, unioned with b, when a can be null/undefined;
      // otherwise just a.
      return isPossiblyNullOrUndefined(left)
        ? getUnionTypeEx([getNonNullableType(left, state), right], UnionReduction.Subtype, state)
        : left;
    }
    if (isComparisonOperator(expression.operatorToken.kind)) {
      return booleanType;
    }
    if (isAssignmentOperator(expression.operatorToken.kind)) {
      return right;
    }
    if (expression.operatorToken.kind === Kind.PlusToken && (isStringType(leftApparent) || isStringType(rightApparent))) {
      return stringType;
    }
    if (isNumberType(leftApparent) && isNumberType(rightApparent)) {
      return numberType;
    }
    return unresolvedType;
  }
  if (isObjectLiteralExpression(expression)) {
    // Anonymous object type from property + shorthand/method/spread members.
    // Later properties override earlier spreads, matching JS object literal
    // semantics and TS-Go's anonymous-object construction.
    const properties = new Map<string, ObjectProperty>();
    for (const property of expression.properties) {
      // Each property is contextually typed by the target property type when a
      // contextual object type is present (so `{ port: 8080 }` against
      // `{ port: 8080 }` preserves the literal); otherwise its primitive-literal
      // type widens (`{ port: 8080 }` alone has property `port: number`).
      if (isPropertyAssignment(property)) {
        const name = propertyNameText(property.name, state);
        if (name === undefined) continue;
        properties.set(name, { name, type: contextualPropertyType(property.initializer, name, contextualType, state) });
      } else if (isShorthandPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.set(property.name.text, { name: property.name.text, type: contextualPropertyType(property.name, property.name.text, contextualType, state) });
      } else if (isMethodDeclaration(property)) {
        const name = propertyNameText(property.name, state);
        if (name === undefined) continue;
        const returnType = property.type === undefined ? anyType : typeFromTypeNode(property.type, state);
        properties.set(name, {
          name,
          type: makeFunctionType(returnType, state, functionParametersFromNode(property.parameters, state)),
        });
      } else if (isGetAccessorDeclaration(property)) {
        const name = propertyNameText(property.name, state);
        if (name === undefined) continue;
        const returnType = property.type === undefined ? anyType : typeFromTypeNode(property.type, state);
        properties.set(name, { name, type: returnType });
      } else if (isSetAccessorDeclaration(property)) {
        const name = propertyNameText(property.name, state);
        if (name === undefined) continue;
        const parameter = property.parameters[0];
        const parameterType = parameter?.type === undefined ? anyType : typeFromTypeNode(parameter.type, state);
        properties.set(name, { name, type: parameterType });
      } else if (isSpreadAssignment(property)) {
        for (const spreadProperty of objectPropertiesOfType(inferExpression(property.expression, state), state)) {
          properties.set(spreadProperty.name, spreadProperty);
        }
      } else {
        state.diagnostics.push({ message: `Object member kind '${kindDebugName(property.kind)}' is not yet supported by the checker.` });
      }
    }
    // Mark the direct object literal fresh so the relation can excess-check it.
    return makeObjectType([...properties.values()], state, true);
  }
  if (isArrayLiteralExpression(expression)) {
    // Element type = union of the (contextually typed, else widened) element
    // types. A spread of an array contributes its element type; a non-array
    // spread is surfaced explicitly rather than silently dropped. `[]` -> the
    // contextual element type, else `never`.
    const contextualElement = contextualType === undefined ? undefined : getArrayElementType(contextualType);
    const elementTypes = expression.elements.flatMap((element) => {
      if (isSpreadElement(element)) {
        const spreadType = inferExpression(element.expression, state, contextualType);
        const spreadElement = getArrayElementType(spreadType);
        if (spreadElement !== undefined) {
          return [spreadElement];
        }
        state.diagnostics.push({ message: "Array spread of a non-array value is not yet supported by the checker." });
        return [];
      }
      const valueType = inferExpression(element, state, contextualElement);
      return [contextualElement === undefined ? getWidenedType(valueType, state) : getWidenedLiteralLikeTypeForContextualType(valueType, contextualElement, state)];
    });
    const elementType = elementTypes.length === 0 ? (contextualElement ?? neverType) : getUnionType(elementTypes, state);
    return makeArrayType(elementType, state);
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.name.text, state);
  }
  if (isElementAccessExpression(expression)) {
    const receiverType = inferExpression(expression.expression, state);
    const indexType = inferExpression(expression.argumentExpression, state);
    if (isStringType(getApparentType(receiverType))) {
      const indexOk = isNumberType(getApparentType(indexType)) || isAnyType(indexType) || isUnresolvedType(indexType);
      if (!indexOk) {
        state.diagnostics.push({ message: `Type '${displayType(indexType)}' cannot be used to index type '${displayType(receiverType)}'.` });
        return unresolvedType;
      }
      return stringType;
    }
    const elementType = getArrayElementType(receiverType);
    if (elementType !== undefined) {
      // Numeric element access only; non-numeric indexes (e.g. `xs["bad"]`,
      // `xs[unknownValue]`) are rejected (named props go through property access
      // later). `any` and error types are accepted to avoid false cascades, but
      // `unknown` is a real known type and is not a valid numeric index.
      const indexOk = isNumberType(getApparentType(indexType))
        || isAnyType(indexType) || isUnresolvedType(indexType);
      if (!indexOk) {
        state.diagnostics.push({ message: `Type '${displayType(indexType)}' cannot be used to index type '${displayType(receiverType)}'.` });
        return unresolvedType;
      }
      return elementType;
    }
    if (isTypeUsableAsPropertyName(indexType)) {
      const propertyType = getPropertyTypeOfType(receiverType, getPropertyNameFromType(indexType));
      if (propertyType !== undefined) return propertyType;
    }
    // Index-signature access: `d[k]` returns the matching index info's value
    // type when the index relates to the key type. A string index signature is
    // also satisfied by a numeric index (JS keys coerce to strings).
    const indexInfos = getIndexInfos(receiverType);
    if (indexInfos !== undefined && indexInfos.length > 0) {
      if (isAnyType(indexType) || isUnresolvedType(indexType)) {
        return indexInfos[0]!.valueType;
      }
      const indexApparent = getApparentType(indexType);
      const matched = indexInfos.find((info) =>
        state.relater.isTypeAssignableTo(indexApparent, info.keyType)
        || (isStringType(info.keyType) && isNumberType(indexApparent)));
      if (matched !== undefined) return matched.valueType;
      state.diagnostics.push({ message: `Type '${displayType(indexType)}' cannot be used to index type '${displayType(receiverType)}'.` });
      return unresolvedType;
    }
    return unresolvedType;
  }
  if (isCallExpression(expression)) {
    const calleeType = inferExpression(expression.expression, state);
    const signature = getCallSignature(calleeType);
    if (signature !== undefined) {
      checkSignatureArguments(expression.arguments, signature, state);
    } else {
      for (const argument of expression.arguments) inferExpression(argument, state);
    }
    if (isAnyType(calleeType) || isUnknownType(calleeType) || isUnresolvedType(calleeType)) {
      return anyType;
    }
    return isFunctionType(calleeType) ? getFunctionReturnType(calleeType) : unresolvedType;
  }
  if (isNewExpression(expression)) {
    const calleeType = inferExpression(expression.expression, state);
    const signature = getConstructSignature(calleeType);
    if (signature !== undefined) {
      checkSignatureArguments(expression.arguments ?? [], signature, state);
    } else {
      for (const argument of expression.arguments ?? []) inferExpression(argument, state);
    }
    if (isAnyType(calleeType) || isUnknownType(calleeType) || isUnresolvedType(calleeType)) {
      return anyType;
    }
    return signature?.resolvedReturnType ?? unresolvedType;
  }
  return unresolvedType;
}

export function getTypeOfExpression(expression: Expression, state: CheckState): Type {
  return checkExpression(expression, state);
}

export function checkTypeOfExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  if (expression !== undefined) inferExpression(expression, state);
  return stringType;
}

export function checkNonNullAssertion(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  return expression === undefined ? unresolvedType : checkNonNullExpression(expression, state);
}

export function checkNonNullChain(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  return expression === undefined ? unresolvedType : checkNonNullExpression(expression, state);
}

export function checkExpressionWithTypeArguments(node: AstNode, state: CheckState): Type {
  const expression = expressionOf((node as { readonly expression?: AstNode }).expression ?? node);
  if (expression !== undefined) return inferExpression(expression, state);
  const type = (node as { readonly type?: AstNode }).type;
  return type === undefined ? unresolvedType : typeFromTypeNode(type as TypeNode, state);
}

export function checkSatisfiesExpression(node: AstNode, state: CheckState): Type {
  if (!isSatisfiesExpression(node)) return inferExpression(expressionNode(node), state);
  const targetType = typeFromTypeNode(node.type, state);
  const exprType = inferExpression(node.expression, state, targetType);
  checkAssignable(exprType, targetType, state);
  return exprType;
}

export function checkMetaProperty(node: AstNode, state: CheckState): Type {
  const keywordType = checkMetaPropertyKeyword(node, state);
  if ((node as { readonly name?: AstNode }).name !== undefined) return anyType;
  return keywordType;
}

export function checkNewTargetMetaProperty(node: AstNode, state: CheckState): Type {
  return checkMetaProperty(node, state);
}

export function checkImportMetaProperty(node: AstNode, state: CheckState): Type {
  return checkMetaProperty(node, state);
}

export function checkMetaPropertyKeyword(node: AstNode, state: CheckState): Type {
  void node;
  return anyTypeFromState(state);
}

export function checkDeleteExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  if (expression !== undefined) inferExpression(expression, state);
  return booleanType;
}

export function checkDeleteExpressionMustBeOptional(expr: AstNode, symbol: unknown, state: CheckState): void {
  void symbol;
  const expression = expressionOf(expr);
  if (expression === undefined) return;
  const type = inferExpression(expression, state);
  if (!isPossiblyNullOrUndefined(type)) {
    state.diagnostics.push({ message: "The_operand_of_a_delete_operator_must_be_optional." });
  }
}

export function checkVoidExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  if (expression !== undefined) inferExpression(expression, state);
  return undefinedType;
}

export function checkAwaitExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionOf(node);
  return expression === undefined ? unresolvedType : awaitedTypeOf(inferExpression(expression, state));
}

export function checkPrefixUnaryExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  if (!isPrefixUnaryExpression(expression)) return inferExpression(expression, state);
  return inferExpression(expression, state);
}

export function checkPostfixUnaryExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  if (!isPostfixUnaryExpression(expression)) return inferExpression(expression, state);
  return inferExpression(expression, state);
}

export function getUnaryResultType(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  return inferExpression(expression, state);
}

export function checkConditionalExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  return isConditionalExpression(expression) ? inferExpression(expression, state) : unresolvedType;
}

export function checkTruthinessExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  inferExpression(expression, state);
  return booleanType;
}

export function checkSpreadExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  if (!isSpreadElement(expression)) return inferExpression(expression, state);
  return inferExpression(expression.expression, state);
}

export function checkYieldExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  if (!isYieldExpression(expression)) return inferExpression(expression, state);
  if (expression.expression !== undefined) inferExpression(expression.expression, state);
  return anyType;
}

export function getYieldedTypeOfYieldExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  return isYieldExpression(expression) && expression.expression !== undefined
    ? inferExpression(expression.expression, state)
    : undefinedType;
}

export function checkSyntheticExpression(node: AstNode, state: CheckState): Type {
  return inferExpression(expressionNode(node), state);
}

export function checkDeprecatedSignature(signature: Signature, node: AstNode, state: CheckState): void {
  if ((signature.flags & SignatureFlags.IsSignatureCandidateForOverloadFailure) !== 0) return;
  if (signature.declaration !== undefined && isDeprecatedDeclaration(signature.declaration)) {
    const suggestionNode = getDeprecatedSuggestionNode(node);
    const name = tryGetPropertyAccessOrIdentifierToString(invokedExpression(node));
    addDeprecatedSuggestionWithSignature(suggestionNode, signature.declaration, name, signatureToString(signature), state);
  }
}

export function addDeprecatedSuggestionWithSignature(
  location: AstNode,
  declaration: AstNode,
  deprecatedEntity: string,
  signatureString: string,
  state: CheckState,
): { readonly message: string } {
  void location; void declaration;
  const message = deprecatedEntity.length > 0 ? "The_signature_0_of_1_is_deprecated" : "X_0_is_deprecated";
  const diagnostic = { message: `${message}: ${deprecatedEntity.length > 0 ? `${signatureString} of ${deprecatedEntity}` : signatureString}` };
  state.diagnostics.push(diagnostic);
  return diagnostic;
}

export function isSymbolOrSymbolForCall(node: AstNode): boolean {
  if (!isCallExpression(node)) return false;
  let left: AstNode | undefined = node.expression;
  if (left !== undefined && isPropertyAccessExpression(left) && left.name.text === "for") {
    left = left.expression;
  }
  return left !== undefined && isIdentifier(left) && left.text === "Symbol";
}

export function checkIdentifier(node: AstNode, state: CheckState): Type {
  return inferExpression(expressionNode(node), state);
}

export function checkPropertyAccessExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  return isPropertyAccessExpression(expression) ? inferPropertyAccess(expression.expression, expression.name.text, state) : unresolvedType;
}

export function checkPropertyAccessChain(node: AstNode, state: CheckState): Type {
  return checkPropertyAccessExpression(node, state);
}

export function checkPropertyAccessExpressionOrQualifiedName(
  node: AstNode,
  left: AstNode | undefined,
  leftType: Type | undefined,
  right: AstNode | undefined,
  state: CheckState,
): Type {
  const propertyName = identifierText(right ?? (node as { readonly name?: AstNode }).name);
  if (propertyName === undefined) return unresolvedType;
  if (leftType !== undefined) {
    return getPropertyTypeOfType(getApparentType(leftType), propertyName) ?? anyType;
  }
  const leftExpression = expressionOf(left ?? (node as { readonly expression?: AstNode }).expression);
  return leftExpression === undefined ? unresolvedType : inferPropertyAccess(leftExpression, propertyName, state);
}

export function getFlowTypeOfAccessExpression(node: AstNode, state: CheckState): Type {
  return inferExpression(expressionNode(node), state);
}

export function getControlFlowContainer(node: AstNode): AstNode | undefined {
  let current = parentOf(expressionNode(node));
  while (current !== undefined) {
    if (current.kind === Kind.FunctionDeclaration
      || current.kind === Kind.FunctionExpression
      || current.kind === Kind.ArrowFunction
      || current.kind === Kind.SourceFile
      || current.kind === Kind.ModuleBlock) {
      return current as AstNode;
    }
    current = parentOf(current);
  }
  return undefined;
}

export function getFlowTypeOfProperty(receiverType: Type, propertyName: string): Type | undefined {
  return getPropertyTypeOfType(getApparentType(receiverType), propertyName);
}

export function getTypeOfPropertyInBaseClass(receiverType: Type, propertyName: string): Type | undefined {
  const baseTypes = (receiverType.data as { readonly resolvedBaseTypes?: readonly Type[] } | undefined)?.resolvedBaseTypes ?? [];
  for (const baseType of baseTypes) {
    const propertyType = getPropertyTypeOfType(baseType, propertyName);
    if (propertyType !== undefined) return propertyType;
  }
  return undefined;
}

export function isMethodAccessForCall(node: AstNode): boolean {
  const parent = parentOf(expressionNode(node));
  return parent !== undefined && isCallExpression(parent) && parent.expression === node;
}

export function lookupSymbolForPrivateIdentifierDeclaration(receiverType: Type, privateIdentifier: AstNode): ReturnType<typeof getPropertySymbolOfType> {
  const name = identifierText(privateIdentifier);
  return name === undefined ? undefined : getPrivateIdentifierPropertyOfType(receiverType, name);
}

export function getPrivateIdentifierPropertyOfType(receiverType: Type, privateName: string): ReturnType<typeof getPropertySymbolOfType> {
  return getPropertySymbolOfType(getApparentType(receiverType), privateName);
}

export function checkPrivateIdentifierPropertyAccess(receiverType: Type, privateIdentifier: AstNode, state: CheckState): Type {
  const name = identifierText(privateIdentifier);
  if (name === undefined) return unresolvedType;
  const symbol = getPrivateIdentifierPropertyOfType(receiverType, name);
  if (symbol === undefined) {
    reportNonexistentProperty(privateIdentifier, receiverType, name, state);
    return unresolvedType;
  }
  return getTypeOfSymbol(symbol) ?? anyType;
}

export function reportNonexistentProperty(node: AstNode, receiverType: Type, propertyName: string, state: CheckState): void {
  const suggestion = getSuggestedSymbolForNonexistentProperty(propertyName, receiverType);
  const suggestionText = suggestion === undefined ? "" : ` Did you mean '${suggestion.name ?? suggestion.escapedName}'?`;
  state.diagnostics.push({ message: `Property '${propertyName}' does not exist on type '${displayType(receiverType)}'.${suggestionText}` });
  const lib = getSuggestedLibForNonExistentProperty(propertyName);
  if (lib !== undefined) state.diagnostics.push({ message: `Property '${propertyName}' is available when including library '${lib}'.` });
  void node;
}

export function getSuggestedLibForNonExistentProperty(propertyName: string): string | undefined {
  if (propertyName === "flat" || propertyName === "flatMap") return "es2019.array";
  if (propertyName === "at") return "es2022";
  if (propertyName === "replaceAll") return "es2021.string";
  if (propertyName === "includes") return "es2016.array.include";
  return undefined;
}

export function getSuggestedSymbolForNonexistentProperty(propertyName: string, receiverType: Type): ReturnType<typeof getPropertySymbolOfType> {
  const properties = (receiverType.data as { readonly declaredProperties?: readonly ReturnType<typeof getPropertySymbolOfType>[] } | undefined)?.declaredProperties ?? [];
  let best: ReturnType<typeof getPropertySymbolOfType>;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const property of properties) {
    const candidate = property?.name ?? property?.escapedName ?? "";
    if (candidate === "") continue;
    const distance = levenshteinDistance(propertyName.toLowerCase(), candidate.toLowerCase());
    if (distance < bestDistance) {
      best = property;
      bestDistance = distance;
    }
  }
  return bestDistance <= Math.max(1, Math.floor(propertyName.length * 0.4)) ? best : undefined;
}

export function isPropertyAccessible(property: ReturnType<typeof getPropertySymbolOfType>, _location: AstNode | undefined): boolean {
  if (property === undefined) return false;
  const declarations = property.declarations ?? [];
  return declarations.every(declaration => !hasModifierKind(declaration, Kind.PrivateKeyword) && !hasModifierKind(declaration, Kind.ProtectedKeyword));
}

export function containerSeemsToBeEmptyDomElement(receiverType: Type): boolean {
  const name = receiverType.symbol?.name ?? receiverType.aliasSymbol?.name ?? "";
  return name.endsWith("Element") && ((receiverType.data as { readonly declaredProperties?: readonly unknown[] } | undefined)?.declaredProperties?.length ?? 0) === 0;
}

export function checkThisExpression(node: AstNode, state: CheckState): Type {
  const container = containingThisContainer(node, true);
  if (container?.kind === Kind.Constructor) {
    checkThisBeforeSuper(node, container, "super must be called before accessing this in a derived class constructor", state);
  }
  checkThisInStaticClassFieldInitializerInDecoratedClass(node, container, state);
  return tryGetThisTypeAtEx(node, true, container, state) ?? anyTypeFromState(state);
}

export function getEnclosingClassFromThisParameter(node: AstNode, state: CheckState): Type | undefined {
  const thisParameter = getThisParameterFromNodeContext(node);
  const annotated = thisParameter?.type === undefined ? undefined : typeFromTypeNode(thisParameter.type, state);
  return annotated ?? getContextualThisParameterType(containingThisContainer(node, false), state);
}

export function getContextualThisParameterType(fn: AstNode | undefined, state: CheckState): Type | undefined {
  if (fn === undefined || isArrowFunction(fn)) return undefined;
  const thisParameter = firstThisParameter(fn);
  if (thisParameter?.type !== undefined) return typeFromTypeNode(thisParameter.type, state);
  const parent = parentOf(expressionNode(fn));
  if (parent !== undefined && isObjectLiteralExpression(parent)) return inferExpression(parent, state);
  return undefined;
}

export function tryGetThisTypeAt(node: AstNode, state: CheckState): Type | undefined {
  return tryGetThisTypeAtEx(node, true, undefined, state);
}

export function tryGetThisTypeAtEx(
  node: AstNode,
  includeGlobalThis: boolean,
  container: AstNode | undefined,
  state: CheckState,
): Type | undefined {
  const actualContainer = container ?? containingThisContainer(node, false);
  if (actualContainer !== undefined && isFunctionLikeNode(actualContainer)) {
    const contextualThis = getContextualThisParameterType(actualContainer, state);
    if (contextualThis !== undefined) return contextualThis;
  }
  const classContainer = containingClassNode(actualContainer ?? node);
  if (classContainer !== undefined) {
    const symbol = (classContainer as { readonly symbol?: AstSymbol }).symbol;
    const symbolType = symbol === undefined ? undefined : getTypeOfSymbol(symbol);
    if (symbolType !== undefined) return symbolType;
  }
  return includeGlobalThis ? anyType : undefined;
}

export function isInParameterInitializerBeforeContainingFunction(node: AstNode): boolean {
  const parameter = findAncestorNode(node, candidate => candidate.kind === Kind.Parameter);
  return parameter !== undefined
    && (parameter as { readonly initializer?: AstNode }).initializer !== undefined
    && containsNode((parameter as { readonly initializer?: AstNode }).initializer, node);
}

export function checkThisInStaticClassFieldInitializerInDecoratedClass(
  thisExpression: AstNode,
  container: AstNode | undefined,
  state: CheckState,
): void {
  if (container?.kind !== Kind.PropertyDeclaration) return;
  if (!hasModifierKind(container, Kind.StaticKeyword)) return;
  const classNode = containingClassNode(container);
  if (classNode !== undefined && hasDecorator(classNode)) {
    state.diagnostics.push({ message: "this cannot be referenced in a static class field initializer in a decorated class." });
    void thisExpression;
  }
}

export function checkThisBeforeSuper(node: AstNode, container: AstNode | undefined, diagnosticMessage: string, state: CheckState): void {
  if (container === undefined || !classDeclarationExtendsNonNull(containingClassNode(container))) return;
  const body = (container as { readonly body?: AstNode }).body;
  const nodePos = (node as { readonly pos?: number }).pos ?? 0;
  const firstSuper = body === undefined ? undefined : findDescendantNode(body, candidate => candidate.kind === Kind.SuperKeyword);
  const superPos = (firstSuper as { readonly pos?: number } | undefined)?.pos ?? Number.POSITIVE_INFINITY;
  if (nodePos < superPos) state.diagnostics.push({ message: diagnosticMessage });
}

export function classDeclarationExtendsNull(classDeclaration: AstNode | undefined): boolean {
  return heritageExpressions(classDeclaration).some(expression => nodeText(expression) === "null");
}

export function checkAssertion(node: AstNode, state: CheckState): Type {
  if (isAsExpression(node) || isSatisfiesExpression(node)) return inferExpression(node, state);
  const expression = (node as { readonly expression?: Expression }).expression;
  return expression === undefined ? unresolvedType : inferExpression(expression, state);
}

export function checkAssertionDeferred(node: AstNode, state: CheckState): void {
  checkAssertion(node, state);
}

export function checkDestructuringAssignment(node: AstNode, sourceType: Type, state: CheckState): Type {
  if (isObjectLiteralExpression(node)) return checkObjectLiteralAssignment(node, sourceType, false, state);
  if (isArrayLiteralExpression(node)) return checkArrayLiteralAssignment(node, sourceType, state);
  return checkReferenceAssignment(node, sourceType, state);
}

export function checkObjectLiteralAssignment(node: AstNode, sourceType: Type, rightIsThis: boolean, state: CheckState): Type {
  void rightIsThis;
  if (!isObjectLiteralExpression(node)) return checkReferenceAssignment(node, sourceType, state);
  node.properties.forEach((property, index) => checkObjectLiteralDestructuringPropertyAssignment(property, sourceType, index, node.properties, rightIsThis, state));
  return sourceType;
}

export function checkObjectLiteralDestructuringPropertyAssignment(
  node: AstNode,
  objectLiteralType: Type,
  propertyIndex: number,
  allProperties: readonly AstNode[],
  rightIsThis: boolean,
  state: CheckState,
): Type {
  void propertyIndex; void allProperties; void rightIsThis;
  if (isPropertyAssignment(node)) return checkDestructuringAssignment(node.initializer, getPropertyTypeForAssignmentTarget(objectLiteralType, node.name, state), state);
  if (isShorthandPropertyAssignment(node)) return checkReferenceAssignment(node.name, getPropertyTypeForAssignmentTarget(objectLiteralType, node.name, state), state);
  return objectLiteralType;
}

export function checkArrayLiteralAssignment(node: AstNode, sourceType: Type, state: CheckState): Type {
  if (!isArrayLiteralExpression(node)) return checkReferenceAssignment(node, sourceType, state);
  const elementType = getArrayElementType(sourceType) ?? anyType;
  node.elements.forEach((element, index) => checkArrayLiteralDestructuringElementAssignment(element, sourceType, index, elementType, state));
  return sourceType;
}

export function checkArrayLiteralDestructuringElementAssignment(
  node: AstNode,
  sourceType: Type,
  elementIndex: number,
  elementType: Type,
  state: CheckState,
): Type {
  void sourceType; void elementIndex;
  return checkReferenceAssignment(node, elementType, state);
}

export function checkReferenceAssignment(target: AstNode, sourceType: Type, state: CheckState): Type {
  const targetType = inferExpression(expressionNode(target), state, sourceType);
  checkAssignable(getWidenedLiteralLikeTypeForContextualType(sourceType, targetType, state), targetType, state);
  return sourceType;
}

export function reportOperatorError(leftType: Type, operator: Kind, rightType: Type, errorNode: AstNode, state: CheckState): void {
  state.diagnostics.push({ message: `Operator '${kindDebugName(operator)}' cannot be applied to types '${displayType(leftType)}' and '${displayType(rightType)}'.` });
  void errorNode;
}

export function reportOperatorErrorUnless(
  leftType: Type,
  operator: Kind,
  rightType: Type,
  errorNode: AstNode,
  typesAreCompatible: (left: Type, right: Type) => boolean,
  state: CheckState,
): void {
  if (!typesAreCompatible(leftType, rightType)) reportOperatorError(leftType, operator, rightType, errorNode, state);
}

export function getBaseTypesIfUnrelated(leftType: Type, rightType: Type, isRelated: (left: Type, right: Type) => boolean): readonly [Type, Type] {
  return isRelated(leftType, rightType) ? [leftType, rightType] : [getApparentType(leftType), getApparentType(rightType)];
}

export function checkAssignmentOperator(left: AstNode, operator: Kind, right: AstNode, leftType: Type, rightType: Type, state: CheckState): void {
  void left; void right;
  if (operator === Kind.PlusEqualsToken && (isStringType(getApparentType(leftType)) || isStringType(getApparentType(rightType)))) return;
  if (!state.relater.isTypeAssignableTo(rightType, leftType)) reportOperatorError(leftType, operator, rightType, right, state);
}

export function bothAreBigIntLike(left: Type, right: Type): boolean {
  return (left.flags & TypeFlags.BigIntLike) !== 0 && (right.flags & TypeFlags.BigIntLike) !== 0;
}

export function getSuggestedBooleanOperator(operator: Kind): Kind {
  if (operator === Kind.AmpersandToken) return Kind.AmpersandAmpersandToken;
  if (operator === Kind.BarToken) return Kind.BarBarToken;
  return operator;
}

export function checkArithmeticOperandType(operand: AstNode, type: Type, diagnostic: string, state: CheckState): boolean {
  const apparent = getApparentType(type);
  const ok = isNumberType(apparent) || (apparent.flags & TypeFlags.BigIntLike) !== 0 || isAnyType(apparent);
  if (!ok) state.diagnostics.push({ message: diagnostic });
  void operand;
  return ok;
}

export function checkBinaryExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  return isBinaryExpression(expression) ? inferExpression(expression, state) : unresolvedType;
}

export function checkBinaryLikeExpression(node: AstNode, state: CheckState): Type {
  return checkBinaryExpression(node, state);
}

export function checkObjectLiteral(node: AstNode, state: CheckState, contextualType?: Type): Type {
  const expression = expressionNode(node);
  return isObjectLiteralExpression(expression) ? inferExpression(expression, state, contextualType) : unresolvedType;
}

export function checkPropertyAssignment(node: AstNode, state: CheckState, contextualType?: Type): Type {
  if (!isPropertyAssignment(node)) return unresolvedType;
  const name = propertyNameText(node.name, state);
  const contextualProperty = name === undefined || contextualType === undefined ? undefined : getPropertyTypeOfType(contextualType, name);
  return inferExpression(node.initializer, state, contextualProperty);
}

export function checkShorthandPropertyAssignment(node: AstNode, state: CheckState): Type {
  if (!isShorthandPropertyAssignment(node)) return unresolvedType;
  return inferExpression(node.name as unknown as Expression, state);
}

export function getQuickTypeOfExpression(expression: Expression, state: CheckState): Type | undefined {
  if (isIdentifier(expression)) {
    const symbol = getResolvedSymbol(expression.text, expression);
    return symbol === undefined ? undefined : getTypeOfSymbol(symbol);
  }
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) return stringType;
  if (isNumericLiteral(expression)) return numberType;
  if (isBigIntLiteral(expression)) return anyType;
  return undefined;
}

export function getReturnTypeOfSingleNonGenericSignature(type: Type): Type | undefined {
  return getReturnTypeOfSingleNonGenericSignatureOfCallChain(type);
}

export function getReturnTypeOfSingleNonGenericSignatureOfCallChain(type: Type): Type | undefined {
  const signature = getCallSignature(type) ?? getConstructSignature(type);
  const typeParameters = (signature as { readonly typeParameters?: readonly Type[] } | undefined)?.typeParameters ?? [];
  return typeParameters.length === 0 ? signature?.resolvedReturnType : undefined;
}

export function checkNonNullExpression(expression: Expression, state: CheckState): Type {
  return checkNonNullType(inferExpression(expression, state), expression, state);
}

export function checkNonNullType(type: Type, node: Expression, state: CheckState): Type {
  return checkNonNullTypeWithReporter(type, node, state, reportObjectPossiblyNullOrUndefinedError);
}

export function checkNonNullTypeWithReporter(
  type: Type,
  node: Expression,
  state: CheckState,
  reportError: (node: Expression, type: Type, state: CheckState) => void,
): Type {
  if (isPossiblyNullOrUndefined(type)) reportError(node, type, state);
  return getNonNullableType(type, state);
}

export function checkNonNullNonVoidType(type: Type, node: Expression, state: CheckState): Type {
  if ((type.flags & (1 << 4)) !== 0) state.diagnostics.push({ message: "Object_is_possibly_void" });
  return checkNonNullType(type, node, state);
}

export function reportObjectPossiblyNullOrUndefinedError(node: Expression, type: Type, state: CheckState): void {
  void node;
  state.diagnostics.push({ message: `Object is possibly '${displayType(type)}'.` });
}

export function checkExpressionWithContextualType(expression: Expression, contextualType: Type | undefined, state: CheckState): Type {
  return inferExpression(expression, state, contextualType);
}

export function getContextNode(node: Expression): Expression {
  return skipOuterExpressions(node);
}

export function checkExpressionCached(expression: Expression, state: CheckState): Type {
  return inferExpression(expression, state);
}

export function checkExpressionCachedEx(expression: Expression, state: CheckState, contextualType: Type | undefined): Type {
  return inferExpression(expression, state, contextualType);
}

export function getContextFreeTypeOfExpression(expression: Expression, state: CheckState): Type {
  return inferExpression(expression, state);
}

export function checkExpression(expression: Expression, state: CheckState): Type {
  return inferExpression(expression, state);
}

export function checkExpressionEx(expression: Expression, state: CheckState, contextualType: Type | undefined): Type {
  return inferExpression(expression, state, contextualType);
}

export function checkConstEnumAccess(node: Expression, state: CheckState): void {
  if (isPropertyAccessExpression(node)) inferExpression(node.expression, state);
}

export function instantiateTypeWithSingleGenericCallSignature(type: Type, _node: Expression, _state: CheckState): Type {
  return type;
}

export function getOuterInferenceTypeParameters(node: Expression): readonly Type[] {
  void node;
  return [];
}

export function getUniqueTypeParameters(typeParameters: readonly Type[]): readonly Type[] {
  const seen = new Set<Type>();
  const result: Type[] = [];
  for (const typeParameter of typeParameters) {
    if (seen.has(typeParameter)) continue;
    seen.add(typeParameter);
    result.push(typeParameter);
  }
  return result;
}

export function hasTypeParameterByName(typeParameters: readonly Type[], name: string): boolean {
  return typeParameters.some(typeParameter => getUniqueTypeParameterName(typeParameter) === name);
}

export function getUniqueTypeParameterName(typeParameter: Type): string {
  return (typeParameter.symbol as { readonly name?: string } | undefined)?.name ?? "";
}

export function checkExpressionWorker(expression: Expression, state: CheckState, contextualType?: Type): Type {
  return inferExpression(expression, state, contextualType);
}

export function checkPrivateIdentifierExpression(expression: Expression, state: CheckState): Type {
  const symbol = getSymbolForPrivateIdentifierExpression(expression);
  return symbol === undefined ? unresolvedType : getTypeOfSymbol(symbol) ?? unresolvedType;
}

export function getSymbolForPrivateIdentifierExpression(expression: Expression): ReturnType<typeof getResolvedSymbol> {
  if (!isPrivateIdentifier(expression)) return undefined;
  return getResolvedSymbol(expression.text, expression);
}

export function checkSuperExpression(expression: Expression, state: CheckState): Type {
  void expression;
  return anyTypeFromState(state);
}

export function isInConstructorArgumentInitializer(node: Expression): boolean {
  for (let current: Expression | undefined = node; current !== undefined; current = parentOf(current) as Expression | undefined) {
    if (current.kind === Kind.Constructor) return true;
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction) return false;
  }
  return false;
}

export function checkTemplateExpression(expression: Expression, state: CheckState): Type {
  if (isTemplateExpression(expression)) {
    for (const span of expression.templateSpans) inferExpression(span.expression, state);
  }
  return stringType;
}

export function isTemplateLiteralContext(node: Expression): boolean {
  return parentOf(node)?.kind === Kind.TemplateExpression || isTemplateLiteralContextualType(node);
}

export function isTemplateLiteralContextualType(node: Expression): boolean {
  void node;
  return false;
}

export function checkRegularExpressionLiteral(expression: Expression, state: CheckState): Type {
  void expression;
  return inferGlobalStaticProperty("RegExp", "prototype", state) ?? anyType;
}

export function checkArrayLiteral(expression: Expression, state: CheckState, contextualType?: Type): Type {
  if (!isArrayLiteralExpression(expression)) return inferExpression(expression, state, contextualType);
  return createArrayLiteralType(expression.elements.map(element => inferExpression(element, state)), state);
}

export function createArrayLiteralType(elementTypes: readonly Type[], state: CheckState): Type {
  return makeArrayType(elementTypes.length === 0 ? neverType : getUnionType(elementTypes, state), state);
}

export function isSpreadIntoCallOrNew(node: Expression): boolean {
  const parent = parentOf(node);
  return isSpreadElement(node) && (parent?.kind === Kind.CallExpression || parent?.kind === Kind.NewExpression);
}

export function checkQualifiedName(node: Expression, state: CheckState): Type {
  const left = (node as { readonly left?: Expression }).left;
  const right = (node as { readonly right?: { readonly text?: string } }).right;
  if (left === undefined || right?.text === undefined) return unresolvedType;
  return inferPropertyAccess(left, right.text, state);
}

export function checkIndexedAccess(receiverType: Type, indexType: Type, state: CheckState): Type {
  const elementType = getArrayElementType(receiverType);
  if (elementType !== undefined && isNumberType(getApparentType(indexType))) return elementType;
  if (isTypeUsableAsPropertyName(indexType)) {
    const property = getPropertyTypeOfType(receiverType, getPropertyNameFromType(indexType));
    if (property !== undefined) return property;
  }
  for (const info of getIndexInfos(receiverType) ?? []) {
    if (state.relater.isTypeAssignableTo(indexType, info.keyType)) return info.valueType;
  }
  return unresolvedType;
}

export function checkElementAccessChain(expression: Expression, state: CheckState): Type {
  return checkElementAccessExpression(expression, state);
}

export function checkElementAccessExpression(expression: Expression, state: CheckState): Type {
  if (!isElementAccessExpression(expression)) return inferExpression(expression, state);
  return checkIndexedAccess(inferExpression(expression.expression, state), inferExpression(expression.argumentExpression, state), state);
}

export function isForInVariableForNumericPropertyNames(node: Expression): boolean {
  const parent = parentOf(node);
  return parent?.kind === Kind.ForInStatement;
}

export function getForInVariableSymbol(node: Expression): ReturnType<typeof getResolvedSymbol> {
  return isIdentifier(node) ? getResolvedSymbol(node.text, node) : undefined;
}

export function hasNumericPropertyNames(type: Type): boolean {
  return getIndexInfos(type)?.some(info => isNumberType(getApparentType(info.keyType))) ?? false;
}

export function checkIndexedAccessIndexType(receiverType: Type, indexType: Type, state: CheckState): boolean {
  return checkIndexedAccess(receiverType, indexType, state) !== unresolvedType;
}

export function getConstituentProperty(type: Type, name: string): ReturnType<typeof getPropertySymbolOfType> {
  return getPropertySymbolOfType(type, name);
}

export function checkImportCallExpression(expression: Expression, state: CheckState): Type {
  if (!isCallExpression(expression)) return unresolvedType;
  for (const argument of expression.arguments) inferExpression(argument, state);
  return anyType;
}

export function checkCallExpression(expression: Expression, state: CheckState): Type {
  if (!isCallExpression(expression)) return inferExpression(expression, state);
  return inferExpression(expression, state);
}

export function resolveSignature(node: AstNode, state: CheckState): Signature | undefined {
  const expression = expressionNode(node);
  if (isCallExpression(expression)) return resolveCallExpression(expression, state);
  if (isNewExpression(expression)) return resolveNewExpression(expression, state);
  if (isTaggedTemplateExpression(expression)) return resolveTaggedTemplateExpression(expression, state);
  return undefined;
}

export function resolveCallExpression(expression: Expression, state: CheckState): Signature | undefined {
  if (!isCallExpression(expression)) return undefined;
  return resolveCall(expression.expression, expression.arguments, SignatureKindCall, state);
}

export function resolveNewExpression(expression: Expression, state: CheckState): Signature | undefined {
  if (!isNewExpression(expression)) return undefined;
  return resolveCall(expression.expression, expression.arguments ?? [], SignatureKindConstruct, state);
}

export function resolveTaggedTemplateExpression(expression: Expression, state: CheckState): Signature | undefined {
  if (!isTaggedTemplateExpression(expression)) return undefined;
  return resolveCall(expression.tag, [], SignatureKindCall, state);
}

export function resolveDecorator(node: AstNode, state: CheckState): Signature | undefined {
  const expression = expressionOf((node as { readonly expression?: AstNode }).expression ?? node);
  return expression === undefined ? undefined : resolveCall(expression, [], SignatureKindCall, state);
}

export function resolveInstanceofExpression(node: AstNode, state: CheckState): Type {
  const expression = expressionNode(node);
  if (isBinaryExpression(expression)) {
    inferExpression(expression.left, state);
    inferExpression(expression.right, state);
  }
  return booleanType;
}

export function resolveCall(
  callee: Expression,
  arguments_: readonly Expression[],
  kind: SignatureKindValue,
  state: CheckState,
): Signature | undefined {
  const calleeType = inferExpression(callee, state);
  const signature = kind === SignatureKindConstruct ? getConstructSignature(calleeType) : getCallSignature(calleeType);
  if (signature === undefined) {
    for (const argument of arguments_) inferExpression(argument, state);
    return undefined;
  }
  checkSignatureArguments(arguments_, signature, state);
  return signature;
}

export function reorderCandidates(signatures: readonly Signature[]): readonly Signature[] {
  return [...signatures].sort((left, right) => specificityScore(right) - specificityScore(left));
}

export function getOptionalCallSignature(type: Type): Signature | undefined {
  return getCallSignature(type) ?? getCallSignature(getApparentType(type));
}

export function chooseOverload(
  candidates: readonly Signature[],
  arguments_: readonly Expression[],
  state: CheckState,
): Signature | undefined {
  for (const candidate of reorderCandidates(candidates)) {
    if (isSignatureApplicable(candidate, arguments_, state)) return candidate;
  }
  return undefined;
}

export function hasCorrectArity(signature: Signature, argumentCount: number): boolean {
  const hasRest = tryGetRestTypeOfSignature(signature) !== undefined;
  return argumentCount >= signature.minArgumentCount && (hasRest || argumentCount <= signature.parameters.length);
}

export function getDecoratorArgumentCount(node: AstNode): number {
  const expression = expressionOf((node as { readonly expression?: AstNode }).expression ?? node);
  return expression !== undefined && isCallExpression(expression) ? expression.arguments.length : 1;
}

export function getLegacyDecoratorArgumentCount(node: AstNode): number {
  switch ((node as { readonly parent?: AstNode }).parent?.kind) {
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
      return 1;
    case Kind.Parameter:
      return 3;
    default:
      return 2;
  }
}

export function hasCorrectTypeArgumentArity(signature: Signature, typeArgumentCount: number): boolean {
  const typeParameters = signature.typeParameters ?? [];
  return typeArgumentCount === 0 || typeArgumentCount === typeParameters.length;
}

export function checkTypeArguments(typeArguments: readonly AstNode[] | undefined, signature: Signature, state: CheckState): readonly Type[] {
  const checked = (typeArguments ?? []).map(typeArgument => typeFromTypeNode(typeArgument as TypeNode, state));
  if (!hasCorrectTypeArgumentArity(signature, checked.length)) {
    state.diagnostics.push({ message: `Expected ${signature.typeParameters?.length ?? 0} type arguments, but got ${checked.length}.` });
  }
  return checked;
}

export function isSignatureApplicable(signature: Signature, arguments_: readonly Expression[], state: CheckState): boolean {
  if (!hasCorrectArity(signature, arguments_.length)) return false;
  for (let index = 0; index < arguments_.length; index += 1) {
    const parameter = signature.parameters[Math.min(index, signature.parameters.length - 1)];
    const parameterType = parameter === undefined ? undefined : getTypeOfSymbol(parameter);
    if (parameterType === undefined) continue;
    const argumentType = inferExpression(arguments_[index]!, state, parameterType);
    if (!state.relater.isTypeAssignableTo(getWidenedLiteralLikeTypeForContextualType(argumentType, parameterType, state), parameterType)) return false;
  }
  return true;
}

export function getThisArgumentOfCall(node: AstNode): Expression | undefined {
  const expression = expressionOf((node as { readonly expression?: AstNode }).expression ?? node);
  if (expression !== undefined && (isPropertyAccessExpression(expression) || isElementAccessExpression(expression))) return expression.expression;
  return undefined;
}

export function getThisArgumentType(node: AstNode, state: CheckState): Type | undefined {
  const thisArgument = getThisArgumentOfCall(node);
  return thisArgument === undefined ? undefined : inferExpression(thisArgument, state);
}

export function getEffectiveCheckNode(node: AstNode): AstNode {
  return skipOuterExpressions(expressionNode(node));
}

export function inferTypeArguments(
  signature: Signature,
  arguments_: readonly Expression[],
  state: CheckState,
): readonly Type[] {
  void signature;
  return arguments_.map(argument => inferExpression(argument, state));
}

export function getCandidateForOverloadFailure(candidates: readonly Signature[], arguments_: readonly Expression[]): Signature | undefined {
  return pickLongestCandidateSignature(candidates, arguments_.length);
}

export function pickLongestCandidateSignature(candidates: readonly Signature[], argumentCount: number): Signature | undefined {
  const index = getLongestCandidateIndex(candidates, argumentCount);
  return index < 0 ? undefined : candidates[index];
}

export function getLongestCandidateIndex(candidates: readonly Signature[], argumentCount: number): number {
  let bestIndex = -1;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < candidates.length; index += 1) {
    const distance = Math.abs(candidates[index]!.parameters.length - argumentCount);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}

export function getTypeArgumentsFromNodes(typeArguments: readonly AstNode[] | undefined, state: CheckState): readonly Type[] {
  return (typeArguments ?? []).map(typeArgument => typeFromTypeNode(typeArgument as TypeNode, state));
}

export function inferSignatureInstantiationForOverloadFailure(signature: Signature): Signature {
  return signature;
}

export function createUnionOfSignaturesForOverloadFailure(signatures: readonly Signature[], state: CheckState): Signature | undefined {
  if (signatures.length === 0) return undefined;
  if (signatures.length === 1) return signatures[0];
  const returnTypes = signatures.map(signature => signature.resolvedReturnType).filter((type): type is Type => type !== undefined);
  return {
    flags: 0,
    parameters: signatures[0]!.parameters,
    minArgumentCount: Math.min(...signatures.map(signature => signature.minArgumentCount)),
    resolvedReturnType: returnTypes.length === 0 ? anyType : getUnionTypeEx(returnTypes, UnionReduction.Subtype, state),
    compositeKind: SignatureKindCall,
    compositeSignatures: signatures,
  };
}

export function createCombinedSymbolFromTypes(types: readonly Type[], name: string = "__combined"): AstSymbol {
  const declarations = types.flatMap(type => type.symbol?.declarations ?? []);
  const flags = types.reduce((result, type) => (result | (type.symbol?.flags ?? SymbolFlags.None)) as SymbolFlags, SymbolFlags.None as SymbolFlags);
  return {
    name,
    escapedName: name,
    flags,
    declarations,
  } as AstSymbol;
}

export function createCombinedSymbolForOverloadFailure(signatures: readonly Signature[], name: string = "__overload"): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Signature,
    declarations: signatures.flatMap(signature => signature.declaration === undefined ? [] : [signature.declaration]),
  } as AstSymbol;
}

export function reportCallResolutionErrors(
  node: AstNode,
  candidates: readonly Signature[],
  arguments_: readonly Expression[],
  state: CheckState,
): void {
  const arityError = getArgumentArityError(candidates, arguments_.length);
  if (arityError !== undefined) {
    state.diagnostics.push({ message: arityError });
    return;
  }
  const typeArgumentError = getTypeArgumentArityError(candidates, (node as { readonly typeArguments?: readonly AstNode[] }).typeArguments?.length ?? 0);
  if (typeArgumentError !== undefined) {
    state.diagnostics.push({ message: typeArgumentError });
    return;
  }
  state.diagnostics.push({ message: invocationErrorDetails(node, candidates.length === 0 ? "call" : "overload") });
}

export function addImplementationSuccessElaboration(
  node: AstNode,
  implementation: Signature | undefined,
  state: CheckState,
): void {
  if (implementation?.declaration !== undefined) {
    state.diagnostics.push({ message: `The call would have succeeded against implementation signature ${signatureToString(implementation)}.` });
    void node;
  }
}

export function getArgumentArityError(candidates: readonly Signature[], argumentCount: number): string | undefined {
  if (candidates.length === 0) return undefined;
  if (candidates.some(signature => hasCorrectArity(signature, argumentCount))) return undefined;
  const min = Math.min(...candidates.map(signature => signature.minArgumentCount));
  const max = candidates.some(signature => tryGetRestTypeOfSignature(signature) !== undefined)
    ? Number.POSITIVE_INFINITY
    : Math.max(...candidates.map(signature => signature.parameters.length));
  return max === Number.POSITIVE_INFINITY
    ? `Expected at least ${min} arguments, but got ${argumentCount}.`
    : min === max
      ? `Expected ${min} arguments, but got ${argumentCount}.`
      : `Expected ${min}-${max} arguments, but got ${argumentCount}.`;
}

export function isPromiseResolveArityError(signature: Signature, argumentCount: number): boolean {
  const declarationName = (signature.declaration as { readonly name?: { readonly text?: string } } | undefined)?.name?.text;
  return declarationName === "resolve" && argumentCount > signature.parameters.length;
}

export function getTypeArgumentArityError(candidates: readonly Signature[], typeArgumentCount: number): string | undefined {
  if (typeArgumentCount === 0 || candidates.length === 0) return undefined;
  if (candidates.some(signature => hasCorrectTypeArgumentArity(signature, typeArgumentCount))) return undefined;
  const expected = candidates[0]!.typeParameters?.length ?? 0;
  return `Expected ${expected} type arguments, but got ${typeArgumentCount}.`;
}

export function reportCannotInvokePossiblyNullOrUndefinedError(node: AstNode, type: Type, state: CheckState): void {
  state.diagnostics.push({ message: `Cannot invoke an object which is possibly 'null' or 'undefined': ${displayType(type)}.` });
  void node;
}

export function invocationErrorDetails(node: AstNode, kind: string): string {
  return `This expression is not ${kind === "construct" ? "constructable" : "callable"}: ${tryGetPropertyAccessOrIdentifierToString(invokedExpression(node))}`;
}

export function invocationError(node: AstNode, type: Type, kind: SignatureKindValue, state: CheckState): void {
  const description = kind === SignatureKindConstruct ? "construct" : "call";
  state.diagnostics.push({ message: `${invocationErrorDetails(node, description)}. Type '${displayType(type)}' has no ${description} signatures.` });
}

export function invocationErrorRecovery(node: AstNode, type: Type, kind: SignatureKindValue, state: CheckState): Type {
  invocationError(node, type, kind, state);
  return unresolvedType;
}

export function isGenericFunctionReturningFunction(signature: Signature): boolean {
  return (signature.typeParameters?.length ?? 0) > 0
    && signature.resolvedReturnType !== undefined
    && isFunctionType(signature.resolvedReturnType);
}

export function skippedGenericFunction(node: AstNode, state: CheckState): Signature {
  state.diagnostics.push({ message: "Generic function call deferred because its contextual return function type is still being resolved." });
  void node;
  return {
    flags: SignatureFlags.IsNonInferrable,
    parameters: [],
    minArgumentCount: 0,
    resolvedReturnType: neverType,
  };
}

export function checkTaggedTemplateExpression(expression: Expression, state: CheckState): Type {
  return isTaggedTemplateExpression(expression) ? inferExpression(expression, state) : unresolvedType;
}

export function checkParenthesizedExpression(expression: Expression, state: CheckState): Type {
  return isParenthesizedExpression(expression) ? inferExpression(expression.expression, state) : inferExpression(expression, state);
}

export function getContextualSignature(node: AstNode, state: CheckState): Signature | undefined {
  const type = inferExpression(expressionNode(node), state);
  return getCallSignature(type);
}

export function createUnionSignature(signatures: readonly Signature[], state: CheckState): Signature | undefined {
  return createUnionOfSignaturesForOverloadFailure(signatures, state);
}

export function getContextualCallSignature(node: AstNode, state: CheckState): Signature | undefined {
  const signature = getContextualSignature(node, state);
  return signature?.compositeKind === SignatureKindConstruct ? undefined : signature;
}

export function getIntersectedSignatures(signatures: readonly Signature[]): readonly Signature[] {
  return reorderCandidates(signatures);
}

export function isAritySmaller(left: Signature, right: Signature): boolean {
  return left.minArgumentCount < right.minArgumentCount
    || (left.minArgumentCount === right.minArgumentCount && left.parameters.length < right.parameters.length);
}

export function getInstantiationExpressionType(expression: Expression, state: CheckState): Type {
  return inferExpression(expression, state);
}

export function tryGetRestTypeOfSignature(signature: Signature): Type | undefined {
  const last = signature.parameters[signature.parameters.length - 1];
  if (last !== undefined && isRestSymbol(last)) return getTypeOfSymbol(last);
  return (signature as { readonly restType?: Type }).restType;
}

export function resolveUntypedCall(callee: Expression, arguments_: readonly Expression[], state: CheckState): Type {
  inferExpression(callee, state);
  for (const argument of arguments_) inferExpression(argument, state);
  return anyType;
}

export function resolveErrorCall(callee: Expression, arguments_: readonly Expression[], state: CheckState): Type {
  inferExpression(callee, state);
  for (const argument of arguments_) inferExpression(argument, state);
  return unresolvedType;
}

export function isUntypedFunctionCall(calleeType: Type): boolean {
  return isAnyType(calleeType) || isUnknownType(calleeType) || isUnresolvedType(calleeType);
}

export function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState): Type {
  // The arrow's parameters were bound into its own `locals` by the binder; a
  // reference inside the body resolves through them (no checker-side parameter
  // environment). The checker only infers the body + assembles the function type.
  const declaredReturnType = arrowFunction.type === undefined ? undefined : typeFromTypeNode(arrowFunction.type, state);
  const inferredReturnType = inferConciseBody(arrowFunction.body, state, declaredReturnType);
  const parameters: FunctionParameter[] = arrowFunction.parameters
    .filter((parameter) => isIdentifier(parameter.name))
    .map((parameter) => ({
      name: (parameter.name as { readonly text: string }).text,
      type: parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, state),
      optional: parameter.questionToken !== undefined || parameter.initializer !== undefined,
      rest: parameter.dotDotDotToken !== undefined,
    }));
  return makeFunctionType(declaredReturnType ?? inferredReturnType, state, parameters);
}

export function inferConciseBody(body: ConciseBody, state: CheckState, expectedReturnType: Type | undefined): Type {
  if (isBlock(body)) {
    checkBlock(body, state, expectedReturnType);
    return expectedReturnType ?? unresolvedType;
  }
  const bodyType = inferExpression(body, state);
  if (expectedReturnType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(bodyType, expectedReturnType, state), expectedReturnType, state);
  }
  return bodyType;
}

function checkSignatureArguments(arguments_: readonly Expression[], signature: Signature, state: CheckState): void {
  const parameters = signature.parameters;
  const lastParameterIndex: int = (parameters.length - 1) | 0;
  const hasRest = parameters.length > 0 && isRestSymbol(parameters[lastParameterIndex]!);
  const restIndexForContext: int = hasRest ? lastParameterIndex : -1;
  const contextualParameterType = (index: int): Type | undefined => {
    if (restIndexForContext >= 0 && index >= restIndexForContext) {
      const restType = getTypeOfSymbol(parameters[restIndexForContext]!);
      return restType === undefined ? undefined : getArrayElementType(restType);
    }
    const parameter = parameters[index];
    return parameter === undefined ? undefined : getTypeOfSymbol(parameter);
  };
  const argumentTypes = arguments_.map((argument, index) => {
    const argumentIndex: int = index | 0;
    return inferExpression(argument, state, contextualParameterType(argumentIndex));
  });
  const maxArguments = hasRest ? Number.POSITIVE_INFINITY : parameters.length;
  if (argumentTypes.length < signature.minArgumentCount || argumentTypes.length > maxArguments) {
    const expected = hasRest
      ? `at least ${signature.minArgumentCount}`
      : signature.minArgumentCount === parameters.length
        ? `${signature.minArgumentCount}`
        : `${signature.minArgumentCount}-${parameters.length}`;
    state.diagnostics.push({ message: `Expected ${expected} arguments, but got ${argumentTypes.length}.` });
    return;
  }
  parameters.forEach((parameter, index) => {
    const parameterIndex: int = index | 0;
    const parameterType = getTypeOfSymbol(parameter);
    if (parameterType === undefined) return;
    if (parameterIndex === restIndexForContext) {
      const elementType = getArrayElementType(parameterType);
      if (elementType !== undefined) {
        argumentTypes.slice(parameterIndex).forEach((argumentType) => {
          checkAssignable(getWidenedLiteralLikeTypeForContextualType(argumentType, elementType, state), elementType, state);
        });
      }
      return;
    }
    const argumentType = argumentTypes[parameterIndex];
    if (argumentType === undefined) return;
    const target = isOptionalSymbol(parameter) ? getUnionType([parameterType, undefinedType], state) : parameterType;
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(argumentType, target, state), target, state);
  });
}

// Primitive built-in methods are modeled directly here until the lib declaration
// model lands. Keep concrete signatures where the standard surface is fixed; use
// an `any[]` rest only for overload families that need richer lib types.
const placeholderRestParameters: readonly FunctionParameter[] = [{ name: "args", type: anyType, rest: true }];

export function inferPropertyAccess(expression: Expression, propertyName: string, state: CheckState): Type {
  if (isIdentifier(expression)) {
    const globalStatic = inferGlobalStaticProperty(expression.text, propertyName, state);
    if (globalStatic !== undefined) return globalStatic;
  }
  const receiverType = getApparentType(inferExpression(expression, state));
  if (isNumberType(receiverType) && propertyName === "toFixed") {
    return makeFunctionType(stringType, state, [{ name: "fractionDigits", type: numberType, optional: true }]);
  }
  if (isStringType(receiverType) && propertyName === "length") {
    return numberType;
  }
  if (getArrayElementType(receiverType) !== undefined && propertyName === "length") {
    return numberType;
  }
  const arrayElement = getArrayElementType(receiverType);
  if (arrayElement !== undefined) {
    const arrayMethod = inferArrayMethod(propertyName, arrayElement, state);
    if (arrayMethod !== undefined) return arrayMethod;
  }
  if (isStringType(receiverType)) {
    const stringMethod = inferStringMethod(propertyName, state);
    if (stringMethod !== undefined) return stringMethod;
  }
  if (isUnknownType(receiverType) || isUnresolvedType(receiverType)) {
    return anyType;
  }
  const propertySymbol = getPropertySymbolOfType(receiverType, propertyName);
  if (propertySymbol !== undefined) {
    const propertyType = getTypeOfSymbol(propertySymbol) ?? anyType;
    // An optional property's access type includes `undefined`.
    return isOptionalSymbol(propertySymbol) ? getUnionType([propertyType, undefinedType], state) : propertyType;
  }
  if (!isAnyType(receiverType) && !isFunctionType(receiverType)) {
    state.diagnostics.push({
      message: `Property '${propertyName}' does not exist on type '${displayType(receiverType)}'.`,
    });
    return anyType;
  }
  return anyType;
}

// Wire the initializer inferrer used by getTypeOfVariableOrParameterOrProperty
// (in checker.checkedtype.ts) to infer an un-annotated declaration's type from
// its initializer. Registered at module load; the runtime call cycle
// (checkedtype → inferExpression → checkedtype) is ESM-safe.
setInitializerInferrer(inferExpression);

const stringMethodReturnTypes = new Map<string, Type>([
  ["endsWith", booleanType],
  ["includes", booleanType],
  ["match", anyType],
  ["matchAll", anyType],
  ["replace", stringType],
  ["slice", stringType],
  ["split", anyType],
  ["startsWith", booleanType],
  ["toLowerCase", stringType],
]);

function functionParametersFromNode(parameters: readonly ParameterDeclaration[], state: CheckState): FunctionParameter[] {
  return parameters
    .filter((parameter) => isIdentifier(parameter.name))
    .map((parameter) => ({
      name: (parameter.name as { readonly text: string }).text,
      type: parameter.type === undefined ? anyType : typeFromTypeNode(parameter.type, state),
      optional: parameter.questionToken !== undefined || parameter.initializer !== undefined,
      rest: parameter.dotDotDotToken !== undefined,
    }));
}

function propertyNameText(name: PropertyName, state: CheckState): string | undefined {
  if (isIdentifier(name) || isPrivateIdentifier(name)) return name.text;
  if (isStringLiteral(name) || isNoSubstitutionTemplateLiteral(name) || isNumericLiteral(name) || isBigIntLiteral(name)) return name.text;
  if (isComputedPropertyName(name)) {
    const literalName = literalTypeFromLiteralExpression(name.expression, state);
    if (literalName !== undefined && isTypeUsableAsPropertyName(literalName)) return getPropertyNameFromType(literalName);
    state.diagnostics.push({ message: "Computed property names in object literals must resolve to a string or number literal for checker object construction." });
    return undefined;
  }
  state.diagnostics.push({ message: `Property name kind '${kindDebugName((name as { readonly kind: Kind }).kind)}' is not yet supported by the checker.` });
  return undefined;
}

function objectPropertiesOfType(type: Type, state: CheckState): readonly ObjectProperty[] {
  const members = (type.symbol as unknown as { members?: Map<string, unknown> } | undefined)?.members;
  if (members === undefined) {
    if (isUnknownType(type) || isUnresolvedType(type) || isAnyType(type)) return [];
    state.diagnostics.push({ message: `Object spread of type '${displayType(type)}' is not yet supported by the checker.` });
    return [];
  }
  const properties: ObjectProperty[] = [];
  for (const [name, symbol] of members) {
    const propertyType = getTypeOfSymbol(symbol as never);
    if (propertyType === undefined) continue;
    properties.push({ name, type: propertyType, optional: isOptionalSymbol(symbol as never) });
  }
  return properties;
}

function inferStringMethod(propertyName: string, state: CheckState): Type | undefined {
  switch (propertyName) {
    case "charAt":
      return makeFunctionType(stringType, state, [{ name: "index", type: numberType, optional: true }]);
    case "charCodeAt":
    case "codePointAt":
      return makeFunctionType(numberType, state, [{ name: "index", type: numberType, optional: true }]);
    case "concat":
      return makeFunctionType(stringType, state, [{ name: "strings", type: makeArrayType(stringType, state), rest: true }]);
    case "endsWith":
    case "includes":
    case "startsWith":
      return makeFunctionType(booleanType, state, [
        { name: "searchString", type: stringType },
        { name: "position", type: numberType, optional: true },
      ]);
    case "indexOf":
    case "lastIndexOf":
      return makeFunctionType(numberType, state, [
        { name: "searchString", type: stringType },
        { name: "position", type: numberType, optional: true },
      ]);
    case "match":
    case "matchAll":
      return makeFunctionType(anyType, state, placeholderRestParameters);
    case "replace":
    case "replaceAll":
      return makeFunctionType(stringType, state, [
        { name: "searchValue", type: anyType },
        { name: "replaceValue", type: anyType },
      ]);
    case "slice":
    case "substring":
    case "substr":
      return makeFunctionType(stringType, state, [
        { name: "start", type: numberType, optional: true },
        { name: "end", type: numberType, optional: true },
      ]);
    case "split":
      return makeFunctionType(makeArrayType(stringType, state), state, [
        { name: "separator", type: stringType, optional: true },
        { name: "limit", type: numberType, optional: true },
      ]);
    case "toLowerCase":
    case "toLocaleLowerCase":
    case "toUpperCase":
    case "toLocaleUpperCase":
    case "trim":
    case "trimStart":
    case "trimEnd":
    case "normalize":
      return makeFunctionType(stringType, state, []);
  }
  const returnType = stringMethodReturnTypes.get(propertyName);
  return returnType === undefined ? undefined : makeFunctionType(returnType, state, placeholderRestParameters);
}

function inferArrayMethod(propertyName: string, elementType: Type, state: CheckState): Type | undefined {
  switch (propertyName) {
    case "at":
    case "pop":
    case "shift":
      return makeFunctionType(getUnionType([elementType, undefinedType], state), state, [{ name: "index", type: numberType, optional: true }]);
    case "concat":
      return makeFunctionType(makeArrayType(elementType, state), state, [{ name: "items", type: makeArrayType(elementType, state), rest: true }]);
    case "includes":
      return makeFunctionType(booleanType, state, [
        { name: "searchElement", type: elementType },
        { name: "fromIndex", type: numberType, optional: true },
      ]);
    case "indexOf":
    case "lastIndexOf":
      return makeFunctionType(numberType, state, [
        { name: "searchElement", type: elementType },
        { name: "fromIndex", type: numberType, optional: true },
      ]);
    case "join":
      return makeFunctionType(stringType, state, [{ name: "separator", type: stringType, optional: true }]);
    case "push":
    case "unshift":
      return makeFunctionType(numberType, state, [{ name: "items", type: makeArrayType(elementType, state), rest: true }]);
    case "reverse":
    case "slice":
    case "toReversed":
    case "toSorted":
      return makeFunctionType(makeArrayType(elementType, state), state, placeholderRestParameters);
  }
  return undefined;
}

function inferGlobalStaticProperty(receiverName: string, propertyName: string, state: CheckState): Type | undefined {
  if (receiverName === "Object" && propertyName === "is") {
    return makeFunctionType(booleanType, state, [
      { name: "value1", type: anyType },
      { name: "value2", type: anyType },
    ]);
  }
  if (receiverName === "String" && propertyName === "fromCharCode") {
    return makeFunctionType(stringType, state, [{ name: "codes", type: makeArrayType(numberType, state), rest: true }]);
  }
  if (receiverName === "Number" && (propertyName === "isFinite" || propertyName === "isNaN" || propertyName === "isInteger")) {
    return makeFunctionType(booleanType, state, [{ name: "value", type: anyType }]);
  }
  return undefined;
}

function containingThisContainer(node: AstNode, includeArrowFunctions: boolean): AstNode | undefined {
  return findAncestorNode(node, candidate =>
    candidate.kind === Kind.SourceFile
    || candidate.kind === Kind.ModuleDeclaration
    || candidate.kind === Kind.ClassDeclaration
    || candidate.kind === Kind.ClassExpression
    || candidate.kind === Kind.Constructor
    || candidate.kind === Kind.FunctionDeclaration
    || candidate.kind === Kind.FunctionExpression
    || candidate.kind === Kind.MethodDeclaration
    || candidate.kind === Kind.GetAccessor
    || candidate.kind === Kind.SetAccessor
    || (includeArrowFunctions && candidate.kind === Kind.ArrowFunction));
}

function containingClassNode(node: AstNode | undefined): AstNode | undefined {
  return findAncestorNode(node, candidate => candidate.kind === Kind.ClassDeclaration || candidate.kind === Kind.ClassExpression);
}

function isFunctionLikeNode(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.Constructor;
}

function firstThisParameter(node: AstNode): ParameterDeclaration | undefined {
  return ((node as { readonly parameters?: readonly ParameterDeclaration[] }).parameters ?? [])
    .find(parameter => isIdentifier(parameter.name) && parameter.name.text === "this");
}

function getThisParameterFromNodeContext(node: AstNode): ParameterDeclaration | undefined {
  const container = containingThisContainer(node, false);
  return container === undefined || !isFunctionLikeNode(container) ? undefined : firstThisParameter(container);
}

function findAncestorNode(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  for (let current = node === undefined ? undefined : astParentOf(node); current !== undefined; current = astParentOf(current)) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function findDescendantNode(node: AstNode, predicate: (node: AstNode) => boolean): AstNode | undefined {
  if (predicate(node)) return node;
  for (const child of childNodesOf(node)) {
    const found = findDescendantNode(child, predicate);
    if (found !== undefined) return found;
  }
  return undefined;
}

function containsNode(root: AstNode | undefined, target: AstNode): boolean {
  return root !== undefined && (root === target || childNodesOf(root).some(child => containsNode(child, target)));
}

function childNodesOf(node: AstNode): readonly AstNode[] {
  const result: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isAstNode(value)) result.push(value);
    else if (Array.isArray(value)) result.push(...value.filter(isAstNode));
    else if (isNodeArrayLike(value)) result.push(...value.nodes.filter(isAstNode));
  }
  return result;
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isNodeArrayLike(value: unknown): value is { readonly nodes: readonly unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes);
}

function astParentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function hasDecorator(node: AstNode): boolean {
  return ((node as { readonly modifiers?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).modifiers as readonly AstNode[] | undefined)?.some(modifier => modifier.kind === Kind.Decorator) === true
    || (((node as { readonly modifiers?: { readonly nodes?: readonly AstNode[] } }).modifiers)?.nodes?.some(modifier => modifier.kind === Kind.Decorator) ?? false);
}

function heritageExpressions(node: AstNode | undefined): readonly AstNode[] {
  return ((node as { readonly heritageClauses?: readonly { readonly token?: Kind; readonly types?: readonly { readonly expression?: AstNode }[] }[] } | undefined)?.heritageClauses ?? [])
    .filter(clause => clause.token === Kind.ExtendsKeyword)
    .flatMap(clause => clause.types ?? [])
    .map(type => type.expression)
    .filter((expression): expression is AstNode => expression !== undefined);
}

function classDeclarationExtendsNonNull(classDeclaration: AstNode | undefined): boolean {
  const expressions = heritageExpressions(classDeclaration);
  return expressions.length > 0 && !expressions.some(expression => nodeText(expression) === "null");
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string; readonly escapedText?: string } | undefined)?.text
    ?? (node as { readonly text?: string; readonly escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function getPropertyTypeForAssignmentTarget(sourceType: Type, propertyName: PropertyName, state: CheckState): Type {
  const name = propertyNameText(propertyName, state);
  return name === undefined ? anyType : getPropertyTypeOfType(sourceType, name) ?? anyType;
}

function isDeprecatedDeclaration(node: AstNode): boolean {
  const tags = (node as { readonly jsDoc?: readonly { readonly tags?: readonly unknown[] }[]; readonly jsDocTags?: readonly unknown[] }).jsDocTags
    ?? (node as { readonly jsDoc?: readonly { readonly tags?: readonly unknown[] }[] }).jsDoc?.flatMap(doc => doc.tags ?? [])
    ?? [];
  return tags.some(tag => {
    const tagName = (tag as { readonly tagName?: { readonly text?: string }; readonly name?: string }).tagName?.text
      ?? (tag as { readonly tagName?: string; readonly name?: string }).tagName
      ?? (tag as { readonly name?: string }).name
      ?? "";
    return tagName === "deprecated";
  }) || ((node as { readonly deprecated?: boolean }).deprecated === true);
}

function getDeprecatedSuggestionNode(node: AstNode): AstNode {
  return invokedExpression(node) ?? node;
}

function invokedExpression(node: AstNode): AstNode | undefined {
  if (isCallExpression(node) || isNewExpression(node)) {
    return node.expression;
  }
  if (isTaggedTemplateExpression(node)) return node.tag;
  return (node as { readonly expression?: AstNode }).expression;
}

function tryGetPropertyAccessOrIdentifierToString(node: AstNode | undefined): string {
  if (node === undefined) return "";
  if (isIdentifier(node) || isPrivateIdentifier(node)) return node.text;
  if (isPropertyAccessExpression(node)) {
    const left = tryGetPropertyAccessOrIdentifierToString(node.expression);
    return left.length === 0 ? node.name.text : `${left}.${node.name.text}`;
  }
  return "";
}

function signatureToString(signature: Signature): string {
  const parameters = signature.parameters.map(parameter => {
    const type = getTypeOfSymbol(parameter);
    return `${parameter.name ?? "arg"}${type === undefined ? "" : `: ${displayType(type)}`}`;
  });
  const returnType = signature.resolvedReturnType === undefined ? "any" : displayType(signature.resolvedReturnType);
  return `(${parameters.join(", ")}) => ${returnType}`;
}

function parentOf(node: Expression | undefined): Expression | undefined {
  return (node as { readonly parent?: Expression } | undefined)?.parent;
}

function skipOuterExpressions<T extends Expression>(node: T): T {
  let current: Expression = node;
  while (isParenthesizedExpression(current) || isNonNullExpression(current) || isAsExpression(current) || isSatisfiesExpression(current)) {
    const inner = (current as { readonly expression?: Expression }).expression;
    if (inner === undefined) break;
    current = inner;
  }
  return current as T;
}

function anyTypeFromState(state: CheckState): Type {
  void state;
  return anyType;
}

function expressionNode(node: AstNode): Expression {
  return node as Expression;
}

function expressionOf(node: AstNode | undefined): Expression | undefined {
  return node === undefined ? undefined : expressionNode(node);
}

function identifierText(node: AstNode | undefined): string | undefined {
  if (node === undefined) return undefined;
  return isIdentifier(node) || isPrivateIdentifier(node) ? node.text : undefined;
}

function specificityScore(signature: Signature): number {
  const required = signature.minArgumentCount;
  const arity = signature.parameters.length;
  const typed = signature.parameters.filter(parameter => getTypeOfSymbol(parameter) !== undefined).length;
  return required * 4 + arity * 2 + typed;
}

function hasModifierKind(node: AstNode, kind: Kind): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).modifiers;
  const nodes: readonly AstNode[] = Array.isArray(modifiers) ? modifiers : (modifiers as { readonly nodes?: readonly AstNode[] } | undefined)?.nodes ?? [];
  return nodes.some(modifier => modifier.kind === kind);
}

function levenshteinDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let lastDiagonal = previous[0]!;
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const insertion = previous[rightIndex]! + 1;
      const deletion = previous[rightIndex - 1]! + 1;
      const substitution = lastDiagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);
      lastDiagonal = previous[rightIndex]!;
      previous[rightIndex] = Math.min(insertion, deletion, substitution);
    }
  }
  return previous[right.length]!;
}

function awaitedTypeOf(type: Type): Type {
  if (isAnyType(type) || isUnknownType(type) || isUnresolvedType(type)) return type;
  const then = getPropertyTypeOfType(getApparentType(type), "then");
  if (then === undefined) return type;
  return anyType;
}

export function isComparisonOperator(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken
    || kind === Kind.LessThanToken
    || kind === Kind.LessThanEqualsToken
    || kind === Kind.GreaterThanToken
    || kind === Kind.GreaterThanEqualsToken
    || kind === Kind.InstanceOfKeyword
    || kind === Kind.InKeyword;
}

export function isAssignmentOperator(kind: Kind): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.AsteriskAsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.CaretEqualsToken
    || kind === Kind.LessThanLessThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanEqualsToken
    || kind === Kind.AmpersandAmpersandEqualsToken
    || kind === Kind.BarBarEqualsToken
    || kind === Kind.QuestionQuestionEqualsToken;
}
