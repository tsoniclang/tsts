/**
 * Diagnostic message references used by the command-line parser.
 *
 * Port of TS-Go `internal/tsoptions/diagnostics.go`.
 *
 * References specific diagnostic messages from the catalog. These keys
 * line up with the upstream TS diagnosticMessages.json entries; the
 * actual `DiagnosticMessage` values land when the catalog generator
 * is wired up.
 */

import type { DiagnosticMessage } from "../diagnostics/types.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";

import type { CommandLineOption } from "./commandLineOption.js";
import type { NameMap } from "./nameMap.js";
import { BuildNameMap, CompilerNameMap } from "./nameMap.js";
import { optionDeclarations } from "./declsCompiler.js";
import { buildOpts } from "./declsBuild.js";
import { watchOptions } from "./declsWatch.js";

/**
 * "Did you mean ..." diagnostic group. Mirrors TS-Go
 * `DidYouMeanOptionsDiagnostics`.
 */
export interface DidYouMeanOptionsDiagnostics {
  readonly alternateMode?: AlternateModeDiagnostics;
  readonly optionDeclarations: readonly CommandLineOption[];
  readonly unknownOptionDiagnostic: DiagnosticMessage;
  readonly unknownDidYouMeanDiagnostic: DiagnosticMessage;
}

/**
 * Alternate-mode lookup. Used when a flag from a different parsing
 * mode (e.g. `--build` options in compiler mode) is detected.
 *
 * Mirrors TS-Go `AlternateModeDiagnostics`.
 */
export interface AlternateModeDiagnostics {
  readonly diagnostic: DiagnosticMessage;
  readonly optionsNameMap: NameMap;
}

/**
 * Bundle of diagnostics the worker uses. Mirrors TS-Go
 * `ParseCommandLineWorkerDiagnostics`.
 */
export interface ParseCommandLineWorkerDiagnostics {
  readonly didYouMean: DidYouMeanOptionsDiagnostics;
  readonly optionsNameMap?: NameMap;
  readonly optionTypeMismatchDiagnostic: DiagnosticMessage;
}

/**
 * Port of TS-Go `diagnostics.go#getParseCommandLineWorkerDiagnostics`. Builds
 * the diagnostics bundle for compiler mode. Factored into a function (rather
 * than inlined) to match upstream's testability seam.
 */
export function getParseCommandLineWorkerDiagnostics(
  decls: readonly CommandLineOption[],
): ParseCommandLineWorkerDiagnostics {
  // this will only return the correct diagnostics for `compiler` mode, and is factored into a function for testing reasons.
  return {
    didYouMean: {
      alternateMode: {
        diagnostic: Diagnostics.Compiler_option_0_may_only_be_used_with_build,
        optionsNameMap: BuildNameMap,
      },
      optionDeclarations: decls,
      unknownOptionDiagnostic: Diagnostics.Unknown_compiler_option_0,
      unknownDidYouMeanDiagnostic: Diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
    },
    optionTypeMismatchDiagnostic: Diagnostics.Compiler_option_0_expects_an_argument,
  };
}

/** Port of TS-Go `diagnostics.go#CompilerOptionsDidYouMeanDiagnostics`. */
export const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics =
  getParseCommandLineWorkerDiagnostics(optionDeclarations);

/** Port of TS-Go `diagnostics.go#watchOptionsDidYouMeanDiagnostics`. */
export const watchOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    // no alternateMode
    optionDeclarations: watchOptions,
    unknownOptionDiagnostic: Diagnostics.Unknown_watch_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_watch_option_0_Did_you_mean_1,
  },
  optionTypeMismatchDiagnostic: Diagnostics.Watch_option_0_requires_a_value_of_type_1,
};

/** Port of TS-Go `diagnostics.go#buildOptionsDidYouMeanDiagnostics`. */
export const buildOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    alternateMode: {
      diagnostic: Diagnostics.Compiler_option_0_may_not_be_used_with_build,
      optionsNameMap: CompilerNameMap,
    },
    optionDeclarations: buildOpts,
    unknownOptionDiagnostic: Diagnostics.Unknown_build_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_build_option_0_Did_you_mean_1,
  },
  optionTypeMismatchDiagnostic: Diagnostics.Build_option_0_requires_a_value_of_type_1,
};
