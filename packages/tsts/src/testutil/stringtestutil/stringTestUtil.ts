export function dedent(text: string): string {
  const normalized = text.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  while (lines.length > 0 && lines[0]!.trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1]!.trim() === "") lines.pop();
  const indent = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0)
    .reduce((min, value) => Math.min(min, value), Number.POSITIVE_INFINITY);
  if (!Number.isFinite(indent) || indent === 0) return lines.join("\n");
  return lines.map((line) => line.slice(indent)).join("\n");
}

export function normalizeNewlines(text: string): string {
  return text.replace(/\r\n?/g, "\n");
}

export function lines(text: string): readonly string[] {
  return normalizeNewlines(text).split("\n");
}

export function trimTrailingWhitespace(text: string): string {
  return normalizeNewlines(text)
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");
}

export function removeByteOrderMark(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

export function assertEqualText(actual: string, expected: string): void {
  const left = trimTrailingWhitespace(removeByteOrderMark(actual));
  const right = trimTrailingWhitespace(removeByteOrderMark(expected));
  if (left !== right) {
    throw new Error(`text mismatch\n${lineDiff(left, right)}`);
  }
}

export function lineDiff(actual: string, expected: string): string {
  const actualLines = lines(actual);
  const expectedLines = lines(expected);
  const max = Math.max(actualLines.length, expectedLines.length);
  const out: string[] = [];
  for (let index = 0; index < max; index += 1) {
    const actualLine = actualLines[index];
    const expectedLine = expectedLines[index];
    if (actualLine === expectedLine) continue;
    out.push(`line ${index + 1}:`);
    if (expectedLine !== undefined) out.push(`  expected: ${expectedLine}`);
    if (actualLine !== undefined) out.push(`  actual:   ${actualLine}`);
  }
  return out.join("\n");
}
