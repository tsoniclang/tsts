/**
 * Checker return-type, promise, and anonymous-member resolution.
 *
 * Conceptual split from TS-Go `checker.go` return/signature/member sections.
 * The functions preserve the upstream dataflow: annotated signatures first,
 * body aggregation second, async/generator wrapping last.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, Type, TypeMapper, TypeParameter } from "./types.js";
import { ObjectFlags, SignatureFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getReturnTypeOfSignature, instantiateSignature } from "./checker.signatures.js";
import { getMappedType } from "./mapper.js";

export interface ReturnTypeResolutionHost {
  readonly anyType: Type;
  readonly errorType: Type;
  readonly neverType: Type;
  readonly unknownType: Type;
  readonly undefinedType: Type;
  readonly voidType: Type;
  getTypeFromTypeNode(node: AstNode | undefined): Type | undefined;
  checkExpression(node: AstNode): Type;
  getWidenedType(type: Type): Type;
  getGlobalPromiseType(): Type | undefined;
  getGlobalPromiseLikeType(): Type | undefined;
  createTypeReference(target: Type, typeArguments: readonly Type[]): Type;
  createUnionType(types: readonly Type[]): Type;
  createIntersectionType(types: readonly Type[]): Type;
  getContextualReturnType(node: AstNode): Type | undefined;
  getContextualIterationType(kind: IterationTypeKind, node: AstNode): Type | undefined;
  report(node: AstNode | undefined, message: string): void;
}

export type IterationTypeKind = "yield" | "return" | "next";
export type WideningKind = "function-return" | "generator-yield" | "generator-next";

const resolvingReturnTypes = new WeakSet<Signature>();

export function getNonCircularReturnTypeOfSignature(host: Pick<ReturnTypeResolutionHost, "anyType">, signature: Signature): Type {
  if (resolvingReturnTypes.has(signature)) return host.anyType;
  return getReturnTypeOfSignature(signature);
}

export function getReturnTypeFromAnnotation(host: ReturnTypeResolutionHost, declaration: AstNode | undefined): Type | undefined {
  if (declaration === undefined) return undefined;
  if (isConstructorDeclaration(declaration)) return typeOfNode(parentOf(declaration)) ?? host.anyType;
  const returnType = typeNodeOf(declaration);
  if (returnType !== undefined) return host.getTypeFromTypeNode(returnType);
  if (isGetAccessorDeclaration(declaration) && hasBindableName(declaration)) {
    return getAnnotatedAccessorType(host, pairedAccessor(declaration, Kind.SetAccessor));
  }
  return getReturnTypeOfFullSignature(host, declaration);
}

export function getSignatureOfFullSignatureType(host: Pick<ReturnTypeResolutionHost, "getTypeFromTypeNode">, node: AstNode | undefined): Signature | undefined {
  if (node === undefined || !isInJavaScriptFile(node) || !isFunctionLike(node)) return undefined;
  const fullSignature = (node as { readonly fullSignature?: AstNode; readonly functionLikeData?: { readonly fullSignature?: AstNode } }).fullSignature
    ?? (node as { readonly functionLikeData?: { readonly fullSignature?: AstNode } }).functionLikeData?.fullSignature;
  const type = host.getTypeFromTypeNode(fullSignature);
  const signatures = (type?.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
  return signatures.length === 1 ? signatures[0] : undefined;
}

export function getParameterTypeOfFullSignature(
  host: Pick<ReturnTypeResolutionHost, "getTypeFromTypeNode">,
  node: AstNode,
  parameter: AstNode,
): Type | undefined {
  const signature = getSignatureOfFullSignatureType(host, node);
  if (signature === undefined) return undefined;
  const position = parametersOf(node).indexOf(parameter);
  if (position < 0) return undefined;
  if (dotDotDotTokenOf(parameter) !== undefined) return getRestTypeAtPosition(signature, position);
  return getTypeOfSymbol(signature.parameters[position]);
}

export function getReturnTypeOfFullSignature(host: Pick<ReturnTypeResolutionHost, "getTypeFromTypeNode">, node: AstNode | undefined): Type | undefined {
  const signature = getSignatureOfFullSignatureType(host, node);
  return signature === undefined ? undefined : getReturnTypeOfSignature(signature);
}

export function getAnnotatedAccessorType(host: ReturnTypeResolutionHost, accessor: AstNode | undefined): Type | undefined {
  return host.getTypeFromTypeNode(getAnnotatedAccessorTypeNode(accessor));
}

export function getAnnotatedAccessorTypeNode(accessor: AstNode | undefined): AstNode | undefined {
  if (accessor === undefined) return undefined;
  if (accessor.kind === Kind.GetAccessor || accessor.kind === Kind.PropertyDeclaration) return typeNodeOf(accessor);
  if (accessor.kind === Kind.SetAccessor) return getEffectiveSetAccessorTypeAnnotationNode(accessor);
  return undefined;
}

export function getEffectiveSetAccessorTypeAnnotationNode(node: AstNode): AstNode | undefined {
  return typeNodeOf(getSetAccessorValueParameter(node));
}

export function getReturnTypeFromBody(host: ReturnTypeResolutionHost, fn: AstNode, checkMode: number): Type {
  const body = bodyOf(fn);
  if (body === undefined) return host.errorType;
  const functionFlags = functionFlagsOf(fn);
  const isAsync = (functionFlags & functionFlagAsync) !== 0;
  const isGenerator = (functionFlags & functionFlagGenerator) !== 0;
  let returnType: Type | undefined;
  let yieldType: Type | undefined;
  let nextType: Type | undefined;
  let fallbackReturnType = host.voidType;
  if (!isBlock(body)) {
    returnType = host.checkExpression(body);
    if (isAsync) returnType = unwrapAwaitedType(returnType) ?? host.unknownType;
  } else if (isGenerator) {
    const [returnTypes, isNeverReturning] = checkAndAggregateReturnExpressionTypes(host, fn, checkMode);
    fallbackReturnType = isNeverReturning ? host.neverType : fallbackReturnType;
    if (returnTypes.length !== 0) returnType = host.createUnionType(returnTypes);
    const [yieldTypes, nextTypes] = checkAndAggregateYieldOperandTypes(host, fn, checkMode);
    if (yieldTypes.length !== 0) yieldType = host.createUnionType(yieldTypes);
    if (nextTypes.length !== 0) nextType = host.createIntersectionType(nextTypes);
  } else {
    const [types, isNeverReturning] = checkAndAggregateReturnExpressionTypes(host, fn, checkMode);
    if (isNeverReturning) return isAsync ? createPromiseReturnType(host, fn, host.neverType) : host.neverType;
    if (types.length === 0) {
      const contextualReturnType = host.getContextualReturnType(fn);
      const unwrapped = contextualReturnType === undefined ? undefined : unwrapReturnType(host, contextualReturnType, functionFlags);
      returnType = unwrapped !== undefined && containsUndefined(unwrapped) ? host.undefinedType : host.voidType;
      return isAsync ? createPromiseReturnType(host, fn, returnType) : returnType;
    }
    returnType = host.createUnionType(types);
  }
  if (yieldType !== undefined) reportErrorsFromWidening(host, fn, yieldType, "generator-yield");
  if (returnType !== undefined) reportErrorsFromWidening(host, fn, returnType, "function-return");
  if (nextType !== undefined) reportErrorsFromWidening(host, fn, nextType, "generator-next");
  if (yieldType !== undefined) yieldType = host.getWidenedType(yieldType);
  if (returnType !== undefined) returnType = host.getWidenedType(returnType);
  if (nextType !== undefined) nextType = host.getWidenedType(nextType);
  returnType ??= fallbackReturnType;
  if (isGenerator) {
    return createGeneratorType(host, yieldType ?? host.neverType, returnType, nextType ?? host.getContextualIterationType("next", fn) ?? host.unknownType, isAsync);
  }
  return isAsync ? createPromiseType(host, returnType) : returnType;
}

export function checkAndAggregateReturnExpressionTypes(host: ReturnTypeResolutionHost, fn: AstNode, checkMode: number): readonly [readonly Type[], boolean] {
  void checkMode;
  const functionFlags = functionFlagsOf(fn);
  const aggregatedTypes: Type[] = [];
  let hasReturnWithNoExpression = functionHasImplicitReturn(fn);
  let hasReturnOfTypeNever = false;
  forEachReturnStatement(bodyOf(fn), (returnStatement) => {
    let expression = expressionOf(returnStatement);
    if (expression === undefined) {
      hasReturnWithNoExpression = true;
      return;
    }
    expression = skipParentheses(expression);
    if ((functionFlags & functionFlagAsync) !== 0 && expression.kind === Kind.AwaitExpression) {
      expression = skipParentheses(expressionOf(expression) ?? expression);
    }
    if (isRecursiveBareReturn(expression, fn)) {
      hasReturnOfTypeNever = true;
      return;
    }
    let type = host.checkExpression(expression);
    if ((functionFlags & functionFlagAsync) !== 0) type = unwrapAwaitedType(type) ?? host.unknownType;
    if ((type.flags & TypeFlags.Never) !== 0) hasReturnOfTypeNever = true;
    appendUniqueType(aggregatedTypes, type);
  });
  if (aggregatedTypes.length === 0 && !hasReturnWithNoExpression && (hasReturnOfTypeNever || mayReturnNever(fn))) {
    return [[], true];
  }
  if (aggregatedTypes.length !== 0 && hasReturnWithNoExpression) appendUniqueType(aggregatedTypes, host.undefinedType);
  return [aggregatedTypes, false];
}

export function functionHasImplicitReturn(fn: AstNode): boolean {
  return ((bodyOf(fn) as { readonly endFlowNode?: { readonly reachable?: boolean } } | undefined)?.endFlowNode?.reachable) === true;
}

export function mayReturnNever(fn: AstNode): boolean {
  return fn.kind === Kind.FunctionExpression
    || fn.kind === Kind.ArrowFunction
    || fn.kind === Kind.MethodDeclaration && parentOf(fn)?.kind === Kind.ObjectLiteralExpression;
}

export function checkAndAggregateYieldOperandTypes(host: ReturnTypeResolutionHost, fn: AstNode, checkMode: number): readonly [readonly Type[], readonly Type[]] {
  void checkMode;
  const isAsync = (functionFlagsOf(fn) & functionFlagAsync) !== 0;
  const yieldTypes: Type[] = [];
  const nextTypes: Type[] = [];
  forEachYieldExpression(bodyOf(fn), (yieldExpression) => {
    const expression = expressionOf(yieldExpression);
    const expressionType = expression === undefined ? host.undefinedType : host.checkExpression(expression);
    appendUniqueType(yieldTypes, getYieldedTypeOfYieldExpression(host, yieldExpression, expressionType, isAsync));
    const nextType = asteriskTokenOf(yieldExpression) !== undefined
      ? getIteratorNextType(expressionType)
      : host.getContextualIterationType("next", yieldExpression);
    if (nextType !== undefined) appendUniqueType(nextTypes, nextType);
  });
  return [yieldTypes, nextTypes];
}

export function createPromiseType(host: ReturnTypeResolutionHost, promisedType: Type): Type {
  const globalPromiseType = host.getGlobalPromiseType();
  if (globalPromiseType === undefined) return host.unknownType;
  return host.createTypeReference(globalPromiseType, [unwrapAwaitedType(promisedType) ?? promisedType]);
}

export function createPromiseLikeType(host: ReturnTypeResolutionHost, promisedType: Type): Type {
  const globalPromiseLikeType = host.getGlobalPromiseLikeType();
  if (globalPromiseLikeType === undefined) return host.unknownType;
  return host.createTypeReference(globalPromiseLikeType, [unwrapAwaitedType(promisedType) ?? promisedType]);
}

export function createPromiseReturnType(host: ReturnTypeResolutionHost, fn: AstNode, promisedType: Type): Type {
  const promiseType = createPromiseType(host, promisedType);
  if (promiseType === host.unknownType) {
    host.report(fn, "An async function or method must return a Promise. Include an ES2015 Promise declaration.");
    return host.errorType;
  }
  return promiseType;
}

export function unwrapReturnType(host: Pick<ReturnTypeResolutionHost, "errorType">, returnType: Type, functionFlags: number): Type | undefined {
  const isGenerator = (functionFlags & functionFlagGenerator) !== 0;
  const isAsync = (functionFlags & functionFlagAsync) !== 0;
  if (isGenerator) {
    const iteration = iterationTypeOf(returnType, "return");
    if (iteration === undefined) return host.errorType;
    return isAsync ? unwrapAwaitedType(iteration) ?? host.errorType : iteration;
  }
  return isAsync ? unwrapAwaitedType(returnType) ?? host.errorType : returnType;
}

export function getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(
  type: Type | undefined,
  contextualSignatureReturnType: Type | undefined,
  isAsync: boolean,
): Type | undefined {
  if (type === undefined || !isUnitType(type)) return type;
  const contextualType = isAsync ? promisedTypeOfPromise(contextualSignatureReturnType) : contextualSignatureReturnType;
  return getWidenedLiteralLikeTypeForContextualType(type, contextualType);
}

export function getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(
  type: Type | undefined,
  contextualSignatureReturnType: Type | undefined,
  kind: IterationTypeKind,
  isAsyncGenerator: boolean,
): Type | undefined {
  if (type === undefined || !isUnitType(type)) return type;
  const contextualType = contextualSignatureReturnType === undefined
    ? undefined
    : isAsyncGenerator
      ? promisedTypeOfPromise(iterationTypeOf(contextualSignatureReturnType, kind))
      : iterationTypeOf(contextualSignatureReturnType, kind);
  return getWidenedLiteralLikeTypeForContextualType(type, contextualType);
}

export function createGeneratorType(host: ReturnTypeResolutionHost, yieldType: Type, returnType: Type, nextType: Type, isAsync: boolean): Type {
  const globalType = isAsync ? host.getGlobalPromiseType() : host.getGlobalPromiseLikeType();
  const generatorSymbol: AstSymbol = {
    name: isAsync ? "AsyncGenerator" : "Generator",
    escapedName: isAsync ? "AsyncGenerator" : "Generator",
    flags: SymbolFlags.Interface,
    declarations: [],
  };
  const target = globalType ?? { flags: TypeFlags.Object, id: nextSyntheticTypeId(), symbol: generatorSymbol, data: { objectFlags: ObjectFlags.Interface } };
  return host.createTypeReference(target, [yieldType, returnType, nextType]);
}

export function reportErrorsFromWidening(host: Pick<ReturnTypeResolutionHost, "report">, node: AstNode, type: Type, kind: WideningKind): void {
  if (shouldReportErrorsFromWideningWithContextualSignature(type)) host.report(node, `Widening ${kind} type ${typeName(type)} loses literal precision.`);
}

export function shouldReportErrorsFromWideningWithContextualSignature(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BigIntLiteral | TypeFlags.BooleanLiteral)) !== 0;
}

export function reportWideningErrorsInType(host: Pick<ReturnTypeResolutionHost, "report">, node: AstNode, type: Type): void {
  if (shouldReportErrorsFromWideningWithContextualSignature(type)) host.report(node, `Type ${typeName(type)} requires widening diagnostics.`);
}

export function getTypePredicateFromBody(host: ReturnTypeResolutionHost, fn: AstNode): { readonly parameterName: string; readonly type: Type } | undefined {
  const [parameter, refinedType] = checkIfExpressionRefinesAnyParameter(host, bodyOf(fn), parametersOf(fn));
  return parameter === undefined || refinedType === undefined ? undefined : { parameterName: nodeText(declarationName(parameter)), type: refinedType };
}

export function checkIfExpressionRefinesAnyParameter(
  host: ReturnTypeResolutionHost,
  body: AstNode | undefined,
  parameters: readonly AstNode[],
): readonly [AstNode | undefined, Type | undefined] {
  const expression = singleReturnExpression(body);
  if (expression === undefined) return [undefined, undefined];
  for (const parameter of parameters) {
    const refined = checkIfExpressionRefinesParameter(host, expression, parameter);
    if (refined !== undefined) return [parameter, refined];
  }
  return [undefined, undefined];
}

export function checkIfExpressionRefinesParameter(host: ReturnTypeResolutionHost, expression: AstNode, parameter: AstNode): Type | undefined {
  const name = nodeText(declarationName(parameter));
  if (name.length === 0 || !expressionMentionsIdentifier(expression, name)) return undefined;
  return host.checkExpression(expression);
}

export function addOptionalTypeMarker(type: Type): Type {
  return (type.flags & TypeFlags.Undefined) !== 0 ? type : unionType([type, intrinsicType(TypeFlags.Undefined, "undefined")]);
}

export function instantiateSignatureEx(signature: Signature, mapper: TypeMapper, eraseTypeParameters: boolean): Signature {
  const instantiated = instantiateSignature(signature, mapper);
  if (!eraseTypeParameters) return instantiated;
  const { typeParameters: _typeParameters, ...withoutTypeParameters } = instantiated;
  return withoutTypeParameters as Signature;
}

export function instantiateIndexInfo(info: IndexInfo, mapper: TypeMapper): IndexInfo {
  return {
    keyType: getMappedType(info.keyType, mapper),
    valueType: getMappedType(info.valueType, mapper),
    ...(info.isReadonly === undefined ? {} : { isReadonly: info.isReadonly }),
    ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
  };
}

export function resolveAnonymousTypeMembers(type: Type): ObjectType | undefined {
  const data = type.data as ObjectType | undefined;
  if (data === undefined) return undefined;
  data.declaredProperties ??= propertiesOfSymbol(type.symbol);
  data.declaredCallSignatures ??= signaturesFromSymbolMember(type.symbol, "__call");
  data.declaredConstructSignatures ??= signaturesFromSymbolMember(type.symbol, "__new");
  data.indexInfos ??= [];
  data.objectFlags |= ObjectFlags.MembersResolved;
  return data;
}

export function createInstantiatedSymbolTable(symbols: SymbolTable | undefined, mapper: TypeMapper): SymbolTable {
  return instantiateSymbolTable(symbols ?? new Map<string, AstSymbol>(), mapper);
}

export function instantiateSymbolTable(symbols: SymbolTable, mapper: TypeMapper): SymbolTable {
  const result: SymbolTable = new Map();
  for (const [name, symbol] of symbols) {
    const type = getTypeOfSymbol(symbol);
    result.set(name, type === undefined ? symbol : { ...symbol, synthetic: true, syntheticType: getMappedType(type, mapper) } as AstSymbol);
  }
  return result;
}

export function isThisless(signature: Signature): boolean {
  return signature.thisParameter === undefined || isThislessVariableLikeDeclaration(signature.thisParameter.valueDeclaration);
}

export function isThislessVariableLikeDeclaration(node: AstNode | undefined): boolean {
  return node === undefined || nodeText(declarationName(node)) !== "this";
}

export function isThislessType(type: Type): boolean {
  const calls = (type.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
  return calls.every(isThisless);
}

export function isThislessFunctionLikeDeclaration(node: AstNode | undefined): boolean {
  return parametersOf(node)[0] === undefined || nodeText(declarationName(parametersOf(node)[0])) !== "this";
}

export function isThislessTypeParameter(type: TypeParameter): boolean {
  return type.isThisType !== true;
}

function getRestTypeAtPosition(signature: Signature, position: number): Type | undefined {
  const rest = signature.parameters[signature.parameters.length - 1];
  const restType = getTypeOfSymbol(rest);
  if (restType === undefined || position < signature.parameters.length - 1) return getTypeOfSymbol(signature.parameters[position]);
  return elementTypeOfArrayLike(restType) ?? restType;
}

function getYieldedTypeOfYieldExpression(host: ReturnTypeResolutionHost, yieldExpression: AstNode, expressionType: Type, isAsync: boolean): Type {
  if (asteriskTokenOf(yieldExpression) === undefined) return expressionType;
  const yielded = elementTypeOfArrayLike(expressionType) ?? expressionType;
  return isAsync ? unwrapAwaitedType(yielded) ?? host.unknownType : yielded;
}

function unwrapAwaitedType(type: Type | undefined): Type | undefined {
  if (type === undefined) return undefined;
  return promisedTypeOfPromise(type) ?? type;
}

function promisedTypeOfPromise(type: Type | undefined): Type | undefined {
  return (type?.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly elementType?: Type } | undefined)?.resolvedTypeArguments?.[0]
    ?? (type?.data as { readonly elementType?: Type } | undefined)?.elementType;
}

function iterationTypeOf(type: Type | undefined, kind: IterationTypeKind): Type | undefined {
  const data = type?.data as { readonly yieldType?: Type; readonly returnType?: Type; readonly nextType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined;
  if (kind === "yield") return data?.yieldType ?? data?.resolvedTypeArguments?.[0];
  if (kind === "return") return data?.returnType ?? data?.resolvedTypeArguments?.[1];
  return data?.nextType ?? data?.resolvedTypeArguments?.[2];
}

function getIteratorNextType(type: Type): Type | undefined {
  return iterationTypeOf(type, "next") ?? elementTypeOfArrayLike(type);
}

function elementTypeOfArrayLike(type: Type): Type | undefined {
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function getWidenedLiteralLikeTypeForContextualType(type: Type, contextualType: Type | undefined): Type {
  if (contextualType !== undefined && (contextualType.flags & type.flags) !== 0) return type;
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return intrinsicType(TypeFlags.String, "string");
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return intrinsicType(TypeFlags.Number, "number");
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return intrinsicType(TypeFlags.Boolean, "boolean");
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return intrinsicType(TypeFlags.BigInt, "bigint");
  return type;
}

function containsUndefined(type: Type): boolean {
  return (type.flags & TypeFlags.Undefined) !== 0 || ((type.flags & TypeFlags.Union) !== 0 && typeConstituents(type).some(containsUndefined));
}

function isUnitType(type: Type): boolean {
  return (type.flags & TypeFlags.Unit) !== 0;
}

function singleReturnExpression(body: AstNode | undefined): AstNode | undefined {
  let found: AstNode | undefined;
  let count = 0;
  forEachReturnStatement(body, (statement) => {
    if (expressionOf(statement) !== undefined) {
      found = expressionOf(statement);
      count += 1;
    }
  });
  return count === 1 ? found : undefined;
}

function expressionMentionsIdentifier(node: AstNode | undefined, name: string): boolean {
  if (node === undefined) return false;
  if (node.kind === Kind.Identifier && nodeText(node) === name) return true;
  return childrenOf(node).some((child) => expressionMentionsIdentifier(child, name));
}

function forEachReturnStatement(node: AstNode | undefined, callback: (node: AstNode) => void): void {
  if (node === undefined) return;
  if (node.kind === Kind.ReturnStatement) callback(node);
  for (const child of childrenOf(node)) forEachReturnStatement(child, callback);
}

function forEachYieldExpression(node: AstNode | undefined, callback: (node: AstNode) => void): void {
  if (node === undefined) return;
  if (node.kind === Kind.YieldExpression) callback(node);
  for (const child of childrenOf(node)) forEachYieldExpression(child, callback);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const direct = (node as { readonly children?: readonly AstNode[] | { readonly nodes?: readonly AstNode[] } }).children;
  const children = nodeArray(direct);
  if (children.length !== 0) return children;
  const out: AstNode[] = [];
  for (const key of ["statements", "members", "parameters", "arguments", "elements", "properties"]) {
    out.push(...nodeArray((node as unknown as Record<string, unknown>)[key]));
  }
  for (const key of ["expression", "left", "right", "body", "initializer", "name"]) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (isNode(child)) out.push(child);
  }
  return out;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function parametersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly parameters?: unknown } | undefined)?.parameters);
}

function bodyOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly body?: AstNode } | undefined)?.body;
}

function typeNodeOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly expression?: AstNode } | undefined)?.expression;
}

function declarationName(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly name?: AstNode } | undefined)?.name ?? node;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function dotDotDotTokenOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly dotDotDotToken?: AstNode } | undefined)?.dotDotDotToken;
}

function asteriskTokenOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly asteriskToken?: AstNode } | undefined)?.asteriskToken;
}

function functionFlagsOf(node: AstNode): number {
  return (node as { readonly functionFlags?: number; readonly flags?: number }).functionFlags ?? (node as { readonly flags?: number }).flags ?? 0;
}

function isBlock(node: AstNode): boolean {
  return node.kind === Kind.Block;
}

function isConstructorDeclaration(node: AstNode): boolean {
  return node.kind === Kind.Constructor;
}

function isGetAccessorDeclaration(node: AstNode): boolean {
  return node.kind === Kind.GetAccessor;
}

function isSetAccessorDeclaration(node: AstNode): boolean {
  return node.kind === Kind.SetAccessor;
}

function isFunctionLike(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction;
}

function isInJavaScriptFile(node: AstNode): boolean {
  for (let current: AstNode | undefined = node; current !== undefined; current = parentOf(current)) {
    const fileName = (current as { readonly fileName?: string }).fileName;
    if (fileName !== undefined) return fileName.endsWith(".js") || fileName.endsWith(".jsx") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs");
  }
  return false;
}

function pairedAccessor(node: AstNode, kind: Kind): AstNode | undefined {
  const symbol = nodeSymbol(node);
  return symbol?.declarations?.find((declaration) => declaration.kind === kind);
}

function getSetAccessorValueParameter(node: AstNode): AstNode | undefined {
  return parametersOf(node).find((parameter) => nodeText(declarationName(parameter)) !== "this");
}

function hasBindableName(node: AstNode | undefined): boolean {
  return declarationName(node) !== undefined;
}

function skipParentheses(node: AstNode): AstNode {
  let current = node;
  while (current.kind === Kind.ParenthesizedExpression && expressionOf(current) !== undefined) current = expressionOf(current)!;
  return current;
}

function isRecursiveBareReturn(expression: AstNode, fn: AstNode): boolean {
  return expression.kind === Kind.CallExpression
    && expressionOf(expression)?.kind === Kind.Identifier
    && nodeSymbol(expressionOf(expression)) === nodeSymbol(fn);
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function typeOfNode(node: AstNode | undefined): Type | undefined {
  return (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.type
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.syntheticType;
}

function propertiesOfSymbol(symbol: AstSymbol | undefined): readonly AstSymbol[] {
  return [...(symbol as { readonly members?: SymbolTable } | undefined)?.members?.values() ?? []];
}

function signaturesFromSymbolMember(symbol: AstSymbol | undefined, name: string): readonly Signature[] {
  const member = (symbol as { readonly members?: SymbolTable } | undefined)?.members?.get(name);
  const type = getTypeOfSymbol(member);
  return (type?.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function appendUniqueType(types: Type[], type: Type): void {
  if (!types.includes(type)) types.push(type);
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 1 ? unique[0]! : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: nextSyntheticTypeId(), data: { intrinsicName, objectFlags: ObjectFlags.None } };
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? nodeSymbol(node)?.name ?? "";
}

function typeName(type: Type): string {
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

const functionFlagAsync = 1 << 0;
const functionFlagGenerator = 1 << 1;
let syntheticTypeId = -1_100_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
