import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { join, posix, resolve, sep } from "node:path";

import { canonicalJson, compareUtf8, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { readVerifiedEvidenceFile, readVerifiedEvidenceJson } from "../sealed-evidence.mjs";
import { PINNED_GO_PRODUCER_SCHEMA_VERSION, pinnedGoProducerId } from "../pinned-go-producer.mjs";

export const ACCEPTED_OVERLAY_SCHEMA_VERSION = 1;
export const ACCEPTED_OVERLAY_PLAN_PATH = "plans/transpile-divergences-v1.json";
export const ACCEPTED_OVERLAY_ABSENT_MARKER = "<<< pinned TS-Go intentionally emits no output for this section >>>";

const PLAN_KEYS = ["entries", "planName", "schemaVersion"];
const ENTRY_KEYS = ["artifact", "caseFile", "configuration", "corpus", "divergences", "referenceArtifacts", "suite"];
const DIVERGENCE_KEYS = ["action", "occurrence", "reason", "section"];
const ACTIVE_KEYS = ["bindingEvidenceDigest", "bindingId", "bindingPath", "captureEvidenceDigest", "captureId", "schemaVersion"];
const CAPTURE_KEYS = ["captureId", "cases", "request", "schemaVersion"];
const CAPTURE_REQUEST_KEYS = ["barebonesLib", "execution", "inputs", "plan", "producer", "schemaVersion", "sourcePin"];
const CAPTURE_CASE_KEYS = ["artifact", "baselines", "caseFile", "comparisons", "configuration", "corpus", "index", "input", "inputWorkspace", "invocations", "sections", "suite"];
const COMPARISON_KEYS = ["action", "actualSha256", "baselineSha256", "occurrence", "section"];
const SECTION_KEYS = ["action", "baselineSha256", "contentPath", "name", "occurrence", "reason", "sha256"];
const BINDING_KEYS = ["bindingId", "capture", "overlays", "plan", "schemaVersion", "sourcePin"];
const OVERLAY_KEYS = ["artifact", "corpus", "path", "sections", "sha256", "suite"];
const SOURCE_PIN_KEYS = ["nestedSources", "objectFormat", "path", "revision", "sha256", "tree"];
const PRODUCER_KEYS = ["binary", "buildMetadata", "producerId", "request", "schemaVersion"];
const PRODUCER_REQUEST_KEYS = ["additionalProvenance", "build", "git", "label", "outputName", "overlays", "producerDriver", "schemaVersion", "source", "sourceModule", "sourceTree"];
const PRODUCER_SOURCE_KEYS = ["commitTime", "dirty", "objectFormat", "revision", "tree"];
const PRODUCER_BINARY_KEYS = ["bytes", "name", "sha256"];

export function loadAcceptedOverlayPlan(root) {
  const planPath = join(root, ACCEPTED_OVERLAY_PLAN_PATH);
  const bytes = readRegularFile(planPath, "accepted-overlay plan");
  const plan = JSON.parse(bytes.toString("utf8"));
  validatePlan(plan);
  return {
    path: ACCEPTED_OVERLAY_PLAN_PATH,
    bytes: bytes.length,
    sha256: sha256(bytes),
    planFingerprint: fingerprint(plan, "tsts-accepted-overlay-plan-v1"),
    value: plan,
  };
}

export function acceptedOverlaySourcePinIdentity(sourcePin) {
  const value = {
    path: sourcePin.path,
    sha256: sourcePin.sha256,
    revision: sourcePin.primary.revision,
    tree: sourcePin.primary.tree,
    objectFormat: sourcePin.primary.objectFormat,
    nestedSources: sourcePin.nestedSources.map((entry) => ({
      name: entry.name,
      path: entry.path,
      revision: entry.checkout.revision,
      tree: entry.checkout.tree,
      objectFormat: entry.checkout.objectFormat,
    })),
  };
  validateSourcePinIdentity(value);
  return value;
}

export function loadActiveAcceptedOverlayBinding({ root, sourcePin, caseRoot, baselineRoot, barebonesLibContent }) {
  const activePath = join(root, "active.json");
  const active = readStrictJson(activePath, ACTIVE_KEYS, "accepted-overlay active pointer");
  if (active.schemaVersion !== ACCEPTED_OVERLAY_SCHEMA_VERSION) throw new Error("unsupported accepted-overlay active schema");
  assertIdentifier(active.captureId, "accepted-overlay capture id");
  assertIdentifier(active.bindingId, "accepted-overlay binding id");
  const expectedBindingPath = `bindings/${active.bindingId}`;
  if (active.bindingPath !== expectedBindingPath) throw new Error(`accepted-overlay binding path must be '${expectedBindingPath}'`);
  assertDigest(active.captureEvidenceDigest, "accepted-overlay capture evidence digest");
  assertDigest(active.bindingEvidenceDigest, "accepted-overlay binding evidence digest");

  const expectedSourcePin = acceptedOverlaySourcePinIdentity(sourcePin);
  const plan = loadAcceptedOverlayPlan(root);
  const capture = verifyAcceptedOverlayCapture({
    root,
    captureId: active.captureId,
    expectedSourcePin,
    expectedPlan: plan,
    currentInputs: { caseRoot, baselineRoot, barebonesLibContent },
  });
  if (capture.seal.evidenceDigest !== active.captureEvidenceDigest) throw new Error("accepted-overlay active capture digest mismatch");
  const binding = verifyAcceptedOverlayBinding({
    root,
    bindingId: active.bindingId,
    capture,
    expectedSourcePin,
    expectedPlan: plan,
  });
  if (binding.seal.evidenceDigest !== active.bindingEvidenceDigest) throw new Error("accepted-overlay active binding digest mismatch");
  return { active, capture, binding, plan };
}

export function verifyAcceptedOverlayCapture({ root, captureId, expectedSourcePin, expectedPlan, currentInputs }) {
  assertIdentifier(captureId, "accepted-overlay capture id");
  const relativePath = `captures/${captureId}`;
  const directory = resolveContained(root, relativePath);
  assertDirectoryEntries(directory, ["COMPLETE.json", "capture.json", "raw"], "accepted-overlay capture");
  const captureEvidence = readVerifiedEvidenceJson(directory, "capture.json");
  const seal = captureEvidence.seal;
  if (canonicalJson(seal.metadata) !== canonicalJson({ kind: "tsgo-accepted-capture", captureId })) throw new Error("accepted-overlay capture seal metadata mismatch");
  const capture = captureEvidence.value;
  assertExactKeys(capture, CAPTURE_KEYS, "accepted-overlay capture");
  if (capture.schemaVersion !== ACCEPTED_OVERLAY_SCHEMA_VERSION || capture.captureId !== captureId) throw new Error("accepted-overlay capture identity mismatch");
  assertExactKeys(capture.request, CAPTURE_REQUEST_KEYS, "accepted-overlay capture request");
  if (capture.request.schemaVersion !== ACCEPTED_OVERLAY_SCHEMA_VERSION) throw new Error("unsupported accepted-overlay capture request schema");
  if (fingerprint(capture.request, "tsts-accepted-overlay-capture-v1") !== captureId) throw new Error("accepted-overlay capture request fingerprint mismatch");
  if (canonicalJson(capture.request.sourcePin) !== canonicalJson(expectedSourcePin)) throw new Error("accepted-overlay capture source pin mismatch");
  if (canonicalJson(capture.request.plan) !== canonicalJson(planIdentity(expectedPlan))) throw new Error("accepted-overlay capture plan mismatch");
  validateProducerProvenance(capture.request.producer, expectedSourcePin);
  validateByteDigest(capture.request.barebonesLib, "accepted-overlay barebones lib");
  validateCaptureExecution(capture.request.execution);
  validateCaptureCases(directory, capture.cases, expectedPlan.value.entries);
  if (currentInputs !== undefined) validateCurrentCaptureInputs(capture, expectedPlan.value.entries, currentInputs);
  return { capture, directory, relativePath, seal };
}

export function verifyAcceptedOverlayBinding({ root, bindingId, capture, expectedSourcePin, expectedPlan }) {
  assertIdentifier(bindingId, "accepted-overlay binding id");
  const relativePath = `bindings/${bindingId}`;
  const directory = resolveContained(root, relativePath);
  assertDirectoryEntries(directory, ["COMPLETE.json", "binding.json", "overlays"], "accepted-overlay binding");
  const bindingEvidence = readVerifiedEvidenceJson(directory, "binding.json");
  const seal = bindingEvidence.seal;
  if (canonicalJson(seal.metadata) !== canonicalJson({ kind: "tsgo-accepted-binding", bindingId })) throw new Error("accepted-overlay binding seal metadata mismatch");
  const binding = bindingEvidence.value;
  assertExactKeys(binding, BINDING_KEYS, "accepted-overlay binding");
  if (binding.schemaVersion !== ACCEPTED_OVERLAY_SCHEMA_VERSION || binding.bindingId !== bindingId) throw new Error("accepted-overlay binding identity mismatch");
  const unsigned = { ...binding };
  delete unsigned.bindingId;
  if (fingerprint(unsigned, "tsts-accepted-overlay-binding-v1") !== bindingId) throw new Error("accepted-overlay binding fingerprint mismatch");
  if (canonicalJson(binding.sourcePin) !== canonicalJson(expectedSourcePin)) throw new Error("accepted-overlay binding source pin mismatch");
  if (canonicalJson(binding.plan) !== canonicalJson(planIdentity(expectedPlan))) throw new Error("accepted-overlay binding plan mismatch");
  assertExactKeys(binding.capture, ["captureId", "evidenceDigest", "path"], "accepted-overlay binding capture");
  if (binding.capture.captureId !== capture.capture.captureId || binding.capture.path !== capture.relativePath || binding.capture.evidenceDigest !== capture.seal.evidenceDigest) {
    throw new Error("accepted-overlay binding capture reference mismatch");
  }
  const overlays = validateBoundOverlays(directory, binding.overlays, capture.capture.cases);
  return { binding, directory, relativePath, seal, overlays };
}

export function acceptedOverlaySections(activeBinding, corpus, suite, artifact) {
  const key = overlayKey(corpus, suite, artifact);
  const overlay = activeBinding.binding.overlays.get(key);
  return overlay?.sections;
}

export function parseAcceptedOverlaySections(text) {
  const lines = normalizeText(text).split("\n");
  const sections = [];
  let name;
  let content = [];
  const flush = () => {
    if (name === undefined) return;
    while (content.at(-1) === "") content.pop();
    sections.push({ name, content: content.join("\n") });
    content = [];
  };
  for (const line of lines) {
    const marker = /^\/\/\/\/ \[(.*)] \/\/\/\/$/.exec(line);
    if (marker !== null) {
      flush();
      name = marker[1];
    } else if (name !== undefined) {
      content.push(line);
    }
  }
  flush();
  return sections;
}

export function acceptedOverlayPlanIdentity(plan) {
  return planIdentity(plan);
}

export function acceptedOverlaySha256(value) {
  return sha256(value);
}

function validatePlan(plan) {
  assertExactKeys(plan, PLAN_KEYS, "accepted-overlay plan");
  if (plan.schemaVersion !== ACCEPTED_OVERLAY_SCHEMA_VERSION || !/^[a-z0-9-]+$/.test(plan.planName)) throw new Error("invalid accepted-overlay plan identity");
  if (!Array.isArray(plan.entries) || plan.entries.length === 0) throw new Error("accepted-overlay plan entries must be non-empty");
  const keys = new Set();
  for (const [index, entry] of plan.entries.entries()) {
    assertExactKeys(entry, ENTRY_KEYS, `accepted-overlay plan entry ${index}`);
    if (entry.corpus !== "typescript" || entry.suite !== "transpile") throw new Error(`unsupported accepted-overlay plan lane at entry ${index}`);
    safeRelativePath(entry.caseFile, `accepted-overlay case ${index}`);
    safeFileName(entry.artifact, `accepted-overlay artifact ${index}`);
    if (!Array.isArray(entry.referenceArtifacts) || entry.referenceArtifacts.length === 0 || !entry.referenceArtifacts.includes(entry.artifact)) throw new Error(`accepted-overlay entry ${index} referenceArtifacts must include its overlay artifact`);
    const referenceArtifacts = new Set();
    for (const artifact of entry.referenceArtifacts) {
      safeFileName(artifact, `accepted-overlay reference artifact ${index}`);
      if (referenceArtifacts.has(artifact)) throw new Error(`duplicate accepted-overlay reference artifact '${artifact}'`);
      referenceArtifacts.add(artifact);
    }
    if (entry.configuration !== null && (typeof entry.configuration !== "string" || entry.configuration === "")) throw new Error(`invalid accepted-overlay configuration at entry ${index}`);
    validateDivergences(entry.divergences, index);
    const key = overlayKey(entry.corpus, entry.suite, entry.artifact);
    if (keys.has(key)) throw new Error(`duplicate accepted-overlay artifact '${key}'`);
    keys.add(key);
  }
}

function validateCaptureCases(directory, cases, entries) {
  if (!Array.isArray(cases) || cases.length !== entries.length) throw new Error("accepted-overlay capture case coverage is incomplete");
  for (let index = 0; index < entries.length; index += 1) {
    const record = cases[index];
    const entry = entries[index];
    assertExactKeys(record, CAPTURE_CASE_KEYS, `accepted-overlay capture case ${index}`);
    for (const key of ["artifact", "caseFile", "configuration", "corpus", "suite"]) {
      if (record[key] !== entry[key]) throw new Error(`accepted-overlay capture case ${index} ${key} mismatch`);
    }
    if (record.index !== index) throw new Error(`accepted-overlay capture case ${index} index mismatch`);
    validateByteDigest(record.input, `accepted-overlay capture case ${index} input`);
    if (!Array.isArray(record.baselines) || record.baselines.length !== entry.referenceArtifacts.length) throw new Error(`accepted-overlay capture case ${index} baseline coverage mismatch`);
    for (let baselineIndex = 0; baselineIndex < entry.referenceArtifacts.length; baselineIndex += 1) {
      const baseline = record.baselines[baselineIndex];
      assertExactKeys(baseline, ["artifact", "bytes", "sha256"], `accepted-overlay capture case ${index} baseline ${baselineIndex}`);
      if (baseline.artifact !== entry.referenceArtifacts[baselineIndex]) throw new Error(`accepted-overlay capture case ${index} baseline identity mismatch`);
      if (!Number.isSafeInteger(baseline.bytes) || baseline.bytes < 0) throw new Error(`accepted-overlay capture case ${index} baseline byte count is invalid`);
      assertDigest(baseline.sha256, `accepted-overlay capture case ${index} baseline`);
    }
    validateWorkspace(directory, record.inputWorkspace, `accepted-overlay capture case ${index} input workspace`, `capture-input-${index}`);
    validateInvocations(directory, record.invocations, index);
    validateComparisons(record.comparisons, entry.divergences, index);
    const comparisonByKey = new Map(record.comparisons.map((comparison) => [`${comparison.section}\0${comparison.occurrence}`, comparison]));
    if (!Array.isArray(record.sections) || record.sections.length !== entry.divergences.length) throw new Error(`accepted-overlay capture case ${index} section coverage mismatch`);
    for (let sectionIndex = 0; sectionIndex < entry.divergences.length; sectionIndex += 1) {
      const section = record.sections[sectionIndex];
      const divergence = entry.divergences[sectionIndex];
      assertExactKeys(section, SECTION_KEYS, `accepted-overlay capture case ${index} section ${sectionIndex}`);
      if (section.name !== divergence.section || section.action !== divergence.action || section.occurrence !== divergence.occurrence || section.reason !== divergence.reason) {
        throw new Error(`accepted-overlay capture case ${index} section identity mismatch`);
      }
      const comparison = comparisonByKey.get(`${section.name}\0${section.occurrence}`);
      const absentDigest = sha256(Buffer.from(ACCEPTED_OVERLAY_ABSENT_MARKER));
      const expectedSectionDigest = section.action === "absent" ? absentDigest : comparison?.actualSha256;
      const expectedBaselineDigest = comparison?.baselineSha256 ?? absentDigest;
      if (comparison === undefined || comparison.action !== section.action || section.sha256 !== expectedSectionDigest || section.baselineSha256 !== expectedBaselineDigest) {
        throw new Error(`accepted-overlay capture section '${section.name}' is not bound to its complete comparison`);
      }
      assertDigest(section.sha256, `accepted-overlay capture section ${section.name}`);
      assertDigest(section.baselineSha256, `accepted-overlay baseline section ${section.name}`);
      if (section.sha256 === section.baselineSha256) throw new Error(`accepted-overlay section '${record.artifact}#${section.name}' is stale`);
      const contentPath = safeRelativePath(section.contentPath, `accepted-overlay capture section ${section.name}`);
      const bytes = readVerifiedEvidenceFile(directory, contentPath).bytes;
      if (sha256(bytes) !== section.sha256) throw new Error(`accepted-overlay capture section '${section.name}' digest mismatch`);
      if (section.action === "absent" && normalizeText(bytes.toString("utf8")) !== ACCEPTED_OVERLAY_ABSENT_MARKER) throw new Error(`accepted-overlay absent section '${section.name}' has invalid marker`);
    }
  }
}

function validateComparisons(comparisons, divergences, caseIndex) {
  if (!Array.isArray(comparisons) || comparisons.length === 0) throw new Error(`accepted-overlay capture case ${caseIndex} comparisons must be non-empty`);
  const observedDivergences = [];
  const keys = new Set();
  for (const [index, comparison] of comparisons.entries()) {
    assertExactKeys(comparison, COMPARISON_KEYS, `accepted-overlay comparison ${caseIndex}:${index}`);
    safeRelativePath(comparison.section, `accepted-overlay comparison ${caseIndex}:${index} section`);
    if (comparison.occurrence !== "aggregate" && (!Number.isSafeInteger(comparison.occurrence) || comparison.occurrence < 1)) throw new Error(`invalid accepted-overlay comparison occurrence ${caseIndex}:${index}`);
    const key = `${comparison.section}\0${comparison.occurrence}`;
    if (keys.has(key)) throw new Error(`duplicate accepted-overlay comparison '${key}'`);
    keys.add(key);
    if (!new Set(["equal", "content", "absent"]).has(comparison.action)) throw new Error(`invalid accepted-overlay comparison action ${caseIndex}:${index}`);
    for (const digest of [comparison.actualSha256, comparison.baselineSha256]) if (digest !== null) assertDigest(digest, `accepted-overlay comparison ${caseIndex}:${index}`);
    if (comparison.action === "equal") {
      if (comparison.actualSha256 !== comparison.baselineSha256) throw new Error(`accepted-overlay equal comparison ${caseIndex}:${index} differs`);
    } else {
      if (comparison.action === "content" && comparison.actualSha256 === null) throw new Error(`accepted-overlay content comparison ${caseIndex}:${index} has no content`);
      if (comparison.action === "absent" && comparison.actualSha256 !== null) throw new Error(`accepted-overlay absent comparison ${caseIndex}:${index} has content`);
      if (comparison.actualSha256 === comparison.baselineSha256) throw new Error(`accepted-overlay divergent comparison ${caseIndex}:${index} is equal`);
      observedDivergences.push({ section: comparison.section, occurrence: comparison.occurrence, action: comparison.action });
    }
  }
  const planned = divergences.map(({ section, occurrence, action }) => ({ section, occurrence, action }));
  const sort = (left, right) => compareUtf8(`${left.section}\0${left.occurrence}`, `${right.section}\0${right.occurrence}`);
  if (canonicalJson(observedDivergences.sort(sort)) !== canonicalJson(planned.sort(sort))) throw new Error(`accepted-overlay capture case ${caseIndex} divergence set does not match its reviewed plan`);
}

function validateCurrentCaptureInputs(capture, entries, currentInputs) {
  if (typeof currentInputs.caseRoot !== "string" || typeof currentInputs.baselineRoot !== "string" || typeof currentInputs.barebonesLibContent !== "string") {
    throw new Error("accepted-overlay current input roots and barebones lib are required");
  }
  const currentBarebones = byteDigest(Buffer.from(currentInputs.barebonesLibContent));
  if (canonicalJson(currentBarebones) !== canonicalJson(capture.request.barebonesLib)) throw new Error("accepted-overlay barebones lib input changed");
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const record = capture.cases[index];
    const input = byteDigest(readRegularFile(resolveContained(currentInputs.caseRoot, entry.caseFile), `accepted-overlay current case ${index}`));
    if (canonicalJson(input) !== canonicalJson(record.input)) throw new Error(`accepted-overlay case '${entry.caseFile}' input changed`);
    const baselines = entry.referenceArtifacts.map((artifact) => ({
      artifact,
      ...byteDigest(readRegularFile(resolveContained(currentInputs.baselineRoot, `${entry.suite}/${artifact}`), `accepted-overlay current baseline ${index}:${artifact}`)),
    }));
    if (canonicalJson(baselines) !== canonicalJson(record.baselines)) throw new Error(`accepted-overlay baselines for '${entry.artifact}' changed`);
  }
}

