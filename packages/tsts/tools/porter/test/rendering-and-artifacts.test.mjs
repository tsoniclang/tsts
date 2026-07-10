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

test("renderUnitGroup emits higher-order function and inline interface signatures", () => {
  const nodeAssert = unitRecord({
    id: "m::internal/debug/debug.go::func::FailBadSyntaxKind",
    kind: "func",
    name: "FailBadSyntaxKind",
    qualifiedName: "FailBadSyntaxKind",
    goPath: "internal/debug/debug.go",
    parameters: [
      {
        names: ["node"],
        type: interfaceType([
          { kind: "method", name: "KindString", typeExpr: funcType([], [{ type: identType("string") }]) },
        ]),
      },
      { names: ["message"], type: identType("any"), variadic: true },
    ],
  });
  const diffFunc = unitRecord({
    id: "m::internal/collections/ordered_map.go::func::DiffOrderedMapsFunc",
    kind: "func",
    name: "DiffOrderedMapsFunc",
    qualifiedName: "DiffOrderedMapsFunc",
    goPath: "internal/collections/ordered_map.go",
    typeParameterDetails: [
      { name: "K", constraint: identType("comparable") },
      { name: "V", constraint: identType("any") },
    ],
    parameters: [
      { names: ["equalValues"], type: funcType([{ names: ["a"], type: identType("V") }, { names: ["b"], type: identType("V") }], [{ type: identType("bool") }]) },
      { names: ["onAdded"], type: funcType([{ names: ["key"], type: identType("K") }, { names: ["value"], type: identType("V") }], []) },
    ],
  });
  const debugText = renderUnitGroup(
    baseConfig,
    snapshotWith([fileRecord({ path: "internal/debug/debug.go", units: [nodeAssert] })]),
    "packages/tsts/src/internal/debug/debug.ts",
    [nodeAssert],
  );
  const diffText = renderUnitGroup(
    baseConfig,
    snapshotWith([fileRecord({ path: "internal/collections/ordered_map.go", units: [diffFunc] })]),
    "packages/tsts/src/internal/collections/ordered_map.ts",
    [diffFunc],
  );
  assert.match(debugText, /node: \{ KindString: \(\) => string \}, \.\.\.message: Array<unknown>/);
  assert.match(diffText, /equalValues: \(a: V, b: V\) => bool/);
  assert.match(diffText, /onAdded: \(key: K, value: V\) => void/);
});

test("renderUnitGroup resolves Go external types through generated facades", () => {
  const diagnosticWriter = unitRecord({
    id: "m::internal/diagnosticwriter/diagnosticwriter.go::func::WriteFlattenedDiagnosticMessage",
    kind: "func",
    name: "WriteFlattenedDiagnosticMessage",
    qualifiedName: "WriteFlattenedDiagnosticMessage",
    goPath: "internal/diagnosticwriter/diagnosticwriter.go",
    parameters: [
      { names: ["writer"], type: selectorType("io", "Writer") },
      { names: ["opts"], type: sliceType(selectorType("json", "Options")), variadic: true },
    ],
  });
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/diagnosticwriter/diagnosticwriter.go",
      importPath: "github.com/microsoft/typescript-go/internal/diagnosticwriter",
      imports: [
        { path: "io" },
        { name: "json", path: "github.com/go-json-experiment/json" },
      ],
      units: [diagnosticWriter],
    }),
  ]);
  const text = renderUnitGroup(
    baseConfig,
    snapshot,
    "packages/tsts/src/internal/diagnosticwriter/diagnosticwriter.ts",
    [diagnosticWriter],
  );

  assert.match(text, /import type \{ Writer \} from "\.\.\/\.\.\/go\/io\.js";/);
  assert.match(text, /import type \{ Options \} from "\.\.\/\.\.\/go\/github\.com\/go-json-experiment\/json\.js";/);
  assert.match(text, /writer: Writer/);
  assert.match(text, /\.\.\.opts: Options\[\]/);
  assert.doesNotMatch(text, /GoExternal/);
});

