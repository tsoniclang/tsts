/**
 * Argument-list validation against a signature.
 *
 * Ported from Strada `checker.go` — checkArgumentList,
 * validateArgumentCount, validateArgumentTypes.
 */

import type { Signature, Type } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

/**
 * Returns true when the argument count satisfies the signature's
 * arity (handling optional and rest parameters).
 */
export function isArgumentCountValid(
  sig: Signature,
  argCount: number,
): boolean {
  const params = sig.parameters ?? [];
  const required = params.filter((p) => {
    const isOptional = (p as unknown as { isOptional?: boolean }).isOptional === true;
    const isRest = (p as unknown as { isRest?: boolean }).isRest === true;
    return !isOptional && !isRest;
  }).length;
  if (argCount < required) return false;
  const hasRest = params.some((p) => (p as unknown as { isRest?: boolean }).isRest === true);
  if (!hasRest && argCount > params.length) return false;
  return true;
}

/**
 * Returns the missing-argument count — how many required parameters
 * lack arguments.
 */
export function getMissingArgumentCount(
  sig: Signature,
  argCount: number,
): number {
  const params = sig.parameters ?? [];
  const required = params.filter((p) => {
    const isOptional = (p as unknown as { isOptional?: boolean }).isOptional === true;
    const isRest = (p as unknown as { isRest?: boolean }).isRest === true;
    return !isOptional && !isRest;
  }).length;
  return Math.max(0, required - argCount);
}

/**
 * Returns the excess-argument count — how many arguments exceed the
 * signature's capacity.
 */
export function getExcessArgumentCount(
  sig: Signature,
  argCount: number,
): number {
  const params = sig.parameters ?? [];
  const hasRest = params.some((p) => (p as unknown as { isRest?: boolean }).isRest === true);
  if (hasRest) return 0;
  return Math.max(0, argCount - params.length);
}

/**
 * Returns true when each argument type is assignable to its
 * corresponding parameter type.
 */
export function areArgumentTypesValid(
  sig: Signature,
  argTypes: readonly Type[],
): boolean {
  const params = sig.parameters ?? [];
  for (let i = 0; i < argTypes.length; i++) {
    const paramIdx = Math.min(i, params.length - 1);
    const param = params[paramIdx];
    if (param === undefined) return false;
    const paramType = (param as unknown as { type?: Type }).type;
    if (paramType === undefined) continue;
    if (!isTypeAssignableTo(argTypes[i]!, paramType)) return false;
  }
  return true;
}

/**
 * Returns the index of the first incompatible argument, or -1.
 */
export function findFirstIncompatibleArgument(
  sig: Signature,
  argTypes: readonly Type[],
): number {
  const params = sig.parameters ?? [];
  for (let i = 0; i < argTypes.length; i++) {
    const paramIdx = Math.min(i, params.length - 1);
    const param = params[paramIdx];
    if (param === undefined) return i;
    const paramType = (param as unknown as { type?: Type }).type;
    if (paramType === undefined) continue;
    if (!isTypeAssignableTo(argTypes[i]!, paramType)) return i;
  }
  return -1;
}
