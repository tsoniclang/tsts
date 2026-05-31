/**
 * Checker signature helpers.
 *
 * Port-focused slice from TS-Go `checker.go` for signature cloning,
 * instantiation, union/intersection signature merging, rest-parameter
 * handling, and type-argument arity helpers.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { Signature, Type, TypeMapper, TypeParameter } from "./types.js";
import { SignatureFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getMappedType, newTypeMapper } from "./mapper.js";

export function getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
  const data = type.data as { readonly declaredCallSignatures?: readonly Signature[]; readonly declaredConstructSignatures?: readonly Signature[] } | undefined;
  return kind === SignatureKind.Call ? data?.declaredCallSignatures ?? [] : data?.declaredConstructSignatures ?? [];
}

export function cloneSignature(signature: Signature): Signature {
  return {
    ...signature,
    parameters: [...signature.parameters],
    ...(signature.typeParameters === undefined ? {} : { typeParameters: [...signature.typeParameters] }),
    ...(signature.compositeSignatures === undefined ? {} : { compositeSignatures: [...signature.compositeSignatures] }),
  } as Signature;
}

export function getSignatureInstantiation(
  signature: Signature,
  typeArguments: readonly Type[],
  isJavaScript = false,
  inferredTypeParameters: readonly TypeParameter[] = [],
): Signature {
  const filled = fillMissingTypeArguments(typeArguments, signature.typeParameters ?? [], getMinTypeArgumentCount(signature.typeParameters ?? []), isJavaScript);
  const instantiated = getSignatureInstantiationWithoutFillingInTypeArguments(signature, filled);
  if (inferredTypeParameters.length === 0) return instantiated;
  return ({
    ...instantiated,
    ...(instantiated.resolvedReturnType === undefined ? {} : { resolvedReturnType: typeFromSignature({
        flags: SignatureFlags.None,
        parameters: [],
        typeParameters: inferredTypeParameters,
        minArgumentCount: 0,
        resolvedReturnType: instantiated.resolvedReturnType,
      }) }),
  }) as Signature;
}

export function getSignatureInstantiationWithoutFillingInTypeArguments(signature: Signature, typeArguments: readonly Type[]): Signature {
  const typeParameters = signature.typeParameters ?? [];
  if (typeParameters.length === 0 || typeArguments.length === 0) return signature;
  const mapper = newTypeMapper(typeParameters as unknown as readonly Type[], typeArguments);
  return instantiateSignature(signature, mapper);
}

export function instantiateSignature(signature: Signature, mapper: TypeMapper): Signature {
  return ({
    ...signature,
    ...(signature.thisParameter === undefined ? {} : { thisParameter: instantiateSymbol(signature.thisParameter, mapper) }),
    parameters: signature.parameters.map((parameter) => instantiateSymbol(parameter, mapper)),
    ...(signature.resolvedReturnType === undefined ? {} : { resolvedReturnType: instantiateType(signature.resolvedReturnType, mapper) }),
    mapper,
    target: signature.target ?? signature,
  }) as Signature;
}

export function instantiateSignatures(signatures: readonly Signature[], mapper: TypeMapper): readonly Signature[] {
  return signatures.map((signature) => instantiateSignature(signature, mapper));
}

export function getSingleCallOrConstructSignature(type: Type): Signature | undefined {
  const calls = getSignaturesOfType(type, SignatureKind.Call);
  const constructs = getSignaturesOfType(type, SignatureKind.Construct);
  if (calls.length + constructs.length !== 1) return undefined;
  return calls[0] ?? constructs[0];
}

export function getReturnTypeOfSignature(signature: Signature): Type {
  return signature.resolvedReturnType ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getMinTypeArgumentCount(typeParameters: readonly TypeParameter[]): number {
  let min = 0;
  for (const parameter of typeParameters) {
    if ((parameter as { readonly defaultType?: Type }).defaultType === undefined) min += 1;
  }
  return min;
}

export function fillMissingTypeArguments(
  typeArguments: readonly Type[],
  typeParameters: readonly TypeParameter[],
  minTypeArgumentCount: number,
  isJavaScript: boolean,
): readonly Type[] {
  const result = [...typeArguments];
  const defaultType = isJavaScript ? intrinsicType(TypeFlags.Any, "any") : intrinsicType(TypeFlags.Unknown, "unknown");
  while (result.length < typeParameters.length) {
    const parameter = typeParameters[result.length]!;
    result.push((parameter as { readonly defaultType?: Type }).defaultType ?? (result.length < minTypeArgumentCount ? defaultType : getDefaultFromTypeParameter(parameter)));
  }
  return result;
}

export function getDefaultFromTypeParameter(typeParameter: TypeParameter): Type {
  return (typeParameter as { readonly defaultType?: Type }).defaultType ?? typeParameter.constraint ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getParameterCount(signature: Signature): number {
  return signature.parameters.length;
}

export function getMinArgumentCount(signature: Signature): number {
  return signature.resolvedMinArgumentCount ?? signature.minArgumentCount;
}

export function hasEffectiveRestParameter(signature: Signature): boolean {
  return (signature.flags & SignatureFlags.HasRestParameter) !== 0
    || signature.parameters.some((parameter) => ((parameter as { readonly checkFlags?: number }).checkFlags ?? 0) & restParameterCheckFlag);
}

export function getParameterNameAtPosition(signature: Signature, position: number): string {
  return symbolName(signature.parameters[position]);
}

export function tryGetTypeAtPosition(signature: Signature, position: number): Type | undefined {
  const parameter = signature.parameters[position];
  if (parameter !== undefined) return getTypeOfSymbol(parameter);
  const restType = getEffectiveRestType(signature);
  return restType === undefined ? undefined : getIndexedAccessElementType(restType, position);
}

export function getTypeAtPosition(signature: Signature, position: number): Type {
  return tryGetTypeAtPosition(signature, position) ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getEffectiveRestType(signature: Signature): Type | undefined {
  if (!hasEffectiveRestParameter(signature)) return undefined;
  const last = signature.parameters[signature.parameters.length - 1];
  return getTypeOfSymbol(last);
}

export function combineUnionOrIntersectionMemberSignatures(left: Signature, right: Signature, isUnion: boolean): Signature {
  const typeParameters = left.typeParameters?.length ? left.typeParameters : right.typeParameters;
  const mapper = left.typeParameters?.length && right.typeParameters?.length
    ? newTypeMapper(right.typeParameters as unknown as readonly Type[], left.typeParameters as unknown as readonly Type[])
    : undefined;
  const parameters = combineUnionOrIntersectionParameters(left, right, mapper, isUnion);
  const thisParameter = combineUnionOrIntersectionThisParam(left.thisParameter, right.thisParameter, mapper, isUnion);
  const minArgumentCount = Math.max(left.minArgumentCount, right.minArgumentCount);
  return ({
    flags: (left.flags | right.flags) & (SignatureFlags.PropagatingFlags & ~SignatureFlags.HasRestParameter),
    ...(left.declaration === undefined ? {} : { declaration: left.declaration }),
    ...(typeParameters === undefined ? {} : { typeParameters }),
    ...(thisParameter === undefined ? {} : { thisParameter }),
    parameters,
    minArgumentCount,
    ...(combineReturnTypes(left, right, isUnion) === undefined ? {} : { resolvedReturnType: combineReturnTypes(left, right, isUnion) }),
    compositeKind: isUnion ? SignatureKind.Call : SignatureKind.Construct,
    compositeSignatures: [...left.compositeSignatures ?? [left], right],
    ...(mapper === undefined ? {} : { mapper }),
  }) as Signature;
}

export function combineUnionOrIntersectionParameters(
  left: Signature,
  right: Signature,
  mapper: TypeMapper | undefined,
  isUnion: boolean,
): readonly AstSymbol[] {
  const leftCount = getParameterCount(left);
  const rightCount = getParameterCount(right);
  const longest = leftCount >= rightCount ? left : right;
  const shorter = longest === left ? right : left;
  const longestCount = Math.max(leftCount, rightCount);
  const eitherHasRest = hasEffectiveRestParameter(left) || hasEffectiveRestParameter(right);
  const needsExtraRestElement = eitherHasRest && !hasEffectiveRestParameter(longest);
  const parameters: AstSymbol[] = [];
  for (let index = 0; index < longestCount; index += 1) {
    const longestType = maybeInstantiate(tryGetTypeAtPosition(longest, index) ?? intrinsicType(TypeFlags.Unknown, "unknown"), longest === right ? mapper : undefined);
    const shorterType = maybeInstantiate(tryGetTypeAtPosition(shorter, index) ?? intrinsicType(TypeFlags.Unknown, "unknown"), shorter === right ? mapper : undefined);
    const combinedType = isUnion ? unionType([longestType, shorterType]) : intersectionType([longestType, shorterType]);
    const leftName = getParameterNameAtPosition(left, index);
    const rightName = getParameterNameAtPosition(right, index);
    const name = leftName === rightName ? leftName : leftName || rightName || `arg${index}`;
    const optional = index >= getMinArgumentCount(left) && index >= getMinArgumentCount(right);
    parameters.push(makeParameterSymbol(name, combinedType, optional, eitherHasRest && !needsExtraRestElement && index === longestCount - 1));
  }
  if (needsExtraRestElement) {
    parameters.push(makeParameterSymbol("args", getTypeAtPosition(shorter, longestCount), false, true));
  }
  return parameters;
}

export function combineUnionOrIntersectionThisParam(
  left: AstSymbol | undefined,
  right: AstSymbol | undefined,
  mapper: TypeMapper | undefined,
  isUnion: boolean,
): AstSymbol | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  const leftType = getTypeOfSymbol(left) ?? intrinsicType(TypeFlags.Unknown, "unknown");
  const rightType = maybeInstantiate(getTypeOfSymbol(right) ?? intrinsicType(TypeFlags.Unknown, "unknown"), mapper);
  return makeParameterSymbol("this", isUnion ? unionType([leftType, rightType]) : intersectionType([leftType, rightType]), false, false);
}

export function appendSignatures(signatures: readonly Signature[], newSignatures: readonly Signature[]): readonly Signature[] {
  const result = [...signatures];
  for (const signature of newSignatures) {
    if (!result.some((existing) => signaturesIdentical(existing, signature))) result.push(signature);
  }
  return result;
}

export function appendIndexInfo(indexInfos: readonly { readonly keyType: Type; readonly valueType: Type; readonly isReadonly?: boolean }[], newInfo: { readonly keyType: Type; readonly valueType: Type; readonly isReadonly?: boolean }, union: boolean): readonly { readonly keyType: Type; readonly valueType: Type; readonly isReadonly?: boolean }[] {
  const result = [...indexInfos];
  const existingIndex = result.findIndex((info) => info.keyType === newInfo.keyType);
  if (existingIndex < 0) return [...result, newInfo];
  const existing = result[existingIndex]!;
  result[existingIndex] = {
    keyType: existing.keyType,
    valueType: union ? unionType([existing.valueType, newInfo.valueType]) : intersectionType([existing.valueType, newInfo.valueType]),
    isReadonly: union ? existing.isReadonly === true || newInfo.isReadonly === true : existing.isReadonly === true && newInfo.isReadonly === true,
  };
  return result;
}

export function findMixins(types: readonly Type[]): { readonly mixinFlags: readonly boolean[]; readonly mixinCount: number } {
  const mixinFlags = types.map(isMixinConstructorType);
  let constructorCount = 0;
  let mixinCount = 0;
  let firstMixin = -1;
  for (let index = 0; index < types.length; index += 1) {
    if (getSignaturesOfType(types[index]!, SignatureKind.Construct).length > 0) constructorCount += 1;
    if (mixinFlags[index]) {
      if (firstMixin < 0) firstMixin = index;
      mixinCount += 1;
    }
  }
  const adjusted = [...mixinFlags];
  if (constructorCount > 0 && constructorCount === mixinCount && firstMixin >= 0) {
    adjusted[firstMixin] = false;
    mixinCount -= 1;
  }
  return { mixinFlags: adjusted, mixinCount };
}

export function includeMixinType(type: Type, types: readonly Type[], mixinFlags: readonly boolean[], index: number): Type {
  const mixed: Type[] = [];
  for (let current = 0; current < types.length; current += 1) {
    if (current === index) mixed.push(type);
    else if (mixinFlags[current]) {
      const signature = getSignaturesOfType(types[current]!, SignatureKind.Construct)[0];
      if (signature !== undefined) mixed.push(getReturnTypeOfSignature(signature));
    }
  }
  return intersectionType(mixed);
}

function instantiateSymbol(symbol: AstSymbol, mapper: TypeMapper): AstSymbol {
  const type = getTypeOfSymbol(symbol);
  return type === undefined ? symbol : { ...symbol, syntheticType: instantiateType(type, mapper) } as AstSymbol;
}

function instantiateType(type: Type, mapper: TypeMapper): Type {
  return getMappedType(type, mapper);
}

function maybeInstantiate(type: Type, mapper: TypeMapper | undefined): Type {
  return mapper === undefined ? type : instantiateType(type, mapper);
}

function typeFromSignature(signature: Signature): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    data: {
      objectFlags: 0,
      declaredCallSignatures: [signature],
      declaredConstructSignatures: [],
      declaredProperties: [],
      indexInfos: [],
    },
  };
}

function combineReturnTypes(left: Signature, right: Signature, isUnion: boolean): Type | undefined {
  const leftType = left.resolvedReturnType;
  const rightType = right.resolvedReturnType;
  if (leftType === undefined) return rightType;
  if (rightType === undefined) return leftType;
  return isUnion ? unionType([leftType, rightType]) : intersectionType([leftType, rightType]);
}

function signaturesIdentical(left: Signature, right: Signature): boolean {
  if (left.parameters.length !== right.parameters.length) return false;
  if ((left.typeParameters?.length ?? 0) !== (right.typeParameters?.length ?? 0)) return false;
  for (let index = 0; index < left.parameters.length; index += 1) {
    if (symbolName(left.parameters[index]) !== symbolName(right.parameters[index])) return false;
  }
  return true;
}

function isMixinConstructorType(type: Type): boolean {
  const signatures = getSignaturesOfType(type, SignatureKind.Construct);
  return signatures.length === 1
    && signatures[0]!.parameters.length === 1
    && hasEffectiveRestParameter(signatures[0]!);
}

function makeParameterSymbol(name: string, type: Type, optional: boolean, rest: boolean): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.FunctionScopedVariable | (optional ? SymbolFlags.Optional : 0),
    declarations: [],
    syntheticType: rest ? arrayType(type) : type,
    checkFlags: rest ? restParameterCheckFlag : optional ? optionalParameterCheckFlag : 0,
  } as AstSymbol;
}

function getIndexedAccessElementType(type: Type, _position: number): Type | undefined {
  return (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.elementType
    ?? (type.data as { readonly elementType?: Type; readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[0];
}

function unionType(types: readonly Type[]): Type {
  return unionOrIntersectionType(TypeFlags.Union, types);
}

function intersectionType(types: readonly Type[]): Type {
  return unionOrIntersectionType(TypeFlags.Intersection, types);
}

function unionOrIntersectionType(flags: TypeFlags, types: readonly Type[]): Type {
  const unique = dedupeTypes(types);
  if (unique.length === 0) return intrinsicType(TypeFlags.Never, "never");
  if (unique.length === 1) return unique[0]!;
  return { flags, id: nextSyntheticTypeId(), data: { objectFlags: 0, types: unique } };
}

function arrayType(elementType: Type): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    data: {
      objectFlags: 0,
      elementType,
      resolvedTypeArguments: [elementType],
    },
  };
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: nextSyntheticTypeId(), data: { intrinsicName } };
}

function dedupeTypes(types: readonly Type[]): readonly Type[] {
  const seen = new Set<Type>();
  const result: Type[] = [];
  for (const type of types) {
    if (seen.has(type)) continue;
    seen.add(type);
    result.push(type);
  }
  return result;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

const restParameterCheckFlag = 1 << 0;
const optionalParameterCheckFlag = 1 << 1;
let syntheticTypeId = -300_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
