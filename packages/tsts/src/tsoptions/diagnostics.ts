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

import type { CommandLineOption } from "./commandLineOption.js";
import type { NameMap } from "./nameMap.js";

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
