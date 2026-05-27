/**
 * Logical assignment operators (`||=`, `&&=`, `??=`) downlevel
 * transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/logicalassignment.go`.
 *
 * Rewrites `a ||= b` as `a || (a = b)`, `a &&= b` as `a && (a = b)`,
 * and `a ??= b` as `a ?? (a = b)`. For property and element accesses,
 * introduces temps to avoid double-evaluation.
 */

import type { Node as AstNode } from "../../ast/index.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

class LogicalAssignmentTransformer extends Transformer {
  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsLogicalAssignments(node)) return node;
    if (nodeKind(node) === KindBinaryExpression) {
      return this.visitBinaryExpression(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitBinaryExpression(node: AstNode): AstNode {
    let nonAssignmentOperator: number;
    const op = binaryOperatorKind(node);
    switch (op) {
      case KindBarBarEqualsToken:
        nonAssignmentOperator = KindBarBarToken;
        break;
      case KindAmpersandAmpersandEqualsToken:
        nonAssignmentOperator = KindAmpersandAmpersandToken;
        break;
      case KindQuestionQuestionEqualsToken:
        nonAssignmentOperator = KindQuestionQuestionToken;
        break;
      default:
        return visitEachChildOf(this.getVisitor(), node);
    }

    const visitor = this.getVisitor();
    const factory = this.getFactory();
    const emitContext = this.getEmitContext();

    let left = skipParentheses(visitNode(visitor, binaryLeft(node)));
    let assignmentTarget = left;
    const right = skipParentheses(visitNode(visitor, binaryRight(node)));

    if (isAccessExpression(left)) {
      const targetExpr = expressionOf(left);
      const targetSimple = isSimpleCopiableExpression(targetExpr);
      let propertyAccessTarget = targetExpr;
      let propertyAccessTargetAssignment = targetExpr;
      if (!targetSimple) {
        propertyAccessTarget = newTempVariable(factory);
        addVariableDeclaration(emitContext, propertyAccessTarget);
        propertyAccessTargetAssignment = newAssignmentExpression(factory, propertyAccessTarget, targetExpr);
      }

      if (isPropertyAccessExpression(left)) {
        const name = propertyAccessName(left);
        assignmentTarget = newPropertyAccessExpression(factory, propertyAccessTarget, undefined, name);
        left = newPropertyAccessExpression(factory, propertyAccessTargetAssignment, undefined, name);
      } else {
        // element access
        const argExpr = elementArgumentExpression(left);
        const argSimple = isSimpleCopiableExpression(argExpr);
        let elementAccessArgument = argExpr;
        let argumentExpr = argExpr;
        if (!argSimple) {
          elementAccessArgument = newTempVariable(factory);
          addVariableDeclaration(emitContext, elementAccessArgument);
          argumentExpr = newAssignmentExpression(factory, elementAccessArgument, argExpr);
        }

        assignmentTarget = newElementAccessExpression(factory, propertyAccessTarget, undefined, elementAccessArgument);
        left = newElementAccessExpression(factory, propertyAccessTargetAssignment, undefined, argumentExpr);
      }
    }

    return newBinaryExpression(
      factory,
      undefined,
      left,
      undefined,
      newToken(factory, nonAssignmentOperator),
      newParenthesizedExpression(factory, newAssignmentExpression(factory, assignmentTarget, right)),
    );
  }
}

export function newLogicalAssignmentTransformer(opts: TransformOptions): Transformer {
  return new LogicalAssignmentTransformer(opts);
}

// Forward declarations.
declare function subtreeContainsLogicalAssignments(node: AstNode): boolean;
declare function nodeKind(node: AstNode): number;
declare function binaryOperatorKind(node: AstNode): number;
declare function binaryLeft(node: AstNode): AstNode;
declare function binaryRight(node: AstNode): AstNode;
declare function visitEachChildOf(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function visitNode(visitor: ReturnType<Transformer["getVisitor"]>, node: AstNode): AstNode;
declare function skipParentheses(node: AstNode): AstNode;
declare function isAccessExpression(node: AstNode): boolean;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function isSimpleCopiableExpression(node: AstNode): boolean;
declare function expressionOf(node: AstNode): AstNode;
declare function propertyAccessName(node: AstNode): AstNode;
declare function elementArgumentExpression(node: AstNode): AstNode;
declare function newTempVariable(factory: ReturnType<Transformer["getFactory"]>): AstNode;
declare function addVariableDeclaration(emitContext: EmitContext, decl: AstNode): void;
declare function newAssignmentExpression(factory: ReturnType<Transformer["getFactory"]>, target: AstNode, value: AstNode): AstNode;
declare function newPropertyAccessExpression(factory: ReturnType<Transformer["getFactory"]>, expr: AstNode, questionDot: AstNode | undefined, name: AstNode): AstNode;
declare function newElementAccessExpression(factory: ReturnType<Transformer["getFactory"]>, expr: AstNode, questionDot: AstNode | undefined, argument: AstNode): AstNode;
declare function newBinaryExpression(factory: ReturnType<Transformer["getFactory"]>, jsdoc: undefined, left: AstNode, jsdoc2: undefined, operator: AstNode, right: AstNode): AstNode;
declare function newToken(factory: ReturnType<Transformer["getFactory"]>, kind: number): AstNode;
declare function newParenthesizedExpression(factory: ReturnType<Transformer["getFactory"]>, expr: AstNode): AstNode;

declare const KindBinaryExpression: number;
declare const KindBarBarToken: number;
declare const KindBarBarEqualsToken: number;
declare const KindAmpersandAmpersandToken: number;
declare const KindAmpersandAmpersandEqualsToken: number;
declare const KindQuestionQuestionToken: number;
declare const KindQuestionQuestionEqualsToken: number;