function validateWorkspace(directory, workspace, label, digestLabel) {
  assertExactKeys(workspace, ["digest", "path"], label);
  const path = safeRelativePath(workspace.path, label);
  const root = resolveContained(directory, path);
  const actual = hashInputRoots([{ label: digestLabel, path: root }]).roots[0];
  if (canonicalJson(actual) !== canonicalJson(workspace.digest)) throw new Error(`${label} digest mismatch`);
}

function validateInvocations(directory, invocations, caseIndex) {
  if (!Array.isArray(invocations) || invocations.length === 0) throw new Error(`accepted-overlay capture case ${caseIndex} has no invocations`);
  for (const [index, invocation] of invocations.entries()) {
    assertExactKeys(invocation, ["args", "index", "kind", "label", "outputs", "signal", "status", "stderr", "stdout", "workspace"], `accepted-overlay invocation ${caseIndex}:${index}`);
    if (invocation.index !== index || !Array.isArray(invocation.args) || !invocation.args.every((value) => typeof value === "string")) throw new Error(`invalid accepted-overlay invocation ${caseIndex}:${index}`);
    if (!Number.isInteger(invocation.status) || invocation.status < 0 || invocation.status > 2 || invocation.signal !== null) throw new Error(`accepted-overlay invocation ${caseIndex}:${index} did not produce a compiler result`);
    validateReferencedBytes(directory, invocation.stdout, `accepted-overlay invocation ${caseIndex}:${index} stdout`);
    validateReferencedBytes(directory, invocation.stderr, `accepted-overlay invocation ${caseIndex}:${index} stderr`);
    validateWorkspace(directory, invocation.workspace, `accepted-overlay invocation ${caseIndex}:${index} workspace`, `capture-invocation-${caseIndex}-${index}`);
    if (!Array.isArray(invocation.outputs)) throw new Error(`accepted-overlay invocation ${caseIndex}:${index} outputs must be an array`);
    const outputPaths = new Set();
    for (const [outputIndex, output] of invocation.outputs.entries()) {
      assertExactKeys(output, ["bytes", "path", "present", "sha256"], `accepted-overlay invocation ${caseIndex}:${index} output ${outputIndex}`);
      const path = safeRelativePath(output.path, `accepted-overlay invocation ${caseIndex}:${index} output ${outputIndex}`);
      if (outputPaths.has(path)) throw new Error(`duplicate accepted-overlay invocation output '${path}'`);
      outputPaths.add(path);
      const absolute = resolveContained(resolveContained(directory, invocation.workspace.path), path);
      if (output.present === true) {
        const bytes = readRegularFile(absolute, `accepted-overlay invocation output '${path}'`);
        if (output.bytes !== bytes.length || output.sha256 !== sha256(bytes)) throw new Error(`accepted-overlay invocation output '${path}' digest mismatch`);
      } else if (output.present === false) {
        if (output.bytes !== null || output.sha256 !== null || existsSync(absolute)) throw new Error(`accepted-overlay absent invocation output '${path}' is invalid`);
      } else {
        throw new Error(`accepted-overlay invocation output '${path}' present flag is invalid`);
      }
    }
  }
}

