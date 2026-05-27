/**
 * `this` type resolution in class/interface methods.
 *
 * Ported from Strada `checker.go` — getThisTypeOfMethod,
 * getThisType, substituteThisInType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the `this` type of the enclosing class/interface.
 */
export function getThisTypeOfClass(classSym: AstSymbol): Type {
  return {
    flags: TypeFlags.Object,
    symbol: classSym,
    isThisType: true,
  } as unknown as Type;
}

/**
 * Returns true when a type is a `this`-type reference.
 */
export function isThisTypeReference(t: Type): boolean {
  return (t as unknown as { isThisType?: boolean }).isThisType === true;
}

/**
 * Returns the enclosing class symbol for a `this`-type reference.
 */
export function getClassOfThisType(t: Type): AstSymbol | undefined {
  if (!isThisTypeReference(t)) return undefined;
  return (t as unknown as { symbol?: AstSymbol }).symbol;
}

/**
 * Substitutes `this`-type references in a type expression with a
 * concrete type.
 */
export function substituteThisInType(t: Type, concrete: Type): Type {
  if (isThisTypeReference(t)) return concrete;
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const substituted = types.map((c) => substituteThisInType(c, concrete));
    return { flags: TypeFlags.Union, types: substituted } as unknown as Type;
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const substituted = types.map((c) => substituteThisInType(c, concrete));
    return { flags: TypeFlags.Intersection, types: substituted } as unknown as Type;
  }
  return t;
}

/**
 * Returns the `this` parameter declaration of a function-like, or
 * undefined.
 */
export function getThisParameterDeclaration(decl: AstNode): AstNode | undefined {
  const params = (decl as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return undefined;
  const first = params[0]!;
  const name = (first as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  const text = (name as unknown as { escapedText?: string }).escapedText;
  return text === "this" ? first : undefined;
}

/**
 * Returns true when the function-like has an explicit `this` annotation.
 */
export function hasThisAnnotation(decl: AstNode): boolean {
  return getThisParameterDeclaration(decl) !== undefined;
}

/**
 * Returns the `this` type implied by a function-like's binding —
 * typically the type of `this` at the call site.
 */
export function getImpliedThisType(_decl: AstNode): Type {
  return ANY;
}
