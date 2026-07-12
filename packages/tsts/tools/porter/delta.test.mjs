import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { buildDeltaCompletion, buildDeltaCompletionFromRecords, buildPorterDelta, canonicalSnapshot, portableSnapshot, renderDeltaMarkdown, snapshotDigest, verifyDeltaCompletion, verifyDeltaCompletionFromRecords } from "./delta.mjs";
import { verifyDeltaEvidence } from "./core/delta-command.mjs";
import { buildDeltaSupplementalEvidence } from "./core/delta-report-evidence.mjs";
import { buildGitCommitTreeEvidence, gitObjectHash, gitTreeHash, requireGitCommitTreeEvidence } from "./core/git-commit-tree-evidence.mjs";

test("porter delta reports file, raw-unit, active-unit, and move changes", () => {
  const from = snapshot("a".repeat(40), [
    file("internal/a/old.go", "old-hash", [unit("m::internal/a/old.go::func::Moved", "func", "Moved", "sig")]),
    file("internal/a/changed.go", "before", [unit("m::internal/a/changed.go::func::Changed", "func", "Changed", "sig-1")]),
    file("internal/ignored/ignored.go", "ignored-1", [unit("m::internal/ignored/ignored.go::func::Ignored", "func", "Ignored", "sig-1")]),
  ]);
  const to = snapshot("b".repeat(40), [
    file("internal/a/new.go", "new-hash", [unit("m::internal/a/new.go::func::Moved", "func", "Moved", "sig")]),
    file("internal/a/changed.go", "after", [unit("m::internal/a/changed.go::func::Changed", "func", "Changed", "sig-2")]),
    file("internal/ignored/ignored.go", "ignored-2", [unit("m::internal/ignored/ignored.go::func::Ignored", "func", "Ignored", "sig-2")]),
  ]);
  excludeSemanticFile(from, "internal/ignored/ignored.go");
  excludeSemanticFile(to, "internal/ignored/ignored.go");
  const report = buildPorterDelta(from, to, deltaOptions(from, to, {
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: (policy) => policy.active !== false && policy.category === "literal-port",
  }));

  assert.equal(report.goFiles.changedCount, 2);
  assert.equal(report.rawUnits.changedCount, 2);
  assert.equal(report.rawUnits.moveCandidateCount, 1);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.moveCandidateCount, 1);
  assert.equal(report.activeUnits.semanticDeclarationChangedCount, 1);
  assert.match(renderDeltaMarkdown(reviewReport(report)), /Active porter units/);
  assert.throws(
    () => buildPorterDelta(from, to, { policyForUnit: () => ({ category: "literal-port", active: true }), isActivePortPolicy: () => true }),
    /option keys must be exactly/,
  );
});

test("porter delta keeps body-only source edits outside unit change evidence", () => {
  const id = "m::internal/a/read.go::func::Read";
  const before = snapshot("a".repeat(40), [file("internal/a/read.go", "body-source-1", [unit(id, "func", "Read", "same-signature")])]);
  const after = snapshot("b".repeat(40), [file("internal/a/read.go", "body-source-2", [unit(id, "func", "Read", "same-signature")])]);
  const report = buildPorterDelta(before, after, deltaOptions(before, after, {
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: () => true,
  }));
  assert.equal(report.goFiles.changedCount, 1);
  assert.equal(report.rawUnits.changedCount, 0);
  assert.equal(report.activeUnits.changedCount, 0);
});

