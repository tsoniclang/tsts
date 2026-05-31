/**
 * Data structures ported from TS-Go internal/collections/.
 *
 * JavaScript's runtime does not need Go's locks, but the explicit wrapper
 * types keep the same compiler-level contracts for ported code.
 */

export * from "./set.js";
export * from "./syncMap.js";
export * from "./multiMap.js";
export * from "./cow.js";
export * from "./orderedMap.js";
