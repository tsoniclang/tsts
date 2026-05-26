/**
 * Implied-module dispatcher.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/impliedmodule.go`.
 * Dispatches each source file to either the ES module transformer
 * (for ES2015+ module formats) or the CommonJS transformer.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import { CommonJSModuleTransformer } from "./commonjsmodule.js";
import { ESModuleTransformer } from "./esmodule.js";
import type { Node as AstNode, SourceFile } from "../../ast/index.js";

export class ImpliedModuleTransformer extends Transformer {
  readonly opts: TransformOptions;
  readonly resolver: ReferenceResolver;
  readonly getEmitModuleFormatOfFile: (file: HasFileName) => number;

  cjsTransformer: Transformer | undefined;
  esmTransformer: Transformer | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.opts = opts;
    this.resolver = opts.resolver;
    this.getEmitModuleFormatOfFile = opts.getEmitModuleFormatOfFile;
    this.cjsTransformer = undefined;
    this.esmTransformer = undefined;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  visit(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.SourceFile:
        return this.visitSourceFile(node as unknown as SourceFile);
    }
    return node;
  }

  visitSourceFile(node: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(node)) return node as unknown as AstNode;

    const format = this.getEmitModuleFormatOfFile(node);

    let transformer: Transformer;
    if (format >= ModuleKind.ES2015) {
      if (this.esmTransformer === undefined) this.esmTransformer = new ESModuleTransformer(this.opts);
      transformer = this.esmTransformer;
    } else {
      if (this.cjsTransformer === undefined) this.cjsTransformer = new CommonJSModuleTransformer(this.opts);
      transformer = this.cjsTransformer;
    }

    return transformer.transformSourceFile(node) as unknown as AstNode;
  }
}

export function newImpliedModuleTransformer(opts: TransformOptions): Transformer {
  return new ImpliedModuleTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

interface ReferenceResolver { readonly _resolver: unknown }
interface HasFileName { readonly _hf: unknown }

declare const Kind: { SourceFile: number };
declare const ModuleKind: { ES2015: number };
declare function sourceFileIsDeclarationFile(node: SourceFile): boolean;
