/**
 * Symbol resolution helpers.
 *
 * Ported from Strada `checker.go` — getSymbol family that walks the
 * binder's lexical scope chain to find a symbol by name.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../../ast/index.js";

export function getSymbol(name: string, location: AstNode | undefined, meaning: number): AstSymbol | undefined {
  void meaning;
  let n: AstNode | undefined = location;
  while (n !== undefined) {
    const locals = (n as unknown as { locals?: SymbolTable }).locals;
    if (locals !== undefined) {
      const found = locals.get(name);
      if (found !== undefined) return found;
    }
    const sym = (n as unknown as { symbol?: AstSymbol }).symbol;
    const exports = sym !== undefined ? (sym as unknown as { exports?: SymbolTable }).exports : undefined;
    if (exports !== undefined) {
      const found = exports.get(name);
      if (found !== undefined) return found;
    }
    const members = sym !== undefined ? (sym as unknown as { members?: SymbolTable }).members : undefined;
    if (members !== undefined) {
      const found = members.get(name);
      if (found !== undefined) return found;
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

export function getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
  const direct = (node as unknown as { symbol?: AstSymbol }).symbol;
  if (direct !== undefined) return direct;
  return (node as unknown as { resolvedSymbol?: AstSymbol }).resolvedSymbol;
}

export function getSymbolOfNode(node: AstNode): AstSymbol | undefined {
  return getSymbolAtLocation(node);
}

export function getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined {
  return (node as unknown as { symbol?: AstSymbol }).symbol;
}

export function getSymbolFlags(symbol: AstSymbol): number {
  return (symbol as unknown as { flags?: number }).flags ?? 0;
}

export function getSymbolFromTypeReference(node: AstNode): AstSymbol | undefined {
  const typeName = (node as unknown as { typeName?: AstNode }).typeName;
  return typeName !== undefined ? getSymbolAtLocation(typeName) : undefined;
}

export function resolveSymbol(symbol: AstSymbol | undefined): AstSymbol | undefined {
  return symbol;
}

void Kind;
