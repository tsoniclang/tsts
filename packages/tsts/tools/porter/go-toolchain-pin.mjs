import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  accessSync,
  constants,
  lstatSync,
  readdirSync,
  readlinkSync,
  realpathSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";

import { readStableRegularFile } from "../test-provenance.mjs";

const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const TREE_DOMAIN = Buffer.from("tsts-porter-goroot-tree-v1\0", "ascii");
const STABILITY_FIELDS = ["dev", "ino", "mode", "nlink", "uid", "gid", "rdev", "size", "mtimeNs", "ctimeNs"];

export const GO_TOOLCHAIN_ROOT_HASH_CONTRACT = Object.freeze({
  name: "tsts-porter-goroot-tree-v1",
  domain: TREE_DOMAIN.toString("ascii"),
  digest: "sha256",
  ordering: "UTF-8 byte order by normalized relative path",
});

export function hashGoToolchainRoot(candidate) {
  const root = realpathSync(candidate);
  const before = inventoryGoToolchainRoot(root);
  const digest = createHash("sha256");
  digest.update(TREE_DOMAIN);
  digest.update(uint32(before.rootMode));
  digest.update(uint64(before.entries.length));
  let bytes = 0;
  let fileCount = 0;
  let directoryCount = 0;
  let symlinkCount = 0;

  for (const entry of before.entries) {
    const pathBytes = Buffer.from(entry.path, "utf8");
    let payload = Buffer.alloc(0);
    if (entry.kind === "file") {
      payload = readStableRegularFile(entry.absolute, `Go toolchain file '${entry.path}'`);
      assertEntryStable(entry, lstatSync(entry.absolute, { bigint: true }));
      if (BigInt(payload.length) !== entry.size) throw new Error(`Go toolchain file '${entry.path}' changed size while hashing`);
      fileCount++;
      bytes += payload.length;
    } else if (entry.kind === "directory") {
      directoryCount++;
    } else {
      payload = entry.target;
      symlinkCount++;
    }
    digest.update(Buffer.from(entry.kind === "file" ? "F" : entry.kind === "directory" ? "D" : "L", "ascii"));
    digest.update(uint64(pathBytes.length));
    digest.update(pathBytes);
    digest.update(uint32(entry.mode));
    digest.update(uint64(payload.length));
    digest.update(payload);
  }

  const after = inventoryGoToolchainRoot(root);
  assertInventoriesEqual(before, after);
  if (!Number.isSafeInteger(bytes)) throw new Error("Go toolchain byte count exceeds the JavaScript safe-integer range");
  return Object.freeze({
    contract: GO_TOOLCHAIN_ROOT_HASH_CONTRACT.name,
    root,
    sha256: digest.digest("hex"),
    entryCount: before.entries.length,
    fileCount,
    directoryCount,
    symlinkCount,
    bytes,
  });
}

export function resolveAndVerifyPinnedGoToolchain(extractor) {
  validatePinnedGoToolchainContract(extractor);
  const requested = process.env.TSTS_PORTER_GO;
  if (requested !== undefined && !path.isAbsolute(requested)) {
    throw new Error("TSTS_PORTER_GO must name an absolute executable path");
  }
  const candidate = requested ?? executableOnPath(process.platform === "win32" ? "go.exe" : "go");
  if (candidate === undefined) throw new Error("pinned Go executable is unavailable; set TSTS_PORTER_GO to its absolute path");
  const executable = realpathSync(candidate);
  accessSync(executable, constants.X_OK);
  const executableHash = sha256(readStableRegularFile(executable, "pinned Go executable"));
  if (executableHash !== extractor.toolchainExecutableSha256) {
    throw new Error(`Go executable ${executable} has SHA-256 ${executableHash}, expected pinned ${extractor.toolchainExecutableSha256}`);
  }

  const bootstrapEnvironment = pinnedGoCommandEnvironment({ executable });
  const version = runGoIdentityCommand(executable, ["version"], bootstrapEnvironment);
  const expectedVersion = `go version ${extractor.goVersion} ${extractor.goos}/${extractor.goarch}`;
  if (version.trim() !== expectedVersion) throw new Error(`Go executable identity is '${version.trim()}', expected '${expectedVersion}'`);
  const identity = JSON.parse(runGoIdentityCommand(
    executable,
    ["env", "-json", "GOROOT", "GOVERSION", "GOHOSTOS", "GOHOSTARCH"],
    bootstrapEnvironment,
  ));
  assertGoIdentity(identity, extractor);
  const goroot = realpathSync(identity.GOROOT);
  const rootExecutable = realpathSync(path.join(goroot, "bin", process.platform === "win32" ? "go.exe" : "go"));
  if (rootExecutable !== executable) throw new Error(`Go executable ${executable} is not the canonical executable under reported GOROOT ${goroot}`);
  const tree = hashGoToolchainRoot(goroot);
  assertGoToolchainTreePin(tree, extractor.goroot);
  return Object.freeze({
    executable,
    executableHash,
    goVersion: identity.GOVERSION,
    goos: identity.GOHOSTOS,
    goarch: identity.GOHOSTARCH,
    goroot,
    gorootHash: tree.sha256,
    tree,
    environment: Object.freeze(pinnedGoCommandEnvironment({ executable, goroot })),
  });
}

