/**
 * Return, yield, await, promise, and predicate return analysis.
 *
 * TS-Go checker.go computes function return types by aggregating return
 * expressions, yield operands, contextual return/iteration types, async
 * promise wrapping, generator construction, and predicate extraction from
 * boolean bodies. This module ports that pipeline as reusable TSTS helpers.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind } from "../ast/index.js";
import type { Signature, Type, TypePredicate, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export type FunctionFlags = number;
export const FunctionFlags = {
  Normal: 0 as FunctionFlags,
  Generator: (1 << 0) as FunctionFlags,
  Async: (1 << 1) as FunctionFlags,
  AsyncGenerator: (1 << 0) | (1 << 1) as FunctionFlags,
} as const;

export interface ReturnYieldAwaitHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly voidType: Type;
  readonly booleanType: Type;
  readonly falseType?: Type;
  readonly trueType?: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getContextualReturnType?: (node: AstNode) => Type | undefined;
  readonly getContextualIterationType?: (node: AstNode, kind: IterationTypeKind) => Type | undefined;
  readonly getAwaitedType?: (type: Type, errorNode?: AstNode) => Type | undefined;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createPromiseType?: (type: Type) => Type;
  readonly createGeneratorType?: (yieldType: Type, returnType: Type, nextType: Type, isAsync: boolean) => Type;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly report?: (node: AstNode, message: string) => void;
}

export type IterationTypeKind = "yield" | "return" | "next";

export interface ReturnAggregation {
  readonly expressionTypes: readonly Type[];
  readonly hasReturnWithNoExpression: boolean;
  readonly hasImplicitReturn: boolean;
}

export interface YieldAggregation {
  readonly yieldTypes: readonly Type[];
  readonly nextTypes: readonly Type[];
  readonly hasDelegatedYield: boolean;
}

export interface FunctionReturnAnalysis {
  readonly functionNode: AstNode;
  readonly returnType: Type;
  readonly unwrappedReturnType: Type;
  readonly yieldType?: Type;
  readonly nextType?: Type;
  readonly predicate?: TypePredicate;
  readonly diagnostics: readonly string[];
}

export function getReturnTypeFromBody(functionNode: AstNode, checkMode: number, host: ReturnYieldAwaitHost): Type {
  const analysis = analyzeFunctionReturn(functionNode, checkMode, host);
  return analysis.returnType;
}

export function analyzeFunctionReturn(functionNode: AstNode, checkMode: number, host: ReturnYieldAwaitHost): FunctionReturnAnalysis {
  const diagnostics: string[] = [];
  const scoped = withReturnDiagnostics(host, diagnostics);
  const flags = getFunctionFlags(functionNode);
  const declared = annotatedType(functionNode);
  const contextual = scoped.getContextualReturnType?.(functionNode);
  const returns = checkAndAggregateReturnExpressionTypes(functionNode, checkMode, scoped);
  const returnType = declared
    ?? aggregateReturnTypes(returns, contextual, flags, scoped)
    ?? scoped.voidType;
  const unwrappedReturnType = unwrapReturnType(returnType, flags, scoped);
  const yields = checkAndAggregateYieldOperandTypes(functionNode, checkMode, scoped);
  const yieldType = yields.yieldTypes.length === 0 ? undefined : scoped.createUnionType?.(yields.yieldTypes) ?? unionType(yields.yieldTypes);
  const nextType = yields.nextTypes.length === 0 ? undefined : scoped.createUnionType?.(yields.nextTypes) ?? unionType(yields.nextTypes);
  const generatorType = (flags & FunctionFlags.Generator) !== 0
    ? createGeneratorType(yieldType ?? scoped.neverType, unwrappedReturnType, nextType ?? scoped.unknownType, (flags & FunctionFlags.Async) !== 0, scoped)
    : undefined;
  const finalReturn = generatorType ?? ((flags & FunctionFlags.Async) !== 0 ? createPromiseReturnType(functionNode, unwrappedReturnType, scoped) : returnType);
  const predicate = getTypePredicateFromBody(functionNode, scoped);
  return { functionNode, returnType: finalReturn, unwrappedReturnType, ...(yieldType !== undefined ? { yieldType } : {}), ...(nextType !== undefined ? { nextType } : {}), ...(predicate !== undefined ? { predicate } : {}), diagnostics };
}

export function checkAndAggregateReturnExpressionTypes(functionNode: AstNode, checkMode: number, host: ReturnYieldAwaitHost): ReturnAggregation {
  const expressionTypes: Type[] = [];
  let hasReturnWithNoExpression = false;
  for (const statement of nodeTree(bodyOf(functionNode))) {
    if (statement.kind !== Kind.ReturnStatement) continue;
    const expression = expressionOf(statement);
    if (expression === undefined) {
      hasReturnWithNoExpression = true;
      continue;
    }
    const expressionType = host.getTypeOfExpression?.(expression) ?? host.unknownType;
    expressionTypes.push(getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(expressionType, host.getContextualReturnType?.(functionNode), (getFunctionFlags(functionNode) & FunctionFlags.Async) !== 0, host));
  }
  void checkMode;
  return { expressionTypes, hasReturnWithNoExpression, hasImplicitReturn: functionHasImplicitReturn(functionNode) };
}

export function functionHasImplicitReturn(functionNode: AstNode): boolean {
  const body = bodyOf(functionNode);
  if (body === undefined) return true;
  const statements = (body as { readonly statements?: readonly AstNode[] }).statements ?? [];
  const last = statements[statements.length - 1];
  return last === undefined || !statementExits(last);
}

export function mayReturnNever(functionNode: AstNode): boolean {
  const body = bodyOf(functionNode);
  if (body === undefined) return false;
  return nodeTree(body).some(node => node.kind === Kind.ThrowStatement || node.kind === Kind.ReturnStatement && expressionOf(node) === undefined);
}

export function checkAllCodePathsInNonVoidFunctionReturnOrThrow(functionNode: AstNode, returnType: Type, host: ReturnYieldAwaitHost): void {
  if ((returnType.flags & (TypeFlags.Void | TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Never)) !== 0) return;
  if (functionHasImplicitReturn(functionNode)) host.report?.(functionNode, "Function lacks ending return statement and return type does not include 'undefined'.");
}

export function isUnwrappedReturnTypeUndefinedVoidOrAny(functionNode: AstNode, returnType: Type, host: ReturnYieldAwaitHost): boolean {
  const unwrapped = unwrapReturnType(returnType, getFunctionFlags(functionNode), host);
  return (unwrapped.flags & (TypeFlags.Undefined | TypeFlags.Void | TypeFlags.Any | TypeFlags.Unknown)) !== 0;
}

export function checkReturnExpression(container: AstNode, unwrappedReturnType: Type, node: AstNode, expr: AstNode, exprType: Type, inConditionalExpression: boolean, host: ReturnYieldAwaitHost): void {
  const source = inConditionalExpression ? getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(exprType, unwrappedReturnType, false, host) : exprType;
  if (host.isTypeAssignableTo?.(source, unwrappedReturnType) === false) host.report?.(expr, "Type of return expression is not assignable to the function return type.");
  void container;
  void node;
}

export function checkAndAggregateYieldOperandTypes(functionNode: AstNode, checkMode: number, host: ReturnYieldAwaitHost): YieldAggregation {
  const yieldTypes: Type[] = [];
  const nextTypes: Type[] = [];
  let hasDelegatedYield = false;
  for (const node of nodeTree(bodyOf(functionNode))) {
    if (node.kind !== Kind.YieldExpression) continue;
    const expression = expressionOf(node);
    if (expression === undefined) {
      yieldTypes.push(host.undefinedType);
      continue;
    }
    const expressionType = host.getTypeOfExpression?.(expression) ?? host.unknownType;
    const delegated = Boolean((node as { readonly asteriskToken?: unknown }).asteriskToken);
    if (delegated) {
      hasDelegatedYield = true;
      yieldTypes.push(getYieldedTypeOfYieldExpression(node, expressionType, host.unknownType, (getFunctionFlags(functionNode) & FunctionFlags.Async) !== 0, host));
      nextTypes.push(getIterationType(expressionType, "next", host) ?? host.unknownType);
    } else {
      yieldTypes.push(getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(expressionType, host.getContextualIterationType?.(functionNode, "yield"), "yield", (getFunctionFlags(functionNode) & FunctionFlags.Async) !== 0, host));
    }
  }
  void checkMode;
  return { yieldTypes, nextTypes, hasDelegatedYield };
}

export function getYieldedTypeOfYieldExpression(node: AstNode, expressionType: Type, sentType: Type, isAsync: boolean, host: ReturnYieldAwaitHost): Type {
  const delegated = Boolean((node as { readonly asteriskToken?: unknown }).asteriskToken);
  if (!delegated) return expressionType;
  const yielded = getIterationType(expressionType, "yield", host) ?? host.unknownType;
  return isAsync ? getAwaitedTypeNoAlias(yielded, node, host) ?? yielded : yielded;
}

export function createPromiseType(promisedType: Type, host: ReturnYieldAwaitHost): Type {
  return host.createPromiseType?.(promisedType) ?? {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: { objectFlags: ObjectFlags.Reference, resolvedTypeArguments: [promisedType], promisedType } as object,
  };
}

export function createPromiseLikeType(promisedType: Type, host: ReturnYieldAwaitHost): Type {
  return {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: { objectFlags: ObjectFlags.Reference, resolvedTypeArguments: [promisedType], promisedType, promiseLike: true } as object,
  };
}

export function createPromiseReturnType(functionNode: AstNode, promisedType: Type, host: ReturnYieldAwaitHost): Type {
  const promiseType = createPromiseType(promisedType, host);
  if ((promiseType.flags & TypeFlags.AnyOrUnknown) !== 0) host.report?.(functionNode, "Async function return type could not be resolved to Promise.");
  return promiseType;
}

export function unwrapReturnType(returnType: Type, functionFlags: FunctionFlags, host: ReturnYieldAwaitHost): Type {
  if ((functionFlags & FunctionFlags.Async) !== 0) return getAwaitedTypeNoAlias(returnType, undefined, host) ?? returnType;
  if ((functionFlags & FunctionFlags.Generator) !== 0) return getIterationType(returnType, "return", host) ?? returnType;
  return returnType;
}

export function createGeneratorType(yieldType: Type, returnType: Type, nextType: Type, isAsyncGenerator: boolean, host: ReturnYieldAwaitHost): Type {
  return host.createGeneratorType?.(yieldType, returnType, nextType, isAsyncGenerator) ?? {
    id: nextSyntheticTypeId(),
    flags: TypeFlags.Object,
    data: {
      objectFlags: ObjectFlags.Reference,
      yieldType,
      returnType,
      nextType,
      asyncGenerator: isAsyncGenerator,
      resolvedTypeArguments: [yieldType, returnType, nextType],
    } as object,
  };
}

export function reportErrorsFromWidening(declaration: AstNode, type: Type, host: ReturnYieldAwaitHost): void {
  if ((type.flags & TypeFlags.Any) !== 0) host.report?.(declaration, "Return type implicitly has an 'any' type.");
}

export function getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(type: Type, contextualSignatureReturnType: Type | undefined, isAsync: boolean, host: ReturnYieldAwaitHost): Type {
  const contextual = isAsync && contextualSignatureReturnType !== undefined ? getAwaitedTypeNoAlias(contextualSignatureReturnType, undefined, host) ?? contextualSignatureReturnType : contextualSignatureReturnType;
  if (contextual !== undefined && literalFitsContext(type, contextual)) return type;
  return widenLiteral(type, host);
}

export function getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(type: Type, contextualSignatureReturnType: Type | undefined, kind: IterationTypeKind, isAsyncGenerator: boolean, host: ReturnYieldAwaitHost): Type {
  const contextual = contextualSignatureReturnType === undefined ? undefined : getIterationType(contextualSignatureReturnType, kind, host);
  const awaitedContext = isAsyncGenerator && contextual !== undefined ? getAwaitedTypeNoAlias(contextual, undefined, host) ?? contextual : contextual;
  if (awaitedContext !== undefined && literalFitsContext(type, awaitedContext)) return type;
  return widenLiteral(type, host);
}

export function checkGeneratorInstantiationAssignabilityToReturnType(returnType: Type, functionFlags: FunctionFlags, errorNode: AstNode, host: ReturnYieldAwaitHost): boolean {
  if ((functionFlags & FunctionFlags.Generator) === 0) return true;
  const yieldType = getIterationType(returnType, "yield", host);
  if (yieldType === undefined) {
    host.report?.(errorNode, "Generator return type must provide a yield iteration type.");
    return false;
  }
  return true;
}

export function getContextualIterationType(kind: IterationTypeKind, functionDecl: AstNode, host: ReturnYieldAwaitHost): Type | undefined {
  return host.getContextualIterationType?.(functionDecl, kind) ?? getIterationType(host.getContextualReturnType?.(functionDecl), kind, host);
}

export function getContextualReturnType(functionDecl: AstNode, host: ReturnYieldAwaitHost): Type | undefined {
  return host.getContextualReturnType?.(functionDecl) ?? annotatedType(functionDecl);
}

export function getTypePredicateFromBody(functionNode: AstNode, host: ReturnYieldAwaitHost): TypePredicate | undefined {
  const body = bodyOf(functionNode);
  if (body === undefined) return undefined;
  const returnExpression = singleReturnExpression(body);
  if (returnExpression === undefined) return undefined;
  return checkIfExpressionRefinesAnyParameter(functionNode, returnExpression, host);
}

export function checkIfExpressionRefinesAnyParameter(functionNode: AstNode, expression: AstNode, host: ReturnYieldAwaitHost): TypePredicate | undefined {
  const parameters = (functionNode as { readonly parameters?: readonly AstNode[] }).parameters ?? [];
  for (let index = 0; index < parameters.length; index += 1) {
    const refined = checkIfExpressionRefinesParameter(functionNode, expression, parameters[index]!, index, host);
    if (refined !== undefined) return refined;
  }
  return undefined;
}

export function checkIfExpressionRefinesParameter(functionNode: AstNode, expression: AstNode, parameter: AstNode, parameterIndex: number, host: ReturnYieldAwaitHost): TypePredicate | undefined {
  const parameterName = declarationName(parameter);
  if (parameterName.length === 0) return undefined;
  if (expressionReferencesParameter(expression, parameterName)) {
    const symbol = symbolOf(parameter);
    const type = symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
    return { kind: 1, parameterIndex, parameterName, ...(type !== undefined ? { type } : {}) };
  }
  void functionNode;
  return undefined;
}

function aggregateReturnTypes(returns: ReturnAggregation, contextual: Type | undefined, flags: FunctionFlags, host: ReturnYieldAwaitHost): Type | undefined {
  const types = [...returns.expressionTypes];
  if (returns.hasReturnWithNoExpression || returns.hasImplicitReturn) types.push(host.undefinedType);
  if (types.length === 0) return undefined;
  const union = types.length === 1 ? types[0]! : host.createUnionType?.(types) ?? unionType(types);
  return (flags & FunctionFlags.Async) !== 0 && contextual !== undefined ? getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(union, contextual, true, host) : union;
}

function getAwaitedTypeNoAlias(type: Type, errorNode: AstNode | undefined, host: ReturnYieldAwaitHost): Type | undefined {
  return host.getAwaitedType?.(type, errorNode) ?? (type.data as { readonly promisedType?: Type } | undefined)?.promisedType;
}

function getIterationType(type: Type | undefined, kind: IterationTypeKind, host: ReturnYieldAwaitHost): Type | undefined {
  if (type === undefined) return undefined;
  const data = type.data as { readonly yieldType?: Type; readonly returnType?: Type; readonly nextType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined;
  if (kind === "yield") return data?.yieldType ?? data?.resolvedTypeArguments?.[0];
  if (kind === "return") return data?.returnType ?? data?.resolvedTypeArguments?.[1];
  return data?.nextType ?? data?.resolvedTypeArguments?.[2] ?? host.unknownType;
}

function literalFitsContext(type: Type, contextual: Type): boolean {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return (contextual.flags & TypeFlags.StringLike) !== 0;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return (contextual.flags & TypeFlags.NumberLike) !== 0;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return (contextual.flags & TypeFlags.BooleanLike) !== 0;
  if ((contextual.flags & TypeFlags.Union) !== 0) return constituentTypes(contextual).some(part => literalFitsContext(type, part));
  return true;
}

function widenLiteral(type: Type, host: ReturnYieldAwaitHost): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return host.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return host.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return host.booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) return host.createUnionType?.(constituentTypes(type).map(part => widenLiteral(part, host))) ?? unionType(constituentTypes(type).map(part => widenLiteral(part, host)));
  return type;
}

function statementExits(statement: AstNode): boolean {
  if (statement.kind === Kind.ReturnStatement || statement.kind === Kind.ThrowStatement) return true;
  if (statement.kind === Kind.Block) {
    const statements = (statement as { readonly statements?: readonly AstNode[] }).statements ?? [];
    const last = statements[statements.length - 1];
    return last !== undefined && statementExits(last);
  }
  if (statement.kind === Kind.IfStatement) {
    const thenStatement = (statement as { readonly thenStatement?: AstNode }).thenStatement;
    const elseStatement = (statement as { readonly elseStatement?: AstNode }).elseStatement;
    return thenStatement !== undefined && elseStatement !== undefined && statementExits(thenStatement) && statementExits(elseStatement);
  }
  return false;
}

function singleReturnExpression(body: AstNode): AstNode | undefined {
  const returns = nodeTree(body).filter(node => node.kind === Kind.ReturnStatement);
  if (returns.length !== 1) return undefined;
  return expressionOf(returns[0]!);
}

function expressionReferencesParameter(expression: AstNode, parameterName: string): boolean {
  return nodeTree(expression).some(node => nodeText(node) === parameterName);
}

function getFunctionFlags(functionNode: AstNode): FunctionFlags {
  let flags = FunctionFlags.Normal;
  if (hasModifier(functionNode, "async")) flags |= FunctionFlags.Async;
  if (Boolean((functionNode as { readonly asteriskToken?: unknown }).asteriskToken)) flags |= FunctionFlags.Generator;
  return flags;
}

function withReturnDiagnostics(host: ReturnYieldAwaitHost, diagnostics: string[]): ReturnYieldAwaitHost {
  return {
    ...host,
    report: (node, message) => {
      diagnostics.push(message);
      host.report?.(node, message);
    },
  };
}

function annotatedType(node: AstNode): Type | undefined {
  return (node as { readonly type?: Type }).type;
}

function bodyOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly body?: AstNode } | undefined)?.body;
}

function expressionOf(node: AstNode): AstNode | undefined {
  return (node as { readonly expression?: AstNode }).expression;
}

function symbolOf(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
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

function hasModifier(node: AstNode, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] }).modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
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

let syntheticTypeId = -3_400_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
