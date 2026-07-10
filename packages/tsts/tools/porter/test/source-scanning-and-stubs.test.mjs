import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  authoredFacadePathSet,
  buildGeneratedArtifactStatus,
  buildGeneratedSourcePolicyStatus,
  buildEmbeddedGoSourceUpdates,
  buildLocalOverrideStatus,
  buildExternalFacadeMap,
  buildLargeFileSplitStatus,
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  collectLocalOverrideFailures,
  collectMechanicalPortRisks,
  collectVerifyFailures,
  expectedTsPath,
  matchGlob,
  policyFor,
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
  renderStub,
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
  testBodyHash,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("mechanical risk checks reject no-op and lossy standard-library substitutions", () => {
  const noOp = collectMechanicalPortRisks(
    unitRecord({
      kind: "method",
      snippet: "func (w *Watcher) run() { select { case <-w.ch: w.cycle() } }",
      nodeKindCounts: { SelectStmt: 1, CallExpr: 1 },
    }),
    { status: "implemented", implementationBody: "{ void receiver; void cycle; }" },
  );
  assert.deepEqual(noOp.map((risk) => risk.kind), ["implemented-no-op"]);

  const marshal = collectMechanicalPortRisks(
    unitRecord({ snippet: "func write(v Value) { text, _ := json.Marshal(v) }", externalRefs: [{ importPath: "encoding/json", name: "Marshal", role: "call" }], nodeKindCounts: { CallExpr: 1 } }),
    { status: "implemented", implementationBody: "{ const text = JSON.stringify(value); return text; }" },
  );
  assert.deepEqual(marshal.map((risk) => risk.kind), ["json-marshal-substitution"]);

  const correctMarshalWithUnrelatedStringify = collectMechanicalPortRisks(
    unitRecord({ snippet: "func write(v Value) { text, _ := json.Marshal(v) }", externalRefs: [{ importPath: "encoding/json", name: "Marshal", role: "call" }], nodeKindCounts: { CallExpr: 1 } }),
    { status: "implemented", implementationBody: "{ const [text] = json_Marshal(value); debug(JSON.stringify(metadata)); return text; }" },
  );
  assert.deepEqual(correctMarshalWithUnrelatedStringify, []);

  const aliasedMarshal = collectMechanicalPortRisks(
    unitRecord({ externalRefs: [{ importPath: "encoding/json", name: "Marshal", role: "call" }], nodeKindCounts: { CallExpr: 1 } }),
    {
      status: "implemented",
      implementationBody: "{ return GoMarshal(value); }",
      implementationAnalysis: { calls: [{ text: "GoMarshal", terminal: "GoMarshal", importedName: "Marshal", argumentCalls: [] }] },
    },
  );
  assert.deepEqual(aliasedMarshal, []);

  const deepEqual = collectMechanicalPortRisks(
    unitRecord({ snippet: "func same(a, b Value) bool { return reflect.DeepEqual(a, b) }", externalRefs: [{ importPath: "reflect", name: "DeepEqual", role: "call" }], nodeKindCounts: { ReturnStmt: 1, CallExpr: 1 } }),
    { status: "implemented", implementationBody: "{ return JSON.stringify(a) === JSON.stringify(b); }" },
  );
  assert.deepEqual(deepEqual.map((risk) => risk.kind), ["deep-equal-stringify-substitution"]);

  const tristate = collectMechanicalPortRisks(
    unitRecord({ snippet: "func enabled(o Options) bool { return o.Flag.IsTrue() }", nodeKindCounts: { ReturnStmt: 1 } }),
    { status: "implemented", implementationBody: "{ return options.Flag !== 0; }" },
  );
  assert.deepEqual(tristate.map((risk) => risk.kind), ["tristate-numeric-truthiness"]);

  const exactTristate = collectMechanicalPortRisks(
    unitRecord({ snippet: "func enabled(o Options) bool { return o.Flag.IsTrue() && o.Mask != 0 }", nodeKindCounts: { ReturnStmt: 1 } }),
    { status: "implemented", implementationBody: "{ return Tristate_IsTrue(options.Flag) && options.Mask !== 0; }" },
  );
  assert.deepEqual(exactTristate, []);

  const addedGuard = collectMechanicalPortRisks(
    unitRecord({ snippet: "func (b *BuildInfo) fileName(id int) string { return b.FileNames[id-1] }", nodeKindCounts: { ReturnStmt: 1 } }),
    { status: "implemented", implementationBody: "{ if (id < 1) { return \"\"; } return receiver.FileNames[id - 1]; }" },
  );
  assert.deepEqual(addedGuard.map((risk) => risk.kind), ["unexpected-control-flow"]);

  const documentedGuard = collectMechanicalPortRisks(
    unitRecord({ snippet: "func run() { cycle() }", nodeKindCounts: { CallExpr: 1 } }),
    {
      status: "implemented",
      implementationBody: "{ if (singleThreaded) { cycle(); } }",
      override: { category: "runtime-representation", allow: ["body"], reason: "test" },
    },
  );
  assert.deepEqual(documentedGuard, []);

  const documentedNoOp = collectMechanicalPortRisks(
    unitRecord({ kind: "func", snippet: "func run() { cycle() }", nodeKindCounts: { CallExpr: 1 } }),
    {
      status: "implemented",
      implementationBody: "{ void cycle; }",
      override: { category: "runtime-representation", allow: ["body"], reason: "host schedules the cycle externally" },
    },
  );
  assert.deepEqual(documentedNoOp, []);

  const manualUpdate = collectMechanicalPortRisks(
    unitRecord({ snippet: "func visit(n *Node) *Node { return f.UpdateThing(n, visit(n.Child)) }", nodeKindCounts: { ReturnStmt: 1, CallExpr: 2 } }),
    { status: "implemented", implementationBody: "{ const child = visit(node.Child); if (child !== node.Child) return updateNode(NewThing(factory, child), node); return node; }" },
  );
  assert.deepEqual(manualUpdate.map((risk) => risk.kind), ["unexpected-control-flow", "manual-node-update"]);

  const multilineManualUpdate = collectMechanicalPortRisks(
    unitRecord({ snippet: "func visit(n *Node) *Node { return f.UpdateThing(n, visit(n.Child)) }", nodeKindCounts: { ReturnStmt: 1, CallExpr: 2 } }),
    {
      status: "implemented",
      implementationBody: `{
        return updateNode(
          NewThing(factory, visit(node.Child)),
          node,
        );
      }`,
    },
  );
  assert.deepEqual(multilineManualUpdate.map((risk) => risk.kind), ["manual-node-update"]);

  const pathSplit = collectMechanicalPortRisks(
    unitRecord({ snippet: "func baseName(p string) string { _, file := path.Split(p); return file }", externalRefs: [{ importPath: "path", name: "Split", role: "call" }], nodeKindCounts: { ReturnStmt: 1, CallExpr: 1 } }),
    { status: "implemented", implementationBody: "{ const index = p.lastIndexOf(\"/\"); return index < 0 ? p : p.slice(index + 1); }" },
  );
  assert.deepEqual(pathSplit.map((risk) => risk.kind), ["path-split-reimplementation"]);

  const reverseCopy = collectMechanicalPortRisks(
    unitRecord({ snippet: "func path() []int { values := collect(); slices.Reverse(values); return values }", externalRefs: [{ importPath: "slices", name: "Reverse", role: "call" }], nodeKindCounts: { ReturnStmt: 1, CallExpr: 2 } }),
    { status: "implemented", implementationBody: "{ const values = collect(); return [...values].reverse(); }" },
  );
  assert.deepEqual(reverseCopy.map((risk) => risk.kind), ["slice-reverse-reimplementation"]);
});

