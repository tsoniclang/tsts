/**
 * Narrowing through property-access (`if (obj.prop)`).
 *
 * Ported from Strada `checker.go` — narrowTypeByPropertyAccess,
 * narrowTypeByOptionalChainProperty.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Narrows a union type by keeping only constituents whose property
 * `name` matches the literal value.
 */
export function narrowByPropertyValue(
  t: Type,
  name: string,
  value: string | number | boolean,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const propSym = members?.get(name);
    if (propSym === undefined) return false;
    const propType = (propSym as unknown as { type?: Type }).type;
    if (propType === undefined) return false;
    const propValue = (propType as unknown as { value?: unknown }).value;
    return propValue === value;
  });
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Narrows by `obj.prop !== value` — removes constituents whose
 * property matches.
 */
export function narrowByExcludingPropertyValue(
  t: Type,
  name: string,
  value: string | number | boolean,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const propSym = members?.get(name);
    if (propSym === undefined) return true;
    const propType = (propSym as unknown as { type?: Type }).type;
    if (propType === undefined) return true;
    const propValue = (propType as unknown as { value?: unknown }).value;
    return propValue !== value;
  });
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns true when the binary expression is a property-equality
 * check (`obj.prop === value`).
 */
export function isPropertyEqualityCheck(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const operator = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  if (operator !== Kind.EqualsEqualsToken &&
      operator !== Kind.EqualsEqualsEqualsToken) {
    return false;
  }
  const left = (node as unknown as { left?: AstNode }).left;
  return left !== undefined && (
    left.kind === Kind.PropertyAccessExpression ||
    left.kind === Kind.ElementAccessExpression
  );
}

/**
 * Returns the property name being compared in a property-equality
 * check.
 */
export function getEqualityCheckProperty(node: AstNode): string | undefined {
  if (!isPropertyEqualityCheck(node)) return undefined;
  const left = (node as unknown as { left?: AstNode }).left;
  if (left === undefined || left.kind !== Kind.PropertyAccessExpression) return undefined;
  const name = (left as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}
