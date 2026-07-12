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
  "generatedSourceCoveragePath",
  "goModulePath",
  "largeFileLineThreshold",
  "largeFileSplitPlan",
  "largeFileSplitPlanPath",
  "largeFileSplitStatusOut",
  "nonGoDeclarationPolicies",
  "nonGoExportRoutePolicies",
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

const requiredStrings = ["goModulePath", "reportOut", "snapshotOut", "sourceRoot", "statusOut", "tsRoot"];

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
  return config;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
