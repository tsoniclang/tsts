import { createHash } from "node:crypto";
import {
  canonicalSchemaValue,
  canonicalSemanticDeclaration,
  canonicalSemanticModule,
  semanticProfileKey,
  semanticProfileStateKey,
} from "./semantic-variants.mjs";
import { validateStructTagContract } from "./struct-tag-validation.mjs";

export { canonicalSchemaValue, canonicalSemanticDeclaration, canonicalSemanticModule, semanticProfileKey, semanticProfileStateKey };
export { validateStructTagContract };

export function compareExactKeys(value, expected, label, issues) {
  const actual = Object.keys(value).sort();
  const expectedKeys = [...expected].sort();
  if (actual.length !== expectedKeys.length || actual.some((key, index) => key !== expectedKeys[index])) {
    issues.push(`${label} keys must be exactly ${expectedKeys.join(", ")}; got ${actual.join(", ")}`);
  }
}

export function compareAllowedKeys(value, allowed, label, issues) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) issues.push(`${label} contains unknown snapshot-schema-11 key '${key}'`);
  }
}

export function requireKeys(value, required, label, issues) {
  for (const key of required) {
    if (!Object.hasOwn(value, key)) issues.push(`${label} is missing required snapshot-schema-11 key '${key}'`);
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

export const SEMANTIC_PRIMARY_UNIT_KINDS = new Set(["constGroup", "func", "method", "type", "varGroup"]);
const architectureVariableByGoarch = Object.freeze({
  "386": "GO386", amd64: "GOAMD64", arm: "GOARM", arm64: "GOARM64", mips: "GOMIPS", mipsle: "GOMIPS",
  mips64: "GOMIPS64", mips64le: "GOMIPS64", ppc64: "GOPPC64", ppc64le: "GOPPC64", riscv64: "GORISCV64", wasm: "GOWASM",
});
const architectureVariables = Object.freeze(["GO386", "GOAMD64", "GOARM", "GOARM64", "GOMIPS", "GOMIPS64", "GOPPC64", "GORISCV64", "GOWASM"]);
const semanticEnvironmentKeys = new Set([
  "CGO_ENABLED", "GO111MODULE", "GO386", "GOAMD64", "GOARCH", "GOARM", "GOARM64", "GOAUTH", "GOBIN", "GOCACHE", "GOCACHEPROG",
  "GODEBUG", "GOENV", "GOEXPERIMENT", "GOFIPS140", "GOFLAGS", "GOINSECURE", "GOMIPS", "GOMIPS64", "GOMODCACHE",
  "GONOPROXY", "GONOSUMDB", "GOPACKAGESDRIVER", "GOPATH", "GOPPC64", "GOPRIVATE", "GOPROXY", "GORISCV64", "GOROOT",
  "GOSUMDB", "GOOS", "GOTMPDIR", "GOTOOLCHAIN", "GOVCS", "GOWASM", "GOWORK", "PATH",
]);
const fileMetadataKeys = new Set(["basename"]);
const unitMetadataKeys = new Set(["goPath"]);
const bodylessUnitKinds = new Set(["constGroup", "func", "method", "type", "varGroup"]);
const directlyExportedUnitKinds = new Set(["func", "method", "type"]);

export function validateSortedUniqueStrings(value, label, issues, options = {}) {
  validateStringArray(value, label, issues, options);
  if (!Array.isArray(value)) return;
  for (let index = 1; index < value.length; index++) {
    if (value[index - 1] >= value[index]) issues.push(`${label} must be sorted with no duplicates`);
  }
}

export function validateSemanticProvenance(snapshot, issues) {
  const semantic = snapshot?.semantic;
  const files = Array.isArray(snapshot?.files) ? snapshot.files : [];
  const existingFiles = new Set(files.flatMap((file) => typeof file?.path === "string" ? [file.path] : []));
  const primaryFiles = new Set(files.flatMap((file) =>
    Array.isArray(file?.units) && file.units.some((unit) => SEMANTIC_PRIMARY_UNIT_KINDS.has(unit?.kind)) && typeof file.path === "string"
      ? [file.path]
      : []));
  const required = new Set(Array.isArray(semantic?.requiredFiles) ? semantic.requiredFiles : []);
  const covered = new Set(Array.isArray(semantic?.coveredFiles) ? semantic.coveredFiles : []);
  const excluded = new Set(Array.isArray(semantic?.excludedFiles) ? semantic.excludedFiles : []);

  for (const [name, values] of [["requiredFiles", required], ["coveredFiles", covered], ["excludedFiles", excluded]]) {
    for (const file of values) {
      if (!existingFiles.has(file)) issues.push(`snapshot.semantic.${name} references missing snapshot file ${file}`);
    }
  }
  for (const file of primaryFiles) {
    const memberships = Number(required.has(file)) + Number(excluded.has(file));
    if (memberships !== 1) issues.push(`primary declaration file ${file} must be exactly required or excluded`);
  }
  for (const file of required) {
    if (!primaryFiles.has(file)) issues.push(`snapshot.semantic.requiredFiles includes non-primary file ${file}`);
    if (excluded.has(file)) issues.push(`snapshot.semantic.requiredFiles includes excluded path ${file}`);
  }
  reportSetDifference(required, covered, "snapshot.semantic.coveredFiles must equal requiredFiles; missing", issues);
  reportSetDifference(covered, required, "snapshot.semantic.coveredFiles must equal requiredFiles; extra", issues);

  const profilesByFile = new Map();
  const profileLabels = [];
  const profileKeys = new Set();
  const profileStates = new Set();
  const profileCoverageUnion = new Set();
  for (const [index, profile] of (Array.isArray(semantic?.profiles) ? semantic.profiles : []).entries()) {
    const label = `snapshot.semantic.profiles[${index}]`;
    const key = typeof profile?.experiments === "string" && typeof profile?.goexperiment === "string" ? semanticProfileKey(profile) : `<invalid-profile-${index}>`;
    profileLabels.push(key);
    if (profileKeys.has(key)) issues.push(`${label} duplicates semantic profile key '${key}'`);
    profileKeys.add(key);
    const state = semanticProfileStateKey(profile);
    if (profileStates.has(state)) issues.push(`${label} duplicates an actual semantic profile state under another GOEXPERIMENT setting`);
    profileStates.add(state);
    const profileCoverage = Array.isArray(profile?.coveredFiles) ? profile.coveredFiles : [];
    for (const file of profileCoverage) {
      if (!existingFiles.has(file)) issues.push(`${label}.coveredFiles references missing snapshot file ${file}`);
      if (!required.has(file)) issues.push(`${label}.coveredFiles includes non-required file ${file}`);
      profileCoverageUnion.add(file);
      const indexes = profilesByFile.get(file) ?? new Set();
      indexes.add(index);
      profilesByFile.set(file, indexes);
    }
  }
  reportSetDifference(covered, profileCoverageUnion, "semantic profile coverage union is missing", issues);
  reportSetDifference(profileCoverageUnion, covered, "semantic profile coverage union has extra", issues);

  const expectedProfilesByFile = new Map();
  for (const file of required) expectedProfilesByFile.set(file, [...(profilesByFile.get(file) ?? [])].sort((left, right) => left - right));
  return { excludedFiles: excluded, expectedProfilesByFile, primaryFiles, profileKeys, profileLabels, requiredFiles: required };
}

export function validateFileUnitContracts(modulePath, file, label, issues) {
  validateSnapshotObject(file?.metadata, fileMetadataKeys, `${label}.metadata`, issues, fileMetadataKeys);
  if (file?.metadata !== null && typeof file?.metadata === "object" && !Array.isArray(file.metadata)) compareExactKeys(file.metadata, fileMetadataKeys, `${label}.metadata`, issues);
  if (file?.metadata?.basename !== pathBasename(file?.path)) issues.push(`${label}.metadata.basename must equal the source path basename`);
  if (typeof file?.generated !== "boolean") issues.push(`${label}.generated must be boolean`);
  const groups = new Map();
  let previousUnit;
  for (const [index, unit] of (Array.isArray(file?.units) ? file.units : []).entries()) {
    const unitLabel = `${label}.units[${index}]`;
    validateSnapshotObject(unit?.metadata, unitMetadataKeys, `${unitLabel}.metadata`, issues, unitMetadataKeys);
    if (unit?.metadata !== null && typeof unit?.metadata === "object" && !Array.isArray(unit.metadata)) compareExactKeys(unit.metadata, unitMetadataKeys, `${unitLabel}.metadata`, issues);
    if (unit?.metadata?.goPath !== file?.path) issues.push(`${unitLabel}.metadata.goPath must equal the owning file path`);
    if (unit?.generated !== file?.generated) issues.push(`${unitLabel}.generated must equal the owning file generated state`);
    if (Number.isInteger(unit?.endLine) && Number.isInteger(file?.lineCount) && unit.endLine > file.lineCount) issues.push(`${unitLabel}.endLine must not exceed the owning file line count`);
    if (previousUnit !== undefined && Number.isInteger(previousUnit.startOffset) && Number.isInteger(unit?.startOffset)) {
      if (previousUnit.startOffset < unit.startOffset && previousUnit.startLine > unit.startLine) issues.push(`${unitLabel}.startLine must follow physical startOffset order`);
      if (previousUnit.startOffset === unit.startOffset && previousUnit.startLine !== unit.startLine) issues.push(`${unitLabel}.startLine must agree for identical physical startOffset values`);
    }
    previousUnit = unit;
    for (const key of ["name", "qualifiedName", "signature", "snippet"]) {
      if (typeof unit?.[key] !== "string" || unit[key] === "") issues.push(`${unitLabel}.${key} must be a non-empty string`);
    }
    if (!/^[a-f0-9]{64}$/.test(unit?.sigHash ?? "")) issues.push(`${unitLabel}.sigHash must be lowercase SHA-256`);
    else if (unit.sigHash !== hashSignature(unit.signature)) issues.push(`${unitLabel}.sigHash must equal SHA-256 of the normalized signature`);
    if (!/^[a-f0-9]{64}$/.test(unit?.bodyHash ?? "")) issues.push(`${unitLabel}.bodyHash must be lowercase SHA-256`);
    if (bodylessUnitKinds.has(unit?.kind) && unit.snippet !== unit.signature) {
      issues.push(`${unitLabel}.snippet must equal the bodyless declaration signature exactly`);
    }
    validateUnitIdentityFields(unit, unitLabel, issues);
    if (typeof modulePath !== "string" || typeof file?.path !== "string" || typeof unit?.kind !== "string" || typeof unit?.qualifiedName !== "string") continue;
    const base = `${modulePath}::${file.path}::${unit.kind}::${unit.qualifiedName}`;
    const entries = groups.get(base) ?? [];
    entries.push({ id: unit.id, label: unitLabel, startOffset: unit.startOffset });
    groups.set(base, entries);
  }
  for (const [base, entries] of groups) validateUnitIdentityGroup(base, entries, issues);
}

export function validateImportContract(imported, label, issues, options = {}) {
  for (const key of ["name", "packageName"]) {
    if (Object.hasOwn(imported ?? {}, key) && (typeof imported[key] !== "string" || imported[key] === "")) issues.push(`${label}.${key} must be a non-empty string when present`);
  }
  const unresolved = options.requirePackageName !== false && imported?.packageName === undefined && imported?.path !== "C";
  if (unresolved) issues.push(`${label}.packageName is required for every non-cgo import, including aliased imports`);
}

export function validateTypeUnitSignature(unit, label, issues) {
  if (typeof unit?.signature !== "string" || typeof unit?.name !== "string" || typeof unit?.typeExpression?.text !== "string") return;
  const separator = unit.typeKind === "alias" ? " = " : " ";
  const suffix = `${separator}${unit.typeExpression.text}`;
  if (!unit.signature.endsWith(suffix) || !unit.signature.startsWith(unit.name)) {
    issues.push(`${label}.signature must retain the exact TypeSpec name, alias form, and full typeExpression RHS`);
    return;
  }
  if ((unit.typeParameters?.length ?? 0) === 0 && unit.signature !== `${unit.name}${suffix}`) {
    issues.push(`${label}.signature must equal the exact non-generic TypeSpec`);
  } else if ((unit.typeParameters?.length ?? 0) > 0 && !unit.signature.slice(unit.name.length, -suffix.length).match(/^\[.+\]$/s)) {
    issues.push(`${label}.signature must retain the printed generic TypeSpec parameter list`);
  }
}

export function validateValueGroupSignature(unit, label, issues) {
  if (!Array.isArray(unit?.valueSpecs) || typeof unit?.signature !== "string") return;
  const parts = unit.valueSpecs.map((specification) => {
    const names = Array.isArray(specification?.names) ? specification.names.join(", ") : "";
    return `${names} ${specification?.type === undefined ? "<inferred>" : specification.type?.text ?? ""}`;
  });
  const keyword = unit.kind === "constGroup" ? "const" : "var";
  if (!new Set([`${keyword} ${parts.join("; ")}`, `${keyword} (${parts.join("; ")})`]).has(unit.signature)) {
    issues.push(`${label}.signature must equal the declaration-only value skeleton derived from valueSpecs`);
  }
}

export function validateSemanticModuleRelations(modules, modulePath, issues) {
  if (!Array.isArray(modules)) return;
  const paths = new Set();
  let root;
  for (const [index, module] of modules.entries()) {
    const label = `snapshot.semantic.moduleGraph[${index}]`;
    if (paths.has(module?.path)) issues.push(`${label}.path duplicates module selection '${module.path}'`);
    paths.add(module?.path);
    if (module?.replacePath === "" && (module?.replaceVersion !== "" || module?.replaceSum !== "")) issues.push(`${label} replacement details require replacePath`);
    if (module?.replacePath !== "" && (module?.replaceVersion === "" || module?.replaceSum === "")) issues.push(`${label} replacement modules must carry pinned version and checksum evidence`);
    if (module?.path !== modulePath && module?.version === "") issues.push(`${label} selected module must carry an exact version`);
    if (module?.path !== modulePath && module?.replacePath === "" && (module?.version === "" || module?.sum === "")) issues.push(`${label} selected modules must carry exact version and checksum evidence`);
    if (module?.path === modulePath) root = module;
  }
  if (root === undefined) issues.push(`snapshot.semantic.moduleGraph must contain root module '${modulePath}'`);
  else if ([root.version, root.sum, root.replacePath, root.replaceVersion, root.replaceSum].some((value) => value !== "")) issues.push("snapshot.semantic.moduleGraph root module selection must be unversioned and unreplaced");
}

function validateUnitIdentityFields(unit, label, issues) {
  if (directlyExportedUnitKinds.has(unit?.kind) && typeof unit?.name === "string" && unit.exported !== isGoExported(unit.name)) {
    issues.push(`${label}.exported must match the source declaration name`);
  }
  if (unit?.kind === "method") {
    if (unit.qualifiedName !== `${unit.receiver}.${unit.name}`) issues.push(`${label}.qualifiedName must equal receiver plus method name`);
    const receiver = receiverTypeIdentity(unit.receiverType);
    if (receiver.name !== unit.receiver || receiver.mode !== unit.receiverMode) issues.push(`${label}.receiver and receiverMode must match receiverType`);
  } else if (unit?.qualifiedName !== unit?.name) {
    issues.push(`${label}.qualifiedName must equal name for non-method units`);
  }
  if (unit?.kind === "constGroup" || unit?.kind === "varGroup") {
    const names = (Array.isArray(unit.valueSpecs) ? unit.valueSpecs : []).flatMap((specification) => Array.isArray(specification?.names) ? specification.names : []);
    const expectedName = names.length === 0 ? "anonymous" : names.join("+");
    if (unit.name !== expectedName) issues.push(`${label}.name must equal the source value declaration names`);
    if (unit.exported !== names.some(isGoExported)) issues.push(`${label}.exported must match the source value declaration names`);
  }
}

function receiverTypeIdentity(type) {
  let current = type;
  let mode = "value";
  if (current?.kind === "pointer") {
    mode = "pointer";
    current = current.element;
  }
  while (current?.kind === "instantiation" || current?.kind === "paren") current = current.element;
  return { mode, name: current?.kind === "ident" ? current.name : undefined };
}

function validateUnitIdentityGroup(base, entries, issues) {
  const seenOrdinals = new Map();
  for (const entry of entries) {
    let ordinal;
    if (entry.id === base) ordinal = 1;
    else {
      const match = new RegExp(`^${escapeRegExp(base)}::#((?:[2-9]|[1-9][0-9]+))$`).exec(entry.id ?? "");
      if (match !== null) ordinal = Number(match[1]);
    }
    if (!Number.isSafeInteger(ordinal)) {
      issues.push(`${entry.label}.id must equal '${base}' with only a canonical duplicate ordinal suffix`);
      continue;
    }
    if (seenOrdinals.has(ordinal)) issues.push(`${entry.label}.id duplicates source-order occurrence #${ordinal}`);
    seenOrdinals.set(ordinal, entry);
  }
  for (let ordinal = 1; ordinal <= entries.length; ordinal++) {
    if (!seenOrdinals.has(ordinal)) issues.push(`unit identity '${base}' is missing source-order occurrence #${ordinal}`);
    if (ordinal > 1 && seenOrdinals.get(ordinal - 1)?.startOffset >= seenOrdinals.get(ordinal)?.startOffset) {
      issues.push(`unit identity '${base}' duplicate ordinals must follow source order`);
    }
  }
  for (const ordinal of seenOrdinals.keys()) if (ordinal > entries.length) issues.push(`unit identity '${base}' has impossible duplicate occurrence #${ordinal}`);
}

function hashSignature(signature) {
  if (typeof signature !== "string") return "";
  return createHash("sha256").update(signature.replaceAll("\r\n", "\n")).digest("hex");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pathBasename(value) {
  return typeof value === "string" ? value.slice(value.lastIndexOf("/") + 1) : undefined;
}

function isGoExported(name) {
  return /^\p{Lu}/u.test(name);
}

export function validateProfileArchitecture(profile, label, issues) {
  if (typeof profile?.architecture !== "string") {
    issues.push(`${label}.architecture must be a string`);
    return;
  }
  const variable = architectureVariableByGoarch[profile.goarch];
  if (variable === undefined) {
    if (profile.architecture !== "") issues.push(`${label}.architecture must be empty for ${profile.goarch}`);
  } else if (!profile.architecture.startsWith(`${variable}=`) || (profile.architecture.length === variable.length + 1 && variable !== "GOWASM")) {
    issues.push(`${label}.architecture must record ${variable}=<value>`);
  }
  const expectedToolTags = exactProfileToolTags(profile);
  if (expectedToolTags === undefined) issues.push(`${label}.architecture has an unsupported exact setting`);
  else if (canonicalSchemaValue(profile.toolTags) !== canonicalSchemaValue(expectedToolTags)) issues.push(`${label}.toolTags must exactly match architecture and experiment tags`);
}

export function validateProfileEnvironment(profile, label, issues, contract = {}) {
  if (!Array.isArray(profile?.environment)) return;
  const values = profileEnvironmentMap(profile, label, issues);
  const expected = new Map([
    ["CGO_ENABLED", "0"],
    ["GO111MODULE", "on"],
    ["GOAUTH", "off"],
    ["GOBIN", ""],
    ["GOCACHEPROG", ""],
    ["GOARCH", profile.goarch],
    ["GODEBUG", ""],
    ["GOENV", "off"],
    ["GOEXPERIMENT", profile.goexperiment],
    ["GOFIPS140", "off"],
    ["GOFLAGS", ""],
    ["GOINSECURE", ""],
    ["GONOPROXY", ""],
    ["GONOSUMDB", ""],
    ["GOPACKAGESDRIVER", "off"],
    ["GOPRIVATE", ""],
    ["GOPROXY", "off"],
    ["GOSUMDB", "off"],
    ["GOOS", profile.goos],
    ["GOTMPDIR", ""],
    ["GOTOOLCHAIN", "local"],
    ["GOVCS", "off"],
    ["GOWORK", "off"],
  ]);
  if (typeof contract.goroot === "string") expected.set("GOROOT", contract.goroot);
  if (typeof profile.architecture === "string" && profile.architecture.includes("=")) {
    const separator = profile.architecture.indexOf("=");
    expected.set(profile.architecture.slice(0, separator), profile.architecture.slice(separator + 1));
  }
  for (const [key, value] of expected) {
    if (values.get(key) !== value) issues.push(`${label}.environment must contain ${key}=${value}`);
  }
  for (const key of semanticEnvironmentKeys) if (!values.has(key)) issues.push(`${label}.environment is missing allowlisted key '${key}'`);
  for (const key of values.keys()) if (!semanticEnvironmentKeys.has(key)) issues.push(`${label}.environment contains unmodeled key '${key}'`);
}

export function validateGoExperimentSetting(value, label, issues) {
  if (typeof value !== "string") {
    issues.push(`${label} must be a string`);
    return;
  }
  if (value === "") return;
  let previous = "";
  const names = new Set();
  for (const [index, directive] of value.split(",").entries()) {
    const match = /^(?:no)?([a-z][a-z0-9_]*)$/.exec(directive);
    if (match === null) {
      issues.push(`${label} directive #${index} is not canonical`);
      continue;
    }
    const name = match[1];
    if (names.has(name)) issues.push(`${label} repeats experiment '${name}'`);
    if (previous !== "" && previous >= name) issues.push(`${label} directives must be sorted by experiment name with no duplicates`);
    names.add(name);
    previous = name;
  }
}

export function validateExperimentNames(value, label, issues) {
  if (typeof value !== "string") {
    issues.push(`${label} must be a string`);
    return;
  }
  if (value === "") return;
  const names = value.split(",");
  for (const [index, name] of names.entries()) {
    if (!/^[a-z0-9_]+$/.test(name)) issues.push(`${label} entry #${index} is invalid`);
    if (index > 0 && names[index - 1] >= name) issues.push(`${label} must be sorted with no duplicates`);
  }
}

export function validateProfileEnvironmentRelations(profiles, issues) {
  if (!Array.isArray(profiles) || profiles.length < 2) return;
  const maps = profiles.map((profile, index) => profileEnvironmentMap(profile, `snapshot.semantic.profiles[${index}]`, issues));
  const profileVarying = new Set(["CGO_ENABLED", "GOARCH", "GOEXPERIMENT", "GOOS", ...architectureVariables]);
  for (const key of semanticEnvironmentKeys) {
    if (profileVarying.has(key)) continue;
    const expected = maps[0].get(key);
    for (let index = 1; index < maps.length; index++) {
      if (maps[index].get(key) !== expected) issues.push(`snapshot.semantic.profiles[${index}].environment ${key} must be byte-identical across profiles`);
    }
  }
  for (const variable of architectureVariables) {
    let expected;
    for (let index = 0; index < profiles.length; index++) {
      if (architectureVariableByGoarch[profiles[index]?.goarch] === variable) continue;
      const value = maps[index].get(variable);
      if (expected === undefined) expected = value;
      else if (value !== expected) issues.push(`snapshot.semantic.profiles[${index}].environment inactive ${variable} must be byte-identical across profiles`);
    }
  }
}

export function validateUnsupportedProfiles(value, issues) {
  const label = "snapshot.semantic.unsupportedProfiles";
  const keys = new Set(["architecture", "cgoEnabled", "goarch", "goexperiment", "goos", "reason"]);
  if (!Array.isArray(value)) {
    issues.push(`${label} must be an array`);
    return;
  }
  let previousKey = "";
  for (const [index, rejection] of value.entries()) {
    const itemLabel = `${label}[${index}]`;
    validateSnapshotObject(rejection, keys, itemLabel, issues, keys);
    for (const key of ["goos", "goarch", "reason"]) if (typeof rejection?.[key] !== "string" || rejection[key] === "") issues.push(`${itemLabel}.${key} must be a non-empty string`);
    if (typeof rejection?.architecture !== "string") issues.push(`${itemLabel}.architecture must be a string`);
    validateGoExperimentSetting(rejection?.goexperiment, `${itemLabel}.goexperiment`, issues);
    if (rejection?.cgoEnabled !== false) issues.push(`${itemLabel}.cgoEnabled must be false because cgo inputs fail before profile planning`);
    const architectureVariable = architectureVariableByGoarch[rejection?.goarch];
    if (architectureVariable === undefined ? rejection?.architecture !== "" : !rejection?.architecture?.startsWith(`${architectureVariable}=`)) issues.push(`${itemLabel}.architecture does not match goarch`);
    if (exactProfileToolTags(rejection) === undefined) issues.push(`${itemLabel}.architecture has an unsupported exact setting`);
    const key = `${rejection?.goos ?? ""}/${rejection?.goarch ?? ""}:cgo=0:arch=${rejection?.architecture ?? ""}:goexperiment=${rejection?.goexperiment ?? ""}:${rejection?.reason ?? ""}`;
    if (previousKey !== "" && previousKey >= key) issues.push(`${label} must be sorted with no duplicates`);
    previousKey = key;
  }
}

function reportSetDifference(expected, actual, prefix, issues) {
  for (const value of [...expected].sort()) {
    if (!actual.has(value)) issues.push(`${prefix} ${value}`);
  }
}

function profileEnvironmentMap(profile, label, issues) {
  const values = new Map();
  for (const entry of Array.isArray(profile?.environment) ? profile.environment : []) {
    if (typeof entry !== "string") continue;
    const separator = entry.indexOf("=");
    if (separator <= 0) {
      issues.push(`${label}.environment entry '${entry}' must be KEY=VALUE`);
      continue;
    }
    const key = entry.slice(0, separator);
    if (values.has(key)) issues.push(`${label}.environment duplicates key '${key}'`);
    values.set(key, entry.slice(separator + 1));
  }
  return values;
}

function exactProfileToolTags(profile) {
  const [, architectureValue = ""] = String(profile?.architecture ?? "").split("=", 2);
  const tags = profile?.experiments === "" ? [] : String(profile?.experiments ?? "").split(",").map((name) => `goexperiment.${name}`);
  if (profile?.goarch === "386") {
    if (!new Set(["softfloat", "sse2"]).has(architectureValue)) return undefined;
    tags.push(`386.${architectureValue}`);
  } else if (profile?.goarch === "amd64") {
    const level = Number(architectureValue.slice(1));
    if (!/^v[1-4]$/.test(architectureValue)) return undefined;
    for (let index = 1; index <= level; index++) tags.push(`amd64.v${index}`);
  } else if (profile?.goarch === "arm") {
    const level = Number(architectureValue.split(",", 1)[0]);
    if (!Number.isInteger(level) || level < 5 || level > 7) return undefined;
    for (let index = 5; index <= level; index++) tags.push(`arm.${index}`);
  } else if (profile?.goarch === "arm64") {
    const version = architectureValue.split(",", 1)[0];
    const match = /^v([89])\.([0-9])$/.exec(version);
    if (match === null) return undefined;
    const major = Number(match[1]);
    const minor = Number(match[2]);
    if (major === 9 && minor > 5) return undefined;
    for (let index = 0; index <= minor; index++) tags.push(`arm64.v${major}.${index}`);
    if (major === 9) for (let index = 0; index <= minor + 5 && index <= 9; index++) tags.push(`arm64.v8.${index}`);
  } else if (new Set(["mips", "mipsle", "mips64", "mips64le"]).has(profile?.goarch)) {
    if (!new Set(["hardfloat", "softfloat"]).has(architectureValue)) return undefined;
    tags.push(`${profile.goarch}.${architectureValue}`);
  } else if (profile?.goarch === "ppc64" || profile?.goarch === "ppc64le") {
    const level = Number(architectureValue.slice("power".length));
    if (!/^power(?:8|9|10)$/.test(architectureValue)) return undefined;
    for (let index = 8; index <= level; index++) tags.push(`${profile.goarch}.power${index}`);
  } else if (profile?.goarch === "riscv64") {
    const level = new Map([["rva20u64", 20], ["rva22u64", 22], ["rva23u64", 23]]).get(architectureValue) ?? 0;
    if (level === 0) return undefined;
    if (level >= 20) tags.push("riscv64.rva20u64");
    if (level >= 22) tags.push("riscv64.rva22u64");
    if (level >= 23) tags.push("riscv64.rva23u64");
  } else if (profile?.goarch === "wasm") {
    if (architectureValue !== "") return undefined;
    tags.push("wasm.satconv", "wasm.signext");
  }
  return [...new Set(tags)].sort();
}
