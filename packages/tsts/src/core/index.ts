/**
 * Low-level utilities shared across the compiler.
 *
 * Port of TS-Go internal/core/. Includes Tristate, TextRange, Stack,
 * version helpers, and generic array utilities. The huge CompilerOptions
 * type and projectreference handling are forthcoming.
 */

export * from "./binarySearch.js";
export * from "./tristate.js";
export * from "./text.js";
export * from "./stack.js";
export * from "./version.js";
export * from "./core.js";
export * from "./pattern.js";
