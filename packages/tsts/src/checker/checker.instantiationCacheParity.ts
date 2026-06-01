/**
 * Generic instantiation cache parity.
 *
 * TS-Go checker.go interns type/signature instantiations by target+mapper,
 * preserves alias identity, expands mapped/indexed access types lazily, and
 * avoids recursive instantiation through a depth guard. This module ports that
 * generic cache discipline for the split TSTS checker.
 */

import type { Symbol as AstSymbol } from "../ast/index.js";
import type { IndexInfo, Signature, Type, TypeMapper, TypeParameter, UnionOrIntersectionType } from "./types.js";
import { TypeFlags } from "./types.js";

export interface InstantiationCacheHost {
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly anyType: Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly createIndexedAccessType?: (objectType: Type, indexType: Type) => Type;
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly instantiateSignature?: (signature: Signature, mapper: TypeMapper | undefined) => Signature;
}

export interface InstantiationCacheState {
  readonly typeCache: Map<string, Type>;
  readonly signatureCache: Map<string, Signature>;
  readonly mapperCache: Map<string, TypeMapper>;
  depth: number;
  readonly maxDepth: number;
}

export interface TypeInstantiationRequest {
  readonly target: Type;
  readonly mapper?: TypeMapper;
  readonly aliasSymbol?: AstSymbol;
  readonly aliasTypeArguments?: readonly Type[];
}

export function createInstantiationCacheState(maxDepth = 100): InstantiationCacheState {
  return {
    typeCache: new Map(),
    signatureCache: new Map(),
    mapperCache: new Map(),
    depth: 0,
    maxDepth,
  };
}

export function instantiateType(request: TypeInstantiationRequest, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  if (request.mapper === undefined) return request.target;
  if (state.depth > state.maxDepth) return host.anyType;
  const key = typeInstantiationKey(request);
  const cached = state.typeCache.get(key);
  if (cached !== undefined) return cached;
  state.depth += 1;
  try {
    const instantiated = instantiateTypeWorker(request.target, request.mapper, state, host);
    const withAlias = attachAlias(instantiated, request.aliasSymbol, request.aliasTypeArguments);
    state.typeCache.set(key, withAlias);
    return withAlias;
  } finally {
    state.depth -= 1;
  }
}

export function instantiateTypeWorker(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return instantiateTypeParameter(type, mapper);
  if ((type.flags & TypeFlags.Union) !== 0) return instantiateUnionType(type, mapper, state, host);
  if ((type.flags & TypeFlags.Intersection) !== 0) return instantiateIntersectionType(type, mapper, state, host);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return instantiateIndexedAccessType(type, mapper, state, host);
  if ((type.flags & TypeFlags.Conditional) !== 0) return instantiateConditionalType(type, mapper, state, host);
  if ((type.flags & TypeFlags.Substitution) !== 0) return instantiateSubstitutionType(type, mapper, state, host);
  if ((type.flags & TypeFlags.TemplateLiteral) !== 0) return instantiateTemplateLiteralType(type, mapper, state, host);
  if ((type.flags & TypeFlags.StringMapping) !== 0) return instantiateStringMappingType(type, mapper, state, host);
  if ((type.flags & TypeFlags.Object) !== 0) return instantiateObjectType(type, mapper, state, host);
  return type;
}

export function instantiateTypes(types: readonly Type[], mapper: TypeMapper | undefined, state: InstantiationCacheState, host: InstantiationCacheHost): readonly Type[] {
  if (mapper === undefined || types.length === 0) return types;
  return types.map(type => instantiateType({ target: type, mapper }, state, host));
}

export function instantiateSignatureCached(signature: Signature, mapper: TypeMapper | undefined, state: InstantiationCacheState, host: InstantiationCacheHost): Signature {
  if (mapper === undefined) return signature;
  const key = signatureInstantiationKey(signature, mapper);
  const cached = state.signatureCache.get(key);
  if (cached !== undefined) return cached;
  const instantiated = host.instantiateSignature?.(signature, mapper) ?? instantiateSignatureWorker(signature, mapper, state, host);
  state.signatureCache.set(key, instantiated);
  return instantiated;
}

