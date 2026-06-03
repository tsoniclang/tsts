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
import { findChildOfKind, getStartOfNode } from "../astnav/index.js";

import { type FormatCodeSettings, FormatRequestKind, type TextRange } from "./api.js";
import { rangeIsOnOneLine } from "./util.js";

const KindOpenBraceToken = Kind.OpenBraceToken;
const KindCloseBraceToken = Kind.CloseBraceToken;

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
  // Mirrors TS-Go FormattingContext fields (context.go:11-27). The token
  // spans and parents are read by getRules / rule-context predicates, so
  // they are exposed through accessors below.
  #currentTokenSpan: TextRangeWithKind | undefined;
  #nextTokenSpan: TextRangeWithKind | undefined;
  #contextNode: AstNode | undefined;
  #currentTokenParent: AstNode | undefined;
  #nextTokenParent: AstNode | undefined;

  #contextNodeAllOnSameLine: Tristate = "unknown";
  #nextNodeAllOnSameLine: Tristate = "unknown";
  #tokensAreOnSameLine: Tristate = "unknown";
  #contextNodeBlockIsOnOneLine: Tristate = "unknown";
  #nextNodeBlockIsOnOneLine: Tristate = "unknown";

  public readonly sourceFile: SourceFile;
  public readonly formattingRequestKind: FormatRequestKind;
  public readonly options: FormatCodeSettings;

  constructor(file: SourceFile, kind: FormatRequestKind, options: FormatCodeSettings) {
    this.sourceFile = file;
    this.formattingRequestKind = kind;
    this.options = options;
  }

  // Field accessors mirroring TS-Go's struct field reads from getRules
  // (rulesmap.go:12) and the rule-context predicates (rulecontext.go).
  get currentTokenSpan(): TextRangeWithKind | undefined { return this.#currentTokenSpan; }
  get nextTokenSpan(): TextRangeWithKind | undefined { return this.#nextTokenSpan; }
  get contextNode(): AstNode | undefined { return this.#contextNode; }
  get currentTokenParent(): AstNode | undefined { return this.#currentTokenParent; }
  get nextTokenParent(): AstNode | undefined { return this.#nextTokenParent; }

  updateContext(
    cur: TextRangeWithKind,
    curParent: AstNode,
    next: TextRangeWithKind,
    nextParent: AstNode,
    commonParent: AstNode,
  ): void {
    this.#currentTokenSpan = cur;
    this.#currentTokenParent = curParent;
    this.#nextTokenSpan = next;
    this.#nextTokenParent = nextParent;
    this.#contextNode = commonParent;

    // drop cached results
    this.#contextNodeAllOnSameLine = "unknown";
    this.#nextNodeAllOnSameLine = "unknown";
    this.#tokensAreOnSameLine = "unknown";
    this.#contextNodeBlockIsOnOneLine = "unknown";
    this.#nextNodeBlockIsOnOneLine = "unknown";
  }

  #rangeIsOnOneLine(range: TextRange): Tristate {
    return rangeIsOnOneLine(range, this.sourceFile) ? "true" : "false";
  }

  #nodeIsOnOneLine(node: AstNode): Tristate {
    return this.#rangeIsOnOneLine(withTokenStart(node, this.sourceFile));
  }

  #blockIsOnOneLine(node: AstNode): Tristate {
    const openBrace = findChildOfKind(node, KindOpenBraceToken, this.sourceFile);
    const closeBrace = findChildOfKind(node, KindCloseBraceToken, this.sourceFile);
    if (openBrace !== undefined && closeBrace !== undefined) {
      const closeBraceStart = getStartOfNode(closeBrace, this.sourceFile, false);
      return this.#rangeIsOnOneLine(newTextRange(nodeEnd(openBrace), closeBraceStart));
    }
    return "false";
  }

  contextNodeAllOnSameLine(): boolean {
    if (this.#contextNodeAllOnSameLine === "unknown" && this.#contextNode !== undefined) {
      this.#contextNodeAllOnSameLine = this.#nodeIsOnOneLine(this.#contextNode);
    }
    return this.#contextNodeAllOnSameLine === "true";
  }

  nextNodeAllOnSameLine(): boolean {
    if (this.#nextNodeAllOnSameLine === "unknown" && this.#nextTokenParent !== undefined) {
      this.#nextNodeAllOnSameLine = this.#nodeIsOnOneLine(this.#nextTokenParent);
    }
    return this.#nextNodeAllOnSameLine === "true";
  }

  tokensAreOnSameLine(): boolean {
    if (
      this.#tokensAreOnSameLine === "unknown" &&
      this.#currentTokenSpan !== undefined &&
      this.#nextTokenSpan !== undefined
    ) {
      this.#tokensAreOnSameLine = this.#rangeIsOnOneLine(
        newTextRange(this.#currentTokenSpan.loc.pos, this.#nextTokenSpan.loc.end),
      );
    }
    return this.#tokensAreOnSameLine === "true";
  }

  contextNodeBlockIsOnOneLine(): boolean {
    if (this.#contextNodeBlockIsOnOneLine === "unknown" && this.#contextNode !== undefined) {
      this.#contextNodeBlockIsOnOneLine = this.#blockIsOnOneLine(this.#contextNode);
    }
    return this.#contextNodeBlockIsOnOneLine === "true";
  }

  nextNodeBlockIsOnOneLine(): boolean {
    if (this.#nextNodeBlockIsOnOneLine === "unknown" && this.#nextTokenParent !== undefined) {
      this.#nextNodeBlockIsOnOneLine = this.#blockIsOnOneLine(this.#nextTokenParent);
    }
    return this.#nextNodeBlockIsOnOneLine === "true";
  }
}

function withTokenStart(node: AstNode, file: SourceFile): TextRange {
  const startPos = getStartOfNode(node, file, false);
  return newTextRange(startPos, nodeEnd(node));
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

