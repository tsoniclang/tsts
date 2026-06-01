import { SymbolFlags, type Symbol as AstSymbol } from "../ast/index.js";
import { getArrayElementType, getPropertySymbolOfType, getTypeOfSymbol } from "./checker.checkedtype.js";
import { ObjectFlags, SignatureKind, TypeFlags, type IndexInfo, type ObjectType, type Signature, type Type, type UnionOrIntersectionType } from "./types.js";

export type Ternary = -1 | 0 | 1 | 3;
export const Ternary = {
  False: 0 as Ternary,
  Unknown: 1 as Ternary,
  Maybe: 3 as Ternary,
  True: -1 as Ternary,
} as const;

export type TypeRelation = (source: Type, target: Type) => boolean;
export type SignatureRelation = (source: Signature, target: Signature) => boolean;

export interface ObjectRelationFailure {
  readonly kind: "property" | "signature" | "index";
  readonly name?: string;
  readonly source?: Type;
  readonly target?: Type;
}

export interface ObjectRelationResult {
  readonly related: Ternary;
  readonly failure?: ObjectRelationFailure;
}

export function structuredTypeRelatedTo(
  source: Type,
  target: Type,
  compareTypes: TypeRelation,
  compareSignatures: SignatureRelation,
): ObjectRelationResult {
  const properties = propertiesRelatedTo(source, target, compareTypes);
  if (properties.related === Ternary.False) return properties;
  const callSignatures = signaturesRelatedTo(source, target, SignatureKind.Call, compareSignatures);
  if (callSignatures.related === Ternary.False) return callSignatures;
  const constructSignatures = signaturesRelatedTo(source, target, SignatureKind.Construct, compareSignatures);
  if (constructSignatures.related === Ternary.False) return constructSignatures;
  const indexSignatures = indexSignaturesRelatedTo(source, target, false, compareTypes);
  if (indexSignatures.related === Ternary.False) return indexSignatures;
  return { related: Ternary.True };
}

export function propertiesRelatedTo(source: Type, target: Type, compareTypes: TypeRelation): ObjectRelationResult {
  const targetProperties = propertiesOfType(target);
  if (targetProperties.length === 0) return { related: Ternary.True };
  for (const targetProperty of targetProperties) {
    const name = symbolName(targetProperty);
    const sourceProperty = getPropertySymbolOfType(source, name);
    if (sourceProperty === undefined) {
      if (((targetProperty.flags ?? 0) & SymbolFlags.Optional) !== 0) continue;
      return { related: Ternary.False, failure: { kind: "property", name } };
    }
    const result = propertyRelatedTo(source, target, sourceProperty, targetProperty, compareTypes);
    if (result.related === Ternary.False) return result;
  }
  return { related: Ternary.True };
}

export function propertyRelatedTo(
  source: Type,
  target: Type,
  sourceProperty: AstSymbol,
  targetProperty: AstSymbol,
  compareTypes: TypeRelation,
): ObjectRelationResult {
  const sourceType = getTypeOfSymbol(sourceProperty);
  const targetType = getTypeOfSymbol(targetProperty);
  if (sourceType === undefined || targetType === undefined) return { related: Ternary.True };
  if (compareTypes(sourceType, targetType)) return { related: Ternary.True };
  return {
    related: Ternary.False,
    failure: {
      kind: "property",
      name: symbolName(targetProperty),
      source: sourceType,
      target: targetType,
    },
  };
}

export function propertiesIdenticalTo(source: Type, target: Type, excludedProperties: ReadonlySet<string>, compareTypes: TypeRelation): Ternary {
  const sourceProperties = propertiesOfType(source).filter(property => !excludedProperties.has(symbolName(property)));
  const targetProperties = propertiesOfType(target).filter(property => !excludedProperties.has(symbolName(property)));
  if (sourceProperties.length !== targetProperties.length) return Ternary.False;
  for (const sourceProperty of sourceProperties) {
    const targetProperty = targetProperties.find(property => symbolName(property) === symbolName(sourceProperty));
    if (targetProperty === undefined) return Ternary.False;
    const sourceType = getTypeOfSymbol(sourceProperty);
    const targetType = getTypeOfSymbol(targetProperty);
    if (sourceType !== undefined && targetType !== undefined && !compareTypes(sourceType, targetType)) return Ternary.False;
  }
  return Ternary.True;
}

