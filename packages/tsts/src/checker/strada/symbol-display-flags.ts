/**
 * Symbol-display flags for the renderer.
 *
 * Ported from Strada `printer.go` (within `checker`) — SymbolFormatFlags
 * that control how a symbol's name renders in diagnostics.
 */

export const SymbolFormatFlags = {
  None: 0,
  WriteTypeParametersOrArguments: 1 << 0,
  UseOnlyExternalAliasing: 1 << 1,
  AllowAnyNodeKind: 1 << 2,
  UseAliasDefinedOutsideCurrentScope: 1 << 3,
  WriteComputedProps: 1 << 4,
  DoNotIncludeSymbolChain: 1 << 5,
} as const;

export type SymbolFormatFlags = number;

/**
 * Returns true when a flag is set in the bitmask.
 */
export function hasSymbolFormatFlag(
  flags: SymbolFormatFlags,
  mask: SymbolFormatFlags,
): boolean {
  return (flags & mask) !== 0;
}

/**
 * Adds a flag, returning the combined bitmask.
 */
export function withSymbolFormatFlag(
  flags: SymbolFormatFlags,
  mask: SymbolFormatFlags,
): SymbolFormatFlags {
  return flags | mask;
}

/**
 * Removes a flag, returning the cleared bitmask.
 */
export function withoutSymbolFormatFlag(
  flags: SymbolFormatFlags,
  mask: SymbolFormatFlags,
): SymbolFormatFlags {
  return flags & ~mask;
}

/**
 * Returns true when the formatter should write the symbol chain.
 */
export function shouldWriteChain(flags: SymbolFormatFlags): boolean {
  return !hasSymbolFormatFlag(flags, SymbolFormatFlags.DoNotIncludeSymbolChain);
}

/**
 * Returns true when the formatter should include type parameters.
 */
export function shouldWriteTypeParameters(flags: SymbolFormatFlags): boolean {
  return hasSymbolFormatFlag(flags, SymbolFormatFlags.WriteTypeParametersOrArguments);
}

/**
 * The default flag set for diagnostic symbol rendering.
 */
export const DefaultDiagnosticSymbolFormat: SymbolFormatFlags =
  SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope;
