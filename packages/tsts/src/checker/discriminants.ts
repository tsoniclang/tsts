import { SymbolFlags, type Symbol as AstSymbol } from "../ast/index.js";
import { getPropertySymbolOfType, getPropertyTypeOfType, getTypeOfSymbol } from "./checker.checkedtype.js";
import { TypeFlags, type Type, type UnionOrIntersectionType } from "./types.js";

export interface TypeDiscriminator {
  readonly length: number;
  readonly name: (index: number) => string;
  readonly matches: (index: number, type: Type) => boolean;
}

export type TypeRelation = (source: Type, target: Type) => boolean;

export interface DiscriminableItem {
  readonly name: string;
  readonly related: (type: Type) => boolean;
}

export function findMatchingDiscriminantType(source: Type, target: Type, isRelatedTo: TypeRelation): Type | undefined {
  if ((target.flags & TypeFlags.Union) === 0) return undefined;
  const sourceProperties = propertiesOfType(source);
  const discriminants = findDiscriminantProperties(sourceProperties, target);
  if (discriminants.length === 0) return undefined;
  return discriminateTypeByDiscriminableItems(
    target,
    discriminants.map(property => ({
      name: symbolName(property),
      related: candidate => {
        const targetPropertyType = getPropertyTypeOfType(candidate, symbolName(property));
        const sourcePropertyType = getTypeOfSymbol(property);
        return targetPropertyType !== undefined && sourcePropertyType !== undefined && isRelatedTo(sourcePropertyType, targetPropertyType);
      },
    })),
  );
}

export function findDiscriminantProperties(sourceProperties: readonly AstSymbol[], target: Type): readonly AstSymbol[] {
  const result: AstSymbol[] = [];
  for (const property of sourceProperties) {
    if (isDiscriminantProperty(target, symbolName(property))) result.push(property);
  }
  return result;
}

export function isDiscriminantProperty(type: Type, name: string): boolean {
  if ((type.flags & TypeFlags.Union) === 0) return false;
  const types = unionTypes(type);
  if (types.length < 2) return false;
  let seenLiteral = false;
  for (const candidate of types) {
    const propertyType = getPropertyTypeOfType(candidate, name);
    if (propertyType === undefined) return false;
    if (!isUnitLikeType(propertyType)) return false;
    seenLiteral = true;
  }
  return seenLiteral;
}

export function getMatchingUnionConstituentForType(unionType: Type, type: Type): Type | undefined {
  const keyPropertyName = getKeyPropertyName(unionType);
  if (keyPropertyName.length === 0) return undefined;
  const propertyType = getPropertyTypeOfType(type, keyPropertyName);
  if (propertyType === undefined) return undefined;
  return getConstituentTypeForKeyType(unionType, propertyType);
}

export function getKeyPropertyName(type: Type): string {
  if ((type.flags & TypeFlags.Union) === 0) return "";
  return computeKeyPropertyNameAndMap(type).keyPropertyName;
}

export function getConstituentTypeForKeyType(type: Type, keyType: Type): Type | undefined {
  const map = computeKeyPropertyNameAndMap(type).constituents;
  if (map.size === 0) return undefined;
  for (const key of keyValuesOfType(keyType)) {
    const candidate = map.get(key);
    if (candidate !== undefined) return candidate;
  }
  return undefined;
}

export function computeKeyPropertyNameAndMap(type: Type): { readonly keyPropertyName: string; readonly constituents: ReadonlyMap<string, Type> } {
  const types = unionTypes(type);
  if (types.length < 2) return { keyPropertyName: "", constituents: new Map() };
  const keyPropertyName = getKeyPropertyCandidateName(types);
  if (keyPropertyName.length === 0) return { keyPropertyName, constituents: new Map() };
  const constituents = mapTypesByKeyProperty(types, keyPropertyName);
  return constituents.size === types.length ? { keyPropertyName, constituents } : { keyPropertyName: "", constituents: new Map() };
}

