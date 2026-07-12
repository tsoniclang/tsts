import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { compareText } from "./core/deterministic-order.mjs";
import { matchGlob } from "./path-policy.mjs";

export const generatedArtifactProviders = Object.freeze([
  artifactProvider("porter:facades", "generatedArtifacts", ["go/**"], ["go-scalars", "go-compat", "go-facade"]),
  artifactProvider("porter:ast", "astGeneratedArtifacts", ["internal/ast/generated/**"], ["ast-generated"]),
  artifactProvider("porter:diagnostics", "diagnosticsGeneratedArtifacts", ["internal/diagnostics/generated/**"], ["diagnostics-generated"]),
  artifactProvider("porter:bundled", "bundledGeneratedArtifacts", ["internal/bundled/*_generated.ts", "internal/bundled/libs/**"], ["bundled-generated"]),
  artifactProvider("porter:unicode", "unicodeGeneratedArtifacts", ["internal/stringutil/generated/**"], ["unicode-generated"]),
]);

export function inspectGeneratedArtifactRegistration(relativePath, text) {
  const providers = generatedArtifactProviders.filter((provider) => provider.patterns.some((pattern) => matchGlob(pattern, relativePath)));
  const provider = providers.length === 1 ? providers[0] : undefined;
  const markers = [...text.matchAll(/^\/\/ @tsgo-generated[^\n\r]*$/gm)];
  if (markers.length === 0) return { metadata: undefined, provider: undefined, error: undefined };
  if (markers.length !== 1) {
    return { metadata: undefined, provider, error: `generated artifact must carry exactly one @tsgo-generated record, found ${markers.length}` };
  }
  if (!/^\/\/ Code generated[^\n\r]*\r?\n\/\/ @tsgo-generated\s+{[^\n\r]+}\r?(?:\n|$)/.test(text)) {
    return { metadata: undefined, provider, error: "@tsgo-generated must be the second line immediately after the generated-file header" };
  }
  const payload = /^\/\/ @tsgo-generated\s+({[^\n\r]+})$/.exec(markers[0][0])?.[1];
  if (payload === undefined) return { metadata: undefined, provider, error: "@tsgo-generated must contain one JSON object on its line" };
  let metadata;
  try {
    metadata = JSON.parse(payload);
  } catch (error) {
    return { metadata: undefined, provider, error: `invalid @tsgo-generated JSON: ${error.message}` };
  }
  if (!isPlainObject(metadata)) return { metadata, provider, error: "@tsgo-generated metadata must be a plain object" };
  if (metadata.schemaVersion !== 1) return { metadata, provider, error: "unsupported @tsgo-generated schemaVersion" };
  for (const key of ["kind", "generator", "sourceRevision", "path", "contentHash"]) {
    if (typeof metadata[key] !== "string" || metadata[key].length === 0) {
      return { metadata, provider, error: `missing or invalid @tsgo-generated ${key}` };
    }
  }
  if (providers.length !== 1) {
    return {
      metadata,
      provider: undefined,
      error: providers.length === 0 ? "generated artifact path has no registered provider" : `generated artifact path matches ${providers.length} providers`,
    };
  }
  if (metadata.generator !== provider.id) return { metadata, provider, error: `metadata generator '${metadata.generator}' does not match provider '${provider.id}'` };
  if (!provider.kinds.includes(metadata.kind)) return { metadata, provider, error: `metadata kind '${metadata.kind}' is not registered for '${provider.id}'` };
  if (metadata.path !== relativePath) return { metadata, provider, error: `metadata path '${metadata.path}' does not match '${relativePath}'` };
  return { metadata, provider, error: undefined };
}

export function walkGeneratedArtifactFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  const directories = [root];
  while (directories.length > 0) {
    const current = directories.pop();
    const entries = readdirSync(current, { withFileTypes: true }).sort((left, right) => compareText(left.name, right.name));
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) directories.push(full);
      else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(full);
    }
  }
  return files.sort(compareText);
}

function artifactProvider(id, statusKey, patterns, kinds) {
  return Object.freeze({
    id,
    statusKey,
    patterns: Object.freeze([...patterns]),
    kinds: Object.freeze([...kinds]),
  });
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    [Object.prototype, null].includes(Object.getPrototypeOf(value));
}
