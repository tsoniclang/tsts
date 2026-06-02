/**
 * Diagnostic types shared across the compiler.
 *
 * Mirrors the structures TS-Go uses (internal/diagnostics/diagnostics.go and
 * internal/ast/diagnostic.go). The diagnostic message catalog itself is
 * generated from upstream TypeScript's diagnosticMessages.json and TS-Go's
 * extraDiagnosticMessages.json; see src/diagnostics/messages.generated.ts
 * (forthcoming).
 */

import type { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

/**
 * A diagnostic message template, indexed by stable key and code.
 *
 * Code numbering follows TypeScript convention:
 *   1001-9999: upstream TypeScript diagnostics
 *   100000+:   TS-Go-specific diagnostics
 *
 * Text contains numbered placeholders (`{0}`, `{1}`, etc.) that are filled
 * at diagnostic-emit time.
 */
export interface DiagnosticMessage {
  readonly key: string;
  readonly code: number;
  readonly category: DiagnosticCategory;
  readonly message: string;
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  /** Note: spelling intentionally matches TS-Go ("Pyramid" not "Pyramide"); spelling error inherited from upstream Strada. */
  readonly elidedInCompatibilityPyramid?: boolean;
}

/**
 * A diagnostic emitted by the compiler — a concrete instance of a
 * `DiagnosticMessage` at a specific source location, with placeholders
 * filled.
 */
export interface Diagnostic {
  message: DiagnosticMessage;
  file?: SourceFileSlim;
  start?: number;
  length?: number;
  category: DiagnosticCategory;
  code: number;
  text: string;
  relatedInformation?: readonly Diagnostic[];
  chainedDiagnostics?: readonly Diagnostic[];
}

/**
 * The minimal subset of source-file shape needed to attribute a diagnostic.
 * The full SourceFile shape comes from the AST; this is decoupled so
 * diagnostic infrastructure doesn't depend on the AST internals.
 */
export interface SourceFileSlim {
  readonly fileName: string;
  readonly text: string;
}
