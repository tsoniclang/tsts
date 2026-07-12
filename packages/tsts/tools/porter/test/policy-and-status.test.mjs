import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  authoredFacadePathSet,
  buildGeneratedArtifactStatus,
  buildGeneratedSourcePolicyStatus,
  buildLocalOverrideStatus,
  buildLargeFileSplitStatus,
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  collectLocalOverrideFailures,
  collectVerifyFailures,
  expectedTsPath,
  matchGlob,
  policyFor,
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
  renderUnitGroup,
  renderStatusMarkdown,
  localTsName,
  repoRoot,
  resolveRepo,
  scanTsUnits,
  verifyStatus,
  validateTsgoUnitMetadata,
  validatePorterSnapshot,
  writeTextSafely,
} from "../porter.mjs";
import {
  buildAstGeneratedArtifactStatus,
  buildAstGeneratedFiles,
  buildGeneratedAstSkips,
  emitKinds,
  parseGoNodeDataMethods,
  parseGoFlagFile,
  writeAstGenerated,
} from "../ast-generator.mjs";
import { AstSchema } from "../ast-schema-model.mjs";
import {
  buildDiagnosticsGeneratedArtifactStatus,
  buildDiagnosticsGeneratedFiles,
  collectDiagnosticsArtifactFailures,
  emitLocalizedMessages,
  emitMessages,
  parseCatalog,
  writeDiagnosticsGenerated,
} from "../diagnostics-generator.mjs";
import {
  buildBundledGeneratedArtifactStatus,
  buildExpectedBundledArtifacts,
  collectBundledArtifactFailures,
  writeBundledGenerated,
} from "../../bundled/generate-bundled.mjs";
import { schemaPoliciesFromSourcePin } from "../source-pin.mjs";

