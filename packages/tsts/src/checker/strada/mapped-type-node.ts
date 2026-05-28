/**
 * MappedType node handling (`{ [K in Keys]: T }`).
 *
 * Ported from Strada `checker.go` — getTypeFromMappedTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a MappedType.
 */
export function isMappedTypeNode(node: AstNode): boolean {
  return node.kind === Kind.MappedType;
}

/**
 * Returns the key type-parameter declaration of a MappedType
 * (the `K` of `{ [K in Keys]: T }`).
 */
export function getMappedTypeKeyParameter(node: AstNode): AstNode | undefined {
  if (!isMappedTypeNode(node)) return undefined;
  return (node as unknown as { typeParameter?: AstNode }).typeParameter;
}

/**
 * Returns the constraint type-node (`Keys`) of a MappedType.
 */
export function getMappedTypeConstraint(node: AstNode): AstNode | undefined {
  const tp = getMappedTypeKeyParameter(node);
  if (tp === undefined) return undefined;
  return (tp as unknown as { constraint?: AstNode }).constraint;
}

/**
 * Returns the value type-node (`T`) of a MappedType.
 */
export function getMappedTypeValueType(node: AstNode): AstNode | undefined {
  if (!isMappedTypeNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the `as` name-remapping type-node, if present.
 */
export function getMappedTypeNameType(node: AstNode): AstNode | undefined {
  if (!isMappedTypeNode(node)) return undefined;
  return (node as unknown as { nameType?: AstNode }).nameType;
}

/**
 * Returns the optional-modifier token of a MappedType
 * (`?`, `+?`, `-?`), if present.
 */
export function getMappedTypeQuestionToken(node: AstNode): AstNode | undefined {
  if (!isMappedTypeNode(node)) return undefined;
  return (node as unknown as { questionToken?: AstNode }).questionToken;
}

/**
 * Returns the readonly-modifier token of a MappedType
 * (`readonly`, `+readonly`, `-readonly`), if present.
 */
export function getMappedTypeReadonlyToken(node: AstNode): AstNode | undefined {
  if (!isMappedTypeNode(node)) return undefined;
  return (node as unknown as { readonlyToken?: AstNode }).readonlyToken;
}

/**
 * Returns true when the MappedType has a key-remapping `as` clause.
 */
export function hasMappedTypeNameType(node: AstNode): boolean {
  return getMappedTypeNameType(node) !== undefined;
}

/**
 * Returns true when the MappedType adds optionality (`+?` or `?`).
 */
export function addsOptionalModifier(node: AstNode): boolean {
  const token = getMappedTypeQuestionToken(node);
  if (token === undefined) return false;
  return token.kind !== Kind.MinusToken;
}

/**
 * Returns true when the MappedType removes optionality (`-?`).
 */
export function removesOptionalModifier(node: AstNode): boolean {
  const token = getMappedTypeQuestionToken(node);
  return token !== undefined && token.kind === Kind.MinusToken;
}

/**
 * Returns true when the MappedType is homomorphic — its constraint
 * is `keyof T`.
 */
export function isHomomorphicMappedTypeNode(node: AstNode): boolean {
  const constraint = getMappedTypeConstraint(node);
  if (constraint === undefined) return false;
  if (constraint.kind !== Kind.TypeOperator) return false;
  return (constraint as unknown as { operator?: number }).operator === Kind.KeyOfKeyword;
}
