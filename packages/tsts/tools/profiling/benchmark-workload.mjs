import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { rm } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

import { canonicalJson, compareUtf8, fingerprint, hashInputRoots, readStableRegularFile } from "../test-provenance.mjs";

export const BENCHMARK_CORPUS_SCHEMA_VERSION = 2;

export function loadBenchmarkCorpus(file) {
  const path = resolve(file);
  const bytes = readStableRegularFile(path, "benchmark corpus");
  let definition;
  try {
    definition = JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new Error(`benchmark corpus is not valid JSON: ${path}`, { cause: error });
  }
  assertExactKeys(definition, ["projects", "schemaVersion"], "benchmark corpus");
  if (definition.schemaVersion !== BENCHMARK_CORPUS_SCHEMA_VERSION || !Array.isArray(definition.projects) || definition.projects.length === 0) throw new Error("benchmark corpus schemaVersion or projects are invalid");

  const corpusDirectory = dirname(path);
  const projectNames = new Set();
  const projects = definition.projects.map((project, projectIndex) => {
    assertExactKeys(project, ["args", "cwd", "inputs", "name"], `benchmark corpus project ${projectIndex}`);
    if (typeof project.name !== "string" || !/^[a-z0-9][a-z0-9._-]*$/.test(project.name) || projectNames.has(project.name)) throw new Error(`benchmark corpus project ${projectIndex} has an unsafe or duplicate name`);
    projectNames.add(project.name);
    assertSafeRelativePath(project.cwd, `benchmark project '${project.name}' cwd`);
    validateCompilerArguments(project.args, project.name);
    if (!Array.isArray(project.inputs) || project.inputs.length === 0) throw new Error(`benchmark project '${project.name}' must declare inputs`);
    const labels = new Set();
    const inputs = project.inputs.map((input, inputIndex) => {
      assertExactKeys(input, ["destination", "label", "replicas", "source"], `benchmark project '${project.name}' input ${inputIndex}`);
      if (typeof input.label !== "string" || !/^[a-z0-9][a-z0-9._-]*$/.test(input.label) || labels.has(input.label)) throw new Error(`benchmark project '${project.name}' has an unsafe or duplicate input label`);
      labels.add(input.label);
      assertSafeRelativePath(input.source, `benchmark input '${project.name}/${input.label}' source`);
      assertSafeRelativePath(input.destination, `benchmark input '${project.name}/${input.label}' destination`);
      if (!Number.isSafeInteger(input.replicas) || input.replicas < 1 || input.replicas > 128) throw new Error(`benchmark input '${project.name}/${input.label}' replicas is invalid`);
      const sourcePath = resolveContained(corpusDirectory, input.source, `benchmark input '${project.name}/${input.label}' source`);
      const stat = lstatSync(sourcePath);
      if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) throw new Error(`benchmark input '${project.name}/${input.label}' must be a regular file or directory`);
      if (stat.isFile() && input.replicas !== 1) throw new Error(`benchmark file input '${project.name}/${input.label}' cannot be replicated`);
      return { ...input, sourcePath, sourceKind: stat.isDirectory() ? "directory" : "file" };
    });
    return { ...project, inputs };
  });
  const sourceEntries = inputEvidenceEntries(projects);
  const sourceEvidence = hashInputRoots([{ label: "benchmark-corpus", path }, ...sourceEntries]);
  const reportDefinition = {
    schemaVersion: BENCHMARK_CORPUS_SCHEMA_VERSION,
    file: { bytes: bytes.length, sha256: sha256(bytes) },
    projects: projects.map((project) => ({
      name: project.name,
      cwd: project.cwd,
      args: project.args,
      inputs: project.inputs.map(({ label, source, destination, replicas }) => ({ label, source, destination, replicas })),
    })),
  };
  const definitionDigest = fingerprint(reportDefinition, "tsts-performance-corpus-definition-v2");
  const workloadDigest = fingerprint({ definitionDigest, sourceEvidence }, "tsts-performance-workload-v1");
  return { path, directory: corpusDirectory, definition: reportDefinition, definitionDigest, workloadDigest, sourceEvidence, projects };
}