test("renderUnitGroup imports symbols from semantic split targets", () => {
  const checkerType = unitRecord({
    id: "m::internal/checker/checker.go::type::Checker",
    kind: "type",
    name: "Checker",
    qualifiedName: "Checker",
    goPath: "internal/checker/checker.go",
    typeKind: "struct",
  });
  const emitResolverFactory = unitRecord({
    id: "m::internal/checker/emitresolver.go::func::NewEmitResolver",
    kind: "func",
    name: "NewEmitResolver",
    qualifiedName: "NewEmitResolver",
    goPath: "internal/checker/emitresolver.go",
    parameters: [
      { names: ["checker"], type: selectorType("checker", "Checker") },
    ],
  });
  const config = {
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/checker/checker.go": {
          targetRoot: "packages/tsts/src/internal/checker/checker",
          targets: [
            {
              file: "state.ts",
              description: "Checker state",
              declarations: ["type::Checker"],
            },
          ],
        },
      },
    },
  };
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/checker/checker.go",
      importPath: "github.com/microsoft/typescript-go/internal/checker",
      lineCount: 6000,
      units: [checkerType],
    }),
    fileRecord({
      path: "internal/checker/emitresolver.go",
      importPath: "github.com/microsoft/typescript-go/internal/checker",
      imports: [{ name: "checker", path: "github.com/microsoft/typescript-go/internal/checker" }],
      units: [emitResolverFactory],
    }),
  ]);
  const splitStatus = buildLargeFileSplitStatus(config, snapshot);
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/checker/emitresolver.ts",
    [emitResolverFactory],
    { largeFileSplits: splitStatus },
  );

  assert.match(text, /import type \{ Checker \} from "\.\/checker\/state\.js";/);
  assert.doesNotMatch(text, /from "\.\/checker\.js"/);
});

test("renderUnitGroup uses extractor-provided inferred value types", () => {
  const kindType = unitRecord({
    id: "m::internal/ast/kind_generated.go::type::Kind",
    kind: "type",
    name: "Kind",
    qualifiedName: "Kind",
    goPath: "internal/ast/kind_generated.go",
    typeKind: "named",
    typeExpression: identType("int32"),
  });
  const values = unitRecord({
    id: "m::internal/api/proto.go::constGroup::handlePrefixProject+limit",
    kind: "constGroup",
    name: "handlePrefixProject+limit",
    qualifiedName: "handlePrefixProject+limit",
    goPath: "internal/api/proto.go",
    valueSpecs: [
      { names: ["handlePrefixProject"], values: ["'p'"], inferredValueTypes: [identType("rune")] },
      { names: ["limit"], values: ["iota * 4"], inferredValueTypes: [identType("int")] },
    ],
  });
  const kindBounds = unitRecord({
    id: "m::internal/ast/kind_generated.go::constGroup::KindEqualsToken+KindFirstAssignment",
    kind: "constGroup",
    name: "KindEqualsToken+KindFirstAssignment",
    qualifiedName: "KindEqualsToken+KindFirstAssignment",
    goPath: "internal/ast/kind_generated.go",
    valueSpecs: [
      { names: ["KindEqualsToken"], type: identType("Kind"), values: ["iota"], inferredValueTypes: [identType("int")] },
      { names: ["KindFirstAssignment"], values: ["KindEqualsToken"] },
    ],
  });
  const channels = unitRecord({
    id: "m::internal/scanner/scanner.go::varGroup::done+factory+err",
    kind: "varGroup",
    name: "done+factory+err",
    qualifiedName: "done+factory+err",
    goPath: "internal/scanner/scanner.go",
    valueSpecs: [
      { names: ["done"], values: ["make(chan int)"], inferredValueTypes: [channelType(identType("int"))] },
      { names: ["factory"], values: ["func(x int) string { return \"\" }"], inferredValueTypes: [funcType([{ names: ["x"], type: identType("int") }], [{ type: identType("string") }])] },
      { names: ["err"], values: ["errors.New(\"boom\")"], inferredValueTypes: [identType("error")] },
    ],
  });
  const text = renderUnitGroup(
    baseConfig,
    snapshotWith([fileRecord({ path: "internal/api/proto.go", importPath: "github.com/microsoft/typescript-go/internal/ast", units: [kindType, values, kindBounds, channels] })]),
    "packages/tsts/src/internal/ast/kind_generated.ts",
    [kindType, values, kindBounds, channels],
  );

  assert.match(text, /export const handlePrefixProject: GoRune = undefined as never;/);
  assert.match(text, /export const limit: int = undefined as never;/);
  assert.match(text, /export const KindEqualsToken: Kind = undefined as never;/);
  assert.match(text, /export const KindFirstAssignment: Kind = undefined as never;/);
  assert.match(text, /export let done: GoChan<int, "bidirectional"> = undefined as never;/);
  assert.match(text, /export let factory: \(x: int\) => string = undefined as never;/);
  assert.match(text, /export let err: GoError = undefined as never;/);
});

