import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import {
  installGeneratedGoRuntime,
  installToolchainPackage,
  openToolchainArguments,
} from "./toolchain.mjs";

const [repositoryArgument, targetArgument, ...toolchainArguments] = process.argv.slice(2);
if (repositoryArgument === undefined || targetArgument === undefined) {
  throw new Error("repository root, target root, and exact toolchain are required");
}

const repositoryRoot = resolve(repositoryArgument);
const targetRoot = resolve(targetArgument);
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
const outputRoot = join(targetRoot, "out");

await installToolchainPackage(toolchain, "gostdlib", outputRoot);
await installToolchainPackage(toolchain, "externals", outputRoot);
await installGeneratedGoRuntime(join(outputRoot, "runtime"), outputRoot);

const targetPackage = JSON.parse(await readFile(join(targetRoot, "package.json"), "utf8"));
const runtimePackage = JSON.parse(await readFile(
  join(toolchain.packages.typeScriptRuntime.root, "package.json"),
  "utf8",
));
if (targetPackage.dependencies?.[runtimePackage.name] !== runtimePackage.version) {
  throw new Error(
    "Target TypeScript runtime selection does not match the immutable toolchain package",
  );
}
await installToolchainPackage(toolchain, "typeScriptRuntime", outputRoot);
