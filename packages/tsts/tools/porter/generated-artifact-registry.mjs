import { createHash } from "node:crypto";
import { existsSync, lstatSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";

import { compareText } from "./core/deterministic-order.mjs";
import { matchGlob } from "./path-policy.mjs";

export const generatedArtifactProviders = Object.freeze([
  artifactProvider("porter:facades", "generatedArtifacts", [
    artifactArea("go", ["go/*.ts", "go/**/*.ts"], false),
  ], ["go-scalars", "go-compat", "go-facade"]),
  artifactProvider("porter:ast", "astGeneratedArtifacts", [
    artifactArea("internal/ast/generated", ["internal/ast/generated/**"], true),
  ], ["ast-generated"], "schemaInputs"),
  artifactProvider("porter:diagnostics", "diagnosticsGeneratedArtifacts", [
    artifactArea("internal/diagnostics/generated", ["internal/diagnostics/generated/**"], true),
  ], ["diagnostics-generated"], "inputs"),
  artifactProvider("porter:bundled", "bundledGeneratedArtifacts", [
    artifactArea("internal/bundled", ["internal/bundled/*_generated.ts"], false),
    artifactArea("internal/bundled/libs", ["internal/bundled/libs/**"], true),
  ], ["bundled-generated"]),
  artifactProvider("porter:unicode", "unicodeGeneratedArtifacts", [
    artifactArea("internal/stringutil/generated", ["internal/stringutil/generated/**"], true),
  ], ["unicode-generated"]),
  artifactProvider("porter:value-operations", "valueOperationGeneratedArtifacts", [
    artifactArea("internal/go-value-operations/generated", ["internal/go-value-operations/generated/**"], true),
  ], ["go-value-operations"]),
]);

validateProviderRegistry(generatedArtifactProviders);

const commonMetadataKeys = Object.freeze(["schemaVersion", "kind", "generator", "sourceRevision", "path", "contentHash"]);
const sha256Pattern = /^[0-9a-f]{64}$/;
const generatedEnvelopePattern = /^\/\/ Code generated[^\n\r]*\r?\n\/\/ @tsgo-generated\s+({[^\n\r]+})\r?\n\r?\n/;

export function inspectGeneratedArtifactRegistration(relativePath, text) {
  const providers = generatedArtifactProviders.filter((provider) => provider.patterns.some((pattern) => matchGlob(pattern, relativePath)));
  const provider = providers.length === 1 ? providers[0] : undefined;
  const markers = [...text.matchAll(/^\/\/ @tsgo-generated[^\n\r]*$/gm)];
  if (markers.length === 0) return { metadata: undefined, provider: undefined, error: undefined };
  if (markers.length !== 1) {
    return { metadata: undefined, provider, error: `generated artifact must carry exactly one @tsgo-generated record, found ${markers.length}` };
  }
  const envelope = generatedEnvelopePattern.exec(text);
  if (envelope === null) {
    return { metadata: undefined, provider, error: "@tsgo-generated must be the second line after the generated-file header and followed by one blank line" };
  }
  const payload = envelope[1];
  if (payload === undefined) return { metadata: undefined, provider, error: "@tsgo-generated must contain one JSON object on its line" };
  let metadata;
  try {
    metadata = JSON.parse(payload);
  } catch (error) {
    return { metadata: undefined, provider, error: `invalid @tsgo-generated JSON: ${error.message}` };
  }
  if (!isPlainObject(metadata)) return { metadata, provider, error: "@tsgo-generated metadata must be a plain object" };
  if (metadata.schemaVersion !== 1) return { metadata, provider, error: "unsupported @tsgo-generated schemaVersion" };
  if (providers.length !== 1) {
    return {
      metadata,
      provider: undefined,
      error: providers.length === 0 ? "generated artifact path has no registered provider" : `generated artifact path matches ${providers.length} providers`,
    };
  }
  const expectedKeys = [...commonMetadataKeys, ...(provider.inputDigestKey === undefined ? [] : [provider.inputDigestKey])].sort(compareText);
  const actualKeys = Object.keys(metadata).sort(compareText);
  if (!sameStringArray(actualKeys, expectedKeys)) {
    return { metadata, provider, error: `@tsgo-generated metadata keys must be exactly ${expectedKeys.join(", ")}; got ${actualKeys.join(", ")}` };
  }
  for (const key of ["kind", "generator"]) {
    if (typeof metadata[key] !== "string" || metadata[key].length === 0) {
      return { metadata, provider, error: `missing or invalid @tsgo-generated ${key}` };
    }
  }
  if (!isCanonicalRelativePath(metadata.path)) {
    return { metadata, provider, error: "@tsgo-generated path must be a canonical non-empty POSIX relative path" };
  }
  if (typeof metadata.sourceRevision !== "string" || metadata.sourceRevision.length === 0 || metadata.sourceRevision.trim() !== metadata.sourceRevision || /[\r\n]/.test(metadata.sourceRevision)) {
    return { metadata, provider, error: "missing or invalid @tsgo-generated sourceRevision" };
  }
  if (typeof metadata.contentHash !== "string" || !sha256Pattern.test(metadata.contentHash)) {
    return { metadata, provider, error: "@tsgo-generated contentHash must be a lowercase SHA-256 digest" };
  }
  if (provider.inputDigestKey !== undefined) {
    const digestError = inspectInputDigests(metadata[provider.inputDigestKey], provider.inputDigestKey);
    if (digestError !== undefined) return { metadata, provider, error: digestError };
  }
  if (metadata.generator !== provider.id) return { metadata, provider, error: `metadata generator '${metadata.generator}' does not match provider '${provider.id}'` };
  if (!provider.kinds.includes(metadata.kind)) return { metadata, provider, error: `metadata kind '${metadata.kind}' is not registered for '${provider.id}'` };
  if (metadata.path !== relativePath) return { metadata, provider, error: `metadata path '${metadata.path}' does not match '${relativePath}'` };
  return { metadata, provider, error: undefined };
}

export function renderGeneratedArtifactEnvelope(input) {
  if (!isPlainObject(input)) throw new Error("generated artifact rendering requires one plain object");
  const provider = generatedArtifactProviders.find((candidate) => candidate.id === input.providerId);
  if (provider === undefined) throw new Error(`unknown generated artifact provider '${input.providerId}'`);
  const expectedInputKeys = ["body", "header", "kind", "path", "providerId", "sourceRevision", ...(provider.inputDigestKey === undefined ? [] : [provider.inputDigestKey])].sort(compareText);
  const actualInputKeys = Object.keys(input).sort(compareText);
  if (!sameStringArray(actualInputKeys, expectedInputKeys)) {
    throw new Error(`generated artifact render input keys must be exactly ${expectedInputKeys.join(", ")}; got ${actualInputKeys.join(", ")}`);
  }
  if (typeof input.header !== "string" || !/^\/\/ Code generated[^\n\r]*$/.test(input.header)) {
    throw new Error("generated artifact header must be one // Code generated line");
  }
  if (typeof input.body !== "string") throw new Error("generated artifact body must be a string");
  const metadata = {
    schemaVersion: 1,
    kind: input.kind,
    generator: provider.id,
    sourceRevision: input.sourceRevision,
    ...(provider.inputDigestKey === undefined ? {} : { [provider.inputDigestKey]: input[provider.inputDigestKey] }),
    path: input.path,
    contentHash: createHash("sha256").update(input.body).digest("hex"),
  };
  const text = `${input.header}\n// @tsgo-generated ${JSON.stringify(metadata)}\n\n${input.body}`;
  const registration = inspectGeneratedArtifactRegistration(input.path, text);
  if (registration.error !== undefined) throw new Error(`cannot render generated artifact '${input.path}': ${registration.error}`);
  return text;
}

export function stripGeneratedArtifactEnvelope(text) {
  const envelope = generatedEnvelopePattern.exec(text);
  if (envelope === null) throw new Error("generated artifact does not have the exact registered envelope");
  return text.slice(envelope[0].length);
}

export function inventoryGeneratedArtifactsForProvider(tsRootAbsolute, providerId) {
  requireExactDirectoryRoot(tsRootAbsolute, "generated artifact TypeScript root");
  const provider = generatedArtifactProviders.find((candidate) => candidate.id === providerId);
  if (provider === undefined) throw new Error(`unknown generated artifact provider '${providerId}'`);
  const files = new Set();
  const invalidByPath = new Map();
  for (const area of provider.areas) {
    const absoluteRoot = path.join(tsRootAbsolute, ...area.root.split("/"));
    if (!existsSync(absoluteRoot)) continue;
    const rootStat = lstatSync(absoluteRoot);
    if (rootStat.isSymbolicLink()) {
      invalidByPath.set(area.root, { path: area.root, reason: `generated artifact area '${area.root}' must not be a symbolic link` });
      continue;
    }
    if (!rootStat.isDirectory()) {
      invalidByPath.set(area.root, { path: area.root, reason: `generated artifact area '${area.root}' must be a directory` });
      continue;
    }
    requireContainedRealPath(tsRootAbsolute, absoluteRoot, `generated artifact area '${area.root}'`);
    for (const entry of walkExactEntries(absoluteRoot)) {
      const relativePath = relativeToRoot(tsRootAbsolute, entry.path);
      const selected = area.exclusive || area.patterns.some((pattern) => matchGlob(pattern, relativePath));
      if (!selected || entry.kind === "directory") continue;
      if (entry.kind !== "file") {
        invalidByPath.set(relativePath, { path: relativePath, reason: `generated artifact path must be a regular file, found ${entry.kind}` });
      } else {
        files.add(relativePath);
      }
    }
  }
  return Object.freeze({
    provider,
    files: Object.freeze([...files].sort(compareText)),
    invalid: Object.freeze([...invalidByPath.values()].sort((left, right) => compareText(left.path, right.path))),
  });
}

export function walkExactRegularFiles(root) {
  requireExactDirectoryRoot(root, "filesystem inventory root");
  return walkExactEntries(root)
    .filter((entry) => entry.kind === "file")
    .map((entry) => entry.path);
}

function artifactProvider(id, statusKey, areas, kinds, inputDigestKey = undefined) {
  const patterns = areas.flatMap((area) => area.patterns);
  return Object.freeze({
    id,
    statusKey,
    areas: Object.freeze([...areas]),
    patterns: Object.freeze([...patterns]),
    kinds: Object.freeze([...kinds]),
    inputDigestKey,
  });
}

function artifactArea(root, patterns, exclusive) {
  if (!isCanonicalRelativePath(root)) throw new Error(`generated artifact area root must be canonical: '${root}'`);
  if (!Array.isArray(patterns) || patterns.length === 0 || patterns.some((pattern) => typeof pattern !== "string" || pattern.length === 0)) {
    throw new Error(`generated artifact area '${root}' requires non-empty patterns`);
  }
  if (typeof exclusive !== "boolean") throw new Error(`generated artifact area '${root}' requires an exact exclusivity flag`);
  return Object.freeze({ root, patterns: Object.freeze([...patterns]), exclusive });
}

function validateProviderRegistry(providers) {
  const ids = new Set();
  const statusKeys = new Set();
  const kinds = new Set();
  for (const provider of providers) {
    if (ids.has(provider.id)) throw new Error(`duplicate generated artifact provider '${provider.id}'`);
    if (statusKeys.has(provider.statusKey)) throw new Error(`duplicate generated artifact status key '${provider.statusKey}'`);
    ids.add(provider.id);
    statusKeys.add(provider.statusKey);
    for (const kind of provider.kinds) {
      if (kinds.has(kind)) throw new Error(`duplicate generated artifact kind '${kind}'`);
      kinds.add(kind);
    }
    for (const area of provider.areas) {
      for (const pattern of area.patterns) {
        if (pattern !== area.root && !pattern.startsWith(`${area.root}/`)) {
          throw new Error(`generated artifact pattern '${pattern}' escapes area '${area.root}'`);
        }
      }
    }
  }
}

function walkExactEntries(root) {
  const entries = [];
  const directories = [root];
  while (directories.length > 0) {
    const current = directories.pop();
    const children = readdirSync(current).sort(compareText);
    for (const name of children) {
      const full = path.join(current, name);
      const stat = lstatSync(full);
      if (stat.isSymbolicLink()) entries.push({ path: full, kind: "symbolic link" });
      else if (stat.isDirectory()) {
        requireContainedRealPath(root, full, `inventory directory '${full}'`);
        entries.push({ path: full, kind: "directory" });
        directories.push(full);
      } else if (stat.isFile()) entries.push({ path: full, kind: "file" });
      else entries.push({ path: full, kind: "special filesystem entry" });
    }
  }
  return entries.sort((left, right) => compareText(left.path, right.path));
}

function requireExactDirectoryRoot(root, label) {
  if (typeof root !== "string" || !path.isAbsolute(root)) throw new Error(`${label} must be absolute`);
  if (!existsSync(root)) throw new Error(`${label} does not exist: ${root}`);
  const stat = lstatSync(root);
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`${label} must be one real directory: ${root}`);
  const resolved = path.resolve(root);
  const canonical = realpathSync(root);
  if (canonical !== resolved) throw new Error(`${label} must not traverse symbolic-link ancestors: ${root}`);
}

