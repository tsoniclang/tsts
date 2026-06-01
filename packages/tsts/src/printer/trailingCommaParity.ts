/**
 * Trailing comma parity helpers.
 */

export function shouldEmitTrailingComma(elementCount: number, multiline: boolean): boolean {
  return multiline && elementCount > 0;
}

export function trimTrailingComma(text: string): string {
  return text.replace(/,\s*$/, "");
}
