import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { canonicalGitEnvironment } from "../core/provenance-filesystem.mjs";

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
  const topLevelResult = runGit(root, ["rev-parse", "--show-toplevel"]);
  if (topLevelResult.status !== 0) {
    issues.push(`cannot resolve Git checkout root: ${topLevelResult.stderr || topLevelResult.stdout}`.trim());
  } else if (path.resolve(topLevelResult.stdout.trim()) !== path.resolve(root)) {
    issues.push(`source root is not the Git checkout root (${topLevelResult.stdout.trim()})`);
  }
  const statusResult = runGit(root, ["status", "--porcelain=v1", "--untracked-files=all", "--ignore-submodules=none"]);
  if (statusResult.status !== 0) {
    issues.push(`cannot inspect Git worktree: ${statusResult.stderr || statusResult.stdout}`.trim());
  }
  const hiddenIndexFlags = gitHiddenIndexFlags(root);
  issues.push(...hiddenIndexFlags.issues);
  const dirty = statusResult.status === 0 && statusResult.stdout.trim() !== "";
  const finalRevisionResult = runGit(root, ["rev-parse", "--verify", "HEAD^{commit}"]);
  if (finalRevisionResult.status !== 0) {
    issues.push(`cannot re-resolve Git revision: ${finalRevisionResult.stderr || finalRevisionResult.stdout}`.trim());
  } else if (revisionResult.status === 0 && revisionResult.stdout.trim() !== finalRevisionResult.stdout.trim()) {
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
  return buildSnapshotTreeIntegrityStatus(snapshot, gitTreeEntries(sourceRoot, snapshot.gitRevision));
}