test("porter delta treats canonical declaration and constant drift as signature drift", () => {
  const id = "m::internal/a/constants.go::constGroup::WordBits";
  const before = unit(id, "constGroup", "WordBits", "same-syntax", semanticConstant("32"));
  const after = unit(id, "constGroup", "WordBits", "same-syntax", semanticConstant("64"));
  const from = snapshot("a".repeat(40), [file("internal/a/constants.go", "before", [before])]);
  const to = snapshot("b".repeat(40), [file("internal/a/constants.go", "after", [after])]);
  const report = buildPorterDelta(
    from,
    to,
    deltaOptions(from, to, {
      policyForUnit: () => ({ category: "literal-port", active: true }),
      isActivePortPolicy: () => true,
    }),
  );
  assert.equal(report.schemaVersion, 7);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.sourceSignatureChangedCount, 0);
  assert.equal(report.activeUnits.semanticDeclarationChangedCount, 1);
  assert.equal(report.activeUnits.signatureChangedCount, 1);
  assert.equal(report.activeUnits.constantsChangedCount, 1);
  assert.match(renderDeltaMarkdown(reviewReport(report)), /1 canonical declarations/);
});

test("compact profile indexes compare by canonical profile identity across snapshots", () => {
  const id = "m::internal/a/value.go::func::Value";
  const from = snapshot("a".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same")])]);
  const to = snapshot("b".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same")])]);
  to.semantic.profiles.unshift(profile("darwin", "arm64", "GOARM64=v8.0"));
  to.files[0].units[0].semantic[0].profiles = [1];
  const report = buildPorterDelta(from, to, deltaOptions(from, to, {
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: () => true,
  }));
  assert.equal(report.activeUnits.changedCount, 0);
});

test("canonical snapshots are deterministic and include source hashes", () => {
  const value = snapshot("c".repeat(40), [file("internal/a/a.go", "source-digest", [])]);
  assert.equal(canonicalSnapshot(value), canonicalSnapshot(structuredClone(value)));
  assert.match(canonicalSnapshot(value), /source-digest/);
});

test("delta Markdown enumerates every changed module without truncation", () => {
  const value = snapshot("c".repeat(40), []);
  const report = buildPorterDelta(value, value, deltaOptions(value, value, {
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: () => true,
  }));
  report.activeUnits.addedByModule = Array.from({ length: 31 }, (_, index) => [`module-${String(index).padStart(2, "0")}`, 1]);
  assert.match(renderDeltaMarkdown(reviewReport(report)), /module-30: 1/);
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
    ["from-tree.json", "[]\n"],
    ["porter-tree.json", "[]\n"],
    ["summary.md", "summary\n"],
    ["to-snapshot.json", "{}\n"],
    ["to-tree.json", "[]\n"],
  ]);
  const completion = buildDeltaCompletion(artifacts, report);
  const records = Object.fromEntries([...artifacts].map(([name, contents]) => [name, {
    bytes: Buffer.byteLength(contents),
    sha256: createHash("sha256").update(contents).digest("hex"),
  }]));
  assert.deepEqual(buildDeltaCompletionFromRecords(records, report), completion);
  assert.deepEqual(verifyDeltaCompletionFromRecords(records, completion), []);
  assert.deepEqual(verifyDeltaCompletion(artifacts, completion), []);
  const tampered = new Map(artifacts);
  tampered.set("summary.md", "changed\n");
  assert.ok(verifyDeltaCompletion(tampered, completion).some((issue) => issue.includes("summary.md SHA-256")));
  assert.ok(verifyDeltaCompletion(new Map([...artifacts].filter(([name]) => name !== "delta.json")), completion).some((issue) => issue.includes("missing evidence artifact delta.json")));
});

