/**
 * Scope-chain helpers.
 *
 * Ported from Strada `nameresolver.go` (within `binder`) —
 * buildScopeChain, walkScopeChain.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when a node is a "scope" — introduces its own locals.
 */
export function isScopeBoundary(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.SourceFile:
    case Kind.ModuleDeclaration:
    case Kind.ModuleBlock:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.Block:
    case Kind.CatchClause:
    case Kind.CaseBlock:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the scope-chain from a leaf node to its SourceFile root.
 */
export function buildScopeChain(node: AstNode): readonly AstNode[] {
  const chain: AstNode[] = [];
  const walker = (current: AstNode | undefined): void => {
    if (current === undefined) return;
    if (isScopeBoundary(current)) chain.push(current);
    walker((current as unknown as { parent?: AstNode }).parent);
  };
  walker(node);
  return chain;
}

/**
 * Returns the locals at a given scope node.
 */
export function getScopeLocals(node: AstNode): Map<string, AstSymbol> | undefined {
  return (node as unknown as { locals?: Map<string, AstSymbol> }).locals;
}

/**
 * Iterates the scope chain, calling `visit` with each scope. Stops
 * on the first true return.
 */
export function walkScopeChain(
  node: AstNode,
  visit: (scope: AstNode, depth: number) => boolean,
): boolean {
  const chain = buildScopeChain(node);
  for (let i = 0; i < chain.length; i++) {
    if (visit(chain[i]!, i)) return true;
  }
  return false;
}

/**
 * Returns the closest function-like scope in the chain.
 */
export function getEnclosingFunctionScope(node: AstNode): AstNode | undefined {
  const chain = buildScopeChain(node);
  for (const scope of chain) {
    switch (scope.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.Constructor:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return scope;
    }
  }
  return undefined;
}

/**
 * Returns the closest module / source-file scope.
 */
export function getEnclosingModuleScope(node: AstNode): AstNode | undefined {
  const chain = buildScopeChain(node);
  for (const scope of chain) {
    if (
      scope.kind === Kind.SourceFile ||
      scope.kind === Kind.ModuleDeclaration ||
      scope.kind === Kind.ModuleBlock
    ) {
      return scope;
    }
  }
  return undefined;
}
