import { createHash, randomUUID } from "node:crypto";
import { closeSync, constants, fstatSync, fsyncSync, lstatSync, openSync, readFileSync, readdirSync } from "node:fs";
import { link, open, rename, unlink } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, parse, posix, relative, resolve, sep } from "node:path";

import { canonicalJson, compareUtf8, fingerprint } from "./test-provenance.mjs";

const SEAL_SCHEMA_VERSION = 1;
const INVENTORY_SCHEMA_VERSION = 1;
const FILE_READ_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
const DIRECTORY_READ_FLAGS = FILE_READ_FLAGS | (constants.O_DIRECTORY ?? 0);
const FILE_CREATE_FLAGS = constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0);
const STABLE_STAT_FIELDS = ["dev", "ino", "mode", "nlink", "size", "mtimeNs", "ctimeNs"];
const DESCRIPTOR_ROOT_CANDIDATES = ["/proc/self/fd", "/dev/fd"];

let descriptorRoot;

export async function sealEvidenceDirectory(directory, metadata, sealName = "COMPLETE.json") {
  assertSealName(sealName);
  const root = openSecureDirectory(directory);
  let temporary;
  try {
    const { inventory } = buildEvidenceInventory(root.fd, sealName, new Set(), true);
    const unsigned = { schemaVersion: SEAL_SCHEMA_VERSION, metadata, inventory };
    const seal = { ...unsigned, evidenceDigest: fingerprint(unsigned, "tsts-sealed-evidence-v1") };
    const sealBytes = Buffer.from(`${JSON.stringify(seal, null, 2)}\n`, "utf8");
    const temporaryName = `.${sealName}.partial-${randomUUID()}`;
    temporary = await createDurableExclusiveFileAt(root.fd, temporaryName, sealBytes, 0o644);

    let publicationError;
    try {
      await link(entryPath(root.fd, temporaryName), entryPath(root.fd, sealName));
      const linkedSeal = readRegularFileAt(root.fd, sealName, "evidence seal", false);
      try {
        assertSameIdentity(temporary.stat, linkedSeal.stat, `evidence seal changed while publishing: ${join(root.path, sealName)}`);
        if (!linkedSeal.bytes.equals(sealBytes)) throw new Error(`evidence seal changed while publishing: ${join(root.path, sealName)}`);
      } finally {
        closeSync(linkedSeal.fd);
      }
      fsyncSync(root.fd);
    } catch (error) {
      publicationError = error;
    }

    let cleanupError;
    try {
      await unlinkOwnedEntry(root.fd, temporaryName, temporary.stat, "temporary evidence seal");
    } catch (error) {
      cleanupError = error;
    }
    try {
      await temporary.handle.close();
    } catch (error) {
      cleanupError ??= error;
    }
    temporary = undefined;

    if (publicationError !== undefined && cleanupError !== undefined) {
      throw new AggregateError([publicationError, cleanupError], `failed to publish and clean up evidence seal: ${join(root.path, sealName)}`);
    }
    if (cleanupError !== undefined) throw cleanupError;
    if (publicationError !== undefined) {
      if (publicationError?.code === "EEXIST") throw new Error(`refusing to replace evidence seal: ${join(root.path, sealName)}`, { cause: publicationError });
      throw publicationError;
    }

    const verified = verifyOpenEvidenceDirectory(root, sealName, new Set());
    if (canonicalJson(verified.seal) !== canonicalJson(seal)) throw new Error(`published evidence seal changed before verification: ${join(root.path, sealName)}`);
    assertDirectoryPathMatches(root, "evidence root changed while sealing");
    return verified.seal;
  } finally {
    if (temporary !== undefined) await temporary.handle.close();
    closeSync(root.fd);
  }
}

export function verifyEvidenceDirectory(directory, sealName = "COMPLETE.json") {
  assertSealName(sealName);
  const root = openSecureDirectory(directory);
  try {
    const verified = verifyOpenEvidenceDirectory(root, sealName, new Set());
    assertDirectoryPathMatches(root, "evidence root changed while verifying");
    return verified.seal;
  } finally {
    closeSync(root.fd);
  }
}

export function readVerifiedEvidenceFile(directory, relativePath, sealName = "COMPLETE.json") {
  assertSealName(sealName);
  const normalizedPath = assertEvidenceRelativePath(relativePath);
  const root = openSecureDirectory(directory);
  try {
    const verified = verifyOpenEvidenceDirectory(root, sealName, new Set([normalizedPath]));
    assertDirectoryPathMatches(root, "evidence root changed while reading verified bytes");
    return { seal: verified.seal, bytes: Buffer.from(verified.files.get(normalizedPath)) };
  } finally {
    closeSync(root.fd);
  }
}

