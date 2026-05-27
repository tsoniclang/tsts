/**
 * Symbol-merge rules.
 *
 * Ported from Strada `binder.go` — getMergedSymbol, mergeSymbol-rules.
 * Determines which symbol kinds can merge (interface + interface,
 * class + namespace, function + namespace, etc.).
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

const ClassFlag = SymbolFlags.Class;
const InterfaceFlag = SymbolFlags.Interface;
const NamespaceFlag = SymbolFlags.Namespace;
const FunctionFlag = SymbolFlags.Function;
const EnumFlag = SymbolFlags.Enum;
const TypeAliasFlag = SymbolFlags.TypeAlias;

/**
 * Returns true when two symbols are mergeable based on TS's
 * declaration-merging rules.
 */
export function areMergeable(a: AstSymbol, b: AstSymbol): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;

  // Same-kind merges
  if ((aFlags & InterfaceFlag) !== 0 && (bFlags & InterfaceFlag) !== 0) return true;
  if ((aFlags & NamespaceFlag) !== 0 && (bFlags & NamespaceFlag) !== 0) return true;
  if ((aFlags & FunctionFlag) !== 0 && (bFlags & FunctionFlag) !== 0) return true;

  // Class + Namespace
  if ((aFlags & ClassFlag) !== 0 && (bFlags & NamespaceFlag) !== 0) return true;
  if ((bFlags & ClassFlag) !== 0 && (aFlags & NamespaceFlag) !== 0) return true;

  // Function + Namespace
  if ((aFlags & FunctionFlag) !== 0 && (bFlags & NamespaceFlag) !== 0) return true;
  if ((bFlags & FunctionFlag) !== 0 && (aFlags & NamespaceFlag) !== 0) return true;

  // Enum + Namespace
  if ((aFlags & EnumFlag) !== 0 && (bFlags & NamespaceFlag) !== 0) return true;
  if ((bFlags & EnumFlag) !== 0 && (aFlags & NamespaceFlag) !== 0) return true;

  return false;
}

/**
 * Returns true when the merge would create an ambiguity (both sides
 * are values that aren't merge-compatible).
 */
export function isMergeAmbiguous(a: AstSymbol, b: AstSymbol): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  const bothValues = (aFlags & SymbolFlags.Value) !== 0 && (bFlags & SymbolFlags.Value) !== 0;
  return bothValues && !areMergeable(a, b);
}

/**
 * Returns true when the symbol can be merged with a TypeAlias
 * (TypeAlias cannot merge with anything else by spec).
 */
export function canMergeWithTypeAlias(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & TypeAliasFlag) !== 0;
}

/**
 * Returns the flags of a merged-symbol — the bitwise-or of the two
 * inputs' flags.
 */
export function getMergedFlags(a: AstSymbol, b: AstSymbol): number {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  return aFlags | bFlags;
}
