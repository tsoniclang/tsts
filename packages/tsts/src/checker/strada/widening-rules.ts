/**
 * Widening rules — when literal types widen vs. preserve narrow.
 *
 * Ported from Strada `checker.go` — getWideningContext,
 * shouldWidenLiteralType, isFreshLiteralContext.
 *
 * Distinct from `widening.ts` (the actual widener) and
 * `widening-context.ts` (per-parent-kind decision).
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a context is "literal-preserving" — `const`
 * declaration with no annotation, or `as const` cast.
 */
export function isLiteralPreservingContext(parent: AstNode): boolean {
  // `const x = "foo"` preserves literal narrowness.
  if (parent.kind === Kind.VariableDeclaration) {
    const list = (parent as unknown as { parent?: AstNode }).parent;
    if (list === undefined) return false;
    const flags = (list as unknown as { flags?: number }).flags ?? 0;
    return (flags & 0x2) !== 0; // NodeFlags.Const
  }
  // `as const` cast.
  if (parent.kind === Kind.AsExpression) {
    const type = (parent as unknown as { type?: AstNode }).type;
    if (type === undefined) return false;
    if (type.kind !== Kind.TypeReference) return false;
    const name = (type as unknown as { typeName?: AstNode }).typeName;
    if (name === undefined || name.kind !== Kind.Identifier) return false;
    return (name as unknown as { escapedText?: string }).escapedText === "const";
  }
  return false;
}

/**
 * Returns true when a context is "widening" — `let`/`var` without
 * an annotation, function argument, return position without expected
 * type.
 */
export function isWideningContext(parent: AstNode): boolean {
  if (parent.kind === Kind.VariableDeclaration) {
    const annotation = (parent as unknown as { type?: AstNode }).type;
    if (annotation !== undefined) return false;
    const list = (parent as unknown as { parent?: AstNode }).parent;
    if (list === undefined) return false;
    const flags = (list as unknown as { flags?: number }).flags ?? 0;
    return (flags & 0x2) === 0; // not Const → let/var widens
  }
  if (parent.kind === Kind.PropertyDeclaration) {
    const annotation = (parent as unknown as { type?: AstNode }).type;
    return annotation === undefined;
  }
  return false;
}

/**
 * Returns true when the literal type is "fresh" — has been marked
 * by a literal expression and not yet widened.
 */
export function isFreshLiteral(t: Type): boolean {
  return (t as unknown as { isFresh?: boolean }).isFresh === true;
}

/**
 * Returns true when the type is a primitive (literal or wider).
 */
export function isPrimitiveType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & (
    TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean |
    TypeFlags.BigInt | TypeFlags.Literal | TypeFlags.Null |
    TypeFlags.Undefined | TypeFlags.Void | TypeFlags.ESSymbol
  )) !== 0;
}

/**
 * Returns true when the type would benefit from widening — has fresh
 * literal markers.
 */
export function wouldBenefitFromWidening(t: Type): boolean {
  if (isFreshLiteral(t)) return true;
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.some(isFreshLiteral);
  }
  return false;
}
