/**
 * Try/catch/finally semantics for the checker.
 *
 * Ported from Strada `checker.go` — checkTryStatement, getCatchClauseType,
 * computeCatchVariableType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Returns the try-block of a TryStatement.
 */
export function getTryBlock(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.TryStatement) return undefined;
  return (node as unknown as { tryBlock?: AstNode }).tryBlock;
}

/**
 * Returns the catch-clause of a TryStatement.
 */
export function getCatchClause(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.TryStatement) return undefined;
  return (node as unknown as { catchClause?: AstNode }).catchClause;
}

/**
 * Returns the finally-block of a TryStatement.
 */
export function getFinallyBlock(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.TryStatement) return undefined;
  return (node as unknown as { finallyBlock?: AstNode }).finallyBlock;
}

/**
 * Returns the catch-variable declaration of a CatchClause.
 */
export function getCatchVariable(catchClause: AstNode): AstNode | undefined {
  if (catchClause.kind !== Kind.CatchClause) return undefined;
  return (catchClause as unknown as { variableDeclaration?: AstNode }).variableDeclaration;
}

/**
 * Returns the type annotation of the catch variable.
 */
export function getCatchVariableType(
  catchClause: AstNode,
  useUnknownInCatchVariables: boolean,
): Type {
  const variable = getCatchVariable(catchClause);
  if (variable === undefined) {
    return useUnknownInCatchVariables ? UNKNOWN : ANY;
  }
  const type = (variable as unknown as { type?: { resolvedType?: Type } }).type;
  if (type?.resolvedType !== undefined) return type.resolvedType;
  return useUnknownInCatchVariables ? UNKNOWN : ANY;
}

/**
 * Returns true when the try statement is "catch-less" — has only a
 * finally clause.
 */
export function isCatchlessTry(node: AstNode): boolean {
  return getCatchClause(node) === undefined;
}

/**
 * Returns true when the try statement has a finally clause.
 */
export function hasFinallyBlock(node: AstNode): boolean {
  return getFinallyBlock(node) !== undefined;
}

/**
 * Returns true when the catch variable type annotation is explicit
 * (vs. inferred as Any/Unknown).
 */
export function hasExplicitCatchAnnotation(catchClause: AstNode): boolean {
  const variable = getCatchVariable(catchClause);
  if (variable === undefined) return false;
  const type = (variable as unknown as { type?: AstNode }).type;
  return type !== undefined;
}
