import { readFileSync } from "node:fs";
import path from "node:path";
import {
  hashText,
  repoRoot,
  resolveRepo,
  walk,
} from "./common.mjs";
import {
  parseGeneratedArtifactMetadata,
  stripGeneratedArtifactHeader,
} from "./generated-metadata.mjs";
import { authoredFacadePathSet } from "./external-facade-model.mjs";
import { renderExpectedGeneratedArtifacts } from "./external-facade-render.mjs";

export function buildGeneratedArtifactStatus(config, snapshot) {
  const authored = authoredFacadePathSet(config);
  const expected = renderExpectedGeneratedArtifacts(config, snapshot);
  const expectedPaths = new Set(expected.keys());
  const actualRoot = resolveRepo(`${config.tsRoot.replace(/\/$/, "")}/go`);
  const actualFiles = walk(actualRoot)
    // Test files (*.test.ts) co-located with facades are authored test infra, not
    // facade artifacts; they are covered by the go-compat-layer tsFilePolicy.
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .map((file) => path.relative(repoRoot, file).split(path.sep).join("/"));
  const actualPaths = new Set(actualFiles);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = [];

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
    // Authored facade modules are hand-written compatibility layers classified by
    // explicit `authoredFacadeModules` policy. They are exempt from generated-artifact
    // checks, but must NOT carry @tsgo-generated metadata (one module is either
    // generated or authored, never both).
    if (authored.has(relativePath)) {
      if (parseGeneratedArtifactMetadata(text).metadata) {
        invalid.push({
          path: relativePath,
          reason: "Authored facade module must not carry @tsgo-generated metadata; it is classified as authored by porter.config.json authoredFacadeModules.",
        });
      }
      continue;
    }
    const metadataResult = parseGeneratedArtifactMetadata(text);
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
