/**
 * Parser utilities.
 *
 * Port of TS-Go `internal/parser/utilities.go` (~56 LoC). Small helpers
 * used by the parser: language-variant selection, identifier-token
 * predicates, JSDoc-like text detection, comment-range collection.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, CommentRange } from "../ast/index.js";
import { Kind, isKeywordKind, nodePos as getNodePos, nodeEnd as getNodeEnd } from "../ast/index.js";

// Strada returns CommentRange[]; ours is empty until the scanner's
// comment-range pass lands. Field-by-field shape isn't relied on here.
function getTrailingCommentRanges(_factory: NodeFactory, _text: string, _pos: number): readonly CommentRange[] {
  return [];
}
function getLeadingCommentRanges(_factory: NodeFactory, _text: string, _pos: number): readonly CommentRange[] {
  return [];
}
function isPunctuationKind(token: number): boolean {
  // Punctuation kinds occupy a contiguous range in the AST kind table
  // (OpenBraceToken..CaretEqualsToken).
  return token >= Kind.OpenBraceToken && token <= Kind.CaretEqualsToken;
}

export type LanguageVariant = 0 | 1;
export const LanguageVariant = {
  Standard: 0 as LanguageVariant,
  JSX: 1 as LanguageVariant,
} as const;

export type ScriptKind = number;
export const ScriptKind = {
  Unknown: 0 as ScriptKind,
  JS: 1 as ScriptKind,
  JSX: 2 as ScriptKind,
  TS: 3 as ScriptKind,
  TSX: 4 as ScriptKind,
  External: 5 as ScriptKind,
  JSON: 6 as ScriptKind,
  Deferred: 7 as ScriptKind,
} as const;

export function getLanguageVariant(scriptKind: ScriptKind): LanguageVariant {
  switch (scriptKind) {
    case ScriptKind.TSX:
    case ScriptKind.JSX:
    case ScriptKind.JS:
    case ScriptKind.JSON:
      return LanguageVariant.JSX;
    default:
      return LanguageVariant.Standard;
  }
}

export function tokenIsIdentifierOrKeyword(token: number): boolean {
  return token >= Kind.Identifier;
}

export function tokenIsIdentifierOrKeywordOrGreaterThan(token: number): boolean {
  return token === Kind.GreaterThanToken || tokenIsIdentifierOrKeyword(token);
}

export function getJSDocCommentRanges(
  factory: NodeFactory, commentRanges: CommentRange[], node: AstNode, text: string,
): CommentRange[] {
  const ranges = [...commentRanges];
  switch (node.kind) {
    case Kind.Parameter:
    case Kind.TypeParameter:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.ParenthesizedExpression:
    case Kind.VariableDeclaration:
    case Kind.ExportSpecifier:
      ranges.push(...getTrailingCommentRanges(factory, text, getNodePos(node)));
      ranges.push(...getLeadingCommentRanges(factory, text, getNodePos(node)));
      break;
    default:
      ranges.push(...getLeadingCommentRanges(factory, text, getNodePos(node)));
      break;
  }
  return ranges.filter((comment) => {
    const commentStart = comment.pos;
    const commentLen = comment.end - commentStart;
    if (comment.end > getNodeEnd(node)) return false;
    if (commentLen < 4) return false;
    if (text.charAt(commentStart + 1) !== "*") return false;
    if (text.charAt(commentStart + 2) !== "*") return false;
    if (text.charAt(commentStart + 3) === "/") return false;
    return true;
  });
}

export function isKeywordOrPunctuation(token: number): boolean {
  return isKeywordKind(token) || isPunctuationKind(token);
}

export function isJSDocLikeText(text: string): boolean {
  if (text.length < 4) return false;
  return text.charAt(1) === "*" && text.charAt(2) === "*" && text.charAt(3) !== "/";
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface NodeFactory { readonly _f?: unknown }

