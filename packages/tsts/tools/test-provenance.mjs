import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, readdirSync, readlinkSync, realpathSync } from "node:fs";
import path from "node:path";

export function canonicalJson(value) {
  return JSON.stringify(canonicalValue(value, new Set(), "$"));
}

export function fingerprint(value, domain = "tsts-evidence-v1") {
  return sha256(`${domain}\0${canonicalJson(value)}`);
}

export function compareUtf8(left, right) {
  return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

export function hashInputRoots(entries) {
  const labels = new Set();
  for (const entry of entries) {
    if (labels.has(entry?.label)) throw new Error(`duplicate input root label '${entry?.label}'`);
    labels.add(entry?.label);
  }
  const roots = entries.map((entry) => hashInputRoot(entry));
  roots.sort((left, right) => compareUtf8(left.label, right.label));
  return {
    schemaVersion: 1,
    roots,
    digest: fingerprint(roots, "tsts-input-roots-v1"),
  };
}

export function gitCheckoutProvenance(root, label) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const before = canonicalGit(root, ["rev-parse", "--verify", "HEAD^{commit}"]);
    const tree = canonicalGit(root, ["rev-parse", "--verify", `${before}^{tree}`]);
    const objectFormat = canonicalGit(root, ["rev-parse", "--show-object-format"]);
    const status = canonicalGit(root, ["status", "--porcelain=v1", "--untracked-files=all"]);
    const after = canonicalGit(root, ["rev-parse", "--verify", "HEAD^{commit}"]);
    if (before !== after) continue;
    if (status !== "") throw new Error(`${label} checkout is dirty: ${status.split(/\r?\n/).slice(0, 5).join(", ")}`);
    return { revision: before, tree, objectFormat, dirty: false };
  }
  throw new Error(`${label} checkout changed while provenance was collected`);
}

export function executableProvenance(file) {
  const bytes = readStableRegularFile(file, "executable provenance");
  return { bytes: bytes.length, sha256: sha256(bytes) };
}

export function canonicalGit(root, args, options = {}) {
  const result = spawnSync("git", [
    "--no-replace-objects",
    "-c", "core.fsmonitor=false",
    "-c", "core.hooksPath=/dev/null",
    "-c", "diff.external=",
    "-C", root,
    ...args,
  ], {
    encoding: options.encoding ?? "utf8",
    maxBuffer: options.maxBuffer ?? 256 * 1024 * 1024,
    env: canonicalGitEnvironment(),
  });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) throw new Error(`git ${args.join(" ")} failed for ${root}: ${String(result.stderr || result.stdout)}`);
  return typeof result.stdout === "string" ? result.stdout.trim() : result.stdout;
}

export function canonicalGitEnvironment(base = process.env) {
  const inherited = process.platform === "win32"
    ? ["PATH", "SystemRoot", "ComSpec", "PATHEXT", "TEMP", "TMP"]
    : ["PATH", "TMPDIR"];
  const environment = {};
  for (const key of inherited) if (base[key] !== undefined) environment[key] = base[key];
  return {
    ...environment,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null",
    GIT_CONFIG_SYSTEM: process.platform === "win32" ? "NUL" : "/dev/null",
    GIT_NO_REPLACE_OBJECTS: "1",
    GIT_OPTIONAL_LOCKS: "0",
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    TZ: "UTC",
  };
}

export function gitObjectId(bytes, type, objectFormat) {
  if (!Buffer.isBuffer(bytes) || !new Set(["blob", "tree", "commit", "tag"]).has(type)) throw new Error("invalid Git object input");
  const algorithm = objectFormat === "sha1" ? "sha1" : objectFormat === "sha256" ? "sha256" : undefined;
  if (algorithm === undefined) throw new Error(`unsupported Git object format '${objectFormat}'`);
  return createHash(algorithm).update(`${type} ${bytes.length}\0`).update(bytes).digest("hex");
}

function hashInputRoot(entry) {
  if (typeof entry?.label !== "string" || entry.label === "") throw new Error("input root label must be non-empty");
  if (typeof entry?.path !== "string" || entry.path === "") throw new Error(`input root '${entry.label}' path must be non-empty`);
  const absolute = path.resolve(entry.path);
  const rootStat = lstatSync(absolute);
  const symlinkPolicy = entry.symlinkPolicy ?? "reject";
  if (!new Set(["reject", "resolved-contained"]).has(symlinkPolicy)) throw new Error(`unsupported symlink policy '${symlinkPolicy}' for '${entry.label}'`);
  const records = [];
  if (rootStat.isDirectory()) {
    collectDirectory(absolute, "", records, absolute, symlinkPolicy);
  } else {
    records.push(fileRecord(absolute, path.basename(absolute), rootStat, absolute, symlinkPolicy));
  }
  records.sort((left, right) => compareUtf8(left.path, right.path));
  return {
    label: entry.label,
    kind: rootStat.isDirectory() ? "directory" : rootStat.isSymbolicLink() ? "symlink" : "file",
    mode: rootStat.mode & 0o777,
    symlinkPolicy,
    fileCount: records.filter((record) => record.kind === "file").length,
    symlinkCount: records.filter((record) => record.kind === "symlink").length,
    bytes: records.reduce((sum, record) => sum + (record.bytes ?? 0), 0),
    digest: fingerprint(records, `tsts-input-root:${entry.label}:v1`),
  };
}