test("delta evidence rejects regenerated report tampering against exact checkout-derived evidence", () => {
  const activeId = "m::internal/a/value.go::func::Value";
  const inactiveId = "m::internal/inactive/helper.go::func::Helper";
  const from = snapshot("0".repeat(40), [
    file("internal/a/value.go", "active-before", [unit(activeId, "func", "Value", "active-signature-before")]),
    file("internal/inactive/helper.go", "inactive-before", [unit(inactiveId, "func", "Helper", "inactive-signature-before")]),
  ]);
  const to = snapshot("0".repeat(40), [
    file("internal/a/value.go", "active-after", [unit(activeId, "func", "Value", "active-signature-after")]),
    file("internal/inactive/helper.go", "inactive-after", [unit(inactiveId, "func", "Helper", "inactive-signature-after")]),
  ]);
  const fromGitEvidence = gitEvidence(from, "from");
  const toGitEvidence = gitEvidence(to, "to");
  const porterGitEvidence = gitEvidence(snapshot("0".repeat(40), []), "porter");
  const report = {
    ...buildPorterDelta(from, to, deltaOptions(from, to, {
      policyForUnit: (_snapshot, _unit, candidate) => ({ category: candidate.path.includes("/inactive/") ? "test" : "literal-port", active: !candidate.path.includes("/inactive/") }),
      isActivePortPolicy: (policy) => policy.active,
    })),
    provenance: { from: provenance(from), to: provenance(to) },
    effectivePolicies: { contract: { digest: "policy" }, from: { units: [] }, to: { units: [] } },
    generatedSourcePolicies: generatedSourceReviewEvidence(),
    porterImplementation: { revision: porterGitEvidence.revision },
  };
  assert.equal(report.rawUnits.changedCount, 2);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.signatureChangedCount, 1);
  assert.equal(report.provenance.from.deterministic, true);
  assert.equal(report.generatedSourcePolicies.mechanisms.length > 0, true);

  const artifacts = deltaArtifacts(from, to, fromGitEvidence, porterGitEvidence, toGitEvidence, report);
  const completion = buildDeltaCompletion(artifacts, report);
  const verificationInput = {
    artifacts,
    completion,
    expectedArtifacts: artifacts,
    expectedReport: report,
  };
  assert.deepEqual(verifyDeltaEvidence(verificationInput), []);

  const mutations = [
    ["raw unit count", (value) => { value.rawUnits.changedCount = 0; }],
    ["active unit count", (value) => { value.activeUnits.changedCount = 0; }],
    ["signature change count", (value) => { value.activeUnits.signatureChangedCount = 0; }],
    ["signature change evidence", (value) => { value.activeUnits.changed[0].signatureChanged = false; }],
    ["generated-source classification", (value) => { value.generatedSourcePolicies.delta.matches = false; }],
    ["legacy delta shape", (value) => { value.unitChanges = structuredClone(value.activeUnits); }],
  ];
  for (const [label, mutate] of mutations) {
    const tampered = structuredClone(report);
    mutate(tampered);
    const tamperedArtifacts = deltaArtifacts(from, to, fromGitEvidence, porterGitEvidence, toGitEvidence, tampered);
    const tamperedCompletion = buildDeltaCompletion(tamperedArtifacts, tampered);
    assert.deepEqual(verifyDeltaCompletion(tamperedArtifacts, tamperedCompletion), [], `${label} has a regenerated valid envelope`);
    assert.equal(tamperedArtifacts.get("summary.md"), renderDeltaMarkdown(tampered), `${label} has regenerated Markdown`);
    const tamperedIssues = verifyDeltaEvidence({
      ...verificationInput,
      artifacts: tamperedArtifacts,
      completion: tamperedCompletion,
    });
    assert.ok(tamperedIssues.some((issue) => issue.includes("recomputed from the clean source checkouts")), label);
  }

  const forgedSnapshot = structuredClone(from);
  forgedSnapshot.files[0].units[0].sigHash = "forged-signature";
  const forgedReport = {
    ...report,
    ...buildPorterDelta(forgedSnapshot, to, deltaOptions(forgedSnapshot, to, {
      policyForUnit: () => ({ category: "literal-port", active: true }),
      isActivePortPolicy: () => true,
    })),
    provenance: { from: provenance(forgedSnapshot), to: provenance(to) },
  };
  const forgedArtifacts = deltaArtifacts(forgedSnapshot, to, fromGitEvidence, porterGitEvidence, toGitEvidence, forgedReport);
  const forgedCompletion = buildDeltaCompletion(forgedArtifacts, forgedReport);
  const forgedIssues = verifyDeltaEvidence({
    ...verificationInput,
    artifacts: forgedArtifacts,
    completion: forgedCompletion,
  });
  assert.ok(forgedIssues.some((issue) => issue.startsWith("from-snapshot.json")));
  assert.ok(forgedIssues.some((issue) => issue.startsWith("delta.json")));
});

