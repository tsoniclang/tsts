import {
  cleanJSDocText,
  isJSDocTagStart,
  normalizeJSDocCommentText,
  readJSDocTagName,
  readJSDocTagText,
} from "./jsdoc-scanner.js";

export type JSDocTagKind =
  | "augments"
  | "callback"
  | "class"
  | "constructor"
  | "deprecated"
  | "enum"
  | "extends"
  | "import"
  | "implements"
  | "link"
  | "linkcode"
  | "linkplain"
  | "module"
  | "overload"
  | "param"
  | "private"
  | "property"
  | "public"
  | "readonly"
  | "returns"
  | "satisfies"
  | "see"
  | "template"
  | "this"
  | "throws"
  | "type"
  | "typedef"
  | "unknown";

export interface JSDocTagRecord {
  readonly kind: JSDocTagKind;
  readonly tagName: string;
  readonly typeExpression: string;
  readonly name: string;
  readonly optional: boolean;
  readonly defaultValue: string;
  readonly comment: string;
  readonly pos: number;
  readonly end: number;
}

export interface JSDocCommentRecord {
  readonly comment: string;
  readonly tags: readonly JSDocTagRecord[];
}

export interface ParsedJSDocName {
  readonly name: string;
  readonly optional: boolean;
  readonly defaultValue: string;
}

export function parseJSDocCommentRecord(text: string): JSDocCommentRecord {
  const body = cleanJSDocText(text);
  const lines = body.split(/\r?\n/);
  const commentLines: string[] = [];
  const tagLines: string[] = [];
  let inTags = false;
  for (const line of lines) {
    if (isJSDocTagStart(line)) inTags = true;
    if (inTags) tagLines.push(line);
    else commentLines.push(line);
  }
  return {
    comment: normalizeJSDocCommentText(commentLines.join("\n")),
    tags: parseJSDocTagRecords(tagLines.join("\n")),
  };
}

export function parseJSDocTagRecords(text: string): readonly JSDocTagRecord[] {
  const lines = cleanJSDocText(text).split(/\r?\n/);
  const tags: JSDocTagRecord[] = [];
  let currentName = "";
  let currentLines: string[] = [];
  let currentPos = 0;
  let offset = 0;
  const flush = (end: number): void => {
    if (currentName === "") return;
    tags.push(parseJSDocTagRecord(currentName, currentLines.join("\n"), currentPos, end));
    currentName = "";
    currentLines = [];
  };
  for (const line of lines) {
    if (isJSDocTagStart(line)) {
      flush(offset);
      currentName = readJSDocTagName(line);
      currentLines = [readJSDocTagText(line)];
      currentPos = offset + line.indexOf("@");
    } else if (currentName !== "") {
      currentLines.push(line);
    }
    offset += line.length + 1;
  }
  flush(offset);
  return tags;
}

export function parseJSDocTagRecord(tagName: string, text: string, pos: number, end: number): JSDocTagRecord {
  const normalizedTagName = tagName.toLowerCase();
  const type = parseJSDocLeadingType(text);
  const afterType = type === "" ? text.trimStart() : text.trimStart().slice(type.length + 2).trimStart();
  const parsedName = parseJSDocLeadingName(afterType);
  const comment = parsedName.name === ""
    ? afterType.trim()
    : afterType.slice(rawNameLength(afterType)).trimStart();
  return {
    kind: classifyJSDocTagName(normalizedTagName),
    tagName: normalizedTagName,
    typeExpression: type,
    name: parsedName.name,
    optional: parsedName.optional,
    defaultValue: parsedName.defaultValue,
    comment,
    pos,
    end,
  };
}

export function classifyJSDocTagName(name: string): JSDocTagKind {
  switch (name) {
    case "augments":
      return "augments";
    case "callback":
      return "callback";
    case "class":
      return "class";
    case "constructor":
      return "constructor";
    case "deprecated":
      return "deprecated";
    case "enum":
      return "enum";
    case "extends":
      return "extends";
    case "import":
      return "import";
    case "implements":
      return "implements";
    case "link":
      return "link";
    case "linkcode":
      return "linkcode";
    case "linkplain":
      return "linkplain";
    case "module":
      return "module";
    case "overload":
      return "overload";
    case "param":
    case "arg":
    case "argument":
      return "param";
    case "private":
      return "private";
    case "property":
    case "prop":
      return "property";
    case "public":
      return "public";
    case "readonly":
      return "readonly";
    case "returns":
    case "return":
      return "returns";
    case "satisfies":
      return "satisfies";
    case "see":
      return "see";
    case "template":
      return "template";
    case "this":
      return "this";
    case "throws":
    case "exception":
      return "throws";
    case "type":
      return "type";
    case "typedef":
      return "typedef";
  }
  return "unknown";
}