function validateBoundOverlays(directory, overlays, captureCases) {
  if (!Array.isArray(overlays) || overlays.length !== captureCases.length) throw new Error("accepted-overlay binding coverage is incomplete");
  const result = new Map();
  for (const [index, overlay] of overlays.entries()) {
    const captureCase = captureCases[index];
    assertExactKeys(overlay, OVERLAY_KEYS, `accepted-overlay binding entry ${index}`);
    for (const key of ["artifact", "corpus", "suite"]) if (overlay[key] !== captureCase[key]) throw new Error(`accepted-overlay binding entry ${index} ${key} mismatch`);
    const expectedPath = `overlays/${overlay.corpus}/${overlay.suite}/${overlay.artifact}`;
    if (overlay.path !== expectedPath) throw new Error(`accepted-overlay path must be '${expectedPath}'`);
    const bytes = readVerifiedEvidenceFile(directory, overlay.path).bytes;
    if (sha256(bytes) !== overlay.sha256) throw new Error(`accepted-overlay '${overlay.artifact}' digest mismatch`);
    const sections = parseAcceptedOverlaySections(bytes.toString("utf8"));
    if (!Array.isArray(overlay.sections) || overlay.sections.length !== sections.length || sections.length !== captureCase.sections.length) {
      throw new Error(`accepted-overlay '${overlay.artifact}' section coverage mismatch`);
    }
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
      const metadata = overlay.sections[sectionIndex];
      const section = sections[sectionIndex];
      const captured = captureCase.sections[sectionIndex];
      assertExactKeys(metadata, ["action", "name", "occurrence", "reason", "sha256"], `accepted-overlay '${overlay.artifact}' section ${sectionIndex}`);
      const digest = sha256(Buffer.from(section.content));
      if (metadata.name !== section.name || metadata.action !== captured.action || metadata.occurrence !== captured.occurrence || metadata.reason !== captured.reason || metadata.name !== captured.name || metadata.sha256 !== digest || metadata.sha256 !== captured.sha256) {
        throw new Error(`accepted-overlay '${overlay.artifact}' section ${sectionIndex} does not match capture evidence`);
      }
    }
    const key = overlayKey(overlay.corpus, overlay.suite, overlay.artifact);
    if (result.has(key)) throw new Error(`duplicate accepted-overlay binding '${key}'`);
    result.set(key, { ...overlay, sections });
  }
  const overlayRoot = join(directory, "overlays");
  const declaredFiles = new Set(overlays.map((entry) => entry.path.slice("overlays/".length)));
  for (const file of walkRegularFiles(overlayRoot)) if (!declaredFiles.has(file)) throw new Error(`undeclared accepted-overlay file '${file}'`);
  return result;
}