test("Git evidence binds every tracked path to the claimed commit object", () => {
  const value = snapshot("0".repeat(40), [file("internal/a/a.go", "source", [])]);
  const evidence = gitEvidence(value, "tree-proof");
  assert.deepEqual(requireGitCommitTreeEvidence(evidence, "fixture"), evidence);

  const changedEntry = structuredClone(evidence);
  changedEntry.entries[0].hash = "f".repeat(40);
  assert.throws(() => requireGitCommitTreeEvidence(changedEntry, "fixture"), /root tree/);

  const changedCommit = structuredClone(evidence);
  changedCommit.revision = "f".repeat(40);
  assert.throws(() => requireGitCommitTreeEvidence(changedCommit, "fixture"), /commit object body/);

  const nonGoBlob = gitObjectHash("blob", Buffer.from("documentation\n", "utf8"));
  const completeEntries = [...evidence.entries, { mode: "100644", type: "blob", hash: nonGoBlob, path: "README.md" }]
    .sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  const completeTree = gitTreeHash(completeEntries);
  const completeBody = Buffer.from(`tree ${completeTree}\nauthor Porter Test <porter@example.test> 0 +0000\ncommitter Porter Test <porter@example.test> 0 +0000\n\ncomplete tree\n`);
  const completeRevision = gitObjectHash("commit", completeBody);
  const completeEvidence = buildGitCommitTreeEvidence({ commitBody: completeBody, entries: completeEntries, objectFormat: "sha1", revision: completeRevision });
  const omittedNonGo = structuredClone(completeEvidence);
  omittedNonGo.entries = omittedNonGo.entries.filter((entry) => entry.path !== "README.md");
  assert.throws(() => requireGitCommitTreeEvidence(omittedNonGo, "fixture"), /root tree/);
});

