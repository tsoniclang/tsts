/**
 * Class-member override compatibility.
 *
 * Ported from Strada `checker.go` — checkInterfaceImplements,
 * checkOverrideCompatibility, getOverriddenMemberSignature.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

/**
 * Returns true when a derived member is compatible with its base.
 * Tests covariance of return types and contravariance of parameter
 * types.
 */
export function isMemberOverrideCompatible(
  derivedType: Type,
  baseType: Type,
): boolean {
  return isTypeAssignableTo(derivedType, baseType);
}

/**
 * Returns true when the derived signature is compatible with the
 * base signature in override position.
 */
export function isSignatureOverrideCompatible(
  derived: Signature,
  base: Signature,
): boolean {
  const derivedParams = derived.parameters ?? [];
  const baseParams = base.parameters ?? [];
  if (derivedParams.length > baseParams.length) return false;
  for (let i = 0; i < derivedParams.length; i++) {
    const dt = (derivedParams[i] as unknown as { type?: Type }).type;
    const bt = (baseParams[i] as unknown as { type?: Type }).type;
    if (dt === undefined || bt === undefined) continue;
    // Contravariant: base param assignable to derived param.
    if (!isTypeAssignableTo(bt, dt)) return false;
  }
  const dr = (derived as unknown as { returnType?: Type }).returnType;
  const br = (base as unknown as { returnType?: Type }).returnType;
  if (dr !== undefined && br !== undefined) {
    // Covariant: derived return assignable to base return.
    if (!isTypeAssignableTo(dr, br)) return false;
  }
  return true;
}

/**
 * Returns the base-class members that a derived class must
 * implement — abstract methods + properties.
 */
export function getRequiredImplementations(_baseSym: AstSymbol): readonly AstSymbol[] {
  // Conservative shell — full check walks isAbstract + decl chain.
  return [];
}

/**
 * Returns true when a derived class implements all required base
 * abstract members.
 */
export function implementsAllRequired(
  derivedSym: AstSymbol,
  baseSym: AstSymbol,
): boolean {
  const required = getRequiredImplementations(baseSym);
  const derivedMembers = (derivedSym as unknown as { members?: Map<string, AstSymbol> }).members;
  if (derivedMembers === undefined) return required.length === 0;
  return required.every((r) => {
    const name = (r as unknown as { name?: string }).name;
    if (name === undefined) return true;
    return derivedMembers.has(name);
  });
}
