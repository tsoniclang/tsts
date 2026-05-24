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
