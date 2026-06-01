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
import { nodeKind, binaryOperatorKind, binaryLeft, binaryRight } from "../../ast/index.js";
import {
  isPropertyAccessExpression,
  isSimpleCopiableExpression,
  skipParentheses,
  expressionOf,
  propertyAccessName,
  elementArgumentExpression,
  subtreeFacts,
} from "../../ast/index.js";

function subtreeContainsLogicalAssignments(node: AstNode): boolean {
  return (subtreeFacts(node) & (1 << 9) /* ContainsLogicalAssignment */) !== 0;
}
function isAccessExpression(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind;
  return k === Kind.PropertyAccessExpression || k === Kind.ElementAccessExpression;
}
import { Kind } from "../../ast/index.js";
import {
  visitNode, visitEachChildOf,
  newTempVariable, addVariableDeclaration,
  newAssignmentExpression, newPropertyAccessExpression,
  newElementAccessExpression, newBinaryExpression, newToken,
  newParenthesizedExpression,
} from "../../printer/factoryHelpers.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindBinaryExpression = Kind.BinaryExpression;
const KindBarBarToken = Kind.BarBarToken;
const KindBarBarEqualsToken = Kind.BarBarEqualsToken;
const KindAmpersandAmpersandToken = Kind.AmpersandAmpersandToken;
const KindAmpersandAmpersandEqualsToken = Kind.AmpersandAmpersandEqualsToken;
const KindQuestionQuestionToken = Kind.QuestionQuestionToken;
const KindQuestionQuestionEqualsToken = Kind.QuestionQuestionEqualsToken;
void KindBinaryExpression; void KindBarBarToken; void KindBarBarEqualsToken;
void KindAmpersandAmpersandToken; void KindAmpersandAmpersandEqualsToken;
void KindQuestionQuestionToken; void KindQuestionQuestionEqualsToken;

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