function validateProducerProvenance(producer, sourcePin) {
  if (producer === null || typeof producer !== "object" || Array.isArray(producer)) throw new Error("accepted-overlay producer provenance must be an object");
  assertExactKeys(producer, PRODUCER_KEYS, "accepted-overlay producer provenance");
  assertExactKeys(producer.request, PRODUCER_REQUEST_KEYS, "accepted-overlay producer request");
  assertExactKeys(producer.request.source, PRODUCER_SOURCE_KEYS, "accepted-overlay producer source");
  assertExactKeys(producer.binary, PRODUCER_BINARY_KEYS, "accepted-overlay producer binary");
  assertIdentifier(producer.producerId, "accepted-overlay producer id");
  if (
    producer.schemaVersion !== PINNED_GO_PRODUCER_SCHEMA_VERSION
    || producer.request.schemaVersion !== PINNED_GO_PRODUCER_SCHEMA_VERSION
    || producer.producerId !== pinnedGoProducerId(producer.request)
    || producer.request.source.revision !== sourcePin.revision
    || producer.request.source.tree !== sourcePin.tree
    || producer.request.source.objectFormat !== sourcePin.objectFormat
    || producer.request.source.dirty !== false
    || canonicalJson(producer.request.additionalProvenance) !== canonicalJson({ sourcePin })
    || !Array.isArray(producer.request.overlays)
    || producer.request.overlays.length !== 0
    || producer.request.sourceModule !== "github.com/microsoft/typescript-go"
    || producer.request.build?.package !== "./cmd/tsgo"
    || producer.request.sourceTree?.vcsStatus?.modified !== false
    || producer.buildMetadata?.settings?.["vcs.revision"] !== sourcePin.revision
    || producer.buildMetadata?.settings?.["vcs.modified"] !== "false"
  ) {
    throw new Error("accepted-overlay producer does not prove the pinned TS-Go source");
  }
  if (typeof producer.binary.name !== "string" || producer.binary.name === "") throw new Error("accepted-overlay producer binary name is invalid");
  if (!Number.isSafeInteger(producer.binary.bytes) || producer.binary.bytes < 0) throw new Error("accepted-overlay producer binary byte count is invalid");
  assertDigest(producer.binary.sha256, "accepted-overlay producer binary");
}