import {
  baseConfig,
  channelType,
  emptyCounts,
  emptyGeneratedArtifacts,
  fileRecord,
  funcType,
  identType,
  instantiationType,
  interfaceType,
  mapType,
  pointerType,
  selectorType,
  sliceType,
  snapshotWith,
  signatureHash,
  testSemanticEnvironment,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("matchGlob supports recursive and single-segment patterns", () => {
  assert.equal(matchGlob("internal/jsnum/**", "internal/jsnum/jsnum.go"), true);
  assert.equal(matchGlob("internal/jsnum/**", "internal/jsnum/sub/a.go"), true);
  assert.equal(matchGlob("**/*_test.go", "internal/debug/debug_test.go"), true);
  assert.equal(matchGlob("internal/*/debug.go", "internal/debug/nested/debug.go"), false);
  assert.equal(matchGlob("internal/*/debug.go", "internal/foo/debug.go"), true);
});

test("@tsgo-unit metadata is exact and cannot fail open", () => {
  const valid = {
    id: "m::internal/a.go::func::Run",
    kind: "func",
    status: "implemented",
    sigHash: "a".repeat(64),
  };
  assert.deepEqual(validateTsgoUnitMetadata(valid), []);
  for (const mutation of [
    { ...valid, status: undefined },
    { ...valid, sigHash: undefined },
    { ...valid, bodyHash: "b".repeat(64) },
    { ...valid, kind: "method" },
    { ...valid, extra: true },
  ]) {
    assert.notDeepEqual(validateTsgoUnitMetadata(mutation), []);
  }
});

test("extractor snapshots reject schema drift, removed fields, unknown units, and count drift", () => {
  const config = { ...baseConfig, sourceRoot: ".temp/source-fixture", goModulePath: "m" };
  const sourceRoot = path.resolve(repoRoot, config.sourceRoot).split(path.sep).join("/");
  const unit = unitRecord({
    id: "m::internal/a.go::func::Run",
    goPath: "internal/a.go",
    name: "Run",
    qualifiedName: "Run",
    signature: "func Run()",
    snippet: "func Run()",
    sigHash: signatureHash("func Run()"),
  });
  const file = fileRecord({
    path: "internal/a.go",
    importPath: "m/internal",
    sourceHash: "c".repeat(64),
    gitBlobHash: "d".repeat(40),
    buildTags: [],
    implicitBuildTags: [],
    imports: [],
    units: [unit],
  });
  const snapshot = {
    schemaVersion: 12,
    sourceRoot,
    modulePath: "m",
    gitRevision: "e".repeat(40),
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    semantic: {
      toolchain: "go1.26.4",
      toolchainExecutable: "/toolchain/bin/go",
      toolchainHash: "0".repeat(64),
      goroot: "/toolchain",
      gorootHash: "1".repeat(64),
      gorootHashContract: "tsts-porter-goroot-tree-v1",
      gorootEntryCount: 5,
      gorootFileCount: 2,
      gorootDirectoryCount: 3,
      gorootSymlinkCount: 0,
      gorootBytes: 128,
      compiler: "gc",
      releaseTags: ["go1.26"],
      modulePath: "m",
      requiredFiles: ["internal/a.go"],
      coveredFiles: ["internal/a.go"],
      excludedFiles: [],
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
      profiles: [{
        goos: "linux",
        goarch: "amd64",
        cgoEnabled: false,
        architecture: "GOAMD64=v1",
        buildTags: [],
        buildFlags: ["-mod=readonly"],
        toolTags: ["amd64.v1"],
        environment: testSemanticEnvironment(),
        experiments: "",
        goexperiment: "",
        packageIds: ["m/internal"],
        coveredFiles: ["internal/a.go"],
      }],
      unsupportedProfiles: [],
      moduleGraph: [{ path: "m", version: "", sum: "", replacePath: "", replaceVersion: "", replaceSum: "" }],
    },
    summary: {
      fileCount: 1,
      goFileCount: 1,
      generatedFiles: 0,
      lineCount: 10,
      unitCount: 1,
      unitKindCounts: { func: 1 },
      buildTagCounts: {},
      packageCounts: { debug: 1 },
      importPathCount: 1,
      structTagCount: 0,
      structTagKeyCounts: {},
    },
    files: [file],
  };
  assert.deepEqual(validatePorterSnapshot(snapshot, config), []);
  assert.equal(unit.endLine, unit.startLine, "function declaration range must stop at its bodyless signature");
  for (const [description, mutate, pattern] of [
    ["signature hash", (value) => value.files[0].units[0].sigHash = "f".repeat(64), /sigHash must equal SHA-256/],
    ["bodyless function snippet", (value) => value.files[0].units[0].snippet = "func Run() { panic(\"body\") }", /snippet must equal the bodyless/],
    ["unit qualified identity", (value) => value.files[0].units[0].qualifiedName = "Other", /qualifiedName must equal name/],
    ["unit id", (value) => value.files[0].units[0].id = "m::internal/a.go::func::Other", /canonical duplicate ordinal suffix/],
    ["file metadata key", (value) => value.files[0].metadata.extra = "x", /metadata keys must be exactly/],
    ["file basename", (value) => value.files[0].metadata.basename = "wrong.go", /basename must equal/],
    ["unit metadata key", (value) => value.files[0].units[0].metadata.extra = "x", /metadata keys must be exactly/],
    ["unit metadata path", (value) => value.files[0].units[0].metadata.goPath = "other.go", /goPath must equal/],
    ["unit/file generated state", (value) => value.files[0].units[0].generated = true, /generated must equal/],
    ["unit source range", (value) => value.files[0].units[0].endLine = 11, /endLine must not exceed/],
    ["negative physical offset", (value) => value.files[0].units[0].startOffset = -1, /invalid physical byte-offset range/],
    ["reversed physical offsets", (value) => value.files[0].units[0].endOffset = value.files[0].units[0].startOffset, /invalid physical byte-offset range/],
    ["GOEXPERIMENT environment drift", (value) => value.semantic.profiles[0].environment = value.semantic.profiles[0].environment.map((entry) => entry === "GOEXPERIMENT=" ? "GOEXPERIMENT=arenas" : entry).sort(), /must contain GOEXPERIMENT=/],
    ["duplicate actual profile state", (value) => {
      const duplicate = { ...structuredClone(value.semantic.profiles[0]), goexperiment: "arenas", environment: testSemanticEnvironment({ goexperiment: "arenas" }) };
      value.semantic.profiles.push(duplicate);
      value.files[0].units[0].semantic[0].profiles.push(1);
    }, /duplicates an actual semantic profile state/],
  ]) {
    const changed = structuredClone(snapshot);
    mutate(changed);
    assert.ok(validatePorterSnapshot(changed, config).some((issue) => pattern.test(issue)), description);
  }
  const crlfSignature = structuredClone(snapshot);
  crlfSignature.files[0].units[0].signature = "func Run()\r\n";
  crlfSignature.files[0].units[0].snippet = "func Run()\r\n";
  crlfSignature.files[0].units[0].sigHash = signatureHash("func Run()\n");
  assert.deepEqual(validatePorterSnapshot(crlfSignature, config), []);
  for (const imported of [{ path: "C" }, { path: "example/x", name: "alias", packageName: "x" }, { path: "example/x", packageName: "x" }]) {
    const changed = structuredClone(snapshot);
    changed.files[0].imports = [imported];
    assert.deepEqual(validatePorterSnapshot(changed, config), []);
  }
  for (const imported of [
    { path: "example/x" },
    { path: "example/x", name: "alias" },
    { path: "example/x", packageName: "" },
  ]) {
    const changed = structuredClone(snapshot);
    changed.files[0].imports = [imported];
    assert.ok(validatePorterSnapshot(changed, config).some((issue) => issue.includes("packageName")));
  }
  const pinnedModule = { path: "example.org/dependency", version: "v1.2.3", sum: "h1:source", replacePath: "", replaceVersion: "", replaceSum: "" };
  const moduleSnapshot = structuredClone(snapshot);
  moduleSnapshot.semantic.moduleGraph.push(pinnedModule);
  moduleSnapshot.semantic.moduleGraph.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  assert.deepEqual(validatePorterSnapshot(moduleSnapshot, config), []);
  const missingModuleSum = structuredClone(moduleSnapshot);
  missingModuleSum.semantic.moduleGraph[0].sum = "";
  assert.ok(validatePorterSnapshot(missingModuleSum, config).some((issue) => issue.includes("version and checksum evidence")));
  const replacedModule = structuredClone(moduleSnapshot);
  Object.assign(replacedModule.semantic.moduleGraph[0], { replacePath: "example.org/replacement", replaceVersion: "v1.2.4", replaceSum: "h1:replacement" });
  assert.deepEqual(validatePorterSnapshot(replacedModule, config), []);
  replacedModule.semantic.moduleGraph[0].replaceVersion = "";
  assert.ok(validatePorterSnapshot(replacedModule, config).some((issue) => issue.includes("pinned version and checksum")));
  const duplicated = structuredClone(snapshot);
  duplicated.files[0].units.push({ ...structuredClone(unit), id: `${unit.id}::#2`, startLine: 4, endLine: 4, startOffset: 40, endOffset: 50 });
  duplicated.summary.unitCount = 2;
  duplicated.summary.unitKindCounts.func = 2;
  assert.deepEqual(validatePorterSnapshot(duplicated, config), []);
  duplicated.files[0].units[1].id = `${unit.id}::#3`;
  assert.ok(validatePorterSnapshot(duplicated, config).some((issue) => issue.includes("source-order occurrence #2")));
  duplicated.files[0].units[1].id = `${unit.id}::#2`;
  duplicated.files[0].units[1].startOffset = 0;
  duplicated.files[0].units[1].endOffset = 10;
  assert.ok(validatePorterSnapshot(duplicated, config).some((issue) => issue.includes("sorted by startOffset") || issue.includes("duplicate ordinals must follow source order")));
  const varSignature = "var Value int";
  const varUnit = unitRecord({
    id: "m::internal/a.go::varGroup::Value", kind: "varGroup", name: "Value", qualifiedName: "Value", goPath: "internal/a.go",
    signature: varSignature, snippet: varSignature, sigHash: signatureHash(varSignature),
    valueSpecs: [{ names: ["Value"], type: identType("int") }],
  });
  const varSnapshot = { ...snapshot, files: [{ ...file, units: [varUnit] }], summary: { ...snapshot.summary, unitKindCounts: { varGroup: 1 } } };
  assert.deepEqual(validatePorterSnapshot(varSnapshot, config), []);
  varSnapshot.files[0].units[0].signature = "var Value";
  varSnapshot.files[0].units[0].snippet = "var Value";
  varSnapshot.files[0].units[0].sigHash = signatureHash("var Value");
  assert.ok(validatePorterSnapshot(varSnapshot, config).some((issue) => issue.includes("declaration-only value skeleton")));
  Object.assign(varSnapshot.files[0].units[0], { signature: varSignature, snippet: varSignature, sigHash: signatureHash(varSignature) });
  varSnapshot.files[0].units[0].snippet = "var Value = compute()";
  assert.ok(validatePorterSnapshot(varSnapshot, config).some((issue) => issue.includes("bodyless declaration signature")));
  varSnapshot.files[0].units[0].snippet = varSignature;
  varSnapshot.files[0].units[0].name = "Other";
  assert.ok(validatePorterSnapshot(varSnapshot, config).some((issue) => issue.includes("source value declaration names")));
  assert.match(validatePorterSnapshot({ ...snapshot, schemaVersion: 2 }, config)[0], /schemaVersion/);
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, imports: [{ name: "x", packageName: "x", path: "example/x", futureField: true }] }] }, config).some((issue) => issue.includes("futureField")));
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [{ ...unit, kind: "futureDecl" }] }] }, config).some((issue) => issue.includes("unknown")));
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, parseError: "broken" }] }, config).some((issue) => issue.includes("unknown snapshot-schema-12 key 'parseError'")));
  assert.ok(validatePorterSnapshot({ ...snapshot, summary: { ...snapshot.summary, unitCount: 0 } }, config).some((issue) => issue.includes("unitCount")));
  assert.ok(validatePorterSnapshot({ ...snapshot, summary: { ...snapshot.summary, structTagCount: 1 } }, config).some((issue) => issue.includes("structTagCount")));
  assert.ok(validatePorterSnapshot({ ...snapshot, summary: { ...snapshot.summary, nodeKindCounts: {} } }, config).some((issue) => issue.includes("keys must be exactly")));

  for (const [description, mutate] of [
    ["missing external surface object", (value) => value.semantic.externalPackageSurface = null],
    ["malformed external declarations", (value) => value.semantic.externalPackageSurface.declarations = [null]],
    ["malformed external dependency declarations", (value) => value.semantic.externalPackageSurface.dependencyTypeDeclarations = null],
    ["malformed external selection list", (value) => value.semantic.externalPackageSurface.selections = null],
    ["malformed unresolved external selection", (value) => value.semantic.externalPackageSurface.unresolvedSelections = [null]],
  ]) {
    const changed = structuredClone(snapshot);
    mutate(changed);
    let issues;
    assert.doesNotThrow(() => issues = validatePorterSnapshot(changed, config), description);
    assert.ok(issues.length > 0, `${description} must fail closed`);
  }

  for (const key of ["generated", "imports", "metadata", "sourceHash", "units"]) {
    const missing = structuredClone(file);
    delete missing[key];
    assert.ok(
      validatePorterSnapshot({ ...snapshot, files: [missing] }, config).some((issue) => issue.includes(`missing required snapshot-schema-12 key '${key}'`)),
      `missing file field ${key} must fail closed`,
    );
  }
  for (const key of ["endOffset", "exported", "name", "parameters", "qualifiedName", "signature", "snippet", "startOffset", "typeParameterDetails"]) {
    const missing = structuredClone(unit);
    delete missing[key];
    assert.ok(
      validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [missing] }] }, config).some((issue) => issue.includes(`missing required snapshot-schema-12 key '${key}'`)),
      `missing unit field ${key} must fail closed`,
    );
  }
  for (const key of ["nodeKindCounts", "featureCounts"]) {
    assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, [key]: {} }] }, config).some((issue) => issue.includes(`unknown snapshot-schema-12 key '${key}'`)));
    assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [{ ...unit, [key]: {} }] }] }, config).some((issue) => issue.includes(`unknown snapshot-schema-12 key '${key}'`)));
  }
  for (const key of ["bodyHash", "externalRefs", "deferFacts", "resultSemantics", "returnFacts"]) {
    assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [{ ...unit, [key]: [] }] }] }, config).some((issue) => issue.includes(`unknown snapshot-schema-12 key '${key}'`)));
  }
  const missingSemantic = { ...unit };
  delete missingSemantic.semantic;
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [missingSemantic] }] }, config).some((issue) => issue.includes("semantic must be a non-empty")));
  const method = {
    ...unit,
    id: "m::internal/a.go::method::Thing.Run",
    kind: "method",
    name: "Run",
    qualifiedName: "Thing.Run",
    receiver: "Thing",
    receiverMode: "value",
    receiverType: { kind: "ident", text: "Thing", name: "Thing" },
    semantic: unitRecord({ kind: "method", name: "Run", receiver: "Thing", goPath: "internal/a.go" }).semantic,
  };
  assert.deepEqual(validatePorterSnapshot({ ...snapshot, summary: { ...snapshot.summary, unitKindCounts: { method: 1 } }, files: [{ ...file, units: [method] }] }, config), []);
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [{ ...method, qualifiedName: "Other.Run" }] }] }, config).some((issue) => issue.includes("receiver plus method name")));
  for (const key of ["receiver", "receiverMode", "receiverType"]) {
    const missing = structuredClone(method);
    delete missing[key];
    assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [missing] }] }, config).some((issue) => issue.includes(key)));
  }

  const taggedMember = {
    kind: "field",
    name: "Value",
    exported: true,
    type: "string",
    typeExpr: { kind: "ident", text: "string", name: "string" },
    structTag: 'json:"value,omitzero" xml:"Value"',
    tagValues: [{ key: "json", value: "value,omitzero" }, { key: "xml", value: "Value" }],
    tagRemainder: "",
  };
  const taggedUnit = unitRecord({
    id: "m::internal/a.go::type::Tagged",
    goPath: "internal/a.go",
    kind: "type",
    name: "Tagged",
    qualifiedName: "Tagged",
    typeKind: "struct",
    typeExpression: { kind: "struct", text: "struct { Value string }", members: [taggedMember] },
    members: [taggedMember],
    signature: "Tagged struct { Value string }",
    snippet: "Tagged struct { Value string }",
    sigHash: signatureHash("Tagged struct { Value string }"),
  });
  const taggedSnapshot = {
    ...snapshot,
    files: [{ ...file, units: [taggedUnit] }],
    summary: { ...snapshot.summary, unitKindCounts: { type: 1 }, structTagCount: 1, structTagKeyCounts: { json: 1, xml: 1 } },
  };
  assert.deepEqual(validatePorterSnapshot(taggedSnapshot, config), []);
  const staleTypeSignature = structuredClone(taggedSnapshot);
  Object.assign(staleTypeSignature.files[0].units[0], { signature: "type Tagged struct", snippet: "type Tagged struct", sigHash: signatureHash("type Tagged struct") });
  assert.ok(validatePorterSnapshot(staleTypeSignature, config).some((issue) => issue.includes("full typeExpression RHS")));
  assert.ok(validatePorterSnapshot({ ...taggedSnapshot, files: [{ ...file, units: [{ ...taggedUnit, members: [{ ...taggedMember, structTag: undefined }] }] }] }, config).some((issue) => issue.includes("structTag must be a string")));
  const partialTag = { ...taggedMember, structTag: 'json:"caf\\xc3\\xa9"   ', tagValues: [{ key: "json", value: "café" }], tagRemainder: "   " };
  const partialSnapshot = { ...taggedSnapshot, files: [{ ...file, units: [{ ...taggedUnit, members: [partialTag], typeExpression: { ...taggedUnit.typeExpression, members: [partialTag] } }] }], summary: { ...taggedSnapshot.summary, structTagKeyCounts: { json: 1 } } };
  assert.deepEqual(validatePorterSnapshot(partialSnapshot, config), []);
  assert.ok(validatePorterSnapshot({ ...taggedSnapshot, files: [{ ...file, units: [{ ...taggedUnit, members: [{ ...partialTag, tagRemainder: "malformed" }] }] }] }, config).some((issue) => issue.includes("exact unparsed struct-tag suffix")));
});

