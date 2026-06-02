/**
 * numeric-primitives reference extension — public surface.
 *
 * Re-exports the extension itself, its fact key + fact shape, and the primitive
 * table so consumers (e.g. a Tsonic frontend adapter) can register the extension
 * and read `NumericTypeFact` facts statically off the program's fact store.
 */

export * from "./primitiveTable.js";
export * from "./facts.js";
export * from "./extension.js";
