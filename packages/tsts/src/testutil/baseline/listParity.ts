/**
 * Baseline list parity helpers.
 */

export function parseBaselineList(text: string): ReadonlySet<string> {
  return new Set(text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0 && !line.startsWith("#")));
}

export function writeBaselineList(items: Iterable<string>): string {
  return [...items].sort().join("\n") + "\n";
}

export function mergeBaselineLists(left: ReadonlySet<string>, right: ReadonlySet<string>): ReadonlySet<string> {
  return new Set([...left, ...right]);
}
