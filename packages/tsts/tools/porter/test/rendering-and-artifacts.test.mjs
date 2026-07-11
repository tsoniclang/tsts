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
  collectVerifyFailures,
  expectedTsPath,
  matchGlob,
  policyFor,
  renderExpectedGeneratedArtifacts,
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
  interfaceType,
  semanticFunctionDeclaration,
  selectorType,
  sliceType,
  snapshotWith,
  testBodyHash,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("renderUnitGroup emits higher-order function and inline interface signatures", () => {
  const config = { ...baseConfig, goModulePath: "m" };
  const debugPackage = "m/internal/debug";
  const debugOwner = `${debugPackage}::func::FailBadSyntaxKind`;
  const kindOwner = `${debugOwner}::signature::parameters::0::type`;
  const kindInterface = semanticInterfaceType([
    semanticMethod(`${kindOwner}::explicitMethod::0::KindString`, kindOwner, "KindString", [], [{ name: "", type: semanticBasicType("string") }]),
  ]);
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
    semantic: semanticFunctionFixture(debugPackage, "FailBadSyntaxKind", [
      { name: "node", type: kindInterface },
      { name: "message", type: semanticSliceType(semanticAnyType()) },
    ], { variadic: true }),
  });
  const collectionsPackage = "m/internal/collections";
  const diffOwner = `${collectionsPackage}::func::DiffOrderedMapsFunc`;
  const keyParameter = semanticTypeParameter(diffOwner, 0, "K", semanticConstraintType(true));
  const valueParameter = semanticTypeParameter(diffOwner, 1, "V");
  const keyType = semanticTypeParameterType(keyParameter.reference);
  const valueType = semanticTypeParameterType(valueParameter.reference);
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
    typeParameters: ["K", "V"],
    parameters: [
      { names: ["equalValues"], type: funcType([{ names: ["a"], type: identType("V") }, { names: ["b"], type: identType("V") }], [{ type: identType("bool") }]) },
      { names: ["onAdded"], type: funcType([{ names: ["key"], type: identType("K") }, { names: ["value"], type: identType("V") }], []) },
    ],
    semantic: semanticFunctionFixture(collectionsPackage, "DiffOrderedMapsFunc", [
      { name: "equalValues", type: semanticFunctionType(`${diffOwner}::signature::parameters::0::type`, collectionsPackage, [{ name: "a", type: valueType }, { name: "b", type: valueType }], [{ name: "", type: semanticBasicType("bool") }]) },
      { name: "onAdded", type: semanticFunctionType(`${diffOwner}::signature::parameters::1::type`, collectionsPackage, [{ name: "key", type: keyType }, { name: "value", type: valueType }], []) },
    ], { typeParameters: [keyParameter, valueParameter] }),
  });
  const debugText = renderUnitGroup(
    config,
    snapshotWith([fileRecord({ path: "internal/debug/debug.go", importPath: debugPackage, units: [nodeAssert] })]),
    "packages/tsts/src/internal/debug/debug.ts",
    [nodeAssert],
  );
  const diffText = renderUnitGroup(
    config,
    snapshotWith([fileRecord({ path: "internal/collections/ordered_map.go", importPath: collectionsPackage, units: [diffFunc] })]),
    "packages/tsts/src/internal/collections/ordered_map.ts",
    [diffFunc],
  );
  assert.match(debugText, /node: GoInterface<\{ KindString\(\): string \}>, \.\.\.message: GoInterface<unknown>\[\]/);
  assert.match(diffText, /equalValues: GoFunc<\(a: V, b: V\) => bool>/);
  assert.match(diffText, /onAdded: GoFunc<\(key: K, value: V\) => void>/);
});

