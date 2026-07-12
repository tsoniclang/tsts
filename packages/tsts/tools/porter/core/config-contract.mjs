import { normalizeExternalPackageSurfaceSelections } from "./external-package-declarations.mjs";
import { normalizeAuthoredFacadeModules, normalizeExternalFacadePolicyConfigs } from "./external-facade-config.mjs";
import { validateNonGoDeclarationManifestPath } from "./non-go-declaration-manifest.mjs";

const allowedKeys = new Set([
  "astGeneratedDir",
  "astSchemaDir",
  "astSchemaInputs",
  "authoredFacadeModules",
  "diagnosticsCatalogInput",
  "diagnosticsGeneratedDir",
  "diagnosticsLocaleDir",
  "diagnosticsLocaleInput",
  "externalFacadePolicies",
  "externalPackageSurfaceSelections",
  "generatedSourceCoveragePath",
  "goModulePath",
  "largeFileLineThreshold",
  "largeFileSplitPlan",
  "largeFileSplitPlanPath",
  "largeFileSplitStatusOut",
  "nonGoDeclarationManifestPath",
  "overrideCategories",
  "overrides",
  "policies",
  "primaryUnitKinds",
  "protocolGeneratedInput",
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

const requiredStrings = ["goModulePath", "nonGoDeclarationManifestPath", "reportOut", "snapshotOut", "sourceRoot", "statusOut", "tsRoot"];

export function assertPorterConfig(config) {
  if (!isPlainObject(config)) throw new Error("Porter config must be one plain object");
  const unknown = Object.keys(config).filter((key) => !allowedKeys.has(key)).sort();
  if (unknown.length > 0) throw new Error(`Porter config contains unknown current-contract key(s): ${unknown.join(", ")}`);
  if (config.schemaVersion !== 1) throw new Error(`Porter config schemaVersion must be 1, got ${JSON.stringify(config.schemaVersion)}`);
  for (const key of requiredStrings) {
    if (typeof config[key] !== "string" || config[key] === "") throw new Error(`Porter config ${key} must be a non-empty string`);
  }
  if (!Array.isArray(config.primaryUnitKinds) || config.primaryUnitKinds.length === 0 ||
      config.primaryUnitKinds.some((kind) => typeof kind !== "string" || kind === "")) {
    throw new Error("Porter config primaryUnitKinds must be a non-empty string array");
  }
  if (new Set(config.primaryUnitKinds).size !== config.primaryUnitKinds.length) {
    throw new Error("Porter config primaryUnitKinds must be unique");
  }
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
  return config;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