test("renderExternalFacadeModules generates canonical facade modules for observed externals", () => {
  const unit = unitRecord({
    id: "m::internal/json/json.go::func::MarshalWrite",
    kind: "func",
    name: "MarshalWrite",
    qualifiedName: "MarshalWrite",
    goPath: "internal/json/json.go",
    parameters: [
      { names: ["writer"], type: selectorType("io", "Writer") },
      { names: ["option"], type: selectorType("json", "Options") },
    ],
    externalRefs: [
      { importPath: "path/filepath", package: "filepath", name: "Join", role: "call", count: 1 },
      { importPath: "os", package: "os", name: "PathSeparator", role: "value", count: 1 },
    ],
  });
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/json/json.go",
      importPath: "github.com/microsoft/typescript-go/internal/json",
      imports: [
        { path: "io" },
        { name: "json", path: "github.com/go-json-experiment/json" },
      ],
      units: [unit],
    }),
  ]);

  const facades = buildExternalFacadeMap(baseConfig, snapshot);
  assert.equal(facades.get("io.Writer").tsModule, "go/io.ts");
  assert.equal(facades.get("github.com/go-json-experiment/json.Options").tsModule, "go/github.com/go-json-experiment/json.ts");
  assert.equal(facades.get("path/filepath.Join").kind, "functionValue");
  assert.equal(facades.get("os.PathSeparator").kind, "value");

  const modules = renderExternalFacadeModules(baseConfig, snapshot);
  assert.match(modules.get("go/io.ts"), /export interface Writer/);
  assert.match(modules.get("go/io.ts"), /Write\(p: GoSlice<byte>\): \[int, GoError\]/);
  assert.match(modules.get("go/time.ts"), /export type Duration = long;/);
  assert.match(modules.get("go/github.com/go-json-experiment/json.ts"), /export interface Options/);
  assert.match(modules.get("go/path/filepath.ts"), /export function Join\(\.\.\.args: Array<unknown>\): unknown/);
  assert.match(modules.get("go/os.ts"), /export const PathSeparator: unknown = undefined as never;/);
  assert.doesNotMatch(modules.get("go/github.com/go-json-experiment/json.ts"), /GoExternal/);
});

