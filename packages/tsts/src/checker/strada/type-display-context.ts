/**
 * Type display-context — controls how types render in diagnostics
 * and quick-info.
 *
 * Ported from Strada `printer.go` (within `checker`) — TypeFormatFlags
 * and the rendering options that affect output.
 */

export const TypeFormatFlags = {
  None: 0,
  NoTruncation: 1 << 0,
  WriteArrayAsGenericType: 1 << 1,
  UseStructuralFallback: 1 << 3,
  WriteTypeArgumentsOfSignature: 1 << 5,
  UseFullyQualifiedType: 1 << 6,
  SuppressAnyReturnType: 1 << 8,
  MultilineObjectLiterals: 1 << 10,
  WriteClassExpressionAsTypeLiteral: 1 << 11,
  UseTypeOfFunction: 1 << 12,
  OmitParameterModifiers: 1 << 13,
  UseAliasDefinedOutsideCurrentScope: 1 << 14,
  UseSingleQuotesForStringLiteralType: 1 << 28,
  NoTypeReduction: 1 << 29,
  OmitThisParameter: 1 << 25,
  AllowUniqueESSymbolType: 1 << 20,
  AddUndefined: 1 << 17,
  WriteArrowStyleSignature: 1 << 18,
  InArrayType: 1 << 19,
  InElementType: 1 << 21,
  InFirstTypeArgument: 1 << 22,
  InTypeAlias: 1 << 23,
  NodeBuilderFlagsMask: 0,
} as const;

export type TypeFormatFlags = number;

/**
 * Returns true when a specific flag is set.
 */
export function hasFlag(flags: TypeFormatFlags, mask: TypeFormatFlags): boolean {
  return (flags & mask) !== 0;
}

/**
 * Adds a flag, returning the combined bitmask.
 */
export function withFlag(flags: TypeFormatFlags, mask: TypeFormatFlags): TypeFormatFlags {
  return flags | mask;
}

/**
 * Removes a flag, returning the cleared bitmask.
 */
export function withoutFlag(flags: TypeFormatFlags, mask: TypeFormatFlags): TypeFormatFlags {
  return flags & ~mask;
}

/**
 * The default flag set for diagnostic-type rendering.
 */
export const DefaultDiagnosticTypeFormatFlags: TypeFormatFlags =
  TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

/**
 * The default flag set for quick-info hover rendering.
 */
export const DefaultQuickInfoTypeFormatFlags: TypeFormatFlags =
  TypeFormatFlags.NoTruncation |
  TypeFormatFlags.UseStructuralFallback;

/**
 * Returns the rendering scope for a type, based on the format flags.
 */
export function getRenderingScope(flags: TypeFormatFlags): "array" | "element" | "type-arg" | "alias" | "default" {
  if (hasFlag(flags, TypeFormatFlags.InArrayType)) return "array";
  if (hasFlag(flags, TypeFormatFlags.InElementType)) return "element";
  if (hasFlag(flags, TypeFormatFlags.InFirstTypeArgument)) return "type-arg";
  if (hasFlag(flags, TypeFormatFlags.InTypeAlias)) return "alias";
  return "default";
}

/**
 * Returns true when the rendering context permits truncation of long
 * type expansions.
 */
export function permitsTruncation(flags: TypeFormatFlags): boolean {
  return !hasFlag(flags, TypeFormatFlags.NoTruncation);
}

