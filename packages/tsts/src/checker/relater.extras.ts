/**
 * Relater parity extras.
 *
 * Conceptual split from TS-Go `internal/checker/relater.go` sections that
 * manage relation caches and structured/union/intersection comparisons.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { Signature, Type, TypeMapper, TypePredicate } from "./types.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getMappedType } from "./mapper.js";

export interface Relation {
  readonly name: string;
  readonly cache: Map<string, boolean>;
  readonly errors: string[];
}

export function get(relation: Relation, source: Type, target: Type): boolean | undefined {
  return relation.cache.get(relationKey(source, target));
}

export function set(relation: Relation, source: Type, target: Type, value: boolean): void {
  relation.cache.set(relationKey(source, target), value);
}

export function size(relation: Relation): number {
  return relation.cache.size;
}

export function len(relation: Relation): number {
  return size(relation);
}

export function name(relation: Relation): string {
  return relation.name;
}

export function matches(relation: Relation, source: Type, target: Type): boolean {
  return get(relation, source, target) === true;
}

export function isObjectOrInstantiableNonPrimitive(type: Type): boolean {
  return (type.flags & (TypeFlags.Object | TypeFlags.InstantiableNonPrimitive | TypeFlags.NonPrimitive)) !== 0;
}

export function instantiateTypePredicate(predicate: TypePredicate | undefined, mapper: TypeMapper | undefined): TypePredicate | undefined {
  if (predicate === undefined || mapper === undefined || predicate.type === undefined) return predicate;
  return { ...predicate, type: getMappedType(predicate.type, mapper) };
}

export function isRelatedToSimple(source: Type, target: Type): boolean {
  if (source === target) return true;
  if ((target.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
  if ((source.flags & TypeFlags.Never) !== 0) return true;
  if ((source.flags & target.flags & TypeFlags.Primitive) !== 0) return true;
  return false;
}

export function isRelatedToWorker(relation: Relation, source: Type, target: Type): boolean {
  const cached = get(relation, source, target);
  if (cached !== undefined) return cached;
  const result = isRelatedToSimple(source, target)
    || unionOrIntersectionRelatedTo(relation, source, target)
    || structuredTypeRelatedToWorker(relation, source, target);
  set(relation, source, target, result);
  return result;
}

export function isRelatedTo(relation: Relation, source: Type, target: Type): boolean {
  return isRelatedToWorker(relation, source, target);
}

export function isRelatedToEx(relation: Relation, source: Type, target: Type, errorNode: AstNode | undefined): boolean {
  const result = isRelatedToWorker(relation, source, target);
  if (!result) reportError(relation, errorNode, `${typeName(source)} is not related to ${typeName(target)}.`);
  return result;
}

export function hasExcessProperties(source: Type, target: Type): boolean {
  const targetNames = new Set(propertiesOfType(target).map(symbolName));
  return propertiesOfType(source).some(property => !targetNames.has(symbolName(property)));
}

export function getTypeOfPropertyInTypes(types: readonly Type[], name: string): Type | undefined {
  const propertyTypes = types.map(type => getTypeOfPropertyInType(type, name)).filter((type): type is Type => type !== undefined);
  if (propertyTypes.length === 0) return undefined;
  return unionType(propertyTypes);
}

export function getTypeOfPropertyInType(type: Type, name: string): Type | undefined {
  const property = propertiesOfType(type).find(symbol => symbolName(symbol) === name);
  return getTypeOfSymbol(property);
}

export function shouldCheckAsExcessProperty(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) === 0 && !symbolName(symbol).startsWith("__");
}

export function isIgnoredJsxProperty(symbol: AstSymbol): boolean {
  const propertyName = symbolName(symbol);
  return propertyName === "key" || propertyName === "ref" || propertyName.includes("-");
}

export function isTypeSubsetOf(source: Type, target: Type): boolean {
  if ((source.flags & TypeFlags.Union) !== 0) return typeConstituents(source).every(part => isTypeSubsetOf(part, target));
  if ((target.flags & TypeFlags.Union) !== 0) return typeConstituents(target).some(part => isTypeSubsetOf(source, part));
  return source === target || (source.flags & target.flags) !== 0;
}

export function isTypeSubsetOfUnion(source: Type, target: Type): boolean {
  return (target.flags & TypeFlags.Union) !== 0 && typeConstituents(target).some(part => isTypeSubsetOf(source, part));
}

export function unionOrIntersectionRelatedTo(relation: Relation, source: Type, target: Type): boolean {
  if ((source.flags & TypeFlags.Union) !== 0) return typeConstituents(source).every(part => isRelatedToWorker(relation, part, target));
  if ((target.flags & TypeFlags.Union) !== 0) return typeConstituents(target).some(part => isRelatedToWorker(relation, source, part));
  if ((source.flags & TypeFlags.Intersection) !== 0) return typeConstituents(source).some(part => isRelatedToWorker(relation, part, target));
  if ((target.flags & TypeFlags.Intersection) !== 0) return typeConstituents(target).every(part => isRelatedToWorker(relation, source, part));
  return false;
}

export function getUndefinedStrippedTargetIfNeeded(source: Type, target: Type): Type {
  return (source.flags & TypeFlags.Undefined) === 0 && (target.flags & TypeFlags.Union) !== 0
    ? unionType(typeConstituents(target).filter(part => (part.flags & TypeFlags.Undefined) === 0))
    : target;
}

export function resetMaybeStack(relation: Relation): void {
  relation.errors.length = 0;
}

export function getErrorState(relation: Relation): readonly string[] {
  return [...relation.errors];
}

export function restoreErrorState(relation: Relation, state: readonly string[]): void {
  relation.errors.length = 0;
  relation.errors.push(...state);
}

export function isSourceIntersectionNeedingExtraCheck(source: Type, target: Type): boolean {
  return (source.flags & TypeFlags.Intersection) !== 0 && (target.flags & TypeFlags.Union) !== 0;
}

export function structuredTypeRelatedToWorker(relation: Relation, source: Type, target: Type): boolean {
  if ((source.flags & TypeFlags.Object) === 0 || (target.flags & TypeFlags.Object) === 0) return false;
  for (const targetProperty of propertiesOfType(target)) {
    if (isIgnoredJsxProperty(targetProperty)) continue;
    const sourceType = getTypeOfPropertyInType(source, symbolName(targetProperty));
    const targetType = getTypeOfSymbol(targetProperty);
    if (targetType !== undefined && sourceType === undefined && shouldCheckAsExcessProperty(targetProperty)) return false;
    if (sourceType !== undefined && targetType !== undefined && !isRelatedToWorker(relation, sourceType, targetType)) return false;
  }
  return typeArgumentsRelatedTo(relation, typeArgumentsOf(source), typeArgumentsOf(target));
}

export function typeArgumentsRelatedTo(relation: Relation, source: readonly Type[], target: readonly Type[]): boolean {
  if (source.length !== target.length) return false;
  return source.every((type, index) => isRelatedToWorker(relation, type, target[index]!));
}

export function mappedTypeRelatedTo(relation: Relation, source: Type, target: Type): boolean {
  const sourceConstraint = (source.data as { readonly constraintType?: Type } | undefined)?.constraintType;
  const targetConstraint = (target.data as { readonly constraintType?: Type } | undefined)?.constraintType;
  return sourceConstraint === undefined || targetConstraint === undefined || isRelatedToWorker(relation, sourceConstraint, targetConstraint);
}

export function typeRelatedToDiscriminatedType(relation: Relation, source: Type, target: Type): boolean {
  const discriminants = propertiesOfType(target).filter(property => isLiteralType(getTypeOfSymbol(property)));
  return discriminants.every(property => {
    const sourcePropertyType = getTypeOfPropertyInType(source, symbolName(property));
    const targetPropertyType = getTypeOfSymbol(property);
    return sourcePropertyType !== undefined && targetPropertyType !== undefined && isRelatedToWorker(relation, sourcePropertyType, targetPropertyType);
  });
}

export function isPropertySymbolTypeRelated(relation: Relation, source: AstSymbol, target: AstSymbol): boolean {
  const sourceType = getTypeOfSymbol(source);
  const targetType = getTypeOfSymbol(target);
  return sourceType !== undefined && targetType !== undefined && isRelatedToWorker(relation, sourceType, targetType);
}

export function reportUnmatchedProperty(relation: Relation, property: AstSymbol): void {
  relation.errors.push(`Property ${symbolName(property)} is missing.`);
}

export function constructorVisibilitiesAreCompatible(source: AstSymbol, target: AstSymbol): boolean {
  return visibilityOf(source) === visibilityOf(target) || visibilityOf(target) === "public";
}

export function reportErrorResults(relation: Relation): readonly string[] {
  return [...relation.errors];
}

export function reportError(relation: Relation, node: AstNode | undefined, message: string): void {
  const prefix = node === undefined ? "" : `${node.kind}: `;
  relation.errors.push(`${prefix}${message}`);
}

export function addToDottedName(existing: string, part: string): string {
  return existing.length === 0 ? part : `${existing}.${part}`;
}

export function getChainMessage(chain: readonly string[]): string {
  return chain.join(" -> ");
}

export function chainArgsMatch(left: readonly unknown[], right: readonly unknown[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function getPropertyNameArg(symbol: AstSymbol): string {
  return symbolName(symbol);
}

export function isConversionOrInterfaceImplementationMessage(message: string): boolean {
  return message.includes("conversion") || message.includes("interface implementation");
}

export function chainDepth(chain: readonly unknown[]): number {
  return chain.length;
}

export function isDistributionDependent(type: Type): boolean {
  return (type.flags & TypeFlags.Conditional) !== 0
    && ((type.data as { readonly checkType?: Type } | undefined)?.checkType?.flags ?? 0) & TypeFlags.TypeParameter ? true : false;
}

export function traceUnionsOrIntersectionsTooLarge(source: Type, target: Type): string | undefined {
  const size = typeConstituents(source).length * typeConstituents(target).length;
  return size > 10_000 ? `Relation expansion is too large: ${size}.` : undefined;
}

function relationKey(source: Type, target: Type): string {
  return `${source.id}:${target.id}`;
}

function propertiesOfType(type: Type): readonly AstSymbol[] {
  return (type.data as { readonly declaredProperties?: readonly AstSymbol[] } | undefined)?.declaredProperties
    ?? [...(type.symbol as { readonly members?: Map<string, AstSymbol> } | undefined)?.members?.values() ?? []];
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? [];
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 0
    ? { flags: TypeFlags.Never, id: nextSyntheticTypeId(), data: { intrinsicName: "never", objectFlags: ObjectFlags.None } }
    : unique.length === 1
      ? unique[0]!
      : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique, objectFlags: ObjectFlags.None } };
}

function isLiteralType(type: Type | undefined): boolean {
  return type !== undefined && (type.flags & TypeFlags.Literal) !== 0;
}

function visibilityOf(symbol: AstSymbol): "public" | "protected" | "private" {
  if (symbolName(symbol).startsWith("#")) return "private";
  if (symbolName(symbol).startsWith("_")) return "protected";
  return "public";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function typeName(type: Type): string {
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

let syntheticTypeId = -1_850_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