export function getKeyPropertyCandidateName(types: readonly Type[]): string {
  const counts = new Map<string, number>();
  for (const type of types) {
    for (const property of propertiesOfType(type)) {
      const propertyType = getTypeOfSymbol(property);
      if (propertyType !== undefined && isUnitLikeType(propertyType)) {
        const name = symbolName(property);
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
  }
  let best = "";
  let bestCount = 0;
  for (const [name, count] of counts) {
    if (count > bestCount) {
      best = name;
      bestCount = count;
    }
  }
  return bestCount >= Math.max(2, Math.floor(types.length / 2)) ? best : "";
}

export function mapTypesByKeyProperty(types: readonly Type[], keyPropertyName: string): Map<string, Type> {
  const result = new Map<string, Type>();
  for (const type of types) {
    const propertyType = getPropertyTypeOfType(type, keyPropertyName);
    if (propertyType === undefined) continue;
    for (const key of keyValuesOfType(propertyType)) {
      if (result.has(key)) return new Map();
      result.set(key, type);
    }
  }
  return result;
}

export function discriminateTypeByDiscriminableItems(target: Type, discriminator: readonly DiscriminableItem[]): Type | undefined {
  if ((target.flags & TypeFlags.Union) === 0) return undefined;
  let candidates = unionTypes(target);
  for (const item of discriminator) {
    candidates = candidates.filter(candidate => {
      const propertyType = getPropertyTypeOfType(candidate, item.name);
      return propertyType !== undefined && item.related(propertyType);
    });
    if (candidates.length === 0) return undefined;
    if (candidates.length === 1) return candidates[0];
  }
  return candidates.length === 1 ? candidates[0] : undefined;
}

export function filterPrimitivesIfContainsNonPrimitive(unionType: Type): Type {
  const types = unionTypes(unionType);
  if (types.length === 0 || !types.some(isNonPrimitiveType)) return unionType;
  const filtered = types.filter(type => !isPrimitiveLikeType(type));
  if (filtered.length === types.length) return unionType;
  return { ...unionType, data: { objectFlags: 0, ...(unionType.data as object), types: filtered } as UnionOrIntersectionType };
}

export function isNonPrimitiveType(type: Type): boolean {
  return (type.flags & (TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.TypeParameter | TypeFlags.Intersection)) !== 0;
}

export function shouldReportUnmatchedPropertyError(source: Type, target: Type): boolean {
  if ((source.flags & TypeFlags.Union) !== 0 || (target.flags & TypeFlags.Union) !== 0) return true;
  return propertiesOfType(target).some(property => ((property.flags ?? 0) & SymbolFlags.Optional) === 0);
}

export function getUnmatchedProperty(source: Type, target: Type, requireOptionalProperties: boolean, matchDiscriminantProperties: boolean): AstSymbol | undefined {
  return getUnmatchedProperties(source, target, requireOptionalProperties, matchDiscriminantProperties)[0];
}

export function getUnmatchedProperties(
  source: Type,
  target: Type,
  requireOptionalProperties: boolean,
  matchDiscriminantProperties: boolean,
): readonly AstSymbol[] {
  const sourceNames = new Set(propertiesOfType(source).map(symbolName));
  const result: AstSymbol[] = [];
  for (const property of propertiesOfType(target)) {
    if (!requireOptionalProperties && ((property.flags ?? 0) & SymbolFlags.Optional) !== 0) continue;
    if (matchDiscriminantProperties && !isDiscriminantProperty(target, symbolName(property))) continue;
    if (!sourceNames.has(symbolName(property))) result.push(property);
  }
  return result;
}

export function excludeProperties(properties: readonly AstSymbol[], excludedProperties: ReadonlySet<string>): readonly AstSymbol[] {
  return properties.filter(property => !excludedProperties.has(symbolName(property)));
}

export function getTypeNamesForErrorDisplay(left: Type, right: Type): { readonly left: string; readonly right: string } {
  return {
    left: getTypeNameForErrorDisplay(left),
    right: getTypeNameForErrorDisplay(right),
  };
}

export function getTypeNameForErrorDisplay(type: Type): string {
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return "bigint";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return "symbol";
  if ((type.flags & TypeFlags.VoidLike) !== 0) return "void";
  if ((type.flags & TypeFlags.Object) !== 0) return type.symbol?.name ?? "object";
  if ((type.flags & TypeFlags.Union) !== 0) return unionTypes(type).map(getTypeNameForErrorDisplay).join(" | ");
  if ((type.flags & TypeFlags.Intersection) !== 0) return unionTypes(type).map(getTypeNameForErrorDisplay).join(" & ");
  return type.symbol?.name ?? "unknown";
}

function propertiesOfType(type: Type): readonly AstSymbol[] {
  const dataProperties = (type.data as { readonly resolvedProperties?: readonly AstSymbol[]; readonly declaredProperties?: readonly AstSymbol[] } | undefined);
  if (dataProperties?.resolvedProperties !== undefined) return dataProperties.resolvedProperties;
  if (dataProperties?.declaredProperties !== undefined) return dataProperties.declaredProperties;
  const members = (type.symbol as { readonly members?: ReadonlyMap<string, AstSymbol> } | undefined)?.members;
  return members === undefined ? [] : [...members.values()];
}

function unionTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function isUnitLikeType(type: Type): boolean {
  if ((type.flags & TypeFlags.Unit) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return unionTypes(type).every(isUnitLikeType);
  return false;
}

function keyValuesOfType(type: Type): readonly string[] {
  if ((type.flags & TypeFlags.Union) !== 0) return unionTypes(type).flatMap(keyValuesOfType);
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  if (value !== undefined) return [String(value)];
  return [getTypeNameForErrorDisplay(type)];
}

function isPrimitiveLikeType(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BigIntLike | TypeFlags.BooleanLike | TypeFlags.ESSymbolLike | TypeFlags.VoidLike)) !== 0;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}
