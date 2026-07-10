import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

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
  collectTypeScriptFileMechanicalRisks,
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
    {
      status: "implemented",
      implementationBody: "{ const [text] = json_Marshal(value); debug(JSON.stringify(metadata)); return text; }",
      implementationAnalysis: { calls: [
        { text: "json_Marshal", terminal: "json_Marshal", importedName: "Marshal", moduleFile: "/repo/packages/tsts/src/internal/json/json.ts", argumentCalls: [] },
        { text: "JSON.stringify", terminal: "stringify", importedName: undefined, moduleFile: undefined, argumentCalls: [] },
      ] },
    },
  );
  assert.deepEqual(correctMarshalWithUnrelatedStringify, []);

  const aliasedMarshal = collectMechanicalPortRisks(
    unitRecord({ externalRefs: [{ importPath: "encoding/json", name: "Marshal", role: "call" }], nodeKindCounts: { CallExpr: 1 } }),
    {
      status: "implemented",
      implementationBody: "{ return GoMarshal(value); }",
      implementationAnalysis: { calls: [{ text: "GoMarshal", terminal: "GoMarshal", importedName: "Marshal", moduleFile: "/repo/packages/tsts/src/internal/json/json.ts", argumentCalls: [] }] },
    },
  );
  assert.deepEqual(aliasedMarshal, []);

  const sameNameWrongModule = collectMechanicalPortRisks(
    unitRecord({ externalRefs: [{ importPath: "encoding/json", name: "Marshal", role: "call" }], nodeKindCounts: { CallExpr: 1 } }),
    {
      status: "implemented",
      implementationBody: "{ fakeMarshal(value); return JSON.stringify(value); }",
      implementationAnalysis: { calls: [
        { text: "fakeMarshal", terminal: "fakeMarshal", importedName: "Marshal", moduleFile: "/repo/packages/tsts/src/testing/fake-json.ts", argumentCalls: [] },
        { text: "JSON.stringify", terminal: "stringify", importedName: undefined, moduleFile: undefined, argumentCalls: [] },
      ] },
    },
  );
  assert.deepEqual(sameNameWrongModule.map((risk) => risk.kind), ["json-marshal-substitution"]);

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

test("nil return, defer, and concurrency risks require structural semantic evidence", () => {
  const nilReturning = unitRecord({
    results: [{ type: sliceType(identType("int")) }],
    returnFacts: [{ line: 3, results: [{ kind: "nil" }] }],
  });
  const normalized = collectMechanicalPortRisks(nilReturning, {
    status: "implemented",
    implementationBody: "{ return value ?? []; }",
    returnSemantics: { paths: [{ kind: "normalization-empty-array" }] },
  });
  assert.deepEqual(normalized.map((risk) => risk.kind), ["nil-return-normalized"]);

  const preserved = collectMechanicalPortRisks(nilReturning, {
    status: "implemented",
    implementationBody: "{ return undefined; }",
    returnSemantics: { paths: [{ kind: "nil" }] },
  });
  assert.deepEqual(preserved, []);

  const nonNilEmpty = collectMechanicalPortRisks(unitRecord({
    results: [{ type: sliceType(identType("int")) }],
    returnFacts: [{ line: 3, results: [{ kind: "make-empty-slice" }] }],
  }), {
    status: "implemented",
    implementationBody: "{ return []; }",
    returnSemantics: { paths: [{ kind: "empty-array" }] },
  });
  assert.deepEqual(nonNilEmpty, []);

  const exactOverride = collectMechanicalPortRisks(nilReturning, {
    status: "implemented",
    implementationBody: "{ return []; }",
    returnSemantics: { paths: [{ kind: "empty-array" }] },
    override: { allow: ["body", "signature"], reason: "The target representation intentionally materializes a nonnil result under an exact contract." },
  });
  assert.deepEqual(exactOverride, []);

  const trailingCleanup = collectMechanicalPortRisks(unitRecord({ featureCounts: { deferStmt: 1 } }), {
    status: "implemented",
    implementationBody: "{ acquire(); cleanup(); }",
    exceptionSafeCleanup: { cleanupCalls: 0, finallyBlocks: 0 },
  });
  assert.deepEqual(trailingCleanup.map((risk) => risk.kind), ["defer-cleanup-not-exception-safe"]);

  const finallyCleanup = collectMechanicalPortRisks(unitRecord({ featureCounts: { deferStmt: 1 } }), {
    status: "implemented",
    implementationBody: "{ try { acquire(); } finally { cleanup(); } }",
    exceptionSafeCleanup: { cleanupCalls: 1, finallyBlocks: 1 },
  });
  assert.deepEqual(finallyCleanup, []);

  const vanishedConcurrency = collectMechanicalPortRisks(unitRecord({ featureCounts: { goStmt: 1, selectStmt: 1, sendStmt: 1 } }), {
    status: "implemented",
    implementationBody: "{ run(); }",
    implementationAnalysis: { calls: [{ text: "run", terminal: "run", importedName: undefined, moduleFile: undefined, argumentCalls: [] }] },
  });
  assert.deepEqual(vanishedConcurrency.map((risk) => risk.kind), ["goroutine-semantics-unproven", "select-semantics-missing", "channel-send-semantics-missing"]);
});

