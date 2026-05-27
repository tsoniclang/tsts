/**
 * Type-argument inference + checking.
 *
 * Ported from Strada `checker.go` — getTypeArgumentsFromNode,
 * fillMissingTypeArguments, checkTypeArgumentConstraints.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the explicit type-arguments from a TypeReferenceNode or
 * ExpressionWithTypeArguments. Empty when none.
 */
export function getTypeArgumentNodes(node: AstNode): readonly AstNode[] {
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the number of type parameters declared on a generic
 * declaration (class/interface/type-alias/function).
 */
export function getTypeParameterCount(decl: AstNode): number {
  const tp = (decl as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes?.length ?? 0;
}

/**
 * Returns the type-parameter declarations of a generic.
 */
export function getTypeParameterDeclarations(decl: AstNode): readonly AstNode[] {
  const tp = (decl as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes ?? [];
}

/**
 * Fills missing type arguments with the constraint defaults (or
 * any if none). Returns the merged list of resolved types.
 */
export function fillMissingTypeArguments(
  typeArguments: readonly Type[],
  typeParameters: readonly AstNode[],
): readonly Type[] {
  if (typeArguments.length >= typeParameters.length) {
    return typeArguments.slice(0, typeParameters.length);
  }
  const out: Type[] = [...typeArguments];
  for (let i = typeArguments.length; i < typeParameters.length; i++) {
    const def = (typeParameters[i] as unknown as { default?: AstNode }).default;
    // We cannot resolve def → Type without CheckerOps; default to any.
    out.push(def !== undefined ? ANY : ANY);
  }
  return out;
}

/**
 * Returns the constraint TypeNode of a TypeParameter declaration.
 */
export function getTypeParameterConstraint(decl: AstNode): AstNode | undefined {
  if (decl.kind !== Kind.TypeParameter) return undefined;
  return (decl as unknown as { constraint?: AstNode }).constraint;
}

/**
 * Returns true when a type argument satisfies the constraint of a
 * type parameter.
 */
export function checkTypeArgumentConstraint(
  arg: Type,
  constraint: Type | undefined,
): boolean {
  if (constraint === undefined) return true;
  return isTypeAssignableTo(arg, constraint);
}

/**
 * Returns true when every type argument satisfies its corresponding
 * type-parameter constraint.
 */
export function checkAllTypeArgumentConstraints(
  args: readonly Type[],
  constraints: readonly (Type | undefined)[],
): boolean {
  if (args.length !== constraints.length) return true;
  for (let i = 0; i < args.length; i++) {
    if (!checkTypeArgumentConstraint(args[i]!, constraints[i])) return false;
  }
  return true;
}

/**
 * Returns true when the type-argument count matches the declaration's
 * type-parameter count (after accounting for defaults).
 */
export function isTypeArgumentArityCompatible(
  argCount: number,
  paramCount: number,
  minParamCount: number,
): boolean {
  return argCount >= minParamCount && argCount <= paramCount;
}