test("repeated Go declarations receive distinct deterministic TypeScript owners", () => {
  assert.equal(localTsName(unitRecord({ id: "m::a.go::func::init", name: "init" })), "init");
  assert.equal(localTsName(unitRecord({ id: "m::a.go::func::init::#2", name: "init" })), "init__2");
});

test("policyFor applies generated and configured dispositions before default literal ports", () => {
  assert.equal(policyFor(baseConfig, "internal/jsnum/jsnum.go", false).category, "manual-required");
  assert.equal(policyFor(baseConfig, "internal/debug/debug_test.go", false).category, "test");
  assert.equal(policyFor(baseConfig, "internal/ast/ast_generated.go", true).category, "generated-artifact");
  assert.equal(policyFor(baseConfig, "internal/ast/unclassified_generated.go", true).category, "unclassified-generated");
  assert.equal(policyFor(baseConfig, "internal/debug/debug.go", false).category, "literal-port");
});

test("generated source mechanisms fail on missing, ambiguous, stale, and non-generated matches", () => {
  const snapshot = {
    files: [
      { path: "internal/a_generated.go", generated: true, units: [] },
      { path: "internal/b_generated.go", generated: true, units: [] },
      { path: "internal/plain.go", generated: false, units: [] },
    ],
  };
  const status = buildGeneratedSourcePolicyStatus(snapshot, {
    mechanisms: [
      { id: "tracked", mode: "tracked", category: "literal-port", active: true, patterns: ["internal/a_generated.go"], reason: "track it" },
      { id: "duplicate", mode: "tracked", category: "literal-port", active: true, patterns: ["internal/a_*"], reason: "duplicate" },
      { id: "wrong", mode: "artifact", category: "generated-artifact", active: false, statusKey: "wrong", patterns: ["internal/plain.go"], reason: "wrong" },
      { id: "stale", mode: "artifact", category: "generated-artifact", active: false, statusKey: "stale", patterns: ["internal/stale_generated.go"], reason: "stale" },
    ],
  });

  assert.equal(status.relevantFileCount, 2);
  assert.ok(status.issues.some((issue) => issue.path === "internal/a_generated.go" && issue.reason.includes("2 registered mechanisms")));
  assert.ok(status.issues.some((issue) => issue.path === "internal/b_generated.go" && issue.reason.includes("no registered mechanism")));
  assert.ok(status.issues.some((issue) => issue.path === "internal/plain.go" && issue.reason.includes("non-generated")));
  assert.ok(status.issues.some((issue) => issue.path === "stale" && issue.reason.includes("matches no")));
});

