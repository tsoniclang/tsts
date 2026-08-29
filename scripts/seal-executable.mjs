import { resolve } from "node:path";

import { readCanonicalGoToTSManifest } from "./canonical-gotots-manifest.mjs";
import { bundleExecutable } from "./executable-bundle.mjs";
import { openToolchainArguments } from "./toolchain.mjs";
import { readTypeScriptTargetProfile } from "./typescript-target-profile.mjs";

const [
  repositoryArgument,
  canonicalArgument,
  targetArgument,
  ...toolchainArguments
] = process.argv.slice(2);
if (
  repositoryArgument === undefined ||
  canonicalArgument === undefined ||
  targetArgument === undefined
) {
  throw new Error("repository root, canonical root, target root, and exact toolchain are required");
}

const repositoryRoot = resolve(repositoryArgument);
const canonicalRoot = resolve(canonicalArgument);
const targetRoot = resolve(targetArgument);
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
const canonical = await readCanonicalGoToTSManifest(canonicalRoot);
const targetProfile = await readTypeScriptTargetProfile(
  resolve(repositoryRoot, "typescript-target.json"),
  canonical.representationTransports,
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
