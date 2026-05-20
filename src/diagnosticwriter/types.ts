/**
 * Types for diagnostic formatting.
 *
 * Port of TS-Go internal/diagnosticwriter/diagnosticwriter.go.
 *
 * Diagnostic and FileLike are interfaces that abstract over ast.Diagnostic
 * and LSP diagnostics. Allows the formatter to work uniformly.
 */

import type { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { TextPos } from "../core/index.js";

/**
 * Minimal source-file shape needed for diagnostic location attribution
 * and source-line snippet emission.
 */
export interface FileLike {
  fileName(): string;
  text(): string;
  /** Line break positions (one entry per line; length = line count + 1). */
  ecmaLineMap(): readonly TextPos[];
}

/**
 * Abstract Diagnostic interface — implemented by AST diagnostics, LSP
 * diagnostics, and anything else with the appropriate shape.
 */
export interface Diagnostic {
  file(): FileLike | undefined;
  pos(): number;
  end(): number;
  len(): number;
  code(): number;
  category(): DiagnosticCategory;
  localize(locale?: string): string;
  messageChain(): readonly Diagnostic[];
  relatedInformation(): readonly Diagnostic[];
}
