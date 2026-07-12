import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildEmbeddedGoSourceUpdates, buildStatus, collectVerifyFailures, renderUnitGroup, repoRoot, writeTextSafely } from "../porter.mjs";
import { baseConfig, fileRecord, identType, instantiationType, pointerType, snapshotWith, testBodyHash, testSigHash, unitRecord } from "./helpers.mjs";
import { finalizeGeneratedFacadeFixtureCatalog } from "./external-facade-fixtures.mjs";

test("buildStatus rejects stale embedded Go source blocks", () => {
  const unit = unitRecord({ id: "m::internal/debug/debug.go::func::Fail", kind: "func", qualifiedName: "Fail", goPath: "internal/debug/debug.go", sigHash: "sig", bodyHash: "body", snippet: "func Fail()" });
  const status = buildStatus(baseConfig, snapshotWith([fileRecord({ units: [unit] })]), {
    fileCount: 1,
    files: [{ path: "packages/tsts/src/internal/debug/debug.ts", metadataCount: 1 }],
    units: [{ id: unit.id, kind: unit.kind, path: "packages/tsts/src/internal/debug/debug.ts", status: "implemented", sigHash: unit.sigHash, bodyHash: unit.bodyHash, embeddedGoSource: " * func OldFail() {}" }],
  });
  assert.equal(status.counts.embeddedSourceMismatches, 1);
  assert.equal(collectVerifyFailures(status, {}).some((failure) => /stale or missing embedded Go source blocks/.test(failure)), true);
});

test("buildEmbeddedGoSourceUpdates synchronizes docs without disturbing overrides", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-source-docs-"));
  try {
    const file = path.join(root, "debug.ts");
    const unit = unitRecord({ id: "m::internal/debug/debug.go::func::Fail", kind: "func", qualifiedName: "Fail", goPath: "internal/debug/debug.go", sigHash: testSigHash, bodyHash: testBodyHash, snippet: "func Fail()" });
    writeFileSync(file, `const unicodePrefix = "💚 café";

/**
 * @tsgo-unit {"id":"${unit.id}","kind":"func","status":"implemented","sigHash":"${testSigHash}","bodyHash":"${testBodyHash}"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"This exact declaration signature difference is reviewed locally.","goSignature":"go","tsSignature":"ts"}
 *
 * Go source:
 * func OldFail() {}
 */
export function Fail(): void {}
`);
    const first = await buildEmbeddedGoSourceUpdates(snapshotWith([fileRecord({ units: [unit] })]), root);
    assert.equal(first.unitCount, 1);
    assert.match(first.updates[0].text, /^const unicodePrefix = "💚 café";/);
    assert.match(first.updates[0].text, /@tsgo-override/);
    assert.match(first.updates[0].text, /\* func Fail\(\)/);
    writeFileSync(file, first.updates[0].text);
    assert.equal((await buildEmbeddedGoSourceUpdates(snapshotWith([fileRecord({ units: [unit] })]), root)).unitCount, 0);
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
    assert.throws(() => writeTextSafely(target, "two\n", { label: "test artifact" }), /refusing to overwrite existing test artifact/);
    assert.equal(writeTextSafely(target, "two\n", { label: "test artifact", force: true }), "written");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("renderUnitGroup preserves generic and pointer receiver method skeletons", () => {
  const packagePath = "m/internal/collections";
  const goPath = "internal/collections/ordered_map.go";
  const objectId = `${packagePath}::type::OrderedMap`;
  const methodId = `${objectId}::method::Get`;
  const orderedMap = genericOrderedMapType({ goPath, objectId, packagePath });
  const get = genericOrderedMapMethod({ goPath, methodId, objectId, packagePath });
  const config = { ...baseConfig, goModulePath: "m" };
  const snapshot = snapshotWith([fileRecord({ path: goPath, importPath: packagePath, units: [orderedMap, get] })]);
  const text = renderUnitGroup(
    config,
    snapshot,
    "packages/tsts/src/internal/collections/ordered_map.ts",
    [orderedMap, get],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, snapshot) },
  );
  assert.match(text, /import type \{ bool \} from "\.\.\/\.\.\/go\/scalars\.js";/);
  assert.match(text, /import type \{ GoComparable, GoPtr \}/);
  assert.match(text, /export interface OrderedMap<K extends GoComparable, V>/);
  assert.match(text, /export function OrderedMap_Get<K extends GoComparable, V>\(receiver: GoPtr<OrderedMap<K, V>>, key: K\): \[V, bool\]/);
});

