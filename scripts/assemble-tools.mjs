import { lstat, mkdir, rename, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";

import { copyPublishedPackage } from "./package-artifact.mjs";

const repositoryRoot = resolve(process.argv[2] ?? ".");
const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const runRoot = join(repositoryRoot, ".temp", "tool-assemblies", runIdentity);
const stagedRoot = join(runRoot, "runtime");
const finalRoot = join(repositoryRoot, ".temp", "tool-runtime");
const packageRoot = join(stagedRoot, "node_modules", "@tsonic");

const packages = [
  ["tsts", join(repositoryRoot, "tools", "tsts-legacy", "packages", "tsts")],
  ["source-core", join(repositoryRoot, "tools", "tsonic", "packages", "source-core")],
  ["target-api", join(repositoryRoot, "tools", "tsonic", "packages", "target-api")],
  ["host", join(repositoryRoot, "tools", "tsonic", "packages", "host")],
  ["target-typescript", join(repositoryRoot, "tools", "tsonic-typescript")],
  ["typescript-runtime", join(repositoryRoot, "tools", "typescript-runtime")],
];

await mkdir(packageRoot, { recursive: true });
const records = [];
for (const [name, sourceRoot] of packages) {
  const packageName = `@tsonic/${name}`;
  records.push(await copyPublishedPackage({
    sourceRoot,
    targetRoot: join(packageRoot, name),
    expectedName: packageName,
  }));
}
await writeFile(join(stagedRoot, "package.json"), `${JSON.stringify({
  private: true,
  type: "module",
}, undefined, 2)}\n`, "utf8");
await writeFile(join(stagedRoot, "tool-runtime-manifest.json"), `${JSON.stringify({
  schemaVersion: 1,
  packages: records,
}, undefined, 2)}\n`, "utf8");
await replaceDirectory(
  finalRoot,
  stagedRoot,
  join(repositoryRoot, ".temp", "preserved"),
  runIdentity,
);
console.log(`tool_runtime_packages=${records.length} output=${finalRoot}`);

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
