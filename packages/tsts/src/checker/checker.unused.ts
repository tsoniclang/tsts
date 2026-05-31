/**
 * Unused identifier diagnostics.
 *
 * TS-Go records candidate declarations during checking and later decides
 * whether their binder symbols were referenced. This module mirrors that
 * separation: registration is append-only, diagnostics are produced only from
 * symbol/reference facts carried on the AST and symbols.
 */

import {
  Kind,
  isIdentifier,
  nodeSymbol,
  type Node as AstNode,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { SymbolFlags } from "../ast/flags.js";
import type { CheckState } from "./checker.checkedtype.js";

export interface UnusedIdentifierRegistry {
  readonly nodes: AstNode[];
}

export function createUnusedIdentifierRegistry(): UnusedIdentifierRegistry {
  return { nodes: [] };
}

export function registerForUnusedIdentifiersCheck(registry: UnusedIdentifierRegistry, node: AstNode): void {
  registry.nodes.push(node);
}

export function checkUnusedIdentifiers(potentiallyUnusedIdentifiers: readonly AstNode[], state: CheckState): void {
  for (const node of potentiallyUnusedIdentifiers) {
    switch (node.kind) {
      case Kind.SourceFile:
      case Kind.ModuleBlock:
      case Kind.Block:
        reportUnusedVariables(node, state);
        break;
      case Kind.ClassDeclaration:
      case Kind.InterfaceDeclaration:
      case Kind.TypeAliasDeclaration:
      case Kind.FunctionDeclaration:
      case Kind.MethodDeclaration:
      case Kind.ArrowFunction:
      case Kind.FunctionExpression:
        checkUnusedTypeParameters(node, state);
        reportUnusedParameters(node, state);
        break;
      case Kind.CaseBlock:
        reportUnusedVariables(node, state);
        break;
      default:
        reportUnusedVariableDeclarations(variableDeclarationsOf(node), state);
        checkUnusedTypeParameters(node, state);
        break;
    }
  }
}

export function isReferenced(symbol: AstSymbol | undefined): boolean {
  if (symbol === undefined) return true;
  const reference = symbol as { isReferenced?: boolean; referenceKinds?: number };
  return reference.isReferenced === true || ((reference.referenceKinds ?? 0) !== 0);
}

export function reportUnusedVariable(location: AstNode, diagnostic: string, state: CheckState): void {
  state.diagnostics.push({ message: diagnosticFor(location, diagnostic) });
}

export function reportUnused(location: AstNode, label: string, state: CheckState): void {
  reportUnusedVariable(location, `${label} is declared but never used`, state);
}

export function unusedIsError(node: AstNode): boolean {
  return node.kind !== Kind.ImportClause
    && node.kind !== Kind.ImportSpecifier
    && node.kind !== Kind.NamespaceImport;
}

export function checkUnusedClassMembers(node: AstNode, state: CheckState): void {
  for (const member of nodeArray((node as { readonly members?: unknown }).members)) {
    const symbol = declarationSymbol(member);
    if (!isReferenced(symbol) && hasPrivateName(member)) {
      reportUnused(member, `Private member ${declarationName(member)}`, state);
    }
  }
}

export function reportUnusedLocal(node: AstNode, state: CheckState): void {
  const symbol = declarationSymbol(node);
  if (!isReferenced(symbol) && !isIdentifierThatStartsWithUnderscore(nameOf(node))) {
    reportUnusedVariable(node, `${declarationName(node)} is declared but its value is never read`, state);
  }
}

export function reportUnusedVariables(node: AstNode, state: CheckState): void {
  for (const declaration of collectDeclarations(node)) {
    reportUnusedLocal(declaration, state);
  }
}

export function reportUnusedParameters(node: AstNode, state: CheckState): void {
  reportUnusedVariableDeclarations(nodeArray((node as { readonly parameters?: unknown }).parameters), state);
}

export function reportUnusedBindingElements(node: AstNode, state: CheckState): void {
  reportUnusedVariableDeclarations(nodeArray((node as { readonly elements?: unknown }).elements), state);
}

export function reportUnusedVariableDeclarations(declarations: readonly AstNode[], state: CheckState): void {
  for (const declaration of declarations) {
    if (isUnreferencedVariableDeclaration(declaration)) {
      const name = nameOf(declaration);
      if (!isIdentifierThatStartsWithUnderscore(name)) {
        reportUnusedVariable(declaration, `${declarationName(declaration)} is declared but its value is never read`, state);
      }
    }
  }
}

export function isUnreferencedVariableDeclaration(declaration: AstNode): boolean {
  return !isReferenced(declarationSymbol(declaration));
}

export function reportUnusedImports(node: AstNode, state: CheckState): void {
  const imports = collectImports(node);
  for (const importNode of imports) {
    const name = nameOf(importNode);
    if (!isIdentifierThatStartsWithUnderscore(name) && !isReferenced(declarationSymbol(importNode))) {
      reportUnusedVariable(importNode, `${declarationName(importNode)} is declared but its value is never read`, state);
    }
  }
}

export function isIdentifierThatStartsWithUnderscore(node: AstNode | undefined): boolean {
  return node !== undefined && isIdentifier(node) && node.text.startsWith("_");
}

export function importClauseFromImported(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.ImportClause) return current;
    current = parentOf(current);
  }
  return undefined;
}

