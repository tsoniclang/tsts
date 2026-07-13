import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  collectVerifyFailures,
  scanTsUnits,
} from "../porter.mjs";
import { emptyCounts, testSigHash } from "./helpers.mjs";
import { parserOptionsForConfig } from "../core/ts-units.mjs";

const removedBodySemanticFields = [
  "exceptionSafeCleanup",
  "implementationAnalysis",
  "implementationBody",
  "mechanicalRiskBody",
  "mechanicalRisks",
  "returnSemantics",
];

test("scanTsUnits parser options come from the signature profile", () => {
  const options = parserOptionsForConfig({
    signatureCheck: {
      parser: { distRoot: "custom/parser-dist", freshnessSrcDirs: ["custom/parser-src"] },
    },
  }, "/repo");
  assert.deepEqual(options, {
    distRoot: "/repo/custom/parser-dist",
    freshnessSrcDirs: ["/repo/custom/parser-src"],
  });
});

test("scanTsUnits records declaration metadata without interpreting TypeScript bodies", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-declarations-"));
  try {
    mkdirSync(path.join(root, "internal/debug"), { recursive: true });
    writeFileSync(path.join(root, "internal/debug/debug.ts"), `/**
 * @tsgo-unit {"id":"m::internal/debug/debug.go::func::Fail","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 * @tsgo-override {"category":"runtime-performance","allow":["signature"],"reason":"This declaration carries an audited local signature override.","goSignatureHash":"0000000000000000000000000000000000000000000000000000000000000000","tsSignatureHash":"1111111111111111111111111111111111111111111111111111111111111111"}
 *
 * Go source:
 * func Fail() {}
 */
export function Fail(): void {
  try { JSON.stringify(undefined as never); } finally { cleanup(); }
}
`);
    writeFileSync(path.join(root, "internal/debug/helper.ts"), "export const helper = undefined as never;\n");

    const result = await scanTsUnits(root);
    assert.equal(result.fileCount, 2);
    assert.equal(result.units.length, 1);
    assert.equal(Object.hasOwn(result.units[0], "embeddedGoSource"), false);
    assert.deepEqual(result.units[0].override, {
      category: "runtime-performance",
      allow: ["signature"],
      reason: "This declaration carries an audited local signature override.",
      goSignatureHash: "0".repeat(64),
      tsSignatureHash: "1".repeat(64),
    });
    for (const field of removedBodySemanticFields) assert.equal(Object.hasOwn(result.units[0], field), false, field);
    assert.deepEqual(result.files.map((file) => file.metadataCount).sort((left, right) => left - right), [0, 1]);
    assert.ok(result.files.every((file) => !Object.hasOwn(file, "sourceRisks")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits ignores metadata-like text outside attached declaration JSDoc", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-opaque-body-"));
  try {
    writeFileSync(path.join(root, "opaque.ts"), `/**
 * @tsgo-unit {"id":"m::opaque.go::func::Opaque","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 *
 * Go source:
 * func Opaque() {}
 */
export function Opaque(): void {
  const stringMarker = '@tsgo-unit {"id":"m::fake.go::func::Fake","kind":"func"}';
  // @tsgo-unit {"id":"m::comment.go::func::Comment","kind":"func"}
  function nested(): void {
    /** @tsgo-unit {"id":"m::nested.go::func::Nested","kind":"func"} */
    function bodyLocal(): void {}
    bodyLocal();
  }
  void stringMarker;
  nested();
}
`);
    const result = await scanTsUnits(root);
    assert.equal(result.units.length, 1);
    assert.equal(result.units[0].id, "m::opaque.go::func::Opaque");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits does not treat Go source prose as declaration evidence", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-source-label-"));
  try {
    writeFileSync(path.join(root, "bad.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 *
 * Go source: (uses a helper rather than embedding upstream source)
 */
export function Bad(): void {}
`);
    const result = await scanTsUnits(root);
    assert.equal(result.units.length, 1);
    assert.equal(result.units[0].id, "m::bad.go::func::Bad");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scanTsUnits rejects malformed, orphan, duplicate, and misplaced attached metadata", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-overrides-"));
  try {
    writeFileSync(path.join(root, "outside.ts"), "// @tsgo-override {}\nexport const value = 1;\n");
    assert.equal((await scanTsUnits(root)).units.length, 0);
    unlinkSync(path.join(root, "outside.ts"));

    writeFileSync(path.join(root, "orphan.ts"), `/** @tsgo-override {"category":"runtime-performance"} */
export function orphan(): void {}
`);
    await assert.rejects(scanTsUnits(root), /orphan @tsgo-override/);
    unlinkSync(path.join(root, "orphan.ts"));

    writeFileSync(path.join(root, "missing-json.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 * @tsgo-override
 */
export function Bad(): void {}
`);
    await assert.rejects(scanTsUnits(root), /must be followed by one JSON object/);
    unlinkSync(path.join(root, "missing-json.ts"));

    writeFileSync(path.join(root, "duplicate.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 * @tsgo-override {"category":"runtime-performance","allow":["signature"],"reason":"This durable reason is intentionally long enough for validation.","goSignatureHash":"0000000000000000000000000000000000000000000000000000000000000000","tsSignatureHash":"1111111111111111111111111111111111111111111111111111111111111111"}
 * @tsgo-override {"category":"runtime-performance","allow":["signature"],"reason":"This durable reason is intentionally long enough for validation.","goSignatureHash":"0000000000000000000000000000000000000000000000000000000000000000","tsSignatureHash":"1111111111111111111111111111111111111111111111111111111111111111"}
 */
export function Bad(): void {}
`);
    await assert.rejects(scanTsUnits(root), /duplicate @tsgo-override tags/);
    unlinkSync(path.join(root, "duplicate.ts"));

    writeFileSync(path.join(root, "misplaced.ts"), `/**
 * @tsgo-unit {"id":"m::bad.go::func::Bad","kind":"func","status":"implemented","sigHash":"${testSigHash}"}
 */
import "external-package";
`);
    await assert.rejects(scanTsUnits(root), /misplaced @tsgo-unit/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