function validateCaptureExecution(execution) {
  assertExactKeys(execution, ["arch", "environment", "platform", "runtime"], "accepted-overlay capture execution");
  if (typeof execution.arch !== "string" || execution.arch === "" || typeof execution.platform !== "string" || execution.platform === "") throw new Error("accepted-overlay capture platform identity is invalid");
  assertExactKeys(execution.runtime, ["execArgv", "executable", "startupNodeOptions", "version", "versions"], "accepted-overlay capture runtime");
  validateByteDigest(execution.runtime.executable, "accepted-overlay capture Node executable");
  if (!Array.isArray(execution.runtime.execArgv) || !execution.runtime.execArgv.every((value) => typeof value === "string") || typeof execution.runtime.startupNodeOptions !== "string" || typeof execution.runtime.version !== "string") {
    throw new Error("accepted-overlay capture Node runtime identity is invalid");
  }
  if (execution.environment === null || typeof execution.environment !== "object" || Array.isArray(execution.environment)) throw new Error("accepted-overlay capture environment is invalid");
  for (const [key, value] of Object.entries(execution.environment)) if (key === "" || typeof value !== "string") throw new Error("accepted-overlay capture environment values must be strings");
}

function validateSourcePinIdentity(value) {
  assertExactKeys(value, SOURCE_PIN_KEYS, "accepted-overlay source pin identity");
  assertDigest(value.sha256, "accepted-overlay source pin file");
  assertIdentifier(value.revision, "accepted-overlay source revision");
  assertIdentifier(value.tree, "accepted-overlay source tree");
  if (!Array.isArray(value.nestedSources)) throw new Error("accepted-overlay nested source identity must be an array");
}

