/**
 * Optional catch binding (`catch {}` without a variable) downlevel
 * transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/optionalcatch.go`.
 *
 * Rewrites `try { ... } catch { ... }` as `try { ... } catch (_t) { ... }`
 * for emit targets that require the catch binding.
 */

import type { Node as AstNode } from "../../ast/index.js";

import { Transformer } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

class OptionalCatchTransformer extends Transformer {
  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsMissingCatchClauseVariable(node)) return node;
    if (nodeKind(node) === KindCatchClause) {
      return this.visitCatchClause(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitCatchClause(node: AstNode): AstNode {
    if (catchClauseVariableDeclaration(node) === undefined) {
      const factory = this.getFactory();
      const visitor = this.getVisitor();
      return newCatchClause(
        factory,
        newVariableDeclaration(factory, newTempVariable(factory), undefined, undefined, undefined),
        visitNode(visitor, catchClauseBlock(node)),
      );
    }
    return visitEachChildOf(this.getVisitor(), node);
  }
}

export function newOptionalCatchTransformer(opts: TransformOptions): Transformer {
  return new OptionalCatchTransformer(opts);
}

declare function subtreeContainsMissingCatchClauseVariable(node: AstNode): boolean;
declare function nodeKind(node: AstNode): number;
declare function visitEachChildOf(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function visitNode(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function catchClauseVariableDeclaration(node: AstNode): AstNode | undefined;
declare function catchClauseBlock(node: AstNode): AstNode;
declare function newCatchClause(factory: ReturnType<Transformer["getFactory"]>, varDecl: AstNode, block: AstNode): AstNode;
declare function newVariableDeclaration(factory: ReturnType<Transformer["getFactory"]>, name: AstNode, exclamationToken: undefined, type: undefined, initializer: undefined): AstNode;
declare function newTempVariable(factory: ReturnType<Transformer["getFactory"]>): AstNode;

declare const KindCatchClause: number;
