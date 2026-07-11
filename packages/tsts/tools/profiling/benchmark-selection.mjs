import { createHash } from "node:crypto";
import { lstatSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";

import { canonicalJson, compareUtf8, fingerprint, readStableRegularFile } from "../test-provenance.mjs";
import { hasCompilerOption, validateBenchmarkCompilerArguments } from "./compiler-arguments.mjs";

export const WORKLOAD_SELECTION_CONTRACT = Object.freeze({
  schemaVersion: 1,
  mode: "exact-staged-project-files",
});

export function collectWorkloadSelection({ id, argv, args, projectRoot, cwd, environment, timeoutMs }) {
  assertCompilerInvocation(id, argv, args);
  const root = realpathSync(projectRoot);
  const workingDirectory = realpathSync(cwd);
  assertContained(root, workingDirectory, `${id} working directory`, true);
  const result = spawnSync(argv[0], [...argv.slice(1), ...args, "--listFilesOnly", "--pretty", "false"], {
    cwd: workingDirectory,
    env: environment,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    timeout: timeoutMs,
    killSignal: "SIGKILL",
  });
  if (result.error !== undefined) throw new Error(`${id} workload selection could not complete: ${result.error.message}`, { cause: result.error });
  if (result.status !== 0 || result.signal !== null) {
    const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();
    throw new Error(`${id} workload selection failed status=${String(result.status)} signal=${String(result.signal)}\n${output}`);
  }
  if (String(result.stderr ?? "").trim() !== "") throw new Error(`${id} workload selection wrote unexpected stderr output`);

  const selectedPaths = parseSelectedPaths(result.stdout, workingDirectory, id);
  const seen = new Set();
  const files = selectedPaths.map((selectedPath) => {
    const canonicalPath = realpathSync(selectedPath);
    assertContained(root, canonicalPath, `${id} selected file`);
    const stat = lstatSync(selectedPath);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${id} selected a non-regular or symbolic-link file: ${selectedPath}`);
    if (canonicalPath !== selectedPath) throw new Error(`${id} selected a non-canonical file path: ${selectedPath}`);
    const path = relative(root, canonicalPath).split(sep).join("/");
    assertSafeRelativePath(path, `${id} selected file`);
    if (seen.has(path)) throw new Error(`${id} selected duplicate file '${path}'`);
    seen.add(path);
    const bytes = readStableRegularFile(canonicalPath, `${id} selected file`);
    return { path, bytes: bytes.length, sha256: sha256(bytes) };
  }).sort((left, right) => compareUtf8(left.path, right.path));
  const body = { schemaVersion: WORKLOAD_SELECTION_CONTRACT.schemaVersion, files };
  return { ...body, digest: fingerprint(body, "tsts-performance-workload-selection-v1") };
}

export function exactWorkloadSelection(byCompiler) {
  const entries = Object.entries(byCompiler);
  if (entries.length === 0) throw new Error("benchmark compiler selections are empty");
  for (const [compiler, result] of entries) validateWorkloadSelection(result.selection, `${compiler} workload selection`);
  const expected = entries[0][1].selection;
  const mismatch = entries.find(([, result]) => canonicalJson(result.selection) !== canonicalJson(expected));
  if (mismatch !== undefined) throw new Error(`benchmark compilers selected non-equivalent workload files: expected=${entries[0][0]} mismatch=${mismatch[0]}`);
  return expected;
}

export function validateWorkloadSelection(selection, label = "workload selection") {
  if (selection === null || typeof selection !== "object" || Array.isArray(selection)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(selection).sort(compareUtf8)) !== canonicalJson(["digest", "files", "schemaVersion"])) throw new Error(`${label} has invalid keys`);
  if (selection.schemaVersion !== WORKLOAD_SELECTION_CONTRACT.schemaVersion || !Array.isArray(selection.files) || selection.files.length === 0) throw new Error(`${label} is empty or has an unsupported schema`);
  let previous;
  for (const file of selection.files) {
    if (file === null || typeof file !== "object" || Array.isArray(file) || canonicalJson(Object.keys(file).sort(compareUtf8)) !== canonicalJson(["bytes", "path", "sha256"])) throw new Error(`${label} contains an invalid file record`);
    assertSafeRelativePath(file.path, `${label} file`);
    if (!Number.isSafeInteger(file.bytes) || file.bytes < 0 || typeof file.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(file.sha256)) throw new Error(`${label} contains invalid file evidence`);
    if (previous !== undefined && compareUtf8(previous, file.path) >= 0) throw new Error(`${label} files must be strictly sorted and unique`);
    previous = file.path;
  }
  const body = { schemaVersion: selection.schemaVersion, files: selection.files };
  if (fingerprint(body, "tsts-performance-workload-selection-v1") !== selection.digest) throw new Error(`${label} digest mismatch`);
  return selection;
}

function assertCompilerInvocation(id, argv, args) {
  if (typeof id !== "string" || id === "") throw new Error("workload selection id is invalid");
  if (!Array.isArray(argv) || argv.length === 0 || !argv.every((entry) => typeof entry === "string" && entry !== "")) throw new Error(`${id} compiler argv is invalid`);
  if (!Array.isArray(args) || !args.every((entry) => typeof entry === "string" && entry !== "")) throw new Error(`${id} compiler arguments are invalid`);
  validateBenchmarkCompilerArguments(args, `${id} compiler arguments`);
  if (hasCompilerOption(args, ["--listFilesOnly", "--pretty"])) throw new Error(`${id} compiler arguments override harness-controlled workload selection options`);
}

function parseSelectedPaths(output, cwd, id) {
  const text = String(output ?? "");
  const lines = text.split(/\r?\n/u).filter((line) => line !== "");
  if (lines.length === 0) throw new Error(`${id} workload selection returned no files`);
  return lines.map((line) => {
    if (line.includes("\0")) throw new Error(`${id} workload selection returned an invalid path`);
    return resolve(cwd, line);
  });
}

function assertContained(root, candidate, label, allowRoot = false) {
  const path = relative(root, candidate);
  if ((!allowRoot && path === "") || isAbsolute(path) || path === ".." || path.startsWith(`..${sep}`)) throw new Error(`${label} must be ${allowRoot ? "inside" : "a child of"} the staged project root`);
}

function assertSafeRelativePath(value, label) {
  if (typeof value !== "string" || value === "" || isAbsolute(value) || value.includes("\\")) throw new Error(`${label} path is invalid`);
  if (value.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} path is invalid`);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}