function validateDivergences(divergences, index) {
  if (!Array.isArray(divergences) || divergences.length === 0) throw new Error(`accepted-overlay entry ${index} divergences must be non-empty`);
  const names = new Set();
  for (const [divergenceIndex, divergence] of divergences.entries()) {
    assertExactKeys(divergence, DIVERGENCE_KEYS, `accepted-overlay divergence ${index}:${divergenceIndex}`);
    safeRelativePath(divergence.section, `accepted-overlay section ${index}`);
    if (!new Set(["content", "absent"]).has(divergence.action)) throw new Error(`invalid accepted-overlay action at ${index}:${divergenceIndex}`);
    if (divergence.occurrence !== "aggregate" && (!Number.isSafeInteger(divergence.occurrence) || divergence.occurrence < 1)) throw new Error(`invalid accepted-overlay occurrence at ${index}:${divergenceIndex}`);
    if ((divergence.section === "Diagnostics reported") !== (divergence.occurrence === "aggregate")) throw new Error(`diagnostic accepted-overlay occurrences must be aggregate at ${index}:${divergenceIndex}`);
    if (typeof divergence.reason !== "string" || divergence.reason.trim().length < 24) throw new Error(`accepted-overlay divergence ${index}:${divergenceIndex} requires a durable reason`);
    const key = `${divergence.section}\0${divergence.occurrence}`;
    if (names.has(key)) throw new Error(`duplicate accepted-overlay section '${divergence.section}' at entry ${index}`);
    names.add(key);
  }
}