export function signaturesRelatedTo(
  source: Type,
  target: Type,
  kind: SignatureKind,
  compareSignatures: SignatureRelation,
): ObjectRelationResult {
  const targetSignatures = signaturesOfType(target, kind);
  if (targetSignatures.length === 0) return { related: Ternary.True };
  const sourceSignatures = signaturesOfType(source, kind);
  if (sourceSignatures.length === 0) return { related: Ternary.False, failure: { kind: "signature" } };
  for (const targetSignature of targetSignatures) {
    if (!sourceSignatures.some(sourceSignature => compareSignatures(sourceSignature, targetSignature))) {
      return { related: Ternary.False, failure: { kind: "signature" } };
    }
  }
  return { related: Ternary.True };
}

export function signaturesIdenticalTo(source: Type, target: Type, kind: SignatureKind, compareSignatures: SignatureRelation): Ternary {
  const sourceSignatures = signaturesOfType(source, kind);
  const targetSignatures = signaturesOfType(target, kind);
  if (sourceSignatures.length !== targetSignatures.length) return Ternary.False;
  for (let index = 0; index < sourceSignatures.length; index++) {
    if (!compareSignatures(sourceSignatures[index]!, targetSignatures[index]!)) return Ternary.False;
  }
  return Ternary.True;
}

export function indexSignaturesRelatedTo(source: Type, target: Type, sourceIsPrimitive: boolean, compareTypes: TypeRelation): ObjectRelationResult {
  const targetInfos = indexInfosOfType(target);
  if (targetInfos.length === 0) return { related: Ternary.True };
  const sourceInfos = indexInfosOfType(source);
  if (sourceInfos.length === 0) {
    return sourceIsPrimitive
      ? { related: Ternary.False, failure: { kind: "index" } }
      : membersRelatedToIndexInfo(source, targetInfos[0]!, compareTypes);
  }
  for (const targetInfo of targetInfos) {
    if (!sourceInfos.some(sourceInfo => indexInfoRelatedTo(sourceInfo, targetInfo, compareTypes) === Ternary.True)) {
      return { related: Ternary.False, failure: { kind: "index", target: targetInfo.valueType } };
    }
  }
  return { related: Ternary.True };
}

export function indexSignaturesIdenticalTo(source: Type, target: Type, compareTypes: TypeRelation): Ternary {
  const sourceInfos = indexInfosOfType(source);
  const targetInfos = indexInfosOfType(target);
  if (sourceInfos.length !== targetInfos.length) return Ternary.False;
  for (let index = 0; index < sourceInfos.length; index++) {
    if (indexInfoRelatedTo(sourceInfos[index]!, targetInfos[index]!, compareTypes) === Ternary.False) return Ternary.False;
    if (indexInfoRelatedTo(targetInfos[index]!, sourceInfos[index]!, compareTypes) === Ternary.False) return Ternary.False;
  }
  return Ternary.True;
}

export function typeRelatedToIndexInfo(source: Type, targetInfo: IndexInfo, compareTypes: TypeRelation): ObjectRelationResult {
  const sourceInfo = getApplicableIndexInfo(source, targetInfo.keyType);
  if (sourceInfo !== undefined) {
    return indexInfoRelatedTo(sourceInfo, targetInfo, compareTypes) === Ternary.True
      ? { related: Ternary.True }
      : { related: Ternary.False, failure: { kind: "index", source: sourceInfo.valueType, target: targetInfo.valueType } };
  }
  if (isObjectTypeWithInferableIndex(source)) return membersRelatedToIndexInfo(source, targetInfo, compareTypes);
  return { related: Ternary.False, failure: { kind: "index", target: targetInfo.valueType } };
}

