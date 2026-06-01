/**
 * Union/intersection reduction and mapped-type instantiation parity.
 *
 * TS-Go keeps this in the large `checker.go` body. TSTS splits it into the
 * same semantic cluster: union reduction, intersection reduction, mapped type
 * key remapping, modifier propagation, and reverse-mapped inference support.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type {
  IndexInfo,
  MappedType,
  Type,
  TypeMapper,
  TypeParameter,
  UnionOrIntersectionType,
} from "./types.js";
import { ObjectFlags, TypeFlags } from "./types.js";

export interface UnionMappedHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly undefinedType: Type;
  readonly emptyObjectType?: Type;
  readonly getApparentType?: (type: Type) => Type;
  readonly getBaseConstraintOfType?: (type: Type) => Type | undefined;
  readonly getConstraintOfTypeParameter?: (type: TypeParameter) => Type | undefined;
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getTemplateTypeFromMappedType?: (type: MappedType) => Type | undefined;
  readonly getNameTypeFromMappedType?: (type: MappedType) => Type | undefined;
  readonly getModifiersTypeFromMappedType?: (type: MappedType) => Type | undefined;
  readonly instantiateType?: (type: Type, mapper: TypeMapper | undefined) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[], objectFlags?: ObjectFlags) => Type;
  readonly createAnonymousType?: (properties: readonly AstSymbol[], indexInfos?: readonly IndexInfo[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface UnionReductionResult {
  readonly originalTypes: readonly Type[];
  readonly reducedTypes: readonly Type[];
  readonly objectFlags: ObjectFlags;
  readonly removedNever: number;
  readonly removedDuplicate: number;
  readonly removedSubtype: number;
}

export interface IntersectionReductionResult {
  readonly originalTypes: readonly Type[];
  readonly reducedTypes: readonly Type[];
  readonly objectFlags: ObjectFlags;
  readonly impossible: boolean;
  readonly empty: boolean;
}

export interface MappedTypeInstantiationResult {
  readonly source: Type;
  readonly mappedType: MappedType;
  readonly properties: readonly AstSymbol[];
  readonly indexInfos: readonly IndexInfo[];
  readonly result: Type;
}

export interface ReverseMappedTypeResult {
  readonly source: Type;
  readonly mappedType: MappedType;
  readonly constraintType: Type;
  readonly inferredProperties: ReadonlyMap<string, Type>;
}

let nextSyntheticTypeId = -1000;

export function getUnionTypeWithReduction(types: readonly Type[], host: UnionMappedHost): Type {
  const reduction = reduceUnionTypes(types, host);
  if (reduction.reducedTypes.length === 0) return host.neverType;
  if (reduction.reducedTypes.length === 1) return reduction.reducedTypes[0]!;
  return host.createUnionType?.(reduction.reducedTypes) ?? unionType(reduction.reducedTypes, reduction.objectFlags);
}

export function reduceUnionTypes(types: readonly Type[], host: UnionMappedHost): UnionReductionResult {
  const withoutNever = types.filter(type => (type.flags & TypeFlags.Never) === 0);
  const unique = deduplicateTypes(withoutNever);
  const withoutRedundantLiterals = removeRedundantLiteralTypes(unique);
  const withoutTemplateCovered = removeStringLiteralsMatchedByTemplateLiterals(withoutRedundantLiterals);
  const withoutSubtypes = removeSubtypes(withoutTemplateCovered, host);
  const objectFlags = getUnionObjectFlags(withoutSubtypes);
  return {
    originalTypes: types,
    reducedTypes: withoutSubtypes,
    objectFlags,
    removedNever: types.length - withoutNever.length,
    removedDuplicate: withoutNever.length - unique.length,
    removedSubtype: withoutTemplateCovered.length - withoutSubtypes.length,
  };
}

export function getIntersectionTypeWithReduction(types: readonly Type[], host: UnionMappedHost): Type {
  const reduction = reduceIntersectionTypes(types, host);
  if (reduction.impossible) return host.neverType;
  if (reduction.reducedTypes.length === 0) return host.emptyObjectType ?? anonymousType([], []);
  if (reduction.reducedTypes.length === 1) return reduction.reducedTypes[0]!;
  return host.createIntersectionType?.(reduction.reducedTypes, reduction.objectFlags) ?? intersectionType(reduction.reducedTypes, reduction.objectFlags);
}

export function reduceIntersectionTypes(types: readonly Type[], host: UnionMappedHost): IntersectionReductionResult {
  const unique = deduplicateTypes(types);
  if (unique.some(type => (type.flags & TypeFlags.Never) !== 0)) {
    return { originalTypes: types, reducedTypes: [host.neverType], objectFlags: ObjectFlags.IsNeverIntersection, impossible: true, empty: false };
  }
  const withoutTop = unique.filter(type => (type.flags & TypeFlags.AnyOrUnknown) === 0);
  const primitiveKinds = withoutTop.filter(isPrimitiveDomainType).map(typeDomainKey);
  const impossible = new Set(primitiveKinds).size > 1;
  if (impossible) {
    return { originalTypes: types, reducedTypes: [host.neverType], objectFlags: ObjectFlags.IsNeverIntersection, impossible: true, empty: false };
  }
  const reducedTypes = removeIntersectionSupertypes(withoutTop, host);
  const objectFlags = getIntersectionObjectFlags(reducedTypes);
  return { originalTypes: types, reducedTypes, objectFlags, impossible: false, empty: reducedTypes.length === 0 };
}

export function instantiateMappedType(source: Type, mappedType: MappedType, mapper: TypeMapper | undefined, host: UnionMappedHost): MappedTypeInstantiationResult {
  const template = host.getTemplateTypeFromMappedType?.(mappedType) ?? mappedType.templateType ?? host.unknownType;
  const nameType = host.getNameTypeFromMappedType?.(mappedType) ?? mappedType.nameType;
  const modifiersType = host.getModifiersTypeFromMappedType?.(mappedType) ?? mappedType.modifiersType;
  const properties = instantiateMappedTypeProperties(source, mappedType, template, nameType, modifiersType, mapper, host);
  const indexInfos = instantiateMappedTypeIndexInfos(source, mappedType, template, mapper, host);
  const result = host.createAnonymousType?.(properties, indexInfos) ?? anonymousType(properties, indexInfos);
  markMappedInstantiation(result, mappedType);
  return { source, mappedType, properties, indexInfos, result };
}

export function instantiateMappedTypeProperties(
  source: Type,
  mappedType: MappedType,
  template: Type,
  nameType: Type | undefined,
  modifiersType: Type | undefined,
  mapper: TypeMapper | undefined,
  host: UnionMappedHost,
): readonly AstSymbol[] {
  const sourceProperties = host.getPropertiesOfType?.(source) ?? [];
  const instantiated: AstSymbol[] = [];
  for (const property of sourceProperties) {
    const propertyName = symbolName(property);
    const remappedName = remapMappedPropertyName(propertyName, nameType, mapper, host);
    if (remappedName === undefined) continue;
    const optional = isMappedPropertyOptional(property, mappedType, modifiersType);
    const readonly = isMappedPropertyReadonly(property, mappedType, modifiersType);
    const valueType = host.instantiateType?.(template, mapper) ?? template;
    instantiated.push(createMappedSymbol(property, remappedName, valueType, optional, readonly));
  }
  return instantiated;
}

export function instantiateMappedTypeIndexInfos(
  source: Type,
  mappedType: MappedType,
  template: Type,
  mapper: TypeMapper | undefined,
  host: UnionMappedHost,
): readonly IndexInfo[] {
  const indexInfos = host.getIndexInfosOfType?.(source) ?? [];
  return indexInfos.map(info => ({
    keyType: host.instantiateType?.(info.keyType, mapper) ?? info.keyType,
    valueType: host.instantiateType?.(template, mapper) ?? template,
    ...(info.isReadonly === true || mappedTypeReadonly(mappedType) ? { isReadonly: true } : {}),
    ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
  }));
}

export function resolveMappedTypeMembers(source: Type, mappedType: MappedType, host: UnionMappedHost): Type {
  return instantiateMappedType(source, mappedType, undefined, host).result;
}

export function inferReverseMappedType(source: Type, mappedType: MappedType, constraintType: Type, host: UnionMappedHost): ReverseMappedTypeResult {
  const sourceProperties = host.getPropertiesOfType?.(source) ?? [];
  const constraintProperties = host.getPropertiesOfType?.(constraintType) ?? [];
  const inferred = new Map<string, Type>();
  for (const property of constraintProperties) {
    const name = symbolName(property);
    const sourceProperty = sourceProperties.find(candidate => symbolName(candidate) === name);
    if (sourceProperty === undefined) continue;
    const sourceType = symbolType(sourceProperty) ?? host.unknownType;
    inferred.set(name, sourceType);
  }
  return { source, mappedType, constraintType, inferredProperties: inferred };
}

export function getApparentMappedType(type: Type, host: UnionMappedHost): Type {
  const mapped = mappedTypeData(type);
  if (mapped === undefined) return host.getApparentType?.(type) ?? type;
  const constraint = mapped.constraintType ?? host.getBaseConstraintOfType?.(type);
  if (constraint === undefined) return type;
  return instantiateMappedType(constraint, mapped, undefined, host).result;
}

export function getConstraintTypeFromMappedType(mappedType: MappedType, host: UnionMappedHost): Type | undefined {
  if (mappedType.constraintType !== undefined) return mappedType.constraintType;
  if (mappedType.typeParameter !== undefined) return host.getConstraintOfTypeParameter?.(mappedType.typeParameter);
  return undefined;
}

export function getNameTypeFromMappedType(mappedType: MappedType, host: UnionMappedHost): Type | undefined {
  return host.getNameTypeFromMappedType?.(mappedType) ?? mappedType.nameType;
}

export function getTemplateTypeFromMappedType(mappedType: MappedType, host: UnionMappedHost): Type | undefined {
  return host.getTemplateTypeFromMappedType?.(mappedType) ?? mappedType.templateType;
}

export function getModifiersTypeFromMappedType(mappedType: MappedType, host: UnionMappedHost): Type | undefined {
  return host.getModifiersTypeFromMappedType?.(mappedType) ?? mappedType.modifiersType;
}

export function getHomomorphicTypeVariable(mappedType: MappedType): TypeParameter | undefined {
  const constraint = mappedType.constraintType;
  if (constraint === undefined || (constraint.flags & TypeFlags.Index) === 0) return undefined;
  const indexed = constraint.data as { readonly type?: Type } | undefined;
  const target = indexed?.type;
  return target !== undefined && (target.flags & TypeFlags.TypeParameter) !== 0 ? target.data as TypeParameter : undefined;
}

export function isHomomorphicMappedType(mappedType: MappedType): boolean {
  return getHomomorphicTypeVariable(mappedType) !== undefined;
}

export function mappedTypeReadonly(mappedType: MappedType): boolean {
  return Boolean((mappedType as { readonly readonly?: boolean }).readonly)
    || Boolean((mappedType.declaration as { readonly readonlyToken?: AstNode }).readonlyToken);
}

export function mappedTypeOptional(mappedType: MappedType): boolean {
  return Boolean((mappedType as { readonly optional?: boolean }).optional)
    || Boolean((mappedType.declaration as { readonly questionToken?: AstNode }).questionToken);
}

export function removeRedundantLiteralTypes(types: readonly Type[]): readonly Type[] {
  const includesString = types.some(type => (type.flags & TypeFlags.String) !== 0);
  const includesNumber = types.some(type => (type.flags & TypeFlags.Number) !== 0);
  const includesBigInt = types.some(type => (type.flags & TypeFlags.BigInt) !== 0);
  const includesBoolean = types.some(type => (type.flags & TypeFlags.Boolean) !== 0);
  return types.filter(type => {
    if (includesString && (type.flags & TypeFlags.StringLiteral) !== 0) return false;
    if (includesNumber && (type.flags & TypeFlags.NumberLiteral) !== 0) return false;
    if (includesBigInt && (type.flags & TypeFlags.BigIntLiteral) !== 0) return false;
    if (includesBoolean && (type.flags & TypeFlags.BooleanLiteral) !== 0) return false;
    return true;
  });
}

export function removeStringLiteralsMatchedByTemplateLiterals(types: readonly Type[]): readonly Type[] {
  const templates = types.filter(type => (type.flags & TypeFlags.TemplateLiteral) !== 0);
  if (templates.length === 0) return types;
  return types.filter(type => {
    if ((type.flags & TypeFlags.StringLiteral) === 0) return true;
    const value = stringLiteralValue(type);
    return templates.every(template => !templateLiteralCanMatchString(template, value));
  });
}

export function removeSubtypes(types: readonly Type[], host: UnionMappedHost): readonly Type[] {
  return types.filter((type, index) => {
    for (let otherIndex = 0; otherIndex < types.length; otherIndex += 1) {
      if (index === otherIndex) continue;
      const other = types[otherIndex]!;
      if (isStrictSubtypeOf(type, other, host)) return false;
    }
    return true;
  });
}

export function removeIntersectionSupertypes(types: readonly Type[], host: UnionMappedHost): readonly Type[] {
  return types.filter((type, index) => {
    for (let otherIndex = 0; otherIndex < types.length; otherIndex += 1) {
      if (index === otherIndex) continue;
      const other = types[otherIndex]!;
      if (isStrictSubtypeOf(other, type, host)) return false;
    }
    return true;
  });
}

export function distributeUnionOverIntersection(types: readonly Type[], host: UnionMappedHost): Type {
  const union = types.find(type => (type.flags & TypeFlags.Union) !== 0);
  if (union === undefined) return getIntersectionTypeWithReduction(types, host);
  const unionParts = constituentTypes(union);
  const fixed = types.filter(type => type !== union);
  const distributed = unionParts.map(part => getIntersectionTypeWithReduction([...fixed, part], host));
  return getUnionTypeWithReduction(distributed, host);
}

export function getCrossProductIntersections(types: readonly Type[], host: UnionMappedHost): readonly Type[] {
  const unionGroups = types.map(type => (type.flags & TypeFlags.Union) !== 0 ? constituentTypes(type) : [type]);
  const results: Type[] = [];
  const visit = (index: number, current: Type[]): void => {
    if (index === unionGroups.length) {
      results.push(getIntersectionTypeWithReduction(current, host));
      return;
    }
    for (const part of unionGroups[index]!) visit(index + 1, [...current, part]);
  };
  visit(0, []);
  return results;
}

export function everyType(type: Type, predicate: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.UnionOrIntersection) === 0
    ? predicate(type)
    : constituentTypes(type).every(predicate);
}

export function someType(type: Type, predicate: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.UnionOrIntersection) === 0
    ? predicate(type)
    : constituentTypes(type).some(predicate);
}

export function filterType(type: Type, predicate: (type: Type) => boolean, host: UnionMappedHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : host.neverType;
  return getUnionTypeWithReduction(constituentTypes(type).filter(predicate), host);
}

export function mapType(type: Type, mapper: (type: Type) => Type, host: UnionMappedHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return mapper(type);
  return getUnionTypeWithReduction(constituentTypes(type).map(mapper), host);
}

export function getReducedType(type: Type, host: UnionMappedHost): Type {
  if ((type.flags & TypeFlags.Union) !== 0) return getUnionTypeWithReduction(constituentTypes(type), host);
  if ((type.flags & TypeFlags.Intersection) !== 0) return getIntersectionTypeWithReduction(constituentTypes(type), host);
  return type;
}

export function isNeverReducedIntersection(type: Type): boolean {
  if ((type.flags & TypeFlags.Intersection) === 0) return false;
  const data = type.data as UnionOrIntersectionType | undefined;
  return Boolean(((data?.objectFlags ?? 0) & ObjectFlags.IsNeverIntersection) !== 0);
}

export function getPropertyOfUnionOrIntersectionType(type: Type, name: string, host: UnionMappedHost): AstSymbol | undefined {
  const parts = constituentTypes(type);
  if (parts.length === 0) return undefined;
  if ((type.flags & TypeFlags.Union) !== 0) {
    const candidates = parts.map(part => host.getPropertyOfType?.(part, name)).filter((candidate): candidate is AstSymbol => candidate !== undefined);
    return candidates.length === parts.length ? mergePropertySymbols(name, candidates, host) : undefined;
  }
  const first = parts.map(part => host.getPropertyOfType?.(part, name)).find((candidate): candidate is AstSymbol => candidate !== undefined);
  return first;
}

export function getPropertiesOfUnionOrIntersectionType(type: Type, host: UnionMappedHost): readonly AstSymbol[] {
  const names = new Set<string>();
  const properties: AstSymbol[] = [];
  for (const part of constituentTypes(type)) {
    for (const property of host.getPropertiesOfType?.(part) ?? []) {
      const name = symbolName(property);
      if (names.has(name)) continue;
      names.add(name);
      const merged = getPropertyOfUnionOrIntersectionType(type, name, host);
      if (merged !== undefined) properties.push(merged);
    }
  }
  return properties;
}

export function getIndexInfosOfUnionOrIntersectionType(type: Type, host: UnionMappedHost): readonly IndexInfo[] {
  const parts = constituentTypes(type);
  const keyNames = new Set<string>();
  const indexInfos: IndexInfo[] = [];
  for (const part of parts) {
    for (const info of host.getIndexInfosOfType?.(part) ?? []) {
      const keyName = typeKey(info.keyType);
      if (keyNames.has(keyName)) continue;
      keyNames.add(keyName);
      const matching = parts
        .map(candidate => findIndexInfo(host.getIndexInfosOfType?.(candidate) ?? [], info.keyType))
        .filter((candidate): candidate is IndexInfo => candidate !== undefined);
      if ((type.flags & TypeFlags.Union) !== 0 && matching.length !== parts.length) continue;
      indexInfos.push({
        keyType: info.keyType,
        valueType: (type.flags & TypeFlags.Union) !== 0
          ? getUnionTypeWithReduction(matching.map(candidate => candidate.valueType), host)
          : getIntersectionTypeWithReduction(matching.map(candidate => candidate.valueType), host),
        isReadonly: matching.every(candidate => candidate.isReadonly === true),
      });
    }
  }
  return indexInfos;
}

function deduplicateTypes(types: readonly Type[]): readonly Type[] {
  const seen = new Set<string>();
  const result: Type[] = [];
  for (const type of types) {
    const key = typeKey(type);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(type);
  }
  return result;
}

function isStrictSubtypeOf(source: Type, target: Type, host: UnionMappedHost): boolean {
  if (source === target || typeKey(source) === typeKey(target)) return false;
  if ((target.flags & TypeFlags.AnyOrUnknown) !== 0) return (source.flags & TypeFlags.AnyOrUnknown) === 0;
  if ((source.flags & TypeFlags.Never) !== 0) return true;
  if ((target.flags & TypeFlags.String) !== 0 && (source.flags & TypeFlags.StringLike) !== 0) return true;
  if ((target.flags & TypeFlags.Number) !== 0 && (source.flags & TypeFlags.NumberLike) !== 0) return true;
  if ((target.flags & TypeFlags.BigInt) !== 0 && (source.flags & TypeFlags.BigIntLike) !== 0) return true;
  const sourceConstraint = host.getBaseConstraintOfType?.(source);
  if (sourceConstraint !== undefined && typeKey(sourceConstraint) === typeKey(target)) return true;
  return false;
}

function isPrimitiveDomainType(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.BooleanLike | TypeFlags.ESSymbolLike)) !== 0;
}

function typeDomainKey(type: Type): string {
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return "bigint";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return "symbol";
  return "object";
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function getUnionObjectFlags(types: readonly Type[]): ObjectFlags {
  let flags = ObjectFlags.None;
  for (const type of types) flags |= objectFlagsOf(type) & ObjectFlags.PropagatingFlags;
  if (types.some(type => (type.flags & TypeFlags.Intersection) !== 0)) flags |= ObjectFlags.ContainsIntersections;
  return flags;
}

function getIntersectionObjectFlags(types: readonly Type[]): ObjectFlags {
  let flags = ObjectFlags.None;
  for (const type of types) flags |= objectFlagsOf(type) & ObjectFlags.PropagatingFlags;
  return flags;
}

function objectFlagsOf(type: Type): ObjectFlags {
  return ((type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None) as ObjectFlags;
}

function unionType(types: readonly Type[], objectFlags: ObjectFlags): Type {
  return { flags: TypeFlags.Union, id: nextSyntheticTypeId--, data: { types, objectFlags } as UnionOrIntersectionType };
}

function intersectionType(types: readonly Type[], objectFlags: ObjectFlags): Type {
  return { flags: TypeFlags.Intersection, id: nextSyntheticTypeId--, data: { types, objectFlags } as UnionOrIntersectionType };
}

function anonymousType(properties: readonly AstSymbol[], indexInfos: readonly IndexInfo[]): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId--,
    data: {
      objectFlags: ObjectFlags.Anonymous,
      properties,
      indexInfos,
    } as unknown as NonNullable<Type["data"]>,
  };
}

function markMappedInstantiation(type: Type, mappedType: MappedType): void {
  const data = type.data as { objectFlags?: ObjectFlags; mappedType?: MappedType } | undefined;
  if (data === undefined) return;
  data.objectFlags = ((data.objectFlags ?? ObjectFlags.None) | ObjectFlags.Mapped | ObjectFlags.Instantiated) as ObjectFlags;
  data.mappedType = mappedType;
}

function remapMappedPropertyName(name: string, nameType: Type | undefined, mapper: TypeMapper | undefined, host: UnionMappedHost): string | undefined {
  if (nameType === undefined) return name;
  const instantiated = host.instantiateType?.(nameType, mapper) ?? nameType;
  if ((instantiated.flags & TypeFlags.Never) !== 0) return undefined;
  const literal = stringLiteralValue(instantiated);
  return literal.length === 0 ? name : literal;
}

function isMappedPropertyOptional(property: AstSymbol, mappedType: MappedType, modifiersType: Type | undefined): boolean {
  if (mappedTypeOptional(mappedType)) return true;
  if (modifiersType !== undefined && (modifiersType.flags & TypeFlags.Undefined) !== 0) return true;
  return (property.flags ?? 0) === SymbolFlags.Optional || Boolean((property as { readonly optional?: boolean }).optional);
}

function isMappedPropertyReadonly(property: AstSymbol, mappedType: MappedType, modifiersType: Type | undefined): boolean {
  if (mappedTypeReadonly(mappedType)) return true;
  if (modifiersType !== undefined && (modifiersType.flags & TypeFlags.BooleanLiteral) !== 0) return true;
  return Boolean((property as { readonly readonly?: boolean }).readonly);
}

function createMappedSymbol(source: AstSymbol, name: string, type: Type, optional: boolean, readonly: boolean): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: (source.flags ?? SymbolFlags.Property) | (optional ? SymbolFlags.Optional : 0),
    declarations: source.declarations ?? [],
    ...(source.valueDeclaration === undefined ? {} : { valueDeclaration: source.valueDeclaration }),
    ...(readonly ? { readonly: true } : {}),
    type,
  } as AstSymbol;
}

function mergePropertySymbols(name: string, symbols: readonly AstSymbol[], host: UnionMappedHost): AstSymbol {
  const propertyTypes = symbols.map(symbol => symbolType(symbol) ?? host.unknownType);
  return {
    name,
    escapedName: name,
    flags: symbols.reduce((flags, symbol) => flags | (symbol.flags ?? 0), SymbolFlags.Property),
    declarations: symbols.flatMap(symbol => symbol.declarations ?? []),
    type: getUnionTypeWithReduction(propertyTypes, host),
  } as AstSymbol;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}

function symbolType(symbol: AstSymbol): Type | undefined {
  return (symbol as { readonly type?: Type }).type;
}

function mappedTypeData(type: Type): MappedType | undefined {
  const data = type.data as MappedType | undefined;
  return data !== undefined && ((data.objectFlags ?? 0) & ObjectFlags.Mapped) !== 0 ? data : undefined;
}

function findIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  const key = typeKey(keyType);
  return indexInfos.find(info => typeKey(info.keyType) === key);
}

function typeKey(type: Type): string {
  if (type.id !== undefined) return `id:${type.id}`;
  if (type.symbol !== undefined) return `symbol:${symbolName(type.symbol)}`;
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return `string:${stringLiteralValue(type)}`;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return `number:${String((type.data as { readonly value?: unknown } | undefined)?.value)}`;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return `bigint:${String((type.data as { readonly value?: unknown } | undefined)?.value)}`;
  return `flags:${type.flags}:${JSON.stringify(type.data ?? {})}`;
}

function stringLiteralValue(type: Type): string {
  return String((type.data as { readonly value?: unknown } | undefined)?.value ?? "");
}

function templateLiteralCanMatchString(template: Type, value: string): boolean {
  const data = template.data as { readonly texts?: readonly string[] } | undefined;
  const texts = data?.texts ?? [];
  if (texts.length === 0) return false;
  let position = 0;
  for (const text of texts) {
    const found = value.indexOf(text, position);
    if (found < position) return false;
    position = found + text.length;
  }
  return true;
}