function requireContainedRealPath(root, candidate, label) {
  const canonicalRoot = realpathSync(root);
  const canonicalCandidate = realpathSync(candidate);
  const relative = path.relative(canonicalRoot, canonicalCandidate);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes its inventory root`);
  }
}

function relativeToRoot(root, candidate) {
  const relative = path.relative(root, candidate).split(path.sep).join("/");
  if (!isCanonicalRelativePath(relative)) throw new Error(`generated artifact discovery escaped the TypeScript root: ${relative}`);
  return relative;
}

function inspectInputDigests(value, key) {
  if (!Array.isArray(value) || value.length === 0) return `@tsgo-generated ${key} must be a non-empty array`;
  const paths = new Set();
  for (let index = 0; index < value.length; index++) {
    const entry = value[index];
    if (!isPlainObject(entry) || !sameStringArray(Object.keys(entry).sort(compareText), ["contentHash", "path"])) {
      return `@tsgo-generated ${key}[${index}] must contain exactly path and contentHash`;
    }
    if (!isCanonicalRelativePath(entry.path)) return `@tsgo-generated ${key}[${index}].path must be a canonical non-empty POSIX relative path`;
    if (typeof entry.contentHash !== "string" || !sha256Pattern.test(entry.contentHash)) {
      return `@tsgo-generated ${key}[${index}].contentHash must be a lowercase SHA-256 digest`;
    }
    if (paths.has(entry.path)) return `@tsgo-generated ${key} contains duplicate path '${entry.path}'`;
    paths.add(entry.path);
  }
  return undefined;
}

function isCanonicalRelativePath(value) {
  return typeof value === "string" && value.length > 0 && !value.includes("\\") && !path.posix.isAbsolute(value) &&
    value.split("/").every((segment) => segment.length > 0 && segment !== "." && segment !== "..") &&
    path.posix.normalize(value) === value;
}

function sameStringArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    [Object.prototype, null].includes(Object.getPrototypeOf(value));
}
