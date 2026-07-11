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
