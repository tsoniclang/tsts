import assert from "node:assert/strict";
import test from "node:test";

import { buildDeltaCompletion, buildPorterDelta, canonicalSnapshot, renderDeltaMarkdown, verifyDeltaCompletion } from "./delta.mjs";

test("porter delta reports file, raw-unit, active-unit, and move changes", () => {
  const from = snapshot("a".repeat(40), [
    file("internal/a/old.go", "old-hash", [unit("m::internal/a/old.go::func::Moved", "func", "Moved", "sig", "body")]),
    file("internal/a/changed.go", "before", [unit("m::internal/a/changed.go::func::Changed", "func", "Changed", "sig", "body-1")]),
    file("internal/ignored/ignored.go", "ignored-1", [unit("m::internal/ignored/ignored.go::func::Ignored", "func", "Ignored", "sig", "body-1")]),
  ]);
  const to = snapshot("b".repeat(40), [
    file("internal/a/new.go", "new-hash", [unit("m::internal/a/new.go::func::Moved", "func", "Moved", "sig", "body")]),
    file("internal/a/changed.go", "after", [unit("m::internal/a/changed.go::func::Changed", "func", "Changed", "sig", "body-2")]),
    file("internal/ignored/ignored.go", "ignored-2", [unit("m::internal/ignored/ignored.go::func::Ignored", "func", "Ignored", "sig", "body-2")]),
  ]);
  const report = buildPorterDelta(from, to, {
    primaryUnitKinds: ["func"],
    policyForUnit: (candidate) => ({ category: candidate.id.includes("ignored") ? "out-of-scope" : "literal-port", active: !candidate.id.includes("ignored") }),
    isActivePortPolicy: (policy) => policy.active !== false && policy.category === "literal-port",
  });

  assert.equal(report.goFiles.changedCount, 2);
  assert.equal(report.rawUnits.changedCount, 2);
  assert.equal(report.rawUnits.moveCandidateCount, 1);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.moveCandidateCount, 1);
  assert.equal(report.activeUnits.bodyChangedCount, 1);
  assert.match(renderDeltaMarkdown(report), /Active porter units/);
});

test("canonical snapshots are deterministic and include source hashes", () => {
  const value = snapshot("c".repeat(40), [file("internal/a/a.go", "source-digest", [])]);
  assert.equal(canonicalSnapshot(value), canonicalSnapshot(structuredClone(value)));
  assert.match(canonicalSnapshot(value), /source-digest/);
});

test("delta completion binds every evidence artifact and rejects tampering", () => {
  const report = { from: { gitRevision: "a".repeat(40) }, to: { gitRevision: "b".repeat(40) } };
  const artifacts = new Map([
    ["delta.json", "{}\n"],
    ["from-snapshot.json", "{}\n"],
    ["summary.md", "summary\n"],
    ["to-snapshot.json", "{}\n"],
  ]);
  const completion = buildDeltaCompletion(artifacts, report);
  assert.deepEqual(verifyDeltaCompletion(artifacts, completion), []);
  const tampered = new Map(artifacts);
  tampered.set("summary.md", "changed\n");
  assert.ok(verifyDeltaCompletion(tampered, completion).some((issue) => issue.includes("summary.md SHA-256")));
  assert.ok(verifyDeltaCompletion(new Map([...artifacts].filter(([name]) => name !== "delta.json")), completion).some((issue) => issue.includes("missing evidence artifact delta.json")));
});

function snapshot(gitRevision, files) {
  return {
    schemaVersion: 2,
    sourceRoot: "/source",
    modulePath: "m",
    gitRevision,
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    summary: { goFileCount: files.length, unitCount: files.reduce((count, candidate) => count + candidate.units.length, 0) },
    files,
  };
}

function file(sourcePath, sourceHash, units) {
  return {
    path: sourcePath,
    sourceHash,
    importPath: `m/${sourcePath.slice(0, sourcePath.lastIndexOf("/"))}`,
    generated: false,
    buildTags: [],
    implicitBuildTags: [],
    units,
  };
}

function unit(id, kind, qualifiedName, sigHash, bodyHash) {
  return { id, kind, qualifiedName, sigHash, bodyHash, valueSpecs: [] };
}
