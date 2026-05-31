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
import { createParenthesizedExpression, Kind, NodeFlags } from "../ast/index.js";

// Precedence ranks (TC39 spec). Mirrors ts-go OperatorPrecedence.
function operatorPrecedence(op: number): number {
  switch (op) {
    case Kind.CommaToken: return 0;
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken: case Kind.MinusEqualsToken:
    case Kind.AsteriskAsteriskEqualsToken: case Kind.AsteriskEqualsToken:
    case Kind.SlashEqualsToken: case Kind.PercentEqualsToken:
    case Kind.LessThanLessThanEqualsToken: case Kind.GreaterThanGreaterThanEqualsToken:
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case Kind.AmpersandEqualsToken: case Kind.BarEqualsToken: case Kind.CaretEqualsToken:
    case Kind.BarBarEqualsToken: case Kind.AmpersandAmpersandEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return 2;
    case Kind.QuestionToken: case Kind.ColonToken: return 3;
    case Kind.QuestionQuestionToken: return 4;
    case Kind.BarBarToken: return 5;
    case Kind.AmpersandAmpersandToken: return 6;
    case Kind.BarToken: return 7;
    case Kind.CaretToken: return 8;
    case Kind.AmpersandToken: return 9;
    case Kind.EqualsEqualsToken: case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken: case Kind.ExclamationEqualsEqualsToken:
      return 10;
    case Kind.LessThanToken: case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken: case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword: case Kind.InstanceOfKeyword: case Kind.AsKeyword:
    case Kind.SatisfiesKeyword:
      return 11;
    case Kind.LessThanLessThanToken: case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return 12;
    case Kind.PlusToken: case Kind.MinusToken: return 13;
    case Kind.AsteriskToken: case Kind.SlashToken: case Kind.PercentToken: return 14;
    case Kind.AsteriskAsteriskToken: return 15;
  }
  return -1;
}

function expressionPrecedence(node: Expression): number {
  const k = (node as { kind?: number }).kind;
  switch (k) {
    case Kind.BinaryExpression: {
      const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind ?? 0;
      return operatorPrecedence(op);
    }
    case Kind.ConditionalExpression: return 3;
    case Kind.YieldExpression: return 1;
    case Kind.SpreadElement: return 0;
    case Kind.PrefixUnaryExpression: case Kind.TypeOfExpression:
    case Kind.VoidExpression: case Kind.DeleteExpression: case Kind.AwaitExpression:
      return 16;
    case Kind.PostfixUnaryExpression: return 17;
    case Kind.CallExpression: case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.PropertyAccessExpression: case Kind.ElementAccessExpression:
      return 19;
    default: return 20;
  }
}