test("renderExpectedGeneratedArtifacts embeds deterministic generated metadata", () => {
  const snapshot = snapshotWith([]);
  const artifacts = renderExpectedGeneratedArtifacts(baseConfig, snapshot);
  const scalars = artifacts.get("packages/tsts/src/go/scalars.ts");
  assert.match(scalars, /^\/\/ Code generated by TSTS porter\. DO NOT EDIT\./);
  assert.match(scalars, /\/\/ @tsgo-generated {"schemaVersion":1,"kind":"go-scalars","generator":"porter:facades","sourceRevision":"abc123","path":"go\/scalars\.ts","contentHash":"[a-f0-9]{64}"}/);
  assert.match(scalars, /export type int = number;/);
  const compat = artifacts.get("packages/tsts/src/go/compat.ts");
  assert.match(compat, /^\/\/ Code generated by TSTS porter\. DO NOT EDIT\./);
  assert.match(compat, /\/\/ @tsgo-generated {"schemaVersion":1,"kind":"go-compat","generator":"porter:facades","sourceRevision":"abc123","path":"go\/compat\.ts","contentHash":"[a-f0-9]{64}"}/);
  assert.match(compat, /export class GoStructMap<K, V> implements Map<K, V>/);
  assert.match(compat, /export function NewGoStructMap<K, V>\(\): GoStructMap<K, V>/);
  assert.match(compat, /export function MakeGoChan<T>\(capacity = 0, zeroValue: \(\) => T/);
  assert.match(compat, /export function GoChanSelect\(cases: readonly GoChanSelectCase\[\]\)/);
  assert.match(compat, /export function GoChanAsReceive<T>\(channel: GoChan<T>\): GoChan<T, "receive">/);
  assert.match(compat, /export function GoChanAsSend<T>\(channel: GoChan<T>\): GoChan<T, "send">/);
  assert.match(compat, /export function GoChanTrySend<T>\(channel: GoChan<T, string>, value: T\): bool/);
  assert.match(compat, /export function GoChanReceive<T>\(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>\): \(\) => void/);
  assert.match(compat, /export function GoChanClose<T>\(channel: GoChan<T, string>\): void/);
});

test("external value facades render explicit host-native initializers from policy", () => {
  const config = {
    ...baseConfig,
    externalFacadePolicies: [
      {
        goName: "syscall.SIGINT",
        tsModule: "go/syscall.ts",
        tsName: "SIGINT",
        kind: "value",
        arity: 0,
        tsInitializer: '"SIGINT"',
      },
    ],
  };
  const snapshot = snapshotWith([
    fileRecord({
      path: "cmd/tool/main.go",
      importPath: "example/tool",
      units: [unitRecord({ externalRefs: [{ importPath: "syscall", name: "SIGINT", role: "value", count: 1 }] })],
    }),
  ]);
  assert.match(renderExternalFacadeModules(config, snapshot).get("go/syscall.ts"), /export const SIGINT = "SIGINT";/);

  assert.throws(
    () => buildExternalFacadeMap({
      ...baseConfig,
      externalFacadePolicies: [{ goName: "syscall.Signal", kind: "functionValue", tsInitializer: '"wrong"' }],
    }, snapshotWith([])),
    /may declare tsInitializer only when kind is 'value'/,
  );
});

test("buildGeneratedArtifactStatus catches missing, stale, orphan, untracked, and invalid generated files", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/porter-test-"));
  try {
    const config = { ...baseConfig, tsRoot: path.relative(repoRoot, path.join(root, "src")).split(path.sep).join("/") };
    const snapshot = snapshotWith([]);
    const generatedRoot = path.join(root, "src/go");
    mkdirSync(generatedRoot, { recursive: true });
    for (const [relativePath, text] of renderExpectedGeneratedArtifacts(config, snapshot)) {
      const targetPath = path.join(repoRoot, relativePath);
      mkdirSync(path.dirname(targetPath), { recursive: true });
      writeFileSync(targetPath, text);
    }
    let clean = buildGeneratedArtifactStatus(config, snapshot);
    assert.deepEqual(clean, { missing: [], stale: [], orphan: [], untracked: [], invalid: [], unresolved: [] });

    writeFileSync(
      path.join(generatedRoot, "compat.ts"),
      renderExpectedGeneratedArtifacts(config, snapshot).get(`${config.tsRoot}/go/compat.ts`).replace(/\n$/, "\nexport const edited = true;\n"),
    );
    writeFileSync(path.join(generatedRoot, "manual.ts"), "export const manual = true;\n");
    writeFileSync(path.join(generatedRoot, "bad.ts"), "// Code generated by TSTS porter. DO NOT EDIT.\n// @tsgo-generated {bad-json}\n\nexport {}\n");
    writeFileSync(path.join(generatedRoot, "orphan.ts"), renderExpectedGeneratedArtifacts(config, snapshot).get(`${config.tsRoot}/go/compat.ts`));
    rmSync(path.join(generatedRoot, "io.ts"), { force: true });

    const broken = buildGeneratedArtifactStatus(config, snapshot);
    assert.equal(broken.missing.length, 1);
    assert.equal(broken.stale.length, 1);
    assert.equal(broken.orphan.length, 1);
    assert.equal(broken.untracked.length, 1);
    assert.equal(broken.invalid.length, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("bundled-generator catches missing, stale, orphan, untracked, and invalid generated files", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/bundled-test-"));
  try {
    const sourceRoot = path.relative(repoRoot, path.join(root, "vendor")).split(path.sep).join("/");
    const tsRoot = path.relative(repoRoot, path.join(root, "src")).split(path.sep).join("/");
    const libSource = path.join(root, "vendor/internal/bundled/libs");
    mkdirSync(libSource, { recursive: true });
    writeFileSync(path.join(libSource, "lib.one.d.ts"), "declare const one: 1;\n");
    const config = { ...baseConfig, sourceRoot, tsRoot };

    const missing = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.deepEqual(collectBundledArtifactFailures(missing), ["3 missing bundled artifacts"]);
    assert.equal(writeBundledGenerated(config, "rev"), 3);

    const clean = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.deepEqual(clean, { missing: [], stale: [], orphan: [], untracked: [], invalid: [] });
    const expected = buildExpectedBundledArtifacts(config, "rev");
    assert.match(expected.get(`${tsRoot}/internal/bundled/libs_generated.ts`), /"path":"internal\/bundled\/libs_generated\.ts"/);

    writeFileSync(
      path.join(root, "src/internal/bundled/embed_generated.ts"),
      expected.get(`${tsRoot}/internal/bundled/embed_generated.ts`).replace(/\["libs\/lib\.one\.d\.ts", \d+\]/, '["libs/lib.one.d.ts", 999]'),
    );
    const stale = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.equal(stale.stale.length, 1);

    writeBundledGenerated(config, "rev");
    unlinkSync(path.join(root, "src/internal/bundled/libs/lib.one.d.ts"));
    const missingLib = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.equal(missingLib.missing.length, 1);

    writeBundledGenerated(config, "rev");
    writeFileSync(path.join(root, "src/internal/bundled/libs/extra.d.ts"), "not generated\n");
    const untracked = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.equal(untracked.untracked.length, 1);

    writeBundledGenerated(config, "rev");
    writeFileSync(
      path.join(root, "src/internal/bundled/libs/extra.d.ts"),
      '// Code generated by TSTS bundled generator. DO NOT EDIT.\n// @tsgo-generated {"schemaVersion":1,"kind":"bundled-generated","generator":"porter:bundled","sourceRevision":"rev","path":"internal/bundled/libs/extra.d.ts","contentHash":"x"}\n\n',
    );
    const orphan = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.equal(orphan.orphan.length, 1);

    writeBundledGenerated(config, "rev");
    writeFileSync(path.join(root, "src/internal/bundled/libs/extra.d.ts"), "// @tsgo-generated {bad-json}\n");
    const invalid = buildBundledGeneratedArtifactStatus(config, "rev");
    assert.equal(invalid.invalid.length, 1);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});

test("authoredFacadeModules: authored modules are excluded from generation and exempt from generated checks", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/porter-test-"));
  try {
    const config = {
      ...baseConfig,
      tsRoot: path.relative(repoRoot, path.join(root, "src")).split(path.sep).join("/"),
      authoredFacadeModules: ["go/io.ts"],
    };
    const snapshot = snapshotWith([]);
    const generatedRoot = path.join(root, "src/go");
    mkdirSync(generatedRoot, { recursive: true });

    // The policy resolves "go/io.ts" to a full repo-relative path.
    assert.ok(authoredFacadePathSet(config).has(`${config.tsRoot}/go/io.ts`));

    // io.ts is excluded from the deterministic generated set (porter:facades will not regenerate it).
    const expected = renderExpectedGeneratedArtifacts(config, snapshot);
    assert.ok(!expected.has(`${config.tsRoot}/go/io.ts`));

    for (const [relativePath, text] of expected) {
      const targetPath = path.join(repoRoot, relativePath);
      mkdirSync(path.dirname(targetPath), { recursive: true });
      writeFileSync(targetPath, text);
    }

    // A header-free authored io.ts is exempt: no missing/stale/orphan/untracked/invalid.
    writeFileSync(path.join(generatedRoot, "io.ts"), "export interface Writer { Write(p: number[]): [number, Error | undefined]; }\n");
    assert.deepEqual(buildGeneratedArtifactStatus(config, snapshot), { missing: [], stale: [], orphan: [], untracked: [], invalid: [], unresolved: [] });

    // An authored module that still carries @tsgo-generated metadata is invalid (never both).
    writeFileSync(
      path.join(generatedRoot, "io.ts"),
      "// Code generated by TSTS porter. DO NOT EDIT.\n// @tsgo-generated {\"schemaVersion\":1,\"kind\":\"go-facade\",\"generator\":\"porter:facades\",\"path\":\"go/io.ts\",\"sourceRevision\":\"abc123\",\"contentHash\":\"x\"}\n\nexport {}\n",
    );
    const conflicted = buildGeneratedArtifactStatus(config, snapshot);
    assert.equal(conflicted.invalid.length, 1);
    assert.match(conflicted.invalid[0].reason, /Authored facade module must not carry @tsgo-generated/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("generated facade status exposes active throwing dependency obligations", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/porter-obligation-test-"));
  try {
    const config = { ...baseConfig, tsRoot: path.relative(repoRoot, path.join(root, "src")).split(path.sep).join("/") };
    const snapshot = snapshotWith([fileRecord({
      path: "internal/tool/tool.go",
      units: [unitRecord({ externalRefs: [{ importPath: "example.com/native", name: "Run", role: "call", count: 1 }] })],
    })]);
    for (const [relativePath, text] of renderExpectedGeneratedArtifacts(config, snapshot)) {
      const targetPath = path.join(repoRoot, relativePath);
      mkdirSync(path.dirname(targetPath), { recursive: true });
      writeFileSync(targetPath, text);
    }
    const status = buildGeneratedArtifactStatus(config, snapshot);
    assert.deepEqual(status.unresolved.map((entry) => entry.symbol), ["example.com/native.Run"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
