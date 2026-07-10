import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, readdirSync, readlinkSync, realpathSync } from "node:fs";
import path from "node:path";

const FILE_READ_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
const DIRECTORY_READ_FLAGS = FILE_READ_FLAGS | (constants.O_DIRECTORY ?? 0);
const STABLE_STAT_FIELDS = ["dev", "ino", "mode", "nlink", "size", "mtimeNs", "ctimeNs"];
const DESCRIPTOR_ROOT_CANDIDATES = ["/proc/self/fd", "/dev/fd"];
let descriptorRoot;

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
  const symlinkPolicy = entry.symlinkPolicy ?? "reject";
  if (!new Set(["reject", "resolved-contained"]).has(symlinkPolicy)) throw new Error(`unsupported symlink policy '${symlinkPolicy}' for '${entry.label}'`);
  const records = [];
  const rootBefore = lstatSync(absolute, { bigint: true });
  assertUsableStat(rootBefore, `input root '${entry.label}'`);
  let rootKind;
  let rootMode;
  if (rootBefore.isSymbolicLink()) {
    if (symlinkPolicy === "reject") throw new Error(`symlink is not allowed in evidence input '${path.basename(absolute)}'`);
    const parent = openSecureDirectory(path.dirname(absolute));
    try {
      records.push(symlinkRecordAt(parent.fd, path.basename(absolute), path.basename(absolute), realpathSync(absolute)));
      assertStableStat(rootBefore, lstatSync(absolute, { bigint: true }), `input root '${entry.label}' changed while hashing`);
      assertDirectoryPathMatches(parent, `input root parent changed while hashing '${entry.label}'`);
    } finally {
      closeSync(parent.fd);
    }
    rootKind = "symlink";
    rootMode = permissionMode(rootBefore);
  } else if (rootBefore.isDirectory()) {
    const root = openSecureDirectory(absolute);
    try {
      const opened = fstatSync(root.fd, { bigint: true });
      assertStableStat(rootBefore, opened, `input root '${entry.label}' changed while opening`);
      collectDirectory(root.fd, "", records, realpathSync(absolute), symlinkPolicy);
      assertDirectoryPathMatches(root, `input root '${entry.label}' changed while hashing`);
      rootMode = permissionMode(opened);
    } finally {
      closeSync(root.fd);
    }
    rootKind = "directory";
  } else if (rootBefore.isFile()) {
    const parent = openSecureDirectory(path.dirname(absolute));
    try {
      records.push(regularFileRecordAt(parent.fd, path.basename(absolute), path.basename(absolute)));
      assertStableStat(rootBefore, lstatSync(absolute, { bigint: true }), `input root '${entry.label}' changed while hashing`);
      assertDirectoryPathMatches(parent, `input root parent changed while hashing '${entry.label}'`);
      rootMode = permissionMode(rootBefore);
    } finally {
      closeSync(parent.fd);
    }
    rootKind = "file";
  } else {
    throw new Error(`unsupported evidence input kind at ${absolute}`);
  }
  records.sort((left, right) => compareUtf8(left.path, right.path));
  return {
    label: entry.label,
    kind: rootKind,
    mode: rootMode,
    symlinkPolicy,
    fileCount: records.filter((record) => record.kind === "file").length,
    symlinkCount: records.filter((record) => record.kind === "symlink").length,
    bytes: records.reduce((sum, record) => sum + (record.bytes ?? 0), 0),
    digest: fingerprint(records, `tsts-input-root:${entry.label}:v1`),
  };
}

