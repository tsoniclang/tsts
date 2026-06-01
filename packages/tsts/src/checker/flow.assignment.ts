/**
 * Flow assignment and destructuring parity helpers.
 *
 * Conceptual split from TS-Go `flow.go` assignment-state and
 * destructuring-flow sections.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { Type } from "./types.js";
import { TypeFlags, getTypeOfSymbol } from "./types.js";

export interface FlowAssignmentHost {
  readonly anyType: Type;
  readonly neverType: Type;
  readonly undefinedType: Type;
  readonly unknownType: Type;
  readonly numberType: Type;
  readonly stringType: Type;
  getTypeAtLocation(node: AstNode | undefined): Type;
  getPropertyType(type: Type, name: string): Type | undefined;
  createUnionType(types: readonly Type[]): Type;
}

export function hasTypePredicateOrNeverReturnType(signature: { readonly resolvedTypePredicate?: unknown; readonly resolvedReturnType?: Type } | undefined): boolean {
  return signature?.resolvedTypePredicate !== undefined || (signature?.resolvedReturnType?.flags ?? 0) & TypeFlags.Never ? true : false;
}

export function getExplicitThisType(node: AstNode | undefined): Type | undefined {
  const parameter = parametersOf(node).find(param => nodeText(declarationName(param)) === "this");
  return typeOfNode(typeNodeOf(parameter));
}

export function getTypeOfInitializer(host: FlowAssignmentHost, node: AstNode | undefined): Type {
  return host.getTypeAtLocation(initializerOf(node));
}

export function getAssignedTypeOfBinaryExpression(host: FlowAssignmentHost, node: AstNode): Type {
  return host.getTypeAtLocation((node as { readonly right?: AstNode }).right);
}

export function getAssignedTypeOfArrayLiteralElement(host: FlowAssignmentHost, node: AstNode): Type {
  return host.getTypeAtLocation(node);
}

export function getTypeOfDestructuredArrayElement(host: FlowAssignmentHost, parentType: Type, index: number): Type {
  return arrayElementType(parentType, index) ?? host.unknownType;
}

export function includeUndefinedInIndexSignature(type: Type): boolean {
  return (type.flags & TypeFlags.Undefined) !== 0 || (type.data as { readonly includeUndefinedInIndexSignature?: boolean } | undefined)?.includeUndefinedInIndexSignature === true;
}

export function getAssignedTypeOfSpreadExpression(host: FlowAssignmentHost, node: AstNode): Type {
  return arrayElementType(host.getTypeAtLocation(expressionOf(node)), 0) ?? host.anyType;
}

export function getTypeOfDestructuredSpreadExpression(host: FlowAssignmentHost, node: AstNode): Type {
  return getAssignedTypeOfSpreadExpression(host, node);
}

export function getAssignedTypeOfPropertyAssignment(host: FlowAssignmentHost, node: AstNode): Type {
  return host.getTypeAtLocation(initializerOf(node));
}

export function getTypeOfDestructuredProperty(host: FlowAssignmentHost, parentType: Type, property: AstNode): Type {
  return host.getPropertyType(parentType, nodeText(declarationName(property))) ?? host.unknownType;
}

export function getAssignedTypeOfShorthandPropertyAssignment(host: FlowAssignmentHost, node: AstNode): Type {
  return getTypeOfSymbol(nodeSymbol(node)) ?? host.unknownType;
}

export function isDestructuringAssignmentTarget(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ObjectLiteralExpression || node?.kind === Kind.ArrayLiteralExpression || node?.kind === Kind.ObjectBindingPattern || node?.kind === Kind.ArrayBindingPattern;
}

export function getTypeWithDefault(host: FlowAssignmentHost, type: Type, defaultExpression: AstNode | undefined): Type {
  if (defaultExpression === undefined) return type;
  const defaultType = host.getTypeAtLocation(defaultExpression);
  return host.createUnionType([removeUndefined(type), defaultType]);
}

export function getAssignmentReducedType(host: FlowAssignmentHost, declaredType: Type, assignedType: Type): Type {
  return getAssignmentReducedTypeWorker(host, declaredType, assignedType);
}

export function getAssignmentReducedTypeWorker(host: FlowAssignmentHost, declaredType: Type, assignedType: Type): Type {
  if (typeMaybeAssignableTo(assignedType, declaredType)) return assignedType;
  if ((declaredType.flags & TypeFlags.Union) !== 0) {
    const retained = typeConstituents(declaredType).filter(part => typeMaybeAssignableTo(assignedType, part));
    return retained.length === 0 ? host.neverType : host.createUnionType(retained);
  }
  return host.neverType;
}

export function typeMaybeAssignableTo(source: Type, target: Type): boolean {
  return source === target
    || (target.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0
    || (source.flags & TypeFlags.Never) !== 0
    || (source.flags & target.flags & TypeFlags.DisjointDomains) !== 0;
}

export function getFlowTypeInConstructor(host: FlowAssignmentHost, symbol: AstSymbol | undefined, constructorDeclaration: AstNode): Type {
  void constructorDeclaration;
  return getTypeOfSymbol(symbol) ?? host.unknownType;
}

export function getFlowTypeInStaticBlocks(host: FlowAssignmentHost, symbol: AstSymbol | undefined, classDeclaration: AstNode): Type {
  void classDeclaration;
  return getTypeOfSymbol(symbol) ?? host.unknownType;
}

export function isPostSuperFlowNode(node: AstNode | undefined): boolean {
  return isPostSuperFlowNodeWorker(node, new Set<AstNode>());
}

export function isPostSuperFlowNodeWorker(node: AstNode | undefined, seen: Set<AstNode>): boolean {
  if (node === undefined || seen.has(node)) return false;
  seen.add(node);
  if (node.kind === Kind.SuperKeyword) return true;
  return childrenOf(node).some(child => isPostSuperFlowNodeWorker(child, seen));
}

export function isSymbolAssignedDefinitely(symbol: AstSymbol | undefined, node: AstNode | undefined): boolean {
  return isSymbolAssigned(symbol, node) && !hasConditionalAncestor(node);
}

export function isSymbolAssigned(symbol: AstSymbol | undefined, node: AstNode | undefined): boolean {
  if (symbol === undefined || node === undefined) return false;
  const symbolName = symbol.name ?? symbol.escapedName ?? "";
  return assignmentTargets(node).some(target => nodeText(target) === symbolName);
}

export function isPastLastAssignment(symbol: AstSymbol | undefined, node: AstNode | undefined): boolean {
  if (symbol === undefined || node === undefined) return true;
  const last = assignmentTargets(sourceFileOf(node)).findLast(target => nodeText(target) === (symbol.name ?? symbol.escapedName ?? ""));
  return last === undefined || nodeEnd(last) <= nodeEnd(node);
}

export function ensureAssignmentsMarked(root: AstNode): void {
  for (const target of assignmentTargets(root)) {
    const symbol = nodeSymbol(target);
    if (symbol !== undefined) (symbol as { assigned?: boolean }).assigned = true;
  }
}

export function hasParentWithAssignmentsMarked(node: AstNode | undefined): boolean {
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if ((current as { readonly assignmentsMarked?: boolean }).assignmentsMarked === true) return true;
  }
  return false;
}

export function extendAssignmentPosition(symbol: AstSymbol | undefined, node: AstNode): void {
  if (symbol === undefined) return;
  const current = (symbol as { lastAssignmentEnd?: number }).lastAssignmentEnd ?? -1;
  (symbol as { lastAssignmentEnd?: number }).lastAssignmentEnd = Math.max(current, nodeEnd(node));
}

function assignmentTargets(node: AstNode | undefined): readonly AstNode[] {
  if (node === undefined) return [];
  const out: AstNode[] = [];
  if (node.kind === Kind.BinaryExpression) {
    const left = (node as { readonly left?: AstNode }).left;
    if (left !== undefined) out.push(left);
  }
  for (const child of childrenOf(node)) out.push(...assignmentTargets(child));
  return out;
}

function removeUndefined(type: Type): Type {
  if ((type.flags & TypeFlags.Undefined) !== 0) return { flags: TypeFlags.Never, id: -1, data: { intrinsicName: "never" } };
  if ((type.flags & TypeFlags.Union) !== 0) return unionType(typeConstituents(type).filter(part => (part.flags & TypeFlags.Undefined) === 0));
  return type;
}

function arrayElementType(type: Type, index: number): Type | undefined {
  return (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly elementType?: Type } | undefined)?.resolvedTypeArguments?.[index]
    ?? (type.data as { readonly elementType?: Type } | undefined)?.elementType;
}

function typeConstituents(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function unionType(types: readonly Type[]): Type {
  const unique = [...new Set(types)];
  return unique.length === 1 ? unique[0]! : { flags: TypeFlags.Union, id: nextSyntheticTypeId(), data: { types: unique } };
}

function parametersOf(node: AstNode | undefined): readonly AstNode[] {
  return nodeArray((node as { readonly parameters?: unknown } | undefined)?.parameters);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const key of ["children", "statements", "members", "parameters", "elements", "properties"]) {
    out.push(...nodeArray((node as unknown as Record<string, unknown>)[key]));
  }
  for (const key of ["left", "right", "expression", "initializer", "body", "name"]) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (isNode(child)) out.push(child);
  }
  return out;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function declarationName(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly name?: AstNode } | undefined)?.name ?? node;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly expression?: AstNode } | undefined)?.expression;
}

function initializerOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly initializer?: AstNode } | undefined)?.initializer;
}

function typeNodeOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly type?: AstNode } | undefined)?.type;
}

function typeOfNode(node: AstNode | undefined): Type | undefined {
  return (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.checkedType
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.type
    ?? (node as { readonly checkedType?: Type; readonly type?: Type; readonly syntheticType?: Type } | undefined)?.syntheticType;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol } | undefined)?.symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined && parentOf(current) !== undefined) current = parentOf(current);
  return current;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? nodeSymbol(node)?.name ?? "";
}

function nodeEnd(node: AstNode | undefined): number {
  return (node as { readonly end?: number } | undefined)?.end ?? 0;
}

function hasConditionalAncestor(node: AstNode | undefined): boolean {
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.IfStatement || current.kind === Kind.ConditionalExpression || current.kind === Kind.SwitchStatement) return true;
  }
  return false;
}

let syntheticTypeId = -2_050_000;

function nextSyntheticTypeId(): number {
  const id = syntheticTypeId;
  syntheticTypeId -= 1;
  return id;
}
