import type { CommentRange, Node } from "../ast/index.js";
import { getJSDocCommentRanges, isJSDocLikeText } from "./utilities.js";

export interface ParsedJSDocTag {
  readonly name: string;
  readonly text: string;
}

export interface ParsedJSDocComment {
  readonly pos: number;
  readonly end: number;
  readonly text: string;
  readonly tags: readonly ParsedJSDocTag[];
}

export function parseJSDocForNode(sourceText: string, node: Node, factory: unknown): readonly ParsedJSDocComment[] {
  const ranges = getJSDocCommentRanges(factory as never, [], node, sourceText);
  const comments: ParsedJSDocComment[] = [];
  for (const range of ranges) {
    const parsed = parseJSDocComment(sourceText, range.pos, range.end);
    if (parsed !== undefined) comments.push(parsed);
  }
  return comments;
}

export function parseJSDocComment(sourceText: string, start: number, end: number): ParsedJSDocComment | undefined {
  const raw = sourceText.slice(start, end);
  if (!isJSDocLikeText(raw)) return undefined;
  const body = raw
    .replace(/^\/\*\*/, "")
    .replace(/\*\/$/, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\* ?/, ""))
    .join("\n");
  return { pos: start, end, text: body, tags: parseJSDocTags(body) };
}

export function parseSingleJSDocComment(text: string): ParsedJSDocComment | undefined {
  return parseJSDocComment(text, 0, text.length);
}

export function parseJSDocTags(text: string): readonly ParsedJSDocTag[] {
  const tags: ParsedJSDocTag[] = [];
  const lines = text.split(/\r?\n/);
  let current: { name: string; text: string[] } | undefined;
  for (const line of lines) {
    const tag = line.match(/^\s*@([A-Za-z][\w-]*)(?:\s+(.*))?$/);
    if (tag !== null) {
      if (current !== undefined) tags.push({ name: current.name, text: current.text.join("\n").trim() });
      current = { name: tag[1]!, text: tag[2] === undefined ? [] : [tag[2]] };
    } else if (current !== undefined) {
      current.text.push(line);
    }
  }
  if (current !== undefined) tags.push({ name: current.name, text: current.text.join("\n").trim() });
  return tags;
}

export function getJSDocCommentsFromRanges(sourceText: string, ranges: readonly CommentRange[]): readonly ParsedJSDocComment[] {
  return ranges
    .map((range) => parseJSDocComment(sourceText, range.pos, range.end))
    .filter((comment): comment is ParsedJSDocComment => comment !== undefined);
}
