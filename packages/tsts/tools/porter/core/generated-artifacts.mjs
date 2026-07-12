import { authoredFacadePathSet, renderExpectedGeneratedArtifacts, stripGeneratedArtifactHeader } from "./facade-artifacts.mjs";
import { hashText, resolveRepo } from "./runtime.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import { inventoryGeneratedArtifactsForProvider } from "../generated-artifact-registry.mjs";
import { readFileSync } from "node:fs";
import { requireFinalizedExternalFacadeStorageCatalog } from "./external-facades.mjs";
import { tsFilePolicyFor } from "./policies.mjs";

export function buildGeneratedArtifactStatus(config, snapshot, catalog) {
  requireFinalizedExternalFacadeStorageCatalog(catalog, config, snapshot);
  const authored = authoredFacadePathSet(config);
  const expected = renderExpectedGeneratedArtifacts(config, snapshot, catalog);
  const expectedPaths = new Set(expected.keys());
  const tsRoot = config.tsRoot.replace(/\/$/, "");
  const inventory = inventoryGeneratedArtifactsForProvider(resolveRepo(tsRoot), "porter:facades");
  const actualFiles = inventory.files.map((relativePath) => `${tsRoot}/${relativePath}`);
  const actualPaths = new Set(actualFiles);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = inventory.invalid.map((entry) => ({ ...entry, path: `${tsRoot}/${entry.path}` }));

  for (const relativePath of [...expectedPaths].sort()) {
    if (!actualPaths.has(relativePath)) {
      missing.push({
        path: relativePath,
        reason: "Expected generated Go compatibility/facade artifact is missing.",
      });
    }
  }

  for (const relativePath of actualFiles) {
    const absolutePath = resolveRepo(relativePath);
    const text = readFileSync(absolutePath, "utf8");
    const artifactPath = relativePath.slice(`${tsRoot}/`.length);
    const registration = inspectGeneratedArtifactRegistration(artifactPath, text);
    // Authored facade modules are hand-written compatibility layers classified by
    // explicit `authoredFacadeModules` policy. They are exempt from generated-artifact
    // checks, but must NOT carry @tsgo-generated metadata (one module is either
    // generated or authored, never both).
    if (authored.has(relativePath)) {
      if (registration.metadata !== undefined || registration.error !== undefined) {
        invalid.push({
          path: relativePath,
          reason: "Authored facade module must not carry @tsgo-generated metadata; it is classified as authored by porter.config.json authoredFacadeModules.",
        });
      }
      continue;
    }
    if (tsFilePolicyFor(config, relativePath).category === "test-parity") {
      if (registration.metadata !== undefined || registration.error !== undefined) {
        invalid.push({
          path: relativePath,
          reason: "Test-parity facade module must not carry @tsgo-generated metadata; test declarations remain independently audited.",
        });
      }
      continue;
    }
    const metadataResult = registration;
    if (metadataResult.error) {
      invalid.push({ path: relativePath, reason: metadataResult.error });
      continue;
    }
    if (!metadataResult.metadata) {
      untracked.push({
        path: relativePath,
        reason: "Generated artifact area files must carry @tsgo-generated metadata.",
      });
      continue;
    }
    if (!expectedPaths.has(relativePath)) {
      orphan.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        reason: "Generated artifact metadata exists, but this artifact is no longer generated from the current TS-Go snapshot.",
      });
      continue;
    }
    const expectedText = expected.get(relativePath);
    if (text !== expectedText) {
      stale.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        expectedHash: hashText(stripGeneratedArtifactHeader(expectedText)),
        actualHash: hashText(stripGeneratedArtifactHeader(text)),
        reason: "Generated artifact contents differ from the current deterministic porter output.",
      });
    }
  }

  return { missing, stale, orphan, untracked, invalid };
}

export function emptyGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}
