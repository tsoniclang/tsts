import { resolve } from "node:path";

import { bundleExecutable } from "./executable-bundle.mjs";
import { openToolchainArguments } from "./toolchain.mjs";
import { readTypeScriptTargetProfile } from "./typescript-target-profile.mjs";

const [repositoryArgument, targetArgument, ...toolchainArguments] = process.argv.slice(2);
if (repositoryArgument === undefined || targetArgument === undefined) {
  throw new Error("repository root, target root, and exact toolchain are required");
}

const repositoryRoot = resolve(repositoryArgument);
const targetRoot = resolve(targetArgument);
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
const targetProfile = await readTypeScriptTargetProfile(
  resolve(repositoryRoot, "typescript-target.json"),
);
const manifest = await bundleExecutable({
  repositoryRoot,
  targetRoot,
  toolchain,
  targetProfile,
});
console.log(
  `executable_bundle=${manifest.output.path} bytes=${manifest.output.size} inputs=${manifest.inputs.length}`,
);
