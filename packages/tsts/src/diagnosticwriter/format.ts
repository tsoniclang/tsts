/**
 * Diagnostic formatting for terminal output.
 *
 * Port of TS-Go internal/diagnosticwriter/diagnosticwriter.go (formatting
 * portions).
 *
 * Two flavors:
 *   formatDiagnostic   — flat one-line summary per diagnostic
 *   formatDiagnosticWithSource — multi-line with source snippet + caret
 *                                (the "pretty" form used by tsc with --pretty)
 *
 * NOTE: ANSI color emission is omitted for now; the format strings are
 * pure text. A future commit will add color awareness based on the
 * TERM/NO_COLOR environment variables.
 */

import type { int } from "@tsonic/core/types.js";

import type { Diagnostic, FileLike } from "./types.js";

const CATEGORY_NAMES: Record<number, string> = {
  0: "warning",
  1: "error",
  2: "suggestion",
  3: "message",
};

function categoryName(category: number): string {
  return CATEGORY_NAMES[category] ?? "message";
}

/**
 * Format a single diagnostic on one line, in the canonical TS form:
 *
 *   foo.ts(2,5): error TS2322: Type 'string' is not assignable to type 'number'.
 *
 * Or without a source file:
 *
 *   error TS2322: Type 'string' is not assignable to type 'number'.
 */
export function formatDiagnostic(d: Diagnostic): string {
  const file = d.file();
  const message = d.localize();
  const codeStr = `TS${d.code()}`;
  const cat = categoryName(d.category());

  if (file === undefined) {
    return `${cat} ${codeStr}: ${message}`;
  }
  const loc = locationForFileAndPos(file, d.pos());
  return `${file.fileName()}(${loc.line + 1},${loc.column + 1}): ${cat} ${codeStr}: ${message}`;
}

/**
 * Format diagnostics with a source-line snippet and a caret pointing to
 * the offending range, as `tsc --pretty` does.
 */
export function formatDiagnosticWithSource(d: Diagnostic): string {
  const file = d.file();
  if (file === undefined) return formatDiagnostic(d);

  const lines: string[] = [];
  const loc = locationForFileAndPos(file, d.pos());
  const endLoc = locationForFileAndPos(file, d.end());

  lines.push(formatDiagnostic(d));
  lines.push("");

  const source = file.text();
  const lineMap = file.ecmaLineMap();
  const startLine = loc.line;
  const endLine = endLoc.line;

  for (let lineNo = startLine; lineNo <= endLine; lineNo += 1) {
    const lineStart = lineMap[lineNo] ?? 0;
    const lineEnd = lineMap[lineNo + 1] ?? source.length;
    const lineText = source.slice(lineStart, lineEnd).replace(/[\r\n]$/, "");

    const lineNoStr = String(lineNo + 1).padStart(4);
    lines.push(`${lineNoStr} ${lineText}`);

    // Caret line
    let caretStart: number;
    let caretLen: number;
    if (lineNo === startLine && lineNo === endLine) {
      caretStart = loc.column;
      caretLen = Math.max(1, endLoc.column - loc.column);
    } else if (lineNo === startLine) {
      caretStart = loc.column;
      caretLen = Math.max(1, lineText.length - loc.column);
    } else if (lineNo === endLine) {
      caretStart = 0;
      caretLen = Math.max(1, endLoc.column);
    } else {
      caretStart = 0;
      caretLen = Math.max(1, lineText.length);
    }

    lines.push("     " + " ".repeat(caretStart) + "~".repeat(caretLen));
  }

  lines.push("");
  return lines.join("\n");
}

/**
 * Format a list of diagnostics with sources, separated by blank lines.
 */
export function formatDiagnosticsWithSource(diags: readonly Diagnostic[]): string {
  return diags.map(formatDiagnosticWithSource).join("\n");
}

interface LineColumn {
  readonly line: int;
  readonly column: int;
}

/**
 * Convert a character offset to (line, column) using the file's lineMap.
 * Returns 0-based line and column.
 */
