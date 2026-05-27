/**
 * Switch-statement structure helpers.
 *
 * Ported from Strada `checker.go` — checkSwitchStatement,
 * getSwitchDiscriminantType, getCaseLabels.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the discriminant expression of a switch.
 */
export function getSwitchDiscriminant(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.SwitchStatement) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the CaseBlock of a switch.
 */
export function getCaseBlock(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.SwitchStatement) return undefined;
  return (node as unknown as { caseBlock?: AstNode }).caseBlock;
}

/**
 * Returns the clauses of a switch.
 */
export function getSwitchClauseNodes(node: AstNode): readonly AstNode[] {
  const block = getCaseBlock(node);
  if (block === undefined) return [];
  const clauses = (block as unknown as { clauses?: { nodes?: readonly AstNode[] } }).clauses;
  return clauses?.nodes ?? [];
}

/**
 * Returns true when the clause is a CaseClause.
 */
export function isCaseClause(node: AstNode): boolean {
  return node.kind === Kind.CaseClause;
}

/**
 * Returns true when the clause is a DefaultClause.
 */
export function isDefaultClause(node: AstNode): boolean {
  return node.kind === Kind.DefaultClause;
}

/**
 * Returns the case-expression of a CaseClause.
 */
export function getCaseExpression(clause: AstNode): AstNode | undefined {
  if (!isCaseClause(clause)) return undefined;
  return (clause as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the statements in a case/default clause.
 */
export function getClauseStatements(clause: AstNode): readonly AstNode[] {
  if (!isCaseClause(clause) && !isDefaultClause(clause)) return [];
  const stmts = (clause as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements;
  return stmts?.nodes ?? [];
}

/**
 * Returns the default-clause of a switch, if any.
 */
export function getDefaultClause(node: AstNode): AstNode | undefined {
  return getSwitchClauseNodes(node).find(isDefaultClause);
}

/**
 * Returns the count of case clauses (excluding default).
 */
export function getCaseClauseCount(node: AstNode): number {
  return getSwitchClauseNodes(node).filter(isCaseClause).length;
}

/**
 * Returns true when at least one case-clause falls through to the
 * next (no break/return/throw).
 */
export function hasFallthrough(node: AstNode): boolean {
  const clauses = getSwitchClauseNodes(node);
  for (let i = 0; i < clauses.length - 1; i++) {
    const clause = clauses[i]!;
    const stmts = getClauseStatements(clause);
    if (stmts.length === 0) continue;
    const last = stmts[stmts.length - 1]!;
    if (
      last.kind !== Kind.BreakStatement &&
      last.kind !== Kind.ReturnStatement &&
      last.kind !== Kind.ThrowStatement &&
      last.kind !== Kind.ContinueStatement
    ) {
      return true;
    }
  }
  return false;
}
