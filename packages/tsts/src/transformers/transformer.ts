/**
 * Base transformer type.
 *
 * Port of TS-Go `internal/transformers/transformer.go`. The base
 * captures the emit context, the node factory, and a node visitor;
 * concrete transformers (type eraser, downlevel passes, decorator
 * lowering, etc.) compose with it.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";

/**
 * Forward-declared printer/emit-context surface. The full
 * `printer.EmitContext` and `printer.NodeFactory` arrive with the
 * printer module; this captures the surface transformers need.
 */
export interface EmitContext {
  readonly factory: NodeFactory;
  newNodeVisitor(visit: (node: AstNode) => AstNode | undefined): NodeVisitor;
}

export interface NodeFactory {
  // Many factory methods; transformers reference them directly.
}

export interface NodeVisitor {
  visitSourceFile(file: SourceFile): SourceFile;
}

/**
 * Base transformer. Concrete transformers extend this and provide a
 * `visit` function. Mirrors TS-Go `Transformer`.
 */
export class Transformer {
  protected emitContext: EmitContext | undefined;
  protected factory: NodeFactory | undefined;
  protected visitor: NodeVisitor | undefined;

  newTransformer(visit: (node: AstNode) => AstNode | undefined, emitContext: EmitContext | undefined): this {
    if (this.emitContext !== undefined) {
      throw new Error("Transformer already initialized");
    }
    const ec = emitContext ?? newEmitContext();
    this.emitContext = ec;
    this.factory = ec.factory;
    this.visitor = ec.newNodeVisitor(visit);
    return this;
  }

  getEmitContext(): EmitContext {
    if (this.emitContext === undefined) throw new Error("Transformer not initialized");
    return this.emitContext;
  }

  getVisitor(): NodeVisitor {
    if (this.visitor === undefined) throw new Error("Transformer not initialized");
    return this.visitor;
  }

  getFactory(): NodeFactory {
    if (this.factory === undefined) throw new Error("Transformer not initialized");
    return this.factory;
  }

  transformSourceFile(file: SourceFile): SourceFile {
    return this.getVisitor().visitSourceFile(file);
  }
}

declare function newEmitContext(): EmitContext;
