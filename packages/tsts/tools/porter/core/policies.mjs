import { generatedSourcePolicyForPath } from "../generated-source.mjs";
import { matchGlob } from "../path-policy.mjs";

const policyCategoryActivity = new Map([
  ["literal-port", true],
  ["manual-required", true],
  ["host-native", true],
  ["test", false],
  ["out-of-scope", false],
  ["semantic-excluded", false],
  ["semantic-declarationless", false],
  ["generated-artifact", false],
  ["unclassified-generated", false],
  ["ambiguous-generated", false],
]);

export const activePortCategories = Object.freeze(
  [...policyCategoryActivity].filter(([, active]) => active).map(([category]) => category),
);

export const configuredPortCategories = Object.freeze([
  "host-native",
  "literal-port",
  "manual-required",
  "out-of-scope",
  "test",
]);

export function expectedTsPath(config, unit, largeFileSplits = undefined) {
  const splitTarget = largeFileSplits?.assignments?.[unit.id];
  if (splitTarget) return splitTarget;
  const goPath = unit.metadata.goPath;
  return `${config.tsRoot}/${goPath.replace(/\.go$/, ".ts")}`;
}

export function policyFor(config, rel, generated) {
  const inactivePolicy = inactiveSourcePolicyFor(config, rel);
  if (inactivePolicy) {
    return normalizedPolicy(inactivePolicy);
  }
  if (generated) {
    return generatedSourcePolicyForPath(rel);
  }
  const policy = (config.policies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return normalizedPolicy(policy);
  }
  return normalizedPolicy({ category: "literal-port", reason: "Default production compiler unit: mechanically port from TS-Go." });
}

export function inactiveSourcePolicyFor(config, rel) {
  return (config.policies ?? []).find((candidate) => !activityForCategory(candidate.category) && matchGlob(candidate.match, rel));
}

export function policyForUnit(config, unit, file = undefined) {
  const unitPolicy = (config.unitPolicies ?? []).find((candidate) => {
    if (candidate.id && candidate.id === unit.id) return true;
    if (candidate.match && matchGlob(candidate.match, unit.id)) return true;
    return false;
  });
  if (unitPolicy) {
    return normalizedPolicy(unitPolicy);
  }
  return policyFor(config, unit.metadata.goPath, unit.generated || file?.generated);
}

export function isActivePortPolicy(policy) {
  const expected = activityForCategory(policy?.category);
  if (policy?.active !== expected) {
    throw new Error(`Porter policy category '${policy?.category}' must carry derived active=${expected}`);
  }
  return expected;
}

export function activityForConfiguredPortCategory(category) {
  if (!configuredPortCategories.includes(category)) {
    throw new Error(`unknown configured Porter policy category '${category}'`);
  }
  return activityForCategory(category);
}

export function tsFilePolicyFor(config, rel) {
  const policy = (config.tsFilePolicies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "unclassified-ts-source", reason: "No TypeScript source policy matched this file." };
}

function normalizedPolicy(policy) {
  return {
    category: policy.category,
    active: activityForCategory(policy.category),
    reason: policy.reason,
  };
}

function activityForCategory(category) {
  const active = policyCategoryActivity.get(category);
  if (active === undefined) throw new Error(`unknown Porter policy category '${category}'`);
  return active;
}