export function checkUnusedInferTypeParameter(typeParameter: AstNode, state: CheckState): void {
  if (isUnreferencedTypeParameter(typeParameter)) {
    reportUnusedVariable(typeParameter, `${declarationName(typeParameter)} is declared but never used`, state);
  }
}

export function checkUnusedTypeParameters(node: AstNode, state: CheckState): void {
  for (const typeParameter of nodeArray((node as { readonly typeParameters?: unknown }).typeParameters)) {
    if (isUnreferencedTypeParameter(typeParameter)) {
      reportUnusedVariable(typeParameter, `${declarationName(typeParameter)} is declared but never used`, state);
    }
  }
}

export function isUnreferencedTypeParameter(typeParameter: AstNode): boolean {
  const symbol = declarationSymbol(typeParameter);
  return !isReferenced(symbol) && !isIdentifierThatStartsWithUnderscore(nameOf(typeParameter));
}

export function checkUnusedRenamedBindingElements(node: AstNode, state: CheckState): void {
  for (const element of nodeArray((node as { readonly elements?: unknown }).elements)) {
    const propertyName = (element as { readonly propertyName?: AstNode }).propertyName;
    if (propertyName !== undefined && isUnreferencedVariableDeclaration(element)) {
      reportUnusedVariable(element, `${declarationName(element)} is declared but its value is never read`, state);
    }
  }
}

function diagnosticFor(location: AstNode, message: string): string {
  const pos = (location as { readonly pos?: number }).pos;
  return pos === undefined ? message : `${message} at ${pos}`;
}

function declarationSymbol(node: AstNode): AstSymbol | undefined {
  return nodeSymbol(node) ?? (node as { readonly symbol?: AstSymbol }).symbol ?? (nameOf(node) === undefined ? undefined : nodeSymbol(nameOf(node)!));
}

function declarationName(node: AstNode): string {
  const name = nameOf(node);
  if (name !== undefined && isIdentifier(name)) return name.text;
  return (node as { readonly name?: { readonly text?: string } }).name?.text ?? "(anonymous)";
}

function nameOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly name?: AstNode } | undefined)?.name;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function hasPrivateName(node: AstNode): boolean {
  const name = nameOf(node);
  return name?.kind === Kind.PrivateIdentifier;
}

function variableDeclarationsOf(node: AstNode): readonly AstNode[] {
  if (node.kind === Kind.VariableDeclaration) return [node];
  const list = (node as { readonly declarationList?: AstNode }).declarationList;
  return list === undefined ? [] : nodeArray((list as { readonly declarations?: unknown }).declarations);
}

function collectDeclarations(root: AstNode): readonly AstNode[] {
  const result: AstNode[] = [];
  visit(root, node => {
    if (node.kind === Kind.VariableDeclaration || node.kind === Kind.Parameter || node.kind === Kind.BindingElement) {
      result.push(node);
    }
  });
  return result;
}

function collectImports(root: AstNode): readonly AstNode[] {
  const result: AstNode[] = [];
  visit(root, node => {
    if (node.kind === Kind.ImportClause || node.kind === Kind.ImportSpecifier || node.kind === Kind.NamespaceImport) {
      result.push(node);
    }
  });
  return result;
}

function visit(node: AstNode, cb: (node: AstNode) => void): void {
  cb(node);
  for (const child of childrenOf(node)) visit(child, cb);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const children: AstNode[] = [];
  for (const key of Object.keys(node as object)) {
    if (key === "parent" || key === "symbol" || key === "locals") continue;
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isAstNode(value)) children.push(value);
    else if (Array.isArray(value)) children.push(...value.filter(isAstNode));
    else if (isNodeArray(value)) children.push(...value.nodes);
  }
  return children;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isAstNode);
  if (isNodeArray(value)) return value.nodes;
  return [];
}

function isNodeArray(value: unknown): value is { readonly nodes: readonly AstNode[] } {
  return typeof value === "object"
    && value !== null
    && Array.isArray((value as { readonly nodes?: unknown }).nodes)
    && (value as { readonly nodes: readonly unknown[] }).nodes.every(isAstNode);
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly kind?: unknown }).kind === "number";
}
