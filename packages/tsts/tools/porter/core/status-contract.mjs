import { compareText } from "./deterministic-order.mjs";
import { requireGoValueOperationGeneratedArtifactStatus } from "./value-operations/generated-artifacts.mjs";

export const PORTER_STATUS_SCHEMA_VERSION = 5;

export const porterStatusKeys = Object.freeze([
  "astGeneratedArtifacts",
  "bundledGeneratedArtifacts",
  "categories",
  "counts",
  "diagnosticsGeneratedArtifacts",
  "duplicateGoIDs",
  "duplicateTsIDs",
  "excluded",
  "forbiddenTsFiles",
  "generatedArtifacts",
  "generatedAt",
  "generatedSourceCoverage",
  "generatedSourcePolicies",
  "globalGeneratedArtifacts",
  "invalidTsMetadata",
  "jsonTagCheck",
  "largeFileSplits",
  "localOverrides",
  "missing",
  "missingModules",
  "modules",
  "orphanTsUnits",
  "rows",
  "schemaSourceSync",
  "schemaVersion",
  "signatureCheck",
  "source",
  "sourceInterpretationIssues",
  "sourcePin",
  "splitPathMismatches",
  "stale",
  "ts",
  "unicodeGeneratedArtifacts",
  "unitlessGoFiles",
  "untrackedTsFiles",
  "valueOperationGeneratedArtifacts",
]);

export const porterStatusCountKeys = Object.freeze([
  "duplicateGoIDs",
  "duplicateTsIDs",
  "excluded",
  "forbiddenTsFiles",
  "generatedSourceCoverageIssues",
  "generatedSourcePolicyIssues",
  "globalGeneratedArtifactIssues",
  "implemented",
  "invalidAstArtifacts",
  "invalidBundledArtifacts",
  "invalidDiagnosticsArtifacts",
  "invalidGeneratedArtifacts",
  "invalidTsMetadata",
  "invalidUnicodeArtifacts",
  "invalidValueOperationGeneratedArtifacts",
  "largeFileSplitFailures",
  "localOverrideIssues",
  "missing",
  "missingAstArtifacts",
  "missingBundledArtifacts",
  "missingDiagnosticsArtifacts",
  "missingGeneratedArtifacts",
  "missingUnicodeArtifacts",
  "missingValueOperationGeneratedArtifacts",
  "orphan",
  "orphanAstArtifacts",
  "orphanBundledArtifacts",
  "orphanDiagnosticsArtifacts",
  "orphanGeneratedArtifacts",
  "orphanUnicodeArtifacts",
  "orphanValueOperationGeneratedArtifacts",
  "portable",
  "schemaFilePolicyIssues",
  "schemaSourceMismatches",
  "sourceInterpretationIssues",
  "sourcePinIssues",
  "splitPathMismatches",
  "stale",
  "staleAstArtifacts",
  "staleBundledArtifacts",
  "staleDiagnosticsArtifacts",
  "staleGeneratedArtifacts",
  "staleUnicodeArtifacts",
  "staleValueOperationGeneratedArtifacts",
  "stubbed",
  "unitlessGoFiles",
  "untrackedAstArtifacts",
  "untrackedBundledArtifacts",
  "untrackedDiagnosticsArtifacts",
  "untrackedGeneratedArtifacts",
  "untrackedTsFiles",
  "untrackedUnicodeArtifacts",
  "untrackedValueOperationGeneratedArtifacts",
]);

export function requireExactPorterStatus(status) {
  requireJsonEvidence(status, "Porter status");
  requireExactPlainObject(status, porterStatusKeys, "Porter status");
  if (status.schemaVersion !== PORTER_STATUS_SCHEMA_VERSION) {
    throw new Error(`Porter status.schemaVersion must be ${PORTER_STATUS_SCHEMA_VERSION}`);
  }
  if (typeof status.generatedAt !== "string" || !isExactIsoTimestamp(status.generatedAt)) {
    throw new Error("Porter status.generatedAt must be an exact ISO timestamp");
  }
  requireExactPlainObject(status.source, ["fileCount", "gitRevision", "lineCount", "root", "unitCount"], "Porter status.source");
  requireNonEmptyString(status.source.root, "Porter status.source.root");
  requireNonEmptyString(status.source.gitRevision, "Porter status.source.gitRevision");
  for (const key of ["fileCount", "lineCount", "unitCount"]) requireCount(status.source[key], `Porter status.source.${key}`);
  requireExactPlainObject(status.ts, ["metadataUnitCount", "root", "scannedFileCount"], "Porter status.ts");
  requireNonEmptyString(status.ts.root, "Porter status.ts.root");
  for (const key of ["metadataUnitCount", "scannedFileCount"]) requireCount(status.ts[key], `Porter status.ts.${key}`);
  requireExactPlainObject(status.counts, porterStatusCountKeys, "Porter status.counts");
  for (const key of porterStatusCountKeys) {
    requireCount(status.counts[key], `Porter status.counts.${key}`);
  }
  validateStatusCountEvidence(status);
  requireGoValueOperationGeneratedArtifactStatus(status.valueOperationGeneratedArtifacts);
  return status;
}

