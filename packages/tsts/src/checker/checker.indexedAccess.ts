/**
 * Checker indexed-access and key-type helpers.
 *
 * Conceptual split from TS-Go `checker.go`'s `keyof`, indexed access,
 * base-constraint, normalization, alias-reference, and helper-reference
 * sections.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, Type, TypeAlias, TypeParameter } from "./types.js";
import { AccessFlags, IndexFlags, ObjectFlags, TypeFlags, getTypeOfSymbol, getPropertyTypeOfType } from "./types.js";
import { Ternary, type TypeComparer } from "./signatureRelations.js";
import {
  getUnionTypeFromSortedList,
  getUnionTypeWorker,
  newIndexType,
  newIndexedAccessType,
  newSubstitutionType,
  UnionReduction,
  type TypeAlgebraState,
} from "./checker.typeAlgebra.js";
import { getIdentifierChain } from "./checker.typeNodeConstructors.js";
import {
  anyType,
  neverType,
  numberType,
  stringType,
  undefinedType,
  unknownType,
} from "./checker.checkedtype.js";

export interface IndexedAccessHost extends TypeAlgebraState {
  readonly stringNumberSymbolType?: Type;
  readonly noUncheckedIndexedAccess?: boolean;
  readonly noInferSymbol?: AstSymbol;
  getPropertiesOfType?(type: Type): readonly AstSymbol[];
  getIndexInfosOfType?(type: Type): readonly IndexInfo[];
  getIndexInfoOfType?(type: Type, keyType: Type): IndexInfo | undefined;
  getPropertyOfType?(type: Type, name: string): AstSymbol | undefined;
  getTypeOfSymbol?(symbol: AstSymbol): Type | undefined;
  getWriteTypeOfSymbol?(symbol: AstSymbol): Type | undefined;
  isTypeAssignableTo?(source: Type, target: Type): boolean;
  report?(node: AstNode | undefined, message: string): void;
  markReferenced?(symbol: AstSymbol, node: AstNode | undefined): void;
  getGlobalExtractSymbol?(): AstSymbol | undefined;
  getTypeAliasInstantiation?(symbol: AstSymbol, typeArguments: readonly Type[], location?: AstNode): Type;
}

export function getIndexType(host: IndexedAccessHost, type: Type): Type {
  return getIndexTypeEx(host, type, IndexFlags.None);
}

export function getIndexTypeEx(host: IndexedAccessHost, type: Type, indexFlags: IndexFlags): Type {
  const reduced = getReducedType(type);
  if (isNoInferType(reduced)) return getNoInferType(host, getIndexTypeEx(host, substitutionBaseType(reduced) ?? reduced, indexFlags));
  if (shouldDeferIndexType(host, reduced, indexFlags)) return getIndexTypeForGenericType(host, reduced, indexFlags);
  if ((reduced.flags & TypeFlags.Union) !== 0) {
    const keys = constituentTypes(reduced).map(item => getIndexTypeEx(host, item, indexFlags));
    return intersectKeyTypes(host, keys);
  }
  if ((reduced.flags & TypeFlags.Intersection) !== 0) {
    const keys = constituentTypes(reduced).map(item => getIndexTypeEx(host, item, indexFlags));
    return getUnionTypeWorker(keys, UnionReduction.Literal, undefined, undefined, host);
  }
  if ((objectFlagsOf(reduced) & ObjectFlags.Mapped) !== 0) return getIndexTypeForMappedType(host, reduced, indexFlags);
  if ((reduced.flags & TypeFlags.Unknown) !== 0) return neverType;
  if ((reduced.flags & (TypeFlags.Any | TypeFlags.Never)) !== 0) return host.stringNumberSymbolType ?? stringType;
  const include = ((indexFlags & IndexFlags.NoIndexSignatures) !== 0 ? TypeFlags.StringLiteral : TypeFlags.StringLike)
    | ((indexFlags & IndexFlags.StringsOnly) !== 0 ? TypeFlags.None : TypeFlags.NumberLike | TypeFlags.ESSymbolLike);
  return getLiteralTypeFromProperties(host, reduced, include, indexFlags === IndexFlags.None);
}

export function getExtractStringType(host: IndexedAccessHost, type: Type): Type {
  const extractSymbol = host.getGlobalExtractSymbol?.();
  return extractSymbol === undefined
    ? stringType
    : host.getTypeAliasInstantiation?.(extractSymbol, [type, stringType]) ?? stringType;
}

export function getLiteralTypeFromProperties(host: IndexedAccessHost, type: Type, include: TypeFlags, includeOrigin: boolean): Type {
  const origin = includeOrigin && ((objectFlagsOf(type) & (ObjectFlags.ClassOrInterface | ObjectFlags.Reference)) !== 0 || type.aliasSymbol !== undefined)
    ? newIndexType(type, IndexFlags.None, host)
    : undefined;
  const propertyTypes = propertiesOfType(host, type).map(property => getLiteralTypeFromProperty(host, property, include, false));
  const indexTypes = indexInfosOfType(host, type)
    .filter(info => isKeyTypeIncluded(info.keyType, include))
    .map(info => info.keyType === stringType && (include & TypeFlags.Number) !== 0 ? host.stringNumberSymbolType ?? stringType : info.keyType);
  return getUnionTypeWorker([...propertyTypes, ...indexTypes], UnionReduction.Literal, undefined, origin, host);
}

export function getLiteralTypeFromProperty(host: IndexedAccessHost, property: AstSymbol, include: TypeFlags, includeNonPublic: boolean): Type {
  if (!includeNonPublic && isNonPublicSymbol(property)) return neverType;
  const nameType = symbolNameType(property) ?? getLiteralTypeFromPropertyName(host, property.valueDeclaration ?? property.declarations[0]);
  return nameType !== undefined && (nameType.flags & include) !== 0 ? nameType : neverType;
}

export function getLiteralTypeFromPropertyName(host: IndexedAccessHost, name: AstNode | undefined): Type | undefined {
  if (name === undefined) return undefined;
  if (name.kind === Kind.PrivateIdentifier) return neverType;
  const literal = literalTypeFromNameNode(name);
  if (literal !== undefined) return literal;
  if (name.kind === Kind.ComputedPropertyName) return checkComputedPropertyName(host, name);
  const text = propertyNameText(name);
  return text.length === 0 ? undefined : stringLiteral(text);
}

export function isKeyTypeIncluded(keyType: Type, include: TypeFlags): boolean {
  return (keyType.flags & include) !== 0
    || (keyType.flags & TypeFlags.Intersection) !== 0 && constituentTypes(keyType).some(item => isKeyTypeIncluded(item, include));
}

export function checkComputedPropertyName(host: IndexedAccessHost, node: AstNode): Type {
  const expressionType = getNodeCheckedType((node as { readonly expression?: AstNode }).expression) ?? unknownType;
  if ((expressionType.flags & TypeFlags.Nullable) !== 0
    || !isTypeAssignableToKind(host, expressionType, TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbolLike)
      && !isAssignable(host, expressionType, host.stringNumberSymbolType ?? stringType)) {
    host.report?.(node, "A computed property name must be of type string, number, symbol, or any.");
  }
  return expressionType;
}

export function isNoInferType(type: Type): boolean {
  return (type.flags & TypeFlags.Substitution) !== 0 && ((type.data as { readonly constraint?: Type } | undefined)?.constraint?.flags ?? 0) & TypeFlags.Unknown ? true : false;
}

export function getSubstitutionIntersection(host: IndexedAccessHost, type: Type): Type {
  if (isNoInferType(type)) return substitutionBaseType(type) ?? type;
  const constraint = (type.data as { readonly constraint?: Type } | undefined)?.constraint;
  const baseType = substitutionBaseType(type);
  if (constraint === undefined || baseType === undefined) return type;
  return intersectKeyTypes(host, [constraint, baseType]);
}

export function shouldDeferIndexType(host: IndexedAccessHost, type: Type, indexFlags: IndexFlags): boolean {
  return (type.flags & TypeFlags.InstantiableNonPrimitive) !== 0
    || isGenericTupleType(type)
    || isGenericMappedType(type) && getNameTypeFromMappedType(type) !== undefined
    || (type.flags & TypeFlags.Union) !== 0 && (indexFlags & IndexFlags.NoReducibleCheck) === 0 && isGenericReducibleType(type)
    || (type.flags & TypeFlags.Intersection) !== 0 && maybeTypeOfKindConsideringBaseConstraint(host, type, TypeFlags.Instantiable)
      && constituentTypes(type).some(isEmptyObjectLike);
}

export type MappedTypeNameTypeKind = 0 | 1 | 2;
export const MappedTypeNameTypeKind = {
  None: 0 as MappedTypeNameTypeKind,
  Filtering: 1 as MappedTypeNameTypeKind,
  Remapping: 2 as MappedTypeNameTypeKind,
} as const;

export function getMappedTypeNameTypeKind(host: IndexedAccessHost, type: Type): MappedTypeNameTypeKind {
  const nameType = getNameTypeFromMappedType(type);
  if (nameType === undefined) return MappedTypeNameTypeKind.None;
  const typeParameter = getTypeParameterFromMappedType(type);
  return typeParameter !== undefined && isAssignable(host, nameType, typeParameterAsType(typeParameter))
    ? MappedTypeNameTypeKind.Filtering
    : MappedTypeNameTypeKind.Remapping;
}

export function getIndexTypeForGenericType(host: IndexedAccessHost, type: Type, indexFlags: IndexFlags): Type {
  return newIndexType(type, indexFlags & IndexFlags.StringsOnly, host);
}

export function getIndexTypeForMappedType(host: IndexedAccessHost, type: Type, indexFlags: IndexFlags): Type {
  const constraintType = getConstraintTypeFromMappedType(type) ?? unknownType;
  const nameType = getNameTypeFromMappedType(type);
  if (nameType === undefined && (indexFlags & IndexFlags.NoIndexSignatures) === 0) return constraintType;
  const keyTypes = lowerBoundKeyTypes(constraintType).map(key => {
    if (nameType === undefined) return key;
    return nameType === stringType ? host.stringNumberSymbolType ?? stringType : nameType;
  });
  const result = getUnionTypeWorker(keyTypes, UnionReduction.Literal, undefined, undefined, host);
  return (indexFlags & IndexFlags.NoIndexSignatures) === 0 ? result : removeStringIndexKeys(host, result);
}

export function getIndexedAccessTypeEx(
  host: IndexedAccessHost,
  objectType: Type,
  indexType: Type,
  accessFlags: AccessFlags = AccessFlags.None,
  accessNode?: AstNode,
  alias?: TypeAlias,
): Type {
  return getIndexedAccessTypeOrUndefined(host, objectType, indexType, accessFlags, accessNode, alias)
    ?? (accessNode === undefined ? unknownType : host.errorType ?? anyType);
}

export function getIndexedAccessTypeOrUndefined(
  host: IndexedAccessHost,
  objectType: Type,
  indexType: Type,
  accessFlags: AccessFlags = AccessFlags.None,
  accessNode?: AstNode,
  alias?: TypeAlias,
): Type | undefined {
  if (objectType === host.wildcardType || indexType === host.wildcardType) return host.wildcardType;
  const reducedObjectType = getReducedType(objectType);
  const effectiveAccessFlags = host.noUncheckedIndexedAccess && (accessFlags & AccessFlags.ExpressionPosition) !== 0
    ? accessFlags | AccessFlags.IncludeUndefined
    : accessFlags;
  if (shouldDeferIndexedAccessType(host, reducedObjectType, indexType, accessNode)) {
    if ((reducedObjectType.flags & TypeFlags.AnyOrUnknown) !== 0) return reducedObjectType;
    const type = newIndexedAccessType(reducedObjectType, indexType, effectiveAccessFlags & AccessFlags.Persistent, host);
    if (alias !== undefined) {
      type.aliasSymbol = alias.symbol;
      if (alias.typeArguments !== undefined) type.aliasTypeArguments = alias.typeArguments;
    }
    return type;
  }
  const apparentObjectType = getReducedApparentType(reducedObjectType);
  if ((indexType.flags & TypeFlags.Union) !== 0 && (indexType.flags & TypeFlags.Boolean) === 0) {
    const propTypes: Type[] = [];
    for (const type of constituentTypes(indexType)) {
      const propType = getPropertyTypeForIndexType(host, reducedObjectType, apparentObjectType, type, indexType, accessNode, effectiveAccessFlags);
      if (propType === undefined) return undefined;
      propTypes.push(propType);
    }
    return (effectiveAccessFlags & AccessFlags.Writing) !== 0
      ? intersectKeyTypes(host, propTypes)
      : getUnionTypeWorker(propTypes, UnionReduction.Literal, alias, undefined, host);
  }
  return getPropertyTypeForIndexType(host, reducedObjectType, apparentObjectType, indexType, indexType, accessNode, effectiveAccessFlags | AccessFlags.CacheSymbol | AccessFlags.ReportDeprecated);
}

export function getPropertyTypeForIndexType(
  host: IndexedAccessHost,
  originalObjectType: Type,
  objectType: Type,
  indexType: Type,
  fullIndexType: Type,
  accessNode: AstNode | undefined,
  accessFlags: AccessFlags,
): Type | undefined {
  void originalObjectType;
  void fullIndexType;
  const propName = getPropertyNameFromIndex(indexType, accessNode);
  if (propName !== "") {
    const property = propertyOfType(host, objectType, propName);
    if (property !== undefined) {
      markPropertyAsReferenced(host, property, accessNode, isSelfTypeAccess(accessNode, objectType.symbol));
      errorIfWritingToReadonlyIndex(host, propertyIndexInfo(objectType, propName), objectType, accessNode);
      return (accessFlags & AccessFlags.Writing) !== 0
        ? host.getWriteTypeOfSymbol?.(property) ?? typeOfSymbol(host, property)
        : typeOfSymbol(host, property);
    }
    if (everyType(objectType, isTupleType) && isNumericLiteralName(propName)) {
      const element = tupleElementTypeAt(objectType, Number(propName));
      if (element !== undefined) return element;
    }
  }
  if ((indexType.flags & TypeFlags.Nullable) === 0 && isTypeAssignableToKind(host, indexType, TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbolLike)) {
    const indexInfo = applicableIndexInfo(host, objectType, indexType);
    if (indexInfo !== undefined) {
      return (accessFlags & AccessFlags.IncludeUndefined) !== 0
        ? getUnionTypeWorker([indexInfo.valueType, undefinedType], UnionReduction.Literal, undefined, undefined, host)
        : indexInfo.valueType;
    }
  }
  return undefined;
}

export function typeHasStaticProperty(type: Type, propertyName: string): boolean {
  return propertyOfType({ nextTypeId: syntheticNextTypeId }, type, propertyName) !== undefined;
}

export function getSuggestionForNonexistentProperty(host: IndexedAccessHost, name: string, type: Type): string | undefined {
  return bestSuggestion(name, propertiesOfType(host, type).map(symbolName));
}

export function getSuggestionForNonexistentIndexSignature(host: IndexedAccessHost, type: Type, indexType: Type): string | undefined {
  const keyName = typeName(indexType);
  const keys = indexInfosOfType(host, type).map(info => typeName(info.keyType));
  return bestSuggestion(keyName, keys);
}

export function getSuggestedTypeForNonexistentStringLiteralType(host: IndexedAccessHost, literal: Type, target: Type): Type | undefined {
  const suggestion = getSuggestionForNonexistentProperty(host, String(literalValue(literal)), target);
  return suggestion === undefined ? undefined : stringLiteral(suggestion);
}

export function getIndexNodeForAccessExpression(accessNode: AstNode | undefined): AstNode | undefined {
  return (accessNode as { readonly argumentExpression?: AstNode; readonly indexType?: AstNode } | undefined)?.argumentExpression
    ?? (accessNode as { readonly argumentExpression?: AstNode; readonly indexType?: AstNode } | undefined)?.indexType
    ?? accessNode;
}

export function errorIfWritingToReadonlyIndex(host: IndexedAccessHost, indexInfo: IndexInfo | undefined, objectType: Type, accessExpression: AstNode | undefined): void {
  if (indexInfo?.isReadonly === true) {
    host.report?.(accessExpression, `Cannot assign through readonly index signature of ${typeName(objectType)}.`);
  }
}

export function isSelfTypeAccess(node: AstNode | undefined, symbol: AstSymbol | undefined): boolean {
  if (node === undefined || symbol === undefined) return false;
  const expressionSymbol = nodeSymbol((node as { readonly expression?: AstNode }).expression ?? node);
  return expressionSymbol === symbol || expressionSymbol?.parent === symbol;
}

export function isThisPropertyAccessInConstructor(node: AstNode | undefined, property: AstSymbol): boolean {
  const constructor = getDeclaringConstructor(property);
  return constructor !== undefined && containingConstructor(node) === constructor;
}

export function isAutoTypedProperty(symbol: AstSymbol): boolean {
  const declaration = symbol.valueDeclaration;
  return declaration?.kind === Kind.PropertyDeclaration
    && (declaration as { readonly type?: AstNode; readonly initializer?: AstNode }).type === undefined
    && (declaration as { readonly type?: AstNode; readonly initializer?: AstNode }).initializer === undefined;
}

export function getDeclaringConstructor(symbol: AstSymbol): AstNode | undefined {
  for (const declaration of symbol.declarations) {
    const container = containingConstructor(declaration);
    if (container !== undefined) return container;
  }
  return undefined;
}

export function getPropertyNameFromIndex(indexType: Type, accessNode?: AstNode): string {
  if (isTypeUsableAsPropertyName(indexType)) return getPropertyNameFromType(indexType);
  if (isPropertyName(accessNode)) return propertyNameText(accessNode);
  return "";
}

export function shouldDeferIndexedAccessType(host: IndexedAccessHost, objectType: Type, indexType: Type, accessNode?: AstNode): boolean {
  if (isGenericIndexType(indexType)) return true;
  if (accessNode !== undefined && accessNode.kind !== Kind.IndexedAccessType) {
    return isGenericTupleType(objectType) && !indexTypeLessThan(indexType, totalFixedElementCount(objectType));
  }
  return isGenericObjectType(objectType) && !(isTupleType(objectType) && indexTypeLessThan(indexType, totalFixedElementCount(objectType)))
    || isGenericReducibleType(objectType);
  void host;
}

export function indexTypeLessThan(indexType: Type, limit: number): boolean {
  return everyType(indexType, type => {
    if ((type.flags & TypeFlags.StringOrNumberLiteral) === 0) return false;
    const name = getPropertyNameFromType(type);
    return isNumericLiteralName(name) && Number(name) >= 0 && Number(name) < limit;
  });
}

export function getNoInferType(host: IndexedAccessHost, type: Type): Type {
  return isNoInferTargetType(type) ? getOrCreateSubstitutionType(host, type, unknownType) : type;
}

export function isNoInferTargetType(type: Type): boolean {
  return (type.flags & TypeFlags.UnionOrIntersection) !== 0 && constituentTypes(type).some(isNoInferTargetType)
    || (type.flags & TypeFlags.Substitution) !== 0 && !isNoInferType(type) && isNoInferTargetType(substitutionBaseType(type) ?? type)
    || (type.flags & TypeFlags.Object) !== 0 && !isEmptyObjectLike(type)
    || (type.flags & (TypeFlags.Instantiable & ~TypeFlags.Substitution)) !== 0 && !isPatternLiteralType(type);
}

export function getSubstitutionType(host: IndexedAccessHost, baseType: Type, constraint: Type): Type {
  if ((constraint.flags & TypeFlags.AnyOrUnknown) !== 0 || constraint === baseType || (baseType.flags & TypeFlags.Any) !== 0) return baseType;
  return getOrCreateSubstitutionType(host, baseType, constraint);
}

export function getOrCreateSubstitutionType(host: IndexedAccessHost, baseType: Type, constraint: Type): Type {
  return newSubstitutionType(baseType, constraint, host);
}

export function getBaseConstraintOrType(host: IndexedAccessHost, type: Type): Type {
  return getResolvedBaseConstraint(host, type) ?? type;
}

export function getResolvedBaseConstraint(host: IndexedAccessHost, type: Type, stack: readonly Type[] = []): Type | undefined {
  const data = type.data as { readonly constraint?: Type; readonly resolvedBaseConstraint?: Type } | undefined;
  if (data?.resolvedBaseConstraint !== undefined) return data.resolvedBaseConstraint;
  if (stack.includes(type)) return undefined;
  return computeBaseConstraint(host, type, [...stack, type]);
}

export function computeBaseConstraint(host: IndexedAccessHost, type: Type, stack: readonly Type[] = []): Type | undefined {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return getNextBaseConstraint(host, constraintOfType(type), stack);
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) {
    const constraints = constituentTypes(type).map(item => getNextBaseConstraint(host, item, stack)).filter(isType);
    if (constraints.length === constituentTypes(type).length) {
      return (type.flags & TypeFlags.Union) !== 0
        ? getUnionTypeWorker(constraints, UnionReduction.Literal, undefined, undefined, host)
        : intersectKeyTypes(host, constraints);
    }
    return undefined;
  }
  if ((type.flags & TypeFlags.Index) !== 0) return host.stringNumberSymbolType ?? stringType;
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) {
    const objectType = getNextBaseConstraint(host, indexedObjectType(type), stack);
    const indexType = getNextBaseConstraint(host, indexedIndexType(type), stack);
    return objectType === undefined || indexType === undefined
      ? undefined
      : getIndexedAccessTypeOrUndefined(host, objectType, indexType);
  }
  if ((type.flags & TypeFlags.Substitution) !== 0) return getNextBaseConstraint(host, getSubstitutionIntersection(host, type), stack);
  return type;
}

export function getNextBaseConstraint(host: IndexedAccessHost, type: Type | undefined, stack: readonly Type[] = []): Type | undefined {
  if (type === undefined) return undefined;
  return getResolvedBaseConstraint(host, type, stack);
}

export function maybeTypeOfKindConsideringBaseConstraint(host: IndexedAccessHost, type: Type, kind: TypeFlags): boolean {
  return maybeTypeOfKind(type, kind) || maybeTypeOfKind(getBaseConstraintOrType(host, type), kind);
}

export function allTypesAssignableToKind(host: IndexedAccessHost, source: Type, kind: TypeFlags): boolean {
  return allTypesAssignableToKindEx(host, source, kind, false);
}

export function allTypesAssignableToKindEx(host: IndexedAccessHost, source: Type, kind: TypeFlags, strict: boolean): boolean {
  if ((source.flags & TypeFlags.Union) !== 0) return constituentTypes(source).every(item => allTypesAssignableToKindEx(host, item, kind, strict));
  return isTypeAssignableToKindEx(host, source, kind, strict);
}

export function isTypeAssignableToKind(host: IndexedAccessHost, source: Type, kind: TypeFlags): boolean {
  return isTypeAssignableToKindEx(host, source, kind, false);
}

export function isTypeAssignableToKindEx(host: IndexedAccessHost, source: Type, kind: TypeFlags, strict: boolean): boolean {
  if ((source.flags & kind) !== 0) return true;
  if (strict && (source.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null)) !== 0) return false;
  if ((kind & TypeFlags.NumberLike) !== 0 && isAssignable(host, source, numberType)) return true;
  if ((kind & TypeFlags.StringLike) !== 0 && isAssignable(host, source, stringType)) return true;
  if ((kind & TypeFlags.Void) !== 0 && isAssignable(host, source, undefinedType)) return true;
  if ((kind & TypeFlags.Never) !== 0 && isAssignable(host, source, neverType)) return true;
  return false;
}

export function isConstEnumObjectType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.Anonymous) !== 0 && type.symbol !== undefined && isConstEnumSymbol(type.symbol);
}

export function isConstEnumSymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.ConstEnum) !== 0;
}

export function compareProperties(sourceProp: AstSymbol, targetProp: AstSymbol, compareType: TypeComparer): Ternary {
  if (sourceProp === targetProp) return Ternary.True;
  if (symbolName(sourceProp) !== symbolName(targetProp)) return Ternary.False;
  if (((sourceProp.flags ?? 0) & SymbolFlags.Optional) !== ((targetProp.flags ?? 0) & SymbolFlags.Optional)) return Ternary.False;
  return compareType(getNonMissingTypeOfSymbol(sourceProp), getNonMissingTypeOfSymbol(targetProp));
}

export function compareTypesEqual(source: Type, target: Type): Ternary {
  return source === target ? Ternary.True : Ternary.False;
}

export function markPropertyAsReferenced(host: IndexedAccessHost, property: AstSymbol, nodeForCheckWriteOnly?: AstNode, isSelfTypeAccessValue = false): void {
  void isSelfTypeAccessValue;
  host.markReferenced?.(property, nodeForCheckWriteOnly);
}

export function expandSignatureParametersWithTupleMembers(signature: Signature, restType: Type, restIndex: number, restSymbol: AstSymbol): readonly AstSymbol[] {
  const elementTypes = tupleElementTypes(restType);
  const names = getUniqAssociatedNamesFromTupleType(restType, restSymbol);
  return [
    ...signature.parameters.slice(0, restIndex),
    ...elementTypes.map((type, index) => syntheticTypedSymbol(names[index] ?? `arg${index}`, type, SymbolFlags.FunctionScopedVariable)),
  ];
}

export function getUniqAssociatedNamesFromTupleType(type: Type, restSymbol: AstSymbol): readonly string[] {
  const infos = (targetTupleType(type).elementInfo ?? []) as readonly { readonly labeledDeclaration?: AstNode }[];
  const names = infos.map((info, index) => tupleElementLabel(info.labeledDeclaration, restSymbol, index));
  const counts = new Map<string, number>();
  return names.map(name => {
    const count = counts.get(name) ?? 0;
    counts.set(name, count + 1);
    return count === 0 ? name : `${name}_${count + 1}`;
  });
}

export function isRestParameter(symbol: AstSymbol): boolean {
  return symbol.declarations.some(declaration => declaration.kind === Kind.Parameter && Boolean((declaration as { readonly dotDotDotToken?: unknown }).dotDotDotToken));
}

export function getNameFromIndexInfo(indexInfo: IndexInfo): string {
  return typeName(indexInfo.keyType);
}

export function isUnknownLikeUnionType(type: Type): boolean {
  return (type.flags & TypeFlags.Union) !== 0 && (objectFlagsOf(type) & ObjectFlags.IsUnknownLikeUnion) !== 0;
}

export function containsUndefinedType(type: Type): boolean {
  return (type.flags & TypeFlags.Undefined) !== 0 || (type.flags & TypeFlags.Union) !== 0 && constituentTypes(type).some(containsUndefinedType);
}

export function getNormalizedType(host: IndexedAccessHost, type: Type, writing = false): Type {
  return getSimplifiedType(host, getReducedType(type), writing);
}

export function getSimplifiedType(host: IndexedAccessHost, type: Type, writing: boolean): Type {
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getSimplifiedIndexedAccessType(host, type, writing);
  if ((type.flags & TypeFlags.Conditional) !== 0) return getSimplifiedConditionalType(host, type, writing);
  return type;
}

export function getSimplifiedIndexedAccessType(host: IndexedAccessHost, type: Type, writing: boolean): Type {
  const objectType = indexedObjectType(type);
  const indexType = indexedIndexType(type);
  if (objectType === undefined || indexType === undefined) return type;
  if ((objectType.flags & TypeFlags.UnionOrIntersection) !== 0) return distributeObjectOverIndexType(host, objectType, indexType, writing) ?? type;
  if ((indexType.flags & TypeFlags.Union) !== 0) return distributeIndexOverObjectType(host, objectType, indexType, writing) ?? type;
  return getIndexedAccessTypeOrUndefined(host, objectType, indexType, writing ? AccessFlags.Writing : AccessFlags.None) ?? type;
}

export function distributeObjectOverIndexType(host: IndexedAccessHost, objectType: Type, indexType: Type, writing: boolean): Type | undefined {
  if ((objectType.flags & TypeFlags.Union) !== 0) {
    return getUnionTypeWorker(
      constituentTypes(objectType).map(type => getIndexedAccessTypeEx(host, type, indexType, writing ? AccessFlags.Writing : AccessFlags.None)),
      UnionReduction.Literal,
      undefined,
      undefined,
      host,
    );
  }
  if ((objectType.flags & TypeFlags.Intersection) !== 0) {
    return intersectKeyTypes(host, constituentTypes(objectType).map(type => getIndexedAccessTypeEx(host, type, indexType, writing ? AccessFlags.Writing : AccessFlags.None)));
  }
  return undefined;
}

export function distributeIndexOverObjectType(host: IndexedAccessHost, objectType: Type, indexType: Type, writing: boolean): Type | undefined {
  if ((indexType.flags & TypeFlags.Union) === 0) return undefined;
  const values = constituentTypes(indexType).map(type => getIndexedAccessTypeEx(host, objectType, type, writing ? AccessFlags.Writing : AccessFlags.None));
  return writing ? intersectKeyTypes(host, values) : getUnionTypeWorker(values, UnionReduction.Literal, undefined, undefined, host);
}

export function getSimplifiedConditionalType(host: IndexedAccessHost, type: Type, writing: boolean): Type {
  void host;
  void writing;
  const trueType = (type.data as { readonly trueType?: Type } | undefined)?.trueType;
  const falseType = (type.data as { readonly falseType?: Type } | undefined)?.falseType;
  return trueType === falseType && trueType !== undefined ? trueType : type;
}

export function isIntersectionEmpty(host: IndexedAccessHost, type: Type): boolean {
  return (type.flags & TypeFlags.Intersection) !== 0 && constituentTypes(type).some(item => isTypeAssignableToKind(host, item, TypeFlags.Never));
}

export function getSimplifiedTypeOrConstraint(host: IndexedAccessHost, type: Type, writing: boolean): Type {
  return getSimplifiedType(host, type, writing) ?? getBaseConstraintOrType(host, type);
}

export function getNormalizedUnionOrIntersectionType(host: IndexedAccessHost, type: Type, writing: boolean): Type {
  if (!shouldNormalizeIntersection(type)) return type;
  const normalized = constituentTypes(type).map(item => getNormalizedType(host, item, writing));
  return (type.flags & TypeFlags.Union) !== 0
    ? getUnionTypeWorker(normalized, UnionReduction.Literal, undefined, undefined, host)
    : intersectKeyTypes(host, normalized);
}

export function shouldNormalizeIntersection(type: Type): boolean {
  return (type.flags & TypeFlags.Intersection) !== 0 && constituentTypes(type).some(item => (item.flags & TypeFlags.Union) !== 0);
}

export function getNormalizedTupleType(type: Type): Type {
  const data = type.data as ObjectType | undefined;
  if ((data?.objectFlags ?? 0) & ObjectFlags.Tuple) {
    if (data === undefined) return type;
    return { ...type, data: { ...data, objectFlags: data.objectFlags | ObjectFlags.Reference } as ObjectType };
  }
  return type;
}

export function getSingleBaseForNonAugmentingSubtype(type: Type): Type | undefined {
  const bases = (type.data as { readonly resolvedBaseTypes?: readonly Type[] } | undefined)?.resolvedBaseTypes ?? [];
  return bases.length === 1 ? bases[0] : undefined;
}

export function getModifiersTypeFromMappedType(type: Type): Type {
  return (type.data as { readonly modifiersType?: Type; readonly constraintType?: Type } | undefined)?.modifiersType
    ?? (type.data as { readonly constraintType?: Type } | undefined)?.constraintType
    ?? unknownType;
}

export function transformTypeOfMembers(type: Type, transform: (type: Type) => Type): Type {
  const data = type.data as ObjectType | undefined;
  const properties = (data?.declaredProperties ?? []).map(symbol => {
    const propType = getTypeOfSymbol(symbol);
    return propType === undefined ? symbol : syntheticTypedSymbol(symbolName(symbol), transform(propType), symbol.flags ?? SymbolFlags.Property);
  });
  return { ...type, id: syntheticNextTypeId(), data: { ...(data ?? { objectFlags: ObjectFlags.Anonymous }), declaredProperties: properties } as ObjectType };
}

export function markLinkedReferences(host: IndexedAccessHost, node: AstNode | undefined): void {
  for (const symbol of linkedSymbols(node)) host.markReferenced?.(symbol, node);
}

export function isExportOrExportExpression(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ExportAssignment || node?.kind === Kind.ExportSpecifier || node?.kind === Kind.NamespaceExport;
}

export function shouldMarkIdentifierAliasReferenced(node: AstNode | undefined): boolean {
  return node?.kind === Kind.Identifier && isAliasSymbol(nodeSymbol(node));
}

export function isInternalModuleImportEqualsDeclaration(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ImportEqualsDeclaration && ((node as { readonly moduleReference?: AstNode }).moduleReference?.kind !== Kind.ExternalModuleReference);
}

export function markIdentifierAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol(node), node);
}

export function markPropertyAliasReferenced(host: IndexedAccessHost, symbol: AstSymbol | undefined, node?: AstNode): void {
  markAliasReferenced(host, symbol, node);
}

export function markExportAssignmentAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol((node as { readonly expression?: AstNode } | undefined)?.expression), node);
}

export function markJsxAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol((node as { readonly tagName?: AstNode } | undefined)?.tagName), node);
}

export function markImportEqualsAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol((node as { readonly name?: AstNode } | undefined)?.name), node);
}

export function markExportSpecifierAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol((node as { readonly propertyName?: AstNode; readonly name?: AstNode } | undefined)?.propertyName
    ?? (node as { readonly propertyName?: AstNode; readonly name?: AstNode } | undefined)?.name), node);
}

export function checkExternalEmitHelpers(host: IndexedAccessHost, node: AstNode | undefined): readonly string[] {
  const helpers = getHelperNames(node);
  if (helpers.length === 0) return helpers;
  const helperModule = resolveHelpersModule(node);
  if (helperModule === undefined) host.report?.(node, `External helpers required: ${helpers.join(", ")}`);
  return helpers;
}

export function hasSignatureWithArityGreaterThan(signatures: readonly Signature[], arity: number): boolean {
  return signatures.some(signature => signature.parameters.length > arity);
}

export function getHelperNames(node: AstNode | undefined): readonly string[] {
  return nodeArray((node as { readonly emitHelpers?: unknown; readonly helpers?: unknown } | undefined)?.emitHelpers
    ?? (node as { readonly emitHelpers?: unknown; readonly helpers?: unknown } | undefined)?.helpers)
    .map(helper => nodeText((helper as { readonly name?: AstNode }).name ?? helper))
    .filter(name => name.length !== 0);
}

export function resolveHelpersModule(node: AstNode | undefined): string | undefined {
  return (node as { readonly helpersModule?: string } | undefined)?.helpersModule
    ?? (node as { readonly externalHelpersModuleName?: string } | undefined)?.externalHelpersModuleName;
}

export function markDecoratorAliasReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol((node as { readonly expression?: AstNode } | undefined)?.expression), node);
}

export function getParameterTypeNodeForDecoratorCheck(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type ?? node;
}

export function markDecoratorMedataDataTypeNodeAsReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markTypeNodeAsReferenced(host, getParameterTypeNodeForDecoratorCheck(node));
}

export function getEntityNameForDecoratorMetadata(node: AstNode | undefined): readonly string[] {
  return getEntityNameFromTypeNode((node as { readonly type?: AstNode } | undefined)?.type ?? node);
}

export function getEntityNameForDecoratorMetadataFromTypeList(nodes: readonly AstNode[]): readonly string[][] {
  return nodes.map(node => [...getEntityNameForDecoratorMetadata(node)]);
}

export function markAliasReferenced(host: IndexedAccessHost, symbol: AstSymbol | undefined, node?: AstNode): void {
  if (symbol !== undefined && isAliasSymbol(symbol)) host.markReferenced?.(symbol, node);
}

export function markAliasSymbolAsReferenced(host: IndexedAccessHost, symbol: AstSymbol | undefined, node?: AstNode): void {
  markAliasReferenced(host, symbol, node);
}

export function getEntityNameFromTypeNode(node: AstNode | undefined): readonly string[] {
  if (node === undefined) return [];
  return getIdentifierChain((node as { readonly typeName?: AstNode; readonly expression?: AstNode; readonly name?: AstNode }).typeName
    ?? (node as { readonly typeName?: AstNode; readonly expression?: AstNode; readonly name?: AstNode }).expression
    ?? (node as { readonly typeName?: AstNode; readonly expression?: AstNode; readonly name?: AstNode }).name
    ?? node);
}

export function markTypeNodeAsReferenced(host: IndexedAccessHost, node: AstNode | undefined): void {
  markAliasReferenced(host, nodeSymbol(node), node);
  for (const child of childTypeNodes(node)) markTypeNodeAsReferenced(host, child);
}

function propertiesOfType(host: IndexedAccessHost, type: Type): readonly AstSymbol[] {
  return host.getPropertiesOfType?.(type) ?? (type.data as ObjectType | undefined)?.declaredProperties ?? [];
}

function indexInfosOfType(host: IndexedAccessHost, type: Type): readonly IndexInfo[] {
  return host.getIndexInfosOfType?.(type) ?? (type.data as ObjectType | undefined)?.indexInfos ?? [];
}

function propertyOfType(host: IndexedAccessHost, type: Type, name: string): AstSymbol | undefined {
  return host.getPropertyOfType?.(type, name)
    ?? (type.symbol as { readonly members?: Map<string, AstSymbol> } | undefined)?.members?.get(name)
    ?? (type.data as ObjectType | undefined)?.declaredProperties?.find(symbol => symbolName(symbol) === name);
}

function typeOfSymbol(host: IndexedAccessHost, symbol: AstSymbol): Type {
  return host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol) ?? unknownType;
}

function applicableIndexInfo(host: IndexedAccessHost, objectType: Type, indexType: Type): IndexInfo | undefined {
  return host.getIndexInfoOfType?.(objectType, indexType)
    ?? indexInfosOfType(host, objectType).find(info => isAssignable(host, indexType, info.keyType) || isKeyTypeIncluded(indexType, info.keyType.flags));
}

function propertyIndexInfo(type: Type, propName: string): IndexInfo | undefined {
  void propName;
  return (type.data as ObjectType | undefined)?.indexInfos?.[0];
}

function getReducedType(type: Type): Type {
  return (type.data as { readonly resolvedReducedType?: Type } | undefined)?.resolvedReducedType ?? type;
}

function getReducedApparentType(type: Type): Type {
  return type;
}

function intersectKeyTypes(host: IndexedAccessHost, types: readonly Type[]): Type {
  const flattened = types.flatMap(type => (type.flags & TypeFlags.Intersection) !== 0 ? constituentTypes(type) : [type]);
  return flattened.length === 0
    ? unknownType
    : flattened.length === 1
      ? flattened[0]!
      : { flags: TypeFlags.Intersection, id: syntheticNextTypeId(), data: { types: flattened, objectFlags: ObjectFlags.None } };
  void host;
}

function lowerBoundKeyTypes(type: Type): readonly Type[] {
  return (type.flags & TypeFlags.UnionOrIntersection) !== 0 ? constituentTypes(type) : [type];
}

function removeStringIndexKeys(host: IndexedAccessHost, type: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return (type.flags & (TypeFlags.Any | TypeFlags.String)) === 0 ? type : neverType;
  return getUnionTypeFromSortedList(
    constituentTypes(type).filter(item => (item.flags & (TypeFlags.Any | TypeFlags.String)) === 0),
    ObjectFlags.None,
    undefined,
    undefined,
    host,
  );
}

function symbolNameType(symbol: AstSymbol): Type | undefined {
  return (symbol as { readonly nameType?: Type }).nameType;
}

function literalTypeFromNameNode(node: AstNode): Type | undefined {
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral) return stringLiteral(nodeText(node));
  if (node.kind === Kind.NumericLiteral) return numberLiteral(Number(nodeText(node)));
  return undefined;
}

function isNonPublicSymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly nonPublic?: boolean }).nonPublic);
}

function stringLiteral(value: string): Type {
  return { flags: TypeFlags.StringLiteral, id: syntheticNextTypeId(), data: { value } };
}

function numberLiteral(value: number): Type {
  return { flags: TypeFlags.NumberLiteral, id: syntheticNextTypeId(), data: { value } };
}

function isAssignable(host: IndexedAccessHost, source: Type, target: Type): boolean {
  return host.isTypeAssignableTo?.(source, target) ?? (source === target || (source.flags & target.flags) !== 0 || (source.flags & TypeFlags.AnyOrUnknown) !== 0);
}

function getNameTypeFromMappedType(type: Type): Type | undefined {
  return (type.data as { readonly nameType?: Type } | undefined)?.nameType;
}

function getConstraintTypeFromMappedType(type: Type): Type | undefined {
  return (type.data as { readonly constraintType?: Type } | undefined)?.constraintType;
}

function getTypeParameterFromMappedType(type: Type): TypeParameter | undefined {
  return (type.data as { readonly typeParameter?: TypeParameter } | undefined)?.typeParameter;
}

function typeParameterAsType(typeParameter: TypeParameter): Type {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  return { flags: TypeFlags.TypeParameter, id: syntheticNextTypeId(), ...(symbol === undefined ? {} : { symbol }), data: typeParameter };
}

function isGenericTupleType(type: Type): boolean {
  return isTupleType(type) && tupleElementTypes(type).some(item => (item.flags & TypeFlags.TypeParameter) !== 0);
}

function isGenericMappedType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.Mapped) !== 0 && (objectFlagsOf(type) & ObjectFlags.IsGenericType) !== 0;
}

function isGenericReducibleType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.IsGenericType) !== 0 && (type.flags & TypeFlags.UnionOrIntersection) !== 0;
}

function isGenericIndexType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.IsGenericIndexType) !== 0 || (type.flags & (TypeFlags.Index | TypeFlags.IndexedAccess)) !== 0;
}

function isGenericObjectType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.IsGenericObjectType) !== 0 || ((type.flags & TypeFlags.Object) !== 0 && tupleElementTypes(type).some(item => (item.flags & TypeFlags.TypeParameter) !== 0));
}

function isEmptyObjectLike(type: Type): boolean {
  const data = type.data as ObjectType | undefined;
  return (type.flags & TypeFlags.NonPrimitive) !== 0
    || (type.flags & TypeFlags.Object) !== 0 && (data?.declaredProperties?.length ?? 0) === 0 && (data?.declaredCallSignatures?.length ?? 0) === 0 && (data?.indexInfos?.length ?? 0) === 0;
}

function isPatternLiteralType(type: Type): boolean {
  return (type.flags & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) !== 0;
}

function maybeTypeOfKind(type: Type, kind: TypeFlags): boolean {
  if ((type.flags & kind) !== 0) return true;
  return (type.flags & TypeFlags.UnionOrIntersection) !== 0 && constituentTypes(type).some(item => maybeTypeOfKind(item, kind));
}

function isType(value: Type | undefined): value is Type {
  return value !== undefined;
}

function constraintOfType(type: Type): Type | undefined {
  return (type.data as { readonly constraint?: Type } | undefined)?.constraint;
}

function substitutionBaseType(type: Type): Type | undefined {
  return (type.data as { readonly baseType?: Type } | undefined)?.baseType;
}

function indexedObjectType(type: Type): Type | undefined {
  return (type.data as { readonly objectType?: Type } | undefined)?.objectType;
}

function indexedIndexType(type: Type): Type | undefined {
  return (type.data as { readonly indexType?: Type } | undefined)?.indexType;
}

function isTypeUsableAsPropertyName(type: Type): boolean {
  return (type.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.UniqueESSymbol)) !== 0;
}

function getPropertyNameFromType(type: Type): string {
  return String(literalValue(type) ?? symbolName(type.symbol));
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function everyType(type: Type, callback: (type: Type) => boolean): boolean {
  return (type.flags & TypeFlags.Union) !== 0 ? constituentTypes(type).every(callback) : callback(type);
}

function isTupleType(type: Type): boolean {
  return (objectFlagsOf(type) & ObjectFlags.Tuple) !== 0;
}

function tupleElementTypeAt(type: Type, index: number): Type | undefined {
  return tupleElementTypes(type)[index];
}

function tupleElementTypes(type: Type): readonly Type[] {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? [];
}

function targetTupleType(type: Type): { readonly elementInfo?: readonly { readonly labeledDeclaration?: AstNode }[] } {
  return (type.data as { readonly target?: { readonly elementInfo?: readonly { readonly labeledDeclaration?: AstNode }[] }; readonly elementInfo?: readonly { readonly labeledDeclaration?: AstNode }[] } | undefined)?.target
    ?? (type.data as { readonly elementInfo?: readonly { readonly labeledDeclaration?: AstNode }[] } | undefined)
    ?? {};
}

function totalFixedElementCount(type: Type): number {
  const data = type.data as { readonly fixedLength?: number; readonly elementInfo?: readonly { readonly flags: number }[] } | undefined;
  return data?.fixedLength ?? data?.elementInfo?.filter(info => (info.flags & 4) === 0).length ?? 0;
}

function tupleElementLabel(node: AstNode | undefined, restSymbol: AstSymbol, index: number): string {
  return propertyNameText((node as { readonly name?: AstNode } | undefined)?.name) || (index === 0 ? symbolName(restSymbol) : `arg${index}`);
}

function syntheticTypedSymbol(name: string, type: Type, flags: SymbolFlags): AstSymbol {
  return { name, escapedName: name, flags, declarations: [], synthetic: true, syntheticType: type } as AstSymbol;
}

function getNonMissingTypeOfSymbol(symbol: AstSymbol): Type {
  return getTypeOfSymbol(symbol) ?? unknownType;
}

function bestSuggestion(name: string, candidates: readonly string[]): string | undefined {
  let best: string | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    const distance = editDistance(name, candidate);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return bestDistance <= Math.max(2, Math.floor(name.length / 3)) ? best : undefined;
}

function editDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let upperLeft = previous[0]!;
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const upper = previous[rightIndex]!;
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previous[rightIndex] = Math.min(previous[rightIndex]! + 1, previous[rightIndex - 1]! + 1, upperLeft + cost);
      upperLeft = upper;
    }
  }
  return previous[right.length]!;
}

function containingConstructor(node: AstNode | undefined): AstNode | undefined {
  for (let current = node; current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.Constructor) return current;
  }
  return undefined;
}

function isPropertyName(node: AstNode | undefined): boolean {
  return node?.kind === Kind.Identifier
    || node?.kind === Kind.StringLiteral
    || node?.kind === Kind.NumericLiteral
    || node?.kind === Kind.PrivateIdentifier
    || node?.kind === Kind.ComputedPropertyName;
}

function propertyNameText(node: AstNode | undefined): string {
  if (node === undefined || node.kind === Kind.ComputedPropertyName) return "";
  return nodeText(node);
}

function isNumericLiteralName(name: string): boolean {
  return name.length !== 0 && Number.isInteger(Number(name));
}

function typeName(type: Type): string {
  if ((type.flags & TypeFlags.StringLiteral) !== 0 || (type.flags & TypeFlags.NumberLiteral) !== 0) return String(literalValue(type));
  return type.symbol === undefined ? `type#${type.id}` : symbolName(type.symbol);
}

function isAliasSymbol(symbol: AstSymbol | undefined): boolean {
  return symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0;
}

function linkedSymbols(node: AstNode | undefined): readonly AstSymbol[] {
  if (node === undefined) return [];
  return [nodeSymbol(node), ...childTypeNodes(node).flatMap(linkedSymbols)].filter(isSymbol);
}

function childTypeNodes(node: AstNode | undefined): readonly AstNode[] {
  if (node === undefined) return [];
  const out: AstNode[] = [];
  for (const key of ["type", "typeName", "typeArguments", "types", "elementType", "indexType", "objectType", "checkType", "extendsType", "trueType", "falseType"]) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) out.push(value);
    else out.push(...nodeArray(value));
  }
  return out;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isSymbol(value: AstSymbol | undefined): value is AstSymbol {
  return value !== undefined;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function getNodeCheckedType(node: AstNode | undefined): Type | undefined {
  return (node as { readonly checkedType?: Type; readonly type?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type } | undefined)?.type;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName(nodeSymbol(node));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? ObjectFlags.None;
}

function syntheticNextTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}

let syntheticTypeId = -2_980_000;
