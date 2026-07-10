import { buildSourcePinStatus, collectSourcePinFailures } from "../source-pin.mjs";
import { assertDirectory, fail, repoRoot, resolveRepo } from "./runtime.mjs";
import { spawnSync } from "node:child_process";
import path from "node:path";

export function runScan(config) {
  const sourceRoot = resolveRepo(config.sourceRoot);
  const helperDir = resolveRepo("packages/tsts/tools/porter/go-extractor");
  assertDirectory(sourceRoot, "TS-Go source root");
  assertDirectory(helperDir, "Go extractor");

  const result = spawnSync(
    "go",
    ["run", ".", "-root", sourceRoot, "-module", config.goModulePath],
    { cwd: helperDir, encoding: "utf8", maxBuffer: 1024 * 1024 * 512 },
  );
  if (result.error) {
    fail(`failed to execute go extractor: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`go extractor failed with exit ${result.status}\n${result.stderr}`);
  }
  try {
    const snapshot = JSON.parse(result.stdout);
    assertPorterSnapshot(snapshot, config, { allowParseErrors: true });
    return snapshot;
  } catch (error) {
    fail(`go extractor produced invalid snapshot: ${error.message}`);
  }
}

export function runPinnedScan(config) {
  assertSourcePinStatus(buildSourcePinStatus(repoRoot, config));
  const snapshot = runScan(config);
  assertPorterSnapshot(snapshot, config, { allowParseErrors: false });
  assertSourcePinStatus(buildSourcePinStatus(repoRoot, config, snapshot));
  return snapshot;
}

export const PORTER_SNAPSHOT_KEYS = Object.freeze(["environment", "files", "gitRevision", "modulePath", "schemaVersion", "sourceRoot", "summary"]);
export const PORTER_ENVIRONMENT_KEYS = Object.freeze(["goVersion", "goarch", "goos"]);
export const PORTER_SUMMARY_KEYS = Object.freeze(["buildTagCounts", "fileCount", "generatedFiles", "goFileCount", "importPathCount", "lineCount", "nodeKindCounts", "packageCounts", "structTagCount", "structTagKeyCounts", "unitCount", "unitKindCounts"]);
export const PORTER_FILE_KEYS = new Set(["buildTags", "featureCounts", "generated", "gitBlobHash", "implicitBuildTags", "importPath", "imports", "lineCount", "metadata", "nodeKindCounts", "packageName", "parseError", "path", "sourceHash", "structTags", "units"]);
export const PORTER_FILE_REQUIRED_KEYS = new Set([...PORTER_FILE_KEYS].filter((key) => key !== "parseError"));
export const PORTER_IMPORT_KEYS = new Set(["name", "packageName", "path", "resolutionError"]);
export const PORTER_UNIT_KEYS = new Set(["bodyHash", "endLine", "exported", "externalRefs", "featureCounts", "generated", "id", "kind", "members", "metadata", "name", "nodeKindCounts", "parameters", "qualifiedName", "receiver", "receiverMode", "receiverType", "results", "returnFacts", "sigHash", "signature", "snippet", "startLine", "typeExpression", "typeKind", "typeParameterDetails", "typeParameters", "valueSpecs"]);
export const PORTER_UNIT_REQUIRED_KEYS = new Set(["bodyHash", "endLine", "exported", "externalRefs", "featureCounts", "generated", "id", "kind", "members", "metadata", "name", "nodeKindCounts", "parameters", "qualifiedName", "results", "returnFacts", "sigHash", "signature", "snippet", "startLine", "typeParameterDetails", "typeParameters", "valueSpecs"]);
export const PORTER_TYPE_PARAMETER_KEYS = new Set(["constraint", "name"]);
export const PORTER_MEMBER_KEYS = new Set(["exported", "kind", "name", "startLine", "structDepth", "structTag", "tagValues", "type", "typeExpr"]);
export const PORTER_STRUCT_TAG_VALUE_KEYS = new Set(["key", "value"]);
export const PORTER_VALUE_SPEC_KEYS = new Set(["constIndex", "constantValues", "inferredValueTypes", "names", "type", "values"]);
export const PORTER_CONSTANT_VALUE_KEYS = new Set(["exact", "kind", "reason", "supported"]);
export const PORTER_EXTERNAL_REFERENCE_KEYS = new Set(["arity", "count", "importPath", "name", "package", "role"]);
export const PORTER_PARAMETER_KEYS = new Set(["names", "type", "variadic"]);
export const PORTER_TYPE_EXPRESSION_KEYS = new Set(["direction", "element", "key", "kind", "left", "length", "members", "name", "op", "package", "parameters", "results", "right", "text", "typeArgs", "value"]);
export const PORTER_RETURN_FACT_KEYS = new Set(["line", "results"]);
export const PORTER_RETURN_VALUE_FACT_KEYS = new Set(["kind"]);
export const PORTER_UNIT_KINDS = new Set(["constGroup", "func", "importGroup", "method", "type", "typeGroup", "varGroup"]);

export function validatePorterSnapshot(snapshot, config, options = {}) {
  const issues = [];
  if (snapshot === null || typeof snapshot !== "object" || Array.isArray(snapshot)) return ["snapshot must be an object"];
  compareExactKeys(snapshot, PORTER_SNAPSHOT_KEYS, "snapshot", issues);
  if (snapshot.schemaVersion !== 3) issues.push(`snapshot.schemaVersion must be 3, got ${JSON.stringify(snapshot.schemaVersion)}`);
  if (snapshot.modulePath !== config.goModulePath) issues.push(`snapshot.modulePath must be ${JSON.stringify(config.goModulePath)}`);
  const expectedRoot = resolveRepo(config.sourceRoot).split(path.sep).join("/");
  if (snapshot.sourceRoot !== expectedRoot) issues.push(`snapshot.sourceRoot must be ${JSON.stringify(expectedRoot)}`);
  if (!/^[a-f0-9]{40}$/.test(snapshot.gitRevision ?? "")) issues.push("snapshot.gitRevision must be a lowercase 40-character Git object id");

  if (snapshot.environment === null || typeof snapshot.environment !== "object" || Array.isArray(snapshot.environment)) {
    issues.push("snapshot.environment must be an object");
  } else {
    compareExactKeys(snapshot.environment, PORTER_ENVIRONMENT_KEYS, "snapshot.environment", issues);
    for (const key of PORTER_ENVIRONMENT_KEYS) {
      if (typeof snapshot.environment[key] !== "string" || snapshot.environment[key] === "") issues.push(`snapshot.environment.${key} must be a non-empty string`);
    }
  }
  if (!Array.isArray(snapshot.files)) return [...issues, "snapshot.files must be an array"];
  if (snapshot.summary === null || typeof snapshot.summary !== "object" || Array.isArray(snapshot.summary)) return [...issues, "snapshot.summary must be an object"];
  compareExactKeys(snapshot.summary, PORTER_SUMMARY_KEYS, "snapshot.summary", issues);

  const paths = new Set();
  const unitIDs = new Set();
  let previousPath = "";
  const aggregate = {
    goFileCount: 0,
    generatedFiles: 0,
    lineCount: 0,
    unitCount: 0,
    unitKindCounts: {},
    nodeKindCounts: {},
    buildTagCounts: {},
    packageCounts: {},
    structTagCount: 0,
    structTagKeyCounts: {},
    importPaths: new Set(),
  };
  for (const [fileIndex, file] of snapshot.files.entries()) {
    const label = `snapshot.files[${fileIndex}]`;
    if (file === null || typeof file !== "object" || Array.isArray(file)) {
      issues.push(`${label} must be an object`);
      continue;
    }
    compareAllowedKeys(file, PORTER_FILE_KEYS, label, issues);
    requireKeys(file, PORTER_FILE_REQUIRED_KEYS, label, issues);
    if (typeof file.path !== "string" || !file.path.endsWith(".go") || path.posix.isAbsolute(file.path) || file.path.split("/").includes("..")) {
      issues.push(`${label}.path must be a normalized relative .go path`);
      continue;
    }
    if (paths.has(file.path)) issues.push(`${label}.path duplicates ${file.path}`);
    paths.add(file.path);
    if (previousPath !== "" && previousPath >= file.path) issues.push("snapshot.files must be sorted by path with no duplicates");
    previousPath = file.path;
    aggregate.goFileCount++;
    if (!/^[a-f0-9]{64}$/.test(file.sourceHash ?? "")) issues.push(`${label}.sourceHash must be lowercase SHA-256`);
    if (!/^[a-f0-9]{40}$/.test(file.gitBlobHash ?? "")) issues.push(`${label}.gitBlobHash must be a lowercase SHA-1 Git blob id`);
    if (!Number.isInteger(file.lineCount) || file.lineCount < 0) issues.push(`${label}.lineCount must be a non-negative integer`);
    aggregate.lineCount += Number.isInteger(file.lineCount) ? file.lineCount : 0;
    if (file.generated === true) aggregate.generatedFiles++;
    if (typeof file.packageName === "string") incrementPlain(aggregate.packageCounts, file.packageName);
    if (typeof file.importPath === "string" && file.importPath !== "") aggregate.importPaths.add(file.importPath);
    validateStringArray(file.buildTags, `${label}.buildTags`, issues);
    validateStringArray(file.implicitBuildTags, `${label}.implicitBuildTags`, issues);
    validateCountRecord(file.nodeKindCounts, `${label}.nodeKindCounts`, issues);
    validateCountRecord(file.featureCounts, `${label}.featureCounts`, issues);
    validateStringRecord(file.metadata, `${label}.metadata`, issues);
    for (const tag of [...(file.buildTags ?? []), ...(file.implicitBuildTags ?? [])]) incrementPlain(aggregate.buildTagCounts, tag);
    mergeCounts(aggregate.nodeKindCounts, file.nodeKindCounts);
    if (!Array.isArray(file.units)) issues.push(`${label}.units must be an array`);
    if (!Array.isArray(file.imports)) issues.push(`${label}.imports must be an array`);
    for (const [importIndex, imported] of (Array.isArray(file.imports) ? file.imports : []).entries()) {
      const importLabel = `${label}.imports[${importIndex}]`;
      validateSnapshotObject(imported, PORTER_IMPORT_KEYS, importLabel, issues, new Set(["path"]));
      if (typeof imported?.path !== "string" || imported.path === "") issues.push(`${importLabel}.path must be a non-empty string`);
      for (const key of ["name", "packageName", "resolutionError"]) {
        if (imported?.[key] !== undefined && typeof imported[key] !== "string") issues.push(`${importLabel}.${key} must be a string when present`);
      }
    }
    if (!Array.isArray(file.structTags)) issues.push(`${label}.structTags must be an array`);
    for (const [tagIndex, member] of (Array.isArray(file.structTags) ? file.structTags : []).entries()) {
      const tagLabel = `${label}.structTags[${tagIndex}]`;
      validateSnapshotObject(member, PORTER_MEMBER_KEYS, tagLabel, issues);
      validateStructTagValues(member, tagLabel, issues);
      validateTypeExpression(member?.typeExpr, `${tagLabel}.typeExpr`, issues);
      if (typeof member?.structTag !== "string") issues.push(`${tagLabel}.structTag is required`);
      if (!Number.isInteger(member?.startLine) || member.startLine < 1 || member.startLine > file.lineCount) issues.push(`${tagLabel}.startLine must identify a line in the source file`);
      if (!Number.isInteger(member?.structDepth) || member.structDepth < 1) issues.push(`${tagLabel}.structDepth must be a positive integer`);
      aggregate.structTagCount++;
      for (const value of member?.tagValues ?? []) incrementPlain(aggregate.structTagKeyCounts, value.key);
    }
    let previousUnit = undefined;
    for (const [unitIndex, unit] of (Array.isArray(file.units) ? file.units : []).entries()) {
      const unitLabel = `${label}.units[${unitIndex}]`;
      if (unit === null || typeof unit !== "object" || Array.isArray(unit)) {
        issues.push(`${unitLabel} must be an object`);
        continue;
      }
      compareAllowedKeys(unit, PORTER_UNIT_KEYS, unitLabel, issues);
      requireKeys(unit, PORTER_UNIT_REQUIRED_KEYS, unitLabel, issues);
      validateUnitPayload(unit, unitLabel, issues);
      if (!PORTER_UNIT_KINDS.has(unit.kind)) issues.push(`${unitLabel}.kind '${unit.kind}' is unknown to snapshot schema 3`);
      const expectedPrefix = `${snapshot.modulePath}::${file.path}::${unit.kind}::`;
      if (typeof unit.id !== "string" || !unit.id.startsWith(expectedPrefix)) issues.push(`${unitLabel}.id must start with ${expectedPrefix}`);
      if (unitIDs.has(unit.id)) issues.push(`${unitLabel}.id duplicates ${unit.id}`);
      unitIDs.add(unit.id);
      if (!/^[a-f0-9]{64}$/.test(unit.sigHash ?? "")) issues.push(`${unitLabel}.sigHash must be lowercase SHA-256`);
      if (!/^[a-f0-9]{64}$/.test(unit.bodyHash ?? "")) issues.push(`${unitLabel}.bodyHash must be lowercase SHA-256`);
      for (const key of ["name", "qualifiedName", "signature", "snippet"]) {
        if (typeof unit[key] !== "string" || unit[key] === "") issues.push(`${unitLabel}.${key} must be a non-empty string`);
      }
      if (typeof unit.exported !== "boolean") issues.push(`${unitLabel}.exported must be boolean`);
      if (typeof unit.generated !== "boolean") issues.push(`${unitLabel}.generated must be boolean`);
      validateCountRecord(unit.nodeKindCounts, `${unitLabel}.nodeKindCounts`, issues);
      validateCountRecord(unit.featureCounts, `${unitLabel}.featureCounts`, issues);
      validateStringRecord(unit.metadata, `${unitLabel}.metadata`, issues);
      if (unit.metadata?.goPath !== file.path) issues.push(`${unitLabel}.metadata.goPath must equal ${file.path}`);
      if (!Number.isInteger(unit.startLine) || !Number.isInteger(unit.endLine) || unit.startLine < 1 || unit.endLine < unit.startLine) {
        issues.push(`${unitLabel} has an invalid source range`);
      }
      if (previousUnit !== undefined && (previousUnit.startLine > unit.startLine || (previousUnit.startLine === unit.startLine && previousUnit.id >= unit.id))) {
        issues.push(`${label}.units must be sorted by startLine then id`);
      }
      previousUnit = unit;
      aggregate.unitCount++;
      incrementPlain(aggregate.unitKindCounts, unit.kind);
    }
    if (file.parseError && options.allowParseErrors !== true) issues.push(`${label} has a Go parse error: ${file.parseError}`);
    if (!file.parseError && (typeof file.packageName !== "string" || file.packageName === "")) issues.push(`${label}.packageName must be non-empty`);
    if (!file.parseError && (typeof file.importPath !== "string" || file.importPath === "")) issues.push(`${label}.importPath must be non-empty`);
  }

  const expectedSummary = {
    goFileCount: aggregate.goFileCount,
    generatedFiles: aggregate.generatedFiles,
    lineCount: aggregate.lineCount,
    unitCount: aggregate.unitCount,
    importPathCount: aggregate.importPaths.size,
    structTagCount: aggregate.structTagCount,
  };
  for (const [key, expected] of Object.entries(expectedSummary)) {
    if (snapshot.summary[key] !== expected) issues.push(`snapshot.summary.${key} is ${snapshot.summary[key]}, expected ${expected}`);
  }
  if (!Number.isInteger(snapshot.summary.fileCount) || snapshot.summary.fileCount < aggregate.goFileCount) {
    issues.push("snapshot.summary.fileCount must be an integer at least as large as goFileCount");
  }
  for (const [key, expected] of [
    ["unitKindCounts", aggregate.unitKindCounts],
    ["nodeKindCounts", aggregate.nodeKindCounts],
    ["buildTagCounts", aggregate.buildTagCounts],
    ["packageCounts", aggregate.packageCounts],
    ["structTagKeyCounts", aggregate.structTagKeyCounts],
  ]) {
    if (canonicalJson(snapshot.summary[key] ?? {}) !== canonicalJson(expected)) issues.push(`snapshot.summary.${key} does not match file records`);
  }
  return issues;
}

export function accumulateUnitStructTags(aggregate, unit) {
  if ((unit.members?.length ?? 0) > 0) accumulateMemberStructTags(aggregate, unit.members);
  else accumulateTypeExpressionStructTags(aggregate, unit.typeExpression);
  accumulateTypeExpressionStructTags(aggregate, unit.receiverType);
  for (const parameter of [...(unit.parameters ?? []), ...(unit.results ?? [])]) accumulateTypeExpressionStructTags(aggregate, parameter.type);
  for (const spec of unit.valueSpecs ?? []) {
    accumulateTypeExpressionStructTags(aggregate, spec.type);
    for (const inferred of spec.inferredValueTypes ?? []) accumulateTypeExpressionStructTags(aggregate, inferred);
  }
}

export function accumulateMemberStructTags(aggregate, members) {
  for (const member of members ?? []) {
    if (member.structTag !== undefined) {
      aggregate.structTagCount++;
      for (const value of member.tagValues ?? []) incrementPlain(aggregate.structTagKeyCounts, value.key);
    }
    accumulateTypeExpressionStructTags(aggregate, member.typeExpr);
  }
}

export function accumulateTypeExpressionStructTags(aggregate, expression) {
  if (expression === undefined || expression === null) return;
  accumulateMemberStructTags(aggregate, expression.members);
  for (const key of ["element", "key", "value", "left", "right"]) accumulateTypeExpressionStructTags(aggregate, expression[key]);
  for (const argument of expression.typeArgs ?? []) accumulateTypeExpressionStructTags(aggregate, argument);
  for (const parameter of [...(expression.parameters ?? []), ...(expression.results ?? [])]) accumulateTypeExpressionStructTags(aggregate, parameter.type);
}

export function assertPorterSnapshot(snapshot, config, options) {
  const issues = validatePorterSnapshot(snapshot, config, options);
  if (issues.length > 0) fail(`Go extractor snapshot contract failed: ${issues.slice(0, 8).join("; ")}`);
}

export function compareExactKeys(value, expected, label, issues) {
  const actual = Object.keys(value).sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    issues.push(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
}

export function compareAllowedKeys(value, allowed, label, issues) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) issues.push(`${label} contains unknown snapshot-schema-3 key '${key}'`);
  }
}

export function requireKeys(value, required, label, issues) {
  for (const key of required) {
    if (!Object.hasOwn(value, key)) issues.push(`${label} is missing required snapshot-schema-3 key '${key}'`);
  }
}

export function validateSnapshotObject(value, allowed, label, issues, required = undefined) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    issues.push(`${label} must be an object`);
    return;
  }
  compareAllowedKeys(value, allowed, label, issues);
  if (required !== undefined) requireKeys(value, required, label, issues);
}

export function validateUnitPayload(unit, label, issues) {
  for (const key of ["typeParameters", "typeParameterDetails", "parameters", "results", "valueSpecs", "members", "externalRefs", "returnFacts"]) {
    if (!Array.isArray(unit[key])) issues.push(`${label}.${key} must be an array`);
  }
  validateUnitKindPayload(unit, label, issues);
  validateTypeExpression(unit.receiverType, `${label}.receiverType`, issues);
  validateTypeExpression(unit.typeExpression, `${label}.typeExpression`, issues);
  for (const [index, parameter] of (Array.isArray(unit.parameters) ? unit.parameters : []).entries()) validateParameter(parameter, `${label}.parameters[${index}]`, issues);
  for (const [index, result] of (Array.isArray(unit.results) ? unit.results : []).entries()) validateParameter(result, `${label}.results[${index}]`, issues);
  for (const [index, parameter] of (Array.isArray(unit.typeParameterDetails) ? unit.typeParameterDetails : []).entries()) {
    const parameterLabel = `${label}.typeParameterDetails[${index}]`;
    validateSnapshotObject(parameter, PORTER_TYPE_PARAMETER_KEYS, parameterLabel, issues, new Set(["name"]));
    if (typeof parameter?.name !== "string" || parameter.name === "") issues.push(`${parameterLabel}.name must be a non-empty string`);
    validateTypeExpression(parameter?.constraint, `${label}.typeParameterDetails[${index}].constraint`, issues);
  }
  for (const [index, member] of (Array.isArray(unit.members) ? unit.members : []).entries()) {
    validateMember(member, `${label}.members[${index}]`, issues);
    validateStructTagValues(member, `${label}.members[${index}]`, issues);
    validateTypeExpression(member?.typeExpr, `${label}.members[${index}].typeExpr`, issues);
  }
  for (const [specIndex, spec] of (Array.isArray(unit.valueSpecs) ? unit.valueSpecs : []).entries()) {
    const specLabel = `${label}.valueSpecs[${specIndex}]`;
    validateSnapshotObject(spec, PORTER_VALUE_SPEC_KEYS, specLabel, issues, new Set(["names"]));
    validateStringArray(spec?.names, `${specLabel}.names`, issues, { nonEmpty: true });
    validateTypeExpression(spec?.type, `${specLabel}.type`, issues);
    for (const [index, inferred] of (spec?.inferredValueTypes ?? []).entries()) validateTypeExpression(inferred, `${specLabel}.inferredValueTypes[${index}]`, issues);
    for (const [index, constantValue] of (spec?.constantValues ?? []).entries()) {
      const constantLabel = `${specLabel}.constantValues[${index}]`;
      validateSnapshotObject(constantValue, PORTER_CONSTANT_VALUE_KEYS, constantLabel, issues, new Set(["exact", "supported"]));
      if (typeof constantValue?.supported !== "boolean") issues.push(`${constantLabel}.supported must be boolean`);
      if (typeof constantValue?.exact !== "string") issues.push(`${constantLabel}.exact must be a string`);
    }
  }
  for (const [index, reference] of (Array.isArray(unit.externalRefs) ? unit.externalRefs : []).entries()) {
    const referenceLabel = `${label}.externalRefs[${index}]`;
    validateSnapshotObject(reference, PORTER_EXTERNAL_REFERENCE_KEYS, referenceLabel, issues, PORTER_EXTERNAL_REFERENCE_KEYS);
    for (const key of ["importPath", "name", "package"]) {
      if (typeof reference?.[key] !== "string" || reference[key] === "") issues.push(`${referenceLabel}.${key} must be a non-empty string`);
    }
    if (!new Set(["call", "type", "value"]).has(reference?.role)) {
      issues.push(`${referenceLabel}.role must be 'call', 'type', or 'value'`);
    }
    if (!Number.isSafeInteger(reference?.arity) || reference.arity < 0) {
      issues.push(`${referenceLabel}.arity must be a non-negative safe integer`);
    }
    if (!Number.isSafeInteger(reference?.count) || reference.count < 1) issues.push(`${referenceLabel}.count must be a positive safe integer`);
  }
  for (const [index, fact] of (Array.isArray(unit.returnFacts) ? unit.returnFacts : []).entries()) {
    const factLabel = `${label}.returnFacts[${index}]`;
    validateSnapshotObject(fact, PORTER_RETURN_FACT_KEYS, factLabel, issues, PORTER_RETURN_FACT_KEYS);
    if (!Number.isSafeInteger(fact?.line) || fact.line < 1) issues.push(`${factLabel}.line must be a positive safe integer`);
    if (!Array.isArray(fact?.results)) {
      issues.push(`${factLabel}.results must be an array`);
      continue;
    }
    for (const [resultIndex, result] of fact.results.entries()) {
      const resultLabel = `${factLabel}.results[${resultIndex}]`;
      validateSnapshotObject(result, PORTER_RETURN_VALUE_FACT_KEYS, resultLabel, issues, PORTER_RETURN_VALUE_FACT_KEYS);
      if (!new Set(["empty-array", "empty-map", "empty-slice", "empty-struct", "make-empty-map", "make-empty-slice", "nil", "other"]).has(result?.kind)) {
        issues.push(`${resultLabel}.kind is invalid`);
      }
    }
  }
}

export function validateParameter(parameter, label, issues) {
  validateSnapshotObject(parameter, PORTER_PARAMETER_KEYS, label, issues, new Set(["type"]));
  if (parameter?.names !== undefined) validateStringArray(parameter.names, `${label}.names`, issues);
  if (parameter?.variadic !== undefined && typeof parameter.variadic !== "boolean") issues.push(`${label}.variadic must be boolean when present`);
  validateTypeExpression(parameter?.type, `${label}.type`, issues);
}

export function validateTypeExpression(expression, label, issues) {
  if (expression === undefined || expression === null) return;
  validateSnapshotObject(expression, PORTER_TYPE_EXPRESSION_KEYS, label, issues, new Set(["kind", "text"]));
  if (expression === null || typeof expression !== "object" || Array.isArray(expression)) return;
  if (typeof expression.kind !== "string" || expression.kind === "") issues.push(`${label}.kind must be a non-empty string`);
  if (typeof expression.text !== "string" || expression.text === "") issues.push(`${label}.text must be a non-empty string`);
  for (const key of ["element", "key", "left", "right", "value"]) validateTypeExpression(expression[key], `${label}.${key}`, issues);
  for (const [index, argument] of (Array.isArray(expression.typeArgs) ? expression.typeArgs : []).entries()) validateTypeExpression(argument, `${label}.typeArgs[${index}]`, issues);
  for (const [index, parameter] of (Array.isArray(expression.parameters) ? expression.parameters : []).entries()) validateParameter(parameter, `${label}.parameters[${index}]`, issues);
  for (const [index, result] of (Array.isArray(expression.results) ? expression.results : []).entries()) validateParameter(result, `${label}.results[${index}]`, issues);
  for (const [index, member] of (Array.isArray(expression.members) ? expression.members : []).entries()) {
    validateMember(member, `${label}.members[${index}]`, issues);
    validateStructTagValues(member, `${label}.members[${index}]`, issues);
    validateTypeExpression(member?.typeExpr, `${label}.members[${index}].typeExpr`, issues);
  }
}

export function validateStructTagValues(member, label, issues) {
  if (member?.structTag !== undefined && typeof member.structTag !== "string") issues.push(`${label}.structTag must be a string when present`);
  if (member?.tagValues !== undefined && !Array.isArray(member.tagValues)) {
    issues.push(`${label}.tagValues must be an array when present`);
    return;
  }
  for (const [index, value] of (Array.isArray(member?.tagValues) ? member.tagValues : []).entries()) {
    validateSnapshotObject(value, PORTER_STRUCT_TAG_VALUE_KEYS, `${label}.tagValues[${index}]`, issues, PORTER_STRUCT_TAG_VALUE_KEYS);
    if (typeof value?.key !== "string" || value.key === "") issues.push(`${label}.tagValues[${index}].key must be non-empty`);
    if (typeof value?.value !== "string") issues.push(`${label}.tagValues[${index}].value must be a string`);
  }
}

export function validateUnitKindPayload(unit, label, issues) {
  const functionLike = unit.kind === "func" || unit.kind === "method";
  if (unit.kind === "method") {
    requireKeys(unit, new Set(["receiver", "receiverMode", "receiverType"]), label, issues);
    if (typeof unit.receiver !== "string" || unit.receiver === "") issues.push(`${label}.receiver must be a non-empty string for methods`);
    if (unit.receiverMode !== "pointer" && unit.receiverMode !== "value") issues.push(`${label}.receiverMode must be 'pointer' or 'value' for methods`);
  } else {
    for (const key of ["receiver", "receiverMode", "receiverType"]) {
      if (Object.hasOwn(unit, key)) issues.push(`${label}.${key} is only valid for method units`);
    }
  }
  if (unit.kind === "type") {
    requireKeys(unit, new Set(["typeExpression", "typeKind"]), label, issues);
    if (!new Set(["alias", "func", "interface", "named", "struct"]).has(unit.typeKind)) issues.push(`${label}.typeKind is invalid`);
  } else {
    for (const key of ["typeExpression", "typeKind"]) {
      if (Object.hasOwn(unit, key)) issues.push(`${label}.${key} is only valid for type units`);
    }
  }
  if (!functionLike && ((unit.parameters?.length ?? 0) > 0 || (unit.results?.length ?? 0) > 0)) {
    issues.push(`${label}.parameters and .results are only valid for func and method units`);
  }
  if (!functionLike && (unit.returnFacts?.length ?? 0) > 0) issues.push(`${label}.returnFacts is only valid for func and method units`);
  const valueGroup = unit.kind === "constGroup" || unit.kind === "varGroup";
  if (valueGroup && (unit.valueSpecs?.length ?? 0) === 0) issues.push(`${label}.valueSpecs must be non-empty for ${unit.kind}`);
  if (!valueGroup && (unit.valueSpecs?.length ?? 0) > 0) issues.push(`${label}.valueSpecs is only valid for constGroup and varGroup units`);
  if (unit.kind !== "type" && (unit.members?.length ?? 0) > 0) issues.push(`${label}.members is only valid for type units`);
  if (!functionLike && unit.kind !== "type" && ((unit.typeParameters?.length ?? 0) > 0 || (unit.typeParameterDetails?.length ?? 0) > 0)) {
    issues.push(`${label}.type parameters are only valid for func, method, and type units`);
  }
  if ((unit.typeParameters?.length ?? -1) !== (unit.typeParameterDetails?.length ?? -2)) {
    issues.push(`${label}.typeParameters and .typeParameterDetails must have equal length`);
  }
  for (let index = 0; index < (unit.typeParameters?.length ?? 0); index++) {
    if (unit.typeParameters[index] !== unit.typeParameterDetails[index]?.name) issues.push(`${label}.type parameter #${index} name does not match its detail`);
  }
}

export function validateMember(member, label, issues) {
  validateSnapshotObject(member, PORTER_MEMBER_KEYS, label, issues, new Set(["exported", "kind", "name", "type", "typeExpr"]));
  if (typeof member?.kind !== "string" || member.kind === "") issues.push(`${label}.kind must be a non-empty string`);
  if (typeof member?.name !== "string" || member.name === "") issues.push(`${label}.name must be a non-empty string`);
  if (typeof member?.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof member?.type !== "string" || member.type === "") issues.push(`${label}.type must be a non-empty string`);
}

export function validateStringArray(value, label, issues, options = {}) {
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array`);
    return;
  }
  if (options.nonEmpty === true && value.length === 0) issues.push(`${label} must be non-empty`);
  for (const [index, item] of value.entries()) {
    if (typeof item !== "string" || item === "") issues.push(`${label}[${index}] must be a non-empty string`);
  }
}

export function validateCountRecord(value, label, issues) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    issues.push(`${label} must be an object`);
    return;
  }
  for (const [key, count] of Object.entries(value)) {
    if (key === "" || !Number.isSafeInteger(count) || count < 0) issues.push(`${label}.${key} must be a non-negative safe integer`);
  }
}

export function validateStringRecord(value, label, issues) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    issues.push(`${label} must be an object`);
    return;
  }
  for (const [key, item] of Object.entries(value)) {
    if (key === "" || typeof item !== "string") issues.push(`${label}.${key} must be a string`);
  }
}

export function incrementPlain(record, key) {
  record[key] = (record[key] ?? 0) + 1;
}

export function mergeCounts(target, source) {
  if (source === null || typeof source !== "object" || Array.isArray(source)) return;
  for (const [key, count] of Object.entries(source)) target[key] = (target[key] ?? 0) + count;
}

export function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

export function assertSourcePinStatus(status) {
  const failures = collectSourcePinFailures(status);
  if (failures.length > 0) {
    const details = status.issues.slice(0, 5).map((issue) => `${issue.path}: ${issue.reason}`).join("; ");
    fail(`source pin verification failed: ${failures.join(", ")}${details ? ` (${details})` : ""}`);
  }
}
