/**
 * Declaration-conflict detection.
 *
 * Ported from Strada `checker.go` — checkConflictingDeclarations,
 * isConflictingDeclaration, getConflictingDeclarationKind.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import { SymbolFlags } from "../../ast/index.js";

/**
 * Returns true when two symbols conflict (i.e. both occupy the same
 * name slot but their flags don't allow merging).
 */
export function isConflictingDeclaration(a: AstSymbol, b: AstSymbol): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;

  // Different-kind value declarations conflict.
  const aIsClass = (aFlags & SymbolFlags.Class) !== 0;
  const bIsClass = (bFlags & SymbolFlags.Class) !== 0;
  if (aIsClass && bIsClass) return true;

  const aIsEnum = (aFlags & SymbolFlags.Enum) !== 0;
  const bIsEnum = (bFlags & SymbolFlags.Enum) !== 0;
  if (aIsEnum && bIsEnum) return false;

  const aIsTypeAlias = (aFlags & SymbolFlags.TypeAlias) !== 0;
  const bIsTypeAlias = (bFlags & SymbolFlags.TypeAlias) !== 0;
  if (aIsTypeAlias || bIsTypeAlias) {
    // TypeAlias conflicts with anything (cannot merge).
    return aIsTypeAlias !== bIsTypeAlias;
  }

  return false;
}

/**
 * Returns the canonical conflict description for diagnostics.
 */
export function getConflictDescription(a: AstSymbol, b: AstSymbol): string {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  if ((aFlags & SymbolFlags.Class) !== 0 && (bFlags & SymbolFlags.Class) !== 0) {
    return "Duplicate class declaration";
  }
  if ((aFlags & SymbolFlags.TypeAlias) !== 0) {
    return "Type alias cannot merge with other declarations";
  }
  if ((bFlags & SymbolFlags.TypeAlias) !== 0) {
    return "Type alias cannot merge with other declarations";
  }
  return "Duplicate declaration";
}

/**
 * Returns true when two block-scoped variables conflict — let/const
 * cannot redeclare.
 */
export function isBlockScopedConflict(a: AstSymbol, b: AstSymbol): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  return (aFlags & SymbolFlags.BlockScopedVariable) !== 0 &&
    (bFlags & SymbolFlags.BlockScopedVariable) !== 0;
}

/**
 * Returns true when the symbol is "ambiguous" — used in incompatible
 * value and type contexts.
 */
export function isAmbiguousSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  // Heuristic: symbol has both Value and Type and they don't come from
  // the merge-compatible source.
  return (flags & SymbolFlags.Value) !== 0 && (flags & SymbolFlags.TypeAlias) !== 0;
}
