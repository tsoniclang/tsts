/**
 * Expression-checking decision engine.
 *
 * TS-Go `checker.go` routes every expression through a single cached
 * expression worker, then delegates to object/array literal, call, access,
 * assertion, `satisfies`, unary/binary, yield/await, and contextual typing
 * branches. This file mirrors that dispatch in a split reusable module.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { TypeFlags, type Signature, type Type } from "./types.js";

export type ExpressionCheckMode = number;
export const ExpressionCheckMode = {
  Normal: 0 as ExpressionCheckMode,
  Contextual: 1 << 0,
  Inferential: 1 << 1,
  SkipContextSensitive: 1 << 2,
  SkipGenericFunctions: 1 << 3,
  TypeOnly: 1 << 6,
  ForceTuple: 1 << 7,
} as const;

export type ExpressionCheckFailure =
  | "none"
  | "not-expression"
  | "not-callable"
  | "property-missing"
  | "index-missing"
  | "invalid-operand"
  | "invalid-assignment"
  | "possibly-nullish"
  | "readonly"
  | "constraint";

export interface ExpressionCheckEnvironment {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly voidType: Type;
  readonly undefinedType: Type;
  readonly nullType: Type;
  readonly checkExpression: (node: AstNode, mode: ExpressionCheckMode) => Type;
  readonly getContextualType?: (node: AstNode) => Type | undefined;
  readonly getSymbolAtLocation?: (node: AstNode) => AstSymbol | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getIndexTypeOfType?: (type: Type, indexType: Type) => Type | undefined;
  readonly getCallSignatures?: (type: Type) => readonly Signature[];
  readonly resolveCall?: (node: AstNode, signatures: readonly Signature[], mode: ExpressionCheckMode) => Signature | undefined;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createArrayType?: (elementType: Type, readonlyArray: boolean) => Type;
  readonly createObjectLiteralType?: (properties: readonly ExpressionPropertyType[], readonlyObject: boolean) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface ExpressionCheckResult {
  readonly type: Type;
  readonly failure: ExpressionCheckFailure;
  readonly diagnostics: readonly string[];
}

export interface ExpressionPropertyType {
  readonly name: string;
  readonly type: Type;
  readonly symbol?: AstSymbol;
  readonly readonly: boolean;
  readonly optional: boolean;
}

export interface AssignmentCheckResult {
  readonly targetType: Type;
  readonly sourceType: Type;
  readonly assignable: boolean;
  readonly failure: ExpressionCheckFailure;
}

export function checkExpressionWithCache(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
  cache: Map<AstNode, Type>,
): Type {
  if ((mode & ExpressionCheckMode.Contextual) === 0) {
    const cached = cache.get(node);
    if (cached !== undefined) return cached;
  }
  const type = checkExpressionWorker(node, mode, environment);
  if ((mode & ExpressionCheckMode.Contextual) === 0) cache.set(node, type);
  return type;
}

export function checkExpressionWorker(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
      return checkIdentifierExpression(node, mode, environment);
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
      return checkThisOrSuperExpression(node, environment);
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return environment.stringType;
    case Kind.NumericLiteral:
      return environment.numberType;
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
      return environment.booleanType;
    case Kind.NullKeyword:
      return environment.nullType;
    case Kind.ArrayLiteralExpression:
      return checkArrayLiteralExpression(node, mode, environment);
    case Kind.ObjectLiteralExpression:
      return checkObjectLiteralExpression(node, mode, environment);
    case Kind.PropertyAccessExpression:
    case Kind.QualifiedName:
      return checkPropertyAccessExpression(node, mode, false, environment);
    case Kind.ElementAccessExpression:
      return checkElementAccessExpression(node, mode, environment);
    case Kind.CallExpression:
    case Kind.NewExpression:
      return checkCallLikeExpression(node, mode, environment);
    case Kind.ParenthesizedExpression:
    case Kind.ExpressionWithTypeArguments:
    case Kind.NonNullExpression:
      return checkExpressionChild(node, mode, environment);
    case Kind.AsExpression:
    case Kind.TypeAssertionExpression:
    case Kind.SatisfiesExpression:
      return checkAssertionLikeExpression(node, mode, environment);
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
      return checkUnaryExpression(node, mode, environment);
    case Kind.BinaryExpression:
      return checkBinaryExpression(node, mode, environment);
    case Kind.ConditionalExpression:
      return checkConditionalExpression(node, mode, environment);
    case Kind.AwaitExpression:
      return checkAwaitExpression(node, mode, environment);
    case Kind.YieldExpression:
      return checkYieldExpression(node, mode, environment);
    case Kind.TemplateExpression:
      return checkTemplateExpression(node, mode, environment);
    case Kind.SpreadElement:
      return checkExpressionChild(node, mode, environment);
    default:
      return environment.unknownType;
  }
}

export function checkIdentifierExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  void mode;
  const symbol = environment.getSymbolAtLocation?.(node);
  if (symbol === undefined) {
    environment.report?.(node, `Cannot find name '${nodeText(node)}'.`);
    return environment.unknownType;
  }
  const type = environment.getTypeOfSymbol?.(symbol);
  if (type === undefined) {
    environment.report?.(node, `Symbol '${symbolName(symbol)}' has no value type.`);
    return environment.unknownType;
  }
  return type;
}

export function checkThisOrSuperExpression(node: AstNode, environment: ExpressionCheckEnvironment): Type {
  const symbol = environment.getSymbolAtLocation?.(node);
  const type = symbol === undefined ? undefined : environment.getTypeOfSymbol?.(symbol);
  return type ?? environment.unknownType;
}

export function checkArrayLiteralExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const elements = nodeArray(node, "elements");
  const elementTypes = elements.map(element => environment.checkExpression(element, mode));
  const contextualType = environment.getContextualType?.(node);
  const contextualElement = contextualType === undefined ? undefined : elementTypeFromArrayLike(contextualType);
  const typedElements = contextualElement === undefined
    ? elementTypes
    : elementTypes.map(elementType => environment.isTypeAssignableTo?.(elementType, contextualElement) === false ? elementType : contextualElement);
  const elementType = combineExpressionTypes(typedElements, environment);
  return environment.createArrayType?.(elementType, isConstContext(node)) ?? elementType;
}

export function checkObjectLiteralExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const properties: ExpressionPropertyType[] = [];
  const contextualType = environment.getContextualType?.(node);
  for (const property of nodeArray(node, "properties")) {
    const checked = checkObjectLiteralElement(property, mode, contextualType, environment);
    if (checked !== undefined) properties.push(checked);
  }
  return environment.createObjectLiteralType?.(properties, isConstContext(node)) ?? environment.unknownType;
}

export function checkObjectLiteralElement(
  element: AstNode,
  mode: ExpressionCheckMode,
  contextualType: Type | undefined,
  environment: ExpressionCheckEnvironment,
): ExpressionPropertyType | undefined {
  const name = propertyName(element);
  if (name === undefined) return undefined;
  const contextualProperty = contextualType === undefined ? undefined : environment.getPropertyOfType?.(contextualType, name);
  const contextualPropertyType = contextualProperty === undefined ? undefined : environment.getTypeOfSymbol?.(contextualProperty);
  const expression = propertyInitializer(element);
  const rawType = expression === undefined ? environment.unknownType : environment.checkExpression(expression, mode);
  const type = contextualPropertyType !== undefined && environment.isTypeAssignableTo?.(rawType, contextualPropertyType) !== false
    ? contextualPropertyType
    : rawType;
  return {
    name,
    type,
    ...(contextualProperty === undefined ? {} : { symbol: contextualProperty }),
    readonly: isReadonlyContext(element),
    optional: isOptionalProperty(element),
  };
}

export function checkPropertyAccessExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  writeOnly: boolean,
  environment: ExpressionCheckEnvironment,
): Type {
  const left = expressionOf(node);
  if (left === undefined) return environment.unknownType;
  const leftType = environment.checkExpression(left, mode);
  const name = propertyName(node);
  if (name === undefined) return environment.unknownType;
  const property = environment.getPropertyOfType?.(leftType, name);
  if (property === undefined) {
    environment.report?.(node, `Property '${name}' does not exist on type.`);
    return environment.unknownType;
  }
  if (writeOnly && isReadonlySymbol(property)) {
    environment.report?.(node, `Cannot assign to '${name}' because it is a read-only property.`);
  }
  return environment.getTypeOfSymbol?.(property) ?? environment.unknownType;
}

export function checkElementAccessExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const left = expressionOf(node);
  const argument = argumentExpressionOf(node);
  if (left === undefined || argument === undefined) return environment.unknownType;
  const objectType = environment.checkExpression(left, mode);
  const indexType = environment.checkExpression(argument, mode);
  const propertyNameFromIndex = literalPropertyName(argument);
  if (propertyNameFromIndex !== undefined) {
    const property = environment.getPropertyOfType?.(objectType, propertyNameFromIndex);
    if (property !== undefined) return environment.getTypeOfSymbol?.(property) ?? environment.unknownType;
  }
  const indexed = environment.getIndexTypeOfType?.(objectType, indexType);
  if (indexed === undefined) {
    environment.report?.(node, "Element implicitly has an 'any' type because expression cannot be used to index target type.");
  }
  return indexed ?? environment.unknownType;
}

export function checkCallLikeExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const expression = expressionOf(node);
  if (expression === undefined) return environment.unknownType;
  const targetType = environment.checkExpression(expression, mode);
  const signatures = environment.getCallSignatures?.(targetType) ?? [];
  const signature = environment.resolveCall?.(node, signatures, mode) ?? signatures[0];
  if (signature === undefined) {
    environment.report?.(node, "This expression is not callable.");
    return environment.unknownType;
  }
  return signature.resolvedReturnType ?? environment.anyType;
}

export function checkAssertionLikeExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const expression = expressionOf(node);
  const expressionType = expression === undefined ? environment.unknownType : environment.checkExpression(expression, mode);
  const assertedType = assertedTypeOf(node);
  if (node.kind === Kind.SatisfiesExpression && assertedType !== undefined && environment.isTypeAssignableTo?.(expressionType, assertedType) === false) {
    environment.report?.(node, "Type does not satisfy the expected type.");
  }
  return node.kind === Kind.SatisfiesExpression ? expressionType : assertedType ?? expressionType;
}

export function checkUnaryExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const operand = expressionOf(node);
  const operandType = operand === undefined ? environment.unknownType : environment.checkExpression(operand, mode);
  const operator = operatorKind(node);
  if (operator === Kind.ExclamationToken) return environment.booleanType;
  if (operator === Kind.TildeToken || operator === Kind.PlusToken || operator === Kind.MinusToken) {
    if (!isNumberLike(operandType) && !isAnyOrUnknown(operandType)) environment.report?.(node, "Arithmetic operand must be number-like.");
    return environment.numberType;
  }
  if (operator === Kind.TypeOfKeyword) return environment.stringType;
  if (operator === Kind.VoidKeyword) return environment.undefinedType;
  return operandType;
}

export function checkBinaryExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const left = leftOf(node);
  const right = rightOf(node);
  const leftType = left === undefined ? environment.unknownType : environment.checkExpression(left, mode);
  const rightType = right === undefined ? environment.unknownType : environment.checkExpression(right, mode);
  const operator = operatorKind(node);
  if (isAssignmentOperator(operator)) return checkAssignmentExpression(leftType, rightType, node, environment).targetType;
  if (isEqualityOperator(operator) || isRelationalOperator(operator)) return environment.booleanType;
  if (operator === Kind.PlusToken) return isStringLike(leftType) || isStringLike(rightType) ? environment.stringType : environment.numberType;
  if (isArithmeticOperator(operator)) {
    if (!isNumberLike(leftType) || !isNumberLike(rightType)) environment.report?.(node, "Arithmetic operands must be number-like.");
    return environment.numberType;
  }
  if (operator === Kind.BarBarToken || operator === Kind.QuestionQuestionToken) return environment.createUnionType?.([leftType, rightType]) ?? leftType;
  if (operator === Kind.AmpersandAmpersandToken) return environment.createUnionType?.([leftType, rightType]) ?? rightType;
  return environment.unknownType;
}

export function checkAssignmentExpression(
  targetType: Type,
  sourceType: Type,
  node: AstNode,
  environment: ExpressionCheckEnvironment,
): AssignmentCheckResult {
  const assignable = environment.isTypeAssignableTo?.(sourceType, targetType) ?? true;
  if (!assignable) environment.report?.(node, "Type is not assignable to target.");
  return {
    targetType,
    sourceType,
    assignable,
    failure: assignable ? "none" : "invalid-assignment",
  };
}

export function checkConditionalExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const condition = conditionOf(node);
  if (condition !== undefined) environment.checkExpression(condition, mode);
  const whenTrue = whenTrueOf(node);
  const whenFalse = whenFalseOf(node);
  const trueType = whenTrue === undefined ? environment.unknownType : environment.checkExpression(whenTrue, mode);
  const falseType = whenFalse === undefined ? environment.unknownType : environment.checkExpression(whenFalse, mode);
  return environment.createUnionType?.([trueType, falseType]) ?? trueType;
}

export function checkAwaitExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const expression = expressionOf(node);
  const type = expression === undefined ? environment.unknownType : environment.checkExpression(expression, mode);
  return promisedTypeOf(type) ?? type;
}

export function checkYieldExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  const expression = expressionOf(node);
  if (expression === undefined) return environment.undefinedType;
  return environment.checkExpression(expression, mode);
}

export function checkTemplateExpression(
  node: AstNode,
  mode: ExpressionCheckMode,
  environment: ExpressionCheckEnvironment,
): Type {
  for (const span of nodeArray(node, "templateSpans")) {
    const expression = expressionOf(span);
    if (expression !== undefined) environment.checkExpression(expression, mode);
  }
  return environment.stringType;
}

export function checkExpressionChild(node: AstNode, mode: ExpressionCheckMode, environment: ExpressionCheckEnvironment): Type {
  const expression = expressionOf(node);
  return expression === undefined ? environment.unknownType : environment.checkExpression(expression, mode);
}

export function combineExpressionTypes(types: readonly Type[], environment: ExpressionCheckEnvironment): Type {
  if (types.length === 0) return environment.neverType;
  if (types.every(type => type === types[0])) return types[0]!;
  return environment.createUnionType?.(types) ?? types[0]!;
}

export function isConstContext(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if ((current as { readonly constContext?: boolean }).constContext === true) return true;
    if (current.kind === Kind.AsExpression && assertedTypeText(current) === "const") return true;
    current = current.parent;
  }
  return false;
}

export function isReadonlyContext(node: AstNode): boolean {
  return isConstContext(node) || Boolean((node as { readonly readonly?: boolean }).readonly);
}

export function isOptionalProperty(node: AstNode): boolean {
  return Boolean((node as { readonly questionToken?: unknown }).questionToken);
}

export function isReadonlySymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly)
    || ((symbol.flags ?? 0) & SymbolFlags.Transient) !== 0 && symbolName(symbol).startsWith("readonly ");
}

export function isAssignmentOperator(kind: Kind | undefined): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.CaretEqualsToken
    || kind === Kind.LessThanLessThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanEqualsToken;
}

export function isEqualityOperator(kind: Kind | undefined): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

export function isRelationalOperator(kind: Kind | undefined): boolean {
  return kind === Kind.LessThanToken
    || kind === Kind.LessThanEqualsToken
    || kind === Kind.GreaterThanToken
    || kind === Kind.GreaterThanEqualsToken
    || kind === Kind.InKeyword
    || kind === Kind.InstanceOfKeyword;
}

export function isArithmeticOperator(kind: Kind | undefined): boolean {
  return kind === Kind.MinusToken
    || kind === Kind.AsteriskToken
    || kind === Kind.SlashToken
    || kind === Kind.PercentToken
    || kind === Kind.AsteriskAsteriskToken
    || kind === Kind.LessThanLessThanToken
    || kind === Kind.GreaterThanGreaterThanToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanToken
    || kind === Kind.AmpersandToken
    || kind === Kind.BarToken
    || kind === Kind.CaretToken;
}

export function isNumberLike(type: Type): boolean {
  return (type.flags & TypeFlags.NumberLike) !== 0 || (type.flags & TypeFlags.BigIntLike) !== 0;
}

export function isStringLike(type: Type): boolean {
  return (type.flags & TypeFlags.StringLike) !== 0;
}

export function isAnyOrUnknown(type: Type): boolean {
  return (type.flags & TypeFlags.AnyOrUnknown) !== 0;
}

function nodeArray(node: AstNode, field: "elements" | "properties" | "templateSpans"): readonly AstNode[] {
  const candidate = node as {
    readonly elements?: readonly AstNode[];
    readonly properties?: readonly AstNode[];
    readonly templateSpans?: readonly AstNode[];
  };
  if (field === "elements") return candidate.elements ?? [];
  if (field === "properties") return candidate.properties ?? [];
  return candidate.templateSpans ?? [];
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function argumentExpressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly argumentExpression?: AstNode }).argumentExpression;
}

function propertyInitializer(node: AstNode): AstNode | undefined {
  return (node as { readonly initializer?: AstNode; readonly body?: AstNode }).initializer
    ?? (node as { readonly body?: AstNode }).body;
}

function propertyName(node: AstNode): string | undefined {
  const name = (node as { readonly name?: AstNode | string; readonly text?: string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return nodeText(name);
  return (node as { readonly text?: string }).text;
}

function literalPropertyName(node: AstNode): string | undefined {
  return node.kind === Kind.StringLiteral || node.kind === Kind.NumericLiteral ? nodeText(node) : undefined;
}

function nodeText(node: AstNode): string {
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function operatorKind(node: AstNode): Kind | undefined {
  return (node as { readonly operatorToken?: { readonly kind?: Kind }; readonly operator?: Kind }).operatorToken?.kind
    ?? (node as { readonly operator?: Kind }).operator;
}

function leftOf(node: AstNode): AstNode | undefined {
  return (node as { readonly left?: AstNode }).left;
}

function rightOf(node: AstNode): AstNode | undefined {
  return (node as { readonly right?: AstNode }).right;
}

function conditionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly condition?: AstNode }).condition;
}

function whenTrueOf(node: AstNode): AstNode | undefined {
  return (node as { readonly whenTrue?: AstNode; readonly questionToken?: AstNode }).whenTrue
    ?? (node as { readonly expressionWhenTrue?: AstNode }).expressionWhenTrue;
}

function whenFalseOf(node: AstNode): AstNode | undefined {
  return (node as { readonly whenFalse?: AstNode; readonly expressionWhenFalse?: AstNode }).whenFalse
    ?? (node as { readonly expressionWhenFalse?: AstNode }).expressionWhenFalse;
}

function assertedTypeOf(node: AstNode): Type | undefined {
  return (node as { readonly assertedType?: Type; readonly type?: Type }).assertedType
    ?? (node as { readonly type?: Type }).type;
}

function assertedTypeText(node: AstNode): string | undefined {
  const typeNode = (node as { readonly type?: AstNode }).type;
  return typeNode === undefined ? undefined : nodeText(typeNode);
}

function elementTypeFromArrayLike(type: Type): Type | undefined {
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function promisedTypeOf(type: Type): Type | undefined {
  return (type.data as { readonly promisedType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.promisedType
    ?? (type.symbol?.name === "Promise" ? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0] : undefined);
}
