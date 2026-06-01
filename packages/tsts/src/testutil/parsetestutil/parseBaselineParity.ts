/**
 * Parse baseline parity helpers.
 */

export interface ParseBaselineEntry {
  readonly fileName: string;
  readonly tree: string;
  readonly diagnostics: readonly string[];
}

export function writeParseBaseline(entries: readonly ParseBaselineEntry[]): string {
  return entries.map(entry => [
    `=== ${entry.fileName} ===`,
    entry.tree.trimEnd(),
    ...entry.diagnostics.map(diagnostic => `! ${diagnostic}`),
  ].join("\n")).join("\n\n");
}

export function parseBaselineHasDiagnostics(entries: readonly ParseBaselineEntry[]): boolean {
  return entries.some(entry => entry.diagnostics.length > 0);
}

export function sortParseBaselineEntries(entries: readonly ParseBaselineEntry[]): readonly ParseBaselineEntry[] {
  return [...entries].sort((left, right) => left.fileName.localeCompare(right.fileName));
}