test("policy, complete extractor-environment, and global semantic drift are visible", () => {
  const id = "m::internal/a/value.go::func::Value";
  const from = snapshot("0".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same")])]);
  const to = structuredClone(from);
  const policyChanged = buildPorterDelta(from, to, deltaOptions(from, to, {
    policyForUnit: (candidate) => ({ category: candidate === from ? "literal-port" : "host-native", active: true }),
    isActivePortPolicy: () => true,
  }));
  assert.equal(policyChanged.activeUnits.changedCount, 1);
  assert.equal(policyChanged.activeUnits.policyChangedCount, 1);
  assert.equal(policyChanged.activeUnits.changed[0].policyChanged, true);
  assert.equal(policyChanged.policyState.changedCount, 1);
  assert.notEqual(policyChanged.activeUnits.changed[0].policy.category, policyChanged.activeUnits.changed[0].previous.policy.category);
  const deactivated = buildPorterDelta(from, to, deltaOptions(from, to, {
    policyForUnit: (candidate) => ({ category: candidate === from ? "literal-port" : "test", active: candidate === from }),
    isActivePortPolicy: (policy) => policy.active,
  }));
  assert.equal(deactivated.activeUnits.removedCount, 1);
  assert.equal(deactivated.policyState.changedCount, 1);
  assert.equal(deactivated.policyState.changed[0].previous.active, true);
  assert.equal(deactivated.policyState.changed[0].active, false);
  to.semantic.toolchainHash = "f".repeat(64);
  to.semantic.moduleGraph = [{ path: "example.test/dependency", version: "v1.2.3" }];
  const environmentChanged = buildPorterDelta(from, to, deltaOptions(from, to, {
    policyForUnit: () => ({ category: "literal-port", active: true }),
    isActivePortPolicy: () => true,
  }));
  assert.equal(environmentChanged.extractionEnvironment.matches, false);
  assert.ok(environmentChanged.semanticState.changed.some((entry) => entry.id === "moduleGraph"));
  assert.ok(environmentChanged.semanticState.changed.some((entry) => entry.id === "toolchainHash"));
});

test("delta supplemental evidence binds generated-source coverage and policy contracts", () => {
  const generated = file("internal/checker/stringer_generated.go", "generated", []);
  generated.generated = true;
  const from = snapshot("a".repeat(40), [generated]);
  const to = structuredClone(from);
  const config = { goModulePath: "m", policies: [], unitPolicies: [] };
  const evidence = buildDeltaSupplementalEvidence(config, from, to);
  const tracked = evidence.generatedSourcePolicies.fromCoverage.mechanisms.find((entry) => entry.id === "tracked-generated-port");
  assert.deepEqual(tracked.files.map((entry) => entry.path), ["internal/checker/stringer_generated.go"]);
  assert.deepEqual(evidence.generatedSourcePolicies.from.issues, []);
  assert.equal(evidence.generatedSourcePolicies.delta.matches, true);

  const changedGenerated = structuredClone(to);
  changedGenerated.files[0].sourceHash = "f".repeat(64);
  const changedEvidence = buildDeltaSupplementalEvidence(config, from, changedGenerated);
  assert.equal(changedEvidence.generatedSourcePolicies.delta.matches, false);
  assert.equal(changedEvidence.generatedSourcePolicies.delta.files.changedCount, 1);

  const unclassified = structuredClone(from);
  unclassified.files[0].path = "internal/checker/unclassified_generated.go";
  const rejected = buildDeltaSupplementalEvidence(config, unclassified, to);
  assert.ok(rejected.generatedSourcePolicies.from.issues.some((issue) => issue.reason.includes("no registered mechanism")));
  assert.equal(rejected.generatedSourcePolicies.delta.matches, false);

  const policyChanged = buildDeltaSupplementalEvidence({
    ...config,
    policies: [{ match: "internal/checker/**", category: "test", reason: "Fixture policy change." }],
  }, from, to);
  assert.notEqual(evidence.effectivePolicies.contract.digest, policyChanged.effectivePolicies.contract.digest);
});

function deltaArtifacts(from, to, fromGitEvidence, porterGitEvidence, toGitEvidence, report) {
  return new Map([
    ["delta.json", `${JSON.stringify(report, null, 2)}\n`],
    ["from-snapshot.json", `${JSON.stringify(portableSnapshot(from, "from"), null, 2)}\n`],
    ["from-tree.json", `${JSON.stringify(fromGitEvidence, null, 2)}\n`],
    ["porter-tree.json", `${JSON.stringify(porterGitEvidence, null, 2)}\n`],
    ["summary.md", renderDeltaMarkdown(report)],
    ["to-snapshot.json", `${JSON.stringify(portableSnapshot(to, "to"), null, 2)}\n`],
    ["to-tree.json", `${JSON.stringify(toGitEvidence, null, 2)}\n`],
  ]);
}

function reviewReport(report) {
  return {
    ...report,
    porterImplementation: { revision: "c".repeat(40) },
    generatedSourcePolicies: generatedSourceReviewEvidence(),
  };
}

function generatedSourceReviewEvidence() {
  return {
    mechanisms: [{ id: "tracked-generated-port" }],
    fromCoverage: {},
    toCoverage: {},
    delta: {
      matches: true,
      policyStatusChanged: false,
      mechanisms: emptyInventoryComparison(),
      files: emptyInventoryComparison(),
    },
  };
}

function emptyInventoryComparison() {
  return { fromCount: 0, toCount: 0, addedCount: 0, removedCount: 0, changedCount: 0, added: [], removed: [], changed: [] };
}

function treeEntries(value) {
  return value.files.map((candidate) => ({
    mode: "100644",
    type: "blob",
    hash: candidate.gitBlobHash,
    path: candidate.path,
  })).sort((left, right) => left.path.localeCompare(right.path));
}

function deltaOptions(from, to, callbacks) {
  return {
    fromSnapshotDigest: snapshotDigest(from),
    fromTreeEntries: treeEntries(from),
    isActivePortPolicy: callbacks.isActivePortPolicy,
    policyForUnit: callbacks.policyForUnit,
    toSnapshotDigest: snapshotDigest(to),
    toTreeEntries: treeEntries(to),
  };
}

function gitEvidence(value, label) {
  const entries = treeEntries(value);
  const rootTree = gitTreeHash(entries);
  const commitBody = Buffer.from(
    `tree ${rootTree}\nauthor Porter Test <porter@example.test> 0 +0000\ncommitter Porter Test <porter@example.test> 0 +0000\n\n${label}\n`,
    "utf8",
  );
  const revision = gitObjectHash("commit", commitBody);
  value.gitRevision = revision;
  return buildGitCommitTreeEvidence({ commitBody, entries, objectFormat: "sha1", revision });
}

function provenance(value) {
  const digest = snapshotDigest(value);
  return {
    schemaVersion: 1,
    revision: value.gitRevision,
    objectFormat: "sha1",
    dirtyBefore: false,
    dirtyAfter: false,
    deterministic: true,
    snapshotDigest: digest,
    repeatSnapshotDigest: digest,
  };
}

function snapshot(gitRevision, files) {
  const requiredFiles = files.filter((candidate) => candidate.units.length > 0).map((candidate) => candidate.path).sort();
  return {
    schemaVersion: 12,
    sourceRoot: "/source",
    modulePath: "m",
    gitRevision,
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    semantic: {
      compiler: "gc",
      toolchain: "go1.26.4",
      toolchainExecutable: "/go/bin/go",
      toolchainHash: "1".repeat(64),
      goroot: "/go",
      gorootHash: "2".repeat(64),
      gorootHashContract: "tsts-porter-goroot-tree-v1",
      releaseTags: ["go1.26"],
      modulePath: "m",
      requiredFiles,
      excludedFiles: [],
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
      moduleGraph: [],
      profiles: [profile("linux", "amd64", "GOAMD64=v1", requiredFiles)],
    },
    summary: { goFileCount: files.length, unitCount: files.reduce((count, candidate) => count + candidate.units.length, 0) },
    files,
  };
}

function file(sourcePath, sourceHash, units) {
  return {
    path: sourcePath,
    sourceHash,
    gitBlobHash: createHash("sha1").update(sourceHash).digest("hex"),
    importPath: `m/${sourcePath.slice(0, sourcePath.lastIndexOf("/"))}`,
    generated: false,
    buildTags: [],
    implicitBuildTags: [],
    units,
  };
}

function unit(id, kind, qualifiedName, sigHash, semantic = semanticFunction(sigHash)) {
  return { id, kind, qualifiedName, sigHash, semantic, valueSpecs: [], metadata: { goPath: id.split("::")[1] } };
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

function profile(goos, goarch, architecture, coveredFiles = []) {
  return {
    goos,
    goarch,
    cgoEnabled: false,
    architecture,
    experiments: "",
    goexperiment: "",
    buildTags: [],
    buildFlags: ["-mod=readonly"],
    toolTags: [],
    coveredFiles,
    environment: ["GOROOT=/go", "PATH=/go/bin"],
    packageIds: ["m/internal/a"],
  };
}

function excludeSemanticFile(snapshot, file) {
  snapshot.semantic.requiredFiles = snapshot.semantic.requiredFiles.filter((path) => path !== file);
  snapshot.semantic.excludedFiles.push(file);
  snapshot.semantic.excludedFiles.sort();
}
