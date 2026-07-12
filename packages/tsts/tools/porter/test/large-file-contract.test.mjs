import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDraftLargeFileSplitPlan,
  buildLargeFileSplitStatusFromPlan,
  loadLargeFileSplitPlan,
  matchesSplitMatcher,
  normalizeLargeFileSplitPlan,
} from "../core/large-files.mjs";
import { collectVerifyFailures } from "../porter.mjs";
import {
  baseConfig,
  completeVerificationStatus,
  emptyCounts,
  fileRecord,
  largeFileSplitPlan,
  snapshotWith,
  unitRecord,
} from "./helpers.mjs";

test("large-file split plans must cover every declaration exactly once", () => {
  const sourceMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.checkSourceFile",
    kind: "method",
    name: "checkSourceFile",
    qualifiedName: "Checker.checkSourceFile",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const typeMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.getTypeOfNode",
    kind: "method",
    name: "getTypeOfNode",
    qualifiedName: "Checker.getTypeOfNode",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const orphanMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.resolveName",
    kind: "method",
    name: "resolveName",
    qualifiedName: "Checker.resolveName",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const plan = largeFileSplitPlan({
    "internal/checker/checker.go": {
      reason: "Exact semantic split fixture for checker declarations.",
      targets: [
        {
          path: "packages/tsts/src/internal/checker/checker/source-files.ts",
          description: "Source-file checking",
          declarations: ["method::Checker.checkSourceFile", "method::Checker.gone"],
        },
        {
          path: "packages/tsts/src/internal/checker/checker/types.ts",
          description: "Type queries",
          matchers: [{ kind: "method", receiver: "Checker", nameRegex: "^getType" }],
        },
        {
          path: "packages/tsts/src/internal/checker/checker/duplicate-types.ts",
          description: "Duplicate type queries",
          declarations: ["method::Checker.getTypeOfNode"],
        },
      ],
    },
  });
  const snapshot = {
    ...snapshotWith([fileRecord({
      path: "internal/checker/checker.go",
      lineCount: 6000,
      units: [sourceMethod, typeMethod, orphanMethod],
    })]),
    gitRevision: plan.sourceRevision,
  };
  const splitStatus = buildLargeFileSplitStatusFromPlan(baseConfig, snapshot, plan);

  assert.equal(splitStatus.requiredFileCount, 1);
  assert.equal(splitStatus.files[0].assigned, 2);
  assert.equal(splitStatus.files[0].unassigned, 1);
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "stale-declaration"));
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "duplicate-assignment"));
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "unassigned-declaration"));
  assert.deepEqual(
    collectVerifyFailures(completeVerificationStatus({
      counts: { ...emptyCounts(), largeFileSplitFailures: splitStatus.failureCount },
      largeFileSplits: splitStatus,
    })),
    [`${splitStatus.failureCount} large-file split plan failures`],
  );
});

test("large-file split plans reject random line/chunk target names", () => {
  const unit = unitRecord({
    id: "m::internal/parser/parser.go::func::ParseSourceFile",
    kind: "func",
    name: "ParseSourceFile",
    qualifiedName: "ParseSourceFile",
    goPath: "internal/parser/parser.go",
  });
  const plan = largeFileSplitPlan({
    "internal/parser/parser.go": {
      reason: "Exact semantic split fixture for parser declarations.",
      targets: [
        {
          path: "packages/tsts/src/internal/parser/parser/part-001.ts",
          description: "Invalid line-range style split",
          declarations: ["func::ParseSourceFile"],
        },
      ],
    },
  });
  const snapshot = {
    ...snapshotWith([fileRecord({ path: "internal/parser/parser.go", lineCount: 6000, units: [unit] })]),
    gitRevision: plan.sourceRevision,
  };
  const splitStatus = buildLargeFileSplitStatusFromPlan(baseConfig, snapshot, plan);

  assert.ok(splitStatus.issues.some((issue) => issue.kind === "random-split-target"));
});

