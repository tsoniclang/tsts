#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ensureTstsBuild } from "../tsts-build.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(scriptPath), "../../../..");
const packageRoot = join(repoRoot, "packages/tsts");
const buildRoot = join(repoRoot, ".temp/tsts-builds");
const runnerPath = join(dirname(scriptPath), "run.mjs");

const build = await ensureTstsBuild({ repoRoot, packageRoot, buildRoot, noBuild: false });
const result = spawnSync(process.execPath, [runnerPath, ...process.argv.slice(2)], {
  cwd: repoRoot,
  env: { ...process.env, TSTS_SUITE_BUILD_ID: build.buildId },
  stdio: "inherit",
});
if (result.error !== undefined) throw result.error;
if (result.signal !== null) {
  process.kill(process.pid, result.signal);
} else {
  process.exitCode = result.status ?? 1;
}
