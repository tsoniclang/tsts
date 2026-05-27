/**
 * Symbol-flag helpers (read-only predicates over the bitmask).
 *
 * Ported from Strada `utilities.go` (within `checker`) — small
 * predicate suite over `SymbolFlags`.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the symbol represents a value (variable,
 * function, class instance, etc.).
 */
export function isValueSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Value) !== 0;
}

/**
 * Returns true when the symbol represents a type (class, interface,
 * type alias, enum, type parameter).
 */
export function isTypeSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Type) !== 0;
}

/**
 * Returns true when the symbol is a namespace (module or
 * namespace value+type).
 */
export function isNamespaceSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Namespace) !== 0;
}

/**
 * Returns true when the symbol is a function (named or callable).
 */
export function isFunctionSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Function) !== 0;
}

/**
 * Returns true when the symbol is a class.
 */
export function isClassFlagSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Class) !== 0;
}

/**
 * Returns true when the symbol is an interface.
 */
export function isInterfaceFlagSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Interface) !== 0;
}

/**
 * Returns true when the symbol is a type alias.
 */
export function isTypeAliasFlagSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.TypeAlias) !== 0;
}

/**
 * Returns true when the symbol is an enum or enum-member.
 */
export function isEnumOrEnumMemberSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & (SymbolFlags.Enum | SymbolFlags.EnumMember)) !== 0;
}

/**
 * Returns true when the symbol is an import-alias (the LHS of
 * `import X from "y"`).
 */
export function isAliasSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Alias) !== 0;
}

/**
 * Returns true when the symbol is optional (declared with `?:`).
 */
export function isOptionalSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Optional) !== 0;
}

/**
 * Returns true when the symbol can be a value in both runtime and
 * type positions — bridging the value/type namespaces.
 */
export function isValueAndTypeSymbol(sym: AstSymbol): boolean {
  return isValueSymbol(sym) && isTypeSymbol(sym);
}
