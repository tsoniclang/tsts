/**
 * Exponentiation operator (`**` / `**=`) downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/exponentiation.go`.
 *
 * Rewrites:
 *   - `a ** b` as `Math.pow(a, b)`
 *   - `a **= b` as `a = Math.pow(a, b)`
 *   - `a.x **= b` as `(_a = a).x = Math.pow(_a.x, b)` (temp avoids re-evaluation)
 *   - `a[x] **= b` as `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
 */

import type { Node as AstNode } from "../../ast/index.js";
import { nodeKind, binaryOperatorKind, binaryLeft, binaryRight } from "../../ast/index.js";
import {
  isElementAccessExpression, isPropertyAccessExpression,
} from "../../ast/index.js";
import {
  expressionOf, elementArgumentExpression, propertyAccessName,
  subtreeFacts,
} from "../../ast/index.js";

function subtreeContainsExponentiationOperator(node: AstNode): boolean {
  return (subtreeFacts(node) & (1 << 10) /* ContainsExponentiation */) !== 0;
}
import { Kind } from "../../ast/index.js";
import {
  visitNode, visitEachChildOf,
  newTempVariable, addVariableDeclaration,
  newAssignmentExpression, newElementAccessExpression,
  newPropertyAccessExpression, newGlobalMethodCall,
} from "../../printer/factoryHelpers.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindBinaryExpression = Kind.BinaryExpression;
const KindAsteriskAsteriskToken = Kind.AsteriskAsteriskToken;
const KindAsteriskAsteriskEqualsToken = Kind.AsteriskAsteriskEqualsToken;
void KindBinaryExpression; void KindAsteriskAsteriskToken;
void KindAsteriskAsteriskEqualsToken;

class ExponentiationTransformer extends Transformer {
  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsExponentiationOperator(node)) return node;
    if (nodeKind(node) === KindBinaryExpression) {
      return this.visitBinaryExpression(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitBinaryExpression(node: AstNode): AstNode {
    const op = binaryOperatorKind(node);
    if (op === KindAsteriskAsteriskEqualsToken) {
      return this.visitExponentiationAssignmentExpression(node);
    }
    if (op === KindAsteriskAsteriskToken) {
      return this.visitExponentiationExpression(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitExponentiationAssignmentExpression(node: AstNode): AstNode {
    const visitor = this.getVisitor();
    const factory = this.getFactory();
    const emitContext = this.getEmitContext();

    const leftVisited = visitNode(visitor, binaryLeft(node));
    const rightVisited = visitNode(visitor, binaryRight(node));

    let target: AstNode;
    let value: AstNode;

    if (isElementAccessExpression(leftVisited)) {
      // `a[x] **= b` → `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
      const expressionTemp = newTempVariable(factory);
      addVariableDeclaration(emitContext, expressionTemp);
      const argumentExpressionTemp = newTempVariable(factory);
      addVariableDeclaration(emitContext, argumentExpressionTemp);

      const objExpr = newAssignmentExpression(factory, expressionTemp, expressionOf(leftVisited));
      const accessExpr = newAssignmentExpression(factory, argumentExpressionTemp, elementArgumentExpression(leftVisited));

      target = newElementAccessExpression(factory, objExpr, undefined, accessExpr);
      value = newElementAccessExpression(factory, expressionTemp, undefined, argumentExpressionTemp);
    } else if (isPropertyAccessExpression(leftVisited)) {
      // `a.x **= b` → `(_a = a).x = Math.pow(_a.x, b)`
      const expressionTemp = newTempVariable(factory);
      addVariableDeclaration(emitContext, expressionTemp);
      const assignment = newAssignmentExpression(factory, expressionTemp, expressionOf(leftVisited));
      target = newPropertyAccessExpression(factory, assignment, undefined, propertyAccessName(leftVisited));
      value = newPropertyAccessExpression(factory, expressionTemp, undefined, propertyAccessName(leftVisited));
    } else {
      // `a **= b` → `a = Math.pow(a, b)`
      target = leftVisited;
      value = leftVisited;
    }

    const rhs = newGlobalMethodCall(factory, "Math", "pow", [value, rightVisited]);
    return newAssignmentExpression(factory, target, rhs);
  }

  private visitExponentiationExpression(node: AstNode): AstNode {
    const visitor = this.getVisitor();
    const factory = this.getFactory();
    const leftVisited = visitNode(visitor, binaryLeft(node));
    const rightVisited = visitNode(visitor, binaryRight(node));
    return newGlobalMethodCall(factory, "Math", "pow", [leftVisited, rightVisited]);
  }
}

export function newExponentiationTransformer(opts: TransformOptions): Transformer {
  return new ExponentiationTransformer(opts);
}

