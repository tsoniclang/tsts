/**
 * Generic AST visitor pattern over Tsonic AST.
 *
 * Ported from Strada `visit.go` (within `ast`) — provides a minimal
 * walk that calls a callback for every node, with control-flow over
 * descent (stop/skip/continue).
 *
 * Used by the checker's helper passes (find-references, count-
 * occurrences, etc.). The heavy lifting visitor for transformation
 * lives in `transformers/visitor.ts`.
 */

import type { Node as AstNode } from "../../ast/index.js";

export const VisitResult = {
  Continue: 0,
  Skip: 1,
  Stop: 2,
} as const;

export type VisitResult =
  | typeof VisitResult.Continue
  | typeof VisitResult.Skip
  | typeof VisitResult.Stop;

/**
 * Walks the AST starting at `node`, invoking `visit` for each node
 * encountered. Returns true if the walk completed without a Stop.
 */
export function walkAst(
  node: AstNode,
  visit: (n: AstNode) => VisitResult,
): boolean {
  const recurse = (n: AstNode): boolean => {
    const result = visit(n);
    if (result === VisitResult.Stop) return false;
    if (result === VisitResult.Skip) return true;
    const children = (n as unknown as { children?: () => readonly AstNode[] }).children;
    if (typeof children !== "function") return true;
    for (const c of children.call(n)) {
      if (!recurse(c)) return false;
    }
    return true;
  };
  return recurse(node);
}

/**
 * Returns the first node matching `predicate` in pre-order traversal.
 */
export function findFirst(
  node: AstNode,
  predicate: (n: AstNode) => boolean,
): AstNode | undefined {
  const ref: { found: AstNode | undefined } = { found: undefined };
  walkAst(node, (n) => {
    if (predicate(n)) {
      ref.found = n;
      return VisitResult.Stop;
    }
    return VisitResult.Continue;
  });
  return ref.found;
}

/**
 * Collects every node matching `predicate` in pre-order traversal.
 */
export function collectAll(
  node: AstNode,
  predicate: (n: AstNode) => boolean,
): readonly AstNode[] {
  const out: AstNode[] = [];
  walkAst(node, (n) => {
    if (predicate(n)) out.push(n);
    return VisitResult.Continue;
  });
  return out;
}

/**
 * Counts the number of nodes matching `predicate` in pre-order
 * traversal.
 */
export function countAll(
  node: AstNode,
  predicate: (n: AstNode) => boolean,
): number {
  return collectAll(node, predicate).length;
}

/**
 * Walks the AST collecting nodes whose Kind matches `kind`.
 */
export function findAllOfKind(node: AstNode, kind: number): readonly AstNode[] {
  return collectAll(node, (n) => n.kind === kind);
}
