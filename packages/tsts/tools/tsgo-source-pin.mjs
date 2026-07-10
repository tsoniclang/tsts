import { createHash } from "node:crypto";
import { existsSync, lstatSync, realpathSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { canonicalGit, canonicalJson, gitCheckoutProvenance, readStableRegularFile } from "./test-provenance.mjs";

const TOP_LEVEL_KEYS = ["documentation", "extractor", "gitObjectFormat", "goModulePath", "nestedSources", "revision", "schemaDirectory", "schemaFiles", "schemaVersion", "sourceFiles", "sourceRoot", "upstream"];
const NESTED_KEYS = ["gitObjectFormat", "goPolicy", "name", "path", "revision"];
const SCHEMA_FILE_KEYS = ["path", "sha256", "source"];
const SOURCE_FILE_KEYS = ["path", "purpose", "sha256"];

export function loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot }) {
  const pinPath = join(packageRoot, "schema/tsgo/source-pin.json");
  assertRegularFile(pinPath, "TS-Go source pin");
  const pinBytes = readStableRegularFile(pinPath, "TS-Go source pin");
  const pin = JSON.parse(pinBytes.toString("utf8"));
  assertExactKeys(pin, TOP_LEVEL_KEYS, "TS-Go source pin");
  if (pin.schemaVersion !== 1 || pin.upstream !== "microsoft/typescript-go" || pin.goModulePath !== "github.com/microsoft/typescript-go") {
    throw new Error("unsupported TS-Go source pin identity");
  }
  const expectedSourceRoot = normalizeRepoRelative(relative(repoRoot, vendorRoot));
  if (normalizeRepoRelative(pin.sourceRoot) !== expectedSourceRoot) throw new Error(`TS-Go source pin root is '${pin.sourceRoot}', expected '${expectedSourceRoot}'`);
  assertObjectId(pin.revision, pin.gitObjectFormat, "TS-Go revision");
  const primary = gitCheckoutProvenance(vendorRoot, "TS-Go");
  if (primary.revision !== pin.revision || primary.objectFormat !== pin.gitObjectFormat) throw new Error("TS-Go checkout does not match source pin");

  if (!Array.isArray(pin.nestedSources)) throw new Error("TS-Go source pin nestedSources must be an array");
  const nestedNames = new Set();
  const nestedPaths = new Set();
  const nestedSources = pin.nestedSources.map((nested, index) => {
    assertExactKeys(nested, NESTED_KEYS, `TS-Go nested source ${index}`);
    if (typeof nested.name !== "string" || nested.name === "" || nestedNames.has(nested.name)) throw new Error(`invalid duplicate TS-Go nested source name '${nested.name}'`);
    const nestedPath = safeRelativePath(nested.path, `TS-Go nested source ${nested.name}`);
    if (nestedPaths.has(nestedPath)) throw new Error(`duplicate TS-Go nested source path '${nestedPath}'`);
    assertObjectId(nested.revision, nested.gitObjectFormat, `TS-Go nested source ${nested.name} revision`);
    const gitlink = canonicalGit(vendorRoot, ["ls-tree", "HEAD", "--", nestedPath]);
    const match = /^160000 commit ([0-9a-f]+)\t/.exec(gitlink);
    if (match === null || match[1] !== nested.revision) throw new Error(`TS-Go gitlink for '${nestedPath}' does not match source pin`);
    const checkout = gitCheckoutProvenance(join(vendorRoot, nestedPath), `TS-Go nested source ${nested.name}`);
    if (checkout.revision !== nested.revision || checkout.objectFormat !== nested.gitObjectFormat) throw new Error(`TS-Go nested checkout '${nested.name}' does not match source pin`);
    nestedNames.add(nested.name);
    nestedPaths.add(nestedPath);
    return { ...nested, path: nestedPath, checkout };
  });

  const schemaDirectory = resolveContained(repoRoot, safeRelativePath(pin.schemaDirectory, "TS-Go schemaDirectory"));
  if (!Array.isArray(pin.schemaFiles) || pin.schemaFiles.length === 0) throw new Error("TS-Go source pin schemaFiles must be non-empty");
  const schemaFiles = verifyPinnedFiles(pin.schemaFiles, SCHEMA_FILE_KEYS, (entry) => ({
    local: resolveContained(schemaDirectory, safeRelativePath(entry.path, `schema file ${entry.path}`)),
    source: resolveContained(vendorRoot, safeRelativePath(entry.source, `schema source ${entry.source}`)),
  }), "TS-Go schema file");
  if (!Array.isArray(pin.sourceFiles)) throw new Error("TS-Go source pin sourceFiles must be an array");
  const sourceFiles = verifyPinnedFiles(pin.sourceFiles, SOURCE_FILE_KEYS, (entry) => ({
    source: resolveContained(vendorRoot, safeRelativePath(entry.path, `source file ${entry.path}`)),
  }), "TS-Go source file");

  return {
    schemaVersion: 1,
    path: normalizeRepoRelative(relative(repoRoot, pinPath)),
    sha256: sha256(pinBytes),
    pin,
    primary,
    nestedSources,
    schemaFiles,
    sourceFiles,
  };
}

function verifyPinnedFiles(entries, exactKeys, pathsFor, label) {
  const names = new Set();
  return entries.map((entry, index) => {
    assertExactKeys(entry, exactKeys, `${label} ${index}`);
    if (!/^[0-9a-f]{64}$/.test(entry.sha256)) throw new Error(`${label} '${entry.path}' has invalid sha256`);
    if (names.has(entry.path)) throw new Error(`duplicate ${label} '${entry.path}'`);
    names.add(entry.path);
    const paths = pathsFor(entry);
    const verified = {};
    for (const [kind, file] of Object.entries(paths)) {
      assertRegularFile(file, `${label} ${entry.path} ${kind}`);
      const bytes = readStableRegularFile(file, `${label} ${entry.path} ${kind}`);
      const actual = sha256(bytes);
      if (actual !== entry.sha256) throw new Error(`${label} '${entry.path}' ${kind} digest mismatch`);
      verified[kind] = { sha256: actual, bytes: bytes.length };
    }
    return { ...entry, verified };
  });
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort()) !== canonicalJson([...expected].sort())) throw new Error(`${label} has invalid keys`);
}

function assertObjectId(value, format, label) {
  const length = format === "sha1" ? 40 : format === "sha256" ? 64 : 0;
  if (length === 0 || typeof value !== "string" || !new RegExp(`^[0-9a-f]{${length}}$`).test(value)) throw new Error(`${label} is not a full ${format} object id`);
}

function safeRelativePath(value, label) {
  if (typeof value !== "string") throw new Error(`${label} path must be a string`);
  const normalized = value.replaceAll("\\", "/");
  if (normalized === "" || normalized.startsWith("/") || normalized.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} has unsafe path '${value}'`);
  return normalized;
}

function resolveContained(root, relativePath) {
  const resolvedRoot = resolve(root);
  const resolved = resolve(resolvedRoot, relativePath);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${sep}`)) throw new Error(`path escapes evidence root: ${relativePath}`);
  const realRoot = realpathSync(resolvedRoot);
  const realParent = realpathSync(dirname(resolved));
  if (realParent !== realRoot && !realParent.startsWith(`${realRoot}${sep}`)) throw new Error(`path escapes evidence root through a symlink: ${relativePath}`);
  return resolved;
}

function normalizeRepoRelative(value) {
  return value.split(sep).join("/").replace(/^\.\//, "");
}

function assertRegularFile(file, label) {
  if (!existsSync(file)) throw new Error(`${label} is missing: ${file}`);
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${label} must be a regular file: ${file}`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