export function parseJSDocLeadingType(text: string): string {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("{")) return "";
  let depth = 0;
  let inString: string | undefined;
  let escaped = false;
  for (let index = 0; index < trimmed.length; index += 1) {
    const char = trimmed[index]!;
    if (inString !== undefined) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === inString) {
        inString = undefined;
      }
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      inString = char;
      continue;
    }
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return trimmed.slice(1, index).trim();
    }
  }
  return "";
}

export function parseJSDocLeadingName(text: string): ParsedJSDocName {
  const trimmed = text.trimStart();
  if (trimmed === "") return { name: "", optional: false, defaultValue: "" };
  if (trimmed.startsWith("[")) return parseBracketedJSDocName(trimmed);
  const token = firstJSDocWord(trimmed);
  if (token === "") return { name: "", optional: false, defaultValue: "" };
  return { name: token, optional: false, defaultValue: "" };
}

export function parseBracketedJSDocName(text: string): ParsedJSDocName {
  const close = findMatchingBracket(text);
  if (close < 0) return { name: "", optional: false, defaultValue: "" };
  const inner = text.slice(1, close).trim();
  const equals = findTopLevelEquals(inner);
  if (equals < 0) return { name: inner, optional: true, defaultValue: "" };
  return {
    name: inner.slice(0, equals).trim(),
    optional: true,
    defaultValue: inner.slice(equals + 1).trim(),
  };
}

export function splitJSDocTypeUnion(typeExpression: string): readonly string[] {
  const result: string[] = [];
  let start = 0;
  let depth = 0;
  for (let index = 0; index < typeExpression.length; index += 1) {
    const char = typeExpression[index]!;
    if (char === "{" || char === "(" || char === "[") depth += 1;
    else if (char === "}" || char === ")" || char === "]") depth -= 1;
    else if (char === "|" && depth === 0) {
      result.push(typeExpression.slice(start, index).trim());
      start = index + 1;
    }
  }
  result.push(typeExpression.slice(start).trim());
  return result.filter((part) => part !== "");
}

export function parseJSDocTemplateNames(text: string): readonly string[] {
  const withoutType = parseJSDocLeadingType(text) === ""
    ? text
    : text.trimStart().slice(parseJSDocLeadingType(text).length + 2);
  return withoutType.split(",").map((part) => firstJSDocWord(part.trim())).filter((part) => part !== "");
}

export function parseJSDocImportPath(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("\"") || trimmed.startsWith("'")) {
    const quote = trimmed[0]!;
    const end = trimmed.indexOf(quote, 1);
    return end < 0 ? "" : trimmed.slice(1, end);
  }
  const match = trimmed.match(/import\s*\(\s*["']([^"']+)["']\s*\)/);
  return match?.[1] ?? "";
}

export function parseInlineJSDocLinks(text: string): readonly JSDocTagRecord[] {
  const tags: JSDocTagRecord[] = [];
  let index = 0;
  while (index < text.length) {
    const open = text.indexOf("{@", index);
    if (open < 0) break;
    const close = text.indexOf("}", open + 2);
    if (close < 0) break;
    const body = text.slice(open + 2, close).trim();
    const name = firstJSDocWord(body);
    const rest = body.slice(name.length).trimStart();
    tags.push({
      kind: classifyJSDocTagName(name),
      tagName: name,
      typeExpression: "",
      name: firstJSDocWord(rest),
      optional: false,
      defaultValue: "",
      comment: rest,
      pos: open,
      end: close + 1,
    });
    index = close + 1;
  }
  return tags;
}

export function hasJSDocTag(comment: JSDocCommentRecord, kind: JSDocTagKind): boolean {
  return comment.tags.some((tag) => tag.kind === kind);
}

export function getJSDocTagsByKind(comment: JSDocCommentRecord, kind: JSDocTagKind): readonly JSDocTagRecord[] {
  return comment.tags.filter((tag) => tag.kind === kind);
}

export function firstJSDocWord(text: string): string {
  const trimmed = text.trimStart();
  let index = 0;
  while (index < trimmed.length) {
    const char = trimmed[index]!;
    if (char === " " || char === "\t" || char === "\r" || char === "\n") break;
    index += 1;
  }
  return trimmed.slice(0, index);
}

function rawNameLength(text: string): number {
  const trimmedStart = text.length - text.trimStart().length;
  const trimmed = text.trimStart();
  if (trimmed.startsWith("[")) {
    const close = findMatchingBracket(trimmed);
    return close < 0 ? trimmedStart : trimmedStart + close + 1;
  }
  return trimmedStart + firstJSDocWord(trimmed).length;
}

function findMatchingBracket(text: string): number {
  let depth = 0;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]!;
    if (char === "[") depth += 1;
    else if (char === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function findTopLevelEquals(text: string): number {
  let depth = 0;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]!;
    if (char === "[" || char === "{" || char === "(") depth += 1;
    else if (char === "]" || char === "}" || char === ")") depth -= 1;
    else if (char === "=" && depth === 0) return index;
  }
  return -1;
}
