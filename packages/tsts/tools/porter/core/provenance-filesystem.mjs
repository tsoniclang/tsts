import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readFileSync,
} from "node:fs";
import path from "node:path";

const FILE_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
const DIRECTORY_FLAGS = FILE_FLAGS | (constants.O_DIRECTORY ?? 0);
const STABLE_FIELDS = ["dev", "ino", "mode", "nlink", "size", "mtimeNs", "ctimeNs"];
const DESCRIPTOR_ROOTS = ["/proc/self/fd", "/dev/fd"];
let descriptorRoot;

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

export function readStableRegularFile(file, label = "regular file") {
  const absolute = path.resolve(file);
  const parent = openSecureDirectory(path.dirname(absolute));
  try {
    const name = path.basename(absolute);
    const before = lstatEntry(parent.fd, name, label);
    if (before.isSymbolicLink() || !before.isFile()) throw new Error(`${label} must be a regular non-symlink file`);
    let fd;
    try {
      fd = openSync(entryPath(parent.fd, name), FILE_FLAGS);
      const opened = fstatSync(fd, { bigint: true });
      assertUsableStat(opened, label);
      if (!opened.isFile()) throw new Error(`${label} must be a regular file`);
      assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
      const bytes = readFileSync(fd);
      const finalStat = fstatSync(fd, { bigint: true });
      assertStableStat(opened, finalStat, `${label} changed while reading`);
      assertStableStat(finalStat, lstatEntry(parent.fd, name, label), `${label} path changed while reading`);
      assertDirectoryPathMatches(parent, `${label} parent path changed while reading`);
      return Buffer.from(bytes);
    } catch (error) {
      if (error?.code === "ELOOP") throw new Error(`${label} became a symlink while opening`, { cause: error });
      throw error;
    } finally {
      if (fd !== undefined) closeSync(fd);
    }
  } finally {
    closeSync(parent.fd);
  }
}

function openSecureDirectory(directory) {
  requireSecureFilesystemPrimitives();
  const absolute = path.resolve(directory);
  const parsed = path.parse(absolute);
  let currentFd;
  try {
    currentFd = openSync(parsed.root, DIRECTORY_FLAGS);
    assertDirectory(fstatSync(currentFd, { bigint: true }), `filesystem root '${parsed.root}'`);
    requireDescriptorRoot(currentFd);
    const suffix = path.relative(parsed.root, absolute);
    for (const component of suffix === "" ? [] : suffix.split(path.sep)) {
      const child = openDirectoryAt(currentFd, component, `path component '${component}'`);
      closeSync(currentFd);
      currentFd = child.fd;
    }
    return { fd: currentFd, path: absolute };
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
    fd = openSync(entryPath(parentFd, name), DIRECTORY_FLAGS);
    const opened = fstatSync(fd, { bigint: true });
    assertDirectory(opened, label);
    assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
    return { fd };
  } catch (error) {
    if (fd !== undefined) closeSync(fd);
    if (error?.code === "ELOOP" || error?.code === "ENOTDIR") throw new Error(`symlink traversal is forbidden for ${label}`, { cause: error });
    throw error;
  }
}

function assertDirectoryPathMatches(opened, message) {
  const current = openSecureDirectory(opened.path);
  try {
    assertSameIdentity(fstatSync(opened.fd, { bigint: true }), fstatSync(current.fd, { bigint: true }), message);
  } finally {
    closeSync(current.fd);
  }
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

function requireSecureFilesystemPrimitives() {
  if (!Number.isInteger(constants.O_NOFOLLOW) || constants.O_NOFOLLOW === 0 || !Number.isInteger(constants.O_DIRECTORY) || constants.O_DIRECTORY === 0) {
    throw new Error(`secure no-follow filesystem traversal is unavailable on ${process.platform}; refusing provenance operation`);
  }
}

function requireDescriptorRoot(fd) {
  if (descriptorRoot !== undefined) {
    if (descriptorRoot === null) throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}`);
    return;
  }
  const expected = fstatSync(fd, { bigint: true });
  for (const candidate of DESCRIPTOR_ROOTS) {
    let probe;
    try {
      probe = openSync(`${candidate}/${fd}/.`, DIRECTORY_FLAGS);
      const actual = fstatSync(probe, { bigint: true });
      if (sameIdentity(expected, actual) && actual.isDirectory()) {
        descriptorRoot = candidate;
        return;
      }
    } catch {
    } finally {
      if (probe !== undefined) closeSync(probe);
    }
  }
  descriptorRoot = null;
  throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}`);
}

function entryPath(parentFd, name) {
  return path.join(`${descriptorRoot}/${parentFd}`, name);
}

function assertDirectory(stat, label) {
  assertUsableStat(stat, label);
  if (!stat.isDirectory()) throw new Error(`${label} must be a directory`);
}

function assertUsableStat(stat, label) {
  for (const field of STABLE_FIELDS) if (typeof stat[field] !== "bigint") throw new Error(`filesystem cannot provide stable ${field} identity for ${label}`);
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
  for (const field of STABLE_FIELDS) if (expected[field] !== actual[field]) throw new Error(message);
}