test("renderUnitGroup resolves Go external types through generated facades", () => {
  const config = { ...baseConfig, goModulePath: "m" };
  const packagePath = "m/internal/diagnosticwriter";
  const optionsPackage = "example.com/options";
  const parameters = [
    { names: ["writer"], type: selectorType("io", "Writer") },
    { names: ["opts"], type: sliceType(selectorType("options", "Options")), variadic: true },
  ];
  const diagnosticWriter = unitRecord({
    id: "m::internal/diagnosticwriter/diagnosticwriter.go::func::WriteFlattenedDiagnosticMessage",
    kind: "func",
    name: "WriteFlattenedDiagnosticMessage",
    qualifiedName: "WriteFlattenedDiagnosticMessage",
    goPath: "internal/diagnosticwriter/diagnosticwriter.go",
    parameters,
    semantic: semanticFunctionFixture(packagePath, "WriteFlattenedDiagnosticMessage", [
      { name: "writer", type: semanticNamedType("io::type::Writer", "io", "Writer", true) },
      { name: "opts", type: semanticSliceType(semanticNamedType(`${optionsPackage}::type::Options`, optionsPackage, "Options")) },
    ], { variadic: true }),
  });
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/diagnosticwriter/diagnosticwriter.go",
      importPath: packagePath,
      imports: [
        { path: "io" },
        { name: "options", path: optionsPackage },
      ],
      units: [diagnosticWriter],
    }),
  ]);
  snapshot.semantic.externalDeclarations = [
    writerTypeFixture(),
    semanticTypeFixture(optionsPackage, "Options", semanticStructType([])),
  ];
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/diagnosticwriter/diagnosticwriter.ts",
    [diagnosticWriter],
  );

  assert.match(text, /import type \{ Writer \} from "\.\.\/\.\.\/go\/io\.js";/);
  assert.match(text, /import type \{ Options \} from "\.\.\/\.\.\/go\/example\.com\/options\.js";/);
  assert.match(text, /writer: GoInterface<Writer>/);
  assert.match(text, /\.\.\.opts: Options\[\]/);
  assert.doesNotMatch(text, /GoExternal/);
});

test("renderUnitGroup imports symbols from semantic split targets", () => {
  const packagePath = "m/internal/checker";
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
    semantic: semanticFunctionFixture(packagePath, "NewEmitResolver", [
      { name: "checker", type: semanticNamedType(`${packagePath}::type::Checker`, packagePath, "Checker") },
    ]),
  });
  const config = {
    ...baseConfig,
    goModulePath: "m",
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
      importPath: packagePath,
      lineCount: 6000,
      units: [checkerType],
    }),
    fileRecord({
      path: "internal/checker/emitresolver.go",
      importPath: packagePath,
      imports: [{ name: "checker", path: packagePath }],
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

test("renderUnitGroup uses canonical declaration value types", () => {
  const config = { ...baseConfig, goModulePath: "m" };
  const kindType = unitRecord({
    id: "m::internal/ast/kind_generated.go::type::Kind",
    kind: "type",
    name: "Kind",
    qualifiedName: "Kind",
    goPath: "internal/ast/kind_generated.go",
    typeKind: "named",
    typeExpression: identType("int32"),
    semantic: [semanticTypeFixture("m/internal/ast", "Kind", semanticBasicType("int32"))],
  });
  const values = withoutSyntacticValueTypes(unitRecord({
    id: "m::internal/ast/kind_generated.go::constGroup::handlePrefixProject+limit",
    kind: "constGroup",
    name: "handlePrefixProject+limit",
    qualifiedName: "handlePrefixProject+limit",
    goPath: "internal/ast/kind_generated.go",
    valueSpecs: [
      { names: ["handlePrefixProject"], type: identType("rune") },
      { names: ["limit"], type: identType("int") },
    ],
  }));
  const kindBounds = withoutSyntacticValueTypes(unitRecord({
    id: "m::internal/ast/kind_generated.go::constGroup::KindEqualsToken+KindFirstAssignment",
    kind: "constGroup",
    name: "KindEqualsToken+KindFirstAssignment",
    qualifiedName: "KindEqualsToken+KindFirstAssignment",
    goPath: "internal/ast/kind_generated.go",
    valueSpecs: [
      { names: ["KindEqualsToken"], type: identType("Kind") },
      { names: ["KindFirstAssignment"], type: identType("Kind") },
    ],
  }));
  const channels = withoutSyntacticValueTypes(unitRecord({
    id: "m::internal/ast/kind_generated.go::varGroup::done+factory+err",
    kind: "varGroup",
    name: "done+factory+err",
    qualifiedName: "done+factory+err",
    goPath: "internal/ast/kind_generated.go",
    valueSpecs: [
      { names: ["done"], type: channelType(identType("int")) },
      { names: ["factory"], type: funcType([{ names: ["x"], type: identType("int") }], [{ type: identType("string") }]) },
      { names: ["err"], type: identType("error") },
    ],
  }));
  const text = renderUnitGroup(
    config,
    snapshotWith([fileRecord({ path: "internal/ast/kind_generated.go", importPath: "m/internal/ast", units: [kindType, values, kindBounds, channels] })]),
    "packages/tsts/src/internal/ast/kind_generated.ts",
    [kindType, values, kindBounds, channels],
  );

  assert.match(text, /export const handlePrefixProject: GoRune = undefined as never;/);
  assert.match(text, /export const limit: int = undefined as never;/);
  assert.match(text, /export const KindEqualsToken: Kind = undefined as never;/);
  assert.match(text, /export const KindFirstAssignment: Kind = undefined as never;/);
  assert.match(text, /export let done: GoChan<int, "bidirectional"> = undefined as never;/);
  assert.match(text, /export let factory: GoFunc<\(x: int\) => string> = undefined as never;/);
  assert.match(text, /export let err: GoError = undefined as never;/);
});

function withoutSyntacticValueTypes(unit) {
  return {
    ...unit,
    valueSpecs: unit.valueSpecs.map(({ type: _type, ...specification }) => specification),
  };
}

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
  assert.match(compat, /export function NewGoStructMap<K, V>\(keyDescriptor: GoMapKeyDescriptor<K>\): GoStructMap<K, V>/);
  assert.match(compat, /export function GoStructKey<K, const Values extends readonly unknown\[\]>/);
  assert.match(compat, /export function GoInterfaceKey<K>/);
  assert.match(compat, /readonly identity: symbol/);
  assert.match(compat, /snapshot\(value: K\): K/);
  assert.doesNotMatch(compat, /goStructMapKey|JSON\.stringify|\.Hi\b|\.Lo\b|\.pos\b|\.end\b/);
  assert.match(compat, /export function GoInterfaceAdapter<T, I extends object>/);
  assert.match(compat, /export function GoInterfaceTryAssert<T>/);
  assert.match(compat, /export function GoInterfaceAssert<T>/);
  assert.match(compat, /export function MakeGoChan<T>\(capacity: number, zeroValue: \(\) => T\): NonNullable<GoChan<T>>/);
  assert.match(compat, /export function GoRequireNonNilAfterSuccess<T>/);
  assert.match(compat, /export function GoMapLookup<K, V>/);
  assert.match(compat, /export function GoChanSelect\(cases: readonly GoChanSelectCase\[\]\)/);
  assert.match(compat, /export function GoChanAsReceive<T>\(channel: GoChan<T>\): GoChan<T, "receive">/);
  assert.match(compat, /export function GoChanAsSend<T>\(channel: GoChan<T>\): GoChan<T, "send">/);
  assert.match(compat, /export function GoChanTrySend<T>\(channel: GoChan<T, string>, value: T\): bool/);
  assert.match(compat, /export function GoChanReceive<T>\(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>\): \(\) => void/);
  assert.match(compat, /export function GoChanClose<T>\(channel: GoChan<T, string>\): void/);
});

