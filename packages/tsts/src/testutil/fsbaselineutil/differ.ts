export interface DiffLine {
  readonly kind: "same" | "added" | "removed";
  readonly text: string;
}

export function diffLines(actual: readonly string[], expected: readonly string[]): readonly DiffLine[] {
  const out: DiffLine[] = [];
  let left = 0;
  let right = 0;
  while (left < actual.length || right < expected.length) {
    if (actual[left] === expected[right]) {
      out.push({ kind: "same", text: actual[left] ?? "" });
      left += 1;
      right += 1;
      continue;
    }
    if (right < expected.length) {
      out.push({ kind: "removed", text: expected[right]! });
      right += 1;
    }
    if (left < actual.length) {
      out.push({ kind: "added", text: actual[left]! });
      left += 1;
    }
  }
  return out;
}

export function formatDiff(diff: readonly DiffLine[]): string {
  return diff
    .map((line) => `${line.kind === "same" ? " " : line.kind === "added" ? "+" : "-"} ${line.text}`)
    .join("\n");
}
