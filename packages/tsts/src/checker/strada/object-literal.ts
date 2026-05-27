/**
 * Object-literal type construction.
 *
 * Ported from Strada `checker.go` — getTypeFromObjectLiteralExpression,
 * createAnonymousType, getPropertyOfObjectLiteral, isObjectLiteralType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Builds an anonymous object type from a property table.
 */
export function createAnonymousObjectType(
  members: Map<string, AstSymbol>,
): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__anonymous", members },
  } as unknown as Type;
}

/**
 * Returns true when the type is an anonymous-object literal — has an
 * Object flag and a `__anonymous` symbol name.
 */
export function isAnonymousObjectLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "__anonymous";
}

/**
 * Returns the property names of an object literal expression.
 */
export function getObjectLiteralPropertyNames(node: AstNode): readonly string[] {
  if (node.kind !== Kind.ObjectLiteralExpression) return [];
  const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties;
  const out: string[] = [];
  for (const p of (props?.nodes ?? [])) {
    const name = (p as unknown as { name?: AstNode }).name;
    if (name === undefined) continue;
    if (name.kind === Kind.Identifier) {
      const text = (name as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
    } else if (name.kind === Kind.StringLiteral) {
      const text = (name as unknown as { text?: string }).text;
      if (text !== undefined) out.push(text);
    }
  }
  return out;
}

/**
 * Returns true when the object literal contains spread properties.
 */
export function hasObjectLiteralSpread(node: AstNode): boolean {
  if (node.kind !== Kind.ObjectLiteralExpression) return false;
  const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties;
  return (props?.nodes ?? []).some((p) => p.kind === Kind.SpreadAssignment);
}

/**
 * Returns true when the object literal has a computed property name.
 */
export function hasComputedPropertyName(node: AstNode): boolean {
  if (node.kind !== Kind.ObjectLiteralExpression) return false;
  const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties;
  return (props?.nodes ?? []).some((p) => {
    const name = (p as unknown as { name?: AstNode }).name;
    return name !== undefined && name.kind === Kind.ComputedPropertyName;
  });
}

/**
 * Returns the assignment-context property kind for an ObjectLiteral
 * property: shorthand, longhand, spread, accessor.
 */
export const ObjectLiteralPropertyKind = {
  Property: 0,
  ShorthandProperty: 1,
  Spread: 2,
  GetAccessor: 3,
  SetAccessor: 4,
  Method: 5,
} as const;

export type ObjectLiteralPropertyKind =
  | typeof ObjectLiteralPropertyKind.Property
  | typeof ObjectLiteralPropertyKind.ShorthandProperty
  | typeof ObjectLiteralPropertyKind.Spread
  | typeof ObjectLiteralPropertyKind.GetAccessor
  | typeof ObjectLiteralPropertyKind.SetAccessor
  | typeof ObjectLiteralPropertyKind.Method;

/**
 * Maps a property node Kind to a coarse classification.
 */
export function getObjectLiteralPropertyKind(prop: AstNode): ObjectLiteralPropertyKind {
  switch (prop.kind) {
    case Kind.PropertyAssignment: return ObjectLiteralPropertyKind.Property;
    case Kind.ShorthandPropertyAssignment: return ObjectLiteralPropertyKind.ShorthandProperty;
    case Kind.SpreadAssignment: return ObjectLiteralPropertyKind.Spread;
    case Kind.GetAccessor: return ObjectLiteralPropertyKind.GetAccessor;
    case Kind.SetAccessor: return ObjectLiteralPropertyKind.SetAccessor;
    case Kind.MethodDeclaration: return ObjectLiteralPropertyKind.Method;
    default: return ObjectLiteralPropertyKind.Property;
  }
}
