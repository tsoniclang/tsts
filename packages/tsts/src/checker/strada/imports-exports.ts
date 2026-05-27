/**
 * Alias / import-export resolution.
 *
 * Ported from Strada `checker.go` — resolveAlias, getAliasTarget,
 * getExportOfModule, getExportsOfModule. Routes through the symbol's
 * declaration graph and the module's exports table.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../../ast/index.js";

/**
 * Walks a chain of aliases until the underlying symbol is reached.
 * Cycle-safe — bounded by a visited set.
 */
export function resolveAlias(symbol: AstSymbol | undefined, getTarget: (s: AstSymbol) => AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  const seen = new Set<AstSymbol>();
  let current: AstSymbol | undefined = symbol;
  while (current !== undefined && !seen.has(current)) {
    seen.add(current);
    const next = getTarget(current);
    if (next === undefined) return current;
    current = next;
  }
  return current;
}

/**
 * Returns true when the symbol's first declaration is a type-only
 * alias (import type {x}, export type {x}, or an ImportClause /
 * ExportDeclaration / ImportEquals with isTypeOnly === true).
 */
export function isTypeOnlyAliasDeclaration(symbol: AstSymbol): boolean {
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  for (const d of decls) {
    if ((d as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return true;
    let p: AstNode | undefined = (d as unknown as { parent?: AstNode }).parent;
    while (p !== undefined) {
      const k = (p as { kind?: number }).kind;
      if (k === Kind.ImportClause || k === Kind.ExportDeclaration || k === Kind.ImportEqualsDeclaration) {
        if ((p as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return true;
        break;
      }
      p = (p as unknown as { parent?: AstNode }).parent;
    }
  }
  return false;
}

/**
 * Returns the alias-target declaration for a symbol, if any.
 */
export function getDeclarationOfAliasSymbol(symbol: AstSymbol): AstNode | undefined {
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  for (const d of decls) {
    const k = (d as { kind?: number }).kind;
    if (k === Kind.ImportClause || k === Kind.ImportSpecifier ||
        k === Kind.NamespaceImport || k === Kind.ImportEqualsDeclaration ||
        k === Kind.ExportSpecifier || k === Kind.ExportAssignment) return d;
  }
  return undefined;
}

/**
 * Returns the SymbolTable that holds a module's resolved exports.
 */
export function getExportsOfModule(moduleSymbol: AstSymbol): SymbolTable {
  return (moduleSymbol as unknown as { exports?: SymbolTable }).exports ?? new Map();
}

/**
 * Look up a single exported name on a module.
 */
export function getExportOfModule(moduleSymbol: AstSymbol, name: string): AstSymbol | undefined {
  return getExportsOfModule(moduleSymbol).get(name);
}

/**
 * Returns true when the module is an ES module (i.e. has an
 * `externalModuleIndicator` SourceFile field).
 */
export function isExternalModule(file: AstNode): boolean {
  return (file as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
}

/**
 * Returns the canonical 'default' export of a module symbol.
 */
export function getDefaultExportOfModule(moduleSymbol: AstSymbol): AstSymbol | undefined {
  return getExportOfModule(moduleSymbol, "default");
}

/**
 * Marks an alias symbol as "referenced" so the emitter retains its
 * import declaration. Used by the printer's emit pipeline.
 */
export function markAliasReferenced(symbol: AstSymbol): void {
  (symbol as unknown as { isReferenced?: boolean }).isReferenced = true;
}

export function isAliasReferenced(symbol: AstSymbol): boolean {
  return (symbol as unknown as { isReferenced?: boolean }).isReferenced === true;
}