test("scanTsUnits records files with and without metadata", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    const longLiteral = "x".repeat(3000);
    writeFileSync(
      path.join(root, "internal/debug/debug.ts"),
      `/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::func::Fail","kind":"func","status":"stub","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 * @tsgo-override {
 *   "category": "runtime-performance",
 *   "allow": ["body"],
 *   "reason": "test multiline metadata parsing"
 * }
 *
 * Go source:
 * func Fail() {}
 */
export function Fail(): void { const text = ${JSON.stringify(longLiteral)}; if (text === "}") return; tailMarker(); }
`,
    );
    writeFileSync(path.join(root, "internal/debug/helper.ts"), "export const helper = true;\n");
    const result = scanTsUnits(root);
    assert.equal(result.fileCount, 2);
    assert.equal(result.units.length, 1);
    assert.deepEqual(result.units[0].override, {
      category: "runtime-performance",
      allow: ["body"],
      reason: "test multiline metadata parsing",
    });
    assert.equal(result.units[0].embeddedGoSource, " * func Fail() {}");
    assert.match(result.units[0].implementationBody, /tailMarker\(\)/);
    assert.equal(result.files.find((file) => file.path.endsWith("debug.ts")).metadataCount, 1);
    assert.equal(result.files.find((file) => file.path.endsWith("helper.ts")).metadataCount, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits rejects prose disguised as an embedded Go source block", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-source-label-"));
  try {
    writeFileSync(
      path.join(root, "bad.ts"),
      `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 *
 * Go source: (uses a helper rather than embedding upstream source)
 */
export function Bad(): void {}
`,
    );
    assert.throws(
      () => scanTsUnits(root),
      /inline Go source annotations are forbidden.*use 'Port note:'.*exact embedded upstream source block/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits rejects malformed, orphan, and duplicate override markers", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-overrides-"));
  try {
    writeFileSync(path.join(root, "outside.ts"), "// @tsgo-override {}\nexport const value = 1;\n");
    assert.throws(() => scanTsUnits(root), /orphan @tsgo-override marker outside a JSDoc/);
    unlinkSync(path.join(root, "outside.ts"));

    writeFileSync(path.join(root, "missing-json.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 * @tsgo-override
 */
export function Bad(): void {}
`);
    assert.throws(() => scanTsUnits(root), /marker must be followed by one JSON object/);
    unlinkSync(path.join(root, "missing-json.ts"));

    writeFileSync(path.join(root, "duplicate.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 * @tsgo-override {"category":"runtime-performance","allow":["body"],"reason":"This durable reason is intentionally long enough for validation."}
 * @tsgo-override {"category":"runtime-performance","allow":["body"],"reason":"This durable reason is intentionally long enough for validation."}
 */
export function Bad(): void {}
`);
    assert.throws(() => scanTsUnits(root), /exactly one override marker/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("buildStatus rejects stale embedded Go source blocks", () => {
  const unit = unitRecord({
    id: "m::internal/debug/debug.go::func::Fail",
    kind: "func",
    qualifiedName: "Fail",
    goPath: "internal/debug/debug.go",
    sigHash: "sig",
    bodyHash: "body",
    snippet: "func Fail() {}",
  });
  const status = buildStatus(
    baseConfig,
    snapshotWith([fileRecord({ units: [unit] })]),
    {
      fileCount: 1,
      files: [{ path: "packages/tsts/src/internal/debug/debug.ts", metadataCount: 1 }],
      units: [{
        id: unit.id,
        kind: unit.kind,
        path: "packages/tsts/src/internal/debug/debug.ts",
        status: "implemented",
        sigHash: unit.sigHash,
        bodyHash: unit.bodyHash,
        embeddedGoSource: " * func OldFail() {}",
      }],
    },
  );

  assert.equal(status.counts.embeddedSourceMismatches, 1);
  assert.equal(collectVerifyFailures(status, {}).some((failure) => /stale or missing embedded Go source blocks/.test(failure)), true);
});

test("buildEmbeddedGoSourceUpdates synchronizes docs without disturbing overrides", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-source-docs-"));
  try {
    const file = path.join(root, "debug.ts");
    const unit = unitRecord({
      id: "m::internal/debug/debug.go::func::Fail",
      kind: "func",
      qualifiedName: "Fail",
      goPath: "internal/debug/debug.go",
      sigHash: testSigHash,
      bodyHash: testBodyHash,
      snippet: "func Fail() {\n\tpanic(\"fail\")\n}",
    });
    writeFileSync(file, `/**
 * @tsgo-unit {"id":"${unit.id}","kind":"func","status":"implemented","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"test"}
 *
 * Go source:
 * func OldFail() {}
 */
export function Fail(): void {}
`);

    const first = buildEmbeddedGoSourceUpdates(snapshotWith([fileRecord({ units: [unit] })]), root);
    assert.equal(first.unitCount, 1);
    assert.equal(first.updates.length, 1);
    assert.match(first.updates[0].text, /@tsgo-override/);
    assert.match(first.updates[0].text, /\* func Fail\(\) \{\n \* \tpanic\("fail"\)\n \* \}/);

    writeFileSync(file, first.updates[0].text);
    assert.equal(buildEmbeddedGoSourceUpdates(snapshotWith([fileRecord({ units: [unit] })]), root).unitCount, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeTextSafely refuses to overwrite edited files without force", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/porter-test-"));
  try {
    const target = path.join(root, "draft.json");
    assert.equal(writeTextSafely(target, "one\n", { label: "test artifact" }), "written");
    assert.equal(writeTextSafely(target, "one\n", { label: "test artifact" }), "unchanged");
    assert.throws(
      () => writeTextSafely(target, "two\n", { label: "test artifact" }),
      /refusing to overwrite existing test artifact/,
    );
    assert.equal(writeTextSafely(target, "two\n", { label: "test artifact", force: true }), "written");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("renderStub rejects non-portable unit kinds", () => {
  assert.throws(
    () => renderStub(unitRecord({ kind: "importGroup" })),
    /cannot render scaffold for non-portable Go unit kind 'importGroup'/,
  );
});

test("renderUnitGroup emits typed generic method skeletons with Go result tuples", () => {
  const orderedMapType = unitRecord({
    id: "m::internal/collections/ordered_map.go::type::OrderedMap",
    kind: "type",
    name: "OrderedMap",
    qualifiedName: "OrderedMap",
    goPath: "internal/collections/ordered_map.go",
    typeKind: "struct",
    typeParameterDetails: [
      { name: "K", constraint: identType("comparable") },
      { name: "V", constraint: identType("any") },
    ],
    members: [
      { kind: "field", name: "keys", typeExpr: sliceType(identType("K")) },
      { kind: "field", name: "mp", typeExpr: mapType(identType("K"), identType("V")) },
    ],
  });
  const getMethod = unitRecord({
    id: "m::internal/collections/ordered_map.go::method::OrderedMap.Get",
    kind: "method",
    name: "Get",
    qualifiedName: "OrderedMap.Get",
    receiver: "OrderedMap",
    receiverMode: "pointer",
    receiverType: pointerType(instantiationType(identType("OrderedMap"), [identType("K"), identType("V")])),
    goPath: "internal/collections/ordered_map.go",
    parameters: [{ names: ["key"], type: identType("K") }],
    results: [{ type: identType("V") }, { type: identType("bool") }],
  });
  const text = renderUnitGroup(
    baseConfig,
    snapshotWith([fileRecord({ path: "internal/collections/ordered_map.go", units: [orderedMapType, getMethod] })]),
    "packages/tsts/src/internal/collections/ordered_map.ts",
    [orderedMapType, getMethod],
  );
  assert.match(text, /import type \{ bool \} from "..\/..\/go\/scalars\.js";/);
  assert.match(text, /import type \{ GoComparable, GoMap, GoPtr, GoSlice \}/);
  assert.match(text, /export interface OrderedMap<K extends GoComparable = unknown, V = unknown>/);
  assert.match(text, /export function OrderedMap_Get<K, V>\(receiver: GoPtr<OrderedMap<K, V>>, key: K\): \[V, bool\]/);
});
