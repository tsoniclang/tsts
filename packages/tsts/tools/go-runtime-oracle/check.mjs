import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertPinnedGoToolchainStable,
  resolveAndVerifyPinnedGoToolchain,
} from "../porter/go-toolchain-pin.mjs";

const toolRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(toolRoot, "../../../..");
const sourcePin = JSON.parse(readFileSync(path.join(repositoryRoot, "packages/tsts/tools/porter/source-pin.json"), "utf8"));
const expectedPath = path.join(toolRoot, "slices.expected.json");
const toolchain = resolveAndVerifyPinnedGoToolchain(sourcePin.extractor);
const output = run(toolchain.executable, ["run", "./slices"], toolRoot, toolchain.environment);
const canonical = `${JSON.stringify(JSON.parse(output), null, 2)}\n`;
if (process.argv.includes("--write")) {
  writeFileSync(expectedPath, canonical);
  console.log(`wrote ${path.relative(repositoryRoot, expectedPath)}`);
} else {
  const expected = readFileSync(expectedPath, "utf8");
  if (canonical !== expected) {
    throw new Error("Go slice oracle drifted; inspect the pinned toolchain/source contract before regenerating");
  }
  console.log("Go slice oracle matches the checked-in expectation");
}
assertPinnedGoToolchainStable(toolchain);

function run(command, arguments_, cwd, environment) {
  const result = spawnSync(command, arguments_, { cwd, encoding: "utf8", env: environment });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${arguments_.join(" ")} failed (${result.status}):\n${result.stderr || result.stdout}`);
  }
  return result.stdout;
}
