/**
 * ParenthesizedType / RestType / OptionalType node helpers.
 *
 * Ported from Strada `checker.go` — getTypeFromParenthesizedTypeNode,
 * getTypeFromRestTypeNode, getTypeFromOptionalTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a ParenthesizedType.
 */
export function isParenthesizedTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ParenthesizedType;
}

/**
 * Returns the inner type of a ParenthesizedType.
 */
export function getParenthesizedInnerType(node: AstNode): AstNode | undefined {
  if (!isParenthesizedTypeNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Unwraps nested parentheses to the innermost non-parenthesized type.
 */
export function unwrapParentheses(node: AstNode): AstNode {
  let current = node;
  while (isParenthesizedTypeNode(current)) {
    const inner = getParenthesizedInnerType(current);
    if (inner === undefined) break;
    current = inner;
  }
  return current;
}

/**
 * Returns true when the node is a RestType (`...T[]`).
 */
export function isRestTypeNode(node: AstNode): boolean {
  return node.kind === Kind.RestType;
}

/**
 * Returns the inner type of a RestType.
 */
export function getRestInnerType(node: AstNode): AstNode | undefined {
  if (!isRestTypeNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns true when the node is an OptionalType (`T?` in a tuple).
 */
export function isOptionalTypeNode(node: AstNode): boolean {
  return node.kind === Kind.OptionalType;
}

/**
 * Returns the inner type of an OptionalType.
 */
export function getOptionalInnerType(node: AstNode): AstNode | undefined {
  if (!isOptionalTypeNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns true when the node is a NamedTupleMember (`[x: T]`).
 */
export function isNamedTupleMemberNode(node: AstNode): boolean {
  return node.kind === Kind.NamedTupleMember;
}

/**
 * Returns the inner type of a NamedTupleMember.
 */
export function getNamedTupleMemberType(node: AstNode): AstNode | undefined {
  if (!isNamedTupleMemberNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the label of a NamedTupleMember.
 */
export function getNamedTupleMemberLabel(node: AstNode): string | undefined {
  if (!isNamedTupleMemberNode(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when a NamedTupleMember is optional (`[x?: T]`).
 */
export function isOptionalNamedTupleMember(node: AstNode): boolean {
  if (!isNamedTupleMemberNode(node)) return false;
  return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
}

/**
 * Returns the deeply-unwrapped element type, peeling parens,
 * optional, and rest wrappers.
 */
export function getDeepElementType(node: AstNode): AstNode {
  let current = node;
  const ref: { changed: boolean } = { changed: true };
  while (ref.changed) {
    ref.changed = false;
    if (isParenthesizedTypeNode(current)) {
      const inner = getParenthesizedInnerType(current);
      if (inner !== undefined) { current = inner; ref.changed = true; continue; }
    }
    if (isOptionalTypeNode(current)) {
      const inner = getOptionalInnerType(current);
      if (inner !== undefined) { current = inner; ref.changed = true; continue; }
    }
    if (isRestTypeNode(current)) {
      const inner = getRestInnerType(current);
      if (inner !== undefined) { current = inner; ref.changed = true; continue; }
    }
    if (isNamedTupleMemberNode(current)) {
      const inner = getNamedTupleMemberType(current);
      if (inner !== undefined) { current = inner; ref.changed = true; continue; }
    }
  }
  return current;
}
