/**
 * Data structures ported from TS-Go internal/collections/.
 *
 * JavaScript's runtime does not need Go's locks, but the explicit wrapper
 * types keep the same compiler-level contracts for ported code.
 */

export * from "./set.js";
export * from "./syncmap.js";
export * from "./multimap.js";
export * from "./cow.js";
export * from "./ordered_map.js";
