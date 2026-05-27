/**
 * PropertySignature handling (interface body members).
 *
 * Ported from Strada `checker.go` — checkPropertySignature,
 * getTypeOfPropertySignature.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is a PropertySignature.
 */
export function isPropertySignature(node: AstNode): boolean {
  return node.kind === Kind.PropertySignature;
}

/**
 * Returns the type annotation of a PropertySignature.
 */
export function getPropertySignatureType(node: AstNode): AstNode | undefined {
  if (!isPropertySignature(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the resolved type of a PropertySignature.
 */
export function resolvePropertySignatureType(node: AstNode): Type {
  const annot = getPropertySignatureType(node);
  if (annot === undefined) return ANY;
  const resolved = (annot as unknown as { resolvedType?: Type }).resolvedType;
  return resolved ?? ANY;
}

/**
 * Returns true when the property signature is optional (`prop?:`).
 */
export function isOptionalPropertySignature(node: AstNode): boolean {
  if (!isPropertySignature(node)) return false;
  return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
}

/**
 * Returns true when the property signature is readonly.
 */
export function isReadonlyPropertySignature(node: AstNode): boolean {
  if (!isPropertySignature(node)) return false;
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.ReadonlyKeyword) === true;
}

/**
 * Returns the property name of a PropertySignature.
 */
export function getPropertySignatureName(node: AstNode): string | undefined {
  if (!isPropertySignature(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
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
 * Returns the effective type — appends `| undefined` for optional
 * signatures (unless exactOptionalPropertyTypes is enabled).
 */
export function getEffectiveSignatureType(
  node: AstNode,
  exactOptional: boolean,
): Type {
  const t = resolvePropertySignatureType(node);
  if (!isOptionalPropertySignature(node)) return t;
  if (exactOptional) return t;
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Undefined) !== 0) return t;
  return {
    flags: TypeFlags.Union,
    types: [t, { flags: TypeFlags.Undefined } as unknown as Type],
  } as unknown as Type;
}
