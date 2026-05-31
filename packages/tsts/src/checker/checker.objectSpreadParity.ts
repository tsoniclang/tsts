/**
 * Object literal, spread, and destructuring support.
 *
 * Ports the TS-Go checker.go object-literal and assignment helpers:
 * spread merge, excess-property preparation, destructuring assignment
 * element typing, readonly spread symbols, and object-rest exclusion.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { ObjectFlags, TypeFlags, type IndexInfo, type Type } from "./types.js";

export interface ObjectSpreadEnvironment {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly emptyObjectType: Type;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly createAnonymousType: (symbol: AstSymbol | undefined, properties: readonly AstSymbol[], indexInfos: readonly IndexInfo[], objectFlags: ObjectFlags) => Type;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly report?: (node: AstNode, message: string) => void;
}

export interface SpreadMergeResult {
  readonly type: Type;
  readonly overwritten: readonly AstSymbol[];
  readonly skipped: readonly AstSymbol[];
}

export interface DestructuringElementType {
  readonly node: AstNode;
  readonly name: string;
  readonly type: Type;
  readonly defaultApplied: boolean;
}

export interface RestTypePlan {
  readonly source: Type;
  readonly omittedNames: readonly string[];
  readonly restProperties: readonly AstSymbol[];
  readonly indexInfos: readonly IndexInfo[];
}

export function getSpreadType(
  left: Type,
  right: Type,
  symbol: AstSymbol | undefined,
  objectFlags: ObjectFlags,
  readonlySpread: boolean,
  environment: ObjectSpreadEnvironment,
): SpreadMergeResult {
  if ((right.flags & TypeFlags.Any) !== 0) return { type: right, overwritten: [], skipped: [] };
  if ((right.flags & TypeFlags.Unknown) !== 0) return { type: environment.unknownType, overwritten: [], skipped: [] };
  if (!isValidSpreadType(right)) return { type: left, overwritten: [], skipped: environment.getPropertiesOfType?.(right) ?? [] };
  if (isEmptyObjectType(left, environment)) return { type: copySpreadType(right, readonlySpread, objectFlags, environment), overwritten: [], skipped: [] };
  if (isEmptyObjectType(right, environment)) return { type: left, overwritten: [], skipped: [] };

  const properties = new Map<string, AstSymbol>();
  const overwritten: AstSymbol[] = [];
  const skipped: AstSymbol[] = [];
  for (const property of environment.getPropertiesOfType?.(left) ?? []) {
    if (isSpreadableProperty(property)) properties.set(symbolName(property), property);
  }
  for (const property of environment.getPropertiesOfType?.(right) ?? []) {
    if (!isSpreadableProperty(property)) {
      skipped.push(property);
      continue;
    }
    const name = symbolName(property);
    const previous = properties.get(name);
    if (previous !== undefined) overwritten.push(previous);
    properties.set(name, getSpreadSymbol(property, readonlySpread, environment));
  }
  const indexInfos = getUnionIndexInfos([left, right], readonlySpread, environment);
  const type = environment.createAnonymousType(symbol, [...properties.values()], indexInfos, objectFlags | ObjectFlags.ContainsSpread);
  return { type, overwritten, skipped };
}

export function copySpreadType(
  source: Type,
  readonlySpread: boolean,
  objectFlags: ObjectFlags,
  environment: ObjectSpreadEnvironment,
): Type {
  const properties = (environment.getPropertiesOfType?.(source) ?? [])
    .filter(isSpreadableProperty)
    .map(property => getSpreadSymbol(property, readonlySpread, environment));
  const indexInfos = (environment.getIndexInfosOfType?.(source) ?? []).map(info => getIndexInfoWithReadonly(info, readonlySpread));
  return environment.createAnonymousType(source.symbol, properties, indexInfos, objectFlags | ObjectFlags.ContainsSpread);
}

export function getUnionIndexInfos(types: readonly Type[], readonlyIndex: boolean, environment: ObjectSpreadEnvironment): readonly IndexInfo[] {
  const byKey = new Map<string, IndexInfo[]>();
  for (const type of types) {
    for (const info of environment.getIndexInfosOfType?.(type) ?? []) {
      const key = indexKey(info);
      const existing = byKey.get(key) ?? [];
      existing.push(info);
      byKey.set(key, existing);
    }
  }
  const result: IndexInfo[] = [];
  for (const infos of byKey.values()) {
    const first = infos[0];
    if (first === undefined) continue;
    const valueTypes = infos.map(info => info.valueType);
    result.push({
      keyType: first.keyType,
      valueType: environment.createUnionType?.(valueTypes) ?? first.valueType,
      isReadonly: readonlyIndex || infos.every(info => info.isReadonly === true),
    });
  }
  return result;
}

export function getIndexInfoWithReadonly(info: IndexInfo, readonlyIndex: boolean): IndexInfo {
  return {
    keyType: info.keyType,
    valueType: info.valueType,
    isReadonly: readonlyIndex || info.isReadonly === true,
    ...(info.declaration === undefined ? {} : { declaration: info.declaration }),
  };
}

export function isValidSpreadType(type: Type): boolean {
  if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return true;
  if ((type.flags & TypeFlags.Object) !== 0) return true;
  if ((type.flags & TypeFlags.NonPrimitive) !== 0) return true;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return constituentTypes(type).every(isValidSpreadType);
  return false;
}

export function isSpreadableProperty(symbol: AstSymbol): boolean {
  const flags = symbol.flags ?? 0;
  if ((flags & SymbolFlags.Method) !== 0) return false;
  if ((flags & SymbolFlags.Accessor) !== 0) return true;
  if (symbolName(symbol) === "__proto__") return false;
  if ((symbol as { readonly private?: boolean }).private === true) return false;
  return true;
}

export function getSpreadSymbol(symbol: AstSymbol, readonlySpread: boolean, environment: ObjectSpreadEnvironment): AstSymbol {
  const type = environment.getTypeOfSymbol?.(symbol);
  return {
    ...symbol,
    flags: (symbol.flags ?? 0) | SymbolFlags.Transient,
    declarations: [...symbol.declarations ?? []],
    ...(type === undefined ? {} : { synthetic: true, syntheticType: type }),
    readonly: readonlySpread || Boolean((symbol as { readonly readonly?: boolean }).readonly),
  } as AstSymbol;
}

export function checkSpreadPropOverrides(type: Type, props: ReadonlyMap<string, AstSymbol>, spread: AstNode, environment: ObjectSpreadEnvironment): void {
  for (const property of environment.getPropertiesOfType?.(type) ?? []) {
    const previous = props.get(symbolName(property));
    if (previous !== undefined) {
      environment.report?.(spread, `Spread property '${symbolName(property)}' overwrites a previous property.`);
    }
  }
}

export function getRestType(
  source: Type,
  properties: readonly AstNode[],
  symbol: AstSymbol | undefined,
  environment: ObjectSpreadEnvironment,
): RestTypePlan {
  const omittedNames = properties.map(propertyNameFromNode).filter((name): name is string => name !== undefined);
  const omitted = new Set(omittedNames);
  const restProperties = (environment.getPropertiesOfType?.(source) ?? [])
    .filter(property => !omitted.has(symbolName(property)))
    .filter(isSpreadableProperty)
    .map(property => getSpreadSymbol(property, false, environment));
  const indexInfos = environment.getIndexInfosOfType?.(source) ?? [];
  void symbol;
  return { source, omittedNames, restProperties, indexInfos };
}

export function createRestType(plan: RestTypePlan, environment: ObjectSpreadEnvironment): Type {
  return environment.createAnonymousType(plan.source.symbol, plan.restProperties, plan.indexInfos, ObjectFlags.ObjectRestType);
}

export function getTypeFromObjectBindingPattern(
  pattern: AstNode,
  includePatternInType: boolean,
  reportErrors: boolean,
  environment: ObjectSpreadEnvironment,
): Type {
  const properties: AstSymbol[] = [];
  for (const element of nodeArray(pattern, "elements")) {
    const name = propertyNameFromNode(element);
    if (name === undefined) continue;
    const type = declaredTypeOfNode(element) ?? environment.unknownType;
    properties.push(makeSyntheticProperty(name, type, element));
  }
  void includePatternInType;
  void reportErrors;
  return environment.createAnonymousType(undefined, properties, [], ObjectFlags.ObjectLiteral);
}

export function getTypeFromArrayBindingPattern(
  pattern: AstNode,
  includePatternInType: boolean,
  reportErrors: boolean,
  environment: ObjectSpreadEnvironment,
): Type {
  const elementTypes = nodeArray(pattern, "elements").map(element => declaredTypeOfNode(element) ?? environment.unknownType);
  const elementType = environment.createUnionType?.(elementTypes) ?? elementTypes[0] ?? environment.neverType;
  void includePatternInType;
  void reportErrors;
  return environment.createAnonymousType(undefined, [makeSyntheticProperty("length", environment.anyType, pattern), makeSyntheticProperty("0", elementType, pattern)], [], ObjectFlags.ArrayLiteral);
}

export function getBindingElementTypeFromParentType(
  declaration: AstNode,
  parentType: Type,
  noTupleBoundsCheck: boolean,
  environment: ObjectSpreadEnvironment,
): Type {
  const name = propertyNameFromNode(declaration);
  if (name !== undefined) {
    const property = (environment.getPropertiesOfType?.(parentType) ?? []).find(candidate => symbolName(candidate) === name);
    const type = property === undefined ? undefined : environment.getTypeOfSymbol?.(property);
    if (type !== undefined) return type;
  }
  const index = elementIndex(declaration);
  if (index !== undefined) {
    const element = (parentType.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments?.[index];
    if (element !== undefined || noTupleBoundsCheck) return element ?? environment.undefinedType;
  }
  return environment.unknownType;
}

export function getFlowTypeOfDestructuring(node: AstNode, declaredType: Type, environment: ObjectSpreadEnvironment): Type {
  const initializer = (node as { readonly initializer?: AstNode }).initializer;
  if (initializer === undefined) return declaredType;
  const initializerType = declaredTypeOfNode(initializer);
  if (initializerType === undefined) return declaredType;
  return environment.isTypeAssignableTo?.(initializerType, declaredType) === false ? declaredType : initializerType;
}

export function getSyntheticElementAccess(node: AstNode): AstNode {
  const expression = (node as { readonly expression?: AstNode }).expression ?? node;
  return {
    ...node,
    kind: Kind.ElementAccessExpression,
    expression,
    argumentExpression: node,
  } as AstNode;
}

export function getParentElementAccess(node: AstNode): AstNode | undefined {
  let current = node.parent;
  while (current !== undefined) {
    if (current.kind === Kind.ElementAccessExpression) return current;
    if (current.kind !== Kind.ParenthesizedExpression) return undefined;
    current = current.parent;
  }
  return undefined;
}

export function padObjectLiteralType(type: Type, pattern: AstNode, environment: ObjectSpreadEnvironment): Type {
  const existing = new Map((environment.getPropertiesOfType?.(type) ?? []).map(property => [symbolName(property), property]));
  const properties: AstSymbol[] = [...existing.values()];
  for (const element of nodeArray(pattern, "elements")) {
    const name = propertyNameFromNode(element);
    if (name !== undefined && !existing.has(name)) properties.push(makeSyntheticProperty(name, environment.undefinedType, element));
  }
  return environment.createAnonymousType(type.symbol, properties, environment.getIndexInfosOfType?.(type) ?? [], ObjectFlags.ObjectLiteral);
}

export function padTupleType(type: Type, pattern: AstNode, environment: ObjectSpreadEnvironment): Type {
  const elements = nodeArray(pattern, "elements");
  const args = [...(type.data as { readonly resolvedTypeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments ?? []];
  while (args.length < elements.length) args.push(environment.undefinedType);
  return environment.createAnonymousType(type.symbol, args.map((arg, index) => makeSyntheticProperty(String(index), arg, elements[index] ?? pattern)), [], ObjectFlags.Tuple);
}

export function isEmptyObjectType(type: Type, environment: ObjectSpreadEnvironment): boolean {
  return (environment.getPropertiesOfType?.(type) ?? []).length === 0
    && (environment.getIndexInfosOfType?.(type) ?? []).length === 0
    && (type.flags & TypeFlags.Object) !== 0;
}

function makeSyntheticProperty(name: string, type: Type, declaration: AstNode): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Property | SymbolFlags.Transient,
    declarations: [declaration],
    synthetic: true,
    syntheticType: type,
  } as AstSymbol;
}

function propertyNameFromNode(node: AstNode): string | undefined {
  const candidate = node as { readonly propertyName?: AstNode | string; readonly name?: AstNode | string; readonly text?: string };
  if (typeof candidate.propertyName === "string") return candidate.propertyName;
  if (candidate.propertyName !== undefined) return propertyNameFromNode(candidate.propertyName);
  if (typeof candidate.name === "string") return candidate.name;
  if (candidate.name !== undefined) return propertyNameFromNode(candidate.name);
  return candidate.text;
}

function declaredTypeOfNode(node: AstNode): Type | undefined {
  return (node as { readonly declaredType?: Type; readonly type?: Type; readonly inferredType?: Type }).declaredType
    ?? (node as { readonly type?: Type; readonly inferredType?: Type }).type
    ?? (node as { readonly inferredType?: Type }).inferredType;
}

function elementIndex(node: AstNode): number | undefined {
  const parent = node.parent as { readonly elements?: readonly AstNode[] } | undefined;
  const index = parent?.elements?.indexOf(node);
  return index === undefined || index < 0 ? undefined : index;
}

function nodeArray(node: AstNode, field: "elements"): readonly AstNode[] {
  return (node as { readonly elements?: readonly AstNode[] })[field] ?? [];
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function indexKey(info: IndexInfo): string {
  return `${info.keyType.flags}:${info.keyType.id}`;
}
