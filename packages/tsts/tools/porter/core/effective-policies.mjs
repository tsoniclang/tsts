import { policyFor, policyForUnit } from "./policies.mjs";
import { buildSemanticUnitEligibility } from "./semantic-unit-eligibility.mjs";

export function buildEffectivePolicyResolver(config, snapshot) {
  const semanticEligibility = buildSemanticUnitEligibility(snapshot);
  return Object.freeze({
    includes(file) {
      return semanticEligibility.includes(file);
    },
    file(file) {
      return semanticEligibility.policyFor(file, policyFor(config, file.path, file.generated));
    },
    unit(unit, file) {
      return semanticEligibility.policyFor(file, policyForUnit(config, unit, file));
    },
  });
}
