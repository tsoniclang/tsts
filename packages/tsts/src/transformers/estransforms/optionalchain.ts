/**
 * Optional chaining (`?.`) downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/optionalchain.go`.
 *
 * Rewrites optional chain expressions like `a?.b.c?.()` into the
 * equivalent ternary chains that early-exit when `a` or any
 * intermediate value is `null`/`undefined`.
 */

import type { Node as AstNode } from "../../ast/index.js";
import {
  nodeKind, accessExpressionExpression, callExpressionExpression,
  callExpressionArguments,
  nodeListNodes, skipParentheses, parenthesizedExpression,
  propertyAccessName, elementArgumentExpression, expressionOf,
  callExpressionQuestionDotToken as questionDotTokenOf,
  isSimpleCopiableExpression,
} from "../../ast/index.js";
import {
  isCallExpression, isTaggedTemplateExpression,
  isParenthesizedExpression, isNonNullExpression,
} from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import { EmitFlags } from "../../printer/emitflags.js";
import {
  visitNode, visitNodes, visitEachChild, visitEachChildOf,
  newTempVariable, addVariableDeclaration,
  newAssignmentExpression, newSyntheticReferenceExpression,
  setOriginal, addEmitFlags,
  updateCallExpression, updateParenthesizedExpression,
  updatePropertyAccessExpression, updateElementAccessExpression,
  newElementAccessExpression, newPropertyAccessExpression,
  newCallExpression, newFunctionCallCall, newConditionalExpression,
  newDeleteExpression, newToken, newTrueExpression,
  newVoidZeroExpression, newThisExpression,
} from "../../printer/factory-helpers.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindCallExpression = Kind.CallExpression;
const KindPropertyAccessExpression = Kind.PropertyAccessExpression;
const KindElementAccessExpression = Kind.ElementAccessExpression;
const KindDeleteExpression = Kind.DeleteExpression;
const KindParenthesizedExpression = Kind.ParenthesizedExpression;
const KindSuperKeyword = Kind.SuperKeyword;
const KindQuestionToken = Kind.QuestionToken;
const KindColonToken = Kind.ColonToken;
const EFNoComments = EmitFlags.NoComments;
void KindCallExpression; void KindPropertyAccessExpression;
void KindElementAccessExpression; void KindDeleteExpression;
void KindParenthesizedExpression; void KindSuperKeyword;
void KindQuestionToken; void KindColonToken; void EFNoComments;

