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
  isArrayLiteralExpression,
  isArrowFunction,
  isAsExpression,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isConditionalExpression,
  isElementAccessExpression,
  isIdentifier,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isSatisfiesExpression,
  isShorthandPropertyAssignment,
  isSpreadElement,
  type ArrowFunction,
  type ConciseBody,
  type Expression,
} from "../ast/index.js";
import {
  type Type,
  type CheckState,
  type TypeEnvironment,
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
  getArrayElementType,
  getIndexInfos,
  makeArrayType,
  neverType,
  type ObjectProperty,
  getWidenedType,
  checkAssignable,
  displayType,
  setBindingNameType,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { checkBlock } from "./checker.statements.js";

// Infer an object-literal property value, contextually typed by the matching
// target property when present (preserving primitive literals the target asks
// for), otherwise widening it.
function contextualPropertyType(valueExpression: Expression, name: string, contextualType: Type | undefined, state: CheckState, environment: TypeEnvironment): Type {
  const contextualProperty = contextualType === undefined ? undefined : getPropertyTypeOfType(contextualType, name);
  const valueType = inferExpression(valueExpression, state, environment, contextualProperty);
  return contextualProperty === undefined
    ? getWidenedType(valueType, state)
    : getWidenedLiteralLikeTypeForContextualType(valueType, contextualProperty, state);
}

export function inferExpression(expression: Expression, state: CheckState, environment: TypeEnvironment, contextualType?: Type): Type {
  // String / number / bigint / true / false / null literals — shared with
  // literal type-node resolution via literalTypeFromLiteralExpression (so the
  // two paths can't drift). Keyword literals (`true`/`false`/`null`) are matched
  // by Kind inside the helper, mirroring TS-Go's keyword-kind switch.
  const literalType = literalTypeFromLiteralExpression(expression, state);
  if (literalType !== undefined) {
    return literalType;
  }
  if (isIdentifier(expression)) {
    const bound = environment.get(expression.text);
    if (bound !== undefined) {
      return bound;
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
    return inferExpression(expression.expression, state, environment);
  }
  if (isPrefixUnaryExpression(expression)) {
    inferExpression(expression.operand, state, environment);
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
    inferExpression(expression.operand, state, environment);
    return numberType;
  }
  if (isSpreadElement(expression)) {
    return inferExpression(expression.expression, state, environment);
  }
  if (isAsExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    return typeFromTypeNode(expression.type, state);
  }
  if (isSatisfiesExpression(expression)) {
    // `expr satisfies T`: check that the expression's type is assignable to T,
    // but the RESULT type is the expression's own type — not narrowed/widened
    // to T (mirrors TS-Go checkSatisfiesExpression: assignability is verified,
    // the expression type flows through unchanged).
    const targetType = typeFromTypeNode(expression.type, state);
    const exprType = inferExpression(expression.expression, state, environment, targetType);
    checkAssignable(exprType, targetType, state);
    return exprType;
  }
  if (isConditionalExpression(expression)) {
    inferExpression(expression.condition, state, environment);
    const whenTrue = inferExpression(expression.whenTrue, state, environment);
    const whenFalse = inferExpression(expression.whenFalse, state, environment);
    if (isAnyType(whenTrue) || isAnyType(whenFalse)) {
      return anyType;
    }
    if (isUnresolvedType(whenTrue) || isUnresolvedType(whenFalse)) {
      return unresolvedType;
    }
    return getUnionTypeEx([whenTrue, whenFalse], UnionReduction.Subtype, state);
  }
  if (isArrowFunction(expression)) {
    return inferArrowFunction(expression, state, environment);
  }
  if (isBinaryExpression(expression)) {
    const left = inferExpression(expression.left, state, environment);
    const right = inferExpression(expression.right, state, environment);
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
    // Anonymous object type from property + shorthand assignments. Spread /
    // computed / non-identifier members aren't modeled yet — surfaced
    // explicitly rather than silently dropped (which would falsify the type).
    const properties: ObjectProperty[] = [];
    for (const property of expression.properties) {
      // Each property is contextually typed by the target property type when a
      // contextual object type is present (so `{ port: 8080 }` against
      // `{ port: 8080 }` preserves the literal); otherwise its primitive-literal
      // type widens (`{ port: 8080 }` alone has property `port: number`).
      if (isPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.push({ name: property.name.text, type: contextualPropertyType(property.initializer, property.name.text, contextualType, state, environment) });
      } else if (isShorthandPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.push({ name: property.name.text, type: contextualPropertyType(property.name, property.name.text, contextualType, state, environment) });
      } else {
        state.diagnostics.push({ message: `Object member kind '${Kind[property.kind]}' is not yet supported by the checker.` });
      }
    }
    // Mark the direct object literal fresh so the relation can excess-check it.
    return makeObjectType(properties, state, true);
  }
  if (isArrayLiteralExpression(expression)) {
    // Element type = union of the (contextually typed, else widened) element
    // types. A spread of an array contributes its element type; a non-array
    // spread is surfaced explicitly rather than silently dropped. `[]` -> the
    // contextual element type, else `never`.
    const contextualElement = contextualType === undefined ? undefined : getArrayElementType(contextualType);
    const elementTypes = expression.elements.flatMap((element) => {
      if (isSpreadElement(element)) {
        const spreadType = inferExpression(element.expression, state, environment, contextualType);
        const spreadElement = getArrayElementType(spreadType);
        if (spreadElement !== undefined) {
          return [spreadElement];
        }
        state.diagnostics.push({ message: "Array spread of a non-array value is not yet supported by the checker." });
        return [];
      }
      const valueType = inferExpression(element, state, environment, contextualElement);
      return [contextualElement === undefined ? getWidenedType(valueType, state) : getWidenedLiteralLikeTypeForContextualType(valueType, contextualElement, state)];
    });
    const elementType = elementTypes.length === 0 ? (contextualElement ?? neverType) : getUnionType(elementTypes, state);
    return makeArrayType(elementType, state);
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.name.text, state, environment);
  }
  if (isElementAccessExpression(expression)) {
    const receiverType = inferExpression(expression.expression, state, environment);
    const indexType = inferExpression(expression.argumentExpression, state, environment);
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
    const calleeType = inferExpression(expression.expression, state, environment);
    // Check each argument against the call signature's parameter type
    // (positionally; rest/overload resolution is not modeled yet).
    const signature = getCallSignature(calleeType);
    const parameters = signature?.parameters ?? [];
    const hasRest = parameters.length > 0 && isRestSymbol(parameters[parameters.length - 1]);
    const restIndexForContext = hasRest ? parameters.length - 1 : -1;
    // Arguments are contextually typed by their parameter type (so object/array
    // literal arguments preserve target-driven literals + get excess-checked).
    const contextualParameterType = (index: number): Type | undefined => {
      if (restIndexForContext >= 0 && index >= restIndexForContext) {
        const restType = getTypeOfSymbol(parameters[restIndexForContext]!);
        return restType === undefined ? undefined : getArrayElementType(restType);
      }
      const parameter = parameters[index];
      return parameter === undefined ? undefined : getTypeOfSymbol(parameter);
    };
    const argumentTypes = expression.arguments.map((argument, index) => inferExpression(argument, state, environment, contextualParameterType(index)));
    if (signature !== undefined) {
      const maxArguments = hasRest ? Number.POSITIVE_INFINITY : parameters.length;
      if (argumentTypes.length < signature.minArgumentCount || argumentTypes.length > maxArguments) {
        const expected = hasRest
          ? `at least ${signature.minArgumentCount}`
          : signature.minArgumentCount === parameters.length
            ? `${signature.minArgumentCount}`
            : `${signature.minArgumentCount}-${parameters.length}`;
        state.diagnostics.push({ message: `Expected ${expected} arguments, but got ${argumentTypes.length}.` });
      } else {
        const restIndex = hasRest ? parameters.length - 1 : -1;
        parameters.forEach((parameter, index) => {
          const parameterType = getTypeOfSymbol(parameter);
          if (parameterType === undefined) return;
          if (index === restIndex) {
            // Each rest argument is checked against the array element type.
            const elementType = getArrayElementType(parameterType);
            if (elementType !== undefined) {
              argumentTypes.slice(index).forEach((argumentType) => {
                checkAssignable(getWidenedLiteralLikeTypeForContextualType(argumentType, elementType, state), elementType, state);
              });
            }
            return;
          }
          const argumentType = argumentTypes[index];
          if (argumentType === undefined) return;
          // An optional parameter also accepts an explicit `undefined` argument.
          const target = isOptionalSymbol(parameter) ? getUnionType([parameterType, undefinedType], state) : parameterType;
          checkAssignable(getWidenedLiteralLikeTypeForContextualType(argumentType, target, state), target, state);
        });
      }
    }
    if (isAnyType(calleeType) || isUnknownType(calleeType) || isUnresolvedType(calleeType)) {
      return anyType;
    }
    return isFunctionType(calleeType) ? getFunctionReturnType(calleeType) : unresolvedType;
  }
  return unresolvedType;
}

export function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState, environment: TypeEnvironment): Type {
  const arrowEnvironment = new Map(environment);
  for (const parameter of arrowFunction.parameters) {
    setBindingNameType(parameter.name, parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, state), arrowEnvironment);
  }
  const declaredReturnType = arrowFunction.type === undefined ? undefined : typeFromTypeNode(arrowFunction.type, state);
  const inferredReturnType = inferConciseBody(arrowFunction.body, state, arrowEnvironment, declaredReturnType);
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