export function requireExactPlainObject(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new Error(`${label} must be one plain object`);
  }
  const actual = [];
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new Error(`${label} must contain only enumerable own data properties`);
    }
    actual.push(key);
  }
  actual.sort(compareText);
  const expected = [...expectedKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) {
    if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
  }
  return value;
}

function validateStatusCountEvidence(status) {
  const arrays = [
    ["duplicateGoIDs", "duplicateGoIDs"],
    ["duplicateTsIDs", "duplicateTsIDs"],
    ["orphan", "orphanTsUnits"],
    ["unitlessGoFiles", "unitlessGoFiles"],
    ["untrackedTsFiles", "untrackedTsFiles"],
    ["forbiddenTsFiles", "forbiddenTsFiles"],
    ["invalidTsMetadata", "invalidTsMetadata"],
    ["sourceInterpretationIssues", "sourceInterpretationIssues"],
    ["splitPathMismatches", "splitPathMismatches"],
    ["missing", "missing"],
    ["stale", "stale"],
    ["excluded", "excluded"],
  ];
  for (const [countKey, evidenceKey] of arrays) {
    requireDenseArray(status[evidenceKey], `Porter status.${evidenceKey}`);
    requireEqualCount(status.counts[countKey], status[evidenceKey].length, `Porter status.counts.${countKey}`, `Porter status.${evidenceKey}`);
  }

  requireDenseArray(status.rows, "Porter status.rows");
  const rowCounts = new Map();
  for (const [index, row] of status.rows.entries()) {
    if (row === null || typeof row !== "object" || Array.isArray(row)) throw new Error(`Porter status.rows[${index}] must be one row object`);
    rowCounts.set(row.status, (rowCounts.get(row.status) ?? 0) + 1);
  }
  for (const [countKey, statusName] of [["implemented", "implemented"], ["stubbed", "stub"], ["missing", "missing"], ["stale", "stale"], ["excluded", "excluded"]]) {
    requireEqualCount(status.counts[countKey], rowCounts.get(statusName) ?? 0, `Porter status.counts.${countKey}`, `rows with status '${statusName}'`);
  }
  requireEqualCount(status.counts.portable, status.rows.length - status.counts.excluded, "Porter status.counts.portable", "non-excluded rows");

  for (const [name, expected] of [["categories", status.rows.length], ["modules", status.rows.length], ["missingModules", status.counts.missing]]) {
    const total = requireCountMap(status[name], `Porter status.${name}`);
    requireEqualCount(total, expected, `sum of Porter status.${name}`, name === "missingModules" ? "missing rows" : "all rows");
  }

  const artifactStatuses = [
    ["generatedArtifacts", "Generated"],
    ["astGeneratedArtifacts", "Ast"],
    ["diagnosticsGeneratedArtifacts", "Diagnostics"],
    ["bundledGeneratedArtifacts", "Bundled"],
    ["unicodeGeneratedArtifacts", "Unicode"],
    ["valueOperationGeneratedArtifacts", "ValueOperationGenerated"],
  ];
  for (const [statusKey, countInfix] of artifactStatuses) {
    for (const [evidenceKey, countPrefix] of [["missing", "missing"], ["stale", "stale"], ["orphan", "orphan"], ["untracked", "untracked"], ["invalid", "invalid"]]) {
      const evidence = status[statusKey]?.[evidenceKey];
      requireDenseArray(evidence, `Porter status.${statusKey}.${evidenceKey}`);
      const countKey = `${countPrefix}${countInfix}Artifacts`;
      requireEqualCount(status.counts[countKey], evidence.length, `Porter status.counts.${countKey}`, `Porter status.${statusKey}.${evidenceKey}`);
    }
  }

  requireIssueCount(status, "generatedSourcePolicies", "generatedSourcePolicyIssues");
  requireIssueCount(status, "generatedSourceCoverage", "generatedSourceCoverageIssues");
  requireIssueCount(status, "globalGeneratedArtifacts", "globalGeneratedArtifactIssues");
  requireIssueCount(status, "sourcePin", "sourcePinIssues");
  requireDenseArray(status.schemaSourceSync?.mismatches, "Porter status.schemaSourceSync.mismatches");
  requireDenseArray(status.schemaSourceSync?.policyIssues, "Porter status.schemaSourceSync.policyIssues");
  requireEqualCount(status.counts.schemaSourceMismatches, status.schemaSourceSync.mismatches.length, "Porter status.counts.schemaSourceMismatches", "Porter status.schemaSourceSync.mismatches");
  requireEqualCount(status.counts.schemaFilePolicyIssues, status.schemaSourceSync.policyIssues.length, "Porter status.counts.schemaFilePolicyIssues", "Porter status.schemaSourceSync.policyIssues");
  requireDenseArray(status.localOverrides?.invalidInline, "Porter status.localOverrides.invalidInline");
  requireEqualCount(status.localOverrides?.failureCount, status.localOverrides.invalidInline.length, "Porter status.localOverrides.failureCount", "Porter status.localOverrides.invalidInline");
  requireEqualCount(status.counts.localOverrideIssues, status.localOverrides.failureCount, "Porter status.counts.localOverrideIssues", "Porter status.localOverrides.failureCount");
  requireDenseArray(status.largeFileSplits?.issues, "Porter status.largeFileSplits.issues");
  requireEqualCount(status.largeFileSplits?.failureCount, status.largeFileSplits.issues.length, "Porter status.largeFileSplits.failureCount", "Porter status.largeFileSplits.issues");
  requireEqualCount(status.counts.largeFileSplitFailures, status.largeFileSplits.failureCount, "Porter status.counts.largeFileSplitFailures", "Porter status.largeFileSplits.failureCount");
}

