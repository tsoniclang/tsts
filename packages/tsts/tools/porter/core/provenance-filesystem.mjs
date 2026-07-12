import {
  closeSync,
  constants,
  fstatSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";
import { createHash } from "node:crypto";

const FILE_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
const DIRECTORY_FLAGS = FILE_FLAGS | (constants.O_DIRECTORY ?? 0);
const OUTPUT_FILE_FLAGS = constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0);
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
    const opened = openRegularFileAt(parent.fd, path.basename(absolute), label);
    try {
      const bytes = readFileSync(opened.fd);
      assertStableOpenFile(parent, opened, label);
      assertDirectoryPathMatches(parent, `${label} parent path changed while reading`);
      return bytes;
    } finally {
      closeSync(opened.fd);
    }
  } finally {
    closeSync(parent.fd);
  }
}

export function stableRegularFilesEqual(leftFile, rightFile, label = "regular-file comparison") {
  const leftPath = path.resolve(leftFile);
  const rightPath = path.resolve(rightFile);
  const leftParent = openSecureDirectory(path.dirname(leftPath));
  const rightParent = openSecureDirectory(path.dirname(rightPath));
  let left;
  let right;
  try {
    left = openRegularFileAt(leftParent.fd, path.basename(leftPath), `${label} left file`);
    right = openRegularFileAt(rightParent.fd, path.basename(rightPath), `${label} right file`);
    if (left.opened.size > BigInt(Number.MAX_SAFE_INTEGER) || right.opened.size > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error(`${label} files exceed the exact comparison size supported by this runtime`);
    }
    let equal = left.opened.size === right.opened.size;
    const leftBuffer = Buffer.allocUnsafe(1024 * 1024);
    const rightBuffer = Buffer.allocUnsafe(1024 * 1024);
    let position = 0;
    while (equal && position < left.opened.size) {
      const remaining = Number(left.opened.size - BigInt(position));
      const length = Math.min(leftBuffer.length, remaining);
      const leftRead = readSync(left.fd, leftBuffer, 0, length, position);
      const rightRead = readSync(right.fd, rightBuffer, 0, length, position);
      if (leftRead !== length || rightRead !== length || !leftBuffer.subarray(0, length).equals(rightBuffer.subarray(0, length))) equal = false;
      position += length;
    }
    assertStableOpenFile(leftParent, left, `${label} left file`);
    assertStableOpenFile(rightParent, right, `${label} right file`);
    assertDirectoryPathMatches(leftParent, `${label} left parent path changed while reading`);
    assertDirectoryPathMatches(rightParent, `${label} right parent path changed while reading`);
    return equal;
  } finally {
    if (left !== undefined) closeSync(left.fd);
    if (right !== undefined) closeSync(right.fd);
    closeSync(leftParent.fd);
    closeSync(rightParent.fd);
  }
}

export function decodeCanonicalUtf8(bytes, label = "UTF-8 evidence") {
  assertCanonicalUtf8Bytes(bytes, label);
  return bytes.toString("utf8");
}

export function assertCanonicalUtf8Bytes(bytes, label = "UTF-8 evidence") {
  if (!Buffer.isBuffer(bytes)) throw new Error(`${label} must be bytes`);
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    throw new Error(`${label} is not canonical UTF-8`);
  }
  const decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
  try {
    const chunkSize = 1024 * 1024;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      decoder.decode(bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)), { stream: true });
    }
    decoder.decode();
  } catch (error) {
    throw new Error(`${label} is not valid UTF-8`, { cause: error });
  }
}

export function readStableFlatDirectory(directory, label = "flat directory") {
  const files = new Map();
  visitStableFlatDirectory(directory, label, (name, bytes) => files.set(name, bytes));
  return files;
}

export function visitStableFlatDirectory(directory, label, visitor) {
  if (typeof visitor !== "function") throw new Error(`${label} visitor must be a function`);
  const openedDirectory = openSecureDirectory(directory);
  try {
    const initialDirectoryStat = fstatSync(openedDirectory.fd, { bigint: true });
    const names = readDirectoryNames(openedDirectory.fd, label);
    for (const name of names) {
      const opened = openRegularFileAt(openedDirectory.fd, name, `${label} entry '${name}'`);
      try {
        const bytes = readFileSync(opened.fd);
        assertStableOpenFile(openedDirectory, opened, `${label} entry '${name}'`);
        visitor(name, bytes);
      } finally {
        closeSync(opened.fd);
      }
    }
    const finalNames = readDirectoryNames(openedDirectory.fd, label);
    if (names.length !== finalNames.length || names.some((name, index) => name !== finalNames[index])) {
      throw new Error(`${label} entries changed while reading`);
    }
    assertStableStat(initialDirectoryStat, fstatSync(openedDirectory.fd, { bigint: true }), `${label} changed while reading`);
    assertDirectoryPathMatches(openedDirectory, `${label} path changed while reading`);
    return names;
  } finally {
    closeSync(openedDirectory.fd);
  }
}

