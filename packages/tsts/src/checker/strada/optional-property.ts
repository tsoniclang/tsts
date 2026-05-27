/**
 * Optional-property handling (`prop?: type`).
 *
 * Ported from Strada `checker.go` — getTypeOfOptionalProperty,
 * isOptionalProperty, getEffectivePropertyType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the property declaration has a `?` token.
 */
export function isOptionalProperty(node: AstNode): boolean {
  if (
    node.kind !== Kind.PropertyDeclaration &&
    node.kind !== Kind.PropertySignature &&
    node.kind !== Kind.Parameter
  ) {
    return false;
  }
  return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
}

/**
 * Returns true when the symbol is optional — at least one of its
 * declarations is optional.
 */
export function isOptionalSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  return decls.some(isOptionalProperty);
}

/**
 * Returns the effective property type — augments the declared type
 * with `| undefined` when optional and exactOptionalPropertyTypes is
 * not enabled.
 */
export function getEffectivePropertyType(
  declaredType: Type,
  isOptional: boolean,
  exactOptionalPropertyTypes: boolean,
): Type {
  if (!isOptional) return declaredType;
  if (exactOptionalPropertyTypes) return declaredType;
  return addUndefined(declaredType);
}

function addUndefined(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Undefined) !== 0) return t;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return {
      flags: TypeFlags.Union,
      types: [...types, { flags: TypeFlags.Undefined } as unknown as Type],
    } as unknown as Type;
  }
  return {
    flags: TypeFlags.Union,
    types: [t, { flags: TypeFlags.Undefined } as unknown as Type],
  } as unknown as Type;
}

/**
 * Returns true when the property is "required" — not optional, not
 * default-initialized.
 */
export function isRequiredProperty(node: AstNode): boolean {
  if (isOptionalProperty(node)) return false;
  return true;
}

/**
 * Returns the optional-property mark of a property — the `?` token.
 */
export function getQuestionToken(node: AstNode): AstNode | undefined {
  return (node as unknown as { questionToken?: AstNode }).questionToken;
}
