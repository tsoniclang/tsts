/**
 * Numeric-primitives extension facts.
 *
 * `NumericTypeFact` is the source-language intent attached to a
 * `TypeReferenceNode` whose target resolves to a primitive imported from
 * "@tsonic/core/types.js". It records the SOURCE spelling and its numeric
 * semantics only — no backend representation (spec "Example: Numeric Primitive
 * Facts": backend mapping stays in the consumer).
 *
 * The fact is stored under a typed, namespaced `ExtensionFactKey` so consumers
 * read it statically (`facts.getNodeFact(typeNode, NumericTypeFactKey)`), never
 * by a bare string.
 */

import { defineFactKey, type ExtensionFactKey } from "../factKeys.js";
import type { NumericRuntimeBase, NumericWidth } from "./primitiveTable.js";

/**
 * Source-language numeric intent for a recognized primitive type reference.
 *
 * `sourceName` is the spelling as EXPORTED by the module (the imported identity,
 * not the local alias — e.g. `int` even when imported `as int32`). `signed` is
 * absent for non-integer primitives (half/float/double/decimal/bool/char).
 */
export interface NumericTypeFact {
  readonly sourceName: string;
  readonly kind: string;
  readonly runtimeBase: NumericRuntimeBase;
  readonly signed?: boolean;
  readonly width: NumericWidth;
}

/** Typed, namespaced key for the per-node numeric primitive intent fact. */
export const NumericTypeFactKey: ExtensionFactKey<NumericTypeFact> = defineFactKey<NumericTypeFact>(
  "numeric-primitives",
  "numericType",
  "Source numeric primitive intent",
);
