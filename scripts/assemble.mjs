import { cp, copyFile, mkdir, symlink } from "node:fs/promises";
import { join } from "node:path";

const [repositoryRoot] = process.argv.slice(2);
if (repositoryRoot === undefined) {
  throw new Error("repository root is required");
}

const generatedRoot = join(repositoryRoot, ".temp", "generated");
const outputRoot = join(generatedRoot, "out");
const packageRoot = join(outputRoot, "node_modules", "@gotots");

await mkdir(packageRoot, { recursive: true });

async function installProvider(name, sourceRoot) {
  const targetRoot = join(packageRoot, name);
  await mkdir(targetRoot, { recursive: true });
  await cp(join(sourceRoot, "dist"), join(targetRoot, "dist"), {
    recursive: true,
    errorOnExist: true,
  });
  await copyFile(join(sourceRoot, "package.json"), join(targetRoot, "package.json"));
}

const distributionRoot = join(repositoryRoot, "tools", "gotots");
await installProvider("gostdlib", join(distributionRoot, "gostdlib"));
await installProvider("externals", join(distributionRoot, "externals"));
await symlink("../../runtime", join(packageRoot, "runtime"), "dir");
