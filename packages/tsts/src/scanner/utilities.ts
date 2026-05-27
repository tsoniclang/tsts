/**
 * Scanner utility helpers.
 *
 * Port of TS-Go `internal/scanner/utilities.go` (108 LoC).
 * Surrogate-pair conversion, identifier-text validation, node-text
 * extraction.
 *
 * AST/SourceFile types are forward-declared as a cross-module dep
 * until they're stable on the AST module's exported surface.
 */

import type { Node as AstNode, SourceFile, IdentifierNode } from "../ast/index.js";
import {
  nodeText, nodePos, nodeEnd, nodeIsMissing, skipTrivia,
  getSourceFileOfNode,
} from "../ast/index.js";
import { Kind, KindNames } from "../ast/index.js";

// Lazy text → keyword Kind map. Built from KindNames the first time
// identifierToKeywordKind() is called.
let textToKeywordCache: Map<string, number> | undefined;
function textToKeyword(text: string): number | undefined {
  if (textToKeywordCache === undefined) {
    const m = new Map<string, number>();
    for (let i = 0; i < KindNames.length; i++) {
      const name = KindNames[i]!;
      if (name.endsWith("Keyword")) {
        const stem = name.slice(0, -"Keyword".length);
        m.set(stem.charAt(0).toLowerCase() + stem.slice(1), i);
      }
    }
    textToKeywordCache = m;
  }
  return textToKeywordCache.get(text);
}
import type { LanguageVariant } from "../core/languagevariant.js";
const KindIdentifier = Kind.Identifier;
const KindUnknown = Kind.Unknown;
void KindIdentifier; void KindUnknown;
void nodeText;
function sourceFileText(file: SourceFile): string {
  return (file as unknown as { text?: string }).text ?? "";
}
function isIdentifierStart(cp: number): boolean {
  return (cp >= 0x41 && cp <= 0x5a)
    || (cp >= 0x61 && cp <= 0x7a)
    || cp === 0x24 /* $ */
    || cp === 0x5f /* _ */
    || cp >= 0x80;
}
function isIdentifierPartEx(cp: number, _variant: LanguageVariant): boolean {
  return isIdentifierStart(cp) || (cp >= 0x30 && cp <= 0x39);
}

const SURR1 = 0xd800;
const SURR2 = 0xdc00;
const SURR3 = 0xe000;
const SURR_SELF = 0x10000;

export function codePointIsHighSurrogate(code: number): boolean {
  return code >= SURR1 && code < SURR2;
}

export function codePointIsLowSurrogate(code: number): boolean {
  return code >= SURR2 && code < SURR3;
}

export function surrogatePairToCodepoint(high: number, low: number): number {
  return ((high - SURR1) << 10) | ((low - SURR2) + SURR_SELF);
}

/**
 * Encodes a surrogate code unit (0xD800–0xDFFF) as a 3-byte CESU-8
 * sentinel. JS strings are natively UTF-16 so surrogates are already
 * representable; this helper is provided for parity with Strada's
 * regex parser that handles unmatched surrogates in non-unicode mode.
 */
export function encodeSurrogate(code: number): string {
  return String.fromCharCode(0xed, 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
}

/**
 * Decodes a class-atom rune, recognizing surrogate sentinels from
 * `encodeSurrogate`. Returns [code, byteLen]; for JS where strings
 * are UTF-16, byteLen always corresponds to either 1 (BMP) or 2
 * (surrogate pair) UTF-16 code units.
 */
export function decodeClassAtomRune(s: string): { code: number; size: number } {
  if (
    s.length >= 3 &&
    s.charCodeAt(0) === 0xed &&
    s.charCodeAt(1) >= 0xa0 && s.charCodeAt(1) <= 0xbf &&
    s.charCodeAt(2) >= 0x80 && s.charCodeAt(2) <= 0xbf
  ) {
    const code = 0xd000 | ((s.charCodeAt(1) & 0x3f) << 6) | (s.charCodeAt(2) & 0x3f);
    return { code, size: 3 };
  }
  const cp = s.codePointAt(0);
  if (cp === undefined) return { code: 0, size: 0 };
  return { code: cp, size: cp > 0xffff ? 2 : 1 };
}

export function tokenIsIdentifierOrKeyword(token: number): boolean {
  return token >= KindIdentifier;
}

export function identifierToKeywordKind(node: IdentifierNode): number {
  return textToKeyword(nodeText(node as unknown as AstNode)) ?? KindUnknown;
}

export function getSourceTextOfNodeFromSourceFile(
  sourceFile: SourceFile,
  node: AstNode,
  includeTrivia: boolean,
): string {
  return getTextOfNodeFromSourceText(sourceFileText(sourceFile), node, includeTrivia);
}

export function getTextOfNodeFromSourceText(
  sourceText: string,
  node: AstNode,
  includeTrivia: boolean,
): string {
  if (nodeIsMissing(node)) return "";
  let pos = nodePos(node);
  if (!includeTrivia) pos = skipTrivia(sourceText, pos);
  return sourceText.slice(pos, nodeEnd(node));
}

export function getTextOfNode(node: AstNode): string {
  const sf = getSourceFileOfNode(node);
  if (sf === undefined) return "";
  return getSourceTextOfNodeFromSourceFile(sf as unknown as SourceFile, node, false);
}

export function declarationNameToString(name: AstNode | undefined): string {
  if (name === undefined || nodePos(name) === nodeEnd(name)) return "(Missing)";
  return getTextOfNode(name);
}

export function isIdentifierText(name: string, variant: LanguageVariant): boolean {
  if (name.length === 0) return false;
  const first = name.codePointAt(0)!;
  if (!isIdentifierStart(first)) return false;
  let i = first > 0xffff ? 2 : 1;
  while (i < name.length) {
    const cp = name.codePointAt(i)!;
    if (!isIdentifierPartEx(cp, variant)) return false;
    i += cp > 0xffff ? 2 : 1;
  }
  return true;
}

export function isIntrinsicJsxName(name: string): boolean {
  if (name.length === 0) return false;
  const first = name.charCodeAt(0);
  return (first >= 0x61 && first <= 0x7a) || name.includes("-");
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

