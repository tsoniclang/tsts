/**
 * Contextual typing for object literals.
 *
 * Ported from Strada `checker.go` — getContextualTypeForObjectLiteral,
 * getContextualPropertyType.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the contextual type for an object-literal property at a
 * given name.
 */
export function getContextualPropertyType(
  contextType: Type,
  propertyName: string,
): Type | undefined {
  const flags = (contextType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return undefined;
  const members = (contextType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  const propSym = members?.get(propertyName);
  if (propSym === undefined) return undefined;
  return (propSym as unknown as { type?: Type }).type;
}

/**
 * Returns true when the contextual type has a declared property
 * with the given name.
 */
export function hasContextualProperty(
  contextType: Type,
  propertyName: string,
): boolean {
  return getContextualPropertyType(contextType, propertyName) !== undefined;
}

/**
 * Returns the contextual index-signature value type, when the
 * receiver has one (e.g. `Record<string, V>`).
 */
export function getContextualIndexType(contextType: Type): Type | undefined {
  const stringInfo = (contextType as unknown as { stringIndexInfo?: { valueType?: Type } }).stringIndexInfo;
  if (stringInfo?.valueType !== undefined) return stringInfo.valueType;
  const numberInfo = (contextType as unknown as { numberIndexInfo?: { valueType?: Type } }).numberIndexInfo;
  return numberInfo?.valueType;
}

/**
 * Returns the contextual property names visible to an object literal
 * — names that the writer can / should set.
 */
export function getContextualPropertyNames(contextType: Type): readonly string[] {
  const flags = (contextType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (contextType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  return [...members.keys()];
}

/**
 * Returns the required (non-optional) contextual property names.
 */
export function getRequiredContextualProperties(contextType: Type): readonly string[] {
  const flags = (contextType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (contextType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  const out: string[] = [];
  for (const [name, sym] of members) {
    const isOptional = (sym as unknown as { isOptional?: boolean }).isOptional === true;
    if (!isOptional) out.push(name);
  }
  return out;
}
