/**
 * TypeLiteral node handling (`{ a: number; b: string }`).
 *
 * Ported from Strada `checker.go` — getTypeFromTypeLiteralNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TypeLiteral.
 */
export function isTypeLiteralNode(node: AstNode): boolean {
  return node.kind === Kind.TypeLiteral;
}

/**
 * Returns the member nodes of a TypeLiteral.
 */
export function getTypeLiteralMembers(node: AstNode): readonly AstNode[] {
  if (!isTypeLiteralNode(node)) return [];
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  return members?.nodes ?? [];
}

/**
 * Returns the property-signature members of a TypeLiteral.
 */
export function getPropertySignatureMembers(node: AstNode): readonly AstNode[] {
  return getTypeLiteralMembers(node).filter(
    (m) => m.kind === Kind.PropertySignature,
  );
}

/**
 * Returns the method-signature members of a TypeLiteral.
 */
export function getMethodSignatureMembers(node: AstNode): readonly AstNode[] {
  return getTypeLiteralMembers(node).filter(
    (m) => m.kind === Kind.MethodSignature,
  );
}

/**
 * Returns the index-signature members of a TypeLiteral.
 */
export function getIndexSignatureMembers(node: AstNode): readonly AstNode[] {
  return getTypeLiteralMembers(node).filter(
    (m) => m.kind === Kind.IndexSignature,
  );
}

/**
 * Returns the call-signature members of a TypeLiteral.
 */
export function getCallSignatureMembers(node: AstNode): readonly AstNode[] {
  return getTypeLiteralMembers(node).filter(
    (m) => m.kind === Kind.CallSignature,
  );
}

/**
 * Returns the construct-signature members of a TypeLiteral.
 */
export function getConstructSignatureMembers(node: AstNode): readonly AstNode[] {
  return getTypeLiteralMembers(node).filter(
    (m) => m.kind === Kind.ConstructSignature,
  );
}

/**
 * Returns true when the TypeLiteral is empty (no members) — `{}`.
 */
export function isEmptyTypeLiteral(node: AstNode): boolean {
  return getTypeLiteralMembers(node).length === 0;
}

/**
 * Returns the property names declared in a TypeLiteral.
 */
export function getTypeLiteralPropertyNames(node: AstNode): readonly string[] {
  const out: string[] = [];
  for (const m of getPropertySignatureMembers(node)) {
    const name = (m as unknown as { name?: AstNode }).name;
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
 * Returns true when the TypeLiteral has a call signature (a
 * function-type shape).
 */
export function isCallableTypeLiteral(node: AstNode): boolean {
  return getCallSignatureMembers(node).length > 0;
}

/**
 * Returns true when the TypeLiteral has an index signature.
 */
export function hasIndexSignatureMember(node: AstNode): boolean {
  return getIndexSignatureMembers(node).length > 0;
}
