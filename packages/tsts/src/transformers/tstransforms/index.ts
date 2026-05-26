/**
 * TypeScript-specific transformer passes.
 *
 * Port of TS-Go `internal/transformers/tstransforms/`. Includes:
 *   - typeeraser: removes TypeScript-only syntax
 *   - importelision: removes type-only imports/exports
 *   - legacydecorators: lowers experimentalDecorators
 *
 * Forthcoming: metadata, typeserializer, runtimesyntax, utilities.
 */

export * from "./typeeraser.js";
export * from "./importelision.js";
export * from "./legacydecorators.js";
export * from "./runtimesyntax.js";
export * from "./typeserializer.js";
export * from "./metadata.js";
