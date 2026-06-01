/**
 * Checker type algebra helpers.
 *
 * Conceptual split from TS-Go `checker.go`'s type-construction and
 * union/intersection normalization sections.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import { parseValidBigInt, pseudoBigIntToString, type PseudoBigInt } from "../jsnum/index.js";
import type {
  IndexInfo,
  IndexedAccessType,
  IndexType,
  InterfaceType,
  LiteralType,
  ObjectType,
  Signature,
  StructuredType,
  Type,
  TypeAlias,
  TypeParameter,
  UnionOrIntersectionType,
} from "./types.js";
import {
  AccessFlags,
  IndexFlags,
  ObjectFlags,
  SignatureFlags,
  TypeFlags,
} from "./types.js";
import {
  anyType,
  bigintType,
  booleanType,
  neverType,
  nullType,
  numberType,
  regularFalseType,
  regularTrueType,
  stringType,
  undefinedType,
  unknownType,
  voidType,
} from "./checker.checkedtype.js";
import { compareTypes } from "./utilities.js";

type ConcreteTypeData = NonNullable<Type["data"]>;

export interface TypeAlgebraState {
  readonly stringLiteralTypes?: Map<string, Type>;
  readonly numberLiteralTypes?: Map<number, Type>;
  readonly bigintLiteralTypes?: Map<string, Type>;
  readonly enumLiteralTypes?: Map<string, Type>;
  readonly unionTypes?: Map<string, Type>;
  readonly intersectionTypes?: Map<string, Type>;
  readonly strictNullChecks?: boolean;
  readonly errorType?: Type;
  readonly wildcardType?: Type;
  readonly missingType?: Type;
  readonly esSymbolType?: Type;
  nextTypeId(): number;
  reportTooComplexUnion?(size: number): void;
}

export type UnionReduction = 0 | 1 | 2;
export const UnionReduction = {
  None: 0 as UnionReduction,
  Literal: 1 as UnionReduction,
  Subtype: 2 as UnionReduction,
} as const;

export type IntersectionFlags = number;
export const IntersectionFlags = {
  None: 0 as IntersectionFlags,
  NoSupertypeReduction: (1 << 0) as IntersectionFlags,
  NoConstraintReduction: (1 << 1) as IntersectionFlags,
} as const;

export function newTypeParameter(symbol: AstSymbol | undefined, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.TypeParameter,
    id: nextTypeId(state),
    ...(symbol === undefined ? {} : { symbol }),
    data: {} as TypeParameter,
  };
}

export function getPropagatingFlagsOfTypes(types: readonly Type[], excludeKinds: TypeFlags = TypeFlags.None): ObjectFlags {
  let result = ObjectFlags.None;
  for (const type of types) {
    if ((type.flags & excludeKinds) === 0) result |= objectFlagsOf(type);
  }
  return result & ObjectFlags.PropagatingFlags;
}

export function newUnionType(objectFlags: ObjectFlags, types: readonly Type[], state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.Union,
    id: nextTypeId(state),
    data: { objectFlags, types } as UnionOrIntersectionType,
  };
}

export function newIntersectionType(objectFlags: ObjectFlags, types: readonly Type[], state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.Intersection,
    id: nextTypeId(state),
    data: { objectFlags, types } as UnionOrIntersectionType,
  };
}

export function newIndexedAccessType(objectType: Type, indexType: Type, accessFlags: AccessFlags, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.IndexedAccess,
    id: nextTypeId(state),
    data: { objectType, indexType, accessFlags } as IndexedAccessType,
  };
}

export function newIndexType(target: Type, indexFlags: IndexFlags, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.Index,
    id: nextTypeId(state),
    data: { type: target, indexFlags } as IndexType,
  };
}

export function newTemplateLiteralType(texts: readonly string[], types: readonly Type[], state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.TemplateLiteral,
    id: nextTypeId(state),
    data: { texts, types } as unknown as ConcreteTypeData,
  };
}

export function newStringMappingType(symbol: AstSymbol, target: Type, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.StringMapping,
    id: nextTypeId(state),
    symbol,
    data: { target } as unknown as ConcreteTypeData,
  };
}

export function newConditionalType(root: ConditionalRoot, mapper?: TypeMapperLike, combinedMapper?: TypeMapperLike, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.Conditional,
    id: nextTypeId(state),
    data: {
      root,
      checkType: mapper?.map?.(root.checkType) ?? root.checkType,
      extendsType: mapper?.map?.(root.extendsType) ?? root.extendsType,
      mapper,
      combinedMapper,
    } as unknown as ConcreteTypeData,
  };
}

export function newSubstitutionType(baseType: Type, constraint: Type, state?: TypeAlgebraState): Type {
  return {
    flags: TypeFlags.Substitution,
    id: nextTypeId(state),
    data: { baseType, constraint } as unknown as ConcreteTypeData,
  };
}

export function newSignature(
  flags: SignatureFlags,
  declaration: AstNode | undefined,
  typeParameters: readonly TypeParameter[] | undefined,
  thisParameter: AstSymbol | undefined,
  parameters: readonly AstSymbol[],
  resolvedReturnType: Type | undefined,
  resolvedTypePredicate: unknown,
  minArgumentCount: number,
): Signature {
  return {
    flags,
    parameters,
    minArgumentCount,
    resolvedMinArgumentCount: -1,
    ...(declaration === undefined ? {} : { declaration }),
    ...(typeParameters === undefined ? {} : { typeParameters }),
    ...(thisParameter === undefined ? {} : { thisParameter }),
    ...(resolvedReturnType === undefined ? {} : { resolvedReturnType }),
    ...(resolvedTypePredicate === undefined ? {} : { resolvedTypePredicate }),
  };
}

export function newIndexInfo(
  keyType: Type,
  valueType: Type,
  isReadonly: boolean,
  declaration?: AstNode,
  components?: readonly AstNode[],
): IndexInfo {
  void components;
  return {
    keyType,
    valueType,
    ...(isReadonly ? { isReadonly: true } : {}),
    ...(declaration === undefined ? {} : { declaration }),
  };
}

export function parseBigIntLiteralType(text: string, state?: TypeAlgebraState): Type {
  const value = parseValidBigInt(text.endsWith("n") ? text : `${text}n`);
  const key = pseudoBigIntToString(value);
  const cached = state?.bigintLiteralTypes?.get(key);
  if (cached !== undefined) return cached;
  const type = literalType(TypeFlags.BigIntLiteral, value, undefined, state);
  state?.bigintLiteralTypes?.set(key, type);
  return type;
}

export function getStringLiteralValue(type: Type): string {
  return literalValue(type) as string;
}

export function getNumberLiteralValue(type: Type): number {
  return literalValue(type) as number;
}

export function getBigIntLiteralValue(type: Type): PseudoBigInt {
  return literalValue(type) as PseudoBigInt;
}

export function getBooleanLiteralValue(type: Type): boolean {
  return literalValue(type) as boolean;
}

export function getEnumLiteralType(value: string | number | PseudoBigInt, enumSymbol: AstSymbol, symbol: AstSymbol, state?: TypeAlgebraState): Type {
  const valueKey = typeof value === "object" ? pseudoBigIntToString(value) : String(value);
  const key = `${symbolName(enumSymbol)}:${valueKey}`;
  const cached = state?.enumLiteralTypes?.get(key);
  if (cached !== undefined) return cached;
  const flags = TypeFlags.EnumLiteral
    | (typeof value === "string" ? TypeFlags.StringLiteral : TypeFlags.NumberLiteral);
  const type = literalType(flags, value, symbol, state);
  state?.enumLiteralTypes?.set(key, type);
  return type;
}

export function isNeitherUnitTypeNorNever(type: Type): boolean {
  return (type.flags & (TypeFlags.Unit | TypeFlags.Never)) === 0;
}

export function extractUnitType(type: Type): Type {
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    const unit = constituentTypes(type).find(isUnitType);
    if (unit !== undefined) return unit;
  }
  return type;
}

export function getBaseTypeOfLiteralTypeForComparison(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & (TypeFlags.StringLiteral | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0) return stringType;
  if ((type.flags & (TypeFlags.NumberLiteral | TypeFlags.Enum)) !== 0) return numberType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) return mapTypeEx(type, item => getBaseTypeOfLiteralTypeForComparison(item, state), false, state) ?? neverType;
  return type;
}

export function getBaseTypeOfEnumLikeType(type: Type, getDeclaredTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined): Type {
  if ((type.flags & TypeFlags.EnumLike) !== 0 && ((type.symbol?.flags ?? 0) & SymbolFlags.EnumMember) !== 0) {
    const parent = type.symbol?.parent;
    if (parent !== undefined) return getDeclaredTypeOfSymbol?.(parent) ?? type;
  }
  return type;
}

export function getBaseTypeOfLiteralTypeUnion(type: Type, state?: TypeAlgebraState): Type {
  return mapTypeEx(type, item => getBaseTypeOfLiteralType(item, state), false, state) ?? neverType;
}

export function getWidenedUniqueESSymbolType(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.UniqueESSymbol) !== 0) return state?.esSymbolType ?? newIntrinsic(TypeFlags.ESSymbol, "symbol", state);
  if ((type.flags & TypeFlags.Union) !== 0) return mapTypeEx(type, item => getWidenedUniqueESSymbolType(item, state), false, state) ?? neverType;
  return type;
}

export function isLiteralOfContextualType(candidateType: Type, contextualType: Type | undefined, getBaseConstraintOfType?: (type: Type) => Type | undefined): boolean {
  if (contextualType === undefined) return false;
  if ((contextualType.flags & TypeFlags.UnionOrIntersection) !== 0) {
    return constituentTypes(contextualType).some(type => isLiteralOfContextualType(candidateType, type, getBaseConstraintOfType));
  }
  if ((contextualType.flags & TypeFlags.InstantiableNonPrimitive) !== 0) {
    const constraint = getBaseConstraintOfType?.(contextualType) ?? unknownType;
    return maybeTypeOfKind(constraint, TypeFlags.String) && maybeTypeOfKind(candidateType, TypeFlags.StringLiteral)
      || maybeTypeOfKind(constraint, TypeFlags.Number) && maybeTypeOfKind(candidateType, TypeFlags.NumberLiteral)
      || maybeTypeOfKind(constraint, TypeFlags.BigInt) && maybeTypeOfKind(candidateType, TypeFlags.BigIntLiteral)
      || maybeTypeOfKind(constraint, TypeFlags.ESSymbol) && maybeTypeOfKind(candidateType, TypeFlags.UniqueESSymbol)
      || isLiteralOfContextualType(candidateType, constraint, getBaseConstraintOfType);
  }
  return (contextualType.flags & (TypeFlags.StringLiteral | TypeFlags.Index | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0 && maybeTypeOfKind(candidateType, TypeFlags.StringLiteral)
    || (contextualType.flags & TypeFlags.NumberLiteral) !== 0 && maybeTypeOfKind(candidateType, TypeFlags.NumberLiteral)
    || (contextualType.flags & TypeFlags.BigIntLiteral) !== 0 && maybeTypeOfKind(candidateType, TypeFlags.BigIntLiteral)
    || (contextualType.flags & TypeFlags.BooleanLiteral) !== 0 && maybeTypeOfKind(candidateType, TypeFlags.BooleanLiteral)
    || (contextualType.flags & TypeFlags.UniqueESSymbol) !== 0 && maybeTypeOfKind(candidateType, TypeFlags.UniqueESSymbol);
}

export function mapTypeWithAlias(type: Type, mapper: (type: Type) => Type | undefined, alias: TypeAlias | undefined, state?: TypeAlgebraState): Type | undefined {
  if ((type.flags & TypeFlags.Union) !== 0 && alias !== undefined) {
    return getUnionTypeWorker(constituentTypes(type).map(mapper).filter(isType), UnionReduction.Literal, alias, undefined, state);
  }
  return mapTypeEx(type, mapper, false, state);
}

export function mapTypeEx(type: Type, mapper: (type: Type) => Type | undefined, noReductions = false, state?: TypeAlgebraState): Type | undefined {
  if ((type.flags & TypeFlags.Never) !== 0) return type;
  if ((type.flags & TypeFlags.Union) === 0) return mapper(type);
  const sourceTypes = originTypes(type);
  const mappedTypes: Type[] = [];
  let changed = false;
  for (const source of sourceTypes) {
    const mapped = (source.flags & TypeFlags.Union) !== 0
      ? mapTypeEx(source, mapper, noReductions, state)
      : mapper(source);
    if (mapped !== source) changed = true;
    if (mapped !== undefined) mappedTypes.push(mapped);
  }
  if (!changed) return type;
  if (mappedTypes.length === 0) return undefined;
  return getUnionTypeWorker(mappedTypes, noReductions ? UnionReduction.None : UnionReduction.Literal, undefined, undefined, state);
}

export function getUnionOrIntersectionType(types: readonly Type[], isUnion: boolean, unionReduction: UnionReduction, state?: TypeAlgebraState): Type {
  return isUnion
    ? getUnionTypeWorker(types, unionReduction, undefined, undefined, state)
    : getIntersectionTypeEx(types, IntersectionFlags.None, undefined, state);
}

export function getUnionTypeWorker(
  types: readonly Type[],
  unionReduction: UnionReduction,
  alias?: TypeAlias,
  origin?: Type,
  state?: TypeAlgebraState,
): Type {
  const { typeSet, includes } = addTypesToUnion(types);
  let reduced = typeSet;
  if (unionReduction !== UnionReduction.None) {
    if ((includes & TypeFlags.AnyOrUnknown) !== 0) return (includes & TypeFlags.Any) !== 0 ? state?.errorType ?? anyType : unknownType;
    reduced = removeRedundantLiteralTypes(reduced, includes, (includes & TypeFlags.Void) !== 0 && (includes & TypeFlags.Undefined) !== 0);
    if ((includes & TypeFlags.StringLiteral) !== 0 && (includes & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0) {
      reduced = removeStringLiteralsMatchedByTemplateLiterals(reduced);
    }
    if ((includes & TypeFlags.Instantiable) !== 0) reduced = removeConstrainedTypeVariables(reduced);
    if (unionReduction === UnionReduction.Subtype) reduced = removeRedundantSupertypes(reduced, includes);
  }
  if (reduced.length === 0) {
    if ((includes & TypeFlags.Null) !== 0) return nullType;
    if ((includes & TypeFlags.Undefined) !== 0) return state?.missingType ?? undefinedType;
    return neverType;
  }
  if (origin === undefined && (includes & TypeFlags.Union) !== 0) {
    const namedUnions = addNamedUnions([], types);
    if (alias === undefined && namedUnions.length === 1 && reduced.every(type => containsType(constituentTypes(namedUnions[0]!), type))) {
      return namedUnions[0]!;
    }
  }
  const objectFlags = ((includes & TypeFlags.Primitive) !== 0 ? ObjectFlags.PrimitiveUnion : ObjectFlags.None)
    | ((includes & TypeFlags.Intersection) !== 0 ? ObjectFlags.ContainsIntersections : ObjectFlags.None);
  return getUnionTypeFromSortedList(reduced, objectFlags, alias, origin, state);
}

export function getUnionTypeFromSortedList(
  types: readonly Type[],
  precomputedObjectFlags: ObjectFlags,
  alias?: TypeAlias,
  origin?: Type,
  state?: TypeAlgebraState,
): Type {
  if (types.length === 0) return neverType;
  if (types.length === 1) return types[0]!;
  const sorted = [...types].sort(compareTypes);
  const key = getTypeListKey(sorted, origin, alias);
  const cached = state?.unionTypes?.get(key);
  if (cached !== undefined) return cached;
  const objectFlags = precomputedObjectFlags | getPropagatingFlagsOfTypes(sorted, TypeFlags.Nullable);
  const type = newUnionType(objectFlags, sorted, state);
  if (origin !== undefined || alias !== undefined) {
    type.data = {
      ...(type.data as UnionOrIntersectionType),
      ...(origin === undefined ? {} : { origin }),
    } as UnionOrIntersectionType;
    if (alias !== undefined) {
      type.aliasSymbol = alias.symbol;
      if (alias.typeArguments !== undefined) type.aliasTypeArguments = alias.typeArguments;
    }
  }
  if (sorted.length === 2
    && (sorted[0]!.flags & TypeFlags.BooleanLiteral) !== 0
    && (sorted[1]!.flags & TypeFlags.BooleanLiteral) !== 0) {
    type.flags |= TypeFlags.Boolean;
  }
  state?.unionTypes?.set(key, type);
  return type;
}

export function addNamedUnions(namedUnions: Type[], types: readonly Type[]): Type[] {
  for (const type of types) {
    if ((type.flags & TypeFlags.Union) === 0) continue;
    const origin = (type.data as { readonly origin?: Type } | undefined)?.origin;
    if (type.aliasSymbol !== undefined || origin !== undefined && (origin.flags & TypeFlags.Union) === 0) {
      if (!namedUnions.includes(type)) namedUnions.push(type);
    } else if (origin !== undefined && (origin.flags & TypeFlags.Union) !== 0) {
      addNamedUnions(namedUnions, constituentTypes(origin));
    }
  }
  return namedUnions;
}

export function removeStringLiteralsMatchedByTemplateLiterals(types: readonly Type[]): Type[] {
  const templates = types.filter(isPatternLiteralType);
  if (templates.length === 0) return [...types];
  return types.filter(type => (type.flags & TypeFlags.StringLiteral) === 0
    || !templates.some(template => isTypeMatchedByTemplateLiteralOrStringMapping(type, template)));
}

export function isTypeMatchedByTemplateLiteralOrStringMapping(type: Type, template: Type): boolean {
  const value = type.flags & TypeFlags.StringLiteral ? String(literalValue(type)) : undefined;
  if (value === undefined) return false;
  if ((template.flags & TypeFlags.StringMapping) !== 0) return true;
  const texts = templateTexts(template);
  if (texts.length === 0) return false;
  return value.startsWith(texts[0] ?? "") && value.endsWith(texts[texts.length - 1] ?? "");
}

export function removeConstrainedTypeVariables(types: readonly Type[]): Type[] {
  const result = [...types];
  const typeVariables = result
    .filter(type => (type.flags & TypeFlags.Intersection) !== 0 && (objectFlagsOf(type) & ObjectFlags.IsConstrainedTypeVariable) !== 0)
    .flatMap(type => constituentTypes(type).filter(item => (item.flags & TypeFlags.TypeVariable) !== 0));
  for (const typeVariable of typeVariables) {
    const covered = result.filter(type => constituentTypes(type).includes(typeVariable));
    if (covered.length !== 0 && !result.includes(typeVariable)) insertType(result, typeVariable);
  }
  return result;
}

export function intersectTypes(type1: Type | undefined, type2: Type | undefined, state?: TypeAlgebraState): Type | undefined {
  if (type1 === undefined) return type2;
  if (type2 === undefined) return type1;
  return getIntersectionTypeEx([type1, type2], IntersectionFlags.None, undefined, state);
}

export function getIntersectionTypeEx(types: readonly Type[], flags: IntersectionFlags = IntersectionFlags.None, alias?: TypeAlias, state?: TypeAlgebraState): Type {
  const { typeSet, includes } = addTypesToIntersection(types);
  if ((includes & TypeFlags.Never) !== 0) return neverType;
  if (isDisjointIntersection(includes, state?.strictNullChecks ?? true)) return neverType;
  let reduced = typeSet;
  if ((includes & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0 && (includes & TypeFlags.StringLiteral) !== 0) {
    const extracted = extractRedundantTemplateLiterals(reduced);
    if (extracted.empty) return neverType;
    reduced = extracted.types;
  }
  if ((includes & TypeFlags.Any) !== 0) return state?.errorType ?? anyType;
  if ((includes & TypeFlags.String) !== 0 && (includes & (TypeFlags.StringLiteral | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0
    || (includes & TypeFlags.Number) !== 0 && (includes & TypeFlags.NumberLiteral) !== 0
    || (includes & TypeFlags.BigInt) !== 0 && (includes & TypeFlags.BigIntLiteral) !== 0
    || (includes & TypeFlags.ESSymbol) !== 0 && (includes & TypeFlags.UniqueESSymbol) !== 0
    || (includes & TypeFlags.Void) !== 0 && (includes & TypeFlags.Undefined) !== 0) {
    if ((flags & IntersectionFlags.NoSupertypeReduction) === 0) reduced = removeRedundantSupertypes(reduced, includes);
  }
  if (reduced.length === 0) return unknownType;
  if (reduced.length === 1) return reduced[0]!;
  if (reduced.some(type => (type.flags & TypeFlags.Union) !== 0)) {
    if (!checkCrossProductUnion(reduced, state)) return state?.errorType ?? neverType;
    return getUnionTypeWorker(getCrossProductIntersections(reduced, flags, state), UnionReduction.Literal, alias, newIntersectionType(ObjectFlags.None, reduced, state), state);
  }
  const key = getTypeListKey(reduced, undefined, alias);
  const cached = state?.intersectionTypes?.get(key);
  if (cached !== undefined) return cached;
  const result = newIntersectionType(getPropagatingFlagsOfTypes(types, TypeFlags.Nullable), reduced, state);
  if (alias !== undefined) {
    result.aliasSymbol = alias.symbol;
    if (alias.typeArguments !== undefined) result.aliasTypeArguments = alias.typeArguments;
  }
  state?.intersectionTypes?.set(key, result);
  return result;
}

export function isUnionWithUndefined(type: Type): boolean {
  const types = constituentTypes(type);
  return (type.flags & TypeFlags.Union) !== 0 && types.length !== 0 && (types[0]!.flags & TypeFlags.Undefined) !== 0;
}

export function isUnionWithNull(type: Type): boolean {
  const types = constituentTypes(type);
  return (type.flags & TypeFlags.Union) !== 0 && types.some(item => (item.flags & TypeFlags.Null) !== 0);
}

export function isIntersectionType(type: Type): boolean {
  return (type.flags & TypeFlags.Intersection) !== 0;
}

export function isPrimitiveUnion(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.PrimitiveUnion) !== 0;
}

export function isNotUndefinedType(type: Type): boolean {
  return (type.flags & TypeFlags.Undefined) === 0;
}

export function isNotNullType(type: Type): boolean {
  return (type.flags & TypeFlags.Null) === 0;
}

export function addTypeToIntersection(typeSet: Type[], includes: TypeFlags, type: Type): TypeFlags {
  const flags = type.flags;
  if ((flags & TypeFlags.Intersection) !== 0) {
    return addTypesToIntersectionInto(typeSet, includes, constituentTypes(type));
  }
  if ((flags & TypeFlags.AnyOrUnknown) !== 0 && type === anyType) includes |= TypeFlags.Any;
  if ((flags & TypeFlags.Never) !== 0) includes |= TypeFlags.Never;
  if (!typeSet.includes(type)) {
    if ((flags & TypeFlags.Unit) !== 0 && (includes & TypeFlags.Unit) !== 0) includes |= TypeFlags.NonPrimitive;
    typeSet.push(type);
  }
  return includes | (flags & TypeFlags.Narrowable);
}

export function removeRedundantSupertypes(types: readonly Type[], includes: TypeFlags): Type[] {
  return types.filter(type => !(
    (type.flags & TypeFlags.String) !== 0 && (includes & (TypeFlags.StringLiteral | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0
    || (type.flags & TypeFlags.Number) !== 0 && (includes & TypeFlags.NumberLiteral) !== 0
    || (type.flags & TypeFlags.BigInt) !== 0 && (includes & TypeFlags.BigIntLiteral) !== 0
    || (type.flags & TypeFlags.ESSymbol) !== 0 && (includes & TypeFlags.UniqueESSymbol) !== 0
    || (type.flags & TypeFlags.Void) !== 0 && (includes & TypeFlags.Undefined) !== 0
    || isEmptyObjectType(type) && (includes & TypeFlags.DefinitelyNonNullable) !== 0
  ));
}

export function extractRedundantTemplateLiterals(types: readonly Type[]): { readonly types: Type[]; readonly empty: boolean } {
  const literals = types.filter(type => (type.flags & TypeFlags.StringLiteral) !== 0);
  const result = [...types];
  for (let index = result.length - 1; index >= 0; index -= 1) {
    const type = result[index]!;
    if ((type.flags & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) === 0) continue;
    for (const literal of literals) {
      if (isTypeMatchedByTemplateLiteralOrStringMapping(literal, type)) {
        result.splice(index, 1);
        break;
      }
      if (isPatternLiteralType(type)) return { types: result, empty: true };
    }
  }
  return { types: result, empty: false };
}

export function intersectUnionsOfPrimitiveTypes(types: readonly Type[], state?: TypeAlgebraState): { readonly types: Type[]; readonly reduced: boolean } {
  const firstIndex = types.findIndex(isPrimitiveUnion);
  if (firstIndex < 0) return { types: [...types], reduced: false };
  const unionTypes = types.filter(isPrimitiveUnion);
  if (unionTypes.length <= 1) return { types: [...types], reduced: false };
  const shared: Type[] = [];
  for (const unionType of unionTypes) {
    for (const type of constituentTypes(unionType)) {
      if (!containsType(shared, type) && eachUnionContains(unionTypes, type, state)) insertType(shared, type);
    }
  }
  const result = types.filter((type, index) => index === firstIndex || !isPrimitiveUnion(type));
  result[firstIndex] = getUnionTypeFromSortedList(shared, ObjectFlags.PrimitiveUnion, undefined, undefined, state);
  return { types: result, reduced: true };
}

export function eachUnionContains(unionTypes: readonly Type[], type: Type, state?: TypeAlgebraState): boolean {
  for (const unionType of unionTypes) {
    const types = constituentTypes(unionType);
    if (containsType(types, type)) continue;
    if (type === state?.missingType && containsType(types, undefinedType)) continue;
    if (type === undefinedType && state?.missingType !== undefined && containsType(types, state.missingType)) continue;
    const primitive = primitiveTypeForLiteral(type, state);
    if (primitive === undefined || !containsType(types, primitive)) return false;
  }
  return true;
}

export function getCrossProductIntersections(types: readonly Type[], flags: IntersectionFlags = IntersectionFlags.None, state?: TypeAlgebraState): Type[] {
  const size = getCrossProductUnionSize(types);
  const intersections: Type[] = [];
  for (let index = 0; index < size; index += 1) {
    const constituents = [...types];
    let selector = index;
    for (let sourceIndex = constituents.length - 1; sourceIndex >= 0; sourceIndex -= 1) {
      const source = constituents[sourceIndex]!;
      if ((source.flags & TypeFlags.Union) === 0) continue;
      const sourceTypes = constituentTypes(source);
      constituents[sourceIndex] = sourceTypes[selector % sourceTypes.length]!;
      selector = Math.floor(selector / sourceTypes.length);
    }
    const intersection = getIntersectionTypeEx(constituents, flags, undefined, state);
    if ((intersection.flags & TypeFlags.Never) === 0) intersections.push(intersection);
  }
  return intersections;
}

export function getConstituentCount(type: Type): number {
  if ((type.flags & TypeFlags.UnionOrIntersection) === 0 || type.aliasSymbol !== undefined) return 1;
  const origin = (type.data as { readonly origin?: Type } | undefined)?.origin;
  if ((type.flags & TypeFlags.Union) !== 0 && origin !== undefined) return getConstituentCount(origin);
  return getConstituentCountOfTypes(constituentTypes(type));
}

export function getConstituentCountOfTypes(types: readonly Type[]): number {
  return types.reduce((sum, type) => sum + getConstituentCount(type), 0);
}

export function filterTypes(types: Type[], predicate: (type: Type) => boolean, state?: TypeAlgebraState): void {
  for (let index = 0; index < types.length; index += 1) {
    types[index] = filterType(types[index]!, predicate, state);
  }
}

export function isEmptyResolvedType(type: StructuredType): boolean {
  return (type.declaredProperties?.length ?? 0) === 0
    && (type.declaredCallSignatures?.length ?? 0) === 0
    && (type.declaredConstructSignatures?.length ?? 0) === 0
    && (type.indexInfos?.length ?? 0) === 0;
}

export function isEmptyObjectType(type: Type): boolean {
  if ((type.flags & TypeFlags.Object) !== 0) {
    return (objectFlagsOf(type) & ObjectFlags.Mapped) === 0 && isEmptyResolvedType((type.data ?? {}) as StructuredType);
  }
  if ((type.flags & TypeFlags.NonPrimitive) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(isEmptyObjectType);
  if ((type.flags & TypeFlags.Intersection) !== 0) return constituentTypes(type).every(isEmptyObjectType);
  return false;
}

export function isPatternLiteralPlaceholderType(type: Type): boolean {
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    let seenPlaceholder = false;
    for (const constituent of constituentTypes(type)) {
      if ((constituent.flags & (TypeFlags.Literal | TypeFlags.Nullable)) !== 0 || isPatternLiteralPlaceholderType(constituent)) {
        seenPlaceholder = true;
      } else if ((constituent.flags & TypeFlags.Object) === 0) {
        return false;
      }
    }
    return seenPlaceholder;
  }
  return (type.flags & (TypeFlags.Any | TypeFlags.String | TypeFlags.Number | TypeFlags.BigInt)) !== 0 || isPatternLiteralType(type);
}

export function isPatternLiteralType(type: Type): boolean {
  return (type.flags & TypeFlags.TemplateLiteral) !== 0 && templateTypes(type).every(isPatternLiteralPlaceholderType)
    || (type.flags & TypeFlags.StringMapping) !== 0 && isPatternLiteralPlaceholderType(stringMappingTarget(type) ?? unknownType);
}

export function isGenericStringLikeType(type: Type): boolean {
  return (type.flags & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0 && !isPatternLiteralType(type);
}

export function forEachType(type: Type, callback: (type: Type) => void): void {
  if ((type.flags & TypeFlags.Union) !== 0) {
    for (const constituent of constituentTypes(type)) callback(constituent);
  } else {
    callback(type);
  }
}

export function someType(type: Type, callback: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.Union) !== 0
    ? constituentTypes(type).some(callback)
    : callback(type);
}

export function everyType(type: Type, callback: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.Union) !== 0
    ? constituentTypes(type).every(callback)
    : callback(type);
}

export function everyContainedType(type: Type, callback: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.UnionOrIntersection) !== 0
    ? constituentTypes(type).every(callback)
    : callback(type);
}

export function removeType(type: Type, targetType: Type, state?: TypeAlgebraState): Type {
  return filterType(type, item => item !== targetType, state);
}

export function containsType(types: readonly Type[], type: Type): boolean {
  return types.some(item => item === type);
}

export function insertType(types: Type[], type: Type): [Type[], boolean] {
  if (containsType(types, type)) return [types, false];
  types.push(type);
  types.sort(compareTypes);
  return [types, true];
}

export function countTypes(type: Type): number {
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).length;
  if ((type.flags & TypeFlags.Never) !== 0) return 0;
  return 1;
}

export function compareTypeIds(left: Type, right: Type): number {
  return left.id - right.id;
}

export function checkCrossProductUnion(types: readonly Type[], state?: TypeAlgebraState): boolean {
  const size = getCrossProductUnionSize(types);
  if (size >= 100_000) {
    state?.reportTooComplexUnion?.(size);
    return false;
  }
  return true;
}

function getBaseTypeOfLiteralType(type: Type, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.EnumLike) !== 0) return getBaseTypeOfEnumLikeType(type);
  if ((type.flags & (TypeFlags.StringLiteral | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0) return stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return numberType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) return getBaseTypeOfLiteralTypeUnion(type, state);
  return type;
}

function addTypesToUnion(types: readonly Type[]): { readonly typeSet: Type[]; readonly includes: TypeFlags } {
  const typeSet: Type[] = [];
  let includes = TypeFlags.None;
  for (const type of types) {
    if ((type.flags & TypeFlags.Union) !== 0) {
      const nested = addTypesToUnion(constituentTypes(type));
      includes |= nested.includes | TypeFlags.Union;
      for (const item of nested.typeSet) insertType(typeSet, item);
    } else if ((type.flags & TypeFlags.Never) === 0) {
      includes |= type.flags;
      insertType(typeSet, type);
    }
  }
  return { typeSet, includes };
}

function addTypesToIntersection(types: readonly Type[]): { readonly typeSet: Type[]; readonly includes: TypeFlags } {
  const typeSet: Type[] = [];
  const includes = addTypesToIntersectionInto(typeSet, TypeFlags.None, types);
  return { typeSet, includes };
}

function addTypesToIntersectionInto(typeSet: Type[], includes: TypeFlags, types: readonly Type[]): TypeFlags {
  let nextIncludes = includes;
  for (const type of types) {
    nextIncludes = addTypeToIntersection(typeSet, nextIncludes, regularLiteralType(type));
  }
  return nextIncludes;
}

function removeRedundantLiteralTypes(types: readonly Type[], includes: TypeFlags, reduceVoidUndefined: boolean): Type[] {
  return types.filter(type => !(
    (type.flags & (TypeFlags.StringLiteral | TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0 && (includes & TypeFlags.String) !== 0
    || (type.flags & TypeFlags.NumberLiteral) !== 0 && (includes & TypeFlags.Number) !== 0
    || (type.flags & TypeFlags.BigIntLiteral) !== 0 && (includes & TypeFlags.BigInt) !== 0
    || (type.flags & TypeFlags.UniqueESSymbol) !== 0 && (includes & TypeFlags.ESSymbol) !== 0
    || reduceVoidUndefined && (type.flags & TypeFlags.Undefined) !== 0 && (includes & TypeFlags.Void) !== 0
    || isFreshLiteralType(type) && containsType(types, regularLiteralType(type))
  ));
}

function filterType(type: Type, predicate: (type: Type) => boolean, state?: TypeAlgebraState): Type {
  if ((type.flags & TypeFlags.Union) !== 0) {
    const filtered = constituentTypes(type).filter(predicate);
    if (filtered.length === constituentTypes(type).length) return type;
    return getUnionTypeFromSortedList(filtered, objectFlagsOf(type) & (ObjectFlags.PrimitiveUnion | ObjectFlags.ContainsIntersections), undefined, undefined, state);
  }
  return (type.flags & TypeFlags.Never) !== 0 || predicate(type) ? type : neverType;
}

function isDisjointIntersection(includes: TypeFlags, strictNullChecks: boolean): boolean {
  return strictNullChecks && (includes & TypeFlags.Nullable) !== 0 && (includes & (TypeFlags.Object | TypeFlags.NonPrimitive)) !== 0
    || (includes & TypeFlags.NonPrimitive) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.NonPrimitive)) !== 0
    || (includes & TypeFlags.StringLike) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.StringLike)) !== 0
    || (includes & TypeFlags.NumberLike) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.NumberLike)) !== 0
    || (includes & TypeFlags.BigIntLike) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.BigIntLike)) !== 0
    || (includes & TypeFlags.ESSymbolLike) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.ESSymbolLike)) !== 0
    || (includes & TypeFlags.VoidLike) !== 0 && (includes & (TypeFlags.DisjointDomains & ~TypeFlags.VoidLike)) !== 0;
}

function getCrossProductUnionSize(types: readonly Type[]): number {
  let size = 1;
  for (const type of types) {
    if ((type.flags & TypeFlags.Union) === 0) continue;
    const length = constituentTypes(type).length;
    if (length === 0) return 0;
    if (size > Number.MAX_SAFE_INTEGER / length) return Number.POSITIVE_INFINITY;
    size *= length;
  }
  return size;
}

function primitiveTypeForLiteral(type: Type, state?: TypeAlgebraState): Type | undefined {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return stringType;
  if ((type.flags & (TypeFlags.Enum | TypeFlags.NumberLiteral)) !== 0) return numberType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  if ((type.flags & TypeFlags.UniqueESSymbol) !== 0) return state?.esSymbolType ?? newIntrinsic(TypeFlags.ESSymbol, "symbol", state);
  return undefined;
}

function regularLiteralType(type: Type): Type {
  return (type.flags & TypeFlags.Freshable) !== 0
    ? (type.data as LiteralType).regularType ?? type
    : type;
}

function isFreshLiteralType(type: Type): boolean {
  return (type.flags & TypeFlags.Freshable) !== 0 && (type.data as LiteralType).freshType === type;
}

function isUnitType(type: Type): boolean {
  return (type.flags & TypeFlags.Unit) !== 0;
}

function maybeTypeOfKind(type: Type, flags: TypeFlags): boolean {
  if ((type.flags & flags) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(item => maybeTypeOfKind(item, flags));
  return false;
}

function originTypes(type: Type): readonly Type[] {
  const origin = (type.data as { readonly origin?: Type } | undefined)?.origin;
  return origin !== undefined && (origin.flags & TypeFlags.Union) !== 0 ? constituentTypes(origin) : constituentTypes(type);
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as ObjectType | UnionOrIntersectionType | undefined)?.objectFlags ?? ObjectFlags.None;
}

function templateTexts(type: Type): readonly string[] {
  return (type.data as { readonly texts?: readonly string[] } | undefined)?.texts ?? [];
}

function templateTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function stringMappingTarget(type: Type): Type | undefined {
  return (type.data as { readonly target?: Type } | undefined)?.target;
}

function literalValue(type: Type): string | number | boolean | PseudoBigInt {
  return (type.data as LiteralType).value;
}

function literalType(flags: TypeFlags, value: string | number | boolean | PseudoBigInt, symbol?: AstSymbol, state?: TypeAlgebraState): Type {
  return {
    flags,
    id: nextTypeId(state),
    ...(symbol === undefined ? {} : { symbol }),
    data: { value } as LiteralType,
  };
}

function newIntrinsic(flags: TypeFlags, intrinsicName: string, state?: TypeAlgebraState): Type {
  return {
    flags,
    id: nextTypeId(state),
    data: { intrinsicName, objectFlags: ObjectFlags.None },
  };
}

function getTypeListKey(types: readonly Type[], origin?: Type, alias?: TypeAlias): string {
  const typePart = types.map(type => String(type.id)).join(",");
  const originPart = origin === undefined ? "" : `|o:${origin.id}`;
  const aliasPart = alias === undefined ? "" : `|a:${symbolName(alias.symbol)}<${(alias.typeArguments ?? []).map(type => type.id).join(",")}>`;
  return `${typePart}${originPart}${aliasPart}`;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function isType(value: Type | undefined): value is Type {
  return value !== undefined;
}

function nextTypeId(state?: TypeAlgebraState): number {
  if (state !== undefined) return state.nextTypeId();
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}

let syntheticTypeId = -2_800_000;

interface TypeMapperLike {
  map?(type: Type): Type;
}

interface ConditionalRoot {
  readonly checkType: Type;
  readonly extendsType: Type;
}
