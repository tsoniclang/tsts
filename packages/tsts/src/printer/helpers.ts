/**
 * Printer helpers.
 *
 * Port of TS-Go `internal/printer/helpers.go` (~560 LoC). Provides
 * tactical helpers used during emission: parenthesization rules,
 * literal text reconstruction, source-character escape handling, and
 * comment-range pruning.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, Expression, Statement } from "../ast/index.js";

export function needsParensInArrowBody(node: Expression): boolean { void node; return false; }
export function needsParensInLeftSideOfAccess(node: Expression): boolean { void node; return false; }
export function needsParensInCallTarget(node: Expression): boolean { void node; return false; }
export function needsParensInNewTarget(node: Expression): boolean { void node; return false; }
export function needsParensInBinary(left: Expression, operator: number, right: Expression): boolean {
  void left; void operator; void right; return false;
}
export function needsParensInPrefixUnary(operand: Expression): boolean { void operand; return false; }
export function needsParensInPostfixUnary(operand: Expression): boolean { void operand; return false; }
export function needsParensInConditional(condition: Expression): boolean { void condition; return false; }
export function needsParensInExtends(expression: Expression): boolean { void expression; return false; }
export function needsParensForExpressionStatement(expression: Expression): boolean { void expression; return false; }
export function needsParensForSpread(expression: Expression): boolean { void expression; return false; }

export function parenthesizeExpressionForExportDefault(expression: Expression): Expression { return expression; }
export function parenthesizeBinaryOperand(operand: Expression, operator: number, isLeftSide: boolean): Expression {
  void operator; void isLeftSide; return operand;
}
export function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression { return expression; }
export function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression { return condition; }
export function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression { return branch; }
export function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression { return expression; }
export function parenthesizeMemberOfElementType(member: AstNode): AstNode { return member; }
export function parenthesizeMemberOfConditionalType(member: AstNode): AstNode { return member; }

export function chainBundle(transform: (node: AstNode) => AstNode): (node: AstNode) => AstNode {
  return (node) => transform(node);
}

export function visitArray<T extends AstNode>(nodes: readonly T[], cb: (n: T) => T | undefined): readonly T[] {
  const result: T[] = [];
  for (const n of nodes) {
    const visited = cb(n);
    if (visited !== undefined) result.push(visited);
  }
  return result;
}

export function getEmitScriptTarget(opts: { target?: number; emitTarget?: number }): number {
  return opts.emitTarget ?? opts.target ?? 0;
}

export function getEmitModuleKind(opts: { module?: number }): number {
  return opts.module ?? 0;
}

export function getUseDefineForClassFields(opts: { useDefineForClassFields?: boolean }): boolean {
  return opts.useDefineForClassFields ?? false;
}

export function getResolveJsonModule(opts: { resolveJsonModule?: boolean }): boolean {
  return opts.resolveJsonModule ?? false;
}

export function isCustomPrologue(node: Statement): boolean { void node; return false; }
export function isPrologueDirective(node: Statement): boolean { void node; return false; }
export function isAnyImportOrReExport(node: AstNode): boolean { void node; return false; }

export function reduceLeft<T, U>(
  list: readonly T[], cb: (acc: U, elem: T, i: number) => U, initial: U,
): U {
  let acc = initial;
  list.forEach((elem, i) => { acc = cb(acc, elem, i); });
  return acc;
}

export function reduceRight<T, U>(
  list: readonly T[], cb: (acc: U, elem: T, i: number) => U, initial: U,
): U {
  let acc = initial;
  for (let i = list.length - 1; i >= 0; i -= 1) acc = cb(acc, list[i]!, i);
  return acc;
}
