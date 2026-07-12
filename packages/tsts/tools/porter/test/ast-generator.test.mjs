import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

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
  astConfig,
  buildAstGeneratedArtifactStatus,
  buildAstGeneratedFiles,
  buildGeneratedAstSkips,
  emitKinds,
  loadAstSchema,
  parseGoNodeDataMethods,
  parseGoFlagFile,
  writeAstGenerated,
} from "../ast-generator.mjs";
import { AstSchema } from "../ast-schema-model.mjs";
import { astMemberTsType, lowerAstStorageType } from "../ast-generator/node-emitters.mjs";
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
  makePorterTestTemp,
  funcType,
  identType,
  instantiationType,
  interfaceType,
  mapType,
  pointerType,
  selectorType,
  sliceType,
  snapshotWith,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("ast-generator: Go flag const evaluation respects Go precedence and complement", () => {
  const source = [
    "package ast",
    "",
    "type SampleFlags uint32",
    "",
    "const (",
    "\tSampleFlagsNone      SampleFlags = 0",
    "\tSampleFlagsA         SampleFlags = 1 << 0",
    "\tSampleFlagsB         SampleFlags = 1 << 1",
    "\tSampleFlagsC         SampleFlags = 1 << 2",
    "\tSampleFlagsAll       SampleFlags = 1<<30 - 1 // trailing comment",
    "\tSampleFlagsAB                    = SampleFlagsA | SampleFlagsB",
    "\tSampleFlagsExcludesA             = SampleFlagsAll & ^SampleFlagsA",
    ")",
  ].join("\n");
  const consts = parseGoFlagFile(source, "SampleFlags").filter((entry) => entry.kind === "const");
  const byName = Object.fromEntries(consts.map((entry) => [entry.name, entry.value]));
  assert.equal(byName.SampleFlagsNone, 0);
  assert.equal(byName.SampleFlagsA, 1);
  assert.equal(byName.SampleFlagsC, 4);
  // Go binds `<<` tighter than `-`, so this is (1<<30)-1, NOT 1<<(30-1).
  assert.equal(byName.SampleFlagsAll, (1 << 30) - 1);
  assert.equal(byName.SampleFlagsAB, 3);
  // `& ^X` is bitwise-AND with the complement of X (uint32).
  assert.equal(byName.SampleFlagsExcludesA, (((1 << 30) - 1) & ~1) >>> 0);
});

