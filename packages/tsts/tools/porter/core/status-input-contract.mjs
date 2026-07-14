import { validateTsgoUnitMetadata } from "./ts-units.mjs";
import path from "node:path";

const buildStatusInputKeys = Object.freeze([
  "config",
  "snapshot",
  "tsUnits",
  "generatedArtifacts",
  "astGeneratedArtifacts",
  "diagnosticsGeneratedArtifacts",
  "bundledGeneratedArtifacts",
  "unicodeGeneratedArtifacts",
  "schemaSourceSync",
  "localOverrides",
  "sourcePin",
  "generatedSourceCoverage",
  "globalGeneratedArtifacts",
  "largeFileSplits",
  "valueOperationGeneratedArtifacts",
]);
const buildStatusInputKeySet = new Set(buildStatusInputKeys);
const tsUnitStatusEvidenceKeys = Object.freeze(["fileCount", "files", "units"]);
const tsUnitFileEvidenceKeys = Object.freeze(["metadataCount", "path"]);
const tsUnitRecordEvidenceKeys = Object.freeze(["id", "kind", "metadata", "path", "sigHash", "status"]);
const tsUnitRecordWithOverrideEvidenceKeys = Object.freeze([...tsUnitRecordEvidenceKeys, "override"]);
const tsUnitMetadataEvidenceKeys = Object.freeze(["id", "kind", "sigHash", "status"]);

export function validateBuildStatusInput(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(input))) {
    throw new TypeError("buildStatus input must be one exact object");
  }
  const keys = Reflect.ownKeys(input);
  if (keys.some((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(input, key);
    return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
  })) {
    throw new TypeError("buildStatus input must contain only enumerable own data properties");
  }
  const extra = keys.filter((key) => !buildStatusInputKeySet.has(key)).sort();
  if (extra.length > 0) throw new TypeError(`buildStatus input has extra key(s): ${extra.join(", ")}`);
  const missing = buildStatusInputKeys.filter((key) => !Object.hasOwn(input, key));
  if (missing.length > 0) throw new TypeError(`buildStatus input is missing required key(s): ${missing.join(", ")}`);
  const undefinedKeys = buildStatusInputKeys.filter((key) => input[key] === undefined);
  if (undefinedKeys.length > 0) throw new TypeError(`buildStatus input has undefined key(s): ${undefinedKeys.join(", ")}`);
  validateTsUnitStatusEvidence(input.tsUnits, input.config);
}

function validateTsUnitStatusEvidence(tsUnits, config) {
  requireExactDataObject(tsUnits, tsUnitStatusEvidenceKeys, "buildStatus tsUnits");
  if (!Number.isInteger(tsUnits.fileCount) || tsUnits.fileCount < 0) {
    throw new TypeError("buildStatus tsUnits.fileCount must be a non-negative integer");
  }
  requireDenseDataArray(tsUnits.files, "buildStatus tsUnits.files");
  requireDenseDataArray(tsUnits.units, "buildStatus tsUnits.units");
  if (tsUnits.fileCount !== tsUnits.files.length) {
    throw new TypeError(`buildStatus tsUnits.fileCount must equal files.length; got ${tsUnits.fileCount} and ${tsUnits.files.length}`);
  }

  const fileReports = new Map();
  let previousPath = "";
  for (const [index, file] of tsUnits.files.entries()) {
    const label = `buildStatus tsUnits.files[${index}]`;
    requireExactDataObject(file, tsUnitFileEvidenceKeys, label);
    requireCurrentTsPath(file.path, config, `${label}.path`);
    if (!Number.isInteger(file.metadataCount) || file.metadataCount < 0) {
      throw new TypeError(`${label}.metadataCount must be a non-negative integer`);
    }
    if (fileReports.has(file.path)) throw new TypeError(`buildStatus tsUnits.files duplicates path '${file.path}'`);
    if (index > 0 && previousPath >= file.path) {
      throw new TypeError("buildStatus tsUnits.files must be sorted by unique path");
    }
    fileReports.set(file.path, { index, metadataCount: file.metadataCount });
    previousPath = file.path;
  }

  const actualMetadataCounts = new Map();
  const unitIDs = new Set();
  let previousFileIndex = -1;
  for (const [index, unit] of tsUnits.units.entries()) {
    const label = `buildStatus tsUnits.units[${index}]`;
    validateCurrentTsUnitRecord(unit, config, label);
    if (unitIDs.has(unit.id)) throw new TypeError(`buildStatus tsUnits.units duplicates id '${unit.id}'`);
    unitIDs.add(unit.id);
    const fileReport = fileReports.get(unit.path);
    if (fileReport === undefined) {
      throw new TypeError(`${label}.path '${unit.path}' has no exact tsUnits.files record`);
    }
    if (fileReport.index < previousFileIndex) {
      throw new TypeError("buildStatus tsUnits.units must be grouped in tsUnits.files path order");
    }
    previousFileIndex = fileReport.index;
    actualMetadataCounts.set(unit.path, (actualMetadataCounts.get(unit.path) ?? 0) + 1);
  }

  for (const [filePath, fileReport] of fileReports) {
    const actual = actualMetadataCounts.get(filePath) ?? 0;
    if (actual !== fileReport.metadataCount) {
      throw new TypeError(`buildStatus tsUnits file '${filePath}' metadataCount must equal its unit-record count; got ${fileReport.metadataCount} and ${actual}`);
    }
  }
}