export function instantiateSignatureWorker(signature: Signature, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Signature {
  const resolvedReturnType = signature.resolvedReturnType === undefined ? undefined : instantiateType({ target: signature.resolvedReturnType, mapper }, state, host);
  const combinedMapper = combineTypeMappers(signature.mapper, mapper, state);
  return {
    ...signature,
    parameters: signature.parameters.map(parameter => instantiateSymbolType(parameter, mapper, state, host)),
    ...(resolvedReturnType === undefined ? {} : { resolvedReturnType }),
    ...(combinedMapper === undefined ? {} : { mapper: combinedMapper }),
  };
}

export function combineTypeMappers(left: TypeMapper | undefined, right: TypeMapper | undefined, state: InstantiationCacheState): TypeMapper | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  const key = `compose:${mapperKey(left)}:${mapperKey(right)}`;
  const cached = state.mapperCache.get(key);
  if (cached !== undefined) return cached;
  const mapper: TypeMapper = {
    kind: 1,
    mapper1: left,
    mapper2: right,
    map(type) {
      return right.map?.(left.map?.(type) ?? type) ?? left.map?.(type) ?? type;
    },
  };
  state.mapperCache.set(key, mapper);
  return mapper;
}

export function createTypeMapper(sources: readonly Type[], targets: readonly Type[], state: InstantiationCacheState): TypeMapper {
  const key = `mapper:${sources.map(typeKey).join(",")}=>${targets.map(typeKey).join(",")}`;
  const cached = state.mapperCache.get(key);
  if (cached !== undefined) return cached;
  const mapper: TypeMapper = {
    kind: 0,
    sources,
    targets,
    map(type) {
      const index = sources.findIndex(source => typeKey(source) === typeKey(type));
      return index >= 0 ? targets[index] ?? type : type;
    },
  };
  state.mapperCache.set(key, mapper);
  return mapper;
}

export function createInferenceMapper(inferred: ReadonlyMap<TypeParameter, Type>, state: InstantiationCacheState): TypeMapper {
  const sources = [...inferred.keys()].map(parameter => ({ flags: TypeFlags.TypeParameter, id: typeParameterId(parameter), data: parameter } as Type));
  const targets = [...inferred.values()];
  return createTypeMapper(sources, targets, state);
}

export function instantiateTypeParameter(type: Type, mapper: TypeMapper): Type {
  return mapper.map?.(type) ?? type;
}

export function instantiateUnionType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const parts = instantiateTypes(constituentTypes(type), mapper, state, host);
  if (parts.length === 0) return host.neverType;
  if (parts.length === 1) return parts[0]!;
  return host.createUnionType?.(parts) ?? unionType(parts);
}

export function instantiateIntersectionType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const parts = instantiateTypes(constituentTypes(type), mapper, state, host);
  if (parts.length === 0) return host.unknownType;
  if (parts.length === 1) return parts[0]!;
  return host.createIntersectionType?.(parts) ?? intersectionType(parts);
}

export function instantiateIndexedAccessType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as { readonly objectType?: Type; readonly indexType?: Type } | undefined;
  const objectType = data?.objectType === undefined ? host.unknownType : instantiateType({ target: data.objectType, mapper }, state, host);
  const indexType = data?.indexType === undefined ? host.unknownType : instantiateType({ target: data.indexType, mapper }, state, host);
  return host.createIndexedAccessType?.(objectType, indexType) ?? indexedAccessType(objectType, indexType);
}

export function instantiateConditionalType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as {
    readonly checkType?: Type;
    readonly extendsType?: Type;
    readonly trueType?: Type;
    readonly falseType?: Type;
  } | undefined;
  if (data === undefined) return type;
  const checkType = data.checkType === undefined ? host.unknownType : instantiateType({ target: data.checkType, mapper }, state, host);
  const extendsType = data.extendsType === undefined ? host.unknownType : instantiateType({ target: data.extendsType, mapper }, state, host);
  const trueType = data.trueType === undefined ? host.unknownType : instantiateType({ target: data.trueType, mapper }, state, host);
  const falseType = data.falseType === undefined ? host.unknownType : instantiateType({ target: data.falseType, mapper }, state, host);
  return {
    ...type,
    id: syntheticId(),
    data: { ...data, checkType, extendsType, trueType, falseType } as NonNullable<Type["data"]>,
  };
}

export function instantiateSubstitutionType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as { readonly baseType?: Type; readonly constraint?: Type } | undefined;
  if (data === undefined) return type;
  const baseType = data.baseType === undefined ? host.unknownType : instantiateType({ target: data.baseType, mapper }, state, host);
  const constraint = data.constraint === undefined ? host.unknownType : instantiateType({ target: data.constraint, mapper }, state, host);
  return { ...type, id: syntheticId(), data: { ...data, baseType, constraint } as NonNullable<Type["data"]> };
}

export function instantiateTemplateLiteralType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as { readonly texts?: readonly string[]; readonly types?: readonly Type[] } | undefined;
  if (data === undefined) return type;
  const types = instantiateTypes(data.types ?? [], mapper, state, host);
  return { ...type, id: syntheticId(), data: { ...data, types } as NonNullable<Type["data"]> };
}