export function readVerifiedEvidenceJson(directory, relativePath, sealName = "COMPLETE.json") {
  const verified = readVerifiedEvidenceFile(directory, relativePath, sealName);
  return { ...verified, value: parseJsonBytes(verified.bytes, `verified evidence JSON '${relativePath}'`) };
}

export function evidenceDirectoryInventory(directory, excludedName = "COMPLETE.json") {
  assertSealName(excludedName);
  const root = openSecureDirectory(directory);
  try {
    const { inventory } = buildEvidenceInventory(root.fd, excludedName, new Set(), false);
    assertDirectoryPathMatches(root, "evidence root changed while inventorying");
    return inventory;
  } finally {
    closeSync(root.fd);
  }
}

export async function publishSealedDirectory(staging, destination, sealName = "COMPLETE.json") {
  assertSealName(sealName);
  const stagingPath = resolvePath(staging, "staging evidence directory");
  const destinationPath = resolvePath(destination, "published evidence directory");
  if (pathsOverlap(stagingPath, destinationPath)) throw new Error("staging and published evidence directories must not overlap");

  const source = openSecureDirectoryEntry(stagingPath, "staging evidence directory");
  let destinationParent;
  let claim;
  try {
    const verified = verifyOpenEvidenceDirectory(source, sealName, new Set());
    assertDirectoryEntryStable(source.parentFd, source.name, fstatSync(source.fd, { bigint: true }), "staging evidence directory changed before publication");
    destinationParent = openSecureDirectory(dirname(destinationPath));
    const destinationName = basename(destinationPath);
    const claimName = publicationClaimName(destinationName);
    try {
      claim = await createDurableExclusiveFileAt(
        destinationParent.fd,
        claimName,
        Buffer.from(`${JSON.stringify({ schemaVersion: 1, destination: destinationName, token: randomUUID() })}\n`, "utf8"),
        0o600,
      );
    } catch (error) {
      if (error?.code === "EEXIST") throw new Error(`refusing concurrent publication of evidence directory: ${destinationPath}`, { cause: error });
      throw error;
    }

    let publicationError;
    let publishedSeal;
    try {
      assertEntryAbsent(destinationParent.fd, destinationName, destinationPath);
      assertDirectoryEntryStable(source.parentFd, source.name, fstatSync(source.fd, { bigint: true }), "staging evidence directory changed before publication");
      fsyncSync(source.fd);
      fsyncSync(source.parentFd);
      await rename(entryPath(source.parentFd, source.name), entryPath(destinationParent.fd, destinationName));
      fsyncSync(source.fd);
      syncDistinctDirectories(source.parentFd, destinationParent.fd);
      assertDirectoryEntryIdentity(destinationParent.fd, destinationName, fstatSync(source.fd, { bigint: true }), "published evidence directory changed during publication");
      const published = verifyOpenEvidenceDirectory({ fd: source.fd, path: destinationPath }, sealName, new Set());
      if (canonicalJson(published.seal) !== canonicalJson(verified.seal)) throw new Error(`published evidence seal changed during publication: ${destinationPath}`);
      assertDirectoryEntryIdentity(destinationParent.fd, destinationName, fstatSync(source.fd, { bigint: true }), "published evidence directory changed during verification");
      assertDirectoryPathMatches({ fd: source.fd, path: destinationPath }, "published evidence path changed during publication");
      publishedSeal = published.seal;
    } catch (error) {
      if (error?.code === "EEXIST" || error?.code === "ENOTEMPTY") {
        publicationError = new Error(`refusing to replace published evidence directory: ${destinationPath}`, { cause: error });
      } else {
        publicationError = error;
      }
    }

    let releaseError;
    try {
      await unlinkOwnedEntry(destinationParent.fd, claimName, claim.stat, "evidence publication claim");
    } catch (error) {
      releaseError = error;
    }
    try {
      await claim.handle.close();
    } catch (error) {
      releaseError ??= error;
    }
    claim = undefined;

    if (publicationError !== undefined && releaseError !== undefined) {
      throw new AggregateError([publicationError, releaseError], `evidence publication and claim release both failed: ${destinationPath}`);
    }
    if (releaseError !== undefined) throw releaseError;
    if (publicationError !== undefined) throw publicationError;
    return publishedSeal;
  } finally {
    if (claim !== undefined) await claim.handle.close();
    if (destinationParent !== undefined) closeSync(destinationParent.fd);
    closeSync(source.fd);
    closeSync(source.parentFd);
  }
}

