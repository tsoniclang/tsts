import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { verifyTargetManifest } from "./target-manifest.mjs";
import { readTypeScriptTargetProfile } from "./typescript-target-profile.mjs";

const [repositoryArgument, canonicalArgument, targetArgument] = process.argv.slice(2);
if (
  repositoryArgument === undefined ||
  canonicalArgument === undefined ||
  targetArgument === undefined
) {
  throw new Error("repository root, canonical root, and target root are required");
}

const repositoryRoot = resolve(repositoryArgument);
const canonicalRoot = resolve(canonicalArgument);
const targetRoot = resolve(targetArgument);
const canonical = JSON.parse(
  await readFile(join(canonicalRoot, "gotots-manifest.json"), "utf8"),
);
if (
  typeof canonical !== "object" ||
  canonical === null ||
  Array.isArray(canonical) ||
  typeof canonical.semanticDigest !== "string"
) {
  throw new Error("GoToTS manifest semantic digest is invalid");
}
const profile = await readTypeScriptTargetProfile(
  join(repositoryRoot, "typescript-target.json"),
);
const files = await verifyTargetManifest(
  targetRoot,
  canonical.semanticDigest,
  profile.digest,
);
console.log(`target_manifest=verified files=${files.length} profile=${profile.digest}`);
