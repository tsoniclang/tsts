/**
 * Format-span computation.
 *
 * Port skeleton of TS-Go `internal/format/span.go` (~1242 LoC).
 * The span module implements the bulk of the formatter: given a
 * range and the rule engine, it walks the AST in pre-order and emits
 * edits (insertions, deletions, replacements) using the rule actions
 * (`Space`, `NewLine`, `Delete`, `Indent`, `IndentDouble`).
 *
 * Skeleton exposes the public entry `formatSpanWorker` with stubs.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import type { FormatCodeSettings } from "./api.js";

export interface TextChange {
  span: { start: number; length: number };
  newText: string;
}

export function formatSpanWorker(
  originalRange: { pos: number; end: number },
  enclosingNode: AstNode,
  initialIndentation: number,
  delta: number,
  formattingScanner: unknown,
  options: FormatCodeSettings,
  sourceFile: SourceFile,
  requestKind: number,
): TextChange[] {
  // Skeleton — full coverage requires processNode recursion +
  // rule-action application. Returns empty edits as a no-op fallback.
  void originalRange; void enclosingNode; void initialIndentation; void delta;
  void formattingScanner; void options; void sourceFile; void requestKind;
  return [];
}
