/**
 * Statement reachability + completion analysis.
 *
 * Ported from Strada `checker.go` — checkReachability, getStatementCompleteness,
 * getReachabilityKind.
 *
 * Used to emit "unreachable code" warnings and to validate `never`
 * return-type inference.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const Reachability = {
  Reachable: 0,
  Unreachable: 1,
  Falls: 2,
} as const;

export type Reachability =
  | typeof Reachability.Reachable
  | typeof Reachability.Unreachable
  | typeof Reachability.Falls;

/**
 * Returns true when the statement always returns or throws — no
 * subsequent statement is reachable.
 */
export function isUnconditionallyTerminating(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ReturnStatement:
    case Kind.ThrowStatement:
      return true;
    case Kind.Block:
      return blockEndsInTerminator(node);
    case Kind.IfStatement: {
      const thenStmt = (node as unknown as { thenStatement?: AstNode }).thenStatement;
      const elseStmt = (node as unknown as { elseStatement?: AstNode }).elseStatement;
      if (thenStmt === undefined || elseStmt === undefined) return false;
      return isUnconditionallyTerminating(thenStmt) && isUnconditionallyTerminating(elseStmt);
    }
    default:
      return false;
  }
}

function blockEndsInTerminator(block: AstNode): boolean {
  const stmts = (block as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (stmts === undefined || stmts.length === 0) return false;
  const last = stmts[stmts.length - 1]!;
  return isUnconditionallyTerminating(last);
}

/**
 * Returns true when the statement is an empty no-op (or has an empty
 * body).
 */
export function isEmptyStatement(node: AstNode): boolean {
  return node.kind === Kind.EmptyStatement;
}

/**
 * Computes the reachability of every statement in a Block. Returns
 * the index of the first unreachable statement, or -1 when all are
 * reachable.
 */
export function findFirstUnreachableStatement(block: AstNode): number {
  const stmts = (block as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (stmts === undefined) return -1;
  for (let i = 0; i < stmts.length - 1; i++) {
    if (isUnconditionallyTerminating(stmts[i]!)) {
      return i + 1;
    }
  }
  return -1;
}

/**
 * Returns true when the function body always returns (every code
 * path ends in a return/throw).
 */
export function functionBodyAlwaysReturns(body: AstNode): boolean {
  return isUnconditionallyTerminating(body);
}

/**
 * Returns true when the statement is a labeled-loop. Used for
 * `continue/break <label>` validation.
 */
export function isLabeledLoop(node: AstNode): boolean {
  if (node.kind !== Kind.LabeledStatement) return false;
  const stmt = (node as unknown as { statement?: AstNode }).statement;
  if (stmt === undefined) return false;
  return (
    stmt.kind === Kind.ForStatement ||
    stmt.kind === Kind.ForInStatement ||
    stmt.kind === Kind.ForOfStatement ||
    stmt.kind === Kind.WhileStatement ||
    stmt.kind === Kind.DoStatement
  );
}
