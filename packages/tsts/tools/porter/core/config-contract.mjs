import { normalizeExternalPackageSurfaceSelections } from "./external-package-declarations.mjs";
import { normalizeAuthoredFacadeModules, normalizeExternalFacadePolicyConfigs } from "./external-facade-config.mjs";
import { validateCanonicalRepositoryJsonPath, validateNonGoDeclarationManifestPath } from "./non-go-declaration-manifest.mjs";
import { activityForConfiguredPortCategory } from "./policies.mjs";

const allowedKeys = new Set([
  "astSchemaDir",
  "authoredFacadeModules",
  "diagnosticsCatalogInput",
  "diagnosticsLocaleDir",
  "diagnosticsLocaleInput",
  "externalFacadePolicies",
  "externalPackageSurfaceSelections",
  "generatedSourceCoveragePath",
  "goModulePath",
  "largeFileLineThreshold",
  "largeFileSplitPlanPath",
  "largeFileSplitStatusOut",
  "nonGoDeclarationManifestPath",
  "overrideCategories",
  "policies",
  "reportOut",
  "schemaFilePolicies",
  "schemaVersion",
  "semanticRelations",
  "signatureCheck",
  "snapshotOut",
  "sourcePinManifest",
  "sourceRoot",
  "statusOut",
  "tsFilePolicies",
  "tsRoot",
  "unitPolicies",
]);

const requiredStrings = ["goModulePath", "largeFileSplitPlanPath", "nonGoDeclarationManifestPath", "reportOut", "snapshotOut", "sourceRoot", "statusOut", "tsRoot"];

export function assertPorterConfig(config) {
  if (!isPlainObject(config)) throw new Error("Porter config must be one plain object");
  const unknown = Object.keys(config).filter((key) => !allowedKeys.has(key)).sort();
  if (unknown.length > 0) throw new Error(`Porter config contains unknown current-contract key(s): ${unknown.join(", ")}`);
  if (config.schemaVersion !== 3) throw new Error(`Porter config schemaVersion must be 3, got ${JSON.stringify(config.schemaVersion)}`);
  for (const key of requiredStrings) {
    if (typeof config[key] !== "string" || config[key] === "") throw new Error(`Porter config ${key} must be a non-empty string`);
  }
  if (!Number.isInteger(config.largeFileLineThreshold) || config.largeFileLineThreshold < 1) {
    throw new Error("Porter config largeFileLineThreshold must be a positive integer");
  }
  validatePathPolicies(config.policies ?? [], "policies");
  validateUnitPolicies(config.unitPolicies ?? []);
  const authoredFacadeModules = normalizeAuthoredFacadeModules(config);
  const facadePolicies = normalizeExternalFacadePolicyConfigs(config, authoredFacadeModules);
  const packageSelections = normalizeExternalPackageSurfaceSelections(config);
  const policiesByObject = new Map(facadePolicies.map((policy) => [policy.objectId, policy]));
  for (const selection of packageSelections.filter((entry) => entry.goKind === "type")) {
    const policy = policiesByObject.get(selection.objectId);
    if (policy !== undefined && (policy.storageStrategy !== "authored" || policy.tsModule !== selection.tsModule || policy.tsName !== selection.tsName)) {
      throw new Error(`external package type selection '${selection.objectId}' disagrees with its externalFacadePolicies storage identity`);
    }
  }
  validateNonGoDeclarationManifestPath(config.nonGoDeclarationManifestPath);
  validateCanonicalRepositoryJsonPath(config.largeFileSplitPlanPath, "Porter config largeFileSplitPlanPath");
  return config;
}

function validatePathPolicies(policies, label) {
  if (!Array.isArray(policies)) throw new Error(`Porter config ${label} must be an array`);
  const matches = new Set();
  for (const [index, policy] of policies.entries()) {
    validateExactPolicyObject(policy, `${label}[${index}]`, new Set(["category", "match", "reason"]));
    if (typeof policy.match !== "string" || policy.match === "") throw new Error(`Porter config ${label}[${index}].match must be a non-empty glob`);
    if (matches.has(policy.match)) throw new Error(`Porter config ${label} duplicates match '${policy.match}'`);
    matches.add(policy.match);
  }
}

function validateUnitPolicies(policies) {
  if (!Array.isArray(policies)) throw new Error("Porter config unitPolicies must be an array");
  const selectors = new Set();
  for (const [index, policy] of policies.entries()) {
    if (!isPlainObject(policy)) throw new Error(`Porter config unitPolicies[${index}] must be one plain object`);
    const hasId = Object.hasOwn(policy, "id");
    const hasMatch = Object.hasOwn(policy, "match");
    if (hasId === hasMatch) throw new Error(`Porter config unitPolicies[${index}] must contain exactly one of id or match`);
    validateExactPolicyObject(policy, `unitPolicies[${index}]`, new Set(["category", hasId ? "id" : "match", "reason"]));
    const selector = hasId ? policy.id : policy.match;
    if (typeof selector !== "string" || selector === "") throw new Error(`Porter config unitPolicies[${index}].${hasId ? "id" : "match"} must be non-empty`);
    const key = `${hasId ? "id" : "match"}:${selector}`;
    if (selectors.has(key)) throw new Error(`Porter config unitPolicies duplicates selector '${key}'`);
    selectors.add(key);
  }
}

function validateExactPolicyObject(policy, label, expectedKeys) {
  if (!isPlainObject(policy)) throw new Error(`Porter config ${label} must be one plain object`);
  const actual = Object.keys(policy).sort();
  const expected = [...expectedKeys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`Porter config ${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  activityForConfiguredPortCategory(policy.category);
  if (typeof policy.reason !== "string" || policy.reason.trim() === "") throw new Error(`Porter config ${label}.reason must be non-empty`);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
