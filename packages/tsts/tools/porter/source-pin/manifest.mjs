import path from "node:path";
import { readStableRegularFile } from "../core/provenance-filesystem.mjs";
import { requireRelativePath, resolveInside } from "./paths.mjs";

const REVISION_PATTERN = /^[0-9a-f]{40}$/;

export function readSourcePinManifest(repoRoot, config) {
  const manifestPath = resolveInside(repoRoot, config.sourcePinManifest, "source pin manifest");
  return {
    manifestPath,
    manifest: JSON.parse(readStableRegularFile(manifestPath, "Porter source pin manifest").toString("utf8")),
  };
}

export function schemaPoliciesFromSourcePin(repoRoot, config) {
  const { manifest } = readSourcePinManifest(repoRoot, config);
  const schemaDirectory = requireRelativePath(manifest.schemaDirectory, "schemaDirectory");
  return [
    ...(manifest.schemaMetadata ?? []).map((entry) => ({
      path: path.posix.join(schemaDirectory, requireRelativePath(entry, "schemaMetadata[]")),
      kind: "local-metadata",
    })),
    ...(manifest.schemaFiles ?? []).map((entry) => ({
      path: path.posix.join(schemaDirectory, requireRelativePath(entry.path, "schemaFiles[].path")),
      kind: "upstream-copy",
      source: requireRelativePath(entry.source, "schemaFiles[].source"),
    })),
  ];
}

export function normalizeGeneratorInputs(manifest) {
  if (!Array.isArray(manifest.generatorInputs)) throw new Error("source pin manifest generatorInputs must be an array");
  const schemaPaths = new Set((manifest.schemaFiles ?? []).map((entry) => entry?.path));
  const sourcePaths = new Set((manifest.sourceFiles ?? []).map((entry) => entry?.path));
  const identities = new Set();
  return manifest.generatorInputs.map((entry, index) => {
    const label = `generatorInputs[${index}]`;
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) throw new Error(`${label} must be an object`);
    const expected = ["generator", "id", "inventory", "path"];
    const actual = Object.keys(entry).sort();
    if (actual.length !== expected.length || expected.some((key, keyIndex) => key !== actual[keyIndex])) {
      throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
    }
    for (const key of ["generator", "id"]) {
      if (typeof entry[key] !== "string" || entry[key] === "") throw new Error(`${label}.${key} must be a non-empty string`);
    }
    const inputPath = requireRelativePath(entry.path, `${label}.path`);
    if (entry.inventory !== "schemaFiles" && entry.inventory !== "sourceFiles") {
      throw new Error(`${label}.inventory must be 'schemaFiles' or 'sourceFiles'`);
    }
    const inventory = entry.inventory === "schemaFiles" ? schemaPaths : sourcePaths;
    if (!inventory.has(inputPath)) throw new Error(`${label} references '${inputPath}' outside manifest.${entry.inventory}`);
    const identity = `${entry.generator}:${entry.id}`;
    if (identities.has(identity)) throw new Error(`source pin manifest duplicates generator input identity '${identity}'`);
    identities.add(identity);
    return Object.freeze({ ...entry, path: inputPath });
  });
}

export function validateRevision(value, label, status) {
  if (typeof value !== "string" || !REVISION_PATTERN.test(value)) {
    status.issues.push({ path: status.manifestPath, reason: `${label} must be a lowercase 40-character Git revision` });
  }
}

export function validateExactKeys(value, expectedKeys, label, status) {
  const expected = [...expectedKeys].sort();
  const actual = Object.keys(value).sort();
  if (expected.length !== actual.length || expected.some((key, index) => key !== actual[index])) {
    status.issues.push({
      path: status.manifestPath,
      reason: `${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`,
    });
  }
}
