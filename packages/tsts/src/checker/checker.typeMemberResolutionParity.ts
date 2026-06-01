/**
 * Structured type member resolution.
 *
 * TS-Go keeps the core "what members does this type expose?" algorithms in
 * checker.go: object members, union/intersection properties, index signatures,
 * call/construct signatures, apparent types, and synthetic combined symbols.
 * The TSTS checker is split across smaller files, so this module ports that
 * checker.go region as explicit reusable operations instead of hiding it behind
 * ad hoc property-table reads.
 */

import type { Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, StructuredType, Type, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface TypeMemberResolutionHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly stringNumberSymbolType?: Type;
  readonly emptyObjectType?: Type;
  readonly arrayType?: Type;
  readonly readonlyArrayType?: Type;
  readonly getBaseTypes?: (type: Type) => readonly Type[];
  readonly getDeclaredMembersOfSymbol?: (symbol: AstSymbol) => StructuredMembers | undefined;
  readonly instantiateType?: (type: Type, mapper: unknown) => Type;
  readonly instantiateSignature?: (signature: Signature, mapper: unknown) => Signature;
  readonly createAnonymousType?: (symbol: AstSymbol | undefined, members: SymbolTable, callSignatures: readonly Signature[], constructSignatures: readonly Signature[], indexInfos: readonly IndexInfo[]) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly createSymbol?: (flags: number, name: string) => AstSymbol;
  readonly report?: (message: string) => void;
}

export interface StructuredMembers {
  readonly properties: readonly AstSymbol[];
  readonly callSignatures: readonly Signature[];
  readonly constructSignatures: readonly Signature[];
  readonly indexInfos: readonly IndexInfo[];
}

export interface UnionPropertyParts {
  readonly propertySymbols: readonly AstSymbol[];
  readonly propertyTypes: readonly Type[];
  readonly writeTypes: readonly Type[];
  readonly declarations: readonly unknown[];
  readonly flags: number;
  readonly optional: boolean;
  readonly readonly: boolean;
  readonly partial: boolean;
}

export interface MemberResolutionCache {
  readonly propertyCache: Map<string, AstSymbol>;
  readonly propertyCacheWithoutObjectFunctionAugment: Map<string, AstSymbol>;
  readonly resolvedStructuredTypes: WeakSet<object>;
}

export function createMemberResolutionCache(): MemberResolutionCache {
  return {
    propertyCache: new Map(),
    propertyCacheWithoutObjectFunctionAugment: new Map(),
    resolvedStructuredTypes: new WeakSet(),
  };
}

export function getPropertiesOfType(type: Type, host: TypeMemberResolutionHost): readonly AstSymbol[] {
  const reduced = getReducedApparentType(type, host);
  if ((reduced.flags & TypeFlags.UnionOrIntersection) !== 0) return getPropertiesOfUnionOrIntersectionType(reduced, host);
  if ((reduced.flags & TypeFlags.Object) !== 0) return getPropertiesOfObjectType(reduced, host);
  return [];
}

export function getPropertyOfType(type: Type, name: string, host: TypeMemberResolutionHost, skipObjectFunctionPropertyAugment = false, includeTypeOnlyMembers = false): AstSymbol | undefined {
  const apparent = getReducedApparentType(type, host);
  if ((apparent.flags & TypeFlags.Object) !== 0) {
    const property = getPropertyOfObjectType(apparent, name);
    if (property !== undefined && (includeTypeOnlyMembers || symbolIsValue(property))) return property;
    if (!skipObjectFunctionPropertyAugment) {
      const augmented = getObjectFunctionProperty(apparent, name, host);
      if (augmented !== undefined) return augmented;
    }
    return property;
  }
  if ((apparent.flags & TypeFlags.UnionOrIntersection) !== 0) {
    return getUnionOrIntersectionProperty(apparent, name, host, skipObjectFunctionPropertyAugment);
  }
  return undefined;
}

export function getTypeOfPropertyOfType(type: Type, name: string, host: TypeMemberResolutionHost): Type | undefined {
  const property = getPropertyOfType(type, name, host);
  return property === undefined ? undefined : getTypeOfSymbol(property);
}

