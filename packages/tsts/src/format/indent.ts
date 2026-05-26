/**
 * Indentation calculator.
 *
 * Port skeleton of TS-Go `internal/format/indent.go` (~821 LoC).
 * Computes effective indentation for a given AST position based on
 * the surrounding lexical context (enclosing blocks, type-argument
 * lists, JSX, etc.).
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import type { FormatCodeSettings } from "./api.js";

export const Unknown = -1;

export function getIndentation(position: number, sourceFile: SourceFile, options: FormatCodeSettings, assumeNewLineBeforeCloseBrace: boolean): number {
  void position; void sourceFile; void options; void assumeNewLineBeforeCloseBrace;
  // Skeleton: returns 0 (no indent). Full version walks ancestors and
  // applies BindingPattern/Call/Type-argument increments.
  return 0;
}

export function getBaseIndentation(options: FormatCodeSettings): number {
  return options.baseIndentSize ?? 0;
}

export function getEffectiveIndentationForNode(node: AstNode, sourceFile: SourceFile, options: FormatCodeSettings): number {
  void node; void sourceFile; void options;
  return 0;
}
