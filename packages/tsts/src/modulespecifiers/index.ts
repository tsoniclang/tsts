/**
 * Module-specifier generation for import statements.
 *
 * Port of TS-Go `internal/modulespecifiers/`. Generates the specifier
 * strings used in `import` statements when emitting TypeScript →
 * JavaScript (or surfacing auto-imports in the language service).
 */

export * from "./types.js";
export * from "./compare.js";
export * from "./util.js";
export * from "./preferences.js";
export * from "./specifiers.js";
