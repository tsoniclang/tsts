/**
 * Nullish coalescing (`??`) downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/nullishcoalescing.go`.
 *
 * Rewrites `a ?? b` as `(a === null || a === undefined ? b : a)`,
 * introducing a temp variable when `a` is non-trivial to avoid
 * double-evaluation.
 */

import type { Node as AstNode } from "../../ast/index.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

class NullishCoalescingTransformer extends Transformer {
  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsNullishCoalescing(node)) return node;
    if (nodeKind(node) === KindBinaryExpression) {
      return this.visitBinaryExpression(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitBinaryExpression(node: AstNode): AstNode {
    if (binaryOperatorKind(node) !== KindQuestionQuestionToken) {
      return visitEachChildOf(this.getVisitor(), node);
    }
    const visitor = this.getVisitor();
    const factory = this.getFactory();
    const emitContext = this.getEmitContext();

    let left = visitNode(visitor, binaryLeft(node));
    let right = left;
    if (!isSimpleCopiableExpression(left)) {
      right = newTempVariable(factory);
      addVariableDeclaration(emitContext, right);
      left = newAssignmentExpression(factory, right, left);
    }
    return newConditionalExpression(
      factory,
      createNotNullCondition(emitContext, left, right, false),
      newToken(factory, KindQuestionToken),
      right,
      newToken(factory, KindColonToken),
      visitNode(visitor, binaryRight(node)),
    );
  }
}

export function newNullishCoalescingTransformer(opts: TransformOptions): Transformer {
  return new NullishCoalescingTransformer(opts);
}

// Forward declarations.
declare function subtreeContainsNullishCoalescing(node: AstNode): boolean;
declare function nodeKind(node: AstNode): number;
declare function binaryOperatorKind(node: AstNode): number;
declare function binaryLeft(node: AstNode): AstNode;
declare function binaryRight(node: AstNode): AstNode;
declare function isSimpleCopiableExpression(node: AstNode): boolean;
declare function visitEachChildOf(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function visitNode(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function newTempVariable(factory: ReturnType<Transformer["getFactory"]>): AstNode;
declare function addVariableDeclaration(emitContext: EmitContext, decl: AstNode): void;
declare function newAssignmentExpression(factory: ReturnType<Transformer["getFactory"]>, target: AstNode, value: AstNode): AstNode;
declare function newConditionalExpression(factory: ReturnType<Transformer["getFactory"]>, cond: AstNode, q: AstNode, whenTrue: AstNode, c: AstNode, whenFalse: AstNode): AstNode;
declare function newToken(factory: ReturnType<Transformer["getFactory"]>, kind: number): AstNode;
declare function createNotNullCondition(emitContext: EmitContext, left: AstNode, right: AstNode, invert: boolean): AstNode;

declare const KindBinaryExpression: number;
declare const KindQuestionQuestionToken: number;
declare const KindQuestionToken: number;
declare const KindColonToken: number;
