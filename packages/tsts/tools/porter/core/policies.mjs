import { generatedSourcePolicyForPath } from "../generated-source.mjs";
import { matchGlob } from "../path-policy.mjs";

export const activePortCategories = new Set(["literal-port", "manual-required", "host-native"]);

export function expectedTsPath(config, unit, largeFileSplits = undefined) {
  const splitTarget = largeFileSplits?.assignments?.[unit.id];
  if (splitTarget) return splitTarget;
  const goPath = unit.metadata.goPath;
  return `${config.tsRoot}/${goPath.replace(/\.go$/, ".ts")}`;
}

export function policyFor(config, rel, generated) {
  const inactivePolicy = inactiveSourcePolicyFor(config, rel);
  if (inactivePolicy) {
    return { category: inactivePolicy.category, active: inactivePolicy.active, reason: inactivePolicy.reason };
  }
  if (generated) {
    return generatedSourcePolicyForPath(rel);
  }
  const override = (config.overrides ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (override) {
    return { category: override.category, reason: override.reason };
  }
  const policy = (config.policies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "literal-port", reason: "Default production compiler unit: mechanically port from TS-Go." };
}

export function inactiveSourcePolicyFor(config, rel) {
  return (config.policies ?? []).find((candidate) => candidate.active === false && matchGlob(candidate.match, rel));
}

export function policyForUnit(config, unit, file = undefined) {
  const unitPolicy = (config.unitPolicies ?? []).find((candidate) => {
    if (candidate.id && candidate.id === unit.id) return true;
    if (candidate.match && matchGlob(candidate.match, unit.id)) return true;
    return false;
  });
  if (unitPolicy) {
    return {
      category: unitPolicy.category,
      active: unitPolicy.active,
      reason: unitPolicy.reason,
    };
  }
  return policyFor(config, unit.metadata.goPath, unit.generated || file?.generated);
}

export function isActivePortPolicy(policy) {
  return policy.active !== false && activePortCategories.has(policy.category);
}

export function tsFilePolicyFor(config, rel) {
  const policy = (config.tsFilePolicies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "unclassified-ts-source", reason: "No TypeScript source policy matched this file." };
}
