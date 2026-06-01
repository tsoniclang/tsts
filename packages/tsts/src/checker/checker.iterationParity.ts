/**
 * Iteration protocol checking.
 *
 * Ports the TS-Go checker.go iteration spine: for-of RHS checking,
 * Iterable/Iterator/IteratorResult decomposition, async-from-sync adaptation,
 * generator return-type extraction, and iteration diagnostics.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { TypeFlags, type Signature, type Type } from "./types.js";

export type IterationUse = "for-of" | "spread" | "yield-star" | "destructuring" | "async-for-of";
export type IterationTypeKind = "yield" | "return" | "next";
export type IterationDiagnosticKind =
  | "not-iterable"
  | "not-async-iterable"
  | "missing-next"
  | "missing-return"
  | "invalid-result"
  | "invalid-yield";

export interface IterationEnvironment {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly booleanType: Type;
  readonly readonlyArrayType?: Type;
  readonly arrayType?: Type;
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getCallSignaturesOfType?: (type: Type) => readonly Signature[];
  readonly getReturnTypeOfSignature?: (signature: Signature) => Type | undefined;
  readonly getGlobalType?: (name: string, arity: number) => Type | undefined;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createTypeReference?: (target: Type, args: readonly Type[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface IterationTypes {
  readonly yieldType?: Type;
  readonly returnType?: Type;
  readonly nextType?: Type;
}

export interface IterationResolution {
  readonly types: IterationTypes;
  readonly diagnostic?: IterationDiagnostic;
  readonly usedFastPath: boolean;
}

export interface IterationDiagnostic {
  readonly kind: IterationDiagnosticKind;
  readonly node?: AstNode;
  readonly message: string;
}

export interface IterationTypesResolver {
  readonly iterableTypeName: string;
  readonly iteratorTypeName: string;
  readonly iteratorResultTypeName: string;
  readonly methodName: string;
  readonly async: boolean;
}

export const syncIterationResolver: IterationTypesResolver = {
  iterableTypeName: "Iterable",
  iteratorTypeName: "Iterator",
  iteratorResultTypeName: "IteratorResult",
  methodName: "Symbol.iterator",
  async: false,
};

export const asyncIterationResolver: IterationTypesResolver = {
  iterableTypeName: "AsyncIterable",
  iteratorTypeName: "AsyncIterator",
  iteratorResultTypeName: "IteratorResult",
  methodName: "Symbol.asyncIterator",
  async: true,
};

export function checkIteratedTypeOrElementType(
  use: IterationUse,
  inputType: Type,
  sentType: Type,
  errorNode: AstNode,
  environment: IterationEnvironment,
): Type {
  const resolution = getIteratedTypeOrElementType(use, inputType, sentType, errorNode, true, environment);
  if (resolution.diagnostic !== undefined) environment.report?.(errorNode, resolution.diagnostic.message);
  return resolution.types.yieldType ?? environment.anyType;
}

export function getIteratedTypeOrElementType(
  use: IterationUse,
  inputType: Type,
  sentType: Type,
  errorNode: AstNode | undefined,
  checkAssignability: boolean,
  environment: IterationEnvironment,
): IterationResolution {
  const resolver = use === "async-for-of" ? asyncIterationResolver : syncIterationResolver;
  const types = getIterationTypesOfIterable(inputType, use, errorNode, resolver, environment);
  if (hasIterationTypes(types)) return { types, usedFastPath: true };
  const arrayElement = getArrayLikeElementType(inputType);
  if (arrayElement !== undefined) return { types: { yieldType: arrayElement, returnType: environment.undefinedType, nextType: sentType }, usedFastPath: true };
  const diagnostic = reportTypeNotIterableError(errorNode, inputType, resolver.async);
  void checkAssignability;
  return { types: {}, diagnostic, usedFastPath: false };
}

export function getIterationTypesOfGeneratorFunctionReturnType(
  typeKind: IterationTypeKind,
  returnType: Type,
  isAsyncGenerator: boolean,
  environment: IterationEnvironment,
): Type {
  const types = getIterationTypesOfGeneratorFunctionReturnTypeEx(returnType, isAsyncGenerator, environment);
  return getIterationType(types, typeKind) ?? environment.anyType;
}

export function getIterationTypesOfGeneratorFunctionReturnTypeEx(
  returnType: Type,
  isAsyncGenerator: boolean,
  environment: IterationEnvironment,
): IterationTypes {
  const resolver = isAsyncGenerator ? asyncIterationResolver : syncIterationResolver;
  return getIterationTypesOfIterator(returnType, resolver, undefined, environment).types;
}

export function getIterationTypesOfIterable(
  type: Type,
  use: IterationUse,
  errorNode: AstNode | undefined,
  resolver: IterationTypesResolver,
  environment: IterationEnvironment,
): IterationTypes {
  const fast = getIterationTypesOfIterableFast(type, resolver, environment);
  if (hasIterationTypes(fast)) return fast;
  const slow = getIterationTypesOfIterableSlow(type, resolver, errorNode, environment);
  if (hasIterationTypes(slow)) return slow;
  if (resolver.async && use === "async-for-of") {
    const sync = getIterationTypesOfIterable(type, "for-of", errorNode, syncIterationResolver, environment);
    return getAsyncFromSyncIterationTypes(sync, environment);
  }
  return {};
}

export function getIterationTypesOfIterableFast(
  type: Type,
  resolver: IterationTypesResolver,
  environment: IterationEnvironment,
): IterationTypes {
  if (isReferenceToGlobalType(type, resolver.iterableTypeName)) {
    const args = typeArguments(type);
    return {
      ...(args[0] === undefined ? {} : { yieldType: args[0] }),
      returnType: environment.undefinedType,
      nextType: environment.unknownType,
    };
  }
  return {};
}

export function getIterationTypesOfIterableSlow(
  type: Type,
  resolver: IterationTypesResolver,
  errorNode: AstNode | undefined,
  environment: IterationEnvironment,
): IterationTypes {
  const method = environment.getPropertyOfType?.(type, resolver.methodName);
  if (method === undefined) return {};
  const methodType = environment.getTypeOfSymbol?.(method);
  if (methodType === undefined) return {};
  const signatures = environment.getCallSignaturesOfType?.(methodType) ?? [];
  const signature = signatures[0];
  if (signature === undefined) return {};
  const iteratorType = environment.getReturnTypeOfSignature?.(signature) ?? signature.resolvedReturnType;
  if (iteratorType === undefined) return {};
  void errorNode;
  return getIterationTypesOfIterator(iteratorType, resolver, errorNode, environment).types;
}

export function getIterationTypesOfIterator(
  type: Type,
  resolver: IterationTypesResolver,
  errorNode: AstNode | undefined,
  environment: IterationEnvironment,
): IterationResolution {
  const fast = getIterationTypesOfIteratorFast(type, resolver, environment);
  if (hasIterationTypes(fast)) return { types: fast, usedFastPath: true };
  const slow = getIterationTypesOfIteratorSlow(type, resolver, errorNode, environment);
  if (hasIterationTypes(slow)) return { types: slow, usedFastPath: false };
  return {
    types: {},
    diagnostic: { kind: "missing-next", ...(errorNode === undefined ? {} : { node: errorNode }), message: "Iterator type must have a callable 'next' method." },
    usedFastPath: false,
  };
}

export function getIterationTypesOfIteratorFast(
  type: Type,
  resolver: IterationTypesResolver,
  environment: IterationEnvironment,
): IterationTypes {
  if (isReferenceToGlobalType(type, resolver.iteratorTypeName)) {
    const args = typeArguments(type);
    return {
      ...(args[0] === undefined ? {} : { yieldType: args[0] }),
      ...(args[1] === undefined ? { returnType: environment.undefinedType } : { returnType: args[1] }),
      ...(args[2] === undefined ? { nextType: environment.unknownType } : { nextType: args[2] }),
    };
  }
  return {};
}

export function getIterationTypesOfIteratorSlow(
  type: Type,
  resolver: IterationTypesResolver,
  errorNode: AstNode | undefined,
  environment: IterationEnvironment,
): IterationTypes {
  const next = environment.getPropertyOfType?.(type, "next");
  if (next === undefined) return {};
  const nextType = environment.getTypeOfSymbol?.(next);
  if (nextType === undefined) return {};
  const signatures = environment.getCallSignaturesOfType?.(nextType) ?? [];
  const signature = signatures[0];
  if (signature === undefined) return {};
  const resultType = environment.getReturnTypeOfSignature?.(signature) ?? signature.resolvedReturnType;
  if (resultType === undefined) return {};
  void resolver;
  void errorNode;
  return getIterationTypesOfIteratorResult(resultType, environment);
}

export function getIterationTypesOfIteratorResult(type: Type, environment: IterationEnvironment): IterationTypes {
  if (isReferenceToGlobalType(type, "IteratorResult")) {
    const args = typeArguments(type);
    return {
      ...(args[0] === undefined ? {} : { yieldType: args[0] }),
      ...(args[1] === undefined ? { returnType: environment.undefinedType } : { returnType: args[1] }),
      nextType: environment.unknownType,
    };
  }
  const value = environment.getPropertyOfType?.(type, "value");
  const done = environment.getPropertyOfType?.(type, "done");
  const valueType = value === undefined ? undefined : environment.getTypeOfSymbol?.(value);
  const doneType = done === undefined ? undefined : environment.getTypeOfSymbol?.(done);
  if (valueType === undefined) return {};
  return {
    yieldType: valueType,
    returnType: doneType !== undefined && (doneType.flags & TypeFlags.BooleanLiteral) !== 0 ? valueType : environment.undefinedType,
    nextType: environment.unknownType,
  };
}

export function getIterationTypesOfMethod(
  type: Type,
  resolver: IterationTypesResolver,
  methodName: string,
  errorNode: AstNode | undefined,
  environment: IterationEnvironment,
): IterationTypes {
  const method = environment.getPropertyOfType?.(type, methodName);
  if (method === undefined) return {};
  const methodType = environment.getTypeOfSymbol?.(method);
  if (methodType === undefined) return {};
  const signature = (environment.getCallSignaturesOfType?.(methodType) ?? [])[0];
  if (signature === undefined) return {};
  const returnType = environment.getReturnTypeOfSignature?.(signature) ?? signature.resolvedReturnType;
  if (returnType === undefined) return {};
  return getIterationTypesOfIterator(returnType, resolver, errorNode, environment).types;
}

export function getAsyncFromSyncIterationTypes(types: IterationTypes, environment: IterationEnvironment): IterationTypes {
  if (!hasIterationTypes(types)) return {};
  return {
    ...(types.yieldType === undefined ? {} : { yieldType: createPromiseLikeType(types.yieldType, environment) }),
    ...(types.returnType === undefined ? {} : { returnType: createPromiseLikeType(types.returnType, environment) }),
    ...(types.nextType === undefined ? {} : { nextType: types.nextType }),
  };
}

export function combineIterationTypes(types: readonly IterationTypes[], environment: IterationEnvironment): IterationTypes {
  const present = types.filter(hasIterationTypes);
  if (present.length === 0) return {};
  const yieldType = getIterationTypeUnion(present, item => item.yieldType, environment);
  const returnType = getIterationTypeUnion(present, item => item.returnType, environment);
  const nextType = getIterationTypeUnion(present, item => item.nextType, environment);
  return {
    ...(yieldType === undefined ? {} : { yieldType }),
    ...(returnType === undefined ? {} : { returnType }),
    ...(nextType === undefined ? {} : { nextType }),
  };
}

export function getIterationTypeUnion(
  types: readonly IterationTypes[],
  selector: (types: IterationTypes) => Type | undefined,
  environment: IterationEnvironment,
): Type | undefined {
  const selected = types.map(selector).filter((type): type is Type => type !== undefined);
  if (selected.length === 0) return undefined;
  if (selected.every(type => type === selected[0])) return selected[0];
  return environment.createUnionType?.(selected) ?? selected[0];
}

export function getIterationType(types: IterationTypes, typeKind: IterationTypeKind): Type | undefined {
  if (typeKind === "yield") return types.yieldType;
  if (typeKind === "return") return types.returnType;
  return types.nextType;
}

export function hasIterationTypes(types: IterationTypes): boolean {
  return types.yieldType !== undefined || types.returnType !== undefined || types.nextType !== undefined;
}

export function isYieldIteratorResult(type: Type, environment: IterationEnvironment): boolean {
  const done = environment.getPropertyOfType?.(type, "done");
  if (done === undefined) return true;
  const doneType = environment.getTypeOfSymbol?.(done);
  return doneType === undefined || booleanLiteralValue(doneType) === false;
}

export function isReturnIteratorResult(type: Type, environment: IterationEnvironment): boolean {
  const done = environment.getPropertyOfType?.(type, "done");
  if (done === undefined) return false;
  const doneType = environment.getTypeOfSymbol?.(done);
  return doneType !== undefined && booleanLiteralValue(doneType) === true;
}

export function isIteratorResult(type: Type, kind: IterationTypeKind, environment: IterationEnvironment): boolean {
  if (kind === "yield") return isYieldIteratorResult(type, environment);
  if (kind === "return") return isReturnIteratorResult(type, environment);
  return environment.getPropertyOfType?.(type, "value") !== undefined;
}

export function reportTypeNotIterableError(
  errorNode: AstNode | undefined,
  type: Type,
  allowAsyncIterables: boolean,
): IterationDiagnostic {
  const name = type.symbol?.name ?? type.symbol?.escapedName ?? "type";
  return {
    kind: allowAsyncIterables ? "not-async-iterable" : "not-iterable",
    ...(errorNode === undefined ? {} : { node: errorNode }),
    message: allowAsyncIterables
      ? `Type '${name}' must have a '[Symbol.asyncIterator]()' method that returns an async iterator.`
      : `Type '${name}' must have a '[Symbol.iterator]()' method that returns an iterator.`,
  };
}

export function getIterationDiagnosticDetails(use: IterationUse, inputType: Type, allowsStrings: boolean): readonly [string, boolean] {
  const typeName = inputType.symbol?.name ?? inputType.symbol?.escapedName ?? "type";
  if (allowsStrings && (inputType.flags & TypeFlags.StringLike) !== 0) return [`Type '${typeName}' can be iterated as a string.`, false];
  if (use === "async-for-of") return [`Type '${typeName}' is not an async iterable.`, true];
  if (use === "spread") return [`Spread types may only be created from iterable types.`, true];
  return [`Type '${typeName}' is not iterable.`, true];
}

export function isES2015OrLaterIterable(name: string): boolean {
  return name === "Iterable"
    || name === "IterableIterator"
    || name === "Iterator"
    || name === "IteratorResult"
    || name === "ReadonlyArray"
    || name === "Array"
    || name === "Map"
    || name === "Set"
    || name === "String";
}

export function createIterableType(iteratedType: Type, environment: IterationEnvironment): Type {
  const target = environment.getGlobalType?.("Iterable", 1);
  return target === undefined ? iteratedType : environment.createTypeReference?.(target, [iteratedType]) ?? iteratedType;
}

export function createArrayType(elementType: Type, readonlyArray: boolean, environment: IterationEnvironment): Type {
  const target = readonlyArray ? environment.readonlyArrayType : environment.arrayType;
  return target === undefined ? elementType : environment.createTypeReference?.(target, [elementType]) ?? elementType;
}

function createPromiseLikeType(type: Type, environment: IterationEnvironment): Type {
  const target = environment.getGlobalType?.("PromiseLike", 1) ?? environment.getGlobalType?.("Promise", 1);
  return target === undefined ? type : environment.createTypeReference?.(target, [type]) ?? type;
}

function getArrayLikeElementType(type: Type): Type | undefined {
  if ((type.flags & TypeFlags.StringLike) !== 0) return type;
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function isReferenceToGlobalType(type: Type, name: string): boolean {
  return type.symbol?.name === name || type.symbol?.escapedName === name;
}

function typeArguments(type: Type): readonly Type[] {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? [];
}

function booleanLiteralValue(type: Type): boolean | undefined {
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  return typeof value === "boolean" ? value : undefined;
}