function validateByteDigest(value, label) {
  assertExactKeys(value, ["bytes", "sha256"], label);
  if (!Number.isSafeInteger(value.bytes) || value.bytes < 0) throw new Error(`${label} byte count is invalid`);
  assertDigest(value.sha256, label);
}

function byteDigest(bytes) {
  return { bytes: bytes.length, sha256: sha256(bytes) };
}

function validateReferencedBytes(directory, value, label) {
  assertExactKeys(value, ["bytes", "path", "sha256"], label);
  const bytes = readRegularFile(resolveContained(directory, safeRelativePath(value.path, label)), label);
  if (value.bytes !== bytes.length || value.sha256 !== sha256(bytes)) throw new Error(`${label} digest mismatch`);
}

function planIdentity(plan) {
  return { path: plan.path, bytes: plan.bytes, sha256: plan.sha256, planFingerprint: plan.planFingerprint };
}

function overlayKey(corpus, suite, artifact) {
  return `${corpus}\0${suite}\0${artifact}`;
}

function readStrictJson(path, keys, label) {
  const value = JSON.parse(readRegularFile(path, label).toString("utf8"));
  assertExactKeys(value, keys, label);
  return value;
}

function readRegularFile(path, label) {
  if (!existsSync(path)) throw new Error(`${label} is missing: ${path}`);
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${label} must be a regular file: ${path}`);
  return readFileSync(path);
}

function assertDirectoryEntries(directory, expected, label) {
  if (!existsSync(directory)) throw new Error(`${label} is missing: ${directory}`);
  const stat = lstatSync(directory);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`${label} must be a regular directory: ${directory}`);
  const actual = readdirSync(directory).sort(compareUtf8);
  if (canonicalJson(actual) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has unexpected entries`);
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}