export function instantiateStringMappingType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as { readonly target?: Type } | undefined;
  if (data?.target === undefined) return type;
  return { ...type, id: syntheticId(), data: { ...data, target: instantiateType({ target: data.target, mapper }, state, host) } as NonNullable<Type["data"]> };
}

export function instantiateObjectType(type: Type, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): Type {
  const data = type.data as { readonly properties?: readonly AstSymbol[]; readonly indexInfos?: readonly IndexInfo[] } | undefined;
  if (data === undefined) return type;
  const properties = (data.properties ?? []).map(property => instantiateSymbolType(property, mapper, state, host));
  const indexInfos = (data.indexInfos ?? host.getIndexInfosOfType?.(type) ?? []).map(info => instantiateIndexInfo(info, mapper, state, host));
  return { ...type, id: syntheticId(), data: { ...data, properties, indexInfos } as NonNullable<Type["data"]> };
}

export function instantiateIndexInfo(info: IndexInfo, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): IndexInfo {
  return {
    keyType: instantiateType({ target: info.keyType, mapper }, state, host),
    valueType: instantiateType({ target: info.valueType, mapper }, state, host),
    ...(info.isReadonly === true ? { isReadonly: true } : {}),
    ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
  };
}

export function instantiateSymbolType(symbol: AstSymbol, mapper: TypeMapper, state: InstantiationCacheState, host: InstantiationCacheHost): AstSymbol {
  const type = (symbol as { readonly type?: Type }).type;
  if (type === undefined) return symbol;
  return { ...symbol, type: instantiateType({ target: type, mapper }, state, host) } as AstSymbol;
}

export function eraseInstantiationCache(state: InstantiationCacheState): void {
  state.typeCache.clear();
  state.signatureCache.clear();
  state.mapperCache.clear();
  state.depth = 0;
}

export function instantiationCacheSize(state: InstantiationCacheState): number {
  return state.typeCache.size + state.signatureCache.size + state.mapperCache.size;
}

export function typeInstantiationKey(request: TypeInstantiationRequest): string {
  return [
    typeKey(request.target),
    mapperKey(request.mapper),
    request.aliasSymbol?.name ?? request.aliasSymbol?.escapedName ?? "",
    ...(request.aliasTypeArguments ?? []).map(typeKey),
  ].join("|");
}

export function signatureInstantiationKey(signature: Signature, mapper: TypeMapper | undefined): string {
  return [
    signature.declaration === undefined ? "" : String((signature.declaration as { readonly id?: unknown }).id ?? ""),
    signature.parameters.map(parameter => parameter.name ?? parameter.escapedName ?? "").join(","),
    mapperKey(mapper),
  ].join("|");
}

function attachAlias(type: Type, aliasSymbol: AstSymbol | undefined, aliasTypeArguments: readonly Type[] | undefined): Type {
  if (aliasSymbol === undefined && aliasTypeArguments === undefined) return type;
  return {
    ...type,
    ...(aliasSymbol === undefined ? {} : { aliasSymbol }),
    ...(aliasTypeArguments === undefined ? {} : { aliasTypeArguments }),
  };
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function unionType(types: readonly Type[]): Type {
  return { flags: TypeFlags.Union, id: syntheticId(), data: { types, objectFlags: 0 } as UnionOrIntersectionType };
}

function intersectionType(types: readonly Type[]): Type {
  return { flags: TypeFlags.Intersection, id: syntheticId(), data: { types, objectFlags: 0 } as UnionOrIntersectionType };
}

function indexedAccessType(objectType: Type, indexType: Type): Type {
  return { flags: TypeFlags.IndexedAccess, id: syntheticId(), data: { objectType, indexType } as NonNullable<Type["data"]> };
}

function mapperKey(mapper: TypeMapper | undefined): string {
  if (mapper === undefined) return "identity";
  return [
    mapper.kind,
    mapper.sources?.map(typeKey).join(",") ?? "",
    mapper.targets?.map(typeKey).join(",") ?? "",
    mapper.mapper1 === undefined ? "" : mapperKey(mapper.mapper1),
    mapper.mapper2 === undefined ? "" : mapperKey(mapper.mapper2),
  ].join(":");
}

function typeKey(type: Type): string {
  if (type.id !== undefined) return `id:${type.id}`;
  if (type.symbol?.name !== undefined) return `symbol:${type.symbol.name}`;
  return `flags:${type.flags}:${JSON.stringify(type.data ?? {})}`;
}

function typeParameterId(parameter: TypeParameter): number {
  return Number((parameter as { readonly id?: number }).id ?? syntheticId());
}

let nextSyntheticId = -7000;

function syntheticId(): number {
  nextSyntheticId -= 1;
  return nextSyntheticId;
}
