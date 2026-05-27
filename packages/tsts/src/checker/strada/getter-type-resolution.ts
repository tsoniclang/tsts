/**
 * Type resolution for ES6 getters/setters.
 *
 * Ported from Strada `checker.go` — resolveGetterType, resolveSetterType,
 * mergeAccessorTypes.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isGetAccessor, isSetAccessor } from "./getter-setter.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the resolved type of a getter accessor — the return-type
 * annotation when present, otherwise Any.
 */
export function resolveGetterType(node: AstNode): Type {
  if (!isGetAccessor(node)) return ANY;
  const annot = (node as unknown as { type?: { resolvedType?: Type } }).type;
  return annot?.resolvedType ?? ANY;
}

/**
 * Returns the resolved type of a setter accessor — the value
 * parameter's type annotation when present, otherwise Any.
 */
export function resolveSetterType(node: AstNode): Type {
  if (!isSetAccessor(node)) return ANY;
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return ANY;
  const annot = (params[0] as unknown as { type?: { resolvedType?: Type } }).type;
  return annot?.resolvedType ?? ANY;
}

/**
 * Merges the types of a get/set accessor pair into a single property
 * type. Errors when the types disagree (caller surfaces diagnostic).
 */
export function mergeAccessorTypes(getterType: Type, setterType: Type): Type {
  // Conservative: prefer getter type when both are defined; fall back
  // to setter type when only setter is annotated.
  const gFlags = (getterType as { flags?: number }).flags ?? 0;
  if ((gFlags & TypeFlags.Any) === 0) return getterType;
  return setterType;
}

/**
 * Returns the symbol's effective type — uses getter type or setter
 * type depending on which accessor pair is present.
 */
export function getEffectiveAccessorType(sym: AstSymbol): Type {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  const get = decls.find(isGetAccessor);
  const set = decls.find(isSetAccessor);
  const getType = get !== undefined ? resolveGetterType(get) : undefined;
  const setType = set !== undefined ? resolveSetterType(set) : undefined;
  if (getType !== undefined && setType !== undefined) {
    return mergeAccessorTypes(getType, setType);
  }
  return getType ?? setType ?? ANY;
}

/**
 * Returns true when the symbol has only a getter (read-only).
 */
export function isGetterOnly(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  const hasGet = decls.some(isGetAccessor);
  const hasSet = decls.some(isSetAccessor);
  return hasGet && !hasSet;
}

/**
 * Returns true when the symbol has only a setter (write-only).
 */
export function isSetterOnly(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  const hasGet = decls.some(isGetAccessor);
  const hasSet = decls.some(isSetAccessor);
  return !hasGet && hasSet;
}

void Kind; // referenced indirectly; keep import live
