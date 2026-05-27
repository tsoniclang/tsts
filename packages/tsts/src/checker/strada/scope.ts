/**
 * Scope walker — resolves identifiers up the lexical scope chain.
 *
 * Ported from Strada `checker.go` — resolveName, getSymbolInScope,
 * findFirstAncestor. Used by the symbol resolver and the
 * grammar-checks pass.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the node introduces its own lexical scope.
 */
export function isScopeNode(node: AstNode): boolean {
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
    case Kind.WhileStatement:
    case Kind.DoStatement:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the locals table for a scope node — direct property.
 */
export function getLocals(node: AstNode): Map<string, AstSymbol> | undefined {
  return (node as unknown as { locals?: Map<string, AstSymbol> }).locals;
}

/**
 * Walks up parent chain to find the next enclosing scope.
 */
export function getEnclosingScope(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (isScopeNode(current)) return current;
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Walks up parent chain calling `predicate` until it matches or
 * the chain ends.
 */
export function findFirstAncestor(
  node: AstNode,
  predicate: (n: AstNode) => boolean,
): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Resolves a name in the lexical scope chain starting at `node`.
 * Returns the first symbol whose name matches.
 */
export function resolveNameInScope(node: AstNode, name: string): AstSymbol | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (isScopeNode(current)) {
      const locals = getLocals(current);
      const sym = locals?.get(name);
      if (sym !== undefined) return sym;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns the immediately-enclosing function-like node, or undefined
 * at top-level.
 */
export function getEnclosingFunction(node: AstNode): AstNode | undefined {
  return findFirstAncestor(node, (n) =>
    n.kind === Kind.FunctionDeclaration ||
    n.kind === Kind.FunctionExpression ||
    n.kind === Kind.ArrowFunction ||
    n.kind === Kind.MethodDeclaration ||
    n.kind === Kind.Constructor ||
    n.kind === Kind.GetAccessor ||
    n.kind === Kind.SetAccessor,
  );
}

/**
 * Returns the immediately-enclosing class declaration / expression.
 */
export function getEnclosingClass(node: AstNode): AstNode | undefined {
  return findFirstAncestor(node, (n) =>
    n.kind === Kind.ClassDeclaration ||
    n.kind === Kind.ClassExpression,
  );
}

/**
 * Returns true when the node is at the top of a SourceFile.
 */
export function isAtModuleTopLevel(node: AstNode): boolean {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  return parent !== undefined && parent.kind === Kind.SourceFile;
}
