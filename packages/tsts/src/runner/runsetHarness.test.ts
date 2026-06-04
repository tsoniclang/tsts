import test from "node:test";
import assert from "node:assert/strict";

import {
  acceptedCaseKeys,
  caseKey,
  formatBlocked,
  formatRunsetLine,
  formatSkippedReasons,
  isSubmoduleRunset,
  parseDiffListEntries,
  resolveRunset,
  selectionCounts,
  type DiscoveredCase,
} from "./runsetHarness.js";

test("resolveRunset defaults to native and validates", () => {
  assert.strictEqual(resolveRunset(undefined), "native");
  assert.strictEqual(resolveRunset(""), "native");
  assert.strictEqual(resolveRunset("native"), "native");
  assert.strictEqual(resolveRunset("accepted-submodule"), "accepted-submodule");
  assert.strictEqual(resolveRunset("full-submodule"), "full-submodule");
  assert.throws(() => resolveRunset("bogus"), /invalid TSGO_RUNSET=bogus/);
});

test("isSubmoduleRunset distinguishes native from submodule run-sets", () => {
  assert.strictEqual(isSubmoduleRunset("native"), false);
  assert.strictEqual(isSubmoduleRunset("accepted-submodule"), true);
  assert.strictEqual(isSubmoduleRunset("full-submodule"), true);
});

test("parseDiffListEntries drops comments, headers, and blanks", () => {
  const text = [
    "# Diff files to instead write to submoduleAccepted as \"accepted\" changes.",
    "",
    "## jsdoc ##",
    "conformance/assertionsAndNonReturningFunctions.types.diff",
    "  compiler/foo.errors.diff  ",
  ].join("\n");
  assert.deepStrictEqual(parseDiffListEntries(text), [
    "conformance/assertionsAndNonReturningFunctions.types.diff",
    "compiler/foo.errors.diff",
  ]);
});

test("acceptedCaseKeys strips the channel segment, preserving dotted case names", () => {
  const keys = acceptedCaseKeys([
    "conformance/assertionsAndNonReturningFunctions.types.diff",
    "conformance/assertionsAndNonReturningFunctions.errors.diff",
    "compiler/a.b.types.diff",
    "compiler/noChannel.diff",
  ]);
  assert.ok(keys.has("conformance/assertionsAndNonReturningFunctions"));
  assert.ok(keys.has("compiler/a.b"));
  assert.ok(keys.has("compiler/noChannel"));
  // The two channels of one case collapse to a single case key.
  assert.strictEqual(keys.size, 3);
});

test("caseKey strips .ts/.tsx and prefixes the suite", () => {
  assert.strictEqual(caseKey("conformance", "/corpus/tests/cases/conformance/sub/foo.ts"), "conformance/foo");
  assert.strictEqual(caseKey("compiler", "/corpus/tests/cases/compiler/bar.tsx"), "compiler/bar");
  assert.strictEqual(caseKey("compiler", "/corpus/tests/cases/compiler/a.b.ts"), "compiler/a.b");
});

const cases: readonly DiscoveredCase[] = [
  { suite: "conformance", fileName: "/c/conformance/keep.ts" },
  { suite: "conformance", fileName: "/c/conformance/skipMe.ts" },
  { suite: "compiler", fileName: "/c/compiler/other.ts" },
];

test("selectionCounts: native skips only the skip-list", () => {
  const counts = selectionCounts({
    runset: "native",
    cases,
    isSkipped: (fileName) => fileName.endsWith("skipMe.ts"),
  });
  assert.strictEqual(counts.discovered, 3);
  assert.strictEqual(counts.selected, 2);
  assert.strictEqual(counts.skipped, 1);
  assert.strictEqual(formatSkippedReasons(counts.skippedReasons), "skipped-list:1");
});

test("selectionCounts: accepted-submodule also skips cases not in the accepted set", () => {
  const counts = selectionCounts({
    runset: "accepted-submodule",
    cases,
    isSkipped: (fileName) => fileName.endsWith("skipMe.ts"),
    acceptedKeys: new Set(["conformance/keep"]),
  });
  assert.strictEqual(counts.discovered, 3);
  assert.strictEqual(counts.selected, 1); // keep.ts
  assert.strictEqual(counts.skipped, 2); // skipMe (skip-list) + other (not accepted)
  assert.strictEqual(formatSkippedReasons(counts.skippedReasons), "not-in-accepted-list:1,skipped-list:1");
});

test("formatRunsetLine and formatBlocked render the expected summary shapes", () => {
  const counts = selectionCounts({ runset: "native", cases, isSkipped: () => false });
  assert.strictEqual(
    formatRunsetLine("native", counts),
    "runset=native discovered=3 selected=3 skipped=0 skipped_reasons=none",
  );
  assert.strictEqual(
    formatBlocked({ runset: "accepted-submodule", reason: "missing TypeScript submodule", expectedPath: "/x/cases", acceptedEntries: 1412 }),
    "runset=accepted-submodule status=blocked reason=missing TypeScript submodule expected_path=/x/cases accepted_entries=1412 runnable=0",
  );
});
