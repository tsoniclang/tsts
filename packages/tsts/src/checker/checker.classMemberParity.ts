/**
 * Class and interface member checking.
 *
 * This ports the checker.go class/member region as a dedicated TSTS module:
 * base accessibility, identical type parameters across merged declarations,
 * override compatibility, index-signature constraints, property
 * initialization, accessor pairing, and static/instance member separation.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, Signature, Type } from "./types.js";
import { SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface ClassMemberCheckHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly booleanType: Type;
  readonly strictPropertyInitialization: boolean;
  readonly useDefineForClassFields?: boolean;
  readonly getDeclaredTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getWriteTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getBaseTypes?: (type: Type) => readonly Type[];
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getSignaturesOfType?: (type: Type, kind: SignatureKind) => readonly Signature[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly isTypeIdenticalTo?: (source: Type, target: Type) => boolean;
  readonly isPropertyAssignedInConstructor?: (propertyName: string, constructor: AstNode, propertyType: Type) => boolean;
  readonly isPropertyAssignedInStaticBlock?: (propertyName: string, staticBlock: AstNode, propertyType: Type) => boolean;
  readonly report: (node: AstNode, message: string) => void;
}

export interface ClassLikeCheckResult {
  readonly node: AstNode;
  readonly baseTypes: readonly Type[];
  readonly diagnostics: readonly ClassMemberDiagnostic[];
}

export interface ClassMemberDiagnostic {
  readonly node: AstNode;
  readonly message: string;
  readonly symbol?: AstSymbol;
}

export interface OverrideComparison {
  readonly member: AstSymbol;
  readonly baseMember?: AstSymbol;
  readonly compatible: boolean;
  readonly requiresOverride: boolean;
  readonly incorrectlyOverrides: boolean;
  readonly missingOverride: boolean;
}

export interface IndexConstraintComparison {
  readonly property?: AstSymbol;
  readonly indexInfo: IndexInfo;
  readonly propertyType: Type;
  readonly indexType: Type;
  readonly assignable: boolean;
}

export interface PropertyInitializationResult {
  readonly property: AstNode;
  readonly initialized: boolean;
  readonly reason: "initializer" | "definite-assignment" | "constructor" | "static-block" | "optional" | "ambient" | "uninitialized";
}

export function checkClassLikeDeclarationMembers(node: AstNode, host: ClassMemberCheckHost): ClassLikeCheckResult {
  const diagnostics: ClassMemberDiagnostic[] = [];
  const scoped = withClassDiagnostics(host, diagnostics);
  const symbol = symbolOf(node);
  const type = symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol?.(symbol);
  const baseTypes = type === undefined ? [] : host.getBaseTypes?.(type) ?? [];
  if (type !== undefined) {
    checkTypeParameterListsIdentical(symbol, node, scoped);
    checkBaseTypeAccessibility(type, node, scoped);
    checkBaseTypeCycles(type, node, scoped);
    checkKindsOfPropertyMemberOverrides(type, scoped);
    checkMembersForOverrideModifier(node, type, scoped);
    checkIndexConstraints(type, symbol, false, scoped);
    checkClassOrInterfaceForDuplicateIndexSignatures(node, type, scoped);
    checkPropertyInitialization(node, type, scoped);
    checkAccessorPairs(node, scoped);
    checkStaticInstanceNameConflicts(node, scoped);
  }
  return { node, baseTypes, diagnostics };
}

export function checkInterfaceDeclarationMembers(node: AstNode, host: ClassMemberCheckHost): ClassLikeCheckResult {
  const diagnostics: ClassMemberDiagnostic[] = [];
  const scoped = withClassDiagnostics(host, diagnostics);
  const symbol = symbolOf(node);
  const type = symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol?.(symbol);
  const baseTypes = type === undefined ? [] : host.getBaseTypes?.(type) ?? [];
  if (type !== undefined) {
    checkTypeParameterListsIdentical(symbol, node, scoped);
    checkBaseTypeAccessibility(type, node, scoped);
    checkInheritedPropertiesAreIdentical(type, node, scoped);
    checkIndexConstraints(type, symbol, false, scoped);
    checkClassOrInterfaceForDuplicateIndexSignatures(node, type, scoped);
  }
  return { node, baseTypes, diagnostics };
}

export function checkTypeParameterListsIdentical(symbol: AstSymbol | undefined, node: AstNode, host: ClassMemberCheckHost): boolean {
  if (symbol === undefined) return true;
  const declarations = symbol.declarations ?? [];
  if (declarations.length <= 1) return true;
  const first = typeParameterNames(declarations[0]!);
  for (const declaration of declarations.slice(1)) {
    const next = typeParameterNames(declaration);
    if (!sameStringArray(first, next)) {
      host.report(declaration, "All declarations of a class or interface must have identical type parameters.");
      host.report(node, "This declaration participates in the incompatible merged declaration.");
      return false;
    }
  }
  return true;
}

export function checkBaseTypeAccessibility(type: Type, node: AstNode, host: ClassMemberCheckHost): void {
  for (const baseType of host.getBaseTypes?.(type) ?? []) {
    const baseSymbol = symbolOfType(baseType);
    if (baseSymbol === undefined) continue;
    if (!isSymbolAccessibleFromNode(baseSymbol, node)) {
      host.report(node, `Base type '${symbolName(baseSymbol)}' is not accessible from this declaration.`);
    }
    if ((baseType.flags & TypeFlags.AnyOrUnknown) !== 0) host.report(node, "Base type resolved to any or unknown.");
  }
}

export function checkBaseTypeCycles(type: Type, node: AstNode, host: ClassMemberCheckHost): void {
  const seen = new Set<Type>();
  const visiting = new Set<Type>();
  const visit = (current: Type): boolean => {
    if (visiting.has(current)) return true;
    if (seen.has(current)) return false;
    visiting.add(current);
    for (const base of host.getBaseTypes?.(current) ?? []) if (visit(base)) return true;
    visiting.delete(current);
    seen.add(current);
    return false;
  };
  if (visit(type)) host.report(node, "Type recursively references itself as a base type.");
}

export function checkKindsOfPropertyMemberOverrides(type: Type, host: ClassMemberCheckHost): readonly OverrideComparison[] {
  const comparisons: OverrideComparison[] = [];
  for (const baseType of host.getBaseTypes?.(type) ?? []) {
    for (const baseProperty of host.getPropertiesOfType?.(baseType) ?? []) {
      const ownProperty = host.getPropertyOfType?.(type, symbolName(baseProperty));
      if (ownProperty === undefined) continue;
      const comparison = comparePropertyOverride(ownProperty, baseProperty, host);
      comparisons.push(comparison);
      if (!comparison.compatible) reportOverrideKindError(ownProperty, baseProperty, host);
    }
  }
  return comparisons;
}

export function comparePropertyOverride(member: AstSymbol, baseMember: AstSymbol, host: ClassMemberCheckHost): OverrideComparison {
  const memberType = host.getTypeOfSymbol?.(member) ?? getTypeOfSymbol(member);
  const baseType = host.getTypeOfSymbol?.(baseMember) ?? getTypeOfSymbol(baseMember);
  const compatibleType = memberType === undefined || baseType === undefined || host.isTypeAssignableTo?.(memberType, baseType) !== false;
  const compatibleKind = memberKind(member) === memberKind(baseMember) || propertyCanOverrideAccessor(member, baseMember);
  const requiresOverride = requiresOverrideModifier(baseMember);
  const hasOverride = hasModifier(member.declarations?.[0], "override");
  const incorrectlyOverrides = hasOverride && baseMember === undefined;
  const missingOverride = requiresOverride && !hasOverride;
  return { member, baseMember, compatible: compatibleType && compatibleKind, requiresOverride, incorrectlyOverrides, missingOverride };
}

export function checkMembersForOverrideModifier(node: AstNode, type: Type, host: ClassMemberCheckHost): readonly OverrideComparison[] {
  const comparisons: OverrideComparison[] = [];
  const baseTypes = host.getBaseTypes?.(type) ?? [];
  const ownProperties = host.getPropertiesOfType?.(type) ?? [];
  for (const member of ownProperties) {
    const declaration = member.declarations?.[0];
    if (declaration === undefined || !isClassElement(declaration)) continue;
    const baseMember = findBaseProperty(baseTypes, symbolName(member), host);
    const hasOverride = hasModifier(declaration, "override");
    if (baseMember === undefined && hasOverride) {
      host.report(declaration, "This member cannot have an 'override' modifier because it is not declared in the base class.");
      comparisons.push({ member, compatible: false, requiresOverride: false, incorrectlyOverrides: true, missingOverride: false });
      continue;
    }
    if (baseMember === undefined) continue;
    const comparison = comparePropertyOverride(member, baseMember, host);
    comparisons.push(comparison);
    if (comparison.missingOverride) host.report(declaration, "This member must have an 'override' modifier because it overrides a member in the base class.");
    if (!comparison.compatible) reportOverrideKindError(member, baseMember, host);
  }
  void node;
  return comparisons;
}

export function checkIndexConstraints(type: Type, symbol: AstSymbol | undefined, isStaticIndex: boolean, host: ClassMemberCheckHost): readonly IndexConstraintComparison[] {
  const comparisons: IndexConstraintComparison[] = [];
  const indexInfos = host.getIndexInfosOfType?.(type) ?? [];
  const properties = host.getPropertiesOfType?.(type) ?? [];
  for (const property of properties) {
    const propertyType = host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
    if (propertyType === undefined) continue;
    for (const info of indexInfos) {
      const comparison = checkIndexConstraintForProperty(type, property, propertyNameType(property, host), propertyType, info, host);
      comparisons.push(comparison);
      if (!comparison.assignable) reportIndexConstraintError(property, info, host, isStaticIndex);
    }
  }
  for (const info of indexInfos) {
    const comparison = checkIndexConstraintForIndexSignature(type, info, host);
    if (comparison !== undefined) {
      comparisons.push(comparison);
      if (!comparison.assignable && info.declaration !== undefined) host.report(info.declaration, "Index signatures are incompatible.");
    }
  }
  void symbol;
  return comparisons;
}

export function checkIndexConstraintForProperty(
  type: Type,
  property: AstSymbol,
  propertyNameType: Type,
  propertyType: Type,
  indexInfo: IndexInfo,
  host: ClassMemberCheckHost,
): IndexConstraintComparison {
  const indexApplies = isApplicableIndexType(propertyNameType, indexInfo.keyType);
  const assignable = !indexApplies || host.isTypeAssignableTo?.(propertyType, indexInfo.valueType) !== false;
  void type;
  return { property, indexInfo, propertyType, indexType: indexInfo.valueType, assignable };
}

export function checkIndexConstraintForIndexSignature(type: Type, checkInfo: IndexInfo, host: ClassMemberCheckHost): IndexConstraintComparison | undefined {
  for (const info of host.getIndexInfosOfType?.(type) ?? []) {
    if (info === checkInfo) continue;
    if (!isApplicableIndexType(info.keyType, checkInfo.keyType)) continue;
    const assignable = host.isTypeAssignableTo?.(info.valueType, checkInfo.valueType) !== false;
    return { indexInfo: checkInfo, propertyType: info.valueType, indexType: checkInfo.valueType, assignable };
  }
  return undefined;
}

export function checkClassOrInterfaceForDuplicateIndexSignatures(node: AstNode, type: Type, host: ClassMemberCheckHost): void {
  const seen = new Set<string>();
  for (const info of host.getIndexInfosOfType?.(type) ?? []) {
    const key = indexInfoKey(info);
    if (seen.has(key)) host.report(info.declaration ?? node, `Duplicate index signature for '${key}'.`);
    seen.add(key);
  }
}

export function checkPropertyInitialization(classDeclaration: AstNode, classType: Type, host: ClassMemberCheckHost): readonly PropertyInitializationResult[] {
  const results: PropertyInitializationResult[] = [];
  if (!host.strictPropertyInitialization || isAmbientDeclaration(classDeclaration)) return results;
  const constructor = classMembers(classDeclaration).find(member => member.kind === Kind.Constructor);
  const staticBlocks = classMembers(classDeclaration).filter(member => member.kind === Kind.ClassStaticBlockDeclaration);
  for (const property of classMembers(classDeclaration)) {
    if (property.kind !== Kind.PropertyDeclaration && property.kind !== Kind.PropertySignature) continue;
    const result = getPropertyInitializationState(property, classType, constructor, staticBlocks, host);
    results.push(result);
    if (!result.initialized) host.report(property, "Property has no initializer and is not definitely assigned in the constructor.");
  }
  return results;
}

export function getPropertyInitializationState(
  property: AstNode,
  classType: Type,
  constructor: AstNode | undefined,
  staticBlocks: readonly AstNode[],
  host: ClassMemberCheckHost,
): PropertyInitializationResult {
  if (isAmbientDeclaration(property)) return { property, initialized: true, reason: "ambient" };
  if (hasInitializer(property)) return { property, initialized: true, reason: "initializer" };
  if (hasDefiniteAssignmentAssertion(property)) return { property, initialized: true, reason: "definite-assignment" };
  if (isOptionalPropertyNode(property)) return { property, initialized: true, reason: "optional" };
  const symbol = symbolOf(property);
  const propertyName = declarationName(property);
  const propertyType = symbol === undefined ? host.unknownType : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol) ?? host.unknownType;
  if ((propertyType.flags & (TypeFlags.AnyOrUnknown | TypeFlags.VoidLike)) !== 0) return { property, initialized: true, reason: "optional" };
  if (constructor !== undefined && (host.isPropertyAssignedInConstructor?.(propertyName, constructor, propertyType) ?? constructorAssignsProperty(constructor, propertyName))) {
    return { property, initialized: true, reason: "constructor" };
  }
  if (isStaticMember(property) && staticBlocks.some(block => host.isPropertyAssignedInStaticBlock?.(propertyName, block, propertyType) ?? blockAssignsProperty(block, propertyName))) {
    return { property, initialized: true, reason: "static-block" };
  }
  void classType;
  return { property, initialized: false, reason: "uninitialized" };
}

export function checkInheritedPropertiesAreIdentical(type: Type, node: AstNode, host: ClassMemberCheckHost): boolean {
  const baseTypes = host.getBaseTypes?.(type) ?? [];
  const seen = new Map<string, AstSymbol>();
  let ok = true;
  for (const base of baseTypes) {
    for (const property of host.getPropertiesOfType?.(base) ?? []) {
      const name = symbolName(property);
      const previous = seen.get(name);
      if (previous !== undefined && !isPropertyIdenticalTo(previous, property, host)) {
        host.report(node, `Named property '${name}' of types in the interface inheritance chain is not identical.`);
        ok = false;
      }
      seen.set(name, property);
    }
  }
  return ok;
}

export function isPropertyIdenticalTo(sourceProp: AstSymbol, targetProp: AstSymbol, host: ClassMemberCheckHost): boolean {
  const sourceType = host.getTypeOfSymbol?.(sourceProp) ?? getTypeOfSymbol(sourceProp);
  const targetType = host.getTypeOfSymbol?.(targetProp) ?? getTypeOfSymbol(targetProp);
  if (sourceType === undefined || targetType === undefined) return sourceType === targetType;
  if (host.isTypeIdenticalTo?.(sourceType, targetType) === false) return false;
  if (isOptionalProperty(sourceProp) !== isOptionalProperty(targetProp)) return false;
  if (isReadonlyProperty(sourceProp) !== isReadonlyProperty(targetProp)) return false;
  return memberKind(sourceProp) === memberKind(targetProp);
}

export function checkAccessorPairs(node: AstNode, host: ClassMemberCheckHost): void {
  const getters = new Map<string, AstNode>();
  const setters = new Map<string, AstNode>();
  for (const member of classMembers(node)) {
    if (member.kind === Kind.GetAccessor) getters.set(declarationName(member), member);
    if (member.kind === Kind.SetAccessor) setters.set(declarationName(member), member);
  }
  for (const [name, getter] of getters) {
    const setter = setters.get(name);
    if (setter === undefined) continue;
    const getType = annotatedType(getter) ?? symbolType(symbolOf(getter), host);
    const setType = setterValueParameterType(setter, host);
    if (getType !== undefined && setType !== undefined && host.isTypeAssignableTo?.(getType, setType) === false) {
      host.report(setter, `Setter parameter type must be assignable from getter return type for '${name}'.`);
    }
  }
}

export function checkStaticInstanceNameConflicts(node: AstNode, host: ClassMemberCheckHost): void {
  const staticNames = new Map<string, AstNode>();
  const instanceNames = new Map<string, AstNode>();
  for (const member of classMembers(node)) {
    const name = declarationName(member);
    if (name.length === 0) continue;
    if (isStaticMember(member)) staticNames.set(name, member);
    else instanceNames.set(name, member);
  }
  for (const [name, staticMember] of staticNames) {
    const instance = instanceNames.get(name);
    if (instance !== undefined && name === "prototype") {
      host.report(staticMember, "Static property 'prototype' conflicts with the class prototype.");
      host.report(instance, "Instance member participates in the prototype conflict.");
    }
  }
}

export function isValidOverrideOf(sourceProp: AstSymbol, targetProp: AstSymbol, host: ClassMemberCheckHost): boolean {
  return comparePropertyOverride(sourceProp, targetProp, host).compatible;
}

export function isPropertyInClassDerivedFrom(prop: AstSymbol, baseClass: Type, host: ClassMemberCheckHost): boolean {
  const declaring = declaringClassType(prop, host);
  if (declaring === undefined) return false;
  return hasBaseType(declaring, baseClass, host);
}

export function isClassDerivedFromDeclaringClasses(checkClass: Type, prop: AstSymbol, writing: boolean, host: ClassMemberCheckHost): boolean {
  const declaring = declaringClassType(prop, host);
  if (declaring === undefined) return false;
  if (!writing && propIsProtected(prop)) return hasBaseType(checkClass, declaring, host);
  return checkClass === declaring || hasBaseType(checkClass, declaring, host);
}

export function typeHasProtectedAccessibleBase(target: AstSymbol, type: Type, host: ClassMemberCheckHost): boolean {
  return (host.getBaseTypes?.(type) ?? []).some(base => {
    const property = host.getPropertyOfType?.(base, symbolName(target));
    return property === target || (property !== undefined && typeHasProtectedAccessibleBase(target, base, host));
  });
}

export function arePropertiesAbstractOrInterface(base: AstSymbol): boolean {
  return (base.declarations ?? []).every(declaration => isAbstractMember(declaration) || declaration.kind === Kind.PropertySignature || declaration.kind === Kind.MethodSignature);
}

export function isPropertyAbstractOrInterface(declaration: AstNode): boolean {
  return isAbstractMember(declaration) || declaration.kind === Kind.PropertySignature || declaration.kind === Kind.MethodSignature;
}

function findBaseProperty(baseTypes: readonly Type[], name: string, host: ClassMemberCheckHost): AstSymbol | undefined {
  for (const baseType of baseTypes) {
    const property = host.getPropertyOfType?.(baseType, name);
    if (property !== undefined) return property;
    const nested = findBaseProperty(host.getBaseTypes?.(baseType) ?? [], name, host);
    if (nested !== undefined) return nested;
  }
  return undefined;
}

function hasBaseType(type: Type, baseType: Type, host: ClassMemberCheckHost): boolean {
  for (const base of host.getBaseTypes?.(type) ?? []) {
    if (base === baseType || hasBaseType(base, baseType, host)) return true;
  }
  return false;
}

function reportOverrideKindError(member: AstSymbol, baseMember: AstSymbol, host: ClassMemberCheckHost): void {
  const declaration = member.declarations?.[0] ?? baseMember.declarations?.[0];
  if (declaration !== undefined) host.report(declaration, `Class member '${symbolName(member)}' incorrectly extends base member '${symbolName(baseMember)}'.`);
}

function reportIndexConstraintError(property: AstSymbol, info: IndexInfo, host: ClassMemberCheckHost, isStaticIndex: boolean): void {
  const declaration = property.declarations?.[0] ?? info.declaration;
  if (declaration === undefined) return;
  host.report(declaration, `Property '${symbolName(property)}' is not assignable to the ${isStaticIndex ? "static " : ""}index signature type.`);
}

function withClassDiagnostics(host: ClassMemberCheckHost, diagnostics: ClassMemberDiagnostic[]): ClassMemberCheckHost {
  return {
    ...host,
    report: (node, message) => {
      const symbol = symbolOf(node);
      diagnostics.push(symbol === undefined ? { node, message } : { node, message, symbol });
      host.report(node, message);
    },
  };
}

function propertyCanOverrideAccessor(member: AstSymbol, baseMember: AstSymbol): boolean {
  const memberKindValue = memberKind(member);
  const baseKindValue = memberKind(baseMember);
  return memberKindValue === "property" && (baseKindValue === "getter" || baseKindValue === "setter");
}

function memberKind(symbol: AstSymbol): "property" | "method" | "getter" | "setter" | "constructor" | "unknown" {
  const declaration = symbol.declarations?.[0];
  switch (declaration?.kind) {
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
      return "method";
    case Kind.GetAccessor:
      return "getter";
    case Kind.SetAccessor:
      return "setter";
    case Kind.Constructor:
      return "constructor";
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return "property";
    default:
      return "unknown";
  }
}

function requiresOverrideModifier(symbol: AstSymbol): boolean {
  return !arePropertiesAbstractOrInterface(symbol) && !isPrivateMemberSymbol(symbol);
}

function isPrivateMemberSymbol(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "private") || declarationName(declaration).startsWith("#"));
}

function propIsProtected(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "protected"));
}

function isReadonlyProperty(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly)
    || (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "readonly"));
}

function isOptionalProperty(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0
    || (symbol.declarations ?? []).some(isOptionalPropertyNode);
}

function isOptionalPropertyNode(node: AstNode): boolean {
  return Boolean((node as { readonly questionToken?: unknown }).questionToken)
    || Boolean((node as { readonly optional?: boolean }).optional);
}

function isAbstractMember(node: AstNode): boolean {
  return hasModifier(node, "abstract");
}

function isClassElement(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.Constructor
    || node.kind === Kind.ClassStaticBlockDeclaration;
}

function isStaticMember(node: AstNode): boolean {
  return hasModifier(node, "static") || Boolean((node as { readonly static?: boolean }).static);
}

function isAmbientDeclaration(node: AstNode): boolean {
  return hasModifier(node, "declare") || Boolean((node as { readonly ambient?: boolean }).ambient);
}

function hasInitializer(node: AstNode): boolean {
  return (node as { readonly initializer?: unknown }).initializer !== undefined;
}

function hasDefiniteAssignmentAssertion(node: AstNode): boolean {
  return Boolean((node as { readonly exclamationToken?: unknown }).exclamationToken);
}

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  if (node === undefined) return false;
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] }).modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function classMembers(node: AstNode): readonly AstNode[] {
  return (node as { readonly members?: readonly AstNode[] }).members ?? [];
}

function typeParameterNames(node: AstNode): readonly string[] {
  return ((node as { readonly typeParameters?: readonly AstNode[] }).typeParameters ?? []).map(declarationName);
}

function sameStringArray(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function declarationName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return nodeText(name);
  return nodeText(node);
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function symbolOf(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function symbolOfType(type: Type): AstSymbol | undefined {
  return (type as { readonly symbol?: AstSymbol }).symbol ?? (type.data as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function symbolType(symbol: AstSymbol | undefined, host: ClassMemberCheckHost): Type | undefined {
  return symbol === undefined ? undefined : host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol);
}

function annotatedType(node: AstNode): Type | undefined {
  return (node as { readonly type?: Type }).type;
}

function setterValueParameterType(setter: AstNode, host: ClassMemberCheckHost): Type | undefined {
  const parameter = ((setter as { readonly parameters?: readonly AstNode[] }).parameters ?? [])[0];
  return symbolType(symbolOf(parameter), host) ?? annotatedType(parameter ?? setter);
}

function constructorAssignsProperty(constructor: AstNode, propertyName: string): boolean {
  return nodeTree(constructor).some(node => isThisPropertyAssignment(node, propertyName));
}

function blockAssignsProperty(block: AstNode, propertyName: string): boolean {
  return nodeTree(block).some(node => isStaticPropertyAssignment(node, propertyName));
}

function isThisPropertyAssignment(node: AstNode, propertyName: string): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const left = (node as { readonly left?: AstNode }).left;
  return propertyAccessName(left) === propertyName && nodeText((left as { readonly expression?: AstNode } | undefined)?.expression) === "this";
}

function isStaticPropertyAssignment(node: AstNode, propertyName: string): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  return propertyAccessName((node as { readonly left?: AstNode }).left) === propertyName;
}

function propertyAccessName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  if (node.kind === Kind.PropertyAccessExpression) return declarationName((node as { readonly name?: AstNode }).name);
  if (node.kind === Kind.ElementAccessExpression) return nodeText((node as { readonly argumentExpression?: AstNode }).argumentExpression);
  return "";
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
  for (const key of ["statements", "members", "parameters", "declarations", "elements"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(value)) children.push(...value.filter(isNode));
  }
  for (const key of ["body", "expression", "left", "right", "initializer", "name"] as const) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) children.push(value);
  }
  return children;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

function propertyNameType(property: AstSymbol, host: ClassMemberCheckHost): Type {
  const name = symbolName(property);
  return isNumericName(name) ? host.anyType : host.unknownType;
}

function isApplicableIndexType(source: Type, target: Type): boolean {
  if ((target.flags & TypeFlags.StringLike) !== 0) return (source.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.AnyOrUnknown)) !== 0;
  if ((target.flags & TypeFlags.NumberLike) !== 0) return (source.flags & (TypeFlags.NumberLike | TypeFlags.AnyOrUnknown)) !== 0;
  if ((target.flags & TypeFlags.ESSymbolLike) !== 0) return (source.flags & (TypeFlags.ESSymbolLike | TypeFlags.AnyOrUnknown)) !== 0;
  return (source.flags & target.flags) !== 0 || (source.flags & TypeFlags.AnyOrUnknown) !== 0;
}

function indexInfoKey(info: IndexInfo): string {
  const flags = info.keyType.flags;
  if ((flags & TypeFlags.StringLike) !== 0) return "string";
  if ((flags & TypeFlags.NumberLike) !== 0) return "number";
  if ((flags & TypeFlags.ESSymbolLike) !== 0) return "symbol";
  return String(flags);
}

function isNumericName(name: string): boolean {
  return name !== "" && String(Number(name)) === name;
}

function isSymbolAccessibleFromNode(symbol: AstSymbol, node: AstNode): boolean {
  if (isPrivateMemberSymbol(symbol)) return sameDeclaringClass(symbol.declarations?.[0], node);
  return true;
}

function sameDeclaringClass(left: AstNode | undefined, right: AstNode | undefined): boolean {
  return nearestClass(left) === nearestClass(right);
}

function nearestClass(node: AstNode | undefined): AstNode | undefined {
  let current = node?.parent;
  while (current !== undefined) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) return current;
    current = current.parent;
  }
  return undefined;
}

function declaringClassType(prop: AstSymbol, host: ClassMemberCheckHost): Type | undefined {
  const declaration = prop.declarations?.[0];
  const container = nearestClass(declaration);
  const symbol = symbolOf(container);
  return symbol === undefined ? undefined : host.getDeclaredTypeOfSymbol?.(symbol);
}