export function membersRelatedToIndexInfo(source: Type, targetInfo: IndexInfo, compareTypes: TypeRelation): ObjectRelationResult {
  for (const property of propertiesOfType(source)) {
    const propertyType = getTypeOfSymbol(property);
    if (propertyType === undefined) continue;
    if (!compareTypes(propertyType, targetInfo.valueType)) {
      return { related: Ternary.False, failure: { kind: "index", name: symbolName(property), source: propertyType, target: targetInfo.valueType } };
    }
  }
  return { related: Ternary.True };
}

export function indexInfoRelatedTo(sourceInfo: IndexInfo, targetInfo: IndexInfo, compareTypes: TypeRelation): Ternary {
  if (!compareTypes(targetInfo.keyType, sourceInfo.keyType)) return Ternary.False;
  return compareTypes(sourceInfo.valueType, targetInfo.valueType) ? Ternary.True : Ternary.False;
}

export function isObjectTypeWithInferableIndex(type: Type): boolean {
  const flags = objectFlagsOf(type);
  return (type.flags & TypeFlags.Object) !== 0
    && (flags & (ObjectFlags.ObjectLiteral | ObjectFlags.JSLiteral | ObjectFlags.Anonymous)) !== 0;
}

export function tryElaborateArrayLikeErrors(source: Type, target: Type): ObjectRelationFailure | undefined {
  const sourceElement = getArrayElementType(source);
  const targetElement = getArrayElementType(target);
  if (sourceElement === undefined || targetElement === undefined) return undefined;
  return { kind: "index", source: sourceElement, target: targetElement };
}

export function tryElaborateErrorsForPrimitivesAndObjects(source: Type, target: Type): ObjectRelationFailure | undefined {
  if ((source.flags & TypeFlags.Primitive) !== 0 && (target.flags & TypeFlags.Object) !== 0) {
    return { kind: "property", source, target };
  }
  if ((target.flags & TypeFlags.Primitive) !== 0 && (source.flags & TypeFlags.Object) !== 0) {
    return { kind: "property", source, target };
  }
  return undefined;
}

export function isWeakType(type: Type): boolean {
  const properties = propertiesOfType(type);
  return properties.length > 0 && properties.every(property => ((property.flags ?? 0) & SymbolFlags.Optional) !== 0);
}

export function hasCommonProperties(source: Type, target: Type): boolean {
  const sourceNames = new Set(propertiesOfType(source).map(symbolName));
  return propertiesOfType(target).some(property => sourceNames.has(symbolName(property)));
}

export function getBestMatchingProperty(source: Type, target: Type): AstSymbol | undefined {
  const sourceNames = new Set(propertiesOfType(source).map(symbolName));
  return propertiesOfType(target).find(property => sourceNames.has(symbolName(property)));
}

function propertiesOfType(type: Type): readonly AstSymbol[] {
  const data = type.data as ObjectType | UnionOrIntersectionType | undefined;
  const declared = (data as { readonly declaredProperties?: readonly AstSymbol[] } | undefined)?.declaredProperties;
  if (declared !== undefined) return declared;
  const resolved = (data as { readonly resolvedProperties?: readonly AstSymbol[] } | undefined)?.resolvedProperties;
  if (resolved !== undefined) return resolved;
  const members = (type.symbol as { readonly members?: ReadonlyMap<string, AstSymbol> } | undefined)?.members;
  return members === undefined ? [] : [...members.values()];
}

function signaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
  const data = type.data as ObjectType | undefined;
  return kind === SignatureKind.Call
    ? data?.declaredCallSignatures ?? []
    : data?.declaredConstructSignatures ?? [];
}

function indexInfosOfType(type: Type): readonly IndexInfo[] {
  return (type.data as ObjectType | undefined)?.indexInfos ?? [];
}

function getApplicableIndexInfo(type: Type, keyType: Type): IndexInfo | undefined {
  return indexInfosOfType(type).find(info => (keyType.flags & info.keyType.flags) !== 0);
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}
