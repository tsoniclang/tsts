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
  assert.equal(report.activeUnits.semanticDeclarationChangedCount, 0);
  assert.match(renderDeltaMarkdown(report), /Active porter units/);
});

test("porter delta treats canonical declaration and constant drift as signature drift", () => {
  const id = "m::internal/a/constants.go::constGroup::WordBits";
  const before = unit(id, "constGroup", "WordBits", "same-syntax", "same-body", semanticConstant("32"));
  const after = unit(id, "constGroup", "WordBits", "same-syntax", "same-body", semanticConstant("64"));
  const report = buildPorterDelta(
    snapshot("a".repeat(40), [file("internal/a/constants.go", "before", [before])]),
    snapshot("b".repeat(40), [file("internal/a/constants.go", "after", [after])]),
    {
      primaryUnitKinds: ["constGroup"],
      policyForUnit: () => ({ category: "literal-port", active: true }),
      isActivePortPolicy: () => true,
    },
  );
  assert.equal(report.schemaVersion, 2);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.sourceSignatureChangedCount, 0);
  assert.equal(report.activeUnits.semanticDeclarationChangedCount, 1);
  assert.equal(report.activeUnits.signatureChangedCount, 1);
  assert.equal(report.activeUnits.constantsChangedCount, 1);
  assert.match(renderDeltaMarkdown(report), /1 canonical declarations/);
});

test("compact profile indexes compare by canonical profile identity across snapshots", () => {
  const id = "m::internal/a/value.go::func::Value";
  const from = snapshot("a".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same", "same")])]);
  const to = snapshot("b".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same", "same")])]);
  to.semantic.profiles.unshift(profile("darwin", "arm64", "GOARM64=v8.0"));
  to.files[0].units[0].semantic[0].profiles = [1];
  const report = buildPorterDelta(from, to, {
    primaryUnitKinds: ["func"],
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: () => true,
  });
  assert.equal(report.activeUnits.changedCount, 0);
});

test("canonical snapshots are deterministic and include source hashes", () => {
  const value = snapshot("c".repeat(40), [file("internal/a/a.go", "source-digest", [])]);
  assert.equal(canonicalSnapshot(value), canonicalSnapshot(structuredClone(value)));
  assert.match(canonicalSnapshot(value), /source-digest/);
});

test("portable snapshots normalize incidental toolchain and cache locations", () => {
  const left = snapshot("c".repeat(40), []);
  const right = structuredClone(left);
  for (const [value, root, home] of [[left, "/usr/local/go", "/home/one"], [right, "/opt/go", "/home/two"]]) {
    value.semantic.goroot = root;
    value.semantic.toolchainExecutable = `${root}/bin/go`;
    value.semantic.profiles[0].environment = [
      `GOCACHE=${home}/.cache/go-build`, `GOMODCACHE=${home}/go/pkg/mod`, `GOPATH=${home}/go`, `GOROOT=${root}`, `PATH=${root}/bin`,
    ];
  }
  assert.equal(canonicalSnapshot(left), canonicalSnapshot(right));
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
    schemaVersion: 7,
    sourceRoot: "/source",
    modulePath: "m",
    gitRevision,
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    semantic: { externalDeclarations: [], profiles: [profile("linux", "amd64", "GOAMD64=v1")] },
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

function unit(id, kind, qualifiedName, sigHash, bodyHash, semantic = semanticFunction(sigHash)) {
  return { id, kind, qualifiedName, sigHash, bodyHash, semantic, valueSpecs: [] };
}

function semanticFunction(token) {
  return [{ kind: "func", profiles: [0], signature: { token } }];
}

function semanticConstant(exact) {
  return [{
    kind: "constGroup",
    profiles: [0],
    valueSpecs: [{
      specIndex: 0,
      names: [{ name: "WordBits", nameIndex: 0, constant: { kind: "Int", exact } }],
    }],
  }];
}

function profile(goos, goarch, architecture) {
  return { goos, goarch, cgoEnabled: false, architecture, experiments: "", goexperiment: "", buildTags: [] };
}