test("host-native source signatures create only declaration-level facade obligations", () => {
  const packagePath = "example.com/main/internal/native";
  const config = {
    ...baseConfig,
    goModulePath: "example.com/main",
    policies: [
      { match: "internal/native/**", category: "host-native", reason: "Node host boundary" },
      ...baseConfig.policies,
    ],
    externalFacadePolicies: [{
      objectId: "example.com/syscall::type::Handle",
      tsModule: "go/example.com/syscall.ts",
      tsName: "Handle",
      storageStrategy: "generated",
    }],
  };
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/native/path.go",
      importPath: packagePath,
      imports: [{ path: "example.com/syscall", packageName: "syscall" }],
      units: [unitRecord({
        id: "example.com/main::internal/native/path.go::func::Fail",
        goPath: "internal/native/path.go",
        parameters: [{ names: ["handle"], type: selectorType("syscall", "Handle") }],
        semantic: semanticFunctionDeclaration({
          name: "Fail",
          packagePath,
          parameters: [{ names: ["handle"], type: selectorType("syscall", "Handle") }],
          packages: { syscall: "example.com/syscall" },
        }),
      })],
    }),
  ]);
  snapshot.semantic.externalDeclarations = [semanticTypeFixture("example.com/syscall", "Handle", semanticBasicType("uintptr"))];

  const facades = buildExternalFacadeMap(config, snapshot);
  assert.ok(facades.has("example.com/syscall::type::Handle"), "host-native source signatures remain exact facade obligations");
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
    const orphan = renderExpectedGeneratedArtifacts(config, snapshot).get(`${config.tsRoot}/go/compat.ts`).replace('"path":"go/compat.ts"', '"path":"go/orphan.ts"');
    writeFileSync(path.join(generatedRoot, "orphan.ts"), orphan);
    rmSync(path.join(generatedRoot, "scalars.ts"), { force: true });

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

