/**
 * Switch-statement exhaustiveness analysis.
 *
 * Ported from Strada `checker.go` — checkSwitchStatement,
 * isSwitchExhaustive, computeSwitchCoverage.
 *
 * Reports an error when a switch on a literal-union doesn't cover
 * every constituent, when the function is required to be exhaustive.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getLiteralValuesInUnion } from "./literal-narrowing.js";

/**
 * Returns the case clauses of a switch statement.
 */
export function getSwitchClauses(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.SwitchStatement) return [];
  const caseBlock = (node as unknown as { caseBlock?: AstNode }).caseBlock;
  if (caseBlock === undefined) return [];
  const clauses = (caseBlock as unknown as { clauses?: { nodes?: readonly AstNode[] } }).clauses?.nodes;
  return clauses ?? [];
}

/**
 * Returns the case-clause expressions (the literal values matched
 * against the discriminant).
 */
export function getCaseExpressions(node: AstNode): readonly AstNode[] {
  return getSwitchClauses(node)
    .filter((c) => c.kind === Kind.CaseClause)
    .map((c) => (c as unknown as { expression?: AstNode }).expression)
    .filter((e): e is AstNode => e !== undefined);
}

/**
 * Returns true when the switch statement has a `default` clause.
 */
export function hasDefaultClause(node: AstNode): boolean {
  return getSwitchClauses(node).some((c) => c.kind === Kind.DefaultClause);
}

/**
 * Returns the case-expression values when they are all literals.
 */
export function getCaseLiteralValues(node: AstNode): readonly (string | number | boolean)[] {
  const out: (string | number | boolean)[] = [];
  for (const expr of getCaseExpressions(node)) {
    if (expr.kind === Kind.StringLiteral) {
      const text = (expr as unknown as { text?: string }).text;
      if (text !== undefined) out.push(text);
    } else if (expr.kind === Kind.NumericLiteral) {
      const text = (expr as unknown as { text?: string }).text;
      if (text !== undefined) out.push(Number(text));
    } else if (expr.kind === Kind.TrueKeyword) {
      out.push(true);
    } else if (expr.kind === Kind.FalseKeyword) {
      out.push(false);
    }
  }
  return out;
}

/**
 * Returns true when the switch's discriminant has exhaustive case
 * coverage — every literal in the discriminant's union has a matching
 * case clause.
 */
export function isSwitchExhaustive(
  switchNode: AstNode,
  discriminantType: Type,
): boolean {
  if (hasDefaultClause(switchNode)) return true;
  const flags = (discriminantType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    // Non-union discriminant — exhaustive only when there's a default.
    return false;
  }
  const expected = new Set(getLiteralValuesInUnion(discriminantType));
  const actual = new Set(getCaseLiteralValues(switchNode));
  for (const v of expected) {
    if (!actual.has(v)) return false;
  }
  return true;
}

/**
 * Returns the constituent values missing from the switch.
 */
export function getMissingCaseValues(
  switchNode: AstNode,
  discriminantType: Type,
): readonly (string | number | boolean)[] {
  const flags = (discriminantType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return [];
  const expected = getLiteralValuesInUnion(discriminantType);
  const actual = new Set(getCaseLiteralValues(switchNode));
  return expected.filter((v) => !actual.has(v));
}
