import { createHash } from "node:crypto";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { readStableRegularFile } from "../core/provenance-filesystem.mjs";
import { validateExactKeys } from "./manifest.mjs";
import { relativePath, requireRelativePath, resolveInside } from "./paths.mjs";

const SHA256_PATTERN = /^[0-9a-f]{64}$/;

export function validateSchemaFiles(repoRoot, sourceRoot, manifest, status) {
  let schemaDirectory;
  try {
    schemaDirectory = resolveInside(repoRoot, manifest.schemaDirectory, "schemaDirectory");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  const expectedPaths = new Set();
  if (!Array.isArray(manifest.schemaMetadata)) {
    status.issues.push({ path: status.manifestPath, reason: "schemaMetadata must be an array" });
  }
  for (const [index, entry] of (manifest.schemaMetadata ?? []).entries()) {
    const metadataPath = safeRelativePath(entry, `schemaMetadata[${index}]`, status);
    if (!metadataPath) continue;
    if (expectedPaths.has(metadataPath)) status.issues.push({ path: status.manifestPath, reason: `duplicate schema metadata path '${metadataPath}'` });
    expectedPaths.add(metadataPath);
  }
  const seenSchemaPaths = new Set();
  const seenSourcePaths = new Set();
  const entries = Array.isArray(manifest.schemaFiles) ? manifest.schemaFiles : [];
  if (!Array.isArray(manifest.schemaFiles)) {
    status.issues.push({ path: status.manifestPath, reason: "schemaFiles must be an array" });
  }

  for (const [index, entry] of entries.entries()) {
    const label = `schemaFiles[${index}]`;
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      status.issues.push({ path: status.manifestPath, reason: `${label} must be an object` });
      continue;
    }
    validateExactKeys(entry, ["path", "sha256", "source"], label, status);
    const schemaPath = safeRelativePath(entry.path, `${label}.path`, status);
    const sourcePath = safeRelativePath(entry.source, `${label}.source`, status);
    if (!schemaPath || !sourcePath) continue;
    if (seenSchemaPaths.has(schemaPath)) status.issues.push({ path: status.manifestPath, reason: `duplicate schema path '${schemaPath}'` });
    if (seenSourcePaths.has(sourcePath)) status.issues.push({ path: status.manifestPath, reason: `duplicate schema source '${sourcePath}'` });
    seenSchemaPaths.add(schemaPath);
    seenSourcePaths.add(sourcePath);
    expectedPaths.add(schemaPath);
    if (typeof entry.sha256 !== "string" || !SHA256_PATTERN.test(entry.sha256)) {
      status.issues.push({ path: status.manifestPath, reason: `${label}.sha256 must be a lowercase SHA-256 digest` });
      continue;
    }
    const localFile = resolveInside(schemaDirectory, schemaPath, `${label}.path`);
    const sourceFile = resolveInside(sourceRoot, sourcePath, `${label}.source`);
    if (!existsSync(localFile) || !statSync(localFile).isFile()) {
      status.issues.push({ path: relativePath(repoRoot, localFile), reason: "pinned schema file is missing" });
      continue;
    }
    if (!existsSync(sourceFile) || !statSync(sourceFile).isFile()) {
      status.issues.push({ path: relativePath(repoRoot, sourceFile), reason: "pinned upstream schema source is missing" });
      continue;
    }
    const localBytes = readStableRegularFile(localFile, `${label} schema copy`);
    const sourceBytes = readStableRegularFile(sourceFile, `${label} upstream source`);
    const localHash = sha256(localBytes);
    const sourceHash = sha256(sourceBytes);
    if (!localBytes.equals(sourceBytes)) {
      status.issues.push({ path: relativePath(repoRoot, localFile), reason: "schema copy is not byte-identical to the pinned source file" });
    }
    if (localHash !== entry.sha256) {
      status.issues.push({ path: relativePath(repoRoot, localFile), reason: `schema copy hash ${localHash} does not match manifest ${entry.sha256}` });
    }
    if (sourceHash !== entry.sha256) {
      status.issues.push({ path: relativePath(repoRoot, sourceFile), reason: `upstream source hash ${sourceHash} does not match manifest ${entry.sha256}` });
    }
  }

  const actualPaths = existsSync(schemaDirectory)
    ? walkFiles(schemaDirectory).map((file) => path.relative(schemaDirectory, file).split(path.sep).join("/"))
    : [];
  for (const actualPath of actualPaths) {
    if (!expectedPaths.has(actualPath)) {
      status.issues.push({ path: path.posix.join(manifest.schemaDirectory, actualPath), reason: "schema directory file is not classified by the source pin manifest" });
    }
  }
  for (const expectedPath of expectedPaths) {
    if (!actualPaths.includes(expectedPath)) {
      status.issues.push({ path: path.posix.join(manifest.schemaDirectory, expectedPath), reason: "source pin manifest classifies a missing schema directory file" });
    }
  }
  status.schemaFileCount = entries.length;
}

