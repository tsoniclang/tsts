import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, realpathSync, statSync } from "node:fs";
import path from "node:path";
import { canonicalGitEnvironment, readStableRegularFile } from "../test-provenance.mjs";
import { resolveAndVerifyPinnedGoToolchain, validatePinnedGoToolchainContract } from "./go-toolchain-pin.mjs";

const REVISION_PATTERN = /^[0-9a-f]{40}$/;
const SHA256_PATTERN = /^[0-9a-f]{64}$/;

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
  const documentation = requireRelativePath(manifest.documentation, "documentation");
  return [
    { path: path.posix.join(schemaDirectory, documentation), kind: "local-metadata" },
    { path: config.sourcePinManifest, kind: "local-metadata" },
    ...(manifest.schemaFiles ?? []).map((entry) => ({
      path: path.posix.join(schemaDirectory, requireRelativePath(entry.path, "schemaFiles[].path")),
      kind: "upstream-copy",
      source: requireRelativePath(entry.source, "schemaFiles[].source"),
    })),
  ];
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
    "schemaDirectory", "schemaFiles", "schemaVersion", "sourceFiles", "sourceRoot", "upstream",
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

export function inspectGitCheckout(root) {
  const issues = [];
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    return { revision: "", objectFormat: "", dirty: false, issues: ["checkout directory is missing"] };
  }
  const revisionResult = runGit(root, ["rev-parse", "--verify", "HEAD^{commit}"]);
  if (revisionResult.status !== 0) {
    issues.push(`cannot resolve Git revision: ${revisionResult.stderr || revisionResult.stdout}`.trim());
  }
  const objectFormatResult = runGit(root, ["rev-parse", "--show-object-format"]);
  if (objectFormatResult.status !== 0) {
    issues.push(`cannot resolve Git object format: ${objectFormatResult.stderr || objectFormatResult.stdout}`.trim());
  }
  const statusResult = runGit(root, ["status", "--porcelain=v1", "--untracked-files=all", "--ignore-submodules=none"]);
  if (statusResult.status !== 0) {
    issues.push(`cannot inspect Git worktree: ${statusResult.stderr || statusResult.stdout}`.trim());
  }
  const dirty = statusResult.status === 0 && statusResult.stdout.trim() !== "";
  const finalRevisionResult = runGit(root, ["rev-parse", "--verify", "HEAD^{commit}"]);
  if (revisionResult.status === 0 && finalRevisionResult.status === 0 && revisionResult.stdout.trim() !== finalRevisionResult.stdout.trim()) {
    issues.push("checkout revision changed while provenance was collected");
  }
  if (dirty) {
    const first = statusResult.stdout.trim().split(/\r?\n/, 1)[0];
    issues.push(`source checkout is dirty (${first})`);
  }
  return {
    revision: revisionResult.status === 0 ? revisionResult.stdout.trim() : "",
    objectFormat: objectFormatResult.status === 0 ? objectFormatResult.stdout.trim() : "",
    dirty,
    issues,
  };
}

export function buildSnapshotSourceIntegrityStatus(sourceRoot, snapshot) {
  const issues = [];
  const tracked = new Map(
    gitTreeEntries(sourceRoot, snapshot.gitRevision)
      .filter((entry) => entry.type === "blob" && entry.path.endsWith(".go"))
      .map((entry) => [entry.path, entry]),
  );
  const scanned = new Map((snapshot.files ?? []).map((file) => [file.path, file]));
  for (const [sourcePath, entry] of tracked) {
    const file = scanned.get(sourcePath);
    if (file === undefined) {
      issues.push({ path: sourcePath, reason: "tracked Go source file is missing from the extractor snapshot" });
    } else if (file.gitBlobHash !== entry.hash) {
      issues.push({ path: sourcePath, reason: `snapshot blob ${file.gitBlobHash ?? "<missing>"} does not match pinned Git blob ${entry.hash}` });
    }
  }
  for (const sourcePath of scanned.keys()) {
    if (!tracked.has(sourcePath)) {
      issues.push({ path: sourcePath, reason: "extractor snapshot contains a Go file not tracked by the pinned Git tree" });
    }
  }
  return { issues, trackedGoFileCount: tracked.size, scannedGoFileCount: scanned.size };
}

