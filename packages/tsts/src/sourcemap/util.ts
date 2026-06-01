/**
 * Sourcemap utility helpers.
 *
 * Port of TS-Go `internal/sourcemap/util.go` (29 LoC).
 * Recovers a `//# sourceMappingURL=...` comment from a generated file.
 */

import type { ECMALineInfo } from "./lineInfo.js";
import { isLineBreak, isWhiteSpaceLike } from "../stringutil/util.js";

export function tryGetSourceMappingURL(lineInfo: ECMALineInfo | undefined): string {
  if (lineInfo === undefined) return "";
  for (let index = lineInfo.lineCount() - 1; index >= 0; index--) {
    let line = lineInfo.lineText(index);
    line = trimLeftWhitespace(line);
    line = trimRightLineBreaks(line);
    if (line.length === 0) continue;
    if (
      line.length < 4 ||
      !line.startsWith("//") ||
      (line[2] !== "#" && line[2] !== "@") ||
      line[3] !== " "
    ) {
      break;
    }
    const prefix = "sourceMappingURL=";
    const rest = line.slice(4);
    if (rest.startsWith(prefix)) {
      return trimRightWhitespace(rest.slice(prefix.length));
    }
  }
  return "";
}

function trimLeftWhitespace(s: string): string {
  let i = 0;
  while (i < s.length && isWhiteSpaceLike(s.charCodeAt(i))) i++;
  return s.slice(i);
}

function trimRightLineBreaks(s: string): string {
  let i = s.length;
  while (i > 0 && isLineBreak(s.charCodeAt(i - 1))) i--;
  return s.slice(0, i);
}

function trimRightWhitespace(s: string): string {
  let i = s.length;
  while (i > 0 && isWhiteSpaceLike(s.charCodeAt(i - 1))) i--;
  return s.slice(0, i);
}