function genericOrderedMapType({ goPath, objectId, packagePath }) {
  const parameters = typeParameters(objectId, "type");
  const object = {
    id: objectId,
    name: "OrderedMap",
    packagePath,
    exported: true,
    type: namedType(objectId, packagePath, "OrderedMap"),
  };
  return unitRecord({
    id: `m::${goPath}::type::OrderedMap`,
    kind: "type",
    name: "OrderedMap",
    qualifiedName: "OrderedMap",
    goPath,
    typeKind: "struct",
    typeExpression: { kind: "struct", text: "struct{}", members: [] },
    typeParameters: ["K", "V"],
    typeParameterDetails: [{ name: "K", constraint: identType("comparable") }, { name: "V", constraint: identType("any") }],
    members: [],
    semantic: [{
      kind: "type",
      packagePath,
      object,
      type: {
        alias: false,
        object,
        typeParameters: parameters,
        rhs: { kind: "struct", nilable: false, struct: { fields: [] } },
        methodSurface: "declaration-units",
        methods: [],
        valueMethodSet: [],
        pointerMethodSet: [],
      },
      profiles: [0],
    }],
  });
}

function genericOrderedMapMethod({ goPath, methodId, objectId, packagePath }) {
  const parameters = typeParameters(methodId, "receiver");
  const signature = methodSignature(`${methodId}::signature`, objectId, packagePath, parameters, true);
  const objectSignature = methodSignature(`${methodId}::type`, objectId, packagePath, parameters, false);
  return unitRecord({
    id: `m::${goPath}::method::OrderedMap.Get`,
    kind: "method",
    name: "Get",
    qualifiedName: "OrderedMap.Get",
    receiver: "OrderedMap",
    receiverMode: "pointer",
    receiverType: pointerType(instantiationType(identType("OrderedMap"), [identType("K"), identType("V")])),
    goPath,
    parameters: [{ names: ["key"], type: identType("K") }],
    results: [{ type: identType("V") }, { type: identType("bool") }],
    semantic: [{
      kind: "method",
      packagePath,
      object: {
        id: methodId,
        name: "Get",
        packagePath,
        exported: true,
        type: { kind: "signature", nilable: true, signature: objectSignature },
      },
      signature,
      profiles: [0],
    }],
  });
}

function methodSignature(ownerId, objectId, packagePath, parameters, includeReceiver) {
  const type = (parameter) => ({ kind: "typeParameter", nilable: false, typeParameter: parameter.reference });
  return {
    ...(includeReceiver ? {
      receiver: {
        id: `${ownerId}::receiver`,
        name: "receiver",
        packagePath,
        exported: false,
        type: {
          kind: "pointer",
          nilable: true,
          element: namedType(objectId, packagePath, "OrderedMap", parameters.map(type)),
        },
      },
    } : {}),
    receiverTypeParameters: parameters,
    typeParameters: [],
    parameters: { variables: [semanticVariable(ownerId, "parameters", 0, "key", packagePath, type(parameters[0]))] },
    results: { variables: [
      semanticVariable(ownerId, "results", 0, "", packagePath, type(parameters[1])),
      semanticVariable(ownerId, "results", 1, "", packagePath, { kind: "basic", nilable: false, basic: { name: "bool", untyped: false } }),
    ] },
    variadic: false,
    parameterNameProvenance: "source",
  };
}

function typeParameters(ownerId, role) {
  return [
    {
      reference: { ownerId, role, index: 0, name: "K" },
      constraint: { kind: "named", nilable: true, reference: { objectId: "builtin::type::comparable", packagePath: "", name: "comparable", typeArgs: [] } },
    },
    {
      reference: { ownerId, role, index: 1, name: "V" },
      constraint: {
        kind: "interface",
        nilable: true,
        interface: {
          explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable: false, implicit: true, methodSetOnly: true,
          explicitMethodOrderProvenance: "source",
        },
      },
    },
  ];
}

function namedType(objectId, packagePath, name, typeArgs = []) {
  return { kind: "named", nilable: false, reference: { objectId, packagePath, name, typeArgs } };
}

function semanticVariable(ownerId, role, index, name, packagePath, type) {
  return { id: `${ownerId}::${role}::${index}`, name, packagePath, exported: false, type };
}