function locationForFileAndPos(file: FileLike, pos: int): LineColumn {
  const lineMap = file.ecmaLineMap();
  let lo: int = 0;
  let hi: int = lineMap.length - 1;
  while (lo < hi) {
    const mid: int = ((lo + hi + 1) / 2) | 0;
    if (lineMap[mid]! <= pos) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo, column: pos - (lineMap[lo] ?? 0) };
}

// ────────────────────────────────────────────────────────────────────────────
// ANSI color-aware formatting (tsc --pretty)
// ────────────────────────────────────────────────────────────────────────────

const FG_GREY = "[90m";
const FG_RED = "[91m";
const FG_YELLOW = "[93m";
const FG_BLUE = "[94m";
const FG_CYAN = "[96m";
const GUTTER_STYLE = "[7m";
const GUTTER_SEPARATOR = " ";
const RESET = "[0m";
const ELLIPSIS = "...";

export interface FormattingOptions {
  newLine: string;
  currentDirectory: string;
  useCaseSensitiveFileNames: boolean;
  locale?: string;
}

const CATEGORY_FORMAT: Record<number, string> = {
  0: FG_YELLOW, // warning
  1: FG_RED, // error
  2: FG_GREY, // suggestion
  3: FG_BLUE, // message
};

function categoryFormat(category: number): string {
  return CATEGORY_FORMAT[category] ?? FG_BLUE;
}

function styled(text: string, style: string): string {
  return style + text + RESET;
}

function repeat(s: string, n: number): string {
  if (n <= 0) return "";
  return s.repeat(n);
}

function padLeft(text: string, width: number, pad = " "): string {
  if (text.length >= width) return text;
  return repeat(pad, width - text.length) + text;
}

/**
 * Format a single diagnostic with ANSI colors and an inline source
 * snippet. Mirrors TS-Go `FormatDiagnosticWithColorAndContext`.
 */
export function formatDiagnosticWithColorAndContext(d: Diagnostic, opts: FormattingOptions): string {
  const parts: string[] = [];
  const file = d.file();

  if (file !== undefined) {
    parts.push(writeLocation(file, d.pos(), opts));
    parts.push(" - ");
  }

  parts.push(styled(categoryName(d.category()), categoryFormat(d.category())));
  parts.push(` ${FG_GREY}TS${d.code()}: ${RESET}`);
  parts.push(d.localize());

  // Code snippet (skip if it's the binary-file diagnostic — but we don't
  // have access to that constant in TSTS, so emit always when file present)
  if (file !== undefined) {
    parts.push(opts.newLine);
    parts.push(writeCodeSnippet(file, d.pos(), d.end() - d.pos(), categoryFormat(d.category()), "", opts));
    parts.push(opts.newLine);
  }

  return parts.join("");
}

export function formatDiagnosticsWithColorAndContext(
  diags: readonly Diagnostic[],
  opts: FormattingOptions,
): string {
  if (diags.length === 0) return "";
  return diags.map((d) => formatDiagnosticWithColorAndContext(d, opts)).join(opts.newLine);
}

function writeLocation(file: FileLike, pos: number, opts: FormattingOptions): string {
  const { line, column } = locationForFileAndPos(file, pos);
  const relPath = relativizePath(file.fileName(), opts);
  return styled(relPath, FG_CYAN) + ":" + styled(String(line + 1), FG_YELLOW) + ":" + styled(String(column + 1), FG_YELLOW);
}