export function getSignaturesOfType(type: Type, kind: SignatureKind, host: TypeMemberResolutionHost): readonly Signature[] {
  const apparent = getReducedApparentType(type, host);
  if ((apparent.flags & TypeFlags.Union) !== 0) {
    const lists = constituentTypes(apparent).map(part => getSignaturesOfType(part, kind, host)).filter(list => list.length !== 0);
    return getUnionSignatures(lists);
  }
  const structured = resolveStructuredTypeMembers(apparent, host);
  return kind === SignatureKind.Call ? structured.callSignatures : structured.constructSignatures;
}

export function getIndexInfosOfType(type: Type, host: TypeMemberResolutionHost): readonly IndexInfo[] {
  const apparent = getReducedApparentType(type, host);
  if ((apparent.flags & TypeFlags.Union) !== 0) return getUnionIndexInfos(constituentTypes(apparent), host);
  if ((apparent.flags & TypeFlags.Intersection) !== 0) return getIntersectionIndexInfos(constituentTypes(apparent), host);
  return resolveStructuredTypeMembers(apparent, host).indexInfos;
}

export function getIndexInfoOfType(type: Type, keyType: Type, host: TypeMemberResolutionHost): IndexInfo | undefined {
  return findApplicableIndexInfo(getIndexInfosOfType(type, host), keyType);
}

export function getIndexTypeOfType(type: Type, keyType: Type, host: TypeMemberResolutionHost, defaultType?: Type): Type | undefined {
  return getIndexInfoOfType(type, keyType, host)?.valueType ?? defaultType;
}

export function getApplicableIndexInfo(type: Type, keyType: Type, host: TypeMemberResolutionHost): IndexInfo | undefined {
  return findApplicableIndexInfo(getIndexInfosOfType(type, host), keyType);
}

export function getApplicableIndexInfoForName(type: Type, name: string, host: TypeMemberResolutionHost): IndexInfo | undefined {
  const keyType = numericName(name) ? host.numberType : host.stringType;
  return getApplicableIndexInfo(type, keyType, host);
}

export function findApplicableIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  let stringIndexInfo: IndexInfo | undefined;
  let applicable: IndexInfo | undefined;
  for (const info of indexInfos) {
    if (isStringIndexInfo(info)) stringIndexInfo = info;
    if (isApplicableIndexType(keyType, info.keyType)) {
      if (applicable === undefined) applicable = info;
      else applicable = combineIndexInfos(applicable, info);
    }
  }
  return applicable ?? (stringIndexInfo !== undefined && isApplicableIndexType(keyType, stringIndexInfo.keyType) ? stringIndexInfo : undefined);
}

export function isApplicableIndexType(source: Type, target: Type): boolean {
  if ((target.flags & TypeFlags.StringLike) !== 0) return (source.flags & (TypeFlags.StringLike | TypeFlags.NumberLike)) !== 0 || isNumericStringLiteral(source);
  if ((target.flags & TypeFlags.NumberLike) !== 0) return (source.flags & TypeFlags.NumberLike) !== 0 || isNumericStringLiteral(source);
  if ((target.flags & TypeFlags.ESSymbolLike) !== 0) return (source.flags & TypeFlags.ESSymbolLike) !== 0;
  return (source.flags & target.flags) !== 0;
}

export function resolveStructuredTypeMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const structured = asStructured(type);
  if (structured === undefined) return emptyMembers();
  const existing = structuredMembersFromData(structured);
  if (hasResolvedMembers(existing)) return existing;
  if ((type.flags & TypeFlags.Union) !== 0) return resolveUnionTypeMembers(type, host);
  if ((type.flags & TypeFlags.Intersection) !== 0) return resolveIntersectionTypeMembers(type, host);
  if ((type.flags & TypeFlags.Object) !== 0) return resolveObjectTypeMembers(type, host);
  return existing;
}

export function resolveObjectTypeMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const object = type.data as ObjectType | undefined;
  if (object === undefined) return emptyMembers();
  const symbol = symbolOfType(type);
  const declared = symbol === undefined ? undefined : host.getDeclaredMembersOfSymbol?.(symbol);
  const properties = declared?.properties ?? object.declaredProperties ?? [];
  const callSignatures = declared?.callSignatures ?? object.declaredCallSignatures ?? [];
  const constructSignatures = declared?.constructSignatures ?? object.declaredConstructSignatures ?? [];
  const indexInfos = declared?.indexInfos ?? object.indexInfos ?? [];
  object.declaredProperties = properties;
  object.declaredCallSignatures = callSignatures;
  object.declaredConstructSignatures = constructSignatures;
  object.indexInfos = indexInfos;
  return { properties, callSignatures, constructSignatures, indexInfos };
}

export function resolveClassOrInterfaceMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const own = resolveObjectTypeMembers(type, host);
  const inherited = inheritedMembers(type, host);
  if (inherited.length === 0) return own;
  const table = symbolsToTable(own.properties);
  for (const base of inherited) {
    for (const property of base.properties) if (!table.has(symbolName(property))) table.set(symbolName(property), property);
  }
  const callSignatures = [...own.callSignatures, ...inherited.flatMap(member => member.callSignatures)];
  const constructSignatures = [...own.constructSignatures, ...inherited.flatMap(member => member.constructSignatures)];
  const indexInfos = mergeIndexInfoLists([...own.indexInfos, ...inherited.flatMap(member => member.indexInfos)], false);
  setStructuredMembers(type, [...table.values()], callSignatures, constructSignatures, indexInfos);
  return { properties: [...table.values()], callSignatures, constructSignatures, indexInfos };
}

export function resolveTypeReferenceMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const object = type.data as ObjectType | undefined;
  const target = object?.target as Type | undefined;
  const targetMembers = target === undefined ? resolveObjectTypeMembers(type, host) : resolveStructuredTypeMembers(target, host);
  const mapper = (object as { readonly mapper?: unknown } | undefined)?.mapper;
  if (mapper === undefined || host.instantiateType === undefined) return targetMembers;
  const properties = targetMembers.properties.map(symbol => instantiateSymbol(symbol, mapper, host));
  const callSignatures = host.instantiateSignature === undefined ? targetMembers.callSignatures : targetMembers.callSignatures.map(signature => host.instantiateSignature!(signature, mapper));
  const constructSignatures = host.instantiateSignature === undefined ? targetMembers.constructSignatures : targetMembers.constructSignatures.map(signature => host.instantiateSignature!(signature, mapper));
  const indexInfos = targetMembers.indexInfos.map(info => instantiateIndexInfo(info, mapper, host));
  setStructuredMembers(type, properties, callSignatures, constructSignatures, indexInfos);
  return { properties, callSignatures, constructSignatures, indexInfos };
}

export function resolveUnionTypeMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const types = constituentTypes(type);
  const propertyNames = new Set(types.flatMap(part => getPropertiesOfType(part, host).map(symbolName)));
  const properties: AstSymbol[] = [];
  for (const name of propertyNames) {
    const property = createUnionOrIntersectionProperty(type, name, host, true);
    if (property !== undefined) properties.push(property);
  }
  const callSignatures = getUnionSignatures(types.map(part => getSignaturesOfType(part, SignatureKind.Call, host)));
  const constructSignatures = getUnionSignatures(types.map(part => getSignaturesOfType(part, SignatureKind.Construct, host)));
  const indexInfos = getUnionIndexInfos(types, host);
  setStructuredMembers(type, properties, callSignatures, constructSignatures, indexInfos);
  return { properties, callSignatures, constructSignatures, indexInfos };
}

export function resolveIntersectionTypeMembers(type: Type, host: TypeMemberResolutionHost): StructuredMembers {
  const table: SymbolTable = new Map();
  const callSignatures: Signature[] = [];
  const constructSignatures: Signature[] = [];
  let indexInfos: readonly IndexInfo[] = [];
  for (const part of constituentTypes(type)) {
    for (const property of getPropertiesOfType(part, host)) table.set(symbolName(property), mergeSameNamedProperty(table.get(symbolName(property)), property, host));
    callSignatures.push(...getSignaturesOfType(part, SignatureKind.Call, host));
    constructSignatures.push(...getSignaturesOfType(part, SignatureKind.Construct, host));
    indexInfos = mergeIndexInfoLists([...indexInfos, ...getIndexInfosOfType(part, host)], false);
  }
  const properties = [...table.values()];
  setStructuredMembers(type, properties, callSignatures, constructSignatures, indexInfos);
  return { properties, callSignatures, constructSignatures, indexInfos };
}

export function getPropertiesOfObjectType(type: Type, host: TypeMemberResolutionHost): readonly AstSymbol[] {
  if ((type.flags & TypeFlags.Object) === 0) return [];
  return resolveObjectTypeMembers(type, host).properties;
}

