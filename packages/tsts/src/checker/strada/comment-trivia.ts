/**
 * Comment-trivia helpers.
 *
 * Ported from Strada `utilities.go` — extractTriviaComments,
 * isLineComment, isBlockComment.
 */

/**
 * Returns true when the text is a single-line comment (`//...`).
 */
export function isLineComment(text: string): boolean {
  return text.startsWith("//");
}

/**
 * Returns true when the text is a block comment (`/* ... *​/`).
 */
export function isBlockComment(text: string): boolean {
  return text.startsWith("/*") && text.endsWith("*/");
}

/**
 * Returns true when the text is a JSDoc comment (`/** ... *​/`).
 */
export function isJSDocComment(text: string): boolean {
  return text.startsWith("/**") && text.endsWith("*/");
}

/**
 * Returns the inner text of a line comment (without the leading `//`).
 */
export function getLineCommentInnerText(text: string): string {
  if (!isLineComment(text)) return text;
  return text.slice(2);
}

/**
 * Returns the inner text of a block comment (without delimiters).
 */
export function getBlockCommentInnerText(text: string): string {
  if (!isBlockComment(text)) return text;
  return text.slice(2, -2);
}

/**
 * Returns the inner text of a JSDoc comment (without delimiters).
 */
export function getJSDocCommentInnerText(text: string): string {
  if (!isJSDocComment(text)) return text;
  return text.slice(3, -2);
}

/**
 * Returns the lines of a multi-line comment, stripped of common
 * leading `* ` markers.
 */
export function getCommentLines(text: string): readonly string[] {
  const inner = isJSDocComment(text)
    ? getJSDocCommentInnerText(text)
    : isBlockComment(text)
      ? getBlockCommentInnerText(text)
      : text;
  const lines = inner.split("\n").map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("* ")) return trimmed.slice(2);
    if (trimmed === "*") return "";
    return trimmed;
  });
  // Drop leading/trailing empty lines.
  const ref: { start: number; end: number } = { start: 0, end: lines.length };
  while (ref.start < ref.end && lines[ref.start]!.trim() === "") ref.start++;
  while (ref.end > ref.start && lines[ref.end - 1]!.trim() === "") ref.end--;
  return lines.slice(ref.start, ref.end);
}

/**
 * Returns true when the comment is a "pinned" comment that the
 * emitter should preserve (license headers etc.).
 */
export function isPinnedComment(text: string): boolean {
  return text.startsWith("/*!") || text.startsWith("//!");
}
