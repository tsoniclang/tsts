import { matchGlob } from "../path-policy.mjs";
import { authoredFacadePathSet, renderExpectedGeneratedArtifacts } from "./facade-artifacts.mjs";
import { skeletonTsConfig, unitsByIDMap } from "./render-indexes.mjs";
import { renderStatusMarkdown } from "./reporting.mjs";
import { fail, repoRoot, resolveRepo, writeJson, writeText } from "./runtime.mjs";
import { renderUnitGroup } from "./type-renderer.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { assertLargeFileSplitPlanClean } from "./verification.mjs";
import { preparePorterWorkspaceState } from "./workspace-state.mjs";
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export const skeletonOutputRelativePath = ".temp/porter/skeleton";
export const skeletonOutputSentinelName = ".tsts-porter-skeleton-output";

const skeletonOutputSentinelContents = "tsts-porter:skeleton-check-output:v1\n";
const skeletonOutputPathComponents = Object.freeze(skeletonOutputRelativePath.split("/"));

export async function scaffoldMissing(config, status, snapshot, externalFacadeCatalog, generatedDeclarationOwners, options) {
  assertLargeFileSplitPlanClean(status);
  const write = options.write === true;
  const scaffoldAll = options.all === true;
  const limit = scaffoldAll ? undefined : options.limit === undefined ? 25 : Number(options.limit);
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
    fail("--limit must be a non-negative integer");
  }

  let candidates = status.rows.filter((row) => row.status === "missing");
  if (options["go-path"]) {
    candidates = candidates.filter((row) => matchGlob(options["go-path"], row.goPath));
  }
  if (options.kind) {
    candidates = candidates.filter((row) => row.kind === options.kind);
  }
  if (!scaffoldAll) {
    candidates = candidates.slice(0, limit);
  }
  if (candidates.length === 0) {
    console.log("No missing units matched scaffold filters.");
    return;
  }

  const unitsByID = new Map();
  for (const file of snapshot.files) {
    for (const unit of file.units ?? []) {
      unitsByID.set(unit.id, unit);
    }
  }

  const groups = new Map();
  for (const row of candidates) {
    const group = groups.get(row.expectedTsPath) ?? [];
    group.push(row);
    groups.set(row.expectedTsPath, group);
  }

  for (const [relativeTargetPath, rows] of groups) {
    const targetPath = resolveRepo(relativeTargetPath);
    const units = rows.map((row) => {
      const unit = unitsByID.get(row.id);
      if (!unit) fail(`internal error: missing snapshot unit for ${row.id}`);
      return unit;
    });
    const text = renderUnitGroup(config, snapshot, relativeTargetPath, units, {
      externalFacadeCatalog,
      generatedDeclarationOwners,
      largeFileSplits: status.largeFileSplits,
    });
    const targetLabel = path.relative(repoRoot, targetPath);

    if (!write) {
      const action = existsSync(targetPath) ? "append to" : "create";
      console.log(`[dry-run] would ${action} ${targetLabel} with ${rows.length} unit(s)`);
      continue;
    }
    if (existsSync(targetPath) && options.append !== true) {
      fail(`refusing to append existing file without --append: ${targetLabel}`);
    }
    mkdirSync(path.dirname(targetPath), { recursive: true });
    if (existsSync(targetPath)) {
      const current = readFileSync(targetPath, "utf8").replace(/\s*$/, "\n\n");
      writeFileSync(targetPath, current + text);
      console.log(`appended ${rows.length} unit(s) to ${targetLabel}`);
    } else {
      writeFileSync(targetPath, text);
      console.log(`created ${targetLabel} with ${rows.length} unit(s)`);
    }
  }

  if (!write) {
    console.log("Dry run only. Re-run with --write to create scaffold files.");
    if (!scaffoldAll) {
      console.log("Use --all to include every matching active missing unit.");
    }
    return;
  }

  if (scaffoldAll) {
    const afterWorkspace = await preparePorterWorkspaceState({
      config,
      repositoryRoot: repoRoot,
      snapshot,
      unicodeMode: "metadata",
    });
    const afterStatus = afterWorkspace.status;
    writeJson(resolveRepo(config.statusOut), afterStatus);
    writeText(resolveRepo(config.reportOut), renderStatusMarkdown(afterStatus));
    if (afterStatus.counts.missing > 0) {
      fail(`scaffold --all left ${afterStatus.counts.missing} active missing Go unit(s); inspect ${config.reportOut}`);
    }
    console.log("scaffold --all complete: active missing Go units = 0");
  }
}

