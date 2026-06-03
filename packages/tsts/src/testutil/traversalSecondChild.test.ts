// Regression tests for the generated-visitor "second child" bug class.
//
// The generated visitor (ast/generated/visitor.ts) treats ANY non-`undefined`
// return from a forEachChild callback as "stop and propagate". A callback whose
// intent is "continue / collect every child" must therefore return `undefined`,
// NOT `false`. A callback that returns `false` stops after the FIRST child,
// silently dropping all siblings.
//
// These tests pin that behaviour for the two affected enumerators:
//   - newSyntheticRecursiveVisitor (parsetestutil/parseTestUtil.ts)
//   - forEachAstNode               (tsbaseline/typeSymbolBaseline.ts)
// Each proves that the SECOND child of a node is actually visited.

import test from "node:test";
import assert from "node:assert/strict";

import { Kind, sourceFileStatementsRO, type Node } from "../ast/index.js";
import { markSyntheticRecursive, parseTypeScript } from "./parsetestutil/index.js";
import { forEachAstNode } from "./tsbaseline/index.js";

// Two top-level statements => the SourceFile node has (at least) two children.
const TWO_STATEMENT_SOURCE = "const first = 1;\nconst second = 2;\n";

test("newSyntheticRecursiveVisitor marks the SECOND top-level statement (not just the first)", () => {
  const file = parseTypeScript(TWO_STATEMENT_SOURCE, false);
  const statements = sourceFileStatementsRO(file as unknown as Node);
  const second = statements[1];
  assert.ok(second !== undefined, "fixture must have at least two statements");

  // Sanity: before marking, the second statement has a real text range.
  assert.notEqual(second.pos, -1, "second statement should start with a real pos");

  markSyntheticRecursive(file as unknown as Node);

  // markSyntheticNode sets pos/end to -1. If the collect-callback short-circuited
  // after the first child, the second statement would never be visited and keep
  // its real position. Proving pos === -1 proves the 2nd child was visited.
  assert.equal(second.pos, -1, "second statement must be marked synthetic (pos === -1)");
  assert.equal(second.end, -1, "second statement must be marked synthetic (end === -1)");
});

test("forEachAstNode visits the SECOND top-level statement (not just the first)", () => {
  const file = parseTypeScript(TWO_STATEMENT_SOURCE, false);
  const statements = sourceFileStatementsRO(file as unknown as Node);
  const first = statements[0];
  const second = statements[1];
  assert.ok(first !== undefined && second !== undefined, "fixture must have at least two statements");

  const visited = forEachAstNode(file as unknown as Node);

  // Both the first and the second top-level statement must appear among the
  // visited nodes. If the underlying forEachChild collect-callback returned a
  // non-undefined value, enumeration would stop after the first child and the
  // second statement (and its subtree) would be absent.
  assert.ok(visited.includes(first), "first statement must be visited");
  assert.ok(visited.includes(second), "second statement must be visited");

  // And descendants of the second statement must be reached too (deep traversal,
  // not just direct siblings).
  const reachedSecondSubtree = visited.some(
    (node) => node.kind === Kind.Identifier && nodeContains(second, node),
  );
  assert.ok(reachedSecondSubtree, "a descendant of the second statement must be visited");
});

// Helper: is `descendant` within `ancestor`'s span? Uses pos/end containment,
// which is stable for parsed (non-synthetic) nodes.
function nodeContains(ancestor: Node, descendant: Node): boolean {
  return descendant.pos >= ancestor.pos && descendant.end <= ancestor.end;
}
