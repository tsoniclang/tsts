/**
 * GeneratedIdentifierFlags re-export.
 *
 * Port of TS-Go `internal/printer/generatedidentifierflags.go` (~57 LoC).
 * The constant-union version lives in namegenerator.ts; this module
 * provides the canonical re-export the upstream provides as a stable
 * import surface.
 */

import { GeneratedIdentifierFlags } from "./nameGenerator.js";

export { GeneratedIdentifierFlags } from "./nameGenerator.js";
export type { GeneratedIdentifierFlags as GeneratedIdentifierFlagsType } from "./nameGenerator.js";

export function generatedIdentifierKind(flags: GeneratedIdentifierFlags): GeneratedIdentifierFlags {
  return flags & GeneratedIdentifierFlags.KindMask;
}

export function generatedIdentifierIsAuto(flags: GeneratedIdentifierFlags): boolean {
  return generatedIdentifierKind(flags) === GeneratedIdentifierFlags.Auto;
}

export function generatedIdentifierIsLoop(flags: GeneratedIdentifierFlags): boolean {
  return generatedIdentifierKind(flags) === GeneratedIdentifierFlags.Loop;
}

export function generatedIdentifierIsUnique(flags: GeneratedIdentifierFlags): boolean {
  return generatedIdentifierKind(flags) === GeneratedIdentifierFlags.Unique;
}

export function generatedIdentifierIsNode(flags: GeneratedIdentifierFlags): boolean {
  return generatedIdentifierKind(flags) === GeneratedIdentifierFlags.Node;
}

export function generatedIdentifierIsReservedInNestedScopes(flags: GeneratedIdentifierFlags): boolean {
  return (flags & GeneratedIdentifierFlags.ReservedInNestedScopes) !== 0;
}

export function generatedIdentifierIsOptimistic(flags: GeneratedIdentifierFlags): boolean {
  return (flags & GeneratedIdentifierFlags.Optimistic) !== 0;
}

export function generatedIdentifierIsFileLevel(flags: GeneratedIdentifierFlags): boolean {
  return (flags & GeneratedIdentifierFlags.FileLevel) !== 0;
}

export function generatedIdentifierHasAllowNameSubstitution(flags: GeneratedIdentifierFlags): boolean {
  return (flags & GeneratedIdentifierFlags.AllowNameSubstitution) !== 0;
}
