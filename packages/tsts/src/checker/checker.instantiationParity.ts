/**
 * Type instantiation and mapped-type support.
 *
 * Split from TS-Go `checker.go` sections covering `instantiateType`,
 * `instantiateSignature`, `instantiateAnonymousType`,
 * `instantiateMappedType`, reverse mapped types, mapped property modifiers,
 * and type alias instantiation keys. The implementation is intentionally
 * data-structure oriented so it can be shared by checker construction,
 * relation, contextual typing, and node-builder serialization.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import {
  AccessFlags,
  ObjectFlags,
  TypeFlags,
  type IndexInfo,
  type MappedType,
  type ObjectType,
  type Signature,
  type TupleType,
  type Type,
  type TypeAlias,
  type TypeMapper,
  type TypeParameter,
  type TypeReference,
} from "./types.js";

export type MappedTypeModifier = "preserve" | "include" | "exclude";
export type TypeInstantiationKind = "identity" | "simple" | "composite" | "deferred" | "reverse-mapped";

export interface InstantiationEnvironment {
  readonly mapper: TypeMapper | undefined;
  readonly alias?: TypeAlias;
  readonly cache: Map<string, Type>;
  readonly activeMappers: TypeMapper[];
  readonly createType: (flags: TypeFlags, data?: unknown) => Type;
  readonly createSymbol: (name: string, flags: SymbolFlags, type?: Type) => AstSymbol;
}

export interface MappedTypeModifiers {
  readonly readonlyModifier: MappedTypeModifier;
  readonly optionalModifier: MappedTypeModifier;
}

export interface InstantiatedMembers {
  readonly properties: readonly AstSymbol[];
  readonly callSignatures: readonly Signature[];
  readonly constructSignatures: readonly Signature[];
  readonly indexInfos: readonly IndexInfo[];
}

export interface TypeInstantiationPlan {
  readonly kind: TypeInstantiationKind;
  readonly source: Type;
  readonly mapper?: TypeMapper;
  readonly alias?: TypeAlias;
  readonly cacheKey?: string;
}

export function createInstantiationEnvironment(
  mapper: TypeMapper | undefined,
  createType: (flags: TypeFlags, data?: unknown) => Type,
  createSymbol: (name: string, flags: SymbolFlags, type?: Type) => AstSymbol,
  alias?: TypeAlias,
): InstantiationEnvironment {
  return {
    mapper,
    ...(alias === undefined ? {} : { alias }),
    cache: new Map(),
    activeMappers: [],
    createType,
    createSymbol,
  };
}

export function planTypeInstantiation(type: Type, environment: InstantiationEnvironment): TypeInstantiationPlan {
  const mapper = environment.mapper;
  if (mapper === undefined || mapper.kind === 0) return { kind: "identity", source: type };
  const cacheKey = getTypeInstantiationCacheKey(type, mapper, environment.alias);
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return { kind: "simple", source: type, mapper, cacheKey };
  if ((type.flags & TypeFlags.Object) !== 0) return withPlanAlias({ kind: "composite", source: type, mapper, cacheKey }, environment.alias);
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return withPlanAlias({ kind: "composite", source: type, mapper, cacheKey }, environment.alias);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0 || (type.flags & TypeFlags.Conditional) !== 0) {
    return withPlanAlias({ kind: "deferred", source: type, mapper, cacheKey }, environment.alias);
  }
  return { kind: "identity", source: type };
}

export function instantiateType(type: Type, environment: InstantiationEnvironment): Type {
  const plan = planTypeInstantiation(type, environment);
  if (plan.kind === "identity") return type;
  if (plan.cacheKey !== undefined) {
    const cached = environment.cache.get(plan.cacheKey);
    if (cached !== undefined) return cached;
  }
  const mapper = plan.mapper;
  if (mapper === undefined) return type;
  if (environment.activeMappers.includes(mapper)) return type;
  environment.activeMappers.push(mapper);
  const result = instantiateTypeWorker(type, mapper, environment);
  environment.activeMappers.pop();
  if (plan.cacheKey !== undefined) environment.cache.set(plan.cacheKey, result);
  return result;
}

export function instantiateTypeWorker(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const direct = mapTypeParameter(type, mapper);
  if (direct !== undefined) return direct;
  if ((type.flags & TypeFlags.Object) !== 0) return instantiateObjectType(type, mapper, environment);
  if ((type.flags & TypeFlags.Union) !== 0) return instantiateUnionOrIntersectionType(type, mapper, environment, TypeFlags.Union);
  if ((type.flags & TypeFlags.Intersection) !== 0) return instantiateUnionOrIntersectionType(type, mapper, environment, TypeFlags.Intersection);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return instantiateIndexedAccessType(type, mapper, environment);
  if ((type.flags & TypeFlags.Conditional) !== 0) return instantiateConditionalType(type, mapper, environment);
  if ((type.flags & TypeFlags.Substitution) !== 0) return instantiateSubstitutionType(type, mapper, environment);
  return type;
}

export function instantiateTypes(types: readonly Type[], mapper: TypeMapper, environment: InstantiationEnvironment): readonly Type[] {
  let changed = false;
  const result = types.map(type => {
    const instantiated = instantiateTypeWorker(type, mapper, environment);
    changed ||= instantiated !== type;
    return instantiated;
  });
  return changed ? result : types;
}

export function instantiateSignature(signature: Signature, mapper: TypeMapper, environment: InstantiationEnvironment): Signature {
  const typeParameters = instantiateTypeParameters(signature.typeParameters ?? [], mapper, environment);
  const parameters = instantiateSymbols(signature.parameters, mapper, environment, false);
  const thisParameter = signature.thisParameter === undefined
    ? undefined
    : instantiateSymbol(signature.thisParameter, mapper, environment, true);
  const resolvedReturnType = signature.resolvedReturnType === undefined
    ? undefined
    : instantiateTypeWorker(signature.resolvedReturnType, mapper, environment);
  return {
    flags: signature.flags,
    ...(signature.declaration === undefined ? {} : { declaration: signature.declaration }),
    ...(typeParameters.length === 0 ? {} : { typeParameters }),
    parameters,
    ...(thisParameter === undefined ? {} : { thisParameter }),
    ...(resolvedReturnType === undefined ? {} : { resolvedReturnType }),
    ...(signature.resolvedTypePredicate === undefined ? {} : { resolvedTypePredicate: signature.resolvedTypePredicate }),
    minArgumentCount: signature.minArgumentCount,
    ...(signature.resolvedMinArgumentCount === undefined ? {} : { resolvedMinArgumentCount: signature.resolvedMinArgumentCount }),
    target: signature.target ?? signature,
    mapper,
  };
}

export function instantiateIndexInfo(info: IndexInfo, mapper: TypeMapper, environment: InstantiationEnvironment): IndexInfo {
  const keyType = instantiateTypeWorker(info.keyType, mapper, environment);
  const valueType = instantiateTypeWorker(info.valueType, mapper, environment);
  if (keyType === info.keyType && valueType === info.valueType) return info;
  return {
    keyType,
    valueType,
    ...(info.isReadonly === undefined ? {} : { isReadonly: info.isReadonly }),
    ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
  };
}

export function instantiateSymbols(
  symbols: readonly AstSymbol[],
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
  mappingThisOnly: boolean,
): readonly AstSymbol[] {
  let changed = false;
  const result = symbols.map(symbol => {
    const instantiated = instantiateSymbol(symbol, mapper, environment, mappingThisOnly);
    changed ||= instantiated !== symbol;
    return instantiated;
  });
  return changed ? result : symbols;
}

export function instantiateSymbol(
  symbol: AstSymbol,
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
  mappingThisOnly: boolean,
): AstSymbol {
  const symbolType = (symbol as { readonly syntheticType?: Type }).syntheticType;
  if (symbolType === undefined) return symbol;
  if (mappingThisOnly && symbol.name !== "this") return symbol;
  const instantiatedType = instantiateTypeWorker(symbolType, mapper, environment);
  if (instantiatedType === symbolType) return symbol;
  return environment.createSymbol(symbol.name ?? symbol.escapedName ?? "", symbol.flags ?? SymbolFlags.None, instantiatedType);
}

export function instantiateTypeParameters(
  parameters: readonly TypeParameter[],
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
): readonly TypeParameter[] {
  if (parameters.length === 0) return parameters;
  return parameters.map(parameter => {
    const constraint = parameter.constraint === undefined ? undefined : instantiateTypeWorker(parameter.constraint, mapper, environment);
    return {
      ...parameter,
      ...(constraint === undefined ? {} : { constraint }),
      mapper,
    };
  });
}

export function instantiateObjectType(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const object = type.data as ObjectType | undefined;
  if (object === undefined) return type;
  if ((object.objectFlags & ObjectFlags.Mapped) !== 0) return instantiateMappedType(type, mapper, environment);
  if ((object.objectFlags & ObjectFlags.Reference) !== 0) return instantiateTypeReference(type, mapper, environment);
  const members = instantiateAnonymousTypeMembers(object, mapper, environment);
  return environment.createType(TypeFlags.Object, {
    ...object,
    objectFlags: object.objectFlags | ObjectFlags.Instantiated,
    declaredProperties: members.properties,
    declaredCallSignatures: members.callSignatures,
    declaredConstructSignatures: members.constructSignatures,
    indexInfos: members.indexInfos,
  });
}

export function instantiateAnonymousTypeMembers(
  object: ObjectType,
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
): InstantiatedMembers {
  const properties = instantiateSymbols(object.declaredProperties ?? [], mapper, environment, false);
  const callSignatures = (object.declaredCallSignatures ?? []).map(signature => instantiateSignature(signature, mapper, environment));
  const constructSignatures = (object.declaredConstructSignatures ?? []).map(signature => instantiateSignature(signature, mapper, environment));
  const indexInfos = (object.indexInfos ?? []).map(info => instantiateIndexInfo(info, mapper, environment));
  return { properties, callSignatures, constructSignatures, indexInfos };
}

export function instantiateTypeReference(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const reference = type.data as TypeReference | undefined;
  if (reference === undefined) return type;
  const target = reference.target ?? reference;
  const args = instantiateTypes(reference.resolvedTypeArguments ?? [], mapper, environment);
  return environment.createType(TypeFlags.Object, {
    ...reference,
    objectFlags: reference.objectFlags | ObjectFlags.Reference | ObjectFlags.Instantiated,
    target,
    resolvedTypeArguments: args,
  });
}

export function instantiateUnionOrIntersectionType(
  type: Type,
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
  flags: TypeFlags,
): Type {
  const data = type.data as { readonly types?: readonly Type[]; readonly objectFlags?: ObjectFlags } | undefined;
  const types = instantiateTypes(data?.types ?? [], mapper, environment);
  return environment.createType(flags, {
    ...data,
    types,
    objectFlags: (data?.objectFlags ?? ObjectFlags.None) | ObjectFlags.Instantiated,
  });
}

export function instantiateIndexedAccessType(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const data = type.data as { readonly objectType?: Type; readonly indexType?: Type; readonly accessFlags?: AccessFlags } | undefined;
  const objectType = data?.objectType === undefined ? undefined : instantiateTypeWorker(data.objectType, mapper, environment);
  const indexType = data?.indexType === undefined ? undefined : instantiateTypeWorker(data.indexType, mapper, environment);
  return environment.createType(TypeFlags.IndexedAccess, {
    ...(objectType === undefined ? {} : { objectType }),
    ...(indexType === undefined ? {} : { indexType }),
    accessFlags: data?.accessFlags ?? AccessFlags.None,
  });
}

export function instantiateConditionalType(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const data = type.data as {
    readonly checkType?: Type;
    readonly extendsType?: Type;
    readonly trueType?: Type;
    readonly falseType?: Type;
  } | undefined;
  return environment.createType(TypeFlags.Conditional, {
    ...(data?.checkType === undefined ? {} : { checkType: instantiateTypeWorker(data.checkType, mapper, environment) }),
    ...(data?.extendsType === undefined ? {} : { extendsType: instantiateTypeWorker(data.extendsType, mapper, environment) }),
    ...(data?.trueType === undefined ? {} : { trueType: instantiateTypeWorker(data.trueType, mapper, environment) }),
    ...(data?.falseType === undefined ? {} : { falseType: instantiateTypeWorker(data.falseType, mapper, environment) }),
  });
}

export function instantiateSubstitutionType(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const data = type.data as { readonly baseType?: Type; readonly constraint?: Type } | undefined;
  const baseType = data?.baseType === undefined ? type : instantiateTypeWorker(data.baseType, mapper, environment);
  const constraint = data?.constraint === undefined ? undefined : instantiateTypeWorker(data.constraint, mapper, environment);
  return environment.createType(TypeFlags.Substitution, {
    baseType,
    ...(constraint === undefined ? {} : { constraint }),
  });
}

export function instantiateMappedType(type: Type, mapper: TypeMapper, environment: InstantiationEnvironment): Type {
  const mapped = type.data as MappedType | undefined;
  if (mapped === undefined) return type;
  const typeParameter = mapped.typeParameter === undefined ? undefined : instantiateTypeParameter(mapped.typeParameter, mapper, environment);
  const constraintType = mapped.constraintType === undefined ? undefined : instantiateTypeWorker(mapped.constraintType, mapper, environment);
  const nameType = mapped.nameType === undefined ? undefined : instantiateTypeWorker(mapped.nameType, mapper, environment);
  const templateType = mapped.templateType === undefined ? undefined : instantiateTypeWorker(mapped.templateType, mapper, environment);
  return environment.createType(TypeFlags.Object, {
    ...mapped,
    objectFlags: mapped.objectFlags | ObjectFlags.Mapped | ObjectFlags.Instantiated,
    ...(typeParameter === undefined ? {} : { typeParameter }),
    ...(constraintType === undefined ? {} : { constraintType }),
    ...(nameType === undefined ? {} : { nameType }),
    ...(templateType === undefined ? {} : { templateType }),
  });
}

export function instantiateReverseMappedType(source: Type, mappedType: MappedType, constraintType: Type, environment: InstantiationEnvironment): Type {
  return environment.createType(TypeFlags.Object, {
    objectFlags: ObjectFlags.ReverseMapped | ObjectFlags.Instantiated,
    source,
    mappedType,
    constraintType,
  });
}

export function instantiateMappedTypeTemplate(
  mappedType: MappedType,
  key: Type,
  isOptional: boolean,
  mapper: TypeMapper,
  environment: InstantiationEnvironment,
): Type {
  const template = mappedType.templateType ?? key;
  const instantiated = instantiateTypeWorker(template, mapper, environment);
  return isOptional
    ? environment.createType(TypeFlags.Union, { types: [instantiated, optionalUndefinedType(environment)] })
    : instantiated;
}

export function getModifiedReadonlyState(current: boolean, modifier: MappedTypeModifier): boolean {
  if (modifier === "include") return true;
  if (modifier === "exclude") return false;
  return current;
}

export function getModifiedOptionalState(current: boolean, modifier: MappedTypeModifier): boolean {
  if (modifier === "include") return true;
  if (modifier === "exclude") return false;
  return current;
}

export function getMappedTypeModifiers(mappedType: MappedType): MappedTypeModifiers {
  const declaration = mappedType.declaration as {
    readonly readonlyToken?: { readonly kind?: Kind };
    readonly questionToken?: { readonly kind?: Kind };
  };
  return {
    readonlyModifier: tokenToModifier(declaration.readonlyToken),
    optionalModifier: tokenToModifier(declaration.questionToken),
  };
}

export function getTypeParameterFromMappedType(mappedType: MappedType): TypeParameter | undefined {
  return mappedType.typeParameter;
}

export function getConstraintTypeFromMappedType(mappedType: MappedType): Type | undefined {
  return mappedType.constraintType ?? mappedType.typeParameter?.constraint;
}

export function getNameTypeFromMappedType(mappedType: MappedType): Type | undefined {
  return mappedType.nameType;
}

export function getTemplateTypeFromMappedType(mappedType: MappedType): Type | undefined {
  return mappedType.templateType;
}

export function isMappedTypeWithKeyofConstraintDeclaration(mappedType: MappedType): boolean {
  const constraint = getConstraintTypeFromMappedType(mappedType);
  return constraint !== undefined && (constraint.flags & TypeFlags.Index) !== 0;
}

export function getApparentMappedTypeKeys(nameType: Type | undefined, targetType: Type): Type {
  return nameType ?? targetType;
}

export function forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(
  mappedType: MappedType,
  include: TypeFlags,
  stringsOnly: boolean,
  callback: (keyType: Type) => void,
): void {
  const constraint = getConstraintTypeFromMappedType(mappedType);
  if (constraint === undefined) return;
  if ((constraint.flags & include) !== 0) callback(constraint);
  const members = (constraint.data as { readonly declaredProperties?: readonly AstSymbol[] } | undefined)?.declaredProperties ?? [];
  for (const member of members) {
    const memberType = (member as { readonly syntheticType?: Type }).syntheticType;
    if (memberType === undefined) continue;
    if (stringsOnly && (memberType.flags & TypeFlags.StringLike) === 0) continue;
    if ((memberType.flags & include) !== 0) callback(memberType);
  }
}

export function getTypeInstantiationCacheKey(type: Type, mapper: TypeMapper, alias: TypeAlias | undefined): string {
  const aliasPart = alias === undefined
    ? ""
    : `${alias.symbol.name ?? alias.symbol.escapedName ?? ""}<${(alias.typeArguments ?? []).map(typeKey).join(",")}>`;
  return `${type.id}:${mapperKey(mapper)}:${aliasPart}`;
}

export function getTypeAliasInstantiationKey(typeArguments: readonly Type[], alias: TypeAlias): string {
  return `${alias.symbol.name ?? alias.symbol.escapedName ?? ""}<${typeArguments.map(typeKey).join(",")}>`;
}

export function getTypeInstantiationKey(typeArguments: readonly Type[], alias: TypeAlias | undefined, singleSignature: boolean): string {
  return `${singleSignature ? "single" : "type"}:${alias === undefined ? "" : getTypeAliasInstantiationKey(typeArguments, alias)}`;
}

export function couldContainTypeVariables(type: Type): boolean {
  if ((type.flags & TypeFlags.TypeVariable) !== 0) return true;
  const data = type.data as { readonly types?: readonly Type[]; readonly resolvedTypeArguments?: readonly Type[] } | undefined;
  return [...data?.types ?? [], ...data?.resolvedTypeArguments ?? []].some(couldContainTypeVariables);
}

export function isNonGenericTopLevelType(type: Type): boolean {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return false;
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return false;
  if ((type.flags & TypeFlags.Conditional) !== 0) return false;
  return !couldContainTypeVariables(type);
}

export function getObjectTypeInstantiation(
  type: Type,
  mapper: TypeMapper,
  alias: TypeAlias | undefined,
  environment: InstantiationEnvironment,
): Type {
  const scoped = { ...environment, mapper, ...(alias === undefined ? {} : { alias }) };
  return instantiateObjectType(type, mapper, scoped);
}

export function createInstantiatedSymbolTable(symbols: readonly AstSymbol[], mapper: TypeMapper, environment: InstantiationEnvironment): Map<string, AstSymbol> {
  const table = new Map<string, AstSymbol>();
  for (const symbol of instantiateSymbols(symbols, mapper, environment, false)) {
    table.set(symbol.name ?? symbol.escapedName ?? "", symbol);
  }
  return table;
}

export function instantiateIndexInfos(indexInfos: readonly IndexInfo[], mapper: TypeMapper, environment: InstantiationEnvironment): readonly IndexInfo[] {
  return indexInfos.map(info => instantiateIndexInfo(info, mapper, environment));
}

export function instantiateSignatures(signatures: readonly Signature[], mapper: TypeMapper, environment: InstantiationEnvironment): readonly Signature[] {
  return signatures.map(signature => instantiateSignature(signature, mapper, environment));
}

function mapTypeParameter(type: Type, mapper: TypeMapper): Type | undefined {
  const sources = mapper.sources ?? [];
  const targets = mapper.targets ?? [];
  const index = sources.findIndex(source => source === type || source.id === type.id);
  if (index >= 0) return targets[index];
  if (mapper.map !== undefined) {
    const mapped = mapper.map(type);
    if (mapped !== type) return mapped;
  }
  if (mapper.mapper1 !== undefined) return mapTypeParameter(type, mapper.mapper1);
  if (mapper.mapper2 !== undefined) return mapTypeParameter(type, mapper.mapper2);
  return undefined;
}

function instantiateTypeParameter(parameter: TypeParameter, mapper: TypeMapper, environment: InstantiationEnvironment): TypeParameter {
  const constraint = parameter.constraint === undefined ? undefined : instantiateTypeWorker(parameter.constraint, mapper, environment);
  return {
    ...parameter,
    ...(constraint === undefined ? {} : { constraint }),
    mapper,
  };
}

function withPlanAlias(plan: TypeInstantiationPlan, alias: TypeAlias | undefined): TypeInstantiationPlan {
  return alias === undefined ? plan : { ...plan, alias };
}

function mapperKey(mapper: TypeMapper): string {
  const sources = mapper.sources ?? [];
  const targets = mapper.targets ?? [];
  const parts: string[] = [`kind:${mapper.kind}`];
  for (let index = 0; index < sources.length; index += 1) {
    parts.push(`${typeKey(sources[index]!)}=${typeKey(targets[index] ?? sources[index]!)}`);
  }
  if (mapper.mapper1 !== undefined) parts.push(`m1:${mapperKey(mapper.mapper1)}`);
  if (mapper.mapper2 !== undefined) parts.push(`m2:${mapperKey(mapper.mapper2)}`);
  return parts.join("|");
}

function typeKey(type: Type): string {
  return `${type.flags}:${type.id}`;
}

function tokenToModifier(token: { readonly kind?: Kind } | undefined): MappedTypeModifier {
  if (token === undefined) return "preserve";
  if (token.kind === Kind.PlusToken) return "include";
  if (token.kind === Kind.MinusToken) return "exclude";
  return "include";
}

function optionalUndefinedType(environment: InstantiationEnvironment): Type {
  return environment.createType(TypeFlags.Undefined, { intrinsicName: "undefined" });
}

export function tupleTypeElementInstantiationPlan(tuple: TupleType, mapper: TypeMapper, environment: InstantiationEnvironment): readonly Type[] {
  const reference = tuple as TypeReference;
  return instantiateTypes(reference.resolvedTypeArguments ?? [], mapper, environment);
}

export function remapMappedPropertySymbol(
  symbol: AstSymbol,
  mappedType: MappedType,
  keyType: Type,
  environment: InstantiationEnvironment,
): AstSymbol {
  const modifiers = getMappedTypeModifiers(mappedType);
  const originalReadonly = Boolean((symbol as { readonly readonly?: boolean }).readonly);
  const originalOptional = ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0;
  const readonlyState = getModifiedReadonlyState(originalReadonly, modifiers.readonlyModifier);
  const optionalState = getModifiedOptionalState(originalOptional, modifiers.optionalModifier);
  const templateType = mappedType.templateType ?? keyType;
  const flags = optionalState ? (symbol.flags ?? 0) | SymbolFlags.Optional : (symbol.flags ?? 0) & ~SymbolFlags.Optional;
  return {
    ...symbol,
    flags,
    synthetic: true,
    syntheticType: templateType,
    readonly: readonlyState,
  } as AstSymbol;
}
