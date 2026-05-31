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

export * from "./typeEraser.js";
export * from "./importElision.js";
export * from "./legacyDecorators.js";
export * from "./runtimeSyntax.js";
export * from "./typeSerializer.js";
export * from "./metadata.js";
export * from "./utilities.js";
