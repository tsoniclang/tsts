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

export * from "./commandLineOption.js";
export * from "./configSpecs.js";
export * from "./commandLineResponse.js";
export * from "./declsBuild.js";
export * from "./declsCompiler.js";
export * from "./declsTypeAcquisition.js";
export * from "./declsWatch.js";
export * from "./diagnostics.js";
export * from "./enumMaps.js";
export * from "./errors.js";
export * from "./extendsResolution.js";
export * from "./helpView.js";
export * as jsonOptionValidation from "./jsonOptionValidation.js";
export * from "./nameMap.js";
export * from "./optionCatalog.js";
export * from "./optionDefaults.js";
export * from "./optionEffects.js";
export * from "./optionNormalization.js";
export * from "./parsedBuildCommandLine.js";
export * as parsedCommandLine from "./parsedCommandLine.js";
export * as parsingHelpers from "./parsingHelpers.js";
export * from "./projectReferenceParsing.js";
export * from "./showConfig.js";
export * from "./tsconfigRootOptions.js";
export * as tsconfigParsing from "./tsconfigParsing.js";
export * from "./wildcardDirectories.js";
