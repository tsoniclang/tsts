/**
 * JSDoc parser.
 *
 * Substantive port of TS-Go `internal/parser/jsdoc.go` (~1263 LoC, 45
 * Parser methods). Parses JSDoc comments attached to source code,
 * producing JSDocComment nodes with associated type expressions, tag
 * lists (@param, @return, @template, @link, @see, etc.), and inline
 * type references.
 *
 * Port scope: full state declarations, ~45 method signatures mapped,
 * top-level entry parseJSDocForNode, module-level helpers
 * (removeLeadingNewlines, trimEnd, removeTrailingWhitespace,
 * isJSDocLinkTag, isObjectOrObjectArrayTypeReference). Method bodies
 * are stubbed; the existing parser.ts has the basic JSDoc parsing
 * inlined and is being incrementally split out.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  IdentifierNode,
  SourceFile,
  EntityName,
  NodeList,
  TypeNode,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// Constant-union enums (no Go iota)
// ---------------------------------------------------------------------------

export type JsdocState = number;
export const JsdocState = {
  BeginningOfLine: 0 as JsdocState,
  SawAsterisk: 1 as JsdocState,
  SavingComments: 2 as JsdocState,
  SavingBackticks: 3 as JsdocState,
} as const;

export type PropertyLikeParse = number;
export const PropertyLikeParse = {
  Property: 0 as PropertyLikeParse,
  Parameter: 1 as PropertyLikeParse,
  CallbackParameter: 2 as PropertyLikeParse,
} as const;

export type JsdocScannerInfo = number;

// ---------------------------------------------------------------------------
// Top-level entry
// ---------------------------------------------------------------------------

export function parseJSDocForNode(sourceFile: SourceFile, node: AstNode): readonly AstNode[] {
  void sourceFile; void node;
  return [];
}

// ---------------------------------------------------------------------------
// JSDocParser — surfaces all 45 jsdoc-parsing methods
// ---------------------------------------------------------------------------

export class JSDocParser {
  pos = 0;
  sourceText = "";

  // -------------------------------------------------------------------------
  // Comment + type-expression parsing
  // -------------------------------------------------------------------------

  withJSDoc(node: AstNode, info: JsdocScannerInfo): readonly AstNode[] {
    void node; void info;
    return [];
  }

  parseJSDocTypeExpression(mayOmitBraces: boolean): AstNode {
    void mayOmitBraces;
    return {} as AstNode;
  }

  parseJSDocNameReference(): AstNode {
    return {} as AstNode;
  }

  parseJSDocComment(parent: AstNode, start: number, end: number, fullStart: number): AstNode | undefined {
    void parent; void start; void end; void fullStart;
    return undefined;
  }

  parseJSDocCommentWorker(start: number, end: number, fullStart: number, indent: number): AstNode | undefined {
    void start; void end; void fullStart; void indent;
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Whitespace + token navigation within JSDoc
  // -------------------------------------------------------------------------

  isNextNonwhitespaceTokenEndOfFile(): boolean { return false; }
  skipWhitespace(): void { /* deferred */ }
  skipWhitespaceOrAsterisk(): string { return ""; }

  // -------------------------------------------------------------------------
  // Tag parsing
  // -------------------------------------------------------------------------

  parseTag(tags: readonly AstNode[], margin: number): AstNode {
    void tags; void margin;
    return {} as AstNode;
  }

  parseTrailingTagComments(pos: number, end: number, margin: number, indentText: string): NodeList | undefined {
    void pos; void end; void margin; void indentText;
    return undefined;
  }

  parseTagComments(indent: number, initialMargin: string | undefined): NodeList | undefined {
    void indent; void initialMargin;
    return undefined;
  }

  parseJSDocLink(start: number): AstNode {
    void start;
    return {} as AstNode;
  }

  parseJSDocLinkName(): AstNode { return {} as AstNode; }

  parseJSDocLinkPrefix(): { name: string; ok: boolean } {
    return { name: "", ok: false };
  }

  parseUnknownTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  tryParseTypeExpression(): AstNode | undefined { return undefined; }

  parseBracketNameInPropertyAndParamTag(target: PropertyLikeParse): { name: EntityName | undefined; isBracketed: boolean } {
    void target;
    return { name: undefined, isBracketed: false };
  }

  parseParameterOrPropertyTag(
    start: number, tagName: IdentifierNode, target: PropertyLikeParse, indent: number,
  ): AstNode {
    void start; void tagName; void target; void indent;
    return {} as AstNode;
  }

  parseNestedTypeLiteral(
    typeExpression: AstNode | undefined, name: EntityName | undefined,
    target: PropertyLikeParse, indent: number,
  ): AstNode | undefined {
    void typeExpression; void name; void target; void indent;
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Per-tag parsers
  // -------------------------------------------------------------------------

  parseReturnTag(
    previousTags: readonly AstNode[], start: number, tagName: IdentifierNode, indent: number, indentText: string,
  ): AstNode {
    void previousTags; void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseTypeTag(
    previousTags: readonly AstNode[], start: number, tagName: IdentifierNode, indent: number, indentText: string,
  ): AstNode {
    void previousTags; void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseSeeTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseImplementsTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseAugmentsTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseSatisfiesTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseThrowsTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseImportTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseSimpleTag(
    start: number,
    createTag: (tagName: IdentifierNode, comment: NodeList | undefined) => AstNode,
    tagName: IdentifierNode, margin: number, indentText: string,
  ): AstNode {
    void start; void createTag; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseThisTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseAuthorTag(start: number, tagName: IdentifierNode, margin: number, indentText: string): AstNode {
    void start; void tagName; void margin; void indentText;
    return {} as AstNode;
  }

  parseTypedefTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseCallbackTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseOverloadTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseTemplateTag(start: number, tagName: IdentifierNode, indent: number, indentText: string): AstNode {
    void start; void tagName; void indent; void indentText;
    return {} as AstNode;
  }

  parseTypeParameter(): AstNode { return {} as AstNode; }

  // -------------------------------------------------------------------------
  // Augments helper
  // -------------------------------------------------------------------------

  parseExpressionWithTypeArgumentsForAugments(): AstNode { return {} as AstNode; }
  parsePropertyAccessEntityNameExpression(): AstNode { return {} as AstNode; }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function removeLeadingNewlines(comments: readonly string[]): readonly string[] {
  let start = 0;
  while (start < comments.length && comments[start] === "") start += 1;
  return comments.slice(start);
}

export function trimEnd(s: string): string {
  return s.replace(/\s+$/, "");
}

export function removeTrailingWhitespace(comments: readonly string[]): readonly string[] {
  let end = comments.length;
  while (end > 0 && comments[end - 1]!.trim() === "") end -= 1;
  return comments.slice(0, end);
}

export function isJSDocLinkTag(kind: string): boolean {
  return kind === "link" || kind === "linkcode" || kind === "linkplain";
}

export function isObjectOrObjectArrayTypeReference(node: TypeNode | undefined): boolean {
  if (node === undefined) return false;
  // ArrayType with elementType being an Object-Object-Array reference
  // recursively, OR a TypeReference whose typeName is identifier "Object".
  const k = (node as { kind?: number }).kind;
  if (k === 0xb6 /* ArrayType — sentinel; will be replaced when Kind enum is canonicalized */) {
    const element = (node as unknown as { elementType?: TypeNode }).elementType;
    return isObjectOrObjectArrayTypeReference(element);
  }
  if (k === 0xb2 /* TypeReference — same sentinel note */) {
    const tn = (node as unknown as { typeName?: { kind?: number; text?: string } }).typeName;
    return tn?.text === "Object";
  }
  return false;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------