test("asserted Go zero risks recognize every void expression and intrinsic undefined only", () => {
  const source = ts.createSourceFile("zero.ts", `
const a = undefined as unknown as Map<string, string>;
const b = undefined!;
const c = <never>null;
const d = (void 0 as unknown) as string;
const e = void sideEffect() as string;
const f = void 1 as string;
const g = (void (0)) as string;
const h = undefined;
const i = (undefined);
const j = value as string;
function shadowed(undefined: string): string { return undefined as string; }
function locallyShadowed(): string { const undefined = "value"; return undefined as string; }
try {} catch (undefined) { undefined as Error; }
`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const risks = collectTypeScriptFileMechanicalRisks(source);
  assert.equal(risks.length, 7);
  assert.deepEqual(risks.map((risk) => risk.kind), Array(7).fill("asserted-go-zero"));
  assert.deepEqual(risks.map((risk) => risk.line), [2, 3, 4, 5, 6, 7, 8]);
});

test("buildStatus gates asserted Go zeros only inside active port units", () => {
  const active = unitRecord({
    id: "m::internal/debug/debug.go::func::Active",
    name: "Active",
    qualifiedName: "Active",
    sigHash: "sig-active",
    bodyHash: "body-active",
    snippet: "func Active() {}",
  });
  const inactive = unitRecord({
    id: "m::internal/debug/debug_test.go::func::Inactive",
    name: "Inactive",
    qualifiedName: "Inactive",
    goPath: "internal/debug/debug_test.go",
    sigHash: "sig-inactive",
    bodyHash: "body-inactive",
    snippet: "func Inactive() {}",
  });
  const risk = {
    kind: "asserted-go-zero",
    line: 10,
    column: 3,
    message: "asserted Go zero",
  };
  const status = buildStatus(
    baseConfig,
    snapshotWith([
      fileRecord({ path: "internal/debug/debug.go", units: [active] }),
      fileRecord({ path: "internal/debug/debug_test.go", units: [inactive] }),
    ]),
    {
      fileCount: 3,
      files: [
        { path: "packages/tsts/src/internal/debug/debug.ts", metadataCount: 1, sourceRisks: [risk] },
        { path: "packages/tsts/src/internal/debug/debug_test.ts", metadataCount: 1, sourceRisks: [risk] },
        { path: "packages/tsts/src/extensions/host.ts", metadataCount: 0, sourceRisks: [risk] },
      ],
      units: [
        { id: active.id, kind: active.kind, path: "packages/tsts/src/internal/debug/debug.ts", status: "implemented", sigHash: active.sigHash, bodyHash: active.bodyHash, mechanicalRisks: [risk] },
        { id: inactive.id, kind: inactive.kind, path: "packages/tsts/src/internal/debug/debug_test.ts", status: "implemented", sigHash: inactive.sigHash, bodyHash: inactive.bodyHash, mechanicalRisks: [risk] },
      ],
    },
  );

  assert.equal(status.counts.mechanicalPortRisks, 1);
  assert.deepEqual(status.mechanicalRisks.map((entry) => entry.id), [active.id]);
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
export function Fail(): void { const hidden = undefined as never; const text = ${JSON.stringify(longLiteral)}; if (text === "}") return; tailMarker(); void hidden; }
export const unrelated = void 2 as never;
`,
    );
    writeFileSync(path.join(root, "internal/debug/helper.ts"), "export const helper = void 1 as never;\n");
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
    assert.equal(result.units[0].mechanicalRisks.length, 1);
    const debugFile = result.files.find((file) => file.path.endsWith("debug.ts"));
    const helperFile = result.files.find((file) => file.path.endsWith("helper.ts"));
    assert.equal(debugFile.metadataCount, 1);
    assert.equal(debugFile.sourceRisks.length, 2);
    assert.equal(helperFile.metadataCount, 0);
    assert.equal(helperFile.sourceRisks.length, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits attributes every value-group declaration without claiming helpers", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-group-risks-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    writeFileSync(path.join(root, "internal/debug/debug.ts"), `
/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::constGroup::First+Second","kind":"constGroup","status":"implemented","sigHash":"${"a".repeat(64)}","bodyHash":"${"b".repeat(64)}"}
 *
 * Go source:
 * const ( First = 1; Second = 2 )
 */
export const helper = undefined as never;
export const First = 1;
export const Second = void sideEffect() as never;
`);

    const result = scanTsUnits(root);
    assert.equal(result.units[0].mechanicalRisks.length, 1);
    assert.equal(result.units[0].mechanicalRisks[0].line, 10);
    assert.equal(result.files[0].sourceRisks.length, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits assigns mechanical risks through symbol-resolved helper dependencies", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-helper-risks-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    writeFileSync(path.join(root, "internal/debug/helper.ts"), `
export function helper(): number {
  return undefined as never;
}
export function unrelated(): number {
  return void 1 as never;
}
`);
    writeFileSync(path.join(root, "internal/debug/debug.ts"), `
import { helper } from "./helper.js";
/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::func::Run","kind":"func","status":"implemented","sigHash":"${"a".repeat(64)}","bodyHash":"${"b".repeat(64)}"}
 *
 * Go source:
 * func Run() int { return helper() }
 */
export function Run(): number { return helper(); }
`);

    const result = scanTsUnits(root);
    assert.deepEqual(result.units[0].mechanicalRisks.map((risk) => risk.kind), ["asserted-go-zero"]);
    assert.match(result.units[0].mechanicalRiskBody, /function helper/);
    assert.doesNotMatch(result.units[0].mechanicalRiskBody, /function unrelated/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("strict verification rejects helper-transitive nil-to-empty normalization", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-nil-normalization-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    writeFileSync(path.join(root, "internal/debug/debug.ts"), `
function normalized(value: number[] | undefined): number[] {
  if (value !== undefined) return value;
  return [];
}
/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::func::Read","kind":"func","status":"implemented","sigHash":"${"a".repeat(64)}","bodyHash":"${"b".repeat(64)}"}
 *
 * Go source:
 * func Read() []int { return nil }
 */
export function Read(): number[] { return normalized(undefined); }
`);
    const tsUnits = scanTsUnits(root);
    const goUnit = unitRecord({
      id: "m::internal/debug/debug.go::func::Read",
      name: "Read",
      qualifiedName: "Read",
      sigHash: "a".repeat(64),
      bodyHash: "b".repeat(64),
      snippet: "func Read() []int { return nil }",
      results: [{ type: sliceType(identType("int")) }],
      returnFacts: [{ line: 1, results: [{ kind: "nil" }] }],
    });
    assert.deepEqual(
      collectMechanicalPortRisks(goUnit, tsUnits.units[0]).map((risk) => risk.kind),
      ["nil-return-normalized"],
      JSON.stringify(tsUnits.units[0].returnSemantics),
    );
    const config = { ...baseConfig, tsRoot: path.relative(repoRoot, root).split(path.sep).join("/") };
    const status = buildStatus(config, snapshotWith([fileRecord({ units: [goUnit] })]), tsUnits);
    assert.deepEqual(status.mechanicalRisks.map((risk) => risk.kind), ["nil-return-normalized"]);
    assert.ok(collectVerifyFailures(status, { "strict-port": true }).some((failure) => failure.includes("mechanical port risks")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("implementation call identities follow the selected import symbol, not a shadowing name", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-call-identities-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    writeFileSync(path.join(root, "internal/debug/facade.ts"), "export function Split(value: string): string { return value; }\n");
    writeFileSync(path.join(root, "internal/debug/debug.ts"), `
import { Split as path_Split } from "./facade.js";
/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::func::Run","kind":"func","status":"implemented","sigHash":"${"a".repeat(64)}","bodyHash":"${"b".repeat(64)}"}
 *
 * Go source:
 * func Run() {}
 */
export function Run(): void {
  path_Split("imported");
  const invoke = (path_Split: (value: string) => string): string => path_Split("shadowed");
  void invoke;
}
`);

    const result = scanTsUnits(root);
    const splitCalls = result.units[0].implementationAnalysis.calls.filter((call) => call.terminal === "path_Split");
    assert.equal(splitCalls.length, 2);
    assert.equal(splitCalls.filter((call) => call.importedName === "Split").length, 1);
    assert.match(splitCalls.find((call) => call.importedName === "Split").moduleFile, /\/internal\/debug\/facade\.ts$/);
    assert.equal(splitCalls.find((call) => call.importedName === undefined).moduleFile, undefined);
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