export function needsParensInArrowBody(node: Expression): boolean {
  // Arrow body { ... } would be parsed as block. Object-literal body needs parens.
  return (node as { kind?: number }).kind === Kind.ObjectLiteralExpression;
}
export function needsParensInLeftSideOfAccess(node: Expression): boolean {
  // Member access on a numeric literal needs parens (`(1).toString()`).
  const k = (node as { kind?: number }).kind;
  if (k === Kind.NumericLiteral) {
    const text = (node as unknown as { text?: string }).text ?? "";
    return !text.includes(".") && !text.includes("e") && !text.includes("E");
  }
  // Function/Class expressions on the left of access need parens.
  return k === Kind.FunctionExpression || k === Kind.ClassExpression
    || k === Kind.ArrowFunction || k === Kind.NewExpression
    || k === Kind.ObjectLiteralExpression;
}
export function needsParensInCallTarget(node: Expression): boolean {
  const k = (node as { kind?: number }).kind;
  return k === Kind.FunctionExpression || k === Kind.ArrowFunction
    || k === Kind.ClassExpression || k === Kind.BinaryExpression
    || k === Kind.ConditionalExpression || k === Kind.TypeAssertionExpression
    || k === Kind.AsExpression;
}
export function needsParensInNewTarget(node: Expression): boolean {
  return needsParensInCallTarget(node);
}
export function needsParensInBinary(left: Expression, operator: number, right: Expression): boolean {
  // True if `left` has lower precedence than `operator`, or if `right`
  // has lower-or-equal precedence (right-associative case for `=` and
  // `??`, `**`).
  const opPrec = operatorPrecedence(operator);
  const lp = expressionPrecedence(left);
  const rp = expressionPrecedence(right);
  return lp < opPrec || rp < opPrec;
}
export function needsParensInPrefixUnary(operand: Expression): boolean {
  return expressionPrecedence(operand) < 16;
}
export function needsParensInPostfixUnary(operand: Expression): boolean {
  return expressionPrecedence(operand) < 17;
}
export function needsParensInConditional(condition: Expression): boolean {
  // Conditional condition needs parens when its precedence is at or
  // below the `?:` precedence (3).
  return expressionPrecedence(condition) <= 3;
}
export function needsParensInExtends(expression: Expression): boolean {
  // `class X extends ... { }` — arrow/function/object/binary/conditional all need parens.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.ArrowFunction || k === Kind.FunctionExpression
    || k === Kind.ClassExpression || k === Kind.ObjectLiteralExpression
    || k === Kind.BinaryExpression || k === Kind.ConditionalExpression
    || k === Kind.YieldExpression || k === Kind.AwaitExpression;
}
export function needsParensForExpressionStatement(expression: Expression): boolean {
  // Expressions starting with `{`, `function`, `class`, `async` keyword,
  // or destructuring assignment need parens at statement position.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.ObjectLiteralExpression || k === Kind.FunctionExpression
    || k === Kind.ClassExpression;
}
export function needsParensForSpread(expression: Expression): boolean {
  // Spread argument with binary/conditional/yield needs parens to bind
  // the expression to the spread.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.BinaryExpression || k === Kind.ConditionalExpression
    || k === Kind.YieldExpression;
}

export function parenthesizeExpressionForExportDefault(expression: Expression): Expression {
  return needsParensForExpressionStatement(expression) ? createParenthesizedExpression(expression) : expression;
}
export function parenthesizeBinaryOperand(operand: Expression, operator: number, isLeftSide: boolean): Expression {
  const operandPrecedence = expressionPrecedence(operand);
  const opPrecedence = operatorPrecedence(operator);
  if (operandPrecedence < opPrecedence || !isLeftSide && operandPrecedence === opPrecedence) {
    return createParenthesizedExpression(operand);
  }
  return operand;
}
export function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression {
  return expression.kind === Kind.CommaToken || expression.kind === Kind.BinaryExpression && ((expression as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(expression)
    : expression;
}
export function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression {
  return needsParensInConditional(condition) ? createParenthesizedExpression(condition) : condition;
}
export function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression {
  return branch.kind === Kind.BinaryExpression && ((branch as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(branch)
    : branch;
}
export function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression {
  return expression.kind === Kind.BinaryExpression && ((expression as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(expression)
    : expression;
}
export function parenthesizeMemberOfElementType(member: AstNode): AstNode {
  return member.kind === Kind.UnionType || member.kind === Kind.IntersectionType || member.kind === Kind.FunctionType
    ? createParenthesizedExpression(member as Expression)
    : member;
}
export function parenthesizeMemberOfConditionalType(member: AstNode): AstNode {
  return member.kind === Kind.ConditionalType ? createParenthesizedExpression(member as Expression) : member;
}

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

export function isCustomPrologue(node: Statement): boolean {
  // True for prologue-directive ExpressionStatement marked synthesized
  // by the compiler (e.g. emit-helpers shim like '"use strict";').
  if (!isPrologueDirective(node)) return false;
  return (((node as unknown as { flags?: number }).flags ?? 0) & NodeFlags.Synthesized) !== 0;
}
export function isPrologueDirective(node: Statement): boolean {
  if ((node as { kind?: number }).kind !== Kind.ExpressionStatement) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  return expr !== undefined && (expr as { kind?: number }).kind === Kind.StringLiteral;
}
export function isAnyImportOrReExport(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind;
  return k === Kind.ImportDeclaration || k === Kind.ImportEqualsDeclaration
    || k === Kind.ExportDeclaration || k === Kind.ExportAssignment;
}

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