function collectDirectory(directoryFd, relativeDirectory, records, containmentRoot, symlinkPolicy) {
  const initialStat = fstatSync(directoryFd, { bigint: true });
  assertDirectoryStat(initialStat, `evidence directory '${relativeDirectory || "."}'`);
  const initialNames = readDirectoryNames(directoryFd, relativeDirectory);
  for (const name of initialNames) {
    const relativePath = relativeDirectory === "" ? name : path.posix.join(relativeDirectory, name);
    const stat = lstatEntry(directoryFd, name, `evidence input '${relativePath}'`);
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      const child = openDirectoryAt(directoryFd, name, `evidence directory '${relativePath}'`);
      records.push({ path: relativePath, kind: "directory", mode: permissionMode(child.stat) });
      try {
        collectDirectory(child.fd, relativePath, records, containmentRoot, symlinkPolicy);
        assertDirectoryEntryStable(directoryFd, name, fstatSync(child.fd, { bigint: true }), `evidence directory changed while traversing: ${relativePath}`);
      } finally {
        closeSync(child.fd);
      }
    } else {
      records.push(stat.isSymbolicLink()
        ? symlinkPolicy === "reject"
          ? forbiddenSymlink(relativePath)
          : symlinkRecordAt(directoryFd, name, relativePath, containmentRoot)
        : regularFileRecordAt(directoryFd, name, relativePath));
    }
  }
  const finalNames = readDirectoryNames(directoryFd, relativeDirectory);
  if (canonicalJson(initialNames) !== canonicalJson(finalNames)) throw new Error(`evidence directory changed while traversing: ${relativeDirectory || "."}`);
  assertStableStat(initialStat, fstatSync(directoryFd, { bigint: true }), `evidence directory changed while traversing: ${relativeDirectory || "."}`);
}

function forbiddenSymlink(relativePath) {
  throw new Error(`symlink is not allowed in evidence input '${relativePath}'`);
}

function regularFileRecordAt(parentFd, name, relativePath) {
  const file = readRegularFileAt(parentFd, name, `evidence input '${relativePath}'`);
  try {
    return { path: relativePath, kind: "file", mode: permissionMode(file.stat), bytes: file.bytes.length, sha256: sha256(file.bytes) };
  } finally {
    closeSync(file.fd);
  }
}

function symlinkRecordAt(parentFd, name, relativePath, containmentRoot) {
  const before = lstatEntry(parentFd, name, `evidence symlink '${relativePath}'`);
  if (!before.isSymbolicLink()) throw new Error(`evidence symlink changed kind: ${relativePath}`);
  const target = readlinkSync(entryPath(parentFd, name));
  const resolved = realpathSync(entryPath(parentFd, name));
  const root = realpathSync(containmentRoot);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) throw new Error(`symlink escapes evidence root at '${relativePath}'`);
  const referent = resolvedReferent(resolved, root, new Set());
  const after = lstatEntry(parentFd, name, `evidence symlink '${relativePath}'`);
  assertStableStat(before, after, `evidence symlink changed while hashing: ${relativePath}`);
  if (readlinkSync(entryPath(parentFd, name)) !== target) throw new Error(`evidence symlink target changed while hashing: ${relativePath}`);
  return { path: relativePath, kind: "symlink", mode: permissionMode(after), target, referent };
}

function resolvedReferent(absolutePath, containmentRoot, active) {
  const real = realpathSync(absolutePath);
  if (real !== containmentRoot && !real.startsWith(`${containmentRoot}${path.sep}`)) throw new Error(`resolved evidence path escapes root: ${absolutePath}`);
  const stat = lstatSync(real, { bigint: true });
  assertUsableStat(stat, `resolved evidence input '${absolutePath}'`);
  const identity = `${stat.dev}:${stat.ino}`;
  if (active.has(identity)) throw new Error(`symlink cycle in evidence input at ${absolutePath}`);
  active.add(identity);
  try {
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      const directory = openSecureDirectory(real);
      try {
        const opened = fstatSync(directory.fd, { bigint: true });
        assertSameIdentity(stat, opened, `resolved evidence directory changed while opening: ${absolutePath}`);
        const initialNames = readDirectoryNames(directory.fd, real);
        const entries = initialNames.map((name) => {
          const before = lstatEntry(directory.fd, name, `resolved evidence entry '${name}'`);
          const target = before.isSymbolicLink() ? readlinkSync(entryPath(directory.fd, name)) : null;
          const value = resolvedReferent(realpathSync(entryPath(directory.fd, name)), containmentRoot, active);
          const after = lstatEntry(directory.fd, name, `resolved evidence entry '${name}'`);
          assertStableStat(before, after, `resolved evidence entry changed while hashing: ${name}`);
          if (target !== null && readlinkSync(entryPath(directory.fd, name)) !== target) throw new Error(`resolved evidence symlink target changed while hashing: ${name}`);
          return { name, value };
        });
        if (canonicalJson(initialNames) !== canonicalJson(readDirectoryNames(directory.fd, real))) throw new Error(`resolved evidence directory changed while hashing: ${absolutePath}`);
        assertStableStat(opened, fstatSync(directory.fd, { bigint: true }), `resolved evidence directory changed while hashing: ${absolutePath}`);
        assertDirectoryPathMatches(directory, `resolved evidence directory path changed while hashing: ${absolutePath}`);
        return { kind: "directory", mode: permissionMode(opened), entries };
      } finally {
        closeSync(directory.fd);
      }
    }
    if (stat.isFile() && !stat.isSymbolicLink()) {
      const bytes = readStableRegularFile(real, `resolved evidence input '${absolutePath}'`);
      const after = lstatSync(real, { bigint: true });
      assertStableStat(stat, after, `resolved evidence file changed while hashing: ${absolutePath}`);
      return { kind: "file", mode: permissionMode(after), bytes: bytes.length, sha256: sha256(bytes) };
    }
    throw new Error(`unsupported resolved evidence input kind at ${absolutePath}`);
  } finally {
    active.delete(identity);
  }
}

