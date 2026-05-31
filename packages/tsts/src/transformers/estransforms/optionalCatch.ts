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
import {
  Kind, nodeKind, subtreeFacts,
  catchClauseVariableDeclaration, catchClauseBlock,
} from "../../ast/index.js";
import {
  visitNode, visitEachChildOf, newCatchClause, newVariableDeclaration, newTempVariable,
} from "../../printer/factoryHelpers.js";

import { Transformer } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindCatchClause = Kind.CatchClause;
function subtreeContainsMissingCatchClauseVariable(node: AstNode): boolean {
  return (subtreeFacts(node) & (1 << 7) /* ContainsMissingCatchClauseVariable */) !== 0;
}

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

