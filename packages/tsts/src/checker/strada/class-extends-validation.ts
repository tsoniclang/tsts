/**
 * `extends` clause validation for class declarations.
 *
 * Ported from Strada `checker.go` — checkClassExtends,
 * isLegalBaseClass, getExtendsTypeArguments.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a type is a legal base class — has at least one
 * construct signature.
 */
export function isLegalBaseClass(t: Type): boolean {
  const sigs = (t as unknown as { constructSignatures?: readonly unknown[] }).constructSignatures;
  return sigs !== undefined && sigs.length > 0;
}

/**
 * Returns true when the type is "abstract-constructible" — has a
 * construct signature but is abstract.
 */
export function isAbstractConstructible(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { flags?: number } }).symbol;
  if (sym === undefined) return false;
  // SymbolFlags.Class = 32; abstract is a modifier on the symbol.
  return (sym.flags ?? 0 & 32) !== 0;
}

/**
 * Returns the extends-clause expression of a class.
 */
export function getExtendsExpression(decl: AstNode): AstNode | undefined {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return undefined;
  for (const c of clauses) {
    if ((c as unknown as { token?: number }).token === Kind.ExtendsKeyword) {
      const types = (c as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
      if (types !== undefined && types.length > 0) {
        return (types[0] as unknown as { expression?: AstNode }).expression;
      }
    }
  }
  return undefined;
}

/**
 * Returns the extends type-arguments.
 */
export function getExtendsTypeArguments(decl: AstNode): readonly AstNode[] {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return [];
  for (const c of clauses) {
    if ((c as unknown as { token?: number }).token === Kind.ExtendsKeyword) {
      const types = (c as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
      if (types !== undefined && types.length > 0) {
        const ta = (types[0] as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
        return ta?.nodes ?? [];
      }
    }
  }
  return [];
}

/**
 * Returns true when the extends-clause is missing — class with no
 * base.
 */
export function hasNoExtends(decl: AstNode): boolean {
  return getExtendsExpression(decl) === undefined;
}

/**
 * Returns true when the type is a constructor-only function (no
 * call signatures).
 */
export function isConstructorOnly(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const ctorSigs = (t as unknown as { constructSignatures?: readonly unknown[] }).constructSignatures;
  const callSigs = (t as unknown as { callSignatures?: readonly unknown[] }).callSignatures;
  return (ctorSigs?.length ?? 0) > 0 && (callSigs?.length ?? 0) === 0;
}
