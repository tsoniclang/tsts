/**
 * Object-type construction (TypeLiteral, interface body).
 *
 * Ported from Strada `checker.go` — getTypeFromTypeLiteral,
 * getDeclaredTypeOfInterface, mergeInterfaceMembers.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the members of a TypeLiteral node.
 */
export function getTypeLiteralMembers(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.TypeLiteral) return [];
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  return members?.nodes ?? [];
}

/**
 * Returns the property name of a TypeElement (PropertySignature etc.).
 */
export function getTypeElementName(member: AstNode): string | undefined {
  const name = (member as unknown as { name?: AstNode }).name;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  if (name.kind === Kind.NumericLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns true when the type-element is an index signature.
 */
export function isIndexSignatureMember(member: AstNode): boolean {
  return member.kind === Kind.IndexSignature;
}

/**
 * Returns true when the type-element is a call signature.
 */
export function isCallSignatureMember(member: AstNode): boolean {
  return member.kind === Kind.CallSignature;
}

/**
 * Returns true when the type-element is a construct signature.
 */
export function isConstructSignatureMember(member: AstNode): boolean {
  return member.kind === Kind.ConstructSignature;
}

/**
 * Returns true when the type-element is a property/method signature.
 */
export function isPropertySignatureMember(member: AstNode): boolean {
  return (
    member.kind === Kind.PropertySignature ||
    member.kind === Kind.MethodSignature
  );
}

/**
 * Constructs an anonymous object type from a list of property symbols.
 */
export function createObjectTypeFromMembers(
  memberSymbols: readonly AstSymbol[],
): Type {
  const members = new Map<string, AstSymbol>();
  for (const sym of memberSymbols) {
    const name = (sym as unknown as { name?: string }).name;
    if (name !== undefined) members.set(name, sym);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__type", members },
  } as unknown as Type;
}

/**
 * Returns the flags suitable for a synthetic property symbol of a
 * TypeLiteral member.
 */
export function getPropertySymbolFlags(_member: AstNode): number {
  return SymbolFlags.Property;
}