export function checkSkeletons(config, status, snapshot, externalFacadeCatalog, generatedDeclarationOwners, options) {
  assertLargeFileSplitPlanClean(status);
  const emitTemp = options["no-emit-temp"] !== true;
  const compile = emitTemp && options["no-compile"] !== true;
  const outRoot = path.join(repoRoot, ...skeletonOutputPathComponents);
  const targetRoot = path.join(outRoot, "src");
  const rows = status.rows.filter((row) => row.status === "missing" || row.status === "stub" || row.status === "implemented");
  const unitsByID = unitsByIDMap(snapshot);
  const groups = new Map();
  const renderFailures = [];

  for (const row of rows) {
    const unit = unitsByID.get(row.id);
    if (!unit || !isSemanticPrimaryUnitKind(unit.kind)) continue;
    const group = groups.get(row.expectedTsPath) ?? [];
    group.push(unit);
    groups.set(row.expectedTsPath, group);
  }

  if (emitTemp) {
    resetSkeletonOutputDirectory();
    mkdirSync(targetRoot);
    for (const [repoRelativePath, text] of renderExpectedGeneratedArtifacts(config, snapshot, externalFacadeCatalog)) {
      const relativeUnderSource = skeletonSourceRelativePath(config, repoRelativePath);
      writeText(path.join(targetRoot, relativeUnderSource), text);
    }
    for (const repoRelativePath of authoredFacadePathSet(config)) {
      const relativeUnderSource = skeletonSourceRelativePath(config, repoRelativePath);
      const sourcePath = resolveRepo(repoRelativePath);
      if (!existsSync(sourcePath)) continue;
      writeText(path.join(targetRoot, relativeUnderSource), readFileSync(sourcePath, "utf8"));
    }
  }

  let renderedFiles = 0;
  let renderedUnits = 0;
  const diagnostics = [];
  for (const [relativeTargetPath, units] of groups) {
    try {
      const text = renderUnitGroup(config, snapshot, relativeTargetPath, units, {
        diagnostics,
        externalFacadeCatalog,
        generatedDeclarationOwners,
        largeFileSplits: status.largeFileSplits,
      });
      renderedFiles++;
      renderedUnits += units.length;
      if (emitTemp) {
        const relativeUnderSource = skeletonSourceRelativePath(config, relativeTargetPath);
        const targetPath = path.join(targetRoot, relativeUnderSource);
        mkdirSync(path.dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, text);
      }
    } catch (error) {
      renderFailures.push(`${relativeTargetPath}: ${error.message}`);
    }
  }

  const hardDiagnostics = diagnostics.filter((diagnostic) => diagnostic.severity === "error");
  console.log(`Skeleton files rendered: ${renderedFiles}`);
  console.log(`Skeleton units rendered: ${renderedUnits}`);
  console.log(`Skeleton render failures: ${renderFailures.length}`);
  console.log(`Skeleton diagnostics: ${diagnostics.length}`);
  console.log(`Skeleton hard diagnostics: ${hardDiagnostics.length}`);

  if (renderFailures.length > 0 || hardDiagnostics.length > 0) {
    const details = [
      ...renderFailures.slice(0, 20),
      ...hardDiagnostics.slice(0, 20).map((diagnostic) => `${diagnostic.unitID}: ${diagnostic.message}`),
    ];
    fail(`skeleton-check failed:\n${details.join("\n")}`);
  }

  if (emitTemp) {
    const tsconfigPath = path.join(outRoot, "tsconfig.json");
    writeJson(tsconfigPath, skeletonTsConfig());
    console.log(`Skeleton output: ${path.relative(repoRoot, outRoot)}`);
    if (compile) {
      const result = spawnSync(
        path.join(repoRoot, "node_modules/.bin/tsc"),
        ["--noEmit", "-p", tsconfigPath],
        { cwd: repoRoot, encoding: "utf8", maxBuffer: 1024 * 1024 * 256 },
      );
      if (result.error) fail(`failed to execute TypeScript compiler: ${result.error.message}`);
      if (result.status !== 0) {
        fail(`skeleton TypeScript compile failed with exit ${result.status}\n${result.stdout}\n${result.stderr}`);
      }
      console.log("skeleton TypeScript compile passed");
    }
  }
}

