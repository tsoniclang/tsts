import type { CommentRange, Node } from "../ast/index.js";
import { getJSDocCommentRanges, isJSDocLikeText } from "./utilities.js";

export interface ParsedJSDocTag {
  name: string;
  text: string;
  pos?: number;
  end?: number;
  typeExpression?: string;
  parameterName?: string;
  optional?: boolean;
  defaultValue?: string;
}

export interface ParsedJSDocComment {
  readonly pos: number;
  readonly end: number;
  readonly text: string;
  readonly summary: string;
  readonly tags: readonly ParsedJSDocTag[];
  readonly links: readonly ParsedJSDocLink[];
}

export interface ParsedJSDocLink {
  readonly kind: "link" | "linkcode" | "linkplain" | "see";
  readonly target: string;
  readonly text: string;
  readonly pos: number;
  readonly end: number;
}

export interface JSDocLine {
  readonly text: string;
  readonly pos: number;
  readonly end: number;
  readonly margin: number;
}

const enum JSDocState {
  BeginningOfLine,
  SawAsterisk,
  SavingComments,
  SavingBackticks,
}

const enum PropertyLikeParse {
  Property = 1 << 0,
  Parameter = 1 << 1,
  CallbackParameter = 1 << 2,
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
  const lines = scanJSDocLines(sourceText, start, end);
  const body = lines.map((line) => line.text).join("\n");
  const tags = parseJSDocTagsFromLines(lines);
  const tagStart = firstTagPosition(lines);
  const summary = tagStart === undefined
    ? body.trim()
    : body.slice(0, Math.max(0, tagStart - lines[0]!.pos)).trim();
  return {
    pos: start,
    end,
    text: body,
    summary,
    tags,
    links: parseJSDocLinks(body, start),
  };
}

export function parseSingleJSDocComment(text: string): ParsedJSDocComment | undefined {
  return parseJSDocComment(text, 0, text.length);
}

export function parseJSDocTags(text: string): readonly ParsedJSDocTag[] {
  return parseJSDocTagsFromLines(linesFromBody(text, 0));
}

export function scanJSDocLines(sourceText: string, start: number, end: number): readonly JSDocLine[] {
  const contentStart = start + 3;
  const contentEnd = Math.max(contentStart, end - 2);
  const rawBody = sourceText.slice(contentStart, contentEnd);
  const rawLines = splitLinesWithOffsets(rawBody, contentStart);
  const lines: JSDocLine[] = [];
  for (const rawLine of rawLines) {
    const normalized = normalizeJSDocLine(rawLine.text);
    lines.push({
      text: normalized.text,
      pos: rawLine.pos + normalized.offset,
      end: rawLine.pos + rawLine.text.length,
      margin: normalized.margin,
    });
  }
  return lines;
}

function linesFromBody(text: string, offset: number): readonly JSDocLine[] {
  return splitLinesWithOffsets(text, offset).map((line) => ({
    text: line.text,
    pos: line.pos,
    end: line.end,
    margin: leadingWhitespaceWidth(line.text),
  }));
}

function splitLinesWithOffsets(text: string, offset: number): readonly JSDocLine[] {
  const result: JSDocLine[] = [];
  let lineStart = 0;
  let position = 0;
  while (position < text.length) {
    const code = text.charCodeAt(position);
    if (code === 0x0D || code === 0x0A) {
      const end = position;
      if (code === 0x0D && position + 1 < text.length && text.charCodeAt(position + 1) === 0x0A) {
        position += 2;
      } else {
        position += 1;
      }
      result.push({
        text: text.slice(lineStart, end),
        pos: offset + lineStart,
        end: offset + end,
        margin: 0,
      });
      lineStart = position;
      continue;
    }
    position += 1;
  }
  result.push({
    text: text.slice(lineStart),
    pos: offset + lineStart,
    end: offset + text.length,
    margin: 0,
  });
  return result;
}

function normalizeJSDocLine(line: string): { text: string; offset: number; margin: number } {
  let index = 0;
  while (index < line.length && isHorizontalWhitespace(line.charCodeAt(index))) index += 1;
  if (line.charCodeAt(index) === 0x2A) {
    index += 1;
    if (line.charCodeAt(index) === 0x20) index += 1;
  }
  return {
    text: line.slice(index),
    offset: index,
    margin: leadingWhitespaceWidth(line.slice(0, index)),
  };
}

function leadingWhitespaceWidth(text: string): number {
  let width = 0;
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code === 0x20) width += 1;
    else if (code === 0x09) width += 4 - (width % 4);
    else break;
  }
  return width;
}

function isHorizontalWhitespace(code: number): boolean {
  return code === 0x20 || code === 0x09 || code === 0x0B || code === 0x0C;
}

function firstTagPosition(lines: readonly JSDocLine[]): number | undefined {
  for (const line of lines) {
    const tagStart = findTagStart(line.text);
    if (tagStart !== -1) return line.pos + tagStart;
  }
  return undefined;
}