export function getPropertiesOfUnionOrIntersectionType(type: Type, host: TypeMemberResolutionHost): readonly AstSymbol[] {
  const data = type.data as UnionOrIntersectionType | undefined;
  if (data?.resolvedProperties !== undefined) return data.resolvedProperties;
  const members = resolveStructuredTypeMembers(type, host);
  if (data !== undefined) data.resolvedProperties = members.properties;
  return members.properties;
}

export function getPropertyOfObjectType(type: Type, name: string): AstSymbol | undefined {
  return asStructured(type)?.declaredProperties?.find(property => symbolName(property) === name);
}

export function getUnionOrIntersectionProperty(type: Type, name: string, host: TypeMemberResolutionHost, skipObjectFunctionPropertyAugment = false): AstSymbol | undefined {
  const data = type.data as UnionOrIntersectionType | undefined;
  const cache = skipObjectFunctionPropertyAugment ? data?.propertyCacheWithoutFunctionPropertyAugmentation : data?.propertyCache;
  const cached = cache?.get(name);
  if (cached !== undefined) return cached;
  const created = createUnionOrIntersectionProperty(type, name, host, (type.flags & TypeFlags.Union) !== 0);
  if (created !== undefined) {
    const targetCache = cache ?? new Map<string, AstSymbol>();
    targetCache.set(name, created);
    if (data !== undefined) {
      if (skipObjectFunctionPropertyAugment) data.propertyCacheWithoutFunctionPropertyAugmentation = targetCache;
      else data.propertyCache = targetCache;
    }
  }
  return created;
}

export function createUnionOrIntersectionProperty(type: Type, name: string, host: TypeMemberResolutionHost, isUnion: boolean): AstSymbol | undefined {
  const parts = collectUnionPropertyParts(type, name, host, isUnion);
  if (parts.propertySymbols.length === 0) return undefined;
  if (isUnion && parts.partial && !parts.optional) return undefined;
  const propertyType = combinePropertyTypes(parts.propertyTypes, isUnion, host);
  const writeType = parts.writeTypes.length === 0 ? propertyType : combinePropertyTypes(parts.writeTypes, isUnion, host);
  const base = firstDefined(parts.propertySymbols);
  const symbol = createSymbolLike(base, host, parts.flags, name);
  symbol.declarations = uniqueDeclarations(parts.propertySymbols);
  (symbol as { type?: Type }).type = propertyType;
  (symbol as { writeType?: Type }).writeType = writeType;
  if (parts.readonly) (symbol as { readonly?: boolean }).readonly = true;
  if (parts.optional) symbol.flags = (symbol.flags ?? 0) | SymbolFlags.Optional;
  return symbol;
}

export function collectUnionPropertyParts(type: Type, name: string, host: TypeMemberResolutionHost, isUnion: boolean): UnionPropertyParts {
  const propertySymbols: AstSymbol[] = [];
  const propertyTypes: Type[] = [];
  const writeTypes: Type[] = [];
  const declarations: unknown[] = [];
  let flags = SymbolFlags.Property;
  let optional = isUnion;
  let readonly = true;
  let partial = false;
  for (const part of constituentTypes(type)) {
    const property = getPropertyOfType(part, name, host, true, true);
    if (property === undefined) {
      partial = true;
      optional = false;
      const indexInfo = getApplicableIndexInfoForName(part, name, host);
      if (indexInfo !== undefined) {
        propertyTypes.push(indexInfo.valueType);
        writeTypes.push(indexInfo.isReadonly === true ? host.neverType : indexInfo.valueType);
        readonly &&= indexInfo.isReadonly === true;
      }
      continue;
    }
    propertySymbols.push(property);
    declarations.push(...(property.declarations ?? []));
    flags |= property.flags ?? 0;
    optional = isUnion ? optional && isOptionalProperty(property) : optional || isOptionalProperty(property);
    readonly &&= isReadonlyProperty(property);
    const propertyType = getTypeOfSymbol(property);
    if (propertyType !== undefined) propertyTypes.push(propertyType);
    const writeType = (property as { readonly writeType?: Type }).writeType;
    if (writeType !== undefined) writeTypes.push(writeType);
  }
  return { propertySymbols, propertyTypes, writeTypes, declarations, flags, optional, readonly, partial };
}

