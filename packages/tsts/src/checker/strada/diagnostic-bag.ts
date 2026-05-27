/**
 * Diagnostic bag — append-only collection of diagnostics with
 * filtering and sorting helpers.
 *
 * Ported from Strada `diagnosticbag.go` — used by per-file and
 * per-program diagnostic collection.
 */

import type { Node as AstNode } from "../../ast/index.js";
import type { DiagnosticMessage } from "../../diagnostics/types.js";

export interface BagDiagnostic {
  readonly fileName?: string | undefined;
  readonly node?: AstNode | undefined;
  readonly message: DiagnosticMessage;
  readonly args: readonly (string | number)[];
}

export interface DiagnosticBag {
  readonly entries: readonly BagDiagnostic[];
}

export function emptyBag(): DiagnosticBag {
  return { entries: [] };
}

/**
 * Returns a new bag with the diagnostic appended.
 */
export function addDiagnostic(
  bag: DiagnosticBag,
  diag: BagDiagnostic,
): DiagnosticBag {
  return { entries: [...bag.entries, diag] };
}

/**
 * Returns the diagnostic count.
 */
export function bagSize(bag: DiagnosticBag): number {
  return bag.entries.length;
}

/**
 * Returns true when the bag has no diagnostics.
 */
export function isEmpty(bag: DiagnosticBag): boolean {
  return bag.entries.length === 0;
}

/**
 * Returns the diagnostics filtered by file name.
 */
export function filterByFileName(
  bag: DiagnosticBag,
  fileName: string,
): readonly BagDiagnostic[] {
  return bag.entries.filter((d) => d.fileName === fileName);
}

/**
 * Returns the diagnostics filtered by category — Error / Warning /
 * Suggestion / Message.
 */
export function filterByCategory(
  bag: DiagnosticBag,
  category: number,
): readonly BagDiagnostic[] {
  return bag.entries.filter((d) => d.message.category === category);
}

/**
 * Returns the diagnostic count for a specific category.
 */
export function countByCategory(bag: DiagnosticBag, category: number): number {
  return filterByCategory(bag, category).length;
}

/**
 * Returns the error count in the bag.
 */
export function errorCount(bag: DiagnosticBag): number {
  return countByCategory(bag, 1);
}

/**
 * Concatenates two bags into a new bag.
 */
export function mergeBags(a: DiagnosticBag, b: DiagnosticBag): DiagnosticBag {
  return { entries: [...a.entries, ...b.entries] };
}

/**
 * Returns a new bag with the diagnostics sorted by code.
 */
export function sortByCode(bag: DiagnosticBag): DiagnosticBag {
  const sorted = [...bag.entries].sort(
    (a, b) => a.message.code - b.message.code,
  );
  return { entries: sorted };
}

/**
 * Returns a new bag with the diagnostics deduplicated by
 * (fileName, code, args) signature.
 */
export function dedupe(bag: DiagnosticBag): DiagnosticBag {
  const seen = new Set<string>();
  const unique: BagDiagnostic[] = [];
  for (const d of bag.entries) {
    const key = `${d.fileName ?? ""}|${d.message.code}|${d.args.join(",")}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(d);
  }
  return { entries: unique };
}
