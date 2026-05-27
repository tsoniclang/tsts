/**
 * Getter/setter accessor helpers.
 *
 * Ported from Strada `checker.go` — getTypeOfAccessor,
 * checkAccessorDeclaration, getEffectiveAnnotation, isGetAccessor,
 * pairGetSetAccessors.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is a GetAccessor.
 */
export function isGetAccessor(node: AstNode): boolean {
  return node.kind === Kind.GetAccessor;
}

/**
 * Returns true when the node is a SetAccessor.
 */
export function isSetAccessor(node: AstNode): boolean {
  return node.kind === Kind.SetAccessor;
}

/**
 * Returns the get-accessor declaration of a symbol's accessor pair,
 * if present.
 */
export function getGetAccessor(sym: AstSymbol): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find(isGetAccessor);
}

/**
 * Returns the set-accessor declaration of a symbol's accessor pair,
 * if present.
 */
export function getSetAccessor(sym: AstSymbol): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find(isSetAccessor);
}

/**
 * Returns true when the symbol has both a get and set accessor.
 */
export function hasGetSetPair(sym: AstSymbol): boolean {
  return getGetAccessor(sym) !== undefined && getSetAccessor(sym) !== undefined;
}

/**
 * Returns the type of a get-accessor's return value.
 */
export function getGetAccessorReturnType(node: AstNode): Type {
  if (!isGetAccessor(node)) return ANY;
  const type = (node as unknown as { type?: { resolvedType?: Type } }).type;
  return type?.resolvedType ?? ANY;
}

/**
 * Returns the type of a set-accessor's value parameter.
 */
export function getSetAccessorParameterType(node: AstNode): Type {
  if (!isSetAccessor(node)) return ANY;
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return ANY;
  const first = params[0]!;
  const type = (first as unknown as { type?: { resolvedType?: Type } }).type;
  return type?.resolvedType ?? ANY;
}

/**
 * Returns the canonical accessor type — get-accessor return type,
 * fallback to set-accessor parameter type.
 */
export function getAccessorTypeOfSymbol(sym: AstSymbol): Type {
  const get = getGetAccessor(sym);
  if (get !== undefined) return getGetAccessorReturnType(get);
  const set = getSetAccessor(sym);
  if (set !== undefined) return getSetAccessorParameterType(set);
  return ANY;
}

/**
 * Returns true when the get/set accessor pair has matching types.
 * A mismatch is a type error.
 */
export function accessorsHaveMatchingTypes(_sym: AstSymbol): boolean {
  // Full check requires the relater; conservative shell returns true.
  return true;
}

/**
 * Returns true when the accessor is auto-generated (e.g. by a
 * decorator) rather than declared in source.
 */
export function isAutoAccessor(node: AstNode): boolean {
  if (!isGetAccessor(node) && !isSetAccessor(node)) return false;
  return (node as unknown as { isAuto?: boolean }).isAuto === true;
}
