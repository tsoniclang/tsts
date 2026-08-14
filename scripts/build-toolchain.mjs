import { realpath } from "node:fs/promises";
import { join, resolve } from "node:path";

import {
  buildToolchain,
  createDistributionWorkspace,
  formatToolchainHandle,
} from "./toolchain.mjs";

const repositoryRoot = resolve(process.argv[2] ?? ".");
const goExecutable = process.argv[3];
const goModuleCache = process.argv[4];
const nodeExecutable = process.argv[5];
const npmCli = process.argv[6];
const hostUtilityPath = process.argv[7];
if ([goExecutable, goModuleCache, nodeExecutable, npmCli, hostUtilityPath].includes(undefined)) {
  throw new Error(
    "repository and explicit Go, module-cache, Node, npm, and host-platform inputs are required",
  );
}
if (await realpath(process.execPath) !== await realpath(nodeExecutable)) {
  throw new Error("build-toolchain must run under the explicit Node bootstrap");
}
const handle = await buildToolchain(repositoryRoot, {
  goExecutable: resolve(goExecutable),
  goModuleCache: resolve(goModuleCache),
  nodeExecutable: resolve(nodeExecutable),
  npmCli: resolve(npmCli),
  hostUtilityPath: resolve(hostUtilityPath),
});
const identity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const distribution = await createDistributionWorkspace(
  handle,
  join(repositoryRoot, ".temp", "toolchain-runs", identity, "compiler-distribution"),
);
process.stdout.write(`${formatToolchainHandle(handle, distribution)}\n`);
