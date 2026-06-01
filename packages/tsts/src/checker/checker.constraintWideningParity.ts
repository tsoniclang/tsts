/**
 * Constraint, widening, optionality, and simplification checks.
 *
 * This ports the checker.go region that computes base constraints, widened
 * variable/property types, optional markers, nullable removal, simplified
 * indexed/conditional types, and type-kind predicates. These operations are
 * load-bearing for checker/binder parity because TS-Go routes many declaration
 * and expression checks through the same constraint/widening helpers.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexedAccessType, ObjectType, Type, TypeParameter, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface ConstraintWideningHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly nullType: Type;
  readonly voidType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly symbolType?: Type;
  readonly falseType?: Type;
  readonly trueType?: Type;
  readonly emptyObjectType?: Type;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getBaseConstraintOfType?: (type: Type) => Type | undefined;
  readonly getConstraintOfTypeParameter?: (type: Type) => Type | undefined;
  readonly getDefaultFromTypeParameter?: (type: Type) => Type | undefined;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getIndexTypeOfType?: (type: Type, keyType: Type) => Type | undefined;
  readonly instantiateType?: (type: Type, mapper: unknown) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createIntersectionType?: (types: readonly Type[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

interface ConditionalTypeData {
  readonly root?: {
    readonly trueType?: Type;
    readonly falseType?: Type;
  };
  readonly resolvedTrueType?: Type;
  readonly resolvedFalseType?: Type;
  readonly resolvedConstraintOfDistributive?: Type;
}

export interface WideningContext {
  readonly parent?: WideningContext;
  readonly propertyName?: string;
  readonly siblings?: readonly Type[];
  readonly resolvedProperties: Map<string, AstSymbol>;
}

export interface ConstraintResolutionState {
  readonly stack: Type[];
  readonly seen: Set<Type>;
  circular: boolean;
}

export type WideningKind = "normal" | "literal" | "evolving-array" | "object-literal" | "property" | "return";

export interface WideningResult {
  readonly input: Type;
  readonly output: Type;
  readonly changed: boolean;
  readonly kind: WideningKind;
}

export function createWideningContext(parent?: WideningContext, propertyName?: string, siblings: readonly Type[] = []): WideningContext {
  const context: WideningContext = { resolvedProperties: new Map(), siblings };
  if (parent !== undefined) (context as { parent?: WideningContext }).parent = parent;
  if (propertyName !== undefined) (context as { propertyName?: string }).propertyName = propertyName;
  return context;
}

export function getChildWideningContext(context: WideningContext | undefined, propertyName: string): WideningContext {
  return createWideningContext(context, propertyName, context?.siblings ?? []);
}

export function getConstraintOfType(type: Type, host: ConstraintWideningHost): Type | undefined {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return getConstraintOfTypeParameter(type, host);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getConstraintOfIndexedAccess(type, host);
  if ((type.flags & TypeFlags.Conditional) !== 0) return getConstraintOfConditionalType(type, host);
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return getBaseConstraintOfType(type, host);
  return undefined;
}

export function getConstraintOfTypeParameter(typeParameter: Type, host: ConstraintWideningHost): Type | undefined {
  return host.getConstraintOfTypeParameter?.(typeParameter)
    ?? (typeParameter.data as TypeParameter | undefined)?.constraint
    ?? getInferredTypeParameterConstraint(typeParameter, false, host);
}

export function hasNonCircularBaseConstraint(type: Type, host: ConstraintWideningHost): boolean {
  const state: ConstraintResolutionState = { stack: [], seen: new Set(), circular: false };
  getResolvedBaseConstraint(type, state, host);
  return !state.circular;
}

export function getBaseConstraintOfType(type: Type, host: ConstraintWideningHost): Type | undefined {
  return host.getBaseConstraintOfType?.(type) ?? getResolvedBaseConstraint(type, { stack: [], seen: new Set(), circular: false }, host);
}

export function getResolvedBaseConstraint(type: Type, state: ConstraintResolutionState, host: ConstraintWideningHost): Type | undefined {
  if (state.seen.has(type)) return undefined;
  if (state.stack.includes(type)) {
    state.circular = true;
    return host.neverType;
  }
  state.stack.push(type);
  const computed = computeBaseConstraint(type, state, host);
  state.stack.pop();
  state.seen.add(type);
  return computed;
}

export function computeBaseConstraint(type: Type, state: ConstraintResolutionState, host: ConstraintWideningHost): Type | undefined {
  if ((type.flags & TypeFlags.TypeParameter) !== 0) return getConstraintFromTypeParameter(type, state, host);
  if ((type.flags & TypeFlags.Union) !== 0) return mapConstituentConstraints(type, true, state, host);
  if ((type.flags & TypeFlags.Intersection) !== 0) return mapConstituentConstraints(type, false, state, host);
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getConstraintFromIndexedAccess(type, host);
  if ((type.flags & TypeFlags.Conditional) !== 0) return getConstraintFromConditionalType(type, host);
  if ((type.flags & TypeFlags.Substitution) !== 0) return (type.data as { readonly constraint?: Type } | undefined)?.constraint;
  return type;
}

export function getNextBaseConstraint(type: Type, state: ConstraintResolutionState, host: ConstraintWideningHost): Type | undefined {
  const constraint = getConstraintOfType(type, host);
  if (constraint === undefined || constraint === type) return undefined;
  return getResolvedBaseConstraint(constraint, state, host);
}

export function getConstraintFromTypeParameter(type: Type, state: ConstraintResolutionState, host: ConstraintWideningHost): Type | undefined {
  const direct = (type.data as TypeParameter | undefined)?.constraint;
  if (direct !== undefined) return getResolvedBaseConstraint(direct, state, host) ?? direct;
  const inferred = getInferredTypeParameterConstraint(type, false, host);
  return inferred === undefined ? host.unknownType : inferred;
}

export function getConstraintOrUnknownFromTypeParameter(type: Type, host: ConstraintWideningHost): Type {
  return getConstraintOfTypeParameter(type, host) ?? host.unknownType;
}

export function getInferredTypeParameterConstraint(type: Type, omitTypeReferences: boolean, host: ConstraintWideningHost): Type | undefined {
  const declaration = typeDeclaration(type);
  if (declaration === undefined) return undefined;
  const inferred: Type[] = [];
  for (const usage of collectConstraintSources(declaration)) {
    const sourceType = (usage as { readonly inferredType?: Type }).inferredType;
    if (sourceType !== undefined && (!omitTypeReferences || (sourceType.flags & TypeFlags.Object) === 0)) inferred.push(sourceType);
  }
  if (inferred.length === 0) return undefined;
  return host.createUnionType?.(inferred) ?? unionType(inferred);
}

export function getConstraintOfIndexedAccess(type: Type, host: ConstraintWideningHost): Type | undefined {
  return (type.data as IndexedAccessType | undefined)?.constraint ?? getConstraintFromIndexedAccess(type, host);
}

export function getConstraintFromIndexedAccess(type: Type, host: ConstraintWideningHost): Type | undefined {
  const data = type.data as IndexedAccessType | undefined;
  if (data === undefined) return undefined;
  const objectConstraint = getBaseConstraintOfType(data.objectType, host) ?? data.objectType;
  const indexConstraint = getBaseConstraintOfType(data.indexType, host) ?? data.indexType;
  if (objectConstraint === data.objectType && indexConstraint === data.indexType) return undefined;
  return host.getIndexTypeOfType?.(objectConstraint, indexConstraint) ?? host.createUnionType?.([objectConstraint, indexConstraint]) ?? unionType([objectConstraint, indexConstraint]);
}

export function getConstraintOfConditionalType(type: Type, host: ConstraintWideningHost): Type | undefined {
  return (type.data as ConditionalTypeData | undefined)?.resolvedConstraintOfDistributive;
}

export function getConstraintFromConditionalType(type: Type, host: ConstraintWideningHost): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  if (data === undefined) return undefined;
  const trueType = data.resolvedTrueType ?? data.root?.trueType;
  const falseType = data.resolvedFalseType ?? data.root?.falseType;
  if (trueType === undefined || falseType === undefined) return undefined;
  return host.createUnionType?.([trueType, falseType]) ?? unionType([trueType, falseType]);
}

export function getDefaultConstraintOfConditionalType(type: Type, host: ConstraintWideningHost): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  const trueType = data?.resolvedTrueType ?? data?.root?.trueType;
  const falseType = data?.resolvedFalseType ?? data?.root?.falseType;
  return trueType !== undefined && falseType !== undefined ? host.createUnionType?.([trueType, falseType]) ?? unionType([trueType, falseType]) : undefined;
}

export function getConstraintOfDistributiveConditionalType(type: Type, host: ConstraintWideningHost): Type | undefined {
  const data = type.data as ConditionalTypeData | undefined;
  if (data?.resolvedConstraintOfDistributive !== undefined) return data.resolvedConstraintOfDistributive;
  return getDefaultConstraintOfConditionalType(type, host);
}

export function getBaseConstraintOrType(type: Type, host: ConstraintWideningHost): Type {
  return getBaseConstraintOfType(type, host) ?? type;
}

export function maybeTypeOfKind(type: Type, kind: TypeFlags, host: ConstraintWideningHost): boolean {
  if ((type.flags & kind) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(part => maybeTypeOfKind(part, kind, host));
  if ((type.flags & TypeFlags.Intersection) !== 0) return constituentTypes(type).some(part => maybeTypeOfKind(part, kind, host));
  return maybeTypeOfKindConsideringBaseConstraint(type, kind, host);
}

export function maybeTypeOfKindConsideringBaseConstraint(type: Type, kind: TypeFlags, host: ConstraintWideningHost): boolean {
  const constraint = getBaseConstraintOfType(type, host);
  return constraint !== undefined && constraint !== type && maybeTypeOfKind(constraint, kind, host);
}

export function allTypesAssignableToKind(source: Type, kind: TypeFlags, host: ConstraintWideningHost): boolean {
  return allTypesAssignableToKindEx(source, kind, false, host);
}

export function allTypesAssignableToKindEx(source: Type, kind: TypeFlags, strict: boolean, host: ConstraintWideningHost): boolean {
  if ((source.flags & TypeFlags.Union) !== 0) return constituentTypes(source).every(part => allTypesAssignableToKindEx(part, kind, strict, host));
  return isTypeAssignableToKindEx(source, kind, strict, host);
}

export function isTypeAssignableToKind(source: Type, kind: TypeFlags, host: ConstraintWideningHost): boolean {
  return isTypeAssignableToKindEx(source, kind, false, host);
}

export function isTypeAssignableToKindEx(source: Type, kind: TypeFlags, strict: boolean, host: ConstraintWideningHost): boolean {
  if ((source.flags & kind) !== 0) return true;
  if (!strict && (source.flags & TypeFlags.AnyOrUnknown) !== 0) return true;
  const constraint = getBaseConstraintOfType(source, host);
  return constraint !== undefined && constraint !== source && isTypeAssignableToKindEx(constraint, kind, strict, host);
}

export function widenTypeForVariableLikeDeclaration(type: Type, declaration: AstNode, reportErrors: boolean, host: ConstraintWideningHost): Type {
  const widened = getWidenedTypeForVariableLikeDeclaration(declaration, type, reportErrors, host);
  reportErrorsFromWidening(declaration, widened, "normal", host);
  return widened;
}

export function getWidenedTypeForVariableLikeDeclaration(declaration: AstNode, type: Type, reportErrors: boolean, host: ConstraintWideningHost): Type {
  const contextual = (declaration as { readonly contextualType?: Type }).contextualType;
  const widened = contextual === undefined ? getWidenedType(type, host) : getWidenedLiteralLikeTypeForContextualType(type, contextual, host);
  if (reportErrors) reportErrorsFromWidening(declaration, widened, "normal", host);
  return widened;
}

export function getWidenedLiteralTypeForInitializer(declaration: AstNode, type: Type, host: ConstraintWideningHost): Type {
  if (isConstLike(declaration) || isReadonlyDeclaration(declaration)) return type;
  return getWidenedLiteralType(type, host);
}

export function widenTypeInferredFromInitializer(declaration: AstNode, type: Type, host: ConstraintWideningHost): Type {
  if (isPartOfParameterDeclaration(declaration) || isConstLike(declaration)) return type;
  return getWidenedType(type, host);
}

export function getWidenedType(type: Type, host: ConstraintWideningHost): Type {
  return getWidenedTypeWithContext(type, undefined, host);
}

export function getWidenedTypeWithContext(type: Type, context: WideningContext | undefined, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return host.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return host.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return host.booleanType;
  if ((type.flags & TypeFlags.EnumLiteral) !== 0) return getBaseTypeOfLiteralType(type, host);
  if ((type.flags & TypeFlags.Union) !== 0) return mapType(type, part => getWidenedTypeWithContext(part, context, host), true, host);
  if ((type.flags & TypeFlags.Object) !== 0 && isObjectLiteralType(type)) return getWidenedTypeOfObjectLiteral(type, context, host);
  return type;
}

export function getWidenedTypeOfObjectLiteral(type: Type, context: WideningContext | undefined, host: ConstraintWideningHost): Type {
  const properties = host.getPropertiesOfType?.(type) ?? [];
  const widenedProperties = properties.map(property => getWidenedProperty(property, context, host));
  const object = type.data as ObjectType | undefined;
  return {
    id: nextSyntheticTypeId(),
    flags: type.flags,
    data: {
      ...(object ?? {}),
      declaredProperties: widenedProperties,
      objectFlags: (object?.objectFlags ?? ObjectFlags.Anonymous) | ObjectFlags.ContainsWideningType,
    } as ObjectType,
  };
}

export function getWidenedProperty(property: AstSymbol, context: WideningContext | undefined, host: ConstraintWideningHost): AstSymbol {
  const propertyType = host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
  if (propertyType === undefined) return property;
  const childContext = getChildWideningContext(context, symbolName(property));
  const widenedType = getWidenedTypeWithContext(propertyType, childContext, host);
  if (widenedType === propertyType) return property;
  const clone = cloneSymbolShell(property);
  if (property.flags !== undefined) clone.flags = property.flags;
  if (property.parent !== undefined) clone.parent = property.parent;
  if (property.valueDeclaration !== undefined) clone.valueDeclaration = property.valueDeclaration;
  (clone as { type?: Type }).type = widenedType;
  return clone;
}

export function getUndefinedProperty(property: AstSymbol, host: ConstraintWideningHost): AstSymbol {
  const clone = cloneSymbolShell(property);
  if (property.flags !== undefined) clone.flags = property.flags;
  (clone as { type?: Type }).type = host.undefinedType;
  return clone;
}

export function getWidenedLiteralType(type: Type, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return host.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return host.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return host.booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) return mapType(type, part => getWidenedLiteralType(part, host), true, host);
  return type;
}

export function getWidenedUniqueESSymbolType(type: Type, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.UniqueESSymbol) !== 0) return host.symbolType ?? type;
  if ((type.flags & TypeFlags.Union) !== 0) return mapType(type, part => getWidenedUniqueESSymbolType(part, host), true, host);
  return type;
}

export function getWidenedLiteralLikeTypeForContextualType(type: Type, contextualType: Type, host: ConstraintWideningHost): Type {
  if (isLiteralOfContextualType(type, contextualType, host)) return type;
  return getWidenedLiteralType(type, host);
}

export function isLiteralOfContextualType(candidateType: Type, contextualType: Type, host: ConstraintWideningHost): boolean {
  if ((contextualType.flags & TypeFlags.Union) !== 0) return constituentTypes(contextualType).some(part => isLiteralOfContextualType(candidateType, part, host));
  if ((candidateType.flags & TypeFlags.StringLiteral) !== 0) return (contextualType.flags & TypeFlags.StringLike) !== 0;
  if ((candidateType.flags & TypeFlags.NumberLiteral) !== 0) return (contextualType.flags & TypeFlags.NumberLike) !== 0;
  if ((candidateType.flags & TypeFlags.BooleanLiteral) !== 0) return (contextualType.flags & TypeFlags.BooleanLike) !== 0;
  const constraint = getBaseConstraintOfType(contextualType, host);
  return constraint !== undefined && constraint !== contextualType && isLiteralOfContextualType(candidateType, constraint, host);
}

export function addOptionality(type: Type, isProperty: boolean, isOptional: boolean, host: ConstraintWideningHost): Type {
  return isOptional ? getOptionalType(type, isProperty, host) : type;
}

export function getOptionalType(type: Type, isProperty: boolean, host: ConstraintWideningHost): Type {
  if (containsUndefinedType(type)) return type;
  const marker = isProperty ? host.undefinedType : host.voidType;
  return host.createUnionType?.([type, marker]) ?? unionType([type, marker]);
}

export function getNullableType(type: Type, flags: TypeFlags, host: ConstraintWideningHost): Type {
  const additions: Type[] = [];
  if ((flags & TypeFlags.Undefined) !== 0 && !containsUndefinedType(type)) additions.push(host.undefinedType);
  if ((flags & TypeFlags.Null) !== 0 && !containsNullType(type)) additions.push(host.nullType);
  return additions.length === 0 ? type : host.createUnionType?.([type, ...additions]) ?? unionType([type, ...additions]);
}

export function getNonNullableType(type: Type, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return (type.flags & TypeFlags.Nullable) !== 0 ? host.neverType : type;
  const kept = constituentTypes(type).filter(part => (part.flags & TypeFlags.Nullable) === 0);
  return kept.length === 0 ? host.neverType : host.createUnionType?.(kept) ?? unionType(kept);
}

export function isNullableType(type: Type): boolean {
  if ((type.flags & TypeFlags.Nullable) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(isNullableType);
  return false;
}

export function getNonNullableTypeIfNeeded(type: Type, host: ConstraintWideningHost): Type {
  return isNullableType(type) ? getNonNullableType(type, host) : type;
}

export function removeOptionalTypeMarker(type: Type, host: ConstraintWideningHost): Type {
  return filterType(type, part => part !== host.undefinedType && (part.flags & TypeFlags.Void) === 0, host);
}

export function addOptionalTypeMarker(type: Type, host: ConstraintWideningHost): Type {
  return containsUndefinedType(type) ? type : host.createUnionType?.([type, host.undefinedType]) ?? unionType([type, host.undefinedType]);
}

export function propagateOptionalTypeMarker(type: Type, node: AstNode, wasOptional: boolean, host: ConstraintWideningHost): Type {
  return wasOptional || isOptionalChain(node) ? addOptionalTypeMarker(type, host) : type;
}

export function removeMissingType(type: Type, isOptional: boolean, host: ConstraintWideningHost): Type {
  return isOptional ? filterType(type, part => (part.flags & TypeFlags.Undefined) === 0, host) : type;
}

export function removeMissingOrUndefinedType(type: Type, host: ConstraintWideningHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.Undefined) === 0, host);
}

export function removeDefinitelyFalsyTypes(type: Type, host: ConstraintWideningHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.DefinitelyFalsy) === 0, host);
}

export function extractDefinitelyFalsyTypes(type: Type, host: ConstraintWideningHost): Type {
  return filterType(type, part => (part.flags & TypeFlags.DefinitelyFalsy) !== 0, host);
}

export function getDefinitelyFalsyPartOfType(type: Type, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.DefinitelyFalsy) !== 0) return type;
  if ((type.flags & TypeFlags.Union) !== 0) return extractDefinitelyFalsyTypes(type, host);
  return host.neverType;
}

export function getSimplifiedType(type: Type, writing: boolean, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.IndexedAccess) !== 0) return getSimplifiedIndexedAccessType(type, writing, host);
  if ((type.flags & TypeFlags.Conditional) !== 0) return getSimplifiedConditionalType(type, writing, host);
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return getNormalizedUnionOrIntersectionType(type, writing, host);
  return type;
}

export function getSimplifiedIndexedAccessType(type: Type, writing: boolean, host: ConstraintWideningHost): Type {
  const data = type.data as IndexedAccessType | undefined;
  if (data === undefined) return type;
  const object = getSimplifiedType(data.objectType, writing, host);
  const index = getSimplifiedType(data.indexType, writing, host);
  if (object === data.objectType && index === data.indexType) return type;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.IndexedAccess, data: { ...data, objectType: object, indexType: index } as IndexedAccessType };
}

export function getSimplifiedConditionalType(type: Type, writing: boolean, host: ConstraintWideningHost): Type {
  const constraint = getConstraintFromConditionalType(type, host);
  if (constraint !== undefined && !writing) return constraint;
  return type;
}

export function getNormalizedUnionOrIntersectionType(type: Type, writing: boolean, host: ConstraintWideningHost): Type {
  const parts = constituentTypes(type).map(part => getSimplifiedType(part, writing, host));
  if ((type.flags & TypeFlags.Union) !== 0) return host.createUnionType?.(parts) ?? unionType(parts);
  return host.createIntersectionType?.(parts) ?? intersectionType(parts);
}

export function shouldNormalizeIntersection(type: Type): boolean {
  return (type.flags & TypeFlags.Intersection) !== 0 && constituentTypes(type).some(part => (part.flags & TypeFlags.Union) !== 0);
}

export function getNormalizedTupleType(type: Type, writing: boolean, host: ConstraintWideningHost): Type {
  const args = (type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments;
  if (args === undefined) return type;
  const mapped = args.map(arg => getSimplifiedType(arg, writing, host));
  return { ...type, id: nextSyntheticTypeId(), data: { ...(type.data as object), resolvedTypeArguments: mapped } as unknown as ObjectType };
}

function mapConstituentConstraints(type: Type, union: boolean, state: ConstraintResolutionState, host: ConstraintWideningHost): Type | undefined {
  const constraints = constituentTypes(type).map(part => getResolvedBaseConstraint(part, state, host)).filter((part): part is Type => part !== undefined);
  if (constraints.length === 0) return undefined;
  return union ? host.createUnionType?.(constraints) ?? unionType(constraints) : host.createIntersectionType?.(constraints) ?? intersectionType(constraints);
}

function mapType(type: Type, mapper: (type: Type) => Type, union: boolean, host: ConstraintWideningHost): Type {
  const parts = constituentTypes(type).map(mapper);
  if (parts.every((part, index) => part === constituentTypes(type)[index])) return type;
  return union ? host.createUnionType?.(parts) ?? unionType(parts) : host.createIntersectionType?.(parts) ?? intersectionType(parts);
}

function filterType(type: Type, predicate: (type: Type) => boolean, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : host.neverType;
  const kept = constituentTypes(type).filter(predicate);
  if (kept.length === 0) return host.neverType;
  if (kept.length === 1) return kept[0]!;
  return host.createUnionType?.(kept) ?? unionType(kept);
}

function getBaseTypeOfLiteralType(type: Type, host: ConstraintWideningHost): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return host.stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return host.numberType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return host.booleanType;
  return type;
}

function reportErrorsFromWidening(declaration: AstNode, type: Type, kind: WideningKind, host: ConstraintWideningHost): void {
  if ((type.flags & TypeFlags.Any) !== 0 && kind !== "literal") host.report?.(declaration, "Type implicitly widens to 'any'.");
}

function collectConstraintSources(declaration: AstNode): readonly AstNode[] {
  return nodeTree(declaration).filter(node => (node as { readonly inferredType?: Type }).inferredType !== undefined);
}

function typeDeclaration(type: Type): AstNode | undefined {
  return (type as { readonly symbol?: AstSymbol }).symbol?.declarations?.[0]
    ?? (type.data as { readonly declaration?: AstNode } | undefined)?.declaration;
}

function containsUndefinedType(type: Type): boolean {
  if ((type.flags & TypeFlags.Undefined) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(containsUndefinedType);
  return false;
}

function containsNullType(type: Type): boolean {
  if ((type.flags & TypeFlags.Null) !== 0) return true;
  if ((type.flags & TypeFlags.Union) !== 0) return constituentTypes(type).some(containsNullType);
  return false;
}

function isObjectLiteralType(type: Type): boolean {
  return ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.ObjectLiteral ? true : false;
}

function isConstLike(node: AstNode): boolean {
  return hasModifier(node, "const") || Boolean((node as { readonly const?: boolean }).const);
}

function isReadonlyDeclaration(node: AstNode): boolean {
  return hasModifier(node, "readonly") || ((symbolOf(node)?.flags ?? 0) & SymbolFlags.Property) !== 0 && hasModifier(node, "static");
}

function isPartOfParameterDeclaration(node: AstNode): boolean {
  return node.kind === Kind.Parameter || node.parent?.kind === Kind.Parameter;
}

function isOptionalChain(node: AstNode): boolean {
  return Boolean((node as { readonly questionDotToken?: unknown }).questionDotToken)
    || node.kind === Kind.PropertyAccessExpression && Boolean((node as { readonly questionDotToken?: unknown }).questionDotToken);
}

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] } | undefined)?.modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function symbolOf(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function cloneSymbolShell(property: AstSymbol): AstSymbol {
  return {
    ...(property.name !== undefined ? { name: property.name } : {}),
    ...(property.escapedName !== undefined ? { escapedName: property.escapedName } : {}),
    declarations: [...(property.declarations ?? [])],
  };
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function nodeTree(root: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  const visit = (node: AstNode | undefined): void => {
    if (node === undefined) return;
    out.push(node);
    for (const child of childNodes(node)) visit(child);
  };
  visit(root);
  return out;
}

function childNodes(node: AstNode): readonly AstNode[] {
  const children: AstNode[] = [];
  for (const key of ["statements", "members", "parameters", "typeParameters", "arguments", "elements", "properties"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(value)) children.push(...value.filter(isNode));
  }
  for (const key of ["type", "constraint", "default", "initializer", "expression", "name"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) children.push(value);
  }
  return children;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function unionType(types: readonly Type[]): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: uniqueTypes(types), objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function intersectionType(types: readonly Type[]): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Intersection, data: { types: uniqueTypes(types), objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function uniqueTypes(types: readonly Type[]): readonly Type[] {
  return [...new Set(types)];
}

let syntheticTypeId = -3_300_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
