import type { Node } from "../ast/index.js";
import { Kind } from "../ast/index.js";

export interface JsxElementFrame {
  readonly tagName: string;
  readonly opening: Node | undefined;
  readonly children: readonly Node[];
  readonly selfClosing: boolean;
}

export interface JsxParseDecision {
  readonly kind: "element" | "fragment" | "self-closing" | "text" | "expression" | "closing" | "none";
  readonly shouldRescan: boolean;
  readonly diagnostic: string;
}

export function classifyJsxStart(token: Kind, nextToken: Kind): JsxParseDecision {
  if (token === Kind.LessThanSlashToken) return { kind: "closing", shouldRescan: false, diagnostic: "" };
  if (token !== Kind.LessThanToken) return { kind: "none", shouldRescan: false, diagnostic: "" };
  if (nextToken === Kind.GreaterThanToken) return { kind: "fragment", shouldRescan: false, diagnostic: "" };
  if (nextToken === Kind.Identifier || nextToken === Kind.ThisKeyword) return { kind: "element", shouldRescan: true, diagnostic: "" };
  return { kind: "none", shouldRescan: false, diagnostic: "JSX element expected." };
}

export function classifyJsxChild(token: Kind): JsxParseDecision {
  switch (token) {
    case Kind.JsxText:
      return { kind: "text", shouldRescan: false, diagnostic: "" };
    case Kind.OpenBraceToken:
      return { kind: "expression", shouldRescan: false, diagnostic: "" };
    case Kind.LessThanToken:
      return { kind: "element", shouldRescan: true, diagnostic: "" };
    case Kind.LessThanSlashToken:
      return { kind: "closing", shouldRescan: false, diagnostic: "" };
    case Kind.EndOfFile:
      return { kind: "none", shouldRescan: false, diagnostic: "Unexpected end of file in JSX." };
  }
  return { kind: "none", shouldRescan: false, diagnostic: "Unexpected token in JSX child." };
}

export function jsxTagNameText(node: Node | undefined): string {
  if (node === undefined) return "";
  if (field<string>(node, "text") !== undefined) return field<string>(node, "text") ?? "";
  if (node.kind === Kind.PropertyAccessExpression) {
    const left = jsxTagNameText(field<Node>(node, "expression"));
    const right = jsxTagNameText(field<Node>(node, "name"));
    return left === "" ? right : `${left}.${right}`;
  }
  if (node.kind === Kind.JsxNamespacedName) {
    const namespace = jsxTagNameText(field<Node>(node, "namespace"));
    const name = jsxTagNameText(field<Node>(node, "name"));
    return namespace === "" ? name : `${namespace}:${name}`;
  }
  return "";
}

export function jsxOpeningTagName(node: Node): string {
  return jsxTagNameText(field<Node>(node, "tagName"));
}

export function jsxClosingTagName(node: Node): string {
  return jsxTagNameText(field<Node>(node, "tagName"));
}

export function jsxTagsMatch(opening: Node, closing: Node): boolean {
  return jsxOpeningTagName(opening) === jsxClosingTagName(closing);
}

export function createJsxElementFrame(opening: Node | undefined, selfClosing: boolean): JsxElementFrame {
  return {
    tagName: jsxTagNameText(field<Node>(opening, "tagName")),
    opening,
    children: [],
    selfClosing,
  };
}

export function appendJsxChild(frame: JsxElementFrame, child: Node): JsxElementFrame {
  return {
    tagName: frame.tagName,
    opening: frame.opening,
    children: [...frame.children, child],
    selfClosing: frame.selfClosing,
  };
}

export function finishJsxElementFrame(frame: JsxElementFrame, closing: Node | undefined): { readonly frame: JsxElementFrame; readonly diagnostic: string } {
  if (frame.selfClosing) return { frame, diagnostic: "" };
  if (closing === undefined) return { frame, diagnostic: `JSX element '${frame.tagName}' has no corresponding closing tag.` };
  const closingName = jsxClosingTagName(closing);
  if (frame.tagName !== closingName) return { frame, diagnostic: `Expected closing tag '${frame.tagName}', got '${closingName}'.` };
  return { frame, diagnostic: "" };
}

export function jsxAttributeName(node: Node | undefined): string {
  if (node === undefined) return "";
  if (node.kind === Kind.JsxAttribute) return jsxTagNameText(field<Node>(node, "name"));
  if (node.kind === Kind.JsxSpreadAttribute) return "...";
  return jsxTagNameText(node);
}

export function jsxAttributeInitializer(node: Node): Node | undefined {
  if (node.kind !== Kind.JsxAttribute) return undefined;
  return field<Node>(node, "initializer");
}

export function jsxAttributesMap(attributes: readonly Node[]): ReadonlyMap<string, Node> {
  const result = new Map<string, Node>();
  for (const attribute of attributes) {
    const name = jsxAttributeName(attribute);
    if (name !== "") result.set(name, attribute);
  }
  return result;
}

export function jsxContainsSpreadAttribute(attributes: readonly Node[]): boolean {
  return attributes.some((attribute) => attribute.kind === Kind.JsxSpreadAttribute);
}

export function jsxTextIsWhitespace(text: string): boolean {
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]!;
    if (char !== " " && char !== "\t" && char !== "\r" && char !== "\n") return false;
  }
  return true;
}

export function normalizeJsxText(text: string): string {
  return text.replace(/\r\n?/g, "\n");
}

export function splitJsxTextLines(text: string): readonly string[] {
  return normalizeJsxText(text).split("\n");
}

export function trimJsxTextLine(line: string, isFirst: boolean, isLast: boolean): string {
  let result = line;
  if (!isFirst) result = result.trimStart();
  if (!isLast) result = result.trimEnd();
  return result;
}

export function foldJsxText(text: string): string {
  const lines = splitJsxTextLines(text);
  const result: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const folded = trimJsxTextLine(lines[index]!, index === 0, index === lines.length - 1);
    if (folded !== "") result.push(folded);
  }
  return result.join(" ");
}

export function shouldPreserveJsxWhitespace(text: string): boolean {
  return text.includes("\n") || text.includes("\r") || text.includes("\t") || text.includes("  ");
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