test("ast-generator: kinds emit sequential values, markers, and a stringer", () => {
  const schema = {
    ast: {
      kinds: {
        elements: ["Unknown", "EndOfFile", { comment: "A group header" }, "Identifier"],
        markers: [{ name: "FirstNode", value: "Unknown" }],
      },
    },
  };
  const out = emitKinds(schema);
  assert.match(out, /export type Kind = short;/);
  assert.match(out, /export const KindUnknown: Kind = 0;/);
  assert.match(out, /export const KindEndOfFile: Kind = 1;/);
  assert.match(out, /\n\/\/ A group header\n/);
  // The comment-only element does not consume an enum index.
  assert.match(out, /export const KindIdentifier: Kind = 2;/);
  // Markers are aliases of an existing kind, not new values.
  assert.match(out, /export const KindFirstNode: Kind = KindUnknown;/);
  assert.match(out, /export function KindString\(kind: Kind\): string \{/);
});

function astFixtureConfig(root) {
  const rel = (target) => path.relative(repoRoot, target).split(path.sep).join("/");
  const schemaDir = path.join(root, "schema");
  const sourceRoot = path.join(root, "source");
  mkdirSync(schemaDir, { recursive: true });
  mkdirSync(path.join(sourceRoot, "_packages/native-preview/src/api/node"), { recursive: true });
  mkdirSync(path.join(sourceRoot, "internal/ast"), { recursive: true });
  writeFileSync(
    path.join(schemaDir, "ast.json"),
    JSON.stringify({ kinds: { elements: ["Unknown", "EndOfFile"], markers: [] }, bases: {}, nodes: { definitions: {}, aliases: {} } }),
  );
  writeFileSync(
    path.join(schemaDir, "ast.schema.json"),
    readFileSync(resolveRepo("packages/tsts/schema/tsgo/ast.schema.json"), "utf8"),
  );
  writeFileSync(path.join(schemaDir, "nodeflags.go"), "package ast\n\ntype NodeFlags uint32\n\nconst (\n\tNodeFlagsNone NodeFlags = 0\n)\n");
  writeFileSync(path.join(schemaDir, "symbolflags.go"), "package ast\n\ntype SymbolFlags uint32\n\nconst (\n\tSymbolFlagsNone SymbolFlags = 0\n)\n");
  writeFileSync(
    path.join(sourceRoot, "internal/ast/ast.go"),
    readFileSync(resolveRepo("packages/tsts/_vendor/typescript-go/internal/ast/ast.go"), "utf8"),
  );
  writeFileSync(
    path.join(sourceRoot, "_packages/native-preview/src/api/node/protocol.generated.ts"),
    "export const childProperties = {\n};\nexport const singleChildNodePropertyNames = {\n};\n",
  );
  const sourcePinManifest = path.join(root, "source-pin.json");
  writeFileSync(sourcePinManifest, `${JSON.stringify({
    schemaVersion: 3,
    schemaDirectory: rel(schemaDir),
    sourceRoot: rel(sourceRoot),
    schemaFiles: ["ast.json", "ast.schema.json", "nodeflags.go", "symbolflags.go"].map((file) => ({ path: file })),
    sourceFiles: [
      { path: "internal/ast/ast.go" },
      { path: "_packages/native-preview/src/api/node/protocol.generated.ts" },
    ],
    generatorInputs: [
      { generator: "porter:ast", id: "ast", inventory: "schemaFiles", path: "ast.json" },
      { generator: "porter:ast", id: "astSchema", inventory: "schemaFiles", path: "ast.schema.json" },
      { generator: "porter:ast", id: "nodeFlags", inventory: "schemaFiles", path: "nodeflags.go" },
      { generator: "porter:ast", id: "symbolFlags", inventory: "schemaFiles", path: "symbolflags.go" },
      { generator: "porter:ast", id: "nodeData", inventory: "sourceFiles", path: "internal/ast/ast.go" },
      { generator: "porter:ast", id: "protocolGenerated", inventory: "sourceFiles", path: "_packages/native-preview/src/api/node/protocol.generated.ts" },
    ],
  }, null, 2)}\n`);
  return {
    sourceRoot: rel(sourceRoot),
    sourcePinManifest: rel(sourcePinManifest),
    tsRoot: rel(path.join(root, "src")),
    astSchemaDir: rel(schemaDir),
  };
}

const cleanAstStatus = { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
const repositoryAstConfig = {
  ...baseConfig,
  sourceRoot: "packages/tsts/_vendor/typescript-go",
  sourcePinManifest: "packages/tsts/tools/porter/source-pin.json",
  astSchemaDir: "packages/tsts/schema/tsgo",
};

test("ast-generator: one registry declares every consumed input", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    const registry = astConfig(config).inputRegistry;
    assert.deepEqual(registry.map((input) => input.id), [
      "ast",
      "astSchema",
      "nodeFlags",
      "symbolFlags",
      "nodeData",
      "protocolGenerated",
    ]);
    const files = buildAstGeneratedFiles(config, "rev-input-registry");
    const metadata = JSON.parse(/^\/\/ @tsgo-generated (.+)$/m.exec(files.get("internal/ast/generated/kinds.ts"))[1]);
    assert.deepEqual(metadata.schemaInputs.map((input) => input.path), registry.map((input) => input.path));
    const manifestPath = resolveRepo(config.sourcePinManifest);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    manifest.generatorInputs.pop();
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    assert.throws(() => astConfig(config), /porter:ast source pin inputs must be exactly/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ast-generator: ast.json must conform to the pinned JSON schema", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    const astPath = path.join(root, "schema/ast.json");
    const ast = JSON.parse(readFileSync(astPath, "utf8"));
    ast.undeclaredContract = true;
    writeFileSync(astPath, JSON.stringify(ast));
    assert.throws(
      () => loadAstSchema(config),
      /ast\.json does not conform to .*ast\.schema\.json:[\s\S]*forbidden additional property 'undeclaredContract'/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ast-generator: schema semantic invariants match TS-Go SchemaAPI validation", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    const astPath = path.join(root, "schema/ast.json");
    const original = JSON.parse(readFileSync(astPath, "utf8"));
    const cases = [
      [(ast) => { ast.bases.Broken = { extends: ["MissingBase"] }; }, /Unknown base extends target MissingBase from Broken/],
      [(ast) => { ast.nodes.definitions.Broken = { extends: ["MissingBase"] }; }, /Unknown node extends target MissingBase from Broken/],
      [(ast) => { ast.nodes.aliases.Broken = { base: "MissingBase" }; }, /Unknown alias base MissingBase from Broken/],
      [(ast) => { ast.kinds.markers.push({ name: "BrokenMarker", value: "MissingKind" }); }, /Kind marker BrokenMarker references undefined kind or marker MissingKind/],
      [(ast) => { ast.kinds.aliases = { BrokenKinds: ["MissingKind"] }; }, /Unknown kind alias member MissingKind in BrokenKinds/],
      [(ast) => {
        ast.kinds.elements.push("DetachedKind");
        ast.kinds.aliases = { DetachedKinds: ["DetachedKind"] };
        ast.nodes.aliases.Broken = ["DetachedKinds"];
      }, /Kind alias member "DetachedKind" \(from "DetachedKinds"\) does not resolve to a node type/],
    ];
    for (const [mutate, expected] of cases) {
      const ast = structuredClone(original);
      mutate(ast);
      writeFileSync(astPath, JSON.stringify(ast));
      assert.throws(() => loadAstSchema(config), expected);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("porter:ast --check detects missing/stale/orphan/untracked/invalid generated files", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    const genDir = path.join(root, "src/internal/ast/generated");

    writeAstGenerated(config, "rev-fixture-1");
    assert.deepEqual(buildAstGeneratedArtifactStatus(config, "rev-fixture-1"), cleanAstStatus);

    // Missing.
    unlinkSync(path.join(genDir, "kinds.ts"));
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-1").missing.length, 1);
    writeAstGenerated(config, "rev-fixture-1", { force: true });

    // Stale.
    const kindsPath = path.join(genDir, "kinds.ts");
    writeFileSync(kindsPath, `${readFileSync(kindsPath, "utf8")}\nexport const sneaky = 1;\n`);
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-1").stale.length, 1);
    writeAstGenerated(config, "rev-fixture-1", { force: true });

    // Orphan: well-formed generated file no longer in the expected set.
    const expected = buildAstGeneratedFiles(config, "rev-fixture-1");
    writeFileSync(
      path.join(genDir, "orphan.ts"),
      expected.get("internal/ast/generated/kinds.ts").replace('"path":"internal/ast/generated/kinds.ts"', '"path":"internal/ast/generated/orphan.ts"'),
    );
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-1").orphan.length, 1);
    unlinkSync(path.join(genDir, "orphan.ts"));

    // Untracked: file in the generated dir without @tsgo-generated metadata.
    writeFileSync(path.join(genDir, "loose.ts"), "export const loose = 1;\n");
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-1").untracked.length, 1);
    unlinkSync(path.join(genDir, "loose.ts"));

    // Invalid: @tsgo-generated metadata with the wrong kind/generator.
    writeFileSync(
      path.join(genDir, "wrongkind.ts"),
      '// Code generated\n// @tsgo-generated {"schemaVersion":1,"kind":"go-facade","generator":"porter:facades","path":"x","sourceRevision":"r","contentHash":"h"}\n\nexport {}\n',
    );
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-1").invalid.length, 1);
    unlinkSync(path.join(genDir, "wrongkind.ts"));

    writeFileSync(path.join(genDir, "badmetadata.ts"), "// Code generated\n// @tsgo-generated {bad-json}\n");
    const badMetadata = buildAstGeneratedArtifactStatus(config, "rev-fixture-1");
    assert.equal(badMetadata.invalid.length, 1);
    assert.equal(badMetadata.untracked.length, 0);
    unlinkSync(path.join(genDir, "badmetadata.ts"));

    assert.deepEqual(buildAstGeneratedArtifactStatus(config, "rev-fixture-1"), cleanAstStatus);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeAstGenerated honors the safe-write contract and --force", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    const kindsPath = path.join(root, "src/internal/ast/generated/kinds.ts");
    writeAstGenerated(config, "rev-fixture-2");
    writeFileSync(kindsPath, `${readFileSync(kindsPath, "utf8")}\n// edited\n`);
    assert.throws(() => writeAstGenerated(config, "rev-fixture-2"), /refusing to overwrite/);
    writeAstGenerated(config, "rev-fixture-2", { force: true });
    assert.deepEqual(buildAstGeneratedArtifactStatus(config, "rev-fixture-2"), cleanAstStatus);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ast-generator: a schema input content change makes committed output stale", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    writeAstGenerated(config, "rev-fixture-3");
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-3").stale.length, 0);
    // Changing a declared schema input changes the schemaInputs digest in the header.
    writeFileSync(
      path.join(root, "schema/nodeflags.go"),
      "package ast\n\ntype NodeFlags uint32\n\nconst (\n\tNodeFlagsNone NodeFlags = 0\n\tNodeFlagsLet  NodeFlags = 1 << 0\n)\n",
    );
    assert.ok(buildAstGeneratedArtifactStatus(config, "rev-fixture-3").stale.length >= 1);
    assert.ok(existsSync(path.join(root, "src/internal/ast/generated/kinds.ts")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ast-generator: a protocol.generated.ts content change makes committed output stale", () => {
  const root = makePorterTestTemp("porter-test-");
  try {
    const config = astFixtureConfig(root);
    writeAstGenerated(config, "rev-fixture-protocol");
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-protocol").stale.length, 0);
    const protocolPath = path.join(root, "source/_packages/native-preview/src/api/node/protocol.generated.ts");
    writeFileSync(protocolPath, `${readFileSync(protocolPath, "utf8")}\n// pinned input changed\n`);
    assert.equal(buildAstGeneratedArtifactStatus(config, "rev-fixture-protocol").stale.length, 10);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ast-generator preserves intrinsic nil-slice carriers in generated visitors", async () => {
  const output = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-nil-slice").get("internal/ast/generated/data.ts");
  assert.match(output, /if \(nodes\.length !== 1\)/);
  assert.match(output, /updated = \[\.\.\.updated, \.\.\.AsSyntaxList\(visited\)!\.Children\]/);
  assert.match(output, /let nodes: GoSlice<GoPtr<Node>> = GoNilSlice\(\);/);
  const visitSliceStart = output.indexOf("function generatedVisitSlice(");
  const visitRawStart = output.indexOf("function generatedVisitRawNodes(");
  const visitNodesBaseStart = output.indexOf("function generatedVisitNodesBase(");
  assert.ok(visitSliceStart >= 0 && visitRawStart > visitSliceStart && visitNodesBaseStart > visitRawStart);
  assert.doesNotMatch(output.slice(visitSliceStart, visitRawStart), /nodes === undefined/);
  assert.doesNotMatch(output.slice(visitRawStart, visitNodesBaseStart), /nodes === undefined/);
  assert.doesNotMatch(output, /GoPtr<GoSlice</);
  const sourceFile = ts.createSourceFile("data.ts", output, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = sourceFile.statements.find((statement) =>
    ts.isFunctionDeclaration(statement) && statement.name?.text === "generatedVisitSlice");
  assert.ok(declaration !== undefined && ts.isFunctionDeclaration(declaration));
  const executable = ts.transpileModule(
    `const generatedVisitor = (visitor) => visitor;\nexport ${declaration.getText(sourceFile)}`,
    { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2024 } },
  ).outputText;
  const generatedModule = await import(`data:text/javascript;base64,${Buffer.from(executable).toString("base64")}`);
  const visitor = { Visit: () => { throw new Error("nil-slice carriers and empty slices must not invoke Visit"); } };

  const emptyNodes = [];
  const [emptyResult, emptyChanged] = generatedModule.generatedVisitSlice(visitor, emptyNodes);
  assert.equal(emptyResult, emptyNodes);
  assert.equal(emptyChanged, false);
});

test("ast-generator preserves nil raw slices in fields, factories, and visitors", () => {
  const generated = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-raw-nil-slice");
  const nodeOutput = generated.get("internal/ast/generated/node.ts");
  const factoryOutput = generated.get("internal/ast/generated/factory.ts");
  const dataOutput = generated.get("internal/ast/generated/data.ts");

  assert.match(nodeOutput, /text: GoSlice<string>;/);
  assert.match(factoryOutput, /NewJSDocText\(receiver: GoPtr<NodeFactory>, text: GoSlice<string>\)/);
  assert.match(factoryOutput, /data\.text = text;/);
  assert.doesNotMatch(factoryOutput, /data\.text = text \?\? "";/);
  assert.match(dataOutput, /generatedVisitRawNodes\(v: GoPtr<NodeVisitor>, nodes: GoSlice<GoPtr<Node>>\): GoSlice<GoPtr<Node>>/);
  assert.doesNotMatch(`${nodeOutput}\n${factoryOutput}\n${dataOutput}`, /GoPtr<GoSlice/);
});

// ───────────────────────────────────────────────────────────────────────────
// AST node/data/factory/etc emitter tests (free-fn/adapter model).
// ───────────────────────────────────────────────────────────────────────────

test("ast-schema-model: alias derivation matches ast_generated.go (231 node + 72 union + 23 list)", () => {
  const ast = JSON.parse(readFileSync(resolveRepo("packages/tsts/schema/tsgo/ast.json"), "utf8"));
  const schema = new AstSchema(ast);
  const nodeAliasCount = schema.nodeNames().length
    + schema.nodeNames().reduce((acc, n) => acc + schema.instantiationAliasesOf(n).length, 0);
  assert.equal(nodeAliasCount, 231);
  assert.equal(Object.keys(schema.aliases).length, 72);
  assert.equal(Object.keys(schema.listAliases).length, 23);
});

test("ast-generator maps every schema goOnly compiler-state field without an owner allowlist", () => {
  const ast = JSON.parse(readFileSync(resolveRepo("packages/tsts/schema/tsgo/ast.json"), "utf8"));
  const goOnlyFields = [
    ...Object.entries(ast.bases).flatMap(([owner, definition]) =>
      Object.entries(definition.fields ?? {}).filter(([, field]) => field.goOnly).map(([name, field]) => ["base", owner, name, field.type])),
    ...Object.entries(ast.nodes.definitions).flatMap(([owner, definition]) =>
      (definition.members ?? []).filter((field) => field.goOnly).map((field) => ["node", owner, field.name, field.type])),
  ];
  assert.deepEqual(goOnlyFields, [
    ["base", "DeclarationBase", "Symbol", "*Symbol"],
    ["base", "ExportableBase", "LocalSymbol", "*Symbol"],
    ["base", "LocalsContainerBase", "Locals", "SymbolTable"],
    ["base", "LocalsContainerBase", "NextContainer", "*Node"],
    ["base", "FlowNodeBase", "FlowNode", "*FlowNode"],
    ["base", "CompositeBase", "facts", "atomic.Uint32"],
    ["base", "BodyBase", "EndFlowNode", "*FlowNode"],
    ["node", "CaseOrDefaultClause", "FallthroughFlowNode", "*FlowNode"],
    ["node", "FunctionDeclaration", "ReturnFlowNode", "*FlowNode"],
    ["node", "ConstructorDeclaration", "ReturnFlowNode", "*FlowNode"],
    ["node", "ClassStaticBlockDeclaration", "ReturnFlowNode", "*FlowNode"],
    ["node", "FunctionExpression", "ReturnFlowNode", "*FlowNode"],
  ]);

  const files = buildAstGeneratedFiles(repositoryAstConfig, "abc123");
  const node = files.get("internal/ast/generated/node.ts");
  const data = files.get("internal/ast/generated/data.ts");

  assert.match(node, /export interface DeclarationBase[\s\S]*Symbol: GoPtr<Symbol>/);
  assert.match(node, /export interface LocalsContainerBase[\s\S]*Locals: SymbolTable;[\s\S]*NextContainer: GoPtr<Node>/);
  assert.match(node, /export interface FlowNodeBase[\s\S]*FlowNode: GoPtr<FlowNode>/);
  assert.match(node, /export interface CompositeBase[\s\S]*facts: Uint32/);
  assert.match(node, /export interface BodyBase[\s\S]*EndFlowNode: GoPtr<FlowNode>/);
  assert.match(data, /export interface ConstructorDeclaration[\s\S]*ReturnFlowNode: GoPtr<FlowNode>/);
  assert.match(data, /export interface CaseOrDefaultClause[\s\S]*FallthroughFlowNode: GoPtr<FlowNode>/);
});

test("ast-generator parses the exact upstream nodeData method order", () => {
  const source = readFileSync(resolveRepo("packages/tsts/_vendor/typescript-go/internal/ast/ast.go"), "utf8");
  assert.deepEqual(parseGoNodeDataMethods(source), [
    "AsNode", "ForEachChild", "IterChildren", "VisitEachChild", "Clone", "Name", "Modifiers", "setModifiers",
    "FlowNodeData", "DeclarationData", "ExportableData", "LocalsContainerData", "FunctionLikeData",
    "ClassLikeData", "BodyData", "LiteralLikeData", "TemplateLiteralLikeData", "SubtreeFacts",
    "computeSubtreeFacts", "subtreeFactsWorker", "propagateSubtreeFacts",
  ]);
});

test("ast-generator: Identifier_as_nodeData resolves FlowNodeData via promotion, not NodeDefault", () => {
  const files = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-1");
  const data = files.get("internal/ast/generated/data.ts");
  assert.ok(data.includes("export interface Identifier extends PrimaryExpressionBase, FlowNodeBase {"));
  // Promotion: Identifier embeds FlowNodeBase, so FlowNodeData -> FlowNodeBase_FlowNodeData.
  assert.match(data, /const Identifier_nodeDataPrototype: nodeData & ThisType<GoPtr<Identifier>> = \{[\s\S]*?FlowNodeData\(\) \{ return FlowNodeBase_FlowNodeData\(this\); \},/);
  // No override -> NodeDefault for DeclarationData (Identifier has no DeclarationBase).
  assert.match(data, /const Identifier_nodeDataPrototype: nodeData & ThisType<GoPtr<Identifier>> = \{[\s\S]*?DeclarationData\(\) \{ return NodeDefault_DeclarationData\(this\); \},/);
  // Leaf nodes still use NodeDefault for VisitEachChild.
  assert.match(data, /const Identifier_nodeDataPrototype: nodeData & ThisType<GoPtr<Identifier>> = \{[\s\S]*?VisitEachChild\(v: GoPtr<NodeVisitor>\): GoPtr<Node> \{ return NodeDefault_VisitEachChild\(this, v\); \},/);
  // Child-bearing nodes get generated VisitEachChild rewrites.
  assert.match(data, /export function ExpressionStatement_VisitEachChild\(receiver: GoPtr<ExpressionStatement>, v: GoPtr<NodeVisitor>\): GoPtr<Node> \{\s*return Factory\.NodeFactory_UpdateExpressionStatement\(generatedVisitorFactory\(v\), receiver, generatedVisitNode\(v, receiver!\.Expression\) as GoPtr<Expression>\);\s*\}/);
  assert.match(data, /const ExpressionStatement_nodeDataPrototype: nodeData & ThisType<GoPtr<ExpressionStatement>> = \{[\s\S]*?VisitEachChild\(v: GoPtr<NodeVisitor>\): GoPtr<Node> \{ return ExpressionStatement_VisitEachChild\(this, v\); \},/);
  // The brand carries the concrete receiver.
  assert.match(data, /import \{ GoNilSlice, goReceiverKey \} from "\.\.\/\.\.\/\.\.\/go\/compat\.js";/);
  assert.doesNotMatch(data, /import \{ goReceiverKey \} from "\.\.\/spine\.js";/);
  assert.match(data, /get \[goReceiverKey\]\(\): GoPtr<Identifier> \{ return this; \},/);
  assert.match(data, /export function Identifier_as_nodeData\(receiver: GoPtr<Identifier>\): nodeData \{\s*return globalThis\.Object\.setPrototypeOf\(receiver!, Identifier_nodeDataPrototype\) as nodeData;\s*\}/);
  assert.match(data, /export function createIdentifierData\(\): Identifier & nodeData \{\s*return globalThis\.Object\.create\(Identifier_nodeDataPrototype\) as Identifier & nodeData;\s*\}/);
});

test("ast-generator: named concrete nodes expose their generated Name override", () => {
  const files = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-name");
  const data = files.get("internal/ast/generated/data.ts");
  assert.match(data, /export function ParameterDeclaration_Name\(receiver: GoPtr<ParameterDeclaration>\): GoPtr<Node> \{\s*return receiver!\.name;\s*\}/);
  assert.match(data, /const ParameterDeclaration_nodeDataPrototype: nodeData & ThisType<GoPtr<ParameterDeclaration>> = \{[\s\S]*?Name\(\) \{ return ParameterDeclaration_Name\(this\); \},/);
});

test("ast-generator: NewIdentifier and AsIdentifier emit the faithful factory/cast", () => {
  const files = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-2");
  const factory = files.get("internal/ast/generated/factory.ts");
  assert.match(factory, /export interface NodeFactory \{[\s\S]*?AsNodeFactory\(\): GoPtr<NodeFactory>;/);
  assert.match(
    factory,
    /export function NewIdentifier\(receiver: GoPtr<NodeFactory>, text: string\): GoPtr<Node> \{[\s\S]*?const data = createIdentifierData\(\);[\s\S]*?return NodeFactory_newNode\(receiver, KindIdentifier, data\);/,
  );
  const casts = files.get("internal/ast/generated/casts.ts");
  assert.match(casts, /import \{ goReceiverKey \} from "\.\.\/\.\.\/\.\.\/go\/compat\.js";/);
  assert.match(casts, /export function AsIdentifier\(n: GoPtr<Node>\): GoPtr<Identifier> \{\s*return n!\.data\[goReceiverKey\] as GoPtr<Identifier>;/);
});

test("ast-generator: raw slices use their intrinsic carrier", () => {
  const ast = JSON.parse(readFileSync(resolveRepo("packages/tsts/schema/tsgo/ast.json"), "utf8"));
  const schema = new AstSchema(ast);
  // JSDocText.text is []string (raw) inherited from JSDocCommentBase -> not a child.
  const textField = schema.baseFields("JSDocCommentBase").find((f) => f.name === "text");
  assert.equal(textField.isChild(), false);
  assert.equal(astMemberTsType(textField), "GoSlice<string>");

  const data = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-slices").get("internal/ast/generated/data.ts");
  assert.match(data, /import \{ GoNilSlice, goReceiverKey \} from "\.\.\/\.\.\/\.\.\/go\/compat\.js";/);
  assert.match(data, /let nodes: GoSlice<GoPtr<Node>> = GoNilSlice\(\);/);
  assert.doesNotMatch(data, /let nodes: GoSlice<GoPtr<Node>> = undefined;/);
  assert.doesNotMatch(data, /AsSyntaxList\(visited\)!\.Children \?\? \[\]/);
});

test("ast-generator: pointer slots preserve reviewed storage representation", () => {
  assert.equal(lowerAstStorageType("*Node", "NodeSlot"), "GoPtr<Node>");
  assert.equal(lowerAstStorageType("*[]int", "SliceSlot"), "GoRef<GoSlice<int>>");
  assert.equal(lowerAstStorageType("**Node", "PointerSlot"), "GoRef<GoPtr<Node>>");
  assert.throws(() => lowerAstStorageType("*Unreviewed", "UnknownSlot"), /no reviewed representation provenance/);
  assert.throws(() => astMemberTsType({
    goOnly: false, listKind: undefined, name: "CollapsedSlot", tsReference: () => "GoPtr<GoPtr<Node>>",
  }), /without exact representation provenance/);
  assert.throws(() => astMemberTsType({
    goOnly: false, listKind: undefined, name: "UnknownPointer", tsReference: () => "GoPtr<Unknown>",
  }), /no reviewed aggregate-pointer representation provenance/);
});

test("ast-generator: multi-kind and type-parameter Is functions follow ast_generated.go", () => {
  const files = buildAstGeneratedFiles(repositoryAstConfig, "rev-ast-3");
  const predicates = files.get("internal/ast/generated/predicates.ts");
  // ForInOrOfStatement is multi-kind -> per-kind Is functions, no IsForInOrOfStatement.
  assert.ok(predicates.includes("export function IsForInStatement("));
  assert.ok(predicates.includes("export function IsForOfStatement("));
  assert.ok(!predicates.includes("export function IsForInOrOfStatement("));
  // Token is a type-parameter node -> a single IsToken switching over TokenSyntaxKind.
  assert.match(predicates, /export function IsToken\(node: GoPtr<Node>\): bool \{\s*switch \(node!\.Kind\)/);
});

test("ast-generator: generatedAstSkips records handWritten without visitEachChild deferral", () => {
  const skips = buildGeneratedAstSkips(repositoryAstConfig);
  assert.deepEqual(skips.handWritten, ["SourceFile"]);
  assert.deepEqual(skips.handWrittenVisitor, ["JSDocParameterOrPropertyTag"]);
  assert.deepEqual(skips.visitEachChildDeferred, []);
});
