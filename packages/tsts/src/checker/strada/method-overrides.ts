/**
 * `override` modifier validation.
 *
 * Ported from Strada `checker.go` — checkOverrideModifier,
 * isOverrideCompatible, getOverridenMember.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import { hasOverrideModifier } from "./modifiers.js";

/**
 * Returns true when a member has the `override` modifier.
 */
export function hasOverrideKeyword(node: AstNode): boolean {
  return hasOverrideModifier(node);
}

/**
 * Returns the name of a member that bears the override modifier.
 */
export function getOverrideMemberName(node: AstNode): string | undefined {
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns the overridden member symbol from the base class symbol.
 */
export function findOverriddenMember(
  baseClassSym: AstSymbol,
  name: string,
): AstSymbol | undefined {
  const members = (baseClassSym as unknown as { members?: Map<string, AstSymbol> }).members;
  return members?.get(name);
}

/**
 * Returns true when the override modifier is misused — applied to a
 * member with no matching base.
 */
export function isInvalidOverride(
  node: AstNode,
  baseClassSym: AstSymbol | undefined,
): boolean {
  if (!hasOverrideKeyword(node)) return false;
  if (baseClassSym === undefined) return true;
  const memberName = getOverrideMemberName(node);
  if (memberName === undefined) return false;
  return findOverriddenMember(baseClassSym, memberName) === undefined;
}

/**
 * Returns true when the member should bear an `override` modifier
 * (its name matches a base member but the modifier is absent).
 */
export function isMissingOverride(
  node: AstNode,
  baseClassSym: AstSymbol | undefined,
): boolean {
  if (hasOverrideKeyword(node)) return false;
  if (baseClassSym === undefined) return false;
  const memberName = getOverrideMemberName(node);
  if (memberName === undefined) return false;
  return findOverriddenMember(baseClassSym, memberName) !== undefined;
}

/**
 * Returns true when the member kind supports the `override` modifier.
 */
export function canHaveOverrideModifier(node: AstNode): boolean {
  return (
    node.kind === Kind.MethodDeclaration ||
    node.kind === Kind.PropertyDeclaration ||
    node.kind === Kind.GetAccessor ||
    node.kind === Kind.SetAccessor
  );
}