test("policyFor lets explicit inactive policies exclude generated LS/LSP files", () => {
  const policy = policyFor({
    ...baseConfig,
    policies: [
      { match: "internal/lsp/**", category: "out-of-scope", reason: "lsp excluded" },
    ],
  }, "internal/lsp/lsproto/lsp_generated.go", true);

  assert.equal(policy.category, "out-of-scope");
  assert.equal(policy.active, false);
});

test("expectedTsPath uses semantic large-file split plans without repeating source path metadata", () => {
  const unit = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.checkSourceFile",
    kind: "method",
    qualifiedName: "Checker.checkSourceFile",
    goPath: "internal/checker/checker.go",
  });
  const snapshot = snapshotWith([fileRecord({
    path: "internal/checker/checker.go",
    lineCount: 6000,
    units: [unit],
  })]);
  const config = {
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/checker/checker.go": {
          targetRoot: "packages/tsts/src/internal/checker/checker",
          reason: "test semantic split plan",
          targets: [
            {
              file: "source-files.ts",
              description: "Source-file checking methods",
              declarations: ["method::Checker.checkSourceFile"],
            },
          ],
        },
      },
    },
  };
  const splitStatus = buildLargeFileSplitStatus(config, snapshot);
  assert.equal(
    expectedTsPath(config, unit, splitStatus),
    "packages/tsts/src/internal/checker/checker/source-files.ts",
  );
});

