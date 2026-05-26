/**
 * TypeScript-specific type-syntax eraser.
 *
 * Port surface of TS-Go `internal/transformers/tstransforms/typeeraser.go`.
 * Removes TypeScript-only syntax (`type` declarations, type
 * annotations, interfaces, modifiers like `public`/`readonly`, etc.)
 * leaving the underlying JavaScript intact.
 *
 * The full visitor (large switch over every AST node kind) lands in
 * a follow-up commit alongside its test. This file ports the
 * constructor signature and the eraser's class shape so downstream
 * consumers (compiler, emit-js printer) can declare against it.
 */

import type { Node as AstNode, SourceFile, Statement } from "../../ast/index.js";

import { Transformer, type EmitContext } from "../transformer.js";

/**
 * Forward-declared subset of `core.CompilerOptions` used by the
 * type-eraser. The real shape comes from the compiler options port.
 */
export interface CompilerOptionsForTypeEraser {
  readonly target?: string;
  readonly importsNotUsedAsValues?: "remove" | "preserve" | "error";
  readonly verbatimModuleSyntax?: boolean;
}

/**
 * Options passed when constructing a transformer. Mirrors TS-Go
 * `transformers.TransformOptions`.
 */
export interface TransformOptions {
  readonly compilerOptions: CompilerOptionsForTypeEraser;
  readonly context?: EmitContext;
}

export class TypeEraserTransformer extends Transformer {
  private readonly compilerOptions: CompilerOptionsForTypeEraser;
  private parentNode: AstNode | undefined;
  private currentNode: AstNode | undefined;

  constructor(opt: TransformOptions) {
    super();
    this.compilerOptions = opt.compilerOptions;
    this.newTransformer((node) => this.visit(node), opt.context);
  }

  /**
   * Pushes a new child node onto the ancestor tracking stack,
   * returning the grandparent node for later restoration.
   *
   * Mirrors TS-Go `pushNode`.
   */
  private pushNode(node: AstNode): AstNode | undefined {
    const grandparent = this.parentNode;
    this.parentNode = this.currentNode;
    this.currentNode = node;
    return grandparent;
  }

  /**
   * Pops the last child node off the ancestor tracking stack.
   * Mirrors TS-Go `popNode`.
   */
  private popNode(grandparentNode: AstNode | undefined): void {
    this.currentNode = this.parentNode;
    this.parentNode = grandparentNode;
  }

  /**
   * Elides a statement (replaces it with a NotEmittedStatement).
   * Mirrors TS-Go `elide`.
   */
  private elide(node: Statement): Statement {
    return newNotEmittedStatement(this.getEmitContext(), node as unknown as AstNode) as unknown as Statement;
  }

  /**
   * Main visitor — the full switch over node kinds lands in a follow-up
   * commit. The current implementation passes nodes through so the
   * type can be wired up downstream while the bodies are filled in.
   *
   * Mirrors TS-Go `(tx *TypeEraserTransformer).visit`.
   */
  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsTypeScript(node)) return node;

    if (isStatement(node) && hasSyntacticModifierAmbient(node)) {
      return this.elide(node as unknown as Statement) as unknown as AstNode;
    }

    const grandparent = this.pushNode(node);
    try {
      // TODO: full visit switch over node.kind (TypeScript-only
      // modifiers, type annotations, type/interface decls, namespace
      // decls, satisfies / as expressions, decorators, etc.).
      return node;
    } finally {
      this.popNode(grandparent);
    }
  }
}

/**
 * Top-level entry: constructs a transformer. Mirrors TS-Go
 * `NewTypeEraserTransformer`.
 */
export function newTypeEraserTransformer(opt: TransformOptions): Transformer {
  return new TypeEraserTransformer(opt);
}

// ---------------------------------------------------------------------------
// Forward-declared AST/emit-context surface
// ---------------------------------------------------------------------------

declare function newNotEmittedStatement(emitContext: EmitContext, node: AstNode): AstNode;
declare function subtreeContainsTypeScript(node: AstNode): boolean;
declare function isStatement(node: AstNode): boolean;
declare function hasSyntacticModifierAmbient(node: AstNode): boolean;