export function buildSnapshotTreeIntegrityStatus(snapshot, treeEntries) {
  const issues = [];
  const tracked = new Map(
    treeEntries
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

export function validateGitlink(parentRoot, sourcePath, expectedRevision, label, status) {
  const entries = gitIndexEntries(parentRoot, sourcePath).filter((entry) => entry.path === sourcePath);
  if (entries.length !== 1) {
    status.issues.push({ path: sourcePath, reason: `${label} must have exactly one parent Git index entry` });
    return;
  }
  const [entry] = entries;
  if (entry.mode !== "160000") status.issues.push({ path: sourcePath, reason: `${label} parent entry mode is ${entry.mode}, expected submodule mode 160000` });
  if (entry.hash !== expectedRevision) status.issues.push({ path: sourcePath, reason: `${label} parent Git link ${entry.hash} does not match pinned revision ${expectedRevision}` });
}

export function gitlinkEntries(root) {
  return gitIndexEntries(root).filter((entry) => entry.mode === "160000");
}

export function gitTreeEntries(root, revision = "HEAD") {
  const result = runGitBytes(root, ["ls-tree", "--full-tree", "-r", "-z", revision]);
  if (result.status !== 0) {
    throw new Error(`cannot read Git tree '${revision}': ${result.stderr || "git ls-tree failed"}`.trim());
  }
  const entries = [];
  for (const record of splitNullTerminated(result.stdout, `Git tree '${revision}'`)) {
    const tab = record.indexOf(0x09);
    if (tab < 0) throw new Error(`git ls-tree returned an unparseable record for '${revision}'`);
    const header = record.subarray(0, tab).toString("ascii");
    const match = /^(\d+)\s+(\w+)\s+([0-9a-f]+)$/.exec(header);
    if (match === null) throw new Error(`git ls-tree returned an unparseable record for '${revision}'`);
    entries.push({ mode: match[1], type: match[2], hash: match[3], path: decodeGitPath(record.subarray(tab + 1), `Git tree '${revision}'`) });
  }
  return entries;
}

export function readGitCommitObjectBody(root, revision) {
  const result = spawnGit(root, ["cat-file", "commit", revision], { encoding: null });
  if ((result.status ?? 1) !== 0 || !Buffer.isBuffer(result.stdout)) {
    const stderr = Buffer.isBuffer(result.stderr) ? result.stderr.toString("utf8") : String(result.stderr ?? "");
    throw new Error(`cannot read Git commit object '${revision}': ${stderr || result.error?.message || "git cat-file failed"}`.trim());
  }
  return result.stdout;
}

function gitIndexEntries(root, sourcePath = undefined) {
  const args = ["ls-files", "--stage", "-z"];
  if (sourcePath !== undefined) args.push("--", sourcePath);
  const result = runGitBytes(root, args);
  if (result.status !== 0) {
    throw new Error(`cannot read Git index: ${result.stderr || "git ls-files failed"}`.trim());
  }
  const entries = [];
  for (const record of splitNullTerminated(result.stdout, "Git index")) {
    const tab = record.indexOf(0x09);
    if (tab < 0) throw new Error("git ls-files returned an unparseable index record");
    const match = /^(\d+)\s+([0-9a-f]+)\s+\d+$/.exec(record.subarray(0, tab).toString("ascii"));
    if (match === null) throw new Error("git ls-files returned an unparseable index record");
    entries.push({ mode: match[1], hash: match[2], path: decodeGitPath(record.subarray(tab + 1), "Git index") });
  }
  return entries;
}

function gitHiddenIndexFlags(root) {
  const result = runGitBytes(root, ["ls-files", "-v", "-z"]);
  if (result.status !== 0) {
    return { issues: [`cannot inspect Git index flags: ${result.stderr || "git ls-files failed"}`.trim()] };
  }
  const hidden = [];
  for (const record of splitNullTerminated(result.stdout, "Git index flags")) {
    if (record.length < 3 || record[1] !== 0x20) throw new Error("git ls-files returned an unparseable index-flag record");
    const marker = String.fromCharCode(record[0]);
    if (marker !== "H") hidden.push(`${marker} ${decodeGitPath(record.subarray(2), "Git index flags")}`);
  }
  return { issues: hidden.length === 0 ? [] : [`Git index has hidden worktree state (${hidden.slice(0, 4).join(", ")})`] };
}

function runGit(root, args) {
  const result = spawnGit(root, args, { encoding: "utf8" });
  return {
    status: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? result.error?.message ?? "",
  };
}

function runGitBytes(root, args) {
  const result = spawnGit(root, args, { encoding: null });
  return {
    status: result.status ?? 1,
    stdout: Buffer.isBuffer(result.stdout) ? result.stdout : Buffer.alloc(0),
    stderr: Buffer.isBuffer(result.stderr) ? result.stderr.toString("utf8") : result.stderr ?? result.error?.message ?? "",
  };
}

function splitNullTerminated(bytes, label) {
  if (!Buffer.isBuffer(bytes)) throw new Error(`${label} output must be bytes`);
  if (bytes.length > 0 && bytes.at(-1) !== 0) throw new Error(`${label} output is not NUL terminated`);
  const records = [];
  let start = 0;
  for (let index = 0; index < bytes.length; index++) {
    if (bytes[index] !== 0) continue;
    if (index === start) throw new Error(`${label} output contains an empty record`);
    records.push(bytes.subarray(start, index));
    start = index + 1;
  }
  return records;
}

function decodeGitPath(bytes, label) {
  const value = bytes.toString("utf8");
  if (Buffer.from(value, "utf8").compare(bytes) !== 0) throw new Error(`${label} contains a non-UTF-8 path, outside the Porter path contract`);
  return value;
}

function spawnGit(root, args, options) {
  return spawnSync("git", [
    "--no-replace-objects",
    "-c", "core.fsmonitor=false",
    "-c", "core.hooksPath=/dev/null",
    "-c", "diff.external=",
    "-C", root,
    ...args,
  ], { ...options, maxBuffer: 512 * 1024 * 1024, env: canonicalGitEnvironment() });
}
