/**
 * Formatting context — tracks the surrounding nodes during rule
 * evaluation.
 *
 * Port of TS-Go `internal/format/context.go`. Captures the current
 * and next token spans (with their parents), the common-parent
 * context node, and cached "are these on one line?" / "is the block
 * on one line?" predicates that rules query repeatedly.
 *
 * The Tristate caching pattern mirrors TS-Go — `unknown` means "not
 * computed yet"; `true`/`false` are the cached results.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import { Kind, newTextRange, nodeEnd } from "../ast/index.js";

import { type FormatCodeSettings, FormatRequestKind, type TextRange } from "./api.js";
import { rangeIsOnOneLine } from "./util.js";

const KindOpenBraceToken = Kind.OpenBraceToken;
const KindCloseBraceToken = Kind.CloseBraceToken;

// Strada helpers awaiting scanner-side ports. Until findChildOfKind
// lands, return undefined — formatting rules will fall back to the
// general path. getTokenPosOfNode uses nodePos until JSDoc handling lands.
function getTokenPosOfNode(node: AstNode, _file: SourceFile, _includeJSDoc: boolean): number {
  return (node as unknown as { pos?: number }).pos ?? -1;
}
function findChildOfKind(_node: AstNode, _kind: number, _sourceFile: SourceFile): AstNode | undefined {
  return undefined;
}

/**
 * A token span — a text range carrying a token kind. Mirrors TS-Go
 * `TextRangeWithKind`.
 */
export interface TextRangeWithKind {
  readonly loc: TextRange;
  readonly kind: number;
}

/**
 * Three-state cache value: `unknown` for "not computed", `true`/`false`
 * for the cached result. Mirrors TS-Go `core.Tristate`.
 */
export type Tristate = "unknown" | "true" | "false";

/**
 * Format context shared across rule evaluations. Mirrors TS-Go
 * `FormattingContext`.
 */
export class FormattingContext {
  private currentTokenSpan: TextRangeWithKind | undefined;
  private nextTokenSpan: TextRangeWithKind | undefined;
  private contextNode: AstNode | undefined;
  private currentTokenParent: AstNode | undefined;
  private nextTokenParent: AstNode | undefined;

  private contextNodeAllOnSameLine: Tristate = "unknown";
  private nextNodeAllOnSameLine: Tristate = "unknown";
  private tokensAreOnSameLineCache: Tristate = "unknown";
  private contextNodeBlockIsOnOneLine: Tristate = "unknown";
  private nextNodeBlockIsOnOneLine: Tristate = "unknown";

  public readonly sourceFile: SourceFile;
  public readonly formattingRequestKind: FormatRequestKind;
  public readonly options: FormatCodeSettings;

  constructor(file: SourceFile, kind: FormatRequestKind, options: FormatCodeSettings) {
    this.sourceFile = file;
    this.formattingRequestKind = kind;
    this.options = options;
  }

  updateContext(
    cur: TextRangeWithKind,
    curParent: AstNode,
    next: TextRangeWithKind,
    nextParent: AstNode,
    commonParent: AstNode,
  ): void {
    this.currentTokenSpan = cur;
    this.currentTokenParent = curParent;
    this.nextTokenSpan = next;
    this.nextTokenParent = nextParent;
    this.contextNode = commonParent;

    // Invalidate cached predicates.
    this.contextNodeAllOnSameLine = "unknown";
    this.nextNodeAllOnSameLine = "unknown";
    this.tokensAreOnSameLineCache = "unknown";
    this.contextNodeBlockIsOnOneLine = "unknown";
    this.nextNodeBlockIsOnOneLine = "unknown";
  }

  private rangeIsOnOneLine(range: TextRange): Tristate {
    return rangeIsOnOneLine(range, this.sourceFile) ? "true" : "false";
  }

  private nodeIsOnOneLine(node: AstNode): Tristate {
    return this.rangeIsOnOneLine(withTokenStart(node, this.sourceFile));
  }

  private blockIsOnOneLine(node: AstNode): Tristate {
    const openBrace = findChildOfKind(node, KindOpenBraceToken, this.sourceFile);
    const closeBrace = findChildOfKind(node, KindCloseBraceToken, this.sourceFile);
    if (openBrace !== undefined && closeBrace !== undefined) {
      const closeBraceStart = getTokenPosOfNode(closeBrace, this.sourceFile, false);
      return this.rangeIsOnOneLine(newTextRange(nodeEnd(openBrace), closeBraceStart));
    }
    return "false";
  }

  contextNodeAllOnSameLineCached(): boolean {
    if (this.contextNodeAllOnSameLine === "unknown" && this.contextNode !== undefined) {
      this.contextNodeAllOnSameLine = this.nodeIsOnOneLine(this.contextNode);
    }
    return this.contextNodeAllOnSameLine === "true";
  }

  nextNodeAllOnSameLineCached(): boolean {
    if (this.nextNodeAllOnSameLine === "unknown" && this.nextTokenParent !== undefined) {
      this.nextNodeAllOnSameLine = this.nodeIsOnOneLine(this.nextTokenParent);
    }
    return this.nextNodeAllOnSameLine === "true";
  }

  tokensAreOnSameLine(): boolean {
    if (
      this.tokensAreOnSameLineCache === "unknown" &&
      this.currentTokenSpan !== undefined &&
      this.nextTokenSpan !== undefined
    ) {
      this.tokensAreOnSameLineCache = this.rangeIsOnOneLine(
        newTextRange(this.currentTokenSpan.loc.pos, this.nextTokenSpan.loc.end),
      );
    }
    return this.tokensAreOnSameLineCache === "true";
  }
  tokensAreOnSameLineCached(): boolean { return this.tokensAreOnSameLine(); }


  contextNodeBlockIsOnOneLineCached(): boolean {
    if (this.contextNodeBlockIsOnOneLine === "unknown" && this.contextNode !== undefined) {
      this.contextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.contextNode);
    }
    return this.contextNodeBlockIsOnOneLine === "true";
  }

  nextNodeBlockIsOnOneLineCached(): boolean {
    if (this.nextNodeBlockIsOnOneLine === "unknown" && this.nextTokenParent !== undefined) {
      this.nextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.nextTokenParent);
    }
    return this.nextNodeBlockIsOnOneLine === "true";
  }
}

function withTokenStart(node: AstNode, file: SourceFile): TextRange {
  const startPos = getTokenPosOfNode(node, file, false);
  return newTextRange(startPos, nodeEnd(node));
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

