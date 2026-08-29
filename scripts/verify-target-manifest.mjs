import { join, resolve } from "node:path";

import { readCanonicalGoToTSManifest } from "./canonical-gotots-manifest.mjs";
import { verifyTargetManifest } from "./target-manifest.mjs";
import { formatToolchainHandle, openToolchain } from "./toolchain.mjs";
import { readTypeScriptTargetProfile } from "./typescript-target-profile.mjs";

const [repositoryArgument, canonicalArgument, targetArgument, ...exact] = process.argv.slice(2);
if (
  repositoryArgument === undefined ||
  canonicalArgument === undefined ||
  targetArgument === undefined ||
  exact.length !== 2
) {
  throw new Error(
    "repository, canonical, target, and exact historical toolchain digest/root are required",
  );
}

const repositoryRoot = resolve(repositoryArgument);
const canonicalRoot = resolve(canonicalArgument);
const targetRoot = resolve(targetArgument);
const canonical = await readCanonicalGoToTSManifest(canonicalRoot);
const profile = await readTypeScriptTargetProfile(
  join(repositoryRoot, "typescript-target.json"),
  canonical.representationTransports,
);
const target = await verifyTargetManifest(
  targetRoot,
  canonical.semanticDigest,
  profile.digest,
);
const digest = exact[0];
if (digest !== target.toolchainDigest) {
  throw new Error("Target manifest toolchain digest differs from the resolved handle");
}
const handle = await openToolchain(repositoryRoot, {
  digest,
  root: exact[1],
});
process.stdout.write(`${formatToolchainHandle(handle)}\n`);
