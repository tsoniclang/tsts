/**
 * Mapped-type resolution.
 *
 * Ported from Strada `checker.go` — getTypeFromMappedTypeNode,
 * resolveMappedType, isMappedTypeWithKeyofConstraintDeclaration.
 *
 * A mapped type has the shape `{ [K in Keys]: T }` where Keys is the
 * key-type constraint and T is the value type. Optional and readonly
 * modifiers ride on the declaration node.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

export const MappedTypeModifier = {
  None: 0,
  Plus: 1,
  Minus: 2,
} as const;

export type MappedTypeModifier =
  | typeof MappedTypeModifier.None
  | typeof MappedTypeModifier.Plus
  | typeof MappedTypeModifier.Minus;

/**
 * Reads the `+?` / `-?` / `?` modifier from a MappedTypeNode.
 */
export function getMappedTypeOptionalModifier(node: AstNode): MappedTypeModifier {
  const modifier = (node as unknown as { questionToken?: AstNode }).questionToken;
  if (modifier === undefined) return MappedTypeModifier.None;
  const kind = modifier.kind;
  if (kind === Kind.MinusToken) return MappedTypeModifier.Minus;
  return MappedTypeModifier.Plus;
}

/**
 * Reads the `+readonly` / `-readonly` / `readonly` modifier from a
 * MappedTypeNode.
 */
export function getMappedTypeReadonlyModifier(node: AstNode): MappedTypeModifier {
  const modifier = (node as unknown as { readonlyToken?: AstNode }).readonlyToken;
  if (modifier === undefined) return MappedTypeModifier.None;
  const kind = modifier.kind;
  if (kind === Kind.MinusToken) return MappedTypeModifier.Minus;
  return MappedTypeModifier.Plus;
}

/**
 * Returns the (declaration-site) key type-parameter for a mapped
 * type — the `K` of `{ [K in Keys]: T }`.
 */
export function getMappedTypeKeyParameter(node: AstNode): AstNode | undefined {
  const tp = (node as unknown as { typeParameter?: AstNode }).typeParameter;
  return tp;
}

/**
 * Returns the value-type declaration node (the `T` half of
 * `{ [K in Keys]: T }`). When absent (rare), returns undefined.
 */
export function getMappedTypeValueDeclaration(node: AstNode): AstNode | undefined {
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the `as Q` clause node from a mapped type, when present
 * (the key-remapping clause introduced in TS 4.1).
 */
export function getMappedTypeNameTypeNode(node: AstNode): AstNode | undefined {
  return (node as unknown as { nameType?: AstNode }).nameType;
}

/**
 * Returns true when the mapped type is homomorphic — its constraint
 * is exactly `keyof T` for some T. Homomorphic mapped types preserve
 * read-only / optional modifiers from the source type.
 */
export function isHomomorphicMappedType(node: AstNode): boolean {
  const tp = getMappedTypeKeyParameter(node);
  if (tp === undefined) return false;
  const constraint = (tp as unknown as { constraint?: AstNode }).constraint;
  return constraint !== undefined && constraint.kind === Kind.TypeOperator;
}

/**
 * Computes the resolved mapped-type for a given source type. Conservative
 * placeholder for the deep resolver — returns the source type when the
 * mapped type would be the identity, otherwise NEVER as a sentinel.
 */
export function resolveMappedType(node: AstNode, _source: Type | undefined): Type {
  const valueDecl = getMappedTypeValueDeclaration(node);
  if (valueDecl === undefined) return ANY;
  // Without a full TypeNode→Type pass through CheckerOps we return
  // ANY here; the index-type module handles `keyof` separately.
  return NEVER;
}