export function getUnionSignatures(signatureLists: readonly (readonly Signature[])[]): readonly Signature[] {
  const nonEmpty = signatureLists.filter(list => list.length !== 0);
  if (nonEmpty.length === 0) return [];
  if (nonEmpty.length === 1) return nonEmpty[0]!;
  let result = [...nonEmpty[0]!];
  for (const list of nonEmpty.slice(1)) result = combineSignatureLists(result, list, true);
  return result;
}

export function combineUnionOrIntersectionMemberSignatures(left: Signature, right: Signature, isUnion: boolean): Signature {
  const parameters = combineUnionOrIntersectionParameters(left, right, isUnion);
  const minArgumentCount = isUnion ? Math.max(left.minArgumentCount, right.minArgumentCount) : Math.min(left.minArgumentCount, right.minArgumentCount);
  const flags = left.flags | right.flags;
  const signature: Signature = {
    flags,
    parameters,
    resolvedReturnType: isUnion ? unionType([left.resolvedReturnType, right.resolvedReturnType]) : intersectionType([left.resolvedReturnType, right.resolvedReturnType]),
    minArgumentCount,
    compositeKind: isUnion ? SignatureKind.Call : SignatureKind.Construct,
    compositeSignatures: [left, right],
  };
  const declaration = left.declaration ?? right.declaration;
  const typeParameters = left.typeParameters ?? right.typeParameters;
  const thisParameter = combineUnionOrIntersectionThisParam(left.thisParameter, right.thisParameter, isUnion);
  if (declaration !== undefined) signature.declaration = declaration;
  if (typeParameters !== undefined) signature.typeParameters = typeParameters;
  if (thisParameter !== undefined) signature.thisParameter = thisParameter;
  return signature;
}

export function combineUnionOrIntersectionParameters(left: Signature, right: Signature, isUnion: boolean): readonly AstSymbol[] {
  const count = isUnion ? Math.min(left.parameters.length, right.parameters.length) : Math.max(left.parameters.length, right.parameters.length);
  const parameters: AstSymbol[] = [];
  for (let index = 0; index < count; index += 1) {
    const leftParameter = left.parameters[index];
    const rightParameter = right.parameters[index];
    if (leftParameter === undefined && rightParameter !== undefined) parameters.push(rightParameter);
    else if (rightParameter === undefined && leftParameter !== undefined) parameters.push(leftParameter);
    else if (leftParameter !== undefined && rightParameter !== undefined) parameters.push(createCombinedParameter(leftParameter, rightParameter, isUnion));
  }
  return parameters;
}

export function combineUnionOrIntersectionThisParam(left: AstSymbol | undefined, right: AstSymbol | undefined, isUnion: boolean): AstSymbol | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return createCombinedParameter(left, right, isUnion);
}

export function appendSignatures(signatures: readonly Signature[], newSignatures: readonly Signature[]): readonly Signature[] {
  if (newSignatures.length === 0) return signatures;
  const result = [...signatures];
  for (const signature of newSignatures) {
    if (!result.some(existing => signaturesHaveSameShape(existing, signature))) result.push(signature);
  }
  return result;
}

export function appendIndexInfo(indexInfos: readonly IndexInfo[], newInfo: IndexInfo, union: boolean): readonly IndexInfo[] {
  const existing = findIndexInfo(indexInfos, newInfo.keyType);
  if (existing === undefined) return [...indexInfos, newInfo];
  return indexInfos.map(info => info === existing ? combineIndexInfosForUnionOrIntersection(info, newInfo, union) : info);
}

export function getUnionIndexInfos(types: readonly Type[], host: TypeMemberResolutionHost): readonly IndexInfo[] {
  if (types.length === 0) return [];
  const allInfos = types.map(type => getIndexInfosOfType(type, host));
  const keyTypes = uniqueTypes(allInfos.flatMap(info => info.map(item => item.keyType)));
  const result: IndexInfo[] = [];
  for (const keyType of keyTypes) {
    const matches = allInfos.map(infos => findApplicableIndexInfo(infos, keyType)).filter((info): info is IndexInfo => info !== undefined);
    if (matches.length === types.length) result.push(combineIndexInfoSet(matches, true));
  }
  return result;
}

export function getIntersectionIndexInfos(types: readonly Type[], host: TypeMemberResolutionHost): readonly IndexInfo[] {
  let result: readonly IndexInfo[] = [];
  for (const type of types) {
    for (const info of getIndexInfosOfType(type, host)) result = appendIndexInfo(result, info, false);
  }
  return result;
}

