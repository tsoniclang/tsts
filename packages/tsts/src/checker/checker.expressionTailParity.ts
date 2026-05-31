/**
 * Expression-tail checks.
 *
 * TS-Go checker.go has a compact but important region for `satisfies`, meta
 * properties, delete/void/await, prefix/postfix unary, conditional, spread,
 * synthetic expressions, and class/function expression contextual checks. This
 * module ports that tail of expression checking as reusable operations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Signature, Type, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface ExpressionTailHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly voidType: Type;
  readonly undefinedType: Type;
  readonly booleanType: Type;
  readonly numberType: Type;
  readonly stringType: Type;
  readonly globalThisType?: Type;
  readonly importMetaType?: Type;
  readonly newTargetType?: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getTypeFromTypeNode?: (node: AstNode) => Type | undefined;
  readonly getContextualType?: (node: AstNode) => Type | undefined;
  readonly getApparentType?: (type: Type) => Type;
  readonly getSignaturesOfType?: (type: Type, kind: SignatureKind) => readonly Signature[];
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface ExpressionCheckResult {
  readonly node: AstNode;
  readonly type: Type;
  readonly diagnostics: readonly string[];
}

export function checkSatisfiesExpression(node: AstNode, host: ExpressionTailHost): ExpressionCheckResult {
  const diagnostics: string[] = [];
  const scoped = withExpressionDiagnostics(host, diagnostics);
  const expression = (node as { readonly expression?: AstNode }).expression;
  const typeNode = (node as { readonly type?: AstNode }).type;
  const expressionType = expression === undefined ? scoped.unknownType : scoped.getTypeOfExpression?.(expression) ?? scoped.unknownType;
  const targetType = typeNode === undefined ? scoped.unknownType : scoped.getTypeFromTypeNode?.(typeNode) ?? scoped.unknownType;
  if (scoped.isTypeAssignableTo?.(expressionType, targetType) === false) scoped.report?.(node, "Type does not satisfy the expected type.");
  return { node, type: expressionType, diagnostics };
}

export function checkMetaProperty(node: AstNode, host: ExpressionTailHost): Type {
  const keyword = nodeText((node as { readonly keywordToken?: AstNode }).keywordToken);
  const name = nodeText((node as { readonly name?: AstNode }).name);
  if (keyword === "new" && name === "target") return checkNewTargetMetaProperty(node, host);
  if (keyword === "import" && name === "meta") return checkImportMetaProperty(node, host);
  host.report?.(node, "Unsupported meta-property.");
  return host.unknownType;
}

export function checkNewTargetMetaProperty(node: AstNode, host: ExpressionTailHost): Type {
  if (!isInConstructorOrFunction(node)) host.report?.(node, "'new.target' is only allowed in functions or constructors.");
  return host.newTargetType ?? host.unknownType;
}

export function checkImportMetaProperty(node: AstNode, host: ExpressionTailHost): Type {
  if (!isInExternalModule(node)) host.report?.(node, "'import.meta' is only allowed in modules.");
  return host.importMetaType ?? host.unknownType;
}

export function checkMetaPropertyKeyword(node: AstNode, host: ExpressionTailHost): Type {
  return checkMetaProperty(node.parent ?? node, host);
}

export function checkDeleteExpression(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression === undefined) return host.booleanType;
  if (!isValidDeleteTarget(expression)) host.report?.(expression, "The operand of a 'delete' operator must be a property reference.");
  const symbol = resolvedSymbol(expression);
  if (symbol !== undefined) checkDeleteExpressionMustBeOptional(expression, symbol, host);
  return host.booleanType;
}

export function checkDeleteExpressionMustBeOptional(expression: AstNode, symbol: AstSymbol, host: ExpressionTailHost): void {
  if (!isOptionalSymbol(symbol)) host.report?.(expression, "The operand of a 'delete' operator must be optional.");
}

export function checkVoidExpression(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression !== undefined) host.getTypeOfExpression?.(expression);
  return host.voidType;
}

export function checkAwaitExpression(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  const expressionType = expression === undefined ? host.unknownType : host.getTypeOfExpression?.(expression) ?? host.unknownType;
  return (expressionType.data as { readonly promisedType?: Type } | undefined)?.promisedType ?? expressionType;
}

export function checkPrefixUnaryExpression(node: AstNode, host: ExpressionTailHost): Type {
  const operator = (node as { readonly operator?: Kind }).operator ?? (node as { readonly operatorToken?: AstNode }).operatorToken?.kind;
  const operand = (node as { readonly operand?: AstNode }).operand ?? (node as { readonly expression?: AstNode }).expression;
  const operandType = operand === undefined ? host.unknownType : host.getTypeOfExpression?.(operand) ?? host.unknownType;
  if (operator === Kind.ExclamationToken) return host.booleanType;
  if (operator === Kind.PlusPlusToken || operator === Kind.MinusMinusToken) checkUnaryMutationOperand(operand, operandType, host);
  return getUnaryResultType(operandType, operator, host);
}

export function checkPostfixUnaryExpression(node: AstNode, host: ExpressionTailHost): Type {
  const operand = (node as { readonly operand?: AstNode }).operand;
  const operandType = operand === undefined ? host.unknownType : host.getTypeOfExpression?.(operand) ?? host.unknownType;
  checkUnaryMutationOperand(operand, operandType, host);
  return getUnaryResultType(operandType, (node as { readonly operator?: Kind }).operator, host);
}

export function getUnaryResultType(operandType: Type, operator: Kind | undefined, host: ExpressionTailHost): Type {
  if (operator === Kind.ExclamationToken) return host.booleanType;
  if ((operandType.flags & TypeFlags.BigIntLike) !== 0) return operandType;
  if ((operandType.flags & TypeFlags.NumberLike) !== 0) return host.numberType;
  if ((operandType.flags & TypeFlags.AnyOrUnknown) !== 0) return operandType;
  return host.numberType;
}

export function checkConditionalExpression(node: AstNode, checkMode: number, host: ExpressionTailHost): Type {
  const condition = (node as { readonly condition?: AstNode }).condition;
  if (condition !== undefined) checkTruthinessExpression(condition, checkMode, host);
  const whenTrue = (node as { readonly whenTrue?: AstNode }).whenTrue;
  const whenFalse = (node as { readonly whenFalse?: AstNode }).whenFalse;
  const trueType = whenTrue === undefined ? host.undefinedType : host.getTypeOfExpression?.(whenTrue) ?? host.unknownType;
  const falseType = whenFalse === undefined ? host.undefinedType : host.getTypeOfExpression?.(whenFalse) ?? host.unknownType;
  return host.createUnionType?.([trueType, falseType]) ?? unionType([trueType, falseType]);
}

export function checkTruthinessExpression(node: AstNode, checkMode: number, host: ExpressionTailHost): Type {
  const type = host.getTypeOfExpression?.(node) ?? host.unknownType;
  checkTruthinessOfType(type, node, host);
  void checkMode;
  return host.booleanType;
}

export function checkTruthinessOfType(type: Type, node: AstNode, host: ExpressionTailHost): void {
  if ((type.flags & TypeFlags.Never) !== 0) host.report?.(node, "This condition is unreachable.");
  if ((type.flags & TypeFlags.VoidLike) !== 0) host.report?.(node, "This expression is always falsy.");
}

export function checkSpreadExpression(node: AstNode, checkMode: number, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  const type = expression === undefined ? host.unknownType : host.getTypeOfExpression?.(expression) ?? host.unknownType;
  if (!isSpreadableType(type)) host.report?.(node, "Spread types may only be created from object or iterable types.");
  void checkMode;
  return type;
}

export function checkSyntheticExpression(node: AstNode, host: ExpressionTailHost): Type {
  return (node as { readonly type?: Type }).type ?? host.unknownType;
}

export function checkParenthesizedExpression(node: AstNode, checkMode: number, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  void checkMode;
  return expression === undefined ? host.unknownType : host.getTypeOfExpression?.(expression) ?? host.unknownType;
}

export function checkClassExpression(node: AstNode, host: ExpressionTailHost): Type {
  const symbol = node.symbol;
  const type = symbol === undefined ? undefined : host.getTypeOfExpression?.(node) ?? getTypeOfSymbol(symbol);
  return type ?? host.unknownType;
}

export function checkClassExpressionDeferred(node: AstNode, host: ExpressionTailHost): void {
  for (const member of (node as { readonly members?: readonly AstNode[] }).members ?? []) {
    if (member.kind === Kind.PropertyDeclaration && (member as { readonly initializer?: AstNode }).initializer !== undefined) {
      host.getTypeOfExpression?.((member as { readonly initializer?: AstNode }).initializer!);
    }
  }
}

export function checkFunctionExpressionOrObjectLiteralMethod(node: AstNode, checkMode: number, host: ExpressionTailHost): Type {
  const contextual = host.getContextualType?.(node);
  if (contextual !== undefined) return contextual;
  const signature = signatureFromFunctionLike(node, host);
  void checkMode;
  return functionTypeFromSignature(signature, host);
}

export function contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node: AstNode, checkMode: number, host: ExpressionTailHost): void {
  const contextual = host.getContextualType?.(node);
  if (contextual !== undefined) checkFunctionExpressionOrObjectLiteralMethod(node, checkMode, host);
}

export function checkFunctionExpressionOrObjectLiteralMethodDeferred(node: AstNode, host: ExpressionTailHost): void {
  const body = (node as { readonly body?: AstNode }).body;
  if (body !== undefined) for (const child of nodeTree(body)) if (child.kind === Kind.ReturnStatement) host.getTypeOfExpression?.((child as { readonly expression?: AstNode }).expression ?? child);
}

export function checkTypeOfExpression(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression !== undefined) host.getTypeOfExpression?.(expression);
  return host.stringType;
}

export function checkNonNullAssertion(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  const type = expression === undefined ? host.unknownType : host.getTypeOfExpression?.(expression) ?? host.unknownType;
  return removeNullable(type, host);
}

export function checkNonNullChain(node: AstNode, host: ExpressionTailHost): Type {
  return checkNonNullAssertion(node, host);
}

export function checkExpressionWithTypeArguments(node: AstNode, host: ExpressionTailHost): Type {
  const expression = (node as { readonly expression?: AstNode }).expression;
  const expressionType = expression === undefined ? host.unknownType : host.getTypeOfExpression?.(expression) ?? host.unknownType;
  const typeArguments = (node as { readonly typeArguments?: readonly AstNode[] }).typeArguments ?? [];
  if (typeArguments.length === 0) return expressionType;
  return getInstantiationExpressionType(expressionType, node, host);
}

export function getInstantiationExpressionType(expressionType: Type, node: AstNode, host: ExpressionTailHost): Type {
  const signatures = host.getSignaturesOfType?.(expressionType, SignatureKind.Call) ?? [];
  const constructSignatures = host.getSignaturesOfType?.(expressionType, SignatureKind.Construct) ?? [];
  const typeArguments = (node as { readonly typeArguments?: readonly AstNode[] }).typeArguments ?? [];
  if (signatures.length === 0 && constructSignatures.length === 0) {
    host.report?.(node, "Type arguments can only be applied to a generic function or constructor.");
    return host.unknownType;
  }
  const instantiatedCalls = signatures.map(signature => instantiateSignatureWithTypeArgumentNodes(signature, typeArguments, host));
  const instantiatedConstructs = constructSignatures.map(signature => instantiateSignatureWithTypeArgumentNodes(signature, typeArguments, host));
  return {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredCallSignatures: instantiatedCalls,
      declaredConstructSignatures: instantiatedConstructs,
    } as object,
  };
}

export function getOuterInferenceTypeParameters(node: AstNode): readonly AstNode[] {
  const result: AstNode[] = [];
  let current = node.parent;
  while (current !== undefined) {
    result.push(...((current as { readonly typeParameters?: readonly AstNode[] }).typeParameters ?? []));
    if (current.kind === Kind.SourceFile || current.kind === Kind.ClassDeclaration) break;
    current = current.parent;
  }
  return result;
}

export function getUniqueTypeParametersFromNodes(typeParameters: readonly AstNode[]): readonly AstNode[] {
  const seen = new Set<string>();
  const result: AstNode[] = [];
  for (const typeParameter of typeParameters) {
    const name = declarationName(typeParameter);
    if (seen.has(name)) continue;
    seen.add(name);
    result.push(typeParameter);
  }
  return result;
}

export function hasTypeParameterNodeByName(typeParameters: readonly AstNode[], name: string): boolean {
  return typeParameters.some(typeParameter => declarationName(typeParameter) === name);
}

export function getUniqueTypeParameterNodeName(typeParameters: readonly AstNode[], baseName: string): string {
  let candidate = baseName;
  let suffix = 1;
  while (hasTypeParameterNodeByName(typeParameters, candidate)) {
    candidate = `${baseName}_${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export function checkPrivateIdentifierExpression(node: AstNode, host: ExpressionTailHost): Type {
  const symbol = getSymbolForPrivateIdentifierExpression(node);
  if (symbol === undefined) {
    host.report?.(node, `Private identifier '${nodeText(node)}' is not declared in this class.`);
    return host.unknownType;
  }
  return host.getTypeOfExpression?.(node) ?? getTypeOfSymbol(symbol) ?? host.unknownType;
}

export function getSymbolForPrivateIdentifierExpression(node: AstNode): AstSymbol | undefined {
  let current: AstNode | undefined = node;
  const name = nodeText(node);
  while (current !== undefined) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) {
      const members = (current as { readonly members?: readonly AstNode[] }).members ?? [];
      return members.map(member => member.symbol).find(symbol => symbol !== undefined && symbolName(symbol) === name);
    }
    current = current.parent;
  }
  return undefined;
}

export function checkSuperExpression(node: AstNode, host: ExpressionTailHost): Type {
  const container = nearestFunction(node);
  if (container === undefined || container.kind !== Kind.Constructor && container.kind !== Kind.MethodDeclaration) {
    host.report?.(node, "'super' can only be referenced in class constructors or methods.");
  }
  return host.globalThisType ?? host.unknownType;
}

function checkUnaryMutationOperand(operand: AstNode | undefined, operandType: Type, host: ExpressionTailHost): void {
  if (operand === undefined) return;
  if (!isValidAssignmentTarget(operand)) host.report?.(operand, "The operand of an increment or decrement operator must be a variable or property access.");
  if ((operandType.flags & (TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.AnyOrUnknown)) === 0) host.report?.(operand, "An arithmetic operand must be number-like or bigint-like.");
}

function isValidDeleteTarget(node: AstNode): boolean {
  return node.kind === Kind.PropertyAccessExpression || node.kind === Kind.ElementAccessExpression;
}

function isValidAssignmentTarget(node: AstNode): boolean {
  return node.kind === Kind.Identifier || node.kind === Kind.PropertyAccessExpression || node.kind === Kind.ElementAccessExpression;
}

function isOptionalSymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0
    || (symbol.declarations ?? []).some(declaration => Boolean((declaration as { readonly questionToken?: unknown }).questionToken));
}

function isSpreadableType(type: Type): boolean {
  return (type.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.UnionOrIntersection | TypeFlags.StringLike)) !== 0;
}

function removeNullable(type: Type, host: ExpressionTailHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return (type.flags & TypeFlags.Nullable) !== 0 ? host.neverType : type;
  const kept = constituentTypes(type).filter(part => (part.flags & TypeFlags.Nullable) === 0);
  if (kept.length === 0) return host.neverType;
  if (kept.length === 1) return kept[0]!;
  return host.createUnionType?.(kept) ?? unionType(kept);
}

function signatureFromFunctionLike(node: AstNode, host: ExpressionTailHost): Signature {
  const parameters = ((node as { readonly parameters?: readonly AstNode[] }).parameters ?? []).map((parameter, index) => {
    const name = declarationName(parameter) || `arg${index}`;
    const symbol = parameter.symbol ?? { name, escapedName: name, declarations: [parameter], flags: SymbolFlags.FunctionScopedVariable };
    (symbol as { type?: Type }).type = (parameter as { readonly type?: Type }).type ?? host.anyType;
    return symbol;
  });
  const returnType = (node as { readonly type?: Type }).type ?? host.unknownType;
  return { flags: 0, parameters, minArgumentCount: parameters.length, resolvedReturnType: returnType };
}

function functionTypeFromSignature(signature: Signature, host: ExpressionTailHost): Type {
  return {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: { objectFlags: ObjectFlags.Anonymous, declaredCallSignatures: [signature] } as object,
  };
}

function instantiateSignatureWithTypeArgumentNodes(signature: Signature, typeArgumentNodes: readonly AstNode[], host: ExpressionTailHost): Signature {
  const typeArguments = typeArgumentNodes.map(node => host.getTypeFromTypeNode?.(node) ?? host.unknownType);
  const { typeParameters: _typeParameters, ...rest } = signature;
  void _typeParameters;
  return {
    ...rest,
    mapper: { typeArguments } as never,
  };
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function isInConstructorOrFunction(node: AstNode): boolean {
  return nearestFunction(node) !== undefined;
}

function isInExternalModule(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return Boolean((current as { readonly externalModuleIndicator?: unknown }).externalModuleIndicator);
    current = current.parent;
  }
  return false;
}

function nearestFunction(node: AstNode): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction || current.kind === Kind.MethodDeclaration || current.kind === Kind.Constructor) return current;
    current = current.parent;
  }
  return undefined;
}

function resolvedSymbol(node: AstNode): AstSymbol | undefined {
  return (node as { readonly resolvedSymbol?: AstSymbol; readonly symbol?: AstSymbol }).resolvedSymbol
    ?? (node as { readonly symbol?: AstSymbol }).symbol;
}

function declarationName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return nodeText(name);
  return nodeText(node);
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function withExpressionDiagnostics(host: ExpressionTailHost, diagnostics: string[]): ExpressionTailHost {
  return {
    ...host,
    report: (node, message) => {
      diagnostics.push(message);
      host.report?.(node, message);
    },
  };
}

function nodeTree(root: AstNode | undefined): readonly AstNode[] {
  const out: AstNode[] = [];
  const visit = (node: AstNode | undefined): void => {
    if (node === undefined) return;
    out.push(node);
    for (const child of childNodes(node)) visit(child);
  };
  visit(root);
  return out;
}

function childNodes(node: AstNode): readonly AstNode[] {
  const children: AstNode[] = [];
  for (const key of ["statements", "members", "parameters", "arguments", "elements", "properties"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(value)) children.push(...value.filter(isNode));
  }
  for (const key of ["body", "expression", "left", "right", "initializer", "whenTrue", "whenFalse"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) children.push(value);
  }
  return children;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  if (unique.length === 1) return unique[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: unique, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

let syntheticTypeId = -3_800_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
