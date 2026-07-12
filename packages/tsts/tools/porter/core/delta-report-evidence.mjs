import { buildGeneratedSourceCoverage, buildGeneratedSourcePolicyStatus, generatedSourceMechanisms } from "../generated-source.mjs";
import { inactiveSourcePolicyFor } from "./policies.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { compareText } from "./deterministic-order.mjs";
import { hashText } from "./runtime.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";

export function buildDeltaSupplementalEvidence(config, fromSnapshot, toSnapshot) {
  const mechanisms = normalizedGeneratedSourceMechanisms();
  const fromPolicies = buildEffectivePolicyResolver(config, fromSnapshot);
  const toPolicies = buildEffectivePolicyResolver(config, toSnapshot);
  const fromGeneratedPolicy = generatedSourcePolicyStatus(config, fromSnapshot);
  const toGeneratedPolicy = generatedSourcePolicyStatus(config, toSnapshot);
  const fromCoverage = buildGeneratedSourceCoverage(fromSnapshot);
  const toCoverage = buildGeneratedSourceCoverage(toSnapshot);
  return {
    effectivePolicies: {
      contract: effectivePolicyContract(config, mechanisms),
      from: effectivePolicyEvidence(fromSnapshot, fromPolicies),
      to: effectivePolicyEvidence(toSnapshot, toPolicies),
    },
    generatedSourcePolicies: {
      mechanisms,
      from: fromGeneratedPolicy,
      to: toGeneratedPolicy,
      fromCoverage,
      toCoverage,
      delta: generatedSourceDelta(fromGeneratedPolicy, toGeneratedPolicy, fromCoverage, toCoverage),
    },
  };
}

function generatedSourceDelta(fromPolicy, toPolicy, fromCoverage, toCoverage) {
  const mechanisms = compareInventories(fromCoverage.mechanisms, toCoverage.mechanisms, (entry) => entry.id);
  const files = compareInventories(flattenCoverageFiles(fromCoverage), flattenCoverageFiles(toCoverage), (entry) => entry.id);
  const policyStatusChanged = JSON.stringify(fromPolicy) !== JSON.stringify(toPolicy);
  return {
    matches: !policyStatusChanged && mechanisms.addedCount === 0 && mechanisms.removedCount === 0 && mechanisms.changedCount === 0,
    policyStatusChanged,
    mechanisms,
    files,
  };
}

function flattenCoverageFiles(coverage) {
  return coverage.mechanisms.flatMap((mechanism) => mechanism.files.map((file) => ({
    id: `${mechanism.id}:${file.path}`,
    mechanism: mechanism.id,
    ...file,
  })));
}

function compareInventories(fromValues, toValues, identity) {
  const from = new Map(fromValues.map((value) => [identity(value), value]));
  const to = new Map(toValues.map((value) => [identity(value), value]));
  const added = [];
  const removed = [];
  const changed = [];
  for (const [id, value] of to) {
    const previous = from.get(id);
    if (previous === undefined) added.push(value);
    else if (JSON.stringify(previous) !== JSON.stringify(value)) changed.push({ ...value, previous });
  }
  for (const [id, value] of from) if (!to.has(id)) removed.push(value);
  for (const values of [added, removed, changed]) values.sort((left, right) => compareText(identity(left), identity(right)));
  return {
    fromCount: from.size,
    toCount: to.size,
    addedCount: added.length,
    removedCount: removed.length,
    changedCount: changed.length,
    added,
    removed,
    changed,
  };
}

function normalizedGeneratedSourceMechanisms() {
  return generatedSourceMechanisms.map((mechanism) => ({
    id: mechanism.id,
    mode: mechanism.mode,
    category: mechanism.category,
    active: mechanism.active,
    ...(mechanism.statusKey === undefined ? {} : { statusKey: mechanism.statusKey }),
    patterns: [...mechanism.patterns],
    reason: mechanism.reason,
  }));
}

function generatedSourcePolicyStatus(config, snapshot) {
  return buildGeneratedSourcePolicyStatus(snapshot, {
    isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
    requireAllMechanisms: false,
  });
}

function effectivePolicyContract(config, mechanisms) {
  const contract = {
    schemaVersion: 1,
    goModulePath: config.goModulePath,
    policies: structuredClone(config.policies ?? []),
    unitPolicies: structuredClone(config.unitPolicies ?? []),
    generatedSourceMechanisms: mechanisms,
  };
  return { ...contract, digest: hashText(JSON.stringify(contract)) };
}

function effectivePolicyEvidence(snapshot, resolver) {
  const files = snapshot.files.map((file) => ({
    path: file.path,
    included: resolver.includes(file),
    policy: resolver.file(file),
  }));
  const units = [];
  for (const file of snapshot.files) {
    for (const unit of file.units) {
      if (!isSemanticPrimaryUnitKind(unit.kind)) continue;
      units.push({ id: unit.id, path: file.path, policy: resolver.unit(unit, file) });
    }
  }
  units.sort((left, right) => compareText(left.id, right.id));
  const evidence = { files, units };
  return { ...evidence, digest: hashText(JSON.stringify(evidence)) };
}
