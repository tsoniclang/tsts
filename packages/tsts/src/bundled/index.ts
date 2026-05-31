/**
 * Bundled lib.d.ts access for the noLib-targeting compiler.
 *
 * Port of TS-Go `internal/bundled/`. See `bundled.ts` for the mode
 * (embedded vs noembed) and how that maps to TSTS's eventual .NET
 * resource embedding.
 */

export { Embedded, isBundled, libPath, Scheme, splitPath, testingLibPath, wrapFS } from "./bundled.js";
export * as embeddedMode from "./embed.js";
export { embeddedContents } from "./embed.generated.js";
export { LibNames } from "./libs.generated.js";
export * as noEmbedMode from "./noembed.js";
