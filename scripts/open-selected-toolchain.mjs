import { realpath } from "node:fs/promises";
import { join, resolve } from "node:path";

import {
  createDistributionWorkspace,
  formatToolchainHandle,
  openSelectedToolchain,
} from "./toolchain.mjs";

const repositoryRoot = resolve(process.argv[2] ?? ".");
const nodeExecutable = process.argv[3];
if (nodeExecutable === undefined) {
  throw new Error("repository and explicit Node bootstrap inputs are required");
}
if (await realpath(process.execPath) !== await realpath(nodeExecutable)) {
  throw new Error("open-selected-toolchain must run under the explicit Node bootstrap");
}
const handle = await openSelectedToolchain(repositoryRoot);
const identity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const distribution = await createDistributionWorkspace(
  handle,
  join(repositoryRoot, ".temp", "toolchain-runs", identity, "compiler-distribution"),
);
process.stdout.write(`${formatToolchainHandle(handle, distribution)}\n`);