export function validateVersionDocument(repoRoot, manifest, status) {
  let file;
  try {
    file = resolveInside(repoRoot, manifest.documentation, "documentation");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  if (!existsSync(file)) return;
  const fields = markdownTable(readStableRegularFile(file, "Porter source pin documentation").toString("utf8"));
  const expected = new Map([
    ["Upstream", manifest.upstream],
    ["Commit", manifest.revision],
    ["Git object format", manifest.gitObjectFormat],
  ]);
  const typeScript = (manifest.nestedSources ?? []).find((entry) => entry?.name === "TypeScript");
  if (typeScript) expected.set("Nested TypeScript commit", typeScript.revision);
  if (manifest.extractor?.toolchainExecutableSha256) expected.set("Go toolchain executable SHA-256", manifest.extractor.toolchainExecutableSha256);
  if (manifest.extractor?.goroot?.contract) expected.set("Go GOROOT hash contract", manifest.extractor.goroot.contract);
  if (manifest.extractor?.goroot?.sha256) expected.set("Go GOROOT tree SHA-256", manifest.extractor.goroot.sha256);
  for (const entry of manifest.schemaFiles ?? []) expected.set(`\`${entry.path}\` SHA-256`, entry.sha256);
  for (const entry of manifest.sourceFiles ?? []) expected.set(`Source \`${entry.path}\` SHA-256`, entry.sha256);
  for (const [label, value] of expected) {
    if (fields.get(label) !== value) {
      status.issues.push({ path: relativePath(repoRoot, file), reason: `documentation field '${label}' is '${fields.get(label) ?? "<missing>"}', expected '${value}'` });
    }
  }
}

export function validatePinnedSourceFiles(repoRoot, sourceRoot, manifest, status) {
  const seen = new Set();
  if (manifest.sourceFiles !== undefined && !Array.isArray(manifest.sourceFiles)) {
    status.issues.push({ path: status.manifestPath, reason: "sourceFiles must be an array" });
    return;
  }
  for (const [index, entry] of (manifest.sourceFiles ?? []).entries()) {
    const label = `sourceFiles[${index}]`;
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      status.issues.push({ path: status.manifestPath, reason: `${label} must be an object` });
      continue;
    }
    validateExactKeys(entry, ["path", "purpose", "sha256"], label, status);
    const sourcePath = safeRelativePath(entry.path, `${label}.path`, status);
    if (!sourcePath) continue;
    if (seen.has(sourcePath)) status.issues.push({ path: status.manifestPath, reason: `duplicate pinned source path '${sourcePath}'` });
    seen.add(sourcePath);
    if (typeof entry.sha256 !== "string" || !SHA256_PATTERN.test(entry.sha256)) {
      status.issues.push({ path: status.manifestPath, reason: `${label}.sha256 must be a lowercase SHA-256 digest` });
      continue;
    }
    if (typeof entry.purpose !== "string" || entry.purpose.trim() === "") {
      status.issues.push({ path: status.manifestPath, reason: `${label}.purpose must explain the consumer contract` });
    }
    const sourceFile = resolveInside(sourceRoot, sourcePath, `${label}.path`);
    if (!existsSync(sourceFile) || !statSync(sourceFile).isFile()) {
      status.issues.push({ path: relativePath(repoRoot, sourceFile), reason: "pinned source-only input is missing" });
      continue;
    }
    const actualHash = sha256(readStableRegularFile(sourceFile, `${label} source-only input`));
    if (actualHash !== entry.sha256) {
      status.issues.push({ path: relativePath(repoRoot, sourceFile), reason: `pinned source-only hash ${actualHash} does not match manifest ${entry.sha256}` });
    }
  }
}

function safeRelativePath(value, label, status) {
  try {
    return requireRelativePath(value, label);
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return "";
  }
}

function walkFiles(root) {
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) files.push(full);
    }
  }
  return files.sort();
}

function markdownTable(text) {
  const fields = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = /^\|\s*([^|]+?)\s*\|\s*`([^`]*)`\s*\|\s*$/.exec(line);
    if (match) fields.set(match[1].trim(), match[2]);
  }
  return fields;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