function writeCodeSnippet(
  file: FileLike,
  start: number,
  length: number,
  squiggleColor: string,
  indent: string,
  opts: FormattingOptions,
): string {
  const { line: firstLine, column: firstChar } = locationForFileAndPos(file, start);
  const endLoc = locationForFileAndPos(file, start + length);
  let lastLineChar = endLoc.column;
  const lastLine = endLoc.line;
  if (length === 0) lastLineChar += 1;

  const lineMap = file.ecmaLineMap();
  const lastLineOfFile = lineMap.length - 1;
  const source = file.text();

  const hasMoreThanFiveLines = lastLine - firstLine >= 4;
  let gutterWidth = String(lastLine + 1).length;
  if (hasMoreThanFiveLines) gutterWidth = Math.max(ELLIPSIS.length, gutterWidth);

  const out: string[] = [];

  let i = firstLine;
  while (i <= lastLine) {
    out.push(opts.newLine);
    if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
      out.push(indent);
      out.push(GUTTER_STYLE);
      out.push(padLeft(ELLIPSIS, gutterWidth));
      out.push(RESET);
      out.push(GUTTER_SEPARATOR);
      out.push(opts.newLine);
      i = lastLine - 1;
      continue;
    }
    const lineStart = lineMap[i] ?? 0;
    const lineEnd = i < lastLineOfFile ? (lineMap[i + 1] ?? source.length) : source.length;
    let lineContent = source.slice(lineStart, lineEnd).replace(/[\s]+$/, "");
    lineContent = lineContent.split("\t").join(" ");

    out.push(indent);
    out.push(GUTTER_STYLE);
    out.push(padLeft(String(i + 1), gutterWidth));
    out.push(RESET);
    out.push(GUTTER_SEPARATOR);
    out.push(lineContent);
    out.push(opts.newLine);

    // Squiggle line
    out.push(indent);
    out.push(GUTTER_STYLE);
    out.push(repeat(" ", gutterWidth));
    out.push(RESET);
    out.push(GUTTER_SEPARATOR);
    out.push(squiggleColor);

    if (i === firstLine) {
      const lastCharForLine = i === lastLine ? lastLineChar : lineContent.length;
      out.push(repeat(" ", firstChar));
      out.push(repeat("~", Math.max(0, lastCharForLine - firstChar)));
    } else if (i === lastLine) {
      out.push(repeat("~", Math.max(0, lastLineChar)));
    } else {
      out.push(repeat("~", lineContent.length));
    }
    out.push(RESET);
    i += 1;
  }
  return out.join("");
}

function relativizePath(absolutePath: string, opts: FormattingOptions): string {
  if (opts.currentDirectory === "") return absolutePath;
  // Light-weight version of tspath.ConvertToRelativePath — full version
  // is in tspath/path.ts; here we just do a prefix-strip for the common
  // case where the file lives under the current directory.
  if (absolutePath.startsWith(opts.currentDirectory + "/")) {
    return absolutePath.slice(opts.currentDirectory.length + 1);
  }
  return absolutePath;
}

// ────────────────────────────────────────────────────────────────────────────
// Error summary
// ────────────────────────────────────────────────────────────────────────────

export interface ErrorSummary {
  totalErrorCount: number;
  globalErrors: readonly Diagnostic[];
  errorsByFile: ReadonlyMap<FileLike, readonly Diagnostic[]>;
  sortedFiles: readonly FileLike[];
}

export function getErrorSummary(diags: readonly Diagnostic[]): ErrorSummary {
  let totalErrorCount = 0;
  const globalErrors: Diagnostic[] = [];
  const errorsByFile = new Map<FileLike, Diagnostic[]>();

  for (const d of diags) {
    if (d.category() !== 1 /* Error */) continue;
    totalErrorCount += 1;
    const file = d.file();
    if (file === undefined) globalErrors.push(d);
    else {
      const arr = errorsByFile.get(file);
      if (arr === undefined) errorsByFile.set(file, [d]);
      else arr.push(d);
    }
  }

  const sortedFiles = Array.from(errorsByFile.keys()).sort((a, b) => {
    const an = a.fileName();
    const bn = b.fileName();
    return an < bn ? -1 : an > bn ? 1 : 0;
  });

  return { totalErrorCount, globalErrors, errorsByFile, sortedFiles };
}