function readRegularFileAt(parentFd, name, label) {
  const before = lstatEntry(parentFd, name, label);
  if (before.isSymbolicLink() || !before.isFile()) throw new Error(`${label} must be a regular non-symlink file`);
  let fd;
  try {
    fd = openSync(entryPath(parentFd, name), FILE_READ_FLAGS);
    const opened = fstatSync(fd, { bigint: true });
    assertUsableStat(opened, label);
    if (!opened.isFile()) throw new Error(`${label} must be a regular file`);
    assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
    const bytes = readFileSync(fd);
    const finalStat = fstatSync(fd, { bigint: true });
    assertStableStat(opened, finalStat, `${label} changed while reading`);
    assertDirectoryEntryStable(parentFd, name, finalStat, `${label} changed while reading`);
    return { fd, stat: finalStat, bytes };
  } catch (error) {
    if (fd !== undefined) closeSync(fd);
    if (error?.code === "ELOOP") throw new Error(`${label} became a symlink while opening`, { cause: error });
    throw error;
  }
}

function openSecureDirectory(directory) {
  requireSecureFilesystemPrimitives();
  const absolutePath = path.resolve(directory);
  const parsed = path.parse(absolutePath);
  let currentFd;
  try {
    currentFd = openSync(parsed.root, DIRECTORY_READ_FLAGS);
    assertDirectoryStat(fstatSync(currentFd, { bigint: true }), `filesystem root '${parsed.root}'`);
    requireDescriptorRoot(currentFd);
    const suffix = path.relative(parsed.root, absolutePath);
    const components = suffix === "" ? [] : suffix.split(path.sep);
    for (const component of components) {
      const child = openDirectoryAt(currentFd, component, `evidence path component '${component}'`);
      const previousFd = currentFd;
      currentFd = child.fd;
      closeSync(previousFd);
    }
    return { fd: currentFd, path: absolutePath };
  } catch (error) {
    if (currentFd !== undefined) closeSync(currentFd);
    throw error;
  }
}

function openDirectoryAt(parentFd, name, label) {
  const before = lstatEntry(parentFd, name, label);
  if (before.isSymbolicLink() || !before.isDirectory()) throw new Error(`symlink traversal is forbidden for ${label}`);
  let fd;
  try {
    fd = openSync(entryPath(parentFd, name), DIRECTORY_READ_FLAGS);
    const opened = fstatSync(fd, { bigint: true });
    assertDirectoryStat(opened, label);
    assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
    return { fd, stat: opened };
  } catch (error) {
    if (fd !== undefined) closeSync(fd);
    if (error?.code === "ELOOP" || error?.code === "ENOTDIR") throw new Error(`symlink traversal is forbidden for ${label}`, { cause: error });
    throw error;
  }
}

function assertDirectoryPathMatches(opened, message) {
  const current = openSecureDirectory(opened.path);
  try {
    assertSameIdentity(fstatSync(opened.fd, { bigint: true }), fstatSync(current.fd, { bigint: true }), `${message}: ${opened.path}`);
  } finally {
    closeSync(current.fd);
  }
}

