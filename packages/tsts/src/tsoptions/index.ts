/**
 * tsconfig / command-line option parsing.
 *
 * Port of TS-Go `internal/tsoptions/`. Provides parsing of tsconfig
 * JSON files, `tsc` CLI arguments, and the option declaration tables.
 *
 * The package owns the same layers as TS-Go: option declarations,
 * command-line parsing, tsconfig parsing, extends resolution,
 * include/exclude spec normalization, project-reference parsing, and
 * show-config serialization. Parser and project callers consume these
 * helpers directly instead of duplicating option-shape knowledge.
 */

export * from "./commandlineoption.js";
export * from "./config-specs.js";
export * from "./commandline-response.js";
export * from "./declsbuild.js";
export * from "./declscompiler.js";
export * from "./declstypeacquisition.js";
export * from "./declswatch.js";
export * from "./diagnostics.js";
export * from "./enummaps.js";
export * from "./errors.js";
export * from "./extends-resolution.js";
export * from "./help-view.js";
export * as jsonOptionValidation from "./json-option-validation.js";
export * from "./namemap.js";
export * from "./option-catalog.js";
export * from "./option-defaults.js";
export * from "./option-effects.js";
export * from "./option-normalization.js";
export * from "./parsedbuildcommandline.js";
export * as parsedCommandLine from "./parsedcommandline.js";
export * as parsingHelpers from "./parsinghelpers.js";
export * from "./project-reference-parsing.js";
export * from "./showconfig.js";
export * from "./tsconfig-root-options.js";
export * as tsconfigParsing from "./tsconfigparsing.js";
export * from "./wildcarddirectories.js";