function assertIdentifier(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{40,64}$/.test(value)) throw new Error(`${label} must be a full object or evidence id`);
}

function assertDigest(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be a sha256 digest`);
}

function safeRelativePath(value, label) {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  const normalized = value.replaceAll("\\", "/");
  if (normalized === "" || normalized.startsWith("/") || normalized.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} has unsafe path '${value}'`);
  return normalized;
}

function safeFileName(value, label) {
  safeRelativePath(value, label);
  if (value.includes("/") || value.includes("\\")) throw new Error(`${label} must be a file name`);
  return value;
}

function resolveContained(root, relativePath) {
  const resolvedRoot = resolve(root);
  const resolved = resolve(resolvedRoot, relativePath);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${sep}`)) throw new Error(`accepted-overlay path escapes root: ${relativePath}`);
  return resolved;
}

function walkRegularFiles(root, relativeDirectory = "") {
  const directory = relativeDirectory === "" ? root : join(root, relativeDirectory);
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareUtf8(left.name, right.name))) {
    const relativePath = relativeDirectory === "" ? entry.name : posix.join(relativeDirectory, entry.name);
    const absolutePath = join(directory, entry.name);
    const stat = lstatSync(absolutePath);
    if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in accepted-overlay binding: ${relativePath}`);
    if (stat.isDirectory()) files.push(...walkRegularFiles(root, relativePath));
    else if (stat.isFile()) files.push(relativePath);
    else throw new Error(`unsupported accepted-overlay entry: ${relativePath}`);
  }
  return files;
}

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n$/, "");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
