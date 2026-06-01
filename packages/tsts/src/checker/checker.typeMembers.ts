/**
 * Checker mapped/union/intersection member resolution.
 *
 * Conceptual split from TS-Go `checker.go` sections that build declared,
 * inherited, mapped, union, and intersection members.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, MappedType, ObjectType, Signature, Type, TypeParameter, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";
import { appendIndexInfo, appendSignatures, getDefaultFromTypeParameter, getSignaturesOfType } from "./checker.signatures.js";

export interface MemberResolutionHost {
  readonly anyType: Type;
  readonly neverType: Type;
  readonly unknownType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  getPropertiesOfType(type: Type): readonly AstSymbol[];
  getIndexInfosOfType(type: Type): readonly IndexInfo[];
  getTypeOfPropertyOfType(type: Type, name: string): Type | undefined;
  createUnionType(types: readonly Type[]): Type;
  createIntersectionType(types: readonly Type[]): Type;
  instantiateType(type: Type, mapper: unknown): Type;
  report(node: AstNode | undefined, message: string): void;
}

export function getDefaultConstructSignatures(type: Type): readonly Signature[] {
  const constructSignatures = getSignaturesOfType(type, SignatureKind.Construct);
  if (constructSignatures.length !== 0) return constructSignatures;
  const callSignatures = getSignaturesOfType(type, SignatureKind.Call);
  return callSignatures.filter(signature => (signature.flags & SignatureFlagsConstructLike) !== 0);
}

export function resolveMappedTypeMembers(host: MemberResolutionHost, type: Type): ObjectType {
  const data = objectData(type);
  const mapped = type.data as MappedType | undefined;
  const members: SymbolTable = new Map();
  const sourceProperties = mapped?.constraintType === undefined ? [] : host.getPropertiesOfType(mapped.constraintType);
  for (const property of sourceProperties) {
    const nameType = mapped?.nameType ?? stringLiteralType(symbolName(property));
    const name = propertyNameFromType(nameType) ?? symbolName(property);
    members.set(name, createSymbolWithType(name, getTypeOfMappedSymbol(host, type, property)));
  }
  data.declaredProperties = [...members.values()];
  data.indexInfos = mapped?.constraintType === undefined
    ? []
    : host.getIndexInfosOfType(mapped.constraintType).map(info => ({
        keyType: mapped.nameType ?? info.keyType,
        valueType: mapped.templateType ?? info.valueType,
        isReadonly: mappedModifiersReadonly(mapped, info.isReadonly === true),
        ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
      }));
  data.objectFlags |= ObjectFlags.MembersResolved | ObjectFlags.Mapped;
  return data;
}

export function getTypeOfMappedSymbol(host: MemberResolutionHost, mappedType: Type, symbol: AstSymbol): Type {
  const mapped = mappedType.data as MappedType | undefined;
  const sourceType = getTypeOfSymbol(symbol) ?? host.unknownType;
  if (mapped?.templateType === undefined) return sourceType;
  return host.instantiateType(mapped.templateType, mapped.typeParameter?.mapper);
}

export function getLowerBoundOfKeyType(type: Type): Type {
  if ((type.flags & TypeFlags.Index) !== 0) return (type.data as { readonly type?: Type }).type ?? type;
  if ((type.flags & TypeFlags.Conditional) !== 0) return (type.data as { readonly checkType?: Type }).checkType ?? type;
  if ((type.flags & TypeFlags.Union) !== 0) return unionType(typeConstituents(type).map(getLowerBoundOfKeyType));
  if ((type.flags & TypeFlags.Intersection) !== 0) return intersectionType(typeConstituents(type).map(getLowerBoundOfKeyType));
  return type;
}

export function resolveUnionTypeMembers(host: MemberResolutionHost, type: Type): UnionOrIntersectionType {
  const data = unionData(type);
  const properties = new Map<string, AstSymbol>();
  for (const part of data.types) {
    for (const property of host.getPropertiesOfType(part)) {
      const existing = properties.get(symbolName(property));
      properties.set(symbolName(property), existing === undefined
        ? property
        : createUnionOrIntersectionProperty(host, type, symbolName(property), false));
    }
  }
  data.resolvedProperties = [...properties.values()];
  data.declaredProperties = data.resolvedProperties;
  data.declaredCallSignatures = getUnionSignatures(data.types.map(part => getSignaturesOfType(part, SignatureKind.Call)));
  data.declaredConstructSignatures = getUnionSignatures(data.types.map(part => getSignaturesOfType(part, SignatureKind.Construct)));
  data.indexInfos = data.types.flatMap(part => host.getIndexInfosOfType(part))
    .reduce((infos, info) => appendIndexInfo(infos, info, true) as IndexInfo[], [] as IndexInfo[]);
  return data;
}

export function getArrayMemberCallSignatures(type: Type, memberName: string): readonly Signature[] {
  const arrayTypes = typeConstituents(type).filter(isArrayOrTupleType);
  if (arrayTypes.length === 0) return [];
  return getUnionSignatures(arrayTypes.map(arrayType =>
    getSignaturesOfType(getTypeOfSymbol(getPropertyOfObjectType(arrayType, memberName)) ?? unknownType(), SignatureKind.Call),
  ));
}

export function isArrayOrTupleSymbol(symbol: AstSymbol | undefined): boolean {
  const name = symbolName(symbol);
  return name === "Array" || name === "ReadonlyArray" || name === "Tuple";
}

export function isReadonlyArraySymbol(symbol: AstSymbol | undefined): boolean {
  return symbolName(symbol) === "ReadonlyArray";
}

export function getUnionSignatures(signatureLists: readonly (readonly Signature[])[]): readonly Signature[] {
  let result: readonly Signature[] = [];
  for (const signatures of signatureLists) result = appendSignatures(result, signatures);
  return result;
}

export function resolveIntersectionTypeMembers(host: MemberResolutionHost, type: Type): UnionOrIntersectionType {
  const data = unionData(type);
  const properties = new Map<string, AstSymbol>();
  let callSignatures: readonly Signature[] = [];
  let constructSignatures: readonly Signature[] = [];
  let indexInfos: readonly IndexInfo[] = [];
  for (const part of data.types) {
    for (const property of host.getPropertiesOfType(part)) {
      properties.set(symbolName(property), properties.get(symbolName(property)) ?? property);
    }
    callSignatures = appendSignatures(callSignatures, getSignaturesOfType(part, SignatureKind.Call));
    constructSignatures = appendSignatures(constructSignatures, getSignaturesOfType(part, SignatureKind.Construct));
    for (const info of host.getIndexInfosOfType(part)) indexInfos = appendIndexInfo(indexInfos, info, false) as readonly IndexInfo[];
  }
  data.resolvedProperties = [...properties.values()];
  data.declaredProperties = data.resolvedProperties;
  data.declaredCallSignatures = callSignatures;
  data.declaredConstructSignatures = constructSignatures;
  data.indexInfos = indexInfos;
  return data;
}

export function getPropertyOfObjectType(type: Type, name: string): AstSymbol | undefined {
  const data = objectData(type);
  return membersOf(type.symbol).get(name)
    ?? data.declaredProperties?.find(property => symbolName(property) === name);
}

export function getPropertyOfUnionOrIntersectionType(host: MemberResolutionHost, type: Type, name: string): AstSymbol | undefined {
  const data = unionData(type);
  data.propertyCache ??= new Map<string, AstSymbol>();
  const cached = data.propertyCache.get(name);
  if (cached !== undefined) return cached;
  const property = getUnionOrIntersectionProperty(host, type, name);
  if (property !== undefined) data.propertyCache.set(name, property);
  return property;
}

export function getUnionOrIntersectionProperty(host: MemberResolutionHost, type: Type, name: string): AstSymbol | undefined {
  const data = unionData(type);
  const properties = data.types.map(part => getPropertyOfObjectType(part, name)).filter((symbol): symbol is AstSymbol => symbol !== undefined);
  if (properties.length === 0) return undefined;
  if (properties.length === 1) return properties[0];
  return createUnionOrIntersectionProperty(host, type, name, (type.flags & TypeFlags.Union) !== 0);
}

export function createUnionOrIntersectionProperty(host: MemberResolutionHost, containingType: Type, name: string, isUnion: boolean): AstSymbol {
  const parts = typeConstituents(containingType);
  const propertyTypes = parts
    .map(part => host.getTypeOfPropertyOfType(part, name))
    .filter((type): type is Type => type !== undefined);
  const syntheticType = propertyTypes.length === 0
    ? host.neverType
    : isUnion
      ? host.createUnionType(propertyTypes)
      : host.createIntersectionType(propertyTypes);
  const declarations = parts.flatMap(part => getPropertyOfObjectType(part, name)?.declarations ?? []);
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Property,
    declarations,
    synthetic: true,
    syntheticType,
  } as AstSymbol;
}

export function getTargetSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly target?: AstSymbol }).target ?? symbol;
}

export function isPrototypeProperty(symbol: AstSymbol | undefined): boolean {
  return symbolName(symbol) === "prototype";
}

export function hasCommonDeclaration(left: AstSymbol, right: AstSymbol): boolean {
  const rightDeclarations = new Set(right.declarations ?? []);
  return (left.declarations ?? []).some(declaration => rightDeclarations.has(declaration));
}

export function createSymbolWithType(name: string, type: Type): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Property,
    declarations: [],
    synthetic: true,
    syntheticType: type,
  } as AstSymbol;
}

export function isMappedTypeGenericIndexedAccess(type: Type): boolean {
  const mapped = type.data as MappedType | undefined;
  return ((mapped?.objectFlags ?? 0) & ObjectFlags.Mapped) !== 0
    && mapped?.constraintType !== undefined
    && (mapped.constraintType.flags & TypeFlags.IndexedAccess) !== 0;
}

export function getApparentTypeOfMappedType(host: MemberResolutionHost, type: Type): Type {
  return getResolvedApparentTypeOfMappedType(host, type);
}

export function getResolvedApparentTypeOfMappedType(host: MemberResolutionHost, type: Type): Type {
  const mapped = type.data as MappedType | undefined;
  if (mapped?.resolvedApparentType !== undefined) return mapped.resolvedApparentType;
  const apparent = mapped?.constraintType === undefined ? type : host.createIntersectionType([type, mapped.constraintType]);
  if (mapped !== undefined) mapped.resolvedApparentType = apparent;
  return apparent;
}

export function getApparentTypeOfIntersectionType(host: MemberResolutionHost, type: Type): Type {
  const intersection = type.data as { resolvedApparentType?: Type } | undefined;
  if (intersection?.resolvedApparentType !== undefined) return intersection.resolvedApparentType;
  const apparent = host.createIntersectionType(typeConstituents(type).map(part => getReducedApparentType(host, part)));
  if (intersection !== undefined) intersection.resolvedApparentType = apparent;
  return apparent;
}

export function getReducedUnionType(host: MemberResolutionHost, type: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return type;
  const reduced = typeConstituents(type).filter(part => !isNeverReducedProperty(part));
  return reduced.length === typeConstituents(type).length ? type : host.createUnionType(reduced);
}

export function isNeverReducedProperty(type: Type): boolean {
  return (type.flags & TypeFlags.Never) !== 0
    || ((type.data as ObjectType | undefined)?.declaredProperties ?? []).some(property => (getTypeOfSymbol(property)?.flags ?? 0) & TypeFlags.Never);
}

export function getReducedApparentType(host: MemberResolutionHost, type: Type): Type {
  if ((type.flags & TypeFlags.Union) !== 0) return getReducedUnionType(host, type);
  if ((type.flags & TypeFlags.Intersection) !== 0) return getApparentTypeOfIntersectionType(host, type);
  if (((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Mapped) return getApparentTypeOfMappedType(host, type);
  return type;
}

export function elaborateNeverIntersection(host: Pick<MemberResolutionHost, "report">, node: AstNode | undefined, type: Type): string {
  const conflicting = (type.data as ObjectType | undefined)?.declaredProperties?.find(property => (getTypeOfSymbol(property)?.flags ?? 0) & TypeFlags.Never);
  const message = conflicting === undefined
    ? `Intersection ${typeName(type)} reduced to never.`
    : `Property ${symbolName(conflicting)} has conflicting types and reduces the intersection to never.`;
  host.report(node, message);
  return message;
}

export function isDiscriminantWithNeverType(symbol: AstSymbol): boolean {
  const type = getTypeOfSymbol(symbol);
  return type !== undefined && (type.flags & TypeFlags.Never) !== 0 && ((symbol.flags ?? 0) & SymbolFlags.Optional) === 0;
}

export function isConflictingPrivateProperty(symbol: AstSymbol): boolean {
  return symbolName(symbol).startsWith("#");
}

export function getEffectiveTypeArguments(type: Type): readonly Type[] {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? type.aliasTypeArguments ?? [];
}

export function getDefaultTypeArgumentType(isJavaScript: boolean): Type {
  return isJavaScript ? intrinsicType(TypeFlags.Any, "any") : intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getResolvedTypeParameterDefault(typeParameter: TypeParameter): Type | undefined {
  const cached = (typeParameter as { defaultType?: Type }).defaultType;
  if (cached !== undefined) return cached;
  const resolved = typeParameter.constraint ?? undefined;
  if (resolved !== undefined) (typeParameter as { defaultType?: Type }).defaultType = resolved;
  return resolved;
}

export function getDefaultOrUnknownFromTypeParameter(typeParameter: TypeParameter): Type {
  return getResolvedTypeParameterDefault(typeParameter) ?? getDefaultFromTypeParameter(typeParameter) ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

export function getNamedMembers(symbols: SymbolTable | undefined): readonly AstSymbol[] {
  return [...symbols?.values() ?? []].filter(isNamedMember);
}

export function isDeclarationContainedBy(declaration: AstNode | undefined, container: AstNode | undefined): boolean {
  for (let current = declaration; current !== undefined; current = parentOf(current)) {
    if (current === container) return true;
  }
  return false;
}

export function isNamedMember(symbol: AstSymbol): boolean {
  const name = symbolName(symbol);
  return name.length !== 0 && !name.startsWith("__");
}

export function symbolIsValue(symbol: AstSymbol | undefined): boolean {
  return symbolIsValueEx(symbol, false);
}

export function symbolIsValueEx(symbol: AstSymbol | undefined, includeTypeOnlyMembers: boolean): boolean {
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Value) !== 0) return true;
  return includeTypeOnlyMembers && ((symbol.flags ?? 0) & (SymbolFlags.Property | SymbolFlags.Method | SymbolFlags.Accessor)) !== 0;
}

function objectData(type: Type): ObjectType {
  const data = type.data as ObjectType | undefined;
  if (data !== undefined) return data;
  const created: ObjectType = { objectFlags: ObjectFlags.Anonymous, declaredProperties: [] };
  (type as { data: ObjectType }).data = created;
  return created;
}

function unionData(type: Type): UnionOrIntersectionType {
  const data = type.data as UnionOrIntersectionType | undefined;
  if (data !== undefined && data.types !== undefined) return data;
  const created: UnionOrIntersectionType = { types: [], objectFlags: ObjectFlags.None };
  (type as { data: UnionOrIntersectionType }).data = created;
  return created;
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function membersOf(symbol: AstSymbol | undefined): SymbolTable {
  return (symbol as { readonly members?: SymbolTable } | undefined)?.members ?? new Map<string, AstSymbol>();
}

function propertyNameFromType(type: Type): string | undefined {
  const value = (type.data as { readonly value?: string | number | boolean } | undefined)?.value;
  return value === undefined ? undefined : String(value);
}

function mappedModifiersReadonly(mapped: MappedType | undefined, fallback: boolean): boolean {
  const readonlyModifier = (mapped?.declaration as { readonly readonlyToken?: AstNode } | undefined)?.readonlyToken;
  if (readonlyModifier === undefined) return fallback;
  return nodeText(readonlyModifier) !== "-readonly";
}

function isArrayOrTupleType(type: Type): boolean {
  const objectFlags = (type.data as ObjectType | undefined)?.objectFlags ?? 0;
  return (objectFlags & ObjectFlags.Tuple) !== 0 || isArrayOrTupleSymbol(type.symbol);
}

function stringLiteralType(value: string): Type {
  return { flags: TypeFlags.StringLiteral, id: nextSyntheticTypeId(), data: { value } };
}

function unknownType(): Type {
  return intrinsicType(TypeFlags.Unknown, "unknown");
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 1 ? unique[0]! : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

function intersectionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 1 ? unique[0]! : { flags: TypeFlags.Intersection, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: nextSyntheticTypeId(), data: { intrinsicName, objectFlags: ObjectFlags.None } };
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function typeName(type: Type): string {
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

const SignatureFlagsConstructLike = SignatureFlags.Construct | SignatureFlags.Abstract;
let syntheticTypeId = -1_250_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
