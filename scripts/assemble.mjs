import { mkdir, readFile, symlink } from "node:fs/promises";
import { join } from "node:path";

import { copyPublishedPackage } from "./package-artifact.mjs";

const [repositoryRoot, targetRoot] = process.argv.slice(2);
if (repositoryRoot === undefined || targetRoot === undefined) {
  throw new Error("repository root and target root are required");
}

const outputRoot = join(targetRoot, "out");
const packageRoot = join(outputRoot, "node_modules", "@gotots");

await mkdir(packageRoot, { recursive: true });

async function installProvider(name, sourceRoot) {
  await copyPublishedPackage({
    sourceRoot,
    targetRoot: join(packageRoot, name),
    expectedName: `@gotots/${name}`,
  });
}

const distributionRoot = join(repositoryRoot, "tools", "gotots");
await installProvider("gostdlib", join(distributionRoot, "gostdlib"));
await installProvider("externals", join(distributionRoot, "externals"));
await symlink("../../runtime", join(packageRoot, "runtime"), "dir");

const targetPackage = JSON.parse(await readFile(join(targetRoot, "package.json"), "utf8"));
const runtimeRoot = join(repositoryRoot, "tools", "typescript-runtime");
const runtimePackage = JSON.parse(await readFile(join(runtimeRoot, "package.json"), "utf8"));
if (
  targetPackage.dependencies?.["@tsonic/typescript-runtime"] !== runtimePackage.version
) {
  throw new Error("Target TypeScript runtime selection does not match the pinned runtime package");
}
await copyPublishedPackage({
  sourceRoot: runtimeRoot,
  targetRoot: join(outputRoot, "node_modules", "@tsonic", "typescript-runtime"),
  expectedName: "@tsonic/typescript-runtime",
});