export async function writeDurableFileExclusive(file, contents) {
  const filePath = resolvePath(file, "durable file");
  const parent = openSecureDirectory(dirname(filePath));
  let created;
  try {
    created = await createDurableExclusiveFileAt(parent.fd, basename(filePath), contents, 0o644);
    await created.handle.close();
    created = undefined;
    assertDirectoryPathMatches(parent, "durable file parent changed while writing");
  } finally {
    if (created !== undefined) await created.handle.close();
    closeSync(parent.fd);
  }
}

function verifyOpenEvidenceDirectory(root, sealName, requestedPaths) {
  const sealPath = join(root.path, sealName);
  const sealFile = readRegularFileAt(root.fd, sealName, "evidence seal", false);
  try {
    const seal = parseJsonBytes(sealFile.bytes, `evidence seal '${sealPath}'`);
    const expectedKeys = ["evidenceDigest", "inventory", "metadata", "schemaVersion"];
    if (!isRecord(seal) || canonicalJson(Object.keys(seal).sort()) !== canonicalJson(expectedKeys) || seal.schemaVersion !== SEAL_SCHEMA_VERSION) {
      throw new Error(`invalid evidence seal: ${sealPath}`);
    }
    const unsigned = { schemaVersion: seal.schemaVersion, metadata: seal.metadata, inventory: seal.inventory };
    if (seal.evidenceDigest !== fingerprint(unsigned, "tsts-sealed-evidence-v1")) throw new Error(`evidence seal digest mismatch: ${sealPath}`);

    const inventoryRequests = new Set([...requestedPaths].filter((entry) => entry !== sealName));
    const actual = buildEvidenceInventory(root.fd, sealName, inventoryRequests, false);
    if (canonicalJson(actual.inventory) !== canonicalJson(seal.inventory)) throw new Error(`evidence directory inventory mismatch: ${root.path}`);
    assertStableStat(sealFile.stat, fstatSync(sealFile.fd, { bigint: true }), `evidence seal changed while verifying: ${sealPath}`);
    assertDirectoryEntryStable(root.fd, sealName, sealFile.stat, `evidence seal changed while verifying: ${sealPath}`);

    if (requestedPaths.has(sealName)) actual.files.set(sealName, Buffer.from(sealFile.bytes));
    for (const requestedPath of requestedPaths) {
      if (!actual.files.has(requestedPath)) throw new Error(`verified evidence file not found: ${requestedPath}`);
    }
    return { seal, files: actual.files };
  } finally {
    closeSync(sealFile.fd);
  }
}

function buildEvidenceInventory(rootFd, excludedName, requestedPaths, synchronize) {
  const records = [];
  const files = new Map();
  collectDirectory(rootFd, "", excludedName, requestedPaths, synchronize, records, files);
  records.sort((left, right) => compareUtf8(left.path, right.path));
  return {
    inventory: {
      schemaVersion: INVENTORY_SCHEMA_VERSION,
      records,
      digest: fingerprint(records, "tsts-evidence-directory-inventory-v1"),
    },
    files,
  };
}