export function getObjectLiteralIndexInfo(isReadonly: boolean, properties: readonly AstSymbol[], keyType: Type, host: TypeMemberResolutionHost): IndexInfo {
  const valueTypes = properties
    .filter(property => isApplicableIndexType(propertyNameType(property, host), keyType))
    .map(property => getTypeOfSymbol(property))
    .filter((type): type is Type => type !== undefined);
  return { keyType, valueType: combinePropertyTypes(valueTypes, true, host), isReadonly };
}

export function getApparentType(type: Type, host: TypeMemberResolutionHost): Type {
  if ((type.flags & TypeFlags.StringLike) !== 0) return host.stringType;
  if ((type.flags & TypeFlags.NumberLike) !== 0) return host.numberType;
  if ((type.flags & TypeFlags.NonPrimitive) !== 0) return host.emptyObjectType ?? type;
  if ((type.flags & TypeFlags.Union) !== 0) return host.createUnionType?.(constituentTypes(type).map(part => getApparentType(part, host))) ?? type;
  if ((type.flags & TypeFlags.Intersection) !== 0) return getApparentTypeOfIntersectionType(type, host);
  return type;
}

export function getReducedApparentType(type: Type, host: TypeMemberResolutionHost): Type {
  return getReducedType(getApparentType(type, host), host);
}

export function getReducedType(type: Type, host: TypeMemberResolutionHost): Type {
  if ((type.flags & TypeFlags.Union) !== 0) return getReducedUnionType(type, host);
  if ((type.flags & TypeFlags.Intersection) !== 0 && intersectionHasNeverProperty(type, host)) return host.neverType;
  return type;
}

export function getReducedUnionType(type: Type, host: TypeMemberResolutionHost): Type {
  const data = type.data as UnionOrIntersectionType | undefined;
  const types = data?.types ?? [];
  const reduced = types.map(part => getReducedType(part, host)).filter(part => (part.flags & TypeFlags.Never) === 0);
  if (reduced.length === 0) return host.neverType;
  if (reduced.length === 1) return reduced[0]!;
  return host.createUnionType?.(reduced) ?? { ...type, data: { ...data, types: reduced, objectFlags: data?.objectFlags ?? ObjectFlags.None } };
}

export function getApparentTypeOfIntersectionType(type: Type, host: TypeMemberResolutionHost): Type {
  const parts = constituentTypes(type).map(part => getApparentType(part, host));
  return host.createIntersectionType?.(parts) ?? { ...type, data: { ...(type.data as object | undefined), types: parts, objectFlags: objectFlagsOf(type) } as UnionOrIntersectionType };
}

export function getReducedApparentProperties(type: Type, host: TypeMemberResolutionHost): readonly AstSymbol[] {
  return getPropertiesOfType(getReducedApparentType(type, host), host);
}

export function isNeverReducedProperty(property: AstSymbol): boolean {
  const type = getTypeOfSymbol(property);
  return type !== undefined && (type.flags & TypeFlags.Never) !== 0 && !isOptionalProperty(property);
}

export function createSymbolWithType(source: AstSymbol, type: Type, host: TypeMemberResolutionHost): AstSymbol {
  const symbol = createSymbolLike(source, host, source.flags ?? SymbolFlags.Property, symbolName(source));
  symbol.declarations = [...(source.declarations ?? [])];
  (symbol as { type?: Type }).type = type;
  return symbol;
}

function inheritedMembers(type: Type, host: TypeMemberResolutionHost): readonly StructuredMembers[] {
  return (host.getBaseTypes?.(type) ?? []).map(base => resolveStructuredTypeMembers(base, host));
}

function setStructuredMembers(type: Type, properties: readonly AstSymbol[], callSignatures: readonly Signature[], constructSignatures: readonly Signature[], indexInfos: readonly IndexInfo[]): void {
  const structured = asStructured(type);
  if (structured === undefined) return;
  structured.declaredProperties = properties;
  structured.declaredCallSignatures = callSignatures;
  structured.declaredConstructSignatures = constructSignatures;
  structured.indexInfos = indexInfos;
}

