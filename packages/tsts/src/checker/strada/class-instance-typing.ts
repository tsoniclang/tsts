/**
 * Class-instance type typing rules.
 *
 * Ported from Strada `checker.go` — getInstanceTypeOfClass,
 * isClassInstanceType, propagateInstanceType.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type is the instance-side of a class.
 */
export function isClassInstanceType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (t as unknown as { symbol?: AstSymbol }).symbol;
  if (sym === undefined) return false;
  const symFlags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (symFlags & SymbolFlags.Class) !== 0;
}

/**
 * Returns the corresponding constructor type for an instance type.
 */
export function getConstructorTypeOfInstance(instanceType: Type): Type | undefined {
  if (!isClassInstanceType(instanceType)) return undefined;
  const sym = (instanceType as unknown as { symbol?: AstSymbol }).symbol;
  if (sym === undefined) return undefined;
  return (sym as unknown as { constructorType?: Type }).constructorType;
}

/**
 * Returns the class declaration node from an instance type.
 */
export function getClassDeclarationOfInstance(instanceType: Type): AstNode | undefined {
  if (!isClassInstanceType(instanceType)) return undefined;
  const sym = (instanceType as unknown as { symbol?: AstSymbol }).symbol;
  if (sym === undefined) return undefined;
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find((d) =>
    d.kind === Kind.ClassDeclaration || d.kind === Kind.ClassExpression,
  );
}

/**
 * Returns the type parameters of a generic class instance type.
 */
export function getClassTypeParameters(instanceType: Type): readonly Type[] {
  return (instanceType as unknown as { typeParameters?: readonly Type[] }).typeParameters ?? [];
}

/**
 * Returns the type arguments of a class-instance reference.
 */
export function getClassTypeArguments(instanceType: Type): readonly Type[] {
  return (instanceType as unknown as { typeArguments?: readonly Type[] }).typeArguments ?? [];
}

/**
 * Returns true when the class is generic (has type parameters).
 */
export function isGenericClass(instanceType: Type): boolean {
  return getClassTypeParameters(instanceType).length > 0;
}