export function assertCorpusSourcesUnchanged(corpus) {
  const after = hashInputRoots([{ label: "benchmark-corpus", path: corpus.path }, ...inputEvidenceEntries(corpus.projects)]);
  if (canonicalJson(after) !== canonicalJson(corpus.sourceEvidence)) throw new Error("benchmark corpus sources changed during execution");
}

export function stageBenchmarkCorpus(corpus, stagingRoot) {
  mkdirSync(stagingRoot, { recursive: true, mode: 0o700 });
  assertCorpusSourcesUnchanged(corpus);
  const projects = [];
  for (const project of corpus.projects) {
    const projectRoot = join(stagingRoot, project.name);
    mkdirSync(projectRoot, { mode: 0o700 });
    const copies = [];
    for (const input of project.inputs) {
      for (let replica = 0; replica < input.replicas; replica += 1) {
        const destination = input.replicas === 1
          ? resolveContained(projectRoot, input.destination, `benchmark input '${project.name}/${input.label}' destination`)
          : resolveContained(projectRoot, `${input.destination}/${String(replica).padStart(3, "0")}`, `benchmark input '${project.name}/${input.label}' replica destination`);
        copyExclusive(input.sourcePath, destination, input.sourceKind);
        const sourceCopy = hashInputRoots([{ label: "copy", path: input.sourcePath }]).roots[0];
        const stagedCopy = hashInputRoots([{ label: "copy", path: destination }]).roots[0];
        if (canonicalJson(sourceCopy) !== canonicalJson(stagedCopy)) throw new Error(`staged benchmark input differs from source: ${project.name}/${input.label}/${replica}`);
        copies.push({ label: input.label, replica, destination: relative(projectRoot, destination).split(sep).join("/"), digest: stagedCopy.digest });
      }
    }
    const cwd = resolveContained(projectRoot, project.cwd, `benchmark project '${project.name}' cwd`);
    const cwdStat = lstatSync(cwd);
    if (!cwdStat.isDirectory() || cwdStat.isSymbolicLink()) throw new Error(`benchmark project '${project.name}' cwd was not staged as a regular directory`);
    makeReadOnly(projectRoot);
    const stagedEvidence = hashInputRoots([{ label: `staged-project:${project.name}`, path: projectRoot }]);
    projects.push({
      name: project.name,
      root: projectRoot,
      cwd,
      args: [...project.args],
      copies,
      stagedEvidence,
    });
  }
  assertCorpusSourcesUnchanged(corpus);
  return projects;
}

export function assertStagedWorkloadsUnchanged(projects) {
  for (const project of projects) {
    const after = hashInputRoots([{ label: `staged-project:${project.name}`, path: project.root }]);
    if (canonicalJson(after) !== canonicalJson(project.stagedEvidence)) throw new Error(`staged benchmark workload '${project.name}' changed during execution`);
  }
}

export function workloadReportEvidence(corpus, stagedProjects) {
  return {
    schemaVersion: BENCHMARK_CORPUS_SCHEMA_VERSION,
    definition: corpus.definition,
    definitionDigest: corpus.definitionDigest,
    workloadDigest: corpus.workloadDigest,
    sourceEvidence: corpus.sourceEvidence,
    stagedProjects: stagedProjects.map((project) => ({
      name: project.name,
      args: project.args,
      copies: project.copies,
      stagedEvidence: project.stagedEvidence,
    })),
  };
}

export async function removeBenchmarkStaging(root) {
  if (!existsSync(root)) return;
  makeOwnerWritable(root);
  await rm(root, { recursive: true, force: true });
}

function inputEvidenceEntries(projects) {
  return projects.flatMap((project) => project.inputs.map((input) => ({ label: `benchmark-input:${project.name}:${input.label}`, path: input.sourcePath })));
}