export function writeErrorSummaryText(diags: readonly Diagnostic[], opts: FormattingOptions): string {
  const summary = getErrorSummary(diags);
  if (summary.totalErrorCount === 0) return "";

  const numFiles = summary.errorsByFile.size;
  const first = summary.sortedFiles[0];
  const firstFileErrors = first !== undefined ? summary.errorsByFile.get(first) ?? [] : [];
  const firstFileName = prettyPathForFileError(first, firstFileErrors, opts);

  let message: string;
  if (summary.totalErrorCount === 1) {
    if (summary.globalErrors.length > 0 || firstFileName === "") {
      message = "Found 1 error.";
    } else {
      message = `Found 1 error in ${firstFileName}.`;
    }
  } else {
    if (numFiles === 0) {
      message = `Found ${summary.totalErrorCount} errors.`;
    } else if (numFiles === 1) {
      message = `Found ${summary.totalErrorCount} errors in the same file, starting at: ${firstFileName}.`;
    } else {
      message = `Found ${summary.totalErrorCount} errors in ${numFiles} files.`;
    }
  }

  const out: string[] = [opts.newLine, message, opts.newLine, opts.newLine];
  if (numFiles > 1) {
    out.push(writeTabularErrorsDisplay(summary, opts));
    out.push(opts.newLine);
  }
  return out.join("");
}

function writeTabularErrorsDisplay(summary: ErrorSummary, opts: FormattingOptions): string {
  let maxErrors = 0;
  for (const errs of summary.errorsByFile.values()) {
    if (errs.length > maxErrors) maxErrors = errs.length;
  }
  const headerRow = "Errors  Files";
  const leftColumnHeadingLength = headerRow.split(" ")[0]!.length;
  const lengthOfBiggestErrorCount = String(maxErrors).length;
  const leftPaddingGoal = Math.max(leftColumnHeadingLength, lengthOfBiggestErrorCount);
  const headerPadding = Math.max(lengthOfBiggestErrorCount - leftColumnHeadingLength, 0);

  const lines: string[] = [];
  lines.push(repeat(" ", headerPadding) + headerRow + opts.newLine);
  for (const file of summary.sortedFiles) {
    const errs = summary.errorsByFile.get(file) ?? [];
    lines.push(padLeft(String(errs.length), leftPaddingGoal) + "  " + prettyPathForFileError(file, errs, opts) + opts.newLine);
  }
  return lines.join("");
}

function prettyPathForFileError(
  file: FileLike | undefined,
  fileErrors: readonly Diagnostic[],
  opts: FormattingOptions,
): string {
  if (file === undefined || fileErrors.length === 0) return "";
  const { line } = locationForFileAndPos(file, fileErrors[0]!.pos());
  let fileName = file.fileName();
  if (fileName.startsWith("/") || /^[a-zA-Z]:/.test(fileName)) {
    fileName = relativizePath(fileName, opts);
  }
  return `${fileName}${FG_GREY}:${line + 1}${RESET}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Status + clear-screen helpers
// ────────────────────────────────────────────────────────────────────────────

export function formatDiagnosticsStatusWithColorAndTime(time: string, d: Diagnostic, opts: FormattingOptions): string {
  return `[${styled(time, FG_GREY)}] ${d.localize()}`;
}

export function formatDiagnosticsStatusAndTime(time: string, d: Diagnostic, opts: FormattingOptions): string {
  return `${time} - ${d.localize()}`;
}

/** Codes that trigger a screen-clear under tsc --watch. */
export const SCREEN_STARTING_CODES: readonly number[] = [
  6031, // Starting_compilation_in_watch_mode
  6032, // File_change_detected_Starting_incremental_compilation
];

export function shouldClearScreen(diagCode: number, opts: {
  preserveWatchOutput?: boolean;
  extendedDiagnostics?: boolean;
  diagnostics?: boolean;
}): boolean {
  if (opts.preserveWatchOutput || opts.extendedDiagnostics || opts.diagnostics) return false;
  return SCREEN_STARTING_CODES.includes(diagCode);
}

export const CLEAR_SCREEN_SEQUENCE = "\x1B[2J\x1B[3J\x1B[H";
