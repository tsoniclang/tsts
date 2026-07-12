import assert from "node:assert/strict";
import test from "node:test";

import {
  renderUnitGroup,
} from "../porter.mjs";
import { buildLargeFileSplitStatusFromPlan } from "../core/large-files.mjs";

import {
  baseConfig,
  channelType,
  emptyLargeFileSplitStatus,
  fileRecord,
  funcType,
  identType,
  interfaceType,
  largeFileSplitPlan,
  selectorType,
  sliceType,
  snapshotWith,
  unitRecord,
} from "./helpers.mjs";
import {
  semanticAnyType,
  semanticBasicType,
  semanticConstraintType,
  semanticFunctionFixture,
  semanticFunctionType,
  semanticInterfaceType,
  semanticMethod,
  semanticNamedType,
  semanticSliceType,
  semanticStructType,
  semanticTypeFixture,
  semanticTypeParameter,
  semanticTypeParameterType,
  writerTypeFixture,
} from "./rendering-semantic-fixtures.mjs";
import { finalizeGeneratedFacadeFixtureCatalog } from "./external-facade-fixtures.mjs";

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
  const debugSnapshot = snapshotWith([fileRecord({ path: "internal/debug/debug.go", importPath: debugPackage, units: [nodeAssert] })]);
  const debugText = renderUnitGroup(
    config,
    debugSnapshot,
    "packages/tsts/src/internal/debug/debug.ts",
    [nodeAssert],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, debugSnapshot), largeFileSplits: emptyLargeFileSplitStatus() },
  );
  const diffSnapshot = snapshotWith([fileRecord({ path: "internal/collections/ordered_map.go", importPath: collectionsPackage, units: [diffFunc] })]);
  const diffText = renderUnitGroup(
    config,
    diffSnapshot,
    "packages/tsts/src/internal/collections/ordered_map.ts",
    [diffFunc],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, diffSnapshot), largeFileSplits: emptyLargeFileSplitStatus() },
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
  snapshot.semantic.dependencyTypeDeclarations = [
    semanticTypeFixture(optionsPackage, "Options", semanticStructType([])),
    writerTypeFixture(),
  ];
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/diagnosticwriter/diagnosticwriter.ts",
    [diagnosticWriter],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, snapshot), largeFileSplits: emptyLargeFileSplitStatus() },
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
  const config = { ...baseConfig, goModulePath: "m" };
  const plan = largeFileSplitPlan({
    "internal/checker/checker.go": {
      reason: "Exact semantic split fixture for checker state imports.",
      targets: [
        {
          path: "packages/tsts/src/internal/checker/checker/state.ts",
          description: "Checker state",
          declarations: ["type::Checker"],
        },
      ],
    },
  });
  const snapshot = {
    ...snapshotWith([
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
    ]),
    gitRevision: plan.sourceRevision,
  };
  const splitStatus = buildLargeFileSplitStatusFromPlan(config, snapshot, plan);
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/checker/emitresolver.ts",
    [emitResolverFactory],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, snapshot), largeFileSplits: splitStatus },
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
  const snapshot = snapshotWith([fileRecord({ path: "internal/ast/kind_generated.go", importPath: "m/internal/ast", units: [kindType, values, kindBounds, channels] })]);
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/ast/kind_generated.ts",
    [kindType, values, kindBounds, channels],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, snapshot), largeFileSplits: emptyLargeFileSplitStatus() },
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
