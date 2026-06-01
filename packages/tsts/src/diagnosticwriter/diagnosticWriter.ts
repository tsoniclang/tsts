import type { int } from "@tsonic/core/types.js";

import type { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { Diagnostic, FileLike } from "./types.js";
import {
  CLEAR_SCREEN_SEQUENCE,
  type ErrorSummary,
  type FormattingOptions,
  formatDiagnostic,
  formatDiagnosticWithColorAndContext,
  formatDiagnosticsStatusAndTime,
  formatDiagnosticsStatusWithColorAndTime,
  formatDiagnosticsWithColorAndContext,
  getErrorSummary,
  shouldClearScreen,
  writeErrorSummaryText,
} from "./format.js";

export type FormattedWriter = (text: string, formatStyle: string) => string;

export interface DiagnosticLike {
  readonly file?: FileLike;
  readonly pos: int;
  readonly end: int;
  readonly code: int;
  readonly category: DiagnosticCategory;
  readonly message: string;
  readonly messageChain?: readonly DiagnosticLike[];
  readonly relatedInformation?: readonly DiagnosticLike[];
}

export class ObjectDiagnostic implements Diagnostic {
  readonly source: DiagnosticLike;

  constructor(source: DiagnosticLike) {
    this.source = source;
  }

  file(): FileLike | undefined {
    return this.source.file;
  }

  pos(): int {
    return this.source.pos;
  }

  end(): int {
    return this.source.end;
  }

  len(): int {
    return (this.source.end - this.source.pos) as int;
  }

  code(): int {
    return this.source.code as int;
  }

  category(): DiagnosticCategory {
    return this.source.category;
  }

  localize(): string {
    return this.source.message;
  }

  messageChain(): readonly Diagnostic[] {
    return wrapDiagnostics(this.source.messageChain ?? []);
  }

  relatedInformation(): readonly Diagnostic[] {
    return wrapDiagnostics(this.source.relatedInformation ?? []);
  }
}

export function wrapDiagnostic(diagnostic: DiagnosticLike): ObjectDiagnostic {
  return new ObjectDiagnostic(diagnostic);
}

export function wrapDiagnostics(diagnostics: readonly DiagnosticLike[]): readonly ObjectDiagnostic[] {
  const result: ObjectDiagnostic[] = [];
  for (const diagnostic of diagnostics) {
    result.push(wrapDiagnostic(diagnostic));
  }
  return result;
}

export function toDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): readonly Diagnostic[] {
  const result: Diagnostic[] = [];
  for (const diagnostic of diagnostics) {
    result.push(diagnostic);
  }
  return result;
}

export function flattenDiagnosticMessage(diagnostic: Diagnostic, newLine: string, locale?: string): string {
  const output: string[] = [diagnostic.localize(locale)];
  for (const child of diagnostic.messageChain()) {
    flattenDiagnosticMessageChain(output, child, newLine, locale, 1 as int);
  }
  return output.join("");
}

function flattenDiagnosticMessageChain(
  output: string[],
  diagnostic: Diagnostic,
  newLine: string,
  locale: string | undefined,
  level: int,
): void {
  output.push(newLine);
  output.push("  ".repeat(level));
  output.push(diagnostic.localize(locale));
  for (const child of diagnostic.messageChain()) {
    flattenDiagnosticMessageChain(output, child, newLine, locale, (level + 1) as int);
  }
}

export function writeWithStyleAndReset(text: string, formatStyle: string): string {
  return `${formatStyle}${text}\x1b[0m`;
}

export function writeFormatDiagnostic(diagnostic: Diagnostic, formatOpts: FormattingOptions): string {
  const line = formatDiagnostic(diagnostic);
  return `${line}${formatOpts.newLine}`;
}

export function writeFormatDiagnostics(
  diagnostics: readonly Diagnostic[],
  formatOpts: FormattingOptions,
): string {
  const output: string[] = [];
  for (const diagnostic of diagnostics) {
    output.push(writeFormatDiagnostic(diagnostic, formatOpts));
  }
  return output.join("");
}

export function formatDiagnosticsWithColorAndContextText(
  diagnostics: readonly Diagnostic[],
  formatOpts: FormattingOptions,
): string {
  return formatDiagnosticsWithColorAndContext(diagnostics, formatOpts);
}

export function formatDiagnosticWithColorAndContextText(
  diagnostic: Diagnostic,
  formatOpts: FormattingOptions,
): string {
  return formatDiagnosticWithColorAndContext(diagnostic, formatOpts);
}

export function formatDiagnosticsStatusWithColorAndTimeText(
  time: string,
  diagnostic: Diagnostic,
  formatOpts: FormattingOptions,
): string {
  return formatDiagnosticsStatusWithColorAndTime(time, diagnostic, formatOpts);
}

export function formatDiagnosticsStatusAndTimeText(
  time: string,
  diagnostic: Diagnostic,
  formatOpts: FormattingOptions,
): string {
  return formatDiagnosticsStatusAndTime(time, diagnostic, formatOpts);
}

export function writeErrorSummaryTextForDiagnostics(
  diagnostics: readonly Diagnostic[],
  formatOpts: FormattingOptions,
): string {
  return writeErrorSummaryText(diagnostics, formatOpts);
}

export function getErrorSummaryForDiagnostics(diagnostics: readonly Diagnostic[]): ErrorSummary {
  return getErrorSummary(diagnostics);
}

export function tryClearScreen(
  diagnostic: Diagnostic,
  options: {
    readonly preserveWatchOutput?: boolean;
    readonly extendedDiagnostics?: boolean;
    readonly diagnostics?: boolean;
  },
): string {
  return shouldClearScreen(diagnostic.code(), options) ? CLEAR_SCREEN_SEQUENCE : "";
}