function collectDirectory(directoryFd, relativeDirectory, excludedName, requestedPaths, synchronize, records, files) {
  const initialStat = fstatSync(directoryFd, { bigint: true });
  assertUsableStat(initialStat, `evidence directory '${relativeDirectory || "."}'`);
  if (!initialStat.isDirectory()) throw new Error(`evidence entry is not a directory: ${relativeDirectory || "."}`);
  const initialNames = readDirectoryNames(directoryFd, relativeDirectory);

  for (const name of initialNames) {
    if (relativeDirectory === "" && name === excludedName) continue;
    const relativePath = relativeDirectory === "" ? name : posix.join(relativeDirectory, name);
    const before = lstatEntry(directoryFd, name, `sealed evidence entry '${relativePath}'`);
    if (before.isSymbolicLink()) throw new Error(`symlink is forbidden in sealed evidence: ${relativePath}`);
    if (before.isDirectory()) {
      const child = openDirectoryAt(directoryFd, name, `sealed evidence directory '${relativePath}'`);
      records.push({ path: relativePath, kind: "directory", mode: permissionMode(child.stat) });
      try {
        collectDirectory(child.fd, relativePath, excludedName, requestedPaths, synchronize, records, files);
        assertDirectoryEntryStable(directoryFd, name, fstatSync(child.fd, { bigint: true }), `sealed evidence directory changed while traversing: ${relativePath}`);
      } finally {
        closeSync(child.fd);
      }
    } else if (before.isFile()) {
      const file = readRegularFileAt(directoryFd, name, `sealed evidence file '${relativePath}'`, synchronize);
      try {
        records.push({
          path: relativePath,
          kind: "file",
          mode: permissionMode(file.stat),
          bytes: file.bytes.length,
          sha256: createHash("sha256").update(file.bytes).digest("hex"),
        });
        if (requestedPaths.has(relativePath)) files.set(relativePath, Buffer.from(file.bytes));
      } finally {
        closeSync(file.fd);
      }
    } else {
      throw new Error(`unsupported sealed evidence entry: ${relativePath}`);
    }
  }

  const finalNames = readDirectoryNames(directoryFd, relativeDirectory);
  if (!equalStringArrays(initialNames, finalNames)) throw new Error(`evidence directory changed while traversing: ${relativeDirectory || "."}`);
  if (synchronize) fsyncSync(directoryFd);
  assertStableStat(initialStat, fstatSync(directoryFd, { bigint: true }), `evidence directory changed while traversing: ${relativeDirectory || "."}`);
}

