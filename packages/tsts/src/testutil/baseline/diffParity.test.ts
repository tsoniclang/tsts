import test from "node:test";
import assert from "node:assert/strict";

import { classifyBaselineDiff, normalizeBaselineText } from "./diffParity.js";

/**
 * CRLF/LF audit for the diff layer.
 *
 * `classifyBaselineDiff` is the single equal-check used for every text channel:
 * it compares `normalizeBaselineText(expected)` against
 * `normalizeBaselineText(actual)`. `normalizeBaselineText` rewrites all `\r\n`
 * to `\n` (and trims trailing whitespace) before comparison, so the
 * normalization is channel-agnostic — it depends only on the text, never on the
 * file extension. There is no per-channel branch that could skip it.
 *
 * These tests pin that property so a future change cannot reintroduce a
 * CRLF-sensitive comparison for some channels and not others, and they stay in
 * the diff/reporting layer only — no compiler output or baseline is rewritten.
 */

const emptyLists = { accepted: new Set<string>(), triaged: new Set<string>() };

/** The text channels whose baselines flow through `classifyBaselineDiff`. */
const textChannelPaths: readonly string[] = [
  "suite/case.errors.txt", // error
  "suite/case.js", // output
  "suite/case.sourcemap.txt", // sourcemap / sourcemap-record
  "suite/case.types", // types-and-symbols
  "suite/case.resolution.txt", // module-resolution
  "suite/case.union-ordering.txt", // union-ordering
  "suite/case.parent-pointers.txt", // parent-pointers
];

test("normalizeBaselineText collapses CRLF to LF before comparison", () => {
  assert.strictEqual(normalizeBaselineText("a\r\nb\r\n"), normalizeBaselineText("a\nb\n"));
  assert.strictEqual(normalizeBaselineText("a\r\nb\r\n"), "a\nb");
});

test("CRLF and LF classify as equal across every text channel", () => {
  for (const path of textChannelPaths) {
    assert.strictEqual(
      classifyBaselineDiff(path, "a\r\nb\r\n", "a\nb\n", emptyLists),
      "equal",
      `expected CRLF/LF parity on ${path}`,
    );
  }
});

test("a genuine content difference still classifies as changed after normalization", () => {
  // Normalization must not mask a real divergence: only newline style is folded.
  assert.strictEqual(classifyBaselineDiff("suite/case.js", "a\r\nb\r\n", "a\r\nc\r\n", emptyLists), "changed");
});
