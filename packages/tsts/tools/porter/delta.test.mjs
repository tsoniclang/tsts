import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { buildDeltaCompletion, buildPorterDelta, canonicalSnapshot, portableSnapshot, renderDeltaMarkdown, snapshotDigest, verifyDeltaCompletion } from "./delta.mjs";
import { buildExactDeltaReport, verifyDeltaEvidence } from "./core/delta-command.mjs";
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
  assert.match(renderDeltaMarkdown(report), /Active porter units/);
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
  assert.equal(report.schemaVersion, 5);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.sourceSignatureChangedCount, 0);
  assert.equal(report.activeUnits.semanticDeclarationChangedCount, 1);
  assert.equal(report.activeUnits.signatureChangedCount, 1);
  assert.equal(report.activeUnits.constantsChangedCount, 1);
  assert.match(renderDeltaMarkdown(report), /1 canonical declarations/);
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
    ["summary.md", "summary\n"],
    ["to-snapshot.json", "{}\n"],
    ["to-tree.json", "[]\n"],
  ]);
  const completion = buildDeltaCompletion(artifacts, report);
  assert.deepEqual(verifyDeltaCompletion(artifacts, completion), []);
  const tampered = new Map(artifacts);
  tampered.set("summary.md", "changed\n");
  assert.ok(verifyDeltaCompletion(tampered, completion).some((issue) => issue.includes("summary.md SHA-256")));
  assert.ok(verifyDeltaCompletion(new Map([...artifacts].filter(([name]) => name !== "delta.json")), completion).some((issue) => issue.includes("missing evidence artifact delta.json")));
});

test("delta evidence rejects regenerated report tampering against exact checkout-derived evidence", () => {
  const config = {
    goModulePath: "m",
    policies: [{ match: "internal/inactive/**", category: "test", reason: "Test-only declarations are inactive." }],
    sourceRoot: "/source",
    unitPolicies: [],
  };
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
  const fromProvenance = provenance(from);
  const toProvenance = provenance(to);
  const report = buildExactDeltaReport(config, from, to, {
    fromGitEvidence,
    fromProvenance,
    toGitEvidence,
    toProvenance,
  });
  assert.equal(report.rawUnits.changedCount, 2);
  assert.equal(report.activeUnits.changedCount, 1);
  assert.equal(report.activeUnits.signatureChangedCount, 1);
  assert.equal(report.provenance.from.deterministic, true);
  assert.equal(report.effectivePolicies.from.units.length, 2);
  assert.equal(report.generatedSourcePolicies.mechanisms.length > 0, true);

  const artifacts = deltaArtifacts(from, to, fromGitEvidence, toGitEvidence, report);
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
    ["missing generated-source policies", (value) => { delete value.generatedSourcePolicies; }],
    ["legacy delta shape", (value) => { value.unitChanges = structuredClone(value.activeUnits); }],
  ];
  for (const [label, mutate] of mutations) {
    const tampered = structuredClone(report);
    mutate(tampered);
    const tamperedArtifacts = deltaArtifacts(from, to, fromGitEvidence, toGitEvidence, tampered);
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
  const forgedReport = buildExactDeltaReport(config, forgedSnapshot, to, {
    fromGitEvidence,
    fromProvenance: provenance(forgedSnapshot),
    toGitEvidence,
    toProvenance,
  });
  const forgedArtifacts = deltaArtifacts(forgedSnapshot, to, fromGitEvidence, toGitEvidence, forgedReport);
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

test("effective policy and complete extractor-environment drift are visible", () => {
  const id = "m::internal/a/value.go::func::Value";
  const from = snapshot("0".repeat(40), [file("internal/a/value.go", "same", [unit(id, "func", "Value", "same")])]);
  const to = structuredClone(from);
  const fromGitEvidence = gitEvidence(from, "policy-from");
  const toGitEvidence = gitEvidence(to, "policy-to");
  const baseConfig = { goModulePath: "m", policies: [], sourceRoot: "/source", unitPolicies: [] };
  const changedConfig = {
    ...baseConfig,
    unitPolicies: [{ id, category: "host-native", reason: "The exact declaration is supplied by a reviewed host-native boundary." }],
  };
  const exactInput = {
    fromGitEvidence,
    fromProvenance: provenance(from),
    toGitEvidence,
    toProvenance: provenance(to),
  };
  const baseline = buildExactDeltaReport(baseConfig, from, to, exactInput);
  const changed = buildExactDeltaReport(changedConfig, from, to, exactInput);
  assert.notEqual(baseline.effectivePolicies.contract.digest, changed.effectivePolicies.contract.digest);
  assert.equal(baseline.effectivePolicies.from.units[0].policy.category, "literal-port");
  assert.equal(changed.effectivePolicies.from.units[0].policy.category, "host-native");

  to.semantic.toolchainHash = "f".repeat(64);
  const environmentChanged = buildExactDeltaReport(baseConfig, from, to, {
    ...exactInput,
    toProvenance: provenance(to),
  });
  assert.equal(environmentChanged.extractionEnvironment.matches, false);
});

function deltaArtifacts(from, to, fromGitEvidence, toGitEvidence, report) {
  return new Map([
    ["delta.json", `${JSON.stringify(report, null, 2)}\n`],
    ["from-snapshot.json", `${JSON.stringify(portableSnapshot(from, "from"), null, 2)}\n`],
    ["from-tree.json", `${JSON.stringify(fromGitEvidence, null, 2)}\n`],
    ["summary.md", renderDeltaMarkdown(report)],
    ["to-snapshot.json", `${JSON.stringify(portableSnapshot(to, "to"), null, 2)}\n`],
    ["to-tree.json", `${JSON.stringify(toGitEvidence, null, 2)}\n`],
  ]);
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
    fromTreeEntries: treeEntries(from),
    isActivePortPolicy: callbacks.isActivePortPolicy,
    policyForUnit: callbacks.policyForUnit,
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
      requiredFiles: files.map((file) => file.path).sort(),
      excludedFiles: [],
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
      profiles: [profile("linux", "amd64", "GOAMD64=v1")],
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

function profile(goos, goarch, architecture) {
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
    coveredFiles: [],
    environment: ["GOROOT=/go", "PATH=/go/bin"],
    packageIds: ["m/internal/a"],
  };
}

function excludeSemanticFile(snapshot, file) {
  snapshot.semantic.requiredFiles = snapshot.semantic.requiredFiles.filter((path) => path !== file);
  snapshot.semantic.excludedFiles.push(file);
  snapshot.semantic.excludedFiles.sort();
}
