/**
 * Stack trace sanitizer.
 *
 * Port of TS-Go `internal/lsp/stack_sanitizer.go`.
 */

export function sanitizeStack(stack: string): string {
  return stack
    .split("\n")
    .map(sanitizeStackLine)
    .filter(line => line.length > 0)
    .join("\n");
}

export function sanitizeStackLine(line: string): string {
  return line
    .replace(/\([^)]*[/\\]packages[/\\]tsts[/\\]/g, "(packages/tsts/")
    .replace(/file:\/\/[^)]*[/\\]packages[/\\]tsts[/\\]/g, "file://packages/tsts/")
    .trim();
}
