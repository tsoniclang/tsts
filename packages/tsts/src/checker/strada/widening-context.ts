/**
 * Type-widening contexts.
 *
 * Ported from Strada `checker.go` — getContextualType-driven widening:
 * when a literal is in a context that has an explicit annotation, the
 * literal stays fresh; without one, it widens to its primitive.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the parent context preserves the literal's
 * freshness — i.e. has an explicit type annotation.
 */
export function preservesLiteralType(parent: AstNode): boolean {
  switch (parent.kind) {
    case Kind.VariableDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.Parameter: {
      const type = (parent as unknown as { type?: AstNode }).type;
      return type !== undefined;
    }
    case Kind.AsExpression:
    case Kind.TypeAssertionExpression:
    case Kind.SatisfiesExpression:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the parent is a `const` variable declaration —
 * `const` preserves literal-narrow types.
 */
export function isConstDeclaration(parent: AstNode): boolean {
  if (parent.kind !== Kind.VariableDeclaration) return false;
  // Walk to the VariableDeclarationList for the flags.
  const grandparent = (parent as unknown as { parent?: AstNode }).parent;
  if (grandparent === undefined) return false;
  const flags = (grandparent as unknown as { flags?: number }).flags ?? 0;
  // NodeFlags.Const = 0x2
  return (flags & 0x2) !== 0;
}

/**
 * Returns true when the parent is a `let` declaration — `let`
 * widens literal types unless an annotation is present.
 */
export function isLetDeclaration(parent: AstNode): boolean {
  if (parent.kind !== Kind.VariableDeclaration) return false;
  const grandparent = (parent as unknown as { parent?: AstNode }).parent;
  if (grandparent === undefined) return false;
  const flags = (grandparent as unknown as { flags?: number }).flags ?? 0;
  // NodeFlags.Let = 0x1
  return (flags & 0x1) !== 0;
}

/**
 * Returns true when the parent is `var` — `var` always widens.
 */
export function isVarDeclaration(parent: AstNode): boolean {
  if (parent.kind !== Kind.VariableDeclaration) return false;
  const grandparent = (parent as unknown as { parent?: AstNode }).parent;
  if (grandparent === undefined) return false;
  const flags = (grandparent as unknown as { flags?: number }).flags ?? 0;
  // var = flags & (Const|Let) === 0
  return (flags & 0x3) === 0;
}

/**
 * Returns true when the context is a function-argument position
 * — literal narrowing depends on the parameter's annotation.
 */
export function isFunctionArgumentContext(parent: AstNode): boolean {
  return parent.kind === Kind.CallExpression ||
    parent.kind === Kind.NewExpression;
}

/**
 * Returns true when the context is a return-statement position.
 */
export function isReturnContext(parent: AstNode): boolean {
  return parent.kind === Kind.ReturnStatement;
}

/**
 * Returns the canonical name of the context kind (debug helper).
 */
export function contextKindName(parent: AstNode): string {
  if (isConstDeclaration(parent)) return "const";
  if (isLetDeclaration(parent)) return "let";
  if (isVarDeclaration(parent)) return "var";
  if (isFunctionArgumentContext(parent)) return "argument";
  if (isReturnContext(parent)) return "return";
  if (preservesLiteralType(parent)) return "annotated";
  return "other";
}
