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

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

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

// Forward declarations.
declare function subtreeContainsExponentiationOperator(node: AstNode): boolean;
declare function nodeKind(node: AstNode): number;
declare function binaryOperatorKind(node: AstNode): number;
declare function binaryLeft(node: AstNode): AstNode;
declare function binaryRight(node: AstNode): AstNode;
declare function visitEachChildOf(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function visitNode(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function isElementAccessExpression(node: AstNode): boolean;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function expressionOf(node: AstNode): AstNode;
declare function elementArgumentExpression(node: AstNode): AstNode;
declare function propertyAccessName(node: AstNode): AstNode;
declare function newTempVariable(factory: ReturnType<Transformer["getFactory"]>): AstNode;
declare function addVariableDeclaration(emitContext: EmitContext, decl: AstNode): void;
declare function newAssignmentExpression(factory: ReturnType<Transformer["getFactory"]>, target: AstNode, value: AstNode): AstNode;
declare function newElementAccessExpression(factory: ReturnType<Transformer["getFactory"]>, expr: AstNode, questionDot: AstNode | undefined, argument: AstNode): AstNode;
declare function newPropertyAccessExpression(factory: ReturnType<Transformer["getFactory"]>, expr: AstNode, questionDot: AstNode | undefined, name: AstNode): AstNode;
declare function newGlobalMethodCall(factory: ReturnType<Transformer["getFactory"]>, globalName: string, method: string, args: readonly AstNode[]): AstNode;

declare const KindBinaryExpression: number;
declare const KindAsteriskAsteriskToken: number;
declare const KindAsteriskAsteriskEqualsToken: number;