function validateSchemaFiles(repoRoot, sourceRoot, manifest, status) {
  let schemaDirectory;
  try {
    schemaDirectory = resolveInside(repoRoot, manifest.schemaDirectory, "schemaDirectory");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  const documentation = safeRelativePath(manifest.documentation, "documentation", status);
  const expectedPaths = new Set([documentation, path.posix.basename(status.manifestPath)]);
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

function validateVersionDocument(repoRoot, manifest, status) {
  let file;
  try {
    file = resolveInside(resolveInside(repoRoot, manifest.schemaDirectory, "schemaDirectory"), manifest.documentation, "documentation");
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

function validatePinnedSourceFiles(repoRoot, sourceRoot, manifest, status) {
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

function validateExtractor(repoRoot, manifest, snapshot, status) {
  const extractor = manifest.extractor;
  if (extractor === null || typeof extractor !== "object" || Array.isArray(extractor)) {
    status.issues.push({ path: status.manifestPath, reason: "extractor must be an object" });
    return;
  }
  try {
    validatePinnedGoToolchainContract(extractor);
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  let moduleRoot;
  try {
    moduleRoot = resolveInside(repoRoot, extractor.module, "extractor.module");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  const goMod = path.join(moduleRoot, "go.mod");
  if (!existsSync(goMod)) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: "extractor go.mod is missing" });
    return;
  }
  const goModText = readStableRegularFile(goMod, "Porter extractor go.mod").toString("utf8");
  if (!new RegExp(`^toolchain\\s+${escapeRegExp(extractor.goVersion)}$`, "m").test(goModText)) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `go.mod must pin toolchain ${extractor.goVersion}` });
  }
  status.extractor = {
    expectedGoVersion: extractor.goVersion,
    actualGoVersion: snapshot?.environment?.goVersion ?? "",
    executable: snapshot?.semantic?.toolchainExecutable ?? "",
    executableHash: snapshot?.semantic?.toolchainHash ?? "",
    goroot: snapshot?.semantic?.goroot ?? "",
    gorootHash: snapshot?.semantic?.gorootHash ?? "",
    goos: snapshot?.environment?.goos ?? "",
    goarch: snapshot?.environment?.goarch ?? "",
  };
  if (snapshot !== undefined && snapshot.environment?.goVersion !== extractor.goVersion) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran with ${snapshot.environment?.goVersion ?? "<unknown>"}, expected ${extractor.goVersion}` });
  }
  if (snapshot !== undefined && snapshot.semantic?.toolchainHash !== extractor.toolchainExecutableSha256) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `Go toolchain executable hash ${snapshot.semantic?.toolchainHash ?? "<unknown>"} does not match pinned ${extractor.toolchainExecutableSha256}` });
  }
  if (snapshot !== undefined) {
    const fields = new Map([
      ["gorootHashContract", "contract"], ["gorootHash", "sha256"], ["gorootEntryCount", "entryCount"],
      ["gorootFileCount", "fileCount"], ["gorootDirectoryCount", "directoryCount"],
      ["gorootSymlinkCount", "symlinkCount"], ["gorootBytes", "bytes"],
    ]);
    for (const [snapshotKey, pinKey] of fields) {
      if (snapshot.semantic?.[snapshotKey] !== extractor.goroot[pinKey]) {
        status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ${snapshotKey} ${snapshot.semantic?.[snapshotKey] ?? "<unknown>"} does not match pinned ${extractor.goroot[pinKey]}` });
      }
    }
  }
  if (snapshot !== undefined && snapshot.environment?.goos !== extractor.goos) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran for ${snapshot.environment?.goos ?? "<unknown>"}, expected GOOS ${extractor.goos}` });
  }
  if (snapshot !== undefined && snapshot.environment?.goarch !== extractor.goarch) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran for ${snapshot.environment?.goarch ?? "<unknown>"}, expected GOARCH ${extractor.goarch}` });
  }
}

export function resolvePinnedGoToolchain(repoRoot, config) {
  const { manifest } = readSourcePinManifest(repoRoot, config);
  return resolveAndVerifyPinnedGoToolchain(manifest?.extractor);
}