function assertDirectoryEntryStable(parentFd, name, expected, message) {
  const current = lstatEntry(parentFd, name, message);
  if (current.isSymbolicLink() || !current.isDirectory() && !current.isFile()) throw new Error(message);
  assertStableStat(expected, current, message);
}

function lstatEntry(parentFd, name, label) {
  try {
    const stat = lstatSync(entryPath(parentFd, name), { bigint: true });
    assertUsableStat(stat, label);
    return stat;
  } catch (error) {
    if (error?.code === "ENOENT") throw new Error(`${label} disappeared during filesystem traversal`, { cause: error });
    throw error;
  }
}

function readDirectoryNames(directoryFd, label) {
  const entries = readdirSync(descriptorPath(directoryFd), { encoding: "buffer" });
  const names = entries.map((entry) => {
    const name = entry.toString("utf8");
    if (!Buffer.from(name, "utf8").equals(entry) || name.includes("/") || name.includes("\0")) throw new Error(`invalid UTF-8 evidence entry name in '${label || "."}'`);
    return name;
  }).sort(compareUtf8);
  for (let index = 1; index < names.length; index += 1) if (names[index - 1] === names[index]) throw new Error(`ambiguous evidence entry names in '${label || "."}'`);
  return names;
}

function requireSecureFilesystemPrimitives() {
  if (!Number.isInteger(constants.O_NOFOLLOW) || constants.O_NOFOLLOW === 0 || !Number.isInteger(constants.O_DIRECTORY) || constants.O_DIRECTORY === 0) throw new Error(`secure no-follow filesystem traversal is unavailable on ${process.platform}; refusing provenance operation`);
}

function requireDescriptorRoot(directoryFd) {
  if (descriptorRoot !== undefined) {
    if (descriptorRoot === null) throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}; refusing provenance operation`);
    return;
  }
  const expected = fstatSync(directoryFd, { bigint: true });
  for (const candidate of DESCRIPTOR_ROOT_CANDIDATES) {
    let probeFd;
    try {
      probeFd = openSync(`${candidate}/${directoryFd}/.`, DIRECTORY_READ_FLAGS);
      const actual = fstatSync(probeFd, { bigint: true });
      if (sameIdentity(expected, actual) && actual.isDirectory()) {
        descriptorRoot = candidate;
        return;
      }
    } catch {
    } finally {
      if (probeFd !== undefined) closeSync(probeFd);
    }
  }
  descriptorRoot = null;
  throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}; refusing provenance operation`);
}

function descriptorPath(fd) {
  requireDescriptorRoot(fd);
  return `${descriptorRoot}/${fd}`;
}

function entryPath(parentFd, name) {
  return path.join(descriptorPath(parentFd), name);
}

function assertDirectoryStat(stat, label) {
  assertUsableStat(stat, label);
  if (!stat.isDirectory()) throw new Error(`${label} must be a directory`);
}

function assertUsableStat(stat, label) {
  for (const field of STABLE_STAT_FIELDS) if (typeof stat[field] !== "bigint") throw new Error(`filesystem cannot provide stable ${field} identity for ${label}`);
  if (stat.ino === 0n || stat.nlink <= 0n) throw new Error(`filesystem cannot provide stable identity for ${label}`);
}

function assertSameIdentity(expected, actual, message) {
  assertUsableStat(expected, message);
  assertUsableStat(actual, message);
  if (!sameIdentity(expected, actual)) throw new Error(message);
}

function sameIdentity(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}

function assertStableStat(expected, actual, message) {
  assertUsableStat(expected, message);
  assertUsableStat(actual, message);
  for (const field of STABLE_STAT_FIELDS) if (expected[field] !== actual[field]) throw new Error(message);
}

function permissionMode(stat) {
  return Number(stat.mode & 0o777n);
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
  const absolute = path.resolve(file);
  const parent = openSecureDirectory(path.dirname(absolute));
  try {
    const opened = readRegularFileAt(parent.fd, path.basename(absolute), label ?? "regular file");
    try {
      assertDirectoryPathMatches(parent, `${label ?? "regular file"} parent path changed while reading`);
      return Buffer.from(opened.bytes);
    } finally {
      closeSync(opened.fd);
    }
  } finally {
    closeSync(parent.fd);
  }
}
