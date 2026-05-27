/**
 * Binder-output cooperation context.
 *
 * Ported from Strada `binder.go` (within `binder`) — the context that
 * the binder produces and the checker consumes (symbol tables,
 * parent-child node references, container chains).
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

export interface BinderOutput {
  readonly fileSymbol: AstSymbol | undefined;
  readonly nodeSymbols: ReadonlyMap<AstNode, AstSymbol>;
  readonly nodeLocals: ReadonlyMap<AstNode, Map<string, AstSymbol>>;
  readonly diagnostics: readonly unknown[];
}

/**
 * Returns an empty binder output.
 */
export function emptyBinderOutput(): BinderOutput {
  return {
    fileSymbol: undefined,
    nodeSymbols: new Map(),
    nodeLocals: new Map(),
    diagnostics: [],
  };
}

/**
 * Returns the symbol attached to a node, or undefined.
 */
export function getSymbolFromBinderOutput(
  output: BinderOutput,
  node: AstNode,
): AstSymbol | undefined {
  return output.nodeSymbols.get(node);
}

/**
 * Returns the locals table for a node, or undefined.
 */
export function getLocalsFromBinderOutput(
  output: BinderOutput,
  node: AstNode,
): Map<string, AstSymbol> | undefined {
  return output.nodeLocals.get(node);
}

/**
 * Returns true when the binder has finished processing a source file.
 */
export function isBound(output: BinderOutput): boolean {
  return output.fileSymbol !== undefined;
}

/**
 * Returns the container node that owns a symbol's declaration.
 */
export function getDeclarationContainer(decl: AstNode): AstNode | undefined {
  const walker = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    switch (current.kind) {
      case Kind.SourceFile:
      case Kind.ModuleDeclaration:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
        return current;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((decl as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns the parent symbol of a symbol — the container that owns
 * its first declaration.
 */
export function getParentSymbol(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { parent?: AstSymbol }).parent;
}
