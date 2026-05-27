/**
 * Mixin-class support.
 *
 * Ported from Strada `checker.go` — isMixinConstructorType,
 * getMixinConstructorType, computeMixinResultType. A "mixin" is a
 * class whose constructor accepts `...args: any[]` and returns an
 * instance of T — the canonical class-factory pattern.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a constructor signature has the shape `new(...args: any[]) => T`.
 */
export function isMixinConstructorSignature(sig: Signature): boolean {
  const params = sig.parameters ?? [];
  if (params.length !== 1) return false;
  const p = params[0]!;
  // Heuristic: only the single rest-parameter case is a mixin.
  return (p as unknown as { isRest?: boolean }).isRest === true;
}

/**
 * Returns true when `t` is a constructor type whose only signature
 * matches the mixin shape.
 */
export function isMixinConstructorType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const ctors = (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  if (ctors === undefined || ctors.length === 0) return false;
  return ctors.every(isMixinConstructorSignature);
}

/**
 * Returns the canonical mixin constructor of a type, or undefined when
 * none of its construct-signatures match the mixin shape.
 */
export function getMixinConstructorType(t: Type): Signature | undefined {
  const ctors = (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  if (ctors === undefined) return undefined;
  return ctors.find(isMixinConstructorSignature);
}

/**
 * Composes a mixin chain by merging the instance shapes of every
 * mixin in the chain. Returns the merged instance type.
 */
export function computeMixinResultType(parts: readonly Type[]): Type | undefined {
  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return { flags: TypeFlags.Intersection, types: parts } as unknown as Type;
}

/**
 * Returns true when the class symbol participates in a mixin.
 * Heuristic: class has an extends-clause whose target is itself a
 * mixin-shaped constructor.
 */
export function isMixinClass(_sym: AstSymbol): boolean {
  // Full check requires looking up the extends clause; conservative
  // body returns false until that pass is wired through.
  return false;
}
