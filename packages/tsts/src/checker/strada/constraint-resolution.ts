/**
 * Type-parameter constraint resolution.
 *
 * Ported from Strada `checker.go` — getConstraintOfTypeParameter,
 * getBaseConstraintOfType, simplifyConstraint.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Returns true when the type is a TypeParameter.
 */
export function isTypeParameter(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.TypeParameter) !== 0;
}

/**
 * Returns the constraint type-node of a TypeParameter declaration.
 */
export function getConstraintNode(decl: AstNode): AstNode | undefined {
  if (decl.kind !== Kind.TypeParameter) return undefined;
  return (decl as unknown as { constraint?: AstNode }).constraint;
}

/**
 * Returns the default type-node of a TypeParameter declaration.
 */
export function getDefaultTypeNode(decl: AstNode): AstNode | undefined {
  if (decl.kind !== Kind.TypeParameter) return undefined;
  return (decl as unknown as { default?: AstNode }).default;
}

/**
 * Returns the constraint of a TypeParameter symbol — resolved type
 * when present, or `unknown` as the default.
 */
export function getConstraintOfTypeParameter(sym: AstSymbol): Type {
  const constraint = (sym as unknown as { constraint?: Type }).constraint;
  return constraint ?? UNKNOWN;
}

/**
 * Returns the default type of a TypeParameter, or undefined.
 */
export function getDefaultOfTypeParameter(sym: AstSymbol): Type | undefined {
  return (sym as unknown as { defaultType?: Type }).defaultType;
}

/**
 * Returns the "base constraint" of an arbitrary type — recursively
 * walks TypeParameter constraints until a non-parameter is reached.
 */
export function getBaseConstraint(t: Type): Type {
  if (!isTypeParameter(t)) return t;
  const constraint = (t as unknown as { constraint?: Type }).constraint;
  if (constraint === undefined) return ANY;
  return getBaseConstraint(constraint);
}

/**
 * Returns the "apparent type" of a type — its constraint when it's
 * a TypeParameter; otherwise the type itself.
 */
export function getApparentType(t: Type): Type {
  if (!isTypeParameter(t)) return t;
  return getBaseConstraint(t);
}

/**
 * Returns true when the TypeParameter has an explicit constraint.
 */
export function hasConstraint(sym: AstSymbol): boolean {
  return (sym as unknown as { constraint?: Type }).constraint !== undefined;
}

/**
 * Returns true when the TypeParameter has a default type.
 */
export function hasDefault(sym: AstSymbol): boolean {
  return (sym as unknown as { defaultType?: Type }).defaultType !== undefined;
}

/**
 * Returns the canonical narrowed constraint when both an explicit
 * constraint and a contextual narrowing are present.
 */
export function intersectConstraints(a: Type | undefined, b: Type | undefined): Type {
  if (a === undefined) return b ?? UNKNOWN;
  if (b === undefined) return a;
  return { flags: TypeFlags.Intersection, types: [a, b] } as unknown as Type;
}
