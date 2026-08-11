import { lstat, mkdir, rename } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";

import { sealToolRuntime } from "./tool-runtime-manifest.mjs";

const repositoryRoot = resolve(process.argv[2] ?? ".");
const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const runRoot = join(repositoryRoot, ".temp", "tool-assemblies", runIdentity);
const stagedRoot = join(runRoot, "runtime");
const finalRoot = join(repositoryRoot, ".temp", "tool-runtime");

const manifest = await sealToolRuntime(repositoryRoot, stagedRoot);
await replaceDirectory(
  finalRoot,
  stagedRoot,
  join(repositoryRoot, ".temp", "preserved"),
  runIdentity,
);
console.log(`tool_runtime_packages=${manifest.packages.length} output=${finalRoot}`);

async function replaceDirectory(target, staged, preservedRoot, identity) {
  try {
    await lstat(target);
  } catch (error) {
    if (error?.code === "ENOENT") {
      await mkdir(dirname(target), { recursive: true });
      await rename(staged, target);
      return;
    }
    throw error;
  }
  await mkdir(preservedRoot, { recursive: true });
  const preserved = join(preservedRoot, `${basename(target)}-${identity}`);
  await rename(target, preserved);
  try {
    await rename(staged, target);
  } catch (error) {
    await rename(preserved, target);
    throw error;
  }
}