test("buildStatus rejects tracked units outside their semantic split targets", () => {
  const unit = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.checkSourceFile",
    kind: "method",
    qualifiedName: "Checker.checkSourceFile",
    goPath: "internal/checker/checker.go",
    sigHash: "sig-1",
  });
  const config = {
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/checker/checker.go": {
          targetRoot: "packages/tsts/src/internal/checker/checker",
          targets: [{
            file: "source-files.ts",
            description: "Source-file checking methods",
            declarations: ["method::Checker.checkSourceFile"],
          }],
        },
      },
    },
  };
  const status = buildStatus(config, snapshotWith([fileRecord({
    path: "internal/checker/checker.go",
    lineCount: 6000,
    units: [unit],
  })]), {
    fileCount: 1,
    files: [{ path: "packages/tsts/src/internal/checker/wrong.ts", metadataCount: 1 }],
    units: [{
      id: unit.id,
      path: "packages/tsts/src/internal/checker/wrong.ts",
      status: "implemented",
      sigHash: "sig-1",
    }],
  });

  assert.deepEqual(status.splitPathMismatches, [{
    id: unit.id,
    actualPath: "packages/tsts/src/internal/checker/wrong.ts",
    expectedPath: "packages/tsts/src/internal/checker/checker/source-files.ts",
  }]);
  assert.ok(collectVerifyFailures(status, {}).includes("1 units outside their semantic split targets"));
  assert.match(renderStatusMarkdown(status), /Semantic Split Placement Mismatches/);
});

