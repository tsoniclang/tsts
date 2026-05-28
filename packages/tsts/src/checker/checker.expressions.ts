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
  makeObjectType,
  getPropertySymbolOfType,
  getTypeOfSymbol,
  isOptionalSymbol,
  getCallSignature,
  type ObjectProperty,
  getWidenedType,
  checkAssignable,
  displayType,
  setBindingNameType,
  typeFromTypeNode,
} from "./checker.checkedtype.js";
import { checkBlock } from "./checker.statements.js";

export function inferExpression(expression: Expression, state: CheckState, environment: TypeEnvironment): Type {
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
    const exprType = inferExpression(expression.expression, state, environment);
    checkAssignable(exprType, typeFromTypeNode(expression.type, state), state);
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
      // Object-literal property types widen (TS-Go: a fresh object literal
      // without a contextual type widens its primitive-literal properties), so
      // `{ port: 8080 }` has property `port: number`, not `8080`.
      if (isPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.push({ name: property.name.text, type: getWidenedType(inferExpression(property.initializer, state, environment), state) });
      } else if (isShorthandPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.push({ name: property.name.text, type: getWidenedType(inferExpression(property.name, state, environment), state) });
      } else {
        state.diagnostics.push({ message: `Object member kind '${Kind[property.kind]}' is not yet supported by the checker.` });
      }
    }
    return makeObjectType(properties, state);
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.name.text, state, environment);
  }
  if (isElementAccessExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    inferExpression(expression.argumentExpression, state, environment);
    return unresolvedType;
  }
  if (isCallExpression(expression)) {
    const calleeType = inferExpression(expression.expression, state, environment);
    const argumentTypes = expression.arguments.map((argument) => inferExpression(argument, state, environment));
    // Check each argument against the call signature's parameter type
    // (positionally; rest/overload resolution is not modeled yet).
    const signature = getCallSignature(calleeType);
    if (signature !== undefined) {
      signature.parameters.forEach((parameter, index) => {
        const parameterType = getTypeOfSymbol(parameter);
        const argumentType = argumentTypes[index];
        if (parameterType !== undefined && argumentType !== undefined) {
          checkAssignable(getWidenedLiteralLikeTypeForContextualType(argumentType, parameterType, state), parameterType, state);
        }
      });
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
  return makeFunctionType(declaredReturnType ?? inferredReturnType, state);
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

export function inferPropertyAccess(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment): Type {
  const receiverType = getApparentType(inferExpression(expression, state, environment));
  if (isNumberType(receiverType) && propertyName === "toFixed") {
    return makeFunctionType(stringType, state);
  }
  if (isStringType(receiverType) && propertyName === "length") {
    return numberType;
  }
  if (isStringType(receiverType) && stringMethodReturnTypes.has(propertyName)) {
    return makeFunctionType(stringMethodReturnTypes.get(propertyName)!, state);
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
