import path from "node:path";
import {
  validatePinnedSourceFiles,
  validateSchemaFiles,
  validateVersionDocument,
} from "./source-pin/content-validation.mjs";
import { resolvePinnedGoToolchain, validateExtractor } from "./source-pin/extractor-validation.mjs";
import {
  buildSnapshotSourceIntegrityStatus,
  gitlinkEntries,
  gitTreeEntries,
  inspectGitCheckout,
  validateGitlink,
} from "./source-pin/git.mjs";
import {
  readSourcePinManifest,
  schemaPoliciesFromSourcePin,
  validateExactKeys,
  validateRevision,
} from "./source-pin/manifest.mjs";
import { relativePath, requireRelativePath, resolveInside } from "./source-pin/paths.mjs";

export {
  buildSnapshotSourceIntegrityStatus,
  gitTreeEntries,
  inspectGitCheckout,
  readSourcePinManifest,
  resolvePinnedGoToolchain,
  schemaPoliciesFromSourcePin,
};

export function emptySourcePinStatus() {
  return {
    issues: [],
    manifestPath: "",
    source: { root: "", revision: "", dirty: false, nestedSources: [] },
    extractor: {
      expectedGoVersion: "", actualGoVersion: "", executable: "", executableHash: "",
      goroot: "", gorootHash: "", goos: "", goarch: "",
    },
    schemaFileCount: 0,
  };
}

