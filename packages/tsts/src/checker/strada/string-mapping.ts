/**
 * Intrinsic-string-mapping types: `Uppercase`, `Lowercase`,
 * `Capitalize`, `Uncapitalize`.
 *
 * Ported from Strada `checker.go` — applyStringMapping,
 * getStringMappingType, isStringMappingIntrinsic.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export const StringMappingKind = {
  Uppercase: 0,
  Lowercase: 1,
  Capitalize: 2,
  Uncapitalize: 3,
} as const;

export type StringMappingKind =
  | typeof StringMappingKind.Uppercase
  | typeof StringMappingKind.Lowercase
  | typeof StringMappingKind.Capitalize
  | typeof StringMappingKind.Uncapitalize;

/**
 * Returns true when the symbol name is one of the four intrinsic
 * string-mapping types.
 */
export function isStringMappingIntrinsicName(name: string): boolean {
  return (
    name === "Uppercase" ||
    name === "Lowercase" ||
    name === "Capitalize" ||
    name === "Uncapitalize"
  );
}

/**
 * Returns the StringMappingKind for a given intrinsic name.
 */
export function getStringMappingKind(name: string): StringMappingKind | undefined {
  switch (name) {
    case "Uppercase": return StringMappingKind.Uppercase;
    case "Lowercase": return StringMappingKind.Lowercase;
    case "Capitalize": return StringMappingKind.Capitalize;
    case "Uncapitalize": return StringMappingKind.Uncapitalize;
    default: return undefined;
  }
}

/**
 * Applies a string mapping to a literal value.
 */
export function applyStringMapping(kind: StringMappingKind, value: string): string {
  switch (kind) {
    case StringMappingKind.Uppercase: return value.toUpperCase();
    case StringMappingKind.Lowercase: return value.toLowerCase();
    case StringMappingKind.Capitalize:
      return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
    case StringMappingKind.Uncapitalize:
      return value.length === 0 ? value : value[0]!.toLowerCase() + value.slice(1);
    default: return value;
  }
}

/**
 * Applies a string mapping to a Type — returns a new literal type
 * when the operand is a string-literal type; otherwise returns the
 * operand unchanged.
 */
export function applyStringMappingType(kind: StringMappingKind, operand: Type): Type {
  const flags = (operand as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) return operand;
  const value = (operand as unknown as { value?: string }).value;
  if (value === undefined) return operand;
  return {
    flags: TypeFlags.StringLiteral,
    value: applyStringMapping(kind, value),
  } as unknown as Type;
}

/**
 * Returns the intrinsic name of a string-mapping kind.
 */
export function stringMappingName(kind: StringMappingKind): string {
  switch (kind) {
    case StringMappingKind.Uppercase: return "Uppercase";
    case StringMappingKind.Lowercase: return "Lowercase";
    case StringMappingKind.Capitalize: return "Capitalize";
    case StringMappingKind.Uncapitalize: return "Uncapitalize";
    default: return "Unknown";
  }
}