function requireIssueCount(status, evidenceKey, countKey) {
  const issues = status[evidenceKey]?.issues;
  requireDenseArray(issues, `Porter status.${evidenceKey}.issues`);
  requireEqualCount(status.counts[countKey], issues.length, `Porter status.counts.${countKey}`, `Porter status.${evidenceKey}.issues`);
}

function requireCountMap(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new Error(`${label} must be one plain count map`);
  }
  let total = 0;
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new Error(`${label} must contain only enumerable own data properties`);
    }
    requireCount(descriptor.value, `${label}.${key}`);
    total += descriptor.value;
    if (!Number.isSafeInteger(total)) throw new Error(`${label} total exceeds the safe-integer range`);
  }
  return total;
}

function requireDenseArray(value, label) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) throw new Error(`${label} must be one array`);
  const keys = Reflect.ownKeys(value);
  if (keys.length !== value.length + 1 || keys.some((key) => key !== "length" && (!/^\d+$/.test(String(key)) || Number(key) >= value.length))) {
    throw new Error(`${label} must be a dense array with no extra properties`);
  }
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor?.enumerable !== true || !("value" in descriptor)) throw new Error(`${label}[${index}] must be an enumerable own data property`);
  }
}

function requireJsonEvidence(value, label, seen = new Set()) {
  if (value === null || typeof value === "string" || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) return;
  if (typeof value !== "object") throw new Error(`${label} must contain only JSON data values`);
  if (seen.has(value)) throw new Error(`${label} must not contain cycles`);
  seen.add(value);
  if (Array.isArray(value)) {
    requireDenseArray(value, label);
    for (const [index, item] of value.entries()) requireJsonEvidence(item, `${label}[${index}]`, seen);
  } else {
    if (![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error(`${label} must contain only plain objects`);
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
        throw new Error(`${label} must contain only enumerable own data properties`);
      }
      requireJsonEvidence(descriptor.value, `${label}.${key}`, seen);
    }
  }
  seen.delete(value);
}

function requireCount(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function requireEqualCount(actual, expected, actualLabel, evidenceLabel) {
  requireCount(actual, actualLabel);
  if (actual !== expected) throw new Error(`${actualLabel} must equal ${evidenceLabel}; got ${actual} and ${expected}`);
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${label} must be a non-empty string`);
}

function isExactIsoTimestamp(value) {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}
