/**
 * `globalThis` and global-scope helpers.
 *
 * Ported from Strada `checker.go` — getGlobalThisSymbol, getGlobalSymbol,
 * isUsedInGlobalScope.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the identifier is the literal `globalThis`.
 */
export function isGlobalThisIdentifier(node: AstNode): boolean {
  if (node.kind !== Kind.Identifier) return false;
  return (node as unknown as { escapedText?: string }).escapedText === "globalThis";
}

/**
 * Returns true when the node is at module-top-level (not inside any
 * function, class, or block).
 */
export function isAtGlobalScope(node: AstNode): boolean {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.SourceFile:
        return true;
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.Constructor:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.ModuleDeclaration:
      case Kind.ModuleBlock:
        return false;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}

/**
 * Returns the globalThis symbol from a source-file root, if cached.
 */
export function getGlobalThisSymbol(
  sourceFile: AstNode | undefined,
): AstSymbol | undefined {
  if (sourceFile === undefined) return undefined;
  const locals = (sourceFile as unknown as { locals?: Map<string, AstSymbol> }).locals;
  return locals?.get("globalThis");
}

/**
 * Returns the merged symbol table for a module's exports.
 */
export function getModuleExports(
  moduleSymbol: AstSymbol | undefined,
): Map<string, AstSymbol> | undefined {
  if (moduleSymbol === undefined) return undefined;
  return (moduleSymbol as unknown as { exports?: Map<string, AstSymbol> }).exports;
}
