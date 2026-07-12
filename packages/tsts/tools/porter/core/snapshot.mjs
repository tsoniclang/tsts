import { validateSemanticDeclaration } from "./semantic-snapshot-validation.mjs";
import { activeSemanticTypeProfileKeys, validateDependencyTypeDeclarations } from "./semantic-snapshot-validation-dependencies.mjs";
import { validateExternalPackageSurface } from "./semantic-snapshot-validation-external-package.mjs";
import { validateExternalPackageDependencyClosure } from "./semantic-snapshot-validation-external-closure.mjs";
import {
  buildSemanticMethodSetSignatureScopes,
  buildSemanticTypeParameterScopes,
  validateSemanticMethodSetSignaturePool,
  validateSemanticMethodSetSignatureUsage,
} from "./semantic-method-set-validation.mjs";
import { validateSignature } from "./semantic-snapshot-validation.mjs";
import path from "node:path";
import {
  canonicalSchemaValue,
  canonicalSemanticModule,
  compareAllowedKeys,
  compareExactKeys,
  requireKeys,
  semanticProfileKey,
  validateExperimentNames,
  validateGoExperimentSetting,
  validateFileUnitContracts,
  validateImportContract,
  validateProfileArchitecture,
  validateProfileEnvironment,
  validateProfileEnvironmentRelations,
  validateSemanticProvenance,
  validateSemanticModuleRelations,
  validateSnapshotObject,
  validateSortedUniqueStrings,
  validateStringArray,
  validateStructTagContract,
  validateTypeUnitSignature,
  validateValueGroupSignature,
  validateUnsupportedProfiles,
} from "./snapshot-validation.mjs";
import { fail, resolveRepo } from "./runtime.mjs";

export const PORTER_SNAPSHOT_KEYS = Object.freeze(["environment", "files", "gitRevision", "modulePath", "schemaVersion", "semantic", "sourceRoot", "summary"]);
export const PORTER_ENVIRONMENT_KEYS = Object.freeze(["goVersion", "goarch", "goos"]);
export const PORTER_SEMANTIC_KEYS = new Set(["compiler", "coveredFiles", "dependencyTypeDeclarations", "excludedFiles", "externalPackageSurface", "goroot", "gorootBytes", "gorootDirectoryCount", "gorootEntryCount", "gorootFileCount", "gorootHash", "gorootHashContract", "gorootSymlinkCount", "methodSetSignatures", "moduleGraph", "modulePath", "profiles", "releaseTags", "requiredFiles", "toolchain", "toolchainExecutable", "toolchainHash", "unsupportedProfiles"]);
export const PORTER_SEMANTIC_PROFILE_KEYS = new Set(["architecture", "buildFlags", "buildTags", "cgoEnabled", "coveredFiles", "environment", "experiments", "goarch", "goexperiment", "goos", "packageIds", "toolTags"]);
export const PORTER_SEMANTIC_MODULE_KEYS = new Set(["path", "replacePath", "replaceSum", "replaceVersion", "sum", "version"]);
export const PORTER_SUMMARY_KEYS = Object.freeze(["buildTagCounts", "fileCount", "generatedFiles", "goFileCount", "importPathCount", "lineCount", "packageCounts", "structTagCount", "structTagKeyCounts", "unitCount", "unitKindCounts"]);
export const PORTER_FILE_KEYS = new Set(["buildTags", "byteLength", "generated", "gitBlobHash", "implicitBuildTags", "importPath", "imports", "lineCount", "metadata", "packageName", "path", "sourceHash", "units"]);
export const PORTER_FILE_REQUIRED_KEYS = new Set(PORTER_FILE_KEYS);
export const PORTER_IMPORT_KEYS = new Set(["name", "packageName", "path"]);
export const PORTER_UNIT_KEYS = new Set(["bodyHash", "endLine", "endOffset", "exported", "generated", "id", "kind", "members", "metadata", "name", "parameters", "qualifiedName", "receiver", "receiverMode", "receiverType", "results", "semantic", "sigHash", "signature", "snippet", "startLine", "startOffset", "typeExpression", "typeKind", "typeParameterDetails", "typeParameters", "valueSpecs"]);
export const PORTER_UNIT_REQUIRED_KEYS = new Set(["bodyHash", "endLine", "endOffset", "exported", "generated", "id", "kind", "members", "metadata", "name", "parameters", "qualifiedName", "results", "sigHash", "signature", "snippet", "startLine", "startOffset", "typeParameterDetails", "typeParameters", "valueSpecs"]);
export const PORTER_TYPE_PARAMETER_KEYS = new Set(["constraint", "name"]);
export const PORTER_STRUCT_TAG_VALUE_KEYS = new Set(["key", "value"]);
export const PORTER_VALUE_SPEC_KEYS = new Set(["names", "type"]);
export const PORTER_PARAMETER_KEYS = new Set(["names", "type", "variadic"]);
export const PORTER_UNIT_KINDS = new Set(["constGroup", "func", "importGroup", "method", "type", "typeGroup", "varGroup"]);

