/**
 * Type-alias resolution.
 *
 * Ported from Strada `checker.go` — getTypeAliasInstantiation,
 * getDeclaredTypeOfTypeAlias, isTypeAliasReference.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns true when the symbol represents a type-alias declaration.
 */
export function isTypeAliasSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.TypeAlias) !== 0;
}

/**
 * Returns the type-parameter declarations of a TypeAlias.
 */
export function getTypeParametersOfAlias(
  sym: AstSymbol,
): readonly AstNode[] {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  for (const decl of decls) {
    if (decl.kind === Kind.TypeAliasDeclaration) {
      const tp = (decl as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
      return tp?.nodes ?? [];
    }
  }
  return [];
}

/**
 * Returns the right-hand-side type-node of a TypeAlias.
 */
export function getTypeNodeOfAlias(sym: AstSymbol): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  for (const decl of decls) {
    if (decl.kind === Kind.TypeAliasDeclaration) {
      return (decl as unknown as { type?: AstNode }).type;
    }
  }
  return undefined;
}

/**
 * Returns true when the type carries an alias-symbol reference
 * (used by the type renderer to surface the alias name).
 */
export function hasAliasSymbol(t: Type): boolean {
  return (t as unknown as { aliasSymbol?: AstSymbol }).aliasSymbol !== undefined;
}

/**
 * Returns the alias symbol attached to a type, or undefined.
 */
export function getAliasSymbol(t: Type): AstSymbol | undefined {
  return (t as unknown as { aliasSymbol?: AstSymbol }).aliasSymbol;
}

/**
 * Returns the type arguments of an alias reference, when present.
 */
export function getAliasTypeArguments(t: Type): readonly Type[] {
  return (t as unknown as { aliasTypeArguments?: readonly Type[] }).aliasTypeArguments ?? [];
}

/**
 * Returns true when the alias is recursive (its body references
 * itself directly or transitively).
 */
export function isRecursiveAlias(sym: AstSymbol): boolean {
  return (sym as unknown as { isRecursive?: boolean }).isRecursive === true;
}
