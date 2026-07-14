import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  applyMetadataReconciliationPlan,
  buildMetadataReconciliationPlan,
} from "../core/metadata-reconciliation.mjs";
import {
  completeVerificationStatus,
  emptyCounts,
  fileRecord,
  makePorterTestTemp,
  snapshotWith,
  tsUnitRecord,
  unitRecord,
} from "./helpers.mjs";

const oldHash = "1".repeat(64);
const newHash = "2".repeat(64);
const id = "m::internal/example/example.go::func::Run";
const sourcePath = "packages/tsts/src/internal/example/example.ts";

test("signature metadata reconciliation changes only the audited unit hash", () => {
  const fixture = fixtureState();
  const plan = buildMetadataReconciliationPlan(fixture.input);
  assert.equal(plan.staleUnitCount, 1);
  assert.equal(plan.fileCount, 1);
  assert.deepEqual(plan.files[0].unitIds, [id]);
  assert.equal(plan.files[0].updatedText, fixture.source.replace(first(oldHash), newHash));
  assert.match(plan.files[0].updatedText, new RegExp(`goSignatureHash\\":\\"${oldHash}`));

  assert.deepEqual(applyMetadataReconciliationPlan(plan), { fileCount: 1, unitCount: 1 });
  assert.equal(readFileSync(path.join(fixture.root, sourcePath), "utf8"), plan.files[0].updatedText);
});

test("metadata reconciliation is source-position independent and preserves multiline tag formatting", () => {
  const fixture = fixtureState({ multiline: true, prefix: "// 💚 byte offsets are irrelevant\n" });
  const plan = buildMetadataReconciliationPlan(fixture.input);
  assert.equal(plan.files[0].updatedText, fixture.source.replace(first(oldHash), newHash));
  assert.match(plan.files[0].updatedText, /@tsgo-unit \{\n \*   "id"/);
});

test("metadata reconciliation refuses semantic drift, filtered audits, stubs, and source races", () => {
  const mismatch = fixtureState();
  mismatch.input.status.signatureCheck.mismatchCount = 1;
  mismatch.input.status.signatureCheck.mismatches = [{ id, file: sourcePath, kind: "signature", detail: "drift" }];
  mismatch.input.status.signatureCheck.byKind = { signature: 1 };
  assert.throws(() => buildMetadataReconciliationPlan(mismatch.input), /otherwise clean full verification/);

  const filtered = fixtureState();
  filtered.input.status.signatureCheck.selection = { kind: "id-filter", pattern: id, matchedUnitCount: 1 };
  assert.throws(() => buildMetadataReconciliationPlan(filtered.input), /all-active signature audit/);

  const stub = fixtureState();
  stub.input.status.stale[0].tsStatus = "stub";
  stub.input.tsUnits.units[0].status = stub.input.tsUnits.units[0].metadata.status = "stub";
  assert.throws(() => buildMetadataReconciliationPlan(stub.input), /must be implemented/);

  const raced = fixtureState();
  const plan = buildMetadataReconciliationPlan(raced.input);
  writeFileSync(path.join(raced.root, sourcePath), `${raced.source}\n// concurrent edit\n`);
  assert.throws(() => applyMetadataReconciliationPlan(plan), /refusing to reconcile changed source file/);
});

test("metadata reconciliation rejects forged plans and noncanonical source paths", () => {
  assert.throws(() => applyMetadataReconciliationPlan({ files: [] }), /finalized plan/);
  const fixture = fixtureState();
  fixture.input.status.stale[0].tsPath = "../outside.ts";
  fixture.input.tsUnits.units[0].path = "../outside.ts";
  assert.throws(() => buildMetadataReconciliationPlan(fixture.input), /source path is not canonical/);
});

function fixtureState(options = {}) {
  const root = makePorterTestTemp("metadata-reconciliation-");
  const absolute = path.join(root, sourcePath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  const unitTag = options.multiline === true
    ? `@tsgo-unit {\n *   "id": "${id}",\n *   "kind": "func",\n *   "status": "implemented",\n *   "sigHash": "${oldHash}"\n * }`
    : `@tsgo-unit {"id":"${id}","kind":"func","status":"implemented","sigHash":"${oldHash}"}`;
  const documentText = `/**\n * ${unitTag}\n * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Exact fixture representation reason long enough for validation.","goSignatureHash":"${oldHash}","tsSignatureHash":"${"3".repeat(64)}"}\n */`;
  const source = `${options.prefix ?? ""}${documentText}\nexport function Run(): void {}\n`;
  writeFileSync(absolute, source, { encoding: "utf8", flag: "wx" });

  const goUnit = unitRecord({
    id,
    kind: "func",
    name: "Run",
    qualifiedName: "Run",
    goPath: "internal/example/example.go",
    sigHash: newHash,
  });
  const snapshot = snapshotWith([fileRecord({ path: "internal/example/example.go", units: [goUnit] })]);
  const row = {
    id,
    kind: "func",
    goPath: "internal/example/example.go",
    name: "Run",
    category: "literal-port",
    expectedTsPath: sourcePath,
    status: "stale",
    reason: "signature metadata hash drift",
    sigHash: newHash,
    tsPath: sourcePath,
    tsStatus: "implemented",
  };
  const counts = { ...emptyCounts(), portable: 1, stale: 1 };
  const status = completeVerificationStatus({
    counts,
    categories: { "literal-port": 1 },
    modules: { internal: 1 },
    stale: [row],
    rows: [row],
  });
  status.signatureCheck.checked = 1;
  status.signatureCheck.descriptors = 1;
  const tsUnit = tsUnitRecord({ id, kind: "func", path: sourcePath, sigHash: oldHash });
  Object.defineProperty(tsUnit, "declarationMetadata", {
    value: { documentText, statementIndex: 0 },
    enumerable: false,
  });
  return {
    root,
    source,
    input: {
      repositoryRoot: root,
      snapshot,
      status,
      tsUnits: { fileCount: 1, files: [{ path: sourcePath, metadataCount: 1 }], units: [tsUnit] },
    },
  };
}

function first(value) {
  return new RegExp(value);
}
