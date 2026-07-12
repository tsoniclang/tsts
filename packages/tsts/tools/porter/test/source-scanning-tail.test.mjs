import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildEmbeddedGoSourceUpdates, buildStatus, collectVerifyFailures, renderStub, renderUnitGroup, repoRoot, writeTextSafely } from "../porter.mjs";
import { baseConfig, fileRecord, identType, snapshotWith, testBodyHash, testSigHash, unitRecord } from "./helpers.mjs";

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

test("renderStub rejects non-portable unit kinds", () => {
  assert.throws(() => renderStub(unitRecord({ kind: "importGroup" })), /cannot render scaffold for non-portable Go unit kind 'importGroup'/);
});

test("renderUnitGroup emits typed generic function skeletons with Go result tuples", () => {
  const packagePath = "m/internal/collections";
  const objectId = `${packagePath}::func::Pair`;
  const makeSignature = (ownerId) => {
    const parameter = (index, name, constraint) => ({ reference: { ownerId, role: "type", index, name }, constraint });
    const key = parameter(0, "K", {
      kind: "named", nilable: true,
      reference: { objectId: "builtin::type::comparable", packagePath: "", name: "comparable", typeArgs: [] },
    });
    const value = parameter(1, "V", {
      kind: "interface", nilable: true,
      interface: { explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable: false, implicit: true, methodSetOnly: true },
    });
    const typeParameter = (entry) => ({ kind: "typeParameter", nilable: false, typeParameter: entry.reference });
    const variable = (role, index, name, type) => ({ id: `${ownerId}::${role}::${index}`, name, packagePath, exported: false, type });
    return {
      receiverTypeParameters: [],
      typeParameters: [key, value],
      parameters: { variables: [
        variable("parameters", 0, "key", typeParameter(key)),
        variable("parameters", 1, "value", typeParameter(value)),
      ] },
      results: { variables: [
        variable("results", 0, "", typeParameter(value)),
        variable("results", 1, "", { kind: "basic", nilable: false, basic: { name: "bool", untyped: false } }),
      ] },
      variadic: false,
    };
  };
  const declarationSignature = makeSignature(`${objectId}::signature`);
  const objectSignature = makeSignature(`${objectId}::type`);
  const pair = unitRecord({
    id: "m::internal/collections/pair.go::func::Pair",
    kind: "func",
    name: "Pair",
    qualifiedName: "Pair",
    goPath: "internal/collections/pair.go",
    typeParameters: ["K", "V"],
    typeParameterDetails: [{ name: "K", constraint: identType("comparable") }, { name: "V", constraint: identType("any") }],
    parameters: [{ names: ["key"], type: identType("K") }, { names: ["value"], type: identType("V") }],
    results: [{ type: identType("V") }, { type: identType("bool") }],
    semantic: [{
      kind: "func",
      packagePath,
      object: { id: objectId, name: "Pair", packagePath, exported: true, type: { kind: "signature", nilable: true, signature: objectSignature } },
      signature: declarationSignature,
      profiles: [0],
    }],
  });
  const text = renderUnitGroup(baseConfig, snapshotWith([fileRecord({ path: "internal/collections/pair.go", units: [pair] })]), "packages/tsts/src/internal/collections/pair.ts", [pair]);
  assert.match(text, /import type \{ bool \} from "..\/..\/go\/scalars\.js";/);
  assert.match(text, /import type \{ GoComparable \}/);
  assert.match(text, /export function Pair<K extends GoComparable, V>\(key: K, value: V\): \[V, bool\]/);
});