export function buildSourcePinStatus(repoRoot, config, snapshot = undefined) {
  const status = emptySourcePinStatus();
  status.manifestPath = config.sourcePinManifest ?? "";
  let loaded;
  try {
    loaded = readSourcePinManifest(repoRoot, config);
  } catch (error) {
    status.issues.push({ path: status.manifestPath || "<source-pin>", reason: error.message });
    return status;
  }

  const { manifest, manifestPath } = loaded;
  status.manifestPath = relativePath(repoRoot, manifestPath);
  if (manifest === null || typeof manifest !== "object" || Array.isArray(manifest)) {
    status.issues.push({ path: status.manifestPath, reason: "source pin manifest must be an object" });
    return status;
  }
  validateExactKeys(manifest, [
    "documentation", "extractor", "gitObjectFormat", "goModulePath", "nestedSources", "revision",
    "schemaDirectory", "schemaFiles", "schemaMetadata", "schemaVersion", "sourceFiles", "sourceRoot", "upstream",
  ], "source pin manifest", status);
  if (manifest.schemaVersion !== 2) {
    status.issues.push({ path: status.manifestPath, reason: "source pin manifest schemaVersion must be 2" });
  }
  if (manifest.sourceRoot !== config.sourceRoot) {
    status.issues.push({ path: status.manifestPath, reason: `manifest sourceRoot '${manifest.sourceRoot}' does not match porter config '${config.sourceRoot}'` });
  }
  if (manifest.goModulePath !== config.goModulePath) {
    status.issues.push({ path: status.manifestPath, reason: `manifest goModulePath '${manifest.goModulePath}' does not match porter config '${config.goModulePath}'` });
  }
  if (manifest.schemaDirectory !== config.astSchemaDir) {
    status.issues.push({ path: status.manifestPath, reason: `manifest schemaDirectory '${manifest.schemaDirectory}' does not match porter config '${config.astSchemaDir}'` });
  }
  validateRevision(manifest.revision, "revision", status);
  if (manifest.gitObjectFormat !== "sha1") {
    status.issues.push({ path: status.manifestPath, reason: "gitObjectFormat must be 'sha1' for source-pin schema 2" });
  }

  let sourceRoot;
  try {
    sourceRoot = resolveInside(repoRoot, manifest.sourceRoot, "sourceRoot");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return status;
  }
  const sourceCheckout = inspectGitCheckout(sourceRoot);
  status.source = {
    root: relativePath(repoRoot, sourceRoot),
    revision: sourceCheckout.revision,
    objectFormat: sourceCheckout.objectFormat,
    dirty: sourceCheckout.dirty,
    nestedSources: [],
  };
  for (const issue of sourceCheckout.issues) status.issues.push({ path: status.source.root, reason: issue });
  if (sourceCheckout.revision && sourceCheckout.revision !== manifest.revision) {
    status.issues.push({ path: status.source.root, reason: `checked-out revision ${sourceCheckout.revision} does not match pinned revision ${manifest.revision}` });
  }
  if (sourceCheckout.objectFormat && sourceCheckout.objectFormat !== manifest.gitObjectFormat) {
    status.issues.push({ path: status.source.root, reason: `Git object format ${sourceCheckout.objectFormat} does not match pinned ${manifest.gitObjectFormat}` });
  }
  validateGitlink(repoRoot, manifest.sourceRoot, manifest.revision, "TS-Go source", status);
  if (snapshot?.gitRevision !== undefined && snapshot.gitRevision !== manifest.revision) {
    status.issues.push({ path: status.source.root, reason: `extractor snapshot revision ${snapshot.gitRevision} does not match pinned revision ${manifest.revision}` });
  }

  const nestedPaths = new Set();
  for (const [index, nested] of (manifest.nestedSources ?? []).entries()) {
    const label = `nestedSources[${index}]`;
    if (nested === null || typeof nested !== "object" || Array.isArray(nested)) {
      status.issues.push({ path: status.manifestPath, reason: `${label} must be an object` });
      continue;
    }
    validateExactKeys(nested, ["gitObjectFormat", "goPolicy", "name", "path", "revision"], label, status);
    let nestedPath;
    try {
      nestedPath = requireRelativePath(nested.path, `${label}.path`);
    } catch (error) {
      status.issues.push({ path: status.manifestPath, reason: error.message });
      continue;
    }
    if (nestedPaths.has(nestedPath)) {
      status.issues.push({ path: status.manifestPath, reason: `duplicate nested source path '${nestedPath}'` });
      continue;
    }
    nestedPaths.add(nestedPath);
    validateRevision(nested.revision, `${label}.revision`, status);
    if (nested.gitObjectFormat !== "sha1") {
      status.issues.push({ path: status.manifestPath, reason: `${label}.gitObjectFormat must be 'sha1' for source-pin schema 2` });
    }
    if (nested.goPolicy !== "no-go") {
      status.issues.push({ path: status.manifestPath, reason: `${label}.goPolicy must explicitly be 'no-go'; scanned nested Go sources require a future source-pin schema` });
    }
    const nestedRoot = resolveInside(sourceRoot, nestedPath, `${label}.path`);
    const checkout = inspectGitCheckout(nestedRoot);
    const record = {
      name: typeof nested.name === "string" ? nested.name : "",
      path: nestedPath,
      revision: checkout.revision,
      objectFormat: checkout.objectFormat,
      dirty: checkout.dirty,
    };
    status.source.nestedSources.push(record);
    for (const issue of checkout.issues) status.issues.push({ path: relativePath(repoRoot, nestedRoot), reason: issue });
    if (checkout.revision && checkout.revision !== nested.revision) {
      status.issues.push({ path: relativePath(repoRoot, nestedRoot), reason: `checked-out revision ${checkout.revision} does not match pinned revision ${nested.revision}` });
    }
    if (checkout.objectFormat && checkout.objectFormat !== nested.gitObjectFormat) {
      status.issues.push({ path: relativePath(repoRoot, nestedRoot), reason: `Git object format ${checkout.objectFormat} does not match pinned ${nested.gitObjectFormat}` });
    }
    if (nested.goPolicy === "no-go") {
      const nestedGoFiles = gitTreeEntries(nestedRoot, nested.revision).filter((entry) => entry.type === "blob" && entry.path.endsWith(".go"));
      if (nestedGoFiles.length > 0) {
        status.issues.push({ path: relativePath(repoRoot, nestedRoot), reason: `nested source is declared no-go but contains ${nestedGoFiles.length} tracked Go file(s), beginning with ${nestedGoFiles[0].path}` });
      }
    }
    validateGitlink(sourceRoot, nestedPath, nested.revision, `${record.name || label} nested source`, status);
  }
  for (const entry of gitlinkEntries(sourceRoot)) {
    if (!nestedPaths.has(entry.path)) {
      status.issues.push({ path: relativePath(repoRoot, path.join(sourceRoot, entry.path)), reason: `nested Git link ${entry.hash} is not declared by source-pin.json` });
    }
  }

  validateSchemaFiles(repoRoot, sourceRoot, manifest, status);
  validatePinnedSourceFiles(repoRoot, sourceRoot, manifest, status);
  validateVersionDocument(repoRoot, manifest, status);
  validateExtractor(repoRoot, manifest, snapshot, status);
  if (snapshot !== undefined) {
    for (const issue of buildSnapshotSourceIntegrityStatus(sourceRoot, snapshot).issues) {
      status.issues.push({ path: relativePath(repoRoot, path.join(sourceRoot, issue.path)), reason: issue.reason });
    }
  }
  return status;
}

export function collectSourcePinFailures(status) {
  return status.issues.length === 0 ? [] : [`${status.issues.length} source pin/provenance issues`];
}