function structuredMembersFromData(data: StructuredType): StructuredMembers {
  return {
    properties: data.declaredProperties ?? [],
    callSignatures: data.declaredCallSignatures ?? [],
    constructSignatures: data.declaredConstructSignatures ?? [],
    indexInfos: data.indexInfos ?? [],
  };
}

function hasResolvedMembers(members: StructuredMembers): boolean {
  return members.properties.length !== 0 || members.callSignatures.length !== 0 || members.constructSignatures.length !== 0 || members.indexInfos.length !== 0;
}

function emptyMembers(): StructuredMembers {
  return { properties: [], callSignatures: [], constructSignatures: [], indexInfos: [] };
}

function asStructured(type: Type): StructuredType | undefined {
  return (type.flags & TypeFlags.StructuredType) !== 0 ? type.data as StructuredType | undefined : undefined;
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as ObjectType | UnionOrIntersectionType | undefined)?.objectFlags ?? ObjectFlags.None;
}

function symbolOfType(type: Type): AstSymbol | undefined {
  return (type as { readonly symbol?: AstSymbol }).symbol ?? (type.data as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function symbolIsValue(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Value) !== 0 || ((symbol.flags ?? 0) & SymbolFlags.Type) === 0;
}

function isOptionalProperty(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0 || Boolean((symbol as { readonly optional?: boolean }).optional);
}

function isReadonlyProperty(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly) || symbolName(symbol).startsWith("readonly ");
}

function getObjectFunctionProperty(type: Type, name: string, host: TypeMemberResolutionHost): AstSymbol | undefined {
  if ((objectFlagsOf(type) & ObjectFlags.Anonymous) !== 0) return undefined;
  const fromString = name === "toString" || name === "valueOf" ? getPropertyOfObjectType(host.emptyObjectType ?? type, name) : undefined;
  return fromString;
}

function createSymbolLike(source: AstSymbol | undefined, host: TypeMemberResolutionHost, flags: number, name: string): AstSymbol {
  const created = host.createSymbol?.(flags, name) ?? { name, escapedName: name, flags, declarations: [] };
  if (source !== undefined) {
    if (source.parent !== undefined) created.parent = source.parent;
    if (source.valueDeclaration !== undefined) created.valueDeclaration = source.valueDeclaration;
  }
  return created;
}

function uniqueDeclarations(symbols: readonly AstSymbol[]): AstSymbol["declarations"] {
  const seen = new Set<object>();
  const out: AstSymbol["declarations"] = [];
  for (const symbol of symbols) {
    for (const declaration of symbol.declarations ?? []) {
      if (!seen.has(declaration)) {
        seen.add(declaration);
        out.push(declaration);
      }
    }
  }
  return out;
}

function firstDefined<T>(values: readonly T[]): T | undefined {
  return values[0];
}

function combinePropertyTypes(types: readonly Type[], isUnion: boolean, host: TypeMemberResolutionHost): Type {
  const present = types.filter((type): type is Type => type !== undefined);
  if (present.length === 0) return host.neverType;
  if (present.length === 1) return present[0]!;
  return isUnion ? host.createUnionType?.(present) ?? unionType(present) : host.createIntersectionType?.(present) ?? intersectionType(present);
}

