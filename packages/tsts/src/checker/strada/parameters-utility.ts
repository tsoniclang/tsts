/**
 * `Parameters<T>`, `ConstructorParameters<T>`, `ReturnType<T>`,
 * `InstanceType<T>` resolution.
 *
 * Ported from Strada `checker.go` — these are conditional types that
 * destructure function or constructor signatures into their pieces.
 */

import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns `Parameters<T>` — the parameter-type tuple of a function T.
 */
export function parametersOf(t: Type): Type {
  const sigs = (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures;
  if (sigs === undefined || sigs.length === 0) return ANY;
  const sig = sigs[0]!;
  const params = sig.parameters ?? [];
  const types: Type[] = params.map((p) => (p as unknown as { type?: Type }).type ?? ANY);
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__tuple" },
    elementTypes: types,
  } as unknown as Type;
}

/**
 * Returns `ConstructorParameters<T>` — the constructor parameter
 * tuple of a class T.
 */
export function constructorParametersOf(t: Type): Type {
  const sigs = (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  if (sigs === undefined || sigs.length === 0) return ANY;
  const sig = sigs[0]!;
  const params = sig.parameters ?? [];
  const types: Type[] = params.map((p) => (p as unknown as { type?: Type }).type ?? ANY);
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__tuple" },
    elementTypes: types,
  } as unknown as Type;
}

/**
 * Returns `ReturnType<T>` — the return type of a function T.
 */
export function returnTypeOf(t: Type): Type {
  const sigs = (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures;
  if (sigs === undefined || sigs.length === 0) return ANY;
  return (sigs[0] as unknown as { returnType?: Type }).returnType ?? ANY;
}

/**
 * Returns `InstanceType<T>` — the instance type of a constructor T.
 */
export function instanceTypeOf(t: Type): Type {
  const sigs = (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  if (sigs === undefined || sigs.length === 0) return ANY;
  return (sigs[0] as unknown as { returnType?: Type }).returnType ?? ANY;
}

/**
 * Returns the `this` parameter type of a function, or undefined.
 */
export function thisParameterTypeOf(t: Type): Type | undefined {
  const sigs = (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures;
  if (sigs === undefined || sigs.length === 0) return undefined;
  return (sigs[0] as unknown as { thisParameter?: { type?: Type } }).thisParameter?.type;
}

/**
 * Returns the function-type without its `this` parameter — the
 * `OmitThisParameter<T>` shape.
 */
export function omitThisParameterOf(t: Type): Type {
  // Conservative: return t.
  return t;
}