export function publishStableFlatDirectory(outputRoot, files, label = "flat evidence directory") {
  if (!(files instanceof Map) || files.size === 0) throw new Error(`${label} files must be one non-empty Map`);
  const output = path.resolve(outputRoot);
  const parentPath = path.dirname(output);
  const outputName = validatedEntryName(path.basename(output), `${label} output`);
  const parent = openSecureDirectory(parentPath);
  let outputDirectory;
  try {
    const names = [...files.keys()];
    if (names.length !== files.size) throw new Error(`${label} file names must be unique`);
    if (names.at(-1) !== "COMPLETE.json") throw new Error(`${label} must publish COMPLETE.json last`);
    for (const name of names) validatedEntryName(name, `${label} file`);
    try {
      mkdirSync(entryPath(parent.fd, outputName), { mode: 0o700 });
    } catch (error) {
      if (error?.code === "EEXIST") throw new Error(`${label} output already exists`, { cause: error });
      throw error;
    }
    outputDirectory = openDirectoryAt(parent.fd, outputName, `${label} output`);
    const records = {};
    for (const name of names) {
      if (name === "COMPLETE.json") fsyncSync(outputDirectory.fd);
      const source = files.get(name);
      const contents = typeof source === "function" ? source({ files: structuredClone(records) }) : source;
      if (typeof contents !== "string" && !Buffer.isBuffer(contents)) throw new Error(`${label} file '${name}' must contain text or bytes`);
      let fd;
      try {
        fd = openSync(entryPath(outputDirectory.fd, name), OUTPUT_FILE_FLAGS, 0o600);
        writeFileSync(fd, contents);
        fsyncSync(fd);
        const opened = fstatSync(fd, { bigint: true });
        assertStableStat(opened, lstatEntry(outputDirectory.fd, name, `${label} file '${name}'`), `${label} file '${name}' changed while publishing`);
        records[name] = {
          bytes: Buffer.byteLength(contents),
          sha256: createHash("sha256").update(contents).digest("hex"),
        };
      } finally {
        if (fd !== undefined) closeSync(fd);
      }
    }
    fsyncSync(outputDirectory.fd);
    fsyncSync(parent.fd);
    assertSameIdentity(
      fstatSync(outputDirectory.fd, { bigint: true }),
      lstatEntry(parent.fd, outputName, `${label} output`),
      `${label} output changed while publishing`,
    );
    assertDirectoryPathMatches(parent, `${label} parent path changed while publishing`);
    return records;
  } finally {
    if (outputDirectory !== undefined) closeSync(outputDirectory.fd);
    closeSync(parent.fd);
  }
}

function openRegularFileAt(parentFd, name, label) {
  const before = lstatEntry(parentFd, name, label);
  if (before.isSymbolicLink() || !before.isFile()) throw new Error(`${label} must be a regular non-symlink file`);
  let fd;
  try {
    fd = openSync(entryPath(parentFd, name), FILE_FLAGS);
    const opened = fstatSync(fd, { bigint: true });
    assertUsableStat(opened, label);
    if (!opened.isFile()) throw new Error(`${label} must be a regular file`);
    assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
    return { fd, name, opened };
  } catch (error) {
    if (fd !== undefined) closeSync(fd);
    if (error?.code === "ELOOP") throw new Error(`${label} became a symlink while opening`, { cause: error });
    throw error;
  }
}

function assertStableOpenFile(parent, file, label) {
  const finalStat = fstatSync(file.fd, { bigint: true });
  assertStableStat(file.opened, finalStat, `${label} changed while reading`);
  assertStableStat(finalStat, lstatEntry(parent.fd, file.name, label), `${label} path changed while reading`);
}

function readDirectoryNames(fd, label) {
  const names = readdirSync(entryPath(fd, "."));
  for (const name of names) {
    if (typeof name !== "string" || name === "" || name === "." || name === ".." || name.includes(path.sep)) {
      throw new Error(`${label} contains an invalid entry name`);
    }
  }
  return names.sort();
}

function validatedEntryName(name, label) {
  if (typeof name !== "string" || name === "" || name === "." || name === ".." || name.includes("/") || name.includes("\\") || name.includes("\0")) {
    throw new Error(`${label} name must be one canonical path segment`);
  }
  return name;
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
