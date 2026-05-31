/**
 * Indexed access, index types, and key lookup checks.
 *
 * This ports the checker.go indexed-access region: `T[K]`, element access,
 * keyof/index type creation, readonly index writes, tuple/array index
 * handling, nonexistent-property suggestions, exact optional mismatches, and
 * generic deferral decisions.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, IndexedAccessType, IndexType, ObjectType, Type, UnionOrIntersectionType } from "./types.js";
import { AccessFlags, IndexFlags, ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface IndexedAccessHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly symbolType?: Type;
  readonly booleanType: Type;
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getWriteTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly getIndexTypeOfType?: (type: Type, keyType: Type) => Type | undefined;
  readonly getApplicableIndexInfo?: (type: Type, keyType: Type) => IndexInfo | undefined;
  readonly getBaseConstraintOfType?: (type: Type) => Type | undefined;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly createIndexedAccessType?: (objectType: Type, indexType: Type, accessFlags: AccessFlags) => Type;
  readonly createIndexType?: (target: Type, indexFlags: IndexFlags) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface IndexedAccessResult {
  readonly objectType: Type;
  readonly indexType: Type;
  readonly accessFlags: AccessFlags;
  readonly resultType: Type;
  readonly deferred: boolean;
  readonly diagnostic?: string;
}

export interface PropertyLookupResult {
  readonly property?: AstSymbol;
  readonly propertyType?: Type;
  readonly indexInfo?: IndexInfo;
  readonly resolvedType?: Type;
  readonly missing: boolean;
  readonly readonlyViolation: boolean;
}

export interface IndexKeyCollection {
  readonly stringLike: readonly Type[];
  readonly numberLike: readonly Type[];
  readonly symbolLike: readonly Type[];
  readonly literalKeys: readonly Type[];
}

export function getIndexedAccessType(objectType: Type, indexType: Type, host: IndexedAccessHost): Type {
  return getIndexedAccessTypeEx(objectType, indexType, AccessFlags.None, undefined, host).resultType;
}

export function getIndexedAccessTypeEx(objectType: Type, indexType: Type, accessFlags: AccessFlags, accessNode: AstNode | undefined, host: IndexedAccessHost): IndexedAccessResult {
  const found = getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags, accessNode, host);
  if (found !== undefined) return found;
  const diagnostic = "Type cannot be used to index the target type.";
  if (accessNode !== undefined) host.report?.(accessNode, diagnostic);
  return { objectType, indexType, accessFlags, resultType: host.unknownType, deferred: false, diagnostic };
}

export function getIndexedAccessTypeOrUndefined(objectType: Type, indexType: Type, accessFlags: AccessFlags, accessNode: AstNode | undefined, host: IndexedAccessHost): IndexedAccessResult | undefined {
  if (isErrorLike(objectType) || isErrorLike(indexType)) return { objectType, indexType, accessFlags, resultType: host.anyType, deferred: false };
  if (shouldDeferIndexedAccessType(objectType, indexType, accessNode)) {
    const deferred = host.createIndexedAccessType?.(objectType, indexType, accessFlags) ?? newIndexedAccessType(objectType, indexType, accessFlags);
    return { objectType, indexType, accessFlags, resultType: deferred, deferred: true };
  }
  if ((indexType.flags & TypeFlags.Union) !== 0) {
    const results: Type[] = [];
    for (const part of constituentTypes(indexType)) {
      const indexed = getIndexedAccessTypeOrUndefined(objectType, part, accessFlags, accessNode, host);
      if (indexed === undefined) return undefined;
      results.push(indexed.resultType);
    }
    return { objectType, indexType, accessFlags, resultType: combineIndexedResults(results, isWriting(accessFlags), host), deferred: false };
  }
  const propertyName = getPropertyNameFromIndex(indexType, accessNode);
  if (propertyName !== undefined) {
    const property = getPropertyTypeForIndexType(objectType, objectType, indexType, indexType, accessNode, accessFlags, host, propertyName);
    if (property !== undefined) return { objectType, indexType, accessFlags, resultType: property.resolvedType ?? host.unknownType, deferred: false };
  }
  const indexInfo = host.getApplicableIndexInfo?.(objectType, indexType) ?? findApplicableIndexInfo(host.getIndexInfosOfType?.(objectType) ?? [], indexType);
  if (indexInfo !== undefined) {
    if (isWriting(accessFlags) && indexInfo.isReadonly === true && accessNode !== undefined) errorIfWritingToReadonlyIndex(indexInfo, objectType, accessNode, host);
    return { objectType, indexType, accessFlags, resultType: indexInfo.valueType, deferred: false };
  }
  if ((objectType.flags & TypeFlags.UnionOrIntersection) !== 0) return indexedAccessThroughUnionOrIntersection(objectType, indexType, accessFlags, accessNode, host);
  return undefined;
}

export function getPropertyTypeForIndexType(
  originalObjectType: Type,
  objectType: Type,
  indexType: Type,
  fullIndexType: Type,
  accessNode: AstNode | undefined,
  accessFlags: AccessFlags,
  host: IndexedAccessHost,
  propertyName = getPropertyNameFromIndex(indexType, accessNode),
): PropertyLookupResult | undefined {
  if (propertyName === undefined) return undefined;
  const property = host.getPropertyOfType?.(objectType, propertyName);
  if (property !== undefined) {
    const write = isWriting(accessFlags);
    const readonlyViolation = write && isReadonlySymbol(property) && !isThisPropertyAccessInConstructor(accessNode, property);
    if (readonlyViolation && accessNode !== undefined) host.report?.(accessNode, `Cannot assign to read-only property '${propertyName}'.`);
    const propertyType = (write ? host.getWriteTypeOfSymbol?.(property) ?? host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property) : host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property)) ?? host.unknownType;
    const resolvedType = accessIncludesUndefined(accessFlags) ? includeUndefined(propertyType, host) : propertyType;
    return { property, propertyType, resolvedType, missing: false, readonlyViolation };
  }
  const indexInfo = host.getApplicableIndexInfo?.(objectType, indexType) ?? findApplicableIndexInfo(host.getIndexInfosOfType?.(objectType) ?? [], indexType);
  if (indexInfo !== undefined) {
    if (isWriting(accessFlags) && indexInfo.isReadonly === true && accessNode !== undefined) errorIfWritingToReadonlyIndex(indexInfo, objectType, accessNode, host);
    return { indexInfo, propertyType: indexInfo.valueType, resolvedType: indexInfo.valueType, missing: false, readonlyViolation: indexInfo.isReadonly === true && isWriting(accessFlags) };
  }
  if (accessNode !== undefined && !allowsMissing(accessFlags)) {
    const suggestion = getSuggestionForNonexistentProperty(propertyName, objectType, host);
    host.report?.(accessNode, suggestion === undefined ? `Property '${propertyName}' does not exist on type.` : `Property '${propertyName}' does not exist. Did you mean '${suggestion}'?`);
  }
  void originalObjectType;
  void fullIndexType;
  return { missing: true, readonlyViolation: false };
}

export function getIndexType(type: Type, host: IndexedAccessHost): Type {
  return getIndexTypeEx(type, IndexFlags.None, host);
}

export function getIndexTypeEx(type: Type, indexFlags: IndexFlags, host: IndexedAccessHost): Type {
  if (shouldDeferIndexType(type, indexFlags)) return host.createIndexType?.(type, indexFlags) ?? newIndexType(type, indexFlags);
  if ((type.flags & TypeFlags.Union) !== 0) {
    const indexes = constituentTypes(type).map(part => getIndexTypeEx(part, indexFlags, host));
    return host.createIntersectionType?.(indexes) ?? intersectionType(indexes);
  }
  if ((type.flags & TypeFlags.Intersection) !== 0) {
    const indexes = constituentTypes(type).map(part => getIndexTypeEx(part, indexFlags, host));
    return host.createUnionType?.(indexes) ?? unionType(indexes);
  }
  const keys = getLiteralTypeFromProperties(type, TypeFlags.StringOrNumberLiteralOrUnique, true, host);
  if (keys.length === 0) return host.neverType;
  return host.createUnionType?.(keys) ?? unionType(keys);
}

export function getExtractStringType(type: Type, host: IndexedAccessHost): Type {
  if ((type.flags & TypeFlags.StringLike) !== 0) return type;
  if ((type.flags & TypeFlags.Union) !== 0) {
    const strings = constituentTypes(type).filter(part => (part.flags & TypeFlags.StringLike) !== 0);
    return strings.length === 0 ? host.neverType : host.createUnionType?.(strings) ?? unionType(strings);
  }
  return host.neverType;
}

export function getLiteralTypeFromProperties(type: Type, include: TypeFlags, includeOrigin: boolean, host: IndexedAccessHost): readonly Type[] {
  const propertyKeys = (host.getPropertiesOfType?.(type) ?? []).map(property => getLiteralTypeFromProperty(property, include, true, host)).filter((item): item is Type => item !== undefined);
  const indexKeys = (host.getIndexInfosOfType?.(type) ?? []).flatMap(info => getLiteralTypeFromIndexInfo(info, include, includeOrigin, host));
  return uniqueTypes([...propertyKeys, ...indexKeys]);
}

export function getLiteralTypeFromProperty(property: AstSymbol, include: TypeFlags, includeNonPublic: boolean, host: IndexedAccessHost): Type | undefined {
  if (!includeNonPublic && isPrivateOrProtected(property)) return undefined;
  const name = symbolName(property);
  const type = literalTypeForName(name, host);
  return (type.flags & include) !== 0 ? type : undefined;
}

export function getLiteralTypeFromPropertyName(name: AstNode, host: IndexedAccessHost): Type {
  const text = nodeText(name);
  return literalTypeForName(text, host);
}

export function isKeyTypeIncluded(keyType: Type, include: TypeFlags): boolean {
  if ((keyType.flags & include) !== 0) return true;
  if ((keyType.flags & TypeFlags.Union) !== 0) return constituentTypes(keyType).some(part => isKeyTypeIncluded(part, include));
  return false;
}

export function getApplicableIndexInfos(type: Type, keyType: Type, host: IndexedAccessHost): readonly IndexInfo[] {
  return (host.getIndexInfosOfType?.(type) ?? []).filter(info => isApplicableIndexType(keyType, info.keyType));
}

export function getApplicableIndexSymbol(type: Type, keyType: Type, host: IndexedAccessHost): AstSymbol | undefined {
  const infos = getApplicableIndexInfos(type, keyType, host);
  if (infos.length === 0) return undefined;
  return (infos[0] as { readonly symbol?: AstSymbol }).symbol;
}

export function getPropertyNameFromIndex(indexType: Type, accessNode: AstNode | undefined): string | undefined {
  const literal = literalValue(indexType);
  if (literal !== undefined) return String(literal);
  if (accessNode !== undefined) {
    const indexNode = getIndexNodeForAccessExpression(accessNode);
    const text = nodeText(indexNode);
    if (text.length !== 0) return stripQuotes(text);
  }
  return undefined;
}

export function getIndexNodeForAccessExpression(accessNode: AstNode): AstNode | undefined {
  if (accessNode.kind === Kind.ElementAccessExpression) return (accessNode as { readonly argumentExpression?: AstNode }).argumentExpression;
  if (accessNode.kind === Kind.PropertyAccessExpression) return (accessNode as { readonly name?: AstNode }).name;
  if (accessNode.kind === Kind.IndexedAccessType) return (accessNode as { readonly indexType?: AstNode }).indexType;
  return undefined;
}

export function errorIfWritingToReadonlyIndex(indexInfo: IndexInfo, objectType: Type, accessExpression: AstNode, host: IndexedAccessHost): void {
  if (indexInfo.isReadonly === true) host.report?.(accessExpression, "Index signature in type only permits reading.");
  void objectType;
}

export function isAssignmentToReadonlyEntity(expr: AstNode, symbol: AstSymbol | undefined, assignmentKind: "none" | "definite" | "compound" | "prefix" | "postfix"): boolean {
  if (symbol === undefined) return false;
  if (assignmentKind === "none") return false;
  if (isReadonlySymbol(symbol) && !isThisPropertyAccessInConstructor(expr, symbol)) return true;
  return false;
}

export function isThisPropertyAccessInConstructor(node: AstNode | undefined, property: AstSymbol): boolean {
  if (node === undefined) return false;
  const access = node.kind === Kind.PropertyAccessExpression ? node : findAncestor(node, Kind.PropertyAccessExpression);
  if (access === undefined || propertyAccessName(access) !== symbolName(property)) return false;
  const expression = (access as { readonly expression?: AstNode }).expression;
  if (nodeText(expression) !== "this") return false;
  return nearestFunction(node)?.kind === Kind.Constructor;
}

export function getExactOptionalUnassignableProperties(source: Type, target: Type, host: IndexedAccessHost): readonly AstSymbol[] {
  const result: AstSymbol[] = [];
  for (const targetProperty of host.getPropertiesOfType?.(target) ?? []) {
    if (!isOptionalProperty(targetProperty)) continue;
    const sourceProperty = host.getPropertyOfType?.(source, symbolName(targetProperty));
    if (sourceProperty === undefined) continue;
    if (isExactOptionalPropertyMismatch(host.getTypeOfSymbol?.(sourceProperty) ?? getTypeOfSymbol(sourceProperty), host.getTypeOfSymbol?.(targetProperty) ?? getTypeOfSymbol(targetProperty))) {
      result.push(targetProperty);
    }
  }
  return result;
}

export function isExactOptionalPropertyMismatch(source: Type | undefined, target: Type | undefined): boolean {
  if (source === undefined || target === undefined) return false;
  return containsUndefinedType(source) && !containsUndefinedType(target);
}

export function containsUndefinedType(type: Type): boolean {
  if ((type.flags & TypeFlags.Undefined) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(containsUndefinedType);
  return false;
}

export function hasEmptyObjectIntersection(type: Type, host: IndexedAccessHost): boolean {
  if ((type.flags & TypeFlags.Intersection) === 0) return false;
  return constituentTypes(type).some(part => (host.getPropertiesOfType?.(part) ?? []).length === 0 && (host.getIndexInfosOfType?.(part) ?? []).length === 0);
}

export function shouldDeferIndexedAccessType(objectType: Type, indexType: Type, accessNode: AstNode | undefined): boolean {
  if ((objectType.flags & TypeFlags.Instantiable) !== 0 || (indexType.flags & TypeFlags.Instantiable) !== 0) return true;
  if ((objectType.flags & TypeFlags.TypeParameter) !== 0 || (indexType.flags & TypeFlags.TypeParameter) !== 0) return true;
  if (accessNode?.kind === Kind.IndexedAccessType && ((objectType.flags | indexType.flags) & TypeFlags.Simplifiable) !== 0) return true;
  return false;
}

export function shouldDeferIndexType(type: Type, indexFlags: IndexFlags): boolean {
  if ((type.flags & TypeFlags.Instantiable) !== 0) return true;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0 && constituentTypes(type).some(part => shouldDeferIndexType(part, indexFlags))) return true;
  return (indexFlags & IndexFlags.NoIndexSignatures) === 0 && (type.flags & TypeFlags.Index) !== 0;
}

export function getIndexTypeForGenericType(type: Type, indexFlags: IndexFlags, host: IndexedAccessHost): Type {
  return host.createIndexType?.(type, indexFlags) ?? newIndexType(type, indexFlags);
}

export function getIndexedMappedTypeSubstitutedTypeOfContextualType(type: Type, name: string, nameType: Type, host: IndexedAccessHost): Type | undefined {
  const property = host.getPropertyOfType?.(type, name);
  if (property !== undefined) return host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
  const index = host.getApplicableIndexInfo?.(type, nameType);
  return index?.valueType;
}

export function isExcludedMappedPropertyName(type: Type, propertyNameType: Type): boolean {
  const data = type.data as { readonly excludedKeys?: readonly Type[] } | undefined;
  return data?.excludedKeys?.some(key => key === propertyNameType || literalValue(key) === literalValue(propertyNameType)) ?? false;
}

export function getTypeOfConcretePropertyOfContextualType(type: Type, name: string, host: IndexedAccessHost): Type | undefined {
  const property = host.getPropertyOfType?.(type, name);
  if (property === undefined || isSyntheticMappedProperty(property)) return undefined;
  return host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
}

export function getTypeFromIndexInfosOfContextualType(type: Type, name: string, nameType: Type, host: IndexedAccessHost): Type | undefined {
  const exact = host.getApplicableIndexInfo?.(type, nameType);
  if (exact !== undefined) return exact.valueType;
  return host.getApplicableIndexInfo?.(type, isNumericName(name) ? host.numberType : host.stringType)?.valueType;
}

export function getSuggestionForNonexistentProperty(name: string, containingType: Type, host: IndexedAccessHost): string | undefined {
  const names = (host.getPropertiesOfType?.(containingType) ?? []).map(symbolName);
  return bestSpellingSuggestion(name, names);
}

export function getSuggestionForNonexistentIndexSignature(objectType: Type, expr: AstNode, keyedType: Type, host: IndexedAccessHost): string | undefined {
  const propertyName = getPropertyNameFromIndex(keyedType, expr);
  return propertyName === undefined ? undefined : getSuggestionForNonexistentProperty(propertyName, objectType, host);
}

export function typeHasStaticProperty(propName: string, containingType: Type, host: IndexedAccessHost): boolean {
  return host.getPropertyOfType?.(containingType, propName) !== undefined
    || (host.getBaseConstraintOfType?.(containingType) !== undefined && host.getPropertyOfType?.(host.getBaseConstraintOfType(containingType)!, propName) !== undefined);
}

function indexedAccessThroughUnionOrIntersection(objectType: Type, indexType: Type, accessFlags: AccessFlags, accessNode: AstNode | undefined, host: IndexedAccessHost): IndexedAccessResult | undefined {
  const results: Type[] = [];
  for (const part of constituentTypes(objectType)) {
    const indexed = getIndexedAccessTypeOrUndefined(part, indexType, accessFlags, accessNode, host);
    if (indexed === undefined) return undefined;
    results.push(indexed.resultType);
  }
  return { objectType, indexType, accessFlags, resultType: combineIndexedResults(results, isWriting(accessFlags), host), deferred: false };
}

function combineIndexedResults(types: readonly Type[], writing: boolean, host: IndexedAccessHost): Type {
  if (types.length === 0) return host.neverType;
  if (types.length === 1) return types[0]!;
  return writing ? host.createIntersectionType?.(types) ?? intersectionType(types) : host.createUnionType?.(types) ?? unionType(types);
}

function findApplicableIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find(info => isApplicableIndexType(keyType, info.keyType));
}

function isApplicableIndexType(source: Type, target: Type): boolean {
  if ((target.flags & TypeFlags.StringLike) !== 0) return (source.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.AnyOrUnknown)) !== 0 || isNumericStringLiteral(source);
  if ((target.flags & TypeFlags.NumberLike) !== 0) return (source.flags & (TypeFlags.NumberLike | TypeFlags.AnyOrUnknown)) !== 0 || isNumericStringLiteral(source);
  if ((target.flags & TypeFlags.ESSymbolLike) !== 0) return (source.flags & (TypeFlags.ESSymbolLike | TypeFlags.AnyOrUnknown)) !== 0;
  return (source.flags & target.flags) !== 0 || (source.flags & TypeFlags.AnyOrUnknown) !== 0;
}

function includeUndefined(type: Type | undefined, host: IndexedAccessHost): Type {
  if (type === undefined) return host.undefinedType;
  if (containsUndefinedType(type)) return type;
  return host.createUnionType?.([type, host.undefinedType]) ?? unionType([type, host.undefinedType]);
}

function accessIncludesUndefined(accessFlags: AccessFlags): boolean {
  return (accessFlags & AccessFlags.IncludeUndefined) !== 0;
}

function isWriting(accessFlags: AccessFlags): boolean {
  return (accessFlags & AccessFlags.Writing) !== 0;
}

function allowsMissing(accessFlags: AccessFlags): boolean {
  return (accessFlags & AccessFlags.AllowMissing) !== 0;
}

function newIndexedAccessType(objectType: Type, indexType: Type, accessFlags: AccessFlags): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.IndexedAccess, data: { objectType, indexType, accessFlags } as IndexedAccessType };
}

function newIndexType(target: Type, indexFlags: IndexFlags): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Index, data: { type: target, indexFlags } as IndexType };
}

function unionType(types: readonly Type[]): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: uniqueTypes(types), objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function intersectionType(types: readonly Type[]): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Intersection, data: { types: uniqueTypes(types), objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function literalTypeForName(name: string, host: IndexedAccessHost): Type {
  const numeric = Number(name);
  if (isNumericName(name)) return { id: nextSyntheticTypeId(), flags: TypeFlags.NumberLiteral, data: { value: numeric } };
  return { id: nextSyntheticTypeId(), flags: TypeFlags.StringLiteral, data: { value: name } };
}

function getLiteralTypeFromIndexInfo(info: IndexInfo, include: TypeFlags, includeOrigin: boolean, host: IndexedAccessHost): readonly Type[] {
  const key = info.keyType;
  if (isKeyTypeIncluded(key, include)) return [key];
  if ((key.flags & TypeFlags.StringLike) !== 0 && (include & TypeFlags.StringLike) !== 0) return [host.stringType];
  if ((key.flags & TypeFlags.NumberLike) !== 0 && (include & TypeFlags.NumberLike) !== 0) return [host.numberType];
  if ((key.flags & TypeFlags.ESSymbolLike) !== 0 && host.symbolType !== undefined && (include & TypeFlags.ESSymbolLike) !== 0) return [host.symbolType];
  void includeOrigin;
  return [];
}

function uniqueTypes(types: readonly Type[]): readonly Type[] {
  return [...new Set(types)];
}

function literalValue(type: Type): string | number | boolean | undefined {
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? value : undefined;
}

function isNumericStringLiteral(type: Type): boolean {
  const value = literalValue(type);
  return typeof value === "string" && isNumericName(value);
}

function isNumericName(name: string): boolean {
  return name !== "" && String(Number(name)) === name;
}

function stripQuotes(text: string): string {
  return text.replace(/^["'`](.*)["'`]$/, "$1");
}

function isReadonlySymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly)
    || (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "readonly"))
    || ((symbol.flags ?? 0) & SymbolFlags.Transient) !== 0 && symbolName(symbol).startsWith("readonly ");
}

function isOptionalProperty(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0 || (symbol.declarations ?? []).some(declaration => Boolean((declaration as { readonly questionToken?: unknown }).questionToken));
}

function isPrivateOrProtected(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "private") || hasModifier(declaration, "protected"));
}

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] } | undefined)?.modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function propertyAccessName(node: AstNode): string {
  if (node.kind === Kind.PropertyAccessExpression) return nodeText((node as { readonly name?: AstNode }).name);
  if (node.kind === Kind.ElementAccessExpression) return stripQuotes(nodeText((node as { readonly argumentExpression?: AstNode }).argumentExpression));
  return "";
}

function findAncestor(node: AstNode, kind: Kind): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === kind) return current;
    current = current.parent;
  }
  return undefined;
}

function nearestFunction(node: AstNode): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction || current.kind === Kind.MethodDeclaration || current.kind === Kind.Constructor) return current;
    current = current.parent;
  }
  return undefined;
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function bestSpellingSuggestion(name: string, candidates: readonly string[]): string | undefined {
  let best: string | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    const distance = levenshtein(name, candidate);
    if (distance < bestDistance && distance <= Math.max(2, Math.floor(name.length / 3))) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

function levenshtein(left: string, right: string): number {
  const dp = Array.from({ length: left.length + 1 }, () => new Array<number>(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) dp[i]![0] = i;
  for (let j = 0; j <= right.length; j += 1) dp[0]![j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost);
    }
  }
  return dp[left.length]![right.length]!;
}

function isErrorLike(type: Type): boolean {
  return (type.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0;
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function isSyntheticMappedProperty(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly syntheticMapped?: boolean }).syntheticMapped);
}

let syntheticTypeId = -3_200_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
