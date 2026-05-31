/**
 * Reference assignment and destructuring assignment checks.
 *
 * This ports the checker.go assignment area: reference validation, object and
 * array destructuring, rest-property extraction, readonly assignment checks,
 * `this` assignment treatment, default values, const contexts, and mutable
 * locations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, Type, UnionOrIntersectionType } from "./types.js";
import { AccessFlags, ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface ReferenceAssignmentHost {
  readonly anyType: Type;
  readonly unknownType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly stringType: Type;
  readonly numberType: Type;
  readonly booleanType: Type;
  readonly getTypeOfExpression?: (node: AstNode) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getWriteTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getPropertyOfType?: (type: Type, name: string) => AstSymbol | undefined;
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly getElementTypeOfArrayType?: (type: Type) => Type | undefined;
  readonly getTupleElementType?: (type: Type, index: number) => Type | undefined;
  readonly getFlowTypeOfDestructuring?: (node: AstNode, declaredType: Type) => Type;
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly createUnionType?: (types: readonly Type[]) => Type;
  readonly createAnonymousObjectType?: (properties: readonly AstSymbol[]) => Type;
  readonly report?: (node: AstNode, message: string) => void;
}

export type AssignmentKind = "none" | "definite" | "compound" | "prefix" | "postfix";

export interface AssignmentCheckResult {
  readonly target: AstNode;
  readonly sourceType: Type;
  readonly targetType: Type;
  readonly valid: boolean;
  readonly readonlyViolation: boolean;
  readonly diagnostics: readonly string[];
}

export interface DestructuringAssignmentResult {
  readonly pattern: AstNode;
  readonly sourceType: Type;
  readonly elementResults: readonly AssignmentCheckResult[];
  readonly restType?: Type;
}

export interface RestTypeResult {
  readonly source: Type;
  readonly omittedProperties: readonly string[];
  readonly restType: Type;
}

export function checkDestructuringAssignment(node: AstNode, sourceType: Type, checkMode: number, rightIsThis: boolean, host: ReferenceAssignmentHost): DestructuringAssignmentResult {
  if (node.kind === Kind.ObjectLiteralExpression || node.kind === Kind.ObjectBindingPattern) return checkObjectLiteralAssignment(node, sourceType, rightIsThis, host);
  if (node.kind === Kind.ArrayLiteralExpression || node.kind === Kind.ArrayBindingPattern) return checkArrayLiteralAssignment(node, sourceType, checkMode, host);
  const result = checkReferenceAssignment(node, sourceType, checkMode, host);
  return { pattern: node, sourceType, elementResults: [result] };
}

export function checkObjectLiteralAssignment(node: AstNode, sourceType: Type, rightIsThis: boolean, host: ReferenceAssignmentHost): DestructuringAssignmentResult {
  const properties = objectElements(node);
  const results: AssignmentCheckResult[] = [];
  const omitted: string[] = [];
  let restType: Type | undefined;
  for (let index = 0; index < properties.length; index += 1) {
    const property = properties[index]!;
    if (property.kind === Kind.SpreadAssignment || property.kind === Kind.BindingElement && isRestElement(property)) {
      restType = getRestType(sourceType, omitted, symbolOf(property), host).restType;
      continue;
    }
    const propertyName = propertyAssignmentName(property);
    omitted.push(propertyName);
    const propertyType = getPropertyType(sourceType, propertyName, host) ?? host.unknownType;
    results.push(checkObjectLiteralDestructuringPropertyAssignment(property, propertyType, index, properties, rightIsThis, host));
  }
  return { pattern: node, sourceType, elementResults: results, ...(restType !== undefined ? { restType } : {}) };
}

export function checkObjectLiteralDestructuringPropertyAssignment(node: AstNode, objectLiteralType: Type, propertyIndex: number, allProperties: readonly AstNode[], rightIsThis: boolean, host: ReferenceAssignmentHost): AssignmentCheckResult {
  const target = propertyTarget(node);
  const sourceType = objectLiteralType;
  const result = checkReferenceAssignment(target, sourceType, 0, host);
  if (rightIsThis && isReadonlyTarget(target)) host.report?.(target, "Cannot assign property from 'this' to a readonly target.");
  void propertyIndex;
  void allProperties;
  return result;
}

export function checkArrayLiteralAssignment(node: AstNode, sourceType: Type, checkMode: number, host: ReferenceAssignmentHost): DestructuringAssignmentResult {
  const elements = arrayElements(node);
  const results: AssignmentCheckResult[] = [];
  let restType: Type | undefined;
  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index]!;
    if (isOmittedExpression(element)) continue;
    if (isRestElement(element)) {
      restType = getArrayRestType(sourceType, index, host);
      results.push(checkReferenceAssignment(restTarget(element), restType, checkMode, host));
      continue;
    }
    const elementType = getTupleElementOrArrayElementType(sourceType, index, host) ?? host.unknownType;
    results.push(checkArrayLiteralDestructuringElementAssignment(element, sourceType, index, elementType, checkMode, host));
  }
  return { pattern: node, sourceType, elementResults: results, ...(restType !== undefined ? { restType } : {}) };
}

export function checkArrayLiteralDestructuringElementAssignment(node: AstNode, sourceType: Type, elementIndex: number, elementType: Type, checkMode: number, host: ReferenceAssignmentHost): AssignmentCheckResult {
  const target = restTarget(node);
  const flowType = host.getFlowTypeOfDestructuring?.(target, elementType) ?? elementType;
  void sourceType;
  void elementIndex;
  return checkReferenceAssignment(target, flowType, checkMode, host);
}

export function checkReferenceAssignment(target: AstNode, sourceType: Type, checkMode: number, host: ReferenceAssignmentHost): AssignmentCheckResult {
  const diagnostics: string[] = [];
  const targetType = getTargetType(target, host);
  const readonlyViolation = isAssignmentToReadonlyEntity(target, resolvedSymbol(target), "definite");
  if (readonlyViolation) diagnostics.push("Cannot assign to a readonly entity.");
  if (readonlyViolation) host.report?.(target, "Cannot assign to a readonly entity.");
  const valid = !readonlyViolation && host.isTypeAssignableTo?.(sourceType, targetType) !== false;
  if (!valid && !readonlyViolation) {
    diagnostics.push("Type is not assignable to assignment target.");
    host.report?.(target, "Type is not assignable to assignment target.");
  }
  void checkMode;
  return { target, sourceType, targetType, valid, readonlyViolation, diagnostics };
}

export function checkReferenceExpression(expr: AstNode, invalidReferenceMessage: string, invalidOptionalChainMessage: string, host: ReferenceAssignmentHost): boolean {
  if (isOptionalChain(expr)) {
    host.report?.(expr, invalidOptionalChainMessage);
    return false;
  }
  if (isValidAssignmentTarget(expr)) return true;
  host.report?.(expr, invalidReferenceMessage);
  return false;
}

export function isAssignmentToReadonlyEntity(expr: AstNode, symbol: AstSymbol | undefined, assignmentKind: AssignmentKind): boolean {
  if (assignmentKind === "none" || symbol === undefined) return false;
  if (!isReadonlySymbol(symbol)) return false;
  if (isThisPropertyAccessInConstructor(expr, symbol)) return false;
  if (isReadonlyAssignmentDeclaration(expr)) return false;
  return true;
}

export function isReadonlyAssignmentDeclaration(node: AstNode): boolean {
  const parent = node.parent;
  return parent?.kind === Kind.PropertyDeclaration && (parent as { readonly name?: AstNode }).name === node && hasModifier(parent, "readonly");
}

export function isReadonlySymbol(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly)
    || (symbol.declarations ?? []).some(declaration => hasModifier(declaration, "readonly"))
    || symbolName(symbol).startsWith("readonly ");
}

export function isThisPropertyAccessInConstructor(node: AstNode, property: AstSymbol): boolean {
  const access = findAncestorOrSelf(node, Kind.PropertyAccessExpression);
  if (access === undefined || propertyAccessName(access) !== symbolName(property)) return false;
  if (nodeText((access as { readonly expression?: AstNode }).expression) !== "this") return false;
  return nearestFunction(node)?.kind === Kind.Constructor;
}

export function getRestType(source: Type, properties: readonly string[], symbol: AstSymbol | undefined, host: ReferenceAssignmentHost): RestTypeResult {
  const omitted = new Set(properties);
  const kept = (host.getPropertiesOfType?.(source) ?? []).filter(property => !omitted.has(symbolName(property)) && isSpreadableProperty(property));
  const restType = host.createAnonymousObjectType?.(kept) ?? anonymousObjectType(kept);
  void symbol;
  return { source, omittedProperties: [...omitted], restType };
}

export function getSpreadType(left: Type, right: Type, symbol: AstSymbol | undefined, objectFlags: ObjectFlags, readonly: boolean, host: ReferenceAssignmentHost): Type {
  const leftProps = host.getPropertiesOfType?.(left) ?? [];
  const rightProps = host.getPropertiesOfType?.(right) ?? [];
  const table = new Map<string, AstSymbol>();
  for (const prop of leftProps) if (isSpreadableProperty(prop)) table.set(symbolName(prop), prop);
  for (const prop of rightProps) if (isSpreadableProperty(prop)) table.set(symbolName(prop), getSpreadSymbol(prop, readonly));
  const result = host.createAnonymousObjectType?.([...table.values()]) ?? anonymousObjectType([...table.values()]);
  (result.data as { objectFlags?: ObjectFlags }).objectFlags = objectFlags;
  void symbol;
  return result;
}

export function getIndexInfoWithReadonly(info: IndexInfo, readonly: boolean): IndexInfo {
  return { ...info, isReadonly: readonly };
}

export function isValidSpreadType(type: Type): boolean {
  return (type.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Object | TypeFlags.NonPrimitive | TypeFlags.UnionOrIntersection)) !== 0;
}

export function getUnionIndexInfos(types: readonly Type[], host: ReferenceAssignmentHost): readonly IndexInfo[] {
  if (types.length === 0) return [];
  const keys = uniqueTypes(types.flatMap(type => (host.getIndexInfosOfType?.(type) ?? []).map(info => info.keyType)));
  return keys.map(key => {
    const infos = types.map(type => findIndexInfo(host.getIndexInfosOfType?.(type) ?? [], key)).filter((info): info is IndexInfo => info !== undefined);
    const valueTypes = infos.map(info => info.valueType);
    return { keyType: key, valueType: host.createUnionType?.(valueTypes) ?? unionType(valueTypes), isReadonly: infos.every(info => info.isReadonly === true) };
  });
}

export function isNonGenericObjectType(type: Type): boolean {
  return (type.flags & TypeFlags.Object) !== 0 && ((type.data as { readonly objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? 0) << 0 !== ObjectFlags.Mapped;
}

export function tryMergeUnionOfObjectTypeAndEmptyObject(type: Type, readonly: boolean, host: ReferenceAssignmentHost): Type {
  if ((type.flags & TypeFlags.Union) === 0) return type;
  const parts = constituentTypes(type);
  const empty = parts.find(part => isEmptyObjectTypeOrSpreadsIntoEmptyObject(part, host));
  if (empty === undefined) return type;
  const others = parts.filter(part => part !== empty);
  const optionalized = others.map(part => makePropertiesOptional(part, readonly, host));
  return host.createUnionType?.(optionalized) ?? unionType(optionalized);
}

export function isSpreadableProperty(property: AstSymbol): boolean {
  if (((property.flags ?? 0) & SymbolFlags.Method) !== 0) return false;
  if (symbolName(property) === "__proto__") return false;
  return !isPrivateIdentifierProperty(property);
}

export function getSpreadSymbol(property: AstSymbol, readonly: boolean): AstSymbol {
  const clone = cloneSymbol(property);
  if (readonly) (clone as { readonly?: boolean }).readonly = true;
  return clone;
}

export function isEmptyObjectTypeOrSpreadsIntoEmptyObject(type: Type, host: ReferenceAssignmentHost): boolean {
  if ((type.flags & TypeFlags.Object) === 0) return false;
  return (host.getPropertiesOfType?.(type) ?? []).filter(isSpreadableProperty).length === 0;
}

export function hasDefaultValue(node: AstNode): boolean {
  return (node as { readonly initializer?: AstNode }).initializer !== undefined
    || node.kind === Kind.BindingElement && (node as { readonly initializer?: AstNode }).initializer !== undefined;
}

export function isConstContext(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (hasModifier(current, "const")) return true;
    if (current.kind === Kind.AsExpression && nodeText((current as { readonly type?: AstNode }).type) === "const") return true;
    current = current.parent;
  }
  return false;
}

export function isValidConstAssertionArgument(node: AstNode): boolean {
  return node.kind === Kind.StringLiteral
    || node.kind === Kind.NumericLiteral
    || node.kind === Kind.TrueKeyword
    || node.kind === Kind.FalseKeyword
    || node.kind === Kind.ArrayLiteralExpression
    || node.kind === Kind.ObjectLiteralExpression
    || node.kind === Kind.NoSubstitutionTemplateLiteral;
}

export function isConstTypeVariable(type: Type, depth: number): boolean {
  if (depth > 10) return false;
  if ((type.data as { readonly isConst?: boolean } | undefined)?.isConst === true) return true;
  if ((type.flags & TypeFlags.UnionOrIntersection) !== 0) return constituentTypes(type).some(part => isConstTypeVariable(part, depth + 1));
  return false;
}

export function checkExpressionForMutableLocation(node: AstNode, checkMode: number, host: ReferenceAssignmentHost): Type {
  const type = host.getTypeOfExpression?.(node) ?? host.unknownType;
  if (isReadonlyTarget(node)) host.report?.(node, "Expression is a readonly location.");
  void checkMode;
  return type;
}

export function getResolvedSymbol(node: AstNode): AstSymbol | undefined {
  const symbol = resolvedSymbol(node);
  if (symbol === undefined) return undefined;
  return (symbol as { readonly resolved?: AstSymbol }).resolved ?? symbol;
}

export function getResolvedSymbolOrNil(node: AstNode): AstSymbol | undefined {
  return getResolvedSymbol(node);
}

export function getReferencedValueOrAliasSymbol(reference: AstNode): AstSymbol | undefined {
  const symbol = resolvedSymbol(reference);
  if (symbol === undefined) return undefined;
  return ((symbol.flags ?? 0) & (SymbolFlags.Value | SymbolFlags.Alias)) !== 0 ? symbol : undefined;
}

export function getCannotFindNameDiagnosticForName(node: AstNode): string {
  const text = nodeText(node);
  if (text === "require") return "Cannot find name 'require'. Do you need node types?";
  if (text === "Promise") return "Cannot find name 'Promise'. Try changing the lib compiler option.";
  return `Cannot find name '${text}'.`;
}

function getTargetType(target: AstNode, host: ReferenceAssignmentHost): Type {
  const symbol = resolvedSymbol(target);
  if (symbol !== undefined) return host.getWriteTypeOfSymbol?.(symbol) ?? host.getTypeOfSymbol?.(symbol) ?? getTypeOfSymbol(symbol) ?? host.unknownType;
  return host.getTypeOfExpression?.(target) ?? host.unknownType;
}

function getPropertyType(sourceType: Type, propertyName: string, host: ReferenceAssignmentHost): Type | undefined {
  const property = host.getPropertyOfType?.(sourceType, propertyName);
  if (property !== undefined) return host.getTypeOfSymbol?.(property) ?? getTypeOfSymbol(property);
  const index = (host.getIndexInfosOfType?.(sourceType) ?? []).find(info => isApplicableIndexName(propertyName, info));
  return index?.valueType;
}

function getTupleElementOrArrayElementType(sourceType: Type, index: number, host: ReferenceAssignmentHost): Type | undefined {
  return host.getTupleElementType?.(sourceType, index) ?? host.getElementTypeOfArrayType?.(sourceType);
}

function getArrayRestType(sourceType: Type, startIndex: number, host: ReferenceAssignmentHost): Type {
  const elementTypes: Type[] = [];
  for (let index = startIndex; index < startIndex + 8; index += 1) {
    const element = getTupleElementOrArrayElementType(sourceType, index, host);
    if (element !== undefined) elementTypes.push(element);
  }
  if (elementTypes.length === 0) return host.getElementTypeOfArrayType?.(sourceType) ?? sourceType;
  return host.createUnionType?.(elementTypes) ?? unionType(elementTypes);
}

function makePropertiesOptional(type: Type, readonly: boolean, host: ReferenceAssignmentHost): Type {
  const props = (host.getPropertiesOfType?.(type) ?? []).map(property => {
    const clone = cloneSymbol(property);
    clone.flags = (clone.flags ?? 0) | SymbolFlags.Optional;
    if (readonly) (clone as { readonly?: boolean }).readonly = true;
    return clone;
  });
  return host.createAnonymousObjectType?.(props) ?? anonymousObjectType(props);
}

function anonymousObjectType(properties: readonly AstSymbol[]): Type {
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Object, data: { objectFlags: ObjectFlags.Anonymous, declaredProperties: properties } as object };
}

function cloneSymbol(symbol: AstSymbol): AstSymbol {
  const clone: AstSymbol = {
    ...(symbol.name !== undefined ? { name: symbol.name } : {}),
    ...(symbol.escapedName !== undefined ? { escapedName: symbol.escapedName } : {}),
    declarations: [...(symbol.declarations ?? [])],
  };
  if (symbol.flags !== undefined) clone.flags = symbol.flags;
  if (symbol.valueDeclaration !== undefined) clone.valueDeclaration = symbol.valueDeclaration;
  if (symbol.parent !== undefined) clone.parent = symbol.parent;
  return clone;
}

function objectElements(node: AstNode): readonly AstNode[] {
  return (node as { readonly properties?: readonly AstNode[]; readonly elements?: readonly AstNode[] }).properties
    ?? (node as { readonly elements?: readonly AstNode[] }).elements
    ?? [];
}

function arrayElements(node: AstNode): readonly AstNode[] {
  return (node as { readonly elements?: readonly AstNode[] }).elements ?? [];
}

function propertyTarget(node: AstNode): AstNode {
  return (node as { readonly initializer?: AstNode; readonly name?: AstNode }).initializer
    ?? (node as { readonly name?: AstNode }).name
    ?? node;
}

function propertyAssignmentName(node: AstNode): string {
  return nodeText((node as { readonly propertyName?: AstNode; readonly name?: AstNode }).propertyName ?? (node as { readonly name?: AstNode }).name ?? node);
}

function restTarget(node: AstNode): AstNode {
  return (node as { readonly expression?: AstNode; readonly name?: AstNode }).expression
    ?? (node as { readonly name?: AstNode }).name
    ?? node;
}

function isRestElement(node: AstNode): boolean {
  return Boolean((node as { readonly dotDotDotToken?: unknown }).dotDotDotToken) || node.kind === Kind.SpreadElement || node.kind === Kind.SpreadAssignment;
}

function isOmittedExpression(node: AstNode): boolean {
  return node.kind === Kind.OmittedExpression;
}

function isValidAssignmentTarget(node: AstNode): boolean {
  return node.kind === Kind.Identifier
    || node.kind === Kind.PropertyAccessExpression
    || node.kind === Kind.ElementAccessExpression
    || node.kind === Kind.ObjectLiteralExpression
    || node.kind === Kind.ArrayLiteralExpression
    || node.kind === Kind.ObjectBindingPattern
    || node.kind === Kind.ArrayBindingPattern;
}

function isOptionalChain(node: AstNode): boolean {
  return Boolean((node as { readonly questionDotToken?: unknown }).questionDotToken);
}

function isReadonlyTarget(node: AstNode): boolean {
  const symbol = resolvedSymbol(node);
  return symbol !== undefined && isReadonlySymbol(symbol);
}

function isPrivateIdentifierProperty(symbol: AstSymbol): boolean {
  return symbolName(symbol).startsWith("#") || (symbol.declarations ?? []).some(declaration => declarationName(declaration).startsWith("#"));
}

function isApplicableIndexName(name: string, info: IndexInfo): boolean {
  if ((info.keyType.flags & TypeFlags.NumberLike) !== 0) return isNumericName(name);
  if ((info.keyType.flags & TypeFlags.StringLike) !== 0) return true;
  return false;
}

function findIndexInfo(indexInfos: readonly IndexInfo[], keyType: Type): IndexInfo | undefined {
  return indexInfos.find(info => (info.keyType.flags & keyType.flags) !== 0);
}

function uniqueTypes(types: readonly Type[]): readonly Type[] {
  return [...new Set(types)];
}

function unionType(types: readonly Type[]): Type {
  const unique = uniqueTypes(types);
  if (unique.length === 1) return unique[0]!;
  return { id: nextSyntheticTypeId(), flags: TypeFlags.Union, data: { types: unique, objectFlags: ObjectFlags.None } as UnionOrIntersectionType };
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function resolvedSymbol(node: AstNode): AstSymbol | undefined {
  return (node as { readonly resolvedSymbol?: AstSymbol; readonly symbol?: AstSymbol }).resolvedSymbol
    ?? (node as { readonly symbol?: AstSymbol }).symbol;
}

function symbolOf(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function declarationName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = (node as { readonly name?: AstNode | string }).name;
  if (typeof name === "string") return name;
  if (name !== undefined) return nodeText(name);
  return nodeText(node);
}

function propertyAccessName(node: AstNode): string {
  if (node.kind === Kind.PropertyAccessExpression) return declarationName((node as { readonly name?: AstNode }).name);
  if (node.kind === Kind.ElementAccessExpression) return nodeText((node as { readonly argumentExpression?: AstNode }).argumentExpression);
  return "";
}

function findAncestorOrSelf(node: AstNode, kind: Kind): AstNode | undefined {
  let current: AstNode | undefined = node;
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

function hasModifier(node: AstNode | undefined, modifier: string): boolean {
  const modifiers = (node as { readonly modifiers?: readonly AstNode[] } | undefined)?.modifiers ?? [];
  return modifiers.some(item => nodeText(item) === modifier || Kind[item.kind]?.toLowerCase() === `${modifier}keyword`);
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function isNumericName(name: string): boolean {
  return name !== "" && String(Number(name)) === name;
}

let syntheticTypeId = -3_700_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