test("large-file split plan nested objects and matchers have exact schemas", () => {
  const validPlan = () => largeFileSplitPlan({
    "internal/checker/relater.go": {
      reason: "Exact relation-engine home for this test fixture.",
      targets: [{
        path: "packages/tsts/src/internal/checker/relater.ts",
        description: "Structural relation engine declarations.",
        matchers: [{ idRegex: "internal/checker/relater\\.go" }],
      }],
    },
  });
  assert.equal(normalizeLargeFileSplitPlan(validPlan(), baseConfig).schemaVersion, 1);

  const cases = [
    ["root extra key", (plan) => plan.extra = true, /keys must be exactly/],
    ["invalid generated timestamp", (plan) => plan.generatedAt = "2026-01-01", /exact ISO timestamp/],
    ["invalid source revision", (plan) => plan.sourceRevision = "abc123", /40-character Git object id/],
    ["invalid threshold", (plan) => plan.threshold = "5000", /positive integer/],
    ["file-plan extra key", (plan) => plan.files["internal/checker/relater.go"].extra = true, /keys must be exactly/],
    ["retired target root", (plan) => plan.files["internal/checker/relater.go"].targetRoot = "packages/tsts/src/internal/checker", /keys must be exactly/],
    ["missing file-plan reason", (plan) => delete plan.files["internal/checker/relater.go"].reason, /keys must be exactly/],
    ["empty targets", (plan) => plan.files["internal/checker/relater.go"].targets = [], /must not be empty/],
    ["target extra key", (plan) => plan.files["internal/checker/relater.go"].targets[0].extra = true, /keys must be exactly/],
    ["retired relative file target", (plan) => plan.files["internal/checker/relater.go"].targets[0].file = "relater.ts", /keys must be exactly/],
    ["non-rooted target path", (plan) => plan.files["internal/checker/relater.go"].targets[0].path = "relater.ts", /normalized repo-relative \.ts path/],
    ["duplicate target path", (plan) => plan.files["internal/checker/relater.go"].targets.push({ ...plan.files["internal/checker/relater.go"].targets[0] }), /duplicates path/],
    ["missing target selectors", (plan) => delete plan.files["internal/checker/relater.go"].targets[0].matchers, /must contain declarations or matchers/],
    ["empty matcher", (plan) => plan.files["internal/checker/relater.go"].targets[0].matchers = [{}], /at least one supported declaration selector/],
    ["unknown matcher", (plan) => plan.files["internal/checker/relater.go"].targets[0].matchers = [{ futureSelector: ".*" }], /unknown selector key/],
    ["mixed known and unknown matcher", (plan) => plan.files["internal/checker/relater.go"].targets[0].matchers = [{ kind: "method", futureSelector: ".*" }], /unknown selector key/],
    ["invalid matcher regex", (plan) => plan.files["internal/checker/relater.go"].targets[0].matchers = [{ idRegex: "[" }], /valid regular expression/],
  ];
  for (const [description, mutate, pattern] of cases) {
    const plan = validPlan();
    mutate(plan);
    assert.throws(() => normalizeLargeFileSplitPlan(plan, baseConfig), pattern, description);
  }
});

test("large-file split draft emits full repo-relative target paths", () => {
  const snapshot = {
    ...snapshotWith([fileRecord({
      path: "internal/checker/checker.go",
      lineCount: 6000,
      units: [unitRecord({
        id: "m::internal/checker/checker.go::type::Checker",
        kind: "type",
        name: "Checker",
        qualifiedName: "Checker",
        goPath: "internal/checker/checker.go",
      })],
    })]),
    gitRevision: "a".repeat(40),
  };
  const draft = buildDraftLargeFileSplitPlan(baseConfig, snapshot);
  const filePlan = draft.files["internal/checker/checker.go"];

  assert.deepEqual(Object.keys(filePlan).sort(), ["reason", "targets"]);
  assert.deepEqual(filePlan.targets, [{
    path: "packages/tsts/src/internal/checker/checker/state.ts",
    description: "Checker state, enums, cache keys, constructors, package constants, and top-level helpers.",
    declarations: ["type::Checker"],
  }]);
});

test("large-file split loader has no inline or missing-plan fallback", () => {
  const missingPath = `.temp/porter-missing-large-split-${process.pid}-${Date.now()}.json`;
  const inlinePlan = largeFileSplitPlan();

  assert.throws(
    () => loadLargeFileSplitPlan({ ...baseConfig, largeFileSplitPlanPath: missingPath, largeFileSplitPlan: inlinePlan }),
    /required large-file split plan is missing/,
  );
  assert.throws(
    () => loadLargeFileSplitPlan({ ...baseConfig, largeFileSplitPlanPath: undefined }),
    /largeFileSplitPlanPath must be one canonical repository-relative JSON path/,
  );
});

test("large-file split plan metadata must match the checked snapshot", () => {
  const snapshot = { ...snapshotWith([]), gitRevision: "a".repeat(40) };
  const plan = largeFileSplitPlan();

  assert.equal(buildLargeFileSplitStatusFromPlan(baseConfig, snapshot, plan).failureCount, 0);
  assert.throws(
    () => buildLargeFileSplitStatusFromPlan(baseConfig, snapshot, { ...plan, threshold: 4999 }),
    /does not match configured threshold/,
  );
  assert.throws(
    () => buildLargeFileSplitStatusFromPlan(baseConfig, snapshot, { ...plan, sourceRevision: "b".repeat(40) }),
    /does not match snapshot revision/,
  );
});

test("unknown and empty large-file split matchers never match declarations", () => {
  const unit = {
    id: "m::internal/checker/relater.go::method::Checker.getType",
    kind: "method",
    name: "getType",
    qualifiedName: "Checker.getType",
    receiver: "Checker",
  };
  for (const matcher of [
    null,
    [],
    {},
    { futureSelector: ".*" },
    { kind: "method", futureSelector: ".*" },
    { kind: "" },
    { idRegex: "[" },
  ]) assert.equal(matchesSplitMatcher(unit, matcher), false, JSON.stringify(matcher));
  assert.equal(matchesSplitMatcher(unit, { idRegex: "internal/checker/relater\\.go" }), true);
  assert.equal(matchesSplitMatcher(unit, { kind: "method", receiver: "Checker", nameRegex: "^get" }), true);
});