function collectDirectory(root, relativeDirectory, records, containmentRoot, symlinkPolicy) {
  const absoluteDirectory = relativeDirectory === "" ? root : path.join(root, relativeDirectory);
  const entries = readdirSync(absoluteDirectory, { withFileTypes: true });
  entries.sort((left, right) => compareUtf8(left.name, right.name));
  for (const entry of entries) {
    const relativePath = relativeDirectory === "" ? entry.name : path.posix.join(relativeDirectory.split(path.sep).join("/"), entry.name);
    const absolutePath = path.join(absoluteDirectory, entry.name);
    const stat = lstatSync(absolutePath);
    if (stat.isDirectory()) {
      records.push({ path: relativePath, kind: "directory", mode: stat.mode & 0o777 });
      collectDirectory(root, relativePath, records, containmentRoot, symlinkPolicy);
    } else {
      records.push(fileRecord(absolutePath, relativePath.split(path.sep).join("/"), stat, containmentRoot, symlinkPolicy));
    }
  }
}

function fileRecord(absolutePath, relativePath, stat, containmentRoot, symlinkPolicy) {
  const mode = stat.mode & 0o777;
  if (stat.isSymbolicLink()) {
    if (symlinkPolicy === "reject") throw new Error(`symlink is not allowed in evidence input '${relativePath}'`);
    const target = readlinkSync(absolutePath);
    const resolved = realpathSync(absolutePath);
    const root = realpathSync(containmentRoot);
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) throw new Error(`symlink escapes evidence root at '${relativePath}'`);
    return { path: relativePath, kind: "symlink", mode, target, referent: resolvedReferent(resolved, root, new Set()) };
  }
  if (!stat.isFile()) throw new Error(`unsupported evidence input kind at ${absolutePath}`);
    const bytes = readStableRegularFile(absolutePath, `evidence input '${relativePath}'`);
  return { path: relativePath, kind: "file", mode, bytes: bytes.length, sha256: sha256(bytes) };
}

function resolvedReferent(absolutePath, containmentRoot, active) {
  const real = realpathSync(absolutePath);
  if (real !== containmentRoot && !real.startsWith(`${containmentRoot}${path.sep}`)) throw new Error(`resolved evidence path escapes root: ${absolutePath}`);
  if (active.has(real)) throw new Error(`symlink cycle in evidence input at ${absolutePath}`);
  active.add(real);
  const stat = lstatSync(real);
  let result;
  if (stat.isDirectory()) {
    const entries = readdirSync(real, { withFileTypes: true }).sort((left, right) => compareUtf8(left.name, right.name));
    result = {
      kind: "directory",
      mode: stat.mode & 0o777,
      entries: entries.map((entry) => ({ name: entry.name, value: resolvedReferent(path.join(real, entry.name), containmentRoot, active) })),
    };
  } else if (stat.isFile()) {
    const bytes = readStableRegularFile(real, `resolved evidence input '${absolutePath}'`);
    result = { kind: "file", mode: stat.mode & 0o777, bytes: bytes.length, sha256: sha256(bytes) };
  } else {
    throw new Error(`unsupported resolved evidence input kind at ${absolutePath}`);
  }
  active.delete(real);
  return result;
}

function canonicalValue(value, active, location) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error(`non-finite number is not canonical at ${location}`);
    return Object.is(value, -0) ? 0 : value;
  }
  if (typeof value === "undefined" || typeof value === "bigint" || typeof value === "symbol" || typeof value === "function") {
    throw new Error(`unsupported canonical value at ${location}`);
  }
  if (active.has(value)) throw new Error(`cyclic canonical value at ${location}`);
  active.add(value);
  if (Array.isArray(value)) {
    const result = value.map((entry, index) => canonicalValue(entry, active, `${location}[${index}]`));
    active.delete(value);
    return result;
  }
  if (value !== null && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) throw new Error(`non-plain canonical object at ${location}`);
    const result = Object.fromEntries(Object.keys(value).sort(compareUtf8).map((key) => [key, canonicalValue(value[key], active, `${location}.${key}`)]));
    active.delete(value);
    return result;
  }
  throw new Error(`unsupported canonical value at ${location}`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function readStableRegularFile(file, label) {
  const flags = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
  const descriptor = openSync(file, flags);
  try {
    const before = fstatSync(descriptor, { bigint: true });
    if (!before.isFile()) throw new Error(`${label} must be a regular file: ${file}`);
    const bytes = readFileSync(descriptor);
    const after = fstatSync(descriptor, { bigint: true });
    for (const key of ["dev", "ino", "size", "mtimeNs", "ctimeNs"]) if (before[key] !== after[key]) throw new Error(`${label} changed while it was read: ${file}`);
    return bytes;
  } finally {
    closeSync(descriptor);
  }
}