function validateCurrentTsUnitRecord(unit, config, label) {
  const expectedKeys = Object.hasOwn(unit ?? {}, "override")
    ? tsUnitRecordWithOverrideEvidenceKeys
    : tsUnitRecordEvidenceKeys;
  requireExactDataObject(unit, expectedKeys, label, new Set(["declarationMetadata"]));
  requireCurrentTsPath(unit.path, config, `${label}.path`);
  requireExactDataObject(unit.metadata, tsUnitMetadataEvidenceKeys, `${label}.metadata`);
  const metadataIssues = validateTsgoUnitMetadata(unit.metadata);
  if (metadataIssues.length > 0) {
    throw new TypeError(`${label}.metadata is invalid: ${metadataIssues.join("; ")}`);
  }
  for (const key of tsUnitMetadataEvidenceKeys) {
    if (unit[key] !== unit.metadata[key]) {
      throw new TypeError(`${label}.${key} must exactly equal ${label}.metadata.${key}`);
    }
  }
  if (Object.hasOwn(unit, "override")) requireJsonObject(unit.override, `${label}.override`);
}

function requireCurrentTsPath(value, config, label) {
  const tsRoot = typeof config?.tsRoot === "string" ? config.tsRoot.replaceAll("\\", "/").replace(/\/+$/, "") : "";
  if (typeof value !== "string" || value === "" || value.includes("\\") || path.posix.normalize(value) !== value ||
      !value.endsWith(".ts") || tsRoot === "" || !value.startsWith(`${tsRoot}/`)) {
    throw new TypeError(`${label} must be one normalized TypeScript path under config.tsRoot`);
  }
}

function requireExactDataObject(value, expectedKeys, label, allowedHiddenKeys = new Set()) {
  if (value === null || typeof value !== "object" || Array.isArray(value) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new TypeError(`${label} must be one exact object`);
  }
  const actualKeys = [];
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key === "string" && allowedHiddenKeys.has(key)) {
      if (descriptor?.enumerable !== false || !("value" in descriptor)) {
        throw new TypeError(`${label}.${key} must be a non-enumerable own data property`);
      }
      continue;
    }
    if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new TypeError(`${label} must contain only enumerable own data properties`);
    }
    actualKeys.push(key);
  }
  actualKeys.sort();
  const expected = [...expectedKeys].sort();
  if (actualKeys.length !== expected.length || actualKeys.some((key, index) => key !== expected[index])) {
    throw new TypeError(`${label} keys must be exactly ${expected.join(", ")}; got ${actualKeys.join(", ")}`);
  }
  for (const key of expected) {
    if (value[key] === undefined) throw new TypeError(`${label}.${key} must be defined`);
  }
}

function requireDenseDataArray(value, label) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) {
    throw new TypeError(`${label} must be one array`);
  }
  const expectedKeys = new Set(["length"]);
  for (let index = 0; index < value.length; index++) expectedKeys.add(String(index));
  const actualKeys = Reflect.ownKeys(value);
  if (actualKeys.length !== expectedKeys.size || actualKeys.some((key) => typeof key !== "string" || !expectedKeys.has(key))) {
    throw new TypeError(`${label} must be a dense array with no extra properties`);
  }
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new TypeError(`${label}[${index}] must be an enumerable own data property`);
    }
  }
}

function requireJsonObject(value, label) {
  requireJsonValue(value, label, new Set(), true);
}

function requireJsonValue(value, label, seen, requireObject = false) {
  if (value === null || typeof value === "string" || typeof value === "boolean" ||
      (typeof value === "number" && Number.isFinite(value))) {
    if (requireObject) throw new TypeError(`${label} must be one JSON object`);
    return;
  }
  if (typeof value !== "object") throw new TypeError(`${label} must contain only JSON values`);
  if (seen.has(value)) throw new TypeError(`${label} must not contain cycles`);
  seen.add(value);
  if (Array.isArray(value)) {
    if (requireObject) throw new TypeError(`${label} must be one JSON object`);
    requireDenseDataArray(value, label);
    for (const [index, item] of value.entries()) requireJsonValue(item, `${label}[${index}]`, seen);
  } else {
    if (![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
      throw new TypeError(`${label} must contain only plain JSON objects`);
    }
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
        throw new TypeError(`${label} must contain only enumerable own data properties`);
      }
      requireJsonValue(descriptor.value, `${label}.${key}`, seen);
    }
  }
  seen.delete(value);
}
