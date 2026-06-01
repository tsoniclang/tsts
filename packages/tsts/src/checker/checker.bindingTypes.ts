/**
 * Checker binding/object-type helpers.
 *
 * Port-focused slice from TS-Go `checker.go` covering binding-pattern type
 * extraction, assignment-declaration widening, cached flag helpers, and
 * structured object member lookup.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { getCombinedNodeFlags, hasSyntacticModifier, Kind, NodeFlags, SymbolFlags } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import type { IndexInfo, ObjectType, Signature, Type, UnionOrIntersectionType } from "./types.js";
import { AccessFlags, ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface TypeResolutionFrame {
  readonly target: object;
  readonly propertyName: string;
}

const typeResolutionStack: TypeResolutionFrame[] = [];
const combinedNodeFlagsCache = new WeakMap<AstNode, number>();
const combinedModifierFlagsCache = new WeakMap<AstNode, number>();

export function isNullOrUndefined(type: Type | undefined): boolean {
  return type === undefined || (type.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) !== 0;
}

export function getTypeForBindingElement(node: AstNode): Type {
  const parent = parentOf(node);
  if (parent === undefined) return typeOfNode(node);
  return getBindingElementTypeFromParentType(node, getTypeForBindingElementParent(parent));
}

export function getTypeForBindingElementParent(parent: AstNode): Type {
  if (parent.kind === Kind.ObjectBindingPattern || parent.kind === Kind.ArrayBindingPattern) {
    const owner = parentOf(parent);
    return owner === undefined ? unknownType() : typeOfNode(initializerOf(owner) ?? owner);
  }
  return typeOfNode(parent);
}

export function getBindingElementTypeFromParentType(node: AstNode, parentType: Type): Type {
  const propertyName = getBindingElementPropertyName(node);
  if (propertyName !== undefined) {
    return getPropertyType(parentType, propertyName) ?? unknownType();
  }
  const index = bindingElementIndex(node);
  if (index !== undefined) {
    return getTupleElementType(parentType, index) ?? getArrayElementType(parentType) ?? unknownType();
  }
  return unknownType();
}

export function getRestType(parentType: Type, elements: readonly AstNode[], startIndex: number): Type {
  if ((parentType.flags & TypeFlags.Object) === 0) return parentType;
  const tupleElements = typeArgumentsOf(parentType);
  if (tupleElements.length > 0) {
    return arrayType(tupleElements.slice(startIndex));
  }
  const omitted = new Set(elements.slice(0, startIndex).map(getBindingElementPropertyName).filter(isString));
  const properties = getPropertiesOfObjectType(parentType).filter((symbol) => !omitted.has(symbolName(symbol)));
  return objectTypeWithProperties(properties);
}

export function getFlowTypeOfDestructuring(node: AstNode, declaredType: Type): Type {
  return getBindingElementTypeFromParentType(node, declaredType);
}

export function getSyntheticElementAccess(parent: AstNode, propertyName: string | number): AstNode {
  return {
    kind: Kind.ElementAccessExpression,
    expression: parent,
    argumentExpression: typeof propertyName === "number"
      ? { kind: Kind.NumericLiteral, text: String(propertyName) }
      : { kind: Kind.StringLiteral, text: propertyName },
    parent,
  } as unknown as AstNode;
}

export function getParentElementAccess(node: AstNode): AstNode | undefined {
  const parent = parentOf(node);
  if (parent?.kind === Kind.ElementAccessExpression && expressionOf(parent) === node) return parent;
  return undefined;
}

export function getTypeFromBindingPattern(pattern: AstNode): Type {
  if (pattern.kind === Kind.ObjectBindingPattern) return getTypeFromObjectBindingPattern(pattern);
  if (pattern.kind === Kind.ArrayBindingPattern) return getTypeFromArrayBindingPattern(pattern);
  return typeOfNode(pattern);
}

export function getTypeFromObjectBindingPattern(pattern: AstNode): Type {
  const properties: AstSymbol[] = [];
  for (const element of nodeArray((pattern as { readonly elements?: unknown }).elements)) {
    const name = getBindingElementPropertyName(element) ?? declarationNameText(element);
    if (name.length === 0) continue;
    properties.push(makeSyntheticProperty(name, getTypeFromBindingElement(element)));
  }
  return objectTypeWithProperties(properties);
}

export function getTypeFromArrayBindingPattern(pattern: AstNode): Type {
  const elementTypes = nodeArray((pattern as { readonly elements?: unknown }).elements)
    .map((element) => getTypeFromBindingElement(element));
  return arrayType(elementTypes);
}

export function getTypeFromBindingElement(node: AstNode): Type {
  const initializer = initializerOf(node);
  if (initializer !== undefined) return typeOfNode(initializer);
  const name = (node as { readonly name?: AstNode }).name;
  if (name !== undefined && (name.kind === Kind.ObjectBindingPattern || name.kind === Kind.ArrayBindingPattern)) {
    return getTypeFromBindingPattern(name);
  }
  return typeOfNode(node);
}

export function getTypeOfPrototypeProperty(symbol: AstSymbol): Type | undefined {
  return getPropertyType(getTypeOfSymbol(symbol), "prototype");
}

export function getWidenedTypeForAssignmentDeclaration(node: AstNode): Type {
  return widenTypeForVariableLikeDeclaration(node, getAssignmentDeclarationInitializerType(node));
}

export function getAssignmentDeclarationInitializerType(node: AstNode): Type {
  if (node.kind === Kind.BinaryExpression) return typeOfNode((node as { readonly right?: AstNode }).right);
  return typeOfNode(initializerOf(node));
}

export function hasParentWithTypeAnnotation(node: AstNode): boolean {
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if ((current as { readonly type?: AstNode }).type !== undefined) return true;
  }
  return false;
}

export function containsSameNamedThisProperty(node: AstNode, propertyName: string): boolean {
  for (const child of childrenOf(node)) {
    if (child.kind === Kind.PropertyAccessExpression
      && expressionOf(child)?.kind === Kind.ThisKeyword
      && declarationNameText(child) === propertyName) {
      return true;
    }
    if (containsSameNamedThisProperty(child, propertyName)) return true;
  }
  return false;
}

export function getTypeFromPropertyDescriptor(descriptor: AstNode): Type | undefined {
  for (const property of nodeArray((descriptor as { readonly properties?: unknown }).properties)) {
    const name = declarationNameText(property);
    if (name === "value") return typeOfNode(initializerOf(property));
    if (name === "get") return returnTypeOfFunctionLike(initializerOf(property) ?? property);
  }
  return undefined;
}

export function isConstructorDeclaredThisProperty(node: AstNode): boolean {
  return node.kind === Kind.PropertyAccessExpression
    && expressionOf(node)?.kind === Kind.ThisKeyword
    && findAncestor(node, (ancestor) => ancestor.kind === Kind.Constructor) !== undefined;
}

export function isGlobalSymbolConstructor(symbol: AstSymbol | undefined): boolean {
  return symbolName(symbol) === "Symbol" && ((symbol?.flags ?? 0) & SymbolFlags.Value) !== 0;
}

export function widenTypeForVariableLikeDeclaration(node: AstNode, type: Type): Type {
  if (isVarConstLike(node)) return type;
  return getWidenedTypeWithContext(type, node);
}

export function reportImplicitAny(node: AstNode, name: string): { readonly node: AstNode; readonly message: string } {
  return { node, message: `Member '${name}' implicitly has an 'any' type.` };
}

export function getWidenedTypeWithContext(type: Type, context: AstNode | undefined): Type {
  if (context !== undefined && hasParentWithTypeAnnotation(context)) return type;
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return intrinsicType(TypeFlags.String, "string");
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return intrinsicType(TypeFlags.Number, "number");
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return intrinsicType(TypeFlags.BigInt, "bigint");
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return intrinsicType(TypeFlags.Boolean, "boolean");
  if ((type.flags & TypeFlags.Union) !== 0) {
    return unionType(typeConstituents(type).map((part) => getWidenedTypeWithContext(part, context)));
  }
  if ((type.flags & TypeFlags.Object) !== 0) return getWidenedTypeOfObjectLiteral(type);
  return type;
}

export function getWidenedTypeOfObjectLiteral(type: Type): Type {
  const data = type.data as ObjectType | undefined;
  if (data?.declaredProperties === undefined) return type;
  return {
    ...type,
    id: nextSyntheticTypeId(),
    data: {
      ...data,
      declaredProperties: data.declaredProperties.map(getWidenedProperty),
    },
  };
}

export function getWidenedProperty(symbol: AstSymbol): AstSymbol {
  const type = getTypeOfSymbol(symbol);
  if (type === undefined) return symbol;
  return {
    ...symbol,
    syntheticType: getWidenedTypeWithContext(type, symbol.valueDeclaration ?? symbol.declarations[0]),
  } as AstSymbol;
}

export function getChildContext(context: AstNode | undefined, key: string): AstNode | undefined {
  if (context === undefined) return undefined;
  return childrenOf(context).find((child) => declarationNameText(child) === key || nodeText(child) === key);
}

export function getPropertiesOfContext(context: AstNode | undefined): readonly string[] {
  if (context === undefined) return [];
  return childrenOf(context).map(declarationNameText).filter(isString);
}

export function getSiblingsOfContext(context: AstNode | undefined): readonly AstNode[] {
  const parent = parentOf(context);
  if (parent === undefined) return [];
  return childrenOf(parent).filter((child) => child !== context);
}

export function getUndefinedProperty(name = "undefined"): AstSymbol {
  return makeSyntheticProperty(name, intrinsicType(TypeFlags.Undefined, "undefined"));
}

export function getTypeOfEnumMember(symbol: AstSymbol): Type {
  const value = enumMemberValue(symbol);
  if (typeof value === "string") return literalType(TypeFlags.StringLiteral, value);
  if (typeof value === "number") return literalType(TypeFlags.NumberLiteral, value);
  return getTypeOfSymbol(symbol) ?? intrinsicType(TypeFlags.Number, "number");
}

export function getTypeOfAccessors(symbol: AstSymbol): Type | undefined {
  const getter = symbol.declarations.find((declaration) => declaration.kind === Kind.GetAccessor);
  return getter === undefined ? getWriteTypeOfAccessors(symbol) : returnTypeOfFunctionLike(getter);
}

export function getWriteTypeOfAccessors(symbol: AstSymbol): Type | undefined {
  const setter = symbol.declarations.find((declaration) => declaration.kind === Kind.SetAccessor);
  const parameter = nodeArray((setter as { readonly parameters?: unknown } | undefined)?.parameters)[0];
  return parameter === undefined ? undefined : typeOfNode((parameter as { readonly type?: AstNode }).type ?? parameter);
}

export function addOptionalityEx(type: Type, isProperty: boolean, isOptional: boolean): Type {
  return isOptional ? getOptionalType(type, isProperty) : type;
}

export function getOptionalType(type: Type, isProperty = false): Type {
  const undefinedType = intrinsicType(TypeFlags.Undefined, "undefined");
  return unionType(isProperty ? [type, undefinedType] : [type, undefinedType]);
}

export function getNullableType(type: Type): Type {
  return unionType([type, intrinsicType(TypeFlags.Null, "null"), intrinsicType(TypeFlags.Undefined, "undefined")]);
}

export function getNonNullableTypeIfNeeded(type: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return isNullOrUndefined(type) ? intrinsicType(TypeFlags.Never, "never") : type;
  return unionType(typeConstituents(type).filter((part) => !isNullOrUndefined(part)));
}

export function getCombinedNodeFlagsCached(node: AstNode): number {
  const cached = combinedNodeFlagsCache.get(node);
  if (cached !== undefined) return cached;
  const flags = getCombinedNodeFlags(node);
  combinedNodeFlagsCache.set(node, flags);
  return flags;
}

export function isVarConstLike(node: AstNode): boolean {
  return (getCombinedNodeFlagsCached(node) & NodeFlags.Constant) !== 0
    || hasSyntacticModifier(node, ModifierFlags.Readonly);
}

export function getEffectivePropertyNameForPropertyNameNode(name: AstNode | undefined): string | undefined {
  if (name === undefined) return undefined;
  if (name.kind === Kind.ComputedPropertyName) {
    const expression = (name as { readonly expression?: AstNode }).expression;
    return nodeText(expression);
  }
  return nodeText(name);
}

export function getCombinedModifierFlagsCached(node: AstNode): number {
  const cached = combinedModifierFlagsCache.get(node);
  if (cached !== undefined) return cached;
  const flags = (node as { readonly modifierFlags?: number }).modifierFlags ?? 0;
  combinedModifierFlagsCache.set(node, flags);
  return flags;
}

export function pushTypeResolution(target: object, propertyName: string): boolean {
  const cycleStart = findResolutionCycleStartIndex(target, propertyName);
  typeResolutionStack.push({ target, propertyName });
  return cycleStart < 0;
}

export function popTypeResolution(): void {
  typeResolutionStack.pop();
}

export function findResolutionCycleStartIndex(target: object, propertyName: string): number {
  for (let index = typeResolutionStack.length - 1; index >= 0; index -= 1) {
    const frame = typeResolutionStack[index]!;
    if (frame.target === target && frame.propertyName === propertyName) return index;
  }
  return -1;
}

export function typeResolutionHasProperty(target: object, propertyName: string): boolean {
  return findResolutionCycleStartIndex(target, propertyName) >= 0;
}

export function reportCircularityError(node: AstNode, propertyName: string): { readonly node: AstNode; readonly message: string } {
  return { node, message: `Circularity detected while resolving '${propertyName}'.` };
}

export function getPropertiesOfObjectType(type: Type): readonly AstSymbol[] {
  if ((type.flags & TypeFlags.Object) === 0) return [];
  return (type.data as ObjectType | undefined)?.declaredProperties
    ?? [...((type.symbol?.members ?? new Map()) as SymbolTable).values()];
}

export function getPropertiesOfUnionOrIntersectionType(type: Type): readonly AstSymbol[] {
  if ((type.flags & (TypeFlags.Union | TypeFlags.Intersection)) === 0) return getPropertiesOfObjectType(type);
  const tables = typeConstituents(type).map(getPropertiesOfObjectType);
  const byName = new Map<string, AstSymbol>();
  for (const table of tables) {
    for (const symbol of table) {
      if (!byName.has(symbolName(symbol))) byName.set(symbolName(symbol), symbol);
    }
  }
  return [...byName.values()].sort(compareSymbols);
}

export function getPropertyOfTypeEx(type: Type, name: string, accessFlags: AccessFlags = AccessFlags.None): AstSymbol | undefined {
  void accessFlags;
  return getPropertiesOfUnionOrIntersectionType(type).find((symbol) => symbolName(symbol) === name);
}

export function getSignaturesOfStructuredType(type: Type, kind: SignatureKind): readonly Signature[] {
  const data = type.data as ObjectType | undefined;
  return kind === SignatureKind.Call
    ? data?.declaredCallSignatures ?? []
    : data?.declaredConstructSignatures ?? [];
}

export function getIndexInfosOfStructuredType(type: Type): readonly IndexInfo[] {
  return (type.data as ObjectType | undefined)?.indexInfos ?? [];
}

export function getIndexTypeOfTypeEx(type: Type, keyType: Type): Type | undefined {
  return findApplicableIndexInfo(getIndexInfosOfStructuredType(type), keyType)?.valueType;
}

export function getApplicableIndexInfoForName(type: Type, name: string): IndexInfo | undefined {
  const keyType = /^[0-9]+$/u.test(name) ? intrinsicType(TypeFlags.Number, "number") : intrinsicType(TypeFlags.String, "string");
  return findApplicableIndexInfo(getIndexInfosOfStructuredType(type), keyType);
}

export function findApplicableIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find((info) => isApplicableIndexType(keyType, info.keyType));
}

export function isApplicableIndexType(source: Type, target: Type): boolean {
  return source === target
    || (source.flags & target.flags & (TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbolLike)) !== 0
    || (target.flags & TypeFlags.String) !== 0 && (source.flags & TypeFlags.NumberLike) !== 0;
}

export function resolveStructuredTypeMembers(type: Type): ObjectType {
  const data = type.data as ObjectType | undefined;
  return {
    objectFlags: data?.objectFlags ?? ObjectFlags.Anonymous,
    declaredProperties: data?.declaredProperties ?? getPropertiesOfObjectType(type),
    declaredCallSignatures: data?.declaredCallSignatures ?? [],
    declaredConstructSignatures: data?.declaredConstructSignatures ?? [],
    indexInfos: data?.indexInfos ?? [],
  } as ObjectType;
}

export function resolveClassOrInterfaceMembers(type: Type): ObjectType {
  return resolveStructuredTypeMembers(type);
}

export function resolveTypeReferenceMembers(type: Type): ObjectType {
  return resolveStructuredTypeMembers(type);
}

export function resolveObjectTypeMembers(type: Type): ObjectType {
  return resolveStructuredTypeMembers(type);
}

export function findIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find((info) => info.keyType === keyType || isApplicableIndexType(keyType, info.keyType));
}

function getBindingElementPropertyName(node: AstNode): string | undefined {
  const propertyName = (node as { readonly propertyName?: AstNode }).propertyName;
  if (propertyName !== undefined) return getEffectivePropertyNameForPropertyNameNode(propertyName);
  return getEffectivePropertyNameForPropertyNameNode((node as { readonly name?: AstNode }).name);
}

function bindingElementIndex(node: AstNode): number | undefined {
  const parent = parentOf(node);
  const elements = nodeArray((parent as { readonly elements?: unknown } | undefined)?.elements);
  const index = elements.indexOf(node);
  return index < 0 ? undefined : index;
}

function getTupleElementType(type: Type, index: number): Type | undefined {
  return typeArgumentsOf(type)[index];
}

function getArrayElementType(type: Type): Type | undefined {
  return (type.data as { readonly elementType?: Type } | undefined)?.elementType ?? typeArgumentsOf(type)[0];
}

function objectTypeWithProperties(properties: readonly AstSymbol[]): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    data: {
      objectFlags: ObjectFlags.Anonymous,
      declaredProperties: properties,
      declaredCallSignatures: [],
      declaredConstructSignatures: [],
      indexInfos: [],
    },
  };
}

function arrayType(elementTypes: readonly Type[]): Type {
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    data: {
      objectFlags: ObjectFlags.Reference,
      elementType: unionType(elementTypes),
      resolvedTypeArguments: elementTypes,
    },
  };
}

function unionType(types: readonly Type[]): Type {
  const flattened = types.flatMap((type) => (type.flags & TypeFlags.Union) !== 0 ? typeConstituents(type) : [type]);
  const unique = dedupeTypes(flattened.filter((type) => (type.flags & TypeFlags.Never) === 0));
  if (unique.length === 0) return intrinsicType(TypeFlags.Never, "never");
  if (unique.length === 1) return unique[0]!;
  return { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { objectFlags: ObjectFlags.None, types: unique } as UnionOrIntersectionType };
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [type];
}

function dedupeTypes(types: readonly Type[]): readonly Type[] {
  const seen = new Set<Type>();
  const result: Type[] = [];
  for (const type of types) {
    if (seen.has(type)) continue;
    seen.add(type);
    result.push(type);
  }
  return result;
}

function makeSyntheticProperty(name: string, type: Type): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Property,
    declarations: [],
    syntheticType: type,
  } as AstSymbol;
}

function literalType(flags: TypeFlags, value: string | number | boolean): Type {
  return { flags, id: nextSyntheticTypeId(), data: { value } };
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return { flags, id: nextSyntheticTypeId(), data: { intrinsicName } };
}

function unknownType(): Type {
  return intrinsicType(TypeFlags.Unknown, "unknown");
}

function typeOfNode(node: AstNode | undefined): Type {
  return getTypeOfSymbol((node as { readonly symbol?: AstSymbol } | undefined)?.symbol)
    ?? (node as { readonly checkedType?: Type; readonly type?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type } | undefined)?.type
    ?? intrinsicType(TypeFlags.Unknown, "unknown");
}

function returnTypeOfFunctionLike(node: AstNode | undefined): Type | undefined {
  return typeOfNode((node as { readonly type?: AstNode } | undefined)?.type);
}

function enumMemberValue(symbol: AstSymbol): string | number | undefined {
  const declaration = symbol.declarations.find((node) => node.kind === Kind.EnumMember);
  const initializer = initializerOf(declaration);
  if (initializer?.kind === Kind.StringLiteral) return nodeText(initializer);
  if (initializer?.kind === Kind.NumericLiteral) {
    const value = Number(nodeText(initializer));
    return Number.isFinite(value) ? value : undefined;
  }
  return undefined;
}

function getPropertyType(type: Type | undefined, name: string): Type | undefined {
  return type === undefined ? undefined : getTypeOfSymbol(getPropertyOfTypeEx(type, name));
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return type.aliasTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly typeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly typeArguments?: readonly Type[] } | undefined)?.typeArguments
    ?? [];
}

function childrenOf(node: AstNode | undefined): readonly AstNode[] {
  if (node === undefined) return [];
  const result: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isAstNode(value)) result.push(value);
    else if (Array.isArray(value)) result.push(...value.filter(isAstNode));
    else result.push(...nodeArray(value));
  }
  return result;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isAstNode);
  if (typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes)) {
    return (value as { readonly nodes: readonly unknown[] }).nodes.filter(isAstNode);
  }
  return [];
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly expression?: AstNode } | undefined)?.expression;
}

function initializerOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly initializer?: AstNode } | undefined)?.initializer;
}

function declarationNameText(node: AstNode | undefined): string {
  const name = (node as { readonly name?: AstNode } | undefined)?.name;
  return nodeText(name ?? node);
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string; readonly escapedText?: string } | undefined)?.text
    ?? (node as { readonly text?: string; readonly escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = parentOf(current);
  }
  return undefined;
}

function compareSymbols(left: AstSymbol, right: AstSymbol): number {
  return symbolName(left).localeCompare(symbolName(right));
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

let syntheticTypeId = -200_000;
function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
