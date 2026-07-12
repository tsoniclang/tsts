import { buildAstGeneratedArtifactStatus } from "../ast-generator.mjs";
import { buildDiagnosticsGeneratedArtifactStatus } from "../diagnostics-generator.mjs";
import { matchGlob } from "../path-policy.mjs";
import { authoredFacadePathSet, renderExpectedGeneratedArtifacts } from "./facade-artifacts.mjs";
import { prepareExternalFacadeStorageCatalog } from "./authored-facade-selections.mjs";
import { buildGeneratedArtifactStatus } from "./generated-artifacts.mjs";
import { skeletonTsConfig, unitsByIDMap } from "./render-indexes.mjs";
import { renderStatusMarkdown } from "./reporting.mjs";
import { fail, repoRoot, resolveRepo, writeJson, writeText } from "./runtime.mjs";
import { buildStatus } from "./status.mjs";
import { parserOptionsForConfig, scanTsUnits } from "./ts-units.mjs";
import { renderUnitGroup } from "./type-renderer.mjs";
import { assertLargeFileSplitPlanClean } from "./verification.mjs";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export async function scaffoldMissing(config, status, snapshot, externalFacadeCatalog, options) {
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
    const facades = await prepareExternalFacadeStorageCatalog(config, snapshot, repoRoot);
    const afterStatus = buildStatus(
      config,
      snapshot,
      await scanTsUnits(resolveRepo(config.tsRoot), { parser: parserOptionsForConfig(config) }),
      buildGeneratedArtifactStatus(config, snapshot, facades),
      buildAstGeneratedArtifactStatus(config, snapshot.gitRevision),
      buildDiagnosticsGeneratedArtifactStatus(config, snapshot.gitRevision),
    );
    writeJson(resolveRepo(config.statusOut), afterStatus);
    writeText(resolveRepo(config.reportOut), renderStatusMarkdown(afterStatus));
    if (afterStatus.counts.missing > 0) {
      fail(`scaffold --all left ${afterStatus.counts.missing} active missing Go unit(s); inspect ${config.reportOut}`);
    }
    console.log("scaffold --all complete: active missing Go units = 0");
  }
}

export function checkSkeletons(config, status, snapshot, externalFacadeCatalog, options) {
  assertLargeFileSplitPlanClean(status);
  const emitTemp = options["emit-temp"] !== false;
  const compile = options.compile !== false && options.compile !== "false";
  const outRoot = resolveRepo(options.out ?? ".temp/porter/skeleton");
  const targetRoot = path.join(outRoot, "src");
  const tsRootPrefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  const rows = status.rows.filter((row) => row.status === "missing" || row.status === "stub" || row.status === "implemented");
  const unitsByID = unitsByIDMap(snapshot);
  const groups = new Map();
  const renderFailures = [];

  for (const row of rows) {
    const unit = unitsByID.get(row.id);
    if (!unit || !["constGroup", "func", "method", "type", "varGroup"].includes(unit.kind)) continue;
    const group = groups.get(row.expectedTsPath) ?? [];
    group.push(unit);
    groups.set(row.expectedTsPath, group);
  }

  if (emitTemp) {
    rmSync(outRoot, { recursive: true, force: true });
    mkdirSync(targetRoot, { recursive: true });
    for (const [repoRelativePath, text] of renderExpectedGeneratedArtifacts(config, snapshot, externalFacadeCatalog)) {
      const relativeUnderSource = repoRelativePath.startsWith(tsRootPrefix)
        ? repoRelativePath.slice(tsRootPrefix.length)
        : repoRelativePath;
      writeText(path.join(targetRoot, relativeUnderSource), text);
    }
    for (const repoRelativePath of authoredFacadePathSet(config)) {
      const sourcePath = resolveRepo(repoRelativePath);
      if (!existsSync(sourcePath)) continue;
      const relativeUnderSource = repoRelativePath.startsWith(tsRootPrefix)
        ? repoRelativePath.slice(tsRootPrefix.length)
        : repoRelativePath;
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
        largeFileSplits: status.largeFileSplits,
      });
      renderedFiles++;
      renderedUnits += units.length;
      if (emitTemp) {
        const relativeUnderSource = relativeTargetPath.startsWith(tsRootPrefix)
          ? relativeTargetPath.slice(tsRootPrefix.length)
          : relativeTargetPath;
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
