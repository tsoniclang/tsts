/**
 * Import elision pass.
 *
 * Port surface of TS-Go `internal/transformers/tstransforms/importelision.go`.
 * Removes type-only imports/exports during TypeScript → JavaScript
 * emission, including:
 *   - `import type { ... }` declarations
 *   - `import { type Foo }` specifiers
 *   - Imports where every binding is type-only and unused
 *   - `import = require(...)` for type-only references
 *
 * Skipped when `verbatimModuleSyntax` is enabled (which preserves
 * imports verbatim).
 *
 * The full visitor switch (over each AST node kind that needs
 * elision logic) arrives in a follow-up commit alongside its test.
 */

import type { Node as AstNode } from "../../ast/index.js";

import { Transformer, type EmitContext } from "../transformer.js";

/**
 * Forward-declared `core.CompilerOptions` subset for the elision pass.
 */
export interface CompilerOptionsForImportElision {
  readonly verbatimModuleSyntax?: boolean;
  readonly importsNotUsedAsValues?: "remove" | "preserve" | "error";
  readonly target?: string;
}

/**
 * Forward-declared `printer.EmitResolver` surface. The resolver is the
 * source of truth for "is this alias actually a value reference?"
 * queries that drive elision decisions.
 */
export interface EmitResolver {
  shouldEmitAliasDeclaration(node: AstNode): boolean;
  isValueAliasDeclaration(node: AstNode): boolean;
  shouldEmitImportEqualsDeclaration(node: AstNode): boolean;
}

export interface ImportElisionOptions {
  readonly compilerOptions: CompilerOptionsForImportElision;
  readonly context?: EmitContext;
  readonly emitResolver: EmitResolver;
}

export class ImportElisionTransformer extends Transformer {
  private readonly compilerOptions: CompilerOptionsForImportElision;
  private readonly emitResolver: EmitResolver;

  constructor(opt: ImportElisionOptions) {
    super();
    if (opt.compilerOptions.verbatimModuleSyntax === true) {
      throw new Error("ImportElisionTransformer should not be used with VerbatimModuleSyntax");
    }
    this.compilerOptions = opt.compilerOptions;
    this.emitResolver = opt.emitResolver;
    this.newTransformer((node) => this.visit(node), opt.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    // TODO: full switch over node.kind — import declarations, import
    // clauses, named imports, namespace imports, export assignments,
    // export declarations, named exports, export specifiers, import-
    // equals declarations.
    void this.compilerOptions;
    void this.emitResolver;
    return node;
  }
}

/**
 * Top-level entry. Mirrors TS-Go `NewImportElisionTransformer`.
 */
export function newImportElisionTransformer(opt: ImportElisionOptions): Transformer {
  return new ImportElisionTransformer(opt);
}
