import { buildAuthoredFacadeExportIndex } from "./authored-facade-exports.mjs";
import { compareText } from "./deterministic-order.mjs";
import { buildExternalFacadeMap, collectExternalTypeUsages } from "./external-facades.mjs";
import { authoredFacadePathSet, renderExpectedGeneratedArtifacts, stripGeneratedArtifactHeader } from "./facade-artifacts.mjs";
import { hashText, repoRoot, resolveRepo, walk } from "./runtime.mjs";
import { readFileSync } from "node:fs";
import path from "node:path";

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
  const unresolved = [];

  const facades = buildExternalFacadeMap(config, snapshot);
  const authoredObligations = [];
  for (const usage of collectExternalTypeUsages(config, snapshot)) {
    const facade = facades.get(usage.goName);
    if (facade === undefined) continue;
    const relativePath = `${config.tsRoot.replace(/\/$/, "")}/${facade.tsModule}`;
    if (authored.has(relativePath)) authoredObligations.push({ facade, namespace: "type", relativePath, usage });
  }
  const authoredExports = buildAuthoredFacadeExportIndex(authoredObligations.map((obligation) => obligation.relativePath));
  const seenAuthoredObligations = new Set();
  for (const obligation of authoredObligations) {
    const key = `${obligation.relativePath}\0${obligation.facade.tsName}\0${obligation.namespace}`;
    if (seenAuthoredObligations.has(key)) continue;
    seenAuthoredObligations.add(key);
    const moduleExports = authoredExports.get(obligation.relativePath);
    const exported = moduleExports?.symbols.get(obligation.facade.tsName);
    if (moduleExports?.error === undefined && exported?.[obligation.namespace] === true) continue;
    unresolved.push({
      path: obligation.relativePath,
      symbol: obligation.usage.goName,
      reason: moduleExports?.error
        ?? `Authored facade must publicly export exact ${obligation.namespace} symbol '${obligation.facade.tsName}' for active Go dependency '${obligation.usage.goName}'.`,
    });
  }

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

  unresolved.sort((left, right) => compareText(left.path, right.path) || compareText(left.symbol, right.symbol));
  return { missing, stale, orphan, untracked, invalid, unresolved };
}

export function emptyGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [], unresolved: [] };
}

export function parseGeneratedArtifactMetadata(text) {
  const match = /^\/\/ @tsgo-generated\s+({[^\n\r]+})/m.exec(text);
  if (!match) return { metadata: undefined, error: undefined };
  try {
    const metadata = JSON.parse(match[1]);
    if (metadata.schemaVersion !== 1) return { metadata, error: "Unsupported @tsgo-generated schemaVersion." };
    if (!metadata.kind) return { metadata, error: "Missing @tsgo-generated kind." };
    if (!metadata.generator) return { metadata, error: "Missing @tsgo-generated generator." };
    if (!metadata.path) return { metadata, error: "Missing @tsgo-generated path." };
    if (!metadata.sourceRevision) return { metadata, error: "Missing @tsgo-generated sourceRevision." };
    if (!metadata.contentHash) return { metadata, error: "Missing @tsgo-generated contentHash." };
    return { metadata, error: undefined };
  } catch (error) {
    return { metadata: undefined, error: `Invalid @tsgo-generated JSON: ${error.message}` };
  }
}
