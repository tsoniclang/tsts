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
  type ParameterDeclaration,
  type PropertyName,
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
import type { Signature } from "./types.js";

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