function validateGitlink(parentRoot, sourcePath, expectedRevision, label, status) {
  const entries = gitIndexEntries(parentRoot, sourcePath).filter((entry) => entry.path === sourcePath);
  if (entries.length !== 1) {
    status.issues.push({ path: sourcePath, reason: `${label} must have exactly one parent Git index entry` });
    return;
  }
  const [entry] = entries;
  if (entry.mode !== "160000") status.issues.push({ path: sourcePath, reason: `${label} parent entry mode is ${entry.mode}, expected submodule mode 160000` });
  if (entry.hash !== expectedRevision) status.issues.push({ path: sourcePath, reason: `${label} parent Git link ${entry.hash} does not match pinned revision ${expectedRevision}` });
}

function gitlinkEntries(root) {
  return gitIndexEntries(root).filter((entry) => entry.mode === "160000");
}

function gitIndexEntries(root, sourcePath = undefined) {
  const args = ["ls-files", "--stage"];
  if (sourcePath !== undefined) args.push("--", sourcePath);
  const result = runGit(root, args);
  if (result.status !== 0) return [];
  const entries = [];
  for (const line of result.stdout.split(/\r?\n/)) {
    if (!line) continue;
    const match = /^(\d+)\s+([0-9a-f]+)\s+\d+\t(.+)$/.exec(line);
    if (match) entries.push({ mode: match[1], hash: match[2], path: match[3] });
  }
  return entries;
}

export function gitTreeEntries(root, revision = "HEAD") {
  const result = runGit(root, ["ls-tree", "-r", "-z", revision]);
  if (result.status !== 0) return [];
  const entries = [];
  for (const record of result.stdout.split("\0")) {
    if (!record) continue;
    const match = /^(\d+)\s+(\w+)\s+([0-9a-f]+)\t(.+)$/.exec(record);
    if (match) entries.push({ mode: match[1], type: match[2], hash: match[3], path: match[4] });
  }
  return entries;
}

function validateRevision(value, label, status) {
  if (typeof value !== "string" || !REVISION_PATTERN.test(value)) {
    status.issues.push({ path: status.manifestPath, reason: `${label} must be a lowercase 40-character Git revision` });
  }
}

function validateExactKeys(value, expectedKeys, label, status) {
  const expected = [...expectedKeys].sort();
  const actual = Object.keys(value).sort();
  if (expected.length !== actual.length || expected.some((key, index) => key !== actual[index])) {
    status.issues.push({
      path: status.manifestPath,
      reason: `${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`,
    });
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

function requireRelativePath(value, label) {
  if (typeof value !== "string" || value.trim() === "") throw new Error(`${label} must be a non-empty relative path`);
  const normalized = value.split(path.sep).join("/");
  if (path.posix.isAbsolute(normalized) || normalized === ".." || normalized.startsWith("../") || normalized.includes("/../")) {
    throw new Error(`${label} must stay within its declared root`);
  }
  return normalized;
}

function resolveInside(root, relative, label) {
  const safe = requireRelativePath(relative, label);
  const resolved = path.resolve(root, safe);
  const relation = path.relative(root, resolved);
  if (relation === ".." || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new Error(`${label} resolves outside its declared root`);
  }
  if (existsSync(root) && existsSync(path.dirname(resolved))) {
    const realRoot = realpathSync(root);
    const realParent = realpathSync(path.dirname(resolved));
    if (realParent !== realRoot && !realParent.startsWith(`${realRoot}${path.sep}`)) throw new Error(`${label} escapes its declared root through a symlink`);
  }
  return resolved;
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

function runGit(root, args) {
  const result = spawnSync("git", [
    "--no-replace-objects",
    "-c", "core.fsmonitor=false",
    "-c", "core.hooksPath=/dev/null",
    "-c", "diff.external=",
    "-C", root,
    ...args,
  ], { encoding: "utf8", maxBuffer: 512 * 1024 * 1024, env: canonicalGitEnvironment() });
  return {
    status: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? result.error?.message ?? "",
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function relativePath(root, file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
