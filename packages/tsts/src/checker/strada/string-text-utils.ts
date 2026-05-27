/**
 * String text utilities used by the checker.
 *
 * Ported from Strada `core/text.go` — getCharacterCount, getTextSlice,
 * isIdentifierPart, isIdentifierStart helpers used during diagnostic
 * range computation.
 */

/**
 * Returns true when the character is an ASCII letter.
 */
export function isAsciiLetter(ch: string): boolean {
  if (ch.length !== 1) return false;
  const code = ch.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

/**
 * Returns true when the character is an ASCII digit.
 */
export function isAsciiDigit(ch: string): boolean {
  if (ch.length !== 1) return false;
  const code = ch.charCodeAt(0);
  return code >= 48 && code <= 57;
}

/**
 * Returns true when the character can start a TypeScript identifier
 * (letter, underscore, or dollar sign).
 */
export function isIdentifierStart(ch: string): boolean {
  if (ch.length !== 1) return false;
  return isAsciiLetter(ch) || ch === "_" || ch === "$";
}

/**
 * Returns true when the character can continue a TypeScript
 * identifier.
 */
export function isIdentifierPart(ch: string): boolean {
  if (ch.length !== 1) return false;
  return isIdentifierStart(ch) || isAsciiDigit(ch);
}

/**
 * Returns true when the string is a valid TypeScript identifier.
 */
export function isValidIdentifier(text: string): boolean {
  if (text.length === 0) return false;
  if (!isIdentifierStart(text[0]!)) return false;
  for (let i = 1; i < text.length; i++) {
    if (!isIdentifierPart(text[i]!)) return false;
  }
  return true;
}

/**
 * Returns the character count of a string — TypeScript identifiers
 * can include astral codepoints; this returns the code-point count.
 */
export function getCharacterCount(text: string): number {
  return [...text].length;
}

/**
 * Splits a dotted name into its parts (`A.B.C` → ["A", "B", "C"]).
 */
export function splitDottedName(text: string): readonly string[] {
  return text.split(".");
}

/**
 * Joins a list of identifier parts with dots.
 */
export function joinDottedName(parts: readonly string[]): string {
  return parts.join(".");
}

/**
 * Returns true when the text is "kebab-case" (lowercase with dashes).
 */
export function isKebabCase(text: string): boolean {
  return /^[a-z]+(-[a-z]+)+$/.test(text);
}

/**
 * Returns true when the text is "PascalCase".
 */
export function isPascalCase(text: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(text);
}

/**
 * Returns true when the text is "camelCase".
 */
export function isCamelCase(text: string): boolean {
  return /^[a-z][A-Za-z0-9]*$/.test(text);
}
