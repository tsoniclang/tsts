/**
 * TypeScript-specific transformer passes.
 *
 * Port of TS-Go `internal/transformers/tstransforms/`. Includes:
 *   - typeeraser: removes TypeScript-only syntax
 *   - importelision: removes type-only imports/exports
 *
 * Forthcoming: legacydecorators, metadata, typeserializer,
 * runtimesyntax, utilities.
 */

export * from "./typeeraser.js";
export * from "./importelision.js";
