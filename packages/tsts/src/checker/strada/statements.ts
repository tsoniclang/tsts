/**
 * Statement-level check functions.
 *
 * Each function takes a CheckerOps (the dispatching shell) and the
 * statement node. The body walks the statement's sub-expressions /
 * sub-statements and forwards to the appropriate per-Kind check.
 *
 * Ported from Strada `checker.go` — the check* methods that operate
 * on statements rather than expressions or declarations.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { CheckerOps } from "./index.js";

export function checkBlock(c: CheckerOps, node: AstNode): void {
  const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (statements === undefined) return;
  for (const s of statements) c.checkSourceElement(s);
}

export function checkExpressionStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
}

export function checkIfStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode; thenStatement?: AstNode; elseStatement?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
  const then = (node as unknown as { thenStatement?: AstNode }).thenStatement;
  const els = (node as unknown as { elseStatement?: AstNode }).elseStatement;
  if (then !== undefined) c.checkSourceElement(then);
  if (els !== undefined) c.checkSourceElement(els);
}

export function checkDoStatement(c: CheckerOps, node: AstNode): void {
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (stmt !== undefined) c.checkSourceElement(stmt);
  if (expr !== undefined) c.checkExpression(expr);
}

export function checkWhileStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  if (expr !== undefined) c.checkExpression(expr);
  if (stmt !== undefined) c.checkSourceElement(stmt);
}

export function checkForStatement(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  const cond = (node as unknown as { condition?: AstNode }).condition;
  const inc = (node as unknown as { incrementor?: AstNode }).incrementor;
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  if (init !== undefined) c.checkSourceElement(init);
  if (cond !== undefined) c.checkExpression(cond);
  if (inc !== undefined) c.checkExpression(inc);
  if (stmt !== undefined) c.checkSourceElement(stmt);
}

export function checkForInStatement(c: CheckerOps, node: AstNode): void {
  checkForStatement(c, node);
}

export function checkForOfStatement(c: CheckerOps, node: AstNode): void {
  checkForStatement(c, node);
}

export function checkReturnStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
}

export function checkBreakOrContinueStatement(_c: CheckerOps, _node: AstNode): void {
  // No sub-traversal needed; label resolution is grammar-level.
}

export function checkSwitchStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
  const caseBlock = (node as unknown as { caseBlock?: { clauses?: { nodes?: readonly AstNode[] } } }).caseBlock;
  const clauses = caseBlock?.clauses?.nodes;
  if (clauses !== undefined) {
    for (const cls of clauses) {
      const clsExpr = (cls as unknown as { expression?: AstNode }).expression;
      if (clsExpr !== undefined) c.checkExpression(clsExpr);
      const stmts = (cls as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
      if (stmts !== undefined) for (const s of stmts) c.checkSourceElement(s);
    }
  }
}

export function checkLabeledStatement(c: CheckerOps, node: AstNode): void {
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  if (stmt !== undefined) c.checkSourceElement(stmt);
}

export function checkThrowStatement(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
}

export function checkTryStatement(c: CheckerOps, node: AstNode): void {
  const tryBlock = (node as unknown as { tryBlock?: AstNode }).tryBlock;
  const catchClause = (node as unknown as { catchClause?: AstNode }).catchClause;
  const finallyBlock = (node as unknown as { finallyBlock?: AstNode }).finallyBlock;
  if (tryBlock !== undefined) c.checkSourceElement(tryBlock);
  if (catchClause !== undefined) {
    const cb = (catchClause as unknown as { block?: AstNode }).block;
    if (cb !== undefined) c.checkSourceElement(cb);
  }
  if (finallyBlock !== undefined) c.checkSourceElement(finallyBlock);
}

export function checkDebuggerStatement(_c: CheckerOps, _node: AstNode): void {
  // No-op; control-flow only.
}

export function checkEmptyStatement(_c: CheckerOps, _node: AstNode): void {
  // No-op.
}

export function checkWithStatement(c: CheckerOps, node: AstNode): void {
  // 'with' is forbidden in strict mode; the grammar checker reports
  // it. Here we still walk children for completeness.
  const expr = (node as unknown as { expression?: AstNode }).expression;
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  if (expr !== undefined) c.checkExpression(expr);
  if (stmt !== undefined) c.checkSourceElement(stmt);
}

void Kind;