export function validatePorterSnapshot(snapshot, config) {
  const issues = [];
  if (snapshot === null || typeof snapshot !== "object" || Array.isArray(snapshot)) return ["snapshot must be an object"];
  compareExactKeys(snapshot, PORTER_SNAPSHOT_KEYS, "snapshot", issues);
  if (snapshot.schemaVersion !== 10) issues.push(`snapshot.schemaVersion must be 10, got ${JSON.stringify(snapshot.schemaVersion)}`);
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
  if (snapshot.summary === null || typeof snapshot.summary !== "object" || Array.isArray(snapshot.summary)) {
    return [...issues, "snapshot.summary must be an object"];
  }
  const typeParameterScopes = buildSemanticTypeParameterScopes(snapshot, issues);
  const methodSetSignatureScopes = buildSemanticMethodSetSignatureScopes(snapshot, typeParameterScopes, issues);
  const methodSetSignatureIds = validateSemanticEvidence(
    snapshot.semantic,
    issues,
    snapshot.modulePath,
    methodSetSignatureScopes,
    activeSemanticTypeProfileKeys(snapshot.files),
    config,
  );
  validateExternalPackageDependencyClosure(snapshot, issues);
  if (snapshot.semantic?.toolchain !== snapshot.environment?.goVersion) issues.push("snapshot.semantic.toolchain must equal snapshot.environment.goVersion");
  compareExactKeys(snapshot.summary, PORTER_SUMMARY_KEYS, "snapshot.summary", issues);

  const paths = new Set();
  let previousPath = "";
  const aggregate = {
    goFileCount: 0,
    generatedFiles: 0,
    lineCount: 0,
    unitCount: 0,
    unitKindCounts: {},
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
    if (typeof file.path !== "string" || !file.path.endsWith(".go") || path.posix.isAbsolute(file.path) || file.path.includes("\\") || path.posix.normalize(file.path) !== file.path || file.path.split("/").includes("..")) {
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
    if (!Number.isSafeInteger(file.byteLength) || file.byteLength < 0) issues.push(`${label}.byteLength must be a non-negative safe integer`);
    if (!Number.isSafeInteger(file.lineCount) || file.lineCount < 0) issues.push(`${label}.lineCount must be a non-negative safe integer`);
    aggregate.lineCount += Number.isSafeInteger(file.lineCount) ? file.lineCount : 0;
    for (const key of ["importPath", "packageName"]) if (typeof file[key] !== "string") issues.push(`${label}.${key} must be a string`);
    if (file.generated === true) aggregate.generatedFiles++;
    if (typeof file.packageName === "string") incrementPlain(aggregate.packageCounts, file.packageName);
    if (typeof file.importPath === "string" && file.importPath !== "") aggregate.importPaths.add(file.importPath);
    validateSortedUniqueStrings(file.buildTags, `${label}.buildTags`, issues);
    validateSortedUniqueStrings(file.implicitBuildTags, `${label}.implicitBuildTags`, issues);
    for (const tag of [...(file.buildTags ?? []), ...(file.implicitBuildTags ?? [])]) incrementPlain(aggregate.buildTagCounts, tag);
    if (!Array.isArray(file.units)) issues.push(`${label}.units must be an array`);
    if (!Array.isArray(file.imports)) issues.push(`${label}.imports must be an array`);
    for (const [importIndex, imported] of (Array.isArray(file.imports) ? file.imports : []).entries()) {
      const importLabel = `${label}.imports[${importIndex}]`;
      validateSnapshotObject(imported, PORTER_IMPORT_KEYS, importLabel, issues, new Set(["path"]));
      if (typeof imported?.path !== "string" || imported.path === "") issues.push(`${importLabel}.path must be a non-empty string`);
      validateImportContract(imported, importLabel, issues, { requirePackageName: !(snapshot.semantic?.excludedFiles ?? []).includes(file.path) });
    }
    validateSortedImports(file.imports, `${label}.imports`, issues);
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
      accumulateUnitStructTags(aggregate, unit);
      if (!PORTER_UNIT_KINDS.has(unit.kind)) issues.push(`${unitLabel}.kind '${unit.kind}' is unknown to snapshot schema 5`);
      if (typeof unit.exported !== "boolean") issues.push(`${unitLabel}.exported must be boolean`);
      if (typeof unit.generated !== "boolean") issues.push(`${unitLabel}.generated must be boolean`);
      if (!Number.isSafeInteger(unit.startLine) || !Number.isSafeInteger(unit.endLine) || unit.startLine < 1 || unit.endLine < unit.startLine) {
        issues.push(`${unitLabel} has an invalid physical source line range`);
      }
      if (!Number.isSafeInteger(unit.startOffset) || !Number.isSafeInteger(unit.endOffset) || unit.startOffset < 0 || unit.endOffset <= unit.startOffset) {
        issues.push(`${unitLabel} has an invalid physical byte-offset range`);
      }
      if (Number.isSafeInteger(unit.endOffset) && Number.isSafeInteger(file.byteLength) && unit.endOffset > file.byteLength) {
        issues.push(`${unitLabel}.endOffset must not exceed the owning file byteLength`);
      }
      if (previousUnit !== undefined && (previousUnit.startOffset > unit.startOffset || (previousUnit.startOffset === unit.startOffset && previousUnit.id >= unit.id))) {
        issues.push(`${label}.units must be sorted by startOffset then id`);
      }
      previousUnit = unit;
      aggregate.unitCount++;
      incrementPlain(aggregate.unitKindCounts, unit.kind);
    }
    validateFileUnitContracts(snapshot.modulePath, file, label, issues);
    if (typeof file.packageName !== "string" || file.packageName === "") issues.push(`${label}.packageName must be non-empty`);
    if (typeof file.importPath !== "string" || file.importPath === "") issues.push(`${label}.importPath must be non-empty`);
  }

  validateSemanticMethodSetSignatureUsage(snapshot, methodSetSignatureIds, issues);

  const provenance = validateSemanticProvenance(snapshot, issues);
  for (const [fileIndex, file] of snapshot.files.entries()) {
    if (file === null || typeof file !== "object" || Array.isArray(file) || typeof file.path !== "string") continue;
    const expectation = provenance.expectedProfilesByFile.has(file.path)
      ? { kind: "required", packagePath: file.importPath, profileLabels: provenance.profileLabels, profiles: provenance.expectedProfilesByFile.get(file.path) }
      : provenance.excludedFiles.has(file.path)
        ? { kind: "excluded", packagePath: file.importPath, profiles: [] }
        : { kind: "invalid", packagePath: file.importPath, profiles: [] };
    for (const [unitIndex, unit] of (Array.isArray(file.units) ? file.units : []).entries()) {
      validateSemanticDeclaration(unit?.semantic, `snapshot.files[${fileIndex}].units[${unitIndex}].semantic`, issues, unit, expectation, {
        typeParameterScopes,
      });
    }
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
  if (!Number.isSafeInteger(snapshot.summary.fileCount) || snapshot.summary.fileCount < aggregate.goFileCount) {
    issues.push("snapshot.summary.fileCount must be an integer at least as large as goFileCount");
  }
  for (const [key, expected] of [
    ["unitKindCounts", aggregate.unitKindCounts],
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

export function assertPorterSnapshot(snapshot, config) {
  const issues = validatePorterSnapshot(snapshot, config);
  if (issues.length > 0) fail(`Go extractor snapshot contract failed: ${issues.slice(0, 8).join("; ")}`);
}

export function validateUnitPayload(unit, label, issues) {
  for (const key of ["typeParameters", "typeParameterDetails", "parameters", "results", "valueSpecs", "members"]) {
    if (!Array.isArray(unit[key])) issues.push(`${label}.${key} must be an array`);
  }
  validateUnitKindPayload(unit, label, issues);
  validateStringArray(unit.typeParameters, `${label}.typeParameters`, issues);
  validateTypeExpression(unit.receiverType, `${label}.receiverType`, issues, { required: unit.kind === "method" });
  validateTypeExpression(unit.typeExpression, `${label}.typeExpression`, issues, { required: unit.kind === "type" });
  const parameters = Array.isArray(unit.parameters) ? unit.parameters : [];
  const results = Array.isArray(unit.results) ? unit.results : [];
  for (const [index, parameter] of parameters.entries()) validateParameter(parameter, `${label}.parameters[${index}]`, issues, { allowVariadic: index === parameters.length - 1 });
  for (const [index, result] of results.entries()) validateParameter(result, `${label}.results[${index}]`, issues, { allowVariadic: false });
  for (const [index, parameter] of (Array.isArray(unit.typeParameterDetails) ? unit.typeParameterDetails : []).entries()) {
    const parameterLabel = `${label}.typeParameterDetails[${index}]`;
    validateSnapshotObject(parameter, PORTER_TYPE_PARAMETER_KEYS, parameterLabel, issues, new Set(["name"]));
    if (typeof parameter?.name !== "string" || parameter.name === "") issues.push(`${parameterLabel}.name must be a non-empty string`);
    validateTypeExpression(parameter?.constraint, `${label}.typeParameterDetails[${index}].constraint`, issues, { required: true });
  }
  for (const [index, member] of (Array.isArray(unit.members) ? unit.members : []).entries()) {
    validateMember(member, `${label}.members[${index}]`, issues);
  }
  for (const [specIndex, spec] of (Array.isArray(unit.valueSpecs) ? unit.valueSpecs : []).entries()) {
    const specLabel = `${label}.valueSpecs[${specIndex}]`;
    validateSnapshotObject(spec, PORTER_VALUE_SPEC_KEYS, specLabel, issues, new Set(["names"]));
    validateStringArray(spec?.names, `${specLabel}.names`, issues, { nonEmpty: true });
    validateTypeExpression(spec?.type, `${specLabel}.type`, issues);
  }
}

function validateSemanticEvidence(semantic, issues, modulePath, methodSetSignatureScopes, activeTypeProfiles, config) {
  if (semantic === null || typeof semantic !== "object" || Array.isArray(semantic)) {
    issues.push("snapshot.semantic must be an object");
    return new Set();
  }
  compareExactKeys(semantic, [...PORTER_SEMANTIC_KEYS], "snapshot.semantic", issues);
  for (const key of ["toolchain", "toolchainExecutable", "goroot", "compiler", "modulePath"]) {
    if (typeof semantic[key] !== "string" || semantic[key] === "") issues.push(`snapshot.semantic.${key} must be a non-empty string`);
  }
  if (!/^[a-f0-9]{64}$/.test(semantic.toolchainHash ?? "")) issues.push("snapshot.semantic.toolchainHash must be lowercase SHA-256");
  if (!/^[a-f0-9]{64}$/.test(semantic.gorootHash ?? "")) issues.push("snapshot.semantic.gorootHash must be lowercase SHA-256");
  if (semantic.gorootHashContract !== "tsts-porter-goroot-tree-v1") issues.push("snapshot.semantic.gorootHashContract must be 'tsts-porter-goroot-tree-v1'");
  for (const key of ["gorootBytes", "gorootDirectoryCount", "gorootEntryCount", "gorootFileCount", "gorootSymlinkCount"]) {
    if (!Number.isSafeInteger(semantic[key]) || semantic[key] < 0) issues.push(`snapshot.semantic.${key} must be a non-negative safe integer`);
  }
  if (semantic.gorootEntryCount !== semantic.gorootFileCount + semantic.gorootDirectoryCount + semantic.gorootSymlinkCount) issues.push("snapshot.semantic GOROOT entry counts must close exactly");
  if (semantic.compiler !== "gc") issues.push("snapshot.semantic.compiler must be 'gc'");
  validateSortedUniqueStrings(semantic.releaseTags, "snapshot.semantic.releaseTags", issues, { nonEmpty: true });
  if (semantic.modulePath !== modulePath) issues.push("snapshot.semantic.modulePath must equal snapshot.modulePath");
  validateSortedUniqueStrings(semantic.requiredFiles, "snapshot.semantic.requiredFiles", issues);
  validateSortedUniqueStrings(semantic.coveredFiles, "snapshot.semantic.coveredFiles", issues);
  validateSortedUniqueStrings(semantic.excludedFiles, "snapshot.semantic.excludedFiles", issues);
  if (!Array.isArray(semantic.profiles) || semantic.profiles.length === 0) {
    issues.push("snapshot.semantic.profiles must be a non-empty array");
  } else {
    let previousProfileKey = "";
    for (const [index, profile] of semantic.profiles.entries()) {
      const label = `snapshot.semantic.profiles[${index}]`;
      validateSnapshotObject(profile, PORTER_SEMANTIC_PROFILE_KEYS, label, issues, PORTER_SEMANTIC_PROFILE_KEYS);
      for (const key of ["goos", "goarch"]) if (typeof profile?.[key] !== "string" || profile[key] === "") issues.push(`${label}.${key} must be a non-empty string`);
      if (profile?.cgoEnabled !== false) issues.push(`${label}.cgoEnabled must be false because Porter rejects cgo-dependent declarations`);
      validateExperimentNames(profile?.experiments, `${label}.experiments`, issues);
      validateGoExperimentSetting(profile?.goexperiment, `${label}.goexperiment`, issues);
      validateProfileArchitecture(profile, label, issues);
      validateSortedUniqueStrings(profile?.buildTags, `${label}.buildTags`, issues);
      validateSortedUniqueStrings(profile?.coveredFiles, `${label}.coveredFiles`, issues, { nonEmpty: true });
      validateSortedUniqueStrings(profile?.environment, `${label}.environment`, issues, { nonEmpty: true });
      validateSortedUniqueStrings(profile?.packageIds, `${label}.packageIds`, issues, { nonEmpty: true });
      validateSortedUniqueStrings(profile?.toolTags, `${label}.toolTags`, issues);
      validateSortedUniqueStrings(profile?.buildFlags, `${label}.buildFlags`, issues);
      const expectedFlags = ["-mod=readonly", ...((profile?.buildTags?.length ?? 0) > 0 ? [`-tags=${profile.buildTags.join(",")}`] : [])];
      if (canonicalSchemaValue(profile?.buildFlags) !== canonicalSchemaValue(expectedFlags)) issues.push(`${label}.buildFlags must exactly encode readonly modules and declaration build tags`);
      validateProfileEnvironment(profile, label, issues, semantic);
      const key = typeof profile?.experiments === "string" && typeof profile?.goexperiment === "string" ? semanticProfileKey(profile) : `<invalid-profile-${index}>`;
      if (previousProfileKey !== "" && previousProfileKey >= key) issues.push("snapshot.semantic.profiles must be sorted by exact profile key with no duplicates");
      previousProfileKey = key;
    }
    validateProfileEnvironmentRelations(semantic.profiles, issues);
  }
  validateDependencyTypeDeclarations(
    semantic.dependencyTypeDeclarations,
    semantic.profiles?.length ?? 0,
    activeTypeProfiles,
    issues,
  );
  const forbiddenExternalDependencyProfiles = new Set(activeTypeProfiles);
  for (const declaration of Array.isArray(semantic.dependencyTypeDeclarations) ? semantic.dependencyTypeDeclarations : []) {
    for (const profile of declaration?.profiles ?? []) forbiddenExternalDependencyProfiles.add(`${profile}\0${declaration?.object?.id}`);
  }
  validateExternalPackageSurface(
    semantic.externalPackageSurface,
    config,
    semantic.profiles?.length ?? 0,
    forbiddenExternalDependencyProfiles,
    issues,
  );
  const methodSetSignatureIds = validateSemanticMethodSetSignaturePool(
    semantic.methodSetSignatures,
    "snapshot.semantic.methodSetSignatures",
    issues,
    { validateSignature },
    methodSetSignatureScopes,
  );
  validateUnsupportedProfiles(semantic.unsupportedProfiles, issues);
  if (!Array.isArray(semantic.moduleGraph)) {
    issues.push("snapshot.semantic.moduleGraph must be an array");
  } else {
    for (const [index, module] of semantic.moduleGraph.entries()) {
      const label = `snapshot.semantic.moduleGraph[${index}]`;
      validateSnapshotObject(module, PORTER_SEMANTIC_MODULE_KEYS, label, issues, PORTER_SEMANTIC_MODULE_KEYS);
      if (typeof module?.path !== "string" || module.path === "") issues.push(`${label}.path must be a non-empty string`);
      for (const key of ["version", "sum", "replacePath", "replaceVersion", "replaceSum"]) {
        if (typeof module?.[key] !== "string") issues.push(`${label}.${key} must be a string`);
      }
    }
    for (let index = 1; index < semantic.moduleGraph.length; index++) {
      if (canonicalSemanticModule(semantic.moduleGraph[index - 1]) >= canonicalSemanticModule(semantic.moduleGraph[index])) {
        issues.push("snapshot.semantic.moduleGraph must be sorted canonically with no duplicates");
      }
    }
    validateSemanticModuleRelations(semantic.moduleGraph, semantic.modulePath, issues);
  }
  return methodSetSignatureIds;
}

export function validateParameter(parameter, label, issues, options = {}) {
  validateSnapshotObject(parameter, PORTER_PARAMETER_KEYS, label, issues, new Set(["type"]));
  if (parameter?.names !== undefined) validateStringArray(parameter.names, `${label}.names`, issues);
  if (parameter?.variadic !== undefined && typeof parameter.variadic !== "boolean") issues.push(`${label}.variadic must be boolean when present`);
  validateTypeExpression(parameter?.type, `${label}.type`, issues, { required: true });
  if (parameter?.variadic === true && options.allowVariadic !== true) issues.push(`${label}.variadic is only valid on the final input parameter`);
}

function validateSortedImports(imports, label, issues) {
  if (!Array.isArray(imports)) return;
  let previous = "";
  for (const imported of imports) {
    const key = `${imported?.path ?? ""}\u0000${imported?.name ?? ""}`;
    if (previous !== "" && previous >= key) issues.push(`${label} must be sorted by path then name with no duplicates`);
    previous = key;
  }
}

export function validateTypeExpression(expression, label, issues, options = {}) {
  if (expression === undefined || expression === null) {
    if (options.required === true) issues.push(`${label} is required and must be a TypeExpr object`);
    return;
  }
  if (typeof expression !== "object" || Array.isArray(expression)) {
    issues.push(`${label} must be an object`);
    return;
  }
  const keysByKind = {
    array: ["element", "kind", "length", "text"],
    binary: ["kind", "left", "op", "right", "text"],
    channel: ["direction", "element", "kind", "text"],
    ellipsis: ["element", "kind", "text"],
    func: ["kind", "text"],
    ident: ["kind", "name", "text"],
    instantiation: ["element", "kind", "text", "typeArgs"],
    interface: ["kind", "text"],
    map: ["key", "kind", "text", "value"],
    paren: ["element", "kind", "text"],
    pointer: ["element", "kind", "text"],
    selector: ["kind", "name", "package", "text"],
    slice: ["element", "kind", "text"],
    struct: ["kind", "text"],
    unary: ["element", "kind", "op", "text"],
  };
  const expectedKeys = keysByKind[expression.kind];
  if (expectedKeys === undefined) {
    issues.push(`${label}.kind '${expression.kind}' is unknown to snapshot schema 5`);
    return;
  }
  const exactKeys = [...expectedKeys];
  if (expression.kind === "func") {
    for (const key of ["parameters", "results"]) if (Object.hasOwn(expression, key)) exactKeys.push(key);
  }
  if ((expression.kind === "interface" || expression.kind === "struct") && Object.hasOwn(expression, "members")) exactKeys.push("members");
  exactKeys.sort();
  compareExactKeys(expression, exactKeys, label, issues);
  if (typeof expression.text !== "string" || expression.text === "") issues.push(`${label}.text must be a non-empty string`);
  if (expression.kind === "ident") {
    validateTypeExpressionName(expression.name, `${label}.name`, issues);
    if (expression.text !== expression.name) issues.push(`${label}.text must equal identifier name`);
  }
  if (expression.kind === "selector") {
    validateTypeExpressionName(expression.name, `${label}.name`, issues);
    validateTypeExpressionName(expression.package, `${label}.package`, issues);
    if (expression.text !== `${expression.package}.${expression.name}`) issues.push(`${label}.text must equal package-qualified selector name`);
  }
  if (["pointer", "slice", "ellipsis", "instantiation", "paren", "channel", "unary", "array"].includes(expression.kind)) {
    validateTypeExpression(expression.element, `${label}.element`, issues, { required: true });
  }
  if (expression.kind === "array" && (typeof expression.length !== "string" || expression.length === "")) {
    issues.push(`${label}.length must be non-empty exact printed Go source`);
  }
  if (expression.kind === "map") {
    validateTypeExpression(expression.key, `${label}.key`, issues, { required: true });
    validateTypeExpression(expression.value, `${label}.value`, issues, { required: true });
  }
  if (expression.kind === "channel" && !new Set(["bidirectional", "receive", "send"]).has(expression.direction)) issues.push(`${label}.direction is invalid`);
  if (expression.kind === "unary" || expression.kind === "binary") {
    if (typeof expression.op !== "string" || expression.op === "") issues.push(`${label}.op must be a non-empty string`);
  }
  if (expression.kind === "unary" && expression.op !== "~") issues.push(`${label}.op must be '~' for a declaration type term`);
  if (expression.kind === "binary" && expression.op !== "|") issues.push(`${label}.op must be '|' for a declaration type union`);
  if (expression.kind === "binary") {
    validateTypeExpression(expression.left, `${label}.left`, issues, { required: true });
    validateTypeExpression(expression.right, `${label}.right`, issues, { required: true });
  }
  if (expression.kind === "func") {
    if (expression.parameters !== undefined) validateParameterList(expression.parameters, `${label}.parameters`, issues, true);
    if (expression.results !== undefined) validateParameterList(expression.results, `${label}.results`, issues, false);
  }
  if (expression.kind === "instantiation") {
    if (!Array.isArray(expression.typeArgs) || expression.typeArgs.length === 0) issues.push(`${label}.typeArgs must be a non-empty array`);
    for (const [index, argument] of (Array.isArray(expression.typeArgs) ? expression.typeArgs : []).entries()) validateTypeExpression(argument, `${label}.typeArgs[${index}]`, issues, { required: true });
  }
  if ((expression.kind === "interface" || expression.kind === "struct") && expression.members !== undefined) validateTypeExpressionMembers(expression.members, `${label}.members`, issues, expression.kind);
}

function validateTypeExpressionName(value, label, issues) {
  if (typeof value !== "string" || value === "") issues.push(`${label} must be a non-empty string`);
}

function validateParameterList(value, label, issues, allowVariadic) {
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array`);
    return;
  }
  for (const [index, parameter] of value.entries()) validateParameter(parameter, `${label}[${index}]`, issues, { allowVariadic: allowVariadic && index === value.length - 1 });
}

function validateTypeExpressionMembers(value, label, issues, containerKind) {
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array`);
    return;
  }
  const allowedKinds = containerKind === "struct" ? new Set(["embeddedField", "field"]) : new Set(["embeddedInterface", "method"]);
  for (const [index, member] of value.entries()) {
    validateMember(member, `${label}[${index}]`, issues);
    if (!allowedKinds.has(member?.kind)) issues.push(`${label}[${index}].kind '${member?.kind}' is invalid in a ${containerKind} type`);
  }
}

export function validateStructTagValues(member, label, issues) {
  const hasTag = Object.hasOwn(member ?? {}, "structTag");
  if (hasTag && typeof member.structTag !== "string") issues.push(`${label}.structTag must be a string when present`);
  if (hasTag !== Object.hasOwn(member ?? {}, "tagRemainder")) issues.push(`${label}.tagRemainder must be present exactly when structTag is present`);
  if (Object.hasOwn(member ?? {}, "tagRemainder") && typeof member.tagRemainder !== "string") issues.push(`${label}.tagRemainder must be a string when present`);
  if (!hasTag && Object.hasOwn(member ?? {}, "tagValues")) issues.push(`${label}.tagValues requires structTag`);
  if (member?.tagValues !== undefined && !Array.isArray(member.tagValues)) {
    issues.push(`${label}.tagValues must be an array when present`);
    return;
  }
  for (const [index, value] of (Array.isArray(member?.tagValues) ? member.tagValues : []).entries()) {
    validateSnapshotObject(value, PORTER_STRUCT_TAG_VALUE_KEYS, `${label}.tagValues[${index}]`, issues, PORTER_STRUCT_TAG_VALUE_KEYS);
    if (typeof value?.key !== "string" || value.key === "") issues.push(`${label}.tagValues[${index}].key must be non-empty`);
    if (typeof value?.value !== "string") issues.push(`${label}.tagValues[${index}].value must be a string`);
  }
  if (hasTag) validateStructTagContract(member.structTag, member.tagValues ?? [], member.tagRemainder, label, issues);
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
    const expressionKind = new Set(["func", "interface", "struct"]).has(unit.typeExpression?.kind) ? unit.typeExpression.kind : "named";
    if (unit.typeKind !== "alias" && unit.typeKind !== expressionKind) issues.push(`${label}.typeKind must match typeExpression.kind`);
    validateTypeUnitSignature(unit, label, issues);
    if (new Set(["interface", "struct"]).has(unit.typeExpression?.kind) && canonicalSchemaValue(unit.members) !== canonicalSchemaValue(unit.typeExpression.members ?? [])) issues.push(`${label}.members must equal typeExpression.members`);
  } else {
    for (const key of ["typeExpression", "typeKind"]) {
      if (Object.hasOwn(unit, key)) issues.push(`${label}.${key} is only valid for type units`);
    }
  }
  if (!functionLike && ((unit.parameters?.length ?? 0) > 0 || (unit.results?.length ?? 0) > 0)) {
    issues.push(`${label}.parameters and .results are only valid for func and method units`);
  }
  const valueGroup = unit.kind === "constGroup" || unit.kind === "varGroup";
  if (valueGroup && (unit.valueSpecs?.length ?? 0) === 0) issues.push(`${label}.valueSpecs must be non-empty for ${unit.kind}`);
  if (valueGroup) validateValueGroupSignature(unit, label, issues);
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
  const validKinds = new Set(["embeddedField", "embeddedInterface", "field", "method"]);
  const expectedKeys = ["exported", "kind", "name", "type", "typeExpr"];
  if (member?.structTag !== undefined) expectedKeys.push("structTag");
  if (member?.tagValues !== undefined) expectedKeys.push("tagValues");
  if (member?.tagRemainder !== undefined) expectedKeys.push("tagRemainder");
  expectedKeys.sort();
  if (member === null || typeof member !== "object" || Array.isArray(member)) {
    issues.push(`${label} must be an object`);
    return;
  }
  compareExactKeys(member, expectedKeys, label, issues);
  if (!validKinds.has(member.kind)) issues.push(`${label}.kind '${member.kind}' is unknown to snapshot schema 5`);
  if (typeof member?.name !== "string" || member.name === "") issues.push(`${label}.name must be a non-empty string`);
  if (typeof member?.exported !== "boolean") issues.push(`${label}.exported must be boolean`);
  if (typeof member?.type !== "string" || member.type === "") issues.push(`${label}.type must be a non-empty string`);
  if (member?.type !== member?.typeExpr?.text) issues.push(`${label}.type must equal typeExpr.text`);
  if ((member.kind === "embeddedInterface" || member.kind === "method") && (member.structTag !== undefined || member.tagValues !== undefined || member.tagRemainder !== undefined)) {
    issues.push(`${label} interface members must not carry struct tags`);
  }
  validateStructTagValues(member, label, issues);
  validateTypeExpression(member.typeExpr, `${label}.typeExpr`, issues, { required: true });
}

export function incrementPlain(record, key) {
  record[key] = (record[key] ?? 0) + 1;
}

export function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}