export function assertPinnedGoToolchainStable(toolchain) {
  const current = hashGoToolchainRoot(toolchain.goroot);
  assertGoToolchainTreePin(current, toolchain.tree);
  const executableHash = sha256(readStableRegularFile(toolchain.executable, "pinned Go executable after Porter run"));
  if (executableHash !== toolchain.executableHash) {
    throw new Error(`Go executable changed while Porter ran: before ${toolchain.executableHash}, after ${executableHash}`);
  }
  return current;
}

export function pinnedGoCommandEnvironment({ executable, goroot = undefined }) {
  const environment = {
    CGO_ENABLED: "0",
    GO111MODULE: "on",
    GOENV: "off",
    GOEXPERIMENT: "",
    GOFIPS140: "off",
    GOFLAGS: "-mod=readonly",
    GONOPROXY: "",
    GONOSUMDB: "",
    GOPRIVATE: "",
    GOPROXY: "off",
    GOSUMDB: "off",
    GOTOOLCHAIN: "local",
    GOVCS: "off",
    GOWORK: "off",
    HOME: homedir(),
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    PATH: path.dirname(executable),
    TMPDIR: tmpdir(),
    TZ: "UTC",
  };
  if (goroot !== undefined) environment.GOROOT = goroot;
  if (process.platform === "win32") {
    for (const key of ["ComSpec", "PATHEXT", "SystemRoot", "TEMP", "TMP"]) {
      if (process.env[key] !== undefined) environment[key] = process.env[key];
    }
  }
  return environment;
}

function inventoryGoToolchainRoot(root) {
  const rootStat = lstatSync(root, { bigint: true });
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error(`Go GOROOT must be a real directory: ${root}`);
  const entries = [];
  const stack = [{ absolute: root, components: [] }];
  while (stack.length > 0) {
    const directory = stack.pop();
    const names = readdirSync(directory.absolute, { encoding: "buffer" }).sort(Buffer.compare);
    for (const nameBytes of names) {
      const name = validatedName(nameBytes, directory.absolute);
      const components = [...directory.components, name];
      const relative = components.join("/");
      const absolute = path.join(directory.absolute, name);
      const stat = lstatSync(absolute, { bigint: true });
      const base = {
        absolute,
        path: relative,
        mode: permissionMode(stat, relative),
        size: stat.size,
        stability: stabilityKey(stat),
      };
      if (stat.isDirectory()) {
        entries.push({ ...base, kind: "directory" });
        stack.push({ absolute, components });
      } else if (stat.isFile()) {
        entries.push({ ...base, kind: "file" });
      } else if (stat.isSymbolicLink()) {
        const target = readlinkSync(absolute, { encoding: "buffer" });
        assertContainedSymlink(root, absolute, relative);
        entries.push({ ...base, kind: "symlink", mode: 0, target });
      } else {
        throw new Error(`unsupported file kind in Go GOROOT at '${relative}'`);
      }
    }
  }
  entries.sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  return { root, rootMode: permissionMode(rootStat, "."), rootStability: stabilityKey(rootStat), entries };
}

function assertInventoriesEqual(before, after) {
  if (before.root !== after.root || before.rootMode !== after.rootMode || before.rootStability !== after.rootStability) {
    throw new Error("Go GOROOT changed while its tree hash was computed");
  }
  if (before.entries.length !== after.entries.length) throw new Error("Go GOROOT entry set changed while its tree hash was computed");
  for (let index = 0; index < before.entries.length; index++) {
    const left = before.entries[index];
    const right = after.entries[index];
    if (left.path !== right.path || left.kind !== right.kind || left.mode !== right.mode || left.stability !== right.stability) {
      throw new Error(`Go GOROOT entry changed while hashing at '${left.path}'`);
    }
    if (left.kind === "symlink" && !left.target.equals(right.target)) {
      throw new Error(`Go GOROOT symlink target changed while hashing at '${left.path}'`);
    }
  }
}

function assertEntryStable(entry, stat) {
  if (!stat.isFile() || entry.stability !== stabilityKey(stat) || entry.mode !== permissionMode(stat, entry.path)) {
    throw new Error(`Go toolchain file '${entry.path}' changed while hashing`);
  }
}

function permissionMode(stat, label) {
  const special = stat.mode & 0o7000n;
  if (special !== 0n) throw new Error(`Go GOROOT entry '${label}' uses unsupported special mode bits ${special.toString(8)}`);
  return Number(stat.mode & 0o777n);
}

function stabilityKey(stat) {
  return STABILITY_FIELDS.map((field) => stat[field].toString()).join(":");
}