export function resetSkeletonOutputDirectory() {
  const repositoryRoot = repoRoot;
  assertCanonicalDirectory(repositoryRoot, "Porter repository root");
  const tempRoot = path.join(repositoryRoot, skeletonOutputPathComponents[0]);
  const porterTempRoot = path.join(tempRoot, skeletonOutputPathComponents[1]);
  ensureCanonicalDirectory(tempRoot, "Porter .temp directory");
  ensureCanonicalDirectory(porterTempRoot, "Porter .temp/porter directory");
  const porterTempIdentity = lstatSync(porterTempRoot, { bigint: true });

  const outputRoot = path.join(porterTempRoot, skeletonOutputPathComponents[2]);
  const existing = lstatIfExists(outputRoot, { bigint: true });
  if (existing !== undefined) {
    assertCanonicalDirectory(outputRoot, "Porter skeleton output directory", existing);
    assertSkeletonOutputSentinel(outputRoot);
    assertPathIdentity(porterTempRoot, porterTempIdentity, "Porter .temp/porter directory changed before skeleton cleanup");
    assertPathIdentity(outputRoot, existing, "Porter skeleton output directory changed before cleanup");
    rmSync(outputRoot, { recursive: true, force: false });
    assertPathIdentity(porterTempRoot, porterTempIdentity, "Porter .temp/porter directory changed during skeleton cleanup");
  }

  mkdirSync(outputRoot);
  assertCanonicalDirectory(outputRoot, "Porter skeleton output directory");
  writeFileSync(
    path.join(outputRoot, skeletonOutputSentinelName),
    skeletonOutputSentinelContents,
    { encoding: "utf8", flag: "wx", mode: 0o600 },
  );
  return outputRoot;
}

function skeletonSourceRelativePath(config, repoRelativePath) {
  const tsRoot = config.tsRoot.replace(/\/+$/, "");
  const prefix = `${tsRoot}/`;
  if (typeof repoRelativePath !== "string" || !repoRelativePath.startsWith(prefix)) {
    throw new Error(`skeleton output path must be beneath ${tsRoot}: ${String(repoRelativePath)}`);
  }
  const relative = repoRelativePath.slice(prefix.length);
  if (
    relative === "" ||
    relative.includes("\\") ||
    path.posix.isAbsolute(relative) ||
    path.posix.normalize(relative) !== relative ||
    relative.split("/").some((component) => component === "" || component === "." || component === "..")
  ) {
    throw new Error(`skeleton output path is not canonical: ${repoRelativePath}`);
  }
  return relative.split("/").join(path.sep);
}

function ensureCanonicalDirectory(directory, label) {
  const existing = lstatIfExists(directory);
  if (existing === undefined) mkdirSync(directory);
  assertCanonicalDirectory(directory, label, existing ?? lstatSync(directory));
}

function assertCanonicalDirectory(directory, label, stats = lstatIfExists(directory)) {
  if (!path.isAbsolute(directory) || path.normalize(directory) !== directory) {
    throw new Error(`${label} path must be absolute and canonical: ${directory}`);
  }
  if (stats === undefined || stats.isSymbolicLink() || !stats.isDirectory()) {
    throw new Error(`${label} must be an existing non-symlink directory: ${directory}`);
  }
  if (realpathSync(directory) !== directory) {
    throw new Error(`${label} must not traverse symlinks: ${directory}`);
  }
}

function assertSkeletonOutputSentinel(outputRoot) {
  const sentinelPath = path.join(outputRoot, skeletonOutputSentinelName);
  const before = lstatIfExists(sentinelPath, { bigint: true });
  if (before === undefined || before.isSymbolicLink() || !before.isFile()) {
    throw new Error(`refusing to delete Porter skeleton output without its ownership sentinel: ${sentinelPath}`);
  }
  const contents = readFileSync(sentinelPath, "utf8");
  const after = lstatIfExists(sentinelPath, { bigint: true });
  if (
    contents !== skeletonOutputSentinelContents ||
    after === undefined ||
    before.dev !== after.dev ||
    before.ino !== after.ino ||
    before.size !== after.size ||
    before.mtimeNs !== after.mtimeNs ||
    before.ctimeNs !== after.ctimeNs
  ) {
    throw new Error(`refusing to delete Porter skeleton output with an invalid ownership sentinel: ${sentinelPath}`);
  }
}

function assertPathIdentity(file, expected, message) {
  const actual = lstatIfExists(file, { bigint: true });
  if (
    actual === undefined ||
    actual.isSymbolicLink() ||
    actual.dev !== expected.dev ||
    actual.ino !== expected.ino
  ) {
    throw new Error(message);
  }
}

function lstatIfExists(file, options) {
  try {
    return lstatSync(file, options);
  } catch (error) {
    if (error?.code === "ENOENT") return undefined;
    throw error;
  }
}
