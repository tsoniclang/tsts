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
import { nodeKind, binaryOperatorKind, binaryLeft, binaryRight } from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import {
  visitNode, visitEachChildOf,
  newTempVariable, addVariableDeclaration,
  newAssignmentExpression, newConditionalExpression, newToken,
} from "../../printer/factory-helpers.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindBinaryExpression = Kind.BinaryExpression;
const KindQuestionQuestionToken = Kind.QuestionQuestionToken;
const KindQuestionToken = Kind.QuestionToken;
const KindColonToken = Kind.ColonToken;
void KindBinaryExpression; void KindQuestionQuestionToken;
void KindQuestionToken; void KindColonToken;

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

declare function subtreeContainsNullishCoalescing(node: AstNode): boolean;
declare function isSimpleCopiableExpression(node: AstNode): boolean;
declare function createNotNullCondition(emitContext: EmitContext, left: AstNode, right: AstNode, invert: boolean): AstNode;
