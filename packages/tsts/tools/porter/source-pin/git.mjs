import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
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
