import assert from "node:assert/strict";
import { appendFileSync, cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  acceptedOverlaySections,
  loadAcceptedOverlayPlan,
  loadActiveAcceptedOverlayBinding,
} from "./accepted-overlay-contract.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";

const scriptRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptRoot, "../../../..");
const packageRoot = join(repoRoot, "packages/tsts");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");
const acceptedRoot = join(scriptRoot, "tsgo-accepted");
const caseRoot = join(vendorRoot, "_submodules/TypeScript/tests/cases");
const baselineRoot = join(vendorRoot, "_submodules/TypeScript/tests/baselines/reference");
const { barebonesLibContent } = await import(join(packageRoot, "dist/src/index.js"));

function load(root = acceptedRoot, inputs = { caseRoot, baselineRoot }) {
  return loadActiveAcceptedOverlayBinding({
    root,
    sourcePin: loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot }),
    caseRoot: inputs.caseRoot,
    baselineRoot: inputs.baselineRoot,
    barebonesLibContent,
  });
}

test("active TS-Go accepted overlays close plan, source, capture, binding, and section evidence", () => {
  const active = load();
  assert.equal(active.plan.value.entries.length, 14);
  assert.equal(active.binding.overlays.size, 14);
  let equalComparisons = 0;
  for (const entry of active.plan.value.entries) {
    const captured = active.capture.capture.cases.find((item) => item.artifact === entry.artifact);
    assert.ok(captured);
    const observed = captured.comparisons.filter((item) => item.action !== "equal").map(({ section, occurrence, action }) => ({ section, occurrence, action }));
    const planned = entry.divergences.map(({ section, occurrence, action }) => ({ section, occurrence, action }));
    assert.deepEqual(observed, planned, `complete comparison drift for ${entry.artifact}`);
    equalComparisons += captured.comparisons.filter((item) => item.action === "equal").length;
    assert.equal(new Set(captured.invocations.map((item) => item.workspace.path)).size, captured.invocations.length);
    const sections = acceptedOverlaySections(active, entry.corpus, entry.suite, entry.artifact);
    assert.deepEqual(sections.map((section) => section.name), entry.divergences.map((item) => item.section));
  }
  assert.ok(equalComparisons > 0, "capture must retain matching sections, not only planned divergences");
  assert.equal(acceptedOverlaySections(active, "typescript", "transpile", "not-declared.js"), undefined);
});

test("accepted-overlay evidence rejects byte tampering and undeclared files", () => {
  const copy = copyActiveEvidence();
  const active = JSON.parse(readFileSync(join(copy, "active.json"), "utf8"));
  const binding = JSON.parse(readFileSync(join(copy, active.bindingPath, "binding.json"), "utf8"));
  const overlay = join(copy, active.bindingPath, binding.overlays[0].path);
  appendFileSync(overlay, "tamper");
  assert.throws(() => load(copy), /evidence directory inventory mismatch/);

  const extraCopy = copyActiveEvidence();
  const extraActive = JSON.parse(readFileSync(join(extraCopy, "active.json"), "utf8"));
  writeFileSync(join(extraCopy, extraActive.bindingPath, "unexpected.txt"), "unexpected");
  assert.throws(() => load(extraCopy), /unexpected entries|evidence directory inventory mismatch/);
});

test("accepted-overlay evidence rejects current case, baseline, and plan drift", () => {
  const inputs = copyCurrentInputs();
  appendFileSync(join(inputs.caseRoot, "transpile/declarationRestParameters.ts"), "\n// drift");
  assert.throws(() => load(acceptedRoot, inputs), /input changed/);

  const copy = copyActiveEvidence();
  const planPath = join(copy, "plans/transpile-divergences-v1.json");
  const plan = JSON.parse(readFileSync(planPath, "utf8"));
  plan.unrecognized = true;
  writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
  assert.throws(() => loadAcceptedOverlayPlan(copy), /invalid keys/);
});

function copyActiveEvidence() {
  const destination = mkdtempSync(join(tmpdir(), "tsts-accepted-overlay-"));
  const active = JSON.parse(readFileSync(join(acceptedRoot, "active.json"), "utf8"));
  mkdirSync(join(destination, "plans"), { recursive: true });
  cpSync(join(acceptedRoot, "active.json"), join(destination, "active.json"));
  cpSync(join(acceptedRoot, "manifest.json"), join(destination, "manifest.json"));
  cpSync(join(acceptedRoot, "plans/transpile-divergences-v1.json"), join(destination, "plans/transpile-divergences-v1.json"));
  cpSync(join(acceptedRoot, `captures/${active.captureId}`), join(destination, `captures/${active.captureId}`), { recursive: true });
  cpSync(join(acceptedRoot, active.bindingPath), join(destination, active.bindingPath), { recursive: true });
  return destination;
}

function copyCurrentInputs() {
  const destination = mkdtempSync(join(tmpdir(), "tsts-accepted-inputs-"));
  const copiedCases = join(destination, "cases");
  const copiedBaselines = join(destination, "baselines");
  const plan = loadAcceptedOverlayPlan(acceptedRoot);
  for (const entry of plan.value.entries) {
    const caseDestination = join(copiedCases, entry.caseFile);
    mkdirSync(dirname(caseDestination), { recursive: true });
    cpSync(join(caseRoot, entry.caseFile), caseDestination);
    for (const artifact of entry.referenceArtifacts) {
      const baselineDestination = join(copiedBaselines, entry.suite, artifact);
      mkdirSync(dirname(baselineDestination), { recursive: true });
      cpSync(join(baselineRoot, entry.suite, artifact), baselineDestination);
    }
  }
  return { caseRoot: copiedCases, baselineRoot: copiedBaselines };
}