function unionType(types: readonly (Type | undefined)[]): Type {
  const present = types.filter((type): type is Type => type !== undefined);
  if (present.length === 1) return present[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: present, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function intersectionType(types: readonly (Type | undefined)[]): Type {
  const present = types.filter((type): type is Type => type !== undefined);
  if (present.length === 1) return present[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Intersection, data: { types: present, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function combineSignatureLists(left: readonly Signature[], right: readonly Signature[], isUnion: boolean): Signature[] {
  const result: Signature[] = [];
  const usedRight = new Set<Signature>();
  for (const leftSignature of left) {
    const match = right.find(signature => !usedRight.has(signature) && signaturesHaveSameShape(leftSignature, signature));
    if (match === undefined) result.push(leftSignature);
    else {
      usedRight.add(match);
      result.push(combineUnionOrIntersectionMemberSignatures(leftSignature, match, isUnion));
    }
  }
  for (const signature of right) if (!usedRight.has(signature)) result.push(signature);
  return result;
}

function signaturesHaveSameShape(left: Signature, right: Signature): boolean {
  return left.parameters.length === right.parameters.length
    && left.minArgumentCount === right.minArgumentCount
    && (left.typeParameters?.length ?? 0) === (right.typeParameters?.length ?? 0);
}

function createCombinedParameter(left: AstSymbol, right: AstSymbol, isUnion: boolean): AstSymbol {
  const name = symbolName(left) || symbolName(right);
  const leftType = getTypeOfSymbol(left);
  const rightType = getTypeOfSymbol(right);
  const symbol: AstSymbol = { name, escapedName: name, flags: (left.flags ?? 0) | (right.flags ?? 0), declarations: [...(left.declarations ?? []), ...(right.declarations ?? [])] };
  (symbol as { type?: Type }).type = isUnion ? unionType([leftType, rightType]) : intersectionType([leftType, rightType]);
  return symbol;
}

function instantiateSymbol(symbol: AstSymbol, mapper: unknown, host: TypeMemberResolutionHost): AstSymbol {
  const type = getTypeOfSymbol(symbol);
  return type === undefined || host.instantiateType === undefined ? symbol : createSymbolWithType(symbol, host.instantiateType(type, mapper), host);
}

function instantiateIndexInfo(info: IndexInfo, mapper: unknown, host: TypeMemberResolutionHost): IndexInfo {
  if (host.instantiateType === undefined) return info;
  return { ...info, keyType: host.instantiateType(info.keyType, mapper), valueType: host.instantiateType(info.valueType, mapper) };
}

function mergeIndexInfoLists(indexInfos: readonly IndexInfo[], union: boolean): readonly IndexInfo[] {
  let result: readonly IndexInfo[] = [];
  for (const info of indexInfos) result = appendIndexInfo(result, info, union);
  return result;
}

function combineIndexInfos(left: IndexInfo, right: IndexInfo): IndexInfo {
  return combineIndexInfosForUnionOrIntersection(left, right, true);
}

function combineIndexInfosForUnionOrIntersection(left: IndexInfo, right: IndexInfo, union: boolean): IndexInfo {
  const result: IndexInfo = {
    keyType: left.keyType,
    valueType: union ? unionType([left.valueType, right.valueType]) : intersectionType([left.valueType, right.valueType]),
    isReadonly: left.isReadonly === true && right.isReadonly === true,
  };
  const declaration = left.declaration ?? right.declaration;
  if (declaration !== undefined) result.declaration = declaration;
  return result;
}

function combineIndexInfoSet(infos: readonly IndexInfo[], union: boolean): IndexInfo {
  return infos.slice(1).reduce((acc, info) => combineIndexInfosForUnionOrIntersection(acc, info, union), infos[0]!);
}

function findIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find(info => info.keyType === keyType || isApplicableIndexType(keyType, info.keyType));
}

function isStringIndexInfo(info: IndexInfo): boolean {
  return (info.keyType.flags & TypeFlags.StringLike) !== 0;
}

function isNumericStringLiteral(type: Type): boolean {
  if ((type.flags & TypeFlags.StringLiteral) === 0) return false;
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  return typeof value === "string" && numericName(value);
}

function numericName(name: string): boolean {
  return name !== "" && String(Number(name)) === name;
}

function uniqueTypes(types: readonly Type[]): readonly Type[] {
  return [...new Set(types)];
}

function propertyNameType(property: AstSymbol, host: TypeMemberResolutionHost): Type {
  const name = symbolName(property);
  return numericName(name) ? host.numberType : host.stringType;
}

function mergeSameNamedProperty(left: AstSymbol | undefined, right: AstSymbol, host: TypeMemberResolutionHost): AstSymbol {
  if (left === undefined) return right;
  const leftType = getTypeOfSymbol(left);
  const rightType = getTypeOfSymbol(right);
  const merged = createSymbolLike(left, host, (left.flags ?? 0) | (right.flags ?? 0), symbolName(left));
  merged.declarations = [...(left.declarations ?? []), ...(right.declarations ?? [])];
  (merged as { type?: Type }).type = intersectionType([leftType, rightType]);
  return merged;
}

function symbolsToTable(symbols: readonly AstSymbol[]): SymbolTable {
  const table: SymbolTable = new Map();
  for (const symbol of symbols) table.set(symbolName(symbol), symbol);
  return table;
}

function intersectionHasNeverProperty(type: Type, host: TypeMemberResolutionHost): boolean {
  return getPropertiesOfUnionOrIntersectionType(type, host).some(isNeverReducedProperty);
}

let syntheticTypeId = -3_100_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