test("authoredFacadeModules require the exact public symbol while remaining excluded from generation", () => {
  const root = mkdtempSync(path.join(repoRoot, ".temp/porter-test-"));
  try {
    const config = {
      ...baseConfig,
      tsRoot: path.relative(repoRoot, path.join(root, "src")).split(path.sep).join("/"),
      authoredFacadeModules: ["go/io.ts"],
      externalFacadePolicies: [{ objectId: "io::type::Writer", tsModule: "go/io.ts", tsName: "Writer", storageStrategy: "authored" }],
    };
    const snapshot = snapshotWith([fileRecord({
      imports: [{ path: "io" }],
      units: [unitRecord({
        id: "github.com/microsoft/typescript-go::internal/debug/debug.go::func::Fail",
        parameters: [{ names: ["writer"], type: selectorType("io", "Writer") }],
        semantic: semanticFunctionFixture("github.com/microsoft/typescript-go/internal/debug", "Fail", [
          { name: "writer", type: semanticNamedType("io::type::Writer", "io", "Writer", true) },
        ]),
      })],
    })]);
    snapshot.semantic.externalDeclarations = [writerTypeFixture()];
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

    // The module path alone cannot discharge a symbol obligation.
    writeFileSync(path.join(generatedRoot, "io.ts"), "export const Other = 1;\n");
    const missingSymbol = buildGeneratedArtifactStatus(config, snapshot);
    assert.deepEqual(missingSymbol.unresolved.map((entry) => entry.symbol), ["io.Writer"]);
    assert.match(missingSymbol.unresolved[0].reason, /exact type symbol 'Writer'/);

    writeFileSync(path.join(generatedRoot, "io.ts"), "export interface Writer { Write(p: GoSlice<byte>): [int, GoError]; }\n");
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

function semanticFunctionFixture(packagePath, name, parameters, { typeParameters = [], variadic = false } = {}) {
  const objectId = `${packagePath}::func::${name}`;
  const signature = semanticSignature(`${objectId}::signature`, packagePath, parameters, [], typeParameters, variadic);
  const objectSignature = semanticSignature(`${objectId}::type`, packagePath, parameters, [], typeParameters, variadic);
  const object = { id: objectId, name, packagePath, exported: true, type: { kind: "signature", nilable: true, signature: objectSignature } };
  return [{ kind: "func", packagePath, object, signature, profiles: [0] }];
}
function semanticFunctionType(ownerId, packagePath, parameters, results) { return { kind: "signature", nilable: true, signature: semanticSignature(ownerId, packagePath, parameters, results) }; }
function semanticSignature(ownerId, packagePath, parameters, results, typeParameters = [], variadic = false) {
  const variables = (entries, role) => ({ variables: entries.map((entry, index) => ({ id: `${ownerId}::${role}::${index}`, name: entry.name, packagePath, exported: false, type: entry.type })) });
  return { receiverTypeParameters: [], typeParameters, parameters: variables(parameters, "parameters"), results: variables(results, "results"), variadic };
}
function semanticTypeParameter(ownerId, index, name, constraint = semanticAnyType()) { return { reference: { ownerId, role: "type", index, name }, constraint }; }
function semanticTypeParameterType(reference) { return { kind: "typeParameter", nilable: false, typeParameter: reference }; }
function semanticTypeFixture(packagePath, name, rhs) {
  const objectId = `${packagePath}::type::${name}`;
  const object = { id: objectId, name, packagePath, exported: true, type: semanticNamedType(objectId, packagePath, name, rhs.nilable) };
  return { kind: "type", packagePath, object, type: { alias: false, object, typeParameters: [], rhs, methods: [] }, profiles: [0] };
}
function writerTypeFixture() {
  const ownerId = "io::type::Writer::rhs";
  return semanticTypeFixture("io", "Writer", semanticInterfaceType([
    semanticMethod(`${ownerId}::explicitMethod::0::Write`, ownerId, "Write", [{ name: "p", type: semanticSliceType(semanticBasicType("byte")) }], [
      { name: "", type: semanticBasicType("int") },
      { name: "", type: semanticNamedType("builtin::type::error", "", "error", true) },
    ]),
  ]));
}
function semanticMethod(id, ownerId, name, parameters, results) {
  const packagePath = id.slice(0, id.indexOf("::"));
  return { id, ownerId, name, packagePath, exported: true, signature: semanticSignature(`${id}::signature`, packagePath, parameters, results) };
}
function semanticInterfaceType(explicitMethods) { return { kind: "interface", nilable: true, interface: { explicitMethods, embeddedTypes: [], embeddedKinds: [], completeMethods: explicitMethods, comparable: false, implicit: false, methodSetOnly: true } }; }
function semanticConstraintType(comparable) { return { kind: "interface", nilable: true, interface: { explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable, implicit: true, methodSetOnly: false } }; }
const semanticAnyType = () => semanticConstraintType(false);
const semanticBasicType = (name) => ({ kind: "basic", nilable: false, basic: { name, untyped: false } });
const semanticNamedType = (objectId, packagePath, name, nilable = false) => ({ kind: "named", nilable, reference: { objectId, packagePath, name, typeArgs: [] } });
const semanticSliceType = (element) => ({ kind: "slice", nilable: true, element });
const semanticStructType = (fields) => ({ kind: "struct", nilable: false, struct: { fields } });
