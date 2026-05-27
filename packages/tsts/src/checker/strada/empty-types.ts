/**
 * Empty-type helpers (`{}`, empty interfaces, empty objects).
 *
 * Ported from Strada `checker.go` — isEmptyObjectType,
 * createEmptyObjectType, isEmptyInterface.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the canonical empty-object type `{}`.
 */
export function getEmptyObjectType(): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__empty", members: new Map() },
  } as unknown as Type;
}

/**
 * Returns true when the type is an empty object — Object flag and
 * zero properties.
 */
export function isEmptyObjectType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members === undefined || members.size === 0;
}

/**
 * Returns true when the type has no callable signatures.
 */
export function hasNoCallSignatures(t: Type): boolean {
  const sigs = (t as unknown as { callSignatures?: readonly unknown[] }).callSignatures;
  return sigs === undefined || sigs.length === 0;
}

/**
 * Returns true when the type has no construct signatures.
 */
export function hasNoConstructSignatures(t: Type): boolean {
  const sigs = (t as unknown as { constructSignatures?: readonly unknown[] }).constructSignatures;
  return sigs === undefined || sigs.length === 0;
}

/**
 * Returns true when the type is "completely empty" — empty object
 * with no signatures and no index signatures.
 */
export function isCompletelyEmpty(t: Type): boolean {
  if (!isEmptyObjectType(t)) return false;
  if (!hasNoCallSignatures(t)) return false;
  if (!hasNoConstructSignatures(t)) return false;
  return true;
}

/**
 * Returns true when the symbol declares an empty interface
 * (no members, no call signatures, no construct signatures).
 */
export function isEmptyInterfaceSymbol(sym: AstSymbol): boolean {
  const members = (sym as unknown as { members?: Map<string, AstSymbol> }).members;
  return members === undefined || members.size === 0;
}