export function inferConciseBody(body: ConciseBody, state: CheckState, environment: TypeEnvironment, expectedReturnType: Type | undefined): Type {
  if (isBlock(body)) {
    checkBlock(body, state, environment, expectedReturnType);
    return expectedReturnType ?? unresolvedType;
  }
  const bodyType = inferExpression(body, state, environment);
  if (expectedReturnType !== undefined) {
    checkAssignable(getWidenedLiteralLikeTypeForContextualType(bodyType, expectedReturnType, state), expectedReturnType, state);
  }
  return bodyType;
}

// Primitive built-in methods (toFixed, string methods) are placeholders whose
// real parameter lists aren't modeled yet, so they accept any arguments (a rest
// `any`) rather than enforcing arity. Real declared signatures still enforce it.
const placeholderRestParameters: readonly FunctionParameter[] = [{ name: "args", type: anyType, rest: true }];

export function inferPropertyAccess(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment): Type {
  const receiverType = getApparentType(inferExpression(expression, state, environment));
  if (isNumberType(receiverType) && propertyName === "toFixed") {
    return makeFunctionType(stringType, state, placeholderRestParameters);
  }
  if (isStringType(receiverType) && propertyName === "length") {
    return numberType;
  }
  if (getArrayElementType(receiverType) !== undefined && propertyName === "length") {
    return numberType;
  }
  if (isStringType(receiverType) && stringMethodReturnTypes.has(propertyName)) {
    return makeFunctionType(stringMethodReturnTypes.get(propertyName)!, state, placeholderRestParameters);
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