test("buildStatus reports missing, stale, orphan, unitless, and untracked TS files", () => {
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/debug/debug.go",
      units: [unitRecord({
        id: "m::internal/debug/debug.go::func::Fail",
        kind: "func",
        qualifiedName: "Fail",
        goPath: "internal/debug/debug.go",
        sigHash: "sig-1",
      })],
    }),
    fileRecord({
      path: "internal/core/doc.go",
      units: [],
    }),
  ]);
  const status = buildStatus(baseConfig, snapshot, {
    fileCount: 2,
    files: [
      { path: "packages/tsts/src/internal/debug/debug.ts", metadataCount: 1 },
      { path: "packages/tsts/src/internal/debug/helper.ts", metadataCount: 0 },
      { path: "packages/tsts/src/internal/ls/service.ts", metadataCount: 1 },
    ],
    units: [
      {
        id: "m::internal/debug/debug.go::func::Fail",
        path: "packages/tsts/src/internal/debug/debug.ts",
        status: "implemented",
        sigHash: "old-sig",
      },
      {
        id: "m::internal/debug/debug.go::func::Gone",
        path: "packages/tsts/src/internal/debug/debug.ts",
        status: "implemented",
        sigHash: "sig",
      },
    ],
  });

  assert.equal(status.counts.portable, 1);
  assert.equal(status.counts.stale, 1);
  assert.equal(status.counts.orphan, 1);
  assert.equal(status.counts.unitlessGoFiles, 1);
  assert.equal(status.counts.untrackedTsFiles, 1);
  assert.equal(status.counts.forbiddenTsFiles, 1);
  assert.match(renderStatusMarkdown(status), /Coverage Diagnostics/);
});

test("buildStatus excludes files omitted from every semantic profile", () => {
  const file = fileRecord({
    path: "internal/generator/generate.go",
    units: [unitRecord({
      id: "m::internal/generator/generate.go::func::main",
      kind: "func",
      name: "main",
      qualifiedName: "main",
      goPath: "internal/generator/generate.go",
    })],
  });
  const snapshot = snapshotWith([file]);
  snapshot.semantic.requiredFiles = [];
  snapshot.semantic.excludedFiles = [file.path];
  snapshot.semantic.profiles[0].coveredFiles = [];
  const status = buildStatus(baseConfig, snapshot, { fileCount: 0, files: [], units: [] });
  assert.equal(status.counts.excluded, 1);
  assert.equal(status.counts.missing, 0);
  assert.equal(status.excluded[0].category, "semantic-excluded");
});
