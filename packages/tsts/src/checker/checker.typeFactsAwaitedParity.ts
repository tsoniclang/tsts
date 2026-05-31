/**
 * Type facts, narrowing facts, awaited types, and thenable analysis.
 *
 * This ports the checker.go helpers that compute truthiness/nullability facts,
 * adjust types with facts, construct awaited types, detect thenables, and
 * unwrap Promise-like values.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind } from "../ast/index.js";
import type { Signature, Type, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export type TypeFacts = number;
export const TypeFacts = {
  None: 0 as TypeFacts,
  TypeofEQString: (1 << 0) as TypeFacts,
  TypeofEQNumber: (1 << 1) as TypeFacts,
  TypeofEQBigInt: (1 << 2) as TypeFacts,
  TypeofEQBoolean: (1 << 3) as TypeFacts,
  TypeofEQSymbol: (1 << 4) as TypeFacts,
  TypeofEQObject: (1 << 5) as TypeFacts,
  TypeofEQFunction: (1 << 6) as TypeFacts,
  EQNull: (1 << 7) as TypeFacts,
  EQUndefined: (1 << 8) as TypeFacts,
  Truthy: (1 << 9) as TypeFacts,
  Falsy: (1 << 10) as TypeFacts,
  NEUndefined: (1 << 11) as TypeFacts,
  NENull: (1 << 12) as TypeFacts,
  NEUndefinedOrNull: ((1 << 11) | (1 << 12)) as TypeFacts,
  All: ((1 << 13) - 1) as TypeFacts,
} as const;

export interface TypeFactsAwaitedHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly nullType: Type;
  readonly voidType: Type;
  readonly booleanType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly falseType?: Type;
  readonly trueType?: Type;
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getSignaturesOfType?: (type: Type, kind: SignatureKind) => readonly Signature[];
  readonly getPromisedTypeOfPromise?: (type: Type) => Type | undefined;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly createAwaitedType?: (type: Type) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface AwaitedTypeResult {
  readonly input: Type;
  readonly awaited: Type;
  readonly recursive: boolean;
  readonly thenable: boolean;
  readonly diagnostic?: string;
}

export function getTypeFacts(type: Type, mask: TypeFacts): TypeFacts {
  return getTypeFactsWorker(type, mask) & mask;
}

export function hasTypeFacts(type: Type, mask: TypeFacts): boolean {
  return (getTypeFacts(type, mask) & mask) !== 0;
}

export function getTypeFactsWorker(type: Type, callerOnlyNeeds: TypeFacts): TypeFacts {
  if ((type.flags & TypeFlags.StringLike) !== 0) return TypeFacts.TypeofEQString | truthinessFactsForPrimitive(type);
  if ((type.flags & TypeFlags.NumberLike) !== 0) return TypeFacts.TypeofEQNumber | truthinessFactsForPrimitive(type);
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return TypeFacts.TypeofEQBigInt | truthinessFactsForPrimitive(type);
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return TypeFacts.TypeofEQBoolean | truthinessFactsForPrimitive(type);
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return TypeFacts.TypeofEQSymbol | TypeFacts.Truthy;
  if ((type.flags & TypeFlags.Null) !== 0) return TypeFacts.EQNull | TypeFacts.Falsy;
  if ((type.flags & TypeFlags.Undefined) !== 0 || (type.flags & TypeFlags.Void) !== 0) return TypeFacts.EQUndefined | TypeFacts.Falsy;
  if ((type.flags & TypeFlags.Object) !== 0 || (type.flags & TypeFlags.NonPrimitive) !== 0) return TypeFacts.TypeofEQObject | TypeFacts.Truthy;
  if ((type.flags & TypeFlags.Union) !== 0) return getUnionTypeFacts(type, callerOnlyNeeds);
  if ((type.flags & TypeFlags.Intersection) !== 0) return getIntersectionTypeFacts(type, callerOnlyNeeds);
  if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return callerOnlyNeeds;
  if ((type.flags & TypeFlags.Never) !== 0) return TypeFacts.All;
  return TypeFacts.None;
}

export function getUnionTypeFacts(type: Type, callerOnlyNeeds: TypeFacts): TypeFacts {
  const parts = constituentTypes(type);
  if (parts.length === 0) return TypeFacts.None;
  let facts = TypeFacts.All;
  for (const part of parts) facts &= getTypeFactsWorker(part, callerOnlyNeeds);
  return facts;
}

export function getIntersectionTypeFacts(type: Type, callerOnlyNeeds: TypeFacts): TypeFacts {
  let facts = TypeFacts.None;
  for (const part of constituentTypes(type)) facts |= getTypeFactsWorker(part, callerOnlyNeeds);
  return facts;
}

export function getTypeWithFacts(type: Type, include: TypeFacts, host: TypeFactsAwaitedHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return (getTypeFacts(type, include) & include) !== 0 ? type : host.neverType;
  const kept = constituentTypes(type).filter(part => (getTypeFacts(part, include) & include) !== 0);
  if (kept.length === 0) return host.neverType;
  if (kept.length === 1) return kept[0]!;
  return host.createUnionType?.(kept) ?? unionType(kept);
}

export function getAdjustedTypeWithFacts(type: Type, facts: TypeFacts, host: TypeFactsAwaitedHost): Type {
  let adjusted = type;
  if ((facts & TypeFacts.NEUndefined) !== 0) adjusted = filterType(adjusted, part => (part.flags & TypeFlags.Undefined) === 0, host);
  if ((facts & TypeFacts.NENull) !== 0) adjusted = filterType(adjusted, part => (part.flags & TypeFlags.Null) === 0, host);
  if ((facts & TypeFacts.Truthy) !== 0) adjusted = filterType(adjusted, part => (getTypeFacts(part, TypeFacts.Falsy) & TypeFacts.Falsy) === 0, host);
  if ((facts & TypeFacts.Falsy) !== 0) adjusted = getTypeWithFacts(adjusted, TypeFacts.Falsy, host);
  return adjusted;
}

export function removeNullableByIntersection(type: Type, targetFacts: TypeFacts, otherFacts: TypeFacts, otherIncludesFacts: TypeFacts, otherType: Type, host: TypeFactsAwaitedHost): Type {
  if ((targetFacts & TypeFacts.NEUndefinedOrNull) === 0) return type;
  const nonNullable = getAdjustedTypeWithFacts(type, TypeFacts.NEUndefinedOrNull, host);
  if ((otherFacts & otherIncludesFacts) !== 0) return host.createIntersectionType?.([nonNullable, otherType]) ?? intersectionType([nonNullable, otherType]);
  return nonNullable;
}

export function recombineUnknownType(type: Type, host: TypeFactsAwaitedHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return type;
  const parts = constituentTypes(type);
  if (parts.some(part => (part.flags & TypeFlags.Unknown) !== 0)) return host.unknownType;
  return type;
}

export function getGlobalNonNullableTypeInstantiation(type: Type, host: TypeFactsAwaitedHost): Type {
  return getAdjustedTypeWithFacts(type, TypeFacts.NEUndefinedOrNull, host);
}

export function convertAutoToAny(type: Type, host: TypeFactsAwaitedHost): Type {
  return Boolean((type as { readonly auto?: boolean }).auto) ? host.anyType : type;
}

export function checkAwaitedType(type: Type, withAlias: boolean, errorNode: AstNode, diagnosticMessage: string, host: TypeFactsAwaitedHost): Type {
  const awaited = getAwaitedTypeEx(type, errorNode, diagnosticMessage, host);
  if (withAlias && awaited !== type) return host.createAwaitedType?.(awaited) ?? awaited;
  return awaited;
}

export function getAwaitedType(type: Type, host: TypeFactsAwaitedHost): Type {
  return getAwaitedTypeEx(type, undefined, "Type is not awaitable.", host);
}

export function getAwaitedTypeEx(type: Type, errorNode: AstNode | undefined, diagnosticMessage: string, host: TypeFactsAwaitedHost): Type {
  return computeAwaitedType(type, errorNode, diagnosticMessage, host, new Set()).awaited;
}

export function getAwaitedTypeNoAlias(type: Type, host: TypeFactsAwaitedHost): Type {
  return getAwaitedTypeNoAliasEx(type, undefined, "Type is not awaitable.", host);
}

export function getAwaitedTypeNoAliasEx(type: Type, errorNode: AstNode | undefined, diagnosticMessage: string, host: TypeFactsAwaitedHost): Type {
  return computeAwaitedType(type, errorNode, diagnosticMessage, host, new Set()).awaited;
}

export function computeAwaitedType(type: Type, errorNode: AstNode | undefined, diagnosticMessage: string, host: TypeFactsAwaitedHost, seen: Set<Type>): AwaitedTypeResult {
  if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return { input: type, awaited: type, recursive: false, thenable: false };
  if ((type.flags & TypeFlags.Union) !== 0) {
    const awaitedParts = constituentTypes(type).map(part => computeAwaitedType(part, errorNode, diagnosticMessage, host, seen).awaited);
    return { input: type, awaited: host.createUnionType?.(awaitedParts) ?? unionType(awaitedParts), recursive: false, thenable: awaitedParts.some(part => part !== type) };
  }
  if (seen.has(type)) {
    if (errorNode !== undefined) host.report?.(errorNode, "Type is referenced directly or indirectly in the fulfillment callback of its own then method.");
    return { input: type, awaited: host.neverType, recursive: true, thenable: true, diagnostic: "recursive awaited type" };
  }
  seen.add(type);
  const promised = getAwaitedTypeOfPromise(type, host);
  if (promised !== undefined) return computeAwaitedType(promised, errorNode, diagnosticMessage, host, seen);
  if (isThenableType(type, host)) {
    const callbackType = getThenCallbackFulfilledType(type, host);
    if (callbackType !== undefined) return computeAwaitedType(callbackType, errorNode, diagnosticMessage, host, seen);
    if (errorNode !== undefined) host.report?.(errorNode, diagnosticMessage);
    return { input: type, awaited: host.neverType, recursive: false, thenable: true, diagnostic: diagnosticMessage };
  }
  return { input: type, awaited: type, recursive: false, thenable: false };
}

export function isAwaitedTypeInstantiation(type: Type): boolean {
  return Boolean((type as { readonly awaitedInstantiation?: boolean }).awaitedInstantiation)
    || Boolean((type.data as { readonly awaitedType?: Type } | undefined)?.awaitedType);
}

export function isAwaitedTypeNeeded(type: Type, host: TypeFactsAwaitedHost): boolean {
  if ((type.flags & TypeFlags.AnyOrUnknown | TypeFlags.Never) !== 0) return false;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(part => isAwaitedTypeNeeded(part, host));
  return getAwaitedTypeOfPromise(type, host) !== undefined || isThenableType(type, host);
}

export function createAwaitedTypeIfNeeded(type: Type, host: TypeFactsAwaitedHost): Type {
  return isAwaitedTypeNeeded(type, host) ? host.createAwaitedType?.(type) ?? awaitedType(type) : type;
}

export function tryCreateAwaitedType(type: Type, host: TypeFactsAwaitedHost): Type | undefined {
  return isAwaitedTypeNeeded(type, host) ? createAwaitedTypeIfNeeded(type, host) : undefined;
}

export function unwrapAwaitedType(type: Type): Type {
  return (type.data as { readonly awaitedType?: Type } | undefined)?.awaitedType ?? type;
}

export function isThenableType(type: Type, host: TypeFactsAwaitedHost): boolean {
  const thenProperty = host.getPropertyOfType?.(type, "then");
  const thenType = thenProperty === undefined ? undefined : host.getTypeOfSymbol?.(thenProperty) ?? getTypeOfSymbol(thenProperty);
  const signatures = thenType === undefined ? [] : host.getSignaturesOfType?.(thenType, SignatureKind.Call) ?? [];
  return signatures.some(signature => signature.parameters.length >= 1);
}

export function getAwaitedTypeOfPromise(type: Type, host: TypeFactsAwaitedHost): Type | undefined {
  return getAwaitedTypeOfPromiseEx(type, undefined, "Type is not a Promise.", host);
}

export function getAwaitedTypeOfPromiseEx(type: Type, errorNode: AstNode | undefined, diagnosticMessage: string, host: TypeFactsAwaitedHost): Type | undefined {
  const promised = host.getPromisedTypeOfPromise?.(type) ?? (type.data as { readonly promisedType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.promisedType ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
  if (promised === undefined && errorNode !== undefined && looksPromiseLike(type)) host.report?.(errorNode, diagnosticMessage);
  return promised;
}

export function getPromisedTypeOfPromise(type: Type, host: TypeFactsAwaitedHost): Type | undefined {
  return host.getPromisedTypeOfPromise?.(type) ?? (type.data as { readonly promisedType?: Type } | undefined)?.promisedType;
}

export function getPromisedTypeOfPromiseEx(type: Type, errorNode: AstNode, thisTypeForErrorOut: { value?: Type }, host: TypeFactsAwaitedHost): Type | undefined {
  const promised = getPromisedTypeOfPromise(type, host);
  if (promised === undefined && isThenableType(type, host)) thisTypeForErrorOut.value = type;
  if (promised === undefined) host.report?.(errorNode, "Type is not a valid Promise.");
  return promised;
}

function getThenCallbackFulfilledType(type: Type, host: TypeFactsAwaitedHost): Type | undefined {
  const thenProperty = host.getPropertyOfType?.(type, "then");
  const thenType = thenProperty === undefined ? undefined : host.getTypeOfSymbol?.(thenProperty) ?? getTypeOfSymbol(thenProperty);
  const signatures = thenType === undefined ? [] : host.getSignaturesOfType?.(thenType, SignatureKind.Call) ?? [];
  const firstParameter = signatures[0]?.parameters[0];
  const callbackType = firstParameter === undefined ? undefined : host.getTypeOfSymbol?.(firstParameter) ?? getTypeOfSymbol(firstParameter);
  const callbackSignature = callbackType === undefined ? undefined : host.getSignaturesOfType?.(callbackType, SignatureKind.Call)?.[0];
  return callbackSignature?.parameters[0] === undefined ? undefined : host.getTypeOfSymbol?.(callbackSignature.parameters[0]) ?? getTypeOfSymbol(callbackSignature.parameters[0]);
}

function truthinessFactsForPrimitive(type: Type): TypeFacts {
  const value = literalValue(type);
  if (value === "" || value === 0 || value === false || isZeroBigInt(type)) return TypeFacts.Falsy;
  if (value !== undefined) return TypeFacts.Truthy;
  return TypeFacts.Truthy | TypeFacts.Falsy;
}

function isZeroBigInt(type: Type): boolean {
  const value = literalValue(type);
  return typeof value === "object" && value !== null && String(value) === "0";
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function filterType(type: Type, predicate: (type: Type) => boolean, host: TypeFactsAwaitedHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : host.neverType;
  const kept = constituentTypes(type).filter(predicate);
  if (kept.length === 0) return host.neverType;
  if (kept.length === 1) return kept[0]!;
  return host.createUnionType?.(kept) ?? unionType(kept);
}

function awaitedType(type: Type): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Object, data: { objectFlags: ObjectFlags.Reference, awaitedType: type } as object };
}

function looksPromiseLike(type: Type): boolean {
  const name = (type.data as { readonly name?: string; readonly intrinsicName?: string } | undefined)?.name
    ?? (type.data as { readonly intrinsicName?: string } | undefined)?.intrinsicName
    ?? "";
  return name.includes("Promise") || Boolean((type.data as { readonly promisedType?: Type } | undefined)?.promisedType);
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  if (unique.length === 1) return unique[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: unique, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function intersectionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  if (unique.length === 1) return unique[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Intersection, data: { types: unique, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

let syntheticTypeId = -3_600_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
