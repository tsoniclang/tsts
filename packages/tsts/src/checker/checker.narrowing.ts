import {
  Kind,
  isBinaryExpression,
  isIdentifier,
  isNumericLiteral,
  isParenthesizedExpression,
  isPrefixUnaryExpression,
  isStringLiteral,
  isTypeOfExpression,
  type Expression,
  type Node as AstNode,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { parseValidBigInt } from "../jsnum/index.js";
import {
  type CheckState,
  type Type,
  getBigIntLiteralType,
  getNumberLiteralType,
  getResolvedSymbol,
  getStringLiteralType,
  getUnionTypeEx,
  neverType,
  nullType,
  regularFalseType,
  regularTrueType,
  removeDefinitelyFalsyTypes,
  undefinedType,
  unionConstituents,
  UnionReduction,
} from "./checker.checkedtype.js";
import { TypeFlags, type LiteralType, getTypeOfSymbol } from "./types.js";

export type NarrowingMap = ReadonlyMap<AstSymbol, Type>;

export function narrowingsForCondition(condition: Expression, state: CheckState, assumeTrue: boolean): NarrowingMap {
  const narrowed = new Map<AstSymbol, Type>();
  collectConditionNarrowings(condition, state, assumeTrue, narrowed);
  return narrowed;
}

export function narrowingsForSwitchCase(discriminant: Expression, clauseExpression: Expression, state: CheckState): NarrowingMap {
  const narrowed = new Map<AstSymbol, Type>();
  collectEqualityNarrowing(discriminant, Kind.EqualsEqualsEqualsToken, clauseExpression, state, true, narrowed);
  return narrowed;
}

export function narrowingsForSwitchDefault(
  discriminant: Expression,
  clauseExpressions: readonly Expression[],
  state: CheckState,
): NarrowingMap {
  const symbol = symbolOfReference(discriminant);
  if (symbol === undefined) return new Map();
  let current = getTypeOfSymbol(symbol);
  if (current === undefined) return new Map();
  for (const expression of clauseExpressions) {
    const valueType = typeOfLiteralExpression(expression, state);
    if (valueType !== undefined) current = removeComparableType(current, valueType, state);
  }
  return new Map([[symbol, current]]);
}

export function mergeAlternativeNarrowings(left: NarrowingMap, right: NarrowingMap, state: CheckState): NarrowingMap {
  if (left.size === 0) return right;
  if (right.size === 0) return left;
  const merged = new Map<AstSymbol, Type>();
  for (const [symbol, leftType] of left) {
    const rightType = right.get(symbol);
    if (rightType !== undefined) {
      merged.set(symbol, getUnionTypeEx([leftType, rightType], UnionReduction.Subtype, state));
    }
  }
  return merged;
}

function collectConditionNarrowings(
  condition: Expression,
  state: CheckState,
  assumeTrue: boolean,
  narrowed: Map<AstSymbol, Type>,
): void {
  const expression = skipParentheses(condition);
  if (isPrefixUnaryExpression(expression) && expression.operator === Kind.ExclamationToken) {
    collectConditionNarrowings(expression.operand, state, !assumeTrue, narrowed);
    return;
  }
  if (isBinaryExpression(expression)) {
    const operator = expression.operatorToken.kind;
    if (operator === Kind.AmpersandAmpersandToken) {
      if (assumeTrue) {
        collectConditionNarrowings(expression.left, state, true, narrowed);
        collectConditionNarrowings(expression.right, state, true, narrowed);
      }
      return;
    }
    if (operator === Kind.BarBarToken) {
      if (!assumeTrue) {
        collectConditionNarrowings(expression.left, state, false, narrowed);
        collectConditionNarrowings(expression.right, state, false, narrowed);
      }
      return;
    }
    if (isEqualityOperator(operator)) {
      collectEqualityNarrowing(expression.left, operator, expression.right, state, assumeTrue, narrowed);
      collectEqualityNarrowing(expression.right, operator, expression.left, state, assumeTrue, narrowed);
      return;
    }
  }
  const symbol = symbolOfReference(expression);
  if (symbol === undefined) return;
  const current = getTypeOfSymbol(symbol);
  if (current === undefined) return;
  narrowed.set(symbol, assumeTrue ? removeDefinitelyFalsyTypes(current, state) : keepDefinitelyFalsyTypes(current, state));
}

function collectEqualityNarrowing(
  left: Expression,
  operator: Kind,
  right: Expression,
  state: CheckState,
  assumeTrue: boolean,
  narrowed: Map<AstSymbol, Type>,
): void {
  const positiveOperator = operator === Kind.EqualsEqualsToken || operator === Kind.EqualsEqualsEqualsToken;
  const keepMatching = assumeTrue === positiveOperator;
  if (isTypeOfExpression(left) && isStringLiteral(right)) {
    const symbol = symbolOfReference(left.expression);
    if (symbol === undefined) return;
    const current = getTypeOfSymbol(symbol);
    if (current === undefined) return;
    narrowed.set(symbol, narrowByTypeof(current, right.text, keepMatching, state));
    return;
  }
  const symbol = symbolOfReference(left);
  if (symbol === undefined) return;
  const current = getTypeOfSymbol(symbol);
  if (current === undefined) return;
  const valueType = typeOfLiteralExpression(right, state);
  if (valueType === undefined) return;
  narrowed.set(symbol, keepMatching ? keepComparableType(current, valueType, state) : removeComparableType(current, valueType, state));
}

function skipParentheses(expression: Expression): Expression {
  let current = expression;
  while (isParenthesizedExpression(current)) current = current.expression;
  return current;
}

function symbolOfReference(node: AstNode): AstSymbol | undefined {
  return isIdentifier(node) ? getResolvedSymbol(node.text, node) : undefined;
}

function isEqualityOperator(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

function typeOfLiteralExpression(expression: Expression, state: CheckState): Type | undefined {
  if (isStringLiteral(expression)) return getStringLiteralType(expression.text, state);
  if (isNumericLiteral(expression)) return getNumberLiteralType(Number(expression.text), state);
  if (expression.kind === Kind.TrueKeyword) return regularTrueType;
  if (expression.kind === Kind.FalseKeyword) return regularFalseType;
  if (expression.kind === Kind.NullKeyword) return nullType;
  if (expression.kind === Kind.UndefinedKeyword) return undefinedType;
  if (isIdentifier(expression) && expression.text === "undefined") return undefinedType;
  if (expression.kind === Kind.BigIntLiteral) return getBigIntLiteralType(parseValidBigInt((expression as unknown as { readonly text: string }).text), state);
  return undefined;
}

function keepComparableType(source: Type, target: Type, state: CheckState): Type {
  return filterType(source, (candidate) => typesComparableForEquality(candidate, target), state);
}

function removeComparableType(source: Type, target: Type, state: CheckState): Type {
  return filterType(source, (candidate) => !typesComparableForEquality(candidate, target), state);
}

function typesComparableForEquality(source: Type, target: Type): boolean {
  if (sameLiteralValue(source, target)) return true;
  if ((target.flags & TypeFlags.StringLiteral) !== 0) return (source.flags & TypeFlags.StringLiteral) === 0 && (source.flags & TypeFlags.StringLike) !== 0;
  if ((target.flags & TypeFlags.NumberLiteral) !== 0) return (source.flags & TypeFlags.NumberLiteral) === 0 && (source.flags & TypeFlags.NumberLike) !== 0;
  if ((target.flags & TypeFlags.BigIntLiteral) !== 0) return (source.flags & TypeFlags.BigIntLiteral) === 0 && (source.flags & TypeFlags.BigIntLike) !== 0;
  if ((target.flags & TypeFlags.BooleanLiteral) !== 0) return (source.flags & TypeFlags.BooleanLiteral) === 0 && (source.flags & TypeFlags.BooleanLike) !== 0;
  if ((target.flags & TypeFlags.Null) !== 0) return (source.flags & TypeFlags.Null) !== 0;
  if ((target.flags & TypeFlags.Undefined) !== 0) return (source.flags & (TypeFlags.Undefined | TypeFlags.Void)) !== 0;
  return source === target;
}

function sameLiteralValue(source: Type, target: Type): boolean {
  const literalFlags = TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BigIntLiteral | TypeFlags.BooleanLiteral;
  return (source.flags & target.flags & literalFlags) !== 0
    && (source.data as LiteralType | undefined)?.value === (target.data as LiteralType | undefined)?.value;
}

function narrowByTypeof(source: Type, typeName: string, keepMatching: boolean, state: CheckState): Type {
  return filterType(source, (candidate) => {
    const matches = typeofNameOfType(candidate) === typeName;
    return keepMatching ? matches : !matches;
  }, state);
}

function typeofNameOfType(type: Type): string | undefined {
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return "bigint";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return "symbol";
  if ((type.flags & TypeFlags.Undefined) !== 0) return "undefined";
  if ((type.flags & TypeFlags.Null) !== 0) return "object";
  if ((type.flags & TypeFlags.Object) !== 0) return "object";
  return undefined;
}

function keepDefinitelyFalsyTypes(type: Type, state: CheckState): Type {
  return filterType(type, isDefinitelyFalsyType, state);
}

function isDefinitelyFalsyType(type: Type): boolean {
  if ((type.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) !== 0) return true;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return (type.data as LiteralType).value === false;
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return (type.data as LiteralType).value === "";
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return (type.data as LiteralType).value === 0;
  return false;
}

function filterType(type: Type, predicate: (candidate: Type) => boolean, state: CheckState): Type {
  const members = unionConstituents(type);
  if (members === undefined) return predicate(type) ? type : neverType;
  return getUnionTypeEx(members.filter(predicate), UnionReduction.Subtype, state);
}
