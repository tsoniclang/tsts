/**
 * Object member resolution parity.
 *
 * TS-Go checker.go centralizes property lookup, apparent-type lookup,
 * union/intersection property merging, optionality, readonly propagation,
 * index-info fallback, and missing-property diagnostics. This split ports the
 * same semantic cluster for the TSTS checker.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { IndexInfo, Type, UnionOrIntersectionType } from "./types.js";
import { AccessFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface ObjectMemberHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly getApparentType?: (type: Type) => Type;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface PropertyLookupResult {
  readonly name: string;
  readonly symbol?: AstSymbol;
  readonly type: Type;
  readonly optional: boolean;
  readonly readonly: boolean;
  readonly fromIndexInfo: boolean;
  readonly missing: boolean;
}

export interface PropertyAccessCheck {
  readonly node: AstNode;
  readonly receiver: Type;
  readonly name: string;
  readonly result: PropertyLookupResult;
  readonly diagnostics: readonly string[];
}

export function checkPropertyAccessExpression(node: AstNode, receiver: Type, name: string, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyAccessCheck {
  const diagnostics: string[] = [];
  const result = resolvePropertyOfType(receiver, name, accessFlags, host);
  if (result.missing) {
    const message = `Property '${name}' does not exist on type '${typeName(receiver)}'.`;
    diagnostics.push(message);
    host.report?.(node, message);
  }
  if ((accessFlags & AccessFlags.Writing) !== 0 && result.readonly) {
    const message = `Cannot assign to readonly property '${name}'.`;
    diagnostics.push(message);
    host.report?.(node, message);
  }
  return { node, receiver, name, result, diagnostics };
}

export function resolvePropertyOfType(type: Type, name: string, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyLookupResult {
  const apparent = host.getApparentType?.(type) ?? type;
  if ((apparent.flags & TypeFlags.Union) !== 0) return resolveUnionProperty(apparent, name, accessFlags, host);
  if ((apparent.flags & TypeFlags.Intersection) !== 0) return resolveIntersectionProperty(apparent, name, accessFlags, host);
  const property = host.getPropertyOfType?.(apparent, name) ?? findProperty(host.getPropertiesOfType?.(apparent) ?? [], name);
  if (property !== undefined) return propertyResult(name, property, propertyType(property, host), false, accessFlags, host);
  const indexInfo = findApplicableIndexInfo(apparent, name, accessFlags, host);
  if (indexInfo !== undefined) return indexInfoResult(name, indexInfo, accessFlags, host);
  return missingPropertyResult(name, host);
}

export function resolveUnionProperty(type: Type, name: string, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyLookupResult {
  const parts = constituentTypes(type);
  const lookups = parts.map(part => resolvePropertyOfType(part, name, accessFlags | AccessFlags.AllowMissing, host));
  const present = lookups.filter(lookup => !lookup.missing);
  if (present.length === 0) return missingPropertyResult(name, host);
  if (present.length !== lookups.length && (accessFlags & AccessFlags.AllowMissing) === 0) return missingPropertyResult(name, host);
  const types = present.map(lookup => lookup.type);
  const symbol = mergeSymbols(name, present.map(lookup => lookup.symbol).filter((candidate): candidate is AstSymbol => candidate !== undefined), host);
  return {
    name,
    ...(symbol === undefined ? {} : { symbol }),
    type: host.createUnionType?.(types) ?? unionType(types),
    optional: present.length !== lookups.length || present.some(lookup => lookup.optional),
    readonly: present.every(lookup => lookup.readonly),
    fromIndexInfo: present.every(lookup => lookup.fromIndexInfo),
    missing: false,
  };
}

export function resolveIntersectionProperty(type: Type, name: string, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyLookupResult {
  const parts = constituentTypes(type);
  const lookups = parts.map(part => resolvePropertyOfType(part, name, accessFlags | AccessFlags.AllowMissing, host)).filter(lookup => !lookup.missing);
  if (lookups.length === 0) return missingPropertyResult(name, host);
  const symbol = mergeSymbols(name, lookups.map(lookup => lookup.symbol).filter((candidate): candidate is AstSymbol => candidate !== undefined), host);
  return {
    name,
    ...(symbol === undefined ? {} : { symbol }),
    type: host.createIntersectionType?.(lookups.map(lookup => lookup.type)) ?? intersectionType(lookups.map(lookup => lookup.type)),
    optional: lookups.every(lookup => lookup.optional),
    readonly: lookups.some(lookup => lookup.readonly),
    fromIndexInfo: lookups.every(lookup => lookup.fromIndexInfo),
    missing: false,
  };
}

export function getPropertyTypeForIndexType(objectType: Type, indexType: Type, accessFlags: AccessFlags, host: ObjectMemberHost): Type {
  if ((indexType.flags & TypeFlags.StringLiteral) !== 0) {
    return resolvePropertyOfType(objectType, literalValue(indexType), accessFlags, host).type;
  }
  const indexInfo = findBestIndexInfo(objectType, indexType, accessFlags, host);
  return indexInfo?.valueType ?? host.unknownType;
}

export function getIndexInfoOfType(type: Type, keyType: Type, accessFlags: AccessFlags, host: ObjectMemberHost): IndexInfo | undefined {
  return findBestIndexInfo(type, keyType, accessFlags, host);
}

export function getApplicableIndexInfos(type: Type, keyType: Type, accessFlags: AccessFlags, host: ObjectMemberHost): readonly IndexInfo[] {
  return (host.getIndexInfosOfType?.(type) ?? []).filter(info => isApplicableIndexInfo(info, keyType, accessFlags));
}

export function getPropertiesOfObjectType(type: Type, host: ObjectMemberHost): readonly AstSymbol[] {
  if ((type.flags & TypeFlags.Union) !== 0 || (type.flags & TypeFlags.Intersection) !== 0) return getPropertiesOfUnionOrIntersection(type, host);
  return host.getPropertiesOfType?.(type) ?? [];
}

export function getPropertiesOfUnionOrIntersection(type: Type, host: ObjectMemberHost): readonly AstSymbol[] {
  const names = new Set<string>();
  const result: AstSymbol[] = [];
  for (const part of constituentTypes(type)) {
    for (const property of host.getPropertiesOfType?.(part) ?? []) {
      const name = symbolName(property);
      if (names.has(name)) continue;
      const lookup = (type.flags & TypeFlags.Union) !== 0
        ? resolveUnionProperty(type, name, AccessFlags.None, host)
        : resolveIntersectionProperty(type, name, AccessFlags.None, host);
      if (lookup.symbol !== undefined) {
        names.add(name);
        result.push(lookup.symbol);
      }
    }
  }
  return result;
}

export function getReadonlyPropertyNames(type: Type, host: ObjectMemberHost): readonly string[] {
  return getPropertiesOfObjectType(type, host).filter(isReadonlySymbol).map(symbolName).sort();
}

export function getOptionalPropertyNames(type: Type, host: ObjectMemberHost): readonly string[] {
  return getPropertiesOfObjectType(type, host).filter(isOptionalSymbol).map(symbolName).sort();
}

export function hasProperty(type: Type, name: string, host: ObjectMemberHost): boolean {
  return !resolvePropertyOfType(type, name, AccessFlags.AllowMissing, host).missing;
}

export function requireProperty(node: AstNode, type: Type, name: string, host: ObjectMemberHost): AstSymbol | undefined {
  const result = resolvePropertyOfType(type, name, AccessFlags.None, host);
  if (result.missing) host.report?.(node, `Required property '${name}' is missing.`);
  return result.symbol;
}

export function getMissingProperties(source: Type, target: Type, host: ObjectMemberHost): readonly AstSymbol[] {
  const sourceNames = new Set(getPropertiesOfObjectType(source, host).map(symbolName));
  return getPropertiesOfObjectType(target, host).filter(property => !isOptionalSymbol(property) && !sourceNames.has(symbolName(property)));
}

export function reportMissingProperties(node: AstNode, source: Type, target: Type, host: ObjectMemberHost): readonly string[] {
  const missing = getMissingProperties(source, target, host);
  const diagnostics = missing.map(property => `Property '${symbolName(property)}' is missing in type '${typeName(source)}'.`);
  for (const diagnostic of diagnostics) host.report?.(node, diagnostic);
  return diagnostics;
}

export function getSpreadableProperties(type: Type, host: ObjectMemberHost): readonly AstSymbol[] {
  return getPropertiesOfObjectType(type, host).filter(property => !isPrivateSymbol(property) && !isMethodOnlySymbol(property));
}

export function createSpreadPropertyTable(types: readonly Type[], host: ObjectMemberHost): ReadonlyMap<string, AstSymbol> {
  const table = new Map<string, AstSymbol>();
  for (const type of types) {
    for (const property of getSpreadableProperties(type, host)) table.set(symbolName(property), property);
  }
  return table;
}

export function getPropertyNamesFromType(type: Type, host: ObjectMemberHost): readonly string[] {
  return getPropertiesOfObjectType(type, host).map(symbolName).sort();
}

export function getIndexInfoNames(type: Type, host: ObjectMemberHost): readonly string[] {
  return (host.getIndexInfosOfType?.(type) ?? []).map(info => typeName(info.keyType)).sort();
}

export function propertyIsAccessible(symbol: AstSymbol, accessFlags: AccessFlags): boolean {
  if ((accessFlags & AccessFlags.Writing) !== 0 && isReadonlySymbol(symbol)) return false;
  return !isPrivateSymbol(symbol);
}

export function propertyNeedsUndefined(result: PropertyLookupResult, accessFlags: AccessFlags): boolean {
  return result.optional && (accessFlags & AccessFlags.IncludeUndefined) !== 0;
}

function propertyResult(name: string, symbol: AstSymbol, type: Type, fromIndexInfo: boolean, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyLookupResult {
  const optional = isOptionalSymbol(symbol);
  const readonly = isReadonlySymbol(symbol);
  const finalType = optional && (accessFlags & AccessFlags.IncludeUndefined) !== 0
    ? host.createUnionType?.([type, host.undefinedType]) ?? unionType([type, host.undefinedType])
    : type;
  return { name, symbol, type: finalType, optional, readonly, fromIndexInfo, missing: false };
}

function indexInfoResult(name: string, indexInfo: IndexInfo, accessFlags: AccessFlags, host: ObjectMemberHost): PropertyLookupResult {
  const type = (accessFlags & AccessFlags.IncludeUndefined) !== 0
    ? host.createUnionType?.([indexInfo.valueType, host.undefinedType]) ?? unionType([indexInfo.valueType, host.undefinedType])
    : indexInfo.valueType;
  return { name, type, optional: true, readonly: indexInfo.isReadonly === true, fromIndexInfo: true, missing: false };
}

function missingPropertyResult(name: string, host: ObjectMemberHost): PropertyLookupResult {
  return { name, type: host.unknownType, optional: false, readonly: false, fromIndexInfo: false, missing: true };
}

function findProperty(properties: readonly AstSymbol[], name: string): AstSymbol | undefined {
  return properties.find(property => symbolName(property) === name);
}

function findApplicableIndexInfo(type: Type, name: string, accessFlags: AccessFlags, host: ObjectMemberHost): IndexInfo | undefined {
  const keyType = /^[0-9]+$/.test(name) ? host.unknownType : host.unknownType;
  return findBestIndexInfo(type, keyType, accessFlags, host);
}

function findBestIndexInfo(type: Type, keyType: Type, accessFlags: AccessFlags, host: ObjectMemberHost): IndexInfo | undefined {
  return getApplicableIndexInfos(type, keyType, accessFlags, host)[0];
}

function isApplicableIndexInfo(info: IndexInfo, keyType: Type, accessFlags: AccessFlags): boolean {
  if ((accessFlags & AccessFlags.NoIndexSignatures) !== 0) return false;
  if ((accessFlags & AccessFlags.Writing) !== 0 && info.isReadonly === true) return false;
  if ((info.keyType.flags & TypeFlags.StringLike) !== 0) return true;
  if ((info.keyType.flags & TypeFlags.NumberLike) !== 0 && (keyType.flags & TypeFlags.NumberLike) !== 0) return true;
  return typeName(info.keyType) === typeName(keyType);
}

function propertyType(symbol: AstSymbol, host: ObjectMemberHost): Type {
  return (symbol as { readonly type?: Type }).type ?? getTypeOfSymbol(symbol) ?? host.unknownType;
}

function mergeSymbols(name: string, symbols: readonly AstSymbol[], host: ObjectMemberHost): AstSymbol | undefined {
  if (symbols.length === 0) return undefined;
  if (symbols.length === 1) return symbols[0];
  return {
    name,
    escapedName: name,
    flags: symbols.reduce((flags, symbol) => flags | (symbol.flags ?? SymbolFlags.None), SymbolFlags.Property),
    declarations: symbols.flatMap(symbol => symbol.declarations ?? []),
    type: host.createUnionType?.(symbols.map(symbol => propertyType(symbol, host))) ?? unionType(symbols.map(symbol => propertyType(symbol, host))),
  } as AstSymbol;
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

let nextSyntheticId = -4000;

function syntheticId(): number {
  nextSyntheticId -= 1;
  return nextSyntheticId;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}

function isOptionalSymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0 || Boolean((symbol as { readonly optional?: boolean }).optional);
}

function isReadonlySymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly)
    || (symbol.declarations ?? []).some(declaration => Boolean((declaration as { readonly readonly?: boolean }).readonly));
}

function isPrivateSymbol(symbol: AstSymbol): boolean {
  return symbolName(symbol).startsWith("#") || Boolean((symbol as { readonly private?: boolean }).private);
}

function isMethodOnlySymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Method) !== 0 && ((symbol.flags ?? 0) & SymbolFlags.Property) === 0;
}

function literalValue(type: Type): string {
  return String((type.data as { readonly value?: unknown } | undefined)?.value ?? "");
}

function typeName(type: Type): string {
  if (type.symbol?.name !== undefined) return type.symbol.name;
  if ((type.flags & TypeFlags.StringLike) !== 0) return "string";
  if ((type.flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return "boolean";
  if ((type.flags & TypeFlags.VoidLike) !== 0) return "void";
  if ((type.flags & TypeFlags.Never) !== 0) return "never";
  return `type:${type.id}`;
}