function validatedName(bytes, directory) {
  const name = bytes.toString("utf8");
  if (!Buffer.from(name, "utf8").equals(bytes)) throw new Error(`Go GOROOT contains a non-UTF-8 path below ${directory}`);
  if (name === "" || name === "." || name === ".." || name.includes("/") || name.includes("\\") || name.includes("\0")) {
    throw new Error(`Go GOROOT contains a noncanonical path component ${JSON.stringify(name)}`);
  }
  return name;
}

function assertContainedSymlink(root, absolute, relative) {
  const resolved = realpathSync(absolute);
  const relation = path.relative(root, resolved);
  if (relation === ".." || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new Error(`Go GOROOT symlink '${relative}' resolves outside the pinned root`);
  }
}

function uint32(value) {
  const output = Buffer.allocUnsafe(4);
  output.writeUInt32BE(value);
  return output;
}

function uint64(value) {
  const output = Buffer.allocUnsafe(8);
  output.writeBigUInt64BE(BigInt(value));
  return output;
}

function runGoIdentityCommand(executable, args, environment) {
  const result = spawnSync(executable, args, { encoding: "utf8", env: environment, maxBuffer: 16 * 1024 * 1024 });
  if (result.error !== undefined || result.status !== 0 || result.signal !== null) {
    throw new Error(`cannot query pinned Go binary ${executable}: ${result.stderr || result.error?.message || result.stdout}`.trim());
  }
  return result.stdout;
}

function assertGoIdentity(identity, extractor) {
  const actualKeys = Object.keys(identity).sort();
  const expectedKeys = ["GOHOSTARCH", "GOHOSTOS", "GOROOT", "GOVERSION"];
  if (actualKeys.length !== expectedKeys.length || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error(`Go identity query returned unexpected keys: ${actualKeys.join(", ")}; expected ${expectedKeys.join(", ")}`);
  }
  if (identity.GOVERSION !== extractor.goVersion || identity.GOHOSTOS !== extractor.goos || identity.GOHOSTARCH !== extractor.goarch) {
    throw new Error(`Go environment identity is ${identity.GOVERSION} ${identity.GOHOSTOS}/${identity.GOHOSTARCH}, expected ${extractor.goVersion} ${extractor.goos}/${extractor.goarch}`);
  }
  if (typeof identity.GOROOT !== "string" || identity.GOROOT === "") throw new Error("Go environment omitted GOROOT");
}

export function validatePinnedGoToolchainContract(extractor) {
  requireExactObject(extractor, ["goVersion", "goarch", "goos", "goroot", "module", "toolchainExecutableSha256"], "extractor");
  if (!SHA256_PATTERN.test(extractor.toolchainExecutableSha256 ?? "")) throw new Error("extractor.toolchainExecutableSha256 must be a lowercase SHA-256 digest");
  if (typeof extractor.goVersion !== "string" || !/^go\d+\.\d+(?:\.\d+)?$/.test(extractor.goVersion)) throw new Error("extractor.goVersion is invalid");
  for (const key of ["goos", "goarch", "module"]) if (typeof extractor[key] !== "string" || extractor[key] === "") throw new Error(`extractor.${key} must be non-empty`);
  if (extractor.goos !== "linux" || extractor.goarch !== "amd64") throw new Error("source-pin schema 2 supports only the audited linux/amd64 Go toolchain contract");
  requireExactObject(extractor.goroot, ["bytes", "contract", "directoryCount", "entryCount", "fileCount", "sha256", "symlinkCount"], "extractor.goroot");
  if (extractor.goroot.contract !== GO_TOOLCHAIN_ROOT_HASH_CONTRACT.name) throw new Error(`extractor.goroot.contract must be '${GO_TOOLCHAIN_ROOT_HASH_CONTRACT.name}'`);
  if (!SHA256_PATTERN.test(extractor.goroot.sha256 ?? "")) throw new Error("extractor.goroot.sha256 must be a lowercase SHA-256 digest");
  for (const key of ["bytes", "directoryCount", "entryCount", "fileCount", "symlinkCount"]) {
    if (!Number.isSafeInteger(extractor.goroot[key]) || extractor.goroot[key] < 0) throw new Error(`extractor.goroot.${key} must be a non-negative safe integer`);
  }
  if (extractor.goroot.entryCount !== extractor.goroot.fileCount + extractor.goroot.directoryCount + extractor.goroot.symlinkCount) {
    throw new Error("extractor.goroot entry counts do not close exactly");
  }
}

function assertGoToolchainTreePin(actual, expected) {
  for (const key of ["contract", "sha256", "entryCount", "fileCount", "directoryCount", "symlinkCount", "bytes"]) {
    if (actual[key] !== expected[key]) throw new Error(`Go GOROOT ${key} is ${actual[key]}, expected pinned ${expected[key]}`);
  }
}

function requireExactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
}

function executableOnPath(name) {
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (directory === "") continue;
    const candidate = path.resolve(directory, name);
    try {
      accessSync(candidate, constants.X_OK);
      return candidate;
    } catch {
    }
  }
  return undefined;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