class OptionalChainTransformer extends Transformer {
  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsOptionalChaining(node)) return node;
    const kind = nodeKind(node);
    if (kind === KindCallExpression) {
      return this.visitCallExpression(node, false);
    }
    if (kind === KindPropertyAccessExpression || kind === KindElementAccessExpression) {
      if (hasOptionalChainFlag(node)) {
        return this.visitOptionalExpression(node, false, false);
      }
      return visitEachChildOf(this.getVisitor(), node);
    }
    if (kind === KindDeleteExpression) {
      return this.visitDeleteExpression(node);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitCallExpression(node: AstNode, captureThisArg: boolean): AstNode {
    if (hasOptionalChainFlag(node)) {
      return this.visitOptionalExpression(node, captureThisArg, false);
    }
    const expression = callExpressionExpression(node);
    if (isParenthesizedExpression(expression)) {
      const unwrapped = skipParentheses(expression);
      if (hasOptionalChainFlag(unwrapped)) {
        const visited = this.visitParenthesizedExpression(expression, true, false);
        const args = visitNodes(this.getVisitor(), callExpressionArguments(node)) as AstNode;
        if (isSyntheticReferenceExpression(visited)) {
          const res = newFunctionCallCall(
            this.getFactory(),
            syntheticReferenceExpression(visited),
            syntheticReferenceThisArg(visited),
            nodeListNodes(args),
          );
          setOriginal(this.getEmitContext(), res, node);
          return res;
        }
        return updateCallExpression(this.getFactory(), node, visited, undefined, undefined, args);
      }
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitParenthesizedExpression(node: AstNode, captureThisArg: boolean, isDelete: boolean): AstNode {
    const expr = this.visitNonOptionalExpression(parenthesizedExpression(node), captureThisArg, isDelete);
    if (isSyntheticReferenceExpression(expr)) {
      const synthExpr = syntheticReferenceExpression(expr);
      const synthThis = syntheticReferenceThisArg(expr);
      const res = newSyntheticReferenceExpression(
        this.getFactory(),
        updateParenthesizedExpression(this.getFactory(), node, synthExpr),
        synthThis,
      );
      setOriginal(this.getEmitContext(), res, node);
      return res;
    }
    return updateParenthesizedExpression(this.getFactory(), node, expr);
  }

  private visitPropertyOrElementAccessExpression(node: AstNode, captureThisArg: boolean, isDelete: boolean): AstNode {
    if (hasOptionalChainFlag(node)) {
      return this.visitOptionalExpression(node, captureThisArg, isDelete);
    }
    let expression = visitNode(this.getVisitor(), accessExpressionExpression(node));

    let thisArg: AstNode | undefined;
    if (captureThisArg) {
      if (!isSimpleCopiableExpression(expression)) {
        thisArg = newTempVariable(this.getFactory());
        addVariableDeclaration(this.getEmitContext(), thisArg);
        expression = newAssignmentExpression(this.getFactory(), thisArg, expression);
      } else {
        thisArg = expression;
      }
    }

    if (nodeKind(node) === KindPropertyAccessExpression) {
      expression = updatePropertyAccessExpression(
        this.getFactory(),
        node,
        expression,
        undefined,
        visitNode(this.getVisitor(), propertyAccessName(node)),
      );
    } else {
      expression = updateElementAccessExpression(
        this.getFactory(),
        node,
        expression,
        undefined,
        visitNode(this.getVisitor(), elementArgumentExpression(node)),
      );
    }

    if (thisArg !== undefined) {
      const res = newSyntheticReferenceExpression(this.getFactory(), expression, thisArg);
      setOriginal(this.getEmitContext(), res, node);
      return res;
    }
    return expression;
  }

  private visitDeleteExpression(node: AstNode): AstNode {
    const unwrapped = skipParentheses(deleteExpressionExpression(node));
    if (hasOptionalChainFlag(unwrapped)) {
      return this.visitNonOptionalExpression(deleteExpressionExpression(node), false, true);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitNonOptionalExpression(node: AstNode, captureThisArg: boolean, isDelete: boolean): AstNode {
    const kind = nodeKind(node);
    if (kind === KindParenthesizedExpression) return this.visitParenthesizedExpression(node, captureThisArg, isDelete);
    if (kind === KindElementAccessExpression || kind === KindPropertyAccessExpression) {
      return this.visitPropertyOrElementAccessExpression(node, captureThisArg, isDelete);
    }
    if (kind === KindCallExpression) return this.visitCallExpression(node, captureThisArg);
    return visitNode(this.getVisitor(), node);
  }

  private visitOptionalExpression(node: AstNode, captureThisArg: boolean, isDelete: boolean): AstNode {
    const factory = this.getFactory();
    const emitContext = this.getEmitContext();
    const visitor = this.getVisitor();

    const flat = flattenChain(node);
    const { expression, chain } = flat;

    let left = this.visitNonOptionalExpression(skipPartiallyEmittedExpressions(expression), isCallChain(chain[0]!), false);
    let leftThisArg: AstNode | undefined;
    let capturedLeft = left;
    if (isSyntheticReferenceExpression(left)) {
      leftThisArg = syntheticReferenceThisArg(left);
      capturedLeft = syntheticReferenceExpression(left);
    }
    let leftExpression = restoreOuterExpressions(factory, expression, capturedLeft, OEKPartiallyEmittedExpressions);
    if (!isSimpleCopiableExpression(capturedLeft)) {
      capturedLeft = newTempVariable(factory);
      addVariableDeclaration(emitContext, capturedLeft);
      leftExpression = newAssignmentExpression(factory, capturedLeft, leftExpression);
    }
    let rightExpression: AstNode = capturedLeft;
    let thisArg: AstNode | undefined;

    for (let i = 0; i < chain.length; i += 1) {
      const segment = chain[i]!;
      const kind = nodeKind(segment);
      if (kind === KindElementAccessExpression || kind === KindPropertyAccessExpression) {
        if (i === chain.length - 1 && captureThisArg) {
          if (!isSimpleCopiableExpression(rightExpression)) {
            thisArg = newTempVariable(factory);
            addVariableDeclaration(emitContext, thisArg);
            rightExpression = newAssignmentExpression(factory, thisArg, rightExpression);
          } else {
            thisArg = rightExpression;
          }
        }
        if (kind === KindElementAccessExpression) {
          rightExpression = newElementAccessExpression(factory, rightExpression, undefined, visitNode(visitor, elementArgumentExpression(segment)));
        } else {
          rightExpression = newPropertyAccessExpression(factory, rightExpression, undefined, visitNode(visitor, propertyAccessName(segment)));
        }
      } else if (kind === KindCallExpression) {
        if (i === 0 && leftThisArg !== undefined) {
          if (!hasAutoGenerateInfo(emitContext, leftThisArg)) {
            leftThisArg = cloneNode(factory, leftThisArg);
            addEmitFlags(emitContext, leftThisArg, EFNoComments);
          }
          let callThisArg = leftThisArg;
          if (nodeKind(leftThisArg) === KindSuperKeyword) {
            callThisArg = newThisExpression(factory);
          }
          rightExpression = newFunctionCallCall(
            factory,
            rightExpression,
            callThisArg,
            nodeListNodes(visitNodes(visitor, callExpressionArguments(segment)) as AstNode),
          );
        } else {
          rightExpression = newCallExpression(
            factory,
            rightExpression,
            undefined,
            undefined,
            visitNodes(visitor, callExpressionArguments(segment)),
          );
        }
      }
      setOriginal(emitContext, rightExpression, segment);
    }

    let target: AstNode;
    if (isDelete) {
      target = newConditionalExpression(
        factory,
        createNotNullCondition(emitContext, leftExpression, capturedLeft, true),
        newToken(factory, KindQuestionToken),
        newTrueExpression(factory),
        newToken(factory, KindColonToken),
        newDeleteExpression(factory, rightExpression),
      );
    } else {
      target = newConditionalExpression(
        factory,
        createNotNullCondition(emitContext, leftExpression, capturedLeft, true),
        newToken(factory, KindQuestionToken),
        newVoidZeroExpression(factory),
        newToken(factory, KindColonToken),
        rightExpression,
      );
    }
    if (thisArg !== undefined) {
      target = newSyntheticReferenceExpression(factory, target, thisArg);
    }
    setOriginal(emitContext, target, node);
    return target;
  }
}

interface FlattenResult {
  readonly expression: AstNode;
  readonly chain: readonly AstNode[];
}

function isNonNullChain(node: AstNode): boolean {
  return isNonNullExpression(node) && hasOptionalChainFlag(node);
}

function flattenChain(chain: AstNode): FlattenResult {
  const links: AstNode[] = [chain];
  while (!isTaggedTemplateExpression(chain) && questionDotTokenOf(chain) === undefined) {
    chain = skipPartiallyEmittedExpressions(expressionOf(chain));
    links.unshift(chain);
  }
  return { expression: expressionOf(chain), chain: links };
}

function isCallChain(node: AstNode): boolean {
  return isCallExpression(node) && hasOptionalChainFlag(node);
}

export function newOptionalChainTransformer(opts: TransformOptions): Transformer {
  return new OptionalChainTransformer(opts);
}

// Forward declarations.
// Strada-specific helpers still forward-declared.
declare function subtreeContainsOptionalChaining(node: AstNode): boolean;
declare function hasOptionalChainFlag(node: AstNode): boolean;
declare function isSyntheticReferenceExpression(node: AstNode): boolean;
declare function syntheticReferenceExpression(node: AstNode): AstNode;
declare function syntheticReferenceThisArg(node: AstNode): AstNode;
declare function deleteExpressionExpression(node: AstNode): AstNode;
declare function skipPartiallyEmittedExpressions(node: AstNode): AstNode;
declare function hasAutoGenerateInfo(emitContext: EmitContext, node: AstNode): boolean;
declare function createNotNullCondition(emitContext: EmitContext, left: AstNode, right: AstNode, invert: boolean): AstNode;
declare function restoreOuterExpressions(factory: ReturnType<Transformer["getFactory"]>, expression: AstNode, capturedLeft: AstNode, oek: number): AstNode;
declare function cloneNode(factory: ReturnType<Transformer["getFactory"]>, node: AstNode): AstNode;
const OEKPartiallyEmittedExpressions = 1 << 0;