function validateCompilerArguments(args, projectName) {
  if (!Array.isArray(args) || args.length === 0 || !args.every((entry) => typeof entry === "string" && entry !== "" && !entry.includes("\0") && !entry.includes("\n") && !entry.includes("\r"))) throw new Error(`benchmark project '${projectName}' args are invalid`);
  const lower = args.map((entry) => entry.toLowerCase());
  if (!lower.includes("--noemit")) throw new Error(`benchmark project '${projectName}' must use --noEmit`);
  const incremental = lower.indexOf("--incremental");
  if (incremental < 0 || lower[incremental + 1] !== "false") throw new Error(`benchmark project '${projectName}' must use --incremental false`);
  if (!lower.includes("-p") && !lower.includes("--project")) throw new Error(`benchmark project '${projectName}' must use an explicit project configuration`);
  const forbidden = new Set(["--build", "-b", "--extendeddiagnostics", "--generatecpuprofile", "--pretty", "--watch", "-w"]);
  const override = lower.find((entry) => forbidden.has(entry));
  if (override !== undefined) throw new Error(`benchmark project '${projectName}' uses harness-controlled or mutable argument '${override}'`);
}

function copyExclusive(source, destination, kind) {
  mkdirSync(dirname(destination), { recursive: true, mode: 0o700 });
  if (kind === "file") {
    const stat = lstatSync(source);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`benchmark source file changed kind while staging: ${source}`);
    writeFileSync(destination, readStableRegularFile(source, "benchmark source file"), { flag: "wx", mode: stat.mode & 0o777 });
    chmodSync(destination, stat.mode & 0o777);
    return;
  }
  copyDirectoryExclusive(source, destination);
}

function copyDirectoryExclusive(source, destination) {
  const stat = lstatSync(source);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`benchmark source directory changed kind while staging: ${source}`);
  mkdirSync(destination, { recursive: false, mode: stat.mode & 0o777 });
  chmodSync(destination, stat.mode & 0o777);
  const names = readdirSync(source).sort(compareUtf8);
  for (const name of names) {
    const sourceEntry = join(source, name);
    const destinationEntry = join(destination, name);
    const entryStat = lstatSync(sourceEntry);
    if (entryStat.isSymbolicLink()) throw new Error(`symlink is forbidden in benchmark source: ${sourceEntry}`);
    if (entryStat.isDirectory()) copyDirectoryExclusive(sourceEntry, destinationEntry);
    else if (entryStat.isFile()) {
      writeFileSync(destinationEntry, readStableRegularFile(sourceEntry, "benchmark source file"), { flag: "wx", mode: entryStat.mode & 0o777 });
      chmodSync(destinationEntry, entryStat.mode & 0o777);
    } else throw new Error(`unsupported benchmark source entry: ${sourceEntry}`);
  }
  const finalNames = readdirSync(source).sort(compareUtf8);
  if (canonicalJson(names) !== canonicalJson(finalNames)) throw new Error(`benchmark source directory changed while staging: ${source}`);
}

function makeReadOnly(path) {
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in staged benchmark: ${path}`);
  if (stat.isDirectory()) {
    const names = readdirSync(path).sort(compareUtf8);
    for (const name of names) makeReadOnly(join(path, name));
    chmodSync(path, 0o555);
  } else if (stat.isFile()) chmodSync(path, 0o444);
  else throw new Error(`unsupported staged benchmark entry: ${path}`);
}

function makeOwnerWritable(path) {
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) return;
  if (stat.isDirectory()) {
    chmodSync(path, 0o700);
    for (const name of readdirSync(path).sort(compareUtf8)) makeOwnerWritable(join(path, name));
  } else if (stat.isFile()) chmodSync(path, 0o600);
}

function assertSafeRelativePath(value, label) {
  if (typeof value !== "string" || value === "" || isAbsolute(value) || value.includes("\\")) throw new Error(`${label} must be a safe relative POSIX path`);
  if (value.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} must be a safe relative POSIX path`);
}

function resolveContained(root, value, label) {
  assertSafeRelativePath(value, label);
  const absoluteRoot = resolve(root);
  const candidate = resolve(absoluteRoot, value);
  const local = relative(absoluteRoot, candidate);
  if (local === ".." || local.startsWith(`..${sep}`) || isAbsolute(local)) throw new Error(`${label} escapes its root`);
  return candidate;
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