function parseJSDocTagsFromLines(lines: readonly JSDocLine[]): readonly ParsedJSDocTag[] {
  const tags: ParsedJSDocTag[] = [];
  let current: { name: string; text: string[] } | undefined;
  for (const line of lines) {
    const tagStart = findTagStart(line.text);
    if (tagStart !== -1) {
      if (current !== undefined) tags.push(finishTag(current));
      const parsed = parseJSDocTagLine(line, tagStart);
      current = { name: parsed.name, text: parsed.text === "" ? [] : [parsed.text] };
      tags.push(parsed);
      current = undefined;
    } else if (current !== undefined) {
      current.text.push(line.text);
    }
  }
  if (current !== undefined) tags.push(finishTag(current));
  return tags;
}

function finishTag(current: { name: string; text: string[] }): ParsedJSDocTag {
  return { name: current.name, text: removeTrailingWhitespace(current.text).join("\n").trim() };
}

function findTagStart(line: string): number {
  let index = 0;
  while (index < line.length && isHorizontalWhitespace(line.charCodeAt(index))) index += 1;
  return line.charCodeAt(index) === 0x40 ? index : -1;
}

function parseJSDocTagLine(line: JSDocLine, tagStart: number): ParsedJSDocTag {
  const nameStart = tagStart + 1;
  const nameEnd = scanIdentifierEnd(line.text, nameStart);
  const name = line.text.slice(nameStart, nameEnd);
  const payload = line.text.slice(nameEnd).trim();
  const base = parseTagPayload(name, payload);
  return {
    ...base,
    pos: line.pos + tagStart,
    end: line.end,
  };
}

function scanIdentifierEnd(text: string, start: number): number {
  let position = start;
  while (position < text.length) {
    const code = text.charCodeAt(position);
    const isIdentifier =
      (code >= 0x41 && code <= 0x5A) ||
      (code >= 0x61 && code <= 0x7A) ||
      (code >= 0x30 && code <= 0x39) ||
      code === 0x5F ||
      code === 0x2D;
    if (!isIdentifier) break;
    position += 1;
  }
  return position;
}

function parseTagPayload(name: string, payload: string): ParsedJSDocTag {
  const typeResult = parseLeadingTypeExpression(payload);
  const afterType = typeResult === undefined ? payload : payload.slice(typeResult.end).trimStart();
  const propertyLike = parsePropertyLikeTag(name, afterType);
  return {
    name,
    text: propertyLike.rest,
    ...(typeResult === undefined ? {} : { typeExpression: typeResult.type }),
    ...(propertyLike.parameterName === undefined ? {} : { parameterName: propertyLike.parameterName }),
    ...(propertyLike.optional === undefined ? {} : { optional: propertyLike.optional }),
    ...(propertyLike.defaultValue === undefined ? {} : { defaultValue: propertyLike.defaultValue }),
  };
}

function parseLeadingTypeExpression(payload: string): { type: string; end: number } | undefined {
  if (payload.charCodeAt(0) !== 0x7B) return undefined;
  let depth = 0;
  let inString = 0;
  let escaped = false;
  for (let index = 0; index < payload.length; index += 1) {
    const code = payload.charCodeAt(index);
    if (inString !== 0) {
      if (escaped) escaped = false;
      else if (code === 0x5C) escaped = true;
      else if (code === inString) inString = 0;
      continue;
    }
    if (code === 0x22 || code === 0x27 || code === 0x60) {
      inString = code;
      continue;
    }
    if (code === 0x7B) depth += 1;
    else if (code === 0x7D) {
      depth -= 1;
      if (depth === 0) {
        return { type: payload.slice(1, index).trim(), end: index + 1 };
      }
    }
  }
  return undefined;
}

function parsePropertyLikeTag(name: string, payload: string): {
  parameterName?: string;
  optional?: boolean;
  defaultValue?: string;
  rest: string;
} {
  const mode = propertyLikeParseMode(name);
  if (mode === 0) return { rest: payload };
  const trimmed = payload.trimStart();
  if (trimmed.charCodeAt(0) === 0x5B) return parseBracketedName(trimmed);
  const match = /^([A-Za-z_$][\w$.-]*)(?:\s+(.*))?$/.exec(trimmed);
  if (match === null) return { rest: payload };
  const parameterName = match[1];
  if (parameterName === undefined) return { rest: payload };
  return { parameterName, rest: match[2]?.trim() ?? "" };
}

function propertyLikeParseMode(name: string): PropertyLikeParse | 0 {
  switch (name) {
    case "param":
    case "arg":
    case "argument":
      return PropertyLikeParse.Parameter;
    case "property":
    case "prop":
      return PropertyLikeParse.Property;
    case "callback":
      return PropertyLikeParse.CallbackParameter;
    default:
      return 0;
  }
}

