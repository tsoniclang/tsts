/**
 * Diagnostic formatting for terminal output.
 *
 * Port of TS-Go internal/diagnosticwriter/. Provides flat one-line
 * `formatDiagnostic` and pretty multi-line `formatDiagnosticWithSource`
 * (with source snippet + caret). ANSI colors not yet emitted; coming
 * with the CLI when --pretty/--noColors flags are wired.
 */

export type { Diagnostic, FileLike } from "./types.js";
export * from "./diagnosticWriter.js";
export {
  formatDiagnostic,
  formatDiagnosticWithSource,
  formatDiagnosticsWithSource,
} from "./format.js";