function readRegularFileAt(parentFd, name, label, synchronize) {
  const before = lstatEntry(parentFd, name, label);
  if (before.isSymbolicLink()) throw new Error(`symlink is forbidden in sealed evidence: ${name}`);
  if (!before.isFile()) throw new Error(`${label} must be a regular file`);
  let fd;
  try {
    fd = openSync(entryPath(parentFd, name), FILE_READ_FLAGS);
    const opened = fstatSync(fd, { bigint: true });
    assertUsableStat(opened, label);
    if (!opened.isFile()) throw new Error(`${label} must be a regular file`);
    assertSameIdentity(before, opened, `${label} changed before it could be opened safely`);
    const bytes = readFileSync(fd);
    if (synchronize) fsyncSync(fd);
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
  const absolutePath = resolvePath(directory, "evidence directory");
  const parsed = parse(absolutePath);
  let currentFd;
  try {
    currentFd = openSync(parsed.root, DIRECTORY_READ_FLAGS);
    assertDirectoryStat(fstatSync(currentFd, { bigint: true }), `filesystem root '${parsed.root}'`);
    requireDescriptorRoot(currentFd);
    const suffix = relative(parsed.root, absolutePath);
    const components = suffix === "" ? [] : suffix.split(sep);
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

function openSecureDirectoryEntry(directory, label) {
  const absolutePath = resolvePath(directory, label);
  const parentPath = dirname(absolutePath);
  if (parentPath === absolutePath) throw new Error(`${label} must not be a filesystem root`);
  const parent = openSecureDirectory(parentPath);
  try {
    const opened = openDirectoryAt(parent.fd, basename(absolutePath), label);
    return { fd: opened.fd, stat: opened.stat, path: absolutePath, name: basename(absolutePath), parentFd: parent.fd, parentPath };
  } catch (error) {
    closeSync(parent.fd);
    throw error;
  }
}

function openDirectoryAt(parentFd, name, label) {
  const before = lstatEntry(parentFd, name, label);
  if (before.isSymbolicLink()) throw new Error(`symlink traversal is forbidden for ${label}`);
  if (!before.isDirectory()) throw new Error(`${label} must be a directory`);
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

function assertDirectoryEntryIdentity(parentFd, name, expected, message) {
  const current = lstatEntry(parentFd, name, message);
  if (current.isSymbolicLink() || !current.isDirectory()) throw new Error(message);
  assertSameIdentity(expected, current, message);
}

function assertEntryAbsent(parentFd, name, displayPath) {
  try {
    lstatSync(entryPath(parentFd, name));
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }
  throw new Error(`refusing to replace published evidence directory: ${displayPath}`);
}

async function createDurableExclusiveFileAt(parentFd, name, contents, mode) {
  const handle = await open(entryPath(parentFd, name), FILE_CREATE_FLAGS, mode);
  try {
    await handle.writeFile(contents);
    await handle.sync();
    const stat = await handle.stat({ bigint: true });
    assertUsableStat(stat, `durable file '${name}'`);
    if (!stat.isFile()) throw new Error(`durable file must be regular: ${name}`);
    assertDirectoryEntryStable(parentFd, name, stat, `durable file changed while writing: ${name}`);
    fsyncSync(parentFd);
    return { handle, stat };
  } catch (error) {
    await handle.close();
    throw error;
  }
}

async function unlinkOwnedEntry(parentFd, name, expected, label) {
  const current = lstatEntry(parentFd, name, label);
  assertSameIdentity(expected, current, `${label} changed before cleanup`);
  await unlink(entryPath(parentFd, name));
  fsyncSync(parentFd);
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
  const names = entries.map((entry) => decodeUtf8(entry, `evidence entry name in '${label || "."}'`));
  names.sort(compareUtf8);
  for (let index = 1; index < names.length; index += 1) {
    if (names[index - 1] === names[index]) throw new Error(`ambiguous evidence entry names in '${label || "."}'`);
  }
  return names;
}

function requireSecureFilesystemPrimitives() {
  if (!Number.isInteger(constants.O_NOFOLLOW) || constants.O_NOFOLLOW === 0 || !Number.isInteger(constants.O_DIRECTORY) || constants.O_DIRECTORY === 0) {
    throw new Error(`secure no-follow filesystem traversal is unavailable on ${process.platform}; refusing sealed evidence operation`);
  }
}

function requireDescriptorRoot(directoryFd) {
  if (descriptorRoot !== undefined) {
    if (descriptorRoot === null) throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}; refusing sealed evidence operation`);
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
  throw new Error(`descriptor-relative filesystem traversal is unavailable on ${process.platform}; refusing sealed evidence operation`);
}

function descriptorPath(fd) {
  requireDescriptorRoot(fd);
  return `${descriptorRoot}/${fd}`;
}

function entryPath(parentFd, name) {
  return join(descriptorPath(parentFd), name);
}

function assertDirectoryStat(stat, label) {
  assertUsableStat(stat, label);
  if (!stat.isDirectory()) throw new Error(`${label} must be a directory`);
}

function assertUsableStat(stat, label) {
  for (const field of STABLE_STAT_FIELDS) {
    if (typeof stat[field] !== "bigint") throw new Error(`filesystem cannot provide stable ${field} identity for ${label}`);
  }
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
  for (const field of STABLE_STAT_FIELDS) {
    if (expected[field] !== actual[field]) throw new Error(message);
  }
}

function permissionMode(stat) {
  return Number(stat.mode & 0o777n);
}

function syncDistinctDirectories(leftFd, rightFd) {
  fsyncSync(leftFd);
  if (!sameIdentity(fstatSync(leftFd, { bigint: true }), fstatSync(rightFd, { bigint: true }))) fsyncSync(rightFd);
}

function publicationClaimName(destinationName) {
  const digest = createHash("sha256").update(Buffer.from(destinationName, "utf8")).digest("hex");
  return `.tsts-sealed-evidence-publish-${digest}.lock`;
}

function pathsOverlap(left, right) {
  return isContainedPath(left, right) || isContainedPath(right, left);
}

function isContainedPath(parent, candidate) {
  const pathFromParent = relative(parent, candidate);
  return pathFromParent === "" || pathFromParent !== ".." && !pathFromParent.startsWith(`..${sep}`) && !isAbsolute(pathFromParent);
}

function resolvePath(value, label) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) throw new Error(`${label} path must be a non-empty string`);
  return resolve(value);
}

function assertEvidenceRelativePath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0") || posix.isAbsolute(value) || posix.normalize(value) !== value) {
    throw new Error(`invalid evidence-relative path '${value}'`);
  }
  const components = value.split("/");
  if (components.some((component) => component === "" || component === "." || component === "..")) throw new Error(`invalid evidence-relative path '${value}'`);
  return value;
}

function assertSealName(value) {
  if (typeof value !== "string" || !/^[a-zA-Z0-9._-]+\.json$/.test(value)) throw new Error(`invalid evidence seal name '${value}'`);
}

function parseJsonBytes(bytes, label) {
  let text;
  try {
    text = decodeUtf8(bytes, label);
  } catch (error) {
    throw new Error(`invalid UTF-8 in ${label}`, { cause: error });
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`invalid JSON in ${label}`, { cause: error });
  }
}

function decodeUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
  } catch (error) {
    throw new Error(`invalid UTF-8 for ${label}`, { cause: error });
  }
}

function equalStringArrays(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
