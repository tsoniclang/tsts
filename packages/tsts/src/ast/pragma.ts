/**
 * Pragma + comment-directive support structs.
 *
 * Faithful 1:1 port of the non-Node support types in TS-Go `internal/ast/ast.go`:
 *   - CommentDirectiveKind / CommentDirective (ast.go:2383-2394)
 *   - PragmaArgument / Pragma / PragmaKindFlags / PragmaArgumentSpecification /
 *     PragmaSpecification (ast.go:2951-2986)
 *
 * These are runtime support shapes the scanner/parser populate onto a SourceFile
 * (`Pragmas`, `CommentDirectives`); they are NOT AST nodes, so they live in this
 * hand-written module rather than the byte-locked `schema/tsgo/ast.json`. Flag
 * sets follow the const-map discipline used by `flowFlags.ts` (no runtime enum
 * machinery; a plain `number` at the type level).
 */

import type { CommentRange } from "./aliases.js";
import type { TextRange } from "./generated/types.js";

// CommentDirective (ast.go:2383-2394)

export type CommentDirectiveKind = number;

export const CommentDirectiveKind = {
  Unknown: 0 as CommentDirectiveKind,
  ExpectError: 1 as CommentDirectiveKind,
  Ignore: 2 as CommentDirectiveKind,
} as const;

export interface CommentDirective {
  readonly loc: TextRange;
  readonly kind: CommentDirectiveKind;
}

// Pragma (ast.go:2951-2986)

export interface PragmaArgument extends TextRange {
  readonly name: string;
  readonly value: string;
}

export interface Pragma extends CommentRange {
  readonly name: string;
  readonly args: ReadonlyMap<string, PragmaArgument>;
}

export type PragmaKindFlags = number;

export const PragmaKindFlags = {
  None: 0 as PragmaKindFlags,
  TripleSlashXML: 1 << 0 as PragmaKindFlags,
  SingleLine: 1 << 1 as PragmaKindFlags,
  MultiLine: 1 << 2 as PragmaKindFlags,
  // Composite values mirror tsgo (ast.go:2970-2971).
  All: (1 << 0 | 1 << 1 | 1 << 2) as PragmaKindFlags,
  Default: (1 << 0 | 1 << 1 | 1 << 2) as PragmaKindFlags,
} as const;

export interface PragmaArgumentSpecification {
  readonly name: string;
  readonly optional: boolean;
  readonly captureSpan: boolean;
}

export interface PragmaSpecification {
  readonly args: readonly PragmaArgumentSpecification[];
  readonly kind: PragmaKindFlags;
}

/** `(*PragmaSpecification).IsTripleSlash()` (ast.go:2984-2986). */
export function pragmaSpecificationIsTripleSlash(spec: PragmaSpecification): boolean {
  return (spec.kind & PragmaKindFlags.TripleSlashXML) > 0;
}
