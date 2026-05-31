/**
 * Type construction and normalization support.
 *
 * Mirrors TS-Go checker.go sections for literal/fresh/regular types,
 * union/intersection construction, tuple target normalization, indexed access,
 * base constraints, and apparent/reduced type computation.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import {
  AccessFlags,
  ElementFlags,
  IndexFlags,
  ObjectFlags,
  TypeFlags,
  type IndexInfo,
  type LiteralType,
  type TupleElementInfo,
  type Type,
  type TypeAlias,
  type TypeParameter,
} from "./types.js";

export interface TypeConstructionEnvironment {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly undefinedType: Type;
  readonly nullType: Type;
  readonly voidType: Type;
  readonly emptyObjectType: Type;
  readonly readonlyArrayType?: Type;
  readonly arrayType?: Type;
  readonly createType: (flags: TypeFlags, data?: unknown, symbol?: AstSymbol) => Type;
  readonly createSymbol: (name: string, flags: SymbolFlags, type?: Type) => AstSymbol;
  readonly isTypeSubtypeOf?: (source: Type, target: Type) => boolean;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
}

export interface UnionConstructionOptions {
  readonly reduction: "none" | "literal" | "subtype";
  readonly alias?: TypeAlias;
  readonly origin?: Type;
}

export interface IntersectionConstructionOptions {
  readonly flags: number;
  readonly alias?: TypeAlias;
}

export interface NormalizedTuplePlan {
  readonly elementTypes: readonly Type[];
  readonly elementInfos: readonly TupleElementInfo[];
  readonly readonly: boolean;
  readonly minLength: number;
  readonly fixedLength: number;
  readonly hasRestElement: boolean;
  readonly combinedFlags: ElementFlags;
}

export function createLiteralType(
  value: string | number | boolean,
  regularType: Type,
  environment: TypeConstructionEnvironment,
): Type {
  const flags = typeof value === "string"
    ? TypeFlags.StringLiteral
    : typeof value === "number"
      ? TypeFlags.NumberLiteral
      : TypeFlags.BooleanLiteral;
  const literal = environment.createType(flags, { value }, regularType.symbol);
  const data = literal.data as LiteralType | undefined;
  if (data !== undefined) {
    data.regularType = regularType;
    data.freshType = literal;
  }
  return literal;
}

export function getRegularTypeOfLiteralType(type: Type): Type {
  return (type.data as LiteralType | undefined)?.regularType ?? type;
}

export function getFreshTypeOfLiteralType(type: Type, environment: TypeConstructionEnvironment): Type {
  const literal = type.data as LiteralType | undefined;
  if (literal?.freshType !== undefined) return literal.freshType;
  if (!isLiteralType(type)) return type;
  const fresh = environment.createType(type.flags, { ...(type.data as object), regularType: type }, type.symbol);
  (type.data as LiteralType | undefined)!.freshType = fresh;
  return fresh;
}

export function isLiteralType(type: Type): boolean {
  return (type.flags & TypeFlags.Literal) !== 0 || (type.flags & TypeFlags.UniqueESSymbol) !== 0;
}

export function isUnitType(type: Type): boolean {
  return isLiteralType(type)
    || (type.flags & TypeFlags.Null) !== 0
    || (type.flags & TypeFlags.Undefined) !== 0
    || (type.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function getBaseTypeOfLiteralType(type: Type, environment: TypeConstructionEnvironment): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return environment.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return environment.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return environment.booleanType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return environment.anyType;
  if ((type.flags & TypeFlags.EnumLiteral) !== 0) return getRegularTypeOfLiteralType(type);
  if ((type.flags & TypeFlags.Union) !== 0) {
    return getUnionType(constituentTypes(type).map(part => getBaseTypeOfLiteralType(part, environment)), environment, { reduction: "literal" });
  }
  return type;
}

export function getWidenedLiteralType(type: Type, environment: TypeConstructionEnvironment): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return environment.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return environment.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return environment.booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) return getUnionType(constituentTypes(type).map(part => getWidenedLiteralType(part, environment)), environment, { reduction: "literal" });
  return type;
}

export function getUnionType(
  types: readonly Type[],
  environment: TypeConstructionEnvironment,
  options: UnionConstructionOptions,
): Type {
  const flattened = flattenUnionTypes(types);
  const reduced = reduceUnionTypes(flattened, environment, options);
  if (reduced.length === 0) return environment.neverType;
  if (reduced.length === 1) return reduced[0]!;
  const objectFlags = getPropagatingFlagsOfTypes(reduced, TypeFlags.Never);
  return environment.createType(TypeFlags.Union, {
    types: sortTypes(reduced),
    objectFlags,
    ...(options.alias === undefined ? {} : { aliasSymbol: options.alias.symbol, aliasTypeArguments: options.alias.typeArguments }),
    ...(options.origin === undefined ? {} : { origin: options.origin }),
  });
}

export function getIntersectionType(
  types: readonly Type[],
  environment: TypeConstructionEnvironment,
  options: IntersectionConstructionOptions,
): Type {
  const flattened = flattenIntersectionTypes(types);
  const reduced = reduceIntersectionTypes(flattened, environment);
  if (reduced.some(type => (type.flags & TypeFlags.Never) !== 0)) return environment.neverType;
  if (reduced.length === 0) return environment.unknownType;
  if (reduced.length === 1) return reduced[0]!;
  const objectFlags = getPropagatingFlagsOfTypes(reduced, TypeFlags.Never);
  return environment.createType(TypeFlags.Intersection, {
    types: sortTypes(reduced),
    objectFlags,
    flags: options.flags,
    ...(options.alias === undefined ? {} : { aliasSymbol: options.alias.symbol, aliasTypeArguments: options.alias.typeArguments }),
  });
}

export function reduceUnionTypes(
  types: readonly Type[],
  environment: TypeConstructionEnvironment,
  options: UnionConstructionOptions,
): readonly Type[] {
  let result = removeDuplicateTypes(types);
  if (options.reduction !== "none") result = removeRedundantLiteralTypes(result, environment);
  if (options.reduction === "subtype") result = removeSubtypes(result, environment);
  if (result.some(type => (type.flags & TypeFlags.Any) !== 0)) return [environment.anyType];
  if (result.some(type => (type.flags & TypeFlags.Unknown) !== 0)) return [environment.unknownType];
  return result;
}

export function reduceIntersectionTypes(types: readonly Type[], environment: TypeConstructionEnvironment): readonly Type[] {
  let result = removeDuplicateTypes(types);
  if (result.some(type => (type.flags & TypeFlags.Never) !== 0)) return [environment.neverType];
  result = result.filter(type => (type.flags & TypeFlags.Unknown) === 0);
  if (result.some(type => (type.flags & TypeFlags.Null) !== 0) && result.some(type => (type.flags & TypeFlags.Undefined) !== 0)) return [environment.neverType];
  return removeRedundantSupertypes(result, environment);
}

export function flattenUnionTypes(types: readonly Type[]): readonly Type[] {
  const result: Type[] = [];
  for (const type of types) {
    if ((type.flags & TypeFlags.Union) !== 0) result.push(...constituentTypes(type));
    else result.push(type);
  }
  return result;
}

export function flattenIntersectionTypes(types: readonly Type[]): readonly Type[] {
  const result: Type[] = [];
  for (const type of types) {
    if ((type.flags & TypeFlags.Intersection) !== 0) result.push(...constituentTypes(type));
    else result.push(type);
  }
  return result;
}

export function removeDuplicateTypes(types: readonly Type[]): readonly Type[] {
  const result: Type[] = [];
  const seen = new Set<number>();
  for (const type of types) {
    if (seen.has(type.id)) continue;
    seen.add(type.id);
    result.push(type);
  }
  return result;
}

export function removeRedundantLiteralTypes(types: readonly Type[], environment: TypeConstructionEnvironment): readonly Type[] {
  const hasString = types.some(type => type === environment.stringType || (type.flags & TypeFlags.String) !== 0);
  const hasNumber = types.some(type => type === environment.numberType || (type.flags & TypeFlags.Number) !== 0);
  const hasBoolean = types.some(type => type === environment.booleanType || (type.flags & TypeFlags.Boolean) !== 0);
  return types.filter(type => {
    if (hasString && (type.flags & TypeFlags.StringLiteral) !== 0) return false;
    if (hasNumber && (type.flags & TypeFlags.NumberLiteral) !== 0) return false;
    if (hasBoolean && (type.flags & TypeFlags.BooleanLiteral) !== 0) return false;
    return true;
  });
}

export function removeSubtypes(types: readonly Type[], environment: TypeConstructionEnvironment): readonly Type[] {
  return types.filter((source, sourceIndex) => {
    for (let targetIndex = 0; targetIndex < types.length; targetIndex += 1) {
      if (sourceIndex === targetIndex) continue;
      const target = types[targetIndex]!;
      if (environment.isTypeSubtypeOf?.(source, target) === true) return false;
    }
    return true;
  });
}

export function removeRedundantSupertypes(types: readonly Type[], environment: TypeConstructionEnvironment): readonly Type[] {
  return types.filter((source, sourceIndex) => {
    for (let targetIndex = 0; targetIndex < types.length; targetIndex += 1) {
      if (sourceIndex === targetIndex) continue;
      const target = types[targetIndex]!;
      if (environment.isTypeSubtypeOf?.(target, source) === true) return false;
    }
    return true;
  });
}

export function normalizeTupleType(
  elementTypes: readonly Type[],
  elementInfos: readonly TupleElementInfo[],
  readonlyTuple: boolean,
): NormalizedTuplePlan {
  const normalizedTypes: Type[] = [];
  const normalizedInfos: TupleElementInfo[] = [];
  for (let index = 0; index < elementTypes.length; index += 1) {
    const elementType = elementTypes[index]!;
    const info = elementInfos[index] ?? { flags: ElementFlags.Required };
    normalizedTypes.push(elementType);
    normalizedInfos.push(info);
  }
  const fixedLength = normalizedInfos.filter(info => (info.flags & ElementFlags.Variable) === 0).length;
  const minLength = normalizedInfos.filter(info => (info.flags & ElementFlags.Required) !== 0).length;
  const hasRestElement = normalizedInfos.some(info => (info.flags & ElementFlags.Rest) !== 0);
  const combinedFlags = normalizedInfos.reduce((flags, info) => flags | info.flags, 0 as ElementFlags);
  return {
    elementTypes: normalizedTypes,
    elementInfos: normalizedInfos,
    readonly: readonlyTuple,
    minLength,
    fixedLength,
    hasRestElement,
    combinedFlags,
  };
}

export function createTupleType(
  elementTypes: readonly Type[],
  elementInfos: readonly TupleElementInfo[],
  readonlyTuple: boolean,
  environment: TypeConstructionEnvironment,
): Type {
  const plan = normalizeTupleType(elementTypes, elementInfos, readonlyTuple);
  return environment.createType(TypeFlags.Object, {
    objectFlags: ObjectFlags.Tuple | ObjectFlags.Reference,
    resolvedTypeArguments: plan.elementTypes,
    minLength: plan.minLength,
    fixedLength: plan.fixedLength,
    hasRestElement: plan.hasRestElement,
    combinedFlags: plan.combinedFlags,
    readonly: plan.readonly,
    elementInfo: plan.elementInfos,
  });
}

export function getIndexedAccessType(
  objectType: Type,
  indexType: Type,
  accessFlags: AccessFlags,
  accessNode: AstNode | undefined,
  environment: TypeConstructionEnvironment,
): Type {
  const propertyType = getPropertyTypeForIndexType(objectType, indexType, accessFlags, accessNode, environment);
  if (propertyType !== undefined) return propertyType;
  if ((objectType.flags & TypeFlags.AnyOrUnknown) !== 0) return objectType;
  return environment.createType(TypeFlags.IndexedAccess, { objectType, indexType, accessFlags });
}

export function getPropertyTypeForIndexType(
  objectType: Type,
  indexType: Type,
  accessFlags: AccessFlags,
  accessNode: AstNode | undefined,
  environment: TypeConstructionEnvironment,
): Type | undefined {
  const name = getPropertyNameFromIndex(indexType, accessNode);
  if (name !== undefined) {
    const property = environment.getPropertiesOfType?.(objectType).find(symbol => symbolName(symbol) === name);
    const propertyType = (property as { readonly syntheticType?: Type } | undefined)?.syntheticType;
    if (propertyType !== undefined) return includeUndefinedForUncheckedAccess(propertyType, accessFlags, environment);
  }
  const indexInfo = findApplicableIndexInfo(environment.getIndexInfosOfType?.(objectType) ?? [], indexType);
  return indexInfo === undefined ? undefined : includeUndefinedForUncheckedAccess(indexInfo.valueType, accessFlags, environment);
}

export function findApplicableIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find(info => isApplicableIndexType(keyType, info.keyType));
}

export function isApplicableIndexType(source: Type, target: Type): boolean {
  if ((target.flags & TypeFlags.StringLike) !== 0 && ((source.flags & TypeFlags.StringLike) !== 0 || (source.flags & TypeFlags.NumberLike) !== 0)) return true;
  if ((target.flags & TypeFlags.NumberLike) !== 0 && (source.flags & TypeFlags.NumberLike) !== 0) return true;
  if ((target.flags & TypeFlags.ESSymbolLike) !== 0 && (source.flags & TypeFlags.ESSymbolLike) !== 0) return true;
  return source.id === target.id;
}

export function includeUndefinedForUncheckedAccess(type: Type, accessFlags: AccessFlags, environment: TypeConstructionEnvironment): Type {
  if ((accessFlags & AccessFlags.IncludeUndefined) === 0) return type;
  return getUnionType([type, environment.undefinedType], environment, { reduction: "literal" });
}

export function getBaseConstraintOfType(type: Type, environment: TypeConstructionEnvironment): Type | undefined {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return (type.data as TypeParameter | undefined)?.constraint;
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getConstraintOfIndexedAccess(type, environment);
  if ((type.flags & TypeFlags.Conditional) !== 0) return getConstraintOfConditionalType(type, environment);
  return undefined;
}

export function getBaseConstraintOrType(type: Type, environment: TypeConstructionEnvironment): Type {
  return getBaseConstraintOfType(type, environment) ?? type;
}

export function getConstraintOfIndexedAccess(type: Type, environment: TypeConstructionEnvironment): Type | undefined {
  const data = type.data as { readonly objectType?: Type; readonly indexType?: Type; readonly constraint?: Type } | undefined;
  if (data?.constraint !== undefined) return data.constraint;
  if (data?.objectType === undefined || data.indexType === undefined) return undefined;
  return getIndexedAccessType(getBaseConstraintOrType(data.objectType, environment), data.indexType, AccessFlags.None, undefined, environment);
}

export function getConstraintOfConditionalType(type: Type, environment: TypeConstructionEnvironment): Type | undefined {
  const data = type.data as { readonly trueType?: Type; readonly falseType?: Type } | undefined;
  if (data?.trueType === undefined || data.falseType === undefined) return undefined;
  return getUnionType([data.trueType, data.falseType], environment, { reduction: "subtype" });
}

export function getApparentType(type: Type, environment: TypeConstructionEnvironment): Type {
  if ((type.flags & TypeFlags.StringLike) !== 0) return environment.stringType;
  if ((type.flags & TypeFlags.NumberLike) !== 0) return environment.numberType;
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return environment.booleanType;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return getReducedType(type, environment);
  return type;
}

export function getReducedType(type: Type, environment: TypeConstructionEnvironment): Type {
  if ((type.flags & TypeFlags.Union) !== 0) return getUnionType(constituentTypes(type), environment, { reduction: "subtype" });
  if ((type.flags & TypeFlags.Intersection) !== 0) return getIntersectionType(constituentTypes(type), environment, { flags: 0 });
  return type;
}

export function getPropagatingFlagsOfTypes(types: readonly Type[], excludeKinds: TypeFlags): ObjectFlags {
  let flags = ObjectFlags.None;
  for (const type of types) {
    if ((type.flags & excludeKinds) !== 0) continue;
    flags |= (type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None;
  }
  return flags & ObjectFlags.PropagatingFlags;
}

export function sortTypes(types: readonly Type[]): readonly Type[] {
  return [...types].sort((left, right) => left.id - right.id);
}

export function containsType(types: readonly Type[], type: Type): boolean {
  return types.some(candidate => candidate.id === type.id);
}

export function insertType(types: readonly Type[], type: Type): readonly Type[] {
  return containsType(types, type) ? types : sortTypes([...types, type]);
}

export function filterType(type: Type, predicate: (type: Type) => boolean, environment: TypeConstructionEnvironment): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : environment.neverType;
  return getUnionType(constituentTypes(type).filter(predicate), environment, { reduction: "subtype" });
}

export function removeType(type: Type, targetType: Type, environment: TypeConstructionEnvironment): Type {
  return filterType(type, candidate => candidate.id !== targetType.id, environment);
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function getPropertyNameFromIndex(indexType: Type, accessNode: AstNode | undefined): string | undefined {
  const literal = (indexType.data as { readonly value?: string | number } | undefined)?.value;
  if (literal !== undefined) return String(literal);
  return (accessNode as { readonly text?: string } | undefined)?.text;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}
