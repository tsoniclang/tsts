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
  return {
    effectivePolicies: {
      contract: effectivePolicyContract(config, mechanisms),
      from: effectivePolicyEvidence(fromSnapshot, fromPolicies),
      to: effectivePolicyEvidence(toSnapshot, toPolicies),
    },
    generatedSourcePolicies: {
      mechanisms,
      from: generatedSourcePolicyStatus(config, fromSnapshot),
      to: generatedSourcePolicyStatus(config, toSnapshot),
      fromCoverage: buildGeneratedSourceCoverage(fromSnapshot),
      toCoverage: buildGeneratedSourceCoverage(toSnapshot),
    },
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
