/**
 * Built-in utility-type detection.
 *
 * Ported from Strada `checker.go` — recognizes intrinsic utility
 * types by name and dispatches to their resolver.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

export const UtilityTypeNames = {
  Partial: "Partial",
  Required: "Required",
  Readonly: "Readonly",
  Pick: "Pick",
  Omit: "Omit",
  Record: "Record",
  Exclude: "Exclude",
  Extract: "Extract",
  NonNullable: "NonNullable",
  Parameters: "Parameters",
  ConstructorParameters: "ConstructorParameters",
  ReturnType: "ReturnType",
  InstanceType: "InstanceType",
  ThisParameterType: "ThisParameterType",
  OmitThisParameter: "OmitThisParameter",
  ThisType: "ThisType",
  Uppercase: "Uppercase",
  Lowercase: "Lowercase",
  Capitalize: "Capitalize",
  Uncapitalize: "Uncapitalize",
  Awaited: "Awaited",
  NoInfer: "NoInfer",
} as const;

const utilityNameSet: ReadonlySet<string> = new Set<string>(Object.values(UtilityTypeNames));

/**
 * Returns true when the symbol name is a built-in utility type.
 */
export function isUtilityTypeName(name: string): boolean {
  return utilityNameSet.has(name);
}

/**
 * Returns the canonical category of a utility type — used by the
 * type renderer to surface the utility name in diagnostics.
 */
export function getUtilityTypeCategory(t: Type): string | undefined {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  const name = sym?.name;
  if (name === undefined) return undefined;
  return isUtilityTypeName(name) ? name : undefined;
}

/**
 * Returns true when the symbol references one of the utility types.
 */
export function isUtilitySymbol(sym: AstSymbol): boolean {
  const name = (sym as unknown as { name?: string }).name;
  return name !== undefined && isUtilityTypeName(name);
}

/**
 * Returns the arity of a utility type — how many type arguments it
 * expects.
 */
export function getUtilityTypeArity(name: string): number {
  switch (name) {
    case "Partial":
    case "Required":
    case "Readonly":
    case "NonNullable":
    case "Parameters":
    case "ConstructorParameters":
    case "ReturnType":
    case "InstanceType":
    case "ThisParameterType":
    case "OmitThisParameter":
    case "ThisType":
    case "Uppercase":
    case "Lowercase":
    case "Capitalize":
    case "Uncapitalize":
    case "Awaited":
    case "NoInfer":
      return 1;
    case "Pick":
    case "Omit":
    case "Record":
    case "Exclude":
    case "Extract":
      return 2;
    default:
      return 0;
  }
}
