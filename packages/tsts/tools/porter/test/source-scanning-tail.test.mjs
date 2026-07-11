import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildEmbeddedGoSourceUpdates, buildStatus, collectVerifyFailures, renderStub, renderUnitGroup, repoRoot, writeTextSafely } from "../porter.mjs";
import { baseConfig, fileRecord, identType, instantiationType, mapType, pointerType, sliceType, snapshotWith, testBodyHash, testSigHash, unitRecord } from "./helpers.mjs";

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

test("renderUnitGroup emits typed generic method skeletons with Go result tuples", () => {
  const orderedMapType = unitRecord({ id: "m::internal/collections/ordered_map.go::type::OrderedMap", kind: "type", name: "OrderedMap", qualifiedName: "OrderedMap", goPath: "internal/collections/ordered_map.go", typeKind: "struct", typeParameterDetails: [{ name: "K", constraint: identType("comparable") }, { name: "V", constraint: identType("any") }], members: [{ kind: "field", name: "keys", typeExpr: sliceType(identType("K")) }, { kind: "field", name: "mp", typeExpr: mapType(identType("K"), identType("V")) }] });
  const getMethod = unitRecord({ id: "m::internal/collections/ordered_map.go::method::OrderedMap.Get", kind: "method", name: "Get", qualifiedName: "OrderedMap.Get", receiver: "OrderedMap", receiverMode: "pointer", receiverType: pointerType(instantiationType(identType("OrderedMap"), [identType("K"), identType("V")])), goPath: "internal/collections/ordered_map.go", parameters: [{ names: ["key"], type: identType("K") }], results: [{ type: identType("V") }, { type: identType("bool") }] });
  const text = renderUnitGroup(baseConfig, snapshotWith([fileRecord({ path: "internal/collections/ordered_map.go", units: [orderedMapType, getMethod] })]), "packages/tsts/src/internal/collections/ordered_map.ts", [orderedMapType, getMethod]);
  assert.match(text, /import type \{ bool \} from "..\/..\/go\/scalars\.js";/);
  assert.match(text, /import type \{ GoComparable, GoMap, GoPtr, GoSlice \}/);
  assert.match(text, /export interface OrderedMap<K extends GoComparable = unknown, V = unknown>/);
  assert.match(text, /export function OrderedMap_Get<K, V>\(receiver: GoPtr<OrderedMap<K, V>>, key: K\): \[V, bool\]/);
});
