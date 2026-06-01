/**
 * String comparison parity helpers.
 */

export interface StringComparisonSpan {
  readonly start: number;
  readonly length: number;
  readonly expected: string;
  readonly actual: string;
}

export function normalizeTestString(text: string): string {
  return text.replace(/\r\n/g, "\n").trimEnd();
}

export function testStringsEqual(left: string, right: string): boolean {
  return normalizeTestString(left) === normalizeTestString(right);
}

export function firstStringDifference(expected: string, actual: string): StringComparisonSpan | undefined {
  const normalizedExpected = normalizeTestString(expected);
  const normalizedActual = normalizeTestString(actual);
  const length = Math.max(normalizedExpected.length, normalizedActual.length);
  for (let index = 0; index < length; index += 1) {
    if (normalizedExpected[index] !== normalizedActual[index]) {
      return {
        start: index,
        length: 1,
        expected: normalizedExpected[index] ?? "",
        actual: normalizedActual[index] ?? "",
      };
    }
  }
  return undefined;
}

export function lineColumnOfStringOffset(text: string, offset: number): { readonly line: number; readonly column: number } {
  let line = 0;
  let column = 0;
  for (let index = 0; index < offset && index < text.length; index += 1) {
    if (text[index] === "\n") {
      line += 1;
      column = 0;
    } else {
      column += 1;
    }
  }
  return { line, column };
}

export function formatStringDifference(expected: string, actual: string): string {
  const difference = firstStringDifference(expected, actual);
  if (difference === undefined) return "strings are equal";
  const position = lineColumnOfStringOffset(normalizeTestString(expected), difference.start);
  return `first difference at ${position.line + 1}:${position.column + 1}; expected ${JSON.stringify(difference.expected)}, actual ${JSON.stringify(difference.actual)}`;
}