function parseBracketedName(payload: string): {
  parameterName?: string;
  optional: boolean;
  defaultValue?: string;
  rest: string;
} {
  const close = payload.indexOf("]");
  if (close < 0) return { optional: false, rest: payload };
  const inside = payload.slice(1, close).trim();
  const equals = inside.indexOf("=");
  const parameterName = equals < 0 ? inside : inside.slice(0, equals).trim();
  const defaultValue = equals < 0 ? undefined : inside.slice(equals + 1).trim();
  const result: {
    parameterName?: string;
    optional: boolean;
    defaultValue?: string;
    rest: string;
  } = {
    parameterName,
    optional: true,
    rest: payload.slice(close + 1).trim(),
  };
  if (defaultValue !== undefined) result.defaultValue = defaultValue;
  return result;
}

export function parseJSDocLinks(text: string, basePos: number = 0): readonly ParsedJSDocLink[] {
  const links: ParsedJSDocLink[] = [];
  let index = 0;
  while (index < text.length) {
    const at = text.indexOf("@", index);
    if (at < 0) break;
    const parsed = parseInlineLink(text, at, basePos);
    if (parsed === undefined) {
      index = at + 1;
      continue;
    }
    links.push(parsed);
    index = parsed.end - basePos;
  }
  return links;
}

export function getJSDocTag(comment: ParsedJSDocComment, tagName: string): ParsedJSDocTag | undefined {
  const normalized = tagName.toLowerCase();
  for (const tag of comment.tags) {
    if (tag.name.toLowerCase() === normalized) return tag;
  }
  return undefined;
}

export function hasJSDocTag(comment: ParsedJSDocComment, tagName: string): boolean {
  return getJSDocTag(comment, tagName) !== undefined;
}

export function isJSDocDeprecated(comment: ParsedJSDocComment): boolean {
  return hasJSDocTag(comment, "deprecated");
}

export function getJSDocParameterTags(comment: ParsedJSDocComment): readonly ParsedJSDocTag[] {
  return comment.tags.filter((tag) => propertyLikeParseMode(tag.name) === PropertyLikeParse.Parameter);
}

export function getJSDocPropertyTags(comment: ParsedJSDocComment): readonly ParsedJSDocTag[] {
  return comment.tags.filter((tag) => propertyLikeParseMode(tag.name) === PropertyLikeParse.Property);
}

export function getJSDocReturnTag(comment: ParsedJSDocComment): ParsedJSDocTag | undefined {
  return getJSDocTag(comment, "returns") ?? getJSDocTag(comment, "return");
}

// tsgo isJSDocLinkTag (jsdoc.go:775-777): the three inline link-tag kinds.
export function isJSDocLinkTag(kind: string): boolean {
  return kind === "link" || kind === "linkcode" || kind === "linkplain";
}

function parseInlineLink(text: string, at: number, basePos: number): ParsedJSDocLink | undefined {
  const nameEnd = scanIdentifierEnd(text, at + 1);
  const tag = text.slice(at + 1, nameEnd).toLowerCase();
  if (!isJSDocLinkTag(tag) && tag !== "see") return undefined;
  let position = nameEnd;
  while (position < text.length && isHorizontalWhitespace(text.charCodeAt(position))) position += 1;
  let close: number;
  if (text.charCodeAt(position) === 0x7B) {
    close = findBalancedClose(text, position, 0x7B, 0x7D);
    if (close < 0) return undefined;
    position += 1;
  } else {
    close = scanLinkTextEnd(text, position);
  }
  const payload = text.slice(position, close).trim();
  const split = splitLinkPayload(payload);
  return {
    kind: tag as ParsedJSDocLink["kind"],
    target: split.target,
    text: split.text,
    pos: basePos + at,
    end: basePos + (text.charCodeAt(nameEnd) === 0x7B ? close + 1 : close),
  };
}

function findBalancedClose(text: string, open: number, openCode: number, closeCode: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code === openCode) depth += 1;
    else if (code === closeCode) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function scanLinkTextEnd(text: string, start: number): number {
  let position = start;
  while (position < text.length) {
    const code = text.charCodeAt(position);
    if (code === 0x0D || code === 0x0A) break;
    position += 1;
  }
  return position;
}

function splitLinkPayload(payload: string): { target: string; text: string } {
  const pipe = payload.indexOf("|");
  if (pipe >= 0) {
    return {
      target: payload.slice(0, pipe).trim(),
      text: payload.slice(pipe + 1).trim(),
    };
  }
  const firstSpace = payload.search(/\s/);
  if (firstSpace >= 0) {
    return {
      target: payload.slice(0, firstSpace).trim(),
      text: payload.slice(firstSpace).trim(),
    };
  }
  return { target: payload, text: "" };
}

function removeTrailingWhitespace(lines: readonly string[]): readonly string[] {
  const result = [...lines];
  while (result.length > 0 && result[result.length - 1]!.trim() === "") {
    result.pop();
  }
  return result;
}

export function getJSDocCommentsFromRanges(sourceText: string, ranges: readonly CommentRange[]): readonly ParsedJSDocComment[] {
  return ranges
    .map((range) => parseJSDocComment(sourceText, range.pos, range.end))
    .filter((comment): comment is ParsedJSDocComment => comment !== undefined);
}
